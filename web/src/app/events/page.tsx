'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Check, 
  MessageCircle,
  Plus,
  Flame,
  Sparkles
} from 'lucide-react';
import { MOCK_EVENTS } from '@/lib/mockData';
import { EVENT_CATEGORIES } from '@dubai-friends/shared';
import { NatureBotanicalFigure } from '@/components/illustrations/GenZFigures';

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
    <div className="bg-[#FDFBF7] min-h-screen text-[#0B353D] pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b-2 border-[#DDEEF1] pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#D5F3EE] text-[#062026] uppercase tracking-wider">
                🗺️ Dubai IRL Calendar
              </span>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FFE5E0] text-[#E4432C]">
                🔥 Free Entry For Students
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#0B353D] font-extrabold tracking-tight">
              Dubai Gatherings & Expos
            </h1>
            <p className="text-sm text-[#1B6370] max-w-xl font-normal leading-relaxed">
              Explore hackathons, career job fairs, and cultural meetups. Coordinate your travel group so you never have to walk in alone.
            </p>
          </div>

          <Link
            href="/org"
            className="inline-flex items-center space-x-2 bg-[#FF573F] hover:bg-[#E4432C] text-white text-xs font-bold px-6 py-3 rounded-full transition-all self-start sm:self-auto shadow-md shadow-[#FF573F]/25 hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Host a Gathering</span>
          </Link>
        </div>

        {/* Botanical Mini Banner (Inspired by Reference Panel 4: Nature) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#DDEEF1]/50 border-2 border-[#C2E1E6] rounded-3xl p-6">
          <div className="md:col-span-8 space-y-2 text-left">
            <span className="text-[10px] font-bold text-[#FF573F] uppercase tracking-wider">Community Oasis</span>
            <h3 className="font-serif text-2xl font-bold text-[#0B353D]">
              Kerala Roots & Dubai Ambition
            </h3>
            <p className="text-xs text-[#1B6370] font-light max-w-lg leading-relaxed">
              Every gathering has dedicated travel groups starting from Al Barsha, Deira, and Academic City. Connect with fellow Malayalis before the doors even open.
            </p>
          </div>
          <div className="md:col-span-4 max-w-xs mx-auto">
            <NatureBotanicalFigure className="w-full h-32" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`text-xs font-bold px-4 py-2 rounded-full border-2 transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#0B353D] text-white border-[#0B353D]'
                : 'bg-white text-[#1B6370] border-[#DDEEF1] hover:border-[#32C6B2]'
            }`}
          >
            All Gatherings ({MOCK_EVENTS.length})
          </button>

          <button
            onClick={() => setSelectedCategory('job_fair')}
            className={`text-xs font-bold px-4 py-2 rounded-full border-2 transition-all ${
              selectedCategory === 'job_fair'
                ? 'bg-[#FF573F] text-white border-[#FF573F] shadow-sm'
                : 'bg-[#FFE5E0] text-[#E4432C] border-[#FFCBC2] hover:bg-[#FFD5CC]'
            }`}
          >
            💼 Career Expos & Job Fairs
          </button>

          {EVENT_CATEGORIES.filter(c => c.id !== 'job_fair').map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs font-bold px-4 py-2 rounded-full border-2 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#0B353D] text-white border-[#0B353D]'
                  : 'bg-white text-[#1B6370] border-[#DDEEF1] hover:border-[#32C6B2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Map & Event Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Soft Parchment Dubai Interactive Map Representation */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-[#DDEEF1] shadow-sm overflow-hidden">
            <div className="p-4 bg-[#D5F3EE]/60 border-b-2 border-[#A9E8DE] flex items-center justify-between text-xs text-[#0B353D]">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#FF573F]" />
                <span className="font-serif text-base font-bold text-[#0B353D]">Dubai District Hubs</span>
              </div>
              <span className="font-sans text-[11px] text-[#1B6370] font-bold">Live Pinned Locations</span>
            </div>

            {/* Event Pins list */}
            <div className="p-6 bg-[#FDFBF7] space-y-4">
              <div className="text-[11px] font-sans text-[#1B6370] uppercase tracking-wider flex justify-between border-b border-[#DDEEF1] pb-2 font-bold">
                <span>Downtown • Marina • Academic City • DWTC</span>
                <span>Tap pin to view</span>
              </div>

              <div className="space-y-3 pt-2">
                {filteredEvents.map((ev) => {
                  const isSelected = activeEvent?.id === ev.id;

                  return (
                    <div
                      key={ev.id}
                      onClick={() => setActiveEvent(ev)}
                      className={`cursor-pointer transition-all p-4 rounded-2xl border-2 flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-white border-[#32C6B2] shadow-md ring-2 ring-[#32C6B2]/20'
                          : 'bg-white/80 border-[#DDEEF1] hover:border-[#A9E8DE]'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-serif text-lg font-bold ${
                          ev.is_job_event 
                            ? 'bg-[#FFE5E0] text-[#FF573F]' 
                            : 'bg-[#D5F3EE] text-[#0B353D]'
                        }`}>
                          {ev.is_job_event ? '💼' : '📍'}
                        </div>
                        <div>
                          <h4 className="font-serif text-base text-[#0B353D] font-bold leading-snug">
                            {ev.title}
                          </h4>
                          <p className="text-xs text-[#1B6370] flex items-center gap-1.5 mt-0.5">
                            <span>{ev.venue_name}</span>
                            <span>•</span>
                            <span className="text-[#062026] font-bold">{ev.dubai_area}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-bold text-[#1B6370] bg-[#D5F3EE] px-2.5 py-1 rounded-full">
                          {ev.rsvp_count} going
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Selected Event Details */}
          {activeEvent && (
            <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-[#DDEEF1] shadow-md p-6 space-y-6">
              <div className="rounded-2xl overflow-hidden aspect-video bg-[#D5F3EE] border-2 border-[#A9E8DE]">
                <img
                  src={activeEvent.cover_image_url}
                  alt={activeEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <span className="text-[11px] font-bold text-[#FF573F] uppercase tracking-wider">
                  {activeEvent.dubai_area}
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#0B353D]">
                  {activeEvent.title}
                </h2>
                <p className="text-xs text-[#1B6370]">
                  Hosted by <strong className="text-[#0B353D]">{activeEvent.organizer_name}</strong>
                </p>
              </div>

              {/* Timing & Venue */}
              <div className="space-y-2 text-xs text-[#0B353D] bg-[#FDFBF7] p-4 rounded-2xl border-2 border-[#DDEEF1] text-left">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1BB6A2] flex-shrink-0" />
                  <span className="font-medium">{new Date(activeEvent.starts_at).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF573F] flex-shrink-0" />
                  <span className="font-medium">{activeEvent.venue_name}, {activeEvent.venue_address}</span>
                </div>
              </div>

              {/* Companies if job fair */}
              {activeEvent.participating_companies && (
                <div className="space-y-2 text-left">
                  <span className="text-[11px] font-bold text-[#0B353D] uppercase tracking-wider block">
                    Participating Tech & Hiring Teams:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeEvent.participating_companies.map((c: string) => (
                      <span key={c} className="text-xs bg-[#D5F3EE] text-[#062026] font-bold px-3 py-1 rounded-full border border-[#A9E8DE]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-[#1B6370] leading-relaxed text-left font-light">
                {activeEvent.description}
              </p>

              {/* Actions */}
              <div className="pt-4 border-t-2 border-[#DDEEF1] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#1B6370]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Users className="w-4 h-4 text-[#1BB6A2]" />
                    <span>{activeEvent.rsvp_count} community members attending</span>
                  </span>
                  <span className="text-[#FF573F] font-bold">Free Entrance</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleRSVP(activeEvent.id)}
                    className={`flex-1 text-xs font-bold py-3 px-4 rounded-full transition-all flex items-center justify-center space-x-1.5 shadow-md ${
                      rsvpdEventIds.includes(activeEvent.id)
                        ? 'bg-[#D5F3EE] text-[#062026] border-2 border-[#32C6B2]'
                        : 'bg-[#FF573F] hover:bg-[#E4432C] text-white shadow-[#FF573F]/25 hover:scale-102'
                    }`}
                  >
                    {rsvpdEventIds.includes(activeEvent.id) ? (
                      <>
                        <Check className="w-4 h-4 text-[#1BB6A2]" />
                        <span>RSVP Confirmed (Going)</span>
                      </>
                    ) : (
                      <span>RSVP to Attend</span>
                    )}
                  </button>

                  <Link
                    href="/chat"
                    className="bg-white hover:bg-[#F0FAF8] text-[#0B353D] text-xs font-bold px-4 py-3 rounded-full border-2 border-[#DDEEF1] hover:border-[#32C6B2] transition-colors flex items-center space-x-1.5"
                    title="Join Event Group Discussion"
                  >
                    <MessageCircle className="w-4 h-4 text-[#FF573F]" />
                    <span>Group Chat</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
