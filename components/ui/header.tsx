"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';

export default function Header({ nav = true }: { nav?: boolean }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // 检查用户登录状态
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user || null);
      setLoading(false);

      // 监听认证状态变化
      const {
        data: { subscription },
      } = await supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });

      // 清理订阅
      return () => {
        subscription.unsubscribe();
      };
    };

    checkUser();
  }, [supabase]);
  
  // 处理导航到 dashboard 的点击事件
  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    
    // 预加载并导航到 dashboard
    router.prefetch('/dashboard');
    
    // 设置短暂延迟，确保用户看到加载状态
    setTimeout(() => {
      router.push('/dashboard');
    }, 100);
  };

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link className="block group" href="/" aria-label="AI编程">
              <svg
                viewBox="0 0 1448 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8751"
                width="32"
                height="32"
              >
                <path
                  d="M830.69204102 777.369332l202.7441114 56.71889982-121.01084855-238.24035081 183.64319921-225.03735499-274.93274359 65.81173664-134.8132156-222.91560675-54.13888506 278.11212959-273.86863313 93.41258714 201.68388457 87.04345884-136.93108022 92.35106576-162.41277156-68.99759534s-89.1665016-40.33651801-89.1665016-110.39563472 91.28954437-94.47281398 91.28954436-94.47281399l270.68406899-84.21100911 45.29330505-263.25083022s21.23042765-104.73720795 93.41258714-104.73720794 101.90475821 83.50548575 138.70589219 138.70589219l75.01202014 125.96504652 268.91572969-70.76852369s220.78997491-46.7056463 89.16650162 141.52928016l-191.07255435 223.62630826 113.22290631 220.7899749s87.75157129 179.7531117-118.88910033 155.68505617l-195.31475626-62.27635263-21.23042765-134.46110119z"
                  fill="#3b82f6"
                  p-id="8752"
                ></path>
              </svg>
            </Link>
          </div>
          {/* Desktop navigation */}
          {nav && (
            <nav className="flex grow">
              {/* Desktop sign in links */}
              <ul className="flex grow justify-end flex-wrap items-center">
                {loading ? (
                  // 加载状态显示 - 骨架屏效果
                  <>
                    <li>
                      <div className="h-8 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                    </li>
                    <li className="ml-3">
                      <div className="h-9 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                    </li>
                  </>
                ) : user ? (
                  // 已登录状态
                  <>
                    <li className="flex items-center">
                      <a
                        className="font-medium text-gray-600 decoration-blue-600 decoration-2 underline-offset-2 hover:underline px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                        href="/dashboard"
                        onClick={handleDashboardClick}
                        onMouseEnter={() => {
                          // 当用户悬停在链接上时，主动触发预加载
                          router.prefetch('/dashboard');
                        }}
                      >
                        {isNavigating ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            个人中心
                          </span>
                        ) : (
                          '个人中心'
                        )}
                      </a>
                    </li>
                    <li className="ml-3">
                      <Link
                        className="btn-sm text-white bg-blue-600 hover:bg-blue-700 w-full shadow-sm"
                        href="https://flowus.cn/yihui/share/824842ae-76da-4af0-988a-700baa336865"
                        target="_blank"
                      >
                        加入学习社区
                      </Link>
                    </li>
                  </>
                ) : (
                  // 未登录状态
                  <>
                    <li>
                      <Link
                        className="font-medium text-gray-600 decoration-blue-600 decoration-2 underline-offset-2 hover:underline px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                        href="/signin"
                      >
                        登录
                      </Link>
                    </li>
                    <li className="ml-3">
                      <Link
                        className="btn-sm text-white bg-blue-600 hover:bg-blue-700 w-full shadow-sm"
                        href="/signup"
                      >
                        加入学习社区
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
