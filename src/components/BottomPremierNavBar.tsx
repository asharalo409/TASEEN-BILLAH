import React from 'react';
import { useApp } from '../context/AppContext';
import {
  HeartHandshake,
  DollarSign,
  Layers,
  MessageSquare,
  User,
  ShieldAlert,
  Menu,
  Droplet,
  MapPin
} from 'lucide-react';

interface Props {
  onOpenMenu: () => void;
}

export const BottomPremierNavBar: React.FC<Props> = ({ onOpenMenu }) => {
  const { activeTab, setActiveTab, currentUser, t } = useApp();

  const navItems = [
    { id: 'home', label: t('হোম', 'Home'), icon: HeartHandshake },
    { id: 'donations', label: t('অনুদানের খাত', 'Donate'), icon: DollarSign },
    { id: 'sectors', label: t('খাত হিসাব', 'Sectors'), icon: Layers },
    { id: 'chat', label: t('লাইভ চ্যাট', 'Chat'), icon: MessageSquare },
    { id: 'personal', label: t('ড্যাশবোর্ড', 'Dashboard'), icon: User },
    ...(currentUser?.isAdmin
      ? [{ id: 'admin', label: t('অ্যাডমিন', 'Admin'), icon: ShieldAlert }]
      : [])
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 shadow-2xl py-1.5 px-3">
      <div className="max-w-xl mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] mt-0.5 whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}

        {/* Feature Menu Button */}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-all"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 whitespace-nowrap">{t('মেনু', 'Menu')}</span>
        </button>
      </div>
    </nav>
  );
};
