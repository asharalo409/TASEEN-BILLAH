import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  OrgConfig,
  Member,
  MemberTask,
  Campaign,
  Donation,
  ExpenseRecord,
  ReliefLocation,
  ActivityPost,
  BloodDonor,
  Notice,
  GalleryItem,
  NotificationItem,
  BloodGroup,
  FundSector,
  PostComment,
  ChatMessage,
  Language
} from '../types';
import {
  initialOrgConfig,
  initialMembers,
  initialCampaigns,
  initialDonations,
  initialExpenses,
  initialReliefLocations,
  initialActivityPosts,
  initialBloodDonors,
  initialNotices,
  initialGallery,
  initialNotifications,
  initialFundSectors,
  initialComments,
  initialChatMessages
} from '../data/initialData';
import {
  isSupabaseConfigured,
  fetchAllFromSupabase,
  syncDonationToSupabase,
  syncExpenseToSupabase,
  syncMemberToSupabase,
  syncChatMessageToSupabase,
  syncNoticeToSupabase,
  syncActivityPostToSupabase,
  syncOrgConfigToSupabase
} from '../lib/supabase';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Navigation & Language
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (bn: string, en: string) => string;

  // Theme & Network
  darkMode: boolean;
  toggleDarkMode: () => void;
  isOnline: boolean;

  // Org Config & Virtual Links
  orgConfig: OrgConfig;
  updateOrgConfig: (updates: Partial<OrgConfig>) => void;
  updateFeatureToggle: (key: keyof OrgConfig['enabledFeatures'], val: boolean) => void;

  // Auth / Member Session
  currentUser: Member | null;
  loginWithSecretCode: (code: string) => { success: boolean; message: string; member?: Member };
  logout: () => void;
  registerFreeMember: (newMember: {
    name: string;
    phone: string;
    email: string;
    role: string;
    bloodGroup: BloodGroup;
    district: string;
    upazila: string;
    bio: string;
  }) => { success: boolean; secretCode: string; member: Member };

  // Member Management & Admin Controls
  members: Member[];
  addMemberTask: (memberId: string, task: Omit<MemberTask, 'id' | 'verified'>) => void;
  updateMemberProfile: (memberId: string, updates: Partial<Member>) => void;
  updateMemberFeeStatus: (memberId: string, yearMonth: string, status: 'paid' | 'due' | 'waived') => void;
  updateMemberAttendance: (
    memberId: string,
    eventTitle: string,
    date: string,
    type: 'meeting' | 'relief' | 'camp' | 'sports' | 'agm',
    status: 'present' | 'absent' | 'leave'
  ) => void;
  toggleMemberAdmin: (memberId: string) => void;
  changeMemberRole: (memberId: string, newRole: string, newRoleType: Member['roleType']) => void;
  addNewMemberByAdmin: (memberData: {
    name: string;
    phone: string;
    email: string;
    role: string;
    roleType: Member['roleType'];
    isAdmin: boolean;
    bloodGroup: BloodGroup;
    district: string;
    upazila: string;
    bio: string;
    responsibilities: string[];
  }) => Member;

  // Campaigns & Categorized Fund Sectors
  campaigns: Campaign[];
  fundSectors: FundSector[];
  addFundSector: (sector: Omit<FundSector, 'id'>) => void;

  // Donations & Finances
  donations: Donation[];
  submitDonation: (donationData: {
    donorName: string;
    donorPhone: string;
    donorEmail?: string;
    amount: number;
    method: 'bKash' | 'Nagad' | 'Rocket' | 'Bank' | 'Cash';
    trxId: string;
    campaignId: string;
    sectorId?: string;
    isAnonymous: boolean;
  }) => Donation;

  // Transparency Finances
  expenses: ExpenseRecord[];
  addExpense: (expense: Omit<ExpenseRecord, 'id' | 'voucherNo'>) => void;

  // Relief Locations & Map
  reliefLocations: ReliefLocation[];
  addReliefLocation: (loc: Omit<ReliefLocation, 'id'>) => void;

  // Activities, Proofs, Comments & Emoji Reactions
  activities: ActivityPost[];
  addActivityPost: (post: Omit<ActivityPost, 'id'>) => void;
  comments: PostComment[];
  addComment: (targetId: string, content: string) => void;
  toggleReactionOnPost: (postId: string, emoji: string) => void;
  toggleReactionOnComment: (commentId: string, emoji: string) => void;

  // Live Chat & 1-on-1 Direct Messaging
  chatMessages: ChatMessage[];
  sendChatMessage: (recipientId: string, text: string) => void;
  activeChatRecipient: string;
  setActiveChatRecipient: (id: string) => void;

  // Blood Bank & Emergencies
  bloodDonors: BloodDonor[];
  registerBloodDonor: (donor: Omit<BloodDonor, 'id' | 'totalDonations'>) => void;
  toggleDonorAvailability: (id: string) => void;

  // Notices
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id'>) => void;

  // Gallery
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (title: string, message: string, type: NotificationItem['type'], linkTab?: string) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  // Modals state
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  shareData: { title: string; text: string; url: string } | null;
  openShareModal: (title: string, text: string, url?: string) => void;
  viewingDonationReceipt: Donation | null;
  setViewingDonationReceipt: (donation: Donation | null) => void;
  viewingMemberDashboard: Member | null;
  setViewingMemberDashboard: (member: Member | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // handle storage quota
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [language, setLanguageState] = useState<Language>(() => {
    return loadFromStorage('msf_language', 'bn');
  });
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return loadFromStorage('msf_theme_dark', false);
  });
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Core State
  const [orgConfig, setOrgConfig] = useState<OrgConfig>(() =>
    loadFromStorage('msf_org_config', initialOrgConfig)
  );
  const [fundSectors, setFundSectors] = useState<FundSector[]>(() =>
    loadFromStorage('msf_fund_sectors', initialFundSectors)
  );
  const [members, setMembers] = useState<Member[]>(() =>
    loadFromStorage('msf_members', initialMembers)
  );
  const [currentUser, setCurrentUser] = useState<Member | null>(() => {
    const savedCode = localStorage.getItem('msf_current_user_code');
    if (savedCode) {
      const allMembers = loadFromStorage('msf_members', initialMembers);
      return allMembers.find((m: Member) => m.secretCode.toUpperCase() === savedCode.toUpperCase()) || null;
    }
    // Default to president logged in for rich first impression
    return initialMembers[0];
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() =>
    loadFromStorage('msf_campaigns', initialCampaigns)
  );
  const [donations, setDonations] = useState<Donation[]>(() =>
    loadFromStorage('msf_donations', initialDonations)
  );
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(() =>
    loadFromStorage('msf_expenses', initialExpenses)
  );
  const [reliefLocations, setReliefLocations] = useState<ReliefLocation[]>(() =>
    loadFromStorage('msf_relief_locations', initialReliefLocations)
  );
  const [activities, setActivities] = useState<ActivityPost[]>(() =>
    loadFromStorage('msf_activities', initialActivityPosts)
  );
  const [comments, setComments] = useState<PostComment[]>(() =>
    loadFromStorage('msf_comments', initialComments)
  );
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() =>
    loadFromStorage('msf_chat_messages', initialChatMessages)
  );
  const [activeChatRecipient, setActiveChatRecipient] = useState<string>('community');
  const [bloodDonors, setBloodDonors] = useState<BloodDonor[]>(() =>
    loadFromStorage('msf_blood_donors', initialBloodDonors)
  );
  const [notices, setNotices] = useState<Notice[]>(() =>
    loadFromStorage('msf_notices', initialNotices)
  );
  const [gallery, setGallery] = useState<GalleryItem[]>(() =>
    loadFromStorage('msf_gallery', initialGallery)
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    loadFromStorage('msf_notifications', initialNotifications)
  );

  // Modals & Popups
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareData, setShareData] = useState<{ title: string; text: string; url: string } | null>(null);
  const [viewingDonationReceipt, setViewingDonationReceipt] = useState<Donation | null>(null);
  const [viewingMemberDashboard, setViewingMemberDashboard] = useState<Member | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveToStorage('msf_theme_dark', darkMode);
  }, [darkMode]);

  // Network monitor
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast(language === 'bn' ? 'ইন্টারনেট সংযোগ পুনরায় স্থাপিত হয়েছে' : 'Internet connection restored', 'success');
    };
    const handleOffline = () => {
      setIsOnline(false);
      showToast(language === 'bn' ? 'অফলাইন মোড সক্রিয় — সংরক্ষিত ডেটা প্রদর্শিত হচ্ছে' : 'Offline mode active — displaying cached data', 'warning');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [language]);

  // Initial fetch from Supabase if configured
  useEffect(() => {
    if (isSupabaseConfigured()) {
      fetchAllFromSupabase().then((data) => {
        if (data) {
          if (data.members) setMembers(data.members as any);
          if (data.donations) setDonations(data.donations as any);
          if (data.expenses) setExpenses(data.expenses as any);
          if (data.campaigns) setCampaigns(data.campaigns as any);
          if (data.fundSectors) setFundSectors(data.fundSectors as any);
          if (data.notices) setNotices(data.notices as any);
          if (data.activityPosts) setActivities(data.activityPosts as any);
          if (data.comments) setComments(data.comments as any);
          if (data.bloodDonors) setBloodDonors(data.bloodDonors as any);
          if (data.gallery) setGallery(data.gallery as any);
          if (data.reliefLocations) setReliefLocations(data.reliefLocations as any);
          if (data.chatMessages) setChatMessages(data.chatMessages as any);
          if (data.orgConfig) setOrgConfig(data.orgConfig as any);
          showToast('Supabase ক্লাউড ডাটাবেজ সফলভাবে সংযুক্ত হয়েছে', 'info');
        }
      });
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveToStorage('msf_language', lang);
    showToast(lang === 'bn' ? 'ভাষা বাংলা নির্বাচিত হয়েছে' : 'Language set to English', 'info');
  };

  const t = (bnText: string, enText: string) => {
    return language === 'en' ? enText : bnText;
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const showToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openShareModal = (title: string, text: string, url?: string) => {
    setShareData({
      title,
      text,
      url: url || window.location.href
    });
    setIsShareModalOpen(true);
  };

  // Auth: Secret Code Login
  const loginWithSecretCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = members.find(m => m.secretCode.toUpperCase() === trimmed);
    if (found) {
      setCurrentUser(found);
      localStorage.setItem('msf_current_user_code', found.secretCode);
      showToast(
        language === 'bn'
          ? `স্বাগতম, ${found.name}! আপনার পদবী: ${found.role}`
          : `Welcome, ${found.name}! Role: ${found.role}`,
        'success'
      );
      return { success: true, message: 'সফলভাবে লগইন হয়েছে', member: found };
    }
    return {
      success: false,
      message: language === 'bn'
        ? 'ভুল সিক্রেট কোড! অনুগ্রহ করে সঠিক কোড দিন অথবা নতুন একাউন্ট করুন।'
        : 'Invalid Secret Code! Please enter a valid code or create an account.'
    };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('msf_current_user_code');
    showToast(language === 'bn' ? 'লগআউট সফল হয়েছে' : 'Logged out successfully', 'info');
  };

  // Auth: Register Free Member
  const registerFreeMember = (data: {
    name: string;
    phone: string;
    email: string;
    role: string;
    bloodGroup: BloodGroup;
    district: string;
    upazila: string;
    bio: string;
  }) => {
    const randomCodeNumber = Math.floor(1000 + Math.random() * 9000);
    const secretCode = `MSF-VOL-${randomCodeNumber}`;
    const newMember: Member = {
      id: `m-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      email: data.email || `${data.phone}@manobsheba.org`,
      role: data.role || 'স্বেচ্ছাসেবক',
      roleType: 'volunteer',
      isAdmin: false,
      responsibilities: [
        'মাঠ পর্যায়ে ত্রাণ ও সমাজকল্যাণমূলক কার্যক্রমে অংশগ্রহণ',
        'জরুরি প্রয়োজনে রক্তদান ও সহযোগিতা'
      ],
      secretCode,
      bloodGroup: data.bloodGroup,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}&backgroundColor=059669`,
      joinDate: new Date().toISOString().split('T')[0],
      district: data.district,
      upazila: data.upazila,
      bio: data.bio || 'মানবসেবায় নিবেদিত একনিষ্ঠ কর্মী।',
      status: 'active',
      monthlyFees: {
        '2026-09': 'paid'
      },
      tasks: [],
      assignedTools: ['ফিল্ড কাজ আপডেট', 'রক্তদান সেবা'],
      attendance: {
        totalDaysPresent: 0,
        totalEventsHeld: 0,
        history: []
      }
    };

    const updated = [newMember, ...members];
    setMembers(updated);
    saveToStorage('msf_members', updated);

    // Sync with Supabase cloud if connected
    syncMemberToSupabase(newMember);

    // Auto-add to blood donors
    const newDonor: BloodDonor = {
      id: `bd-${Date.now()}`,
      name: data.name,
      bloodGroup: data.bloodGroup,
      phone: data.phone,
      district: data.district,
      upazila: data.upazila,
      lastDonationDate: 'নতুন নিবন্ধিত',
      isAvailable: true,
      totalDonations: 0
    };
    const updatedDonors = [newDonor, ...bloodDonors];
    setBloodDonors(updatedDonors);
    saveToStorage('msf_blood_donors', updatedDonors);

    setCurrentUser(newMember);
    localStorage.setItem('msf_current_user_code', secretCode);

    addNotification(
      'নতুন স্বেচ্ছাসেবক নিবন্ধিত',
      `${data.name} মানবসেবা ফাউন্ডেশনে নতুন সদস্য হিসেবে যোগ দিয়েছেন। সিক্রেট কোড: ${secretCode}`,
      'system',
      'volunteers'
    );

    showToast(`অভিনন্দন! আপনার অ্যাকাউন্ট তৈরি হয়েছে। সিক্রেট কোড: ${secretCode}`, 'success');

    return { success: true, secretCode, member: newMember };
  };

  // Add Member by Admin
  const addNewMemberByAdmin = (data: {
    name: string;
    phone: string;
    email: string;
    role: string;
    roleType: Member['roleType'];
    isAdmin: boolean;
    bloodGroup: BloodGroup;
    district: string;
    upazila: string;
    bio: string;
    responsibilities: string[];
  }) => {
    const randomCodeNumber = Math.floor(1000 + Math.random() * 9000);
    const codePrefix = data.isAdmin ? 'ADMIN' : data.roleType === 'executive' ? 'EXEC' : 'VOL';
    const secretCode = `MSF-${codePrefix}-${randomCodeNumber}`;

    const newMember: Member = {
      id: `m-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      email: data.email || `${data.phone}@manobsheba.org`,
      role: data.role,
      roleType: data.roleType,
      isAdmin: data.isAdmin,
      responsibilities: data.responsibilities.length > 0 ? data.responsibilities : ['অর্পিত দায়িত্ব পালন'],
      secretCode,
      bloodGroup: data.bloodGroup,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}&backgroundColor=059669`,
      joinDate: new Date().toISOString().split('T')[0],
      district: data.district,
      upazila: data.upazila,
      bio: data.bio,
      status: 'active',
      monthlyFees: {
        '2026-09': 'paid'
      },
      tasks: [],
      assignedTools: data.isAdmin ? ['সকল অ্যাডমিন টুলস'] : ['অগ্রগতি আপডেট'],
      attendance: {
        totalDaysPresent: 0,
        totalEventsHeld: 0,
        history: []
      }
    };

    const updated = [newMember, ...members];
    setMembers(updated);
    saveToStorage('msf_members', updated);

    // Sync with Supabase cloud if connected
    syncMemberToSupabase(newMember);

    showToast(`সদস্য "${data.name}" সফলভাবে যুক্ত হয়েছেন। সিক্রেট কোড: ${secretCode}`, 'success');
    return newMember;
  };

  // Toggle Admin status
  const toggleMemberAdmin = (memberId: string) => {
    const updated = members.map(m => {
      if (m.id === memberId) {
        const nextAdmin = !m.isAdmin;
        showToast(`${m.name}-কে ${nextAdmin ? 'অ্যাডমিন অধিকার প্রদান' : 'অ্যাডমিন অধিকার প্রত্যাহার'} করা হয়েছে`, 'info');
        return { ...m, isAdmin: nextAdmin };
      }
      return m;
    });
    setMembers(updated);
    saveToStorage('msf_members', updated);
    if (currentUser?.id === memberId) {
      setCurrentUser(prev => prev ? { ...prev, isAdmin: !prev.isAdmin } : null);
    }
  };

  // Change Member Role
  const changeMemberRole = (memberId: string, newRole: string, newRoleType: Member['roleType']) => {
    const updated = members.map(m => {
      if (m.id === memberId) {
        return { ...m, role: newRole, roleType: newRoleType };
      }
      return m;
    });
    setMembers(updated);
    saveToStorage('msf_members', updated);
    showToast(`সদস্যের পদবী "${newRole}" নির্ধারণ করা হয়েছে`, 'success');
  };

  // Update Org Config
  const updateOrgConfig = (updates: Partial<OrgConfig>) => {
    const updated = { ...orgConfig, ...updates };
    setOrgConfig(updated);
    saveToStorage('msf_org_config', updated);
    showToast('ফাউন্ডেশনের তথ্য ও সেটিংস সফলভাবে হালনাগাদ করা হয়েছে', 'success');
  };

  // Update Feature Toggle
  const updateFeatureToggle = (key: keyof OrgConfig['enabledFeatures'], val: boolean) => {
    const updated = {
      ...orgConfig,
      enabledFeatures: {
        ...orgConfig.enabledFeatures,
        [key]: val
      }
    };
    setOrgConfig(updated);
    saveToStorage('msf_org_config', updated);
    showToast(`ফিচার স্ট্যাটাস পরিবর্তন করা হয়েছে`, 'info');
  };

  // Add Task Progress to Member
  const addMemberTask = (memberId: string, taskData: Omit<MemberTask, 'id' | 'verified'>) => {
    const newTask: MemberTask = {
      ...taskData,
      id: `t-${Date.now()}`,
      verified: true
    };

    const updated = members.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          tasks: [newTask, ...m.tasks]
        };
      }
      return m;
    });

    setMembers(updated);
    saveToStorage('msf_members', updated);

    if (currentUser?.id === memberId) {
      setCurrentUser(prev => prev ? { ...prev, tasks: [newTask, ...prev.tasks] } : null);
    }

    addNotification(
      'কাজের নতুন অগ্রগতি যোগ হয়েছে',
      `${taskData.title} (${taskData.date}) সফলভাবে সম্পন্ন হয়েছে।`,
      'task',
      'volunteers'
    );

    showToast('কাজের অগ্রগতি সফলভাবে রেকর্ড করা হয়েছে', 'success');
  };

  // Update Member Profile
  const updateMemberProfile = (memberId: string, updates: Partial<Member>) => {
    const updated = members.map(m => (m.id === memberId ? { ...m, ...updates } : m));
    setMembers(updated);
    saveToStorage('msf_members', updated);
    if (currentUser?.id === memberId) {
      setCurrentUser(prev => (prev ? { ...prev, ...updates } : null));
    }
    showToast('প্রোফাইল আপডেট সফল হয়েছে', 'success');
  };

  // Update Monthly Fee Status
  const updateMemberFeeStatus = (memberId: string, yearMonth: string, status: 'paid' | 'due' | 'waived') => {
    const updated = members.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          monthlyFees: {
            ...m.monthlyFees,
            [yearMonth]: status
          }
        };
      }
      return m;
    });
    setMembers(updated);
    saveToStorage('msf_members', updated);
    showToast(`সদস্যের ${yearMonth} মাসের ফি স্ট্যাটাস পরিবর্তন করা হয়েছে`, 'success');
  };

  // Update Member Attendance Record
  const updateMemberAttendance = (
    memberId: string,
    eventTitle: string,
    date: string,
    type: 'meeting' | 'relief' | 'camp' | 'sports' | 'agm',
    status: 'present' | 'absent' | 'leave'
  ) => {
    const updated = members.map(m => {
      if (m.id === memberId) {
        const currentHist = m.attendance?.history || [];
        const existingIdx = currentHist.findIndex(h => h.eventTitle === eventTitle && h.date === date);
        let newHist = [...currentHist];
        if (existingIdx >= 0) {
          newHist[existingIdx] = { ...newHist[existingIdx], status };
        } else {
          newHist.unshift({
            id: `att-${Date.now()}`,
            eventTitle,
            date,
            type,
            status
          });
        }
        const presentCount = newHist.filter(h => h.status === 'present').length;
        return {
          ...m,
          attendance: {
            totalDaysPresent: Math.max(presentCount, status === 'present' ? (m.attendance?.totalDaysPresent || 20) + 1 : (m.attendance?.totalDaysPresent || 20)),
            totalEventsHeld: Math.max(newHist.length, m.attendance?.totalEventsHeld || 25),
            history: newHist
          }
        };
      }
      return m;
    });
    setMembers(updated);
    saveToStorage('msf_members', updated);
    if (currentUser?.id === memberId) {
      const updatedCurrent = updated.find(m => m.id === memberId);
      if (updatedCurrent) setCurrentUser(updatedCurrent);
    }
    showToast(`হাজিরা রেকর্ড সফলভাবে সংরক্ষিত হয়েছে (${status === 'present' ? 'উপস্থিত' : status === 'leave' ? 'ছুটি' : 'অনুপস্থিত'})`, 'success');
  };

  // Add Fund Sector
  const addFundSector = (sectorData: Omit<FundSector, 'id'>) => {
    const newSector: FundSector = {
      ...sectorData,
      id: `sec-${Date.now()}`
    };
    const updated = [...fundSectors, newSector];
    setFundSectors(updated);
    saveToStorage('msf_fund_sectors', updated);
    showToast(`নতুন তহবিল খাত "${newSector.name}" সফলভাবে যুক্ত হয়েছে`, 'success');
  };

  // Submit Donation
  const submitDonation = (donationData: {
    donorName: string;
    donorPhone: string;
    donorEmail?: string;
    amount: number;
    method: 'bKash' | 'Nagad' | 'Rocket' | 'Bank' | 'Cash';
    trxId: string;
    campaignId: string;
    sectorId?: string;
    isAnonymous: boolean;
  }) => {
    const matchedCamp = campaigns.find(c => c.id === donationData.campaignId) || campaigns[0];
    const receiptNo = `MSF-REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newDonation: Donation = {
      id: `d-${Date.now()}`,
      donorName: donationData.isAnonymous ? 'নাম প্রকাশে অনিচ্ছুক শুভাকাঙ্ক্ষী' : donationData.donorName,
      donorPhone: donationData.donorPhone,
      donorEmail: donationData.donorEmail,
      amount: donationData.amount,
      method: donationData.method,
      trxId: donationData.trxId,
      campaignId: matchedCamp.id,
      campaignTitle: matchedCamp.title,
      sectorId: donationData.sectorId || matchedCamp.sectorId || 'sec-1',
      date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      isAnonymous: donationData.isAnonymous,
      status: 'verified',
      receiptNo
    };

    const updatedDonations = [newDonation, ...donations];
    setDonations(updatedDonations);
    saveToStorage('msf_donations', updatedDonations);

    // Update campaign raised amount
    const updatedCampaigns = campaigns.map(c => {
      if (c.id === matchedCamp.id) {
        return {
          ...c,
          raisedAmount: c.raisedAmount + donationData.amount
        };
      }
      return c;
    });
    setCampaigns(updatedCampaigns);
    saveToStorage('msf_campaigns', updatedCampaigns);

    // Update Sector Income
    const secId = donationData.sectorId || matchedCamp.sectorId;
    if (secId) {
      setFundSectors(prev => {
        const up = prev.map(s => (s.id === secId ? { ...s, totalIncome: s.totalIncome + donationData.amount } : s));
        saveToStorage('msf_fund_sectors', up);
        return up;
      });
    }

    addNotification(
      'নতুন অনুদান জমা হয়েছে',
      `${donationData.isAnonymous ? 'একজন শুভাকাঙ্ক্ষী' : donationData.donorName} কর্তৃক ${matchedCamp.title} তহবিলে ৳${donationData.amount.toLocaleString('bn-BD')} জমা হয়েছে।`,
      'donation',
      'ledger'
    );

    // Sync with Supabase cloud if connected
    syncDonationToSupabase(newDonation);

    return newDonation;
  };

  // Add Expense
  const addExpense = (expenseData: Omit<ExpenseRecord, 'id' | 'voucherNo'>) => {
    const voucherNo = `VOUCH-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newExpense: ExpenseRecord = {
      ...expenseData,
      id: `e-${Date.now()}`,
      voucherNo
    };

    const updated = [newExpense, ...expenses];
    setExpenses(updated);
    saveToStorage('msf_expenses', updated);

    // Sync with Supabase cloud if connected
    syncExpenseToSupabase(newExpense);

    // Update sector expense
    if (expenseData.sectorId) {
      setFundSectors(prev => {
        const up = prev.map(s => (s.id === expenseData.sectorId ? { ...s, totalExpense: s.totalExpense + expenseData.amount } : s));
        saveToStorage('msf_fund_sectors', up);
        return up;
      });
    }

    addNotification(
      'নতুন খরচের ভাউচার অনুমোদন',
      `৳${expenseData.amount.toLocaleString('bn-BD')} - ${expenseData.title} (অনুমোদক: ${expenseData.approvedBy})`,
      'system',
      'ledger'
    );

    showToast('খরচের তথ্য স্বচ্ছতা লেজারে যুক্ত হয়েছে', 'success');
  };

  // Add Relief Location
  const addReliefLocation = (locData: Omit<ReliefLocation, 'id'>) => {
    const newLoc: ReliefLocation = {
      ...locData,
      id: `loc-${Date.now()}`
    };
    const updated = [newLoc, ...reliefLocations];
    setReliefLocations(updated);
    saveToStorage('msf_relief_locations', updated);

    addNotification(
      'নতুন ত্রাণ বিতরণ লোকেশন যুক্ত হয়েছে',
      `${newLoc.areaName}, ${newLoc.district} - ${newLoc.beneficiariesCount} পরিবার সহায়তা পেয়েছে।`,
      'task',
      'map'
    );

    showToast('ত্রাণ সহায়তার নতুন এলাকা ম্যাপে যুক্ত হয়েছে', 'success');
  };

  // Add Activity Post
  const addActivityPost = (postData: Omit<ActivityPost, 'id'>) => {
    const newPost: ActivityPost = {
      ...postData,
      id: `act-${Date.now()}`,
      reactions: { '❤️': 1, '🤲': 1, '👏': 1 }
    };
    const updated = [newPost, ...activities];
    setActivities(updated);
    saveToStorage('msf_activities', updated);

    addNotification(
      'নতুন কার্যক্রম ও প্রমাণ পোস্ট করা হয়েছে',
      `${newPost.title} (${newPost.location})`,
      'task',
      'activities'
    );

    // Sync with Supabase cloud if connected
    syncActivityPostToSupabase(newPost);

    showToast('কার্যক্রমের স্বচ্ছ প্রতিবেদন সফলভাবে প্রকাশিত হয়েছে', 'success');
  };

  // Comments on Activities / Notices
  const addComment = (targetId: string, content: string) => {
    if (!content.trim()) return;
    const newComment: PostComment = {
      id: `c-${Date.now()}`,
      targetId,
      authorId: currentUser?.id,
      authorName: currentUser ? currentUser.name : 'শুভাকাঙ্ক্ষী সদস্য',
      authorRole: currentUser ? currentUser.role : 'সাধারণ সদস্য',
      authorAvatar: currentUser ? currentUser.avatar : 'https://api.dicebear.com/7.x/initials/svg?seed=MSF&backgroundColor=059669',
      content: content.trim(),
      timestamp: new Date().toISOString(),
      reactions: { '❤️': 1, '🤲': 1 }
    };
    const updated = [...comments, newComment];
    setComments(updated);
    saveToStorage('msf_comments', updated);
    showToast('মন্তব্য সফলভাবে পোস্ট হয়েছে', 'success');
  };

  const toggleReactionOnPost = (postId: string, emoji: string) => {
    const updated = activities.map(post => {
      if (post.id === postId) {
        const curReactions = { ...(post.reactions || {}) };
        curReactions[emoji] = (curReactions[emoji] || 0) + 1;
        return { ...post, reactions: curReactions };
      }
      return post;
    });
    setActivities(updated);
    saveToStorage('msf_activities', updated);
  };

  const toggleReactionOnComment = (commentId: string, emoji: string) => {
    const updated = comments.map(c => {
      if (c.id === commentId) {
        const cur = { ...c.reactions };
        cur[emoji] = (cur[emoji] || 0) + 1;
        return { ...c, reactions: cur };
      }
      return c;
    });
    setComments(updated);
    saveToStorage('msf_comments', updated);
  };

  // Chat: Send Community or 1-on-1 Direct Message
  const sendChatMessage = (recipientId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      senderId: currentUser ? currentUser.id : 'guest',
      senderName: currentUser ? currentUser.name : 'অতিথি সদস্য',
      senderRole: currentUser ? currentUser.role : 'সদস্য',
      senderAvatar: currentUser ? currentUser.avatar : 'https://api.dicebear.com/7.x/initials/svg?seed=Guest',
      recipientId,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...chatMessages, newMsg];
    setChatMessages(updated);
    saveToStorage('msf_chat_messages', updated);

    // Sync with Supabase cloud if connected
    syncChatMessageToSupabase(newMsg);

    // If community chat, notify
    if (recipientId === 'community') {
      addNotification(
        'কমিউনিটি চ্যাটে নতুন বার্তা',
        `${newMsg.senderName}: ${text.substring(0, 50)}...`,
        'chat',
        'chat'
      );
    }
  };

  // Blood Donors
  const registerBloodDonor = (donorData: Omit<BloodDonor, 'id' | 'totalDonations'>) => {
    const newDonor: BloodDonor = {
      ...donorData,
      id: `bd-${Date.now()}`,
      totalDonations: 1
    };
    const updated = [newDonor, ...bloodDonors];
    setBloodDonors(updated);
    saveToStorage('msf_blood_donors', updated);

    addNotification(
      'নতুন রক্তদাতা নিবন্ধিত',
      `${newDonor.name} (${newDonor.bloodGroup} রক্তদাতা) জরুরি সেবায় যুক্ত হয়েছেন। এলাকা: ${newDonor.district}`,
      'emergency',
      'blood'
    );

    showToast('রক্তদাতা হিসেবে আপনার নাম তালিকাভুক্ত হয়েছে।', 'success');
  };

  const toggleDonorAvailability = (id: string) => {
    const updated = bloodDonors.map(d => (d.id === id ? { ...d, isAvailable: !d.isAvailable } : d));
    setBloodDonors(updated);
    saveToStorage('msf_blood_donors', updated);
    showToast('রক্তদানের প্রাপ্যতা স্ট্যাটাস হালনাগাদ করা হয়েছে', 'info');
  };

  // Notices
  const addNotice = (noticeData: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: `not-${Date.now()}`,
      reactions: { '👍': 1 }
    };
    const updated = [newNotice, ...notices];
    setNotices(updated);
    saveToStorage('msf_notices', updated);

    // Sync with Supabase cloud if connected
    syncNoticeToSupabase(newNotice);

    addNotification(
      `নোটিশ: ${newNotice.title}`,
      newNotice.content.substring(0, 100) + '...',
      'notice',
      'notices'
    );

    showToast('নতুন নোটিশ প্রকাশিত হয়েছে', 'success');
  };

  // Gallery
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`
    };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    saveToStorage('msf_gallery', updated);
    showToast('গ্যালারিতে মিডিয়া যুক্ত হয়েছে', 'success');
  };

  // Notifications
  const addNotification = (
    title: string,
    message: string,
    type: NotificationItem['type'],
    linkTab?: string
  ) => {
    const newNotif: NotificationItem = {
      id: `n-${Date.now()}`,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      type,
      linkTab
    };
    setNotifications(prev => {
      const updated = [newNotif, ...prev];
      saveToStorage('msf_notifications', updated);
      return updated;
    });
  };

  const markNotificationAsRead = (id: string) => {
    const updated = notifications.map(n => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    saveToStorage('msf_notifications', updated);
  };

  const markAllNotificationsAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    saveToStorage('msf_notifications', updated);
    showToast('সকল নোটিফিকেশন পড়া হয়েছে হিসেবে চিহ্নিত', 'info');
  };

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        t,
        darkMode,
        toggleDarkMode,
        isOnline,
        orgConfig,
        updateOrgConfig,
        updateFeatureToggle,
        currentUser,
        loginWithSecretCode,
        logout,
        registerFreeMember,
        members,
        addMemberTask,
        updateMemberProfile,
        updateMemberFeeStatus,
        updateMemberAttendance,
        toggleMemberAdmin,
        changeMemberRole,
        addNewMemberByAdmin,
        campaigns,
        fundSectors,
        addFundSector,
        donations,
        submitDonation,
        expenses,
        addExpense,
        reliefLocations,
        addReliefLocation,
        activities,
        addActivityPost,
        comments,
        addComment,
        toggleReactionOnPost,
        toggleReactionOnComment,
        chatMessages,
        sendChatMessage,
        activeChatRecipient,
        setActiveChatRecipient,
        bloodDonors,
        registerBloodDonor,
        toggleDonorAvailability,
        notices,
        addNotice,
        gallery,
        addGalleryItem,
        notifications,
        unreadNotifsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        toasts,
        showToast,
        removeToast,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isSettingsModalOpen,
        setIsSettingsModalOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        shareData,
        openShareModal,
        viewingDonationReceipt,
        setViewingDonationReceipt,
        viewingMemberDashboard,
        setViewingMemberDashboard
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
