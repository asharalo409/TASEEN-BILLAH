import {
  OrgConfig,
  Member,
  Campaign,
  Donation,
  ExpenseRecord,
  ReliefLocation,
  ActivityPost,
  BloodDonor,
  Notice,
  GalleryItem,
  NotificationItem,
  FundSector,
  PostComment,
  ChatMessage
} from '../types';

export const initialOrgConfig: OrgConfig = {
  orgName: 'মানবসেবা ফাউন্ডেশন',
  orgNameEn: 'Manob Sheba Foundation',
  slogan: 'মানুষ মানুষের জন্য, জীবন জীবনের জন্য — সেবাই আমাদের ব্রত',
  sloganEn: 'Dedicated to humanity, serving with compassion & complete transparency',
  logoUrl: '/icon.svg',
  coverUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop',
  establishedYear: '২০১৮',
  regNumber: 'রেজি নং: ডিএইচ-৯৮৪২/১৮',
  hotlinePhone: '+880 1711-234567',
  emergencyPhone: '+880 1819-876543',
  email: 'info@manobsheba-foundation.org',
  address: 'বাড়ি নং ১২, রোড নং ৫, ধানমন্ডি, ঢাকা-১২০৫, বাংলাদেশ',
  bkashNumber: '01711-234567 (মার্চেন্ট ও পার্সোনাল)',
  nagadNumber: '01819-876543 (পার্সোনাল)',
  rocketNumber: '01711-234567-8',
  bankDetails: {
    bankName: 'ইসলামী ব্যাংক বাংলাদেশ লিমিটেড',
    branch: 'ধানমন্ডি শাখা, ঢাকা',
    accountName: 'মানবসেবা ফাউন্ডেশন কল্যাণ ট্রাস্ট',
    accountNumber: '2050 1450 2034 5678',
    routingNumber: '125271890',
  },
  missionStatement: 'সমাজের অসহায়, দরিদ্র, বন্যাদুর্গত, রোগাক্রান্ত ও সুবিধাবঞ্চিত মানুষের পাশে দাঁড়িয়ে স্থায়ী মানবকল্যাণ এবং আত্মনির্ভরশীল সমাজ বিনির্মাণ করাই আমাদের লক্ষ্য।',
  aboutText: 'মানবসেবা ফাউন্ডেশন একটি অরাজনৈতিক, অলাভজনক ও সম্পূর্ণ স্বেচ্ছাসেবী সমাজকল্যাণ সংস্থা। ২০১৮ সাল থেকে আমরা বাংলাদেশের প্রত্যন্ত অঞ্চলে জরুরি বন্যা ত্রাণ, বিনামূল্যে চিকিৎসা সেবা, রক্তদান কর্মসূচি, এতিম শিশুদের শিক্ষা সহায়তা এবং শীতবস্ত্র বিতরণের মাধ্যমে আর্তমানবতার সেবায় নিরলস কাজ করে যাচ্ছি। আমাদের প্রতিটি আর্থিক লেনদেন ও অনুদান শতভাগ উন্মুক্ত ও জবাবদিহিতামূলক।',
  zoomMeetingUrl: 'https://zoom.us/j/98765432100',
  googleMeetUrl: 'https://meet.google.com/abc-defg-hij',
  facebookPageUrl: 'https://facebook.com/manobsheba.foundation',
  facebookGroupUrl: 'https://facebook.com/groups/manobsheba.volunteers',
  whatsappGroupUrl: 'https://chat.whatsapp.com/invite/ManobShebaOfficial',
  telegramUrl: 'https://t.me/manobshebafoundation',
  youtubeUrl: 'https://youtube.com/@manobshebafoundation',
  enabledFeatures: {
    showCalendarClock: true,
    showLiveChat: true,
    showSectorLedgers: true,
    showVirtualMeetingStrip: true,
    showEmojiReactions: true,
  }
};

export const initialFundSectors: FundSector[] = [
  {
    id: 'sec-1',
    name: 'বন্যা ও জরুরি পুনর্বাসন তহবিল',
    nameEn: 'Flood Relief & Rehab Fund',
    code: 'SEC-REHAB',
    description: 'বন্যা ও প্রাকৃতিক দুর্যোগে গৃহহীন পরিবারদের ঘর নির্মাণ ও খাদ্য সহায়তা',
    allocatedBudget: 500000,
    totalIncome: 432500,
    totalExpense: 167500,
    color: 'emerald',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    iconName: 'ShieldAlert'
  },
  {
    id: 'sec-2',
    name: 'উত্তরবঙ্গ শীতবস্ত্র ও কম্বল তহবিল',
    nameEn: 'Winter Clothes & Blankets Fund',
    code: 'SEC-WINTER',
    description: 'তীব্র শীতে চরাঞ্চলের দরিদ্র শিশু ও বৃদ্ধদের মাঝে শীতবস্ত্র বিতরণ',
    allocatedBudget: 300000,
    totalIncome: 185000,
    totalExpense: 84000,
    color: 'blue',
    badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
    iconName: 'CloudSnow'
  },
  {
    id: 'sec-3',
    name: 'এতিম ও দরিদ্র শিক্ষা সহায়তা তহবিল',
    nameEn: 'Orphan & Child Education Fund',
    code: 'SEC-EDU',
    description: 'সুবিধাবঞ্চিত ও এতিম শিক্ষার্থীদের মাসিক বৃত্তি ও বই-খাতা প্রদান',
    allocatedBudget: 250000,
    totalIncome: 210000,
    totalExpense: 35000,
    color: 'amber',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    iconName: 'GraduationCap'
  },
  {
    id: 'sec-4',
    name: 'জরুরি চিকিৎসা ও রক্তদান সেবা খাত',
    nameEn: 'Emergency Medical & Blood Fund',
    code: 'SEC-MED',
    description: 'ফ্রি মেডিকেল ক্যাম্প, ওষুধপত্র, ফ্রি অক্সিজেন ও অ্যাম্বুলেন্স সেবা',
    allocatedBudget: 200000,
    totalIncome: 195000,
    totalExpense: 48000,
    color: 'rose',
    badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
    iconName: 'HeartPulse'
  },
  {
    id: 'sec-5',
    name: 'সাধারণ ও জরুরি আপদকালীন রিজার্ভ',
    nameEn: 'General Emergency Reserve',
    code: 'SEC-GENERAL',
    description: 'ফাউন্ডেশনের সদস্যদের মাসিক চাঁদা ও সাধারণ এককালীন অনুদান',
    allocatedBudget: 150000,
    totalIncome: 120000,
    totalExpense: 22500,
    color: 'indigo',
    badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    iconName: 'Coins'
  },
  {
    id: 'sec-6',
    name: 'প্রশাসনিক, লজিস্টিকস ও প্রচার তহবিল',
    nameEn: 'Admin, Logistics & Media Fund',
    code: 'SEC-ADMIN',
    description: 'ট্রান্সপোর্ট, অডিট, সার্ভার ও জনসচেতনতামূলক মিডিয়া প্রচার খরচ',
    allocatedBudget: 80000,
    totalIncome: 65000,
    totalExpense: 15000,
    color: 'slate',
    badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
    iconName: 'Briefcase'
  }
];

