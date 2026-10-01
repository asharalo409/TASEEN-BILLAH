import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Image, Upload, Palette, Check, RefreshCw, Building2 } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { isSettingsModalOpen, setIsSettingsModalOpen, orgConfig, updateOrgConfig, showToast } = useApp();

  const [orgName, setOrgName] = useState(orgConfig.orgName);
  const [slogan, setSlogan] = useState(orgConfig.slogan);
  const [logoUrl, setLogoUrl] = useState(orgConfig.logoUrl);
  const [coverUrl, setCoverUrl] = useState(orgConfig.coverUrl);
  const [hotlinePhone, setHotlinePhone] = useState(orgConfig.hotlinePhone);
  const [emergencyPhone, setEmergencyPhone] = useState(orgConfig.emergencyPhone);
  const [email, setEmail] = useState(orgConfig.email);
  const [address, setAddress] = useState(orgConfig.address);
  const [bkashNumber, setBkashNumber] = useState(orgConfig.bkashNumber);
  const [nagadNumber, setNagadNumber] = useState(orgConfig.nagadNumber);
  const [rocketNumber, setRocketNumber] = useState(orgConfig.rocketNumber);
  const [aboutText, setAboutText] = useState(orgConfig.aboutText);
  const [zoomMeetingUrl, setZoomMeetingUrl] = useState(orgConfig.zoomMeetingUrl || '');
  const [googleMeetUrl, setGoogleMeetUrl] = useState(orgConfig.googleMeetUrl || '');
  const [whatsappGroupUrl, setWhatsappGroupUrl] = useState(orgConfig.whatsappGroupUrl || '');
  const [facebookGroupUrl, setFacebookGroupUrl] = useState(orgConfig.facebookGroupUrl || '');
  const [telegramUrl, setTelegramUrl] = useState(orgConfig.telegramUrl || '');
  const [youtubeUrl, setYoutubeUrl] = useState(orgConfig.youtubeUrl || '');

  if (!isSettingsModalOpen) return null;

  // Preset Logos
  const presetLogos = [
    { name: 'সবুজ প্রতীক', url: '/icon.svg' },
    { name: 'হাত ও হৃদয়', url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=200&q=80' },
    { name: 'সেবাময় হাত', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=200&q=80' }
  ];

  // Preset Hero Covers
  const presetCovers = [
    {
      name: 'মানবসেবা ও ত্রাণ',
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop'
    },
    {
      name: 'বন্যা ও পুনর্বাসন',
      url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=1600&auto=format&fit=crop'
    },
    {
      name: 'শিশু ও শিক্ষা সহায়তা',
      url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1600&auto=format&fit=crop'
    },
    {
      name: 'স্বাস্থ্য সেবা ও রক্তদান',
      url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1600&auto=format&fit=crop'
    }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrgConfig({
      orgName,
      slogan,
      logoUrl,
      coverUrl,
      hotlinePhone,
      emergencyPhone,
      email,
      address,
      bkashNumber,
      nagadNumber,
      rocketNumber,
      aboutText,
      zoomMeetingUrl,
      googleMeetUrl,
      whatsappGroupUrl,
      facebookGroupUrl,
      telegramUrl,
      youtubeUrl
    });
    setIsSettingsModalOpen(false);
  };

  const handleResetDefaults = () => {
    setOrgName('মানবসেবা ফাউন্ডেশন');
    setSlogan('মানুষ মানুষের জন্য, জীবন জীবনের জন্য — সেবাই আমাদের ব্রত');
    setLogoUrl('/icon.svg');
    setCoverUrl('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop');
    showToast('ডিফল্ট তথ্যে ফিরিয়ে আনা হয়েছে', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                ফাউন্ডেশন সেটিংস ও ব্র্যান্ডিং কাস্টমাইজেশন
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                লোগো, কভার ফটো, নাম, স্লোগান ও বিকাশ/ব্যাংক হিসাব পরিবর্তন করুন
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSettingsModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Live Preview Strip */}
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <div
              className="h-28 w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${coverUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-lg overflow-hidden border border-slate-200">
                  <img src={logoUrl} alt="Logo preview" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">{orgName || 'ফাউন্ডেশনের নাম'}</p>
                  <p className="text-[11px] text-slate-200 line-clamp-1">{slogan || 'ফাউন্ডেশনের স্লোগান'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Identity */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span>১. নাম ও স্লোগান</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  ফাউন্ডেশনের নাম *
                </label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  মূল স্লোগান *
                </label>
                <input
                  type="text"
                  required
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Logo & Cover Selection */}
          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span>২. লোগো ও কভার ছবি পরিবর্তন</span>
            </h3>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1.5">
                লোগো ইমেজ লিঙ্ক (URL) বা প্রিসেট নির্বাচন করুন
              </label>
              <div className="flex gap-2 items-center mb-2">
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
                <img src={logoUrl} alt="Logo" className="w-9 h-9 rounded-lg border object-cover shrink-0" />
              </div>

              {/* Logo presets */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">প্রিসেট:</span>
                {presetLogos.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setLogoUrl(preset.url)}
                    className={`px-2.5 py-1 text-[11px] rounded border transition-colors ${
                      logoUrl === preset.url
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold'
                        : 'border-slate-300 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1.5">
                হেডার কভার ফটো (Cover Photo URL)
              </label>
              <input
                type="url"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white mb-2"
              />

              {/* Cover presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {presetCovers.map((cover) => (
                  <button
                    key={cover.name}
                    type="button"
                    onClick={() => setCoverUrl(cover.url)}
                    className={`relative rounded-lg overflow-hidden border-2 h-14 group text-left ${
                      coverUrl === cover.url ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <img src={cover.url} alt={cover.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center p-1 text-center">
                      <span className="text-[10px] text-white font-medium">{cover.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              ৩. অনুদান গ্রহণের মোবাইল ব্যাংকিং ও হিসাব
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  বিকাশ নম্বর
                </label>
                <input
                  type="text"
                  value={bkashNumber}
                  onChange={(e) => setBkashNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  নগদ নম্বর
                </label>
                <input
                  type="text"
                  value={nagadNumber}
                  onChange={(e) => setNagadNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  রকেট নম্বর
                </label>
                <input
                  type="text"
                  value={rocketNumber}
                  onChange={(e) => setRocketNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Virtual Meeting & Community Links */}
          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              ৪. ভার্চুয়াল মিটিং ও সোশ্যাল কমিউনিটি লিংক
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Zoom মিটিং লিংক
                </label>
                <input
                  type="url"
                  value={zoomMeetingUrl}
                  onChange={(e) => setZoomMeetingUrl(e.target.value)}
                  placeholder="https://zoom.us/j/..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Google Meet লিংক
                </label>
                <input
                  type="url"
                  value={googleMeetUrl}
                  onChange={(e) => setGoogleMeetUrl(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  WhatsApp গ্রুপ/কমিউনিটি লিংক
                </label>
                <input
                  type="url"
                  value={whatsappGroupUrl}
                  onChange={(e) => setWhatsappGroupUrl(e.target.value)}
                  placeholder="https://chat.whatsapp.com/..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Facebook গ্রুপ লিংক
                </label>
                <input
                  type="url"
                  value={facebookGroupUrl}
                  onChange={(e) => setFacebookGroupUrl(e.target.value)}
                  placeholder="https://facebook.com/groups/..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Telegram চ্যানেল লিংক
                </label>
                <input
                  type="url"
                  value={telegramUrl}
                  onChange={(e) => setTelegramUrl(e.target.value)}
                  placeholder="https://t.me/..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  YouTube চ্যানেল লিংক
                </label>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/@..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Contact & About */}
          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              ৫. যোগাযোগ ও বিবরণ
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  হটলাইন ফোন
                </label>
                <input
                  type="text"
                  value={hotlinePhone}
                  onChange={(e) => setHotlinePhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  জরুরি অ্যাম্বুলেন্স/রক্ত SOS ফোন
                </label>
                <input
                  type="text"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                ফাউন্ডেশন সম্পর্কে বিস্তারিত (About Description)
              </label>
              <textarea
                rows={3}
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>ডিফল্টে ফিরিয়ে আনুন</span>
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsSettingsModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
