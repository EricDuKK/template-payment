import { createServerSupabaseClient, createServerAdminClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const admin = createServerAdminClient();
    
    // 获取当前用户
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    console.log("当前用户ID:", user.id);

    // 获取用户的所有购买历史（不限制状态）
    const { data: purchaseHistory, error: historyError } = await admin
      .from("zpay_transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (historyError) {
      console.error("获取购买历史失败:", historyError);
      return NextResponse.json({ error: "获取购买历史失败", details: historyError }, { status: 500 });
    }

    // 从购买历史中找到最新的有效订阅
    const subscription = purchaseHistory?.find(transaction => 
      transaction.is_subscription && 
      transaction.status === 'paid' &&
      transaction.subscription_end_at &&
      new Date(transaction.subscription_end_at) > new Date()
    ) || null;

    console.log("用户购买历史数量:", purchaseHistory?.length || 0);
    console.log("找到的订阅:", subscription);
    console.log("所有购买记录:", purchaseHistory);

    return NextResponse.json({
      subscription: subscription,
      purchaseHistory: purchaseHistory || []
    });

  } catch (error) {
    console.error("API错误:", error);
    return NextResponse.json({ error: "服务器内部错误", details: error }, { status: 500 });
  }
}