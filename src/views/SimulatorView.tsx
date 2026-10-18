import React, { useState } from 'react';
import { 
  Zap, 
  Send, 
  ShieldAlert, 
  Award, 
  RotateCcw, 
  BarChart2, 
  HelpCircle, 
  AlertCircle,
  CheckCircle,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { SIMULATION_SCENARIOS } from '../data/ralFramework';
import { RadarChart } from '../components/RadarChart';

export const SimulatorView: React.FC = () => {
  const { diagnostic } = useApp();

  const [activeScenarioId, setActiveScenarioId] = useState<string>('sim-1');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'model'; text: string }>>([
    {
      sender: 'model',
      text: SIMULATION_SCENARIOS[0].initialMessage
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);

  const currentScenario = SIMULATION_SCENARIOS.find(s => s.id === activeScenarioId) || SIMULATION_SCENARIOS[0];

  const handleSelectScenario = (id: string) => {
    const sc = SIMULATION_SCENARIOS.find(s => s.id === id) || SIMULATION_SCENARIOS[0];
    setActiveScenarioId(id);
    setMessages([{ sender: 'model', text: sc.initialMessage }]);
    setEvaluationResult(null);
    setInput('');
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    const updatedMessages = [...messages, { sender: 'user' as const, text: userText }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: currentScenario.id,
          scenarioTitle: currentScenario.title,
          scenarioContext: currentScenario.briefing,
          roleName: currentScenario.roleName,
          messages: updatedMessages,
          actionType: 'reply'
        })
      });

      const data = await response.json();
      setMessages([...updatedMessages, { sender: 'model' as const, text: data.reply }]);
    } catch (err: any) {
      setMessages([
        ...updatedMessages,
        { sender: 'model' as const, text: "I'm waiting for your answer. What is your immediate decision?" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEvaluate = async () => {
    if (messages.length < 2 || isEvaluating) return;

    setIsEvaluating(true);
    try {
      const response = await fetch('/api/scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: currentScenario.id,
          scenarioTitle: currentScenario.title,
          scenarioContext: currentScenario.briefing,
          roleName: currentScenario.roleName,
          messages,
          actionType: 'evaluate'
        })
      });

      const data = await response.json();
      setEvaluationResult(data.evaluation);
      try {
        confetti({ particleCount: 60, spread: 60 });
      } catch (e) {}
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          AI Roleplay & Stress Testing
        </span>
        <h1 className="text-3xl font-heading font-bold text-slate-100 mt-1">
          Leadership Scenario Simulator
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Step into high-stakes boardrooms, mutinies, ethical crises, and algorithmic dilemmas. Gemini plays the counterpart; your responses are scored against the 4 RAL Matrices.
        </p>
      </div>

      {/* Scenario Selector Carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SIMULATION_SCENARIOS.map((sc) => {
          const isSelected = activeScenarioId === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc.id)}
              className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                isSelected 
                  ? 'bg-amber-500/15 border-amber-400 text-amber-300 font-semibold shadow-lg' 
                  : 'bg-[#0a1128] border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-amber-400 block mb-1">Doctrine Pillar #{sc.chapterId}</span>
                <h4 className="text-xs font-heading font-bold text-slate-100 leading-snug">{sc.title}</h4>
              </div>
              <span className="text-[10px] text-slate-500 mt-2 block truncate">Role: {sc.roleName.split(' (')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Scenario Briefing Card */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-sky-400 block">Simulation Context & Mission</span>
          <p className="text-slate-300 mt-0.5 leading-relaxed">{currentScenario.briefing}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleSelectScenario(activeScenarioId)}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition"
            title="Restart Simulation"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={handleEvaluate}
            disabled={messages.length < 2 || isEvaluating}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              messages.length >= 2 && !isEvaluating
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-md'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Award size={14} />
            <span>{isEvaluating ? 'Scoring...' : 'Score My Leadership'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Simulation Chat */}
      <div className="bg-[#061e16] border border-[#144234] rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col h-[420px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-3">
          {messages.map((m, idx) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser ? 'bg-amber-500 text-slate-950' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}
                >
                  {isUser ? 'You' : 'AI'}
                </div>

                <div
                  className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-[#092c21] text-emerald-100 border border-[#144234] rounded-tl-none'
                  }`}
                >
                  {!isUser && (
                    <span className="text-[10px] font-bold text-amber-300 block mb-1">
                      {currentScenario.roleName}:
                    </span>
                  )}
                  {m.text}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 italic p-2">
              <span>{currentScenario.roleName} is reacting...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-3 border-t border-[#12382c]"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Respond from inner stillness, curiosity, and RAL clarity..."
            className="flex-1 bg-[#041510] border border-[#144234] rounded-xl px-3 py-2.5 text-xs text-slate-100 placeholder:text-emerald-500/50 focus:outline-none focus:border-amber-400 min-h-[44px]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-2.5 rounded-xl text-xs font-bold transition min-h-[44px] min-w-[44px] flex items-center justify-center ${
              input.trim() && !isLoading
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold'
                : 'bg-[#092c21] text-emerald-600 cursor-not-allowed border border-[#144234]'
            }`}
          >
            <Send size={15} />
          </button>
        </form>
      </div>

      {/* Evaluation Results Card */}
      {evaluationResult && (
        <div className="bg-[#0a1128] border border-amber-500/40 rounded-2xl p-6 shadow-2xl animate-fadeIn space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase font-mono text-amber-400 font-bold">RAL Diagnostic Scoring</span>
              <h3 className="text-xl font-heading font-bold text-slate-100 mt-0.5">
                Simulation Performance Debrief
              </h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-heading font-bold text-amber-300">
                {evaluationResult.compositeScore}
              </span>
              <span className="text-xs text-slate-400">/ 200 ({evaluationResult.band})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Scores breakdown */}
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                <span>RAAG (Perceptual Accuracy):</span>
                <span className="font-bold text-sky-400">{evaluationResult.raagScore}/50</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                <span>LSTM (State Transition Speed):</span>
                <span className="font-bold text-indigo-400">{evaluationResult.lstmScore}/50</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                <span>ADG (Decision Posture Alignment):</span>
                <span className="font-bold text-amber-400">{evaluationResult.adgScore}/50</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between">
                <span>ACL (Cultural Psychological Safety):</span>
                <span className="font-bold text-rose-400">{evaluationResult.aclScore}/50</span>
              </div>
            </div>

            {/* Radar chart */}
            <div className="flex justify-center">
              <RadarChart
                raag={evaluationResult.raagScore}
                lstm={evaluationResult.lstmScore}
                adg={evaluationResult.adgScore}
                acl={evaluationResult.aclScore}
                benchmark={40}
                size={210}
              />
            </div>
          </div>

          {/* Qualitative feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
              <span className="font-bold text-emerald-300 uppercase block mb-1">Demonstrated Strengths</span>
              <p className="text-emerald-100 leading-relaxed">{evaluationResult.strengths}</p>
            </div>
            <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-xl">
              <span className="font-bold text-amber-300 uppercase block mb-1">Observed Blindspots</span>
              <p className="text-amber-100 leading-relaxed">{evaluationResult.blindspots}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs">
            <span className="font-bold text-sky-300 uppercase block mb-1">Prescribed RAL Correction</span>
            <p className="text-slate-200 leading-relaxed">{evaluationResult.ralPrescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};
