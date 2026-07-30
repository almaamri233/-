import React, { useState } from 'react';
import { DollarSign, ExternalLink, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface AdSenseBannerProps {
  placement: 'top_header' | 'inline' | 'sidebar' | 'interstitial_inside';
  onAdClicked?: () => void;
  language?: 'ar' | 'en';
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  placement,
  onAdClicked,
  language = 'ar'
}) => {
  const [clicked, setClicked] = useState(false);
  const isAr = language === 'ar';

  const handleClick = () => {
    setClicked(true);
    if (onAdClicked) {
      onAdClicked();
    }
  };

  if (placement === 'top_header') {
    return (
      <div className="w-full bg-slate-900/90 border border-amber-500/30 rounded-xl p-3 my-3 shadow-lg shadow-amber-500/5 relative overflow-hidden">
        <div className="flex items-center justify-between text-[11px] text-amber-400/80 mb-1.5 font-mono">
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {isAr ? "مساحة إعلانية ممولة - Google AdSense (Slot #ca-pub-882019)" : "Google AdSense Slot #ca-pub-882019"}
          </span>
          <span className="text-slate-500">{isAr ? "إعلان موثوق" : "Ads by Google"}</span>
        </div>

        <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-bold text-lg shadow-md">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                {isAr ? "استضافة سيرفرات سريعة جداً لأتمتة التسويق والذكاء الاصطناعي" : "Ultra-Fast AI & Automation Cloud Hosting"}
                <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 py-0.2 rounded border border-amber-500/30">
                  Ad
                </span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {isAr ? "احصل على خصم 70% وتغطية 99.99% لسيرفرات الـ Webhooks والـ API المباشرة" : "Get 70% discount for high-throughput webhook servers & Meta API execution."}
              </p>
            </div>
          </div>

          <a
            href="https://omniflow.ai/ad-sponsor"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
          >
            <span>{clicked ? (isAr ? "تم تسجيل النقرة +$0.45" : "Click Logged +$0.45") : (isAr ? "احصل على العرض الان" : "Get Offer Now")}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  if (placement === 'sidebar') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 my-4 relative">
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2 font-mono">
          <span>Google AdSense 300x250</span>
          <span className="text-amber-400 font-semibold">{isAr ? "إعلان راعي" : "Sponsor Ad"}</span>
        </div>
        <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h5 className="font-bold text-sm text-slate-200">
              {isAr ? "منصة استخراج البيانات وتحليلات Meta Graph API" : "Meta Graph API Analytics Suite"}
            </h5>
            <p className="text-xs text-slate-400 mt-1">
              {isAr ? "ربط تلقائي لملايين الحسابات وتوليد الردود المباشرة بنقرة واحدة." : "Connect millions of accounts with automated DM responders."}
            </p>
          </div>
          <button
            onClick={handleClick}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium text-xs rounded-lg border border-slate-700 transition-colors"
          >
            {clicked ? (isAr ? "تم التفاعل مع الإعلان ✓" : "Ad Clicked ✓") : (isAr ? "تصفح إعلان الشريك" : "Visit Sponsor")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3 my-2 text-xs">
      <div className="flex items-center justify-between text-[11px] text-amber-400 mb-1 font-mono">
        <span>Google AdSense Banner Integration</span>
        <span>Ad ID: #90218</span>
      </div>
      <p className="text-slate-300">
        {isAr ? "إعلان شريك المنصة الحصري: ادعم تطوير الخوادم بالنقر والتفاعل." : "Exclusive Platform Sponsor: Support server development by visiting offer."}
      </p>
    </div>
  );
};
