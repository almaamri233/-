import React, { useState } from 'react';
import { 
  Send, 
  Sparkles, 
  Calendar, 
  Instagram, 
  Facebook, 
  MessageSquare, 
  Image as ImageIcon, 
  Clock, 
  CheckCircle2, 
  Zap,
  DollarSign
} from 'lucide-react';
import { ScheduledPost, SocialPlatform } from '../types';

interface MetaPublisherProps {
  posts: ScheduledPost[];
  onAddPost: (post: ScheduledPost) => void;
  onRequestExecution: (title: string, platform?: string) => void;
  language: 'ar' | 'en';
}

export const MetaPublisher: React.FC<MetaPublisherProps> = ({
  posts,
  onAddPost,
  onRequestExecution,
  language
}) => {
  const isAr = language === 'ar';

  const [postText, setPostText] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(['instagram', 'facebook']);
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80');
  const [attachKeyword, setAttachKeyword] = useState('سعر');
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);

  const togglePlatform = (p: SocialPlatform) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(x => x !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  // Generate AI Caption using Gemini
  const handleGenerateAiCaption = async () => {
    setIsGeneratingCaption(true);
    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `اكتب منشور إنستغرام وفيسبوك تسويقي بأسلوب احترافي لأتمتة العروض مع حث المتابعين لكتابة كلمة '${attachKeyword || 'سعر'}' في التعليقات.`,
          type: 'post_caption'
        })
      });
      const data = await res.json();
      if (data.result) {
        setPostText(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  const handlePublishNow = () => {
    if (!postText.trim()) return;

    const newPost: ScheduledPost = {
      id: `post_${Date.now()}`,
      platforms: selectedPlatforms,
      content: postText,
      mediaUrl,
      scheduledTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'published',
      autoDMAttached: true,
      keywordTrigger: attachKeyword,
      likesCount: 1,
      commentsCount: 0
    };

    onAddPost(newPost);
    onRequestExecution(isAr ? `نشر المنشور فوراً على (${selectedPlatforms.join(', ')})` : `Publish Post Now (${selectedPlatforms.join(', ')})`, selectedPlatforms[0]);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
              Meta Business Suite Scheduler & Publisher
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {isAr ? "جدولة ونشر المنشورات مع ربط الأتمتة المباشرة" : "Meta Business Suite Publisher & Scheduler"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isAr 
              ? "أنشئ منشورات لـ إنستغرام وفيسبوك وواتساب، واستخدم الذكاء الاصطناعي لكتابة النصوص وتفعيل InstantDM تلقائياً."
              : "Create posts for IG, FB, and WhatsApp with AI text generators and auto-attached InstantDM comment triggers."}
          </p>
        </div>
      </div>

      {/* Publisher Grid: Creator Form (Left 7 cols) & Scheduled Queue (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Post Creator Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          
          {/* Target Platforms Picker */}
          <div>
            <label className="text-xs font-bold text-slate-200 block mb-2">
              {isAr ? "1. اختر المنصات المستهدفة للنشر:" : "1. Select Target Platforms:"}
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => togglePlatform('instagram')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                  selectedPlatforms.includes('instagram')
                    ? 'bg-pink-600 text-white border-pink-500 shadow-md shadow-pink-600/30'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram Feed & Reels</span>
              </button>

              <button
                onClick={() => togglePlatform('facebook')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                  selectedPlatforms.includes('facebook')
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook Page</span>
              </button>

              <button
                onClick={() => togglePlatform('whatsapp')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                  selectedPlatforms.includes('whatsapp')
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Broadcast</span>
              </button>
            </div>
          </div>

          {/* AI Content Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200">
                {isAr ? "2. محتوى المنشور:" : "2. Post Content & Caption:"}
              </label>

              <button
                onClick={handleGenerateAiCaption}
                disabled={isGeneratingCaption}
                className="text-xs text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1 rounded-lg border border-amber-500/30 flex items-center gap-1.5 font-bold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isGeneratingCaption ? (isAr ? "جاري التوليد..." : "Generating...") : (isAr ? "توليد كابشن بالذكاء الاصطناعي (Gemini)" : "AI Gemini Caption")}</span>
              </button>
            </div>

            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder={isAr ? "اكتب محتوى المنشور هنا أو اضغط توليد بالذكاء الاصطناعي..." : "Write post content here or click AI Gemini Caption..."}
              rows={4}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Media URL & Attached Keyword */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {isAr ? "رابط صورة / فيديو المنشور:" : "Media Image URL:"}
              </label>
              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2.5 text-xs text-slate-100 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {isAr ? "ربط كلمة الأتمتة المباشرة (InstantDM Trigger):" : "Auto DM Keyword Trigger:"}
              </label>
              <input
                type="text"
                value={attachKeyword}
                onChange={(e) => setAttachKeyword(e.target.value)}
                placeholder={isAr ? "مثال: سعر ، رابط" : "e.g. price"}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2.5 text-xs text-slate-100 font-bold"
              />
            </div>
          </div>

          {/* Action Execution Button */}
          <button
            onClick={handlePublishNow}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{isAr ? "نشر المنشور الآن (مع فتح المعاينة الإعلانية AdSense)" : "Publish Post Now (with AdSense Interstitial)"}</span>
          </button>

        </div>

        {/* Scheduled Posts Timeline Queue */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              {isAr ? "سجل المنشورات المجدولة والمنشورة" : "Published & Scheduled Queue"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr ? "تتبع حالة المنشورات والأتمتة المربوطة بها" : "Track posts and linked InstantDM triggers"}
            </p>
          </div>

          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    {post.platforms.map((p, idx) => (
                      <span key={idx} className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {p}
                      </span>
                    ))}
                  </div>
                  <span className="text-emerald-400 font-medium text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {post.status}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  {post.mediaUrl && (
                    <img src={post.mediaUrl} alt="Media" className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0" />
                  )}
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {post.content}
                  </p>
                </div>

                {post.keywordTrigger && (
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[11px] text-pink-300 flex items-center justify-between">
                    <span>⚡ {isAr ? "الأتمتة المربوطة:" : "Linked Trigger:"} "{post.keywordTrigger}"</span>
                    <span className="text-slate-500 font-mono">{post.scheduledTime}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