export const initialMembers: Member[] = [
  {
    id: 'm-1',
    name: 'তানভীর আহমেদ চৌধুরী',
    phone: '01711-112233',
    email: 'tanveer.president@manobsheba.org',
    role: 'সভাপতি',
    roleType: 'executive',
    isAdmin: true,
    responsibilities: [
      'ফাউন্ডেশনের সামগ্রিক নীতি নির্ধারণ ও কার্যক্রমের দিকনির্দেশনা প্রদান',
      'জাতীয় ও আন্তর্জাতিক সংস্থার সাথে যোগাযোগ ও চুক্তি সম্পাদন',
      'বার্ষিক বাজেট অনুমোদন ও বিশেষ জরুরি ত্রাণ তহবিলের চূড়ান্ত তদারকি'
    ],
    secretCode: 'ADMIN-2026',
    bloodGroup: 'O+',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    joinDate: '২০১৮-০১-১০',
    district: 'ঢাকা',
    upazila: 'ধানমন্ডি',
    bio: 'সমাজসেবায় এক দশকের অভিজ্ঞতা সম্পন্ন। প্রতিটি অনুদানের সঠিক সদ্ব্যবহারে নিবেদিতপ্রাণ।',
    status: 'active',
    monthlyFees: {
      '2026-07': 'paid',
      '2026-08': 'paid',
      '2026-09': 'paid',
    },
    tasks: [
      {
        id: 't-101',
        title: 'ফেনী বন্যা পুনর্বাসন প্রকল্প পরিদর্শন ও রিপোর্ট তৈরি',
        date: '২০২৬-০৮-১৫',
        description: 'ফেনী ফুলগাজী উপজেলার ২০টি পরিবারকে ঘর মেরামতের টিন ও সামগ্রী পৌঁছে দেওয়ার কাজ তদারকি করা হয়েছে।',
        verified: true,
        location: 'ফুলগাজী, ফেনী'
      },
      {
        id: 't-102',
        title: 'বার্ষিক সাধারণ সভা ২০২৬ আহ্বান ও রেজুলেশন অনুমোদন',
        date: '২০২৬-০৯-০৫',
        description: 'ফাউন্ডেশনের বার্ষিক বাজেট ও স্বচ্ছতা অডিট রিপোর্ট পেশ এবং অনুমোদন করা হয়েছে।',
        verified: true,
        location: 'ঢাকা কেন্দ্রীয় কার্যালয়'
      }
    ],
    assignedTools: ['সদস্য ও অ্যাডমিন ম্যানেজমেন্ট', 'বাজেট চূড়ান্তকরণ', 'রেজুলেশন অনুমোদন', 'অনুদানের অডিট অনুমোদন'],
    attendance: {
      totalDaysPresent: 24,
      totalEventsHeld: 25,
      history: [
        { id: 'att-1', eventTitle: 'মাসিক সাধারণ সভা - সেপ্টেম্বর ২০২৬', date: '২০২৬-০৯-০৫', type: 'meeting', status: 'present' },
        { id: 'att-2', eventTitle: 'ফেনী পুনর্বাসন ত্রাণ বিতরণ ড্রাইভ', date: '২০২৬-০৮-১৫', type: 'relief', status: 'present' },
        { id: 'att-3', eventTitle: 'বাৎসরিক সাধারণ সভা (AGM ২০২৫)', date: '২০২৫-১২-২০', type: 'agm', status: 'present' }
      ]
    }
  },
  {
    id: 'm-2',
    name: 'ফারহানা ইসলাম তিশা',
    phone: '01819-223344',
    email: 'farhana.sec@manobsheba.org',
    role: 'সাধারণ সম্পাদক',
    roleType: 'executive',
    isAdmin: true,
    responsibilities: [
      'মাঠ পর্যায়ের সকল স্বেচ্ছাসেবী টিম পরিচালনা ও সমন্বয়',
      'মাসিক অগ্রগতি প্রতিবেদন ও সভার কার্যবিবরণী সংরক্ষণ',
      'জরুরি পরিস্থিতিতে দ্রুত সাড়া প্রদানকারী ভলান্টিয়ার স্কোয়াড মোতায়েন'
    ],
    secretCode: 'SEC-2026',
    bloodGroup: 'B+',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    joinDate: '২০১৮-০৩-১৫',
    district: 'কুমিল্লা',
    upazila: 'সদর দক্ষিণ',
    bio: 'মাঠপর্যায়ে আর্তমানবতার পাশে থাকতে ভালোবাসি। যুবসমাজকে সেবামূলক কাজে উদ্বুদ্ধ করতে কাজ করছি।',
    status: 'active',
    monthlyFees: {
      '2026-07': 'paid',
      '2026-08': 'paid',
      '2026-09': 'paid',
    },
    tasks: [
      {
        id: 't-103',
        title: 'নোয়াখালী সেনবাগে ফ্রি মেডিকেল ক্যাম্প সমন্বয়',
        date: '২০২৬-০৮-২২',
        description: '৬ জন বিশেষজ্ঞ চিকিৎসকের মাধ্যমে ৫৫০ জন রোগীকে বিনামূল্যে ব্যবস্থাপত্র ও ওষুধ বিতরণ নিশ্চিত করা হয়েছে।',
        verified: true,
        location: 'সেনবাগ, নোয়াখালী'
      }
    ],
    assignedTools: ['টিম অ্যাসাইনমেন্ট', 'নোটিশ ড্রাফট ও প্রচার', 'মিটিং কার্যবিবরণী', 'অগ্রগতি যাচাই'],
    attendance: {
      totalDaysPresent: 23,
      totalEventsHeld: 25,
      history: [
        { id: 'att-4', eventTitle: 'মাসিক সাধারণ সভা - সেপ্টেম্বর ২০২৬', date: '২০২৬-০৯-০৫', type: 'meeting', status: 'present' },
        { id: 'att-5', eventTitle: 'নোয়াখালী ফ্রি মেডিকেল ক্যাম্প', date: '২০২৬-০৮-২২', type: 'camp', status: 'present' }
      ]
    }
  },
  {
    id: 'm-3',
    name: 'কাজী আরিফুল হক',
    phone: '01912-334455',
    email: 'ariful.treasurer@manobsheba.org',
    role: 'অর্থ ও হিসাব সম্পাদক (ক্যাশিয়ার)',
    roleType: 'executive',
    isAdmin: true,
    responsibilities: [
      'অনুদানের প্রতিটি টাকার দৈনিক ও মাসিক হিসাব সংরক্ষণ',
      'বিকাশ, নগদ ও ব্যাংক অ্যাকাউন্টের রিয়েল-টাইম রিকনসিলিয়েশন',
      'অনলাইন লেজার ও ডিজিটাল রসিদ ব্যবস্থার স্বচ্ছতা নিশ্চিতকরণ'
    ],
    secretCode: 'FINANCE-101',
    bloodGroup: 'A+',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    joinDate: '২০১৯-০২-০১',
    district: 'ঢাকা',
    upazila: 'মিরপুর',
    bio: 'পেশায় চার্টার্ড অ্যাকাউন্ট্যান্ট। প্রতি পয়সার সঠিক হিসাব ও স্বচ্ছতা রক্ষায় প্রতিশ্রুতিবদ্ধ।',
    status: 'active',
    monthlyFees: {
      '2026-07': 'paid',
      '2026-08': 'paid',
      '2026-09': 'paid',
    },
    tasks: [
      {
        id: 't-104',
        title: 'আগস্ট মাসের পূর্ণাঙ্গ স্বচ্ছ আয়-ব্যয় অডিট সম্পন্নকরণ',
        date: '২০২৬-০৯-০২',
        description: 'সর্বমোট ৪,৮২,৫০০ টাকার ভাউচার ও ব্যাংক বিবরণী মিলিয়ে পাবলিক পোর্টালে প্রকাশ করা হয়েছে।',
        verified: true,
        location: 'কেন্দ্রীয় অফিস'
      }
    ],
    assignedTools: ['ভাউচার এন্ট্রি ও অনুমোদন', 'মাসিক ফি হিসাব কালেকশন', 'খাতভিত্তিক ব্যালেন্স শিট', 'মানি রিসিট ভেরিফিকেশন'],
    attendance: {
      totalDaysPresent: 25,
      totalEventsHeld: 25,
      history: [
        { id: 'att-6', eventTitle: 'মাসিক সাধারণ সভা - সেপ্টেম্বর ২০২৬', date: '২০২৬-০৯-০৫', type: 'meeting', status: 'present' },
        { id: 'att-7', eventTitle: 'বাৎসরিক বাজেট অডিট মিটিং', date: '২০২৬-০৮-৩০', type: 'meeting', status: 'present' }
      ]
    }
  },
  {
    id: 'm-4',
    name: 'ডাঃ মেহজাবিন নূর',
    phone: '01678-445566',
    email: 'dr.mehzabin@manobsheba.org',
    role: 'স্বাস্থ্য ও রক্তদান সমন্বয়ক',
    roleType: 'coordinator',
    isAdmin: false,
    responsibilities: [
      'জরুরি রক্তপ্রয়োজনী কল সেন্টারের সমন্বয়',
      'রক্তদাতা ডাটাবেজ হালনাগাদ ও মোটিফাইড ম্যাচিং',
      'গ্রামীণ পর্যায়ে বিনামূল্যে রক্ত গ্রুপ নির্ণয় ও ডায়াবেটিস ক্যাম্প আয়োজন'
    ],
    secretCode: 'BLOOD-99',
    bloodGroup: 'O-',
    avatar: 'https://images.unsplash.com/photo-1594824813579-24707f1543be?auto=format&fit=crop&w=400&q=80',
    joinDate: '২০২০-০৫-১২',
    district: 'চট্টগ্রাম',
    upazila: 'পাঁচলাইশ',
    bio: 'এমবিবিএস চিকিৎসক। রক্তের অভাবে যেন কারও প্রাণ না যায়, সে লক্ষ্যেই দিনরাত কাজ করে যাচ্ছি।',
    status: 'active',
    monthlyFees: {
      '2026-07': 'paid',
      '2026-08': 'paid',
      '2026-09': 'paid',
    },
    tasks: [
      {
        id: 't-105',
        title: 'জরুরি ৪ ব্যাগ নেগেটিভ রক্ত সংগ্রহ ও সরবরাহ',
        date: '২০২৬-০৯-১৫',
        description: 'চট্টগ্রাম মেডিকেল কলেজ হাসপাতালে চিকিৎসাধীন থ্যালাসেমিয়া ও সড়ক দুর্ঘটনায় আহত রোগীদের তাৎক্ষণিক রক্ত সরবরাহ নিশ্চিত।',
        verified: true,
        location: 'চমেক হাসপাতাল, চট্টগ্রাম'
      }
    ],
    assignedTools: ['রক্তদাতা ম্যাচিং টুল', 'জরুরি SOS কল গ্রহণ', 'অক্সিজেন ব্যাংক সমন্বয়', 'প্রেসক্রিপশন অডিট'],
    attendance: {
      totalDaysPresent: 21,
      totalEventsHeld: 25,
      history: [
        { id: 'att-8', eventTitle: 'নোয়াখালী ফ্রি মেডিকেল ক্যাম্প', date: '২০২৬-০৮-২২', type: 'camp', status: 'present' }
      ]
    }
  },
  {
    id: 'm-5',
    name: 'সাইফুল ইসলাম রনি',
    phone: '01722-889900',
    email: 'saiful.sports@manobsheba.org',
    role: 'ক্রীড়া ও সাংস্কৃতিক সম্পাদক',
    roleType: 'executive',
    isAdmin: false,
    responsibilities: [
      'যুবসমাজকে সমাজসেবায় উদ্বুদ্ধ করতে প্রীতি ফুটবল ও ক্রিকেট টুর্নামেন্ট আয়োজন',
      'রক্তদান ও মাদকবিরোধী সচেতনতামূলক সাংস্কৃতিক অনুষ্ঠান ও ম্যারাথন পরিচালনা',
      'বার্ষিক বনভোজন ও মিলনমেলা সমন্বয়'
    ],
    secretCode: 'SPORTS-77',
    bloodGroup: 'A+',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    joinDate: '২০২০-০৮-১৫',
    district: 'ঢাকা',
    upazila: 'উত্তরা',
    bio: 'খেলাধুলা ও সুস্থ সংস্কৃতির মাধ্যমে তরুণ প্রজন্মকে আর্তমানবতার সেবায় এগিয়ে আনতে কাজ করি।',
    status: 'active',
    monthlyFees: {
      '2026-07': 'paid',
      '2026-08': 'paid',
      '2026-09': 'paid',
    },
    tasks: [
      {
        id: 't-108',
        title: 'যুব কল্যাণ প্রীতি টুর্নামেন্ট ও ফ্রি ব্লাড গ্রুপিং ক্যাম্প',
        date: '২০২৬-০৯-১২',
        description: 'উত্তরা ফ্রেন্ডস ক্লাব মাঠে প্রীতি ম্যাচ শেষে ২০০ জন যুবকের ব্লাড গ্রুপ টেস্ট ও ডাটাবেজ তৈরি।',
        verified: true,
        location: 'উত্তরা সেক্টর ৪, ঢাকা'
      }
    ],
    assignedTools: ['টুর্নামেন্ট ও ইভেন্ট শিডিউলার', 'সাংস্কৃতিক বাজেট অনুমোদন', 'যুব ভলান্টিয়ার রেজিস্ট্রেশন'],
    attendance: {
      totalDaysPresent: 22,
      totalEventsHeld: 25,
      history: [
        { id: 'att-9', eventTitle: 'যুব কল্যাণ প্রীতি ফুটবল ম্যাচ ও রক্তদান ক্যাম্প', date: '২০২৬-০৯-১২', type: 'sports', status: 'present' }
      ]
    }
  },
  {
    id: 'm-6',
    name: 'মোস্তাফিজুর রহমান',
    phone: '01552-556677',
    email: 'mustafiz.media@manobsheba.org',
    role: 'প্রচার ও প্রযুক্তি বিষয়ক সম্পাদক',
    roleType: 'coordinator',
    isAdmin: false,
    responsibilities: [
      'সোশ্যাল মিডিয়া প্রচার ও ডিজিটাল স্বচ্ছতা ক্যাম্পেইন',
      'ত্রাণ কার্যক্রমের ফটো ও ভিডিও ফুটেজ সংগ্রহ ও আর্কাইভ',
      'ওয়েবসাইট ও অ্যাপের কারিগরি পরিচালনা'
    ],
    secretCode: 'MEDIA-202',
    bloodGroup: 'AB+',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    joinDate: '২০২১-০৭-২০',
    district: 'রাজশাহী',
    upazila: 'বোয়ালিয়া',
    bio: 'মিডিয়া প্রফেশনাল ও আলোকচিত্রী। মানবসেবার বাস্তব চিত্র বিশ্ববাসীর সামনে তুলে ধরতে কাজ করি।',
    status: 'active',
    monthlyFees: {
      '2026-07': 'paid',
      '2026-08': 'paid',
      '2026-09': 'due',
    },
    tasks: [
      {
        id: 't-106',
        title: 'কুড়িগ্রাম চর এলাকায় শীতবস্ত্র প্রস্তুতি সমীক্ষা ও ভিডিও ডকুমেন্টারি',
        date: '২০২৬-০৯-১০',
        description: 'ব্রহ্মপুত্র নদের চরে ১৫০টি দরিদ্র পরিবারের তথ্য ও চাহিদার তালিকা ভিডিওসহ প্রস্তুত করা হয়েছে।',
        verified: true,
        location: 'চিলমারী চর, কুড়িগ্রাম'
      }
    ],
    assignedTools: ['মিডিয়া রিলিজ টুল', 'গ্যালারি ফটো ড্রাইভ', 'ভার্চুয়াল মিটিং শিডিউলার', 'সোশ্যাল ক্যাম্পেইন'],
    attendance: {
      totalDaysPresent: 20,
      totalEventsHeld: 25,
      history: [
        { id: 'att-10', eventTitle: 'কুড়িগ্রাম চর ফিল্ড পরিদর্শন', date: '২০২৬-০৯-১০', type: 'relief', status: 'present' }
      ]
    }
  },
  {
    id: 'm-7',
    name: 'নাজমুল হাসান শুভ',
    phone: '01799-667788',
    email: 'shuvo.volunteer@manobsheba.org',
    role: 'মাঠপর্যায়ের স্বেচ্ছাসেবক',
    roleType: 'volunteer',
    isAdmin: false,
    responsibilities: [
      'ত্রাণ সামগ্রী প্যাকেটজাতকরণ ও ট্রাকে লোডিং',
      'দুর্গতদের বাড়ি বাড়ি গিয়ে খাদ্য সামগ্রীর টোকেন ও প্যাকেট বিতরণ',
      'জরুরি তথ্য সংগ্রহ ও ক্ষতিগ্রস্তদের তালিকা প্রণয়ন'
    ],
    secretCode: 'VOL-303',
    bloodGroup: 'B-',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    joinDate: '২০২২-০৮-১৪',
    district: 'ফেনী',
    upazila: 'পরশুরাম',
    bio: 'মাঠের কর্মী হিসেবে বিপদগ্রস্ত মানুষের মুখে হাসি ফোটানোই আমার সবচেয়ে বড় অর্জন।',
    status: 'active',
    monthlyFees: {
      '2026-07': 'paid',
      '2026-08': 'paid',
      '2026-09': 'paid',
    },
    tasks: [
      {
        id: 't-107',
        title: 'পরশুরামের মির্জানগরে শুকনা খাবার ও স্যালাইন বিতরণ',
        date: '২০২৬-০৮-১৮',
        description: 'নৌকায় করে পানিবন্দি ১২০টি পরিবারকে চাল, ডাল, মুড়ি ও পানি বিশুদ্ধকরণ ট্যাবলেট পৌঁছে দেওয়া হয়েছে।',
        verified: true,
        location: 'মির্জানগর, পরশুরাম, ফেনী'
      }
    ],
    assignedTools: ['ফিল্ড অগ্রগতি সাবমিশন', 'উপকারভোগী ডাটা এন্ট্রি', 'রক্তদান রিকোয়েস্ট'],
    attendance: {
      totalDaysPresent: 24,
      totalEventsHeld: 25,
      history: [
        { id: 'att-11', eventTitle: 'পরশুরাম বন্যা ত্রাণ বিতরণ', date: '২০২৬-০৮-১৮', type: 'relief', status: 'present' }
      ]
    }
  }
];

