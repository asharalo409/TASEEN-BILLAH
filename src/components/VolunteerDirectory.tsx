import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Member } from '../types';
import { MemberProfileModal } from './MemberProfileModal';
import {
  Users,
  Search,
  UserPlus,
  ShieldCheck,
  Award,
  MapPin,
  Phone,
  Briefcase,
  IdCard,
  Droplet
} from 'lucide-react';

export const VolunteerDirectory: React.FC = () => {
  const { members, setIsLoginModalOpen, currentUser } = useApp();

  const [selectedRoleType, setSelectedRoleType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingMember, setViewingMember] = useState<Member | null>(null);

  const filteredMembers = members.filter((m) => {
    const matchesRole = selectedRoleType === 'all' || m.roleType === selectedRoleType;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>স্বেচ্ছাসেবী টিম ও কার্যনির্বাহী পরিষদ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            সদস্যদের দায়িত্ব ও কার্যক্রমের অগ্রগতি
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            ফাউন্ডেশনের প্রতিটি সদস্যের পদবী, সুনির্দিষ্ট দায়িত্ব এবং তাদের মাঠপর্যায়ের কাজের অগ্রগতি স্বচ্ছতার সাথে পর্যবেক্ষণ করুন।
          </p>
        </div>

        {/* Action Button & Search */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="নাম, পদবী বা জেলা খুঁজুন..."
              className="pl-8 pr-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>নতুন সদস্য নিবন্ধন (ফ্রী)</span>
          </button>
        </div>
      </div>

      {/* Role Filters */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl max-w-md">
        {[
          { id: 'all', label: 'সকল সদস্য' },
          { id: 'executive', label: 'কার্যনির্বাহী পরিষদ' },
          { id: 'coordinator', label: 'সমন্বয়কবৃন্দ' },
          { id: 'volunteer', label: 'মাঠের স্বেচ্ছাসেবক' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedRoleType(tab.id)}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              selectedRoleType === tab.id
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMembers.map((member) => {
          const isCurrentUser = currentUser?.id === member.id;

          return (
            <div
              key={member.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between overflow-hidden ${
                isCurrentUser
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="p-5 space-y-4">
                {/* Header: Photo, Name, Role */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/60 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {member.name}
                      </h3>
                      {isCurrentUser && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                          আপনি
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{member.district}, {member.upazila}</span>
                    </p>
                  </div>
                </div>

                {/* Key Responsibilities Box */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px]">
                  <p className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 mb-1.5">
                    <Briefcase className="w-3 h-3 text-emerald-600" />
                    <span>প্রধান দায়িত্বসমূহ:</span>
                  </p>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    {member.responsibilities.slice(0, 2).map((resp, idx) => (
                      <li key={idx} className="line-clamp-1 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Progress & Blood Tag */}
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{member.tasks.length}টি কাজের অগ্রগতি সম্পন্ন</span>
                  </span>
                  <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-bold">
                    <Droplet className="w-3 h-3 text-red-500" />
                    <span>{member.bloodGroup}</span>
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => setViewingMember(member)}
                  className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>প্রোফাইল ও অগ্রগতি দেখুন</span>
                </button>
                <button
                  onClick={() => setViewingMember(member)}
                  className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  title="ডিজিটাল পরিচয়পত্র"
                >
                  <IdCard className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Member Profile Modal */}
      {viewingMember && (
        <MemberProfileModal
          member={viewingMember}
          onClose={() => setViewingMember(null)}
        />
      )}
    </section>
  );
};
