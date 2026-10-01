import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Member, BloodGroup } from '../types';
import {
  ShieldAlert,
  UserPlus,
  ShieldCheck,
  CheckCircle,
  XCircle,
  KeyRound,
  Settings,
  Users,
  Briefcase,
  ToggleLeft,
  ToggleRight,
  Sliders,
  DollarSign,
  Phone,
  Droplet
} from 'lucide-react';

export const AdminControlPanel: React.FC = () => {
  const {
    members,
    toggleMemberAdmin,
    changeMemberRole,
    addNewMemberByAdmin,
    orgConfig,
    updateFeatureToggle,
    currentUser,
    t
  } = useApp();

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberPhone, setNewMemberPhone] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('কার্যনির্বাহী সদস্য');
  const [newMemberRoleType, setNewMemberRoleType] = useState<Member['roleType']>('executive');
  const [newMemberBlood, setNewMemberBlood] = useState<BloodGroup>('O+');
  const [newMemberDistrict, setNewMemberDistrict] = useState('ঢাকা');
  const [newMemberUpazila, setNewMemberUpazila] = useState('ধানমন্ডি');
  const [newMemberIsAdmin, setNewMemberIsAdmin] = useState(false);
  const [newMemberBio, setNewMemberBio] = useState('');
  const [newMemberDuties, setNewMemberDuties] = useState('');

  const adminCount = members.filter(m => m.isAdmin).length;

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberPhone.trim()) return;

    const respList = newMemberDuties.split('\n').filter(d => d.trim().length > 0);

    addNewMemberByAdmin({
      name: newMemberName.trim(),
      phone: newMemberPhone.trim(),
      email: `${newMemberPhone.trim()}@manobsheba.org`,
      role: newMemberRole,
      roleType: newMemberRoleType,
      isAdmin: newMemberIsAdmin,
      bloodGroup: newMemberBlood,
      district: newMemberDistrict,
      upazila: newMemberUpazila,
      bio: newMemberBio.trim() || 'ফাউন্ডেশনের একনিষ্ঠ কর্মী ও সমাজসেবক।',
      responsibilities: respList.length > 0 ? respList : ['অর্পিত দায়িত্ব পালন ও কার্যক্রম পরিচালনা']
    });

    setNewMemberName('');
    setNewMemberPhone('');
    setNewMemberBio('');
    setNewMemberDuties('');
    setIsAddMemberOpen(false);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            <span>{t('কেন্দ্রীয় অ্যাডমিন নিয়ন্ত্রণ প্যানেল', 'Central Admin Control Panel')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {t('সদস্য পরিচালনা, পদবী বণ্টন ও অ্যাডমিন ক্ষমতা', 'Member Management, Roles & Admin Controls')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t(
              'কাউকে নতুন অ্যাডমিন দিন, পদবী পরিবর্তন করুন, দায়িত্ব নির্ধারণ করুন এবং অ্যাপের ফিচারসমূহ নিয়ন্ত্রণ করুন।',
              'Grant admin rights, reassign roles, configure duties, and toggle website features.'
            )}
          </p>
        </div>

        <button
          onClick={() => setIsAddMemberOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors self-start md:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t('নতুন কর্মকর্তা/সদস্য যোগ করুন', 'Add New Official / Member')}</span>
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 block">মোট সদস্য সংখ্যা:</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{members.length} জন</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 block">সক্রিয় অ্যাডমিন:</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{adminCount} জন</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 block">কার্যনির্বাহী পরিষদ:</span>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {members.filter(m => m.roleType === 'executive').length} জন
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] text-slate-500 block">মাঠের স্বেচ্ছাসেবক:</span>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {members.filter(m => m.roleType === 'volunteer').length} জন
          </p>
        </div>
      </div>

      {/* Feature Toggles Panel (Requested: ফিচার এর ক্ষেত্রে সেটিংস এর মাধ্যমে পরিবর্তন করতে পারব) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <Sliders className="w-4 h-4 text-emerald-600" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {t('অ্যাপের ফিচার ও মডিউল অন/অফ সেটিংস', 'App Feature & Module Controls')}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {[
            {
              key: 'showCalendarClock' as const,
              title: 'লাইভ ঘড়ি ও ৩টি ক্যালেন্ডার',
              desc: 'ইংরেজি, বাংলা ও ইসলামিক হিজরি ক্যালেন্ডার উইজেট'
            },
            {
              key: 'showLiveChat' as const,
              title: 'লাইভ চ্যাট রুম ও ১-অন-১ মেসেজিং',
              desc: 'সদস্যদের যৌথ কমিউনিটি চ্যাট ও ব্যক্তিগত বার্তা'
            },
            {
              key: 'showSectorLedgers' as const,
              title: 'খাতভিত্তিক পৃথক আয়-ব্যয় খতিয়ান',
              desc: 'বন্যা, শীতবস্ত্র, শিক্ষা ও চিকিৎসা খাতের আলাদা হিসাব'
            },
            {
              key: 'showVirtualMeetingStrip' as const,
              title: 'ভার্চুয়াল মিটিং হাব (Zoom, Meet, FB)',
              desc: 'সরাসরি জুম, গুগল মিট ও হোয়াটসঅ্যাপে যোগদানের বাটন'
            },
            {
              key: 'showEmojiReactions' as const,
              title: 'ইমোজি রিঅ্যাকশন ও পাবলিক কমেন্ট',
              desc: 'কাজে মন্তব্য ও দোয়া/ভালোবাসা ইমোজি দেওয়ার সুবিধা'
            }
          ].map((item) => {
            const isEnabled = orgConfig.enabledFeatures?.[item.key] ?? true;
            return (
              <div
                key={item.key}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border flex items-center justify-between gap-3"
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{item.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => updateFeatureToggle(item.key, !isEnabled)}
                  className={`text-2xl transition-colors ${isEnabled ? 'text-emerald-600' : 'text-slate-400'}`}
                >
                  {isEnabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Members Management Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {t('সকল সদস্য তালিকা ও ক্ষমতা নিয়ন্ত্রণ', 'All Members & Permission Control')}
            </h3>
            <p className="text-xs text-slate-500">পদবী পরিবর্তন করতে ড্রপডাউন সিলেক্ট করুন অথবা অ্যাডমিন বাটন চাপুন</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">সদস্যের নাম ও ছবি</th>
                <th className="py-3 px-4">সিক্রেট কোড</th>
                <th className="py-3 px-4">বর্তমান পদবী</th>
                <th className="py-3 px-4">পদবী পরিবর্তন</th>
                <th className="py-3 px-4">অ্যাডমিন স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">ক্ষমতা পরিবর্তন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover border" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{member.name}</p>
                        <p className="text-[11px] text-slate-500">{member.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {member.secretCode}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded font-semibold text-[11px]">
                      {member.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={member.role}
                      onChange={(e) => {
                        const newR = e.target.value;
                        let rType: Member['roleType'] = 'member';
                        if (newR.includes('সভাপতি') || newR.includes('সম্পাদক')) rType = 'executive';
                        else if (newR.includes('সমন্বয়ক')) rType = 'coordinator';
                        else if (newR.includes('স্বেচ্ছাসেবক')) rType = 'volunteer';
                        changeMemberRole(member.id, newR, rType);
                      }}
                      className="px-2 py-1 bg-white dark:bg-slate-800 border rounded text-xs"
                    >
                      <option value="সভাপতি">সভাপতি (President)</option>
                      <option value="সাধারণ সম্পাদক">সাধারণ সম্পাদক (General Secretary)</option>
                      <option value="অর্থ ও হিসাব সম্পাদক">অর্থ ও হিসাব সম্পাদক (Treasurer)</option>
                      <option value="স্বাস্থ্য ও রক্তদান সমন্বয়ক">স্বাস্থ্য ও রক্তদান সমন্বয়ক</option>
                      <option value="প্রচার ও প্রযুক্তি বিষয়ক সম্পাদক">প্রচার ও প্রযুক্তি বিষয়ক সম্পাদক</option>
                      <option value="কার্যনির্বাহী সদস্য">কার্যনির্বাহী সদস্য (Executive)</option>
                      <option value="সাধারণ সদস্য">সাধারণ সদস্য (General Member)</option>
                      <option value="মাঠপর্যায়ের স্বেচ্ছাসেবক">মাঠপর্যায়ের স্বেচ্ছাসেবক</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    {member.isAdmin ? (
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold rounded-full text-[10px]">
                        অ্যাডমিন (Admin)
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">সাধারণ</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleMemberAdmin(member.id)}
                      className={`px-3 py-1 text-[11px] font-semibold rounded-lg border transition-colors ${
                        member.isAdmin
                          ? 'border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40'
                          : 'border-emerald-500 text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                      }`}
                    >
                      {member.isAdmin ? 'অ্যাডমিন ক্ষমতা বাতিল' : 'অ্যাডমিন অধিকার দিন'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Member Modal (Admin Function) */}
      {isAddMemberOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 my-6 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-600" />
                <span>নতুন কর্মকর্তা / সদস্য নিয়োগ ও পদায়ন</span>
              </h3>
              <button onClick={() => setIsAddMemberOpen(false)} className="text-slate-400 hover:text-slate-600">
                বাতিল
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    পূর্ণ নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="যেমন: এস এম রিয়াজুল ইসলাম"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newMemberPhone}
                    onChange={(e) => setNewMemberPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    পদবী নির্বাচন করুন *
                  </label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => {
                      setNewMemberRole(e.target.value);
                      if (e.target.value.includes('সভাপতি') || e.target.value.includes('সম্পাদক')) {
                        setNewMemberRoleType('executive');
                      } else {
                        setNewMemberRoleType('volunteer');
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  >
                    <option value="সহ-সভাপতি">সহ-সভাপতি</option>
                    <option value="যুগ্ম সাধারণ সম্পাদক">যুগ্ম সাধারণ সম্পাদক</option>
                    <option value="সাংগঠনিক সম্পাদক">সাংগঠনিক সম্পাদক</option>
                    <option value="দপ্তর সম্পাদক">দপ্তর সম্পাদক</option>
                    <option value="ত্রাণ ও সমাজকল্যাণ সম্পাদক">ত্রাণ ও সমাজকল্যাণ সম্পাদক</option>
                    <option value="কার্যনির্বাহী সদস্য">কার্যনির্বাহী সদস্য</option>
                    <option value="জেলা সমন্বয়ক">জেলা সমন্বয়ক</option>
                    <option value="স্বেচ্ছাসেবক">স্বেচ্ছাসেবক</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    রক্তের গ্রুপ
                  </label>
                  <select
                    value={newMemberBlood}
                    onChange={(e) => setNewMemberBlood(e.target.value as BloodGroup)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    জেলা
                  </label>
                  <input
                    type="text"
                    value={newMemberDistrict}
                    onChange={(e) => setNewMemberDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    উপজেলা/থানা
                  </label>
                  <input
                    type="text"
                    value={newMemberUpazila}
                    onChange={(e) => setNewMemberUpazila(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg"
                  />
                </div>
              </div>

              {/* Admin Checkbox */}
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="makeAdminCheck"
                  checked={newMemberIsAdmin}
                  onChange={(e) => setNewMemberIsAdmin(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="makeAdminCheck" className="text-slate-800 dark:text-slate-200 font-bold select-none cursor-pointer">
                  তাকে পূর্ণাঙ্গ অ্যাডমিন ক্ষমতা দিন (Can manage all records & members)
                </label>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  দায়িত্বসমূহ (প্রতি লাইনে একটি দায়িত্ব লিখুন)
                </label>
                <textarea
                  rows={2}
                  value={newMemberDuties}
                  onChange={(e) => setNewMemberDuties(e.target.value)}
                  placeholder="উপজেলা পর্যায়ে ত্রাণ বণ্টন তদারকি&#10;নতুন স্বেচ্ছাসেবক টিম গঠন"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddMemberOpen(false)} className="px-4 py-2 border rounded-lg">
                  বাতিল
                </button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm">
                  সদস্য অনুমোদন ও কোড জেনারেট করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
