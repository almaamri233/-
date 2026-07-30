import React, { useState } from 'react';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { InstantDMBuilder } from './components/InstantDMBuilder';
import { MakeWorkflowCanvas } from './components/MakeWorkflowCanvas';
import { MetaPublisher } from './components/MetaPublisher';
import { AccountsManager } from './components/AccountsManager';
import { ArchitecturalSpecView } from './components/ArchitecturalSpecView';
import { AdSenseModalInterstitial } from './components/AdSenseModalInterstitial';

import { 
  INITIAL_ACCOUNTS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_WORKFLOWS, 
  INITIAL_POSTS, 
  PLATFORM_CONTACTS 
} from './data/mockData';
import { 
  ConnectedAccount, 
  CommentTriggerCampaign, 
  MakeWorkflow, 
  ScheduledPost 
} from './types';

export default function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [accounts, setAccounts] = useState<ConnectedAccount[]>(INITIAL_ACCOUNTS);
  const [campaigns, setCampaigns] = useState<CommentTriggerCampaign[]>(INITIAL_CAMPAIGNS);
  const [workflows, setWorkflows] = useState<MakeWorkflow[]>(INITIAL_WORKFLOWS);
  const [posts, setPosts] = useState<ScheduledPost[]>(INITIAL_POSTS);

  const [adsenseEarnings, setAdsenseEarnings] = useState<number>(42.85);

  // AdSense Interstitial execution modal state
  const [isAdSenseModalOpen, setIsAdSenseModalOpen] = useState(false);
  const [pendingExecutionTitle, setPendingExecutionTitle] = useState('');
  const [pendingExecutionPlatform, setPendingExecutionPlatform] = useState('instagram');
  const [executionSuccessNotification, setExecutionSuccessNotification] = useState<string | null>(null);

  const isAr = language === 'ar';

  const handleToggleAccount = (id: string) => {
    setAccounts(prev => prev.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === 'connected' ? 'disconnected' : 'connected';
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  const handleAddAccount = (newAccount: ConnectedAccount) => {
    setAccounts(prev => [...prev, newAccount]);
  };

  const handleSaveCampaign = (updated: CommentTriggerCampaign) => {
    setCampaigns(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleSaveWorkflow = (updated: MakeWorkflow) => {
    setWorkflows(prev => prev.map(w => w.id === updated.id ? updated : w));
  };

  const handleAddPost = (post: ScheduledPost) => {
    setPosts(prev => [post, ...prev]);
  };

  // Trigger Action Execution with AdSense Interstitial Modal Guard
  const handleRequestExecution = (title: string, platform: string = 'instagram') => {
    setPendingExecutionTitle(title);
    setPendingExecutionPlatform(platform);
    setIsAdSenseModalOpen(true);
  };

  const handleConfirmExecution = () => {
    setExecutionSuccessNotification(
      isAr 
        ? `تم تنفيذ العملية بنجاح: "${pendingExecutionTitle}" مع تسجيل أرباح إعلان Google AdSense!`
        : `Successfully executed: "${pendingExecutionTitle}" and logged AdSense impression!`
    );

    setTimeout(() => {
      setExecutionSuccessNotification(null);
    }, 5000);
  };

  const handleAdRevenueEarned = (amount: number) => {
    setAdsenseEarnings(prev => prev + amount);
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans ${isAr ? 'rtl' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Top Header */}
      <Header
        accounts={accounts}
        language={language}
        setLanguage={setLanguage}
        adsenseEarnings={adsenseEarnings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Success Notification Banner */}
        {executionSuccessNotification && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-4 rounded-xl mb-6 flex items-center justify-between text-xs font-bold animate-bounce shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{executionSuccessNotification}</span>
            </div>
            <button 
              onClick={() => setExecutionSuccessNotification(null)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab Content Renderer */}
        {activeTab === 'dashboard' && (
          <DashboardOverview
            accounts={accounts}
            campaigns={campaigns}
            workflows={workflows}
            adsenseEarnings={adsenseEarnings}
            onNavigateTab={setActiveTab}
            onRequestExecution={handleRequestExecution}
            language={language}
          />
        )}

        {activeTab === 'instantdm' && (
          <InstantDMBuilder
            campaigns={campaigns}
            onSaveCampaign={handleSaveCampaign}
            onRequestExecution={handleRequestExecution}
            language={language}
          />
        )}

        {activeTab === 'workflow' && (
          <MakeWorkflowCanvas
            workflows={workflows}
            onSaveWorkflow={handleSaveWorkflow}
            onRequestExecution={handleRequestExecution}
            language={language}
          />
        )}

        {activeTab === 'publisher' && (
          <MetaPublisher
            posts={posts}
            onAddPost={handleAddPost}
            onRequestExecution={handleRequestExecution}
            language={language}
          />
        )}

        {activeTab === 'accounts' && (
          <AccountsManager
            accounts={accounts}
            onToggleAccount={handleToggleAccount}
            onAddAccount={handleAddAccount}
            language={language}
          />
        )}

        {activeTab === 'spec' && (
          <ArchitecturalSpecView
            language={language}
          />
        )}

      </main>

      {/* AdSense Execution Interstitial Modal */}
      <AdSenseModalInterstitial
        isOpen={isAdSenseModalOpen}
        onClose={() => setIsAdSenseModalOpen(false)}
        onConfirmExecution={handleConfirmExecution}
        actionTitle={pendingExecutionTitle}
        accounts={accounts}
        requiredPlatform={pendingExecutionPlatform}
        onNavigateToAccounts={() => setActiveTab('accounts')}
        onAdRevenueEarned={handleAdRevenueEarned}
        language={language}
      />

      {/* Global Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-12 text-xs text-slate-400 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-300">
            OmniFlow AI © 2026 — Unified ManyChat + Meta Suite + Make.com + InstantDM Platform
          </p>
          <p className="text-[11px] text-slate-500">
            {isAr ? "الحساب الرئيسي الموحد:" : "Master Identity:"} <span className="text-indigo-400 font-mono">almaamri233@gmail.com</span> | WhatsApp: <span className="text-emerald-400 font-mono">+967782157787</span> | Instagram: <span className="text-pink-400 font-mono">@6.abov</span>
          </p>
        </div>
      </footer>

    </div>
  );
}
