import React from 'react';
import { 
  Workflow, 
  Instagram, 
  Facebook, 
  MessageSquare, 
  Mail, 
  Sparkles, 
  DollarSign, 
  Globe, 
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { PLATFORM_CONTACTS } from '../data/mockData';
import { ConnectedAccount } from '../types';

interface HeaderProps {
  accounts: ConnectedAccount[];
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  adsenseEarnings: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  accounts,
  language,
  setLanguage,
  adsenseEarnings,
  activeTab,
  setActiveTab
}) => {
  const connectedCount = accounts.filter(a => a.status === 'connected').length;
  const isAr = language === 'ar';

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 backdrop-blur-md bg-slate-900/90">
      {/* Top Banner: Owner Contact & Global Links */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Owner Verified Identity & Email Detection */}
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              {isAr ? "الحساب الرئيسي الموحد:" : "Unified Master Account:"} almaamri233@gmail.com
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400">
              {isAr ? "منصة أتمتة ميتا وماني شات وميك الشاملة" : "Complete Meta & ManyChat & Make Automation Platform"}
            </span>
          </div>

          {/* Social Contact Links */}
          <div className="flex items-center gap-3">
            <span className="text-slate-500 hidden sm:inline">{isAr ? "تواصل مبرمج المنصة:" : "Dev Contact:"}</span>
            <a 
              href={PLATFORM_CONTACTS.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-pink-400 hover:text-pink-300 transition-colors"
              title="Instagram @6.abov"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">إنستغرام</span>
            </a>
            
            <a 
              href={PLATFORM_CONTACTS.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
              title="WhatsApp +967782157787"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">واتساب</span>
            </a>

            <a 
              href={PLATFORM_CONTACTS.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
              title="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">فيسبوك</span>
            </a>

            <a 
              href={`mailto:${PLATFORM_CONTACTS.email}`}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors"
              title="Email"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">إيميل</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Name & Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Workflow className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent tracking-tight">
                OmniFlow AI
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-widest">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              ManyChat + Meta Suite + Make.com + InstantDM
            </p>
          </div>
        </div>

        {/* Action Pills & Metrics */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Linked Accounts Status Pill */}
          <button
            onClick={() => setActiveTab('accounts')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-200 transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{connectedCount} {isAr ? "منصات موصولة" : "Linked Platforms"}</span>
          </button>

          {/* AdSense Earnings Live Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs font-medium text-amber-300">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{isAr ? "أرباح أديسينس:" : "AdSense Revenue:"}</span>
            <span className="font-bold">${adsenseEarnings.toFixed(2)}</span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 transition-colors"
            title="Switch Language / تغيير اللغة"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isAr ? "EN" : "العربية"}</span>
          </button>

        </div>

      </div>

      {/* Main Feature Tabs Navigation Bar */}
      <div className="bg-slate-950/80 border-t border-slate-800/60 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1 text-xs font-medium py-1">
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            📊 {isAr ? "لوحة التحكم المتكاملة (Meta Suite)" : "Dashboard (Meta Suite)"}
          </button>

          <button
            onClick={() => setActiveTab('instantdm')}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'instantdm'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            💬 {isAr ? "أتمتة التعليقات والرسائل (InstantDM & ManyChat)" : "Auto DM & Comments (ManyChat)"}
          </button>

          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'workflow'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            ⚡ {isAr ? "مخطط الأتمتة البصري (Make.com Canvas)" : "Workflow Builder (Make.com)"}
          </button>

          <button
            onClick={() => setActiveTab('publisher')}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'publisher'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            📅 {isAr ? "جدولة ونشر المنشورات + الذكاء الاصطناعي" : "Scheduler & AI Publisher"}
          </button>

          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'accounts'
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            🔗 {isAr ? "ربط الحسابات الموحد (OAuth Security)" : "Connect Social Accounts"}
          </button>

          <button
            onClick={() => setActiveTab('spec')}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'spec'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold shadow-md shadow-pink-600/30'
                : 'text-pink-400 hover:text-pink-300 hover:bg-slate-800/50'
            }`}
          >
            📜 {isAr ? "الوصف الفني المعماري الكامل لبناء الموقع" : "Full Technical Specification"}
          </button>

        </div>
      </div>
    </header>
  );
};
