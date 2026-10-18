import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  MessageSquare, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  RefreshCw, 
  Compass, 
  BookOpen, 
  ArrowRight,
  ShieldCheck,
  Brain,
  Quote
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DailyAffirmation } from '../types';

// Curated canonical daily affirmations from RK Vedant's RAL doctrine
const CURATED_AFFIRMATIONS: DailyAffirmation[] = [
  {
    id: 'canon-1',
    dateKey: '2026-10-07',
    quote: "Reaction creates speed; reflection creates velocity. Today, do not mistake internal anxiety for external urgency.",
    inquiry: "What strategic decision are you currently rushing because you are uncomfortable holding ambiguity?",
    microAction: "Before answering your most contentious email or message today, take a 10-second (4-2-6) diaphragmatic pause.",
    chapterRef: "Chapter 4: The 4 Non-Negotiables of RAL",
    matrixAnchor: "ADG",
    principle: "Clarity Before Speed",
    authorCitation: "RK Vedant, Reflective Adaptive Leadership"
  },
  {
    id: 'canon-2',
    dateKey: '2026-10-08',
    quote: "Leadership collapses internally before it collapses externally. Measure and stabilise your inner state before attempting to direct others.",
    inquiry: "Where are you currently operating from defensive self-protection rather than anchored presence?",
    microAction: "Audit your physical posture during your next sync: drop your shoulders, release jaw tension, and connect with your breathing axis.",
    chapterRef: "Chapter 1: The Invisible Axis",
    matrixAnchor: "LSTM",
    principle: "State Before Strategy",
    authorCitation: "RK Vedant, Reflective Adaptive Leadership"
  },
  {
    id: 'canon-3',
    dateKey: '2026-10-09',
    quote: "The story you tell yourself about a situation is not the situation. Separate the objective camera fact from the fear-based narrative.",
    inquiry: "In your current interpersonal friction, what is 100% verifiable fact, and what is an assumption created by ego?",
    microAction: "Run the Tri-Layer Frame Separation: write Fact (uncontested reality) vs Emotion (felt sensation) vs Story (mental interpretation).",
    chapterRef: "Chapter 5: When Reaction Breaks Leadership",
    matrixAnchor: "RAAG",
    principle: "Perceptual Accuracy",
    authorCitation: "RK Vedant, Reflective Adaptive Leadership"
  },
  {
    id: 'canon-4',
    dateKey: '2026-10-10',
    quote: "A culture of silence is never a culture of peace; it is a culture of suppressed truth waiting for a catastrophic failure.",
    inquiry: "What uncomfortable reality is your team withholding from you because of fear of subtle disapproval or conflict?",
    microAction: "In your next meeting, explicitly invite dissent: 'What is the biggest flaw in our plan that nobody has voiced yet?'",
    chapterRef: "Chapter 12: The Reflective Adaptive Team",
    matrixAnchor: "ACL",
    principle: "Psychological Safety vs Silence",
    authorCitation: "RK Vedant, Reflective Adaptive Leadership"
  },
  {
    id: 'canon-5',
    dateKey: '2026-10-11',
    quote: "True power in leadership is the ability to choose your state rather than having the crisis dictate your state for you.",
    inquiry: "If you were forbidden from using false urgency as an execution lever, how would you inspire alignment today?",
    microAction: "Notice the moment an operational shock strikes today. Wait a silent count of 5 seconds before speaking.",
    chapterRef: "Chapter 8: The Adaptive Mindset",
    matrixAnchor: "LSTM",
    principle: "Reflex to Pause",
    authorCitation: "RK Vedant, Reflective Adaptive Leadership"
  },
  {
    id: 'canon-6',
    dateKey: '2026-10-12',
    quote: "Inner coherence must always precede outer performance. When the executive core is steady, complexity becomes manageable.",
    inquiry: "What commitment are you maintaining out of vanity rather than genuine strategic clarity?",
    microAction: "Identify one low-value task today and decline it with calm, honest boundaries.",
    chapterRef: "Chapter 10: The Quiet Architecture of Ethical Leadership",
    matrixAnchor: "ADG",
    principle: "Inner Coherence Before Outer Performance",
    authorCitation: "RK Vedant, Reflective Adaptive Leadership"
  }
];

