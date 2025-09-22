import Link from 'next/link'

export const metadata = {
  title: '注册成功 - AI编程学习',
  description: '感谢您注册AI编程学习平台',
}

export default function SignupSuccess() {
  return (
    <div className="max-w-md mx-auto py-12">
      <div className="text-center">
        <svg 
          className="w-16 h-16 text-green-500 mx-auto mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        
        <h1 className="h2 font-cabinet-grotesk mb-4">注册成功！</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          我们已向您的邮箱发送了一封验证邮件，请查收并点击邮件中的链接完成验证。
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link 
            href="/signin" 
            className="btn-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            返回登录
          </Link>
          
          <Link 
            href="/" 
            className="btn-sm text-gray-600 bg-gray-100 hover:bg-gray-200 shadow-sm"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
} 