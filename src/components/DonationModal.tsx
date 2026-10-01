import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Campaign } from '../types';
import {
  X,
  CreditCard,
  Copy,
  Check,
  ShieldCheck,
  Heart,
  QrCode,
  Building,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedCampaign?: Campaign | null;
}

export const DonationModal: React.FC<Props> = ({ isOpen, onClose, selectedCampaign }) => {
  const {
    campaigns,
    submitDonation,
    orgConfig,
    showToast,
    setViewingDonationReceipt
  } = useApp();

  const [campaignId, setCampaignId] = useState(
    selectedCampaign ? selectedCampaign.id : campaigns[0]?.id || ''
  );
  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'Bank' | 'Cash'>('bKash');
  const [amount, setAmount] = useState<number | string>(1000);
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [trxId, setTrxId] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    showToast(`${type} নম্বর কপি করা হয়েছে`, 'success');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      showToast('অনুগ্রহ করে সঠিক অনুদানের পরিমাণ লিখুন', 'error');
      return;
    }
    if (!trxId.trim()) {
      showToast('অনুগ্রহ করে ট্রানজেকশন আইডি (TrxID) বা রেফারেন্স লিখুন', 'error');
      return;
    }
    if (!isAnonymous && !donorName.trim()) {
      showToast('অনুগ্রহ করে আপনার নাম দিন অথবা নাম প্রকাশে অনিচ্ছুক নির্বাচন করুন', 'error');
      return;
    }

    const createdDonation = submitDonation({
      campaignId,
      amount: numAmount,
      method,
      trxId: trxId.trim().toUpperCase(),
      donorName: donorName.trim() || 'শুভাকাঙ্ক্ষী',
      donorPhone: donorPhone.trim() || 'N/A',
      donorEmail: donorEmail.trim() || undefined,
      isAnonymous
    });

    // Fire Confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    onClose();
    // Open Receipt
    setViewingDonationReceipt(createdDonation);
    showToast('আপনার অনুদান সফলভাবে নিবন্ধিত হয়েছে! রসিদ জেনারেট করা হয়েছে।', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-emerald-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-white" />
            <div>
              <h2 className="text-base font-bold">অনুদানের হাত বাড়িয়ে দিন</h2>
              <p className="text-xs text-emerald-100">প্রতিটি অনুদানের হিসাব শতভাগ স্বচ্ছ ও জবাবদিহিতামূলক</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-100 hover:text-white hover:bg-emerald-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
          {/* Campaign Selector */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              অনুদানের খাত / প্রকল্প নির্বাচন করুন *
            </label>
            <select
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              {campaigns.map((camp) => (
                <option key={camp.id} value={camp.id}>
                  {camp.title} (লক্ষ্য: ৳{camp.targetAmount.toLocaleString('bn-BD')})
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              পেমেন্ট মাধ্যম বেছে নিন *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'bKash', label: 'বিকাশ', sub: 'মার্চেন্ট / পার্সোনাল' },
                { id: 'Nagad', label: 'নগদ', sub: 'পার্সোনাল' },
                { id: 'Rocket', label: 'রকেট', sub: 'পার্সোনাল' },
                { id: 'Bank', label: 'ব্যাংক হিসাব', sub: 'ইসলামী ব্যাংক' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    method === m.id
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <p className="font-bold text-xs">{m.label}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{m.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Instruction Box with 1-click Copy */}
          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {method === 'bKash' && 'বিকাশ পেমেন্ট / সেন্ড মানি নম্বর:'}
                  {method === 'Nagad' && 'নগদ সেন্ড মানি নম্বর:'}
                  {method === 'Rocket' && 'রকেট সেন্ড মানি নম্বর:'}
                  {method === 'Bank' && 'ব্যাংক অ্যাকাউন্ট বিবরণী:'}
                </span>
              </span>
            </div>

            {method === 'bKash' && (
              <div className="flex items-center justify-between bg-white dark:bg-slate-700/80 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600">
                <span className="font-mono font-bold text-sm text-pink-600 dark:text-pink-400">
                  {orgConfig.bkashNumber}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(orgConfig.bkashNumber, 'বিকাশ')}
                  className="flex items-center gap-1 px-2 py-1 text-[11px] bg-slate-100 dark:bg-slate-600 rounded hover:bg-emerald-50"
                >
                  {copiedType === 'বিকাশ' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>কপি</span>
                </button>
              </div>
            )}

            {method === 'Nagad' && (
              <div className="flex items-center justify-between bg-white dark:bg-slate-700/80 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600">
                <span className="font-mono font-bold text-sm text-orange-600 dark:text-orange-400">
                  {orgConfig.nagadNumber}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(orgConfig.nagadNumber, 'নগদ')}
                  className="flex items-center gap-1 px-2 py-1 text-[11px] bg-slate-100 dark:bg-slate-600 rounded hover:bg-emerald-50"
                >
                  {copiedType === 'নগদ' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>কপি</span>
                </button>
              </div>
            )}

            {method === 'Rocket' && (
              <div className="flex items-center justify-between bg-white dark:bg-slate-700/80 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600">
                <span className="font-mono font-bold text-sm text-purple-600 dark:text-purple-400">
                  {orgConfig.rocketNumber}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(orgConfig.rocketNumber, 'রকেট')}
                  className="flex items-center gap-1 px-2 py-1 text-[11px] bg-slate-100 dark:bg-slate-600 rounded hover:bg-emerald-50"
                >
                  {copiedType === 'রকেট' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>কপি</span>
                </button>
              </div>
            )}

            {method === 'Bank' && (
              <div className="bg-white dark:bg-slate-700/80 p-3 rounded-lg border border-slate-200 dark:border-slate-600 text-[11px] space-y-1">
                <p><span className="font-medium text-slate-500">ব্যাংক:</span> {orgConfig.bankDetails.bankName}</p>
                <p><span className="font-medium text-slate-500">শাখা:</span> {orgConfig.bankDetails.branch}</p>
                <p><span className="font-medium text-slate-500">হিসাবের নাম:</span> {orgConfig.bankDetails.accountName}</p>
                <div className="flex items-center justify-between pt-1">
                  <p><span className="font-medium text-slate-500">হিসাব নং:</span> <span className="font-mono font-bold">{orgConfig.bankDetails.accountNumber}</span></p>
                  <button
                    type="button"
                    onClick={() => handleCopy(orgConfig.bankDetails.accountNumber, 'ব্যাংক হিসাব')}
                    className="flex items-center gap-1 px-2 py-0.5 text-[11px] bg-slate-100 dark:bg-slate-600 rounded"
                  >
                    {copiedType === 'ব্যাংক হিসাব' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>কপি</span>
                  </button>
                </div>
              </div>
            )}

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              টাকা পাঠানোর পর প্রাপ্ত ট্রানজেকশন আইডি (TrxID) নিচে লিখে নিশ্চিত করুন। সাথে সাথে মানি রিসিট প্রস্তুত হবে।
            </p>
          </div>

          {/* Amount Presets */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              অনুদানের পরিমাণ (টাকা) *
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {[500, 1000, 2000, 5000, 10000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                    Number(amount) === val
                      ? 'border-emerald-500 bg-emerald-600 text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ৳{val.toLocaleString('bn-BD')}
                </button>
              ))}
            </div>
            <input
              type="number"
              required
              min="50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="অন্য পরিমাণ লিখুন"
              className="w-full px-3.5 py-2 text-sm font-bold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          {/* TrxID */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              ট্রানজেকশন আইডি (TrxID) বা রেফারেন্স *
            </label>
            <input
              type="text"
              required
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              placeholder="যেমন: BKS9087AK2"
              className="w-full px-3.5 py-2 text-xs font-mono uppercase tracking-wider bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          {/* Anonymous checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="anonymousCheck"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <label htmlFor="anonymousCheck" className="text-xs text-slate-700 dark:text-slate-300 select-none cursor-pointer">
              আমার নাম ও তথ্য পাবলিক লেজারে গোপন রাখুন (নাম প্রকাশে অনিচ্ছুক)
            </label>
          </div>

          {/* Donor Details (If not anonymous) */}
          {!isAnonymous && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  আপনার নাম *
                </label>
                <input
                  type="text"
                  required={!isAnonymous}
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="যেমন: মোঃ কামরুল ইসলাম"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  মোবাইল নম্বর (এসএমএস কনফার্মেশন ও রসিদ)
                </label>
                <input
                  type="tel"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>অনুদান সম্পন্ন করুন ও রসিদ গ্রহণ করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
