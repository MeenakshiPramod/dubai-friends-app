'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  MapPin, 
  Shuffle, 
  Check, 
  MessageSquare, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Share2, 
  Flame,
  Zap
} from 'lucide-react';
import { MOCK_USERS, MOCK_CURRENT_USER } from '@/lib/mockData';
import { REGIONS, UserProfile } from '@dubai-friends/shared';
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
    <div className="bg-[#FDFBF7] min-h-screen text-[#0B353D] pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Page Header with Framed Gen-Z aesthetic */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b-2 border-[#DDEEF1] pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#D5F3EE] text-[#062026] uppercase tracking-wider">
                ⚡ Gen-Z People Graph
              </span>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FFE5E0] text-[#E4432C]">
                🌴 Dubai • Kerala Bridge
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#0B353D] font-extrabold tracking-tight">
              Discover Your Circle in Dubai
            </h1>
            <p className="text-sm text-[#1B6370] max-w-xl font-normal leading-relaxed">
              Match through common colleges, cultural heritage, tech stacks, and shared hostel hubs. All with verified mutual warm bridges.
            </p>
          </div>

          <button
            onClick={handleRandomConnect}
            className="inline-flex items-center space-x-2 bg-white hover:bg-[#F0FAF8] text-[#0B353D] text-xs font-bold px-5 py-3 rounded-full border-2 border-[#A9E8DE] shadow-sm hover:border-[#32C6B2] transition-all self-start sm:self-auto hover:scale-105"
          >
            <Shuffle className="w-4 h-4 text-[#FF573F]" />
            <span>Random Vibe Check</span>
          </button>
        </div>

        {/* Natural Language Search Bar */}
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-2 sm:p-2.5 border-2 border-[#A9E8DE] shadow-md focus-within:border-[#FF573F] transition-all">
            <div className="flex items-center space-x-3 px-3">
              <Search className="w-5 h-5 text-[#1BB6A2] flex-shrink-0" />
              <input
                type="text"
                value={naturalQuery}
                onChange={(e) => setNaturalQuery(e.target.value)}
                placeholder="Ask in conversational language: 'Malayali AI students attending GITEX' or 'Who works at Careem?'..."
                className="w-full py-2.5 text-xs sm:text-sm bg-transparent text-[#0B353D] placeholder:text-[#1B6370]/50 focus:outline-none font-medium"
              />
              {naturalQuery && (
                <button
                  onClick={() => setNaturalQuery('')}
                  className="text-xs text-[#1B6370] hover:text-[#0B353D] px-2 py-1 font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Prompt Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-[#1B6370] font-bold">Try quick prompts:</span>
            {SUGGESTED_AI_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handlePromptClick(prompt)}
                className="text-xs text-[#0B353D] bg-white hover:bg-[#D5F3EE] hover:text-[#062026] px-3.5 py-1 rounded-full border border-[#DDEEF1] hover:border-[#32C6B2] transition-all shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedRegion(selectedRegion === 'kerala' ? 'all' : 'kerala')}
              className={`text-xs font-bold px-4 py-2 rounded-full border-2 transition-all ${
                selectedRegion === 'kerala'
                  ? 'bg-[#0B353D] text-white border-[#0B353D]'
                  : 'bg-white text-[#1B6370] border-[#DDEEF1] hover:border-[#32C6B2]'
              }`}
            >
              🌴 Malayalis in Dubai
            </button>

            <button
              onClick={() => setSelectedField(selectedField === 'ai' ? 'all' : 'ai')}
              className={`text-xs font-bold px-4 py-2 rounded-full border-2 transition-all ${
                selectedField === 'ai'
                  ? 'bg-[#0B353D] text-white border-[#0B353D]'
                  : 'bg-white text-[#1B6370] border-[#DDEEF1] hover:border-[#32C6B2]'
              }`}
            >
              🤖 AI & Tech Builders
            </button>

            <button
              onClick={() => setSelectedField(selectedField === 'business' ? 'all' : 'business')}
              className={`text-xs font-bold px-4 py-2 rounded-full border-2 transition-all ${
                selectedField === 'business'
                  ? 'bg-[#0B353D] text-white border-[#0B353D]'
                  : 'bg-white text-[#1B6370] border-[#DDEEF1] hover:border-[#32C6B2]'
              }`}
            >
              💼 Business & Growth
            </button>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="text-xs font-medium px-4 py-2 rounded-full border-2 border-[#DDEEF1] bg-white text-[#1B6370] focus:outline-none focus:border-[#32C6B2]"
            >
              <option value="all">All Heritage Regions</option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>

          <span className="text-xs text-[#1B6370] font-medium">
            Showing <strong className="text-[#0B353D] font-bold">{filteredResults.length}</strong> active members
          </span>
        </div>

        {/* Random Match Card */}
        {randomMatch && (
          <div className="bg-[#D5F3EE]/70 rounded-3xl p-6 border-2 border-[#32C6B2] shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 animate-in fade-in duration-300">
            <div className="flex items-center space-x-4">
              <img
                src={randomMatch.avatar_url}
                alt={randomMatch.first_name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#FF573F]"
              />
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-xl text-[#0B353D] font-bold">
                    {randomMatch.first_name} {randomMatch.last_name}
                  </h4>
                  <span className="text-[10px] bg-[#FF573F] text-white px-2.5 py-0.5 rounded-full font-bold">
                    Random Vibe Match
                  </span>
                </div>
                <p className="text-xs text-[#1B6370]">{randomMatch.bio}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => handleOpenIntroModal(randomMatch)}
                className="flex-1 sm:flex-none text-xs font-bold bg-[#FF573F] hover:bg-[#E4432C] text-white px-6 py-2.5 rounded-full shadow-md transition-all hover:scale-105"
              >
                Draft Warm Intro
              </button>
              <button
                onClick={() => setRandomMatch(null)}
                className="text-xs font-bold text-[#1B6370] hover:text-[#0B353D] px-3 py-2"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Member Grid - Youthful Pastel Framed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map(({ user, relevanceScore, matchHighlights }) => {
            const isConnected = connectedIds.includes(user.id);
            const isMalayali = user.region === 'kerala';

            return (
              <div
                key={user.id}
                className="bg-white rounded-3xl p-6 border-2 border-[#DDEEF1] hover:border-[#32C6B2] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4 text-left">
                  
                  {/* Top Status & Region */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#062026] font-bold text-[11px] bg-[#D5F3EE] border border-[#A9E8DE] px-3 py-0.5 rounded-full">
                      {relevanceScore}% Match
                    </span>

                    <div className="flex items-center gap-1.5">
                      {user.can_refer && (
                        <span className="text-[10px] font-bold bg-[#FFE5E0] text-[#E4432C] px-2.5 py-0.5 rounded-full border border-[#FFCBC2]">
                          Referral Available
                        </span>
                      )}
                      {isMalayali && (
                        <span className="text-[10px] text-[#0B353D] bg-[#F0FAF8] px-2.5 py-0.5 rounded-full font-bold border border-[#C2E1E6]">
                          🌴 Malayali
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Avatar & Name */}
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={user.avatar_url}
                      alt={user.first_name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#32C6B2]/40 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-lg font-bold text-[#0B353D] leading-tight truncate">
                        {user.first_name} {user.last_name}
                      </h3>
                      <p className="text-xs text-[#1B6370] truncate mt-0.5 font-medium">
                        {user.occupation || user.field_of_study}
                      </p>
                      <p className="text-[11px] text-[#1B6370]/70 flex items-center gap-1 mt-0.5 truncate font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#FF573F]" />
                        <span>{user.dubai_area}</span>
                        {user.company && <span>• {user.company}</span>}
                      </p>
                    </div>
                  </div>

                  {/* Warm Intro Path */}
                  {user.warm_intro_path && (
                    <div className="p-3.5 rounded-2xl bg-[#D5F3EE]/60 border border-[#A9E8DE] text-left space-y-1">
                      <div className="text-[11px] font-bold text-[#0B353D] flex items-center gap-1.5">
                        <Share2 className="w-3.5 h-3.5 text-[#1BB6A2]" />
                        <span>Warm Bridge: via <strong>{user.warm_intro_path.bridgePerson}</strong></span>
                      </div>
                      <p className="text-[11px] text-[#1B6370] font-light">
                        {user.warm_intro_path.note}
                      </p>
                    </div>
                  )}

                  {/* Bio */}
                  <p className="text-xs text-[#1B6370] leading-relaxed line-clamp-2">
                    {user.bio}
                  </p>

                  {/* Interests */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {user.interests.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-medium text-[#0B353D] bg-[#FDFBF7] px-2.5 py-0.5 rounded-full border border-[#DDEEF1]"
                      >
                        #{item.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions with Punchy Gen-Z Colors */}
                <div className="pt-4 border-t border-[#DDEEF1] flex items-center gap-2">
                  <button
                    onClick={() => handleOpenIntroModal(user)}
                    className="flex-1 text-xs font-bold bg-[#FF573F] hover:bg-[#E4432C] text-white py-2.5 px-4 rounded-full transition-all shadow-md shadow-[#FF573F]/20 flex items-center justify-center space-x-1.5 hover:scale-102"
                  >
                    <span>Draft Warm Intro</span>
                  </button>

                  <button
                    onClick={() => handleConnect(user.id)}
                    className={`text-xs font-bold px-4 py-2.5 rounded-full border-2 transition-all ${
                      isConnected
                        ? 'bg-[#D5F3EE] text-[#062026] border-[#32C6B2]'
                        : 'bg-white hover:bg-[#F0FAF8] text-[#0B353D] border-[#DDEEF1]'
                    }`}
                  >
                    {isConnected ? '✓ Added' : 'Connect'}
                  </button>

                  <Link
                    href="/chat"
                    className="p-2.5 rounded-full border-2 border-[#DDEEF1] hover:border-[#32C6B2] hover:bg-[#F0FAF8] text-[#0B353D] transition-colors"
                    title="Direct Message"
                  >
                    <MessageSquare className="w-4 h-4 text-[#1BB6A2]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Warm Intro Modal */}
        <WarmIntroModal
          isOpen={isIntroModalOpen}
          onClose={() => setIsIntroModalOpen(false)}
          targetUser={selectedUserForIntro}
          onSendToChat={(message) => {
            alert(`Warm Intro sent to chat: \n\n${message}`);
          }}
        />
      </div>
    </div>
  );
}
