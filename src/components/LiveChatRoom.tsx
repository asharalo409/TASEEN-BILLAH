import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Users,
  User,
  Send,
  Smile,
  ShieldCheck,
  CheckCheck,
  Lock,
  Search,
  Sparkles
} from 'lucide-react';

export const LiveChatRoom: React.FC = () => {
  const {
    chatMessages,
    sendChatMessage,
    currentUser,
    members,
    activeChatRecipient,
    setActiveChatRecipient,
    t
  } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [chatSearch, setChatSearch] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const isCommunity = activeChatRecipient === 'community';
  const recipientMember = members.find(m => m.id === activeChatRecipient);

  // Filter messages for current view
  const currentMessages = chatMessages.filter(msg => {
    if (isCommunity) {
      return msg.recipientId === 'community';
    } else {
      // 1-on-1 between currentUser and recipientMember
      const myId = currentUser?.id || 'guest';
      return (
        (msg.senderId === myId && msg.recipientId === activeChatRecipient) ||
        (msg.senderId === activeChatRecipient && msg.recipientId === myId)
      );
    }
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    sendChatMessage(activeChatRecipient, messageInput.trim());
    setMessageInput('');
  };

  const handleEmojiClick = (emoji: string) => {
    setMessageInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const emojiList = ['❤️', '🤲', '👏', '👍', '🤝', '🌸', '💡', '✅'];

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row h-[650px]">
      {/* Left Sidebar: Channels & Member Contacts (1-on-1 selector) */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50 dark:bg-slate-850">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {t('চ্যাট ও বার্তা হাব', 'Live Chat & Messaging')}
            </h3>
          </div>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
            লাইভ
          </span>
        </div>

        {/* Channels List */}
        <div className="p-3 space-y-1 overflow-y-auto flex-1 text-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
            সাধারণ রুম
          </p>

          {/* Community Group Chat */}
          <button
            onClick={() => setActiveChatRecipient('community')}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left ${
              isCommunity
                ? 'bg-emerald-600 text-white font-bold shadow-sm'
                : 'hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <div className={`p-2 rounded-lg ${isCommunity ? 'bg-white/20' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600'}`}>
              <Users className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate">কমিউনিটি চ্যাট রুম (সকলের জন্য)</p>
              <p className={`text-[10px] truncate ${isCommunity ? 'text-emerald-100' : 'text-slate-400'}`}>
                ত্রাণ সমন্বয় ও আলোচনা
              </p>
            </div>
          </button>

          {/* 1-on-1 Direct Messaging Contacts */}
          <div className="pt-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2 flex items-center justify-between">
              <span>ব্যক্তিগত ১-অন-১ চ্যাট</span>
              <Lock className="w-3 h-3 text-slate-400" />
            </p>

            <div className="space-y-1">
              {members
                .filter(m => m.id !== currentUser?.id)
                .map((member) => {
                  const isSelected = activeChatRecipient === member.id;
                  return (
                    <button
                      key={member.id}
                      onClick={() => setActiveChatRecipient(member.id)}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-all text-left ${
                        isSelected
                          ? 'bg-emerald-600 text-white font-bold shadow-sm'
                          : 'hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover border shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate text-xs">{member.name}</p>
                        <p className={`text-[10px] truncate ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                          {member.role}
                        </p>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Active Chat Conversation Box */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            {isCommunity ? (
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            ) : (
              <img
                src={recipientMember?.avatar}
                alt={recipientMember?.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500"
              />
            )}
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {isCommunity ? 'মানবসেবা যৌথ কমিউনিটি চ্যাট রুম' : `${recipientMember?.name} (ব্যক্তিগত চ্যাট)`}
              </h4>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {isCommunity ? `${members.length} জন সক্রিয় সদস্য যুক্ত আছেন` : `${recipientMember?.role} · নিরাপদ বার্তা`}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {currentMessages.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <MessageSquare className="w-10 h-10 mx-auto opacity-40 text-emerald-600" />
              <p>এখনও কোনো বার্তা আদান-প্রদান হয়নি। প্রথম বার্তাটি পাঠান!</p>
            </div>
          ) : (
            currentMessages.map((msg) => {
              const isMine = msg.senderId === (currentUser?.id || 'guest');

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 max-w-lg ${isMine ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-8 h-8 rounded-full object-cover border shrink-0 mt-0.5"
                  />
                  <div className={`space-y-1 ${isMine ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-[11px]">
                        {msg.senderName}
                      </span>
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isMine
                          ? 'bg-emerald-600 text-white rounded-tr-none'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/80 dark:border-slate-700/80'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 relative bg-slate-50 dark:bg-slate-800/40">
          {/* Quick Emoji Bar */}
          <div className="flex items-center gap-1.5 mb-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] text-slate-400 font-medium">কুইক রিঅ্যাকশন:</span>
            {emojiList.map(em => (
              <button
                key={em}
                type="button"
                onClick={() => handleEmojiClick(em)}
                className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-700 border hover:scale-110 transition-transform text-sm"
              >
                {em}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={isCommunity ? 'কমিউনিটিতে বার্তা লিখুন...' : `${recipientMember?.name}-কে ব্যক্তিগত বার্তা পাঠান...`}
              className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-colors shrink-0"
              title="পাঠান"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
