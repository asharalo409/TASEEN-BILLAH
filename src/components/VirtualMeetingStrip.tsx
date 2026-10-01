import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Video,
  ExternalLink,
  MessageCircle,
  Send,
  Users,
  Settings,
  Share2,
  Tv
} from 'lucide-react';

export const VirtualMeetingStrip: React.FC = () => {
  const { orgConfig, setIsSettingsModalOpen, currentUser, t } = useApp();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <h3 className="font-bold text-slate-900 dark:text-white">
            {t('ভার্চুয়াল মিটিং ও সোশ্যাল কমিউনিটি হাব', 'Virtual Meeting & Social Community Hub')}
          </h3>
          <span className="text-[11px] text-slate-400">
            {t('(সরাসরি যুক্ত হোন)', '(Join Directly)')}
          </span>
        </div>

        {currentUser?.isAdmin && (
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="flex items-center gap-1 text-[11px] text-emerald-600 hover:underline font-semibold self-start sm:self-auto"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{t('মিটিং লিংক সম্পাদনা', 'Edit Meeting Links')}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
        {/* Zoom */}
        <a
          href={orgConfig.zoomMeetingUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-100 transition-colors font-semibold"
        >
          <Video className="w-4 h-4 text-blue-600" />
          <span>Zoom সভা</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>

        {/* Google Meet */}
        <a
          href={orgConfig.googleMeetUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 hover:bg-emerald-100 transition-colors font-semibold"
        >
          <Video className="w-4 h-4 text-emerald-600" />
          <span>Google Meet</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>

        {/* WhatsApp Group */}
        <a
          href={orgConfig.whatsappGroupUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-900/60 hover:bg-green-100 transition-colors font-semibold"
        >
          <MessageCircle className="w-4 h-4 text-green-600" />
          <span>WhatsApp গ্রুপ</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>

        {/* Facebook Group */}
        <a
          href={orgConfig.facebookGroupUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-900/60 hover:bg-sky-100 transition-colors font-semibold"
        >
          <Users className="w-4 h-4 text-sky-600" />
          <span>Facebook গ্রুপ</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>

        {/* Telegram */}
        <a
          href={orgConfig.telegramUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-900/60 hover:bg-cyan-100 transition-colors font-semibold"
        >
          <Send className="w-4 h-4 text-cyan-600" />
          <span>Telegram চ্যানেল</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>

        {/* YouTube */}
        <a
          href={orgConfig.youtubeUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100 transition-colors font-semibold"
        >
          <Tv className="w-4 h-4 text-rose-600" />
          <span>YouTube চ্যানেল</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      </div>
    </div>
  );
};
