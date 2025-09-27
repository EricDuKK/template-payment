import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { createServerAdminClient } from "@/utils/supabase/server";

function getVerifyParams(params: Record<string, string | undefined | null>) {
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

export async function GET(req: NextRequest) {
  const admin = createServerAdminClient();
  const url = new URL(req.url);
  const search = url.searchParams;

  const payload = {
    pid: search.get("pid") || undefined,
    name: search.get("name") || undefined,
    money: search.get("money") || undefined,
    out_trade_no: search.get("out_trade_no") || undefined,
    trade_no: search.get("trade_no") || undefined,
    param: search.get("param") || undefined,
    trade_status: search.get("trade_status") || undefined,
    type: search.get("type") || undefined,
    sign: search.get("sign") || undefined,
    sign_type: search.get("sign_type") || undefined,
  } as const;

  const key = process.env.ZPAY_KEY;
  if (!key) {
    return new NextResponse("server_env_misconfigured", { status: 500 });
  }

  // 幂等性：查找交易
  if (!payload.out_trade_no) {
    return new NextResponse("bad_request", { status: 400 });
  }

  const { data: tx, error: txErr } = await admin
    .from("zpay_transactions")
    .select("id, status, money, user_id, product_id, is_subscription, subscription_period")
    .eq("out_trade_no", payload.out_trade_no)
    .maybeSingle();
  if (txErr) {
    return new NextResponse("error", { status: 500 });
  }
  if (!tx) {
    // 未找到订单
    return new NextResponse("not_found", { status: 404 });
  }

  // 已处理直接返回 success
  if (tx.status === "paid" || tx.status === "completed") {
    return new NextResponse("success", { status: 200 });
  }

  // 验签
  const verifyStr = getVerifyParams({
    pid: payload.pid,
    name: payload.name,
    money: payload.money,
    out_trade_no: payload.out_trade_no,
    trade_no: payload.trade_no,
    param: payload.param,
    trade_status: payload.trade_status,
    type: payload.type,
    sign_type: payload.sign_type || "MD5",
  });
  const calcSign = md5(verifyStr + key);
  if (!payload.sign || payload.sign !== calcSign) {
    return new NextResponse("invalid_sign", { status: 400 });
  }

  // 金额校验 - 转换为数字进行比较，避免字符串格式差异
  console.log("金额校验:", {
    payload_money: payload.money,
    tx_money: tx.money,
    payload_money_type: typeof payload.money,
    tx_money_type: typeof tx.money,
    are_equal: payload.money === tx.money
  });
  
  const payloadAmount = parseFloat(payload.money || "0");
  const txAmount = parseFloat(tx.money || "0");
  
  if (!payload.money || isNaN(payloadAmount) || isNaN(txAmount) || payloadAmount !== txAmount) {
    console.log("金额不匹配:", { payloadAmount, txAmount });
    return new NextResponse("amount_mismatch", { status: 400 });
  }

  // 只有 TRADE_SUCCESS 视为成功
  if (payload.trade_status !== "TRADE_SUCCESS") {
    return new NextResponse("ignored", { status: 200 });
  }

  // 更新交易状态 + 处理订阅逻辑
  const now = new Date();

  // 计算订阅窗口（按需求：新订阅在当前到期日之后叠加）
  let subscriptionStartAt: string | null = null;
  let subscriptionEndAt: string | null = null;

  if (tx.is_subscription) {
    // 查询用户当前订阅到期时间
    const { data: latest, error: latestErr } = await admin
      .from("zpay_transactions")
      .select("subscription_end_at")
      .eq("user_id", tx.user_id)
      .eq("product_id", tx.product_id)
      .eq("is_subscription", true)
      .not("subscription_end_at", "is", null)
      .order("subscription_end_at", { ascending: false })
      .limit(1);

    const currentEnd = latest && latest.length > 0 && latest[0].subscription_end_at ? new Date(latest[0].subscription_end_at as unknown as string) : null;
    const startDate = currentEnd && currentEnd > now ? currentEnd : now;
    const endDate = new Date(startDate);
    if (tx.subscription_period === "monthly") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (tx.subscription_period === "yearly") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      // 默认为月
      endDate.setMonth(endDate.getMonth() + 1);
    }
    subscriptionStartAt = startDate.toISOString();
    subscriptionEndAt = endDate.toISOString();
  }

  const { error: updErr } = await admin
    .from("zpay_transactions")
    .update({
      status: "paid",
      trade_no: payload.trade_no || null,
      paid_at: new Date().toISOString(),
      subscription_start_at: subscriptionStartAt,
      subscription_end_at: subscriptionEndAt,
    })
    .eq("out_trade_no", payload.out_trade_no)
    .eq("status", "pending");

  if (updErr) {
    return new NextResponse("error", { status: 500 });
  }

  return new NextResponse("success", { status: 200 });
}

