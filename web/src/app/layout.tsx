import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const newsreader = Newsreader({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic']
});

export const metadata: Metadata = {
  title: 'Dubai Friends — Warm Introductions & Community in Dubai',
  description: 'A serene, human-crafted community platform connecting students, creators, and professionals arriving in Dubai through shared cultural roots and mutual relationships.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#172520] font-sans antialiased selection:bg-[#E2ECE5] selection:text-[#173628]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