export const DailyLeadershipAffirmation: React.FC = () => {
  const { 
    lifeStage, 
    reflectiveSentiment, 
    diagnostic, 
    setActiveTab, 
    addChatMessage, 
    addMemoryItem,
    memoryVault
  } = useApp();

  const [affirmation, setAffirmation] = useState<DailyAffirmation>(() => {
    // Generate deterministic index based on day of year
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const item = CURATED_AFFIRMATIONS[Math.abs(dayOfYear % CURATED_AFFIRMATIONS.length)];
    return {
      ...item,
      dateKey: now.toISOString().split('T')[0]
    };
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  const todayKey = new Date().toISOString().split('T')[0];

  // Calculate 24h countdown until next day midnight
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diffMs = tomorrow.getTime() - now.getTime();

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch or load saved 24-hour affirmation
  useEffect(() => {
    const storageKey = `ral_daily_affirmation_${todayKey}`;
    const cached = localStorage.getItem(storageKey);

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setAffirmation(parsed);
        // Check if already in memory vault
        const existsInVault = memoryVault.some(m => m.content.includes(parsed.quote.slice(0, 30)));
        setBookmarked(existsInVault);
        return;
      } catch (e) {
        // Fall back to fetch
      }
    }

    // Otherwise fetch fresh context-aware affirmation
    fetchDailyAffirmation();
  }, [todayKey, lifeStage, reflectiveSentiment]);

  const fetchDailyAffirmation = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/affirmations/daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lifeStage,
          sentiment: reflectiveSentiment,
          weakestMatrix: diagnostic?.weakestMatrix || 'ADG',
          dateKey: todayKey,
          forceRefresh
        })
      });

      if (!res.ok) throw new Error("Failed to fetch daily affirmation");
      const data = await res.json();
      if (data.affirmation) {
        setAffirmation(data.affirmation);
        localStorage.setItem(`ral_daily_affirmation_${todayKey}`, JSON.stringify(data.affirmation));
      }
    } catch (err) {
      console.warn("Using local canonical affirmation:", err);
      // Fallback is already initialized
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = `"${affirmation.quote}"\n\nDaily Socratic Inquiry: ${affirmation.inquiry}\nMicro-Practice: ${affirmation.microAction}\n— ${affirmation.authorCitation} (${affirmation.chapterRef})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTakeToCoach = () => {
    const prompt = `Today's Daily Leadership Affirmation is: "${affirmation.quote}"\n\nSocratic Inquiry: "${affirmation.inquiry}"\n\nHelp me unpack this reflection in my leadership context right now.`;
    addChatMessage({ role: 'user', content: prompt });
    setActiveTab('coach');
  };

  const handleBookmarkToVault = () => {
    if (bookmarked) return;
    addMemoryItem({
      category: 'value',
      content: `[Daily Affirmation ${affirmation.dateKey}] "${affirmation.quote}" — ${affirmation.chapterRef}. Inquiry: ${affirmation.inquiry}`
    });
    setBookmarked(true);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06241b] via-[#051c14] to-[#03140e] border border-[#1b5341] p-6 sm:p-8 shadow-2xl transition hover:border-emerald-500/40">
      {/* Decorative ambient aura */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar: Badge, 24h cycle timer & Refresh */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#144234]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-md">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-bold text-slate-100 text-sm tracking-wide">
                Daily Leadership Affirmation
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 uppercase font-semibold">
                24h Calibrated
              </span>
            </div>
            <p className="text-[11px] text-emerald-300/70">
              Tailored for <strong className="text-amber-300 capitalize">{lifeStage}</strong> · State: <strong className="text-emerald-200 capitalize">{reflectiveSentiment}</strong> · Matrix: <strong className="text-amber-300">{affirmation.matrixAnchor}</strong>
            </p>
          </div>
        </div>

        {/* 24-Hour Reset Countdown & AI Refresh */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#07291f] border border-[#144234] text-[11px] text-emerald-300/80 font-mono" title="Time remaining until next daily affirmation">
            <Clock size={12} className="text-amber-400" />
            <span className="text-emerald-400/60 hidden sm:inline">Refreshes in:</span>
            <span className="font-bold text-amber-300">{timeRemaining || '24h'}</span>
          </div>

          <button
            onClick={() => fetchDailyAffirmation(true)}
            disabled={isLoading}
            className="p-2 rounded-xl bg-[#07291f] hover:bg-[#0c3a2c] border border-[#144234] text-emerald-300 hover:text-amber-300 transition"
            title="Generate fresh AI perspective for today"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin text-amber-400' : ''} />
          </button>
        </div>
      </div>

      {/* Main Affirmation Quote Box */}
      <div className="relative z-10 py-6 space-y-5">
        <div className="relative pl-6 sm:pl-8">
          <Quote className="absolute left-0 top-0 text-amber-400/25 w-7 h-7 -translate-y-1 rotate-180" />
          <blockquote className="text-lg sm:text-xl md:text-2xl font-serif text-slate-100 leading-relaxed tracking-wide font-normal">
            "{affirmation.quote}"
          </blockquote>
          <div className="mt-2.5 flex items-center gap-2 text-xs font-mono text-amber-300/90">
            <span>— {affirmation.authorCitation}</span>
            <span className="text-emerald-600/40">·</span>
            <span className="text-emerald-400/70">{affirmation.chapterRef}</span>
          </div>
        </div>

        {/* Two-Column Deep Inquiry & Micro-Action Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {/* Socratic Inquiry */}
          <div className="p-4 rounded-2xl bg-[#041912]/80 border border-[#134233] space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-300">
              <Brain size={13} className="text-amber-400" />
              <span>Socratic Inquiry for Today</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-light">
              {affirmation.inquiry}
            </p>
          </div>

          {/* Micro-Action */}
          <div className="p-4 rounded-2xl bg-[#041912]/80 border border-[#134233] space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>Today's 10-60s Behavioral Drill</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-light">
              {affirmation.microAction}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Strip: Socratic Coach CTA, Copy & Bookmark */}
      <div className="relative z-10 pt-4 border-t border-[#144234] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleTakeToCoach}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-[#0e4d38] hover:from-emerald-500 hover:to-emerald-600 text-slate-100 font-semibold text-xs shadow-md shadow-emerald-950/40 transition flex items-center gap-1.5 min-h-[38px]"
          >
            <MessageSquare size={14} className="text-amber-300" />
            <span>Reflect on this with AI Coach</span>
            <ArrowRight size={12} className="text-emerald-300" />
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className="px-3.5 py-2 rounded-xl bg-[#07291f] hover:bg-[#0c3a2c] border border-[#144234] text-emerald-200 text-xs font-medium transition flex items-center gap-1.5 min-h-[38px]"
          >
            <BookOpen size={13} className="text-amber-300" />
            <span>Open Focus Session</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 px-3 rounded-xl bg-[#07291f] hover:bg-[#0c3a2c] border border-[#144234] text-emerald-200 text-xs font-medium transition flex items-center gap-1.5 min-h-[38px]"
            title="Copy quote and inquiry"
          >
            {copied ? (
              <>
                <Check size={13} className="text-amber-400" />
                <span className="text-amber-300">Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={handleBookmarkToVault}
            className={`p-2 px-3 rounded-xl border text-xs font-medium transition flex items-center gap-1.5 min-h-[38px] ${
              bookmarked 
                ? 'bg-amber-400/20 border-amber-400/50 text-amber-300' 
                : 'bg-[#07291f] hover:bg-[#0c3a2c] border-[#144234] text-emerald-200'
            }`}
            title="Save this affirmation into your personal Memory Vault"
          >
            {bookmarked ? (
              <>
                <BookmarkCheck size={13} className="text-amber-400" />
                <span>Saved in Vault</span>
              </>
            ) : (
              <>
                <Bookmark size={13} />
                <span>Save to Vault</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
