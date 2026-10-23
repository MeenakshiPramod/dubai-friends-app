'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  MapPin, 
  Briefcase, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  MessageSquare,
  Search,
  Share2,
  BrainCircuit,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { MOCK_USERS, MOCK_EVENTS, MOCK_JOBS } from '@/lib/mockData';
import { SUGGESTED_AI_PROMPTS } from '@/lib/aiSearch';

export default function HomePage() {
  const router = useRouter();
  const [heroSearchText, setHeroSearchText] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchText.trim()) {
      router.push(`/discover?q=${encodeURIComponent(heroSearchText.trim())}`);
    } else {
      router.push('/discover');
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Top YC Pitch Mode Notification Pill */}
      <div className="bg-slate-900 text-white py-2 px-4 text-xs font-semibold flex items-center justify-center gap-2 border-b border-slate-800">
        <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded">
          YC Pitch Demo
        </span>
        <span>AI-powered Relationship Intelligence for Dubai Expats & Students</span>
        <Link href="/discover" className="text-amber-400 hover:text-amber-300 font-bold ml-1 underline flex items-center gap-0.5">
          <span>Try AI Search</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent pt-8 pb-16 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Relationship Intelligence & Warm Referrals in Dubai</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Meet the right people in <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                  Dubai with AI.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Skip cold outreach. Search Dubai’s student, tech, and cultural networks in plain English. Discover <strong>Malayali AI builders</strong>, request <strong>Careem employee referrals</strong>, and attend <strong>GITEX career fairs</strong> in curated groups.
              </p>

              {/* Happenstance Natural Language Hero Search Box */}
              <form onSubmit={handleHeroSearch} className="bg-white rounded-3xl p-3 border-2 border-amber-400 shadow-xl shadow-amber-500/10 space-y-3">
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-amber-600">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <input
                    type="text"
                    value={heroSearchText}
                    onChange={(e) => setHeroSearchText(e.target.value)}
                    placeholder="Ask AI: 'Malayali AI students attending GITEX' or 'Who works at Careem?'..."
                    className="w-full pl-11 pr-24 py-3 text-xs sm:text-sm font-medium rounded-2xl bg-slate-50/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 transition-all placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-transform active:scale-95 flex items-center gap-1"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Prompt chips */}
                <div className="flex flex-wrap items-center gap-1.5 px-1">
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" /> Examples:
                  </span>
                  {SUGGESTED_AI_PROMPTS.slice(0, 3).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        const clean = p.replace(/^[^a-zA-Z0-9\s]+/, '').trim();
                        router.push(`/discover?q=${encodeURIComponent(clean)}`);
                      }}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 border border-slate-200/80 transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </form>

              {/* Quick Feature Badges */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200/60 max-w-lg">
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Warm Intros Only</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>18+ Verified Community</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>LinkedIn Verified Jobs</span>
                </div>
              </div>
            </div>

            {/* Hero Card Preview with Warm Paths */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200/80 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">AI Matched Profiles in Dubai</span>
                  </div>
                  <span className="text-xs text-amber-600 font-extrabold">98% Match Rate</span>
                </div>

                <div className="space-y-3">
                  {MOCK_USERS.slice(0, 3).map((user) => (
                    <div key={user.id} className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-amber-300 transition-all text-left space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img src={user.avatar_url} alt={user.first_name} className="w-11 h-11 rounded-xl object-cover ring-2 ring-white shadow-xs" />
                          <div>
                            <div className="font-extrabold text-sm text-slate-900">{user.first_name} {user.last_name}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                              <span className="capitalize font-semibold text-amber-700">
                                {user.region === 'kerala' ? '🌴 Malayali' : user.region.replace('_', ' ')}
                              </span>
                              <span>•</span>
                              <span className="truncate max-w-[130px]">{user.company || user.field_of_study}</span>
                            </div>
                          </div>
                        </div>

                        {user.can_refer ? (
                          <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            Referral
                          </span>
                        ) : (
                          <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                            {user.ai_match_score || 95}% Match
                          </span>
                        )}
                      </div>

                      {user.warm_intro_path && (
                        <div className="text-[10px] font-semibold text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <Share2 className="w-3 h-3 text-indigo-600 flex-shrink-0" />
                          <span>Warm path via {user.warm_intro_path.bridgePerson}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Event banner preview */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white text-left space-y-1">
                  <div className="text-[10px] uppercase tracking-wider font-extrabold text-amber-100">Featured Upcoming Job Fair</div>
                  <div className="font-bold text-sm leading-tight">GITEX Tech Talent & Career Expo 2026</div>
                  <div className="text-xs text-amber-100/90 flex items-center gap-2 pt-0.5">
                    <span>📍 DWTC</span>
                    <span>•</span>
                    <span>248 Friends Attending as Group</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
            <BrainCircuit className="w-3.5 h-3.5 text-amber-600" />
            <span>Relationship Graph Technology</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Why YC Founders Love This Model</h2>
          <p className="text-sm sm:text-base text-slate-500">
            Moving to Dubai shouldn’t mean starting from zero. We leverage warm social graphs so you land with instant trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Natural Language Search */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all text-left space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 shadow-sm">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Natural Language Graph</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Ask questions just like talking to a well-connected local friend. Find Malayali students in Marina, Careem engineers for referrals, or hackathon teams.
            </p>
            <Link href="/discover" className="inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700 gap-1">
              Try AI People Search <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Warm Intro Paths */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-400 hover:-translate-y-1 transition-all text-left space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 shadow-sm">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Warm Intro Paths</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every profile shows mutual connections and verified relationship paths. Generate 1-click AI drafts tailored with cultural etiquette to guarantee replies.
            </p>
            <Link href="/discover" className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700 gap-1">
              Explore Relationship Graph <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: Hyper-Local Events & Jobs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1 transition-all text-left space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Interactive Map & Group RSVPs</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              See career expos and student meetups across Dubai on an interactive map. RSVP and join auto-generated attendee group chats to go together!
            </p>
            <Link href="/events" className="inline-flex items-center text-xs font-bold text-emerald-600 hover:text-emerald-700 gap-1">
              View Dubai Map <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Verified Dubai Job Openings</h2>
            <p className="text-xs sm:text-sm text-slate-500">Apply directly on LinkedIn or request warm referrals from verified employees</p>
          </div>
          <Link href="/jobs" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
            See all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MOCK_JOBS.map((job) => (
            <div key={job.id} className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-amber-300 hover:shadow-md transition-all text-left flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {job.job_type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">📍 {job.dubai_area}</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{job.title}</h3>
                  <p className="text-xs font-semibold text-slate-600">{job.company_name}</p>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{job.description}</p>
                {job.salary_range && (
                  <div className="text-xs font-bold text-slate-800 bg-slate-50 p-2.5 rounded-xl">
                    💰 {job.salary_range}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4">
                <a
                  href={job.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-1.5 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow-xs"
                >
                  <span>Apply on LinkedIn</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