export const initialCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    title: 'ফেনী ও পূর্বাঞ্চলে বন্যা পুনর্বাসন ও গৃহনির্মাণ সহায়তা',
    subtitle: 'বন্যার পানিতে ভেসে যাওয়া অসহায় পরিবারগুলোর মাথা গোঁজার ঠাঁই গড়ে তোলার উদ্যোগ',
    targetAmount: 500000,
    raisedAmount: 432500,
    category: 'relief',
    sectorId: 'sec-1',
    coverImage: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80',
    description: 'সাম্প্রতিক ভয়াবহ বন্যায় ঘরবাড়ি হারানো পরিবারগুলোকে নতুন টিন, বাঁশ ও পাকা পিলার দিয়ে গৃহনির্মাণে আর্থিক ও উপকরণ সহায়তা প্রদান করা হচ্ছে। এ পর্যন্ত ৪৫টি পরিবারের ঘর পুনর্নির্মাণ সম্পন্ন।',
    startDate: '২০২৬-০৮-০১',
    status: 'ongoing',
    beneficiariesCount: 450,
    location: 'ফেনী, নোয়াখালী ও কুমিল্লা'
  },
  {
    id: 'camp-2',
    title: 'উত্তরবঙ্গের চরাঞ্চলে শীতবস্ত্র ও কম্বল বিতরণ ২০২৬',
    subtitle: 'হিমেল শীতে কাঁপছে কুড়িগ্রাম ও লালমনিরহাটের চরের মানুষ — উষ্ণতা ছড়ান আপনিও',
    targetAmount: 300000,
    raisedAmount: 185000,
    category: 'winter',
    sectorId: 'sec-2',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    description: 'উত্তরাঞ্চলের তীব্র শীতে শিশু ও বয়োবৃদ্ধদের মাঝে উন্নত মানের জ্যাকেট, সোয়েটার ও মোটা কম্বল বিতরণের প্রস্তুতি চলছে। প্রতি প্যাকেটে রয়েছে ২টি কম্বল ও একটি শিশুদের সোয়েটার।',
    startDate: '২০২৬-০৯-০১',
    status: 'ongoing',
    beneficiariesCount: 800,
    location: 'কুড়িগ্রাম, লালমনিরহাট ও পঞ্চগড়'
  },
  {
    id: 'camp-3',
    title: 'অসহায় এতিম শিশুদের বাৎসরিক শিক্ষা সহায়তা ও বৃত্তি',
    subtitle: 'অর্থের অভাবে যেন কোনো মেধাবী এতিম শিশুর পড়ালেখা বন্ধ না হয়',
    targetAmount: 250000,
    raisedAmount: 210000,
    category: 'education',
    sectorId: 'sec-3',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    description: '৫০ জন পিতৃমাতৃহীন মেধাবী শিশুর বই, খাতা, স্কুল ড্রেস এবং মাসিক পড়াশোনার খরচ বহন করা হচ্ছে। সম্পূর্ণ স্বচ্ছ উপায়ে সরাসরি মাদরাসা ও স্কুলের ফি পরিশোধ করা হয়।',
    startDate: '২০২৬-০১-১৫',
    status: 'ongoing',
    beneficiariesCount: 50,
    location: 'ঢাকা, চাঁদপুর ও ব্রাহ্মণবাড়িয়া'
  },
  {
    id: 'camp-4',
    title: 'জরুরি অক্সিজেন ও ফ্রি অ্যাম্বুলেন্স সেবা তহবিল',
    subtitle: 'মুমূর্ষু রোগীর দ্রুত হাসপাতালে পরিবহন ও সার্বক্ষণিক অক্সিজেন সিলিন্ডার সহায়তা',
    targetAmount: 200000,
    raisedAmount: 195000,
    category: 'medical',
    sectorId: 'sec-4',
    coverImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    description: 'আমাদের সেন্টারে বর্তমানে ৮টি অক্সিজেন সিলিন্ডার এবং ১টি অ্যাম্বুলেন্স দরিদ্র রোগীদের জন্য নামমাত্র মূল্যে বা বিনামূল্যে সার্ভিস দিয়ে যাচ্ছে।',
    startDate: '২০২৬-০৩-১০',
    status: 'ongoing',
    beneficiariesCount: 320,
    location: 'ঢাকা ও আশেপাশের জেলাসমূহ'
  }
];

