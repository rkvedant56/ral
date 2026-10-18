import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ThumbsUp, 
  ThumbsDown, 
  ShieldAlert, 
  Compass, 
  Camera,
  Heart,
  Wind,
  Zap,
  Coffee,
  Brain,
  Sliders,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { renderFormattedMessage } from '../components/PersistentAiCoachDock';
import { ReflectiveSentiment } from '../types';
import { AdaptiveQuestionModal } from '../components/AdaptiveQuestionModal';

interface SentimentConfig {
  id: ReflectiveSentiment;
  label: string;
  shortLabel: string;
  icon: string;
  toneSummary: string;
  toneDescription: string;
  guidanceBadge: string;
  suggestedPrompt: string;
  accentColor: string;
  activeBg: string;
  activeBorder: string;
  textColor: string;
}

const SENTIMENT_OPTIONS: SentimentConfig[] = [
  {
    id: 'centered',
    label: 'Centered & Analytical',
    shortLabel: 'Centered',
    icon: '🧘',
    toneSummary: 'Strategic & Rigorous',
    toneDescription: 'High cognitive clarity. Challenges assumptions, evaluates 2nd/3rd-order consequences, and applies Matrix 3 (Adaptive Decision Grid).',
    guidanceBadge: 'ADG Aligned Action Active',
    suggestedPrompt: 'I am centered. Help me test my strategic assumptions and verify fact versus story on our Q4 initiative.',
    accentColor: 'emerald',
    activeBg: 'bg-emerald-500/20',
    activeBorder: 'border-emerald-400',
    textColor: 'text-emerald-300'
  },
  {
    id: 'reflective',
    label: 'Deeply Reflective',
    shortLabel: 'Reflective',
    icon: '🌌',
    toneSummary: 'Contemplative & Socratic',
    toneDescription: 'Introspective wisdom. Explores identity evolution, ethical grounding, Upanishadic introspection, and timeless leadership presence.',
    guidanceBadge: 'Presence & Identity Focus',
    suggestedPrompt: 'I want to reflect deeply on my leadership identity. What hidden assumptions am I operating under?',
    accentColor: 'indigo',
    activeBg: 'bg-indigo-500/20',
    activeBorder: 'border-indigo-400',
    textColor: 'text-indigo-300'
  },
  {
    id: 'overwhelmed',
    label: 'Overwhelmed & Anxious',
    shortLabel: 'Overwhelmed',
    icon: '🌊',
    toneSummary: 'Stabilizing & Spacious',
    toneDescription: 'High amygdala arousal. Slows pacing, mutes complex multi-step frameworks, validates emotional bandwidth, and initiates a 4-2-6 breathing pause.',
    guidanceBadge: 'Somatic Down-Regulation',
    suggestedPrompt: 'I am feeling overwhelmed by too many conflicting demands. Guide me through a 10-second grounding pause.',
    accentColor: 'amber',
    activeBg: 'bg-amber-500/25',
    activeBorder: 'border-amber-400',
    textColor: 'text-amber-300'
  },
  {
    id: 'agitated',
    label: 'Agitated & Defensive',
    shortLabel: 'Agitated',
    icon: '⚡',
    toneSummary: 'Disarming & Boundary-Focused',
    toneDescription: 'Reactive spike detected. Softens the room, doesn\'t argue, and gently unpacks what boundary crossing or hidden fear is driving defense.',
    guidanceBadge: 'LSTM Shift 2: Reflex to Pause',
    suggestedPrompt: 'I felt a sharp defensive trigger in a meeting today. Help me unpack the root tension before I respond.',
    accentColor: 'orange',
    activeBg: 'bg-orange-500/25',
    activeBorder: 'border-orange-400',
    textColor: 'text-orange-300'
  },
  {
    id: 'depleted',
    label: 'Exhausted & Depleted',
    shortLabel: 'Depleted',
    icon: '🍃',
    toneSummary: 'Minimalist & Restorative',
    toneDescription: 'Cognitive fatigue. Relieves the burden of performative leadership, gives permission to pause, and delivers ultra-concise energy renewal guidance.',
    guidanceBadge: 'Cognitive Rest & Renewal',
    suggestedPrompt: 'I am mentally exhausted. How do I maintain leadership presence when my cognitive battery is low?',
    accentColor: 'teal',
    activeBg: 'bg-teal-500/25',
    activeBorder: 'border-teal-400',
    textColor: 'text-teal-300'
  }
];

