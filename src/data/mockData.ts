import { ConnectedAccount, CommentTriggerCampaign, MakeWorkflow, ScheduledPost, ContactInfo } from '../types';

export const PLATFORM_CONTACTS: ContactInfo = {
  instagram: "https://www.instagram.com/6.abov?igsh=MXM1cWg0aGNibWczZA==",
  whatsapp: "https://wa.me/+967782157787",
  facebook: "https://www.facebook.com/share/192kMki13g/",
  email: "almaamri233@gmail.com"
};

export const INITIAL_ACCOUNTS: ConnectedAccount[] = [
  {
    id: "acc_ig_1",
    platform: "instagram",
    name: "OmniFlow Official IG",
    handle: "@6.abov",
    avatar: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150&auto=format&fit=crop&q=80",
    status: "connected",
    linkedEmail: "almaamri233@gmail.com",
    connectedAt: "2026-07-01",
    followersCount: "48.2K",
    businessAccountId: "ig_biz_889210",
    permissions: ["instagram_basic", "instagram_manage_comments", "instagram_manage_messages", "pages_show_list"],
    tokenExpiresAt: "2026-09-29 (Long-Lived Token v20.0)"
  },
  {
    id: "acc_fb_1",
    platform: "facebook",
    name: "OmniFlow Business Page",
    handle: "OmniFlow Meta Page",
    avatar: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80",
    status: "connected",
    linkedEmail: "almaamri233@gmail.com",
    connectedAt: "2026-07-01",
    followersCount: "29.4K",
    pageId: "fb_page_100293",
    permissions: ["pages_read_engagement", "pages_manage_posts", "pages_messaging", "pages_show_list"],
    tokenExpiresAt: "2026-09-29 (Long-Lived Token v20.0)"
  },
  {
    id: "acc_wa_1",
    platform: "whatsapp",
    name: "OmniFlow WhatsApp Business",
    handle: "+967782157787",
    avatar: "https://images.unsplash.com/photo-1614680376593-902f749f71c3?w=150&auto=format&fit=crop&q=80",
    status: "connected",
    linkedEmail: "almaamri233@gmail.com",
    connectedAt: "2026-07-02",
    followersCount: "12.8K contacts",
    permissions: ["whatsapp_business_messaging", "whatsapp_business_management"],
    tokenExpiresAt: "2026-12-31 (System User Permanent Token)"
  },
  {
    id: "acc_tk_1",
    platform: "tiktok",
    name: "OmniFlow TikTok Pro",
    handle: "@omniflow_official",
    avatar: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=150&auto=format&fit=crop&q=80",
    status: "disconnected",
    linkedEmail: "almaamri233@gmail.com",
    connectedAt: "-",
    followersCount: "0",
    permissions: [],
    tokenExpiresAt: "Not Connected"
  }
];

export const INITIAL_CAMPAIGNS: CommentTriggerCampaign[] = [
  {
    id: "camp_1",
    title: "حملة أتمتة خصم الكورس الشامل (اكتب 'سعر' أو 'خصم')",
    platform: "instagram",
    postId: "post_ig_901",
    postMediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    postCaption: "🔥 الكورس الشامل لبناء وتطوير التطبيقات وأتمتة التسويق! اكتب كلمة 'سعر' أو 'خصم' في التعليقات ليصلك العرض الحصري فوراً على الخاص! 🚀",
    keywords: ["سعر", "خصم", "تفاصيل", "رابط", "price", "discount"],
    triggerType: "comment",
    publicCommentReply: "أهلاً بك! 👋 تم إرسال كافة التفاصيل ورابط الخصم الحصري إلى رسائلك الخاصة الآن. تفقد الـ DM ✨",
    privateDMMessage: "مرحباً بك! يسعدنا اهتمامك. إليك رابط الخصم 50% لجميع الأدوات والأتمتة الحصرية:",
    dmButtonLabel: "احصل على الخصم الآن 🎁",
    dmTargetUrl: "https://omniflow.ai/special-offer",
    status: "active",
    totalCommentsProcessed: 1420,
    totalDMsSent: 1398,
    totalClicks: 942,
    createdAt: "2026-07-10"
  },
  {
    id: "camp_2",
    title: "أتمتة إرسال كتالوج المنتجات على فيسبوك إنبوكس",
    platform: "facebook",
    postId: "post_fb_302",
    postMediaUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    postCaption: "الجيل الجديد من حلول الأتمتة والتحليلات للمشاريع الرقمية. اكتب 'ملف' أو 'كتالوج' لتصلك نسخة PDF المباشرة.",
    keywords: ["ملف", "كتالوج", "pdf", "تحميل"],
    triggerType: "comment",
    publicCommentReply: "تم إرسال رابط تحميل الكتالوج المباشر في رسالة خاصة لصفحتك! 📄✨",
    privateDMMessage: "أهلاً بك عزيزي! تفضل برابط تحميل ملف التعريف الكامل والكتالوج الإلكتروني:",
    dmButtonLabel: "تحميل الكتالوج PDF 📂",
    dmTargetUrl: "https://omniflow.ai/catalog.pdf",
    status: "active",
    totalCommentsProcessed: 890,
    totalDMsSent: 885,
    totalClicks: 612,
    createdAt: "2026-07-15"
  },
  {
    id: "camp_3",
    title: "رد ستوري إنستغرام التفاعلي - رابط القناة السرية",
    platform: "instagram",
    postId: "story_ig_004",
    postMediaUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80",
    postCaption: "رد على هذه الستوري بكلمة 'سر' للانضمام لقناتنا الخاصة بتحديثات الأتمتة والذكاء الاصطناعي!",
    keywords: ["سر", "سرية", "قناة", "انضمام"],
    triggerType: "story_reply",
    publicCommentReply: "شكر لتفاعلك! تفقد الرسائل الخاصة للانضمام.",
    privateDMMessage: "أهلاً وسهلاً بك في مجتمع OmniFlow! رابط الانضمام لقناة التليجرام والواتساب الحصرية:",
    dmButtonLabel: "الانضمام للقناة مجاناً 🚀",
    dmTargetUrl: "https://wa.me/+967782157787",
    status: "active",
    totalCommentsProcessed: 640,
    totalDMsSent: 635,
    totalClicks: 510,
    createdAt: "2026-07-20"
  }
];

