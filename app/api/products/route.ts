import { NextResponse } from "next/server";

// 产品数据定义
interface ProductFeature {
  id: string;
  text: string;
}

interface Product {
  id: string;
  name: string;
  title: string; // 产品标题
  description: string;
  price: string;
  priceLabel: string; // 价格标签
  isSubscription: boolean;
  subscriptionPeriod?: string;
  features: ProductFeature[]; // 产品特性列表
}

// 产品数据库（实际应用中可存储在数据库中，简单产品可以写死在服务端该接口中）
const products: Record<string, Product> = {
  "basic-onetime": {
    id: "basic-onetime",
    name: "基础版AI编程教程",
    title: "基础版",
    description: "探索入门教程，学习AI编程基础知识，参与社区讨论。",
    price: "0.1",
    priceLabel: "/一次性",
    isSubscription: false,
    features: [
      { id: "basic-1", text: "基础入门视频教程" },
      { id: "basic-2", text: "社区讨论区交流" },
      { id: "basic-3", text: "AI开发工具介绍" },
      { id: "basic-4", text: "编程环境搭建指南" },
    ],
  },
  "pro-monthly": {
    id: "pro-monthly",
    name: "专业版AI编程教程 (月付)",
    title: "专业版",
    description: "获得完整课程内容和项目源码，一年内享受专业答疑服务。",
    price: "0.1",
    priceLabel: "/月",
    isSubscription: true,
    subscriptionPeriod: "monthly",
    features: [
      { id: "pro-1", text: "进阶课程和视频教程" },
      { id: "pro-2", text: "20+实战项目源码" },
      { id: "pro-3", text: "一年专属群内答疑服务" },
      { id: "pro-4", text: "项目实战指导" },
      { id: "pro-5", text: "产品创意分享与推广机会" },
    ],
  },
  "pro-yearly": {
    id: "pro-yearly",
    name: "专业版AI编程教程 (年付)",
    title: "专业版",
    description: "获得完整课程内容和项目源码，一年内享受专业答疑服务。",
    price: "1",
    priceLabel: "/年",
    isSubscription: true,
    subscriptionPeriod: "yearly",
    features: [
      { id: "pro-1", text: "进阶课程和视频教程" },
      { id: "pro-2", text: "20+实战项目源码" },
      { id: "pro-3", text: "一年专属群内答疑服务" },
      { id: "pro-4", text: "项目实战指导" },
      { id: "pro-5", text: "产品创意分享与推广机会" },
    ],
  },
};

// GET请求处理函数 - 获取所有产品
export async function GET() {
  return NextResponse.json({ products });
}
