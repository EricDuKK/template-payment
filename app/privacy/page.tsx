import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '隐私条款 - AI编程',
  description: '了解我们如何收集、使用和保护您的个人信息',
};

export default function PrivacyPage() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="h1 font-playfair-display text-center mb-8">隐私条款</h1>
          
          <div className="text-lg text-gray-600">
            <p className="mb-4">
              最后更新日期：2025年3月14日
            </p>
            
            <h2 className="h3 font-playfair-display mb-4 mt-8">概述</h2>
            <p className="mb-4">
              AI编程（"我们"、"我们的"或"本网站"）尊重您的隐私，并致力于保护您的个人信息。本隐私政策描述了我们在您访问网站时如何收集、使用和共享您的信息。
            </p>
            
            <h2 className="h3 font-playfair-display mb-4 mt-8">我们收集的信息</h2>
            <p className="mb-2">我们可能收集以下类型的信息：</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong className="font-medium text-gray-900">个人信息</strong>：包括您的姓名、电子邮件地址、电话号码等您在注册账户、订阅我们的通讯或填写联系表单时提供的信息。</li>
              <li><strong className="font-medium text-gray-900">使用数据</strong>：关于您如何使用我们网站的信息，如访问的页面、点击的链接、访问时间等。</li>
              <li><strong className="font-medium text-gray-900">设备信息</strong>：关于您用于访问我们网站的设备的信息，包括IP地址、浏览器类型、操作系统等。</li>
              <li><strong className="font-medium text-gray-900">Cookie</strong>：我们使用cookie和类似技术来收集有关您的浏览活动的信息，并改善您的体验。</li>
            </ul>
            
            <h2 className="h3 font-playfair-display mb-4 mt-8">我们如何使用您的信息</h2>
            <p className="mb-2">我们可能将您的信息用于以下目的：</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>提供、维护和改进我们的网站和服务</li>
              <li>处理和回复您的查询和请求</li>
              <li>向您发送技术通知、更新、安全警报和支持信息</li>
              <li>发送营销和促销通讯（您可以随时选择退订）</li>
              <li>监控和分析趋势、使用情况和活动</li>
              <li>防止欺诈行为和增强安全性</li>
              <li>遵守法律法规要求</li>
            </ul>
            
            <h2 className="h3 font-playfair-display mb-4 mt-8">信息共享与披露</h2>
            <p className="mb-2">我们不会出售您的个人信息。我们可能在以下情况下共享您的信息：</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong className="font-medium text-gray-900">服务提供商</strong>：我们可能与帮助我们运营网站和提供服务的第三方服务提供商共享信息。</li>
              <li><strong className="font-medium text-gray-900">法律要求</strong>：如果法律要求或为了保护我们的权利，我们可能会披露您的信息。</li>
              <li><strong className="font-medium text-gray-900">业务转让</strong>：如果我们参与合并、收购、资产出售或破产时，您的信息可能被转让。</li>
              <li><strong className="font-medium text-gray-900">征得同意</strong>：在您同意的情况下，我们可能会以其他方式共享您的信息。</li>
            </ul>
            
            <h2 className="h3 font-playfair-display mb-4 mt-8">您的权利</h2>
            <p className="mb-2">根据适用的数据保护法，您可能拥有以下权利：</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>访问、更正或删除您的个人信息</li>
              <li>限制或反对处理您的个人信息</li>
              <li>数据可携带性：接收您提供给我们的信息的电子副本</li>
              <li>撤回同意：对于基于同意处理的活动随时撤回同意</li>
              <li>投诉：向数据保护监管机构提出投诉</li>
            </ul>
            <p className="mb-4">
              如需行使上述权利，请通过<Link href="/contact" className="text-blue-600 hover:underline">联系我们</Link>。
            </p>
            
            <h2 className="h3 font-playfair-display mb-4 mt-8">数据安全</h2>
            <p className="mb-4">
              我们采取合理的技术和组织措施来保护您的个人信息不被未经授权的访问、使用或披露。然而，请注意，互联网传输不能保证100%的安全性。
            </p>
            
            <h2 className="h3 font-playfair-display mb-4 mt-8">第三方链接</h2>
            <p className="mb-4">
              我们的网站可能包含指向第三方网站的链接。我们不对这些网站的隐私做法或内容负责。
            </p>
            
            <h2 className="h3 font-playfair-display mb-4 mt-8">儿童隐私</h2>
            <p className="mb-4">
              我们的网站不面向13岁以下的儿童，我们不会故意收集13岁以下儿童的个人信息。
            </p>
            
            <h2 className="h3 font-playfair-display mb-4 mt-8">本政策的变更</h2>
            <p className="mb-4">
              我们可能会不时更新本隐私政策。更新后的版本将在本页面上注明新的生效日期。我们鼓励您定期查看本政策以了解任何变化。
            </p>
            
            <h2 className="h3 font-playfair-display mb-4 mt-8">联系我们</h2>
            <p className="mb-4">
              如果您对本隐私政策有任何疑问或建议，请<Link href="/contact" className="text-blue-600 hover:underline">联系我们</Link>。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 