export const initialDonations: Donation[] = [
  {
    id: 'd-1',
    donorName: 'মোশাররফ হোসেন',
    donorPhone: '01712-***987',
    donorEmail: 'mosh@example.com',
    amount: 15000,
    method: 'bKash',
    trxId: 'BKS9087AK2',
    campaignId: 'camp-1',
    campaignTitle: 'ফেনী ও পূর্বাঞ্চলে বন্যা পুনর্বাসন ও গৃহনির্মাণ সহায়তা',
    sectorId: 'sec-1',
    date: '২০২৬-০৯-২৮',
    time: 'দুপুর ১২:৪০',
    isAnonymous: false,
    status: 'verified',
    receiptNo: 'MSF-REC-2026-881'
  },
  {
    id: 'd-2',
    donorName: 'নাম প্রকাশে অনিচ্ছুক শুভাকাঙ্ক্ষী',
    donorPhone: '01819-***432',
    amount: 25000,
    method: 'Bank',
    trxId: 'IBBL-TRX-55419',
    campaignId: 'camp-1',
    campaignTitle: 'ফেনী ও পূর্বাঞ্চলে বন্যা পুনর্বাসন ও গৃহনির্মাণ সহায়তা',
    sectorId: 'sec-1',
    date: '২০২৬-০৯-২৬',
    time: 'বিকাল ৪:১৫',
    isAnonymous: true,
    status: 'verified',
    receiptNo: 'MSF-REC-2026-880'
  },
  {
    id: 'd-3',
    donorName: 'সামিয়া আক্তার চৌধুরী',
    donorPhone: '01911-***551',
    amount: 5000,
    method: 'Nagad',
    trxId: 'NGD4438102',
    campaignId: 'camp-2',
    campaignTitle: 'উত্তরবঙ্গের চরাঞ্চলে শীতবস্ত্র ও কম্বল বিতরণ ২০২৬',
    sectorId: 'sec-2',
    date: '২০২৬-০৯-২৫',
    time: 'সন্ধ্যা ৭:২০',
    isAnonymous: false,
    status: 'verified',
    receiptNo: 'MSF-REC-2026-879'
  },
  {
    id: 'd-4',
    donorName: 'প্রকৌশলী রফিকুল ইসলাম',
    donorPhone: '01671-***662',
    amount: 10000,
    method: 'bKash',
    trxId: 'BKS8821AA7',
    campaignId: 'camp-3',
    campaignTitle: 'অসহায় এতিম শিশুদের বাৎসরিক শিক্ষা সহায়তা ও বৃত্তি',
    sectorId: 'sec-3',
    date: '২০২৬-০৯-২২',
    time: 'সকাল ১১:০৫',
    isAnonymous: false,
    status: 'verified',
    receiptNo: 'MSF-REC-2026-878'
  },
  {
    id: 'd-5',
    donorName: 'জাকির হোসেন ভূঁইয়া',
    donorPhone: '01552-***119',
    amount: 8000,
    method: 'Rocket',
    trxId: 'RKT9912048',
    campaignId: 'camp-4',
    campaignTitle: 'জরুরি অক্সিজেন ও ফ্রি অ্যাম্বুলেন্স সেবা তহবিল',
    sectorId: 'sec-4',
    date: '২০২৬-০৯-১৮',
    time: 'দুপুর ১:৫০',
    isAnonymous: false,
    status: 'verified',
    receiptNo: 'MSF-REC-2026-877'
  }
];

