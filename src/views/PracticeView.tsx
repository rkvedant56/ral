import React, { useState } from 'react';
import { 
  Calendar, 
  CheckSquare, 
  Square, 
  Flame, 
  Clock, 
  Save, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Sparkles, 
  Play,
  Download,
  BookOpen,
  Headphones,
  Music
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { PRACTICE_DAYS } from '../data/ralFramework';
import { FocusSessionPomodoro } from '../components/FocusSessionPomodoro';
import { AdaptiveQuestionModal } from '../components/AdaptiveQuestionModal';

export const PracticeView: React.FC = () => {
  const { 
    currentDay, 
    setCurrentDay, 
    scorecards, 
    updateScorecard, 
    streakDays, 
    identitySheet, 
    updateIdentitySheet,
    openPauseModal,
    setActiveTab: setGlobalActiveTab
  } = useApp();

  const [activeTab, setActiveTab] = useState<'daily' | 'scorecard' | 'identity' | 'focus'>('daily');
  const [isAdaptiveModalOpen, setIsAdaptiveModalOpen] = useState(false);

  const handleSelectDay = (dayNum: number) => {
    setCurrentDay(dayNum);
    window.location.hash = `#/practice/day-${dayNum}`;
  };

  const selectedDayData = PRACTICE_DAYS.find(d => d.day === currentDay) || PRACTICE_DAYS[0];
  const activeScorecard = scorecards[currentDay] || {
    pause: false,
    perceive: false,
    reframe: false,
    act: false,
    grow: false,
    adjust: false,
    score: 0,
    journalText: '',
    updatedAt: ''
  };

  const handleToggleFactor = (factor: 'pause' | 'perceive' | 'reframe' | 'act' | 'grow' | 'adjust') => {
    const updated = !activeScorecard[factor];
    updateScorecard(currentDay, { [factor]: updated });

    if (updated && activeScorecard.score === 5) {
      // Completed all 6!
      try {
        confetti({ particleCount: 50, spread: 50 });
      } catch (e) {}
    }
  };

  const totalPointsEarned = Object.values(scorecards).reduce((sum, s) => sum + (s.score || 0), 0);

  const weeks = [
    { num: 1, title: "Week 1: Pause & Notice", days: [1, 2, 3, 4, 5, 6, 7] },
    { num: 2, title: "Week 2: Reframe & Reinterpret", days: [8, 9, 10, 11, 12, 13, 14] },
    { num: 3, title: "Week 3: Decide & Act", days: [15, 16, 17, 18, 19, 20, 21] },
    { num: 4, title: "Week 4: Identity & Culture", days: [22, 23, 24, 25, 26, 27, 28, 29, 30] }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-fadeIn">
      {/* Header and Streak Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            4-Week Habituation Protocol
          </span>
          <h1 className="text-3xl font-heading font-bold text-slate-100 mt-1">
            30-Day RAL Practice Plan
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Shifting Reflective Adaptive Leadership from Concept → Habit → Identity.
          </p>
        </div>

        {/* Stats banner */}
        <div className="flex items-center gap-3 bg-[#0a1128] border border-slate-800 p-2.5 rounded-2xl">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Flame size={16} />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 block leading-none">Streak</span>
              <span className="text-xs font-bold font-mono">{streakDays} Days</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Award size={16} />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 block leading-none">Total Score</span>
              <span className="text-xs font-bold font-mono">{totalPointsEarned} / 180</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Mode Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#144234] pb-3">
        <button
          onClick={() => setActiveTab('daily')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'daily'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-emerald-300/70 hover:text-emerald-100'
          }`}
        >
          Day {currentDay} Practice & Scorecard
        </button>

        <button
          onClick={() => setActiveTab('focus')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'focus'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-emerald-300/70 hover:text-emerald-100'
          }`}
        >
          <Headphones size={13} className={activeTab === 'focus' ? 'text-slate-950' : 'text-amber-400'} />
          <span>Focus Session (Pomodoro & Soothe)</span>
        </button>

        <button
          onClick={() => setActiveTab('scorecard')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'scorecard'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-emerald-300/70 hover:text-emerald-100'
          }`}
        >
          30-Day Master Calendar
        </button>

        <button
          onClick={() => setActiveTab('identity')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'identity'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-emerald-300/70 hover:text-emerald-100'
          }`}
        >
          Day 30: Identity Sheet Compass
        </button>

        {/* Adaptive Question Agent Check-in Trigger */}
        <button
          onClick={() => setIsAdaptiveModalOpen(true)}
          className="ml-auto px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 shrink-0"
        >
          <Sparkles size={13} />
          <span>Daily Adaptive Inquiries (12 Qs)</span>
        </button>
      </div>

      {activeTab === 'daily' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Day Navigation & Drill Card (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#061e16] border border-[#144234] rounded-2xl p-6 shadow-xl space-y-6">
              {/* Day Switcher */}
              <div className="flex items-center justify-between pb-4 border-b border-[#12382c]">
                <button
                  disabled={currentDay <= 1}
                  onClick={() => handleSelectDay(currentDay - 1)}
                  className="p-2 rounded-xl border border-[#184d3c] bg-[#041510] text-emerald-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="text-center">
                  <span className="text-[11px] font-mono text-amber-400 font-bold block">
                    {selectedDayData.weekTitle}
                  </span>
                  <h3 className="text-lg font-heading font-bold text-slate-100">
                    Day {selectedDayData.day}: {selectedDayData.title}
                  </h3>
                </div>

                <button
                  disabled={currentDay >= 30}
                  onClick={() => handleSelectDay(currentDay + 1)}
                  className="p-2 rounded-xl border border-[#184d3c] bg-[#041510] text-emerald-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Objective */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                <span className="font-bold text-amber-300 block mb-1">Daily Objective:</span>
                <p className="text-slate-200 leading-relaxed">{selectedDayData.objective}</p>
              </div>

              {/* Pomodoro Focus Session Quick-Launch Banner */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#072d21] to-[#041a13] border border-[#174d3b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                    <Headphones size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-100 block">Deep Work Focus Block with Ambient Soothe</span>
                    <span className="text-[11px] text-emerald-300/70">Execute Day {selectedDayData.day}'s habit in a 25-minute Pomodoro cycle with acoustic soundscapes.</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('focus')}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow shrink-0 self-start sm:self-auto"
                >
                  Start Focus Timer
                </button>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Practice Protocol:
                </h4>
                <ol className="space-y-2 text-xs text-slate-300">
                  {selectedDayData.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-amber-400 font-bold shrink-0">{idx + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Micro-Drill Action Box */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-sky-400 font-bold">Micro-Drill</span>
                  <p className="text-xs text-slate-200 mt-0.5">{selectedDayData.microDrill}</p>
                </div>

                <button
                  onClick={() => openPauseModal('10s')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shrink-0"
                >
                  <Play size={13} fill="currentColor" />
                  <span>Launch Drill Timer</span>
                </button>
              </div>

              {/* Reflection Journal */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <FileText size={14} className="text-amber-400" />
                    <span>Evening Journal Reflection</span>
                  </label>
                  <span className="text-[10px] text-slate-500">Auto-saved to local memory</span>
                </div>
                <p className="text-xs text-amber-200/80 italic">
                  "{selectedDayData.journalPrompt}"
                </p>
                <textarea
                  value={activeScorecard.journalText}
                  onChange={(e) => updateScorecard(currentDay, { journalText: e.target.value })}
                  placeholder="Record what your inner landscape revealed today..."
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/80 transition"
                />
              </div>
            </div>
          </div>

          {/* Daily 6-Point Scorecard (Right 1 col) */}
          <div className="space-y-6">
            <div className="bg-[#0a1128] border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-heading font-bold text-slate-100 text-base">Daily RAL Scorecard</h3>
                  <p className="text-[11px] text-slate-400">Daily Protocol: 1 pt each (Max 6)</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-heading font-bold text-amber-300">
                    {activeScorecard.score}
                  </span>
                  <span className="text-xs text-slate-400">/ 6</span>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                Mark each movement of the RAL Cycle you consciously executed today:
              </p>

              {/* Factors */}
              <div className="space-y-2.5">
                {[
                  { key: 'pause', label: '1. Pause', desc: 'Interrupted neural reflex with conscious breath.' },
                  { key: 'perceive', label: '2. Perceive', desc: 'Observed empirical fact without emotional story.' },
                  { key: 'reframe', label: '3. Reframe', desc: 'Generated alternate hypotheses before deciding.' },
                  { key: 'act', label: '4. Act', desc: 'Responded from inner alignment rather than urgency.' },
                  { key: 'grow', label: '5. Grow', desc: 'Studied internal reactions and prediction error.' },
                  { key: 'adjust', label: '6. Adjust', desc: 'Integrated lesson into daily leadership habit.' }
                ].map((item) => {
                  const isChecked = (activeScorecard as any)[item.key];
                  return (
                    <div
                      key={item.key}
                      onClick={() => handleToggleFactor(item.key as any)}
                      className={`p-3 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                        isChecked 
                          ? 'bg-amber-500/15 border-amber-500/40 text-slate-100' 
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <button className="mt-0.5 shrink-0 text-amber-400">
                        {isChecked ? <CheckSquare size={16} /> : <Square size={16} />}
                      </button>
                      <div>
                        <span className={`text-xs font-bold block ${isChecked ? 'text-amber-300' : 'text-slate-300'}`}>
                          {item.label} (+1 pt)
                        </span>
                        <span className="text-[10px] text-slate-400 leading-tight block mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-800 text-center">
                <span className="text-[11px] text-slate-400">
                  Target: <strong>&gt;120 points/month</strong> indicates strong neurobiological integration.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 30-Day Master Calendar Tab */}
      {activeTab === 'scorecard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {weeks.map((week) => (
              <div key={week.num} className="bg-[#0a1128] border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="pb-2 border-b border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-amber-400 font-bold">Week {week.num}</span>
                  <h4 className="text-xs font-heading font-bold text-slate-200 truncate">{week.title}</h4>
                </div>

                <div className="space-y-1.5">
                  {week.days.map((d) => {
                    const sc = scorecards[d];
                    const pts = sc?.score || 0;
                    const isToday = currentDay === d;
                    return (
                      <button
                        key={d}
                        onClick={() => { handleSelectDay(d); setActiveTab('daily'); }}
                        className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between text-xs transition border min-h-[44px] ${
                          isToday 
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold' 
                            : pts > 0 
                              ? 'bg-[#092c20] border-[#144234] text-emerald-200 hover:border-emerald-400/60' 
                              : 'bg-[#041510] border-[#144234] text-emerald-400/50 hover:text-emerald-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px]">Day {d}</span>
                          <span className="text-[10px] text-slate-400 truncate max-w-[110px]">
                            {PRACTICE_DAYS[d - 1]?.title}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-amber-400 font-semibold">
                          {pts}/6
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Identity Sheet Tab (Day 30 Integration Ritual) */}
      {activeTab === 'identity' && (
        <div className="bg-[#0a1128] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Day 30 Integration Ritual</span>
              <h2 className="text-2xl font-heading font-bold text-slate-100 mt-1">
                The 1-Page New RAL Identity Sheet
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Your lifelong leadership compass: from concept to habit to living identity.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-700 transition"
            >
              <Download size={14} />
              <span>Print Identity Sheet</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-amber-300 block mb-1">1. My State Signature</label>
              <p className="text-[11px] text-slate-400 mb-1.5">How I preserve my baseline stillness and ground my nervous system under speed:</p>
              <textarea
                value={identitySheet.stateSignature}
                onChange={(e) => updateIdentitySheet({ stateSignature: e.target.value })}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-amber-300 block mb-1">2. My Distortion Tendencies</label>
              <p className="text-[11px] text-slate-400 mb-1.5">The habitual traps (mind-reading, catastrophizing, hero-savior bias) I spot early:</p>
              <textarea
                value={identitySheet.distortionTendencies}
                onChange={(e) => updateIdentitySheet({ distortionTendencies: e.target.value })}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-amber-300 block mb-1">3. My Adaptive Strengths</label>
              <p className="text-[11px] text-slate-400 mb-1.5">How I convert friction into signal and hold ambiguity without panicking:</p>
              <textarea
                value={identitySheet.adaptiveStrengths}
                onChange={(e) => updateIdentitySheet({ adaptiveStrengths: e.target.value })}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-amber-300 block mb-1">4. My Leadership Presence Promise</label>
              <p className="text-[11px] text-slate-400 mb-1.5">The quiet, non-coercive authority and emotional steadiness I bring into rooms:</p>
              <textarea
                value={identitySheet.presencePromise}
                onChange={(e) => updateIdentitySheet({ presencePromise: e.target.value })}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-amber-300 block mb-1">5. My Cultural Imprint</label>
              <p className="text-[11px] text-slate-400 mb-1.5">The psychological safety and truth-telling rituals I leave behind in my teams:</p>
              <textarea
                value={identitySheet.culturalImprint}
                onChange={(e) => updateIdentitySheet({ culturalImprint: e.target.value })}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Focus Session Pomodoro with Integrated Soothe Soundscape */}
      {activeTab === 'focus' && <FocusSessionPomodoro />}

      {/* Adaptive Question Agent Modal */}
      <AdaptiveQuestionModal
        isOpen={isAdaptiveModalOpen}
        onClose={() => setIsAdaptiveModalOpen(false)}
        onSendToCoach={() => setGlobalActiveTab('coach')}
      />
    </div>
  );
};
