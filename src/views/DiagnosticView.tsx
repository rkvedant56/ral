import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  Printer, 
  Share2, 
  Info,
  Sparkles,
  User,
  Sliders,
  Camera,
  Plus,
  Trash2,
  Building,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { RAL_MATRICES } from '../data/ralFramework';
import { 
  selectPersonalizedTestSample, 
  calculateNormalizedDiagnosticScores,
  buildFull200QuestionPool 
} from '../utils/personalizedQuestions';
import { RadarChart } from '../components/RadarChart';
import { DiagnosticResult, CustomOrgQuestion } from '../types';

export const DiagnosticView: React.FC = () => {
  const { 
    user, 
    diagnostic, 
    saveDiagnostic, 
    clearDiagnostic, 
    setActiveTab, 
    openProfileModal,
    customOrgQuestions,
    addCustomOrgQuestion,
    removeCustomOrgQuestion,
    t,
    lifeStage,
    culturalRegion
  } = useApp();

  const [testSessionSeed, setTestSessionSeed] = useState<number>(0);
  const [activeTabMode, setActiveTabMode] = useState<'assessment' | 'enterprise_custom'>('assessment');
  
  // Enterprise custom question form state
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customText, setCustomText] = useState('');
  const [customCategory, setCustomCategory] = useState<CustomOrgQuestion['category']>('ai_governance');
  const [customOrgTag, setCustomOrgTag] = useState('All Enterprise');

  // Dynamically draw 10 to 12 questions from the 200 pool (50 per matrix) + custom org questions
  const sampledQuestions = useMemo(() => {
    return selectPersonalizedTestSample(user, customOrgQuestions, 12);
  }, [user, customOrgQuestions, testSessionSeed]);

  // Local answers state
  const [answers, setAnswers] = useState<Record<number, number>>(
    diagnostic?.answers || {}
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!diagnostic);

  const handleSelectScore = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = sampledQuestions.length;
  const isComplete = totalQuestions > 0 && answeredCount >= totalQuestions;

  const handleSubmit = () => {
    const { raag, lstm, adg, acl, composite, band, weakestMatrix } = 
      calculateNormalizedDiagnosticScores(sampledQuestions, answers);

    const result: DiagnosticResult = {
      completedAt: new Date().toISOString(),
      raagScore: raag,
      lstmScore: lstm,
      adgScore: adg,
      aclScore: acl,
      compositeScore: composite,
      band,
      weakestMatrix,
      answers
    };

    saveDiagnostic(result);
    setIsSubmitted(true);

    // Fire celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleRetake = () => {
    clearDiagnostic();
    setAnswers({});
    setTestSessionSeed(prev => prev + 1); // draws fresh questions from 200 pool!
    setIsSubmitted(false);
  };

  const handleAddCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;
    addCustomOrgQuestion({
      text: customText.trim(),
      category: customCategory,
      orgTag: customOrgTag.trim() || 'Enterprise'
    });
    setCustomText('');
    setIsAddingCustom(false);
  };

  const printReport = () => {
    window.print();
  };

  const scaleDescriptions = [
    { score: 1, label: t.diagnostic.never || "Never" },
    { score: 2, label: t.diagnostic.rarely || "Rarely" },
    { score: 3, label: t.diagnostic.sometimes || "Sometimes" },
    { score: 4, label: t.diagnostic.often || "Often" },
    { score: 5, label: t.diagnostic.consistently || "Consistently" }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          Psychometric Assessment Instrument · RAL Doctrine
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-100 mt-1">
          Adaptive Psychometric Diagnostic
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          High-precision adaptive evaluation. Draws 10–12 targeted dilemmas from a 200-question pool (50 per matrix) calibrated to your sector and leadership profile.
        </p>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setActiveTabMode('assessment')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTabMode === 'assessment'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            Individual Diagnostic ({totalQuestions} Questions)
          </button>
          <button
            onClick={() => setActiveTabMode('enterprise_custom')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTabMode === 'enterprise_custom'
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Building size={13} />
            <span>Custom Organization Module ({customOrgQuestions.length}/10)</span>
          </button>
        </div>
      </div>

      {/* Individualized Profile Calibration Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-indigo-950/40 border border-amber-400/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            onClick={openProfileModal}
            className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-400 shadow-md bg-slate-900 shrink-0 group cursor-pointer"
            title="Click to edit profile or take photo"
          >
            {user.photoUrl || user.avatar ? (
              <img src={user.photoUrl || user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-amber-300 font-bold">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
            )}
            <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <Camera size={13} className="text-amber-300" />
            </span>
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-slate-100 font-heading">
                Bespoke Diagnostic for {user.name}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase font-semibold">
                {lifeStage}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase font-medium">
                {culturalRegion}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                {user.experienceYears} Years Exp
              </span>
            </div>
            <p className="text-xs text-emerald-300/70 mt-0.5">
              Calibrated to {lifeStage} developmental challenges in {culturalRegion} context. 10–12 questions dynamically sampled from the 200 pool + enterprise criteria.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setTestSessionSeed(prev => prev + 1);
              setAnswers({});
              setIsSubmitted(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition shadow-sm"
            title="Draw a fresh sample of 10-12 questions from the 200 pool"
          >
            <RefreshCw size={12} />
            <span>New Sample</span>
          </button>

          <button
            onClick={openProfileModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-400/30 transition shadow-sm"
          >
            <Sliders size={12} />
            <span>Adjust Profile</span>
          </button>
        </div>
      </div>

      {/* Enterprise Custom Questions Management Tab */}
      {activeTabMode === 'enterprise_custom' && (
        <div className="bg-[#0a1128] border border-indigo-500/40 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Building className="text-indigo-400" size={18} />
                <h3 className="font-heading font-bold text-slate-100 text-base">
                  Enterprise Custom Organization Diagnostic Module
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Enterprise HR & executives can append up to 10 company-specific criteria (e.g. hybrid compliance, AI governance, remote cross-functional alignment) to the assessment engine.
              </p>
            </div>

            <button
              onClick={() => setIsAddingCustom(!isAddingCustom)}
              disabled={customOrgQuestions.length >= 10}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                customOrgQuestions.length >= 10
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
              }`}
            >
              <Plus size={14} />
              <span>Append Question ({customOrgQuestions.length}/10)</span>
            </button>
          </div>

          {/* Form to add custom question */}
          {isAddingCustom && (
            <form onSubmit={handleAddCustomSubmit} className="p-4 rounded-xl bg-slate-900 border border-indigo-500/30 space-y-4">
              <h4 className="text-xs uppercase font-bold text-indigo-300">New Organization Criterion</h4>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Question / Evaluative Statement</label>
                <textarea
                  rows={2}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g. When deploying autonomous AI agents in client workflows, our leadership maintains continuous auditability and human oversight."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-indigo-400 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Focus Category</label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:border-indigo-400 focus:outline-none"
                  >
                    <option value="ai_governance">AI Governance & Algorithmic Oversight</option>
                    <option value="hybrid_compliance">Hybrid Compliance & Remote Fair Play</option>
                    <option value="remote_alignment">Remote Cross-Functional Alignment</option>
                    <option value="cross_functional">Cross-Functional Silo Dissolution</option>
                    <option value="ethical_oversight">Ethical Risk & Whistleblower Trust</option>
                    <option value="custom">Custom Company Value</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Target Department / Org Tag</label>
                  <input
                    type="text"
                    value={customOrgTag}
                    onChange={(e) => setCustomOrgTag(e.target.value)}
                    placeholder="e.g. Engineering, Sales, Enterprise-Wide"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:border-indigo-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingCustom(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Save to Diagnostic Engine
                </button>
              </div>
            </form>
          )}

          {/* List of currently active custom questions */}
          <div className="space-y-3">
            {customOrgQuestions.map((cq, idx) => (
              <div key={cq.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold uppercase">
                      {cq.category.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {cq.orgTag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed mt-1">
                    {cq.text}
                  </p>
                </div>

                <button
                  onClick={() => removeCustomOrgQuestion(cq.id)}
                  className="p-1.5 text-slate-500 hover:text-red-400 transition"
                  title="Remove custom criterion"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            {customOrgQuestions.length === 0 && (
              <p className="text-center py-6 text-xs text-slate-500">
                No custom questions configured. Click "Append Question" to customize company-wide diagnostics.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Assessment Question Mode */}
      {activeTabMode === 'assessment' && !isSubmitted && (
        <div className="bg-[#0a1128] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Progress Header */}
          <div className="space-y-3 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                Assessment Progress: <strong className="text-amber-300">{answeredCount}</strong> / {totalQuestions} Questions Answered
              </span>
              <span className="font-mono text-amber-400">
                {Math.round((answeredCount / totalQuestions) * 100)}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-sky-400 rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Each statement measures your instant leadership instinct on a 1 (Never) to 5 (Consistently) continuum.
            </p>
          </div>

          {/* 10-12 Questions List */}
          <div className="space-y-4">
            {sampledQuestions.map((q, idx) => {
              const selectedValue = answers[q.id];
              return (
                <div 
                  key={q.id}
                  className={`p-4 rounded-xl border transition ${
                    selectedValue !== undefined 
                      ? 'bg-slate-900/70 border-slate-700/80 shadow-md' 
                      : 'bg-slate-900/30 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400 shrink-0">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300/90 border border-slate-700">
                        {q.sectionKey}
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-500 truncate max-w-[200px]">
                      {q.sectionName}
                    </span>
                  </div>

                  <p className="text-sm text-slate-200 leading-snug font-medium mb-3">
                    {q.text}
                  </p>

                  {/* 1 to 5 scale buttons */}
                  {/* 1 to 5 scale buttons (min 44px for phone touch target) */}
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
                    {scaleDescriptions.map(item => (
                      <button
                        key={item.score}
                        type="button"
                        onClick={() => handleSelectScore(q.id, item.score)}
                        className={`min-h-[46px] py-2 px-1 sm:px-2 rounded-xl text-center transition flex flex-col items-center justify-center border cursor-pointer ${
                          selectedValue === item.score
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                            : 'bg-[#041510] border-[#144234] text-emerald-200 hover:border-emerald-400/60 hover:text-white'
                        }`}
                      >
                        <span className="text-sm font-mono font-bold">{item.score}</span>
                        <span className="text-[11px] hidden sm:block truncate opacity-85">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400">
              {isComplete 
                ? 'All questions answered. Ready to generate report!' 
                : `Please answer ${totalQuestions - answeredCount} more questions to generate your diagnostic.`}
            </span>

            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-lg ${
                isComplete 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/30 cursor-pointer' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <CheckCircle2 size={16} />
              <span>Generate Leadership Diagnostic Report ({answeredCount}/{totalQuestions})</span>
            </button>
          </div>
        </div>
      )}

      {/* Results & Comprehensive Report View */}
      {activeTabMode === 'assessment' && isSubmitted && (
        <div className="space-y-6">
          <div className="bg-[#0a1128] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Diagnostic Complete · 200-Question Calibrated Bank
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-100 mt-1">
                  {diagnostic?.band}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Generated on {diagnostic?.completedAt ? new Date(diagnostic.completedAt).toLocaleDateString() : 'Today'} for {user.name} ({user.title})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRetake}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                >
                  <RotateCcw size={14} />
                  <span>Retake with Fresh Sample</span>
                </button>

                <button
                  onClick={printReport}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-400/40 transition"
                >
                  <Printer size={14} />
                  <span>Print Report</span>
                </button>
              </div>
            </div>

            {/* Radar Chart & Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Composite Score</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl sm:text-5xl font-heading font-black text-amber-300">
                      {diagnostic?.compositeScore}
                    </span>
                    <span className="text-sm font-mono text-slate-400">/ 200</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-[#041510] rounded-xl border border-[#144234]">
                    <span className="text-[11px] text-emerald-300 font-semibold block">Awareness · RAAG</span>
                    <span className="text-xl font-heading font-bold text-slate-100">{diagnostic?.raagScore}/50</span>
                  </div>
                  <div className="p-3 bg-[#041510] rounded-xl border border-[#144234]">
                    <span className="text-[11px] text-emerald-300 font-semibold block">Shifting state · LSTM</span>
                    <span className="text-xl font-heading font-bold text-slate-100">{diagnostic?.lstmScore}/50</span>
                  </div>
                  <div className="p-3 bg-[#041510] rounded-xl border border-[#144234]">
                    <span className="text-[11px] text-emerald-300 font-semibold block">Decisions · ADG</span>
                    <span className="text-xl font-heading font-bold text-slate-100">{diagnostic?.adgScore}/50</span>
                  </div>
                  <div className="p-3 bg-[#041510] rounded-xl border border-[#144234]">
                    <span className="text-[11px] text-emerald-300 font-semibold block">Culture · ACL</span>
                    <span className="text-xl font-heading font-bold text-slate-100">{diagnostic?.aclScore}/50</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center p-4 bg-slate-950/60 rounded-2xl border border-slate-850">
                <RadarChart
                  raag={diagnostic?.raagScore || 30}
                  lstm={diagnostic?.lstmScore || 30}
                  adg={diagnostic?.adgScore || 30}
                  acl={diagnostic?.aclScore || 30}
                  benchmark={40}
                  size={260}
                />
              </div>
            </div>

            {/* The 4-Step Correction Protocol */}
            <div className="mt-8 p-6 bg-gradient-to-br from-[#0c1a3b] to-[#091329] border border-amber-500/40 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="text-amber-400" size={20} />
                <h3 className="font-heading font-bold text-slate-100 text-lg">
                  The 4-Step Correction Protocol
                </h3>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                As RK Vedant writes: <em className="text-amber-200">"Locate your weakest matrix - the system will collapse from here. Run a 7-day micro-intervention JUST for that matrix until all stabilize above 35."</em>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs mb-6">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="font-mono text-amber-400 font-bold block mb-1">Step 1: Locate</span>
                  <p className="text-slate-300">Weakest node is <strong className="text-amber-300">{diagnostic?.weakestMatrix}</strong> ({diagnostic ? (diagnostic as any)[`${diagnostic.weakestMatrix.toLowerCase()}Score`] : 0}/50).</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="font-mono text-amber-400 font-bold block mb-1">Step 2: Intervene</span>
                  <p className="text-slate-300">Run 7-day focused micro-intervention targeting this specific fracture.</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="font-mono text-amber-400 font-bold block mb-1">Step 3: Track</span>
                  <p className="text-slate-300">Retake the targeted questions of {diagnostic?.weakestMatrix} in 7 days to measure shift.</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="font-mono text-amber-400 font-bold block mb-1">Step 4: Stabilise</span>
                  <p className="text-slate-300">Maintain until all four matrices score above 35/50 consistently.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('coach')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md"
                >
                  <Sparkles size={14} />
                  <span>Debrief Weakest Node with AI Coach</span>
                </button>
                <button
                  onClick={() => setActiveTab('practice')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
                >
                  <ArrowRight size={14} />
                  <span>Start 30-Day Practice Plan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
