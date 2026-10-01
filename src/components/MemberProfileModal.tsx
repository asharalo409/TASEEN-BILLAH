import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Member } from '../types';
import {
  X,
  ShieldCheck,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Droplet,
  Plus,
  KeyRound,
  Printer,
  Award,
  ExternalLink,
  Briefcase
} from 'lucide-react';

interface Props {
  member: Member | null;
  onClose: () => void;
}

export const MemberProfileModal: React.FC<Props> = ({ member, onClose }) => {
  const { currentUser, addMemberTask, updateMemberProfile, orgConfig, showToast } = useApp();

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskLocation, setTaskLocation] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskProofUrl, setTaskProofUrl] = useState('');

  // Editing responsibilities state
  const [isEditingDuties, setIsEditingDuties] = useState(false);
  const [newDutyInput, setNewDutyInput] = useState('');
  const [showIdCard, setShowIdCard] = useState(false);

  if (!member) return null;

  const isSelfOrAdmin = currentUser?.id === member.id || currentUser?.roleType === 'executive';

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !taskDescription.trim()) {
      showToast('কাজের শিরোনাম ও বিবরণ দেওয়া আবশ্যক', 'error');
      return;
    }

    addMemberTask(member.id, {
      title: taskTitle.trim(),
      date: taskDate,
      location: taskLocation.trim() || `${member.district}`,
      description: taskDescription.trim(),
      proofUrl: taskProofUrl.trim() || undefined
    });

    setTaskTitle('');
    setTaskDescription('');
    setTaskLocation('');
    setTaskProofUrl('');
    setIsAddingTask(false);
  };

  const handleAddDuty = () => {
    if (!newDutyInput.trim()) return;
    const updated = [...member.responsibilities, newDutyInput.trim()];
    updateMemberProfile(member.id, { responsibilities: updated });
    setNewDutyInput('');
  };

  const handleRemoveDuty = (index: number) => {
    const updated = member.responsibilities.filter((_, i) => i !== index);
    updateMemberProfile(member.id, { responsibilities: updated });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              সদস্য প্রোফাইল ও অগ্রগতি
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowIdCard(!showIdCard)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{showIdCard ? 'প্রোফাইলে ফিরুন' : 'আইডি কার্ড'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {showIdCard ? (
            /* Printable Volunteer ID Card */
            <div className="space-y-4">
              <div className="printable-area max-w-sm mx-auto bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl shadow-xl overflow-hidden border-2 border-emerald-400/40 p-5 text-center relative">
                {/* ID Header */}
                <div className="flex items-center justify-center gap-2 mb-2 pb-2 border-b border-emerald-700/60">
                  <img src={orgConfig.logoUrl} alt="Logo" className="w-8 h-8 object-contain" />
                  <div className="text-left">
                    <p className="font-black text-xs leading-tight text-white">{orgConfig.orgName}</p>
                    <p className="text-[9px] text-emerald-200">অফিসিয়াল স্বেচ্ছাসেবক পরিচয়পত্র</p>
                  </div>
                </div>

                {/* Photo & Name */}
                <div className="my-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white/80 shadow-md"
                  />
                  <h3 className="text-base font-bold text-white mt-2 leading-tight">
                    {member.name}
                  </h3>
                  <span className="inline-block px-3 py-0.5 bg-amber-400 text-slate-950 font-bold text-[11px] rounded-full mt-1">
                    {member.role}
                  </span>
                </div>

                {/* ID Details */}
                <div className="bg-emerald-950/60 rounded-xl p-3 text-left space-y-1 text-[11px] text-emerald-100 border border-emerald-700/40">
                  <div className="flex justify-between">
                    <span className="text-emerald-300">আইডি কোড:</span>
                    <span className="font-mono font-bold text-white">{member.secretCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">রক্তের গ্রুপ:</span>
                    <span className="font-bold text-red-300">{member.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">এলাকা:</span>
                    <span>{member.district}, {member.upazila}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">যোগদান:</span>
                    <span>{member.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300">মোবাইল:</span>
                    <span className="font-mono">{member.phone}</span>
                  </div>
                </div>

                {/* Barcode & Signature */}
                <div className="mt-4 pt-3 border-t border-emerald-700/60 flex items-center justify-between text-[9px] text-emerald-200">
                  <div className="text-left font-mono">
                    ||||| | |||| ||| |||||
                    <span className="block text-[8px]">VERIFIED VOLUNTEER</span>
                  </div>
                  <div className="text-right">
                    <div className="w-16 border-b border-emerald-400 mb-0.5" />
                    <span>সভাপতি স্বাক্ষর</span>
                  </div>
                </div>
              </div>

              <div className="text-center no-print">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  প্রিন্ট / আইডি কার্ড সেভ করুন
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Member Top Bio */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-md shrink-0"
                />
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {member.name}
                    </h3>
                    <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-full">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-slate-500 text-[11px] pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{member.district}, {member.upazila}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Droplet className="w-3.5 h-3.5 text-red-500" />
                      <span>রক্তের গ্রুপ: <strong className="text-red-600 dark:text-red-400">{member.bloodGroup}</strong></span>
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-blue-500" />
                      <span>{member.phone}</span>
                    </span>
                  </div>
                </div>

                {/* Secret Code Hint */}
                {isSelfOrAdmin && (
                  <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center shrink-0">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">সিক্রেট কোড</span>
                    <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                      {member.secretCode}
                    </span>
                  </div>
                )}
              </div>

              {/* Responsibilities Section (Detailed Duties Breakdown) */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    <span>পদবী ও অর্পিত দায়িত্বসমূহ (Responsibilities)</span>
                  </h4>
                  {isSelfOrAdmin && (
                    <button
                      onClick={() => setIsEditingDuties(!isEditingDuties)}
                      className="text-[11px] text-emerald-600 hover:underline font-semibold"
                    >
                      {isEditingDuties ? 'সম্পন্ন' : 'দায়িত্ব সম্পাদনা'}
                    </button>
                  )}
                </div>

                <ul className="space-y-1.5">
                  {member.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start justify-between gap-2 text-slate-700 dark:text-slate-300">
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{resp}</span>
                      </div>
                      {isEditingDuties && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDuty(idx)}
                          className="text-red-500 hover:text-red-700 text-[10px]"
                        >
                          মুছুন
                        </button>
                      )}
                    </li>
                  ))}
                </ul>

                {isEditingDuties && (
                  <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <input
                      type="text"
                      value={newDutyInput}
                      onChange={(e) => setNewDutyInput(e.target.value)}
                      placeholder="নতুন দায়িত্ব লিখুন..."
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-800 border rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddDuty}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold"
                    >
                      যুক্ত করুন
                    </button>
                  </div>
                )}
              </div>

              {/* Tasks Progress Section (Where members update their work progress) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span>কাজের অগ্রগতি ও সম্পন্নকৃত সেবা কার্যক্রম ({member.tasks.length})</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      মাঠ পর্যায়ে সম্পন্ন করা কাজের বিবরণ ও প্রমাণপত্র
                    </p>
                  </div>

                  {isSelfOrAdmin && (
                    <button
                      onClick={() => setIsAddingTask(prev => !prev)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>অগ্রগতি রিপোর্ট যোগ করুন</span>
                    </button>
                  )}
                </div>

                {/* Add Task Progress Form */}
                {isAddingTask && (
                  <form
                    onSubmit={handleTaskSubmit}
                    className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-1 border-b border-emerald-200 dark:border-emerald-800">
                      <h5 className="font-bold text-emerald-900 dark:text-emerald-200">
                        নতুন কাজের অগ্রগতি ও বিবরণ যোগ করুন
                      </h5>
                      <button
                        type="button"
                        onClick={() => setIsAddingTask(false)}
                        className="text-slate-400 hover:text-slate-600 text-[11px]"
                      >
                        বাতিল
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                          কাজের নাম/শিরোনাম *
                        </label>
                        <input
                          type="text"
                          required
                          value={taskTitle}
                          onChange={(e) => setTaskTitle(e.target.value)}
                          placeholder="যেমন: নোয়াখালীতে ১০০ প্যাকেট ত্রাণ বিতরণ"
                          className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                          তারিখ
                        </label>
                        <input
                          type="date"
                          value={taskDate}
                          onChange={(e) => setTaskDate(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                          কাজের স্থান / এলাকা
                        </label>
                        <input
                          type="text"
                          value={taskLocation}
                          onChange={(e) => setTaskLocation(e.target.value)}
                          placeholder="যেমন: সেনবাগ, নোয়াখালী"
                          className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                          ছবি বা প্রমাণপত্র লিংক (ঐচ্ছিক)
                        </label>
                        <input
                          type="url"
                          value={taskProofUrl}
                          onChange={(e) => setTaskProofUrl(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        বিস্তারিত কাজের বিবরণ ও প্রভাব *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder="কতজন সুবিধাভোগীকে সাহায্য করা হয়েছে, কাজের ফলাফল..."
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border rounded-lg text-xs resize-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingTask(false)}
                        className="px-3 py-1.5 border rounded-lg"
                      >
                        বাতিল
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm"
                      >
                        অগ্রগতি সেভ করুন
                      </button>
                    </div>
                  </form>
                )}

                {/* Tasks Timeline */}
                {member.tasks.length === 0 ? (
                  <p className="text-slate-400 py-4 text-center italic bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                    এখনও কোনো কাজের অগ্রগতি যোগ করা হয়নি। উপরের বাটন দিয়ে নতুন রিপোর্ট যোগ করুন।
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {member.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-slate-900 dark:text-white">
                            {task.title}
                          </h5>
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                            <CheckCircle className="w-3 h-3" />
                            <span>যাচাইকৃত কাজ</span>
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{task.date}</span>
                          </span>
                          {task.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{task.location}</span>
                            </span>
                          )}
                          {task.proofUrl && (
                            <a
                              href={task.proofUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-600 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>প্রমাণপত্র ছবি</span>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
