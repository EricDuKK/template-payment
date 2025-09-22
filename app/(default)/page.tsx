export const metadata = {
  title: 'AI编程学习 - 0基础入门',
  description: '小白0基础入门AI编程，借助AI编程工具快速开发出你的第一个AI应用和网站',
}

import Hero from '@/components/hero'
import Inspiration from '@/components/inspiration'
import Carousel from '@/components/carousel'
import Creatives from '@/components/creatives'
import Pricing from '@/components/pricing'
import Testimonials from '@/components/testimonials'
import Faqs from '@/components/faqs'
import Blog from '@/components/blog'
import Cta from '@/components/cta'

export default function Home() {
  return (
    <>
      <Hero />
      <Inspiration />
      <Carousel />
      <Creatives />
      <Pricing />
      <Testimonials />
      <Faqs />
      <Blog />
      <Cta />
    </>
  )
}
