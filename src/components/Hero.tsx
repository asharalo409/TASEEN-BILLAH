import React from 'react';
import { useApp } from '../context/AppContext';
import {
  HeartHandshake,
  KeyRound,
  ShieldCheck,
  Droplet,
  PhoneCall,
  MapPin,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onOpenDonate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDonate }) => {
  const { orgConfig, currentUser, setIsLoginModalOpen, setActiveTab } = useApp();

  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl mb-8">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${orgConfig.coverUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-emerald-950/70" />
      </div>

      {/* Decorative Blur Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 sm:py-16 md:py-20 text-white">
        {/* Top Mini Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-300 mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          <span>{orgConfig.regNumber} · অরাজনৈতিক স্বেচ্ছাসেবী কল্যাণ সংস্থা</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-4">
          <span className="text-white">{orgConfig.orgName}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-2xl sm:text-4xl mt-2 font-bold">
            {orgConfig.slogan}
          </span>
        </h1>

        {/* Mission Description */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-8">
          {orgConfig.missionStatement} আমাদের প্রতিটি অনুদান ও সদস্য ফির পূর্ণাঙ্গ হিসাব পাবলিক ড্যাশবোর্ডে স্বচ্ছতার সাথে সার্বক্ষণিক উন্মুক্ত থাকে।
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
          <button
            onClick={onOpenDonate}
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-xl shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95"
          >
            <HeartHandshake className="w-4 h-4 text-slate-950" />
            <span>অনুদানের হাত বাড়ান</span>
          </button>

          {!currentUser ? (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm rounded-xl transition-colors"
            >
              <KeyRound className="w-4 h-4 text-emerald-300" />
              <span>সিক্রেট কোড লগইন / সদস্য হোন</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('volunteers')}
              className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 rounded-xl transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>স্বেচ্ছাসেবক ড্যাশবোর্ড ({currentUser.name})</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('ledger')}
            className="flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            <span>স্বচ্ছ আয়-ব্যয় অডিট</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Emergency Hotline Strip */}
        <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <span className="text-slate-300 font-medium">জরুরি সহায়তা ২৪/৭ হটলাইন:</span>
            <a
              href={`tel:${orgConfig.emergencyPhone}`}
              className="font-bold text-amber-300 hover:underline flex items-center gap-1 font-mono tracking-wider text-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{orgConfig.emergencyPhone}</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <button
              onClick={() => setActiveTab('blood')}
              className="hover:text-red-300 flex items-center gap-1 transition-colors"
            >
              <Droplet className="w-3.5 h-3.5 text-red-400" />
              <span>জরুরি রক্তদাতা খুঁজুন</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setActiveTab('map')}
              className="hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>সাহায্য লোকেশন ম্যাপ</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
