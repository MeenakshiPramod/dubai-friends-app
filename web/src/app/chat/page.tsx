'use client';

import { useState } from 'react';
import { 
  Send, 
  Users, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Sparkles, 
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
      { id: '3', sender: 'Rahul Menon', text: 'Yes, definitely! There is a group of us Malayali students meeting at DWTC. Let us coordinate!', time: '11:52 AM', isMe: false }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-left">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
        {/* Left Column: Conversation List */}
        <div className="md:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 bg-white">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center justify-between">
              <span>Messages & Groups</span>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                {conversations.length} active
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Chat with connected friends & event buddies</p>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {conversations.map((conv) => {
              const isActive = conv.id === activeConvId;
              const isGroup = conv.type === 'group';

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`p-3.5 cursor-pointer transition-colors flex items-start space-x-3 ${
                    isActive ? 'bg-amber-50/80 border-l-4 border-amber-600' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    {isGroup ? (
                      <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        <Users className="w-5 h-5" />
                      </div>
                    ) : (
                      <>
                        <img
                          src={conv.participants[0]?.avatar_url}
                          alt="Avatar"
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm"
                        />
                        {conv.participants[0]?.is_online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
                        )}
                      </>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {isGroup ? conv.title : `${conv.participants[0]?.first_name} ${conv.participants[0]?.last_name}`}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {conv.last_message?.created_at}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {conv.last_message?.content}
                    </p>

                    {isGroup && (
                      <span className="inline-block mt-1 text-[9px] font-extrabold uppercase tracking-wide bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded">
                        Event Group
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Chat Window */}
        <div className="md:col-span-8 flex flex-col bg-white h-full">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-3">
              {activeConv.type === 'group' ? (
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
                  <Users className="w-5 h-5" />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={activeConv.participants[0]?.avatar_url}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/20"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                </div>
              )}

              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  {activeConv.type === 'group' ? activeConv.title : `${activeConv.participants[0]?.first_name} ${activeConv.participants[0]?.last_name}`}
                </h3>
                <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  {activeConv.type === 'group' ? (
                    <span>{activeConv.participants.length + 1} members attending together</span>
                  ) : (
                    <>
                      <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
                      <span>Online • Dubai</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {activeConv.type === 'group' && (
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg">
                Going together 🎟️
              </span>
            )}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/40">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
              >
                {!msg.isMe && (
                  <span className="text-[11px] font-bold text-slate-500 mb-1 ml-1">
                    {msg.sender}
                  </span>
                )}
                <div
                  className={`max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.isMe
                      ? 'bg-amber-600 text-white rounded-br-xs font-medium'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 mx-1">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-3.5 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message to Dubai friends..."
              className="flex-1 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-amber-600 hover:bg-amber-700 disabled:bg-slate-200 disabled:text-slate-400 text-white p-3 rounded-xl shadow-md shadow-amber-600/20 transition-all flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
