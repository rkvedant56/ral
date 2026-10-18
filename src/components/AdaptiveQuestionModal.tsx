import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  BarChart3, 
  RotateCcw, 
  Zap, 
  Shield, 
  Compass, 
  HeartHandshake,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { AdaptiveQuestion, RalPhase } from '../types';
import { generateAdaptiveQuestionSet, evaluateAdaptiveAnswers } from '../data/adaptiveQuestionBank';

interface AdaptiveQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToCoach?: (prompt: string) => void;
}

export const AdaptiveQuestionModal: React.FC<AdaptiveQuestionModalProps> = ({ 
  isOpen, 
  onClose,
  onSendToCoach
}) => {
  const { user, reflectiveSentiment, diagnostic, setActiveTab } = useApp();

  const [questions, setQuestions] = useState<AdaptiveQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [evaluation, setEvaluation] = useState<ReturnType<typeof evaluateAdaptiveAnswers> | null>(null);

  // Initialize or regenerate question cohort
  useEffect(() => {
    if (isOpen) {
      const generated = generateAdaptiveQuestionSet({
        user,
        sentiment: reflectiveSentiment,
        diagnostic,
        count: 12
      });
      setQuestions(generated);
      setCurrentIndex(0);
      setAnswers({});
      setIsCompleted(false);
      setEvaluation(null);
    }
  }, [isOpen, reflectiveSentiment]);

  if (!isOpen || questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectScore = (score: number) => {
    const nextAnswers = { ...answers, [currentQ.id]: score };
    setAnswers(nextAnswers);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed all questions
      const evalResult = evaluateAdaptiveAnswers(questions, nextAnswers);
      setEvaluation(evalResult);
      setIsCompleted(true);
      try {
        confetti({ particleCount: 60, spread: 70 });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setEvaluation(null);
  };

  const handleDiscussWithCoach = () => {
    if (evaluation && onSendToCoach) {
      const prompt = `I just completed my 12-question daily adaptive check-in. My overall score is ${evaluation.overallScore}/100. My lowest phase was ${evaluation.lowestPhase} (${evaluation.phaseScores[evaluation.lowestPhase]}%). The recommendation was: "${evaluation.tailoredRecommendation}". Help me create a 24-hour action drill to strengthen this.`;
      onSendToCoach(prompt);
      onClose();
      setActiveTab('coach');
    }
  };

  const phaseColors: Record<RalPhase, { text: string; bg: string; border: string }> = {
    Pause: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-400/30' },
    Pursue: { text: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-400/30' },
    Reframe: { text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-400/30' },
    Decouple: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-400/30' },
    'Team Coherence': { text: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-400/30' }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#09152b] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white transition"
        >
          <X size={16} />
        </button>

        {!isCompleted ? (
          /* =========================================================================
             QUESTION FLOW VIEW
             ========================================================================= */
          <div className="space-y-6">
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${phaseColors[currentQ.phase].bg} ${phaseColors[currentQ.phase].text} ${phaseColors[currentQ.phase].border}`}>
                    {currentQ.phase} Phase
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Matrix: <strong className="text-slate-200">{currentQ.matrixAlignment}</strong>
                  </span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-slate-100 leading-relaxed">
                "{currentQ.text}"
              </h3>
              <p className="text-xs text-slate-400 leading-normal">
                {currentQ.subtext}
              </p>
            </div>

            {/* 1..5 Likert Scale Selection */}
            <div className="space-y-3">
              <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1">
                <span>1 · Rare / Developing</span>
                <span>3 · Inconsistent</span>
                <span>5 · Consistent / Mastered</span>
              </div>

              <div className="grid grid-cols-5 gap-2.5">
                {[1, 2, 3, 4, 5].map((score) => {
                  const isSelected = answers[currentQ.id] === score;
                  return (
                    <button
                      key={score}
                      onClick={() => handleSelectScore(score)}
                      className={`py-3 sm:py-3.5 rounded-xl text-center font-bold text-sm sm:text-base transition flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105 border-2 border-amber-300'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 hover:border-amber-400/50 hover:bg-slate-850'
                      }`}
                    >
                      <span>{score}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cognitive Rationale & Micro-Drill hint */}
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-[11px]">
                <Lightbulb size={12} />
                <span>Micro-Drill Cue:</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {currentQ.microDrill}
              </p>
            </div>

            {/* Navigation back / skip */}
            <div className="flex justify-between items-center pt-2 text-xs">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition"
              >
                <ArrowLeft size={14} />
                <span>Previous</span>
              </button>

              <button
                onClick={() => handleSelectScore(3)}
                className="text-slate-400 hover:text-amber-300 transition text-[11px]"
              >
                Skip / Neutral (3)
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================================
             COMPLETION & PERSONALIZED REPORT VIEW
             ========================================================================= */
          evaluation && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header */}
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  <CheckCircle2 size={13} />
                  <span>Session Check-in Completed</span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-100">
                  Adaptive Leadership Calibration
                </h3>
                <p className="text-xs text-slate-400">
                  Calculated against your role ({user.title || 'Executive'}), emotional sentiment, and live answers.
                </p>
              </div>

              {/* Overall Score Banner */}
              <div className="p-5 bg-gradient-to-r from-[#0d1d3d] to-[#0a162d] border border-amber-500/40 rounded-2xl flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400">
                    RAL Coherence Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-4xl font-heading font-extrabold text-slate-100 font-mono">
                      {evaluation.overallScore}
                    </span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Strongest Anchor: <strong className="text-emerald-300">{evaluation.highestPhase}</strong> ({evaluation.phaseScores[evaluation.highestPhase]}%)
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-rose-400">
                    Primary Growth Edge
                  </span>
                  <div className="text-lg font-heading font-bold text-rose-300 mt-0.5">
                    {evaluation.lowestPhase}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {evaluation.phaseScores[evaluation.lowestPhase]}% alignment
                  </span>
                </div>
              </div>

              {/* 5-Phase Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Phase Alignment Breakdown
                </h4>
                <div className="space-y-2 text-xs">
                  {(Object.keys(evaluation.phaseScores) as RalPhase[]).map((phase) => {
                    const score = evaluation.phaseScores[phase];
                    return (
                      <div key={phase} className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-semibold text-slate-200">{phase}</span>
                          <span className="font-mono text-slate-400">{score}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              score >= 70 ? 'bg-emerald-400' : score >= 50 ? 'bg-amber-400' : 'bg-rose-400'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tailored Executive Recommendation */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <Sparkles size={14} />
                  <span>Tailored RAL Recommendation:</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-medium">
                  {evaluation.tailoredRecommendation}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleDiscussWithCoach}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Sparkles size={14} />
                  <span>Discuss Weakest Edge with AI Coach</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition"
                >
                  Close & Continue
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
