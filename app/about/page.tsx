import Link from 'next/link';

export const metadata = {
  title: '关于我们 - AI编程',
  description: '了解AI编程的使命、愿景和团队',
};

export default function AboutPage() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="h1 font-playfair-display text-center mb-8">关于我们</h1>
          
          <div className="text-lg text-gray-600 mb-8">
            <p className="mb-4">
              欢迎来到<strong className="font-medium text-gray-900">AI编程</strong>！我们是一个致力于帮助开发者和AI爱好者学习、成长和探索AI技术的平台。
            </p>
            
            <h2 className="h3 font-playfair-display mb-4 mt-6">我们的使命</h2>
            <p className="mb-4">
              我们的使命是通过提供高质量的教程、资源和工具，使AI技术更加平易近人，帮助开发者掌握AI编程技能，推动AI技术的普及与应用。
            </p>
            
            <h2 className="h3 font-playfair-display mb-4 mt-6">我们的愿景</h2>
            <p className="mb-4">
              我们希望成为中文世界最具影响力的AI编程学习平台，连接全球AI爱好者，共同创造AI驱动的未来。
            </p>
            
            <h2 className="h3 font-playfair-display mb-4 mt-6">我们的团队</h2>
            <p className="mb-4">
              我们的团队由一群热爱技术、热爱分享的开发者、设计师和内容创作者组成。我们来自不同的背景，但都有着共同的热情——探索AI技术的无限可能，并将这些知识分享给更多人。
            </p>
            
            <h2 className="h3 font-playfair-display mb-4 mt-6">我们的价值观</h2>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong className="font-medium text-gray-900">开放分享</strong>：我们相信知识的开放与分享能推动技术的进步</li>
              <li><strong className="font-medium text-gray-900">持续学习</strong>：在快速发展的AI领域，保持学习的好奇心和热情</li>
              <li><strong className="font-medium text-gray-900">精益求精</strong>：追求高质量的内容和用户体验</li>
              <li><strong className="font-medium text-gray-900">社区驱动</strong>：重视用户反馈，与社区共同成长</li>
            </ul>
            
            <p className="mb-4 mt-6">
              无论你是AI领域的新手，还是经验丰富的开发者，我们都欢迎你加入我们的社区，一起学习、成长、创造！
            </p>
            
            <div className="flex justify-center mt-8">
              <Link href="/contact" className="btn text-white bg-blue-600 hover:bg-blue-700 mb-4 sm:mb-0">
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 