export const initialExpenses: ExpenseRecord[] = [
  {
    id: 'e-1',
    title: 'ফেনী ফুলগাজী উপজেলার ২০ পরিবারের ঘর মেরামতের জন্য ৬০ বান্ডিল ঢেউটিন ক্রয়',
    category: 'খাদ্য সামগ্রী',
    sectorId: 'sec-1',
    sectorName: 'বন্যা ও জরুরি পুনর্বাসন তহবিল',
    amount: 145000,
    date: '২০২৬-০৮-১৮',
    approvedBy: 'সভাপতি ও কোষাধ্যক্ষ',
    voucherNo: 'VOUCH-2026-042',
    proofUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
    notes: 'মেসার্স ভাই ভাই স্টিল কর্পোরেশন থেকে পাইকারি মূল্যে ক্রয়কৃত ও রিসিট সংরক্ষিত।'
  },
  {
    id: 'e-2',
    title: 'নোয়াখালী সেনবাগে ফ্রি মেডিকেল ক্যাম্পের ৫০০ জনের প্রয়োজনীয় প্রেসক্রিপশন ওষুধ ক্রয়',
    category: 'ওষুধ ও চিকিৎসা',
    sectorId: 'sec-4',
    sectorName: 'জরুরি চিকিৎসা ও রক্তদান সেবা খাত',
    amount: 48000,
    date: '২০২৬-০৮-২১',
    approvedBy: 'ডাঃ মেহজাবিন নূর (সমন্বয়ক)',
    voucherNo: 'VOUCH-2026-043',
    proofUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    notes: 'এসকেএফ ও স্কয়ার ফার্মার প্রয়োজনীয় অ্যান্টিবায়োটিক, প্যারাসিটামল ও ওআরএস সরবরাহ।'
  },
  {
    id: 'e-3',
    title: 'কুড়িগ্রাম শীতবস্ত্র প্রকল্পের ১ম কিস্তির ৩০০ পিস উন্নত মানের কম্বল পাইকারি ক্রয়',
    category: 'শীতবস্ত্র',
    sectorId: 'sec-2',
    sectorName: 'উত্তরবঙ্গ শীতবস্ত্র ও কম্বল তহবিল',
    amount: 84000,
    date: '২০২৬-০৯-০৩',
    approvedBy: 'সাধারণ সম্পাদক',
    voucherNo: 'VOUCH-2026-044',
    proofUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    notes: 'ইসলামপুর পাইকারি মার্কেট থেকে কেনা এবং কার্টুনজাত করে কুড়িগ্রাম প্রেরণ।'
  },
  {
    id: 'e-4',
    title: 'ত্রাণবাহী ট্রাক ও ট্রলারের জ্বালানি ও যাতায়াত খরচ (ফেনী দুর্গম চরাঞ্চল)',
    category: 'যাতায়াত ও পরিবহন',
    sectorId: 'sec-5',
    sectorName: 'সাধারণ ও জরুরি আপদকালীন রিজার্ভ',
    amount: 22500,
    date: '২০২৬-০৮-২০',
    approvedBy: 'কোষাধ্যক্ষ',
    voucherNo: 'VOUCH-2026-045',
    notes: 'পানিবন্দি দুর্গম ৩টি চরে খাদ্য পৌঁছানোর ট্রলার ভাড়া ও পিকআপ জ্বালানি।'
  },
  {
    id: 'e-5',
    title: '৫০ জন এতিম শিক্ষার্থীর মাসিক স্কুলের বেতন ও নতুন খাতা-কলম ক্রয়',
    category: 'শিক্ষা সহায়তা',
    sectorId: 'sec-3',
    sectorName: 'এতিম ও দরিদ্র শিক্ষা সহায়তা তহবিল',
    amount: 35000,
    date: '২০২৬-০৯-০৫',
    approvedBy: 'সভাপতি',
    voucherNo: 'VOUCH-2026-046',
    notes: 'সংশ্লিষ্ট শিক্ষা প্রতিষ্ঠানের প্রধানদের নিকট চেকে প্রদান করা হয়েছে।'
  }
];

export const initialReliefLocations: ReliefLocation[] = [
  {
    id: 'loc-1',
    areaName: 'ফুলগাজী ও পরশুরাম',
    district: 'ফেনী',
    division: 'চট্টগ্রাম',
    latitude: 23.0805,
    longitude: 91.4382,
    beneficiariesCount: 1250,
    totalAidAmount: 320000,
    aidType: 'গৃহনির্মাণ সামগ্রী, চাল, ডাল, তেল, বিশুদ্ধ পানি ও শিশুখাদ্য',
    coordinatorName: 'নাজমুল হাসান শুভ ও টিম ফেনী',
    date: '২০২৬-০৮-১৬',
    photoUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    reportSummary: 'বাঁধ ভেঙে সম্পূর্ণ প্লাবিত হওয়া ৩টি ইউনিয়নে বাড়ি বাড়ি গিয়ে শুকনা খাবার এবং পরবর্তীতে পুনর্বাসনে টিন বিতরণ করা হয়েছে।'
  },
  {
    id: 'loc-2',
    areaName: 'সেনবাগ ও বেগমগঞ্জ',
    district: 'নোয়াখালী',
    division: 'চট্টগ্রাম',
    latitude: 22.9904,
    longitude: 91.2291,
    beneficiariesCount: 820,
    totalAidAmount: 185000,
    aidType: 'ফ্রি মেডিকেল ক্যাম্প, ওষুধ ও স্যানিটারি ন্যাপকিন বিতরণ',
    coordinatorName: 'ফারহানা ইসলাম তিশা',
    date: '২০২৬-০৮-২২',
    photoUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    reportSummary: 'বন্যার পরবর্তী পানিবাহিত রোগ প্রতিরোধে বিশেষজ্ঞ ডাক্তার দ্বারা বিনামূল্যে চিকিৎসা ও ব্যবস্থাপত্র প্রদান করা হয়।'
  },
  {
    id: 'loc-3',
    areaName: 'চিলমারী ও রৌমারী চরাঞ্চল',
    district: 'কুড়িগ্রাম',
    division: 'রংপুর',
    latitude: 25.5647,
    longitude: 89.6738,
    beneficiariesCount: 650,
    totalAidAmount: 140000,
    aidType: 'শীতবস্ত্র, কম্বল ও শিশু খাদ্য',
    coordinatorName: 'মোস্তাফিজুর রহমান ও টিম উত্তরবঙ্গ',
    date: '২০২৬-০৯-১০',
    photoUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    reportSummary: 'ব্রহ্মপুত্রের দুর্গম চরের অসহায় ও নদীভাঙা পরিবারগুলোর মাঝে শীতকালীন উষ্ণ উপহার পৌঁছানো হয়েছে।'
  },
  {
    id: 'loc-4',
    areaName: 'গোয়াইনঘাট ও জৈন্তাপুর',
    district: 'সিলেট',
    division: 'সিলেট',
    latitude: 25.1053,
    longitude: 92.0084,
    beneficiariesCount: 940,
    totalAidAmount: 210000,
    aidType: 'খাদ্য প্যাকেট ও টিউবওয়েল মেরামত',
    coordinatorName: 'সৈয়দ আহমেদ কাওসার',
    date: '২০২৬-০৭-১৮',
    photoUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80',
    reportSummary: 'পাহাড়ি ঢলে ক্ষতিগ্রস্ত পাহাড়ি টিলার বাসিন্দাদের মাঝে জরুরি খাদ্য সহায়তা এবং পানি সংকট নিরসনে ৮টি নষ্ট টিউবওয়েল সংস্কার করা হয়েছে।'
  },
  {
    id: 'loc-5',
    areaName: 'রায়েরবাজার ও কড়াইল বস্তি',
    district: 'ঢাকা',
    division: 'ঢাকা',
    latitude: 23.7533,
    longitude: 90.3664,
    beneficiariesCount: 420,
    totalAidAmount: 95000,
    aidType: 'এতিম ও পথশিশুদের শিক্ষা উপকরণ ও পুষ্টিকর খাবার',
    coordinatorName: 'তানভীর আহমেদ ও টিম ঢাকা',
    date: '২০২৬-০৯-০৫',
    photoUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    reportSummary: 'বস্তি এলাকার স্কুলছুট শিশুদের বিদ্যালয়ে ফিরিয়ে আনতে স্কুল ব্যাগ, জ্যামিতি বক্স ও মাসিক পুষ্টিকর টিফিন কর্মসূচি চলমান।'
  },
  {
    id: 'loc-6',
    areaName: 'দাকোপ ও কয়রা উপকূলীয় অঞ্চল',
    district: 'খুলনা',
    division: 'খুলনা',
    latitude: 22.5694,
    longitude: 89.5106,
    beneficiariesCount: 580,
    totalAidAmount: 160000,
    aidType: 'লবণাক্ততা মুক্ত মিষ্টি খাবার পানি সরবরাহ ও বৃষ্টির পানি সংরক্ষণ ট্যাংক',
    coordinatorName: 'প্রকৌশলী শেখ সজিব',
    date: '২০২৬-০৬-৩০',
    photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    reportSummary: 'উপকূলের চরম সুপেয় পানি সংকটে পড়া ৪টি গ্রামে বৃষ্টির পানি ধরে রাখার ট্যাংক ও ফিল্টার স্থাপন করা হয়েছে।'
  }
];

