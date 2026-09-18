import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Josh Trivedi, CTO & Co-Founder',
  description:
    'CTO & Co-Founder at Predeeption, building production LLM systems with Augmented RAG for EV battery analytics. Open to AI Engineer, ML Engineer, and Research Engineer roles.',
  keywords: [
    'Josh Trivedi',
    'AI Engineer',
    'ML Engineer',
    'CTO',
    'Predeeption',
    'Machine Learning',
    'LLM',
  ],
  openGraph: {
    title: 'Josh Trivedi, CTO & Co-Founder',
    description: 'Building production LLM systems with Augmented RAG for EV battery analytics.',
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
