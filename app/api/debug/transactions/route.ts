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

    // 使用管理员客户端查询所有交易记录
    const { data: allTransactions, error: allError } = await admin
      .from("zpay_transactions")
      .select("*")
      .order("created_at", { ascending: false });

    // 查询当前用户的交易记录
    const { data: userTransactions, error: userError } = await admin
      .from("zpay_transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    return NextResponse.json({
      userId: user.id,
      allTransactionsCount: allTransactions?.length || 0,
      userTransactionsCount: userTransactions?.length || 0,
      allTransactions: allTransactions || [],
      userTransactions: userTransactions || [],
      allError,
      userError
    });

  } catch (error) {
    console.error("调试API错误:", error);
    return NextResponse.json({ error: "服务器内部错误", details: error }, { status: 500 });
  }
}