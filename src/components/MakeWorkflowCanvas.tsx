import React, { useState } from 'react';
import { 
  Zap, 
  Plus, 
  Play, 
  Sparkles, 
  DollarSign, 
  Send, 
  Filter, 
  Instagram, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  Loader2,
  Settings,
  X
} from 'lucide-react';
import { MakeWorkflow, MakeWorkflowNode } from '../types';

interface MakeWorkflowCanvasProps {
  workflows: MakeWorkflow[];
  onSaveWorkflow: (wf: MakeWorkflow) => void;
  onRequestExecution: (title: string, platform?: string) => void;
  language: 'ar' | 'en';
}

export const MakeWorkflowCanvas: React.FC<MakeWorkflowCanvasProps> = ({
  workflows,
  onSaveWorkflow,
  onRequestExecution,
  language
}) => {
  const isAr = language === 'ar';
  const [activeWf, setActiveWf] = useState<MakeWorkflow>(workflows[0]);
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);

  // Run scenario simulation
  const handleRunScenario = () => {
    setIsRunningSim(true);
    setActiveNodeIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < activeWf.nodes.length) {
        setActiveNodeIndex(step);
      } else {
        clearInterval(interval);
        setIsRunningSim(false);
        setActiveNodeIndex(null);
        onRequestExecution(isAr ? `تنفيذ سيناريو الأتمتة البصري (${activeWf.name})` : `Run Scenario (${activeWf.name})`, "instagram");
      }
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              Make.com Visual Automation Canvas
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {isAr ? "مخطط الأتمتة والسيناريوهات البصرية (Visual Scenario Builder)" : "Visual Workflow Scenario Builder"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isAr 
              ? "قم بربط مشغلات الأحداث (Triggers) مع الذكاء الاصطناعي Gemini ومساحات أديسينس وحركات الـ DM التلقائية."
              : "Connect event triggers with Gemini AI, AdSense monetization checkpoints, and automated DM actions."}
          </p>
        </div>

        <button
          onClick={handleRunScenario}
          disabled={isRunningSim}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
        >
          {isRunningSim ? <Loader2 className="w-4 h-4 animate-spin text-slate-950" /> : <Play className="w-4 h-4 text-slate-950 fill-slate-950" />}
          <span>{isRunningSim ? (isAr ? "جاري المحاكاة..." : "Simulating...") : (isAr ? "تشغيل واختبار السيناريو بكتلة كاملة" : "Run Visual Scenario")}</span>
        </button>
      </div>

      {/* Workflow Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {workflows.map((wf) => (
          <button
            key={wf.id}
            onClick={() => setActiveWf(wf)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all whitespace-nowrap ${
              activeWf.id === wf.id
                ? 'bg-slate-800 text-amber-400 border-amber-500/50 shadow-md'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            ⚡ {wf.name}
          </button>
        ))}
      </div>

      {/* Make.com Style Interactive Canvas Area */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative min-h-[420px] flex flex-col justify-between overflow-x-auto">
        
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Top Canvas Toolbar */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="font-bold text-amber-400">{activeWf.name}</span>
            <span className="text-slate-500">•</span>
            <span>{activeWf.runCount} {isAr ? "مرة تشغيل" : "Total Runs"}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              ● {isAr ? "الحالة: جاهز للتنفيذ" : "Status: Ready"}
            </span>
          </div>
        </div>

        {/* Nodes Execution Pipeline */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 py-8">
          {activeWf.nodes.map((node, index) => {
            const isActive = activeNodeIndex === index;
            const isCompleted = activeNodeIndex !== null && index < activeNodeIndex;

            return (
              <React.Fragment key={node.id}>
                
                {/* Node Box */}
                <div 
                  className={`w-64 bg-slate-900 border rounded-2xl p-4 transition-all duration-300 relative shadow-xl ${
                    isActive 
                      ? 'border-amber-400 ring-4 ring-amber-500/20 scale-105 bg-slate-850'
                      : isCompleted
                      ? 'border-emerald-500/60 bg-emerald-950/10'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Step #{index + 1}
                    </span>

                    {isCompleted && (
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        {isAr ? "نجاح" : "Passed"}
                      </span>
                    )}

                    {isActive && (
                      <span className="text-[10px] text-amber-300 animate-pulse font-bold">
                        ⚡ {isAr ? "تنفيذ..." : "Running..."}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${node.color || 'from-indigo-500 to-purple-600'} flex items-center justify-center text-white shrink-0 shadow-md`}>
                      {node.type === 'trigger' && <Instagram className="w-5 h-5" />}
                      {node.type === 'adsense_check' && <DollarSign className="w-5 h-5" />}
                      {node.type === 'ai_gemini' && <Sparkles className="w-5 h-5" />}
                      {node.type === 'action' && <Send className="w-5 h-5" />}
                      {node.type === 'filter' && <Filter className="w-5 h-5" />}
                    </div>

                    <div>
                      <h4 className="font-bold text-xs text-white">
                        {node.label}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                        {node.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connector Arrow */}
                {index < activeWf.nodes.length - 1 && (
                  <div className="flex items-center justify-center text-slate-600">
                    <ArrowRight className="w-6 h-6 animate-pulse text-amber-500/80" />
                  </div>
                )}

              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom Specs & Action Bar */}
        <div className="relative z-10 border-t border-slate-800/80 pt-4 mt-6 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div>
            {isAr ? "المسار التفاعلي: استلام تعليق -> التحقق الإعلاني AdSense -> تحليل الذكاء الاصطناعي -> إرسال DM" : "Pipeline: Comment Received -> AdSense Verification -> AI Sentiment -> Send DM"}
          </div>

          <button
            onClick={handleRunScenario}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
          >
            <span>{isAr ? "اختبار السيناريو مع نافذة AdSense الإعلانية" : "Test Flow with AdSense Interstitial"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
