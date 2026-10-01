import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HeartHandshake,
  Moon,
  Sun,
  Bell,
  Menu,
  X,
  User,
  Settings,
  Share2,
  WifiOff,
  LogOut,
  KeyRound,
  ShieldCheck,
  Droplet,
  MapPin,
  FileText,
  Image as ImageIcon,
  DollarSign,
  Users,
  Layers,
  MessageSquare,
  ShieldAlert,
  Globe,
  Video
} from 'lucide-react';

interface NavbarProps {
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications }) => {
  const {
    activeTab,
    setActiveTab,
    language,
    setLanguage,
    t,
    darkMode,
    toggleDarkMode,
    isOnline,
    orgConfig,
    currentUser,
    logout,
    setIsLoginModalOpen,
    setIsSettingsModalOpen,
    openShareModal,
    unreadNotifsCount
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('হোম', 'Home'), icon: HeartHandshake },
    { id: 'donations', label: t('অনুদানের খাত', 'Donations'), icon: DollarSign },
    { id: 'sectors', label: t('খাত খতিয়ান', 'Sector Funds'), icon: Layers },
    { id: 'ledger', label: t('স্বচ্ছ আয়-ব্যয়', 'Transparency'), icon: FileText },
    { id: 'volunteers', label: t('স্বেচ্ছাসেবক ও দায়িত্ব', 'Volunteers'), icon: Users },
    { id: 'personal', label: t('সদস্য ড্যাশবোর্ড', 'My Dashboard'), icon: User },
    { id: 'chat', label: t('লাইভ চ্যাট', 'Live Chat'), icon: MessageSquare },
    { id: 'map', label: t('সাহায্য ম্যাপ', 'Relief Map'), icon: MapPin },
    { id: 'activities', label: t('সাম্প্রতিক কাজ ও প্রমাণ', 'Activities'), icon: ShieldCheck },
    { id: 'blood', label: t('রক্তদান SOS', 'Blood SOS'), icon: Droplet },
    { id: 'notices', label: t('নোটিশ', 'Notices'), icon: FileText },
    { id: 'gallery', label: t('গ্যালারি', 'Gallery'), icon: ImageIcon },
    ...(currentUser?.isAdmin
      ? [{ id: 'admin', label: t('অ্যাডমিন প্যানেল', 'Admin Panel'), icon: ShieldAlert }]
      : [])
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Offline Alert Strip */}
      {!isOnline && (
        <div className="bg-amber-600 text-white text-xs py-1 px-4 text-center flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5 animate-pulse" />
          <span>{t('অফলাইন মোড সক্রিয় — সংরক্ষিত ডেটা প্রদর্শিত হচ্ছে।', 'Offline mode active — displaying cached data.')}</span>
        </div>
      )}

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Foundation Info */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center p-1.5 shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src={orgConfig.logoUrl}
                alt={orgConfig.orgName}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {language === 'en' ? orgConfig.orgNameEn || orgConfig.orgName : orgConfig.orgName}
                </h1>
                <span className="hidden sm:inline-block text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                  {t('স্বচ্ছ সমাজকল্যাণ', 'Non-profit Welfare')}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-xs sm:max-w-md">
                {language === 'en' ? orgConfig.sloganEn || orgConfig.slogan : orgConfig.slogan}
              </p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              title={language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
              className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-200 hover:text-emerald-600 transition-colors flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'bn' ? 'EN' : 'বাং'}</span>
            </button>

            {/* Share App Button */}
            <button
              onClick={() =>
                openShareModal(
                  orgConfig.orgName,
                  `${orgConfig.orgName} - ${orgConfig.slogan}। মানবতার সেবায় আমাদের পাশে থাকুন।`
                )
              }
              title="শেয়ার করুন"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              title="নোটিফিকেশন"
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] text-[10px] font-bold text-white bg-red-600 rounded-full flex items-center justify-center px-1 animate-pulse">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              title={darkMode ? 'লাইট মোড চালু করুন' : 'ডার্ক মোড চালু করুন'}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Settings (Brand, Logo, Cover, Meeting Links & Customization) */}
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              title="ফাউন্ডেশন সেটিংস ও মিটিং লিংক"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* User Session / Login Button */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 pl-1 border-l border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => handleNavClick('personal')}
                  className="flex items-center gap-2 text-left p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  title="আমার ড্যাশবোর্ড"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full border border-emerald-500 object-cover"
                  />
                  <div className="hidden lg:block">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                      {currentUser.role}
                    </p>
                  </div>
                </button>
                <button
                  onClick={logout}
                  title="লগআউট"
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 rounded-lg transition-colors"
              >
                <KeyRound className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t('সিক্রেট কোড লগইন', 'Secret Code Login')}</span>
              </button>
            )}

            {/* Primary Donate CTA */}
            <button
              onClick={() => handleNavClick('donations')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 shadow-md shadow-emerald-600/20 rounded-lg transition-all transform active:scale-95"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{t('দান করুন', 'Donate')}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links Strip */}
        <nav className="hidden lg:flex items-center gap-1 py-2 overflow-x-auto no-scrollbar border-t border-slate-100 dark:border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 shadow-xl space-y-2 max-h-[85vh] overflow-y-auto">
          {!currentUser && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                  {t('সদস্য বা ভলান্টিয়ার?', 'Member or Volunteer?')}
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  {t('সিক্রেট কোড দিয়ে প্রবেশ করুন বা ফ্রী অ্যাকাউন্ট খুলুন', 'Login with Secret Code or create free account')}
                </p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg"
              >
                {t('লগইন', 'Login')}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
