'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  MapPin, 
  Shuffle, 
  Check, 
  MessageSquare, 
  Filter,
  Search,
  Sparkles,
  ArrowRight,
  Share2,
  Briefcase
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
    <div className="bg-[#FAF8F4] min-h-screen text-[#172520] pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-12 space-y-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#EDE8DE] pb-8">
          <div className="space-y-2">
            <span className="text-xs font-sans text-[#708077] tracking-wider uppercase font-medium">
              Network Discovery
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#10271D]">
              Find People in Dubai
            </h1>
            <p className="text-sm text-[#52665E] max-w-xl font-sans">
              Search by college, cultural background, company, or upcoming events. Every introduction is mapped through verified mutual relationships.
            </p>
          </div>

          <button
            onClick={handleRandomConnect}
            className="inline-flex items-center space-x-2 bg-white hover:bg-[#F5F2EB] text-[#1F4735] text-xs font-medium px-4 py-2.5 rounded-full border border-[#EDE8DE] shadow-xs transition-all self-start sm:self-auto"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#D96B47]" />
            <span>Random Introduction</span>
          </button>
        </div>

        {/* Natural Language Search Bar */}
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-2 sm:p-2.5 border border-[#EDE8DE] shadow-[0_4px_20px_rgba(23,54,40,0.03)] focus-within:border-[#2A5C46] transition-all">
            <div className="flex items-center space-x-3 px-3">
              <Search className="w-5 h-5 text-[#708077] flex-shrink-0" />
              <input
                type="text"
                value={naturalQuery}
                onChange={(e) => setNaturalQuery(e.target.value)}
                placeholder="Ask in plain language: 'Malayali AI students attending GITEX' or 'Who works at Careem?'..."
                className="w-full py-2.5 text-sm sm:text-base bg-transparent text-[#10271D] placeholder:text-[#8D9B93] focus:outline-none font-sans"
              />
              {naturalQuery && (
                <button
                  onClick={() => setNaturalQuery('')}
                  className="text-xs text-[#708077] hover:text-[#10271D] px-2 py-1 font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Prompt Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-[#708077] font-sans">Suggested queries:</span>
            {SUGGESTED_AI_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handlePromptClick(prompt)}
                className="text-xs text-[#4A5E53] bg-white hover:bg-[#E8F1EC] hover:text-[#1F4735] px-3 py-1 rounded-full border border-[#EDE8DE] transition-colors"
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
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                selectedRegion === 'kerala'
                  ? 'bg-[#1F4735] text-white border-[#1F4735]'
                  : 'bg-white text-[#4A5E53] border-[#EDE8DE] hover:bg-[#F5F2EB]'
              }`}
            >
              🌴 Malayalis in Dubai
            </button>

            <button
              onClick={() => setSelectedField(selectedField === 'ai' ? 'all' : 'ai')}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                selectedField === 'ai'
                  ? 'bg-[#1F4735] text-white border-[#1F4735]'
                  : 'bg-white text-[#4A5E53] border-[#EDE8DE] hover:bg-[#F5F2EB]'
              }`}
            >
              AI & Tech Students
            </button>

            <button
              onClick={() => setSelectedField(selectedField === 'business' ? 'all' : 'business')}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                selectedField === 'business'
                  ? 'bg-[#1F4735] text-white border-[#1F4735]'
                  : 'bg-white text-[#4A5E53] border-[#EDE8DE] hover:bg-[#F5F2EB]'
              }`}
            >
              Business & Finance
            </button>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="text-xs px-3.5 py-1.5 rounded-full border border-[#EDE8DE] bg-white text-[#4A5E53] focus:outline-none"
            >
              <option value="all">All Regions</option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>

          <span className="text-xs text-[#708077]">
            Showing <strong className="text-[#10271D]">{filteredResults.length}</strong> members
          </span>
        </div>

        {/* Random Match Card */}
        {randomMatch && (
          <div className="bg-white rounded-3xl p-6 border border-[#D5E4DB] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 animate-in fade-in duration-300">
            <div className="flex items-center space-x-4">
              <img
                src={randomMatch.avatar_url}
                alt={randomMatch.first_name}
                className="w-14 h-14 rounded-2xl object-cover ring-1 ring-[#1F4735]/20"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-lg text-[#10271D]">
                    {randomMatch.first_name} {randomMatch.last_name}
                  </h4>
                  <span className="text-[10px] bg-[#E8F1EC] text-[#1F4735] px-2 py-0.5 rounded-full font-medium">
                    Random Match
                  </span>
                </div>
                <p className="text-xs text-[#52665E]">{randomMatch.bio}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => handleOpenIntroModal(randomMatch)}
                className="flex-1 sm:flex-none text-xs font-medium bg-[#1F4735] hover:bg-[#16382B] text-white px-5 py-2.5 rounded-full transition-all"
              >
                Draft Warm Intro
              </button>
              <button
                onClick={() => setRandomMatch(null)}
                className="text-xs text-[#708077] hover:text-[#10271D] px-3 py-2"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Member Grid - Spacious & Elegant */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map(({ user, relevanceScore, matchHighlights }) => {
            const isConnected = connectedIds.includes(user.id);
            const isMalayali = user.region === 'kerala';

            return (
              <div
                key={user.id}
                className="bg-white rounded-3xl p-6 border border-[#EDE8DE] shadow-[0_2px_12px_rgba(23,54,40,0.02)] hover:border-[#C5D9CD] hover:shadow-[0_4px_20px_rgba(23,54,40,0.04)] transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  
                  {/* Top Status & Region */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#2A5C46] font-medium text-[11px] bg-[#E8F1EC] px-2.5 py-0.5 rounded-full">
                      {relevanceScore}% Relevance
                    </span>

                    <div className="flex items-center gap-1.5">
                      {user.can_refer && (
                        <span className="text-[10px] font-medium bg-[#FDF6F3] text-[#D96B47] px-2 py-0.5 rounded-full">
                          {user.referral_company || 'Referral'}
                        </span>
                      )}
                      {isMalayali && (
                        <span className="text-[10px] text-[#52665E] bg-[#F5F2EB] px-2 py-0.5 rounded-full font-medium">
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
                      className="w-13 h-13 rounded-2xl object-cover ring-1 ring-[#1F4735]/15"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-lg text-[#10271D] leading-tight truncate">
                        {user.first_name} {user.last_name}
                      </h3>
                      <p className="text-xs text-[#708077] truncate mt-0.5">
                        {user.occupation || user.field_of_study}
                      </p>
                      <p className="text-[11px] text-[#8D9B93] flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-[#D96B47]" />
                        <span>{user.dubai_area}</span>
                        {user.company && <span>• {user.company}</span>}
                      </p>
                    </div>
                  </div>

                  {/* Warm Intro Path */}
                  {user.warm_intro_path && (
                    <div className="p-3 rounded-2xl bg-[#F4F7F4] border border-[#E1EDE6] text-left space-y-0.5">
                      <div className="text-[11px] font-medium text-[#1F4735] flex items-center gap-1">
                        <Share2 className="w-3 h-3 text-[#2A5C46]" />
                        <span>Warm path via <strong>{user.warm_intro_path.bridgePerson}</strong></span>
                      </div>
                      <p className="text-[10px] text-[#52665E]">
                        {user.warm_intro_path.note}
                      </p>
                    </div>
                  )}

                  {/* Bio */}
                  <p className="text-xs text-[#52665E] leading-relaxed line-clamp-2">
                    {user.bio}
                  </p>

                  {/* Interests */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {user.interests.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="text-[10px] text-[#4A5E53] bg-[#FAF8F4] px-2 py-0.5 rounded-md border border-[#EDE8DE]"
                      >
                        #{item.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#EDE8DE] flex items-center gap-2">
                  <button
                    onClick={() => handleOpenIntroModal(user)}
                    className="flex-1 text-xs font-medium bg-[#1F4735] hover:bg-[#16382B] text-white py-2.5 px-4 rounded-full transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Draft Warm Intro</span>
                  </button>

                  <button
                    onClick={() => handleConnect(user.id)}
                    className={`text-xs px-3 py-2.5 rounded-full border transition-all ${
                      isConnected
                        ? 'bg-[#E8F1EC] text-[#1F4735] border-[#D5E4DB]'
                        : 'bg-white hover:bg-[#F5F2EB] text-[#4A5E53] border-[#EDE8DE]'
                    }`}
                  >
                    {isConnected ? '✓' : 'Connect'}
                  </button>

                  <Link
                    href="/chat"
                    className="p-2.5 rounded-full border border-[#EDE8DE] hover:bg-[#F5F2EB] text-[#4A5E53] transition-colors"
                    title="Direct Message"
                  >
                    <MessageSquare className="w-4 h-4" />
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
