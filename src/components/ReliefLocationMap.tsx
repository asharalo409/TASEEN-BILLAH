import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ReliefLocation } from '../types';
import {
  MapPin,
  Users,
  DollarSign,
  Calendar,
  Video,
  Image as ImageIcon,
  ExternalLink,
  Plus,
  X,
  Search,
  CheckCircle2,
  Compass
} from 'lucide-react';

export const ReliefLocationMap: React.FC = () => {
  const { reliefLocations, addReliefLocation, currentUser, showToast } = useApp();

  const [selectedLocation, setSelectedLocation] = useState<ReliefLocation>(reliefLocations[0]);
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);

  // Form State
  const [areaName, setAreaName] = useState('');
  const [district, setDistrict] = useState('ফেনী');
  const [division, setDivision] = useState('চট্টগ্রাম');
  const [latitude, setLatitude] = useState(23.08);
  const [longitude, setLongitude] = useState(91.43);
  const [beneficiariesCount, setBeneficiariesCount] = useState(500);
  const [totalAidAmount, setTotalAidAmount] = useState(150000);
  const [aidType, setAidType] = useState('চাল, ডাল, বিশুদ্ধ পানি, ও স্যালাইন');
  const [coordinatorName, setCoordinatorName] = useState(currentUser ? currentUser.name : 'মাঠের ভলান্টিয়ার টিম');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80');
  const [videoUrl, setVideoUrl] = useState('');
  const [reportSummary, setReportSummary] = useState('');

  const divisions = [
    { id: 'all', label: 'সমগ্র বাংলাদেশ' },
    { id: 'চট্টগ্রাম', label: 'চট্টগ্রাম বিভাগ' },
    { id: 'রংপুর', label: 'রংপুর বিভাগ' },
    { id: 'সিলেট', label: 'সিলেট বিভাগ' },
    { id: 'ঢাকা', label: 'ঢাকা বিভাগ' },
    { id: 'খুলনা', label: 'খুলনা বিভাগ' },
  ];

  const filteredLocations = reliefLocations.filter(loc =>
    selectedDivision === 'all' || loc.division === selectedDivision
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!areaName.trim() || !reportSummary.trim()) {
      showToast('এলাকার নাম এবং প্রতিবেদনের বিবরণ দেওয়া আবশ্যক', 'error');
      return;
    }

    addReliefLocation({
      areaName: areaName.trim(),
      district: district.trim(),
      division,
      latitude: Number(latitude) || 23.81,
      longitude: Number(longitude) || 90.41,
      beneficiariesCount: Number(beneficiariesCount) || 100,
      totalAidAmount: Number(totalAidAmount) || 50000,
      aidType: aidType.trim(),
      coordinatorName: coordinatorName.trim(),
      date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      photoUrl: photoUrl.trim() || 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
      videoUrl: videoUrl.trim() || undefined,
      reportSummary: reportSummary.trim()
    });

    setAreaName('');
    setReportSummary('');
    setIsAddLocationOpen(false);
  };

  // Convert lat/long approximately into percentage on a stylized Bangladesh container
  // BD bounding box approx: Lat 20.5 to 26.8, Long 88.0 to 92.8
  const getCoordinatesPercent = (lat: number, lng: number) => {
    const minLat = 20.6;
    const maxLat = 26.8;
    const minLng = 88.0;
    const maxLng = 92.8;

    const x = ((lng - minLng) / (maxLng - minLng)) * 82 + 9;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 82 + 9;
    return { x: Math.min(92, Math.max(8, x)), y: Math.min(92, Math.max(8, y)) };
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>ফিল্ড অ্যাক্টিভিটি ও ত্রাণ ট্র্যাকিং</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            সাহায্য প্রদান লোকেশন ট্র্যাকিং ও ইন্টারেক্টিভ ম্যাপ
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            বাংলাদেশের কোন কোন জেলায় ও প্রত্যন্ত চরে মানবসেবা ফাউন্ডেশনের ত্রাণ ও পুনর্বাসন পৌঁছেছে তার সুনির্দিষ্ট তথ্য, ছবি ও ভিডিও প্রমাণসহ বিস্তারিত দেখুন।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddLocationOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন লোকেশন রেকর্ড যুক্ত করুন</span>
          </button>
        </div>
      </div>

      {/* Division Filter */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
        {divisions.map((div) => (
          <button
            key={div.id}
            onClick={() => setSelectedDivision(div.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedDivision === div.id
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600'
            }`}
          >
            {div.label}
          </button>
        ))}
      </div>

      {/* Main Map & Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Map Canvas Container (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                বাংলাদেশ ত্রাণ বিতরণ জোন ও লোকেশন পিন
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">
              পিন ক্লিক করে বিস্তারিত দেখুন
            </span>
          </div>

          {/* Map Surface */}
          <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-slate-100 via-emerald-50/40 to-teal-50/30 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden flex items-center justify-center">
            {/* SVG Bangladesh Stylized Map Silhouette */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20 dark:opacity-30 pointer-events-none stroke-emerald-600 dark:stroke-emerald-400 fill-emerald-500/10"
              viewBox="0 0 500 500"
              preserveAspectRatio="none"
            >
              {/* Simplified stylized outline of Bangladesh */}
              <path
                d="M170,40 L260,30 L290,70 L340,90 L380,120 L410,180 L390,210 L430,270 L450,330 L410,410 L350,420 L320,470 L280,450 L250,470 L200,420 L160,380 L130,310 L110,240 L130,170 L150,110 Z"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              {/* Rivers curves */}
              <path d="M220,50 Q240,150 250,250 T310,400" strokeWidth="1.5" stroke="#3b82f6" fill="none" opacity="0.6" />
              <path d="M370,120 Q320,200 270,260" strokeWidth="1.5" stroke="#3b82f6" fill="none" opacity="0.6" />
            </svg>

            {/* Geographical Region Labels on Map */}
            <span className="absolute top-[18%] left-[24%] text-[10px] font-semibold text-slate-400 select-none">
              রংপুর বিভাগ
            </span>
            <span className="absolute top-[28%] right-[22%] text-[10px] font-semibold text-slate-400 select-none">
              সিলেট বিভাগ
            </span>
            <span className="absolute top-[48%] left-[42%] text-[10px] font-semibold text-slate-400 select-none">
              ঢাকা রাজধানী
            </span>
            <span className="absolute bottom-[35%] right-[24%] text-[10px] font-semibold text-slate-400 select-none">
              চট্টগ্রাম ও ফেনী
            </span>
            <span className="absolute bottom-[28%] left-[28%] text-[10px] font-semibold text-slate-400 select-none">
              খুলনা উপকূল
            </span>

            {/* Interactive Pins */}
            {filteredLocations.map((loc) => {
              const { x, y } = getCoordinatesPercent(loc.latitude, loc.longitude);
              const isSelected = selectedLocation.id === loc.id;

              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all transform hover:scale-125 z-20 ${
                    isSelected ? 'scale-125 z-30' : ''
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ping Ring for selected */}
                    {isSelected && (
                      <span className="absolute w-8 h-8 rounded-full bg-emerald-500/40 animate-ping" />
                    )}
                    <div
                      className={`p-1.5 rounded-full shadow-lg border-2 ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-white'
                          : 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border-emerald-500'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>

                    {/* Hover Card */}
                    <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-900 text-white text-[10px] py-1 px-2 rounded-md whitespace-nowrap shadow-md pointer-events-none z-40">
                      {loc.areaName}, {loc.district}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Location Pills at the bottom of the map */}
          <div className="flex items-center gap-2 overflow-x-auto mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 no-scrollbar">
            {reliefLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 border ${
                  selectedLocation.id === loc.id
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                }`}
              >
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>{loc.district} ({loc.beneficiariesCount} পরিবার)</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Selected Location Detail Card with Photos & Videos (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col">
          {/* Photo on Top */}
          <div className="relative h-52 bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <img
              src={selectedLocation.photoUrl}
              alt={selectedLocation.areaName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-bold rounded-lg shadow-sm">
                {selectedLocation.division} বিভাগ
              </span>
            </div>

            <div className="absolute bottom-3 left-4 right-4 text-white">
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedLocation.district} জেলা</span>
              </div>
              <h3 className="text-xl font-bold leading-tight">
                {selectedLocation.areaName}
              </h3>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-5 space-y-4 text-xs flex-1">
            {/* Beneficiaries & Amount Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="text-slate-500 dark:text-slate-400 text-[10px] block">সাহায্যপ্রাপ্ত পরিবার:</span>
                <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">
                  {selectedLocation.beneficiariesCount.toLocaleString('bn-BD')} টি পরিবার
                </span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                <span className="text-slate-500 dark:text-slate-400 text-[10px] block">মোট সহায়তার পরিমাণ:</span>
                <span className="text-base font-extrabold text-blue-700 dark:text-blue-400">
                  ৳{selectedLocation.totalAidAmount.toLocaleString('bn-BD')}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                ত্রাণ কার্যক্রমের সারসংক্ষেপ:
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                {selectedLocation.reportSummary}
              </p>
            </div>

            {/* Aid Items */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                বিতরণকৃত সামগ্রী:
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs">
                {selectedLocation.aidType}
              </p>
            </div>

            {/* Coordinator & Date */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>সমন্বয়ক: <strong className="text-slate-700 dark:text-slate-300">{selectedLocation.coordinatorName}</strong></span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedLocation.date}</span>
              </span>
            </div>

            {/* Video Link if available */}
            {selectedLocation.videoUrl && (
              <div className="pt-2">
                <a
                  href={selectedLocation.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm"
                >
                  <Video className="w-4 h-4" />
                  <span>মাঠপর্যায়ের ভিডিও প্রতিবেদন দেখুন (YouTube)</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Relief Location Modal */}
      {isAddLocationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-6 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>নতুন সাহায্য প্রদান এলাকা ম্যাপে ট্র্যাক করুন</span>
              </h3>
              <button
                onClick={() => setIsAddLocationOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    এলাকা বা ইউনিয়ন *
                  </label>
                  <input
                    type="text"
                    required
                    value={areaName}
                    onChange={(e) => setAreaName(e.target.value)}
                    placeholder="যেমন: ফুলগাজী ও পরশুরাম"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    জেলা *
                  </label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="যেমন: ফেনী"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    বিভাগ
                  </label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  >
                    {['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'রংপুর', 'সিলেট', 'খুলনা', 'বরিশাল', 'ময়মনসিংহ'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    উপকৃত পরিবার
                  </label>
                  <input
                    type="number"
                    value={beneficiariesCount}
                    onChange={(e) => setBeneficiariesCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    মোট সহায়তার পরিমাণ (৳)
                  </label>
                  <input
                    type="number"
                    value={totalAidAmount}
                    onChange={(e) => setTotalAidAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  সহায়তার সামগ্রীর বিবরণ
                </label>
                <input
                  type="text"
                  value={aidType}
                  onChange={(e) => setAidType(e.target.value)}
                  placeholder="যেমন: চাল, ডাল, তেল, বিশুদ্ধ পানি ও শিশুখাদ্য"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    ফটো লিংক (URL)
                  </label>
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    ভিডিও রিপোর্ট লিংক (YouTube)
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  মাঠের কাজের বিস্তারিত প্রতিবেদন *
                </label>
                <textarea
                  rows={3}
                  required
                  value={reportSummary}
                  onChange={(e) => setReportSummary(e.target.value)}
                  placeholder="কীভাবে ত্রাণ বিতরণ সম্পন্ন হয়েছে, সার্বিক পরিস্থিতি..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddLocationOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  ম্যাপে যুক্ত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
