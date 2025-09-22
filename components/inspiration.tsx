"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import SupabaseTutorial from "@/public/images/supabase-tutorial.png";
import AiBackendConcept from "@/public/images/ai-backend-concept.png";
import AiFrontConcept from "@/public/images/ai-front-concept.png";
import AiSql from "@/public/images/ai-sql.png";
import OotdMiniProgram from "@/public/images/ootd-miniprogoram.png";
import ZhihuChromeExtension from "@/public/images/zhihu-chrome-extension.png";
import ChunjieMovieDeepseek from "@/public/images/chunjie-movice-deepseek.png";
import DeepseekRemoteKefu from "@/public/images/deepseek-remote-kefu.png";
import AiTodoList from "@/public/images/ai-todolist.png";

// 提取分类数据
const categoryData = [
  { id: "0", name: "全部内容", count: "27+" },
  { id: "1", name: "基础知识", count: "9+" },
  { id: "2", name: "编程进阶", count: "8+" },
  { id: "3", name: "项目实战", count: "10+" },
  { id: "4", name: "AI工具箱", count: "5+" },
];

// 提取图片数据
const galleryData = [
  {
    id: 1,
    image: OotdMiniProgram,
    categories: ["0", "1", "3"], // 基础知识 + 项目实战
    title: "全栈天气OOTD小程序：AI生图",
    delay: 0,
  },
  {
    id: 2,
    image: ZhihuChromeExtension,
    categories: ["0", "1", "2", "3", "4"], // 基础知识 + 编程进阶 + 项目实战 + AI工具箱
    title: "开发Chrome插件：把上班刷知乎变成看飞书文档",
    delay: 500,
  },
  {
    id: 3,
    image: SupabaseTutorial,
    categories: ["0", "2", "3"], // 编程进阶 + 项目实战
    title: "出海必备-Supabase详细教程",
    delay: 100,
  },
  {
    id: 4,
    image: ChunjieMovieDeepseek,
    categories: ["0", "1", "3", "4"], // 基础知识 + 项目实战 + AI工具箱
    title: "AI毒舌电影小程序：DeepSeek如何评价春节档电影？",
    delay: 600,
  },
  {
    id: 5,
    image: DeepseekRemoteKefu,
    categories: ["0", "2", "3", "4"], // 编程进阶 + 项目实战 + AI工具箱
    title: "快速创建官网+添加满血版DeepSeek R1智能客服",
    delay: 700,
  },
  {
    id: 6,
    image: AiTodoList,
    categories: ["0", "2", "4"], // 编程进阶 + AI工具箱
    title: "用DeepSeek + Qwen-VL: 做个AI待办事项应用",
    delay: 800,
  },
  {
    id: 7,
    image: AiBackendConcept,
    categories: ["0", "1", "3", "4"], // 基础知识 + 项目实战 + AI工具箱
    title: "新手入门后端必要概念 + 最佳实践",
    delay: 200,
  },
  {
    id: 8,
    image: AiFrontConcept,
    categories: ["0", "1", "2", "4"], // 基础知识 + 编程进阶 + AI工具箱
    title: " AI时代下的前端核心概念+最佳实践",
    delay: 300,
  },
  {
    id: 9,
    image: AiSql,
    categories: ["0", "1", "2"], // 基础知识 + 编程进阶
    title: "AI时代的数据库开发 + 编写SQL指南",
    delay: 400,
  },
];

