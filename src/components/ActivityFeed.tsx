import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ActivityPost } from '../types';
import { CommentsReactionSection } from './CommentsReactionSection';
import {
  ShieldCheck,
  Video,
  FileCheck,
  Share2,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Plus,
  X,
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

export const ActivityFeed: React.FC = () => {
  const { activities, addActivityPost, currentUser, openShareModal, showToast } = useApp();

  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // New Post Form State
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('ত্রাণ ও পুনর্বাসন');
  const [postLocation, setPostLocation] = useState('');
  const [postSummary, setPostSummary] = useState('');
  const [postAmountSpent, setPostAmountSpent] = useState('');
  const [postFamiliesHelped, setPostFamiliesHelped] = useState('');
  const [postImage1, setPostImage1] = useState('');
  const [postImage2, setPostImage2] = useState('');
  const [postVideoLink, setPostVideoLink] = useState('');
  const [postDocLink, setPostDocLink] = useState('');

  const categories = ['all', 'ত্রাণ ও পুনর্বাসন', 'স্বাস্থ্য সেবা', 'শিক্ষা', 'শীতবস্ত্র'];

  const filteredPosts = activities.filter(post =>
    selectedCategory === 'all' || post.category === selectedCategory
  );

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postSummary.trim()) {
      showToast('শিরোনাম ও বিবরণ দেওয়া আবশ্যক', 'error');
      return;
    }

    const images: string[] = [];
    if (postImage1.trim()) images.push(postImage1.trim());
    if (postImage2.trim()) images.push(postImage2.trim());
    if (images.length === 0) {
      images.push('https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80');
    }

    addActivityPost({
      title: postTitle.trim(),
      authorName: currentUser ? currentUser.name : 'মিডিয়া ও প্রচার সেল',
      authorRole: currentUser ? currentUser.role : 'সমন্বয়ক',
      date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      location: postLocation.trim() || 'বাংলাদেশ',
      summary: postSummary.trim(),
      amountSpent: postAmountSpent ? Number(postAmountSpent) : undefined,
      familiesHelped: postFamiliesHelped ? Number(postFamiliesHelped) : undefined,
      images,
      videoLink: postVideoLink.trim() || undefined,
      documentLink: postDocLink.trim() || undefined,
      category: postCategory
    });

    setPostTitle('');
    setPostSummary('');
    setPostLocation('');
    setPostAmountSpent('');
    setPostFamiliesHelped('');
    setPostImage1('');
    setPostImage2('');
    setPostVideoLink('');
    setPostDocLink('');
    setIsNewPostOpen(false);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>ফিল্ড কার্যক্রম ও প্রামাণ্য দলিল</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            সাম্প্রতিক কার্যক্রম ও স্বচ্ছতার রিপোর্ট
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            ছবি, ভিডিও এবং অডিট ভাউচারের লিংকসহ মাঠপর্যায়ের প্রতিটি সমাজকল্যাণমূলক পদক্ষেপের পূর্ণাঙ্গ প্রতিবেদন।
          </p>
        </div>

        <button
          onClick={() => setIsNewPostOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন কাজের প্রমাণ ও পোস্ট যুক্ত করুন</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600'
            }`}
          >
            {cat === 'all' ? 'সকল কার্যক্রম' : cat}
          </button>
        ))}
      </div>

      {/* New Activity Post Modal */}
      {isNewPostOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-6 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>নতুন স্বচ্ছ কার্যক্রম প্রতিবেদন প্রকাশ করুন</span>
              </h3>
              <button
                onClick={() => setIsNewPostOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    কাজের শিরোনাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="যেমন: নোয়াখালীতে দিনব্যাপী ফ্রি মেডিকেল ক্যাম্প সম্পন্ন"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    কাজের স্থান / এলাকা
                  </label>
                  <input
                    type="text"
                    value={postLocation}
                    onChange={(e) => setPostLocation(e.target.value)}
                    placeholder="যেমন: সেনবাগ, নোয়াখালী"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    খাত
                  </label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  >
                    <option value="ত্রাণ ও পুনর্বাসন">ত্রাণ ও পুনর্বাসন</option>
                    <option value="স্বাস্থ্য সেবা">স্বাস্থ্য সেবা</option>
                    <option value="শিক্ষা">শিক্ষা</option>
                    <option value="শীতবস্ত্র">শীতবস্ত্র</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    মোট ব্যয়িত অর্থ (BDT)
                  </label>
                  <input
                    type="number"
                    value={postAmountSpent}
                    onChange={(e) => setPostAmountSpent(e.target.value)}
                    placeholder="যেমন: ৪৮,০০০"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    উপকৃত পরিবার/মানুষ সংখ্যা
                  </label>
                  <input
                    type="number"
                    value={postFamiliesHelped}
                    onChange={(e) => setPostFamiliesHelped(e.target.value)}
                    placeholder="যেমন: ৫৫০"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    ছবি ১ (URL)
                  </label>
                  <input
                    type="url"
                    value={postImage1}
                    onChange={(e) => setPostImage1(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    ছবি ২ (ঐচ্ছিক URL)
                  </label>
                  <input
                    type="url"
                    value={postImage2}
                    onChange={(e) => setPostImage2(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    ভিডিও প্রমাণ লিংক (YouTube / Drive)
                  </label>
                  <input
                    type="url"
                    value={postVideoLink}
                    onChange={(e) => setPostVideoLink(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    অডিট / ভাউচার ডকুমেন্ট লিংক (PDF / Drive)
                  </label>
                  <input
                    type="url"
                    value={postDocLink}
                    onChange={(e) => setPostDocLink(e.target.value)}
                    placeholder="https://manobsheba.org/audit.pdf"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  কার্যক্রমের বিস্তারিত প্রতিবেদন ও বিবরণ *
                </label>
                <textarea
                  rows={4}
                  required
                  value={postSummary}
                  onChange={(e) => setPostSummary(e.target.value)}
                  placeholder="মাঠপর্যায়ে কাজের বিস্তারিত বিবরণ লিখুন..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewPostOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  প্রতিবেদন প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feed Stream */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            {/* Post Header */}
            <div className="p-5 sm:p-6 pb-3 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-md">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-slate-400">·</span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date} ({post.time})</span>
                  </span>
                  <span className="text-[11px] text-slate-400">·</span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{post.location}</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {post.title}
                </h3>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  প্রতিবেদক: <strong className="text-slate-700 dark:text-slate-300">{post.authorName}</strong> ({post.authorRole})
                </p>
              </div>

              {/* Share button */}
              <button
                onClick={() =>
                  openShareModal(
                    post.title,
                    `মানবসেবা ফাউন্ডেশন: ${post.title}। বিস্তারিত কাজের প্রমাণ ও বিবরণ দেখুন আমাদের পোর্টালে।`
                  )
                }
                className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors shrink-0"
                title="সোশ্যাল মিডিয়ায় শেয়ার করুন"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Post Content */}
            <div className="px-5 sm:px-6 py-2">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {post.summary}
              </p>
            </div>

            {/* Impact Metric Strip */}
            {(post.amountSpent || post.familiesHelped) && (
              <div className="mx-5 sm:mx-6 my-3 p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-800/60 flex flex-wrap items-center gap-4 text-xs">
                {post.amountSpent && (
                  <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>মোট ব্যয়িত অনুদান: ৳{post.amountSpent.toLocaleString('bn-BD')}</span>
                  </div>
                )}
                {post.familiesHelped && (
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>উপকৃত মানুষ/পরিবার: {post.familiesHelped.toLocaleString('bn-BD')} জন</span>
                  </div>
                )}
                <div className="ml-auto inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>শতভাগ যাচাইকৃত</span>
                </div>
              </div>
            )}

            {/* Proof Photos Grid */}
            {post.images.length > 0 && (
              <div className={`px-5 sm:px-6 my-3 grid gap-3 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {post.images.map((img, i) => (
                  <div key={i} className="relative h-60 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={img}
                      alt={`Activity proof ${i}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      মাঠপর্যায়ের প্রমাণ ছবি #{i + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Comments & Emoji Reactions Section */}
            <div className="px-5 sm:px-6 pb-2">
              <CommentsReactionSection targetId={post.id} reactions={post.reactions} />
            </div>

            {/* Video & Verification Links Footer */}
            <div className="px-5 sm:px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3">
                {post.videoLink && (
                  <a
                    href={post.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>ভিডিও রিপোর্ট দেখুন</span>
                  </a>
                )}
                {post.documentLink && (
                  <a
                    href={post.documentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-200 transition-colors"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>অডিট ভাউচার ডকুমেন্ট</span>
                  </a>
                )}
              </div>

              <div className="text-[11px] text-slate-400">
                স্বচ্ছতা আইডি: <span className="font-mono">ACT-{post.id.slice(-6)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
