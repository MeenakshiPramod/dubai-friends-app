'use client';

import { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Send, 
  Share2, 
  Briefcase,
  Calendar,
  Sparkles
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
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    setSentSuccess(true);
    if (onSendToChat) {
      onSendToChat(draft.message);
    }
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10271D]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#FAF8F4] rounded-3xl max-w-xl w-full border border-[#EDE8DE] shadow-[0_20px_50px_rgba(23,54,40,0.12)] overflow-hidden flex flex-col max-h-[90vh] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#EDE8DE] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-sans text-[#708077] uppercase tracking-wider font-medium">
              Warm Intro Path
            </span>
            <h3 className="font-serif text-2xl text-[#10271D]">
              Introduction Draft
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#708077] hover:text-[#10271D] hover:bg-[#F5F2EB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Bridge Path */}
          <div className="p-4 rounded-2xl bg-white border border-[#EDE8DE] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={MOCK_CURRENT_USER.avatar_url}
                alt="You"
                className="w-9 h-9 rounded-full object-cover ring-1 ring-[#1F4735]/20"
              />
              <div className="text-xs">
                <strong className="block text-[#10271D]">You</strong>
                <span className="text-[#708077]">Meenakshi</span>
              </div>
            </div>

            <div className="flex flex-col items-center px-4">
              <div className="text-[10px] text-[#2A5C46] font-semibold bg-[#E8F1EC] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Share2 className="w-2.5 h-2.5" />
                <span>Via {bridgePerson}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <img
                src={targetUser.avatar_url}
                alt={targetUser.first_name}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-[#1F4735]/20"
              />
              <div className="text-xs text-right">
                <strong className="block text-[#10271D]">{targetUser.first_name}</strong>
                <span className="text-[#708077] truncate max-w-[100px] block">{targetUser.company || targetUser.dubai_area}</span>
              </div>
            </div>
          </div>

          {/* Tone Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#10271D] block">
              Choose Context:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTone('casual_malayali')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  tone === 'casual_malayali'
                    ? 'bg-[#E8F1EC] border-[#1F4735] text-[#1F4735] font-semibold'
                    : 'bg-white border-[#EDE8DE] text-[#52665E] hover:bg-[#F5F2EB]'
                }`}
              >
                <div className="text-xs">🌴 Community</div>
                <div className="text-[10px] text-[#708077] mt-0.5">Malayali & students</div>
              </button>

              <button
                onClick={() => setTone('professional_referral')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  tone === 'professional_referral'
                    ? 'bg-[#E8F1EC] border-[#1F4735] text-[#1F4735] font-semibold'
                    : 'bg-white border-[#EDE8DE] text-[#52665E] hover:bg-[#F5F2EB]'
                }`}
              >
                <div className="text-xs">💼 Career Referral</div>
                <div className="text-[10px] text-[#708077] mt-0.5">Job recommendation</div>
              </button>

              <button
                onClick={() => setTone('event_buddy')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  tone === 'event_buddy'
                    ? 'bg-[#E8F1EC] border-[#1F4735] text-[#1F4735] font-semibold'
                    : 'bg-white border-[#EDE8DE] text-[#52665E] hover:bg-[#F5F2EB]'
                }`}
              >
                <div className="text-xs">🎟️ Event Buddy</div>
                <div className="text-[10px] text-[#708077] mt-0.5">GITEX meetup</div>
              </button>
            </div>
          </div>

          {/* Letter Preview */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#10271D] block">
              Personalized Draft:
            </span>
            <div className="p-4 rounded-2xl bg-white border border-[#EDE8DE] text-xs leading-relaxed text-[#172520] font-sans whitespace-pre-line shadow-xs">
              {draft.message}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-white border-t border-[#EDE8DE] flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="text-xs font-medium text-[#4A5E53] hover:text-[#10271D] bg-[#FAF8F4] hover:bg-[#F5F2EB] px-4 py-2.5 rounded-full border border-[#EDE8DE] transition-colors flex items-center space-x-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#2A5C46]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy text</span>
              </>
            )}
          </button>

          <button
            onClick={handleSend}
            disabled={sentSuccess}
            className="text-xs font-semibold bg-[#1F4735] hover:bg-[#16382B] text-white px-6 py-2.5 rounded-full transition-all flex items-center space-x-1.5 shadow-xs"
          >
            {sentSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#D5E8DD]" />
                <span>Sent to Chat!</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send to Chat</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
