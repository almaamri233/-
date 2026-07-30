import React from 'react';
import { 
  FileText, 
  Layers, 
  Workflow, 
  Zap, 
  ShieldCheck, 
  DollarSign, 
  Globe, 
  Server, 
  Database, 
  Code2, 
  Instagram, 
  Facebook, 
  MessageSquare, 
  Mail,
  ExternalLink,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { PLATFORM_CONTACTS } from '../data/mockData';

interface ArchitecturalSpecViewProps {
  language: 'ar' | 'en';
}

export const ArchitecturalSpecView: React.FC<ArchitecturalSpecViewProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      
      {/* Title Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-purple-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold font-mono">
            <Layers className="w-4 h-4" />
            {isAr ? "وثيقة الهندسة المعمارية البرمجية الشاملة (System Architecture Blueprint)" : "Enterprise System Architecture Specification"}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {isAr 
              ? "دليل المعمارية الفنية الكاملة لبناء منصة OmniFlow AI العالمية" 
              : "OmniFlow AI - Master Technical Blueprint & Software Architecture"}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {isAr 
              ? "وصف دقيق ومفصل لبناء موقع ويب وتطبيق حقيقي متكامل من أصغر المكونات إلى أكبر الهياكل البرمجية، يدمج قوة ManyChat و Meta Business Suite و Make.com و InstantDM مع أتمتة الردود على التعليقات والـ DM المباشر ونظام أديسينس الربحي."
              : "Comprehensive end-to-end technical documentation detailing the full-stack architecture, Meta Graph API webhook listeners, Make.com visual node scenario runner, InstantDM comment triggers, and Google AdSense interstitial monetization engine."}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-indigo-300 font-mono">
              Brand Name: <strong className="text-white">OmniFlow AI</strong>
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 font-mono">
              Target Scope: <strong className="text-white">Global Social Automation & Monetization</strong>
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-300 font-mono">
              Owner Email: <strong className="text-white">almaamri233@gmail.com</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Owner Contacts Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-400" />
          {isAr ? "بيانات التواصل الرسمية وروابط المنصة الاجتماعية للمبرمج" : "Official Developer & Platform Social Contact Links"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium">
          <a
            href={PLATFORM_CONTACTS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-pink-500/50 flex items-center justify-between text-slate-200 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Instagram className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
              <div>
                <span className="block font-bold text-white">إنستغرام</span>
                <span className="text-[11px] text-slate-400">@6.abov</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-pink-400" />
          </a>

          <a
            href={PLATFORM_CONTACTS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between text-slate-200 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <div>
                <span className="block font-bold text-white">واتساب مباشر</span>
                <span className="text-[11px] text-slate-400">+967782157787</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
          </a>

          <a
            href={PLATFORM_CONTACTS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between text-slate-200 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Facebook className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <div>
                <span className="block font-bold text-white">فيسبوك</span>
                <span className="text-[11px] text-slate-400">OmniFlow Official</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
          </a>

          <a
            href={`mailto:${PLATFORM_CONTACTS.email}`}
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 flex items-center justify-between text-slate-200 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <div>
                <span className="block font-bold text-white">البريد الإلكتروني</span>
                <span className="text-[11px] text-slate-400 truncate max-w-[110px]">almaamri233@gmail.com</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
          </a>
        </div>
      </div>

      {/* Section 1: The Core Unified Modules (ManyChat + Meta Suite + Make.com + InstantDM) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              1. الركائز والأقسام الرئيسية للموقع (Merged Core Architecture)
            </h3>
            <p className="text-xs text-slate-400">دمج كامل لمميزات جميع التطبيقات والمواقع الأربعة</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-300">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-indigo-300 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              أ) محرك InstantDM & ManyChat للتعليقات والخاص
            </h4>
            <p className="text-slate-400">
              - مراقبة التعليقات المباشرة على منشورات وستوريات وريلز إنستغرام وفيسبوك.
              <br />- التقاط الكلمات المفتاحية (مثل: سعر، رابط، خصم، تفاصيل، price).
              <br />- إرسال رد عام سريع على التعليق في غضون 0.2 ثانية.
              <br />- فتح محادثة خاصة (Direct Message) تلقائياً تحتوي على زر التوجيه والدفعة والتخفيضات.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-blue-300 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              ب) لوحة إدارة Meta Business Suite الموحدة
            </h4>
            <p className="text-slate-400">
              - صندوق بريد موحد (Unified Inbox) يجمع رسائل IG DMs و FB Messenger و WhatsApp Business.
              <br />- جدولة ونشر المنشورات على منصات متعددة في وقت واحد.
              <br />- توليد النصوص والكابشنز بواسطة الذكاء الاصطناعي Gemini 2.5 Flash.
              <br />- تحليلات بصرية للأداء والتفاعل ونسبة التحويل من تعليق لرسالة.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              ج) مخطط Make.com البصري للسيناريوهات (Visual Canvas)
            </h4>
            <p className="text-slate-400">
              - محرر سحب وإفلات تفاعلي لبناء سيناريوهات أتمتة لا نهائية.
              <br />- عقد (Nodes) للمشغلات (Triggers)، الملاحظات الفلترة، وتكامل الذكاء الاصطناعي.
              <br />- ربط الـ Webhooks وإرسال البيانات إلى Google Sheets أو سيرفرات خارجية.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              د) نظام AdSense الربحي والإجبار الأمن للربط
            </h4>
            <p className="text-slate-400">
              - اشتراط إجباري لربط الحساب الاجتماعي قبل السماح بتنفيذ أي عملية أتمتة.
              <br />- دمج مساحات إعلانية لجوجل ادسينس تظهر بشكل نوافذ منبثقة (Interstitial Ads) عند الضغط على أزرار التنفيذ النهائية.
              <br />- حماية أمان الحسابات وتجنب حظر Meta بالامتثال لسياسات API v20.0.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Technical Backend & Security Pipeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              2. الهيكلية الفنية للسيرفر وقواعد البيانات (Backend Stack)
            </h3>
            <p className="text-xs text-slate-400">بنية سحابية تتحمل آلاف الطلبات في الثانية دون توقف</p>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-3 font-mono">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Node.js Express Full-Stack Server:</strong> يربط بين الواجهة الأمامية React 19 والذكاء الاصطناعي Gemini ومستقبلات Webhook الخاصة بشركة ميتا.
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Single Email OAuth Identity Linking:</strong> يتم ربط الحسابات الاجتماعية (Instagram Graph API, Facebook Page, WhatsApp Cloud API) التابعة لنفس البريد الإلكتروني الموحد (<span className="text-indigo-400">almaamri233@gmail.com</span>) لحفظ الجلسات بأمان.
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Google AdSense Interstitial Monetization:</strong> تنفيذ بروتوكول فتح نافذة المعاينة الإعلانية لمدة 3 ثوانٍ قبل تأكيد تفعيل أي سيناريو، مما يوفر مصدر دخل مستمر لصاحب المنصة.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
