import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { initialYearlyAudits } from '../data/initialData';
import {
  FileText,
  DollarSign,
  TrendingUp,
  Calendar,
  Users,
  CheckCircle,
  Download,
  Printer,
  ChevronRight,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export const MultiYearFinancialAudit: React.FC = () => {
  const { members, donations, expenses, t } = useApp();
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);

  const currentAudit = initialYearlyAudits[selectedYearIndex] || initialYearlyAudits[0];

  // Current month (September 2026) calculations
  const thisMonthExpenses = expenses.filter(e => e.date.includes('০৯') || e.date.includes('09'));
  const thisMonthDonations = donations.filter(d => d.date.includes('০৯') || d.date.includes('09'));
  const thisMonthExpenseTotal = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const thisMonthDonationTotal = thisMonthDonations.reduce((sum, d) => sum + d.amount, 0);
  const thisMonthFeesTotal = members.filter(m => m.monthlyFees['2026-09'] === 'paid').length * 500;
  const thisMonthTotalIncome = thisMonthDonationTotal + thisMonthFeesTotal;
  const thisMonthNet = thisMonthTotalIncome - thisMonthExpenseTotal;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>{t('বাৎসরিক ও গত বছরের স্বচ্ছ অডিট খতিয়ান', 'Yearly & Multi-Year Financial Audit')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {t('এ মাসের খরচ, মাসিক ও গত বছরের পূর্ণ হিসাব', 'Current Month, Monthly & Past Year Ledger')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t(
              'সকল সদস্যের মাসিক চাঁদা, অনুদান ও উপস্থিতির হিসাব একসাথে উন্মুক্ত। ২০২৫ (গত বছর) এবং ২০২৬ সালের পূর্ণাঙ্গ বাৎসরিক ব্যালেন্স শিট।',
              'Consolidated view of all members monthly dues, donations, attendance, and multi-year balance sheets.'
            )}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 rounded-lg shadow-sm transition-colors self-start md:self-auto"
        >
          <Printer className="w-4 h-4 text-emerald-600" />
          <span>{t('অডিট স্টেটমেন্ট প্রিন্ট করুন', 'Print Audit Statement')}</span>
        </button>
      </div>

      {/* Highlights: Current Month (এ মাসের আয়-ব্যয়) */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-emerald-700/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="font-bold text-sm text-white">
              {t('চলতি মাসের লাইভ আর্থিক বিবরণী (সেপ্টেম্বর ২০২৬)', 'Current Month Financial Live Summary (September 2026)')}
            </h3>
          </div>
          <span className="text-[11px] text-emerald-200">
            রিয়েল-টাইম রিকনসিলিয়েশন
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white/10 rounded-xl border border-white/10">
            <span className="text-emerald-200 block text-[10px]">এ মাসে অনুদান প্রাপ্তি:</span>
            <p className="text-base sm:text-lg font-black text-white mt-1">
              ৳{thisMonthDonationTotal.toLocaleString('bn-BD')}
            </p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/10">
            <span className="text-emerald-200 block text-[10px]">এ মাসে সদস্য ফি সংগৃহীত:</span>
            <p className="text-base sm:text-lg font-black text-white mt-1">
              ৳{thisMonthFeesTotal.toLocaleString('bn-BD')}
            </p>
          </div>
          <div className="p-3 bg-red-950/60 rounded-xl border border-red-500/40">
            <span className="text-red-200 block text-[10px]">এ মাসে মোট ব্যয়িত খরচ:</span>
            <p className="text-base sm:text-lg font-black text-red-300 mt-1">
              ৳{thisMonthExpenseTotal.toLocaleString('bn-BD')}
            </p>
          </div>
          <div className="p-3 bg-emerald-950/80 rounded-xl border border-emerald-400/40">
            <span className="text-emerald-300 block text-[10px]">এ মাসের নীট উদ্বৃত্ত (Net Surplus):</span>
            <p className="text-base sm:text-lg font-black text-emerald-400 mt-1">
              ৳{thisMonthNet.toLocaleString('bn-BD')}
            </p>
          </div>
        </div>
      </div>

      {/* Year Switcher (২০২৬ vs ২০২৫ গত বছর) */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-sm text-xs">
        {initialYearlyAudits.map((item, idx) => (
          <button
            key={item.year}
            onClick={() => setSelectedYearIndex(idx)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              selectedYearIndex === idx
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            {item.year}
          </button>
        ))}
      </div>

      {/* Year Summary Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 block">বাৎসরিক মোট আয়:</span>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            ৳{currentAudit.totalIncome.toLocaleString('bn-BD')}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 block">বাৎসরিক মোট ব্যয়:</span>
          <p className="text-xl font-black text-red-600 dark:text-red-400 mt-1">
            ৳{currentAudit.totalExpense.toLocaleString('bn-BD')}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 block">বছর শেষের রিজার্ভ তহবিল:</span>
          <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">
            ৳{currentAudit.netReserve.toLocaleString('bn-BD')}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 block">মোট উপকৃত মানুষ/পরিবার:</span>
          <p className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {currentAudit.totalBeneficiaries.toLocaleString('bn-BD')} জন
          </p>
        </div>
      </div>

      {/* Month-by-Month Full Breakdown Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {currentAudit.year} - এর মাসভিত্তিক পূর্ণাঙ্গ হিসাব খতিয়ান
          </h3>
          <span className="text-xs text-slate-400">সকল অডিট অনুমোদিত</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">মাস</th>
                <th className="py-3 px-4">অনুদানের আয়</th>
                <th className="py-3 px-4">সদস্য চাঁদা ফি</th>
                <th className="py-3 px-4">মোট আয়</th>
                <th className="py-3 px-4">মোট খরচ</th>
                <th className="py-3 px-4 text-right">উদ্বৃত্ত ব্যালেন্স</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {currentAudit.months.map((m) => (
                <tr key={m.monthCode} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    {m.monthName}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                    ৳{m.donationsIncome.toLocaleString('bn-BD')}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                    ৳{m.monthlyFeesIncome.toLocaleString('bn-BD')}
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                    ৳{m.totalIncome.toLocaleString('bn-BD')}
                  </td>
                  <td className="py-3 px-4 font-bold text-red-600 dark:text-red-400">
                    ৳{m.totalExpense.toLocaleString('bn-BD')}
                  </td>
                  <td className="py-3 px-4 font-black text-blue-600 dark:text-blue-400 text-right">
                    ৳{m.netBalance.toLocaleString('bn-BD')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unified All Members Contribution & Attendance Table (Requested Feature) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              সকল সদস্যের মাসিক চাঁদা, কে কত টাকা দিছে ও উপস্থিতির যৌথ তালিকা
            </h3>
            <p className="text-xs text-slate-500">
              কে কত টাকা জমা দিয়েছেন, কতদিন সভায় ও ফিল্ডে উপস্থিত হয়েছেন তার সম্পূর্ণ বিবরণ
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {members.length} জন সদস্য
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">সদস্যের নাম ও পদবী</th>
                <th className="py-3 px-4">মোবাইল ও এলাকা</th>
                <th className="py-3 px-4">সেপ্টেম্বর ফি</th>
                <th className="py-3 px-4">আগস্ট ফি</th>
                <th className="py-3 px-4">মোট ব্যক্তিগত অনুদান</th>
                <th className="py-3 px-4">মোট উপস্থিত দিন</th>
                <th className="py-3 px-4 text-right">উপস্থিতির হার</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {members.map((member) => {
                const pDonations = donations.filter(
                  d => d.donorName.includes(member.name) || d.donorPhone === member.phone
                );
                const totalGiven = pDonations.reduce((s, d) => s + d.amount, 0);

                const presentDays = member.attendance?.totalDaysPresent ?? 22;
                const totalEvents = member.attendance?.totalEventsHeld ?? 25;
                const attendRate = Math.round((presentDays / totalEvents) * 100);

                return (
                  <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover border" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{member.name}</p>
                          <p className="text-[11px] text-emerald-600 font-medium">{member.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {member.phone} ({member.district})
                    </td>
                    <td className="py-3 px-4">
                      {member.monthlyFees['2026-09'] === 'paid' ? (
                        <span className="text-emerald-700 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded font-bold text-[10px]">
                          পরিশোধিত (৫০০ ৳)
                        </span>
                      ) : (
                        <span className="text-amber-700 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded font-bold text-[10px]">
                          বকেয়া
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {member.monthlyFees['2026-08'] === 'paid' ? (
                        <span className="text-emerald-700 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded font-bold text-[10px]">
                          পরিশোধিত (৫০০ ৳)
                        </span>
                      ) : (
                        <span className="text-amber-700 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded font-bold text-[10px]">
                          বকেয়া
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                      ৳{totalGiven.toLocaleString('bn-BD')}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                      {presentDays} দিন উপস্থিত
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                        {attendRate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
