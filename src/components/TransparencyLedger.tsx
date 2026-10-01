import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExpenseRecord } from '../types';
import { MultiYearFinancialAudit } from './MultiYearFinancialAudit';
import {
  FileText,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Plus,
  Receipt,
  Search,
  Download,
  Filter,
  Users,
  TrendingUp
} from 'lucide-react';

export const TransparencyLedger: React.FC = () => {
  const {
    donations,
    expenses,
    members,
    addExpense,
    currentUser,
    updateMemberFeeStatus,
    setViewingDonationReceipt,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'monthlyFees' | 'expenses' | 'donations' | 'audit'>('monthlyFees');
  const [selectedMonth, setSelectedMonth] = useState('2026-09');
  const [expenseSearch, setExpenseSearch] = useState('');
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  // New Expense Form State
  const [expTitle, setExpTitle] = useState('');
  const [expCategory, setExpCategory] = useState<ExpenseRecord['category']>('খাদ্য সামগ্রী');
  const [expAmount, setExpAmount] = useState('');
  const [expApprovedBy, setExpApprovedBy] = useState(currentUser ? currentUser.name : 'সভাপতি ও কোষাধ্যক্ষ');
  const [expNotes, setExpNotes] = useState('');
  const [expProofUrl, setExpProofUrl] = useState('');

  // Calculations
  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalReserve = Math.max(0, totalDonations - totalExpenses);

  // Fee calculation (assuming 500 BDT per month per member)
  const feeRate = 500;
  const paidMembersCount = members.filter(m => m.monthlyFees[selectedMonth] === 'paid').length;
  const dueMembersCount = members.filter(m => m.monthlyFees[selectedMonth] !== 'paid').length;
  const totalFeesCollectedForMonth = paidMembersCount * feeRate;

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(expAmount);
    if (!expTitle.trim() || !amountNum || amountNum <= 0) {
      showToast('অনুগ্রহ করে সঠিক বিবরণ ও টাকার পরিমাণ দিন', 'error');
      return;
    }

    addExpense({
      title: expTitle.trim(),
      category: expCategory,
      amount: amountNum,
      date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      approvedBy: expApprovedBy.trim(),
      proofUrl: expProofUrl.trim() || undefined,
      notes: expNotes.trim() || 'নিয়মিত সমাজসেবা কার্যক্রম'
    });

    setExpTitle('');
    setExpAmount('');
    setExpNotes('');
    setExpProofUrl('');
    setIsAddExpenseOpen(false);
  };

  const filteredExpenses = expenses.filter(exp =>
    exp.title.toLowerCase().includes(expenseSearch.toLowerCase()) ||
    exp.voucherNo.toLowerCase().includes(expenseSearch.toLowerCase()) ||
    exp.category.includes(expenseSearch)
  );

  return (
    <section className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>শতভাগ উন্মুক্ত আর্থিক জবাবদিহিতা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            মাসিক ফি ও অনুদানের স্বচ্ছ হিসাব লেজার
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            ফাউন্ডেশনের প্রতিটি টাকার উৎস এবং প্রতিটি খরচের অডিটকৃত ভাউচার সবার জন্য উন্মুক্ত। নিচে সদস্য ফি, ব্যয়ের তালিকা এবং অনুদানের বিবরণী দেখুন।
          </p>
        </div>

        {/* Top Financial Stat Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-medium block">মোট প্রাপ্তি:</span>
            <span className="text-sm font-black text-emerald-700 dark:text-emerald-400">
              ৳{totalDonations.toLocaleString('bn-BD')}
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800">
            <span className="text-[10px] text-red-800 dark:text-red-300 font-medium block">মোট ব্যয়:</span>
            <span className="text-sm font-black text-red-700 dark:text-red-400">
              ৳{totalExpenses.toLocaleString('bn-BD')}
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
            <span className="text-[10px] text-blue-800 dark:text-blue-300 font-medium block">বর্তমান তহবিল:</span>
            <span className="text-sm font-black text-blue-700 dark:text-blue-400">
              ৳{totalReserve.toLocaleString('bn-BD')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Tab Controls */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-2xl">
        <button
          onClick={() => setActiveTab('monthlyFees')}
          className={`flex-1 min-w-[130px] py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'monthlyFees'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>মাসিক সদস্য ফি</span>
        </button>

        <button
          onClick={() => setActiveTab('expenses')}
          className={`flex-1 min-w-[130px] py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'expenses'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>ব্যয় ও ভাউচার ({expenses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('donations')}
          className={`flex-1 min-w-[130px] py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'donations'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>প্রাপ্ত অনুদান ({donations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex-1 min-w-[180px] py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'audit'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>বাৎসরিক ও সকল সদস্যের যৌথ হিসাব</span>
        </button>
      </div>

      {/* TAB 1: Monthly Membership Fee Ledger */}
      {activeTab === 'monthlyFees' && (
        <div className="space-y-4">
          {/* Monthly Filter & Summary Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                সদস্যদের নিয়মিত মাসিক চাঁদা ও ফি ট্র্যাকার
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ধার্যকৃত মাসিক ফি: ৫০০ ৳ / সদস্য · সংগৃহীত অর্থ জরুরি সহায়তা তহবিলে জমা হয়
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">মাস নির্বাচন:</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
                >
                  <option value="2026-09">সেপ্টেম্বর ২০২৬</option>
                  <option value="2026-08">আগস্ট ২০২৬</option>
                  <option value="2026-07">জুলাই ২০২৬</option>
                </select>
              </div>

              <div className="text-right pl-3 border-l border-slate-200 dark:border-slate-700">
                <p className="text-[11px] text-slate-500">এই মাসে সংগৃহীত ফি:</p>
                <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                  ৳{totalFeesCollectedForMonth.toLocaleString('bn-BD')} ({paidMembersCount}/{members.length} জন পরিশোধ করেছেন)
                </p>
              </div>
            </div>
          </div>

          {/* Members Fee Matrix Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="py-3 px-4 font-semibold">সদস্যের নাম ও পদবী</th>
                    <th className="py-3 px-4 font-semibold">এলাকা</th>
                    <th className="py-3 px-4 font-semibold">মোবাইল</th>
                    <th className="py-3 px-4 font-semibold">ফি পরিমাণ</th>
                    <th className="py-3 px-4 font-semibold">স্ট্যাটাস ({selectedMonth})</th>
                    <th className="py-3 px-4 font-semibold text-right">কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {members.map((m) => {
                    const status = m.monthlyFees[selectedMonth] || 'due';
                    const isPaid = status === 'paid';

                    return (
                      <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={m.avatar}
                              alt={m.name}
                              className="w-7 h-7 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white leading-tight">
                                {m.name}
                              </p>
                              <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                                {m.role}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                          {m.district}, {m.upazila}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-500">
                          {m.phone}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                          ৳৫০০
                        </td>
                        <td className="py-3 px-4">
                          {isPaid ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950/60 rounded-full">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span>পরিশোধিত</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 dark:text-amber-200 bg-amber-100 dark:bg-amber-950/60 rounded-full">
                              <AlertCircle className="w-3 h-3 text-amber-600" />
                              <span>বকেয়া</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() =>
                              updateMemberFeeStatus(m.id, selectedMonth, isPaid ? 'due' : 'paid')
                            }
                            className={`px-3 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                              isPaid
                                ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                                : 'text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm'
                            }`}
                          >
                            {isPaid ? 'বকেয়া হিসেবে চিহ্নিত' : 'পরিশোধ নিশ্চিত করুন'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Expenses & Vouchers */}
      {activeTab === 'expenses' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={expenseSearch}
                onChange={(e) => setExpenseSearch(e.target.value)}
                placeholder="খরচের বিবরণ, খাত বা ভাউচার নম্বর খুঁজুন..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            <button
              onClick={() => setIsAddExpenseOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন খরচের ভাউচার যুক্ত করুন</span>
            </button>
          </div>

          {/* Add Expense Form Modal / Accordion */}
          {isAddExpenseOpen && (
            <form
              onSubmit={handleAddExpenseSubmit}
              className="p-5 bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-500/50 shadow-md space-y-4 text-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  নতুন অনুমোদিত ব্যয় ভাউচার এন্ট্রি
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddExpenseOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  বাতিল
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    ব্যয়ের বিবরণ ও উদ্দেশ্য *
                  </label>
                  <input
                    type="text"
                    required
                    value={expTitle}
                    onChange={(e) => setExpTitle(e.target.value)}
                    placeholder="যেমন: কুড়িগ্রামে কম্বল ক্রয় ও পরিবহন"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    টাকার পরিমাণ (BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={expAmount}
                    onChange={(e) => setExpAmount(e.target.value)}
                    placeholder="যেমন: ৫০,০০০"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    খাত
                  </label>
                  <select
                    value={expCategory}
                    onChange={(e) => setExpCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  >
                    {['খাদ্য সামগ্রী', 'ওষুধ ও চিকিৎসা', 'শীতবস্ত্র', 'শিক্ষা সহায়তা', 'যাতায়াত ও পরিবহন', 'প্রশাসনিক ও প্রচার', 'অন্যান্য'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    অনুমোদনকারী কর্মকর্তা
                  </label>
                  <input
                    type="text"
                    value={expApprovedBy}
                    onChange={(e) => setExpApprovedBy(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    প্রমাণপত্র / ইনভয়েস লিংক (ঐচ্ছিক)
                  </label>
                  <input
                    type="url"
                    value={expProofUrl}
                    onChange={(e) => setExpProofUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  অডিট নোট ও তথ্য
                </label>
                <input
                  type="text"
                  value={expNotes}
                  onChange={(e) => setExpNotes(e.target.value)}
                  placeholder="ভেন্ডর নাম, মেমো নম্বর ইত্যাদি..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddExpenseOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  ভাউচার যুক্ত করুন
                </button>
              </div>
            </form>
          )}

          {/* Expenses Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="py-3 px-4 font-semibold">ভাউচার নং ও তারিখ</th>
                    <th className="py-3 px-4 font-semibold">ব্যয়ের খাত ও বিবরণ</th>
                    <th className="py-3 px-4 font-semibold">অনুমোদনকারী</th>
                    <th className="py-3 px-4 font-semibold">পরিমাণ (BDT)</th>
                    <th className="py-3 px-4 font-semibold">নোট / মেমো</th>
                    <th className="py-3 px-4 font-semibold text-right">প্রমাণপত্র</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredExpenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-mono font-bold text-slate-800 dark:text-slate-200">
                          {exp.voucherNo}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {exp.date}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 rounded mb-0.5">
                          {exp.category}
                        </span>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {exp.title}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                        {exp.approvedBy}
                      </td>
                      <td className="py-3 px-4 font-bold text-red-600 dark:text-red-400 text-sm">
                        - ৳{exp.amount.toLocaleString('bn-BD')}
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-[11px] max-w-xs">
                        {exp.notes}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {exp.proofUrl ? (
                          <a
                            href={exp.proofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-emerald-600 hover:underline font-semibold"
                          >
                            <span>ভাউচার ফটো</span>
                          </a>
                        ) : (
                          <span className="text-[11px] text-slate-400">অফিসে সংরক্ষিত</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: All Received Donations Ledger */}
      {activeTab === 'donations' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="py-3 px-4 font-semibold">রসিদ নং ও তারিখ</th>
                    <th className="py-3 px-4 font-semibold">দানকারীর নাম</th>
                    <th className="py-3 px-4 font-semibold">প্রকল্প / তহবিল</th>
                    <th className="py-3 px-4 font-semibold">মাধ্যম ও TrxID</th>
                    <th className="py-3 px-4 font-semibold">পরিমাণ (BDT)</th>
                    <th className="py-3 px-4 font-semibold text-right">রসিদ ভিউ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {donations.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-mono font-bold text-slate-800 dark:text-slate-200">
                          {d.receiptNo}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {d.date}, {d.time}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900 dark:text-white">
                          {d.donorName}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {d.donorPhone}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-emerald-800 dark:text-emerald-300 font-medium">
                        {d.campaignTitle}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {d.method}
                        </span>
                        <p className="text-[10px] font-mono text-slate-400 uppercase">
                          {d.trxId}
                        </p>
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                        + ৳{d.amount.toLocaleString('bn-BD')}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setViewingDonationReceipt(d)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100"
                        >
                          <Receipt className="w-3 h-3" />
                          <span>রসিদ</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Multi-Year & All Members Consolidated Audit */}
      {activeTab === 'audit' && (
        <div className="pt-2 animate-fade-in">
          <MultiYearFinancialAudit />
        </div>
      )}
    </section>
  );
};
