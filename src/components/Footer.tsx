import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Droplet,
  Smartphone,
  ExternalLink,
  Share2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { orgConfig, setActiveTab, openShareModal } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Foundation Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center p-1 shadow-md">
                <img src={orgConfig.logoUrl} alt={orgConfig.orgName} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white leading-tight">
                  {orgConfig.orgName}
                </h3>
                <p className="text-[11px] text-emerald-400 font-medium">
                  {orgConfig.regNumber}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {orgConfig.slogan}। সমাজের সুবিধাবঞ্চিত ও বিপদগ্রস্ত মানুষের স্থায়ী কল্যাণে আমরা নিবেদিতপ্রাণ।
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs">
              <button
                onClick={() =>
                  openShareModal(
                    orgConfig.orgName,
                    `${orgConfig.orgName} - ${orgConfig.slogan}`
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>সোশ্যাল মিডিয়ায় শেয়ার</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              দ্রুত লিঙ্কসমূহ
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('donations')} className="hover:text-emerald-400 transition-colors">
                  অনুদানের সক্রিয় খাত ও প্রজেক্ট
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ledger')} className="hover:text-emerald-400 transition-colors">
                  স্বচ্ছ আয়-ব্যয় অডিট ও মাসিক ফি লেজার
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('volunteers')} className="hover:text-emerald-400 transition-colors">
                  স্বেচ্ছাসেবীদের তালিকা ও কাজের অগ্রগতি
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-emerald-400 transition-colors">
                  সাহায্য লোকেশন ট্র্যাকিং ম্যাপ
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('activities')} className="hover:text-emerald-400 transition-colors">
                  সাম্প্রতিক কাজ ও ছবির প্রমাণ
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blood')} className="hover:text-emerald-400 transition-colors">
                  রক্তদাতা সন্ধান ও জরুরি অ্যাম্বুলেন্স SOS
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('notices')} className="hover:text-emerald-400 transition-colors">
                  অফিসিয়াল নোটিশ বোর্ড
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Donation Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              অনুদান পাঠানোর হিসাব
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <p className="font-semibold text-pink-400 text-[11px]">বিকাশ (মার্চেন্ট ও পার্সোনাল):</p>
                <p className="font-mono text-white text-xs font-bold">{orgConfig.bkashNumber}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <p className="font-semibold text-orange-400 text-[11px]">নগদ (পার্সোনাল):</p>
                <p className="font-mono text-white text-xs font-bold">{orgConfig.nagadNumber}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <p className="font-semibold text-emerald-400 text-[11px]">ব্যাংক হিসাব:</p>
                <p className="text-[11px] text-white font-medium">{orgConfig.bankDetails.bankName}</p>
                <p className="font-mono text-xs text-slate-300">হিসাব: {orgConfig.bankDetails.accountNumber}</p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Emergencies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              যোগাযোগ ও জরুরি হেল্পলাইন
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{orgConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>হটলাইন: <a href={`tel:${orgConfig.hotlinePhone}`} className="text-white hover:underline font-mono">{orgConfig.hotlinePhone}</a></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Droplet className="w-4 h-4 text-red-400 shrink-0" />
                <span>জরুরি SOS: <a href={`tel:${orgConfig.emergencyPhone}`} className="text-red-300 hover:underline font-mono font-bold">{orgConfig.emergencyPhone}</a></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{orgConfig.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {orgConfig.orgName}। সকল অধিকার সংরক্ষিত।
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>১০০% পাবলিক অডিট ও স্বচ্ছতা নিশ্চয়তা</span>
            </span>
            <span>·</span>
            <span>অফলাইন মোড সাপোর্টেড PWA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
