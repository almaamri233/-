import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Play, 
  Instagram, 
  Facebook, 
  CheckCircle2, 
  Phone, 
  Link2, 
  Plus, 
  Trash2,
  RefreshCw,
  Zap,
  DollarSign
} from 'lucide-react';
import { CommentTriggerCampaign, SocialPlatform } from '../types';

interface InstantDMBuilderProps {
  campaigns: CommentTriggerCampaign[];
  onSaveCampaign: (campaign: CommentTriggerCampaign) => void;
  onRequestExecution: (title: string, platform?: string) => void;
  language: 'ar' | 'en';
}

export const InstantDMBuilder: React.FC<InstantDMBuilderProps> = ({
  campaigns,
  onSaveCampaign,
  onRequestExecution,
  language
}) => {
  const isAr = language === 'ar';

  const [selectedCampaign, setSelectedCampaign] = useState<CommentTriggerCampaign>(campaigns[0]);
  const [testCommentInput, setTestCommentInput] = useState('');
  const [simulatedReplies, setSimulatedReplies] = useState<{ comment: string; reply: string; dmSent: boolean }[]>([]);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // New Keyword input
  const [newKeyword, setNewKeyword] = useState('');

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) return;
    if (!selectedCampaign.keywords.includes(newKeyword.trim())) {
      const updated = {
        ...selectedCampaign,
        keywords: [...selectedCampaign.keywords, newKeyword.trim()]
      };
      setSelectedCampaign(updated);
      onSaveCampaign(updated);
    }
    setNewKeyword('');
  };

  const handleRemoveKeyword = (kwToRemove: string) => {
    const updated = {
      ...selectedCampaign,
      keywords: selectedCampaign.keywords.filter(k => k !== kwToRemove)
    };
    setSelectedCampaign(updated);
    onSaveCampaign(updated);
  };

  // Generate AI Public Reply & DM Message using Gemini API route `/api/gemini/generate`
  const handleGenerateAiReplies = async () => {
    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `انشئ رد تعليق ورسالة خاصة تلقائية لمنتج منشور إنستغرام بكلمة مفتاحية '${selectedCampaign.keywords[0] || 'سعر'}'`,
          type: 'comment_reply'
        })
      });
      const data = await res.json();
      if (data.reply) {
        const updated = {
          ...selectedCampaign,
          publicCommentReply: data.reply,
          privateDMMessage: data.dmText || selectedCampaign.privateDMMessage
        };
        setSelectedCampaign(updated);
        onSaveCampaign(updated);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Test simulator comment submission
  const handleSimulateComment = () => {
    if (!testCommentInput.trim()) return;
    const text = testCommentInput.trim();
    
    // Check if keyword matched
    const isMatched = selectedCampaign.keywords.some(kw => text.toLowerCase().includes(kw.toLowerCase()));
    
    setSimulatedReplies(prev => [
      ...prev,
      {
        comment: text,
        reply: isMatched 
          ? selectedCampaign.publicCommentReply 
          : (isAr ? "شكراً لتعليقك! اكتب 'سعر' أو 'رابط' لتصلك التفاصيل المباشرة." : "Thanks for commenting! Write 'price' or 'link' for DM details."),
        dmSent: isMatched
      }
    ]);

    setTestCommentInput('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-semibold">
              InstantDM & ManyChat Engine
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {isAr ? "محرر أتمتة التعليقات والرسائل الخاصة (Comment-to-DM)" : "InstantDM Auto-Responder Builder"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isAr 
              ? "قم بربط المنشورات واكتشاف الكلمات المفتاحية في التعليقات للرد الآلي الفوري وإرسال روابط الشراء في الخاصة."
              : "Detect comment keywords on Instagram/Facebook posts to send instant direct messages with custom CTA links."}
          </p>
        </div>

        <button
          onClick={() => onRequestExecution(isAr ? `تفعيل أتمتة الحملة (${selectedCampaign.title})` : `Deploy Campaign (${selectedCampaign.title})`, selectedCampaign.platform)}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-pink-600/30 transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>{isAr ? "تفعيل الأتمتة النهائي (مع إعلان AdSense)" : "Deploy Automation (with AdSense)"}</span>
        </button>
      </div>

      {/* Campaign Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {campaigns.map((camp) => (
          <button
            key={camp.id}
            onClick={() => setSelectedCampaign(camp)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              selectedCampaign.id === camp.id
                ? 'bg-slate-800 text-pink-400 border-pink-500/50 shadow-md shadow-pink-500/10'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            {camp.platform === 'instagram' ? <Instagram className="w-3.5 h-3.5 text-pink-400" /> : <Facebook className="w-3.5 h-3.5 text-blue-400" />}
            <span>{camp.title}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Campaign Editor (Left) & Live Simulator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Editor Form (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          
          {/* Post Media Header */}
          <div className="flex items-center gap-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <img 
              src={selectedCampaign.postMediaUrl} 
              alt="Post preview" 
              className="w-16 h-16 rounded-lg object-cover border border-slate-700 shrink-0" 
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold text-pink-400 font-mono">
                {selectedCampaign.platform} • {selectedCampaign.triggerType}
              </span>
              <p className="text-xs text-slate-300 font-medium truncate mt-0.5">
                {selectedCampaign.postCaption}
              </p>
            </div>
          </div>

          {/* Trigger Keywords Input Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
              <span>{isAr ? "1. الكلمات المفتاحية المستهدفة (Trigger Keywords):" : "1. Trigger Keywords:"}</span>
              <span className="text-[11px] text-slate-400 font-normal">
                {isAr ? "اكتب الكلمة واضغط إضافة" : "Type keyword & click add"}
              </span>
            </label>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                placeholder={isAr ? "مثال: سعر ، رابط ، خصم ، تفاصيل" : "e.g. price, link, discount"}
                className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleAddKeyword}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? "إضافة" : "Add"}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {selectedCampaign.keywords.map((kw, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold"
                >
                  <span>"{kw}"</span>
                  <button 
                    onClick={() => handleRemoveKeyword(kw)} 
                    className="hover:text-rose-400 transition-colors ml-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Public Comment Reply Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200">
                {isAr ? "2. الرد التلقائي العام على التعليق (Public Comment Reply):" : "2. Public Comment Reply:"}
              </label>

              <button
                onClick={handleGenerateAiReplies}
                disabled={isGeneratingAI}
                className="text-xs text-amber-300 hover:text-amber-200 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30 flex items-center gap-1 font-medium transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isGeneratingAI ? (isAr ? "جاري التوليد..." : "Generating...") : (isAr ? "توليد بالذكاء الاصطناعي" : "AI Generate")}</span>
              </button>
            </div>

            <textarea
              value={selectedCampaign.publicCommentReply}
              onChange={(e) => {
                const updated = { ...selectedCampaign, publicCommentReply: e.target.value };
                setSelectedCampaign(updated);
                onSaveCampaign(updated);
              }}
              rows={2}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Private DM Message Editor */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-200">
              {isAr ? "3. الرسالة الخاصة التلقائية (Private Direct Message):" : "3. Private Direct Message (DM):"}
            </label>

            <textarea
              value={selectedCampaign.privateDMMessage}
              onChange={(e) => {
                const updated = { ...selectedCampaign, privateDMMessage: e.target.value };
                setSelectedCampaign(updated);
                onSaveCampaign(updated);
              }}
              rows={3}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* CTA Button Label & Target URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {isAr ? "نص الزر في الخاص:" : "DM Button Label:"}
              </label>
              <input
                type="text"
                value={selectedCampaign.dmButtonLabel}
                onChange={(e) => {
                  const updated = { ...selectedCampaign, dmButtonLabel: e.target.value };
                  setSelectedCampaign(updated);
                  onSaveCampaign(updated);
                }}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2.5 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {isAr ? "رابط التوجيه (Target URL):" : "Target URL:"}
              </label>
              <input
                type="text"
                value={selectedCampaign.dmTargetUrl}
                onChange={(e) => {
                  const updated = { ...selectedCampaign, dmTargetUrl: e.target.value };
                  setSelectedCampaign(updated);
                  onSaveCampaign(updated);
                }}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2.5 text-xs text-slate-100 font-mono"
              />
            </div>
          </div>

        </div>

        {/* Live Interactive Phone Frame Simulator (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-start">
          <div className="w-full max-w-sm bg-slate-950 border-4 border-slate-800 rounded-[36px] shadow-2xl p-4 overflow-hidden relative space-y-3">
            
            {/* Phone Top Notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-1" />

            {/* Instagram Header Mock */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span className="font-bold text-xs text-slate-200">@6.abov</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">● InstantDM Live</span>
            </div>

            {/* Post Feed Simulation */}
            <div className="bg-slate-900 rounded-xl p-2.5 border border-slate-800/80 space-y-2">
              <img 
                src={selectedCampaign.postMediaUrl} 
                alt="Post" 
                className="w-full h-36 rounded-lg object-cover" 
              />
              <p className="text-[11px] text-slate-300 line-clamp-2">
                {selectedCampaign.postCaption}
              </p>
            </div>

            {/* Test Comment Box */}
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold block">
                {isAr ? "جرب كتابة تعليق لاختبار الأتمتة المباشرة:" : "Test commenting live:"}
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={testCommentInput}
                  onChange={(e) => setTestCommentInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSimulateComment()}
                  placeholder={isAr ? `اكتب '${selectedCampaign.keywords[0] || 'سعر'}' هنا...` : "Type keyword..."}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <button
                  onClick={handleSimulateComment}
                  className="px-3 py-1.5 bg-pink-600 text-white rounded-lg text-xs font-bold shrink-0"
                >
                  {isAr ? "إرسال" : "Send"}
                </button>
              </div>
            </div>

            {/* Simulated Live Feed Log */}
            <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 space-y-2 max-h-48 overflow-y-auto">
              <span className="text-[10px] font-bold text-indigo-400 block border-b border-slate-800 pb-1">
                {isAr ? "سجل الردود والرسائل التلقائية:" : "Live DM & Reply Log:"}
              </span>

              {simulatedReplies.length === 0 ? (
                <p className="text-[11px] text-slate-500 text-center py-4">
                  {isAr ? "اكتب تعليقاً أعلاه لمشاهدة الرد الآلي وتنبيه الـ DM المباشر!" : "Type a comment above to see instant DM reply!"}
                </p>
              ) : (
                simulatedReplies.map((item, idx) => (
                  <div key={idx} className="space-y-1 text-xs border-b border-slate-800/60 pb-2">
                    <div className="text-slate-300 font-medium flex items-center justify-between">
                      <span>💬 {isAr ? "تعليق العميل:" : "User:"} "{item.comment}"</span>
                    </div>

                    <div className="text-pink-300 bg-pink-500/10 p-1.5 rounded text-[11px] border border-pink-500/20">
                      ⚡ {isAr ? "رد البوت العام:" : "Bot Reply:"} {item.reply}
                    </div>

                    {item.dmSent && (
                      <div className="bg-emerald-500/10 text-emerald-300 p-2 rounded text-[11px] border border-emerald-500/30 flex items-start gap-1.5 animate-fade-in">
                        <Send className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[10px] text-emerald-400">{isAr ? "وصلت رسالة خاصة في الـ DM:" : "DM Delivered:"}</strong>
                          <p>{selectedCampaign.privateDMMessage}</p>
                          <a 
                            href={selectedCampaign.dmTargetUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block mt-1 px-2 py-0.5 bg-emerald-500 text-slate-950 font-bold rounded text-[10px]"
                          >
                            {selectedCampaign.dmButtonLabel}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