export const INITIAL_WORKFLOWS: MakeWorkflow[] = [
  {
    id: "wf_1",
    name: "سيناريو أتمتة التعليقات والذكاء الاصطناعي مع تحليلات AdSense",
    description: "استقبال تعليقات إنستغرام -> تحليل شعور العميل عبر Gemini AI -> إرسال DM تلقائي -> تسجيل في Google Sheets",
    isEnabled: true,
    runCount: 2840,
    lastRunAt: "منذ دقيقتين",
    nodes: [
      {
        id: "node_1",
        type: "trigger",
        label: "إنستغرام / فيسبوك تعليق جديد",
        description: "مراقبة منشورات إنستغرام لردود الكلمات المفتاحية",
        config: { platform: "instagram", event: "new_comment" },
        position: { x: 50, y: 150 },
        iconName: "Instagram",
        color: "from-pink-500 to-rose-600"
      },
      {
        id: "node_2",
        type: "adsense_check",
        label: "التحقق من AdSense & Monetization",
        description: "عرض المساحة الإعلانية وتسجيل الانطباع مع حماية السياسات",
        config: { adsenseSlot: "action_interstitial_slot" },
        position: { x: 300, y: 150 },
        iconName: "DollarSign",
        color: "from-amber-500 to-emerald-600"
      },
      {
        id: "node_3",
        type: "ai_gemini",
        label: "Gemini 2.5 AI Sentiment & Reply",
        description: "توليد رد الذكاء الاصطناعي وتخصيص الرسالة حسب اهتمام العميل",
        config: { model: "gemini-2.5-flash", autoPersonalize: true },
        position: { x: 550, y: 150 },
        iconName: "Sparkles",
        color: "from-purple-600 to-indigo-600"
      },
      {
        id: "node_4",
        type: "action",
        label: "إرسال رسالة خاصة InstantDM",
        description: "إرسال الرسالة مع زر الرابط والخصم عبر الميسنجر والإنستغرام",
        config: { action: "send_direct_message", includeButton: true },
        position: { x: 800, y: 150 },
        iconName: "Send",
        color: "from-blue-500 to-cyan-500"
      }
    ],
    edges: [
      { id: "e1", source: "node_1", target: "node_2" },
      { id: "e2", source: "node_2", target: "node_3" },
      { id: "e3", source: "node_3", target: "node_4" }
    ]
  },
  {
    id: "wf_2",
    name: "إرسال تنبيه واتساب عند طلب تسعيرة جديد",
    description: "استقبال رسالة واتساب -> الرد التلقائي عبر بوت الواتساب الرسمي -> تحويل العميل لمسؤول المبيعات",
    isEnabled: true,
    runCount: 1120,
    lastRunAt: "منذ 15 دقيقة",
    nodes: [
      {
        id: "node_wa_1",
        type: "trigger",
        label: "رسالة واتساب جديدة",
        description: "التقاط الرسائل المباشرة عبر API +967782157787",
        config: { platform: "whatsapp" },
        position: { x: 50, y: 150 },
        iconName: "MessageCircle",
        color: "from-emerald-500 to-teal-600"
      },
      {
        id: "node_wa_2",
        type: "filter",
        label: "فلتر الكلمات المفتاحية",
        description: "التحقق من وجود الكلمات: 'سعر', 'طلب', 'شراء'",
        config: { keywords: ["سعر", "طلب", "شراء"] },
        position: { x: 300, y: 150 },
        iconName: "Filter",
        color: "from-amber-500 to-orange-500"
      },
      {
        id: "node_wa_3",
        type: "action",
        label: "رد واتساب آلي سريع",
        description: "إرسال القائمة التفاعلية والخيارات مع رابط فيسبوك وإنستغرام",
        config: { replyType: "interactive_buttons" },
        position: { x: 550, y: 150 },
        iconName: "CheckCircle2",
        color: "from-blue-600 to-indigo-600"
      }
    ],
    edges: [
      { id: "e_wa1", source: "node_wa_1", target: "node_wa_2" },
      { id: "e_wa2", source: "node_wa_2", target: "node_wa_3" }
    ]
  }
];

export const INITIAL_POSTS: ScheduledPost[] = [
  {
    id: "post_1",
    platforms: ["instagram", "facebook"],
    content: "🚀 ثورة الأتمتة التسويقية وصلت! اربط حساباتك الآن وقم بإنشاء سيناريوهات الرد التلقائي على التعليقات والرسائل بضغطة زر. اكتب 'تجربة' للتفاصيل!",
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    scheduledTime: "2026-07-30 18:00",
    status: "published",
    autoDMAttached: true,
    keywordTrigger: "تجربة",
    likesCount: 1240,
    commentsCount: 382
  },
  {
    id: "post_2",
    platforms: ["instagram", "whatsapp"],
    content: "💡 كيف تضاعف مبيعات متجرك باستخدام أتمتة InstantDM و Make.com بدون أي تدين بشري؟ شاهد الفيديو واستفد من الخصم!",
    mediaUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    scheduledTime: "2026-08-01 20:00",
    status: "scheduled",
    autoDMAttached: true,
    keywordTrigger: "فيديو",
    likesCount: 0,
    commentsCount: 0
  }
];
