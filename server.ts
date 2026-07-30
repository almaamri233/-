import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API lazily
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", appName: "OmniFlow AI", timestamp: new Date().toISOString() });
});

// AI Caption & Smart Reply Generator using Gemini
app.post("/api/gemini/generate", async (req, res) => {
  try {
    const { prompt, type } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback mock responses if API key is not yet set
      if (type === "comment_reply") {
        return res.json({
          reply: "مرحباً بك! 👋 تم إرسال كافة التفاصيل ورابط الخصم الحصري في الرسائل الخاصة. افحص صندوق الرسائل الآن! ✨",
          dmText: "أهلاً وسهلاً بك! بناءً على تعليقك، إليك رابط العرض الخاص: https://omniflow.ai/deal-2026 🔥"
        });
      }
      return res.json({
        result: `✨ منشور إبداعي تم توليده بالذكاء الاصطناعي حول: "${prompt || "عروض وتسويق اتوماتيكي"}"\n\n🚀 استفد من أتمتة الردود المباشرة وزد مبيعاتك بنسبة 300%! \n💬 اكتب "رابط" في التعليقات لتحصل على التفاصيل فوراً!\n\n#OmniFlowAI #ManyChat #MetaBusiness #InstantDM #أتمتة_التسويق`
      });
    }

    const systemInstruction = type === "comment_reply"
      ? "أنت خبير أتمتة تسويق عبر إنستغرام وفيسبوك (مثل ManyChat و InstantDM). قم بإنشاء رد تعليق جذاب وقصير جداً باللغة العربية، بالإضافة إلى نص رسالة خاصة (DM) تتضمن رابط وهدية مجانية."
      : "أنت كاتب محتوى محترف للمنصات الاجتماعية (Meta Business Suite style). أنشئ منشوراً تسويقياً جذاباً مع هاشتاجات ودعوة للتفاعل (CTA) لكتابة كلمة مفتاحية في التعليقات.";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt || "اكتب منشور تسويقي لأتمتة الرسائل",
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ result: response.text || "تم الإنشاء بنجاح" });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error?.message || "فشل توليد المحتوى بالذكاء الاصطناعي" });
  }
});

// Social Account Single Email Connection Simulation API
app.post("/api/social/connect", (req, res) => {
  const { platform, email, accessToken } = req.body;
  
  res.json({
    success: true,
    platform,
    email: email || "almaamri233@gmail.com",
    connectedAt: new Date().toISOString(),
    accountDetails: {
      id: `${platform}_usr_89214`,
      username: `@${platform}_official`,
      followers: platform === "instagram" ? "42.5K" : "18.2K",
      status: "active_verified",
      permissions: ["instagram_manage_comments", "pages_messaging", "whatsapp_business_messaging"]
    }
  });
});

// Workflow execution simulation endpoint
app.post("/api/automation/test-trigger", (req, res) => {
  const { flowName, keyword, targetPost } = req.body;
  
  res.json({
    success: true,
    executionId: `exec_${Math.random().toString(36).substring(2, 9)}`,
    flowName,
    keywordMatched: keyword || "سعر",
    actionsExecuted: [
      { step: "1. Comment Keyword Detected", status: "success", timestamp: "0.02s" },
      { step: "2. AdSense Impression Logged", status: "success", timestamp: "0.05s" },
      { step: "3. Auto Comment Reply Posted", status: "success", timestamp: "0.12s" },
      { step: "4. Direct Message (DM) Sent to User", status: "success", timestamp: "0.24s" },
      { step: "5. Lead Saved to OmniFlow Database", status: "success", timestamp: "0.31s" }
    ]
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
