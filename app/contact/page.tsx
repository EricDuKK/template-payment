import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系我们 - AI编程',
  description: '有任何问题或建议？请随时联系我们',
};

export default function ContactPage() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center">
          <h1 className="h1 font-playfair-display text-center mb-8">联系我们</h1>
          
          <div className="text-lg text-gray-600 mb-8 w-full text-center">
            <p className="mb-8">
              我们很乐意听取您的意见、建议或问题。请通过以下方式联系我们，我们会尽快回复。
            </p>
            
            <div className="bg-gray-50 p-8 rounded-lg max-w-xl mx-auto shadow-sm">
              <h2 className="h4 font-playfair-display mb-6 text-center">联系方式</h2>
              <ul className="space-y-6 flex flex-col items-center">
                <li className="flex flex-col items-center">
                  <svg className="w-6 h-6 text-blue-600 mb-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />
                    <path d="M9 4H7v5h5V7H9z" />
                  </svg>
                  <span className="text-center">工作时间: 周一至周五 9:00 - 18:00</span>
                </li>
                <li className="flex flex-col items-center">
                  <svg className="w-6 h-6 text-blue-600 mb-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                  </svg>
                  <span className="text-center">邮箱: leetanghui424@gmail.com</span>
                </li>
              </ul>
              
              <ul className="flex space-x-6 justify-center">
                <li>
                  <a href="https://x.com/yihui_indie" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-blue-600 bg-blue-100 hover:text-white hover:bg-blue-600 rounded-full transition duration-150 ease-in-out" aria-label="推特">
                    <svg className="w-12 h-12 fill-current p-2.5" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://space.bilibili.com/39930228" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-blue-600 bg-blue-100 hover:text-white hover:bg-blue-600 rounded-full transition duration-150 ease-in-out" aria-label="B站">
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="45" height="45" className="p-2.5">
                      <path d="M746 386c9.76 0 18 8.24 18 18v341c0 9.76-8.24 18-18 18H278c-9.76 0-18-8.24-18-18V404c0-9.76 8.24-18 18-18h468m0-82H278c-55 0-100 45-100 100v341c0 55 45 100 100 100h468c55 0 100-45 100-100V404c0-55-45-100-100-100z" fill="currentColor"></path>
                      <path d="M441.28 548.01l-75.34 20.19c-21.78 5.84-44.38-7.21-50.21-28.99-5.84-21.78 7.21-44.38 28.99-50.21l75.34-20.19c21.78-5.84 44.38 7.21 50.21 28.99 5.84 21.78-7.21 44.37-28.99 50.21zM582.72 548.01l75.34 20.19c21.78 5.84 44.38-7.21 50.21-28.99 5.84-21.78-7.21-44.38-28.99-50.21l-75.34-20.19c-21.78-5.84-44.38 7.21-50.21 28.99-5.84 21.78 7.21 44.37 28.99 50.21z" fill="currentColor"></path>
                      <path d="M367.49 342.1l-59-102.19c-11.27-19.53-4.52-44.73 15.01-56.01 19.53-11.27 44.73-4.52 56.01 15.01l59 102.19c11.27 19.53 4.52 44.73-15.01 56.01-19.53 11.27-44.73 4.51-56.01-15.01zM656.51 342.1l59-102.19c11.27-19.53 4.52-44.73-15.01-56.01-19.53-11.27-44.73-4.52-56.01 15.01l-59 102.19c-11.27 19.53-4.52 44.73 15.01 56.01 19.53 11.27 44.73 4.51 56.01-15.01z" fill="currentColor"></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 