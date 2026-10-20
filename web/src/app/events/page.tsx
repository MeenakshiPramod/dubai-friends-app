'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Briefcase, 
  Sparkles, 
  Check, 
  ExternalLink,
  MessageCircle,
  Plus
} from 'lucide-react';
import { MOCK_EVENTS } from '@/lib/mockData';
import { EVENT_CATEGORIES } from '@dubai-friends/shared';

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeEvent, setActiveEvent] = useState<any>(MOCK_EVENTS[0]);
  const [rsvpdEventIds, setRsvpdEventIds] = useState<string[]>(['event-1', 'event-3']);

  const handleToggleRSVP = (eventId: string) => {
    if (rsvpdEventIds.includes(eventId)) {
      setRsvpdEventIds(rsvpdEventIds.filter(id => id !== eventId));
    } else {
      setRsvpdEventIds([...rsvpdEventIds, eventId]);
    }
  };

  const filteredEvents = MOCK_EVENTS.filter((ev) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'job_fair') return ev.is_job_event;
    return ev.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Dubai Interactive Event Map & Job Fairs</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Events & Job Fairs</h1>
          <p className="text-sm text-slate-500">
            Find where students and job seekers are gathering in Dubai. RSVP and attend together in a group!
          </p>
        </div>

        <Link
          href="/org"
          className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 text-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Post an Event / Job Fair</span>
        </Link>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          All Events ({MOCK_EVENTS.length})
        </button>

        <button
          onClick={() => setSelectedCategory('job_fair')}
          className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5 ${
            selectedCategory === 'job_fair'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>💼 Job Fairs & Career Expos</span>
        </button>

        {EVENT_CATEGORIES.filter(c => c.id !== 'job_fair').map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Interactive Map & Events Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Map Representation */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider">Dubai Interactive Map</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">25.2048° N, 55.2708° E</span>
          </div>

          {/* Stylized Vector Map of Dubai Areas */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 min-h-[420px] flex flex-col justify-between overflow-hidden">
            {/* Background Map Grid & Coastline Simulation */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Area labels */}
            <div className="text-[11px] font-bold text-slate-500 flex justify-between z-10 select-none">
              <span>ARABIAN GULF 🌊</span>
              <span>DEIRA / AIRPORT ✈️</span>
            </div>

            {/* Pins positioned geographically across Dubai */}
            <div className="relative z-10 my-8 space-y-6">
              {filteredEvents.map((ev, index) => {
                const isSelected = activeEvent?.id === ev.id;
                const isAttending = rsvpdEventIds.includes(ev.id);

                return (
                  <div
                    key={ev.id}
                    onClick={() => setActiveEvent(ev)}
                    className={`cursor-pointer transition-all p-3 rounded-xl border backdrop-blur-md flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg shadow-amber-500/20 scale-[1.02]'
                        : 'bg-white/10 border-white/15 text-slate-200 hover:bg-white/15'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        ev.is_job_event ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-slate-950'
                      }`}>
                        {ev.is_job_event ? '💼' : '📍'}
                      </div>
                      <div>
                        <div className="font-extrabold text-sm">{ev.title}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5">
                          <span>{ev.venue_name}</span>
                          <span>•</span>
                          <span className="text-amber-400 font-semibold">{ev.dubai_area}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-white/20 text-white">
                        {ev.rsvp_count} going
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10 z-10">
              <span>💡 Tap any event pin to view hiring companies and group chats</span>
              <span className="text-amber-400 font-semibold">Active: {activeEvent?.title}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Event Details & Group Attendance */}
        {activeEvent && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-100">
              <img
                src={activeEvent.cover_image_url}
                alt={activeEvent.title}
                className="w-full h-full object-cover"
              />
              {activeEvent.is_job_event && (
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  💼 Career / Job Fair
                </div>
              )}
            </div>

            <div>
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                {activeEvent.dubai_area}
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                {activeEvent.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Organized by: <span className="font-semibold text-slate-700">{activeEvent.organizer_name}</span>
              </p>
            </div>

            {/* Time and Venue */}
            <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="font-semibold">{new Date(activeEvent.starts_at).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{activeEvent.venue_name}, {activeEvent.venue_address}</span>
              </div>
            </div>

            {/* Job Fair Companies If Applicable */}
            {activeEvent.participating_companies && (
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  🏢 Participating Companies & Hiring Teams:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeEvent.participating_companies.map((comp: string) => (
                    <span key={comp} className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeEvent.description}
            </p>

            {/* RSVP & Group Attend actions */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>{activeEvent.rsvp_count} people RSVP'd</span>
                </span>
                <span className="text-emerald-600 font-bold">Free Entry</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleRSVP(activeEvent.id)}
                  className={`flex-1 flex items-center justify-center space-x-1.5 text-xs font-bold py-3 px-4 rounded-xl transition-all ${
                    rsvpdEventIds.includes(activeEvent.id)
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20'
                  }`}
                >
                  {rsvpdEventIds.includes(activeEvent.id) ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>RSVP Confirmed (Going)</span>
                    </>
                  ) : (
                    <span>RSVP / I'm Attending</span>
                  )}
                </button>

                <Link
                  href="/chat"
                  className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-3 rounded-xl transition-colors"
                  title="Join Event Group Chat"
                >
                  <MessageCircle className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Event Group</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
