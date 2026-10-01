import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Calendar,
  Moon,
  Sun,
  Sparkles,
  MapPin,
  BellRing
} from 'lucide-react';

export const CalendarClockWidget: React.FC = () => {
  const { language, t } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format English Time
  const timeEn = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  // Format Bengali Time
  const timeBn = currentTime.toLocaleTimeString('bn-BD', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  // Format English Gregorian Date
  const dateEn = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format Bengali Gregorian Date
  const dateBn = currentTime.toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Bangla Calendar Calculation (Approximate standard Bengali Era - 1433 বঙ্গাব্দ, আশ্বিন মাস, শরৎকাল)
  // Bengali Month calculation relative to September 30:
  // September 30 corresponds to approx 15 Ashwin (আশ্বিন) 1433 Bangabda, Sharat Ritu (শরৎকাল).
  const banglaDateStr = '১৫ আশ্বিন, ১৪৩৩ বঙ্গাব্দ (শরৎকাল)';
  const banglaDateEn = '15 Ashwin, 1433 Bangabda (Autumn)';

  // Islamic Hijri Date (Approximate based on lunar cycle: 18 Rabi al-Thani 1448 AH)
  const hijriDateStr = '১৮ রবিউস সানি, ১৪৪৮ হিজরি';
  const hijriDateEn = '18 Rabi al-Thani, 1448 AH';

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-emerald-700/50 overflow-hidden relative">
      {/* Background Subtle Accent */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Live Clock */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start pb-3 md:pb-0 border-b md:border-b-0 md:border-r border-emerald-700/60 md:pr-6">
          <div className="p-2.5 rounded-xl bg-emerald-800/80 border border-emerald-600/60 text-emerald-300">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-emerald-300 uppercase tracking-widest font-semibold block">
              {t('লাইভ ডিজিটাল ঘড়ি (বাংলাদেশ সময়)', 'Live Digital Clock (BST)')}
            </span>
            <p className="text-xl sm:text-2xl font-black font-mono tracking-wider text-white">
              {language === 'bn' ? timeBn : timeEn}
            </p>
          </div>
        </div>

        {/* Center: Three Concurrent Calendars (English, Bengali, Islamic Hijri) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full flex-1 text-xs">
          {/* 1. English Gregorian */}
          <div className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10 flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-emerald-300 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-emerald-200 block font-medium">
                {t('ইংরেজি ক্যালেন্ডার', 'Gregorian Calendar')}
              </span>
              <p className="font-bold text-white text-xs truncate">
                {language === 'bn' ? dateBn : dateEn}
              </p>
            </div>
          </div>

          {/* 2. Bangla Calendar */}
          <div className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10 flex items-center gap-2.5">
            <Sun className="w-4 h-4 text-amber-300 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-amber-200 block font-medium">
                {t('বাংলা সন ও ঋতু', 'Bangla Calendar')}
              </span>
              <p className="font-bold text-white text-xs truncate">
                {language === 'bn' ? banglaDateStr : banglaDateEn}
              </p>
            </div>
          </div>

          {/* 3. Islamic Hijri Calendar */}
          <div className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10 flex items-center gap-2.5">
            <Moon className="w-4 h-4 text-teal-300 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-teal-200 block font-medium">
                {t('ইসলামিক হিজরি ক্যালেন্ডার', 'Islamic Hijri')}
              </span>
              <p className="font-bold text-white text-xs truncate">
                {language === 'bn' ? hijriDateStr : hijriDateEn}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quick Humanitarian Reminder */}
        <div className="hidden lg:flex items-center gap-2 bg-emerald-950/60 px-3 py-2 rounded-xl border border-emerald-700/60 text-xs shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-emerald-200 text-[11px]">
            {t('“মানুষের সেবা করা সর্বোত্তম ইবাদত”', '"Serving humanity is the highest virtue"')}
          </span>
        </div>
      </div>
    </div>
  );
};
