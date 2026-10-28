'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  Search, 
  MapPin, 
  Users, 
  Sparkles,
  ArrowUpRight,
  Zap,
  Flame,
  Rocket,
  Compass
} from 'lucide-react';
import { MOCK_USERS, MOCK_EVENTS } from '@/lib/mockData';
import { SUGGESTED_AI_PROMPTS } from '@/lib/aiSearch';
import { 
  StartupRocketFigure, 
  GrowthPhoneFigure, 
  NatureBotanicalFigure, 
  PeaceBlobsFigure 
} from '@/components/illustrations/GenZFigures';

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
    <div className="bg-[#FDFBF7] text-[#0B353D] selection:bg-[#A9E8DE] selection:text-[#062026]">
      
      {/* Gen-Z Hero Section with Framed Graphic Layout */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          
          {/* Main Card Frame with Soft Sky Frame Border */}
          <div className="relative rounded-[2.5rem] bg-[#DDEEF1]/60 border-2 border-[#C2E1E6] p-6 sm:p-10 md:p-14 shadow-lg overflow-hidden">
            
            {/* Ambient Background Glows */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#FF573F]/10 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#32C6B2]/15 blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Youthful Typography & Search */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Gen-Z pill badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B353D] text-[#32C6B2] text-xs font-bold tracking-wide">
                    <Flame className="w-3.5 h-3.5 text-[#FF573F]" />
                    <span>Dubai Gen-Z Social Graph</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5E0] text-[#E4432C] text-xs font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>YC Pitch Edition</span>
                  </div>
                </div>

                {/* Bold Headline inspired by reference image */}
                <div className="space-y-2">
                  <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B353D] leading-[1.12]">
                    Find your tribe. <br />
                    <span className="text-[#FF573F] underline decoration-[#A9E8DE] decoration-wavy decoration-2">
                      Launch your future.
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-[#1B6370] leading-relaxed max-w-xl font-sans">
                    Connecting Malayali techies, university creators, and new arrivals in Dubai. Natural language discovery, verified warm intros, and real-life hackathon meetups.
                  </p>
                </div>

                {/* Interactive Natural Language Search Bar */}
                <div className="pt-2">
                  <form 
                    onSubmit={handleSearchSubmit}
                    className="bg-white rounded-2xl p-2 sm:p-2.5 border-2 border-[#A9E8DE] shadow-md hover:border-[#32C6B2] focus-within:border-[#FF573F] transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3 px-3">
                      <Search className="w-5 h-5 text-[#1BB6A2] flex-shrink-0" />
                      <input
                        type="text"
                        value={searchPrompt}
                        onChange={(e) => setSearchPrompt(e.target.value)}
                        placeholder="Search naturally: 'Malayali AI students attending GITEX'..."
                        className="w-full py-2.5 text-xs sm:text-sm bg-transparent text-[#0B353D] placeholder:text-[#1B6370]/50 focus:outline-none font-medium"
                      />
                      <button
                        type="submit"
                        className="bg-[#FF573F] hover:bg-[#E4432C] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#FF573F]/25 flex-shrink-0 flex items-center space-x-1.5 hover:scale-105"
                      >
                        <span>Match</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>

                  {/* Suggestion prompt pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-3">
                    <span className="text-[11px] font-bold text-[#1B6370]">Trending queries:</span>
                    {SUGGESTED_AI_PROMPTS.slice(0, 3).map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => {
                          const clean = prompt.replace(/^[^a-zA-Z0-9\s]+/, '').trim();
                          router.push(`/discover?q=${encodeURIComponent(clean)}`);
                        }}
                        className="text-[11px] font-medium text-[#0B353D] bg-white/90 hover:bg-[#32C6B2] hover:text-white px-3 py-1 rounded-full border border-[#A9E8DE] transition-all"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/discover"
                    className="inline-flex items-center gap-2 bg-[#0B353D] hover:bg-[#062026] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full transition-all shadow-md hover:scale-105"
                  >
                    <Users className="w-4 h-4 text-[#32C6B2]" />
                    <span>Browse People</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#FF573F]" />
                  </Link>

                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 bg-white hover:bg-[#F0FAF8] text-[#0B353D] text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full border-2 border-[#A9E8DE] transition-all shadow-xs hover:border-[#32C6B2]"
                  >
                    <MapPin className="w-4 h-4 text-[#FF573F]" />
                    <span>Gatherings Map</span>
                  </Link>
                </div>

              </div>

              {/* Right Column: Hero Startup Figure Illustration (Inspired by Reference Panel 3) */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="w-full max-w-sm sm:max-w-md transform hover:rotate-1 transition-transform duration-500">
                  <StartupRocketFigure />
                  {/* Floating Stat Card Badge */}
                  <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md border-2 border-[#A9E8DE] rounded-2xl p-3 shadow-lg flex items-center gap-3 animate-float-slow">
                    <div className="w-10 h-10 rounded-xl bg-[#FFE5E0] flex items-center justify-center text-[#FF573F]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-[#0B353D]">98% Warm Match Rate</div>
                      <div className="text-[10px] text-[#1B6370]">Via mutual Kerala & Dubai roots</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcases & Pillars (Featuring Figures 1, 2 & 4 from Reference Image) */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5E0] text-[#E4432C] text-xs font-bold">
            <span>Built For How Gen-Z Actually Networks</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0B353D] font-bold">
            No cold messages. Real momentum.
          </h2>
          <p className="text-xs sm:text-sm text-[#1B6370] max-w-lg mx-auto font-light">
            Each feature is designed to turn awkward digital outreach into natural, enthusiastic IRL meetups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Growth Phone Figure (From Panel 2: Marketing Strategy / Career Growth) */}
          <div className="rounded-3xl bg-white border-2 border-[#DDEEF1] hover:border-[#32C6B2] transition-all p-6 flex flex-col justify-between shadow-sm hover:shadow-xl group space-y-5">
            <div className="space-y-4">
              <GrowthPhoneFigure className="w-full h-44" />
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF573F]">Career & Referrals</span>
                <h3 className="font-serif text-2xl font-bold text-[#0B353D]">
                  Verified Job Bridges
                </h3>
                <p className="text-xs text-[#1B6370] leading-relaxed">
                  Skip HR black holes. Get introduced to engineers and managers at Careem, Talabat, and Hub71 with 1-click LinkedIn validation.
                </p>
              </div>
            </div>

            <Link 
              href="/jobs"
              className="inline-flex items-center justify-between text-xs font-bold text-[#0B353D] group-hover:text-[#FF573F] pt-3 border-t border-[#DDEEF1] transition-colors"
            >
              <span>Explore verified roles</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pillar 2: Nature Botanical Figure (From Panel 4: Nature / Community Roots) */}
          <div className="rounded-3xl bg-white border-2 border-[#FAD8CC] hover:border-[#FF573F] transition-all p-6 flex flex-col justify-between shadow-sm hover:shadow-xl group space-y-5">
            <div className="space-y-4">
              <NatureBotanicalFigure className="w-full h-44" />
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1BB6A2]">Cultural Roots</span>
                <h3 className="font-serif text-2xl font-bold text-[#0B353D]">
                  Malayali & Regional Hub
                </h3>
                <p className="text-xs text-[#1B6370] leading-relaxed">
                  From sharing Karak chai in Al Barsha to hostel reunions and university alumni chats, find your closest community effortlessly.
                </p>
              </div>
            </div>

            <Link 
              href="/discover?q=Malayali"
              className="inline-flex items-center justify-between text-xs font-bold text-[#0B353D] group-hover:text-[#FF573F] pt-3 border-t border-[#FAD8CC] transition-colors"
            >
              <span>Connect with Malayalis</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pillar 3: Peace & Unity Blobs (From Panel 1: Peace / Warm Intros) */}
          <div className="rounded-3xl bg-white border-2 border-[#C2E1E6] hover:border-[#32C6B2] transition-all p-6 flex flex-col justify-between shadow-sm hover:shadow-xl group space-y-5">
            <div className="space-y-4">
              <PeaceBlobsFigure className="w-full h-44" />
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B353D]">Zero Awkwardness</span>
                <h3 className="font-serif text-2xl font-bold text-[#0B353D]">
                  AI Warm Intro Drafts
                </h3>
                <p className="text-xs text-[#1B6370] leading-relaxed">
                  Generate context-rich, respectful introductory notes based on mutual friends, study tracks, and shared Dubai neighborhoods.
                </p>
              </div>
            </div>

            <Link 
              href="/discover"
              className="inline-flex items-center justify-between text-xs font-bold text-[#0B353D] group-hover:text-[#FF573F] pt-3 border-t border-[#C2E1E6] transition-colors"
            >
              <span>Try warm intro tool</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Featured Community Members Preview */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#FF573F] uppercase tracking-wider">
              Dubai Creators & Students
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0B353D] font-bold mt-1">
              Active In Dubai This Week
            </h2>
          </div>
          <Link 
            href="/discover" 
            className="text-xs font-bold text-[#1BB6A2] hover:text-[#0B353D] flex items-center space-x-1.5 transition-colors"
          >
            <span>See all members</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_USERS.slice(0, 3).map((user) => (
            <div 
              key={user.id}
              className="bg-white rounded-3xl p-6 border-2 border-[#DDEEF1] hover:border-[#32C6B2] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={user.avatar_url}
                    alt={user.first_name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#32C6B2]/40"
                  />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0B353D]">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-xs text-[#1B6370]">
                      {user.occupation || user.field_of_study}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#1B6370]/80 leading-relaxed line-clamp-2">
                  {user.bio}
                </p>

                {user.warm_intro_path && (
                  <div className="px-3.5 py-2 rounded-2xl bg-[#D5F3EE] border border-[#A9E8DE] text-xs text-[#0B353D] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1BB6A2]"></span>
                    <span><strong>Warm Bridge:</strong> via {user.warm_intro_path.bridgePerson}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#DDEEF1] flex items-center justify-between">
                <span className="text-xs text-[#1B6370] flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#FF573F]" />
                  <span>{user.dubai_area}</span>
                </span>

                <Link
                  href="/discover"
                  className="text-xs font-bold text-[#FF573F] hover:text-[#E4432C] hover:underline"
                >
                  Connect →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Event Banner - Framed with Marine & Coral */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="bg-[#0B353D] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl border-2 border-[#1B6370]">
          
          {/* Subtle Decorative Star Sparkles */}
          <div className="absolute top-6 right-12 w-2 h-2 rounded-full bg-[#32C6B2] animate-ping"></div>
          <div className="absolute bottom-6 left-24 w-2 h-2 rounded-full bg-[#FF573F]"></div>

          <div className="space-y-3 max-w-xl z-10">
            <span className="text-[11px] tracking-widest uppercase font-bold text-[#32C6B2] px-2.5 py-0.5 rounded-full bg-[#062026]">
              Featured IRL Gathering
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-[#FDFBF7]">
              GITEX Tech Talent & Career Expo 2026
            </h3>
            <p className="text-xs sm:text-sm text-[#A9E8DE] leading-relaxed font-light">
              Don&apos;t walk into Dubai World Trade Centre alone. Join 48 fellow student builders and Malayali engineers heading to DWTC together.
            </p>
          </div>

          <div className="flex-shrink-0 z-10">
            <Link
              href="/events"
              className="inline-flex items-center space-x-2 bg-[#FF573F] hover:bg-[#E4432C] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg shadow-[#FF573F]/30 transition-all hover:scale-105"
            >
              <span>Join Travel Group</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
