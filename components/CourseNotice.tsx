"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CourseNotice() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-blue-50 border border-blue-200 shadow-lg rounded-lg p-3 max-w-xs text-sm z-50">
      <button
        onClick={handleClose}
        className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
        aria-label="关闭通知"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <p className="text-gray-700 mb-2 text-xs">
        供《从 0 到 1 入门 AI
        编程》课程会员学习使用，若上线项目前请务必经过完整的测试。部署在海外可能有延迟
      </p>
      <Link
        href="https://flowus.cn/yihui/share/824842ae-76da-4af0-988a-700baa336865"
        target="_blank"
        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center text-xs"
      >
        <span>源码下载 + 课程详情</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </Link>
    </div>
  );
}
