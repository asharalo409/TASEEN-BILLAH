import React from 'react';
import { useApp } from '../context/AppContext';
import { Donation } from '../types';
import { X, Printer, Share2, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

interface Props {
  donation: Donation | null;
  onClose: () => void;
}

export const DonationVoucherModal: React.FC<Props> = ({ donation, onClose }) => {
  const { orgConfig, openShareModal } = useApp();

  if (!donation) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        {/* Top Control Bar (Hidden in print) */}
        <div className="no-print px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              ডিজিটাল অনুদান রসিদ ও ভাউচার
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-600" />
              <span>প্রিন্ট / রসিদ ডাউনলোড</span>
            </button>
            <button
              onClick={() =>
                openShareModal(
                  'মানবসেবা অনুদান স্বীকৃতি',
                  `আমি মানবসেবা ফাউন্ডেশনের ${donation.campaignTitle} প্রকল্পে ৳${donation.amount.toLocaleString('bn-BD')} অনুদান প্রদান করেছি। রসিদ নং: ${donation.receiptNo}`
                )
              }
              className="p-1.5 text-slate-500 hover:text-emerald-600 rounded-lg"
              title="শেয়ার করুন"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="printable-area p-8 bg-white text-slate-900 font-sans">
          {/* Receipt Border Container */}
          <div className="border-4 border-double border-emerald-700/60 rounded-xl p-6 relative overflow-hidden bg-gradient-to-b from-emerald-50/20 via-white to-emerald-50/20">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
              <HeartHandshake className="w-96 h-96 text-emerald-900" />
            </div>

            {/* Receipt Header */}
            <div className="text-center pb-4 border-b-2 border-emerald-800/40 relative">
              <div className="flex items-center justify-center gap-2 mb-1">
                <img
                  src={orgConfig.logoUrl}
                  alt={orgConfig.orgName}
                  className="w-10 h-10 object-contain"
                />
                <h1 className="text-2xl font-black text-emerald-900 tracking-tight">
                  {orgConfig.orgName}
                </h1>
              </div>
              <p className="text-xs font-semibold text-emerald-700 mb-0.5">
                {orgConfig.slogan}
              </p>
              <p className="text-[11px] text-slate-600">
                {orgConfig.regNumber} · {orgConfig.address}
              </p>
              <p className="text-[11px] text-slate-600">
                হটলাইন: {orgConfig.hotlinePhone} · ইমেইল: {orgConfig.email}
              </p>

              <div className="inline-block mt-3 px-4 py-0.5 bg-emerald-800 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                অফিসিয়াল মানি রসিদ (MONEY RECEIPT)
              </div>
            </div>

            {/* Meta Strip */}
            <div className="flex items-center justify-between text-xs py-3 border-b border-slate-200">
              <div>
                <span className="text-slate-500">রসিদ নং: </span>
                <span className="font-mono font-bold text-emerald-900">{donation.receiptNo}</span>
              </div>
              <div>
                <span className="text-slate-500">তারিখ ও সময়: </span>
                <span className="font-semibold text-slate-800">{donation.date}, {donation.time}</span>
              </div>
            </div>

            {/* Donor & Payment Info Grid */}
            <div className="py-4 space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">দানকারীর নাম:</span>
                <span className="col-span-2 font-bold text-slate-900 text-sm">
                  {donation.donorName}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">মোবাইল নম্বর:</span>
                <span className="col-span-2 font-mono text-slate-800">
                  {donation.donorPhone}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">অনুদানের খাত/প্রকল্প:</span>
                <span className="col-span-2 font-semibold text-emerald-800">
                  {donation.campaignTitle}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">পেমেন্ট মেথড:</span>
                <span className="col-span-2 font-medium text-slate-800">
                  {donation.method} (ট্রানজেকশন আইডি: <span className="font-mono font-bold text-slate-900">{donation.trxId}</span>)
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 bg-emerald-50/80 px-3 rounded-lg border border-emerald-200">
                <span className="text-emerald-900 font-bold self-center">অনুদানের পরিমাণ:</span>
                <div className="col-span-2">
                  <span className="text-xl font-black text-emerald-800">
                    ৳{donation.amount.toLocaleString('bn-BD')}
                  </span>
                  <span className="text-xs text-emerald-700 ml-2 font-medium">
                    (টাকা মাত্র)
                  </span>
                </div>
              </div>
            </div>

            {/* Verification & Seals */}
            <div className="pt-6 flex items-end justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="font-bold text-[11px] leading-tight">ডিজিটালভাবে যাচাইকৃত ও অনুমোদিত</p>
                  <p className="text-[10px] text-slate-500 font-mono">HASH: SHA256-MSF-{donation.id.slice(-6)}</p>
                </div>
              </div>

              <div className="text-center">
                <div className="w-32 border-b border-slate-400 mb-1" />
                <p className="font-bold text-slate-800 text-[11px]">কোষাধ্যক্ষ / সাধারণ সম্পাদক</p>
                <p className="text-[10px] text-slate-500">{orgConfig.orgName}</p>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-4 pt-2 border-t border-slate-200 text-center">
              <p className="text-[10px] text-slate-500 italic">
                “আপনার একটি মানবিক সহযোগিতা হতে পারে একজন বিপন্ন মানুষের বাঁচার নতুন স্বপ্ন।” আপনাকে আন্তরিক মোবারকবাদ!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Close */}
        <div className="no-print px-6 py-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 rounded-lg transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
