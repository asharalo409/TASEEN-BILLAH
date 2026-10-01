import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { StatsCounter } from './components/StatsCounter';
import { CalendarClockWidget } from './components/CalendarClockWidget';
import { VirtualMeetingStrip } from './components/VirtualMeetingStrip';
import { SectorFinancialLedger } from './components/SectorFinancialLedger';
import { PersonalMemberDashboard } from './components/PersonalMemberDashboard';
import { AdminControlPanel } from './components/AdminControlPanel';
import { LiveChatRoom } from './components/LiveChatRoom';
import { BottomPremierNavBar } from './components/BottomPremierNavBar';
import { DonationSection } from './components/DonationSection';
import { TransparencyLedger } from './components/TransparencyLedger';
import { VolunteerDirectory } from './components/VolunteerDirectory';
import { ReliefLocationMap } from './components/ReliefLocationMap';
import { ActivityFeed } from './components/ActivityFeed';
import { BloodDonationDirectory } from './components/BloodDonationDirectory';
import { NoticeBoard } from './components/NoticeBoard';
import { GallerySection } from './components/GallerySection';
import { LoginModal } from './components/LoginModal';
import { SettingsModal } from './components/SettingsModal';
import { DonationModal } from './components/DonationModal';
import { DonationVoucherModal } from './components/DonationVoucherModal';
import { SocialShareModal } from './components/SocialShareModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { Campaign } from './types';
import {
  HeartHandshake,
  ShieldCheck,
  Users,
  MapPin,
  Droplet,
  FileText,
  DollarSign,
  ArrowRight,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  X,
  Layers,
  MessageSquare,
  ShieldAlert,
  User,
  Image as ImageIcon
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    toasts,
    removeToast,
    viewingDonationReceipt,
    setViewingDonationReceipt,
    orgConfig,
    currentUser,
    t
  } = useApp();

  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [selectedCampaignForDonate, setSelectedCampaignForDonate] = useState<Campaign | null>(null);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  const [isFeatureMenuOpen, setIsFeatureMenuOpen] = useState(false);

  const handleOpenDonateForCampaign = (camp: Campaign) => {
    setSelectedCampaignForDonate(camp);
    setIsDonateModalOpen(true);
  };

  const handleOpenGeneralDonate = () => {
    setSelectedCampaignForDonate(null);
    setIsDonateModalOpen(true);
  };

  const allFeatureList = [
    { id: 'home', label: t('হোম পেজ', 'Home'), icon: HeartHandshake, color: 'text-emerald-600' },
    { id: 'donations', label: t('অনুদানের খাত', 'Donation Campaigns'), icon: DollarSign, color: 'text-emerald-600' },
    { id: 'sectors', label: t('খাতভিত্তিক তহবিল হিসাব', 'Fund Sectors Ledger'), icon: Layers, color: 'text-teal-600' },
    { id: 'ledger', label: t('স্বচ্ছ পাবলিক অডিট', 'Transparency Ledger'), icon: FileText, color: 'text-blue-600' },
    { id: 'personal', label: t('আমার সদস্য ড্যাশবোর্ড', 'My Personal Dashboard'), icon: User, color: 'text-indigo-600' },
    { id: 'volunteers', label: t('স্বেচ্ছাসেবক ও দায়িত্ব', 'Volunteers & Duties'), icon: Users, color: 'text-purple-600' },
    { id: 'chat', label: t('লাইভ চ্যাট রুম ও ১-অন-১', 'Live Chat & Messaging'), icon: MessageSquare, color: 'text-green-600' },
    { id: 'map', label: t('সাহায্য লোকেশন ম্যাপ', 'Relief Aid Map'), icon: MapPin, color: 'text-rose-600' },
    { id: 'activities', label: t('সাম্প্রতিক কাজ ও প্রমাণ', 'Recent Activities'), icon: ShieldCheck, color: 'text-amber-600' },
    { id: 'blood', label: t('রক্তদান ও জরুরি SOS', 'Blood SOS & Directory'), icon: Droplet, color: 'text-red-600' },
    { id: 'notices', label: t('অফিসিয়াল নোটিশ বোর্ড', 'Notice Board'), icon: FileText, color: 'text-sky-600' },
    { id: 'gallery', label: t('ছবি ও ভিডিও গ্যালারি', 'Photo & Video Gallery'), icon: ImageIcon, color: 'text-fuchsia-600' },
    ...(currentUser?.isAdmin
      ? [{ id: 'admin', label: t('অ্যাডমিন নিয়ন্ত্রণ প্যানেল', 'Admin Control Panel'), icon: ShieldAlert, color: 'text-amber-600' }]
      : [])
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-16 sm:pb-0">
      {/* Navbar */}
      <Navbar onOpenNotifications={() => setIsNotificationsDrawerOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Render Tab Content */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            {/* Live Clock, English, Bengali, and Islamic Hijri Calendar (Requested) */}
            {orgConfig.enabledFeatures?.showCalendarClock && (
              <CalendarClockWidget />
            )}

            {/* Virtual Meeting Hub (Zoom, Google Meet, Facebook, WhatsApp, Telegram) */}
            {orgConfig.enabledFeatures?.showVirtualMeetingStrip && (
              <VirtualMeetingStrip />
            )}

            {/* Hero Section */}
            <Hero onOpenDonate={handleOpenGeneralDonate} />

            {/* Live Financial & Impact Statistics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t('রিয়েল-টাইম তথ্য ও পরিসংখ্যান', 'Real-Time Financial & Impact Stats')}
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {t('সর্বশেষ অডিট ডাটাবেজ', 'Audited Public Database')}
                </span>
              </div>
              <StatsCounter />
            </div>

            {/* Active Donation Campaigns Preview */}
            <DonationSection onDonateToCampaign={handleOpenDonateForCampaign} />

            {/* Categorized Sector Funds Preview */}
            {orgConfig.enabledFeatures?.showSectorLedgers && (
              <SectorFinancialLedger />
            )}

            {/* Relief Location Map Section */}
            <ReliefLocationMap />

            {/* Recent Activities & Transparency Proof Feed */}
            <ActivityFeed />

            {/* Blood Donation & Emergency SOS Section */}
            <BloodDonationDirectory />

            {/* Quick Transparency Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="px-3 py-1 bg-white/20 text-emerald-200 text-xs font-bold rounded-full inline-block backdrop-blur-sm">
                  {t('১০০% উন্মুক্ত জবাবদিহিতা', '100% Public Accountability')}
                </span>
                <h3 className="text-xl sm:text-2xl font-black">
                  {t('আপনার প্রতিটি অনুদানের পূর্ণ হিসাব দেখতে চান?', 'Want to inspect every single donation & expense?')}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
                  {t(
                    'আমাদের রয়েছে উন্মুক্ত পাবলিক লেজার। সদস্যদের মাসিক ফি, ভাউচার ভিত্তিক খরচ এবং অনুদানের রশিদ অনলাইনে যাচাই করুন।',
                    'Open public ledger. Verify monthly dues, voucher expenses, and digital money receipts.'
                  )}
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('ledger');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-white hover:bg-emerald-50 rounded-xl shadow-lg transition-colors flex items-center gap-2 shrink-0"
              >
                <span>{t('আয়-ব্যয়ের স্বচ্ছ লেজার দেখুন', 'View Open Ledger')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="animate-fade-in">
            <DonationSection onDonateToCampaign={handleOpenDonateForCampaign} />
          </div>
        )}

        {activeTab === 'sectors' && (
          <div className="animate-fade-in">
            <SectorFinancialLedger />
          </div>
        )}

        {activeTab === 'ledger' && (
          <div className="animate-fade-in">
            <TransparencyLedger />
          </div>
        )}

        {activeTab === 'volunteers' && (
          <div className="animate-fade-in">
            <VolunteerDirectory />
          </div>
        )}

        {activeTab === 'personal' && (
          <div className="animate-fade-in">
            <PersonalMemberDashboard />
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="animate-fade-in">
            <LiveChatRoom />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="animate-fade-in">
            <AdminControlPanel />
          </div>
        )}

        {activeTab === 'map' && (
          <div className="animate-fade-in">
            <ReliefLocationMap />
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="animate-fade-in">
            <ActivityFeed />
          </div>
        )}

        {activeTab === 'blood' && (
          <div className="animate-fade-in">
            <BloodDonationDirectory />
          </div>
        )}

        {activeTab === 'notices' && (
          <div className="animate-fade-in">
            <NoticeBoard />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="animate-fade-in">
            <GallerySection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Premier Mobile Bottom Navigation Bar (Requested) */}
      <BottomPremierNavBar onOpenMenu={() => setIsFeatureMenuOpen(true)} />

      {/* Feature Menu Modal (When user clicks 'মেনু' from Bottom Bar) */}
      {isFeatureMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{t('ফাউন্ডেশনের সকল পৃষ্ঠা ও ফিচারসমূহ', 'All Features & Pages Directory')}</span>
              </h3>
              <button
                onClick={() => setIsFeatureMenuOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {allFeatureList.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsFeatureMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-[11px] leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <LoginModal />
      <SettingsModal />
      <DonationModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        selectedCampaign={selectedCampaignForDonate}
      />
      <DonationVoucherModal
        donation={viewingDonationReceipt}
        onClose={() => setViewingDonationReceipt(null)}
      />
      <SocialShareModal />
      <NotificationDrawer
        isOpen={isNotificationsDrawerOpen}
        onClose={() => setIsNotificationsDrawerOpen(false)}
      />

      {/* Toast Notifications Overlay */}
      <div className="fixed bottom-16 sm:bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold backdrop-blur-md transition-all animate-bounce-short ${
              toast.type === 'success'
                ? 'bg-emerald-900/90 text-white border-emerald-500'
                : toast.type === 'error'
                ? 'bg-red-900/90 text-white border-red-500'
                : toast.type === 'warning'
                ? 'bg-amber-900/90 text-white border-amber-500'
                : 'bg-slate-900/90 text-white border-slate-700'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/20 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
