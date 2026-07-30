import React from 'react';
import { 
  MessageSquare, 
  Send, 
  TrendingUp, 
  Zap, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowUpRight,
  Plus,
  Play
} from 'lucide-react';
import { ConnectedAccount, CommentTriggerCampaign, MakeWorkflow } from '../types';
import { AdSenseBanner } from './AdSenseBanner';

interface DashboardOverviewProps {
  accounts: ConnectedAccount[];
  campaigns: CommentTriggerCampaign[];
  workflows: MakeWorkflow[];
  adsenseEarnings: number;
  onNavigateTab: (tab: string) => void;
  onRequestExecution: (title: string, platform?: string) => void;
  language: 'ar' | 'en';
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  accounts,
  campaigns,
  workflows,
  adsenseEarnings,
  onNavigateTab,
  onRequestExecution,
  language
}) => {
  const isAr = language === 'ar';

  const totalDMs = campaigns.reduce((acc, c) => acc + c.totalDMsSent, 0);
  const totalComments = campaigns.reduce((acc, c) => acc + c.totalCommentsProcessed, 0);
  const conversionRate = totalComments > 0 ? ((totalDMs / totalComments) * 100).toFixed(1) : "98.5";

  return (
    <div className="space-y-6">
      
      {/* Top Welcome & Quick Actions Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isAr ? "نظام موحد نشط لـ almaamri233@gmail.com" : "Unified Active System for almaamri233@gmail.com"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isAr ? "مركز التحكم الشامل والأتمتة الذكية" : "Unified Intelligence & Automation Suite"}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              {isAr 
                ? "يجمع بين مزايا ManyChat للرد الآلي، Meta Business Suite لإدارة البريد والمنشورات، و Make.com للأتمتة البصرية وسيناريوهات InstantDM."
                : "Combining ManyChat auto-responses, Meta Business Suite inbox/scheduler, and Make.com visual automation workflows."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigateTab('instantdm')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? "حملة تعليقات جديدة (InstantDM)" : "New Comment Campaign"}</span>
            </button>

            <button
              onClick={() => onRequestExecution(isAr ? "اختبار أتمتة الرد المباشر السريع" : "Test Fast Auto-Responder Flow", "instagram")}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <Play className="w-4 h-4 text-amber-400" />
              <span>{isAr ? "اختبار الأتمتة المباشرة" : "Test Instant DM Flow"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Top Banner Google AdSense Integration */}
      <AdSenseBanner placement="top_header" language={language} />

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{isAr ? "إجمالي التعليقات المعالجة" : "Comments Processed"}</span>
            <MessageSquare className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalComments.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+24.8% {isAr ? "هذا الأسبوع" : "this week"}</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{isAr ? "الرسائل المباشرة (DMs) المرسلة" : "Direct Messages Sent"}</span>
            <Send className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalDMs.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+31.2% {isAr ? "تسليم آلي فورى" : "instant delivery"}</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{isAr ? "معدل التحويل (Comment -> DM)" : "Conversion Rate"}</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{conversionRate}%</div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
            <span>{isAr ? "تحويل آلي ممتاز" : "High Conversion"}</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">{isAr ? "أرباح AdSense والروابط" : "AdSense Revenue"}</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">${adsenseEarnings.toFixed(2)}</div>
          <div className="flex items-center gap-1 text-[11px] text-amber-300/80 mt-1">
            <span>{isAr ? "مفعل عند التنفيذ" : "Monetized Action Calls"}</span>
          </div>
        </div>

      </div>

      {/* Main Content Split: Campaigns Status & Make.com Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Active InstantDM Campaigns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div>
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                {isAr ? "حملات الأتمتة المباشرة للتعليقات والـ DM (InstantDM)" : "Active InstantDM Campaigns"}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {isAr ? "مراقبة الكلمات المفتاحية والرد التلقائي في الخاص والتعليقات" : "Keyword trigger monitoring and auto comment/DM replies"}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('instantdm')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>{isAr ? "عرض الكل" : "View All"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div 
                key={campaign.id} 
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={campaign.postMediaUrl} 
                      alt="Post" 
                      className="w-12 h-12 rounded-lg object-cover border border-slate-700" 
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20">
                        {campaign.platform} • {campaign.triggerType}
                      </span>
                      <h4 className="font-bold text-sm text-slate-200 mt-1">
                        {campaign.title}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => onRequestExecution(isAr ? `تشغيل وتجربة حملة (${campaign.title})` : `Test Campaign (${campaign.title})`, campaign.platform)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3 h-3 text-indigo-400" />
                    <span>{isAr ? "اختبار وتنفيذ" : "Execute Test"}</span>
                  </button>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium">{isAr ? "الكلمات المفتاحية:" : "Keywords:"}</span>
                  {campaign.keywords.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700 font-mono text-[11px]">
                      "{kw}"
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
                  <span>{isAr ? "تم إرسال DMs:" : "DMs Sent:"} <strong className="text-slate-200">{campaign.totalDMsSent}</strong></span>
                  <span>{isAr ? "نقرات الرابط:" : "Clicks:"} <strong className="text-emerald-400">{campaign.totalClicks}</strong></span>
                  <span className="text-emerald-400 font-medium">● {isAr ? "نشط ومراقب" : "Active & Live"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1/3): Make.com Style Visual Scenarios Overview */}
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              {isAr ? "سيناريوهات Make.com النشطة" : "Active Make.com Scenarios"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr ? "تسلسل الخطوات والأتمتة المتعددة" : "Multi-step automated workflows"}
            </p>
          </div>

          <div className="space-y-3">
            {workflows.map((wf) => (
              <div 
                key={wf.id} 
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {wf.nodes.length} {isAr ? "عقدة أتمتة" : "Nodes"}
                  </span>
                  <span className="text-xs text-slate-400">{wf.lastRunAt}</span>
                </div>

                <h4 className="font-bold text-sm text-slate-200">
                  {wf.name}
                </h4>
                
                <p className="text-xs text-slate-400 line-clamp-2">
                  {wf.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-xs text-slate-400">
                    {isAr ? "تم التشغيل:" : "Runs:"} <strong className="text-white">{wf.runCount}</strong>
                  </span>
                  <button
                    onClick={() => onNavigateTab('workflow')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                  >
                    <span>{isAr ? "فتح المخطط" : "Open Canvas"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* AdSense Sidebar Slot */}
          <AdSenseBanner placement="sidebar" language={language} />

        </div>

      </div>

    </div>
  );
};