export const initialActivityPosts: ActivityPost[] = [
  {
    id: 'act-1',
    title: 'ফেনী ফুলগাজীতে ২০টি গৃহহীন পরিবারকে পুনর্বাসন টিন ও সামগ্রী হস্তান্তর',
    authorName: 'তানভীর আহমেদ চৌধুরী',
    authorRole: 'সভাপতি',
    date: '২০২৬-০৮-২০',
    time: 'বিকাল ৫:৩০',
    location: 'ফুলগাজী, ফেনী',
    summary: 'আলহামদুলিল্লাহ! বন্যায় যাদের ঘর সম্পূর্ণ মাটির সাথে মিশে গিয়েছিল, তাদের তালিকা অনুযায়ী ২০টি পরিবারের প্রতিটি পরিবারকে ৩ বান্ডিল করে উন্নত মানের রঙিন ঢেউটিন, সিমেন্ট ও নগদ সহায়তা হস্তান্তর করা হয়েছে। স্থানীয় গণ্যমান্য ব্যক্তিবর্গ উপস্থিত ছিলেন।',
    amountSpent: 145000,
    familiesHelped: 20,
    images: [
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'
    ],
    videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    documentLink: 'https://manobsheba.org/audit/feni-rehab-aug2026.pdf',
    category: 'ত্রাণ ও পুনর্বাসন',
    reactions: {
      '❤️': 42,
      '👏': 28,
      '🤲': 56,
      '👍': 34
    }
  },
  {
    id: 'act-2',
    title: 'নোয়াখালীতে দিনব্যাপী ফ্রি মেডিকেল ক্যাম্প ও ওষুধ বিতরণ সম্পন্ন',
    authorName: 'ডাঃ মেহজাবিন নূর',
    authorRole: 'স্বাস্থ্য ও রক্তদান সমন্বয়ক',
    date: '২০২৬-০৮-২৪',
    time: 'সন্ধ্যা ৬:০০',
    location: 'সেনবাগ মডেল হাইস্কুল মাঠ, নোয়াখালী',
    summary: 'দিনব্যাপী মেডিকেল ক্যাম্পে ৫৫০ জন নারী, শিশু ও বৃদ্ধকে বিনামূল্যে প্রেসক্রিপশন এবং মোট ৪৮,০০০ টাকার ওষুধ প্রদান করা হয়েছে। এছাড়া ৬০ জন রোগীর ডায়াবেটিস ও রক্তচাপ পরীক্ষা করা হয়েছে।',
    amountSpent: 48000,
    familiesHelped: 550,
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594824813579-24707f1543be?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'স্বাস্থ্য সেবা',
    reactions: {
      '❤️': 35,
      '👏': 19,
      '🤲': 48,
      '👍': 22
    }
  },
  {
    id: 'act-3',
    title: '৫০ জন এতিম ও দরিদ্র শিশুর মাঝে নতুন শিক্ষাবর্ষের উপকরণ ও ব্যাগ বিতরণ',
    authorName: 'ফারহানা ইসলাম তিশা',
    authorRole: 'সাধারণ সম্পাদক',
    date: '২০২৬-০৯-০৭',
    time: 'দুপুর ২:০০',
    location: 'রায়েরবাজার আল-নূর এতিমখানা কমপ্লেক্স, ঢাকা',
    summary: 'আমাদের নিয়মিত শিক্ষা বৃত্তির আওতায় ৫০ জন এতিম শিশুর মুখে হাসি ফোটাতে নতুন স্কুলব্যাগ, খাতা, কলম, জ্যামিতি বক্স ও ক্যালকুলেটর উপহার দেওয়া হলো। শিশুদের চোখের আনন্দই আমাদের সবচেয়ে বড় প্রেরণা।',
    amountSpent: 35000,
    familiesHelped: 50,
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'শিক্ষা',
    reactions: {
      '❤️': 61,
      '👏': 45,
      '🤲': 72,
      '👍': 29
    }
  }
];

export const initialComments: PostComment[] = [
  {
    id: 'c-1',
    targetId: 'act-1',
    authorName: 'নাজমুল হাসান শুভ',
    authorRole: 'স্বেচ্ছাসেবক',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    content: 'আলহামদুলিল্লাহ! ফুলগাজীতে নিজের চোখে অসহায় মানুষগুলোর আনন্দ দেখে অন্তর জুড়িয়ে গেল। আল্লাহ আমাদের সবার কবুল করুন।',
    timestamp: '২০২৬-০৮-২০T১৮:০০:০০+০৬:০০',
    reactions: { '❤️': 12, '🤲': 18 }
  },
  {
    id: 'c-2',
    targetId: 'act-1',
    authorName: 'কাজী আরিফুল হক',
    authorRole: 'অর্থ সম্পাদক',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    content: 'টিনের সকল ক্রয় মেমো ও রসিদ লেজারে আপলোড করা হয়েছে। হিসাব পুরোপুরি মিলিয়ে নেওয়া হয়েছে।',
    timestamp: '২০২৬-০৮-২০T১৯:৩০:০০+০৬:০০',
    reactions: { '👍': 8, '👏': 6 }
  },
  {
    id: 'c-3',
    targetId: 'act-2',
    authorName: 'তানভীর আহমেদ চৌধুরী',
    authorRole: 'সভাপতি',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    content: 'মেডিকেল টিমের সকল সম্মানিত চিকিৎসক ও ভলান্টিয়ারদের অক্লান্ত পরিশ্রমের জন্য আন্তরিক ধন্যবাদ ও কৃতজ্ঞতা।',
    timestamp: '২০২৬-০৮-২৪T২০:১৫:০০+০৬:০০',
    reactions: { '👏': 14, '❤️': 9 }
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'chat-1',
    senderId: 'm-1',
    senderName: 'তানভীর আহমেদ (সভাপতি)',
    senderRole: 'সভাপতি',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    recipientId: 'community',
    text: 'আসসালামু আলাইকুম সবাইকে। আগামী শুক্রবার রাত ৮টায় ভার্চুয়াল সভায় উত্তরবঙ্গের শীতবস্ত্র ক্রয়ের টেন্ডার ড্রাফট ফাইনাল করা হবে। জুম বা গুগল মিটে যুক্ত থাকবেন।',
    timestamp: 'আজ সকাল ১০:১৫'
  },
  {
    id: 'chat-2',
    senderId: 'm-2',
    senderName: 'ফারহানা ইসলাম তিশা',
    senderRole: 'সাধারণ সম্পাদক',
    senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    recipientId: 'community',
    text: 'জি ভাইয়া, আমি সব জেলা সমন্বয়কদের হোয়াটসঅ্যাপ গ্রুপেও লিংকটি শেয়ার করে দিয়েছি। এজেন্ডা প্রস্তুত আছে।',
    timestamp: 'আজ সকাল ১০:২৫'
  },
  {
    id: 'chat-3',
    senderId: 'm-3',
    senderName: 'কাজী আরিফুল হক',
    senderRole: 'অর্থ সম্পাদক',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    recipientId: 'community',
    text: 'শীতবস্ত্র তহবিলে সংগৃহীত বর্তমান ব্যালেন্স ১,৮৫,০০০ ৳। পাইকারি ক্রয়ের জন্য চেকের ব্যবস্থা করা হচ্ছে।',
    timestamp: 'আজ সকাল ১১:০৫'
  },
  {
    id: 'chat-4',
    senderId: 'm-6',
    senderName: 'নাজমুল হাসান শুভ',
    senderRole: 'স্বেচ্ছাসেবক',
    senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    recipientId: 'community',
    text: 'মাঠের ভলান্টিয়ার টিম প্রস্তুত আছে! প্যাকেটজাতকরণ ও তালিকা তৈরিতে আমরা একযোগে কাজ করব ইনশাআল্লাহ।',
    timestamp: 'আজ দুপুর ১২:০০'
  }
];

export const initialBloodDonors: BloodDonor[] = [
  {
    id: 'bd-1',
    name: 'ডাঃ মেহজাবিন নূর',
    bloodGroup: 'O-',
    phone: '01678-445566',
    district: 'চট্টগ্রাম',
    upazila: 'পাঁচলাইশ',
    lastDonationDate: '২০২৬-০৬-১০',
    isAvailable: true,
    totalDonations: 8
  },
  {
    id: 'bd-2',
    name: 'তানভীর আহমেদ',
    bloodGroup: 'O+',
    phone: '01711-112233',
    district: 'ঢাকা',
    upazila: 'ধানমন্ডি',
    lastDonationDate: '২০২৬-০৫-১৫',
    isAvailable: true,
    totalDonations: 12
  },
  {
    id: 'bd-3',
    name: 'আশরাফুল ইসলাম রাতুল',
    bloodGroup: 'A+',
    phone: '01814-778899',
    district: 'ঢাকা',
    upazila: 'মিরপুর',
    lastDonationDate: '২০২৬-০২-২০',
    isAvailable: true,
    totalDonations: 5
  },
  {
    id: 'bd-4',
    name: 'নাজমুল হাসান শুভ',
    bloodGroup: 'B-',
    phone: '01799-667788',
    district: 'ফেনী',
    upazila: 'পরশুরাম',
    lastDonationDate: '২০২৬-০৪-১৮',
    isAvailable: true,
    totalDonations: 6
  },
  {
    id: 'bd-5',
    name: 'সুমাইয়া ফারহানা',
    bloodGroup: 'AB+',
    phone: '01923-456789',
    district: 'সিলেট',
    upazila: 'সদর',
    lastDonationDate: '২০২৬-০৩-১২',
    isAvailable: true,
    totalDonations: 4
  },
  {
    id: 'bd-6',
    name: 'কামরুল হাসান ইমন',
    bloodGroup: 'B+',
    phone: '01511-987654',
    district: 'নোয়াখালী',
    upazila: 'বেগমগঞ্জ',
    lastDonationDate: '২০২৬-০৭-০৫',
    isAvailable: false,
    totalDonations: 9
  },
  {
    id: 'bd-7',
    name: 'শাহরিয়ার কবির',
    bloodGroup: 'A-',
    phone: '01300-123456',
    district: 'রাজশাহী',
    upazila: 'বোয়ালিয়া',
    lastDonationDate: '২০২৬-০১-১০',
    isAvailable: true,
    totalDonations: 7
  },
  {
    id: 'bd-8',
    name: 'মাহমুদুল হক মিলন',
    bloodGroup: 'AB-',
    phone: '01700-554433',
    district: 'খুলনা',
    upazila: 'সোনাডাঙ্গা',
    lastDonationDate: '২০২৬-০২-২৮',
    isAvailable: true,
    totalDonations: 3
  }
];

