'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { MOCK_CURRENT_USER } from '@/lib/mockData';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/discover', label: 'Discover' },
    { href: '/events', label: 'Gatherings' },
    { href: '/jobs', label: 'Opportunities' },
    { href: '/chat', label: 'Chat' },
    { href: '/org', label: 'Organizations' },
    { href: '/admin', label: 'Admin' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#DDEEF1]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Youthful & Striking */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded-2xl bg-[#0B353D] flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105 shadow-md">
              <span className="font-serif italic font-bold text-xl leading-none text-[#32C6B2]">D</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FF573F] ring-2 ring-[#FDFBF7]"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl tracking-tight text-[#0B353D] font-bold leading-none">
                  Dubai Friends
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#FFE5E0] text-[#E4432C] tracking-wide uppercase">
                  V2.0
                </span>
              </div>
              <span className="text-[11px] font-sans text-[#1B6370] tracking-wider uppercase mt-1 font-medium">
                Gen-Z Warm Network
              </span>
            </div>
          </Link>

          {/* Clean Navigation Links with Mint & Coral Accents */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-xs tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#D5F3EE] text-[#062026] font-bold shadow-xs border border-[#A9E8DE]'
                      : 'text-[#1B6370] hover:text-[#0B353D] hover:bg-[#F0FAF8] font-medium'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Profile & Action CTA */}
          <div className="flex items-center space-x-3">
            <Link
              href="/onboarding"
              className="flex items-center space-x-2.5 pl-3 py-1 pr-2 rounded-full bg-white border border-[#DDEEF1] hover:border-[#32C6B2] transition-all shadow-sm hover:shadow-md"
            >
              <img
                src={MOCK_CURRENT_USER.avatar_url}
                alt={MOCK_CURRENT_USER.first_name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-[#32C6B2]/40"
              />
              <span className="text-xs font-semibold text-[#0B353D] pr-1 hidden sm:inline">
                {MOCK_CURRENT_USER.first_name}
              </span>
            </Link>

            <Link
              href="/discover"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF573F] hover:bg-[#E4432C] text-white text-xs font-bold transition-all shadow-md shadow-[#FF573F]/25 hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Connect</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
