import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  KeyRound,
  UserPlus,
  Info,
  X,
  ShieldCheck,
  Heart,
  Droplet,
  Users,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';
import { BloodGroup } from '../types';

export const LoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    loginWithSecretCode,
    registerFreeMember,
    orgConfig,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [secretCodeInput, setSecretCodeInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState('স্বেচ্ছাসেবক');
  const [regBloodGroup, setRegBloodGroup] = useState<BloodGroup>('O+');
  const [regDistrict, setRegDistrict] = useState('ঢাকা');
  const [regUpazila, setRegUpazila] = useState('');
  const [regBio, setRegBio] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!secretCodeInput.trim()) {
      setLoginError('অনুগ্রহ করে আপনার সিক্রেট কোড লিখুন');
      return;
    }

    const res = loginWithSecretCode(secretCodeInput);
    if (res.success) {
      setIsLoginModalOpen(false);
      setSecretCodeInput('');
    } else {
      setLoginError(res.message);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) {
      showToast('নাম এবং মোবাইল নম্বর দেওয়া আবশ্যক', 'error');
      return;
    }

    const res = registerFreeMember({
      name: regName.trim(),
      phone: regPhone.trim(),
      email: regEmail.trim(),
      role: regRole,
      bloodGroup: regBloodGroup,
      district: regDistrict,
      upazila: regUpazila || 'সদর',
      bio: regBio.trim() || 'মানবসেবায় নিবেদিত একনিষ্ঠ কর্মী।'
    });

    if (res.success) {
      setGeneratedCode(res.secretCode);
    }
  };

  const handleCopyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopiedCode(true);
      showToast('সিক্রেট কোড কপি হয়েছে! এটি সংরক্ষণ করে রাখুন।', 'success');
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsLoginModalOpen(false);
            setGeneratedCode(null);
          }}
          className="absolute top-4 right-4 z-10 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Foundation Introduction & Mission Presentation (Requested Feature) */}
        <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white p-6 sm:p-7">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur p-1.5 flex items-center justify-center">
              <img
                src={orgConfig.logoUrl}
                alt={orgConfig.orgName}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {orgConfig.orgName}
              </h2>
              <p className="text-xs text-emerald-200">
                {orgConfig.slogan}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-emerald-50/90 leading-relaxed mt-3 border-t border-emerald-600/60 pt-3">
            {orgConfig.aboutText}
          </p>

          {/* Core Foundation Highlights */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 pt-4 border-t border-emerald-600/40 text-center">
            <div className="bg-emerald-950/40 rounded-lg p-2">
              <ShieldCheck className="w-4 h-4 mx-auto text-emerald-300 mb-1" />
              <p className="text-[11px] font-semibold text-white">১০০% স্বচ্ছ হিসাব</p>
              <p className="text-[10px] text-emerald-200">উন্মুক্ত পাবলিক লেজার</p>
            </div>
            <div className="bg-emerald-950/40 rounded-lg p-2">
              <Users className="w-4 h-4 mx-auto text-emerald-300 mb-1" />
              <p className="text-[11px] font-semibold text-white">স্বেচ্ছাসেবী নেটওয়ার্ক</p>
              <p className="text-[10px] text-emerald-200">দেশজুড়ে সক্রিয় টিম</p>
            </div>
            <div className="bg-emerald-950/40 rounded-lg p-2">
              <Droplet className="w-4 h-4 mx-auto text-red-400 mb-1" />
              <p className="text-[11px] font-semibold text-white">জরুরি রক্ত ও ত্রাণ</p>
              <p className="text-[10px] text-emerald-200">২৪/৭ সেবা সমন্বয়</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {generatedCode ? (
            /* Registration Success Screen with Secret Code */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                অভিনন্দন! আপনার অ্যাকাউন্ট তৈরি সম্পন্ন হয়েছে
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                আপনার অনন্য সিক্রেট কোড নিচে দেওয়া হলো। এই কোডটি দিয়ে আপনি ভবিষ্যতে যে কোনো সময় প্রোফাইলে লগইন করে কাজের অগ্রগতি আপডেট করতে পারবেন।
              </p>

              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl max-w-sm mx-auto flex items-center justify-between border-2 border-dashed border-emerald-500">
                <div className="text-left">
                  <span className="text-[10px] uppercase text-slate-500 font-medium">আপনার সিক্রেট কোড</span>
                  <p className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                    {generatedCode}
                  </p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                >
                  {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setGeneratedCode(null);
                  }}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors"
                >
                  ড্যাশবোর্ডে প্রবেশ করুন
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Tab Selector */}
              <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setLoginError('');
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                    activeTab === 'login'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>সিক্রেট কোড লগইন</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setLoginError('');
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                    activeTab === 'register'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>ফ্রী অ্যাকাউন্ট তৈরি</span>
                </button>
              </div>

              {/* Login Form */}
              {activeTab === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      আপনার ব্যক্তিগত সিক্রেট কোড (Secret Code)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={secretCodeInput}
                        onChange={(e) => setSecretCodeInput(e.target.value)}
                        placeholder="যেমন: ADMIN-2026 বা MSF-VOL-101"
                        className="w-full px-4 py-2.5 text-sm uppercase font-mono tracking-wider bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                        autoFocus
                      />
                      <KeyRound className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
                    </div>
                    {loginError && (
                      <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{loginError}</span>
                      </p>
                    )}
                  </div>

                  {/* Demo Quick-Fill Codes for Easy Testing */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
                      দ্রুত পরীক্ষার জন্য ডেমো কোড সিলেক্ট করুন:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { code: 'ADMIN-2026', label: 'সভাপতি (Admin)' },
                        { code: 'SEC-2026', label: 'সাধারণ সম্পাদক' },
                        { code: 'FINANCE-101', label: 'অর্থ সম্পাদক' },
                        { code: 'BLOOD-99', label: 'রক্তদান সমন্বয়ক' },
                        { code: 'VOL-303', label: 'স্বেচ্ছাসেবক' }
                      ].map((item) => (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => setSecretCodeInput(item.code)}
                          className="px-2.5 py-1 text-[11px] font-medium bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-emerald-500 rounded-md text-slate-700 dark:text-slate-200 transition-colors"
                        >
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{item.code}</span>
                          <span className="ml-1 text-slate-400">({item.label})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors"
                  >
                    লগইন করুন
                  </button>

                  <div className="text-center pt-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      কোনো অ্যাকাউন্ট নেই?{' '}
                      <button
                        type="button"
                        onClick={() => setActiveTab('register')}
                        className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                      >
                        বিনামূল্যে স্বেচ্ছাসেবক অ্যাকাউন্ট খুলুন
                      </button>
                    </p>
                  </div>
                </form>
              ) : (
                /* Free Registration Form */
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        আপনার পূর্ণ নাম *
                      </label>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="যেমন: মোঃ জাহিদ হাসান"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        মোবাইল নম্বর *
                      </label>
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        রক্তের গ্রুপ
                      </label>
                      <select
                        value={regBloodGroup}
                        onChange={(e) => setRegBloodGroup(e.target.value as BloodGroup)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                      >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        জেলা
                      </label>
                      <input
                        type="text"
                        value={regDistrict}
                        onChange={(e) => setRegDistrict(e.target.value)}
                        placeholder="যেমন: ফেনী, ঢাকা, কুমিল্লা"
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        উপজেলা/থানা
                      </label>
                      <input
                        type="text"
                        value={regUpazila}
                        onChange={(e) => setRegUpazila(e.target.value)}
                        placeholder="যেমন: ফুলগাজী"
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      ইমেইল (ঐচ্ছিক)
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="zahid@example.com"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      সংক্ষিপ্ত পরিচয় বা আগ্রহের বিষয়
                    </label>
                    <textarea
                      rows={2}
                      value={regBio}
                      onChange={(e) => setRegBio(e.target.value)}
                      placeholder="কী ধরনের মানবকল্যাণমূলক কাজে অংশ নিতে আগ্রহী..."
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white resize-none"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    নিবন্ধন সম্পন্ন হলে আপনাকে একটি গোপন সিক্রেট কোড প্রদান করা হবে যা দিয়ে পরবর্তীতে আপনি লগইন করতে পারবেন।
                  </p>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors"
                  >
                    বিনামূল্যে অ্যাকাউন্ট সম্পন্ন করুন
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