export const initialNotices: Notice[] = [
  {
    id: 'not-1',
    title: 'জরুরি রক্তের আবেদন: ঢাকা মেডিকেল হাসপাতালে মুমূর্ষু রোগীর জন্য ২ ব্যাগ O- রক্ত প্রয়োজন',
    priority: 'জরুরি',
    date: '২০২৬-০৯-২৮',
    time: 'সন্ধ্যা ৭:৩০',
    publishedBy: 'স্বাস্থ্য ও রক্তদান সেল',
    content: 'এক গর্ভবতী মা সিজারিয়ান অপারেশনের জন্য আইসিইউতে আছেন। জরুরি ভিত্তিতে ২ ব্যাগ O নেগেটিভ রক্তের প্রয়োজন। যোগাযোগের ঠিকানা: ০১৬৭৮-৪৪৫৫৬৬ অথবা সরাসরি ফাউন্ডেশন হটলাইনে যোগাযোগ করুন।',
    reactions: { '🤲': 45, '❤️': 12 }
  },
  {
    id: 'not-2',
    title: 'উত্তরবঙ্গে আসন্ন শীতবস্ত্র সংগ্রহ ও বিতরণ কর্মসূচি ২০২৬ সংক্রান্ত প্রস্তুতি সভা',
    priority: 'মিটিং',
    date: '২০২৬-০৯-২৫',
    time: 'রাত ৮:০০',
    publishedBy: 'সাধারণ সম্পাদক',
    content: 'আগামী শুক্রবার রাত ৮টায় ফাউন্ডেশনের কেন্দ্রীয় ভার্চুয়াল গুগল মিট লিংকে সকল কার্যনির্বাহী সদস্য ও জেলা সমন্বয়কদের উপস্থিতি বাধ্যতামূলক। এজেন্ডা: শীতবস্ত্র ক্রয়ের ভেন্ডর নির্বাচন ও জেলাভিত্তিক বিতরণের তারিখ নির্ধারণ।',
    reactions: { '👍': 24, '👏': 15 }
  },
  {
    id: 'not-3',
    title: 'সেপ্টেম্বর ২০২৬ মাসের নিয়মিত সদস্য ফি পরিশোধ ও অডিট রিপোর্ট প্রকাশ',
    priority: 'সাধারণ',
    date: '২০২৬-০৯-২০',
    time: 'সকাল ১০:০০',
    publishedBy: 'অর্থ ও হিসাব দপ্তর',
    content: 'সকল সম্মানিত সাধারণ ও আজীবন সদস্যদের সেপ্টেম্বর মাসের ধার্যকৃত ফি নির্ধারিত সময়ের মধ্যে পরিশোধ করার জন্য অনুরোধ জানানো হচ্ছে। গত আগস্ট মাসের সম্পূর্ণ অডিট রিপোর্ট স্বচ্ছতা লেজারে উন্মুক্ত করা হয়েছে।',
    reactions: { '👍': 18 }
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'ফেনী ফুলগাজীতে গৃহহীন পরিবারকে পুনর্বাসন সামগ্রী হস্তান্তর',
    category: 'ত্রাণ বিতরণ',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
    date: '২০২৬-০৮-২০',
    location: 'ফুলগাজী, ফেনী',
    description: '২০টি ক্ষতিগ্রস্ত পরিবারকে পুনর্বাসন টিন ও চাল-ডাল বিতরণ।'
  },
  {
    id: 'gal-2',
    title: 'নোয়াখালী সেনবাগে ফ্রি মেডিকেল ক্যাম্প ও জরুরি চিকিৎসা',
    category: 'চিকিৎসা সেবা',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    date: '২০২৬-০৮-২৪',
    location: 'সেনবাগ, নোয়াখালী',
    description: '৫৫০ জন নারী ও শিশুকে বিনামূল্যে ব্যবস্থাপত্র ও অ্যান্টিবায়োটিক প্রদান।'
  },
  {
    id: 'gal-3',
    title: 'কুড়িগ্রাম ব্রহ্মপুত্রের চরে শীতবস্ত্র বিতরণ প্রস্তুতি জরিপ',
    category: 'শীতবস্ত্র বিতরণ',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
    date: '২০২৬-০৯-১০',
    location: 'চিলমারী চর, কুড়িগ্রাম',
    description: '১৫০টি পরিবারের বাড়ি বাড়ি গিয়ে চাহিদার তথ্য তালিকাভুক্ত করা।'
  },
  {
    id: 'gal-4',
    title: 'রায়েরবাজার বস্তি এলাকার এতিম শিশুদের মাঝে শিক্ষা সামগ্রী প্রদান',
    category: 'শিক্ষা ও এতিম',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    date: '২০২৬-০৯-০৭',
    location: 'রায়েরবাজার, ঢাকা',
    description: '৫০ জন সুবিধাবঞ্চিত শিশুকে নতুন স্কুল ব্যাগ ও বই-খাতা উপহার।'
  },
  {
    id: 'gal-5',
    title: 'চট্টগ্রাম মেডিকেল কলেজ হাসপাতালে জরুরি স্বেচ্ছায় রক্তদান ক্যাম্পেইন',
    category: 'রক্তদান',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=600&q=80',
    date: '২০২৬-০৮-১৫',
    location: 'চমেক, চট্টগ্রাম',
    description: 'জরুরি রক্তের সংকট মেটাতে স্বেচ্ছাসেবী টিমের রক্তদান।'
  },
  {
    id: 'gal-6',
    title: 'সুন্দরবন সংলগ্ন দাকোপ উপজেলায় পরিবেশ সংরক্ষণ ও বৃক্ষরোপণ অভিযান',
    category: 'বৃক্ষরোপণ',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    date: '২০২৬-০৭-১০',
    location: 'দাকোপ, খুলনা',
    description: 'উপকূলীয় এলাকায় বাঁধ রক্ষার্থে ৫০০ ফলজ ও বনজ গাছের চারা রোপণ।'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'নতুন অনুদান জমা হয়েছে',
    message: 'মোশাররফ হোসেন বন্যাকবলিত পূর্বাঞ্চল তহবিলে ১৫,০০০ টাকা বিকাশ করেছেন।',
    timestamp: '২০২৬-০৯-২৮T১২:৪০:০০+০৬:০০',
    read: false,
    linkTab: 'donations',
    type: 'donation'
  },
  {
    id: 'n-2',
    title: 'জরুরি রক্তদানের আবেদন',
    message: 'ঢাকা মেডিকেল হাসপাতালে মুমূর্ষু প্রসূতি মায়ের জন্য ২ ব্যাগ O নেগেটিভ রক্ত প্রয়োজন।',
    timestamp: '২০২৬-০৯-২৮T১৯:৩০:০০+০৬:০০',
    read: false,
    linkTab: 'blood',
    type: 'emergency'
  },
  {
    id: 'n-3',
    title: 'নতুন চ্যাট বার্তা',
    message: 'কমিউনিটি চ্যাটে সভাপতি তানভীর আহমেদ নতুন বার্তা পাঠিয়েছেন।',
    timestamp: '২০২৬-০৯-২৮T১০:১৫:০০+০৬:০০',
    read: false,
    linkTab: 'chat',
    type: 'chat'
  },
  {
    id: 'n-4',
    title: 'স্বেচ্ছাসেবক কার্যক্রম অগ্রগতি রিপোর্ট আপডেট',
    message: 'ফারহানা ইসলাম নোয়াখালীতে ফ্রি মেডিকেল ক্যাম্প সফলভাবে সম্পন্ন করার রিপোর্ট যোগ করেছেন।',
    timestamp: '২০২৬-০৯-২৭T১৪:১৫:০০+০৬:০০',
    read: true,
    linkTab: 'volunteers',
    type: 'task'
  },
  {
    id: 'n-5',
    title: 'নতুন নোটিশ প্রকাশিত হয়েছে',
    message: 'উত্তরবঙ্গে শীতবস্ত্র বিতরণ প্রস্তুতি সভার নোটিশ জারি করা হয়েছে।',
    timestamp: '২০২৬-০৯-২৫T২০:০০:০০+০৬:০০',
    read: true,
    linkTab: 'notices',
    type: 'notice'
  }
];

