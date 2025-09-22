"use client";

import { useEffect } from "react";
import Image from "next/image";
import Category01 from "@/public/images/category-1.png";
import Category02 from "@/public/images/category-2.png";
import Category03 from "@/public/images/category-3.png";
import Category04 from "@/public/images/category-4.png";
import Category05 from "@/public/images/category-5.png";

// Import Swiper
import Swiper, { Navigation } from "swiper";
import "swiper/swiper.min.css";
Swiper.use([Navigation]);

// 课程卡片数据
const carouselItems = [
  {
    id: 1,
    image: Category01,
    title: "AI编程实战课程",
    courseCount: "20+",
    alt: "AI编程实战",
  },
  {
    id: 2,
    image: Category02,
    title: "AI编程工具",
    courseCount: "13+",
    alt: "AI编程工具",
  },
  {
    id: 3,
    image: Category03,
    title: "网站、小程序、插件开发",
    courseCount: "10+",
    alt: "网站、小程序、插件开发",
  },
  {
    id: 4,
    image: Category04,
    title: "智能体、工作流",
    courseCount: "10+",
    alt: "智能体、工作流",
  },
  {
    id: 5,
    image: Category05,
    title: "编程基础+概念课程",
    courseCount: "16",
    alt: "编程基础+概念课程",
  },
];

export default function Carousel() {
  useEffect(() => {
    const carousel = new Swiper(".carousel", {
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        },
      },
      grabCursor: true,
      loop: false,
      centeredSlides: false,
      initialSlide: 0,
      spaceBetween: 24,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".carousel-next",
        prevEl: ".carousel-prev",
      },
    });
  }, []);

  return (
    <section className="bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-cabinet-grotesk text-gray-100">
              热门课程分类
            </h2>
          </div>
          {/* Carousel built with Swiper.js [https://swiperjs.com/] */}
          {/* * Custom styles in src/css/additional-styles/theme.scss */}
          <div className="carousel swiper-container max-w-sm mx-auto sm:max-w-none ">
            <div className="swiper-wrapper">
              {/* 循环渲染课程卡片 */}
              {carouselItems.map((item) => (
                <div
                  key={item.id}
                  className="swiper-slide h-auto flex flex-col"
                >
                  {/* Image */}
                  <Image
                    className="w-full aspect-[7/4] object-cover"
                    src={item.image}
                    width={259}
                    height={148}
                    alt={item.alt}
                  />
                  {/* White box */}
                  <div className="grow bg-white px-4 py-6">
                    {/* Title */}
                    <a
                      className="inline-block font-cabinet-grotesk font-bold text-xl decoration-blue-500 decoration-2 underline-offset-2 hover:underline"
                      href="#0"
                    >
                      {item.title}
                    </a>
                    <div className="text-sm text-gray-500 italic">
                      {item.courseCount} 个课程
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Arrows */}
          <div className="flex mt-12 space-x-4 justify-end">
            <button className="carousel-prev relative z-20 w-14 h-14 rounded-full flex items-center justify-center group bg-gray-700 hover:bg-blue-500 transition duration-150 ease-in-out">
              <span className="sr-only">上一个</span>
              <svg
                className="w-4 h-4 fill-gray-400 group-hover:fill-white transition duration-150 ease-in-out"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
              </svg>
            </button>
            <button className="carousel-next relative z-20 w-14 h-14 rounded-full flex items-center justify-center group bg-gray-700 hover:bg-blue-500 transition duration-150 ease-in-out">
              <span className="sr-only">下一个</span>
              <svg
                className="w-4 h-4 fill-gray-400 group-hover:fill-white transition duration-150 ease-in-out"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
