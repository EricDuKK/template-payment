import './css/style.css'

import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import CourseNotice from '@/components/CourseNotice'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const cabinet = localFont({
  src: [
    {
      path: '../public/fonts/CabinetGrotesk-Medium.woff2',
      weight: '500',
    },
    {
      path: '../public/fonts/CabinetGrotesk-Bold.woff2',
      weight: '700',
    },
    {
      path: '../public/fonts/CabinetGrotesk-Extrabold.woff2',
      weight: '800',
    },
  ],
  variable: '--font-cabinet-grotesk',
  display: 'swap',
})

export const metadata = {
  title: 'AI编程学习 - 小白0基础入门',
  description: '借助AI编程工具，即使没有编程基础，也能快速开发出属于你的第一个AI应用和网站',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${cabinet.variable} font-inter antialiased bg-white text-gray-800 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden">
          {children}
        </div>
        
        {/* 课程通知组件 */}
        <CourseNotice />
      </body>
    </html>
  )
}