export const initialFoundationEvents = [
  {
    id: 'evt-1',
    title: 'মাসিক সাধারণ সভা - সেপ্টেম্বর ২০২৬',
    date: '২০২৬-০৯-০৫',
    location: 'কেন্দ্রীয় ভার্চুয়াল গুগল মিট ও ধানমন্ডি অফিস',
    type: 'monthly_meeting',
    description: 'সেপ্টেম্বর মাসের তহবিল হিসাব ও আসন্ন উত্তরবঙ্গ শীতবস্ত্র বিতরণ বাজেট চূড়ান্তকরণ।',
    attendanceMap: {
      'm-1': 'present',
      'm-2': 'present',
      'm-3': 'present',
      'm-4': 'present',
      'm-5': 'present',
      'm-6': 'present',
      'm-7': 'present'
    }
  },
  {
    id: 'evt-2',
    title: 'ফেনী বন্যা পুনর্বাসন সামগ্রী ও টিন বিতরণ ফিল্ড ড্রাইভ',
    date: '২০২৬-০৮-১৫',
    location: 'ফুলগাজী ও পরশুরাম, ফেনী',
    type: 'relief_drive',
    description: '২০টি পরিবারের মাঝে পুনর্বাসন রঙিন ঢেউটিন ও নগদ টাকা হস্তান্তর।',
    attendanceMap: {
      'm-1': 'present',
      'm-2': 'present',
      'm-6': 'present',
      'm-7': 'present'
    }
  },
  {
    id: 'evt-3',
    title: 'সেনবাগ ফ্রি মেডিকেল ও ব্লাড ক্যাম্প',
    date: '২০২৬-০৮-২২',
    location: 'সেনবাগ মডেল হাইস্কুল মাঠ, নোয়াখালী',
    type: 'medical_camp',
    description: '৫৫০ জন রোগীকে বিনামূল্যে বিশেষজ্ঞ চিকিৎসা ও ওষুধ বিতরণ।',
    attendanceMap: {
      'm-2': 'present',
      'm-4': 'present',
      'm-7': 'present'
    }
  },
  {
    id: 'evt-4',
    title: 'বার্ষিক সাধারণ সভা ও অডিট প্রকাশ (AGM ২০২৫)',
    date: '২০২৫-১২-২০',
    location: 'ঢাকা কেন্দ্রীয় মিলনায়তন',
    type: 'agm',
    description: '২০২৫ সালের পূর্ণাঙ্গ বাৎসরিক আর্থিক হিসাব পর্যালোচনা ও নতুন কমিটি অনুমোদন।',
    attendanceMap: {
      'm-1': 'present',
      'm-2': 'present',
      'm-3': 'present',
      'm-5': 'present',
      'm-6': 'present'
    }
  },
  {
    id: 'evt-5',
    title: 'যুব কল্যাণ প্রীতি টুর্নামেন্ট ও সচেতনতা ম্যারাথন',
    date: '২০২৬-০৯-১২',
    location: 'উত্তরা ৪নং সেক্টর মাঠ, ঢাকা',
    type: 'sports_event',
    description: 'যুবসমাজকে মাদকবিরোধী ও রক্তদানে উদ্বুদ্ধ করতে প্রীতি ফুটবল ম্যাচ ও সচেতনতা ক্যাম্পেইন।',
    attendanceMap: {
      'm-1': 'present',
      'm-5': 'present',
      'm-7': 'present'
    }
  }
];

export const initialYearlyAudits = [
  {
    year: '২০২৬',
    totalIncome: 1875000,
    totalExpense: 1260000,
    netReserve: 615000,
    totalBeneficiaries: 7800,
    months: [
      { monthName: 'সেপ্টেম্বর', monthCode: '2026-09', donationsIncome: 245000, monthlyFeesIncome: 15000, totalIncome: 260000, totalExpense: 141500, netBalance: 118500 },
      { monthName: 'আগস্ট', monthCode: '2026-08', donationsIncome: 380000, monthlyFeesIncome: 15000, totalIncome: 395000, totalExpense: 215500, netBalance: 179500 },
      { monthName: 'জুলাই', monthCode: '2026-07', donationsIncome: 210000, monthlyFeesIncome: 15000, totalIncome: 225000, totalExpense: 130000, netBalance: 95000 },
      { monthName: 'জুন', monthCode: '2026-06', donationsIncome: 190000, monthlyFeesIncome: 15000, totalIncome: 205000, totalExpense: 120000, netBalance: 85000 },
      { monthName: 'মে', monthCode: '2026-05', donationsIncome: 175000, monthlyFeesIncome: 15000, totalIncome: 190000, totalExpense: 145000, netBalance: 45000 },
      { monthName: 'এপ্রিল (রমজান)', monthCode: '2026-04', donationsIncome: 320000, monthlyFeesIncome: 15000, totalIncome: 335000, totalExpense: 260000, netBalance: 75000 },
      { monthName: 'মার্চ', monthCode: '2026-03', donationsIncome: 120000, monthlyFeesIncome: 15000, totalIncome: 135000, totalExpense: 98000, netBalance: 37000 },
      { monthName: 'ফেব্রুয়ারি', monthCode: '2026-02', donationsIncome: 115000, monthlyFeesIncome: 15000, totalIncome: 130000, totalExpense: 85000, netBalance: 45000 },
      { monthName: 'জানুয়ারি', monthCode: '2026-01', donationsIncome: 100000, monthlyFeesIncome: 15000, totalIncome: 115000, totalExpense: 65000, netBalance: 50000 }
    ]
  },
  {
    year: '২০২৫ (গত বছর)',
    totalIncome: 3250000,
    totalExpense: 2820000,
    netReserve: 430000,
    totalBeneficiaries: 12400,
    months: [
      { monthName: 'ডিসেম্বর', monthCode: '2025-12', donationsIncome: 310000, monthlyFeesIncome: 18000, totalIncome: 328000, totalExpense: 280000, netBalance: 48000 },
      { monthName: 'নভেম্বর', monthCode: '2025-11', donationsIncome: 240000, monthlyFeesIncome: 18000, totalIncome: 258000, totalExpense: 210000, netBalance: 48000 },
      { monthName: 'অক্টোবর', monthCode: '2025-10', donationsIncome: 190000, monthlyFeesIncome: 18000, totalIncome: 208000, totalExpense: 175000, netBalance: 33000 },
      { monthName: 'সেপ্টেম্বর', monthCode: '2025-09', donationsIncome: 220000, monthlyFeesIncome: 18000, totalIncome: 238000, totalExpense: 190000, netBalance: 48000 },
      { monthName: 'আগস্ট', monthCode: '2025-08', donationsIncome: 450000, monthlyFeesIncome: 18000, totalIncome: 468000, totalExpense: 410000, netBalance: 58000 },
      { monthName: 'জুলাই', monthCode: '2025-07', donationsIncome: 280000, monthlyFeesIncome: 18000, totalIncome: 298000, totalExpense: 245000, netBalance: 53000 },
      { monthName: 'জুন', monthCode: '2025-06', donationsIncome: 195000, monthlyFeesIncome: 18000, totalIncome: 213000, totalExpense: 180000, netBalance: 33000 },
      { monthName: 'মে', monthCode: '2025-05', donationsIncome: 180000, monthlyFeesIncome: 18000, totalIncome: 198000, totalExpense: 165000, netBalance: 33000 },
      { monthName: 'এপ্রিল', monthCode: '2025-04', donationsIncome: 420000, monthlyFeesIncome: 18000, totalIncome: 438000, totalExpense: 390000, netBalance: 48000 },
      { monthName: 'মার্চ', monthCode: '2025-03', donationsIncome: 260000, monthlyFeesIncome: 18000, totalIncome: 278000, totalExpense: 250000, netBalance: 28000 },
      { monthName: 'ফেব্রুয়ারি', monthCode: '2025-02', donationsIncome: 245000, monthlyFeesIncome: 18000, totalIncome: 263000, totalExpense: 235000, netBalance: 28000 },
      { monthName: 'জানুয়ারি', monthCode: '2025-01', donationsIncome: 260000, monthlyFeesIncome: 18000, totalIncome: 278000, totalExpense: 240000, netBalance: 38000 }
    ]
  }
];

