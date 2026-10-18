import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Minimize2, 
  Maximize2, 
  Compass, 
  Zap, 
  BookOpen, 
  Brain, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// Helper to render markdown bolding, bullets, and line breaks cleanly (Fix 7 of UX Audit)
export const renderFormattedMessage = (content: string) => {
  const lines = content.split('\n');
  return (
    <div className="space-y-2 leading-relaxed">
      {lines.map((line, idx) => {
        if (!line.trim()) return <div key={idx} className="h-1.5" />;

        // Check if line is bullet item
        const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
        const cleanLine = isBullet ? line.trim().substring(2) : line;

        // Parse **bold** markers
        const parts = cleanLine.split(/(\*\*[^*]+\*\*)/g);

        const renderedLine = parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const inner = part.slice(2, -2);
            return (
              <strong key={pIdx} className="font-bold text-amber-300">
                {inner}
              </strong>
            );
          }
          return <span key={pIdx}>{part}</span>;
        });

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 text-emerald-100/90">
              <span className="text-amber-400 font-bold shrink-0">·</span>
              <div>{renderedLine}</div>
            </div>
          );
        }

        return <p key={idx} className="text-emerald-50/95">{renderedLine}</p>;
      })}
    </div>
  );
};

export const PersistentAiCoachDock: React.FC = () => {
  const { 
    isAiCoachOpen, 
    setIsAiCoachOpen, 
    activeTab, 
    setActiveTab, 
    lifeStage, 
    culturalRegion, 
    user, 
    diagnostic, 
    streakDays,
    t,
    openPauseModal,
    addChatMessage,
    chatMessages,
    memoryVault,
    userDocuments,
    reflectiveSentiment,
    setReflectiveSentiment
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'model'; content: string }>>([
    {
      role: 'model',
      content: `Greetings ${user.name || 'Leader'}. I am your RAL Socratic Coach, grounded in RK Vedant's doctrine.\n\nI see you are exploring for **${lifeStage.toUpperCase()}**. Take a deep breath. What leadership situation or conversation is currently calling for inner clarity?`
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAiCoachOpen) {
      scrollToBottom();
    }
  }, [messages, isAiCoachOpen, isLoading]);

  // Contextual proactive prompt tips based on activeTab (Cleanly stacked as per UX audit)
  const getContextualPrompts = () => {
    switch (activeTab) {
      case 'home':
        return [
          "How do I apply the 6-stage cycle to a heated disagreement?",
          "Guide me through a 10-second state calibration pause",
          "What is the difference between speed and true clarity?"
        ];
      case 'diagnostic':
        return [
          "How do I interpret my weakest matrix node?",
          "What is the 7-day micro-intervention protocol?",
          "How does emotional regulation affect cognitive flexibility?"
        ];
      case 'learn':
        return [
          "Explain why instinct fails in modern leadership",
          "Summarize Chapter 6: The Reflective-Adaptive Turning Point",
          "What are the 4 Non-Negotiables of RAL?"
        ];
      case 'practice':
        return [
          "Help me reframe an urgent deadline without panicking",
          "How do I practice 'State before Strategy' today?",
          "Give me an exercise to break autopilot decision-making"
        ];
      case 'simulator':
        return [
          "Simulate a hostile boardroom budget reduction meeting",
          "What question breaks a defensive stakeholder's stance?",
          "How do I lead through digitally accelerated uncertainty?"
        ];
      default:
        return [
          "Help me align my inner state right now",
          "What is the core law of Reflective Adaptive Leadership?",
          "Guide me through the 4-2-6 breathing technique"
        ];
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          userProfile: {
            name: user.name,
            title: user.title,
            sector: user.sector,
            lifeStage: user.lifeStage,
            culturalRegion: user.culturalRegion,
            experienceYears: user.experienceYears,
            weakestMatrix: diagnostic?.weakestMatrix
          },
          memoryVault: memoryVault || [],
          userDocuments: userDocuments || [],
          sentiment: reflectiveSentiment,
          history: messages.slice(-6).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      const replyContent = data.reply || "Pause. Let us observe the situation with clarity: What is the primary fact here, and what is your emotional interpretation?";
      setMessages(prev => [...prev, { role: 'model', content: replyContent }]);
      addChatMessage({ role: 'user', content: text });
      addChatMessage({ role: 'model', content: replyContent });
    } catch (err) {
      // Socratic fallback grounded in RAL doctrine
      const fallbackReply = `**State before strategy.** When facing this challenge, take a slow 10-second breath (4-2-6). Notice where you feel tension in your body, and ask yourself:\n- **The Fact:** What is verifiable without assumption?\n- **The Emotion:** What feeling is currently driving my urgency?\n- **The Reframe:** If this were pure information rather than threat, what does it reveal?`;
      setMessages(prev => [...prev, { role: 'model', content: fallbackReply }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAiCoachOpen) {
    return (
      <aside aria-label="RAL AI Assistant Dock" className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40">
        <button
          onClick={() => setIsAiCoachOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-[#0e4936] hover:from-emerald-500 hover:to-emerald-600 text-slate-100 font-semibold text-xs shadow-2xl border border-emerald-400/40 glow-emerald transition transform hover:scale-105 active:scale-95 min-h-[44px]"
          title={t.coach.dockTooltip}
        >
          <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs">
            <Sparkles size={14} className="text-slate-950" />
          </div>
          <span className="font-heading tracking-wide hidden sm:inline">RAL AI Coach</span>
          <span className="text-[10px] uppercase font-bold text-amber-300 px-1.5 py-0.5 rounded bg-amber-400/20 border border-amber-400/30">
            Socratic
          </span>
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="RAL AI Assistant Dock" className="fixed bottom-4 right-4 sm:right-6 z-50 w-[94vw] sm:w-[440px] max-w-[450px] h-[580px] max-h-[85vh] bg-[#07241b] border border-[#1b4d3b] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-emerald-50 animate-fadeIn">
      {/* Top Bar */}
      <div className="px-4 py-3 bg-[#051a13] border-b border-[#134233] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xs text-slate-100">RAL Socratic Coach</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 uppercase font-semibold">
                {activeTab}
              </span>
            </div>
            <p className="text-[10px] text-emerald-300/70">
              Grounded in RK Vedant's RAL Doctrine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setActiveTab('coach');
              setIsAiCoachOpen(false);
            }}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-emerald-100 hover:bg-[#0c3327] transition text-[11px] flex items-center gap-1 min-h-[44px] min-w-[36px]"
            title="Open in full screen"
          >
            <Maximize2 size={15} />
          </button>
          <button
            onClick={() => setIsAiCoachOpen(false)}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-emerald-100 hover:bg-[#0c3327] transition min-h-[44px] min-w-[36px] flex items-center justify-center"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* Context Badge & Sentiment Quick Selector */}
      <div className="px-4 py-1.5 bg-[#0a2f24] border-b border-[#123a2e] flex items-center justify-between text-[11px] text-emerald-200/80 shrink-0">
        <span>Tailored for: <strong className="text-amber-300 capitalize">{lifeStage}</strong></span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-emerald-300/70">Mood:</span>
          <select
            value={reflectiveSentiment}
            onChange={(e) => setReflectiveSentiment(e.target.value as any)}
            className="bg-[#051a13] border border-[#144234] rounded px-1.5 py-0.5 text-[10px] text-amber-300 focus:outline-none"
            title="Calibrate Reflective Sentiment"
          >
            <option value="centered">🧘 Centered</option>
            <option value="reflective">🌌 Reflective</option>
            <option value="overwhelmed">🌊 Overwhelmed</option>
            <option value="agitated">⚡ Agitated</option>
            <option value="depleted">🍃 Depleted</option>
          </select>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[90%] rounded-2xl px-4 py-3 leading-relaxed ${
                m.role === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium'
                  : 'bg-[#092c21] border border-[#144234] text-emerald-100 shadow-md'
              }`}
            >
              {m.role === 'user' ? (
                <div className="whitespace-pre-wrap">{m.content}</div>
              ) : (
                renderFormattedMessage(m.content)
              )}
            </div>
          </div>
        ))}

        {/* Clear thinking state indicator as requested by UX audit Fix 7 */}
        {isLoading && (
          <div className="flex items-center gap-2.5 text-amber-300 text-xs py-2 px-3 rounded-xl bg-[#092c21] border border-[#144234] animate-pulse">
            <Sparkles size={14} className="animate-spin text-amber-400" />
            <span className="font-medium">{t.coach.thinking}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Stacked Proactive Prompts (Fix 7 of UX Audit: stacked cleanly, no run-off) */}
      <div className="px-3 py-2 bg-[#061e16] border-t border-[#12382c] space-y-1.5 max-h-32 overflow-y-auto shrink-0">
        <span className="text-[10px] uppercase font-bold text-emerald-400/70 block">
          Suggested Socratic Reflections:
        </span>
        <div className="flex flex-col gap-1.5">
          {getContextualPrompts().map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="text-left px-3 py-1.5 rounded-xl bg-[#092a20] hover:bg-[#0c3528] text-emerald-100 border border-[#144234] text-[11px] transition leading-snug flex items-center justify-between group"
            >
              <span>{p}</span>
              <ChevronDown size={12} className="-rotate-90 text-amber-400/60 group-hover:text-amber-300 shrink-0 ml-1" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-3 bg-[#051a13] border-t border-[#134233] flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask for guidance, pause calibration, or reframe..."
          className="flex-1 bg-[#092c21] border border-[#144234] rounded-xl px-3 py-2.5 text-xs text-slate-100 placeholder:text-emerald-400/50 focus:outline-none focus:border-amber-400 min-h-[44px]"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputMessage.trim() || isLoading}
          className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold transition min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Send message"
        >
          <Send size={16} />
        </button>
      </div>
    </aside>
  );
};
