import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  ShieldAlert, 
  X, 
  Loader2, 
  ArrowLeft, 
  ArrowRight,
  Lock
} from 'lucide-react';
import { ConnectedAccount } from '../types';

interface AdSenseModalInterstitialProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmExecution: () => void;
  actionTitle: string;
  accounts: ConnectedAccount[];
  requiredPlatform?: string;
  onNavigateToAccounts: () => void;
  onAdRevenueEarned: (amount: number) => void;
  language: 'ar' | 'en';
}

export const AdSenseModalInterstitial: React.FC<AdSenseModalInterstitialProps> = ({
  isOpen,
  onClose,
  onConfirmExecution,
  actionTitle,
  accounts,
  requiredPlatform = 'instagram',
  onNavigateToAccounts,
  onAdRevenueEarned,
  language
}) => {
  const [countdown, setCountdown] = useState(3);
  const [isReadyToExecute, setIsReadyToExecute] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [adClicked, setAdClicked] = useState(false);

  const isAr = language === 'ar';

  // Check if at least one social account is connected
  const hasConnectedAccounts = accounts.some(a => a.status === 'connected');
  const matchingAccount = accounts.find(a => a.platform === requiredPlatform && a.status === 'connected') || accounts.find(a => a.status === 'connected');

  useEffect(() => {
    let timer: any;
    if (isOpen && hasConnectedAccounts) {
      setCountdown(3);
      setIsReadyToExecute(false);
      setIsExecuting(false);
      setAdClicked(false);

      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsReadyToExecute(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, hasConnectedAccounts]);

  if (!isOpen) return null;

  const handleAdClick = () => {
    if (!adClicked) {
      setAdClicked(true);
      onAdRevenueEarned(0.65); // Add $0.65 for AdSense ad interaction
    }
  };

  const handleExecute = () => {
    setIsExecuting(true);
    onAdRevenueEarned(0.25); // Impression reward
    setTimeout(() => {
      setIsExecuting(false);
      onConfirmExecution();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden text-slate-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 left-4 text-slate-400 hover:text-slate-200 p-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Guardrail Check */}
        {!hasConnectedAccounts ? (
          /* Guardrail Warning: Account Connection Mandatory before automation */
          <div className="text-center space-y-4 my-2">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <Lock className="w-8 h-8" />
            </div>
            
            <h3 className="text-xl font-bold text-white">
              {isAr ? "ربط الحساب الاجتماعي إجباري أولاً!" : "Social Account Link Required First!"}
            </h3>

            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              {isAr ? (
                <>
                  لا يمكن تفعيل الأتمتة الإجبارية للعملية: <strong className="text-amber-400">{actionTitle}</strong> دون ربط حسابك الاجتماعي الموحد على المنصة بريد الإلكتروني الرئيسي (<span className="text-indigo-400 font-mono">almaamri233@gmail.com</span>).
                </>
              ) : (
                <>
                  Cannot activate automation for <strong className="text-amber-400">{actionTitle}</strong> without connecting your verified social account first.
                </>
              )}
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-right space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{isAr ? "شروط الأتمتة والأمان في OmniFlow AI:" : "OmniFlow Automation Requirements:"}</span>
              </div>
              <ul className="list-disc list-inside text-slate-400 space-y-1 pr-2">
                <li>{isAr ? "يجب تسديد أذونات Meta Graph API v20.0 لحساب إنستغرام أو فيسبوك." : "Must authorize Meta Graph API permissions."}</li>
                <li>{isAr ? "يجب أن تكون المنصة مسجلة بنفس البريد الإلكتروني الموحد." : "Must match single email identity."}</li>
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
              >
                {isAr ? "إلغاء" : "Cancel"}
              </button>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToAccounts();
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <span>{isAr ? "الانتقال لصفحة ربط الحسابات الآن" : "Go to Connect Accounts Page"}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ) : (
          /* Social Account Verified -> Show Google AdSense Interstitial Modal Before Final Execution */
          <div className="space-y-4">
            
            {/* Top Verified Account Banner */}
            <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-medium">
                  {isAr ? "حساب موثق وموصول:" : "Verified Connected Account:"} {matchingAccount?.handle || "@6.abov"}
                </span>
              </div>
              <span className="text-slate-400 text-[11px]">almaamri233@gmail.com</span>
            </div>

            {/* Action Title */}
            <div className="text-center pt-1">
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-semibold">
                {isAr ? "تأكيد التنفيذ النهائي مع الإعلان" : "Final Execution Interstitial"}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {actionTitle}
              </h3>
            </div>

            {/* Google AdSense Interstitial Banner Block */}
            <div className="bg-slate-950 border border-amber-500/40 rounded-xl p-4 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 mb-2">
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Google AdSense Interstitial #ca-pub-882019/interstitial
                </span>
                <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                  Sponsored Ad
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shrink-0 text-white font-bold text-xl shadow-lg">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-100">
                      {isAr ? "أدوات الذكاء الاصطناعي والأتمتة الاحترافية لربط المتاجر" : "Enterprise AI & E-commerce Automation Toolkit"}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {isAr ? "قم بزيادة معدل تحويل التعليقات لرسائل إلى 92% واستخدم سيرفرات فائقة السرعة مع ضمان حماية الحسابات من الحظر." : "Maximize InstantDM response rates to 92% with dedicated webhook servers."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400">
                    {adClicked ? (isAr ? "تم تسجيل تفاعلك الإعلاني (+$0.65)!" : "Ad Click Verified (+$0.65)!") : (isAr ? "انقر على الإعلان لدعم خوادم الأتمتة" : "Click ad to support automation servers")}
                  </span>
                  
                  <a
                    href="https://omniflow.ai/ad-sponsor-click"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleAdClick}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>{isAr ? "زيارة العرض المميز" : "Visit Featured Sponsor"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Countdown / Execute Button Section */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
              >
                {isAr ? "إلغاء العملية" : "Cancel Process"}
              </button>

              <button
                onClick={handleExecute}
                disabled={!isReadyToExecute || isExecuting}
                className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
                  isReadyToExecute
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-emerald-500/20 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                {isExecuting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>{isAr ? "جاري تنفيذ الأتمتة..." : "Executing Automation..."}</span>
                  </>
                ) : !isReadyToExecute ? (
                  <>
                    <span>{isAr ? `يرجى انتظار المعاينة الإعلانية (${countdown}ث)` : `Please wait (${countdown}s)`}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>{isAr ? "موافقة وتنفيذ الأتمتة الآن 🚀" : "Approve & Execute Now 🚀"}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
