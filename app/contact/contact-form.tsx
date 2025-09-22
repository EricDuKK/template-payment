'use client';

import { useState } from 'react';
import React from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    // 这里应该添加实际的表单提交逻辑
    // 例如通过API发送数据到后端
    console.log({ name, email, subject, message });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="h4 font-playfair-display mb-4">发送消息</h2>
      {submitted ? (
        <div className="text-green-600 p-4 bg-green-50 rounded-lg">
          感谢您的留言！我们会尽快回复您。
        </div>
      ) : error ? (
        <div className="text-red-600 p-4 bg-red-50 rounded-lg mb-4">
          发送失败，请稍后再试或直接通过邮箱联系我们。
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">姓名 <span className="text-red-600">*</span></label>
              <input id="name" type="text" className="form-input w-full" placeholder="您的姓名" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">邮箱 <span className="text-red-600">*</span></label>
              <input id="email" type="email" className="form-input w-full" placeholder="您的邮箱" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="subject">主题 <span className="text-red-600">*</span></label>
              <input id="subject" type="text" className="form-input w-full" placeholder="消息主题" required value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">消息 <span className="text-red-600">*</span></label>
              <textarea id="message" rows={4} className="form-textarea w-full" placeholder="您的消息" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn-sm text-white bg-blue-600 hover:bg-blue-700 w-full">发送消息</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
} 