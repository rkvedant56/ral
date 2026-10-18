import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Award, 
  ChevronRight, 
  ArrowLeft, 
  Save, 
  HelpCircle, 
  Compass, 
  Layers, 
  ShieldCheck,
  Zap,
  Bookmark
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { RAL_CHAPTERS, ChapterData } from '../data/ralFramework';

export const LearnView: React.FC = () => {
  const { 
    completedChapters, 
    markChapterComplete, 
    chapterNotes, 
    saveChapterNote, 
    quizScores, 
    saveQuizScore 
  } = useApp();

  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<number>(0); // 0 = all, 1 = Sec I, 2 = Sec II, 3 = Sec III
  const [activeTab, setActiveTab] = useState<'lesson' | 'scenario' | 'quiz' | 'notes'>('lesson');

  // Quiz state inside chapter modal
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const selectedChapter = RAL_CHAPTERS.find(c => c.id === selectedChapterId);

  const filteredChapters = selectedSection === 0 
    ? RAL_CHAPTERS 
    : RAL_CHAPTERS.filter(c => c.sectionNumber === selectedSection);

  const completionPercent = Math.round((completedChapters.length / RAL_CHAPTERS.length) * 100);

  const handleOpenChapter = (id: number) => {
    setSelectedChapterId(id);
    setActiveTab('lesson');
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    window.location.hash = `#/learn/chapter-${id}`;
  };

  const handleQuizAnswer = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedQuizOption(idx);
    setQuizSubmitted(true);

    if (selectedChapter && idx === selectedChapter.quiz.correctIndex) {
      saveQuizScore(selectedChapter.id, 100);
      markChapterComplete(selectedChapter.id);
      try {
        confetti({ particleCount: 40, spread: 45 });
      } catch (e) {}
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-fadeIn">
      {/* Header and Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            The Living Doctrine · 16 Masterclass Modules
          </span>
          <h1 className="text-3xl font-heading font-bold text-slate-100 mt-1">
            RAL Masterclass & Modules
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Grounded directly in RK Vedant's structured leadership architecture.
          </p>
        </div>

        {/* Global Progress */}
        <div className="bg-[#0a1128] border border-slate-800 p-3 rounded-2xl flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Course Mastery</span>
            <span className="text-xs font-mono font-bold text-amber-300">
              {completedChapters.length} / 16 Modules Done ({completionPercent}%)
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-slate-700 flex items-center justify-center relative">
            <span className="text-xs font-mono font-bold text-slate-200">{completionPercent}%</span>
          </div>
        </div>
      </div>

      {!selectedChapter ? (
        /* Modules Grid View */
        <div className="space-y-6">
          {/* Section Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedSection(0)}
              className={`px-3 py-1.5 rounded-xl transition ${selectedSection === 0 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
            >
              All 16 Modules
            </button>
            <button
              onClick={() => setSelectedSection(1)}
              className={`px-3 py-1.5 rounded-xl transition ${selectedSection === 1 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
            >
              Section I: Inner Shift (Modules 1–6)
            </button>
            <button
              onClick={() => setSelectedSection(2)}
              className={`px-3 py-1.5 rounded-xl transition ${selectedSection === 2 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
            >
              Section II: Adaptive Shift (Modules 7–10)
            </button>
            <button
              onClick={() => setSelectedSection(3)}
              className={`px-3 py-1.5 rounded-xl transition ${selectedSection === 3 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}
            >
              Section III: Real World (Modules 11–16)
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChapters.map((ch) => {
              const isDone = completedChapters.includes(ch.id);
              return (
                <div
                  key={ch.id}
                  onClick={() => handleOpenChapter(ch.id)}
                  className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between group ${
                    isDone
                      ? 'bg-[#091326] border-emerald-500/30 hover:border-emerald-400/50'
                      : 'bg-[#0a1128] border-slate-800 hover:border-amber-500/40 hover:bg-[#0c1533]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 font-bold">
                        Module {ch.id}
                      </span>
                      {isDone ? (
                        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                          <CheckCircle2 size={13} />
                          <span>Mastered</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-500">Unread</span>
                      )}
                    </div>

                    <h3 className="text-base font-heading font-bold text-slate-100 group-hover:text-amber-200 transition">
                      {ch.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {ch.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-[11px] italic font-light truncate max-w-[200px]">
                      "{ch.mantra}"
                    </span>
                    <ChevronRight size={15} className="group-hover:translate-x-1 transition text-amber-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Single Chapter Detail View */
        <div className="bg-[#0a1128] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Back button and title */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <button
              onClick={() => setSelectedChapterId(null)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition font-medium"
            >
              <ArrowLeft size={14} />
              <span>Back to all modules</span>
            </button>

            <span className="text-xs font-mono text-amber-400 font-semibold">
              {selectedChapter.section} · Module {selectedChapter.id}
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-100">
              {selectedChapter.title}
            </h2>
            <p className="text-sm text-slate-300 mt-1">{selectedChapter.subtitle}</p>

            {/* RAL Law & Mantra Box */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#0c183a] to-[#091129] border border-amber-500/40 space-y-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400">RAL Law #{selectedChapter.id}</span>
                <p className="text-sm font-heading font-bold text-amber-200 mt-0.5">
                  "{selectedChapter.ralLaw}"
                </p>
              </div>
              <div className="pt-2 border-t border-amber-500/20 flex items-center gap-2 text-xs text-slate-300">
                <span className="text-amber-400 font-semibold">Mantra:</span>
                <span className="italic font-medium">"{selectedChapter.mantra}"</span>
              </div>
            </div>
          </div>

          {/* Module Inner Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('lesson')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'lesson' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Lesson & Takeaways
            </button>
            <button
              onClick={() => setActiveTab('scenario')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'scenario' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Case Scenario
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'quiz' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Mastery Quiz
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'notes' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Reflections & Notes
            </button>
          </div>

          {/* Tab 1: Lesson & Takeaways */}
          {activeTab === 'lesson' && (
            <div className="space-y-6">
              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
                <p>{selectedChapter.summary}</p>
              </div>

              {/* Key Takeaways */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs uppercase font-bold text-amber-400">Core Takeaways:</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedChapter.keyTakeaways.map((k, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Micro-Practice */}
              <div className="p-4 bg-[#091533] rounded-xl border border-sky-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase font-bold text-sky-300">
                    Micro-Practice: {selectedChapter.microPractice.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {selectedChapter.microPractice.duration}
                  </span>
                </div>
                <ol className="space-y-1 text-xs text-slate-200">
                  {selectedChapter.microPractice.steps.map((st, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono text-sky-400 font-bold">{i + 1}.</span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Tab 2: Real-World Scenario */}
          {activeTab === 'scenario' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Dilemma</span>
                <h4 className="font-heading font-bold text-slate-100 text-base mb-2">
                  {selectedChapter.scenario.title}
                </h4>
                <p className="text-slate-300 leading-relaxed mb-3">
                  <strong>Context:</strong> {selectedChapter.scenario.context}
                </p>
                <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-red-200">
                  <strong>The Trap:</strong> {selectedChapter.scenario.challenge}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                <span className="text-[10px] uppercase font-bold text-emerald-400">RAL Resolution</span>
                <p className="text-emerald-100 leading-relaxed">
                  {selectedChapter.scenario.ralResolution}
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Interactive Mastery Quiz */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
                <h4 className="text-sm font-semibold text-slate-100 mb-3">
                  {selectedChapter.quiz.question}
                </h4>

                <div className="space-y-2">
                  {selectedChapter.quiz.options.map((opt, idx) => {
                    const isSelected = selectedQuizOption === idx;
                    const isCorrect = idx === selectedChapter.quiz.correctIndex;
                    let borderClass = 'border-slate-800 hover:border-slate-700 text-slate-300 bg-slate-950';

                    if (quizSubmitted) {
                      if (isCorrect) borderClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold';
                      else if (isSelected) borderClass = 'border-rose-500 bg-rose-950/40 text-rose-200';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(idx)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between ${borderClass}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && <CheckCircle2 size={16} className="text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-amber-400 block mb-1">Explanation:</strong>
                    {selectedChapter.quiz.explanation}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: Reflection Journal Notepad */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs uppercase font-bold text-amber-400">Module Reflection Prompt:</h4>
                <p className="text-xs text-slate-200 italic font-medium">
                  "{selectedChapter.reflectionQuestion}"
                </p>
                <textarea
                  value={chapterNotes[selectedChapter.id] || ''}
                  onChange={(e) => saveChapterNote(selectedChapter.id, e.target.value)}
                  placeholder="Record your executive insights and commitments here..."
                  rows={6}
                  className="w-full mt-2 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] text-slate-500">Auto-saved to your profile</span>
                  <button
                    onClick={() => markChapterComplete(selectedChapter.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold hover:bg-emerald-500/30 transition"
                  >
                    <CheckCircle2 size={14} />
                    <span>Mark Module Complete</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
