"use client";

import { useEffect } from "react";

import Image from "next/image";
import TestimonialsImage01 from "@/public/images/notion_9.png";
import TestimonialsImage02 from "@/public/images/notion_12.png";
import TestimonialsImage03 from "@/public/images/notion_13.png";

// Import Swiper
import Swiper, { Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css/pagination";
Swiper.use([Pagination]);

export default function Testimonials() {
  useEffect(() => {
    const testimonial = new Swiper(".testimonial-carousel", {
      slidesPerView: 1,
      watchSlidesProgress: true,
      pagination: {
        el: ".testimonial-carousel-pagination",
        clickable: true,
      },
    });
  }, []);

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-8">
          <div className="relative">
            {/* Gray box */}
            <div
              className="absolute inset-0 bg-gray-100 rotate-2 -z-10"
              aria-hidden="true"
            />
            {/* Content */}
            <div className="relative px-6 pb-8 md:px-12 lg:pb-0">
              {/* Carousel built with Swiper.js [https://swiperjs.com/] */}
              {/* * Custom styles in src/css/additional-styles/theme.scss */}
              <div className="testimonial-carousel swiper-container">
                <div className="swiper-wrapper">
                  {/* Testimonial */}
                  <div className="swiper-slide space-y-8 lg:flex items-center lg:space-y-0 lg:space-x-8 text-center lg:text-left">
                    <div className="shrink-0 relative inline-flex">
                      <Image
                        className=" object-cover object-center"
                        src={TestimonialsImage01}
                        width={180}
                        height={180}
                        alt="学员评价 01"
                      />
                      <div className="absolute right-0 bottom-0 mr-4 mb-6">
                        <a
                          className="flex items-center font-cabinet-grotesk font-bold decoration-blue-500 decoration-2 underline-offset-2 hover:underline px-3 py-1 bg-white  shadow-sm"
                          href="https://flowus.cn/yihui/share/824842ae-76da-4af0-988a-700baa336865"
                          target="_blank"
                        >
                          <span>@小明同学</span>
                        </a>
                      </div>
                    </div>
                    <div className="relative">
                      <h4 className="h3 font-cabinet-grotesk mb-4">
                        作为零基础学员，我使用AI编程课程学习编程已经1个月了，现在已经能独立开发小型应用，这是我从未想过的进步速度！
                      </h4>
                      <div>
                        <a
                          className="btn-sm text-white bg-blue-500 hover:bg-blue-600 group shadow-sm"
                          href="https://flowus.cn/yihui/share/824842ae-76da-4af0-988a-700baa336865"
                          target="_blank"
                        >
                          查看详情{" "}
                          <span className="tracking-normal text-blue-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                            -&gt;
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* Testimonial */}
                  <div className="swiper-slide space-y-8 lg:flex items-center lg:space-y-0 lg:space-x-8 text-center lg:text-left">
                    <div className="shrink-0 relative inline-flex">
                      <Image
                        className=" object-cover object-center"
                        src={TestimonialsImage02}
                        width={180}
                        height={180}
                        alt="学员评价 02"
                      />
                      <div className="absolute right-0 bottom-0 mr-4 mb-6">
                        <a
                          className="flex items-center font-cabinet-grotesk font-bold decoration-blue-500 decoration-2 underline-offset-2 hover:underline px-3 py-1 bg-white  shadow-sm"
                          href="https://flowus.cn/yihui/share/824842ae-76da-4af0-988a-700baa336865"
                          target="_blank"
                        >
                          <span>@媛小张</span>
                        </a>
                      </div>
                    </div>
                    <div className="relative">
                      <h4 className="h3 font-cabinet-grotesk mb-4">
                        如果你想要学习真正实用的AI编程技能，并且能够立即应用到工作中
                        - AI编程课程绝对是市场上最好的选择。
                      </h4>
                      <div>
                        <a
                          className="btn-sm text-white bg-blue-500 hover:bg-blue-600 group shadow-sm"
                          href="https://flowus.cn/yihui/share/824842ae-76da-4af0-988a-700baa336865"
                          target="_blank"
                        >
                          查看详情{" "}
                          <span className="tracking-normal text-blue-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                            -&gt;
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* Testimonial */}
                  <div className="swiper-slide space-y-8 lg:flex items-center lg:space-y-0 lg:space-x-8 text-center lg:text-left">
                    <div className="shrink-0 relative inline-flex">
                      <Image
                        className=" object-cover object-center"
                        src={TestimonialsImage03}
                        width={180}
                        height={180}
                        alt="学员评价 03"
                      />
                      <div className="absolute right-0 bottom-0 mr-4 mb-6">
                        <a
                          className="flex items-center font-cabinet-grotesk font-bold decoration-blue-500 decoration-2 underline-offset-2 hover:underline px-3 py-1 bg-white  shadow-sm"
                          href="https://flowus.cn/yihui/share/824842ae-76da-4af0-988a-700baa336865"
                          target="_blank"
                        >
                          <span>@王老师</span>
                        </a>
                      </div>
                    </div>
                    <div className="relative">
                      <h4 className="h3 font-cabinet-grotesk mb-4">
                        46岁开始学编程，多亏了AI编程课程的系统指导，我成功开发了自己的第一个网站。这门课真的适合各个年龄段的学习者！
                      </h4>
                      <div>
                        <a
                          className="btn-sm text-white bg-blue-500 hover:bg-blue-600 group shadow-sm"
                          href="https://flowus.cn/yihui/share/824842ae-76da-4af0-988a-700baa336865"
                          target="_blank"
                        >
                          查看详情{" "}
                          <span className="tracking-normal text-blue-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                            -&gt;
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Bullets */}
              <div className="mt-4 lg:absolute bottom-0 right-0 lg:mt-0 lg:mr-12 lg:mb-16 z-10">
                <div className="testimonial-carousel-pagination text-center" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
