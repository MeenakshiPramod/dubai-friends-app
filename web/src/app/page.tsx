'use client';

import Link from 'next/link';
import { 
  Users, 
  MapPin, 
  Briefcase, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  TrendingUp, 
  MessageSquare
} from 'lucide-react';
import { MOCK_USERS, MOCK_EVENTS, MOCK_JOBS } from '@/lib/mockData';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent pt-12 pb-16 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Just landed in Dubai? Connect with your community</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Never feel alone in <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                  Dubai again.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Whether you are an <strong>AI student</strong> looking for hackathon buddies, a <strong>Malayali newcomer</strong> wanting friends from home, or a <strong>job seeker</strong> attending Dubai job fairs — Dubai Friends connects you instantly.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/discover"
                  className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-600/25 transition-all hover:scale-[1.02]"
                >
                  <Users className="w-5 h-5" />
                  <span>Find Dubai Friends</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/events"
                  className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-6 py-3.5 rounded-xl border border-slate-200 shadow-sm transition-colors"
                >
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <span>Explore Events Map</span>
                </Link>
              </div>

              {/* Quick Feature Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/60 max-w-lg">
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>18+ Verified Community</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Regional & Cultural Match</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>LinkedIn Job Links</span>
                </div>
              </div>
            </div>

            {/* Hero Card Preview */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200/80 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Live Friends in Dubai</span>
                  </div>
                  <span className="text-xs text-amber-600 font-semibold">Online now</span>
                </div>

                <div className="space-y-3">
                  {MOCK_USERS.slice(0, 3).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors">
                      <div className="flex items-center space-x-3">
                        <img src={user.avatar_url} alt={user.first_name} className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm" />
                        <div>
                          <div className="font-bold text-sm text-slate-900">{user.first_name} {user.last_name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1.5">
                            <span className="capitalize font-semibold text-amber-700">{user.region === 'kerala' ? 'Malayali' : user.region.replace('_', ' ')}</span>
                            <span>•</span>
                            <span>{user.field_of_study || user.user_status}</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/chat`}
                        className="text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Connect
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Event banner preview */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white text-left space-y-1">
                  <div className="text-[11px] uppercase tracking-wider font-extrabold text-amber-100">Featured Upcoming Fair</div>
                  <div className="font-bold text-sm leading-tight">GITEX Tech Talent & Career Expo 2026</div>
                  <div className="text-xs text-amber-100/90 flex items-center gap-2 pt-1">
                    <span>📍 DWTC</span>
                    <span>•</span>
                    <span>248 Friends Attending</span>
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
          <h2 className="text-3xl font-extrabold text-slate-900">Built for the Dubai Experience</h2>
          <p className="text-sm sm:text-base text-slate-500">Everything you need to build your network, attend events, and find work in Dubai.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Community Matching */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Cultural & Field Matching</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Find Malayalis, North Indians, and fellow expatriates. Match specifically with AI engineering students, business majors, or founders in your Dubai neighborhood.
            </p>
            <Link href="/discover" className="inline-flex items-center text-sm font-bold text-amber-600 hover:text-amber-700 gap-1">
              Browse community <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Interactive Events Map */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Events & Job Fairs on Map</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Explore events visually around Downtown, Marina, and Academic City. RSVP, see who else is going, and join an automatic group chat to attend together!
            </p>
            <Link href="/events" className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 gap-1">
              View events map <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: Jobs & Fairs */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-left space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Job Board & LinkedIn Links</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Direct access to Dubai hiring postings with instant LinkedIn application URLs. Organizations and recruiters post vetted vacancies with salary ranges.
            </p>
            <Link href="/jobs" className="inline-flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-700 gap-1">
              Explore jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Latest Dubai Opportunities</h2>
            <p className="text-sm text-slate-500">Apply directly on LinkedIn or meet recruiters at upcoming fairs</p>
          </div>
          <Link href="/jobs" className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
            See all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MOCK_JOBS.map((job) => (
            <div key={job.id} className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:border-amber-300 transition-all text-left flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {job.job_type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">📍 {job.dubai_area}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                  <p className="text-xs font-semibold text-slate-600">{job.company_name}</p>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{job.description}</p>
                {job.salary_range && (
                  <div className="text-xs font-bold text-slate-800 bg-slate-50 p-2 rounded-lg">
                    💰 {job.salary_range}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4">
                <a
                  href={job.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors"
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
