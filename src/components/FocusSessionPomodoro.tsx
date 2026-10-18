import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Headphones, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Clock, 
  Wind, 
  Sliders, 
  Music, 
  Brain, 
  ExternalLink,
  Save,
  Coffee,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export interface FocusModePreset {
  id: 'classic' | 'extended' | 'sprint' | 'custom';
  name: string;
  workMinutes: number;
  pauseMinutes: number;
  description: string;
}

const PRESETS: FocusModePreset[] = [
  {
    id: 'classic',
    name: 'Classic RAL Focus',
    workMinutes: 25,
    pauseMinutes: 5,
    description: '25 min deep cognitive focus followed by a 5 min reflective pause.'
  },
  {
    id: 'extended',
    name: 'Strategic Flow',
    workMinutes: 50,
    pauseMinutes: 10,
    description: '50 min architecture & deep decisions, followed by 10 min 4-2-6 breath.'
  },
  {
    id: 'sprint',
    name: 'Clarity Sprint',
    workMinutes: 15,
    pauseMinutes: 3,
    description: '15 min urgent triage deceleration followed by a 3 min stillness break.'
  }
];

interface AmbientSoundscapeOption {
  id: string;
  name: string;
  instrument: string;
  timbre: 'flute' | 'plucked' | 'santoor' | 'bowl' | 'silence';
  notes: number[];
}

const AMBIENT_SOUNDSCAPES: AmbientSoundscapeOption[] = [
  {
    id: 'bansuri-dawn',
    name: 'Himalayan Bansuri Flute',
    instrument: 'Bamboo Flute',
    timbre: 'flute',
    notes: [261.63, 293.66, 329.63, 392.00, 440.00]
  },
  {
    id: 'saraswati-veena',
    name: 'Saraswati Veena & Tanpura',
    instrument: 'Plucked Veena',
    timbre: 'plucked',
    notes: [130.81, 164.81, 196.00, 261.63]
  },
  {
    id: 'kashmiri-santoor',
    name: 'Kashmiri Santoor Cascades',
    instrument: 'Hammered Santoor',
    timbre: 'santoor',
    notes: [220.00, 261.63, 293.66, 392.00, 440.00]
  },
  {
    id: 'tibetan-bowls',
    name: 'Tibetan 7-Metal Singing Bowls',
    instrument: 'Meditation Bowls',
    timbre: 'bowl',
    notes: [108.00, 216.00, 432.00]
  },
  {
    id: 'silent-bell',
    name: 'Silent (Chime on Transition Only)',
    instrument: 'Pure Silence',
    timbre: 'silence',
    notes: []
  }
];

