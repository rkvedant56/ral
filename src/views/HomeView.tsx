import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  BarChart3, 
  Calendar, 
  ArrowRight, 
  Flame, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  BookOpen, 
  Users, 
  Brain, 
  BarChart4, 
  Headphones, 
  Wind, 
  Award, 
  Shield, 
  Globe2, 
  Building2, 
  UserCheck, 
  Lock,
  ChevronRight,
  Clock,
  Layers,
  RotateCcw,
  User,
  GraduationCap,
  Smile,
  Heart,
  Briefcase,
  Camera,
  Upload
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RAL_NON_NEGOTIABLES, RAL_MATRICES } from '../data/ralFramework';
import { HomepageImageManagerModal } from '../components/HomepageImageManagerModal';

import { RadarChart } from '../components/RadarChart';
import { InteractiveRalCycle } from '../components/InteractiveRalCycle';
import { DailyLeadershipAffirmation } from '../components/DailyLeadershipAffirmation';
import { LifeStage, AppPathway } from '../types';

export const HomeView: React.FC = () => {
  const { 
    t, 
    user, 
    lifeStage,
    setLifeStage,
    culturalRegion,
    pathway,
    setPathway,
    openLifeStageModal,
    openAuthorModal,
    authorPhotoUrl,
    diagnostic, 
    currentDay, 
    streakDays, 
    scorecards, 
    openPauseModal, 
    setActiveTab,
    setIsAiCoachOpen,
    loadDemoProfile,
    resetToNewVisitor
  } = useApp();

  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);

  const isNewVisitor = !diagnostic;

  // Weakest matrix mapping in plain English (Fix 6 of UX Audit)
  const getMatrixPlainName = (key?: string) => {
    switch (key) {
      case 'RAAG': return 'Awareness (RAAG)';
      case 'LSTM': return 'Shifting State (LSTM)';
      case 'ADG': return 'Decisions (ADG)';
      case 'ACL': return 'Culture (ACL)';
      default: return 'Culture (ACL)';
    }
  };

  const weakestPlain = getMatrixPlainName(diagnostic?.weakestMatrix);

  // 6 Life Stage Pathways for interactive selector
  const lifeStageCards: Array<{
    id: LifeStage;
    title: string;
    age: string;
    desc: string;
    icon: any;
    focus: string;
  }> = [
    {
      id: 'kids',
      title: t.lifeStages.kids.title,
      age: t.lifeStages.kids.age,
      desc: t.lifeStages.kids.desc,
      icon: Smile,
      focus: t.lifeStages.kids.focus
    },
    {
      id: 'teenagers',
      title: t.lifeStages.teenagers.title,
      age: t.lifeStages.teenagers.age,
      desc: t.lifeStages.teenagers.desc,
      icon: Sparkles,
      focus: t.lifeStages.teenagers.focus
    },
    {
      id: 'students',
      title: t.lifeStages.students.title,
      age: t.lifeStages.students.age,
      desc: t.lifeStages.students.desc,
      icon: GraduationCap,
      focus: t.lifeStages.students.focus
    },
    {
      id: 'professionals',
      title: t.lifeStages.professionals.title,
      age: t.lifeStages.professionals.age,
      desc: t.lifeStages.professionals.desc,
      icon: Briefcase,
      focus: t.lifeStages.professionals.focus
    },
    {
      id: 'seniors',
      title: t.lifeStages.seniors.title,
      age: t.lifeStages.seniors.age,
      desc: t.lifeStages.seniors.desc,
      icon: Heart,
      focus: t.lifeStages.seniors.focus
    },
    {
      id: 'teams',
      title: t.lifeStages.teams.title,
      age: t.lifeStages.teams.age,
      desc: t.lifeStages.teams.desc,
      icon: Users,
      focus: t.lifeStages.teams.focus
    }
  ];

  return (
    <div className="space-y-10 pb-16 animate-fadeIn">
      {/* =========================================================================
          SECTION 1: MINIMAL OPENING SCREEN FOR NEW VISITORS (PRIYA) vs DASHBOARD
          Fix 1 of UX Audit: Priya sees her own start, not a stranger's dashboard!
          ========================================================================= */}
      {isNewVisitor ? (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062118] via-[#07261d] to-[#041510] border border-[#164d3c] p-6 sm:p-10 lg:p-12 shadow-2xl">
          {/* Subtle atmospheric lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Compass size={14} className="text-amber-400 animate-spin-slow" />
              <span>{t.welcomeHero.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-heading font-black text-slate-100 tracking-tight leading-tight">
              Lead yourself first.
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light max-w-2xl mx-auto">
              A five-minute check shows where you stand today. Master inner clarity, state transition, decision alignment, and team coherence.
            </p>

            {/* ONE MAIN PRIMARY CTA BUTTON (Fix 5 of UX Audit) */}
            <div className="pt-2 flex flex-col items-center justify-center gap-3">
              <button
                onClick={() => setActiveTab('diagnostic')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-base sm:text-lg shadow-xl shadow-amber-500/30 transition transform hover:scale-[1.02] active:scale-98 min-h-[48px]"
              >
                {t.welcomeHero.ctaCheck}
              </button>

              {/* Secondary Quiet Links (Fix 1 and Fix 5: quiet text, no competing bright buttons) */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-emerald-300/80 pt-2">
                <button
                  onClick={loadDemoProfile}
                  className="hover:text-amber-300 underline underline-offset-4 transition"
                >
                  {t.welcomeHero.exploreDemo}
                </button>
                <span className="text-emerald-600/40">·</span>
                <button
                  onClick={() => setActiveTab('learn')}
                  className="hover:text-amber-300 transition"
                >
                  Explore the 16 Book Chapters
                </button>
                <span className="text-emerald-600/40">·</span>
                <button
                  onClick={openAuthorModal}
                  className="hover:text-amber-300 transition"
                >
                  About Author RK Vedant
                </button>
              </div>
            </div>

            {/* Doctrine Core Truth Callout */}
            <div className="mt-8 pt-6 border-t border-[#144234]/70 max-w-2xl mx-auto">
              <p className="italic text-xs sm:text-sm text-emerald-200/75 leading-relaxed">
                {t.welcomeHero.ralCoreTruth}
              </p>
              <span className="block mt-2 text-[11px] font-mono text-amber-400/80">
                — RK Vedant, Doctrine Author | Former Military Commander
              </span>
            </div>
          </div>
        </section>
      ) : (
        /* =========================================================================
           DASHBOARD VIEW FOR ALEX VANCE / ONBOARDED USERS
           Fix 1 & Fix 6 of UX Audit: Filled with user's own numbers, plain words first
           ========================================================================= */
        <section className="bg-gradient-to-br from-[#062118] via-[#07261d] to-[#041510] border border-[#164d3c] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#144234]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                  Welcome back, {user.name}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold uppercase">
                  {user.tier}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-100 mt-1">
                Your Leadership Architecture
              </h1>
              <p className="text-xs text-emerald-300/70 mt-0.5">
                Composite assessment across the 4 RAL matrices · Life Stage: <strong className="text-amber-300 capitalize">{lifeStage}</strong>
              </p>
            </div>

            {/* Persona and Fresh Reset Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('diagnostic')}
                className="px-3.5 py-2 rounded-xl bg-[#092e22] hover:bg-[#0c3829] border border-[#164d3c] text-xs text-emerald-200 font-semibold transition"
              >
                Retake Diagnostic
              </button>
              <button
                onClick={resetToNewVisitor}
                className="px-3 py-2 rounded-xl bg-[#041510] hover:bg-[#08291f] border border-[#144234] text-xs text-emerald-400/70 hover:text-white transition flex items-center gap-1.5"
                title="Switch back to Priya's new visitor opening screen"
              >
                <RotateCcw size={13} />
                <span>Priya View</span>
              </button>
            </div>
          </div>

          {/* Composite Score & 4 Matrices (Plain Words First as per Fix 6) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Scores & Weakest Area Alert */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-heading font-black text-amber-400">
                  {diagnostic.compositeScore}
                </span>
                <span className="text-lg text-emerald-400/60 font-mono">/ 200</span>
                <span className="ml-2 text-sm font-semibold text-slate-200">
                  {diagnostic.band}
                </span>
              </div>

              {/* Fix 6: Plain words before short forms */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#041510] border border-[#144234]">
                  <span className="text-[11px] text-emerald-300 font-semibold block">Awareness · RAAG</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xl font-heading font-bold text-slate-100">{diagnostic.raagScore}/50</span>
                    <span className="text-[10px] text-emerald-400/60 font-mono">Matrix 1</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#041510] border border-[#144234]">
                  <span className="text-[11px] text-emerald-300 font-semibold block">Shifting state · LSTM</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xl font-heading font-bold text-slate-100">{diagnostic.lstmScore}/50</span>
                    <span className="text-[10px] text-emerald-400/60 font-mono">Matrix 2</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#041510] border border-[#144234]">
                  <span className="text-[11px] text-emerald-300 font-semibold block">Decisions · ADG</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xl font-heading font-bold text-slate-100">{diagnostic.adgScore}/50</span>
                    <span className="text-[10px] text-emerald-400/60 font-mono">Matrix 3</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#041510] border border-[#144234]">
                  <span className="text-[11px] text-emerald-300 font-semibold block">Culture · ACL</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xl font-heading font-bold text-slate-100">{diagnostic.aclScore}/50</span>
                    <span className="text-[10px] text-emerald-400/60 font-mono">Matrix 4</span>
                  </div>
                </div>
              </div>

              {/* Single Primary Action Banner (Fix 5 and Fix 6: One orange button per screen) */}
              <div className="p-4 rounded-2xl bg-[#092e22] border border-amber-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">
                    Correction Protocol
                  </span>
                  <p className="text-xs text-slate-100 font-medium mt-0.5">
                    Your weakest area is <strong className="text-amber-300">{weakestPlain}</strong>. Start a 7-day drill.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('practice')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition transform active:scale-95 shrink-0"
                >
                  Start 7-Day Drill
                </button>
              </div>
            </div>

            {/* Right: Radar Chart Visualization */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-[#041510] border border-[#144234] rounded-2xl">
              <span className="text-[10px] font-mono uppercase text-emerald-400/70 mb-2">
                Psychometric 4-Node Profile
              </span>
              <RadarChart
                raag={diagnostic.raagScore}
                lstm={diagnostic.lstmScore}
                adg={diagnostic.adgScore}
                acl={diagnostic.aclScore}
                benchmark={40}
                size={230}
              />
              <span className="text-[10px] text-emerald-400/60 mt-2 text-center">
                Gold: Your Score · Dotted: RAL Master Benchmark (40/50)
              </span>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          DAILY LEADERSHIP AFFIRMATION (24-Hour Cycle Context-Aware Socratic Guidance)
          ========================================================================= */}
      <DailyLeadershipAffirmation />

      {/* =========================================================================
          SECTION 2: EXPLAIN RAL SIMPLY BEFORE DIAGNOSTICS (AUTHORITATIVE BOOK)
          Explaining what RAL is in accessible terms before numbers & tests
          ========================================================================= */}
      <section className="bg-[#061e16] border border-[#144234] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#12382c]">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Core Doctrine
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-100 mt-1">
              What is Reflective Adaptive Leadership?
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('learn')}
            className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 transition font-semibold"
          >
            <span>Read 16 Chapters in Library</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
          <div className="space-y-3">
            <p>
              In a world drowning in digital velocity, information overload, and relentless pressure, leaders across corporations, start-ups, schools, and families collapse not from a lack of competence, but from <strong>internal congestion</strong>.
            </p>
            <p>
              <strong>Reflection clears the mind. Adaptation moves the leader forward. Leadership emerges where the two meet.</strong> Reflection without adaptation becomes paralysis; adaptation without reflection becomes recklessness.
            </p>
          </div>

          <div className="space-y-3">
            <p>
              RAL is not a boardroom technique or an academic theory; it is a lived internal operating system synthesized by <strong>RK Vedant</strong> across 20+ years of operational military command and civilian executive mentoring.
            </p>
            <p>
              It provides a repeatable, neurological rhythm to interrupt automatic survival reactions and act with unshakeable inner steadiness.
            </p>
          </div>
        </div>

        {/* The 4 RAL Non-Negotiables */}
        <div className="pt-4 border-t border-[#12382c]">
          <h3 className="text-xs uppercase font-bold text-emerald-400/80 mb-3 tracking-wider">
            The 4 RAL Non-Negotiables
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {RAL_NON_NEGOTIABLES.map((n, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-[#041510] border border-[#144234] space-y-1">
                <span className="font-heading font-bold text-amber-300 text-xs block">
                  {i + 1}. {n.principle}
                </span>
                <p className="text-[11px] text-emerald-200/80 leading-snug">
                  {n.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: VISUALLY CENTERED SIX-STAGE RAL CYCLE
          PAUSE → PERCEIVE → REFRAME → ACT → ADJUST → GROW
          ========================================================================= */}
      <InteractiveRalCycle />

      {/* =========================================================================
          SECTION 4: 6 USER PATHWAYS (Kids, Teenagers, Students, Professionals, Seniors, Teams)
          Tailored developmental guidance for every walk of life
          ========================================================================= */}
      <section className="bg-[#061e16] border border-[#144234] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#12382c]">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
              {t.lifeStages.selectTitle}
            </span>
            <h2 className="text-2xl font-heading font-bold text-slate-100 mt-1">
              RAL for Every Generation & Role
            </h2>
            <p className="text-xs text-emerald-300/70 mt-0.5">
              Select your path to calibrate questions, coaching prompts, and scenarios.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-300/80">Active Stage:</span>
            <span className="px-3 py-1 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold capitalize">
              {lifeStage}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lifeStageCards.map(c => {
            const isSelected = lifeStage === c.id;
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                onClick={() => setLifeStage(c.id)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#092e22] border-amber-400 shadow-xl ring-2 ring-amber-400/30'
                    : 'bg-[#041510] border-[#144234] hover:border-emerald-400/40 hover:bg-[#07241b]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-[#0a2e23] text-emerald-300'
                      }`}>
                        <Icon size={16} />
                      </div>
                      <span className="font-heading font-bold text-sm text-slate-100">{c.title}</span>
                    </div>
                    {isSelected && <CheckCircle2 size={15} className="text-amber-400" />}
                  </div>

                  <span className="text-[10px] text-amber-400 font-mono block mb-1.5">{c.age}</span>
                  <p className="text-xs text-emerald-200/80 leading-relaxed">{c.desc}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#12382c] flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400/70 font-medium">Focus: {c.focus.slice(0, 24)}...</span>
                  <span className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-emerald-400'}`}>
                    {isSelected ? 'Active' : 'Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: THE FOUR RAL MATRICES OVERVIEW (PLAIN WORDS FIRST)
          Progressively explains the four diagnostic tools without clutter
          ========================================================================= */}
      <section className="bg-[#061e16] border border-[#144234] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#12382c]">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Measurement Architecture
            </span>
            <h2 className="text-2xl font-heading font-bold text-slate-100 mt-1">
              The Four RAL Diagnostic Matrices
            </h2>
            <p className="text-xs text-emerald-300/70 mt-0.5">
              Converting intuition into intelligence and subjective feeling into diagnosable clarity.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('toolkit')}
            className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 transition font-semibold"
          >
            <span>Open One-Page Toolkit</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Matrix 1 */}
          <div className="p-4 rounded-2xl bg-[#041510] border border-[#144234] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 font-heading">
                1. Awareness · RAAG
              </span>
              <span className="text-[10px] text-emerald-400/60 font-mono">Real-time</span>
            </div>
            <p className="text-slate-200 font-medium">
              Reflective–Adaptive Awareness Grid
            </p>
            <p className="text-emerald-300/70 text-[11px] leading-relaxed">
              Maps your internal operating state: emotional reactivity versus cognitive flexibility across 4 quadrants.
            </p>
          </div>

          {/* Matrix 2 */}
          <div className="p-4 rounded-2xl bg-[#041510] border border-[#144234] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 font-heading">
                2. Shifting State · LSTM
              </span>
              <span className="text-[10px] text-emerald-400/60 font-mono">Transition</span>
            </div>
            <p className="text-slate-200 font-medium">
              Leadership State Transition Map
            </p>
            <p className="text-emerald-300/70 text-[11px] leading-relaxed">
              Charts how to break the neural hijack in 30 seconds and deliberately shift into presence.
            </p>
          </div>

          {/* Matrix 3 */}
          <div className="p-4 rounded-2xl bg-[#041510] border border-[#144234] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 font-heading">
                3. Decisions · ADG
              </span>
              <span className="text-[10px] text-emerald-400/60 font-mono">Decisional</span>
            </div>
            <p className="text-slate-200 font-medium">
              Adaptive Decision Grid
            </p>
            <p className="text-emerald-300/70 text-[11px] leading-relaxed">
              Prevents decisions made from emotional noise by verifying if inner clarity matches outer clarity.
            </p>
          </div>

          {/* Matrix 4 */}
          <div className="p-4 rounded-2xl bg-[#041510] border border-[#144234] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 font-heading">
                4. Culture · ACL
              </span>
              <span className="text-[10px] text-emerald-400/60 font-mono">Collective</span>
            </div>
            <p className="text-slate-200 font-medium">
              Adaptive Culture Lattice
            </p>
            <p className="text-emerald-300/70 text-[11px] leading-relaxed">
              Diagnoses the team's emotional safety, shared cognitive understanding, and adaptive execution.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: INDIVIDUAL vs ORGANIZATION DATA SEGREGATION BANNER
          Strict confidentiality and isolated data boundaries
          ========================================================================= */}
      <section className="bg-[#061e16] border border-[#144234] rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
              Confidentiality & Data Architecture
            </span>
            <h2 className="text-2xl font-heading font-bold text-slate-100 mt-1">
              Two Separated, Cryptographically Isolated Pathways
            </h2>
          </div>

          {/* Pathway Toggle */}
          <div className="flex items-center gap-2 p-1 bg-[#041510] border border-[#12382c] rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setPathway('individual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                pathway === 'individual'
                  ? 'bg-emerald-600 text-slate-950 shadow'
                  : 'text-emerald-300 hover:text-emerald-100'
              }`}
            >
              <UserCheck size={14} />
              <span>Personal View</span>
            </button>

            <button
              onClick={() => setPathway('organization')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                pathway === 'organization'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-emerald-300 hover:text-emerald-100'
              }`}
            >
              <Building2 size={14} />
              <span>Team & Org Space</span>
            </button>
          </div>
        </div>

        {/* Privacy Shield Banner */}
        <div className="p-3.5 rounded-xl bg-[#041510] border border-[#164839] flex items-center gap-3 text-xs text-emerald-200/90 mb-4">
          <Lock size={16} className="text-amber-400 shrink-0" />
          <span>{t.pathways.privacyNotice}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div 
            onClick={() => setActiveTab('vault')}
            className="p-4 rounded-xl bg-[#07241b] border border-[#144234] hover:border-emerald-400/40 transition cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-heading font-bold text-sm text-slate-100 group-hover:text-amber-300 transition">
                Personal Inner Practice
              </span>
              <ArrowRight size={14} className="text-emerald-400 group-hover:translate-x-1 transition" />
            </div>
            <p className="text-emerald-300/70 text-[11px]">
              Confidential memory vault, personal state calibration logs, private 30-day scorecard, and diagnostic history.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('team')}
            className="p-4 rounded-xl bg-[#07241b] border border-[#144234] hover:border-amber-400/40 transition cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-heading font-bold text-sm text-slate-100 group-hover:text-amber-300 transition">
                Team & Organization Coherence
              </span>
              <ArrowRight size={14} className="text-amber-400 group-hover:translate-x-1 transition" />
            </div>
            <p className="text-emerald-300/70 text-[11px]">
              Multi-cohort culture surveys, anonymous safety indices, custom organization criteria, and enterprise SSO governance.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: DOCTRINE AUTHOR RK VEDANT CREDENTIALS & PORTRAIT CARD
          ========================================================================= */}
      <section className="bg-gradient-to-r from-[#062118] to-[#041510] border border-[#144234] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6">
        <div className="relative group shrink-0">
          <div 
            onClick={() => setIsImageManagerOpen(true)}
            title="Click to change or upload author portrait"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl bg-[#092c20] cursor-pointer relative"
          >
            <img 
              src={authorPhotoUrl || '/src/assets/images/rk_vedant_author_1792241867695.jpg'} 
              alt="RK Vedant" 
              className="w-full h-full object-cover object-top transition duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as any).src = '/rk_vedant_portrait.jpg';
              }}
            />

            {/* Hover change overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-amber-200 transition gap-1 text-[11px] font-semibold">
              <Camera size={18} />
              <span>Change Photo</span>
            </div>
          </div>

          <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-bold shadow flex items-center gap-1 pointer-events-none">
            <Award size={11} />
            <span>Doctrine</span>
          </div>
        </div>

        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-semibold">
            <Shield size={12} />
            <span>Doctrine Author & Conceptual Authority</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-100">
            RK Vedant
          </h3>
          <p className="text-xs text-amber-300/90 font-medium">
            Former Military Commander & Executive Mentor
          </p>
          <p className="text-xs text-emerald-200/80 leading-relaxed font-light">
            Drawing upon more than two decades in uniform navigating operational crises, and subsequently mentoring boardroom leaders, CEOs, and global teams facing digital complexity.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setIsImageManagerOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
          >
            <Camera size={13} />
            <span>Change Photo</span>
          </button>

          <button
            onClick={openAuthorModal}
            className="px-4 py-2.5 rounded-xl bg-[#07241b] hover:bg-[#0a3225] border border-amber-400/30 text-xs text-amber-300 font-semibold transition text-center"
          >
            View Full Credentials
          </button>
        </div>
      </section>

      {/* Persistent Homepage Image Manager Modal */}
      <HomepageImageManagerModal
        isOpen={isImageManagerOpen}
        onClose={() => setIsImageManagerOpen(false)}
      />
    </div>
  );
};
