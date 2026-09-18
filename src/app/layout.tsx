import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '700'] });

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  title: 'Josh Trivedi, CTO & Co-Founder',
  description:
    'CTO & Co-Founder at Predeeption, building production LLM systems with Augmented RAG for EV battery analytics. Open to AI/ML, data, and technical leadership roles in the Netherlands and France.',
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
    <html lang="en" className={`scroll-smooth ${inter.variable} ${fraunces.variable}`}>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        {children}
      </body>
    </html>
  );
}
