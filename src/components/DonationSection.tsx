import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Campaign } from '../types';
import {
  Heart,
  Share2,
  Users,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  Receipt,
  Search,
  Filter
} from 'lucide-react';

interface Props {
  onDonateToCampaign: (campaign: Campaign) => void;
}

export const DonationSection: React.FC<Props> = ({ onDonateToCampaign }) => {
  const { campaigns, donations, openShareModal, setViewingDonationReceipt } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'সকল প্রকল্প' },
    { id: 'relief', label: 'বন্যা ও ত্রাণ' },
    { id: 'winter', label: 'শীতবস্ত্র' },
    { id: 'education', label: 'শিক্ষা ও এতিম' },
    { id: 'medical', label: 'জরুরি চিকিৎসা' },
  ];

  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesCategory = selectedCategory === 'all' || camp.category === selectedCategory;
    const matchesSearch =
      camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            সক্রিয় প্রকল্প ও অনুদানের খাত
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            আর্তমানবতার পাশে দাঁড়ান আপনার সামর্থ্য অনুযায়ী
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            আপনার দান সরাসরি বিপন্ন মানুষের খাদ্য, আশ্রয় ও চিকিৎসায় ব্যয় হয়। প্রতিটি দানের জন্য তাৎক্ষণিক ডিজিটাল মানি রিসিট প্রদান করা হয়।
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="প্রকল্প বা এলাকা খুঁজুন..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCampaigns.map((camp) => {
          const progressPercent = Math.min(100, Math.round((camp.raisedAmount / camp.targetAmount) * 100));

          return (
            <div
              key={camp.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Cover Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={camp.coverImage}
                  alt={camp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Location and Category on Top */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold rounded-lg flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{camp.location}</span>
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() =>
                      openShareModal(
                        camp.title,
                        `মানবসেবা ফাউন্ডেশনের "${camp.title}" প্রকল্পে অনুদান দিন। আপনার সহযোগিতায় বেঁচে থাকবে আর্তমানবতা।`
                      )
                    }
                    className="p-2 bg-slate-900/70 hover:bg-emerald-600 backdrop-blur-md text-white rounded-lg transition-colors"
                    title="প্রকল্প শেয়ার করুন"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom Overlay Title Info */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base sm:text-lg font-bold leading-snug line-clamp-1">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">
                    {camp.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {camp.description}
                </p>

                {/* Progress Bar & Financials */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">সংগৃহীত: </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        ৳{camp.raisedAmount.toLocaleString('bn-BD')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">লক্ষ্যমাত্রা: </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        ৳{camp.targetAmount.toLocaleString('bn-BD')}
                      </span>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                    <span>অগ্রগতি: {progressPercent}% সম্পন্ন</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      <span>{camp.beneficiariesCount} পরিবার উপকৃত</span>
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onDonateToCampaign(camp)}
                    className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>অনুদানের হাত বাড়ান</span>
                  </button>
                  <button
                    onClick={() =>
                      openShareModal(
                        camp.title,
                        `মানবসেবা ফাউন্ডেশনের "${camp.title}" প্রকল্পে আপনার সহায়তা পৌঁছে দিন।`
                      )
                    }
                    className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors"
                    title="সোশ্যাল মিডিয়ায় প্রচার করুন"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Recent Donations Transparency Strip */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              সাম্প্রতিক অনুদানের লাইভ তালিকা (রিয়েল-টাইম স্বচ্ছতা)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">
            সর্বমোট প্রাপ্তি: {donations.length} টি
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {donations.slice(0, 6).map((d) => (
            <div
              key={d.id}
              className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                  {d.donorName}
                </p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                  ৳{d.amount.toLocaleString('bn-BD')} · {d.method}
                </p>
                <p className="text-[10px] text-slate-400">
                  {d.date} · {d.time}
                </p>
              </div>

              <button
                onClick={() => setViewingDonationReceipt(d)}
                className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 transition-colors shrink-0"
              >
                <Receipt className="w-3 h-3" />
                <span>রসিদ</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
