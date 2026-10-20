'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Calendar, Briefcase, MessageSquare, Shield, Compass, Sparkles, Building2 } from 'lucide-react';
import { MOCK_CURRENT_USER } from '@/lib/mockData';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/discover', label: 'Find Friends', icon: Users, badge: 'Matching' },
    { href: '/events', label: 'Events & Map', icon: Calendar },
    { href: '/jobs', label: 'Jobs & Fairs', icon: Briefcase },
    { href: '/chat', label: 'Community Chat', icon: MessageSquare, badge: '4' },
    { href: '/org', label: 'Post Events/Jobs', icon: Building2 },
    { href: '/admin', label: 'Admin', icon: Shield }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                Dubai<span className="text-amber-600">Friends</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">V1</span>
              </div>
              <p className="text-[10px] text-slate-500 -mt-1 font-medium">Connect • Events • Careers</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-amber-50 text-amber-700 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 text-[10px] bg-amber-500 text-white font-bold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile Pill & CTAs */}
          <div className="flex items-center space-x-3">
            <Link
              href="/onboarding"
              className="hidden sm:inline-flex items-center space-x-1 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Edit Profile</span>
            </Link>

            <Link href="/onboarding" className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="relative">
                <img
                  src={MOCK_CURRENT_USER.avatar_url}
                  alt={MOCK_CURRENT_USER.first_name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-500/30"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {MOCK_CURRENT_USER.first_name}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {MOCK_CURRENT_USER.dubai_area}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
