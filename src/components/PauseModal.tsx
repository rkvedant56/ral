import React, { useState, useEffect, useRef } from 'react';
import { X, Play, RotateCcw, Volume2, VolumeX, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PauseModal: React.FC = () => {
  const { isPauseModalOpen, closePauseModal, pauseModalType, openPauseModal } = useApp();
  const [activeTab, setActiveTab] = useState<'10s' | '90s' | '4-2-6'>(pauseModalType);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(10);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Audio Context for soothing tone
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTone = (freq = 440, duration = 0.4) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio might be blocked by browser policy until interaction
    }
  };

  useEffect(() => {
    setActiveTab(pauseModalType);
    resetTimer(pauseModalType);
  }, [pauseModalType, isPauseModalOpen]);

  const resetTimer = (tab: '10s' | '90s' | '4-2-6') => {
    setIsRunning(false);
    setCurrentStepIndex(0);
    if (tab === '10s') setSecondsLeft(10);
    else if (tab === '90s') setSecondsLeft(90);
    else if (tab === '4-2-6') setSecondsLeft(12); // 4 in + 2 hold + 6 out = 12s per cycle
  };

  // 10s Reset Steps (2s each)
  const tenSecondSteps = [
    { label: "1. Exhale Slowly (2s)", sub: "Signal biological safety to your nervous system." },
    { label: "2. Scan Inner State (2s)", sub: "Notice somatic tension in shoulders, pulse, breath." },
    { label: "3. Name the Dominant Emotion (2s)", sub: "Label it in one word: impatience, fear, overwhelm." },
    { label: "4. Ask: 'What am I misreading?' (2s)", sub: "Separate the actual facts from defensive assumptions." },
    { label: "5. Shift to Clarity (2s)", sub: "Choose precision and presence over rushed speed." }
  ];

  // 4-2-6 Steps
  const fourTwoSixSteps = [
    { label: "Inhale Slowly (4s)", sub: "Deep diaphragmatic expansion through nose." },
    { label: "Hold Still (2s)", sub: "Savor the quiet pocket between thoughts." },
    { label: "Exhale Completely (6s)", sub: "Slow, soothing release through mouth; vagal activation." }
  ];

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => {
          const next = prev - 1;

          if (activeTab === '10s') {
            const elapsed = 10 - next;
            const newIndex = Math.min(4, Math.floor(elapsed / 2));
            if (newIndex !== currentStepIndex) {
              setCurrentStepIndex(newIndex);
              playTone(520, 0.25);
            }
          } else if (activeTab === '4-2-6') {
            const cyclePos = 12 - (next % 12);
            if (cyclePos <= 4) setCurrentStepIndex(0);
            else if (cyclePos <= 6) setCurrentStepIndex(1);
            else setCurrentStepIndex(2);
            if (next % 12 === 0 || next % 12 === 8 || next % 12 === 6) {
              playTone(440, 0.3);
            }
          }

          if (next === 0) {
            playTone(660, 0.7);
            setIsRunning(false);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, activeTab, currentStepIndex]);

  if (!isPauseModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0c142b] border border-amber-500/30 rounded-2xl shadow-2xl p-6 text-slate-100 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">RAL State Calibration</span>
            <h3 className="text-xl font-heading font-semibold text-slate-100">The Sacred Pause</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 text-slate-400 hover:text-amber-400 transition"
              title={soundEnabled ? "Mute Tone" : "Enable Tone"}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={closePauseModal}
              className="p-2 text-slate-400 hover:text-slate-100 transition rounded-lg hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-[#070c1e] p-1 rounded-xl my-4 text-xs font-medium">
          <button
            onClick={() => { setActiveTab('10s'); resetTimer('10s'); }}
            className={`py-2 px-3 rounded-lg transition ${activeTab === '10s' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'}`}
          >
            10s Reset
          </button>
          <button
            onClick={() => { setActiveTab('4-2-6'); resetTimer('4-2-6'); }}
            className={`py-2 px-3 rounded-lg transition ${activeTab === '4-2-6' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'}`}
          >
            4–2–6 Breath
          </button>
          <button
            onClick={() => { setActiveTab('90s'); resetTimer('90s'); }}
            className={`py-2 px-3 rounded-lg transition ${activeTab === '90s' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'}`}
          >
            90s Wave
          </button>
        </div>

        {/* Timer Visualization Circle */}
        <div className="my-6 flex flex-col items-center justify-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Animated breathing outer ring */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-amber-400/40 transition-all duration-1000 ${
                isRunning ? 'scale-110 shadow-lg shadow-amber-500/20 animate-pulse' : 'scale-100'
              }`}
            />
            <div className="absolute inset-3 rounded-full border border-sky-400/30" />
            <div className="text-center z-10">
              <span className="text-4xl font-mono font-bold text-amber-300 tracking-tight">
                {secondsLeft}s
              </span>
              <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider">
                {isRunning ? (activeTab === '4-2-6' ? fourTwoSixSteps[currentStepIndex]?.label.split(' ')[0] : 'In Progress') : 'Ready'}
              </p>
            </div>
          </div>
        </div>

        {/* Step Guide Text */}
        <div className="min-h-[72px] bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
          {activeTab === '10s' && (
            <div>
              <p className="text-sm font-semibold text-amber-200">
                {tenSecondSteps[currentStepIndex]?.label}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {tenSecondSteps[currentStepIndex]?.sub}
              </p>
            </div>
          )}

          {activeTab === '4-2-6' && (
            <div>
              <p className="text-sm font-semibold text-sky-200">
                {fourTwoSixSteps[currentStepIndex]?.label}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {fourTwoSixSteps[currentStepIndex]?.sub}
              </p>
            </div>
          )}

          {activeTab === '90s' && (
            <div>
              <p className="text-sm font-semibold text-amber-200">
                90-Second Neurochemical Wave Wash
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Emotions crest and dissolve within 90 seconds unless sustained by stories. Let the adrenaline dissipate without taking action.
              </p>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between gap-3 mt-6">
          <button
            onClick={() => resetTimer(activeTab)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-medium transition"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          <button
            onClick={() => {
              if (!isRunning && secondsLeft === 0) {
                resetTimer(activeTab);
              }
              setIsRunning(!isRunning);
              if (!isRunning) playTone(440, 0.3);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm shadow-lg shadow-amber-500/20 transition"
          >
            {isRunning ? (
              <span>Pause Timer</span>
            ) : (
              <>
                <Play size={16} fill="currentColor" />
                <span>{secondsLeft === 0 ? 'Restart Pause' : 'Begin Calibration'}</span>
              </>
            )}
          </button>
        </div>

        {/* RAL Principle footer */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-500 italic">
            "Leadership collapses internally before it collapses externally. Stabilise the inner world." — RK Vedant
          </p>
        </div>
      </div>
    </div>
  );
};
