'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Sparkles, 
  MapPin, 
  GraduationCap, 
  Shuffle, 
  Check, 
  MessageSquare, 
  Filter,
  Search
} from 'lucide-react';
import { MOCK_USERS } from '@/lib/mockData';
import { REGIONS, USER_STATUS_OPTIONS } from '@dubai-friends/shared';

export default function DiscoverPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedField, setSelectedField] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const [randomMatch, setRandomMatch] = useState<any>(null);

  const handleConnect = (userId: string) => {
    if (!connectedIds.includes(userId)) {
      setConnectedIds([...connectedIds, userId]);
    }
  };

  const handleRandomConnect = () => {
    const randomUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
    setRandomMatch(randomUser);
  };

  const filteredUsers = MOCK_USERS.filter((user) => {
    if (selectedRegion !== 'all' && user.region !== selectedRegion) return false;
    if (selectedStatus !== 'all' && user.user_status !== selectedStatus) return false;
    if (selectedField !== 'all') {
      if (selectedField === 'ai' && !user.field_of_study?.toLowerCase().includes('ai')) return false;
      if (selectedField === 'business' && !user.field_of_study?.toLowerCase().includes('business')) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = `${user.first_name} ${user.last_name}`.toLowerCase().includes(q);
      const matchBio = user.bio?.toLowerCase().includes(q);
      const matchField = user.field_of_study?.toLowerCase().includes(q);
      const matchArea = user.dubai_area?.toLowerCase().includes(q);
      return matchName || matchBio || matchField || matchArea;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Match Algorithm</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Find Friends in Dubai</h1>
          <p className="text-sm text-slate-500">
            Connect with students, builders, and professionals who share your cultural background and career passions.
          </p>
        </div>

        <button
          onClick={handleRandomConnect}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold px-4 py-2.5 rounded-xl shadow-md shadow-amber-500/20 text-sm transition-transform active:scale-95"
        >
          <Shuffle className="w-4 h-4" />
          <span>Random Connect</span>
        </button>
      </div>

      {/* Random Match Modal / Alert */}
      {randomMatch && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center space-x-4">
            <img src={randomMatch.avatar_url} alt={randomMatch.first_name} className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-500" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-base">You were matched with {randomMatch.first_name}!</span>
                <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">98% Match</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">{randomMatch.bio}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => handleConnect(randomMatch.id)}
              className="flex-1 sm:flex-none text-xs font-bold bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
            >
              {connectedIds.includes(randomMatch.id) ? 'Connected ✓' : 'Send Request'}
            </button>
            <button
              onClick={() => setRandomMatch(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, university, AI, business, or neighborhood (e.g. Marina)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </span>

          {/* Quick Malayalam Community Filter */}
          <button
            onClick={() => setSelectedRegion(selectedRegion === 'kerala' ? 'all' : 'kerala')}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
              selectedRegion === 'kerala'
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            🌴 Malayalis in Dubai
          </button>

          {/* AI Students Filter */}
          <button
            onClick={() => setSelectedField(selectedField === 'ai' ? 'all' : 'ai')}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
              selectedField === 'ai'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            🤖 AI Students
          </button>

          {/* Business & Finance Filter */}
          <button
            onClick={() => setSelectedField(selectedField === 'business' ? 'all' : 'business')}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
              selectedField === 'business'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            💼 Business Students
          </button>

          {/* Region Dropdown */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
          >
            <option value="all">All Regions / Nationalities</option>
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
          >
            <option value="all">All Roles (Student, Job Seeker, etc.)</option>
            {USER_STATUS_OPTIONS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          const isConnected = connectedIds.includes(user.id);
          const isMalayali = user.region === 'kerala';

          return (
            <div
              key={user.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-300 transition-all p-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Profile Photo + Online status */}
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <img
                      src={user.avatar_url}
                      alt={user.first_name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm"
                    />
                    {user.is_online ? (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white" title="Online now" />
                    ) : (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-300 rounded-full ring-2 ring-white" title="Offline" />
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {isMalayali && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        🌴 Malayali
                      </span>
                    )}
                    <span className="text-[11px] font-medium text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded-full">
                      {user.user_status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Name & Field */}
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 flex items-center gap-1 mt-0.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{user.field_of_study || user.occupation || 'Dubai Resident'}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{user.dubai_area || 'Dubai'}</span>
                    {user.university && <span>• {user.university}</span>}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {user.bio}
                </p>

                {/* Interests Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {user.interests.map((intId) => (
                    <span
                      key={intId}
                      className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                    >
                      #{intId.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center gap-2">
                <button
                  onClick={() => handleConnect(user.id)}
                  className={`flex-1 flex items-center justify-center space-x-1.5 text-xs font-bold py-2.5 px-3 rounded-xl transition-all ${
                    isConnected
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                  }`}
                >
                  {isConnected ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Request Sent</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-4 h-4" />
                      <span>Connect</span>
                    </>
                  )}
                </button>

                <Link
                  href="/chat"
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Message"
                >
                  <MessageSquare className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
