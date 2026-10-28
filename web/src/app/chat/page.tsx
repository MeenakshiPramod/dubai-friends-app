'use client';

import { useState } from 'react';
import { 
  Send, 
  Users, 
  Circle
} from 'lucide-react';
import { MOCK_CONVERSATIONS, MOCK_CURRENT_USER } from '@/lib/mockData';

export default function ChatPage() {
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>(MOCK_CONVERSATIONS[0].id);
  const [inputText, setInputText] = useState('');
  
  // Store messages per conversation
  const [messagesMap, setMessagesMap] = useState<Record<string, Array<{ id: string; sender: string; text: string; time: string; isMe: boolean }>>>({
    'conv-1': [
      { id: '1', sender: 'Rahul Menon', text: 'Hey Meenakshi! Welcome to Dubai! Are you studying at Middlesex or Wollongong?', time: '11:45 AM', isMe: false },
      { id: '2', sender: 'Meenakshi', text: 'Hey Rahul! I am focusing on AI engineering and exploring data science study circles. Are you attending GITEX this weekend?', time: '11:50 AM', isMe: true },
      { id: '3', sender: 'Rahul Menon', text: 'Yes, definitely! There is a group of us Malayali students meeting at DWTC. Let us coordinate travel!', time: '11:52 AM', isMe: false }
    ],
    'conv-2': [
      { id: '1', sender: 'Ananya Sharma', text: 'Hi everyone! Who is heading to the Career Fair from Business Bay or Marina?', time: '09:15 AM', isMe: false },
      { id: '2', sender: 'Rahul Menon', text: 'I am taking the red line metro from Academic City / Centerpoint!', time: '09:20 AM', isMe: false },
      { id: '3', sender: 'Meenakshi', text: 'Let us meet up near DWTC Metro Station Exit 2 at 9:30 AM so we can enter together!', time: '09:22 AM', isMe: true },
      { id: '4', sender: 'Sneha Nair', text: 'Sounds perfect! Bringing my resume copies too.', time: '09:25 AM', isMe: false }
    ]
  });

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];
  const currentMessages = messagesMap[activeConvId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: MOCK_CURRENT_USER.first_name,
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessagesMap({
      ...messagesMap,
      [activeConvId]: [...currentMessages, newMessage]
    });

    setInputText('');
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#0B353D] pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-10 space-y-6">
        
        {/* Header */}
        <div className="border-b-2 border-[#DDEEF1] pb-6 space-y-1 text-left">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#D5F3EE] text-[#062026] uppercase tracking-wider">
              💬 Direct & IRL Channels
            </span>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FFE5E0] text-[#E4432C]">
              Zero Spam Enforced
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#0B353D] font-extrabold tracking-tight">
            Community Conversations
          </h1>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-3xl border-2 border-[#DDEEF1] shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
          
          {/* Left Column: Conversation List */}
          <div className="md:col-span-4 border-r-2 border-[#DDEEF1] flex flex-col bg-[#FDFBF7]">
            <div className="p-4 border-b-2 border-[#DDEEF1] bg-white flex items-center justify-between text-left">
              <span className="text-xs font-serif font-bold text-[#0B353D]">Active Channels</span>
              <span className="text-[10px] text-[#062026] bg-[#D5F3EE] px-2.5 py-0.5 rounded-full font-bold">
                {conversations.length} Active
              </span>
            </div>

            <div className="divide-y divide-[#DDEEF1] overflow-y-auto flex-1 text-left">
              {conversations.map((conv) => {
                const isActive = conv.id === activeConvId;
                const isGroup = conv.type === 'group';

                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`p-4 cursor-pointer transition-colors flex items-start space-x-3.5 ${
                      isActive ? 'bg-[#D5F3EE]' : 'hover:bg-[#F0FAF8]'
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      {isGroup ? (
                        <div className="w-11 h-11 rounded-2xl bg-[#0B353D] text-[#32C6B2] flex items-center justify-center font-bold text-sm shadow-xs">
                          <Users className="w-5 h-5" />
                        </div>
                      ) : (
                        <>
                          <img
                            src={conv.participants[0]?.avatar_url}
                            alt="Avatar"
                            className="w-11 h-11 rounded-2xl object-cover ring-2 ring-[#32C6B2]/30"
                          />
                          {conv.participants[0]?.is_online && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#1BB6A2] rounded-full ring-2 ring-white" />
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-[#0B353D] truncate">
                          {isGroup ? conv.title : `${conv.participants[0]?.first_name} ${conv.participants[0]?.last_name}`}
                        </h4>
                        <span className="text-[10px] text-[#1B6370]">
                          {conv.last_message?.created_at}
                        </span>
                      </div>

                      <p className="text-xs text-[#1B6370] truncate mt-1">
                        {conv.last_message?.content}
                      </p>

                      {isGroup && (
                        <span className="inline-block mt-1.5 text-[9px] font-sans font-bold text-[#E4432C] bg-[#FFE5E0] px-2.5 py-0.5 rounded-full">
                          Travel & Meetup Group
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Chat Window */}
          <div className="md:col-span-8 flex flex-col bg-white h-full text-left">
            
            {/* Header */}
            <div className="p-4 border-b-2 border-[#DDEEF1] flex items-center justify-between bg-white">
              <div className="flex items-center space-x-3">
                {activeConv.type === 'group' ? (
                  <div className="w-10 h-10 rounded-2xl bg-[#0B353D] text-[#32C6B2] flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={activeConv.participants[0]?.avatar_url}
                      alt="Avatar"
                      className="w-10 h-10 rounded-2xl object-cover ring-2 ring-[#32C6B2]/30"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#1BB6A2] rounded-full ring-2 ring-white" />
                  </div>
                )}

                <div>
                  <h3 className="font-serif text-base font-bold text-[#0B353D]">
                    {activeConv.type === 'group' ? activeConv.title : `${activeConv.participants[0]?.first_name} ${activeConv.participants[0]?.last_name}`}
                  </h3>
                  <p className="text-[11px] text-[#1B6370] flex items-center gap-1.5">
                    {activeConv.type === 'group' ? (
                      <span>{activeConv.participants.length + 1} community members</span>
                    ) : (
                      <>
                        <Circle className="w-2 h-2 fill-[#1BB6A2] text-[#1BB6A2]" />
                        <span className="font-medium text-[#1BB6A2]">Active in Dubai</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#FDFBF7]">
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
                >
                  {!msg.isMe && (
                    <span className="text-[11px] text-[#1B6370] mb-1 ml-1 font-bold">
                      {msg.sender}
                    </span>
                  )}
                  <div
                    className={`max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      msg.isMe
                        ? 'bg-[#0B353D] text-white font-medium'
                        : 'bg-white text-[#0B353D] border-2 border-[#DDEEF1]'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#1B6370]/60 mt-1 mx-1">
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3.5 border-t-2 border-[#DDEEF1] bg-white flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 text-xs px-4 py-3 rounded-full border-2 border-[#DDEEF1] focus:outline-none focus:border-[#32C6B2] bg-[#FDFBF7] text-[#0B353D]"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-[#FF573F] hover:bg-[#E4432C] disabled:bg-[#DDEEF1] disabled:text-[#1B6370] text-white p-3 rounded-full transition-all flex items-center justify-center shadow-md shadow-[#FF573F]/25 hover:scale-105"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
