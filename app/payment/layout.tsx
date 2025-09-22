import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '支付处理 | 您的网站名称',
  description: '处理您的支付请求和确认',
};

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
} 