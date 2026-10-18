import React, { useState } from 'react';
import { 
  Wrench, 
  Printer, 
  Download, 
  Layers, 
  Heart, 
  CheckCircle2, 
  Brain, 
  Sparkles, 
  Compass, 
  Share2,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RAL_NON_NEGOTIABLES, RAL_MATRICES } from '../data/ralFramework';

export const ToolkitView: React.FC = () => {
  const { openPauseModal } = useApp();
  const [activeTab, setActiveTab] = useState<'toolkit' | 'cheatsheet' | 'acrossLife' | 'aiGovernance'>('toolkit');

  const printDocument = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Executive Toolkits, Cheat Sheet & Multi-Domain Playbooks
          </span>
          <h1 className="text-3xl font-heading font-bold text-slate-100 mt-1">
            RAL Executive Toolkit Library
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            The operational cheat sheets, quick resets, and life philosophy guides for daily leadership.
          </p>
        </div>

        <button
          onClick={printDocument}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
        >
          <Printer size={15} />
          <span>Print / Export Toolkit</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-semibold overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('toolkit')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'toolkit' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          One-Page Operational Toolkit
        </button>
        <button
          onClick={() => setActiveTab('cheatsheet')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'cheatsheet' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Executive Leadership Cheat Sheet
        </button>
        <button
          onClick={() => setActiveTab('acrossLife')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'acrossLife' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Life Spheres: RAL Across All Domains
        </button>
        <button
          onClick={() => setActiveTab('aiGovernance')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'aiGovernance' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          AI Decision Governance Protocol
        </button>
      </div>

      {/* Tab 1: One-Page Operational Toolkit */}
      {activeTab === 'toolkit' && (
        <div className="bg-[#0a1128] border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl print:border-none print:p-0">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] uppercase font-mono text-amber-400 font-bold">Operational Toolkit</span>
            <h2 className="text-2xl font-heading font-bold text-slate-100">
              RAL One-Page Toolkit (Daily Operational Kit)
            </h2>
          </div>

          {/* 1. Matrix 1 Table: Identify State in <10 Seconds */}
          <div className="space-y-3">
            <h3 className="text-sm font-heading font-bold text-amber-300">
              1. Matrix 1 — Awareness Grid (RAAG): Identify State in &lt;10 Seconds
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-slate-300 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">State</th>
                    <th className="p-3">Signals You Feel</th>
                    <th className="p-3">Immediate Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
                  <tr>
                    <td className="p-3 font-bold text-rose-400">Reactive–Rigid</td>
                    <td className="p-3 text-slate-300">Tight body, defensive thoughts, urgency spikes</td>
                    <td className="p-3 text-amber-300 font-medium">Pause → 4 breaths → Name emotion</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Reactive–Fluid</td>
                    <td className="p-3 text-slate-300">Scattered focus, over-accommodating, confusion</td>
                    <td className="p-3 text-amber-300 font-medium">Center → "What is noise? What is signal?"</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-400">Reflective–Rigid</td>
                    <td className="p-3 text-slate-300">Calm but fixed mindset, narrow interpretation</td>
                    <td className="p-3 text-amber-300 font-medium">Reframe → "What else could be true?"</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-emerald-400">Reflective–Adaptive</td>
                    <td className="p-3 text-slate-300">Clear, steady, perceptive, non-reactive</td>
                    <td className="p-3 text-emerald-300 font-bold">Proceed → Make decisions with precision</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Matrix 2 & Matrix 3 Quick Protocols */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-heading font-bold text-sky-300">
                Matrix 2 — LSTM: Shift State in 30 Seconds
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li><strong className="text-amber-400">Step 1 — Pause:</strong> 4 deep breaths → tell your nervous system: "Stand down."</li>
                <li><strong className="text-amber-400">Step 2 — Perceive:</strong> Ask: "What is actually real right now?"</li>
                <li><strong className="text-amber-400">Step 3 — Reframe:</strong> Ask: "What meaning am I adding unnecessarily?"</li>
                <li><strong className="text-amber-400">Step 4 — Reset:</strong> Shift posture + tone → step into reflective mode.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-heading font-bold text-amber-300">
                Matrix 3 — ADG: Decision Alignment Protocol (DAP)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>1. Is my inner state clear?</li>
                <li>2. Is the environment clear?</li>
                <li>3. <strong className="text-rose-300">If mismatch:</strong> Delay / Stabilise / Gather information.</li>
                <li>4. <strong className="text-emerald-300">If both clear:</strong> Act cleanly and commit.</li>
              </ul>
            </div>
          </div>

          {/* 3. The 10-Second Reset & Mini-Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-heading font-bold text-amber-300">The 10-Second RAL Reset</h4>
              <ol className="space-y-1 text-xs text-slate-300 list-decimal list-inside">
                <li>Exhale slowly.</li>
                <li>Name your state.</li>
                <li>Spot distortion.</li>
                <li>Ask: "What might I be misreading?"</li>
                <li>Shift to clarity posture.</li>
              </ol>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-heading font-bold text-amber-300">The RAL Mini-Questions</h4>
              <ul className="space-y-1 text-xs text-slate-300">
                <li>• "What state am I in?"</li>
                <li>• "What am I assuming?"</li>
                <li>• "What is actually happening?"</li>
                <li>• "What is the smallest shift that restores clarity?"</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Executive Leadership Cheat Sheet */}
      {activeTab === 'cheatsheet' && (
        <div className="bg-[#0a1128] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] uppercase font-mono text-amber-400 font-bold">Executive Blueprint</span>
            <h2 className="text-2xl font-heading font-bold text-slate-100">
              RAL Leadership Cheat Sheet (The Four Core Matrices)
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-[#0c1a3b] to-[#091129] border border-amber-500/30">
            <h4 className="font-heading font-bold text-amber-300 text-sm">The Core Principle of RAL</h4>
            <p className="text-xs text-slate-200 mt-1">
              "Leadership collapses internally before it collapses externally. Measure the inner world → Stabilise the outer world."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {Object.values(RAL_MATRICES).map((mat, idx) => (
              <div key={idx} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono text-amber-400 font-bold">Matrix {idx + 1}</span>
                <h4 className="font-heading font-bold text-slate-100 text-sm">{mat.name}</h4>
                <p className="text-slate-300"><strong>Measures:</strong> {mat.measures}</p>
                <p className="text-slate-400"><strong>Purpose:</strong> {mat.purpose}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
            <h4 className="font-heading font-bold text-amber-300">The RAL Non-Negotiables</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              {RAL_NON_NEGOTIABLES.map((n, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-lg border border-slate-850">
                  <span className="font-bold text-amber-400 block mb-0.5">• {n.principle}</span>
                  <span className="text-slate-400 text-[11px]">{n.explanation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: RAL Across Life Spheres */}
      {activeTab === 'acrossLife' && (
        <div className="bg-[#0a1128] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] uppercase font-mono text-amber-400 font-bold">Domain Framework</span>
            <h2 className="text-2xl font-heading font-bold text-slate-100">
              RAL Across Life: Personal Mastery & Relationships
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Leadership does not belong to a title or boardroom; it belongs to human consciousness itself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
              <h4 className="font-heading font-bold text-amber-300 text-sm">RAL in Personal Relationships</h4>
              <p className="text-slate-300 leading-relaxed">
                Notice your emotional temperature before replying. Look beyond words: "What is actually happening here?" Shift from accusation to curiosity. Fewer escalations, deeper understanding.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
              <h4 className="font-heading font-bold text-sky-300 text-sm">RAL for Emotional Stability</h4>
              <p className="text-slate-300 leading-relaxed">
                Use micro-pauses to prevent emotional hijack: identify trigger, label emotion, reframe narrative, choose smallest adaptive action. You regain psychological autonomy.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
              <h4 className="font-heading font-bold text-indigo-300 text-sm">Mental Clarity in a Noisy World</h4>
              <p className="text-slate-300 leading-relaxed">
                Digital overload fractures attention. RAL restores cognitive order by filtering noise before it becomes anxiety, separating signal from stories, and keeping identity unshakeable.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
              <h4 className="font-heading font-bold text-emerald-300 text-sm">Conflict Navigation</h4>
              <p className="text-slate-300 leading-relaxed">
                Avoid the first impulse—it is always distorted. Perceive the fear behind the argument. Shift from "winning" to "understanding". Turn conflict from fire into information.
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5 md:col-span-2">
              <h4 className="font-heading font-bold text-amber-300 text-sm">The Adaptive Choice Quadrant (Daily Decisions)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="font-bold text-emerald-400 block">High Clarity / High Readiness</span>
                  <span>→ Act Now cleanly</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="font-bold text-amber-400 block">Low Clarity / High Emotion</span>
                  <span>→ Pause & Reset</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="font-bold text-sky-400 block">High Clarity / Low Readiness</span>
                  <span>→ Prepare & Sequence</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="font-bold text-indigo-400 block">Low Clarity / Low Readiness</span>
                  <span>→ Reflect deeper</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: AI Decision Governance Protocol */}
      {activeTab === 'aiGovernance' && (
        <div className="bg-[#0a1128] border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] uppercase font-mono text-amber-400 font-bold">Empirical Governance Protocol</span>
            <h2 className="text-2xl font-heading font-bold text-slate-100 flex items-center gap-2">
              <Cpu className="text-amber-400" size={24} />
              <span>AI-Supported Decision Protocol</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Grounded in the 2026 Executive AI Decision study. Auditing algorithmic advice through the reflective adaptive lens.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {[
              {
                rule: "1. Check Internal Assumptions",
                desc: "When using an AI recommendation, check what personal assumptions and biases you bring to the decision before accepting."
              },
              {
                rule: "2. Audit Emotional State & Pressure",
                desc: "Before accepting an important AI recommendation, notice whether current stress, fatigue, or deadline pressure is blinding your judgment."
              },
              {
                rule: "3. Distinguish AI Output from Interpretation",
                desc: "Strictly separate what the machine model output indicates from what you are assuming it means in context."
              },
              {
                rule: "4. Test Confirmation Bias",
                desc: "When an AI recommendation confirms what you already believed, deliberately search for counter-evidence."
              },
              {
                rule: "5. Human Accountability Override",
                desc: "When AI contributes to consequential decisions, a clearly identified human leader must retain full moral and operational accountability."
              },
              {
                rule: "6. Willingness to Revisit Decisions",
                desc: "Never defend an AI-supported decision solely because it was approved. Re-evaluate freely when ground conditions evolve."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-300 block mb-0.5">{item.rule}</span>
                <p className="text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
