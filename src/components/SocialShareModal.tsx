import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Send,
  Globe
} from 'lucide-react';

export const SocialShareModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen, shareData, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen || !shareData) return null;

  const currentUrl = shareData.url || window.location.href;
  const shareText = `${shareData.title}\n${shareData.text}\n\n`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareText}${currentUrl}`);
    setCopied(true);
    showToast('শেয়ারিং লিঙ্ক কপি করা হয়েছে!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=450');
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
    window.open(url, '_blank');
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.title)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=450');
  };

  const handleTelegramShare = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-6 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-lg">
              <Share2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              সোশ্যাল মিডিয়ায় শেয়ার ও প্রচার করুন
            </h3>
          </div>
          <button
            onClick={() => setIsShareModalOpen(false)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview snippet */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 mb-4 space-y-1">
          <p className="font-bold text-slate-900 dark:text-white line-clamp-1">
            {shareData.title}
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-[11px] line-clamp-2">
            {shareData.text}
          </p>
        </div>

        {/* Social Platforms Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {/* Facebook */}
          <button
            onClick={handleFacebookShare}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold transition-colors"
          >
            <span className="font-bold">Facebook</span>
          </button>

          {/* WhatsApp */}
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          {/* Twitter / X */}
          <button
            onClick={handleTwitterShare}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors border border-slate-700"
          >
            <span className="font-mono font-bold">X (Twitter)</span>
          </button>

          {/* Telegram */}
          <button
            onClick={handleTelegramShare}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#229ED9] hover:bg-[#1e8ec3] text-white font-semibold transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Telegram</span>
          </button>
        </div>

        {/* Copy Link Input */}
        <div>
          <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1 text-[11px]">
            সরাসরি লিংক কপি করুন
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 font-mono text-[11px] border border-slate-200 dark:border-slate-700 truncate"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shrink-0 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে' : 'কপি'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
