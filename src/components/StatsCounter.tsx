import React from 'react';
import { useApp } from '../context/AppContext';
import { DollarSign, ShieldCheck, HeartHandshake, Users, MapPin, Sparkles } from 'lucide-react';

export const StatsCounter: React.FC = () => {
  const { donations, expenses, members, reliefLocations, campaigns } = useApp();

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const reserveFund = Math.max(0, totalDonations - totalExpenses);
  const totalBeneficiaries = reliefLocations.reduce((sum, l) => sum + l.beneficiariesCount, 0);
  const activeMembersCount = members.filter(m => m.status === 'active').length;
  const districtsCoveredCount = new Set(reliefLocations.map(l => l.district)).size;

  const stats = [
    {
      label: 'মোট সংগৃহীত অনুদান',
      value: `৳${totalDonations.toLocaleString('bn-BD')}`,
      sub: 'সর্বমোট প্রাপ্তি ও তহবিল',
      icon: DollarSign,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800/60'
    },
    {
      label: 'মোট ব্যয়িত ত্রাণ ও পুনর্বাসন',
      value: `৳${totalExpenses.toLocaleString('bn-BD')}`,
      sub: '১০০% অডিটকৃত পাবলিক ভাউচার',
      icon: ShieldCheck,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      border: 'border-blue-200 dark:border-blue-800/60'
    },
    {
      label: 'বর্তমান মজুত তহবিল',
      value: `৳${reserveFund.toLocaleString('bn-BD')}`,
      sub: 'জরুরি সহায়তার জন্য প্রস্তুত',
      icon: HeartHandshake,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800/60'
    },
    {
      label: 'উপকৃত পরিবার ও মানুষ',
      value: `${totalBeneficiaries.toLocaleString('bn-BD')}+`,
      sub: 'সরাসরি সহায়তা পৌঁছানো হয়েছে',
      icon: Sparkles,
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/40',
      border: 'border-teal-200 dark:border-teal-800/60'
    },
    {
      label: 'সক্রিয় নিবন্ধিত সদস্য',
      value: `${activeMembersCount.toLocaleString('bn-BD')} জন`,
      sub: 'নিবেদিতপ্রাণ সমাজকর্মী',
      icon: Users,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      border: 'border-indigo-200 dark:border-indigo-800/60'
    },
    {
      label: 'ত্রাণ বিতরণকৃত জেলা',
      value: `${districtsCoveredCount.toLocaleString('bn-BD')}টি`,
      sub: 'প্রত্যন্ত চরাঞ্চল ও উপকূল',
      icon: MapPin,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      border: 'border-rose-200 dark:border-rose-800/60'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-xl border ${item.border} ${item.bg} transition-transform hover:-translate-y-0.5 duration-200`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 line-clamp-1">
                {item.label}
              </span>
              <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
            </div>
            <p className={`text-base sm:text-lg font-black tracking-tight ${item.color}`}>
              {item.value}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
              {item.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
};
