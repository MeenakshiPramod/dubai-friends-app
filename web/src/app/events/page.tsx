'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Briefcase, 
  Check, 
  MessageCircle,
  Plus,
  ArrowRight
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
    <div className="bg-[#FAF8F4] min-h-screen text-[#172520] pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-12 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#EDE8DE] pb-8">
          <div className="space-y-2">
            <span className="text-xs font-sans text-[#708077] tracking-wider uppercase font-medium">
              Community Calendar & Map
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#10271D]">
              Gatherings & Job Fairs
            </h1>
            <p className="text-sm text-[#52665E] max-w-xl font-sans">
              Discover career expos and community meetups across Dubai. RSVP and coordinate travel so you can attend with peers.
            </p>
          </div>

          <Link
            href="/org"
            className="inline-flex items-center space-x-2 bg-[#1F4735] hover:bg-[#16382B] text-white text-xs font-medium px-5 py-2.5 rounded-full transition-all self-start sm:self-auto shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Host an Event</span>
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#1F4735] text-white border-[#1F4735]'
                : 'bg-white text-[#4A5E53] border-[#EDE8DE] hover:bg-[#F5F2EB]'
            }`}
          >
            All Events ({MOCK_EVENTS.length})
          </button>

          <button
            onClick={() => setSelectedCategory('job_fair')}
            className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
              selectedCategory === 'job_fair'
                ? 'bg-[#D96B47] text-white border-[#D96B47]'
                : 'bg-[#FDF6F3] text-[#D96B47] border-[#F4D2C5] hover:bg-[#FAE8E2]'
            }`}
          >
            💼 Career Expos & Job Fairs
          </button>

          {EVENT_CATEGORIES.filter(c => c.id !== 'job_fair').map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#1F4735] text-white border-[#1F4735]'
                  : 'bg-white text-[#4A5E53] border-[#EDE8DE] hover:bg-[#F5F2EB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Map & Event Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Soft Parchment Dubai Interactive Map Representation */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EDE8DE] shadow-[0_2px_12px_rgba(23,54,40,0.02)] overflow-hidden">
            <div className="p-4 bg-[#F5F2EB] border-b border-[#EDE8DE] flex items-center justify-between text-xs text-[#52665E]">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#D96B47]" />
                <span className="font-serif text-sm font-semibold text-[#10271D]">Dubai Locations</span>
              </div>
              <span className="font-sans text-[11px] text-[#708077]">Interactive Map</span>
            </div>

            {/* Clean, botanical canvas */}
            <div className="p-6 bg-[#FAF8F4] space-y-4">
              <div className="text-[11px] font-sans text-[#708077] uppercase tracking-wider flex justify-between border-b border-[#EDE8DE] pb-2">
                <span>Downtown / Marina / Academic City</span>
                <span>Tap pin to view details</span>
              </div>

              <div className="space-y-3 pt-2">
                {filteredEvents.map((ev) => {
                  const isSelected = activeEvent?.id === ev.id;
                  const isAttending = rsvpdEventIds.includes(ev.id);

                  return (
                    <div
                      key={ev.id}
                      onClick={() => setActiveEvent(ev)}
                      className={`cursor-pointer transition-all p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-white border-[#1F4735] shadow-[0_4px_16px_rgba(31,71,53,0.08)]'
                          : 'bg-white/70 border-[#EDE8DE] hover:border-[#CBDCD1]'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-serif text-sm font-bold ${
                          ev.is_job_event 
                            ? 'bg-[#FDF6F3] text-[#D96B47]' 
                            : 'bg-[#E8F1EC] text-[#1F4735]'
                        }`}>
                          {ev.is_job_event ? '💼' : '📍'}
                        </div>
                        <div>
                          <h4 className="font-serif text-base text-[#10271D] leading-snug">
                            {ev.title}
                          </h4>
                          <p className="text-xs text-[#708077] flex items-center gap-1.5 mt-0.5">
                            <span>{ev.venue_name}</span>
                            <span>•</span>
                            <span className="text-[#2A5C46] font-medium">{ev.dubai_area}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-sans text-[#708077]">
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
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#EDE8DE] shadow-[0_2px_12px_rgba(23,54,40,0.02)] p-6 space-y-6">
              <div className="rounded-2xl overflow-hidden aspect-video bg-[#F5F2EB]">
                <img
                  src={activeEvent.cover_image_url}
                  alt={activeEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-sans text-[#D96B47] uppercase tracking-wider font-semibold">
                  {activeEvent.dubai_area}
                </span>
                <h2 className="font-serif text-2xl text-[#10271D]">
                  {activeEvent.title}
                </h2>
                <p className="text-xs text-[#708077]">
                  Hosted by <strong className="text-[#10271D]">{activeEvent.organizer_name}</strong>
                </p>
              </div>

              {/* Timing & Venue */}
              <div className="space-y-2 text-xs text-[#52665E] bg-[#FAF8F4] p-4 rounded-2xl border border-[#EDE8DE]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1F4735] flex-shrink-0" />
                  <span>{new Date(activeEvent.starts_at).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D96B47] flex-shrink-0" />
                  <span>{activeEvent.venue_name}, {activeEvent.venue_address}</span>
                </div>
              </div>

              {/* Companies if job fair */}
              {activeEvent.participating_companies && (
                <div className="space-y-2">
                  <span className="text-[11px] font-sans text-[#708077] uppercase tracking-wider block">
                    Participating Teams & Recruiters:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeEvent.participating_companies.map((c: string) => (
                      <span key={c} className="text-xs bg-[#E8F1EC] text-[#1F4735] px-2.5 py-1 rounded-lg">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-[#52665E] leading-relaxed">
                {activeEvent.description}
              </p>

              {/* Actions */}
              <div className="pt-4 border-t border-[#EDE8DE] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#708077]">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#1F4735]" />
                    <span>{activeEvent.rsvp_count} community members going</span>
                  </span>
                  <span className="text-[#2A5C46] font-medium">Free Entrance</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleRSVP(activeEvent.id)}
                    className={`flex-1 text-xs font-semibold py-3 px-4 rounded-full transition-all flex items-center justify-center space-x-1.5 ${
                      rsvpdEventIds.includes(activeEvent.id)
                        ? 'bg-[#E8F1EC] text-[#1F4735] border border-[#D5E4DB]'
                        : 'bg-[#1F4735] hover:bg-[#16382B] text-white shadow-xs'
                    }`}
                  >
                    {rsvpdEventIds.includes(activeEvent.id) ? (
                      <>
                        <Check className="w-4 h-4 text-[#1F4735]" />
                        <span>RSVP Confirmed (Going)</span>
                      </>
                    ) : (
                      <span>RSVP to Attend</span>
                    )}
                  </button>

                  <Link
                    href="/chat"
                    className="bg-[#FAF8F4] hover:bg-[#F5F2EB] text-[#1F4735] text-xs font-medium px-4 py-3 rounded-full border border-[#EDE8DE] transition-colors flex items-center space-x-1.5"
                    title="Join Event Group Discussion"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D96B47]" />
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
