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
  Search,
  ArrowRight,
  Send,
  Zap,
  Briefcase,
  Share2,
  BrainCircuit,
  CornerDownRight,
  CheckCircle2
} from 'lucide-react';
import { MOCK_USERS, MOCK_CURRENT_USER } from '@/lib/mockData';
import { REGIONS, USER_STATUS_OPTIONS, UserProfile } from '@dubai-friends/shared';
import { executeNaturalLanguageSearch, SUGGESTED_AI_PROMPTS } from '@/lib/aiSearch';
import WarmIntroModal from '@/components/modals/WarmIntroModal';

export default function DiscoverPage() {
  const [naturalQuery, setNaturalQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedField, setSelectedField] = useState<string>('all');
  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const [randomMatch, setRandomMatch] = useState<any>(null);

  // Modal state
  const [selectedUserForIntro, setSelectedUserForIntro] = useState<UserProfile | null>(null);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);

  const handleConnect = (userId: string) => {
    if (!connectedIds.includes(userId)) {
      setConnectedIds([...connectedIds, userId]);
    }
  };

  const handleRandomConnect = () => {
    const randomUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
    setRandomMatch(randomUser);
  };

  const handlePromptClick = (prompt: string) => {
    // Strip leading emojis or symbols
    const cleanPrompt = prompt.replace(/^[^a-zA-Z0-9\s]+/, '').trim();
    setNaturalQuery(cleanPrompt);
  };

  const handleOpenIntroModal = (user: UserProfile) => {
    setSelectedUserForIntro(user);
    setIsIntroModalOpen(true);
  };

  // Run natural language ranking engine
  const rankedResults = executeNaturalLanguageSearch(naturalQuery, MOCK_USERS, MOCK_CURRENT_USER);

  // Apply secondary pill filters if set
  const filteredResults = rankedResults.filter(({ user }) => {
    if (selectedRegion !== 'all' && user.region !== selectedRegion) return false;
    if (selectedStatus !== 'all' && user.user_status !== selectedStatus) return false;
    if (selectedField !== 'all') {
      if (selectedField === 'ai' && !user.field_of_study?.toLowerCase().includes('ai')) return false;
      if (selectedField === 'business' && !user.field_of_study?.toLowerCase().includes('business')) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* YC Pitch Mode Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-indigo-500/10 to-amber-500/5 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            YC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                YC Pitch Prototype • Happenstance × Dubai Friends
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Active Intelligence
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Semantic Relationship Graph & Warm Intro Pathfinding across Dubai expat communities.
            </p>
          </div>
        </div>

        <button
          onClick={handleRandomConnect}
          className="inline-flex items-center space-x-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-colors self-end sm:self-auto"
        >
          <Shuffle className="w-3.5 h-3.5 text-amber-600" />
          <span>Random Connect</span>
        </button>
      </div>

      {/* Main Header & Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold border border-indigo-100">
          <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" />
          <span>Natural Language People Search</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Find Any Expat or Student in Dubai
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          Ask in plain English. Our Happenstance-powered graph scans cultural roots, university majors, mutual friends, and corporate referral badges in real-time.
        </p>
      </div>

      {/* Happenstance-Style Natural Language Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-amber-300 shadow-xl shadow-amber-500/5 space-y-3 relative overflow-hidden">
        <div className="relative flex items-center">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <input
            type="text"
            value={naturalQuery}
            onChange={(e) => setNaturalQuery(e.target.value)}
            placeholder="Type naturally: 'Find Malayali AI students attending GITEX' or 'Who can refer me at Careem?'..."
            className="w-full pl-12 pr-28 py-3.5 text-sm sm:text-base font-medium rounded-2xl bg-slate-50/70 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 transition-all placeholder:text-slate-400"
          />
          {naturalQuery && (
            <button
              onClick={() => setNaturalQuery('')}
              className="absolute right-4 text-xs font-bold text-slate-400 hover:text-slate-700 px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Suggested AI Prompts Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Zap className="w-3 h-3 text-amber-500" /> Try Asking:
          </span>
          {SUGGESTED_AI_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handlePromptClick(prompt)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 border border-slate-200 transition-all active:scale-95 text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Fast Filters (Malayali, AI, Business, Dubai Area) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Fast Filters:
          </span>

          <button
            onClick={() => setSelectedRegion(selectedRegion === 'kerala' ? 'all' : 'kerala')}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
              selectedRegion === 'kerala'
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            🌴 Malayalis in Dubai
          </button>

          <button
            onClick={() => setSelectedField(selectedField === 'ai' ? 'all' : 'ai')}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
              selectedField === 'ai'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            🤖 AI Students
          </button>

          <button
            onClick={() => setSelectedField(selectedField === 'business' ? 'all' : 'business')}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
              selectedField === 'business'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            💼 Business Students
          </button>

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
        </div>

        <div className="text-xs font-bold text-slate-500">
          Showing <span className="text-amber-700 font-extrabold">{filteredResults.length}</span> verified profiles
        </div>
      </div>

      {/* Random Match Card Alert */}
      {randomMatch && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center space-x-4">
            <img src={randomMatch.avatar_url} alt={randomMatch.first_name} className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-500 shadow-sm" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-base">Instant Match with {randomMatch.first_name}!</span>
                <span className="text-xs bg-amber-200 text-amber-900 font-extrabold px-2 py-0.5 rounded-full">✨ 98% Match</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">{randomMatch.bio}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => handleOpenIntroModal(randomMatch)}
              className="flex-1 sm:flex-none text-xs font-bold bg-amber-600 text-white px-4 py-2.5 rounded-xl hover:bg-amber-700 flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Draft Warm Intro</span>
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

      {/* User Profiles Grid with Happenstance Warm Graph Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.map(({ user, relevanceScore, matchHighlights, warmIntroText, suggestedAction }) => {
          const isConnected = connectedIds.includes(user.id);
          const isMalayali = user.region === 'kerala';

          return (
            <div
              key={user.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between relative group"
            >
              {/* Relevance Score Pill */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 text-amber-900 text-[11px] font-extrabold shadow-2xs">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>{relevanceScore}% Match</span>
                </span>

                <div className="flex items-center gap-1.5">
                  {user.can_refer && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      <span>{user.referral_company || 'Referral'}</span>
                    </span>
                  )}
                  {isMalayali && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      🌴 Malayali
                    </span>
                  )}
                </div>
              </div>

              {/* User Avatar + Identity */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <div className="relative flex-shrink-0">
                    <img
                      src={user.avatar_url}
                      alt={user.first_name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm group-hover:ring-amber-400/40 transition-all"
                    />
                    {user.is_online ? (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white" title="Online now" />
                    ) : (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-300 rounded-full ring-2 ring-white" title="Offline" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-extrabold text-slate-900 leading-tight truncate">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-xs font-bold text-amber-700 truncate mt-0.5">
                      {user.occupation || user.field_of_study || 'Community Member'}
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      <span>{user.dubai_area || 'Dubai'}</span>
                      {user.company && <span>• {user.company}</span>}
                    </p>
                  </div>
                </div>

                {/* Warm Intro Relationship Bridge */}
                {user.warm_intro_path && (
                  <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-left space-y-1">
                    <div className="flex items-center space-x-1.5 text-[11px] font-bold text-indigo-900">
                      <Share2 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                      <span>Warm Intro Path:</span>
                      <span className="underline font-extrabold">{user.warm_intro_path.bridgePerson}</span>
                    </div>
                    <p className="text-[10px] text-indigo-700 leading-tight">
                      {user.warm_intro_path.note}
                    </p>
                  </div>
                )}

                {/* Bio */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {user.bio}
                </p>

                {/* AI Match Highlights Box */}
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Why AI Matched This Person:
                  </div>
                  <div className="space-y-1">
                    {matchHighlights.slice(0, 2).map((h, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

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

              {/* Action Buttons: AI Intro & Connect */}
              <div className="pt-4 border-t border-slate-100 mt-5 space-y-2">
                <button
                  onClick={() => handleOpenIntroModal(user)}
                  className="w-full flex items-center justify-center space-x-1.5 text-xs font-bold py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-600 text-white shadow-md shadow-amber-500/20 transition-transform active:scale-98"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Draft AI Warm Intro</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleConnect(user.id)}
                    className={`flex-1 flex items-center justify-center space-x-1 text-xs font-bold py-2 px-3 rounded-xl border transition-all ${
                      isConnected
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-3.5 h-3.5" />
                        <span>Quick Connect</span>
                      </>
                    )}
                  </button>

                  <Link
                    href="/chat"
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
                    title="Direct Message"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Warm Intro Modal */}
      <WarmIntroModal
        isOpen={isIntroModalOpen}
        onClose={() => setIsIntroModalOpen(false)}
        targetUser={selectedUserForIntro}
        onSendToChat={(message) => {
          alert(`Warm Intro sent directly to chat! Message: \n\n${message}`);
        }}
      />
    </div>
  );
}
