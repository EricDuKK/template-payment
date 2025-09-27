import { createServerAdminClient } from "@/utils/supabase/server";

export default async function DebugPage() {
  const admin = createServerAdminClient();
  
  // 查询所有交易记录
  const { data: allTransactions, error: allError } = await admin
    .from("zpay_transactions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">数据库调试页面</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">所有交易记录</h2>
        <p className="text-gray-600 mb-2">总数: {allTransactions?.length || 0}</p>
        {allError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            错误: {JSON.stringify(allError, null, 2)}
          </div>
        )}
      </div>

      {allTransactions && allTransactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">用户ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">产品名称</th>
                <th className="border border-gray-300 px-4 py-2 text-left">价格</th>
                <th className="border border-gray-300 px-4 py-2 text-left">状态</th>
                <th className="border border-gray-300 px-4 py-2 text-left">创建时间</th>
                <th className="border border-gray-300 px-4 py-2 text-left">是否订阅</th>
              </tr>
            </thead>
            <tbody>
              {allTransactions.map((transaction: any) => (
                <tr key={transaction.id}>
                  <td className="border border-gray-300 px-4 py-2">{transaction.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{transaction.user_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{transaction.name}</td>
                  <td className="border border-gray-300 px-4 py-2">¥{transaction.money}</td>
                  <td className="border border-gray-300 px-4 py-2">{transaction.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(transaction.created_at).toLocaleString('zh-CN')}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.is_subscription ? '是' : '否'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">没有找到任何交易记录</p>
        </div>
      )}
    </div>
  );
}