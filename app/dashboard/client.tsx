"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardClientProps {
  user?: User | null;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
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
    </div>
  );
}
