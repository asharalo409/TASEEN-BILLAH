import { createClient, SupabaseClient } from '@supabase/supabase-js';
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
  FundSector,
  PostComment,
  ChatMessage
} from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('your-project-id')
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// ==========================================
// Supabase Cloud Sync & Helper Functions
// ==========================================

export async function fetchAllFromSupabase() {
  if (!supabase) return null;

  try {
    const [
      { data: orgConfigData },
      { data: membersData },
      { data: campaignsData },
      { data: donationsData },
      { data: expensesData },
      { data: fundSectorsData },
      { data: noticesData },
      { data: activityPostsData },
      { data: commentsData },
      { data: bloodDonorsData },
      { data: galleryData },
      { data: reliefLocationsData },
      { data: chatMessagesData }
    ] = await Promise.all([
      supabase.from('org_config').select('*').limit(1).maybeSingle(),
      supabase.from('members').select('*'),
      supabase.from('campaigns').select('*'),
      supabase.from('donations').select('*').order('created_at', { ascending: false }),
      supabase.from('expenses').select('*').order('created_at', { ascending: false }),
      supabase.from('fund_sectors').select('*'),
      supabase.from('notices').select('*').order('created_at', { ascending: false }),
      supabase.from('activity_posts').select('*').order('created_at', { ascending: false }),
      supabase.from('post_comments').select('*').order('created_at', { ascending: true }),
      supabase.from('blood_donors').select('*'),
      supabase.from('gallery_items').select('*'),
      supabase.from('relief_locations').select('*'),
      supabase.from('chat_messages').select('*').order('created_at', { ascending: true })
    ]);

    return {
      orgConfig: orgConfigData || null,
      members: membersData && membersData.length > 0 ? membersData : null,
      campaigns: campaignsData && campaignsData.length > 0 ? campaignsData : null,
      donations: donationsData && donationsData.length > 0 ? donationsData : null,
      expenses: expensesData && expensesData.length > 0 ? expensesData : null,
      fundSectors: fundSectorsData && fundSectorsData.length > 0 ? fundSectorsData : null,
      notices: noticesData && noticesData.length > 0 ? noticesData : null,
      activityPosts: activityPostsData && activityPostsData.length > 0 ? activityPostsData : null,
      comments: commentsData && commentsData.length > 0 ? commentsData : null,
      bloodDonors: bloodDonorsData && bloodDonorsData.length > 0 ? bloodDonorsData : null,
      gallery: galleryData && galleryData.length > 0 ? galleryData : null,
      reliefLocations: reliefLocationsData && reliefLocationsData.length > 0 ? reliefLocationsData : null,
      chatMessages: chatMessagesData && chatMessagesData.length > 0 ? chatMessagesData : null
    };
  } catch (error) {
    console.warn('Supabase fetch error, fallback to local data:', error);
    return null;
  }
}

// Data synchronization helpers
export async function syncDonationToSupabase(donation: Donation) {
  if (!supabase) return;
  try {
    await supabase.from('donations').upsert({
      id: donation.id,
      donor_name: donation.donorName,
      donor_phone: donation.donorPhone,
      donor_email: donation.donorEmail,
      amount: donation.amount,
      method: donation.method,
      trx_id: donation.trxId,
      campaign_id: donation.campaignId,
      campaign_title: donation.campaignTitle,
      sector_id: donation.sectorId,
      date: donation.date,
      time: donation.time,
      is_anonymous: donation.isAnonymous,
      status: donation.status,
      receipt_no: donation.receiptNo
    });
  } catch (err) {
    console.error('Failed to sync donation to Supabase:', err);
  }
}

export async function syncExpenseToSupabase(expense: ExpenseRecord) {
  if (!supabase) return;
  try {
    await supabase.from('expenses').upsert({
      id: expense.id,
      title: expense.title,
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
      approved_by: expense.approvedBy,
      voucher_no: expense.voucherNo,
      proof_url: expense.proofUrl,
      notes: expense.notes,
      sector_id: expense.sectorId
    });
  } catch (err) {
    console.error('Failed to sync expense to Supabase:', err);
  }
}