export const FocusSessionPomodoro: React.FC = () => {
  const { 
    openMusic, 
    focusSessionLogs, 
    addFocusSessionLog, 
    updateScorecard, 
    currentDay 
  } = useApp();

  const [selectedPresetId, setSelectedPresetId] = useState<'classic' | 'extended' | 'sprint' | 'custom'>('classic');
  const [customWorkMin, setCustomWorkMin] = useState<number>(30);
  const [customPauseMin, setCustomPauseMin] = useState<number>(7);
  
  const currentPreset = PRESETS.find(p => p.id === selectedPresetId) || {
    id: 'custom' as const,
    name: 'Custom Calibration',
    workMinutes: customWorkMin,
    pauseMinutes: customPauseMin,
    description: 'Customized deep work and reflective pause intervals.'
  };

  const [intervalType, setIntervalType] = useState<'work' | 'pause'>('work');
  const [totalSeconds, setTotalSeconds] = useState<number>(currentPreset.workMinutes * 60);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(currentPreset.workMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  const [taskIntention, setTaskIntention] = useState<string>('');
  const [selectedSoundscapeId, setSelectedSoundscapeId] = useState<string>('bansuri-dawn');
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.35);

  const [completedSessionsCount, setCompletedSessionsCount] = useState<number>(() => {
    return focusSessionLogs.filter(l => l.timestamp.startsWith(new Date().toISOString().split('T')[0])).length;
  });

  // Audio synthesis Web Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noteIntervalRef = useRef<any>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const selectedSoundscape = AMBIENT_SOUNDSCAPES.find(s => s.id === selectedSoundscapeId) || AMBIENT_SOUNDSCAPES[0];

  // Helper to init AudioContext
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      const mg = audioCtxRef.current.createGain();
      mg.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
      mg.connect(audioCtxRef.current.destination);
      masterGainRef.current = mg;
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play transition chime (Tibetan bowl sound)
  const playTransitionBell = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx || !masterGainRef.current) return;
      const now = ctx.currentTime;
      
      const freqs = [432, 864, 1296];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);
        
        const vol = (0.25 / (idx + 1)) * (volume / 0.5);
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(vol, now + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(g);
        g.connect(masterGainRef.current!);
        osc.start(now);
        osc.stop(now + 4.0);
      });
    } catch (e) {
      // Audio fallback
    }
  };

  // Play subtle ambient note during focus work
  const playAmbientNote = () => {
    if (!isAudioEnabled || selectedSoundscape.timbre === 'silence') return;
    try {
      const ctx = getAudioContext();
      if (!ctx || !masterGainRef.current) return;
      const now = ctx.currentTime;
      const notes = selectedSoundscape.notes;
      if (notes.length === 0) return;

      const freq = notes[Math.floor(Math.random() * notes.length)];
      const osc = ctx.createOscillator();
      const g = ctx.createGain();

      osc.type = selectedSoundscape.timbre === 'flute' ? 'sine' : selectedSoundscape.timbre === 'santoor' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const noteVol = 0.08 * (volume / 0.5);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(noteVol, now + 0.1);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(g);
      g.connect(masterGainRef.current!);
      osc.start(now);
      osc.stop(now + 2.6);
    } catch (e) {}
  };

  // Start / Stop ambient audio loop
  useEffect(() => {
    if (isRunning && isAudioEnabled && selectedSoundscape.timbre !== 'silence') {
      noteIntervalRef.current = setInterval(playAmbientNote, 3200);
    } else {
      if (noteIntervalRef.current) clearInterval(noteIntervalRef.current);
    }
    return () => {
      if (noteIntervalRef.current) clearInterval(noteIntervalRef.current);
    };
  }, [isRunning, isAudioEnabled, selectedSoundscapeId, volume]);

  // Handle master volume update
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Main countdown timer ticker
  useEffect(() => {
    let timer: any = null;
    if (isRunning && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (isRunning && secondsRemaining === 0) {
      handleIntervalComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsRemaining]);

  // When an interval reaches 0
  const handleIntervalComplete = () => {
    setIsRunning(false);
    playTransitionBell();

    if (intervalType === 'work') {
      // Completed deep work interval!
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}

      // Log session
      const workMin = selectedPresetId === 'custom' ? customWorkMin : currentPreset.workMinutes;
      addFocusSessionLog({
        durationMinutes: workMin,
        taskTitle: taskIntention.trim() || 'Reflective Deep Work Block',
        mode: selectedPresetId,
        soundscapeUsed: selectedSoundscape.name
      });

      // Update today's scorecard factor (act/grow)
      updateScorecard(currentDay, { act: true, score: 3 });

      setCompletedSessionsCount(prev => prev + 1);

      // Transition to pause
      setIntervalType('pause');
      const pauseSec = (selectedPresetId === 'custom' ? customPauseMin : currentPreset.pauseMinutes) * 60;
      setTotalSeconds(pauseSec);
      setSecondsRemaining(pauseSec);
    } else {
      // Completed pause interval!
      setIntervalType('work');
      const workSec = (selectedPresetId === 'custom' ? customWorkMin : currentPreset.workMinutes) * 60;
      setTotalSeconds(workSec);
      setSecondsRemaining(workSec);
    }
  };

  // Reset or change preset
  const handleSelectPreset = (id: 'classic' | 'extended' | 'sprint' | 'custom') => {
    setSelectedPresetId(id);
    setIsRunning(false);
    setIntervalType('work');
    const p = PRESETS.find(pr => pr.id === id);
    const workMin = p ? p.workMinutes : customWorkMin;
    setTotalSeconds(workMin * 60);
    setSecondsRemaining(workMin * 60);
  };

  const handleTogglePlay = () => {
    if (!isRunning) {
      getAudioContext();
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIntervalType('work');
    const workMin = selectedPresetId === 'custom' ? customWorkMin : currentPreset.workMinutes;
    setTotalSeconds(workMin * 60);
    setSecondsRemaining(workMin * 60);
  };

  const handleSkip = () => {
    setIsRunning(false);
    if (intervalType === 'work') {
      setIntervalType('pause');
      const pauseSec = (selectedPresetId === 'custom' ? customPauseMin : currentPreset.pauseMinutes) * 60;
      setTotalSeconds(pauseSec);
      setSecondsRemaining(pauseSec);
    } else {
      setIntervalType('work');
      const workSec = (selectedPresetId === 'custom' ? customWorkMin : currentPreset.workMinutes) * 60;
      setTotalSeconds(workSec);
      setSecondsRemaining(workSec);
    }
  };

  // Calculate percentage and formats
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const progressRatio = totalSeconds > 0 ? (totalSeconds - secondsRemaining) / totalSeconds : 0;
  const strokeDashoffset = 283 - 283 * progressRatio;

  return (
    <div className="space-y-6">
      {/* Top Banner: Mode presets & stats */}
      <div className="bg-[#051c14] border border-[#144234] rounded-3xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#12382c]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                Deep Work Calibration
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono">
                Pomodoro · Soothe Synced
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-100 mt-1">
              Reflective Focus Session
            </h2>
            <p className="text-xs text-emerald-300/70 mt-0.5">
              Execute with single-task velocity, anchored in diaphragmatic calmness and acoustic soundscapes.
            </p>
          </div>

          {/* Today's Focus Stats */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 px-3.5 rounded-2xl bg-[#082a1f] border border-[#164d3b] flex items-center gap-2">
              <Flame size={16} className="text-amber-400" />
              <div>
                <span className="text-[10px] text-emerald-400/70 block leading-tight">Today's Sessions</span>
                <span className="text-xs font-bold font-mono text-amber-300">{completedSessionsCount} Completed</span>
              </div>
            </div>

            <button
              onClick={() => openMusic('focus')}
              className="p-2.5 px-3.5 rounded-2xl bg-[#082a1f] hover:bg-[#0c3829] border border-[#164d3b] hover:border-amber-400/40 text-emerald-200 text-xs font-semibold transition flex items-center gap-1.5"
              title="Open full 100+ soundscape player modal"
            >
              <Music size={14} className="text-amber-300" />
              <span className="hidden sm:inline">100+ Soothe Studio</span>
              <ExternalLink size={12} className="text-emerald-400/70" />
            </button>
          </div>
        </div>

        {/* Preset Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5">
          {PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                type="button"
                className={`p-3.5 rounded-2xl text-left border transition ${
                  isSelected
                    ? 'bg-[#092e22] border-amber-400 shadow-md ring-1 ring-amber-400/30'
                    : 'bg-[#062017]/70 border-[#144234] hover:bg-[#08291f] text-emerald-300/80 hover:text-emerald-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                    {preset.name}
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {preset.workMinutes}m / {preset.pauseMinutes}m
                  </span>
                </div>
                <p className="text-[11px] text-emerald-400/60 leading-snug">
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Timer Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Radial Countdown Timer & Controls (8 cols) */}
        <div className="lg:col-span-8 bg-[#051c14] border border-[#144234] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center justify-center space-y-6">
          {/* Phase Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition">
            {intervalType === 'work' ? (
              <span className="bg-amber-500/15 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Brain size={13} className="text-amber-400" />
                <span>Deep Work Interval</span>
              </span>
            ) : (
              <span className="bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                <Wind size={13} className="text-emerald-300" />
                <span>Reflective 4-2-6 Pause Interval</span>
              </span>
            )}
          </div>

          {/* Radial Circular SVG Progress Countdown */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background ring */}
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-[#09261d]"
                strokeWidth="5"
                fill="transparent"
              />
              {/* Active progress ring */}
              <circle
                cx="50"
                cy="50"
                r="45"
                className={`transition-all duration-1000 ease-linear ${
                  intervalType === 'work' ? 'stroke-amber-400' : 'stroke-emerald-400'
                }`}
                strokeWidth="5"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Centered Numbers & Status */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-1">
              <span className="text-5xl sm:text-6xl font-heading font-black tracking-tight text-slate-100 font-mono">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-xs uppercase tracking-widest text-emerald-400/70 font-semibold">
                {intervalType === 'work' ? 'Cognitive Clarity' : 'Diaphragmatic Breath'}
              </span>
              {isRunning && (
                <span className="text-[10px] text-amber-300/80 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>Session Active</span>
                </span>
              )}
            </div>
          </div>

          {/* Intention Input Box */}
          <div className="w-full max-w-md">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-emerald-400/80 mb-1.5 text-center">
              Today's Singular High-Leverage Intention:
            </label>
            <input
              type="text"
              value={taskIntention}
              onChange={(e) => setTaskIntention(e.target.value)}
              placeholder="e.g. Draft Q4 Architecture Strategy without reactive hurry"
              className="w-full px-4 py-2.5 rounded-xl bg-[#07251a] border border-[#164d3b] text-xs sm:text-sm text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-amber-400 transition text-center"
            />
          </div>

          {/* Primary Controls: Play/Pause, Reset, Skip */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="p-3 rounded-2xl bg-[#08291e] hover:bg-[#0c3829] border border-[#164d3b] text-emerald-300 hover:text-white transition"
              title="Reset Timer"
            >
              <RotateCcw size={16} />
            </button>

            <button
              onClick={handleTogglePlay}
              className={`px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-xl transition transform hover:scale-[1.02] active:scale-98 flex items-center gap-2 ${
                isRunning
                  ? 'bg-[#0a3526] hover:bg-[#0d4432] border border-amber-400/50 text-amber-300'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-amber-500/25'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause size={18} />
                  <span>Pause Focus</span>
                </>
              ) : (
                <>
                  <Play size={18} fill="currentColor" />
                  <span>Start Focus Session</span>
                </>
              )}
            </button>

            <button
              onClick={handleSkip}
              className="p-3 rounded-2xl bg-[#08291e] hover:bg-[#0c3829] border border-[#164d3b] text-emerald-300 hover:text-white transition"
              title="Skip to Next Interval"
            >
              <SkipForward size={16} />
            </button>
          </div>
        </div>

        {/* Right: Ambient Soundscape & Pause Guidance (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Integrated Soothe Soundscape Selector */}
          <div className="bg-[#051c14] border border-[#144234] rounded-3xl p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#12382c]">
              <div className="flex items-center gap-2">
                <Headphones size={15} className="text-amber-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
                  Ambient Soothe Audio
                </h4>
              </div>
              
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className={`p-1.5 rounded-lg border text-xs transition ${
                  isAudioEnabled 
                    ? 'bg-amber-400/20 border-amber-400/50 text-amber-300' 
                    : 'bg-[#07241a] border-[#144234] text-emerald-500'
                }`}
                title={isAudioEnabled ? "Mute ambient audio" : "Enable ambient audio"}
              >
                {isAudioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </button>
            </div>

            <p className="text-[11px] text-emerald-300/70 leading-snug">
              Plays acoustic micro-tones during work intervals and sounds a Tibetan bronze bowl upon completion.
            </p>

            {/* Soundscape Choices */}
            <div className="space-y-1.5">
              {AMBIENT_SOUNDSCAPES.map((s) => {
                const isSelected = selectedSoundscapeId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedSoundscapeId(s.id);
                      if (!audioCtxRef.current) getAudioContext();
                    }}
                    type="button"
                    className={`w-full p-2.5 rounded-xl text-left border text-xs transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#092e22] border-amber-400 text-amber-300 font-semibold'
                        : 'bg-[#07241a]/60 border-[#144234] text-emerald-300/70 hover:bg-[#0c3829] hover:text-emerald-100'
                    }`}
                  >
                    <div>
                      <span className="block truncate">{s.name}</span>
                      <span className="block text-[10px] text-emerald-400/50">{s.instrument}</span>
                    </div>
                    {isSelected && (
                      <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Volume Slider */}
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400/70">
              <VolumeX size={12} />
              <input
                type="range"
                min="0.05"
                max="1.0"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 accent-amber-400 h-1.5 bg-[#08291e] rounded-lg cursor-pointer"
              />
              <Volume2 size={12} />
            </div>
          </div>

          {/* Socratic Practice Guidance Card during Break */}
          <div className="bg-[#051c14] border border-[#144234] rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#12382c]">
              <Wind size={15} className="text-emerald-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Reflective Pause Protocol
              </h4>
            </div>

            <div className="space-y-2 text-xs text-emerald-200/80 leading-relaxed font-light">
              <p>
                <strong>4-2-6 Respiratory Reset:</strong> Inhale for 4s, hold for 2s, and release with a slow 6s exhale.
              </p>
              <p>
                <strong>The 30-Second Inquiry:</strong> What assumption did you notice creeping in during the last 25 minutes? What is actually true?
              </p>
            </div>

            <div className="pt-2 border-t border-[#12382c] flex items-center justify-between text-[11px] text-amber-300/80">
              <span>Points per Completed Focus Block:</span>
              <strong className="font-mono text-amber-300">+3 Pts to Day {currentDay}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
