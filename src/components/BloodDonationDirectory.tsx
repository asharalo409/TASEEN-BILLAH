import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BloodDonor, BloodGroup } from '../types';
import {
  Droplet,
  PhoneCall,
  Search,
  UserPlus,
  Heart,
  MessageSquare,
  AlertTriangle,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  X,
  Plus
} from 'lucide-react';

export const BloodDonationDirectory: React.FC = () => {
  const { bloodDonors, registerBloodDonor, toggleDonorAvailability, orgConfig, showToast } = useApp();

  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [districtSearch, setDistrictSearch] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Register Form
  const [donorName, setDonorName] = useState('');
  const [donorBloodGroup, setDonorBloodGroup] = useState<BloodGroup>('O+');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorDistrict, setDonorDistrict] = useState('ঢাকা');
  const [donorUpazila, setDonorUpazila] = useState('');
  const [lastDate, setLastDate] = useState('২০২৬-০৫-০১');

  const bloodGroups: (BloodGroup | 'all')[] = ['all', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filteredDonors = bloodDonors.filter(donor => {
    const matchesGroup = selectedGroup === 'all' || donor.bloodGroup === selectedGroup;
    const matchesDistrict =
      donor.district.toLowerCase().includes(districtSearch.toLowerCase()) ||
      donor.upazila.toLowerCase().includes(districtSearch.toLowerCase()) ||
      donor.name.toLowerCase().includes(districtSearch.toLowerCase());
    return matchesGroup && matchesDistrict;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !donorPhone.trim()) {
      showToast('নাম ও মোবাইল নম্বর দেওয়া আবশ্যক', 'error');
      return;
    }

    registerBloodDonor({
      name: donorName.trim(),
      bloodGroup: donorBloodGroup,
      phone: donorPhone.trim(),
      district: donorDistrict.trim(),
      upazila: donorUpazila.trim() || 'সদর',
      lastDonationDate: lastDate || 'নতুন নিবন্ধিত',
      isAvailable: true
    });

    setDonorName('');
    setDonorPhone('');
    setIsRegisterOpen(false);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-wider">
            <Droplet className="w-4 h-4" />
            <span>জরুরি রক্তদান ও ২৪/৭ লাইফলাইন</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            জরুরি রক্ত সন্ধান ও জরুরি যোগাযোগ সেকশন
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            মুমূর্ষু রোগীর প্রয়োজনে দ্রুত রক্তদাতার সন্ধান করুন অথবা অ্যাম্বুলেন্স ও অক্সিজেন সেবার জন্য সরাসরি যোগাযোগ করুন।
          </p>
        </div>

        <button
          onClick={() => setIsRegisterOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors self-start md:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>রক্তদাতা হিসেবে নিবন্ধন করুন</span>
        </button>
      </div>

      {/* Emergency SOS Hotlines Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Foundation Blood Helpline */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-200">
              ২৪/৭ রক্তদান কল সেন্টার
            </span>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
          </div>
          <p className="text-xl font-black font-mono tracking-wider">
            {orgConfig.emergencyPhone}
          </p>
          <p className="text-xs text-red-100 mt-1">
            যেকোনো রক্তের গ্রুপ সংগ্রহে সার্বক্ষণিক সহযোগিতা সেল
          </p>
          <div className="mt-3 pt-2 border-t border-red-500/60 flex items-center gap-2">
            <a
              href={`tel:${orgConfig.emergencyPhone}`}
              className="px-3 py-1 bg-white text-red-600 font-bold text-xs rounded-lg flex items-center gap-1 hover:bg-red-50"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>সরাসরি কল দিন</span>
            </a>
          </div>
        </div>

        {/* Free Ambulance & Oxygen Bank */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-800 text-white shadow-md">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-200 block mb-1">
            অ্যাম্বুলেন্স ও অক্সিজেন ব্যাংক
          </span>
          <p className="text-xl font-black font-mono tracking-wider">
            {orgConfig.hotlinePhone}
          </p>
          <p className="text-xs text-teal-100 mt-1">
            দরিদ্র রোগীদের বিনামূল্যে অক্সিজেন সিলিন্ডার ও অ্যাম্বুলেন্স সেবা
          </p>
          <div className="mt-3 pt-2 border-t border-teal-600/60 flex items-center gap-2">
            <a
              href={`tel:${orgConfig.hotlinePhone}`}
              className="px-3 py-1 bg-white text-teal-800 font-bold text-xs rounded-lg flex items-center gap-1 hover:bg-teal-50"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>অক্সিজেন হেল্পলাইন</span>
            </a>
          </div>
        </div>

        {/* National Emergency 999 Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-md">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1">
            জাতীয় জরুরি সেবা বাংলাদেশ
          </span>
          <p className="text-xl font-black font-mono tracking-wider text-amber-300">
            ৯৯৯ (টোল-ফ্রি)
          </p>
          <p className="text-xs text-slate-300 mt-1">
            ফায়ার সার্ভিস, পুলিশ ও সরকারি অ্যাম্বুলেন্স সহায়তা
          </p>
          <div className="mt-3 pt-2 border-t border-slate-700 flex items-center gap-2">
            <a
              href="tel:999"
              className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1 hover:bg-amber-300"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>৯৯৯ কল করুন</span>
            </a>
          </div>
        </div>
      </div>

      {/* Blood Group Filter Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
            {bloodGroups.map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedGroup(bg)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedGroup === bg
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-red-600'
                }`}
              >
                {bg === 'all' ? 'সকল গ্রুপ' : bg}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <input
              type="text"
              value={districtSearch}
              onChange={(e) => setDistrictSearch(e.target.value)}
              placeholder="জেলা, থানা বা রক্তদাতার নাম খুঁজুন..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Donors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredDonors.map((donor) => (
          <div
            key={donor.id}
            className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow"
          >
            <div>
              {/* Top: Blood Group & Status */}
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-1 bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-black text-sm rounded-lg flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5 fill-red-600" />
                  <span>{donor.bloodGroup}</span>
                </span>

                <button
                  onClick={() => toggleDonorAvailability(donor.id)}
                  title="ক্লিক করে স্ট্যাটাস পরিবর্তন করুন"
                  className="flex items-center gap-1 text-[11px] font-semibold"
                >
                  {donor.isAvailable ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>রক্ত দিতে প্রস্তুত</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>বিরতিতে আছেন</span>
                    </span>
                  )}
                </button>
              </div>

              {/* Name & Location */}
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {donor.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>{donor.district}, {donor.upazila}</span>
              </p>

              <div className="mt-2 text-[11px] text-slate-500 space-y-0.5 border-t border-slate-100 dark:border-slate-800 pt-2">
                <p>সর্বশেষ রক্তদান: <strong className="text-slate-700 dark:text-slate-300">{donor.lastDonationDate}</strong></p>
                <p>মোট রক্তদান: <strong className="text-red-600 dark:text-red-400">{donor.totalDonations} বার</strong></p>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <a
                href={`tel:${donor.phone}`}
                className="py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
              >
                <PhoneCall className="w-3 h-3" />
                <span>কল দিন</span>
              </a>
              <a
                href={`https://wa.me/88${donor.phone.replace(/[^0-9]/g, '')}?text=মানবসেবা%20ফাউন্ডেশন%20থেকে%20জরুরি%20রক্তদানের%20প্রয়োজনে%20যোগাযোগ%20করছি`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold rounded-lg flex items-center justify-center gap-1 hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="w-3 h-3" />
                <span>হোয়াটসঅ্যাপ</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Register Blood Donor Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-6 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Droplet className="w-4 h-4 text-red-600" />
                <span>স্বেচ্ছায় রক্তদাতা হিসেবে নিবন্ধন করুন</span>
              </h3>
              <button
                onClick={() => setIsRegisterOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  আপনার নাম *
                </label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="যেমন: মোঃ সাকিব আল হাসান"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    রক্তের গ্রুপ *
                  </label>
                  <select
                    value={donorBloodGroup}
                    onChange={(e) => setDonorBloodGroup(e.target.value as BloodGroup)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg font-bold text-red-600"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    required
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    জেলা *
                  </label>
                  <input
                    type="text"
                    required
                    value={donorDistrict}
                    onChange={(e) => setDonorDistrict(e.target.value)}
                    placeholder="যেমন: ফেনী"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    উপজেলা / থানা
                  </label>
                  <input
                    type="text"
                    value={donorUpazila}
                    onChange={(e) => setDonorUpazila(e.target.value)}
                    placeholder="যেমন: ফুলগাজী"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  সর্বশেষ রক্তদানের তারিখ (আনুমানিক)
                </label>
                <input
                  type="date"
                  value={lastDate}
                  onChange={(e) => setLastDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <p className="text-[11px] text-slate-500">
                “রক্ত দিলে হয় না ক্ষতি, জাগ্রত হয় মানবিক অনুভূতি।” আপনার এক ব্যাগ রক্ত বাঁচাতে পারে একটি মুমূর্ষু জীবন।
              </p>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  রক্তদাতা হিসেবে তালিকাভুক্ত হোন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
