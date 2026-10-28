'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Users, Calendar, Briefcase, MessageSquare, Shield, ArrowUpRight } from 'lucide-react';
import { MOCK_CURRENT_USER } from '@/lib/mockData';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/discover', label: 'People Search' },
    { href: '/events', label: 'Events & Fairs' },
    { href: '/jobs', label: 'Verified Jobs' },
    { href: '/chat', label: 'Messages' },
    { href: '/org', label: 'For Organizations' },
    { href: '/admin', label: 'Safety & Admin' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F4]/85 backdrop-blur-md border-b border-[#EDE8DE]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Editorial & Quietly Confident */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-full bg-[#1F4735] flex items-center justify-center text-[#FAF8F4] transition-transform duration-300 group-hover:scale-105">
              <span className="font-serif italic font-bold text-lg leading-none">D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-tight text-[#10271D] font-medium leading-none">
                Dubai Friends
              </span>
              <span className="text-[11px] font-sans text-[#708077] tracking-wider uppercase mt-1">
                Warm Network Intelligence
              </span>
            </div>
          </Link>

          {/* Clean Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-full text-xs tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#E2ECE5] text-[#173628] font-semibold'
                      : 'text-[#4A5E53] hover:text-[#10271D] hover:bg-[#F2ECE1]/60 font-medium'
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
              className="flex items-center space-x-2.5 pl-3 py-1 pr-2 rounded-full bg-white border border-[#EDE8DE] hover:border-[#C5D9CD] transition-all shadow-xs"
            >
              <img
                src={MOCK_CURRENT_USER.avatar_url}
                alt={MOCK_CURRENT_USER.first_name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-[#1F4735]/20"
              />
              <span className="text-xs font-medium text-[#173628] pr-1 hidden sm:inline">
                {MOCK_CURRENT_USER.first_name}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
