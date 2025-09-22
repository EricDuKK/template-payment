export default function Faqs() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-b border-gray-100">
          {/* Section header */}
          <div className="pb-12 md:pb-20">
            <h2 className="h2 font-cabinet-grotesk">常见问题</h2>
          </div>
          {/* Columns */}
          <div className="md:flex md:space-x-12 space-y-8 md:space-y-0">
            {/* Column */}
            <div className="w-full md:w-1/2 space-y-8">
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-cabinet-grotesk font-bold">零基础能学会AI编程吗？</h4>
                <p className="text-gray-500">是的，这个知识库就是为了零基础研发的。基于Cursor或Trae等AI工具，开发简单应用目前真的可以做到只用自然语言！</p>
              </div>
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-cabinet-grotesk font-bold">购买后我如何查看课程内容？</h4>
                <p className="text-gray-500">客服会邀请你进入知识库。知识库有效期是一年，这一年内为你提供专属的群内答疑服务。当然你可以下载源码永久保存！</p>
              </div>
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-cabinet-grotesk font-bold">课程的有效期是多久？</h4>
                <p className="text-gray-500">知识库有效期是一年，这一年内为你提供专属的群内答疑服务。当然你可以下载源码永久保存！</p>
              </div>
            </div>
            {/* Column */}
            <div className="w-full md:w-1/2 space-y-8">
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-cabinet-grotesk font-bold">实战项目有哪些内容？</h4>
                <p className="text-gray-500">实战项目会每周更新，不仅是目录上显示的这些，我会使用最新、最热的技术。确保我们的学员跟得上AI发展的浪潮！</p>
              </div>
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-cabinet-grotesk font-bold">购买前须知</h4>
                <p className="text-gray-500">虚拟商品有可复制性，发货后不支持退换货。一个客观事实是免费的往往更贵，知识的创作、传播以及售后维护是需要成本的，如果您认可我们的价值，欢迎花一顿饭钱订阅服务。</p>
              </div>
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-cabinet-grotesk font-bold">可以推广我的产品吗？</h4>
                <p className="text-gray-500">如果学员中有开发出自己的小产品并愿意开源，可以联系我。我愿意做一个视频，在B站工房售卖你的产品或者源码，收入的80%都分到你。不为赚钱，只是交个朋友，分享创意和好产品。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}