import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Member, MemberTask } from '../types';
import {
  User,
  ShieldCheck,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  Briefcase,
  IdCard,
  Droplet,
  Award,
  KeyRound,
  Download,
  Printer,
  ChevronRight,
  Sparkles,
  FileText,
  Users,
  Settings
} from 'lucide-react';

export const PersonalMemberDashboard: React.FC = () => {
  const {
    currentUser,
    members,
    donations,
    updateMemberFeeStatus,
    addMemberTask,
    updateMemberProfile,
    setIsLoginModalOpen,
    orgConfig,
    showToast,
    t
  } = useApp();

  // If admin wants to view another member's dashboard
  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    currentUser?.id || members[0]?.id || ''
  );

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'fees' | 'tasks' | 'tools' | 'idcard'>('overview');

  // Task form
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskLocation, setTaskLocation] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskProof, setTaskProof] = useState('');

  // Resolution tool state for President
  const [resolutionText, setResolutionText] = useState('');

  const targetMember = members.find(m => m.id === selectedMemberId) || currentUser || members[0];
  const isOwner = currentUser?.id === targetMember?.id;
  const isAdmin = currentUser?.isAdmin;

  if (!targetMember) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
        <User className="w-12 h-12 mx-auto text-slate-400" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {t('কোনো সদস্য লগইন করা নেই', 'No Member Logged In')}
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {t('আপনার ব্যক্তিগত ড্যাশবোর্ড ও হিসাব দেখতে অনুগ্রহ করে সিক্রেট কোড দিয়ে প্রবেশ করুন।', 'Please login with your Secret Code to view your personal dashboard.')}
        </p>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md"
        >
          {t('সিক্রেট কোড লগইন করুন', 'Secret Code Login')}
        </button>
      </div>
    );
  }

  // Calculate personal donations by this member's name or phone
  const personalDonations = donations.filter(
    d => d.donorName.includes(targetMember.name) || d.donorPhone === targetMember.phone
  );
  const totalPersonalDonation = personalDonations.reduce((sum, d) => sum + d.amount, 0);

  // Fee calculation for this member
  const months = ['2026-09', '2026-08', '2026-07'];
  const paidMonthsCount = months.filter(m => targetMember.monthlyFees[m] === 'paid').length;

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !taskDesc.trim()) return;

    addMemberTask(targetMember.id, {
      title: taskTitle.trim(),
      date: taskDate,
      location: taskLocation.trim() || targetMember.district,
      description: taskDesc.trim(),
      proofUrl: taskProof.trim() || undefined
    });

    setTaskTitle('');
    setTaskDesc('');
    setTaskLocation('');
    setTaskProof('');
    setIsAddingTask(false);
  };

  return (
    <section className="space-y-6">
      {/* Top Banner: Member Selection (For Admin/Switching) & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <User className="w-4 h-4" />
            <span>{t('সদস্য ব্যক্তিগত ড্যাশবোর্ড ও কর্মপরিধি', 'Personal Member Dashboard & Operations')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {targetMember.name} - {targetMember.role}
          </h2>
          <p className="text-xs text-slate-500">
            {t('ব্যক্তিগত হিসাব, মাসিক চাঁদা, অর্পিত দায়িত্ব ও পদবীর বিশেষ কার্যপদ্ধতি।', 'Personal accounts, monthly dues, assigned duties, and role tools.')}
          </p>
        </div>

        {/* Member Switcher Dropdown (Allows viewing all members' separate dashboards) */}
        <div className="flex items-center gap-2 text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded-xl">
          <span className="text-slate-500 font-medium">ড্যাশবোর্ড পরিবর্তন:</span>
          <select
            value={targetMember.id}
            onChange={(e) => setSelectedMemberId(e.target.value)}
            className="px-2.5 py-1 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg border font-semibold text-xs"
          >
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.role})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Member Hero Summary Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <img
            src={targetMember.avatar}
            alt={targetMember.name}
            className="w-24 h-24 rounded-3xl object-cover border-4 border-emerald-500/80 shadow-md"
          />
          {targetMember.isAdmin && (
            <span className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow">
              ADMIN
            </span>
          )}
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {targetMember.name}
            </h3>
            <span className="px-3 py-0.5 text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full">
              {targetMember.role}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {targetMember.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{targetMember.district}, {targetMember.upazila}</span>
            </span>
            <span className="flex items-center gap-1">
              <Droplet className="w-3.5 h-3.5 text-red-500" />
              <span>গ্রুপ: <strong className="text-red-600 font-bold">{targetMember.bloodGroup}</strong></span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>যোগদান: {targetMember.joinDate}</span>
            </span>
          </div>
        </div>

        {/* Secret Code Card */}
        <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center shrink-0">
          <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold uppercase block tracking-wider">
            সিক্রেট লগইন কোড
          </span>
          <span className="font-mono font-black text-base text-emerald-700 dark:text-emerald-400 tracking-wider">
            {targetMember.secretCode}
          </span>
          <p className="text-[10px] text-slate-400 mt-1">গোপনীয় রাখুন</p>
        </div>
      </div>

      {/* Sub Tabs: Overview, Fees, Tasks, Role Tools, ID Card */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl no-scrollbar text-xs">
        {[
          { id: 'overview', label: 'আর্থিক হিসাব ও সারসংক্ষেপ', icon: DollarSign },
          { id: 'fees', label: 'মাসিক চাঁদা লেজার', icon: FileText },
          { id: 'tasks', label: `কাজের অগ্রগতি (${targetMember.tasks.length})`, icon: Award },
          { id: 'tools', label: `পদের বিশেষ টুলস (${targetMember.role})`, icon: Briefcase },
          { id: 'idcard', label: 'ডিজিটাল আইডি কার্ড', icon: IdCard },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Financial Overview */}
      {activeSubTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 block mb-1">মোট ব্যক্তিগত অনুদান:</span>
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                ৳{totalPersonalDonation.toLocaleString('bn-BD')}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">{personalDonations.length}টি প্রকল্পে অংশগ্রহণ</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 block mb-1">মাসিক সদস্য ফি পরিশোধ:</span>
              <p className="text-xl font-black text-blue-600 dark:text-blue-400">
                {paidMonthsCount} / {months.length} মাস
              </p>
              <p className="text-[11px] text-slate-400 mt-1">ধার্যকৃত মাসিক ফি: ৫০০ ৳</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 block mb-1">মাঠপর্যায়ে সম্পন্ন কাজ:</span>
              <p className="text-xl font-black text-amber-600 dark:text-amber-400">
                {targetMember.tasks.length}টি রিপোর্ট
              </p>
              <p className="text-[11px] text-slate-400 mt-1">সবগুলো অডিট ভেরিফাইড</p>
            </div>
          </div>

          {/* Assigned Responsibilities List */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>{targetMember.role} পদের অর্পিত দায়িত্বসমূহ:</span>
            </h4>
            <ul className="space-y-2">
              {targetMember.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: Personal Monthly Fees Ledger */}
      {activeSubTab === 'fees' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {targetMember.name} - এর মাসিক ফি খতিয়ান
              </h3>
              <p className="text-slate-500">মাসিক নির্ধারিত ফি: ৫০০ ৳</p>
            </div>
          </div>

          <div className="space-y-2">
            {months.map((m) => {
              const status = targetMember.monthlyFees[m] || 'due';
              const isPaid = status === 'paid';
              return (
                <div
                  key={m}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{m} মাস</p>
                    <p className="text-slate-500">ফি: ৫০০ ৳</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {isPaid ? (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>পরিশোধিত</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-800 font-bold rounded-lg flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>বকেয়া</span>
                      </span>
                    )}

                    <button
                      onClick={() =>
                        updateMemberFeeStatus(targetMember.id, m, isPaid ? 'due' : 'paid')
                      }
                      className="px-3 py-1 bg-white dark:bg-slate-700 border text-slate-700 dark:text-slate-200 rounded-lg hover:border-emerald-500 font-semibold"
                    >
                      {isPaid ? 'বকেয়া মার্ক করুন' : 'পরিশোধ নিশ্চিত করুন'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Member Work Progress Tasks */}
      {activeSubTab === 'tasks' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              কাজের অগ্রগতি রিপোর্ট ও ইতিহাস
            </h3>
            <button
              onClick={() => setIsAddingTask(prev => !prev)}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>নতুন কাজের অগ্রগতি যোগ করুন</span>
            </button>
          </div>

          {isAddingTask && (
            <form onSubmit={handleTaskSubmit} className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-3">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200">
                নতুন কাজের বিবরণ দিন
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="কাজের শিরোনাম (যেমন: কম্বল বিতরণ কার্যক্রম)"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-800 border rounded-lg"
                />
                <input
                  type="date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-800 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="স্থান/এলাকা"
                  value={taskLocation}
                  onChange={(e) => setTaskLocation(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-800 border rounded-lg"
                />
                <input
                  type="url"
                  placeholder="ছবির প্রমাণ লিংক (ঐচ্ছিক)"
                  value={taskProof}
                  onChange={(e) => setTaskProof(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-800 border rounded-lg"
                />
              </div>
              <textarea
                rows={2}
                required
                placeholder="কাজের বিস্তারিত ফলাফল ও সুবিধাভোগীদের সংখ্যা..."
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border rounded-lg resize-none"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddingTask(false)} className="px-3 py-1.5 border rounded-lg">বাতিল</button>
                <button type="submit" className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold">সাবমিট করুন</button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {targetMember.tasks.map((task) => (
              <div key={task.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{task.title}</h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">ভেরিফাইড</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{task.description}</p>
                <div className="flex items-center gap-3 text-slate-400 text-[11px] pt-1">
                  <span>তারিখ: {task.date}</span>
                  <span>·</span>
                  <span>স্থান: {task.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Role-Specific Operational Tools */}
      {activeSubTab === 'tools' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 text-xs">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>{targetMember.role} পদের জন্য নির্ধারিত বিশেষ টুলকিট</span>
            </h3>
            <p className="text-slate-500">
              ফাউন্ডেশনের সংবিধান অনুযায়ী এই পদের কর্মকর্তা হিসেবে যা যা কার্যক্রম সম্পাদন করতে পারবেন।
            </p>
          </div>

          {/* Specific Toolkit based on Role */}
          {targetMember.role.includes('সভাপতি') ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
                <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                  ১. কেন্দ্রীয় রেজুলেশন ও নীতি ড্রাফটিং টুল (President Resolution)
                </h4>
                <textarea
                  rows={3}
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  placeholder="আসন্ন শীতবস্ত্র বিতরণ ও বিশেষ জরুরি তহবিল সংক্রান্ত সভার সিদ্ধান্ত ও খসড়া রেজুলেশন..."
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border rounded-lg"
                />
                <button
                  onClick={() => {
                    if (resolutionText.trim()) {
                      showToast('রেজুলেশন খসড়া অনুমোদিত হয়েছে ও সংরক্ষিত হয়েছে', 'success');
                      setResolutionText('');
                    }
                  }}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-sm"
                >
                  রেজুলেশন অনুমোদন ও নোটিফিকেশন পাঠান
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white">
                  ২. নির্বাহী ক্ষমতা ও অ্যাডমিন নিয়ন্ত্রণ
                </h4>
                <p className="text-slate-500">
                  সভাপতি হিসেবে আপনি যেকোনো সদস্যের পদবী পরিবর্তন, নতুন পদ সৃষ্টি ও যেকোনো কার্যনির্বাহী সদস্যকে পূর্ণাঙ্গ অ্যাডমিন ক্ষমতা প্রদান করতে পারেন।
                </p>
              </div>
            </div>
          ) : targetMember.role.includes('অর্থ') || targetMember.role.includes('কোষাধ্যক্ষ') ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 space-y-2">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                  তাৎক্ষণিক ক্যাশ মেমো ও অডিট রিকনসিলিয়েশন
                </h4>
                <p className="text-slate-600 dark:text-slate-300">
                  বিকাশ, নগদ ও ব্যাংক স্টেটমেন্ট দেখে তাৎক্ষণিক ভাউচার ক্লিয়ারেন্স ও মানি রিসিট ভেরিফিকেশন ব্যবস্থা।
                </p>
              </div>
            </div>
          ) : targetMember.role.includes('সাধারণ সম্পাদক') ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 space-y-2">
                <h4 className="font-bold text-blue-900 dark:text-blue-200 text-sm">
                  মাঠের ভলান্টিয়ার স্কোয়াড পরিচালনা ও জেলা অ্যাসাইনমেন্ট
                </h4>
                <p className="text-slate-600 dark:text-slate-300">
                  ত্রাণ এলাকায় দ্রুত দায়িত্ব বণ্টনের জন্য ভলান্টিয়ার টিম লিডার নিয়োগ ও জরুরি নোটিশ জারি করার টুলস।
                </p>
              </div>
            </div>
          ) : targetMember.role.includes('রক্ত') || targetMember.role.includes('স্বাস্থ্য') ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 space-y-2">
                <h4 className="font-bold text-red-900 dark:text-red-200 text-sm">
                  জরুরি রক্তদাতা মোটিফিকেশন ও অ্যাম্বুলেন্স ডেসপ্যাচ
                </h4>
                <p className="text-slate-600 dark:text-slate-300">
                  নেগেটিভ গ্রুপের রক্তের জন্য নিকটস্থ রক্তদাতার সাথে সরাসরি যোগাযোগ ও কল সেন্টার পরিচালনা।
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white">
                স্বেচ্ছাসেবক ফিল্ড টুলকিট
              </h4>
              <p className="text-slate-500">
                মাঠপর্যায়ে সেবা কার্যক্রমে অংশগ্রহণ করুন, ছবি তুলুন এবং আপনার অগ্রগতি রিপোর্ট জমা দিন।
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: ID Card */}
      {activeSubTab === 'idcard' && (
        <div className="text-center space-y-4">
          <div className="printable-area max-w-sm mx-auto bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl shadow-xl overflow-hidden border-2 border-emerald-400/40 p-5 text-center relative">
            <div className="flex items-center justify-center gap-2 mb-2 pb-2 border-b border-emerald-700/60">
              <img src={orgConfig.logoUrl} alt="Logo" className="w-8 h-8 object-contain" />
              <div className="text-left">
                <p className="font-black text-xs leading-tight text-white">{orgConfig.orgName}</p>
                <p className="text-[9px] text-emerald-200">অফিসিয়াল সদস্য পরিচয়পত্র</p>
              </div>
            </div>

            <div className="my-3">
              <img
                src={targetMember.avatar}
                alt={targetMember.name}
                className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white/80 shadow-md"
              />
              <h3 className="text-base font-bold text-white mt-2 leading-tight">
                {targetMember.name}
              </h3>
              <span className="inline-block px-3 py-0.5 bg-amber-400 text-slate-950 font-bold text-[11px] rounded-full mt-1">
                {targetMember.role}
              </span>
            </div>

            <div className="bg-emerald-950/60 rounded-xl p-3 text-left space-y-1 text-[11px] text-emerald-100 border border-emerald-700/40">
              <div className="flex justify-between">
                <span className="text-emerald-300">আইডি কোড:</span>
                <span className="font-mono font-bold text-white">{targetMember.secretCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">রক্তের গ্রুপ:</span>
                <span className="font-bold text-red-300">{targetMember.bloodGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">এলাকা:</span>
                <span>{targetMember.district}, {targetMember.upazila}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">মোবাইল:</span>
                <span className="font-mono">{targetMember.phone}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-700/60 flex items-center justify-between text-[9px] text-emerald-200">
              <span className="font-mono">||||| | |||| ||| |||||</span>
              <span className="border-b border-emerald-400">কর্তৃপক্ষের স্বাক্ষর</span>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow"
          >
            আইডি কার্ড প্রিন্ট / ডাউনলোড করুন
          </button>
        </div>
      )}
    </section>
  );
};
