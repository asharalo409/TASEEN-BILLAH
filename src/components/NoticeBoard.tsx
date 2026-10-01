import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Notice } from '../types';
import {
  FileText,
  AlertCircle,
  Calendar,
  Clock,
  Share2,
  Printer,
  Plus,
  X,
  ShieldAlert,
  Users
} from 'lucide-react';

export const NoticeBoard: React.FC = () => {
  const { notices, addNotice, currentUser, openShareModal, showToast } = useApp();

  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Form State
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticePriority, setNoticePriority] = useState<Notice['priority']>('সাধারণ');
  const [noticeContent, setNoticeContent] = useState('');
  const [publishedBy, setPublishedBy] = useState(currentUser ? currentUser.role : 'সাধারণ সম্পাদক');

  const filteredNotices = notices.filter(n =>
    priorityFilter === 'all' || n.priority === priorityFilter
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) {
      showToast('শিরোনাম ও নোটিশের বিস্তারিত বিবরণ দেওয়া আবশ্যক', 'error');
      return;
    }

    addNotice({
      title: noticeTitle.trim(),
      priority: noticePriority,
      date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      publishedBy: publishedBy.trim() || 'কেন্দ্রীয় কার্যালয়',
      content: noticeContent.trim()
    });

    setNoticeTitle('');
    setNoticeContent('');
    setIsAddNoticeOpen(false);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>অফিসিয়াল সার্কুলার ও তথ্য প্রকাশ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            ফাউন্ডেশন নোটিশ বোর্ড
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            ফাউন্ডেশনের জরুরি সিদ্ধান্ত, সভা আহ্বান, রক্তদানের আহ্বান এবং বার্ষিক কর্মসূচির সরকারি ও প্রাতিষ্ঠানিক নোটিশ।
          </p>
        </div>

        <button
          onClick={() => setIsAddNoticeOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন নোটিশ জারি করুন</span>
        </button>
      </div>

      {/* Priority Filters */}
      <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl max-w-xs">
        {['all', 'জরুরি', 'মিটিং', 'সাধারণ'].map((p) => (
          <button
            key={p}
            onClick={() => setPriorityFilter(p)}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              priorityFilter === p
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            {p === 'all' ? 'সকল নোটিশ' : p}
          </button>
        ))}
      </div>

      {/* Notices Stream */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => {
          const isUrgent = notice.priority === 'জরুরি';
          const isMeeting = notice.priority === 'মিটিং';

          return (
            <div
              key={notice.id}
              className={`p-5 bg-white dark:bg-slate-900 rounded-2xl border transition-all hover:shadow-sm ${
                isUrgent
                  ? 'border-red-300 dark:border-red-900/60 bg-red-50/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 text-[11px] font-bold rounded-md ${
                        isUrgent
                          ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                          : isMeeting
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      }`}
                    >
                      {notice.priority} নোটিশ
                    </span>
                    <span className="text-[11px] text-slate-400">·</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{notice.date} ({notice.time})</span>
                    </span>
                    <span className="text-[11px] text-slate-400">·</span>
                    <span className="text-[11px] text-slate-500">
                      প্রকাশক: <strong className="text-slate-700 dark:text-slate-300">{notice.publishedBy}</strong>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {notice.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line line-clamp-3">
                    {notice.content}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center sm:flex-col gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setSelectedNotice(notice)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    সম্পূর্ণ পড়ুন
                  </button>
                  <button
                    onClick={() =>
                      openShareModal(
                        notice.title,
                        `মানবসেবা ফাউন্ডেশন জরুরি নোটিশ: ${notice.title}। বিস্তারিত পড়ুন আমাদের অফিশিয়াল নোটিশ বোর্ডে।`
                      )
                    }
                    className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg"
                    title="শেয়ার করুন"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notice Detail View Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-6 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded">
                {selectedNotice.priority} নোটিশ
              </span>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {selectedNotice.title}
              </h3>

              <div className="flex items-center justify-between text-[11px] text-slate-500 py-2 border-y border-slate-100 dark:border-slate-800">
                <span>প্রকাশকাল: {selectedNotice.date}, {selectedNotice.time}</span>
                <span>প্রকাশক: {selectedNotice.publishedBy}</span>
              </div>

              <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm whitespace-pre-line py-2">
                {selectedNotice.content}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>প্রিন্ট করুন</span>
                </button>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-5 py-2 bg-slate-900 dark:bg-slate-700 text-white font-semibold rounded-lg"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Notice Modal */}
      {isAddNoticeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-6 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>নতুন নোটিশ প্রকাশ করুন</span>
              </h3>
              <button
                onClick={() => setIsAddNoticeOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  নোটিশের বিষয় / শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  placeholder="যেমন: আগামী শুক্রবার কার্যনির্বাহী কমিটির ভার্চুয়াল জরুরি সভা"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    অগ্রাধিকার ধরন
                  </label>
                  <select
                    value={noticePriority}
                    onChange={(e) => setNoticePriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  >
                    <option value="সাধারণ">সাধারণ নোটিশ</option>
                    <option value="জরুরি">জরুরি নোটিশ</option>
                    <option value="মিটিং">মিটিং সংক্রান্ত</option>
                    <option value="উৎসব">উৎসব ও বিশেষ দিবস</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    প্রকাশক পদবী/দপ্তর
                  </label>
                  <input
                    type="text"
                    value={publishedBy}
                    onChange={(e) => setPublishedBy(e.target.value)}
                    placeholder="যেমন: সাধারণ সম্পাদক"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  নোটিশের বিস্তারিত বক্তব্য *
                </label>
                <textarea
                  rows={5}
                  required
                  value={noticeContent}
                  onChange={(e) => setNoticeContent(e.target.value)}
                  placeholder="নোটিশের বিস্তারিত বিবরণ, তারিখ, সময়, লিংক..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddNoticeOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  নোটিশ জারি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