export async function syncMemberToSupabase(member: Member) {
  if (!supabase) return;
  try {
    await supabase.from('members').upsert({
      id: member.id,
      name: member.name,
      phone: member.phone,
      email: member.email,
      role: member.role,
      role_type: member.roleType,
      is_admin: member.isAdmin,
      responsibilities: member.responsibilities,
      secret_code: member.secretCode,
      blood_group: member.bloodGroup,
      avatar: member.avatar,
      join_date: member.joinDate,
      district: member.district,
      upazila: member.upazila,
      bio: member.bio,
      status: member.status,
      tasks: member.tasks,
      monthly_fees: member.monthlyFees,
      attendance: member.attendance
    });
  } catch (err) {
    console.error('Failed to sync member to Supabase:', err);
  }
}

export async function syncChatMessageToSupabase(chat: ChatMessage) {
  if (!supabase) return;
  try {
    await supabase.from('chat_messages').insert({
      id: chat.id,
      sender_id: chat.senderId,
      sender_name: chat.senderName,
      sender_role: chat.senderRole,
      sender_avatar: chat.senderAvatar,
      recipient_id: chat.recipientId,
      text: chat.text,
      timestamp: chat.timestamp,
      reactions: chat.reactions || {}
    });
  } catch (err) {
    console.error('Failed to sync chat message to Supabase:', err);
  }
}

export async function syncNoticeToSupabase(notice: Notice) {
  if (!supabase) return;
  try {
    await supabase.from('notices').upsert({
      id: notice.id,
      title: notice.title,
      priority: notice.priority,
      date: notice.date,
      time: notice.time,
      published_by: notice.publishedBy,
      content: notice.content,
      attachment_url: notice.attachmentUrl,
      reactions: notice.reactions || {}
    });
  } catch (err) {
    console.error('Failed to sync notice to Supabase:', err);
  }
}

export async function syncActivityPostToSupabase(post: ActivityPost) {
  if (!supabase) return;
  try {
    await supabase.from('activity_posts').upsert({
      id: post.id,
      title: post.title,
      author_name: post.authorName,
      author_role: post.authorRole,
      date: post.date,
      time: post.time,
      location: post.location,
      summary: post.summary,
      amount_spent: post.amountSpent,
      families_helped: post.familiesHelped,
      images: post.images,
      video_link: post.videoLink,
      document_link: post.documentLink,
      category: post.category,
      reactions: post.reactions || {}
    });
  } catch (err) {
    console.error('Failed to sync activity to Supabase:', err);
  }
}

export async function syncOrgConfigToSupabase(config: OrgConfig) {
  if (!supabase) return;
  try {
    await supabase.from('org_config').upsert({
      id: 'primary_org',
      org_name: config.orgName,
      org_name_en: config.orgNameEn,
      slogan: config.slogan,
      slogan_en: config.sloganEn,
      logo_url: config.logoUrl,
      cover_url: config.coverUrl,
      established_year: config.establishedYear,
      reg_number: config.regNumber,
      hotline_phone: config.hotlinePhone,
      emergency_phone: config.emergencyPhone,
      email: config.email,
      address: config.address,
      bkash_number: config.bkashNumber,
      nagad_number: config.nagadNumber,
      rocket_number: config.rocketNumber,
      bank_details: config.bankDetails,
      mission_statement: config.missionStatement,
      about_text: config.aboutText,
      zoom_meeting_url: config.zoomMeetingUrl,
      google_meet_url: config.googleMeetUrl,
      facebook_page_url: config.facebookPageUrl,
      facebook_group_url: config.facebookGroupUrl,
      whatsapp_group_url: config.whatsappGroupUrl,
      telegram_url: config.telegramUrl,
      youtube_url: config.youtubeUrl,
      enabled_features: config.enabledFeatures
    });
  } catch (err) {
    console.error('Failed to sync org config to Supabase:', err);
  }
}
