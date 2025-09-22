import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { createServerAdminClient, createServerSupabaseClient } from "@/utils/supabase/server";

type UrlRequestBody = {
  productId: string;
  payType?: "alipay" | "wxpay";
};

// 排序并拼接签名参数
function getVerifyParams(params: Record<string, string | number | undefined | null>) {
  const pairs: [string, string][] = [];
  for (const key in params) {
    const value = params[key];
    if (value === undefined || value === null || value === "" || key === "sign" || key === "sign_type") continue;
    pairs.push([key, String(value)]);
  }
  pairs.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  return pairs.map(([k, v]) => `${k}=${v}`).join("&");
}

function md5(input: string) {
  return createHash("md5").update(input, "utf8").digest("hex");
}

function generateOutTradeNo() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const ms = String(now.getMilliseconds()).padStart(3, "0");
  const rand = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `${y}${m}${d}${hh}${mm}${ss}${ms}${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    // 使用带 Cookie 的服务端客户端获取登录用户
    const supa = createServerSupabaseClient();
    const { data: auth } = await supa.auth.getUser();
    if (!auth.user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as UrlRequestBody;
    const { productId, payType } = body || {};
    if (!productId) {
      return NextResponse.json({ error: "productId_required" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const pid = process.env.ZPAY_PID;
    const key = process.env.ZPAY_KEY;
    if (!baseUrl || !pid || !key) {
      return NextResponse.json({ error: "server_env_misconfigured" }, { status: 500 });
    }

    // 从产品接口获取产品数据
    const productsRes = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
    if (!productsRes.ok) {
      return NextResponse.json({ error: "products_fetch_failed" }, { status: 500 });
    }
    const productsJson = await productsRes.json();
    const product = productsJson.products?.[productId];
    if (!product) {
      return NextResponse.json({ error: "product_not_found" }, { status: 404 });
    }

    const money = product.price; // 字符串保留两位小数
    const name = product.name as string;
    const isSubscription = Boolean(product.isSubscription);
    const subscriptionPeriod: string | undefined = product.subscriptionPeriod;
    const out_trade_no = generateOutTradeNo();
    const type = (payType || "alipay") as "alipay" | "wxpay";

    const notify_url = `${baseUrl}/api/checkout/providers/zpay/webhook`;
    const return_url = `${baseUrl}/payment/success`;

    const params: Record<string, string> = {
      pid,
      money,
      name,
      notify_url,
      out_trade_no,
      return_url,
      type,
      sign_type: "MD5",
      // 可选参数
      param: `${auth.user.id}:${productId}`,
    } as Record<string, string>;

    const str = getVerifyParams(params);
    const sign = md5(str + key);

    const payUrl = `https://zpayz.cn/submit.php?${str}&sign=${sign}&sign_type=MD5`;

    // 记录交易(待支付)，使用管理员客户端写库
    const admin = createServerAdminClient();
    const { error: insertErr } = await admin
      .from("zpay_transactions")
      .insert({
        user_id: auth.user.id,
        product_id: productId,
        out_trade_no,
        name,
        money,
        type,
        is_subscription: isSubscription,
        subscription_period: subscriptionPeriod || null,
        status: "pending",
      });
    if (insertErr) {
      return NextResponse.json({ error: "db_insert_failed", details: insertErr.message }, { status: 500 });
    }

    return NextResponse.json({ url: payUrl, out_trade_no });
  } catch (e: any) {
    return NextResponse.json({ error: "internal_error", details: e?.message || String(e) }, { status: 500 });
  }
}

