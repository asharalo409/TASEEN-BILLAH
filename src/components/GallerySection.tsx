import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GalleryItem } from '../types';
import {
  Image as ImageIcon,
  Video,
  Plus,
  X,
  MapPin,
  Calendar,
  Share2,
  ZoomIn
} from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { gallery, addGalleryItem, openShareModal, showToast } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  // Form State
  const [itemTitle, setItemTitle] = useState('');
  const [itemCategory, setItemCategory] = useState<GalleryItem['category']>('ত্রাণ বিতরণ');
  const [itemMediaUrl, setItemMediaUrl] = useState('');
  const [itemLocation, setItemLocation] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const categories = ['all', 'ত্রাণ বিতরণ', 'চিকিৎসা সেবা', 'শীতবস্ত্র বিতরণ', 'শিক্ষা ও এতিম', 'রক্তদান', 'বৃক্ষরোপণ'];

  const filteredGallery = gallery.filter(item =>
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle.trim() || !itemMediaUrl.trim()) {
      showToast('শিরোনাম ও ছবির লিংক দেওয়া আবশ্যক', 'error');
      return;
    }

    addGalleryItem({
      title: itemTitle.trim(),
      category: itemCategory,
      mediaType: 'image',
      mediaUrl: itemMediaUrl.trim(),
      thumbnailUrl: itemMediaUrl.trim(),
      date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      location: itemLocation.trim() || 'বাংলাদেশ',
      description: itemDescription.trim() || itemTitle.trim()
    });

    setItemTitle('');
    setItemMediaUrl('');
    setItemLocation('');
    setItemDescription('');
    setIsAddItemOpen(false);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <ImageIcon className="w-4 h-4" />
            <span>ফিল্ড অ্যালবাম ও চিত্রমালা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            মানবসেবা ফটো ও ভিডিও গ্যালারি
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            দেশজুড়ে মানবসেবা ফাউন্ডেশনের স্বেচ্ছাসেবী কার্যক্রম, ত্রাণ বিতরণ, মেডিকেল ক্যাম্প ও বৃক্ষরোপণ কর্মসূচির স্মৃতি ও দৃশ্যপট।
          </p>
        </div>

        <button
          onClick={() => setIsAddItemOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>গ্যালারিতে মিডিয়া যোগ করুন</span>
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
            {cat === 'all' ? 'সকল ছবি ও ভিডিও' : cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col"
          >
            <div className="relative h-60 overflow-hidden cursor-pointer" onClick={() => setLightboxItem(item)}>
              <img
                src={item.mediaUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur text-white text-[11px] font-semibold rounded-lg">
                  {item.category}
                </span>
              </div>

              {/* Zoom Action Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-sm font-bold leading-snug line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex items-center gap-3 text-[11px] text-slate-300 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{item.location}</span>
                  </span>
                  <span>·</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <p className="text-slate-600 dark:text-slate-400 line-clamp-1 pr-2">
                {item.description}
              </p>
              <button
                onClick={() =>
                  openShareModal(
                    item.title,
                    `মানবসেবা ফাউন্ডেশন কার্যক্রম গ্যালারি: ${item.title} (${item.location})`
                  )
                }
                className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg shrink-0"
                title="শেয়ার করুন"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-950/80 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] flex items-center justify-center bg-black">
              <img
                src={lightboxItem.mediaUrl}
                alt={lightboxItem.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-5 text-white bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="px-2.5 py-0.5 bg-emerald-600 font-bold rounded text-[11px] mb-1 inline-block">
                  {lightboxItem.category}
                </span>
                <h3 className="text-base font-bold">{lightboxItem.title}</h3>
                <p className="text-slate-300 mt-1">{lightboxItem.description}</p>
                <div className="flex items-center gap-3 text-slate-400 mt-1 text-[11px]">
                  <span>স্থান: {lightboxItem.location}</span>
                  <span>·</span>
                  <span>তারিখ: {lightboxItem.date}</span>
                </div>
              </div>

              <button
                onClick={() =>
                  openShareModal(
                    lightboxItem.title,
                    `মানবসেবা ফাউন্ডেশন: ${lightboxItem.title} - ${lightboxItem.location}`
                  )
                }
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shrink-0"
              >
                <Share2 className="w-4 h-4" />
                <span>শেয়ার করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Media Modal */}
      {isAddItemOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-6 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>গ্যালারিতে নতুন ছবি যোগ করুন</span>
              </h3>
              <button
                onClick={() => setIsAddItemOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  ছবির শিরোনাম / ক্যাপশন *
                </label>
                <input
                  type="text"
                  required
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                  placeholder="যেমন: ফেনীতে ত্রাণ বিতরণ ও বিশুদ্ধ খাবার পানি প্রদান"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  >
                    {['ত্রাণ বিতরণ', 'চিকিৎসা সেবা', 'শীতবস্ত্র বিতরণ', 'শিক্ষা ও এতিম', 'রক্তদান', 'বৃক্ষরোপণ'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    স্থান / জেলা
                  </label>
                  <input
                    type="text"
                    value={itemLocation}
                    onChange={(e) => setItemLocation(e.target.value)}
                    placeholder="যেমন: ফুলগাজী, ফেনী"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  ছবির লিঙ্ক (Image URL) *
                </label>
                <input
                  type="url"
                  required
                  value={itemMediaUrl}
                  onChange={(e) => setItemMediaUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  সংক্ষিপ্ত বিবরণ
                </label>
                <textarea
                  rows={2}
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  placeholder="ছবি সম্পর্কিত কিছু তথ্য..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddItemOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  সংযুক্ত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