export const CoachView: React.FC = () => {
  const { 
    t, 
    user, 
    diagnostic, 
    chatMessages, 
    addChatMessage, 
    rateChatMessage, 
    clearChat, 
    language,
    memoryVault,
    userDocuments,
    setActiveTab,
    openProfileModal,
    reflectiveSentiment,
    setReflectiveSentiment
  } = useApp();

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<string>('General Coaching');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [crisisAlert, setCrisisAlert] = useState<string | null>(null);
  const [sentimentToast, setSentimentToast] = useState<string | null>(null);
  const [isAdaptiveModalOpen, setIsAdaptiveModalOpen] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : language === 'ar' ? 'ar-SA' : 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported by your current browser. Try Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  const speakText = (text: string) => {
    if (!isSpeechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Clean markdown stars/hashtags before speaking
    const clean = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 0.95; // calm, measured tempo
    utterance.pitch = 1.0;
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : language === 'ar' ? 'ar-SA' : 'en-US';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSentimentChange = (newSentiment: ReflectiveSentiment) => {
    setReflectiveSentiment(newSentiment);
    const opt = SENTIMENT_OPTIONS.find(o => o.id === newSentiment);
    if (opt) {
      setSentimentToast(`Calibrated to ${opt.label} — Tone: ${opt.toneSummary}`);
      setTimeout(() => setSentimentToast(null), 3500);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const message = (textToSend || input).trim();
    if (!message || isLoading) return;

    setInput('');
    addChatMessage({ role: 'user', content: message });
    setIsLoading(true);
    setCrisisAlert(null);

    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: chatMessages.slice(-8),
          sentiment: reflectiveSentiment,
          userProfile: {
            name: user.name,
            title: user.title,
            sector: user.sector,
            compositeScore: diagnostic?.compositeScore,
            band: diagnostic?.band,
            weakestMatrix: diagnostic?.weakestMatrix
          },
          mode: selectedMode,
          language: language === 'hi' ? 'Hindi' : language === 'es' ? 'Spanish' : language === 'fr' ? 'French' : language === 'ar' ? 'Arabic' : 'English',
          memoryVault,
          userDocuments
        })
      });

      const data = await response.json();
      if (data.isCrisis) {
        setCrisisAlert(data.reply);
      }

      addChatMessage({ role: 'model', content: data.reply });
      if (isSpeechEnabled) {
        speakText(data.reply);
      }
    } catch (err: any) {
      console.error("Coaching API error:", err);
      addChatMessage({
        role: 'model',
        content: "Take a gentle pause. Let's step back from the immediacy of the situation. What is the single unexamined assumption currently driving your reaction?"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const activeSentimentConfig = SENTIMENT_OPTIONS.find(o => o.id === reflectiveSentiment) || SENTIMENT_OPTIONS[0];

  const quickModes = [
    { id: 'Adaptive Question Drill', label: 'Adaptive Question Drill', desc: '10–15 tailored session inquiries' },
    { id: 'Before a Tough Meeting', label: 'Before a Tough Meeting', desc: '10s pause & intention check' },
    { id: 'After a Conflict', label: 'After a Conflict', desc: 'Fact vs Emotion vs Story separation' },
    { id: 'During a Crisis', label: 'During a Crisis', desc: 'Somatic grounding & threat vs emotion' },
    { id: 'AI Decision Review', label: 'AI Decision Review', desc: 'Audit algorithmic advice & human accountability' }
  ];

  const suggestedQuestions = [
    "I'm feeling intense pressure from my board to cut staff immediately. How do I pause before deciding?",
    "A team member is becoming defensively silent in meetings. How do I apply the Adaptive Culture Lattice?",
    "Our AI dashboard just recommended cancelling a supplier partnership. How do I verify this without confirmation bias?",
    "I reacted harshly to an email this morning. How do I repair trust according to the Trust Repair & Re-Anchoring Principle?"
  ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col pb-4 animate-fadeIn">
      {/* Header with Mode Selector, User Card & Reflective Sentiment Toggle */}
      <div className="bg-[#051c14] border border-[#144234] rounded-2xl p-4 mb-3 shadow-lg shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Prominent User Profile & Context Card in Coach Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={openProfileModal}
              className="relative group shrink-0"
              title="Click to update photo with camera or file upload"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-400/80 bg-[#07241a] shadow-lg shadow-amber-500/20">
                {user.photoUrl || user.avatar ? (
                  <img src={user.photoUrl || user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-amber-500/20 text-amber-300 font-bold text-sm">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#051c14] border border-amber-400/80 text-amber-300 shadow group-hover:scale-110 transition">
                <Camera size={10} />
              </span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-bold text-emerald-100 text-base">
                  Coaching {user.name}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30 uppercase font-medium">
                  {user.sector.replace('_', ' ')}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  RAL Coach Active
                </span>
              </div>
              <p className="text-[11px] text-emerald-400/70">
                {user.title} · Baseline <strong className="text-amber-300">{diagnostic?.compositeScore || '133'}</strong> · Focus <strong className="text-amber-300">{diagnostic?.weakestMatrix || 'ACL'}</strong> · <button onClick={() => setActiveTab('vault')} className="text-emerald-300 underline hover:text-amber-300">{memoryVault.length} Memories & {userDocuments.length} Docs Indexed</button>
              </p>
            </div>
          </div>

          {/* Right Tools (Speech Toggle, Clear Chat) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdaptiveModalOpen(true)}
              className="px-2.5 py-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 hover:from-amber-500/30 hover:to-amber-600/30 transition shadow-sm"
              title="Launch 10-15 Question Daily Adaptive Check-in"
            >
              <Sparkles size={14} className="text-amber-400" />
              <span className="hidden sm:inline">Adaptive Drill</span>
            </button>

            <button
              onClick={() => {
                if (isSpeaking) window.speechSynthesis.cancel();
                setIsSpeechEnabled(!isSpeechEnabled);
              }}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition ${
                isSpeechEnabled 
                  ? 'bg-amber-500/20 border-amber-400/50 text-amber-300' 
                  : 'bg-[#07241a] border-[#144234] text-emerald-400/70 hover:text-emerald-200'
              }`}
              title={isSpeechEnabled ? "Voice Output Enabled" : "Enable Voice Output"}
            >
              {isSpeechEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="hidden sm:inline">{isSpeechEnabled ? 'Voice On' : 'Voice Off'}</span>
            </button>

            <button
              onClick={clearChat}
              className="p-2 rounded-lg bg-[#07241a] border border-[#144234] text-emerald-400/70 hover:text-emerald-200 transition"
              title="Reset Conversation"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* REFLECTIVE SENTIMENT TOGGLE BAR */}
        <div className="mt-3.5 pt-3 border-t border-[#144234]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Sliders size={14} className="text-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300/90">
                Reflective Sentiment
              </span>
              <span className="text-[10px] text-emerald-400/70 hidden sm:inline">
                (Calibrate AI coaching tone to your current inner state)
              </span>
            </div>

            {sentimentToast && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/40 animate-pulse font-medium">
                {sentimentToast}
              </span>
            )}
          </div>

          {/* 5-State Sentiment Toggle Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {SENTIMENT_OPTIONS.map((opt) => {
              const isSelected = reflectiveSentiment === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSentimentChange(opt.id)}
                  type="button"
                  className={`px-2.5 py-2 rounded-xl text-left border transition relative flex flex-col gap-0.5 ${
                    isSelected
                      ? `${opt.activeBg} ${opt.activeBorder} shadow-md shadow-emerald-950/50`
                      : 'bg-[#07241a]/60 border-[#144234] text-emerald-300/70 hover:bg-[#0c3829] hover:text-emerald-100 hover:border-[#1c5c49]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-base">{opt.icon}</span>
                    {isSelected && (
                      <CheckCircle2 size={12} className="text-amber-400" />
                    )}
                  </div>
                  <span className={`text-[11px] font-bold truncate ${isSelected ? 'text-amber-300' : 'text-emerald-100'}`}>
                    {opt.shortLabel}
                  </span>
                  <span className="text-[9px] text-emerald-400/60 truncate">
                    {opt.toneSummary}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Sentiment Tone Directive & Quick Prompt */}
          <div className="mt-2.5 px-3 py-2 rounded-xl bg-[#03150f] border border-[#144234] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-start sm:items-center gap-2">
              <span className="text-sm shrink-0">{activeSentimentConfig.icon}</span>
              <div>
                <span className="text-[11px] font-semibold text-emerald-200">
                  Current AI Tone: <strong className="text-amber-300">{activeSentimentConfig.toneSummary}</strong>
                </span>
                <p className="text-[10px] text-emerald-400/70 leading-tight">
                  {activeSentimentConfig.toneDescription}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleSendMessage(activeSentimentConfig.suggestedPrompt)}
              disabled={isLoading}
              className="shrink-0 text-[10px] font-medium px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-200 hover:text-amber-300 transition flex items-center gap-1 self-start sm:self-auto"
              title="Test this sentiment tone calibration"
            >
              <span>Test Prompt</span>
              <ArrowRight size={10} />
            </button>
          </div>
        </div>

        {/* Quick Scenario Modes */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 mt-3 pt-3 border-t border-[#144234]/80">
          {quickModes.map(m => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMode(m.id);
                if (m.id === 'Adaptive Question Drill') {
                  handleSendMessage(`Run an Adaptive Question Drill with me right now. Interrogate me on one of today's 10-15 calibrated RAL inquiries tailored to my current state (${activeSentimentConfig.label}), wait for my response, and give me a decisive RAL Socratic reframe.`);
                } else if (m.id === 'Before a Tough Meeting') {
                  handleSendMessage("I am about to enter a high-stakes, contentious meeting. Guide me through a 10-second pause and intention check.");
                } else if (m.id === 'After a Conflict') {
                  handleSendMessage("I just had a sharp disagreement with a colleague. Help me run the 3-layer Frame Separation (Fact -> Emotion -> Story).");
                } else if (m.id === 'During a Crisis') {
                  handleSendMessage("I am in the middle of a crisis where everyone is demanding immediate action. Help me ground my state before I decide.");
                } else if (m.id === 'AI Decision Review') {
                  handleSendMessage("I have received an AI-supported strategic recommendation. Guide me through the RAL AI Governance check (auditing assumptions, emotional bias, and human accountability).");
                }
              }}
              className={`p-2 rounded-xl text-left border transition text-xs ${
                selectedMode === m.id
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 font-semibold'
                  : 'bg-[#07241a]/60 border-[#144234] text-emerald-400/70 hover:text-emerald-100 hover:bg-[#0c3829]'
              }`}
            >
              <span className="block font-medium truncate">{m.label}</span>
              <span className="block text-[10px] text-emerald-400/50 truncate">{m.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Distress or Crisis Safety Banner */}
      {crisisAlert && (
        <div className="mb-3 p-4 bg-red-950/80 border border-red-500/60 rounded-xl text-red-200 text-xs flex items-start gap-3 shadow-lg">
          <ShieldAlert size={20} className="text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-red-300 uppercase tracking-wide">Crisis & Safety Boundary</span>
            <p className="whitespace-pre-line leading-relaxed">{crisisAlert}</p>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-1 space-y-4 pr-1">
        {chatMessages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar Icon */}
              {isUser ? (
                <button
                  type="button"
                  onClick={openProfileModal}
                  className="relative w-9 h-9 rounded-xl overflow-hidden border border-amber-400/80 bg-[#07241a] flex items-center justify-center shrink-0 shadow-md group cursor-pointer"
                  title={`${user.name} (Click to manage photo)`}
                >
                  {user.photoUrl || user.avatar ? (
                    <img src={user.photoUrl || user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-xs text-amber-300">{user.name.slice(0, 2).toUpperCase()}</span>
                  )}
                  <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <Camera size={11} className="text-amber-300" />
                  </span>
                </button>
              ) : (
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[#082a1f] border border-amber-400/40 text-amber-400 shadow-md">
                  <Compass size={18} />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                  isUser
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-[#092c21] border border-[#144234] text-emerald-100 rounded-tl-none'
                }`}
              >
                {isUser ? (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                ) : (
                  renderFormattedMessage(msg.content)
                )}

                {/* Socratic Feedback Loop for Coach Messages */}
                {!isUser && (
                  <div className="mt-3 pt-2.5 border-t border-[#12382c] flex items-center justify-between text-[11px] text-emerald-400/60">
                    <span className="italic font-light">Did this inquiry cultivate inner clarity?</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => rateChatMessage(msg.id, true)}
                        className={`p-1 rounded hover:text-emerald-300 transition ${msg.helpful === true ? 'text-amber-400 bg-amber-400/10' : ''}`}
                        title="Helpful reflection"
                      >
                        <ThumbsUp size={13} />
                      </button>
                      <button
                        onClick={() => rateChatMessage(msg.id, false)}
                        className={`p-1 rounded hover:text-rose-400 transition ${msg.helpful === false ? 'text-rose-400 bg-rose-500/10' : ''}`}
                        title="Needs recalibration"
                      >
                        <ThumbsDown size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
              <Sparkles size={16} className="animate-spin" />
            </div>
            <div className="bg-[#092c21] border border-[#144234] rounded-2xl p-3.5 text-xs text-amber-300/90 font-medium italic flex items-center gap-2">
              <Compass size={14} className="animate-spin" />
              <span>{t.coach.thinking} (Calibrated for {activeSentimentConfig.label})</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {chatMessages.length <= 2 && (
        <div className="py-2.5 px-3 bg-[#061e16] border border-[#144234] rounded-2xl space-y-1.5 shrink-0">
          <span className="text-[10px] uppercase font-bold text-emerald-400/70 block">
            Suggested Socratic Dialogues:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-left text-[11px] px-3 py-2 bg-[#092c20] hover:bg-[#0c3829] border border-[#144234] hover:border-amber-400/40 text-emerald-100 rounded-xl transition line-clamp-1"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="mt-2 bg-[#051c14] border border-[#144234] rounded-2xl p-2.5 shadow-xl shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input Mic Button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-2.5 rounded-xl border transition ${
              isListening
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                : 'bg-[#07241a] border-[#144234] text-emerald-300 hover:text-amber-400'
            }`}
            title={isListening ? "Listening... Click to stop" : "Speak to your RAL Coach"}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening to your voice..." : t.coach.placeholder}
            className="flex-1 bg-transparent border-none text-xs sm:text-sm text-emerald-100 placeholder-emerald-500/60 focus:outline-none px-2"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-2.5 rounded-xl transition ${
              input.trim() && !isLoading
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500'
                : 'bg-[#07241a] text-emerald-700 cursor-not-allowed border border-[#144234]'
            }`}
          >
            <Send size={16} />
          </button>
        </form>

        <div className="flex items-center justify-between text-[10px] text-emerald-500/70 mt-2 px-1">
          <span>{t.coach.disclaimer}</span>
          <span className="flex items-center gap-1 font-medium text-amber-300/80">
            <span>Mood:</span>
            <span>{activeSentimentConfig.icon} {activeSentimentConfig.shortLabel}</span>
          </span>
        </div>
      </div>

      {/* Adaptive Question Agent Modal Mount */}
      <AdaptiveQuestionModal
        isOpen={isAdaptiveModalOpen}
        onClose={() => setIsAdaptiveModalOpen(false)}
        onSendToCoach={(prompt) => handleSendMessage(prompt)}
      />
    </div>
  );
};
