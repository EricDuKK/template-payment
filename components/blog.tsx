import Image from "next/image";
import OotdMiniProgram from "@/public/images/ootd-miniprogoram.png";
import ZhihuChromeExtension from "@/public/images/zhihu-chrome-extension.png";
import SupabaseTutorial from "@/public/images/supabase-tutorial.png";
import YihuiAvatar from "@/public/images/yihui-avatar.png";

export default function Blog() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 md:pb-20">
            <h2 className="h2 font-cabinet-grotesk text-center md:text-left">
              最新教程文章
            </h2>
          </div>
          {/* Posts */}
          <div className="max-w-sm mx-auto md:max-w-none grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start">
            {/* 1st Post */}
            <article
              className="h-full flex flex-col space-y-5"
              data-aos="fade-down"
            >
              {/* Image */}
              <a className="block group overflow-hidden" href="#0">
                <Image
                  className="w-full aspect-[7/4] object-cover group-hover:scale-105 transition duration-700 ease-out"
                  src={OotdMiniProgram}
                  width={347}
                  height={198}
                  alt="全栈天气OOTD小程序"
                />
              </a>
              {/* Content */}
              <div className="grow flex flex-col">
                <header>
                  <h3 className="h4 font-cabinet-grotesk font-bold mb-2">
                    <a
                      className="inline-block decoration-blue-600 decoration-2 underline-offset-2 hover:underline"
                      href="https://flowus.cn/yihui/share/1368554a-cff5-46cb-9e5a-ce2e718d5f24"
                      target="_blank"
                    >
                      全栈天气OOTD小程序：AI生图
                    </a>
                  </h3>
                </header>
                <p className="text-gray-500 grow">
                  学习如何开发一个结合天气信息和AI生成图像的时尚搭配小程序，从前端到后端的全栈开发实战教程。
                </p>
                <footer className="flex items-center text-sm mt-4">
                  <a href="#0">
                    <Image
                      className="rounded-full shrink-0 mr-3"
                      src={YihuiAvatar}
                      width={32}
                      height={32}
                      alt="作者头像"
                    />
                  </a>
                  <div>
                    <a
                      className="font-medium decoration-blue-600 decoration-2 underline-offset-2 hover:underline"
                      href="#0"
                    >
                      熠辉
                    </a>
                  </div>
                </footer>
              </div>
            </article>
            {/* 2nd Post */}
            <article
              className="h-full flex flex-col space-y-5"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              {/* Image */}
              <a className="block group overflow-hidden" href="#0">
                <Image
                  className="w-full aspect-[7/4] object-cover group-hover:scale-105 transition duration-700 ease-out"
                  src={ZhihuChromeExtension}
                  width={347}
                  height={198}
                  alt="Chrome插件开发"
                />
              </a>
              {/* Content */}
              <div className="grow flex flex-col">
                <header>
                  <h3 className="h4 font-cabinet-grotesk font-bold mb-2">
                    <a
                      className="inline-block decoration-blue-600 decoration-2 underline-offset-2 hover:underline"
                      href="https://flowus.cn/yihui/share/ef258111-1c2f-4d9a-a788-5e8482d0bfb7"
                      target="_blank"
                    >
                      开发Chrome插件：把上班刷知乎变成看飞书文档
                    </a>
                  </h3>
                </header>
                <p className="text-gray-500 grow">
                  本教程教你如何开发一个实用的Chrome浏览器扩展，让你的浏览器界面伪装成工作场景，提高职场"摸鱼"技能。
                </p>
                <footer className="flex items-center text-sm mt-4">
                  <a href="#0">
                    <Image
                      className="rounded-full shrink-0 mr-3"
                      src={YihuiAvatar}
                      width={32}
                      height={32}
                      alt="作者头像"
                    />
                  </a>
                  <div>
                    <a
                      className="font-medium decoration-blue-600 decoration-2 underline-offset-2 hover:underline"
                      href="#0"
                    >
                      熠辉
                    </a>
                  </div>
                </footer>
              </div>
            </article>
            {/* 3rd Post */}
            <article
              className="h-full flex flex-col space-y-5"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              {/* Image */}
              <a className="block group overflow-hidden" href="#0">
                <Image
                  className="w-full aspect-[7/4] object-cover group-hover:scale-105 transition duration-700 ease-out"
                  src={SupabaseTutorial}
                  width={347}
                  height={198}
                  alt="Supabase教程"
                />
              </a>
              {/* Content */}
              <div className="grow flex flex-col">
                <header>
                  <h3 className="h4 font-cabinet-grotesk font-bold mb-2">
                    <a
                      className="inline-block decoration-blue-600 decoration-2 underline-offset-2 hover:underline"
                      href="https://flowus.cn/yihui/share/72e5e694-28a6-42cc-97e5-3aaaf1cc5864"
                      target="_blank"
                    >
                      出海必备-Supabase详细教程
                    </a>
                  </h3>
                </header>
                <p className="text-gray-500 grow">
                  全面介绍Supabase这款开源Firebase替代品，学习如何利用它快速构建数据库、认证系统和API，加速你的出海项目开发。
                </p>
                <footer className="flex items-center text-sm mt-4">
                  <a href="#0">
                    <Image
                      className="rounded-full shrink-0 mr-3"
                      src={YihuiAvatar}
                      width={32}
                      height={32}
                      alt="作者头像"
                    />
                  </a>
                  <div>
                    <a
                      className="font-medium decoration-blue-600 decoration-2 underline-offset-2 hover:underline"
                      href="#0"
                    >
                      熠辉
                    </a>
                  </div>
                </footer>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
