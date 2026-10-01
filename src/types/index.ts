export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type Language = 'bn' | 'en';

export interface MemberTask {
  id: string;
  title: string;
  date: string;
  description: string;
  proofUrl?: string;
  verified: boolean;
  location?: string;
}

export interface MemberAttendanceRecord {
  id: string;
  eventTitle: string;
  date: string;
  type: 'meeting' | 'relief' | 'camp' | 'sports' | 'agm';
  status: 'present' | 'absent' | 'leave';
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string; // e.g. সভাপতি, সাধারণ সম্পাদক, কোষাধ্যক্ষ/কেসিয়ার, ক্রীড়া ও সাংস্কৃতিক সম্পাদক, প্রচার সম্পাদক, রক্তদান সমন্বয়ক, কার্যনির্বাহী সদস্য, সাধারণ সদস্য, স্বেচ্ছাসেবক
  roleType: 'executive' | 'adviser' | 'coordinator' | 'volunteer' | 'member';
  isAdmin: boolean; // whether member has full admin control
  responsibilities: string[];
  secretCode: string; // e.g. MSF-ADMIN-01, MSF-VOL-102
  bloodGroup: BloodGroup;
  avatar: string;
  joinDate: string;
  district: string;
  upazila: string;
  bio: string;
  status: 'active' | 'inactive';
  tasks: MemberTask[];
  monthlyFees: { [yearMonth: string]: 'paid' | 'due' | 'waived' };
  assignedTools?: string[]; // tools available for their role
  attendance: {
    totalDaysPresent: number;
    totalEventsHeld: number;
    history: MemberAttendanceRecord[];
  };
}

export interface FoundationEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'monthly_meeting' | 'agm' | 'relief_drive' | 'medical_camp' | 'sports_event';
  description: string;
  attendanceMap: { [memberId: string]: 'present' | 'absent' | 'leave' };
}

export interface MonthFinancialSummary {
  monthName: string;
  monthCode: string; // '2026-09'
  donationsIncome: number;
  monthlyFeesIncome: number;
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export interface YearAuditRecord {
  year: string;
  totalIncome: number;
  totalExpense: number;
  netReserve: number;
  totalBeneficiaries: number;
  months: MonthFinancialSummary[];
}

export interface Donation {
  id: string;
  donorName: string;
  donorPhone: string;
  donorEmail?: string;
  amount: number;
  method: 'bKash' | 'Nagad' | 'Rocket' | 'Bank' | 'Cash';
  trxId: string;
  campaignId: string;
  campaignTitle: string;
  sectorId?: string;
  date: string;
  time: string;
  isAnonymous: boolean;
  status: 'verified' | 'pending';
  receiptNo: string;
}

export interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  targetAmount: number;
  raisedAmount: number;
  category: 'relief' | 'education' | 'medical' | 'winter' | 'orphan' | 'ramadan';
  sectorId?: string;
  coverImage: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: 'ongoing' | 'completed';
  beneficiariesCount: number;
  location: string;
}

export interface FundSector {
  id: string;
  name: string;
  nameEn: string;
  code: string;
  description: string;
  allocatedBudget: number;
  totalIncome: number;
  totalExpense: number;
  color: string;
  badgeBg: string;
  iconName: string;
}

export interface ExpenseRecord {
  id: string;
  title: string;
  category: 'খাদ্য সামগ্রী' | 'ওষুধ ও চিকিৎসা' | 'শীতবস্ত্র' | 'শিক্ষা সহায়তা' | 'যাতায়াত ও পরিবহন' | 'প্রশাসনিক ও প্রচার' | 'অন্যান্য';
  sectorId?: string;
  sectorName?: string;
  amount: number;
  date: string;
  approvedBy: string;
  voucherNo: string;
  proofUrl?: string;
  notes: string;
}

export interface ReliefLocation {
  id: string;
  areaName: string;
  district: string;
  division: string;
  latitude: number;
  longitude: number;
  beneficiariesCount: number;
  totalAidAmount: number;
  aidType: string;
  coordinatorName: string;
  date: string;
  photoUrl: string;
  videoUrl?: string;
  reportSummary: string;
}

export interface CommentReaction {
  emoji: string;
  count: number;
  users: string[]; // member names or IDs
}

export interface PostComment {
  id: string;
  targetId: string; // activity post ID or notice ID
  authorId?: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  reactions: { [emoji: string]: number };
}

export interface ActivityPost {
  id: string;
  title: string;
  authorName: string;
  authorRole: string;
  date: string;
  time: string;
  location: string;
  summary: string;
  amountSpent?: number;
  familiesHelped?: number;
  images: string[];
  videoLink?: string;
  documentLink?: string;
  category: string;
  reactions?: { [emoji: string]: number };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  senderAvatar: string;
  recipientId: string; // 'community' for all members, or memberId for 1-to-1 private chat
  text: string;
  timestamp: string;
  reactions?: { [emoji: string]: string[] };
}

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  phone: string;
  district: string;
  upazila: string;
  lastDonationDate: string;
  isAvailable: boolean;
  totalDonations: number;
}

export interface Notice {
  id: string;
  title: string;
  priority: 'জরুরি' | 'সাধারণ' | 'মিটিং' | 'উৎসব';
  date: string;
  time: string;
  publishedBy: string;
  content: string;
  attachmentUrl?: string;
  reactions?: { [emoji: string]: number };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ত্রাণ বিতরণ' | 'চিকিৎসা সেবা' | 'শীতবস্ত্র বিতরণ' | 'শিক্ষা ও এতিম' | 'রক্তদান' | 'বৃক্ষরোপণ';
  mediaType: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl: string;
  date: string;
  location: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string; // ISO date string
  read: boolean;
  linkTab?: string;
  type: 'donation' | 'task' | 'notice' | 'emergency' | 'system' | 'chat';
}

export interface OrgConfig {
  orgName: string;
  orgNameEn: string;
  slogan: string;
  sloganEn: string;
  logoUrl: string;
  coverUrl: string;
  establishedYear: string;
  regNumber: string;
  hotlinePhone: string;
  emergencyPhone: string;
  email: string;
  address: string;
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  bankDetails: {
    bankName: string;
    branch: string;
    accountName: string;
    accountNumber: string;
    routingNumber: string;
  };
  missionStatement: string;
  aboutText: string;
  // Social & Virtual Meeting links
  zoomMeetingUrl: string;
  googleMeetUrl: string;
  facebookPageUrl: string;
  facebookGroupUrl: string;
  whatsappGroupUrl: string;
  telegramUrl: string;
  youtubeUrl: string;
  // Enabled Bottom Features
  enabledFeatures: {
    showCalendarClock: boolean;
    showLiveChat: boolean;
    showSectorLedgers: boolean;
    showVirtualMeetingStrip: boolean;
    showEmojiReactions: boolean;
  };
}
