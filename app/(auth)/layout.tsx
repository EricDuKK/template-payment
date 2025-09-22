import Header from '@/components/ui/header'

export const metadata = {
  title: {
    template: '%s - AI编程学习',
    default: 'AI编程学习平台',
  },
  description: 'AI编程学习平台 - 探索AI编程的无限可能',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <>
      <Header nav={false} />

      <main className="grow bg-gray-50">
        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {children}

            </div>
          </div>
        </section>
      </main>
    </>
  )
}
