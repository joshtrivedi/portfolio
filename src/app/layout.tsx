import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Josh Trivedi — AI Engineer & CTO',
  description:
    'Co-Founder & CTO at Predeeption. AI Engineer & Full-Stack Developer building agentic AI systems, generative models, and scalable full-stack applications.',
  keywords: [
    'Josh Trivedi',
    'AI Engineer',
    'Full-Stack Developer',
    'CTO',
    'Predeeption',
    'Machine Learning',
    'Generative AI',
  ],
  openGraph: {
    title: 'Josh Trivedi — AI Engineer & CTO',
    description: 'Building agentic AI systems and production-grade full-stack applications.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
