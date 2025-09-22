import Link from "next/link";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

// 使用服务器组件的Context API进行数据传递
export async function generateMetadata() {
  // 创建服务器端Supabase客户端
  const supabase = createServerSupabaseClient();

  // 获取用户信息
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    title: user
      ? `${user.email} 的个人中心 - AI编程学习`
      : "个人中心 - AI编程学习",
    description: "AI编程学习平台个人中心页面",
  };
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 创建服务器端Supabase客户端
  const supabase = createServerSupabaseClient();

  // 获取用户信息
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 如果用户未登录，重定向到登录页面
  if (!user) {
    redirect("/signin?redirect=/dashboard");
  }

  // 将用户数据和订阅信息放到全局对象供页面组件使用
  (global as any).__dashboardUser = user;

  return (
    <section className="relative">
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-sm py-4 fixed w-full z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* 返回首页按钮 */}
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 flex items-center"
            >
              <div className="flex items-center">
                <svg
                  viewBox="0 0 1448 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 mr-2"
                >
                  <path
                    d="M830.69204102 777.369332l202.7441114 56.71889982-121.01084855-238.24035081 183.64319921-225.03735499-274.93274359 65.81173664-134.8132156-222.91560675-54.13888506 278.11212959-273.86863313 93.41258714 201.68388457 87.04345884-136.93108022 92.35106576-162.41277156-68.99759534s-89.1665016-40.33651801-89.1665016-110.39563472 91.28954437-94.47281398 91.28954436-94.47281399l270.68406899-84.21100911 45.29330505-263.25083022s21.23042765-104.73720795 93.41258714-104.73720794 101.90475821 83.50548575 138.70589219 138.70589219l75.01202014 125.96504652 268.91572969-70.76852369s220.78997491-46.7056463 89.16650162 141.52928016l-191.07255435 223.62630826 113.22290631 220.7899749s87.75157129 179.7531117-118.88910033 155.68505617l-195.31475626-62.27635263-21.23042765-134.46110119z"
                    fill="#3b82f6"
                  ></path>
                </svg>
                <h1 className="text-xl font-cabinet-grotesk font-bold">
                  个人中心
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* 直接渲染children，不再尝试传递props */}
          {children}
        </div>
      </div>
    </section>
  );
}