export default function Inspiration() {
  const [category, setCategory] = useState<string>("0");

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:pt-32 md:pb-20">
          {/* Section header */}
          <div className="pb-12 md:pb-14">
            <div className="relative text-center md:text-left">
              <svg
                className="fill-gray-300  hidden md:block absolute -ml-7 -mt-8"
                width="22"
                height="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.07 1.468c-.288-.134-.161-.496.199-1.005.115-.16.583-.483.693-.462.218.039.433.08.612.152.113.04 1.233 1.173 1.62 1.564.385.368.678.795.958 1.234l.841 1.337c.279.446.553.895.814 1.35.089.152.161.312.217.48l.051.17c.177.68.48 1.289.809 1.885l.242.439a.4.4 0 0 0 .179.173c.246.114 1.162 2.064 1.203 2.35.139.698.161 1.445.28 2.146l.028.118a.256.256 0 0 1-.017.196c-.148.296-.038.478.016.685.078.288.145.58.181.883.019.152-.036.331-.064.5-.028.156-.318.209-.367.18-.139-.081-.222.072-.327.133l-.08.043a.206.206 0 0 1-.037.013c-.045.004-1.215-1.096-1.449-1.349l-.032-.037-.77-1.069c-.43-.514-.737-1.116-.83-1.223-.088-.12-.091-.277-.116-.424-.01-.075-1.069-1.706-1.103-1.772-.151-.371-.426-.678-.377-1.151.01-.092-.039-.159-.078-.228-.34-.595-.563-1.25-.826-1.887-.134-.325-.333-.613-.494-.923-.03-.056-.028-.129-.044-.193l-.04-.159a.39.39 0 0 0-.032-.074c-.426-.706-.726-1.492-1.247-2.138-.112-.153-.366-1.07-.52-1.233-.079-.093.024-.652-.093-.704ZM.414 27.098c-.28.091-.397-.262-.414-.873-.006-.196.156-.74.244-.802.172-.117.342-.228.5-.3.098-.038 1.44.005 1.902-.03.446-.021.872.039 1.293.12.859.154 1.728.267 2.596.387.193.027.379.085.562.168.55.26 1.13.358 1.714.417l.386.037a.315.315 0 0 0 .21-.055c.199-.133 2.005.124 2.23.231.561.244 1.11.605 1.677.856.08.04.172.028.236.148.147.276.331.271.509.328.248.077.494.165.737.28.12.059.228.198.341.307.1.1.006.379-.037.407-.124.08-.048.23-.052.353a.583.583 0 0 1-.012.127c-.015.043-1.373.511-1.681.59l-.047.01-1.166.121c-.596.104-1.197.054-1.324.074-.13.013-.25-.07-.374-.124l-1.882-.043c-.352-.077-.728-.03-1.042-.341-.062-.06-.137-.061-.207-.069-.62-.073-1.214-.283-1.813-.465-.305-.092-.623-.129-.934-.196-.056-.012-.104-.059-.158-.086l-.132-.073a.27.27 0 0 0-.07-.023c-.74-.137-1.447-.433-2.202-.517-.175-.017-.911-.496-1.112-.512-.114-.008-.366-.487-.478-.451Z"
                  fillRule="evenodd"
                />
              </svg>
              <h2 className="h2 font-cabinet-grotesk">课程内容精选</h2>
            </div>
          </div>
          {/* Content */}
          <div>
            {/* Category buttons */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center md:justify-start -m-1.5">
                {categoryData.map((cat) => (
                  <button
                    key={cat.id}
                    className={`relative font-medium text-gray-800 text-sm pl-3 pr-1.5 py-1.5 border rounded-full inline-flex m-1.5 ${
                      category === cat.id
                        ? "bg-blue-100 border-blue-300"
                        : "bg-white border-gray-200"
                    }`}
                    onClick={() => setCategory(cat.id)}
                  >
                    <div className="flex items-center justify-center">
                      <span>{cat.name}</span>
                      <span
                        className={`text-xs font-semibold px-1 py-px rounded-full ml-2 ${
                          category === cat.id
                            ? "text-white bg-blue-300"
                            : "text-gray-400 bg-gray-100"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {/* Gallery */}
            <div className="relative">
              {/* Images grid */}
              <div
                className="max-w-sm mx-auto sm:max-w-none grid gap-6 sm:grid-cols-2 md:grid-cols-3 items-start"
                data-aos-id-inpspiration
              >
                {/* Gallery Images */}
                {galleryData.map((item) => (
                  <a
                    key={item.id}
                    className="relative group hover:shadow-xl transition duration-150 ease-in-out overflow-hidden"
                    style={
                      !item.categories.includes(category)
                        ? { display: "none" }
                        : {}
                    }
                    href="#0"
                    data-aos="fade-down"
                    data-aos-anchor="[data-aos-id-inpspiration]"
                    data-aos-delay={item.delay}
                  >
                    <Image
                      className="w-full aspect-square object-cover filter  brightness-75 opacity-80 transition-all duration-300 group-hover:brightness-100 group-hover:opacity-100"
                      src={item.image}
                      width="352"
                      height="352"
                      alt={`课程图片 ${item.id}`}
                    />
                    {/* Content on hover - 只显示标题 */}
                    <div className="md:hidden md:group-hover:block absolute bottom-0 left-0 right-0 p-4">
                      {/* Backdrop */}
                      <div
                        className="absolute inset-0 -mt-4 bg-gradient-to-t from-gray-800 to-transparent opacity-80 pointer-events-none"
                        aria-hidden="true"
                      />
                      {/* Content */}
                      <div className="relative flex justify-center">
                        <div className="font-bold text-white text-center text-lg">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              {/* CTA */}
              <div className="absolute bottom-0 left-0 right-0 h-[352px] bg-gradient-to-t from-white to-transparent">
                <div className="flex h-full items-end justify-center">
                  <Link
                    className="btn text-white bg-blue-500 hover:bg-blue-600 shadow-sm mb-6"
                    href="https://flowus.cn/yihui/824842ae-76da-4af0-988a-700baa336865"
                    target="_blank"
                  >
                    加入课程学习
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
