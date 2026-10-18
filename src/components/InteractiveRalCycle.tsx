import React, { useState } from 'react';
import { 
  RotateCw, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  BookOpen, 
  Shield, 
  Heart,
  ChevronRight,
  Eye,
  Sliders,
  RefreshCw,
  Compass,
  Brain,
  Wind
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const InteractiveRalCycle: React.FC = () => {
  const { t, lifeStage, openPauseModal, setActiveTab } = useApp();
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Six-Stage Framework Data tailored across all 6 archetypes
  const stageSpecificData = {
    kids: {
      1: {
        title: "1. PAUSE (रुको - The Wise Owl Freeze)",
        subtitle: "The Space That Saves You",
        desc: "When big angry feelings bubble up, freeze for 6 seconds like a calm owl in a tree.",
        example: "A classmate grabs your crayon without asking. Instead of yelling or snatching, take 3 belly breaths.",
        micro: "Wise Owl Belly Breath: Breathe into your tummy until it puffs out like a balloon.",
        neuro: "Calms the roaring alarm in the brain so wise thinking can turn on."
      },
      2: {
        title: "2. PERCEIVE (देखो - See Without Distortion)",
        subtitle: "Seeing Without the Story",
        desc: "Look at what really happened, not what your anger tells you happened.",
        example: "Notice: Did they take it to be mean, or did they just need blue to finish their picture?",
        micro: "Reality Check: Say to yourself: 'They made a mistake. It is not an attack.'",
        neuro: "Helps your eyes and brain see true facts instead of imagined monsters."
      },
      3: {
        title: "3. REFRAME (सोचो - Change the Meaning)",
        subtitle: "Changing the Meaning, Not the Moment",
        desc: "Change how you think about the problem so you stay in charge of yourself.",
        example: "Instead of 'They hate me!', think: 'We can share and finish our drawings together.'",
        micro: "Kind Reframe: 'I am the boss of my own words and hands.'",
        neuro: "Rewires your thinking to find solutions instead of crying or fighting."
      },
      4: {
        title: "4. ACT (बोलो - Clarity in Motion)",
        subtitle: "Clarity in Motion",
        desc: "Use your calm owl voice to ask for what you need with dignity.",
        example: "Say gently: 'I'm using that blue right now. You can have it in 2 minutes when I finish.'",
        micro: "Calm Voice Step: Speak slowly and keep your hands open.",
        neuro: "Teaches your body that peaceful words are more powerful than shouting."
      },
      5: {
        title: "5. ADJUST (सुधारो - Graceful Micro-Shift)",
        subtitle: "When Wisdom Becomes Habit",
        desc: "If things don't go perfectly, try a small gentle shift without pouting.",
        example: "If they still don't give it back, walk to the teacher calmly instead of screaming.",
        micro: "Gentle Pivot: Smile and pick another bright color while waiting.",
        neuro: "Builds mental flexibility so you don't get stuck in frustration."
      },
      6: {
        title: "6. GROW (सीखो - Let Experience Reshape You)",
        subtitle: "Integration, Not Introspection",
        desc: "Feel proud of keeping your cool. Notice how much fun you can still have.",
        example: "Later at bedtime, remember that you handled a hard moment with kindness.",
        micro: "High-Five Habit: Pat your chest and celebrate your calm superpower.",
        neuro: "Stores peaceful memories in your brain so you stay calm naturally next time."
      }
    },
    teenagers: {
      1: {
        title: "1. PAUSE (Digital & Emotional Freeze)",
        subtitle: "The Space That Saves You",
        desc: "Interrupt the instant spike when a group chat, test mark, or rumor stings.",
        example: "Someone posts an ambiguous shade comment. Your thumbs want to type a defensive reply instantly.",
        micro: "10-Second Digital Freeze: Put the phone face down, exhale fully, and let adrenaline crash.",
        neuro: "Halts sympathetic cortisol spike and returns blood flow to the prefrontal cortex."
      },
      2: {
        title: "2. PERCEIVE (Separate Text from Tone)",
        subtitle: "Seeing Without the Story",
        desc: "Distinguish between plain text and the dramatic narrative your brain invented.",
        example: "Read the message as bare words: 'Are you coming?' is a simple question, not hostility.",
        micro: "Fact Separation: 'The fact is 5 words on a glass screen; the drama is in my head.'",
        neuro: "Downregulates amygdala reactivity and resets threat detection filters."
      },
      3: {
        title: "3. REFRAME (Shift from Drama to Data)",
        subtitle: "Changing the Meaning, Not the Moment",
        desc: "Recognize that other people's insecurity or bad moods are rarely about you.",
        example: "Reframe: 'Their sharp tone is their stress, not my worth. I don't need to absorb it.'",
        micro: "Identity Shield: 'My self-worth doesn't depend on likes or group chat approval.'",
        neuro: "Activates cognitive flexibility and prevents peer-pressure conformity loops."
      },
      4: {
        title: "4. ACT (Dignified Non-Engagement)",
        subtitle: "Clarity in Motion",
        desc: "Respond with poise, calm brevity, or purposeful non-engagement.",
        example: "Reply with a relaxed, neutral 3-word answer or choose not to reply at all.",
        micro: "Poise Response: One clear sentence. Zero over-explaining. Zero defense.",
        neuro: "Reinforces boundary-setting neural circuits without social fatigue."
      },
      5: {
        title: "5. ADJUST (Pacing Adaptation)",
        subtitle: "When Wisdom Becomes Habit",
        desc: "Notice if you started taking things too seriously and recalibrate your focus.",
        example: "Close social apps for 2 hours and go skate, draw, or listen to instrumental music.",
        micro: "Focus Pivot: Shift attention to what you can actually create today.",
        neuro: "Strengthens attentional switching between default mode and task-positive networks."
      },
      6: {
        title: "6. GROW (Unshakeable Identity)",
        subtitle: "Integration, Not Introspection",
        desc: "Build self-reliance where other people's opinions can't push you around.",
        example: "Acknowledge: 'I handled that conflict with zero drama. I am growing stronger.'",
        micro: "Identity Reflection: Write down one truth you respect about yourself today.",
        neuro: "Hippocampal consolidation turns self-regulation into lasting self-esteem."
      }
    },
    students: {
      1: {
        title: "1. PAUSE (Somatic Grounding Under Exam Fire)",
        subtitle: "The Space That Saves You",
        desc: "Stop tunnel vision and blanking out during high-stakes exams, vivas, or interviews.",
        example: "Looking at question 3 in a tough engineering or medical exam, your heart races.",
        micro: "4-2-6 Physiological Sigh: Inhale 4s, hold 2s, slow exhale 6s to release panic.",
        neuro: "Restores parasympathetic vagal brake and opens working memory in the dorsolateral PFC."
      },
      2: {
        title: "2. PERCEIVE (Objective Question Scan)",
        subtitle: "Seeing Without the Story",
        desc: "Strip away the catastrophic dread of failure and read the question as pure constraints.",
        example: "Notice: 'The paper is challenging for everyone. What are the exact known variables given?'",
        micro: "First Principles Audit: Highlight the explicit givens; discard the anxiety story.",
        neuro: "Reduces prediction error distress and restores analytical computation."
      },
      3: {
        title: "3. REFRAME (A Puzzle, Not an Executioner)",
        subtitle: "Changing the Meaning, Not the Moment",
        desc: "View difficult problems as interesting intellectual terrain rather than a judgment on your worth.",
        example: "Reframe: 'This problem is simply testing how methodically I can reason through unknowns.'",
        micro: "Curiosity Pivot: 'What basic theorem applies to this first sub-part?'",
        neuro: "Recruits cognitive problem-solving networks rather than threat avoidance."
      },
      4: {
        title: "4. ACT (Methodical Step-by-Step Writing)",
        subtitle: "Clarity in Motion",
        desc: "Write down the first clean equation or outline without rushing to an unproven guess.",
        example: "Derive the first lemma steadily with neat handwriting and grounded breathing.",
        micro: "Minimum Viable Step: Solve sub-part (a) cleanly before looking at (b).",
        neuro: "Prevents cognitive thrashing and channels executive focus into linear execution."
      },
      5: {
        title: "5. ADJUST (Adaptive Time Allocation)",
        subtitle: "When Wisdom Becomes Habit",
        desc: "If a specific calculation stalls after 3 minutes, pause and pivot gracefully.",
        example: "Mark the question for review, shift to section B, and let subconscious incubation work.",
        micro: "Tactical Pivot: 'I will bank 10 easy marks now and return with fresh eyes.'",
        neuro: "Prevents ego fixation and maximizes strategic resource management."
      },
      6: {
        title: "6. GROW (Cognitive Mastery)",
        subtitle: "Integration, Not Introspection",
        desc: "Deconstruct study sessions and exam results without emotional self-flagellation.",
        example: "Identify specific conceptual gaps, schedule targeted practice, and acknowledge composure.",
        micro: "Post-Event Debrief: 'What study habit worked, and what needs upgrade for next term?'",
        neuro: "Neural encoding of deliberate practice cycles builds long-term academic excellence."
      }
    },
    professionals: {
      1: {
        title: "1. PAUSE (The Executive Sanctuary)",
        subtitle: "The Space That Saves You",
        desc: "Interrupt reflexive urgency. Never decide or reply from a hijacked nervous system.",
        example: "An aggressive email from a board member arrives questioning your product delivery timeline.",
        micro: "10-Second Executive Reset: Drop shoulders, exhale slowly, say: 'State before strategy.'",
        neuro: "Inhibits sympathetic amygdala hijack; re-engages ventromedial prefrontal cortex."
      },
      2: {
        title: "2. PERCEIVE (Decouple Tone from Objective Reality)",
        subtitle: "Seeing Without the Story",
        desc: "See what is truly happening rather than what your fear or ego projects.",
        example: "Recognize that the stakeholder is anxious about their own CEO review, not attacking your competence.",
        micro: "Perception Audit: 'What is the verifiable fact, and what is the emotional narrative?'",
        neuro: "Salience network distinguishes true systemic threats from organizational noise."
      },
      3: {
        title: "3. REFRAME (Convert Pressure into Strategic Data)",
        subtitle: "Changing the Meaning, Not the Moment",
        desc: "Transform crisis into a collaborative alignment opportunity. Shift from defense to curiosity.",
        example: "Reframe: 'This escalation gives me leverage to renegotiate resource bottlenecks with the executive team.'",
        micro: "Strategic Reframe: 'If this friction were vital information, what does it instruct me to fix?'",
        neuro: "Stimulates executive control network for multi-scenario risk analysis."
      },
      4: {
        title: "4. ACT (Aligned Action with Minimal Noise)",
        subtitle: "Clarity in Motion",
        desc: "Communicate with calm authority. Speak 20% slower with measured precision.",
        example: "Send a concise 3-bullet factual status and propose a 15-minute alignment call with solutions.",
        micro: "Precision Execution: Act without over-explaining, defending, or escalating emotional tone.",
        neuro: "High motor-cognitive integration with zero wasted sympathetic energy."
      },
      5: {
        title: "5. ADJUST (Adaptive Pacing & Stakeholder Reading)",
        subtitle: "When Wisdom Becomes Habit",
        desc: "Sense subtle shifts in stakeholder body language, silences, and team energy; calibrate accordingly.",
        example: "In the meeting, notice who is silent and invite their perspective before cementing the roadmap.",
        micro: "2% Shift Principle: Calibrate vocal cadence and posture to steady the emotional room.",
        neuro: "Mirror neuron resonance: the leader's calm down-regulates collective group cortisol."
      },
      6: {
        title: "6. GROW (Identity Evolution Beyond the Role)",
        subtitle: "Integration, Not Introspection",
        desc: "Shed outdated mental models and performative confidence. Lead from unshakeable inner presence.",
        example: "Evening reflection: 'What hidden fear drove my reluctance to delegate? How do I evolve?'",
        micro: "Night Integration: Document your state signature and 1 leadership pattern shift.",
        neuro: "Hippocampal memory encoding transforms high-stress leadership into durable presence."
      }
    },
    seniors: {
      1: {
        title: "1. PAUSE (Savoring the Space)",
        subtitle: "The Space That Saves You",
        desc: "Step back from lifelong habits of needing to fix, manage, or control every outcome.",
        example: "Your adult child makes a parenting or financial choice differently than you would have.",
        micro: "Graceful Pause: Breathe in stillness, release the urge to lecture, and rest in presence.",
        neuro: "Disengages lifelong habitual command circuits and stimulates oxytocin-linked empathy."
      },
      2: {
        title: "2. PERCEIVE (Seeing the Next Generation Clearly)",
        subtitle: "Seeing Without the Story",
        desc: "Notice their courage and different world context without measuring them by past eras.",
        example: "See that their life challenges in the digital century require their own lived discoveries.",
        micro: "Compassionate Perception: 'They are navigating their own frontier. Let me listen first.'",
        neuro: "Softens cognitive rigidity and opens receptive intergenerational attunement."
      },
      3: {
        title: "3. REFRAME (From Directive Authority to Anchor Presence)",
        subtitle: "Changing the Meaning, Not the Moment",
        desc: "Reframe your role from commander to lighthouse: not chasing ships, but shining steady light.",
        example: "Reframe: 'My true gift now is not telling them what to do, but being a refuge of unconditional peace.'",
        micro: "Lighthouse Reframe: 'Presence is my leadership. Slowness is not weakness; it is depth.'",
        neuro: "Fosters wisdom-based cognitive networks and emotional equanimity."
      },
      4: {
        title: "4. ACT (Offering Sincere Blessing & Space)",
        subtitle: "Clarity in Motion",
        desc: "Speak words of reassurance, validation, and heartfelt warmth rather than unsolicited critique.",
        example: "Say warmly: 'I trust your judgment. I am here whenever you want to talk or just sit together.'",
        micro: "Blessing Step: Offer one sentence of genuine encouragement without strings attached.",
        neuro: "Deepens relational safety and fosters generational psychological health."
      },
      5: {
        title: "5. ADJUST (Letting Go with Grace)",
        subtitle: "When Wisdom Becomes Habit",
        desc: "Accept the changing seasons of life and bodily energy with gentle self-compassion.",
        example: "Adjust your daily rhythm to prioritize walking in nature, quiet reading, and reflective soundscapes.",
        micro: "Acceptance Shift: Smile at what has passed and embrace the serene gift of today.",
        neuro: "Reduces chronic neuro-inflammation through meditative acceptance."
      },
      6: {
        title: "6. GROW (Presence as Legacy)",
        subtitle: "Integration, Not Introspection",
        desc: "Realize that who you are in stillness matters far more than what you once achieved.",
        example: "Notice how family and friends feel calmed simply by entering your room.",
        micro: "Legacy Affirmation: 'My inner architecture defines the peace I leave in the world.'",
        neuro: "Achieves full integration: RAL ceases to be a method and becomes pure being."
      }
    },
    teams: {
      1: {
        title: "1. PAUSE (The 2-Second Shared Silence)",
        subtitle: "The Space That Saves You",
        desc: "Start meetings with 30 seconds of quiet. Break collective emotional panic and chatter.",
        example: "Before a critical post-mortem or release planning call, have everyone put down laptops and breathe.",
        micro: "Team Silent Start: 30 seconds of stillness. Everyone writes: 'What is the real issue today?'",
        neuro: "Synchronizes group autonomic nervous systems and halts collective threat contagion."
      },
      2: {
        title: "2. PERCEIVE (Surface the Hidden Climate)",
        subtitle: "Seeing Without the Story",
        desc: "Notice who is hesitating, what tensions are unsaid, and separate truth from corporate fear.",
        example: "The team lead notices the lead designer's silence signals overload, not disagreement.",
        micro: "Climate Check: Ask: 'What is the energy in the room right now? Let us name it safely.'",
        neuro: "Creates collective psychological safety, opening divergent thinking channels."
      },
      3: {
        title: "3. REFRAME (Collective Problem Reframing)",
        subtitle: "Changing the Meaning, Not the Moment",
        desc: "Shift from 'Who failed?' to 'What is the system telling us to upgrade?'",
        example: "Reframe a missed release milestone from a failure into a clear signal to refine sprint scope.",
        micro: "Team Reframe: 'What opportunity is hidden inside this unexpected constraint?'",
        neuro: "Dismantles corporate turf wars and replaces defensive bias with shared inquiry."
      },
      4: {
        title: "4. ACT (One Aligned Priority, Not Ten)",
        subtitle: "Clarity in Motion",
        desc: "Align on one clear next step that everyone commits to with complete ownership.",
        example: "Instead of a bloated 20-point action list, finalize the single critical deliverable for today.",
        micro: "Single Priority Alignment: 'We commit to this one window together with clarity.'",
        neuro: "Eliminates multi-tasking cognitive friction across distributed teams."
      },
      5: {
        title: "5. ADJUST (Daily 10-Minute RAL Huddles)",
        subtitle: "When Wisdom Becomes Habit",
        desc: "Run short daily check-ins: 'What changed? What matters? What needs reframing?'",
        example: "At 9 AM, review yesterday's learnings without blame and adjust today's velocity gracefully.",
        micro: "Huddle Rhythm: 3 questions: Reality check, assumption test, and aligned pivot.",
        neuro: "Establishes adaptive agile feedback loops directly into team culture."
      },
      6: {
        title: "6. GROW (Adaptive Culture Lattice Coherence)",
        subtitle: "Integration, Not Introspection",
        desc: "When individual clarity becomes collective clarity, the team becomes an unshakeable force.",
        example: "Team reviews quarterly growth: Psychological safety is high, truth is spoken early.",
        micro: "Culture Pulse: 'Was truth spoken early today? Did we think together or separately?'",
        neuro: "Collective intelligence scales exponentially when defensive silos dissolve."
      }
    }
  };

  const currentStageData = stageSpecificData[lifeStage as keyof typeof stageSpecificData] || stageSpecificData.professionals;
  const activeData = currentStageData[activeStep];

  const stepsList = [
    { num: 1, name: "PAUSE", sub: "Space", icon: Wind },
    { num: 2, name: "PERCEIVE", sub: "Truth", icon: Eye },
    { num: 3, name: "REFRAME", sub: "Meaning", icon: RefreshCw },
    { num: 4, name: "ACT", sub: "Clarity", icon: ArrowRight },
    { num: 5, name: "ADJUST", sub: "Habit", icon: Sliders },
    { num: 6, name: "GROW", sub: "Identity", icon: Heart }
  ];

  return (
    <section className="bg-[#061e16] border border-[#144234] rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Compass size={14} className="animate-spin-slow text-amber-400" />
          <span>The Leader's Internal Operating System</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-heading font-bold text-slate-100 tracking-tight">
          The Six-Stage RAL Cycle
        </h2>

        <p className="text-xs sm:text-sm text-emerald-200/80 font-light">
          <strong>PAUSE → PERCEIVE → REFRAME → ACT → ADJUST → GROW</strong>
        </p>

        <p className="text-xs text-emerald-300/70 max-w-2xl mx-auto pt-1">
          A lived psychological sequence discovered by RK Vedant in operational command and executive boardrooms.
          Tailored here for your active life stage: <strong className="text-amber-300 capitalize">{lifeStage}</strong>.
        </p>
      </div>

      {/* Visually Centered Stepper Wheel / Horizontal Ribbon */}
      <div className="relative max-w-4xl mx-auto mb-8">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {stepsList.map(s => {
            const isSelected = s.num === activeStep;
            const StepIcon = s.icon;
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(s.num as any)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition text-center relative group min-h-[72px] ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#0c3729] to-[#08281d] border-amber-400 shadow-xl shadow-emerald-950/60 ring-2 ring-amber-400/30'
                    : 'bg-[#041510] border-[#144234] hover:border-emerald-400/40 hover:bg-[#07241b]'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold mb-1 transition ${
                  isSelected 
                    ? 'bg-amber-400 text-slate-950 shadow-md' 
                    : 'bg-[#092c20] text-emerald-300 group-hover:text-white'
                }`}>
                  <StepIcon size={14} />
                </div>

                <span className={`text-[11px] font-heading font-bold leading-tight ${
                  isSelected ? 'text-amber-300' : 'text-slate-200'
                }`}>
                  {s.name}
                </span>

                <span className="text-[10px] text-emerald-400/60">
                  {s.sub}
                </span>

                {isSelected && (
                  <div className="absolute -bottom-1.5 w-6 h-1 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep Exploration Card */}
      <div className="bg-[#041510] border border-[#164a38] rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#123a2d]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold uppercase">
                Stage {activeStep} of 6
              </span>
              <span className="text-xs text-emerald-400/70">
                · {activeData.subtitle}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-100">
              {activeData.title}
            </h3>

            <p className="text-sm text-emerald-200/90 leading-relaxed font-light">
              {activeData.desc}
            </p>
          </div>

          {/* Quick Practice Trigger Button */}
          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={() => openPauseModal(activeStep === 1 ? '10s' : activeStep === 2 ? '4-2-6' : '90s')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition transform active:scale-95"
            >
              <Zap size={14} />
              <span>Calibrate Stage {activeStep} Drill</span>
            </button>
            <span className="text-[10px] text-emerald-400/50 text-center">
              Guided 10–90 second pause
            </span>
          </div>
        </div>

        {/* 3 Detail Columns: Real World Scenario, 10s Micro-Practice, Neuroscience */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 text-xs">
          {/* 1. Real World Scenario */}
          <div className="p-4 rounded-xl bg-[#07241b] border border-[#144234] space-y-2">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-xs">
              <CheckCircle2 size={14} />
              <span>Real-Life Scenario</span>
            </div>
            <p className="text-emerald-100/90 leading-relaxed">
              {activeData.example}
            </p>
          </div>

          {/* 2. Micro-Practice */}
          <div className="p-4 rounded-xl bg-[#07241b] border border-[#144234] space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-300 font-semibold text-xs">
              <Sparkles size={14} className="text-amber-400" />
              <span>10-Second Micro-Practice</span>
            </div>
            <p className="text-emerald-100/90 leading-relaxed font-medium">
              {activeData.micro}
            </p>
          </div>

          {/* 3. Neurobiology & Mechanism */}
          <div className="p-4 rounded-xl bg-[#07241b] border border-[#144234] space-y-2">
            <div className="flex items-center gap-1.5 text-sky-300 font-semibold text-xs">
              <Brain size={14} />
              <span>Neurobiology & Brain State</span>
            </div>
            <p className="text-emerald-100/80 leading-relaxed">
              {activeData.neuro}
            </p>
          </div>
        </div>

        {/* Next Step Nav Footnote */}
        <div className="mt-6 pt-4 border-t border-[#123a2d] flex items-center justify-between text-xs text-emerald-400/70">
          <button
            onClick={() => setActiveStep(activeStep > 1 ? (activeStep - 1 as any) : 6)}
            className="hover:text-amber-300 transition flex items-center gap-1"
          >
            ← Previous Stage
          </button>
          
          <span className="text-[11px] font-mono">
            Cycle is recursive: Adjust naturally leads to Pause in the next event.
          </span>

          <button
            onClick={() => setActiveStep(activeStep < 6 ? (activeStep + 1 as any) : 1)}
            className="hover:text-amber-300 transition flex items-center gap-1 font-semibold text-emerald-200"
          >
            Next Stage →
          </button>
        </div>
      </div>
    </section>
  );
};
