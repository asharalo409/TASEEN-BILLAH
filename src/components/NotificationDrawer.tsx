import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Bell,
  CheckCheck,
  Heart,
  Droplet,
  Award,
  FileText,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    notifications,
    unreadNotifsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setActiveTab
  } = useApp();

  if (!isOpen) return null;

  const handleNotificationClick = (notif: any) => {
    markNotificationAsRead(notif.id);
    if (notif.linkTab) {
      setActiveTab(notif.linkTab);
      onClose();
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'donation':
        return <Heart className="w-4 h-4 text-emerald-600 fill-emerald-600" />;
      case 'emergency':
        return <Droplet className="w-4 h-4 text-red-600 fill-red-600" />;
      case 'task':
        return <Award className="w-4 h-4 text-amber-600" />;
      case 'notice':
        return <FileText className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  const formatBengaliTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return (
        date.toLocaleDateString('bn-BD', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) +
        ' · ' +
        date.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
      );
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-slide-left">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                রিয়েল-টাইম নোটিফিকেশন সেন্টার
              </h2>
              <p className="text-[11px] text-slate-500">
                {unreadNotifsCount > 0 ? `${unreadNotifsCount}টি অপঠিত আপডেট আছে` : 'সকল নোটিফিকেশন আপ-টু-ডেট'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {unreadNotifsCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="p-1.5 text-slate-500 hover:text-emerald-600 rounded-lg text-xs"
                title="সব পড়া হয়েছে মার্ক করুন"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              এখনও কোনো নোটিফিকেশন নেই।
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`pt-3 first:pt-0 p-3 rounded-xl cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                  !notif.read
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-l-4 border-emerald-500'
                    : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                      <span>{formatBengaliTime(notif.timestamp)}</span>
                      {notif.linkTab && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                          <span>দেখুন</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">
            প্রতিটি আর্থিক লেনদেন ও কাজের হালনাগাদ তাৎক্ষণিকভাবে নিবন্ধিত হয়
          </p>
        </div>
      </div>
    </div>
  );
};
