'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PaymentSuccess() {
  // 页面加载完成后的动画效果
  useEffect(() => {
    const timeout = setTimeout(() => {
      const successIcon = document.getElementById('success-icon');
      if (successIcon) {
        successIcon.classList.add('scale-100');
        successIcon.classList.remove('scale-0');
      }
      
      const text = document.getElementById('success-text');
      if (text) {
        text.classList.add('opacity-100');
        text.classList.remove('opacity-0');
      }
      
      const button = document.getElementById('dashboard-button');
      if (button) {
        button.classList.add('opacity-100');
        button.classList.remove('opacity-0');
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div 
            id="success-icon" 
            className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center transform transition-transform duration-700 scale-0"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-green-500"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          
          <h2 
            id="success-text" 
            className="mt-6 text-3xl font-extrabold text-gray-900 transition-opacity duration-700 delay-300 opacity-0"
          >
            支付成功！
          </h2>
          
          <p className="mt-2 text-gray-600">
            感谢您的付款，您的订单已经处理完成。
          </p>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <Link 
            href="/dashboard" 
            id="dashboard-button"
            className="group w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-opacity duration-700 delay-500 opacity-0"
          >
            <span className="flex items-center">
              <span className="mr-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                  />
                </svg>
              </span>
              前往个人中心
            </span>
          </Link>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        如有任何问题，请<Link href="/contact" className="text-blue-600 hover:text-blue-800">联系我们</Link>
      </div>
    </div>
  );
} 