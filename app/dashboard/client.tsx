"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardClientProps {
  user?: User | null;
}

interface Subscription {
  id: string;
  product_id: string;
  name: string;
  subscription_start_at: string;
  subscription_end_at: string;
  subscription_period: string;
}

interface PurchaseHistory {
  id: string;
  product_id: string;
  name: string;
  money: string;
  status: 'pending' | 'paid' | 'failed' | 'completed';
  created_at: string;
  paid_at: string | null;
  out_trade_no: string;
  is_subscription: boolean;
  subscription_period: string | null;
  subscription_start_at: string | null;
  subscription_end_at: string | null;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const supabase = createClient();

  // 如果props中的user为undefined，尝试从客户端获取用户
  useEffect(() => {
    const getUserFromClient = async () => {
      console.log("user", user);
      if (user) {
        setCurrentUser(user);
        setLoading(false);
        return;
      }

      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();
        setCurrentUser(authUser);
      } catch (error) {
        console.error("获取用户信息失败:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserFromClient();
  }, [user, supabase]);

  // 获取订阅信息和购买历史
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;

      try {
        setDataLoading(true);
        const response = await fetch('/api/user/subscription');
        if (response.ok) {
          const data = await response.json();
          console.log('API返回数据:', data);
          setSubscription(data.subscription);
          setPurchaseHistory(data.purchaseHistory);
        } else {
          const errorData = await response.json();
          console.error('获取用户数据失败:', errorData);
        }
      } catch (error) {
        console.error('获取用户数据失败:', error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // 处理待支付订单的支付跳转
  const handlePay = async (outTradeNo: string) => {
    try {
      // 这里可以重新生成支付链接或跳转到支付页面
      // 为了简化，我们直接跳转到产品页面让用户重新购买
      window.location.href = '/#pricing';
    } catch (error) {
      console.error('跳转支付失败:', error);
      alert('跳转支付失败，请稍后再试');
    }
  };

  // 显示订单详情
  const showOrderDetails = (order: PurchaseHistory) => {
    const details = `
订单详情：
产品名称：${order.name}
订单号：${order.out_trade_no}
价格：¥${order.money}
状态：${getStatusText(order.status)}
创建时间：${new Date(order.created_at).toLocaleString('zh-CN')}
${order.paid_at ? `支付时间：${new Date(order.paid_at).toLocaleString('zh-CN')}` : ''}
${order.is_subscription ? `订阅类型：${order.subscription_period === 'monthly' ? '月付' : '年付'}` : '一次性购买'}
${order.subscription_start_at ? `订阅开始：${new Date(order.subscription_start_at).toLocaleString('zh-CN')}` : ''}
${order.subscription_end_at ? `订阅结束：${new Date(order.subscription_end_at).toLocaleString('zh-CN')}` : ''}
    `;
    alert(details);
  };

  // 获取状态文本
  const getStatusText = (status: string) => {
    const statusMap = {
      'pending': '待支付',
      'paid': '已支付',
      'failed': '支付失败',
      'completed': '已完成'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    const styleMap = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'paid': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800',
      'completed': 'bg-blue-100 text-blue-800'
    };
    return styleMap[status as keyof typeof styleMap] || 'bg-gray-100 text-gray-800';
  };

  // 显示加载状态
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center min-h-[40vh]">
          <p className="text-gray-500">加载用户信息中...</p>
        </div>
      </div>
    );
  }

  // 用户未登录
  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col justify-center items-center min-h-[40vh]">
          <p className="text-gray-500 mb-4">您尚未登录或会话已过期</p>
          <Link
            href="/signin?redirect=/dashboard"
            className="btn-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            登录
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 用户信息 */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div>
            <h2 className="h3 font-cabinet-grotesk mb-2">个人信息</h2>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">邮箱:</span> {currentUser.email}
            </p>
            {/* 订阅信息 */}
            {dataLoading ? (
              <p className="text-gray-500 text-sm">加载订阅信息中...</p>
            ) : subscription ? (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">当前订阅:</span> {subscription.name}
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  订阅到期时间: {new Date(subscription.subscription_end_at).toLocaleDateString('zh-CN')}
                </p>
                <p className="text-sm text-blue-600">
                  订阅周期: {subscription.subscription_period === 'monthly' ? '月付' : '年付'}
                </p>
              </div>
            ) : (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">暂无有效订阅</p>
                <a href="/#pricing" className="text-sm text-blue-600 hover:text-blue-800 underline">
                  查看订阅计划
                </a>
              </div>
            )}
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={handleSignOut}
              className="btn-sm text-white bg-red-500 hover:bg-red-600 shadow-sm"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>

      {/* 购买历史 */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="h3 font-cabinet-grotesk mb-4">购买历史</h2>
        {dataLoading ? (
          <div className="flex justify-center items-center py-8">
            <p className="text-gray-500">加载购买历史中...</p>
          </div>
        ) : purchaseHistory.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">暂无购买记录</p>
            <a href="/#pricing" className="btn-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm">
              查看产品
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2">产品名称</th>
                  <th className="text-left py-3 px-2">购买日期</th>
                  <th className="text-left py-3 px-2">价格</th>
                  <th className="text-left py-3 px-2">状态</th>
                  <th className="text-left py-3 px-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {purchaseHistory.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <div>
                        <p className="font-medium">{order.name}</p>
                        {order.is_subscription && (
                          <p className="text-xs text-gray-500">
                            {order.subscription_period === 'monthly' ? '月付订阅' : '年付订阅'}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-gray-600">
                      {new Date(order.created_at).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="py-3 px-2 font-medium">
                      ¥{order.money}
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      {order.status === 'pending' ? (
                        <button
                          onClick={() => handlePay(order.out_trade_no)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          去支付
                        </button>
                      ) : (
                        <button
                          onClick={() => showOrderDetails(order)}
                          className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                        >
                          查看详情
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
