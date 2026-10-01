-- ====================================================================
-- মানবসেবা ফাউন্ডেশন (Manob Sheba Foundation) - Supabase Database Schema
-- Run this complete SQL script in your Supabase SQL Editor.
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Organization Configuration Table
CREATE TABLE IF NOT EXISTS org_config (
  id TEXT PRIMARY KEY DEFAULT 'primary_org',
  org_name TEXT NOT NULL,
  org_name_en TEXT,
  slogan TEXT,
  slogan_en TEXT,
  logo_url TEXT,
  cover_url TEXT,
  established_year TEXT,
  reg_number TEXT,
  hotline_phone TEXT,
  emergency_phone TEXT,
  email TEXT,
  address TEXT,
  bkash_number TEXT,
  nagad_number TEXT,
  rocket_number TEXT,
  bank_details JSONB,
  mission_statement TEXT,
  about_text TEXT,
  zoom_meeting_url TEXT,
  google_meet_url TEXT,
  facebook_page_url TEXT,
  facebook_group_url TEXT,
  whatsapp_group_url TEXT,
  telegram_url TEXT,
  youtube_url TEXT,
  enabled_features JSONB DEFAULT '{"showCalendarClock": true, "showLiveChat": true, "showSectorLedgers": true, "showVirtualMeetingStrip": true, "showEmojiReactions": true}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Fund Sectors Table (খাতভিত্তিক তহবিল)
CREATE TABLE IF NOT EXISTS fund_sectors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  code TEXT UNIQUE,
  description TEXT,
  allocated_budget NUMERIC DEFAULT 0,
  total_income NUMERIC DEFAULT 0,
  total_expense NUMERIC DEFAULT 0,
  color TEXT DEFAULT 'emerald',
  badge_bg TEXT,
  icon_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Members & Officers Table (সদস্য ও পরিচালনা পরিষদ)
CREATE TABLE IF NOT EXISTS members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL,
  role_type TEXT NOT NULL DEFAULT 'member', -- executive, adviser, coordinator, volunteer, member
  is_admin BOOLEAN DEFAULT FALSE,
  responsibilities JSONB DEFAULT '[]'::jsonb,
  secret_code TEXT UNIQUE NOT NULL,
  blood_group TEXT DEFAULT 'O+',
  avatar TEXT,
  join_date TEXT,
  district TEXT,
  upazila TEXT,
  bio TEXT,
  status TEXT DEFAULT 'active',
  tasks JSONB DEFAULT '[]'::jsonb,
  monthly_fees JSONB DEFAULT '{}'::jsonb,
  assigned_tools JSONB DEFAULT '[]'::jsonb,
  attendance JSONB DEFAULT '{"totalDaysPresent": 0, "totalEventsHeld": 0, "history": []}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Campaigns Table (অনুদানের প্রকল্প ও ক্যাম্পেইন)
CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  target_amount NUMERIC NOT NULL DEFAULT 0,
  raised_amount NUMERIC NOT NULL DEFAULT 0,
  category TEXT DEFAULT 'relief',
  sector_id TEXT REFERENCES fund_sectors(id) ON DELETE SET NULL,
  cover_image TEXT,
  description TEXT,
  start_date TEXT,
  end_date TEXT,
  status TEXT DEFAULT 'ongoing',
  beneficiaries_count INTEGER DEFAULT 0,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Donations Table (প্রাপ্ত অনুদান ও ভাউচার)
CREATE TABLE IF NOT EXISTS donations (
  id TEXT PRIMARY KEY,
  donor_name TEXT NOT NULL,
  donor_phone TEXT NOT NULL,
  donor_email TEXT,
  amount NUMERIC NOT NULL,
  method TEXT NOT NULL,
  trx_id TEXT NOT NULL,
  campaign_id TEXT REFERENCES campaigns(id) ON DELETE SET NULL,
  campaign_title TEXT,
  sector_id TEXT REFERENCES fund_sectors(id) ON DELETE SET NULL,
  date TEXT NOT NULL,
  time TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'verified',
  receipt_no TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Expenses Table (ব্যয় ও ভাউচার খতিয়ান)
CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  sector_id TEXT REFERENCES fund_sectors(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL,
  date TEXT NOT NULL,
  approved_by TEXT NOT NULL,
  voucher_no TEXT UNIQUE NOT NULL,
  proof_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Relief Locations Table (ত্রাণ এলাকা ও সাহায্য ম্যাপ ট্র্যাকিং)
CREATE TABLE IF NOT EXISTS relief_locations (
  id TEXT PRIMARY KEY,
  area_name TEXT NOT NULL,
  district TEXT NOT NULL,
  division TEXT NOT NULL,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  beneficiaries_count INTEGER DEFAULT 0,
  total_aid_amount NUMERIC DEFAULT 0,
  aid_type TEXT,
  coordinator_name TEXT,
  date TEXT,
  photo_url TEXT,
  video_url TEXT,
  report_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Activity Posts Table (সাম্প্রতিক কার্যক্রম ও স্বচ্ছতার প্রমাণ)
CREATE TABLE IF NOT EXISTS activity_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT,
  date TEXT NOT NULL,
  time TEXT,
  location TEXT,
  summary TEXT,
  amount_spent NUMERIC,
  families_helped INTEGER,
  images JSONB DEFAULT '[]'::jsonb,
  video_link TEXT,
  document_link TEXT,
  category TEXT,
  reactions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Post Comments Table (মন্তব্য ও আলোচনা)
CREATE TABLE IF NOT EXISTS post_comments (
  id TEXT PRIMARY KEY,
  target_id TEXT NOT NULL,
  author_id TEXT,
  author_name TEXT NOT NULL,
  author_role TEXT,
  author_avatar TEXT,
  content TEXT NOT NULL,
  timestamp TEXT,
  reactions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Blood Donors Table (রক্তদাতা ডিরেক্টরি)
CREATE TABLE IF NOT EXISTS blood_donors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  blood_group TEXT NOT NULL,
  phone TEXT NOT NULL,
  district TEXT NOT NULL,
  upazila TEXT,
  last_donation_date TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  total_donations INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Notices Table (অফিসিয়াল নোটিশ ও রেজুলেশন বোর্ড)
CREATE TABLE IF NOT EXISTS notices (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  priority TEXT DEFAULT 'সাধারণ',
  date TEXT NOT NULL,
  time TEXT,
  published_by TEXT,
  content TEXT NOT NULL,
  attachment_url TEXT,
  reactions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Gallery Items Table (ছবি ও ভিডিও গ্যালারি)
CREATE TABLE IF NOT EXISTS gallery_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  media_type TEXT DEFAULT 'image',
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  date TEXT,
  location TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. Live Chat Messages Table (যৌথ ও ব্যক্তিগত চ্যাট)
CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  sender_id TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  sender_role TEXT,
  sender_avatar TEXT,
  recipient_id TEXT NOT NULL DEFAULT 'community',
  text TEXT NOT NULL,
  timestamp TEXT,
  reactions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================================================
-- Row Level Security (RLS) Policies
-- Enables public read and safe insertions
-- ====================================================================

ALTER TABLE org_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE fund_sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE relief_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all foundation transparency tables
CREATE POLICY "Public Read org_config" ON org_config FOR SELECT USING (true);
CREATE POLICY "Public Read fund_sectors" ON fund_sectors FOR SELECT USING (true);
CREATE POLICY "Public Read members" ON members FOR SELECT USING (true);
CREATE POLICY "Public Read campaigns" ON campaigns FOR SELECT USING (true);
CREATE POLICY "Public Read donations" ON donations FOR SELECT USING (true);
CREATE POLICY "Public Read expenses" ON expenses FOR SELECT USING (true);
CREATE POLICY "Public Read relief_locations" ON relief_locations FOR SELECT USING (true);
CREATE POLICY "Public Read activity_posts" ON activity_posts FOR SELECT USING (true);
CREATE POLICY "Public Read post_comments" ON post_comments FOR SELECT USING (true);
CREATE POLICY "Public Read blood_donors" ON blood_donors FOR SELECT USING (true);
CREATE POLICY "Public Read notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Public Read gallery_items" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Public Read chat_messages" ON chat_messages FOR SELECT USING (true);

-- Allow public and member inserts
CREATE POLICY "Allow donations insert" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow expenses insert" ON expenses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow members insert & update" ON members FOR ALL USING (true);
CREATE POLICY "Allow comments insert" ON post_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow blood_donors insert" ON blood_donors FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow chat_messages insert" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow notices all" ON notices FOR ALL USING (true);
CREATE POLICY "Allow activity_posts all" ON activity_posts FOR ALL USING (true);
CREATE POLICY "Allow org_config update" ON org_config FOR ALL USING (true);
CREATE POLICY "Allow fund_sectors all" ON fund_sectors FOR ALL USING (true);
CREATE POLICY "Allow campaigns all" ON campaigns FOR ALL USING (true);

-- ====================================================================
-- Seed Initial Organization Config
-- ====================================================================

INSERT INTO org_config (
  id, org_name, org_name_en, slogan, slogan_en, logo_url, cover_url,
  established_year, reg_number, hotline_phone, emergency_phone, email,
  address, bkash_number, nagad_number, rocket_number, bank_details,
  mission_statement, about_text, zoom_meeting_url, google_meet_url,
  facebook_page_url, facebook_group_url, whatsapp_group_url, telegram_url, youtube_url
) VALUES (
  'primary_org',
  'মানবসেবা ফাউন্ডেশন',
  'Manob Sheba Foundation',
  'মানুষ মানুষের জন্য, জীবন জীবনের জন্য — সেবাই আমাদের ব্রত',
  'Dedicated to humanity, serving with compassion & complete transparency',
  '/icon.svg',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop',
  '২০১৮',
  'রেজি নং: ডিএইচ-৯৮৪২/১৮',
  '+880 1711-234567',
  '+880 1819-876543',
  'info@manobsheba-foundation.org',
  'বাড়ি নং ১২, রোড নং ৫, ধানমন্ডি, ঢাকা-১২০৫, বাংলাদেশ',
  '01711-234567 (মার্চেন্ট ও পার্সোনাল)',
  '01819-876543 (পার্সোনাল)',
  '01711-234567-8',
  '{"bankName": "ইসলামী ব্যাংক বাংলাদেশ লিমিটেড", "branch": "ধানমন্ডি শাখা, ঢাকা", "accountName": "মানবসেবা ফাউন্ডেশন কল্যাণ ট্রাস্ট", "accountNumber": "2050 1450 2034 5678", "routingNumber": "125271890"}'::jsonb,
  'সমাজের অসহায়, দরিদ্র, বন্যাদুর্গত, রোগাক্রান্ত ও সুবিধাবঞ্চিত মানুষের পাশে দাঁড়িয়ে স্থায়ী মানবকল্যাণ এবং আত্মনির্ভরশীল সমাজ বিনির্মাণ করাই আমাদের লক্ষ্য।',
  'মানবসেবা ফাউন্ডেশন একটি অরাজনৈতিক, অলাভজনক ও সম্পূর্ণ স্বেচ্ছাসেবী সমাজকল্যাণ সংস্থা। ২০১৮ সাল থেকে আমরা বাংলাদেশের প্রত্যন্ত অঞ্চলে জরুরি বন্যা ত্রাণ, বিনামূল্যে চিকিৎসা সেবা, রক্তদান কর্মসূচি, এতিম শিশুদের শিক্ষা সহায়তা এবং শীতবস্ত্র বিতরণের মাধ্যমে আর্তমানবতার সেবায় নিরলস কাজ করে যাচ্ছি। আমাদের প্রতিটি আর্থিক লেনদেন ও অনুদান শতভাগ উন্মুক্ত ও জবাবদিহিতামূলক।',
  'https://zoom.us/j/98765432100',
  'https://meet.google.com/abc-defg-hij',
  'https://facebook.com/manobsheba.foundation',
  'https://facebook.com/groups/manobsheba.volunteers',
  'https://chat.whatsapp.com/invite/ManobShebaOfficial',
  'https://t.me/manobshebafoundation',
  'https://youtube.com/@manobshebafoundation'
) ON CONFLICT (id) DO NOTHING;

-- Done! Your Supabase database is now completely ready for Manob Sheba Foundation.
