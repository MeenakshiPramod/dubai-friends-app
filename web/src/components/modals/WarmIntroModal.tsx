'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Copy, 
  Check, 
  Send, 
  ArrowRight, 
  Users, 
  ShieldCheck, 
  Briefcase,
  Flame,
  MessageSquare
} from 'lucide-react';
import { UserProfile } from '@dubai-friends/shared';
import { MOCK_CURRENT_USER } from '@/lib/mockData';
import { generateWarmIntroDraft } from '@/lib/aiSearch';

interface WarmIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUser: UserProfile | null;
  onSendToChat?: (text: string) => void;
}

export default function WarmIntroModal({
  isOpen,
  onClose,
  targetUser,
  onSendToChat
}: WarmIntroModalProps) {
  const [tone, setTone] = useState<'casual_malayali' | 'professional_referral' | 'event_buddy'>('casual_malayali');
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen || !targetUser) return null;

  const draft = generateWarmIntroDraft(targetUser, MOCK_CURRENT_USER, tone);
  const bridgePerson = targetUser.warm_intro_path?.bridgePerson || 'Mutual Network';

  const handleCopy = () => {
    navigator.clipboard.writeText(draft.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSend = () => {
    setSentSuccess(true);
    if (onSendToChat) {
      onSendToChat(draft.message);
    }
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with YC style gradient */}
        <div className="p-6 bg-gradient-to-r from-amber-500/10 via-indigo-500/5 to-transparent border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900">
                  AI Warm Intro Generator
                </h3>
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  Happenstance Graph
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Replace cold outreach with verified mutual bridges in Dubai
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Visual Warm Bridge Graph */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Warm Introduction Relationship Path</span>
              <span className="text-emerald-600 font-extrabold">98% Warm Path Success</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              {/* You */}
              <div className="flex items-center space-x-2">
                <img
                  src={MOCK_CURRENT_USER.avatar_url}
                  alt="You"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/40"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">You (Meenakshi)</div>
                  <div className="text-[10px] text-slate-500">Student • Dubai</div>
                </div>
              </div>

              {/* Arrow + Bridge */}
              <div className="flex-1 px-4 flex flex-col items-center">
                <div className="w-full flex items-center">
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-400 via-indigo-400 to-emerald-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-indigo-100 mx-1" />
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-indigo-400 to-emerald-400" />
                </div>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full mt-1.5 truncate max-w-[170px]">
                  🤝 Via {bridgePerson}
                </span>
              </div>

              {/* Target */}
              <div className="flex items-center space-x-2">
                <img
                  src={targetUser.avatar_url}
                  alt={targetUser.first_name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/40"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">
                    {targetUser.first_name} {targetUser.last_name}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[120px]">
                    {targetUser.company || targetUser.field_of_study}
                  </div>
                </div>
              </div>
            </div>

            {targetUser.warm_intro_path && (
              <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded-xl border border-slate-100 mt-2">
                💡 <span className="font-semibold text-slate-800">Connection Context:</span> {targetUser.warm_intro_path.note}
              </p>
            )}
          </div>

          {/* Tone Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 flex items-center justify-between">
              <span>Select AI Tone for Introduction</span>
              <span className="text-[11px] text-amber-600 font-semibold">Trained for UAE etiquette</span>
            </label>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => setTone('casual_malayali')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  tone === 'casual_malayali'
                    ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20 text-amber-950 font-bold'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="text-xs font-extrabold flex items-center gap-1.5">
                  <span>🌴 Cultural Warmth</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-normal">
                  Malayali / Student community bonding
                </div>
              </button>

              <button
                onClick={() => setTone('professional_referral')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  tone === 'professional_referral'
                    ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="text-xs font-extrabold flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Job Referral</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-normal">
                  Careem / Dubai corporate opening
                </div>
              </button>

              <button
                onClick={() => setTone('event_buddy')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  tone === 'event_buddy'
                    ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-950 font-bold'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="text-xs font-extrabold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Event Buddy</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-normal">
                  GITEX Expo group meetup invite
                </div>
              </button>
            </div>
          </div>

          {/* Generated AI Pitch Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800">
                AI Drafted Introduction Pitch:
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {draft.message.length} chars
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-sans text-xs leading-relaxed border border-slate-800 whitespace-pre-line relative shadow-inner">
              {draft.message}
            </div>

            {/* Key talking points */}
            <div className="flex flex-wrap gap-2 pt-1">
              {draft.keyTalkingPoints.map((point, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  <span>{point}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Draft</span>
              </>
            )}
          </button>

          <button
            onClick={handleSend}
            disabled={sentSuccess}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-amber-600/25 transition-transform active:scale-95 disabled:bg-emerald-600"
          >
            {sentSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Intro Sent via Chat!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Warm Intro Message</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
