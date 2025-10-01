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

async function processNotification(payload: {
  pid?: string;
  name?: string;
  money?: string;
  out_trade_no?: string;
  trade_no?: string;
  param?: string;
  trade_status?: string;
  type?: string;
  sign?: string;
  sign_type?: string;
}) {
  const admin = createServerAdminClient();

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
    // 先查询所有该用户的订阅记录，看看有什么
    const { data: allUserSubscriptions, error: allUserError } = await admin
      .from("zpay_transactions")
      .select("subscription_end_at, created_at, status, name, product_id, is_subscription")
      .eq("user_id", tx.user_id)
      .eq("is_subscription", true)
      .order("created_at", { ascending: false });

    console.log("用户所有订阅记录:", allUserSubscriptions);
    console.log("所有订阅记录查询错误:", allUserError);
    console.log("当前用户ID:", tx.user_id);
    console.log("当前产品ID:", tx.product_id);

    // 查询用户所有已支付的订阅记录（不限制产品类型）
    const { data: allPaidSubscriptions, error: allPaidError } = await admin
      .from("zpay_transactions")
      .select("subscription_end_at, created_at, status, name, product_id, subscription_period")
      .eq("user_id", tx.user_id)
      .eq("is_subscription", true)
      .eq("status", "paid")
      .not("subscription_end_at", "is", null)
      .order("subscription_end_at", { ascending: false });

    console.log("用户所有已支付订阅记录:", allPaidSubscriptions);
    console.log("所有已支付订阅记录查询错误:", allPaidError);

    // 找到最新的未过期订阅记录（不限制产品类型）
    const latestValidSubscription = allPaidSubscriptions?.find(sub => {
      const endTime = new Date(sub.subscription_end_at);
      return endTime > now;
    });

    console.log("找到的最新有效订阅记录:", latestValidSubscription);

    // 确定新订阅的开始时间：
    // - 如果有未过期的订阅（任何类型），从该订阅的到期时间开始
    // - 如果没有未过期的订阅，从当前时间开始
    const currentEnd = latestValidSubscription ? new Date(latestValidSubscription.subscription_end_at) : null;
    const startDate = currentEnd && currentEnd > now ? currentEnd : now;
    const endDate = new Date(startDate);
    
    console.log("订阅时间计算调试:");
    console.log("当前时间:", now.toISOString());
    console.log("当前时间戳:", now.getTime());
    console.log("当前订阅到期时间:", currentEnd?.toISOString() || "无");
    console.log("当前订阅到期时间戳:", currentEnd?.getTime() || "无");
    console.log("当前订阅是否未过期:", currentEnd && currentEnd > now);
    console.log("时间差(毫秒):", currentEnd ? currentEnd.getTime() - now.getTime() : "无");
    console.log("订阅开始时间:", startDate.toISOString());
    console.log("当前订阅周期:", tx.subscription_period);
    console.log("之前订阅周期:", latestValidSubscription?.subscription_period || "无");
    
    // 根据订阅周期计算新的到期时间
    // 支持跨订阅类型续费：
    // - 月付 → 年付：从月付到期时间加1年
    // - 年付 → 月付：从年付到期时间加1月
    // - 同类型续费：从当前订阅到期时间加对应周期
    if (tx.subscription_period === "monthly") {
      // 月付：从开始时间加1个月
      endDate.setMonth(endDate.getMonth() + 1);
      console.log("计算月付订阅到期时间");
    } else if (tx.subscription_period === "yearly") {
      // 年付：从开始时间加1年
      endDate.setFullYear(endDate.getFullYear() + 1);
      console.log("计算年付订阅到期时间");
    } else {
      // 默认为月
      endDate.setMonth(endDate.getMonth() + 1);
      console.log("使用默认月付计算");
    }
    
    console.log("计算后的订阅结束时间:", endDate.toISOString());
    
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

export async function GET(req: NextRequest) {
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
  console.log("[zpay webhook][GET] payload=", payload);
  const resp = await processNotification(payload);
  if (resp.status === 200) {
    const origin = new URL(req.url).origin;
    const target = `${origin}/dashboard`;
    const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8" /><meta http-equiv="refresh" content="1;url=${target}"><meta name="viewport" content="width=device-width, initial-scale=1"><title>支付成功</title><style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f7fafc;color:#1a202c} .card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 10px 20px rgba(0,0,0,.06);text-align:center} .ok{font-size:40px;color:#16a34a;margin-bottom:12px} a{color:#2563eb;text-decoration:none}</style></head><body><div class="card"><div class="ok">✓</div><h2>支付成功</h2><p>正在为你跳转到个人中心…</p><p><a href="${target}">若未跳转，点击前往</a></p><script>setTimeout(function(){location.href='${target}'},1000)</script></div></body></html>`;
    return new NextResponse(html, { headers: { "content-type": "text/html; charset=utf-8" } });
  }
  return resp;
}

export async function POST(req: NextRequest) {
  // zpay 可能以 application/x-www-form-urlencoded 发送通知
  const contentType = req.headers.get("content-type") || "";
  let payload: any = {};
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await req.text();
    const search = new URLSearchParams(text);
    payload = {
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
  } else if (contentType.includes("application/json")) {
    const json = await req.json().catch(() => ({} as any));
    const search = new URLSearchParams(Object.entries(json).map(([k, v]) => [k, String(v ?? "")]));
    payload = {
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
  } else {
    // 兜底尝试 formData（Next 14 支持）
    try {
      const form = await req.formData();
      const search = new URLSearchParams();
      form.forEach((value, key) => {
        search.set(key, String(value));
      });
      payload = {
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
    } catch {
      // ignore
    }
  }
  console.log("[zpay webhook][POST] payload=", payload);
  return processNotification(payload);
}

