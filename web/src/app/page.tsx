'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  Search, 
  MapPin, 
  Users, 
  Briefcase, 
  Sparkles,
  ArrowUpRight,
  Calendar,
  Compass
} from 'lucide-react';
import { MOCK_USERS, MOCK_EVENTS, MOCK_JOBS } from '@/lib/mockData';
import { SUGGESTED_AI_PROMPTS } from '@/lib/aiSearch';

export default function HomePage() {
  const router = useRouter();
  const [searchPrompt, setSearchPrompt] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchPrompt.trim()) {
      router.push(`/discover?q=${encodeURIComponent(searchPrompt.trim())}`);
    } else {
      router.push('/discover');
    }
  };

  return (
    <div className="bg-[#FAF8F4] text-[#172520] selection:bg-[#D5E8DD] selection:text-[#16382B]">
      {/* Editorial Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center space-y-8">
          
          {/* Subtle Category Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#E8F1EC] text-[#1F4735] text-xs tracking-wide font-medium border border-[#D5E4DB]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2A5C46]" />
            <span>Community & Warm Relationships in Dubai</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#10271D] leading-[1.12] max-w-3xl mx-auto">
            Find your circle in <span className="italic text-[#2A5C46]">Dubai.</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#52665E] max-w-xl mx-auto leading-relaxed font-sans">
            A thoughtful network for newcomers, students, and founders. Connect through mutual roots, discover local gatherings on an interactive map, and land verified job referrals without cold outreach.
          </p>

          {/* Minimalist Natural Language Search */}
          <div className="max-w-2xl mx-auto pt-4">
            <form 
              onSubmit={handleSearchSubmit}
              className="bg-white rounded-2xl p-2 sm:p-2.5 border border-[#EDE8DE] shadow-[0_4px_20px_rgba(23,54,40,0.04)] hover:border-[#CBDCD1] focus-within:border-[#2A5C46] transition-all duration-300"
            >
              <div className="flex items-center space-x-3 px-3">
                <Search className="w-5 h-5 text-[#708077] flex-shrink-0" />
                <input
                  type="text"
                  value={searchPrompt}
                  onChange={(e) => setSearchPrompt(e.target.value)}
                  placeholder="Ask naturally: 'Malayali AI students attending GITEX'..."
                  className="w-full py-2.5 text-sm sm:text-base bg-transparent text-[#10271D] placeholder:text-[#8D9B93] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#1F4735] hover:bg-[#16382B] text-[#FAF8F4] font-medium text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-xs flex-shrink-0 flex items-center space-x-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Quiet prompt pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <span className="text-[11px] font-sans text-[#708077]">Try searching:</span>
              {SUGGESTED_AI_PROMPTS.slice(0, 3).map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    const clean = prompt.replace(/^[^a-zA-Z0-9\s]+/, '').trim();
                    router.push(`/discover?q=${encodeURIComponent(clean)}`);
                  }}
                  className="text-xs font-sans text-[#4A5E53] bg-white hover:bg-[#E8F1EC] hover:text-[#1F4735] px-3 py-1 rounded-full border border-[#EDE8DE] transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Quick CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            <Link
              href="/discover"
              className="inline-flex items-center space-x-2 bg-[#1F4735] hover:bg-[#16382B] text-white text-xs sm:text-sm font-medium px-6 py-3 rounded-full transition-all shadow-xs"
            >
              <Users className="w-4 h-4" />
              <span>Browse Members</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>

            <Link
              href="/events"
              className="inline-flex items-center space-x-2 bg-white hover:bg-[#F5F2EB] text-[#1F4735] text-xs sm:text-sm font-medium px-6 py-3 rounded-full border border-[#EDE8DE] transition-all"
            >
              <MapPin className="w-4 h-4 text-[#D96B47]" />
              <span>Events & Fairs Map</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars Section - Calm Pastel Tones */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16 border-t border-[#EDE8DE]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#EDE8DE] shadow-[0_2px_12px_rgba(23,54,40,0.02)] space-y-4 hover:border-[#C5D9CD] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F1EC] text-[#1F4735] flex items-center justify-center font-serif text-lg font-bold">
              01
            </div>
            <h3 className="font-serif text-2xl text-[#10271D]">
              Warm Introductions
            </h3>
            <p className="text-xs sm:text-sm text-[#52665E] leading-relaxed">
              Every connection is rooted in mutual relationships. Instead of cold spam, discover bridges through classmates, past colleagues, and community leads.
            </p>
            <Link 
              href="/discover"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#1F4735] hover:text-[#10271D] pt-2"
            >
              <span>Explore relationships</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-3xl p-8 border border-[#EDE8DE] shadow-[0_2px_12px_rgba(23,54,40,0.02)] space-y-4 hover:border-[#C5D9CD] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF6F3] text-[#D96B47] flex items-center justify-center font-serif text-lg font-bold">
              02
            </div>
            <h3 className="font-serif text-2xl text-[#10271D]">
              Events & Group Meetups
            </h3>
            <p className="text-xs sm:text-sm text-[#52665E] leading-relaxed">
              Find where builders and students are gathering — from GITEX career expos to in5 Hack-Nights. RSVP and coordinate travel with friends.
            </p>
            <Link 
              href="/events"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#D96B47] hover:text-[#A44224] pt-2"
            >
              <span>View upcoming events</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-3xl p-8 border border-[#EDE8DE] shadow-[0_2px_12px_rgba(23,54,40,0.02)] space-y-4 hover:border-[#C5D9CD] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#E5F0F5] text-[#2D5A6E] flex items-center justify-center font-serif text-lg font-bold">
              03
            </div>
            <h3 className="font-serif text-2xl text-[#10271D]">
              Verified Opportunities
            </h3>
            <p className="text-xs sm:text-sm text-[#52665E] leading-relaxed">
              Hand-verified roles from top tech teams across the UAE. Request employee recommendations and apply straight through official LinkedIn links.
            </p>
            <Link 
              href="/jobs"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#2D5A6E] hover:text-[#16382B] pt-2"
            >
              <span>Browse job board</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Featured Community Members Preview */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16 border-t border-[#EDE8DE]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-sans text-[#708077] uppercase tracking-wider">
              Dubai Community
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#10271D] mt-1">
              Active members in Dubai
            </h2>
          </div>
          <Link 
            href="/discover" 
            className="text-xs font-semibold text-[#1F4735] hover:underline flex items-center space-x-1"
          >
            <span>View all members</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_USERS.slice(0, 3).map((user) => (
            <div 
              key={user.id}
              className="bg-white rounded-3xl p-6 border border-[#EDE8DE] shadow-[0_2px_12px_rgba(23,54,40,0.02)] flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={user.avatar_url}
                    alt={user.first_name}
                    className="w-12 h-12 rounded-2xl object-cover ring-1 ring-[#1F4735]/15"
                  />
                  <div>
                    <h3 className="font-serif text-lg text-[#10271D]">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-xs text-[#708077]">
                      {user.occupation || user.field_of_study}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#52665E] leading-relaxed line-clamp-2">
                  {user.bio}
                </p>

                {user.warm_intro_path && (
                  <div className="px-3 py-2 rounded-xl bg-[#F4F7F4] border border-[#E1EDE6] text-[11px] text-[#2A5C46]">
                    <span className="font-semibold">Warm Intro:</span> via {user.warm_intro_path.bridgePerson}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#EDE8DE] flex items-center justify-between">
                <span className="text-xs text-[#708077] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D96B47]" />
                  <span>{user.dubai_area}</span>
                </span>

                <Link
                  href="/discover"
                  className="text-xs font-medium text-[#1F4735] hover:text-[#10271D]"
                >
                  Connect →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Event Banner */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="bg-[#1F4735] text-[#FAF8F4] rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl z-10">
            <span className="text-[11px] tracking-widest uppercase font-semibold text-[#D5E8DD]">
              Upcoming Community Gathering
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl leading-tight">
              GITEX Tech Talent & Career Expo 2026
            </h3>
            <p className="text-xs sm:text-sm text-[#C5D9CD] leading-relaxed">
              Join fellow students and newcomers heading to Dubai World Trade Centre. We coordinate travel groups so you never have to walk in alone.
            </p>
          </div>

          <div className="flex-shrink-0 z-10">
            <Link
              href="/events"
              className="inline-flex items-center space-x-2 bg-[#FAF8F4] hover:bg-[#F5F2EB] text-[#1F4735] font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-sm transition-all"
            >
              <span>View on Events Map</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
