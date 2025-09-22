'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Avatar from '@/public/images/yihui-avatar.png'
import { createClient } from '@/utils/supabase/client'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!agreedToTerms) {
      setError('请同意服务条款和隐私政策')
      return
    }

    if (password.length < 6) {
      setError('密码长度不能少于6个字符')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      // 检查是否需要邮箱验证
      if (data?.user?.identities?.length === 0) {
        // 已注册但未确认邮箱
        setError('该邮箱已注册，请检查邮箱或直接登录')
        return
      }

      // 注册成功
      if (data.user) {
        // 重定向到成功页面或登录页面
        router.push('/signup-success')
      }
    } catch (error: any) {
      console.error('注册失败:', error)
      setError(error.message || '注册失败，请稍后再试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Page header */}
      <div className="max-w-3xl mx-auto text-center pb-12">
        <div className="relative inline-flex mb-4">
          <svg className="absolute right-full bottom-full -ml-1 -mb-2" width="12" height="24" xmlns="http://www.w3.org/2000/svg">
            <path
              className="fill-blue-300"
              d="M4.868 1.243c-.23-.113-.128-.42.16-.85.091-.137.465-.41.553-.392.174.032.346.068.489.128.09.034.984.994 1.294 1.324.307.312.541.673.764 1.045L8.8 3.63c.223.378.441.757.65 1.143.07.128.129.264.174.406l.04.145c.141.575.384 1.09.646 1.595l.193.37a.33.33 0 0 0 .143.148c.197.097.929 1.746.961 1.989.11.59.129 1.223.224 1.817l.022.1a.228.228 0 0 1-.014.166c-.118.25-.03.404.013.58.062.243.116.49.145.747.015.128-.03.28-.051.423-.023.132-.254.177-.294.152-.11-.068-.176.062-.26.113l-.064.036a.158.158 0 0 1-.03.011c-.036.004-.97-.928-1.157-1.142l-.026-.03-.614-.906c-.344-.435-.589-.945-.664-1.035-.07-.101-.073-.235-.092-.359-.008-.063-.854-1.444-.881-1.5-.12-.314-.34-.574-.301-.975.007-.078-.031-.134-.063-.193-.27-.503-.449-1.058-.66-1.597-.106-.275-.265-.52-.394-.78-.023-.048-.021-.11-.035-.164l-.032-.135a.34.34 0 0 0-.025-.063c-.34-.597-.58-1.263-.996-1.81-.09-.13-.292-.906-.415-1.044-.063-.078.019-.551-.075-.595ZM.123 15.127c-.222-.082-.128-.38.156-.802.09-.135.455-.421.54-.418.167.009.328.02.464.052.08.025.915.736 1.227.949.295.213.538.47.767.74.474.541.974 1.06 1.47 1.583.11.117.2.25.278.401.225.455.548.817.892 1.155l.229.221a.245.245 0 0 0 .16.07c.19.011 1.22 1.105 1.312 1.293.24.45.417.974.658 1.432.03.068.096.107.079.221-.039.26.08.352.167.48.121.179.236.364.335.566.048.1.051.25.07.381.017.119-.178.26-.219.256-.117-.01-.141.13-.202.212a.484.484 0 0 1-.07.08c-.03.021-1.121-.354-1.355-.458l-.035-.017-.802-.512c-.43-.233-.789-.573-.88-.625-.089-.057-.126-.174-.178-.274l-1.18-.987c-.188-.232-.45-.392-.5-.762-.011-.073-.059-.111-.1-.152-.36-.365-.638-.81-.933-1.238-.15-.218-.335-.405-.501-.608-.03-.037-.038-.093-.06-.139l-.049-.117a.23.23 0 0 0-.033-.05c-.406-.47-.715-1.031-1.156-1.472-.104-.1-.343-.8-.463-.913-.069-.063 0-.516-.088-.548Z"
            />
          </svg>
          <Image className="rounded-full" src={Avatar} width={48} height={48} alt="头像" />
        </div>
        <h1 className="h2 font-cabinet-grotesk">欢迎加入AI编程学习平台</h1>
      </div>
      {/* Form */}
      <div className="max-w-sm mx-auto">
        <form onSubmit={handleSignUp}>
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
                placeholder="请设置您的密码" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <p className="text-xs text-gray-500 mt-1">密码至少需要6个字符</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between mt-6">
            <Link
              className="font-medium text-sm sm:text-base text-blue-600 decoration-blue-600 decoration-2 underline-offset-2 hover:underline"
              href="/signin"
            >
              返回登录
            </Link>
            <div className="ml-2">
              <button 
                type="submit"
                className="btn-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
                disabled={loading}
              >
                {loading ? '注册中...' : '注册加入学习社区'}
              </button>
            </div>
          </div>
          <div className="mt-5">
            <label className="flex items-start">
              <input 
                type="checkbox" 
                className="form-checkbox mt-0.5" 
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
              />
              <span className="text-sm text-gray-500 ml-3">
                我同意{' '}
                <a className="underline hover:decoration-blue-600 underline-offset-2 hover:underline" href="#0">
                  服务条款
                </a>{' '}
                和{' '}
                <a className="underline hover:decoration-blue-600 underline-offset-2 hover:underline" href="#0">
                  隐私政策
                </a>
                。
              </span>
            </label>
          </div>
        </form>
      </div>    
    </>
  )
}
