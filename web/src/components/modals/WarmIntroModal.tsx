'use client';

import { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Send, 
  Share2, 
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
  const bridgePerson = targetUser.warm_intro_path?.bridgePerson || 'Mutual Connection';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B353D]/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#FDFBF7] rounded-[2rem] max-w-xl w-full border-2 border-[#DDEEF1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b-2 border-[#DDEEF1] flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-[#FF573F] uppercase tracking-wider">
              ✨ AI Warm Introduction Bridge
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0B353D]">
              Draft Introduction
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#1B6370] hover:text-[#0B353D] hover:bg-[#D5F3EE] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Bridge Path Visualization */}
          <div className="p-4 rounded-2xl bg-[#D5F3EE]/70 border-2 border-[#A9E8DE] flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-3">
              <img
                src={MOCK_CURRENT_USER.avatar_url}
                alt="You"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#32C6B2]"
              />
              <div className="text-xs">
                <strong className="block text-[#0B353D] font-bold">You</strong>
                <span className="text-[#1B6370]">Meenakshi</span>
              </div>
            </div>

            <div className="flex flex-col items-center px-4">
              <div className="text-[11px] text-[#062026] font-bold bg-white border border-[#32C6B2] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                <Share2 className="w-3 h-3 text-[#FF573F]" />
                <span>Via {bridgePerson}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <img
                src={targetUser.avatar_url}
                alt={targetUser.first_name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#FF573F]"
              />
              <div className="text-xs text-right">
                <strong className="block text-[#0B353D] font-bold">{targetUser.first_name}</strong>
                <span className="text-[#1B6370] truncate max-w-[100px] block">{targetUser.company || targetUser.dubai_area}</span>
              </div>
            </div>
          </div>

          {/* Tone Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0B353D] block">
              Pick Your Tone & Context:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTone('casual_malayali')}
                className={`p-3 rounded-2xl border-2 text-left transition-all ${
                  tone === 'casual_malayali'
                    ? 'bg-[#FFE5E0] border-[#FF573F] text-[#E4432C] font-bold shadow-xs'
                    : 'bg-white border-[#DDEEF1] text-[#1B6370] hover:border-[#32C6B2]'
                }`}
              >
                <div className="text-xs">🌴 Malayali Warmth</div>
                <div className="text-[10px] opacity-80 mt-0.5">Cultural roots</div>
              </button>

              <button
                onClick={() => setTone('professional_referral')}
                className={`p-3 rounded-2xl border-2 text-left transition-all ${
                  tone === 'professional_referral'
                    ? 'bg-[#D5F3EE] border-[#32C6B2] text-[#062026] font-bold shadow-xs'
                    : 'bg-white border-[#DDEEF1] text-[#1B6370] hover:border-[#32C6B2]'
                }`}
              >
                <div className="text-xs">💼 Career Referral</div>
                <div className="text-[10px] opacity-80 mt-0.5">Job recommendation</div>
              </button>

              <button
                onClick={() => setTone('event_buddy')}
                className={`p-3 rounded-2xl border-2 text-left transition-all ${
                  tone === 'event_buddy'
                    ? 'bg-[#FFE5E0] border-[#FF573F] text-[#E4432C] font-bold shadow-xs'
                    : 'bg-white border-[#DDEEF1] text-[#1B6370] hover:border-[#32C6B2]'
                }`}
              >
                <div className="text-xs">🎟️ Event Buddy</div>
                <div className="text-[10px] opacity-80 mt-0.5">GITEX meetup</div>
              </button>
            </div>
          </div>

          {/* Draft Preview */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#0B353D] block">
              Generated Message:
            </span>
            <div className="p-4 rounded-2xl bg-white border-2 border-[#DDEEF1] text-xs leading-relaxed text-[#0B353D] font-sans whitespace-pre-line shadow-xs">
              {draft.message}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-white border-t-2 border-[#DDEEF1] flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="text-xs font-bold text-[#0B353D] hover:bg-[#D5F3EE] bg-[#FDFBF7] px-4 py-2.5 rounded-full border border-[#A9E8DE] transition-colors flex items-center space-x-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#1BB6A2]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#1B6370]" />
                <span>Copy Draft</span>
              </>
            )}
          </button>

          <button
            onClick={handleSend}
            disabled={sentSuccess}
            className="text-xs font-bold bg-[#FF573F] hover:bg-[#E4432C] text-white px-6 py-2.5 rounded-full transition-all flex items-center space-x-1.5 shadow-md shadow-[#FF573F]/25 hover:scale-105"
          >
            {sentSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Sent to Chat!</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch to Direct Chat</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
