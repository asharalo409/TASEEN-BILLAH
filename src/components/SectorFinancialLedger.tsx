import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FundSector } from '../types';
import {
  PieChart,
  DollarSign,
  Plus,
  ShieldCheck,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Search,
  CheckCircle,
  X,
  Layers
} from 'lucide-react';

export const SectorFinancialLedger: React.FC = () => {
  const {
    fundSectors,
    addFundSector,
    donations,
    expenses,
    currentUser,
    setViewingDonationReceipt,
    t
  } = useApp();

  const [selectedSectorId, setSelectedSectorId] = useState<string>('all');
  const [isAddSectorOpen, setIsAddSectorOpen] = useState(false);

  // New Sector Form
  const [sectorName, setSectorName] = useState('');
  const [sectorNameEn, setSectorNameEn] = useState('');
  const [sectorCode, setSectorCode] = useState('');
  const [sectorDesc, setSectorDesc] = useState('');
  const [sectorBudget, setSectorBudget] = useState('200000');
  const [sectorColor, setSectorColor] = useState('emerald');

  const selectedSector = fundSectors.find(s => s.id === selectedSectorId);

  // Filtered transactions
  const filteredDonations = donations.filter(d =>
    selectedSectorId === 'all' || d.sectorId === selectedSectorId
  );
  const filteredExpenses = expenses.filter(e =>
    selectedSectorId === 'all' || e.sectorId === selectedSectorId
  );

  const handleAddSectorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectorName.trim() || !sectorCode.trim()) return;

    addFundSector({
      name: sectorName.trim(),
      nameEn: sectorNameEn.trim() || sectorName.trim(),
      code: sectorCode.trim().toUpperCase(),
      description: sectorDesc.trim() || 'বিশেষ সমাজকল্যাণ খাত',
      allocatedBudget: Number(sectorBudget) || 100000,
      totalIncome: 0,
      totalExpense: 0,
      color: sectorColor,
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      iconName: 'ShieldCheck'
    });

    setSectorName('');
    setSectorNameEn('');
    setSectorCode('');
    setSectorDesc('');
    setIsAddSectorOpen(false);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>{t('খাতভিত্তিক স্বচ্ছতা ও ফান্ড লেজার', 'Sector-Wise Transparency & Fund Ledger')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {t('আলাদা আলাদা খাত অনুযায়ী আয়-ব্যয়ের হিসাব', 'Categorized Fund Accounts & Expenses by Sector')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t(
              'বন্যা পুনর্বাসন, শীতবস্ত্র, এতিম শিক্ষা, জরুরি চিকিৎসা ও সাধারণ ফান্ডের আলাদা ব্যালেন্স ও খরচের হিসাব।',
              'Individual fund accounts for flood relief, winter drive, orphan education, and medical emergencies.'
            )}
          </p>
        </div>

        {currentUser?.isAdmin && (
          <button
            onClick={() => setIsAddSectorOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{t('নতুন খাত তৈরি করুন', 'Create New Sector')}</span>
          </button>
        )}
      </div>

      {/* Sector Selection Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fundSectors.map((sector) => {
          const isSelected = selectedSectorId === sector.id;
          const balance = Math.max(0, sector.totalIncome - sector.totalExpense);
          const percentUsed = sector.totalIncome > 0
            ? Math.min(100, Math.round((sector.totalExpense / sector.totalIncome) * 100))
            : 0;

          return (
            <div
              key={sector.id}
              onClick={() => setSelectedSectorId(isSelected ? 'all' : sector.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all hover:shadow-md flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {sector.code}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                      নির্বাচিত
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                  {sector.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {sector.description}
                </p>
              </div>

              {/* Financial Metrics */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">মোট সংগৃহীত:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ৳{sector.totalIncome.toLocaleString('bn-BD')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">মোট খরচ:</span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    ৳{sector.totalExpense.toLocaleString('bn-BD')}
                  </span>
                </div>
                <div className="flex items-center justify-between font-bold pt-1 border-t border-dashed border-slate-200 dark:border-slate-700">
                  <span className="text-slate-800 dark:text-slate-200">খাত উদ্বৃত্ত (Balance):</span>
                  <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                    ৳{balance.toLocaleString('bn-BD')}
                  </span>
                </div>

                {/* Spent Percentage Progress bar */}
                <div className="pt-1">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>খরচের অনুপাত:</span>
                    <span>{percentUsed}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${percentUsed}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sector Filter Details View */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {selectedSector ? `${selectedSector.name} - এর বিস্তারিত হিসাব খতিয়ান` : 'সকল খাতের যৌথ আর্থিক বিবরণী'}
            </h3>
            <p className="text-xs text-slate-500">
              {filteredDonations.length}টি অনুদান জমা ও {filteredExpenses.length}টি অনুমোদিত খরচের ভাউচার
            </p>
          </div>

          {selectedSectorId !== 'all' && (
            <button
              onClick={() => setSelectedSectorId('all')}
              className="text-xs text-emerald-600 hover:underline font-semibold"
            >
              সকল খাত একসাথে দেখুন
            </button>
          )}
        </div>

        {/* Expenses in this sector */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            খাতভিত্তিক ব্যয় ও ভাউচার তালিকা ({filteredExpenses.length})
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">ভাউচার নং</th>
                  <th className="py-2.5 px-3">বিবরণ</th>
                  <th className="py-2.5 px-3">তারিখ</th>
                  <th className="py-2.5 px-3">অনুমোদক</th>
                  <th className="py-2.5 px-3 text-right">পরিমাণ (BDT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredExpenses.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-2 px-3 font-mono font-bold text-slate-700 dark:text-slate-300">
                      {e.voucherNo}
                    </td>
                    <td className="py-2 px-3 font-medium text-slate-900 dark:text-white">
                      {e.title}
                    </td>
                    <td className="py-2 px-3 text-slate-500">
                      {e.date}
                    </td>
                    <td className="py-2 px-3 text-slate-500">
                      {e.approvedBy}
                    </td>
                    <td className="py-2 px-3 font-bold text-red-600 dark:text-red-400 text-right">
                      - ৳{e.amount.toLocaleString('bn-BD')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Fund Sector Modal */}
      {isAddSectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-6 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>নতুন তহবিল খাত তৈরি করুন</span>
              </h3>
              <button onClick={() => setIsAddSectorOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSectorSubmit} className="space-y-3.5">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  খাতের নাম (বাংলা) *
                </label>
                <input
                  type="text"
                  required
                  value={sectorName}
                  onChange={(e) => setSectorName(e.target.value)}
                  placeholder="যেমন: রমজান খাদ্য ও ইফতার সহায়তা খাত"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    খাত কোড (Code) *
                  </label>
                  <input
                    type="text"
                    required
                    value={sectorCode}
                    onChange={(e) => setSectorCode(e.target.value)}
                    placeholder="যেমন: SEC-RAMADAN"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    প্রাথমিক লক্ষ্যমাত্রা / বাজেট (৳)
                  </label>
                  <input
                    type="number"
                    value={sectorBudget}
                    onChange={(e) => setSectorBudget(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  খাতের উদ্দেশ্য ও বিবরণ
                </label>
                <textarea
                  rows={2}
                  value={sectorDesc}
                  onChange={(e) => setSectorDesc(e.target.value)}
                  placeholder="এই খাতে সংগৃহীত অর্থ কীভাবে বণ্টন করা হবে..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddSectorOpen(false)} className="px-4 py-2 border rounded-lg">
                  বাতিল
                </button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm">
                  খাত চালু করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
