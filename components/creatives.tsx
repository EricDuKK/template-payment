import Link from "next/link";
import Image from "next/image";
import Notion1 from "@/public/images/notion_1.png";
import Notion2 from "@/public/images/notion_2.png";
import Notion3 from "@/public/images/notion_3.png";
import Notion4 from "@/public/images/notion_4.png";
import Notion5 from "@/public/images/notion_5.png";
import Notion6 from "@/public/images/notion_6.png";
import Notion7 from "@/public/images/notion_7.png";

export default function Creatives() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-cabinet-grotesk">
              加入超过400名学员的AI编程课
            </h2>
          </div>
          {/* Section content */}
          <div className="max-w-xl mx-auto text-center">
            {/* Content */}
            <div>
              {/* 堆叠的头像组 */}
              <div className="flex items-center justify-center -space-x-3 mb-10">
                <Image
                  className="rounded-full border-2 border-white relative z-10 w-12 h-12 md:w-16 md:h-16"
                  src={Notion1}
                  width={64}
                  height={64}
                  alt="学员头像 1"
                />
                <Image
                  className="rounded-full border-2 border-white relative z-20 w-12 h-12 md:w-16 md:h-16"
                  src={Notion2}
                  width={64}
                  height={64}
                  alt="学员头像 2"
                />
                <Image
                  className="rounded-full border-2 border-white relative z-30 w-12 h-12 md:w-16 md:h-16"
                  src={Notion3}
                  width={64}
                  height={64}
                  alt="学员头像 3"
                />
                <Image
                  className="rounded-full border-2 border-white relative z-40 w-12 h-12 md:w-16 md:h-16"
                  src={Notion4}
                  width={64}
                  height={64}
                  alt="学员头像 4"
                />
                <Image
                  className="rounded-full border-2 border-white relative z-50 w-12 h-12 md:w-16 md:h-16"
                  src={Notion5}
                  width={64}
                  height={64}
                  alt="学员头像 5"
                />
                <Image
                  className="rounded-full border-2 border-white relative z-60 w-12 h-12 md:w-16 md:h-16"
                  src={Notion6}
                  width={64}
                  height={64}
                  alt="学员头像 6"
                />
                <Image
                  className="rounded-full border-2 border-white relative z-70 w-12 h-12 md:w-16 md:h-16"
                  src={Notion7}
                  width={64}
                  height={64}
                  alt="学员头像 7"
                />
                <div className="rounded-full bg-blue-500 text-white text-xs font-bold border-2 border-white relative z-80 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                  <span>+400</span>
                </div>
              </div>

              <h3 className="h3 font-cabinet-grotesk text-4xl mb-4">
                不止于一个学习社区
              </h3>
              <p className="text-xl text-gray-500 mb-6">
                我们的AI编程学习社区不仅提供专业课程，还有来自全国各地志同道合的学员，在群内讨论学习，互相帮助，共同进步。
              </p>
              <div>
                <Link
                  className="btn text-white bg-blue-500 hover:bg-blue-600 shadow-sm"
                  href="https://flowus.cn/yihui/share/824842ae-76da-4af0-988a-700baa336865"
                  target="_blank"
                >
                  加入学习社区
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
