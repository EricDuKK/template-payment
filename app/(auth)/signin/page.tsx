'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        throw error
      }

      // 登录成功，刷新页面获取新的session
      router.refresh()
      // 重定向到首页
      router.push('/')
    } catch (error: any) {
      console.error('登录失败:', error)
      setError(error.message || '登录失败，请检查您的邮箱和密码')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Page header */}
      <div className="max-w-3xl mx-auto text-center pb-12">
        <h1 className="h2 font-cabinet-grotesk">欢迎回来，AI编程学习者！</h1>
      </div>
      {/* Form */}
      <div className="max-w-sm mx-auto">
        <form onSubmit={handleSignIn}>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}
          <div className="flex flex-wrap mb-4">
            <div className="w-full">
              <label className="block text-gray-500 text-sm font-medium mb-1" htmlFor="email">
                邮箱
              </label>
              <input 
                id="email" 
                type="email" 
                className="form-input w-full text-gray-800" 
                placeholder="请输入您的邮箱" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full">
              <label className="block text-gray-500 text-sm font-medium mb-1" htmlFor="password">
                密码
              </label>
              <input 
                id="password" 
                type="password" 
                className="form-input w-full text-gray-800" 
                placeholder="请输入您的密码" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between mt-6">
            <Link
              className="font-medium text-sm sm:text-base text-blue-600 decoration-blue-600 decoration-2 underline-offset-2 hover:underline"
              href="/signup"
            >
              注册新账号
            </Link>
            <div className="ml-2">
              <button 
                type="submit"
                className="btn-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
                disabled={loading}
              >
                {loading ? '登录中...' : '登录账号'}
              </button>
            </div>
          </div>
        </form>
      </div>    
    </>
  )
}
