export interface ChapterData {
  id: number;
  section: 'Section I: The Inner Shift' | 'Section II: The Adaptive Shift' | 'Section III: RAL in the Real World';
  sectionNumber: 1 | 2 | 3;
  title: string;
  subtitle: string;
  ralLaw: string;
  mantra: string;
  keyTakeaways: string[];
  summary: string;
  microPractice: {
    title: string;
    duration: string;
    steps: string[];
  };
  reflectionQuestion: string;
  scenario: {
    title: string;
    context: string;
    challenge: string;
    ralResolution: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface DiagnosticQuestion {
  id: number;
  sectionKey: 'RAAG' | 'LSTM' | 'ADG' | 'ACL';
  sectionName: string;
  questionNumber: number;
  text: string;
}

export interface PracticeDay {
  day: number;
  week: number;
  weekTitle: string;
  weekTheme: string;
  title: string;
  objective: string;
  instructions: string[];
  microDrill: string;
  journalPrompt: string;
}

export interface GlobalInsightItem {
  id: string;
  title: string;
  summary: string;
  category: 'From the Book' | 'Global Practice';
  relatedChapter: number;
  chapterName: string;
  source: string;
  url?: string;
  date: string;
  status: 'approved' | 'pending_review' | 'archived';
  relevanceNote: string;
  upvotes: number;
}

export const RAL_NON_NEGOTIABLES = [
  { principle: "State before strategy", explanation: "Never draft or execute strategy from an agitated or hijacked nervous system." },
  { principle: "Clarity before speed", explanation: "Speed without clarity is merely accelerated panic. Precision always trumps velocity." },
  { principle: "Awareness before influence", explanation: "You cannot govern the room until you govern your own perceptual filters." },
  { principle: "Inner coherence before outer performance", explanation: "External leadership achievements crumble if the internal architecture is fractured." }
];

export const RAL_MATRICES = {
  matrix1: {
    name: "Reflective–Adaptive Awareness Grid (RAAG)",
    measures: "Your internal state in real time.",
    purpose: "Detect emotional reactivity and cognitive rigidity before they distort decisions.",
    quadrants: [
      {
        id: "reactive-rigid",
        name: "Reactive–Rigid",
        position: "Bottom-Left (High Reactivity, High Rigidity)",
        color: "#EF4444",
        traits: "Collapse zone; narrow perception; impulsive errors; amygdala dominance; defensiveness.",
        action: "Pause immediately -> 4 deep breaths -> Name dominant emotion."
      },
      {
        id: "reactive-flexible",
        name: "Reactive–Flexible",
        position: "Bottom-Right (High Reactivity, High Flexibility)",
        color: "#F59E0B",
        traits: "Fast but unstable; creativity without coherence; panic disguised as productivity; scattered priorities.",
        action: "Center -> Ask: 'What is noise? What is true signal?'"
      },
      {
        id: "reflective-rigid",
        name: "Reflective–Rigid",
        position: "Top-Left (High Calm, High Rigidity)",
        color: "#6366F1",
        traits: "Calm but closed; polite stagnation; outdated interpretations; clinging to past recipes.",
        action: "Reframe -> Ask: 'What else could be true? What assumption am I protecting?'"
      },
      {
        id: "reflective-adaptive",
        name: "Reflective–Adaptive (RAL State)",
        position: "Top-Right (High Calm, High Flexibility)",
        color: "#10B981",
        traits: "Emotional steadiness + cognitive fluidity; peak perceptual clarity; generative authority.",
        action: "Proceed -> Make decisions with surgical precision and presence."
      }
    ]
  },
  matrix2: {
    name: "Leadership State Transition Map (LSTM)",
    measures: "Your ability to shift your state deliberately.",
    purpose: "Move from emotional hijack to reflective clarity within seconds.",
    shifts: [
      { step: 1, name: "Pause", description: "Interrupts the neural hijack. Tells the nervous system to stand down." },
      { step: 2, name: "Perceive", description: "See reality without distortion. Ask: 'What is actually real right now?'" },
      { step: 3, name: "Reframe", description: "Break the default narrative. Generate alternative interpretations." },
      { step: 4, name: "Act", description: "Respond from inner coherence, never from urgency or external pressure." },
      { step: 5, name: "Grow", description: "Convert experience into durable learning via hippocampal insight encoding." },
      { step: 6, name: "Adjust", description: "Integrate the learning into daily habits until clarity becomes reflex." }
    ]
  },
  matrix3: {
    name: "Adaptive Decision Grid (ADG)",
    measures: "Decision alignment between inner clarity and outer reality.",
    purpose: "Prevent decisions made from emotional noise or situational misread.",
    states: [
      {
        id: "aligned-action",
        name: "Aligned Action",
        condition: "Inner Clarity + Outer Clarity",
        badge: "Optimal",
        color: "#10B981",
        directive: "Act cleanly, commit decisively, and monitor feedback loops."
      },
      {
        id: "reflective-delay",
        name: "Reflective Delay",
        condition: "Inner Clarity + Outer Ambiguity",
        badge: "Strategic Waiting",
        color: "#3B82F6",
        directive: "Hold ambiguity. Do not rush to artificial closure; gather signals."
      },
      {
        id: "emotional-bias",
        name: "Emotional Bias",
        condition: "Inner Turbulence + Outer Clarity",
        badge: "Danger Zone",
        color: "#F97316",
        directive: "STOP. The facts are clear, but your mind is distorted. Stabilize before deciding."
      },
      {
        id: "instinctive-chaos",
        name: "Instinctive Chaos",
        condition: "Both Inner and Outer Unclear",
        badge: "Critical Stop",
        color: "#EF4444",
        directive: "Cease all irreversible moves. Restore inner baseline before tackling outer confusion."
      }
    ]
  },
  matrix4: {
    name: "Adaptive Culture Lattice (ACL)",
    measures: "How your inner world shapes organizational culture and trust.",
    purpose: "Diagnose cultural fractures before they become systemic failures.",
    layers: [
      {
        layer: "Emotional Layer",
        dynamic: "Psychological Safety vs Defensive Silence",
        scanQuestion: "Was truth spoken early today? Did people feel safe to disagree?",
        remedy: "Leader models vulnerable clarity and receives bad news with calm curiosity."
      },
      {
        layer: "Cognitive Layer",
        dynamic: "Shared Meaning vs Fragmented Interpretation",
        scanQuestion: "Did we align meaning and clarify unspoken assumptions?",
        remedy: "Instituting the 5-minute Silent Start and checking 'What do we believe is truly happening?'"
      },
      {
        layer: "Behavioural Layer",
        dynamic: "Adaptive Execution vs Defensive Stagnation",
        scanQuestion: "Did we adapt or defend? Did actions match our stated values?",
        remedy: "Rewarding quick course-corrections over stubborn adherence to outdated roadmaps."
      }
    ]
  }
};

export const RAL_CHAPTERS: ChapterData[] = [
  {
    id: 1,
    section: 'Section I: The Inner Shift',
    sectionNumber: 1,
    title: "When the Old Self Breaks",
    subtitle: "The subtle fracture where old strengths become modern liabilities",
    ralLaw: "Leadership does not break when the world becomes heavier; it breaks when the inner world stops evolving.",
    mantra: "The crack is not the failure - it is the doorway.",
    keyTakeaways: [
      "The first fracture in leadership is internal, never external.",
      "Old strengths eventually become insufficient for new realities.",
      "Leaders often fail not due to incompetence, but due to inner congestion and outdated patterns.",
      "The breaking of the old self is not collapse - it is the release of outdated identity."
    ],
    summary: "True leadership breakdown rarely arrives with thunder or external catastrophe. It arrives quietly: a routine decision feels unexpectedly heavy, a standard conversation leaves a bitter aftertaste, and instincts calibrated for a simpler past begin to misfire. When leaders push harder using the same armour that once protected them, the armour becomes a cage. Recognizing the crack in your operating system is the beginning of conscious leadership.",
    microPractice: {
      title: "The 3-Question Inner Terrain Scan",
      duration: "60 seconds each morning",
      steps: [
        "What tension am I carrying that I have not yet acknowledged?",
        "What assumption is currently shaping my upcoming decisions?",
        "Is my next action arising from habitual reflex or conscious awareness?"
      ]
    },
    reflectionQuestion: "Where in my leadership do I sense a quiet fracture, and what truth is it asking me to face?",
    scenario: {
      title: "The Veteran Director's Playbook Collapse",
      context: "A seasoned director with 15 years of operational excellence notices their team disengaging during an aggressive AI-driven reorganization.",
      challenge: "The director doubles down on tighter deadlines and strict status reports, worsening team resentment.",
      ralResolution: "The director applies Chapter 1's insight: realizing their drive for control is an outdated defense mechanism. They pause, openly acknowledge the uncertainty to the team, and replace command with shared sensing."
    },
    quiz: {
      question: "According to RAL Chapter 1, what is the primary cause of leadership breakdown under pressure?",
      options: [
        "Lack of technical expertise and market data",
        "Inner congestion and operating from an outdated internal identity",
        "Insufficient working hours and lax discipline",
        "Disloyal team members and poor tooling"
      ],
      correctIndex: 1,
      explanation: "Leadership breaks when the inner world stops evolving. Leaders fail not from lack of competence, but when their internal frameworks lag behind the external complexity."
    }
  },
  {
    id: 2,
    section: 'Section I: The Inner Shift',
    sectionNumber: 1,
    title: "The Noise That Blinds Leaders",
    subtitle: "Distinguishing signal from expectation, comparison, and emotional fog",
    ralLaw: "Noise destroys clarity long before it destroys performance.",
    mantra: "Silence is strength.",
    keyTakeaways: [
      "Noise infiltrates silently before showing up as executive burnout.",
      "Expectation noise, comparison noise, and emotional noise hijack the prefrontal cortex.",
      "Silence is not a luxury; it is a strategic asset that restores cognitive bandwidth."
    ],
    summary: "Modern leaders are flooded with unmanageable inputs: digital notifications, algorithmic urgencies, comparison feeds, and unexamined expectations. This noise triggers low-grade survival responses in the amygdala, shrinking the leader's visual and cognitive fields. Trying to outrun noise with velocity only amplifies it. Silence is the active discipline of recovering space.",
    microPractice: {
      title: "Daily Noise Triage",
      duration: "90 seconds",
      steps: [
        "Label the dominant noise: Expectation, Comparison, or Emotional static?",
        "Ask: 'Is this noise altering my tone or judgment today?'",
        "Deliberately postpone or silence one non-essential demand for the next hour."
      ]
    },
    reflectionQuestion: "Where in my professional life have I mistaken noise and frenetic activity for true responsibility?",
    scenario: {
      title: "The Slack Escalation Storm",
      context: "A founder receives a critical customer complaint on a group channel at 9 PM and immediately feels the urge to fire off directive reprimands.",
      challenge: "Responding instantly spreads panic, defensiveness, and late-night exhaustion across the entire team.",
      ralResolution: "The founder applies the Noise Check: recognizes emotional noise masquerading as emergency. They shut the laptop for 10 minutes, evaluate the facts in silence, and address the issue at 8:30 AM with clear diagnostic inquiry."
    },
    quiz: {
      question: "Why does the modern digital environment directly threaten executive judgment?",
      options: [
        "It provides too few communication channels for leaders",
        "It constantly triggers amygdala threat circuits, replacing reflection with reflexive urgency",
        "It forces leaders to read books instead of dashboards",
        "It eliminates all administrative workload"
      ],
      correctIndex: 1,
      explanation: "Digital speed and continuous interruptions keep the brain in low-grade survival mode, reducing prefrontal cortex bandwidth necessary for strategic perspective."
    }
  },
  {
    id: 3,
    section: 'Section I: The Inner Shift',
    sectionNumber: 1,
    title: "Discovering the Reflective Path",
    subtitle: "The internal audit that uncovers hidden motives and emotional roots",
    ralLaw: "Reflection is not slowing down; it is upgrading the mind before it decides.",
    mantra: "Pause, and the mind reveals what speed conceals.",
    keyTakeaways: [
      "Instinct gives speed, but it repeats past history instead of navigating novelty.",
      "Reflection is not passive retreat; it is the courageous audit of biases and motives.",
      "Emotional maturity means feeling fully without being compelled to react impulsively."
    ],
    summary: "Action without reflection is fragile and easily misled by insecurity or ego. While instinct was shaped by past repetition, the modern landscape presents unprecedented systemic ambiguity. Reflection provides the mental spaciousness to inspect whether a decision is rooted in genuine vision or disguised defensiveness.",
    microPractice: {
      title: "10,000-Foot Motive Audit",
      duration: "2 minutes before any major meeting",
      steps: [
        "Pause and ask: 'What is truly driving my position: clarity, ego, fear, or habit?'",
        "Envision this conversation from 10,000 feet above: 'What is the broader ecosystem objective?'",
        "Release the need to win the moment in favor of discovering the truth."
      ]
    },
    reflectionQuestion: "What part of my current leadership routine is running on autopilot, and what inconvenient truth is it concealing?",
    scenario: {
      title: "The Defensive Strategy Presentation",
      context: "A VP discovers that a peer is challenging their quarterly roadmap during an executive committee review.",
      challenge: "The VP's instinctive reaction is to defend aggressively and invalidate the peer's critique.",
      ralResolution: "The VP takes a micro-pause, conducts a motive audit, recognizes their ego's vulnerability, and responds: 'That is a critical perspective. Help me understand what risks you foresee in our rollout.'"
    },
    quiz: {
      question: "What is the primary difference between instinct and reflection in complex leadership?",
      options: [
        "Instinct always solves modern problems better than analysis",
        "Instinct relies on past patterns which can trap leaders; reflection uncovers present reality",
        "Reflection makes leaders timid and indecisive",
        "Instinct guarantees ethical compliance in high-stakes decisions"
      ],
      correctIndex: 1,
      explanation: "Instinct defaults to pattern recognition from past memories; reflection interrupts automaticity to see novel situations without historical distortion."
    }
  },
  {
    id: 4,
    section: 'Section I: The Inner Shift',
    sectionNumber: 1,
    title: "Why the Future Belongs to Adaptive Minds",
    subtitle: "The shift from knowing to sensing, unlearning, and identity plasticity",
    ralLaw: "A leader's relevance is not built on what they know, but on how fast they can update who they are.",
    mantra: "Identity is fluid, not stone.",
    keyTakeaways: [
      "Expertise decays rapidly; adaptability is the only sustainable competitive advantage.",
      "Adaptation operates at three levels: Internal (mindset), Behavioural (habits), Systemic (culture).",
      "Rigid leaders cling to the Default Mode Network (DMN); adaptive leaders engage Executive Control (ECN) through curiosity."
    ],
    summary: "In a world of technological and geopolitical acceleration, certainty is obsolete. Leaders who build their identity around being 'the expert' develop cognitive fragility when conditions evolve. Adaptive leaders develop identity plasticity—the psychological freedom to unlearn past successes and sense emerging patterns before they become obvious.",
    microPractice: {
      title: "Curiosity Unlearning Drill",
      duration: "3 minutes weekly",
      steps: [
        "Identify one core assumption in your business model that you haven't questioned in 12 months.",
        "Deliberately seek out the strongest dissenting viewpoint or contradictory data point.",
        "Ask: 'If my competitor knew this assumption was flawed, how would they disrupt me?'"
      ]
    },
    reflectionQuestion: "Where has my past expertise become a comfort zone that is blinding me to emerging realities?",
    scenario: {
      title: "The Legacy Product Transition",
      context: "An engineering head who spent 8 years building an on-premise infrastructure resists a company pivot to serverless AI pipelines.",
      challenge: "Their technical ego feels invalidated by newer junior engineers with modern toolsets.",
      ralResolution: "The engineering head applies Level 1 Internal Adaptation: uncoupling self-worth from legacy expertise, adopting a learner's posture, and facilitating the team's architectural migration with curiosity."
    },
    quiz: {
      question: "According to Chapter 4, which three levels of adaptation distinguish a true RAL leader?",
      options: [
        "Financial, Operational, and Marketing",
        "Internal (mindset), Behavioural (actions), and Systemic (culture)",
        "Compliance, Regulatory, and Governance",
        "Individual, Regional, and International"
      ],
      correctIndex: 1,
      explanation: "Rigid leaders only attempt behavioural tweaks (Level 2). RAL leaders transform the internal lens (Level 1), daily behaviour (Level 2), and organizational structures (Level 3)."
    }
  },
  {
    id: 5,
    section: 'Section I: The Inner Shift',
    sectionNumber: 1,
    title: "When Reaction Breaks Leadership",
    subtitle: "Mastering the neurobiological space between stimulus and response",
    ralLaw: "Leadership lives in the space before the reaction.",
    mantra: "Space decides the response.",
    keyTakeaways: [
      "Reaction is not an action; it is an unregulated mental and biological state.",
      "A single reactive outburst damages team trust far more than it gains momentary control.",
      "The pause is not hesitation; it is cognitive recalibration and prefrontal recovery."
    ],
    summary: "When pressure spikes, ancient survival mechanisms hijack the leader's perception: vision narrows into a tunnel, listening filters out nuance, and threat is seen everywhere. RK Vedant illustrates how a single reactive reprimand to a junior officer in uniform shattered months of psychological safety. Real leadership power exists entirely in the space between trigger and action.",
    microPractice: {
      title: "The 4-Second Reflex Arc Breaker",
      duration: "4 seconds during any escalation",
      steps: [
        "Inhale for 4 seconds, exhale for 4 seconds to interrupt the somatic reflex.",
        "Name the emotional cue silently in one word: anger, fatigue, fear, or impatience.",
        "Ask the pivot question: 'What outcome do I actually desire from this moment?'"
      ]
    },
    reflectionQuestion: "Which unprocessed emotion most often hijacks my leadership decisions, and under what specific triggers does it appear?",
    scenario: {
      title: "The Fractured Code Review",
      context: "A team lead discovers a critical production outage caused by an overlooked merge request from an intern.",
      challenge: "The lead's impulse is to storm into the channel and publicly dress down the contributor.",
      ralResolution: "The lead practices the 4-second reflex breaker: breathes deeply, labels the frustration as 'fear of executive blame', and turns the moment into a blameless post-mortem that strengthens the deployment gates."
    },
    quiz: {
      question: "What neurobiological event occurs during the deliberate RAL Pause?",
      options: [
        "Blood flow shifts from the prefrontal cortex to the amygdala",
        "The amygdala surges while executive control shuts down",
        "Blood flow returns to the prefrontal cortex, restoring perspective, empathy, and judgment",
        "The Default Mode Network completely replaces conscious thinking"
      ],
      correctIndex: 2,
      explanation: "Pausing halts the automatic fight-or-flight reflex arc and reactivates the prefrontal cortex, re-engaging executive decision-making and long-term perspective."
    }
  },
  {
    id: 6,
    section: 'Section I: The Inner Shift',
    sectionNumber: 1,
    title: "The Reflective Adaptive Turning Point",
    subtitle: "The birth of the six-movement RAL Cycle: Pause, Perceive, Reframe, Act, Grow, Adjust",
    ralLaw: "Leadership does not evolve when the world changes - it evolves when the leader gains inner space.",
    mantra: "Space creates clarity. Clarity creates evolution.",
    keyTakeaways: [
      "The RAL cycle is a living psychological rhythm: Pause -> Perceive -> Reframe -> Act -> Grow -> Adjust.",
      "When leaders see clearly, they also care clearly; RAL aligns competence with conscience.",
      "Mastery occurs when the cycle ceases to be a manual checklist and becomes a natural inner posture."
    ],
    summary: "In a crisis where instincts were no longer adequate, the author discovered the breakthrough that birthed RAL: stopping the inner momentum creates a vacuum where true perception enters. From perception comes reframing (changing meaning without denying reality), followed by aligned action, integration into self (grow), and behavioural recalibration (adjust).",
    microPractice: {
      title: "The 45-Second Full Cycle Reset",
      duration: "45 seconds",
      steps: [
        "PAUSE (6 sec): Take one complete diaphragmatic breath.",
        "PERCEIVE (6 sec): Name the bare facts, stripping away the emotional story.",
        "REFRAME (10 sec): Ask: 'If this was valuable information rather than a threat, what does it reveal?'",
        "ACT (8 sec): Identify one clean, reversible, aligned micro-step.",
        "GROW & ADJUST (15 sec): Ask: 'What did this trigger reveal about my mental patterns?'"
      ]
    },
    reflectionQuestion: "What part of me reacts fastest under stress, and what fragile narrative is that reaction attempting to defend?",
    scenario: {
      title: "The Client Contract Renegotiation",
      context: "A key enterprise client suddenly threatens to terminate a multi-million dollar contract due to a minor delay.",
      challenge: "The executive team wants to slash prices out of panic or threaten litigation out of pride.",
      ralResolution: "The CEO leads the team through the 6-movement cycle: pausing panic, perceiving client anxiety about their own board, reframing the contract as an opportunity to co-design SLA tiers, and acting with steady partnership."
    },
    quiz: {
      question: "Which of the following correctly orders the Six Movements of the RAL Cycle?",
      options: [
        "Plan -> Execute -> Review -> Repeat -> Scale -> Adapt",
        "Pause -> Perceive -> Reframe -> Act -> Grow -> Adjust",
        "React -> Defend -> Explain -> Pivot -> Measure -> Report",
        "Perceive -> Pause -> Act -> Reframe -> Adjust -> Grow"
      ],
      correctIndex: 1,
      explanation: "The RAL Cycle begins with Pause (interrupting the reflex), leads to Perceive (seeing without story), Reframe (meaning-making), Act (aligned movement), Grow (learning), and Adjust (habit integration)."
    }
  },
  {
    id: 7,
    section: 'Section II: The Adaptive Shift',
    sectionNumber: 2,
    title: "The Reflective Mind in Daily Leadership",
    subtitle: "Where inner clarity becomes daily strength in routine micro-moments",
    ralLaw: "Daily leadership fails not in crisis, but in the moments you enter unconsciously.",
    mantra: "Notice first. Respond later.",
    keyTakeaways: [
      "Routine micro-moments shape leadership architecture far more than rare emergencies.",
      "The day begins before you do: the morning mental posture dictates whether daily interactions become battlefields or clarity.",
      "Emotions whisper behind tone, pace, and silence before shouting as conflict."
    ],
    summary: "Leaders rarely fail due to dramatic cataclysms; they fail in routine fatigue. Waking up to notifications triggers immediate cortisol spikes before the feet touch the floor. By midday, attention is porous and reactions are brittle. Establishing baseline clarity through micro-pauses enables a leader to read subtle human signals that reactive minds miss.",
    microPractice: {
      title: "Morning Baseline Clarity Scan",
      duration: "10 seconds before checking devices",
      steps: [
        "Exhale slowly (2s) to signal biological safety.",
        "Scan inner state (2s): tension in jaw, shoulders, breath.",
        "Name dominant emotion (2s): 'hurried', 'anticipatory', 'overloaded'.",
        "Ask (2s): 'What might I misread today if I rush?'",
        "Shift (2s): Commit to clarity over speed."
      ]
    },
    reflectionQuestion: "What emotional pattern consistently appears in my mornings, and how does it tilt the remainder of my workday?",
    scenario: {
      title: "The Tense Morning Standup",
      context: "A manager enters an 8:30 AM status sync with an inbox full of urgent executive escalations.",
      challenge: "Their clipped tone and fast cadence make three key contributors shut down and withhold blocker details.",
      ralResolution: "The manager catches their own hurried breathing, takes a 10-second baseline reset, softens their posture, and invites the team to share obstacles openly without fear of judgment."
    },
    quiz: {
      question: "Why does RAL emphasize morning baseline clarity over noon-time decision tools?",
      options: [
        "Because morning is the only time emails arrive",
        "Because the leader's internal posture at dawn colors every subsequent interaction as either a threat or clarity",
        "Because prefrontal cortex activity stops at midday",
        "Because morning routines are fashionable in executive culture"
      ],
      correctIndex: 1,
      explanation: "A reactive mind turns everyday exchanges into combat; a reflective mind rooted at dawn transforms identical exchanges into collaborative clarity."
    }
  },
  {
    id: 8,
    section: 'Section II: The Adaptive Shift',
    sectionNumber: 2,
    title: "The Adaptive Mindset: Seeing What Others Miss",
    subtitle: "Pattern reading, frame separation, and the 90-second emotional wave",
    ralLaw: "Perception collapses before strategy does, and adaptive leaders widen their lens before widening their action.",
    mantra: "Slow the meaning. The truth appears.",
    keyTakeaways: [
      "The mind's initial interpretation is an ancient survival reflex, almost never objective reality.",
      "True leadership genius is pattern recognition, not moment reaction.",
      "Emotions are neurochemical waves that peak and fall within 90 seconds unless continuously fed by stories."
    ],
    summary: "When a colleague walks into an office with tension, an untrained leader assumes anger or disrespect. An adaptive leader looks deeper: noticing shallow breathing, slumped posture, and eyes that betray fear or exhaustion rather than hostility. By separating Fact from Emotion from Story, the leader dissolves interpersonal friction.",
    microPractice: {
      title: "The 3-Layer Frame Separation Drill",
      duration: "60 seconds",
      steps: [
        "Layer 1: What is the factual event? (Exact words spoken, verifiable data)",
        "Layer 2: What emotion did it trigger in me? (Chest tightness, anxiety, indignation)",
        "Layer 3: What fictional story did my brain generate? ('They don't respect my role')",
        "Drop the story; address the human fact."
      ]
    },
    reflectionQuestion: "When do I tend to trust my initial interpretation too quickly, and how often has that rush to judgment misled me?",
    scenario: {
      title: "The Abrupt Senior Resignation Warning",
      context: "A star developer abruptly posts a message in Slack: 'I'm stepping back from the core module indefinitely.'",
      challenge: "The director feels insulted and assumes the developer is attempting extortion before a deadline.",
      ralResolution: "The director executes Frame Separation: Fact = developer requested step-back; Emotion = anxiety over delivery; Story = extortion. They schedule a 1-on-1, discovering severe family illness, and craft a supportive cover plan."
    },
    quiz: {
      question: "What does the 90-second reset teach leaders about emotional surges?",
      options: [
        "That emotions must be suppressed immediately for 90 seconds",
        "That the physiological wave of an emotion washes through the bloodstream in 90 seconds unless sustained by mental stories",
        "That every decision must take exactly 90 minutes",
        "That leaders should ignore their teams for 90 seconds every meeting"
      ],
      correctIndex: 1,
      explanation: "Neuroscience reveals that emotional neuropeptides flood the body and clear within 90 seconds; conscious pausing lets the chemical surge subside without destructive action."
    }
  },
  {
    id: 9,
    section: 'Section II: The Adaptive Shift',
    sectionNumber: 2,
    title: "Leadership Under Pressure",
    subtitle: "Maintaining cognitive altitude amidst digital overload and narrative acceleration",
    ralLaw: "Pressure does not break leaders. Distorted perception does.",
    mantra: "Slow the mind. The world follows.",
    keyTakeaways: [
      "In the analogue world, pressure tested physical endurance; in the digital world, pressure tests cognitive clarity.",
      "Digital noise creates three dilemmas: Overload (information), Acceleration (speed), and Visibility (scrutiny).",
      "Presence is the true stabilizer; teams follow the leader who stays steady while everything accelerates."
    ],
    summary: "Military combat taught RK Vedant that high pressure narrows perception, but civilian digital environments create an even more pervasive fog: continuous pings, dashboards, and instant escalations. Under pressure, the leader must not fight the storm or offer quick answers; they must become the calm emotional anchor that allows the room to think.",
    microPractice: {
      title: "The 5-Point Somatic Pressure Reset",
      duration: "10 seconds",
      steps: [
        "Drop shoulders to release the physical threat posture.",
        "Take a slow, deep breath to re-expand cognitive bandwidth.",
        "Label the distortion: 'urgency', 'overload', or 'unverified assumption'.",
        "Ask: 'What am I filling in without empirical evidence?'",
        "Deliberately slow your speaking cadence by 20% to signal stability."
      ]
    },
    reflectionQuestion: "When I am under intense pressure, what does my mind distort first: the other person's tone, their intention, or the actual urgency?",
    scenario: {
      title: "The Cybersecurity Incident Command",
      context: "At 2 AM, the incident response channel explodes with alerts of an apparent database breach.",
      challenge: "Engineers are shouting conflicting theories, managers are drafting premature press statements, and panic is mounting.",
      ralResolution: "The CISO invokes the Somatic Pressure Reset: requires 60 seconds of complete silence on the call, establishes the known facts versus conjectures, and institutes an orderly 15-minute verification loop."
    },
    quiz: {
      question: "According to Chapter 9, what is the ultimate stabilizer of a team facing rapid crisis?",
      options: [
        "The leader's absolute technical authority and loud commands",
        "The leader's internal steadiness and calm presence",
        "Accelerating the response speed beyond the competition",
        "Hiding all negative information from the team"
      ],
      correctIndex: 1,
      explanation: "Teams synchronize their nervous systems with the leader's internal posture. A grounded, steady leader lowers collective cortisol and restores cognitive capacity."
    }
  },
  {
    id: 10,
    section: 'Section II: The Adaptive Shift',
    sectionNumber: 2,
    title: "The Quiet Architecture of Ethical Leadership",
    subtitle: "Integrity as inner coherence in an era of digital temptation and speed",
    ralLaw: "Ethics collapses the moment inner clarity collapses. Moral failure begins in the mind long before it appears in action.",
    mantra: "Do the aligned thing, not the easy thing.",
    keyTakeaways: [
      "Ethics is not a compliance checklist or dramatic public stance; it is a quiet internal rhythm.",
      "Digital speed tempts leaders to respond before thinking, prioritize appearance over substance, and hide uncertainty.",
      "True integrity is the complete alignment between internal truth, spoken words, and overt action."
    ],
    summary: "Leaders rarely set out to act corruptly. Moral compromises occur in micro-moments of fatigue, fear of conflict, or pressure to present flawless metrics. Digital environments multiply these temptations with narrative acceleration and instant visibility. Ethical leadership demands moving toward discomfort and answering: 'What truth am I currently avoiding?'",
    microPractice: {
      title: "The 5-Step Ethical Alignment Check",
      duration: "1 minute before signing or committing",
      steps: [
        "Pause the impulse to conclude quickly.",
        "Name the inner pull: ego, fear, convenience, or conflict avoidance.",
        "Ask: 'What truth am I avoiding or softening right now?'",
        "Shift from immediate comfort to deep long-term coherence.",
        "Run the Tomorrow Test: 'Will this decision still feel honorable in daylight tomorrow?'"
      ]
    },
    reflectionQuestion: "Which emotion most frequently threatens my ethical clarity: fear of rejection, organizational loyalty, convenience, or pride?",
    scenario: {
      title: "The Glitched Milestone Report",
      context: "A project manager realizes that meeting a quarterly performance bonus requires glossing over unresolved security flaws in an executive update.",
      challenge: "The team wants the bonus; leadership is celebrating early; reporting the flaws will cause delay.",
      ralResolution: "The manager performs the Alignment Check: recognizes the temptation of convenience, embraces the discomfort of truth, and transparently briefs leadership on the vulnerabilities along with a remediation schedule."
    },
    quiz: {
      question: "How does RAL define genuine ethical leadership?",
      options: [
        "Strict adherence to external legal minimums and public relations PR statements",
        "The deep internal alignment between truth, values, perception, and behaviour",
        "Sacrificing personal values to ensure team consensus at any cost",
        "Punishing anyone who raises an ethical dilemma in public"
      ],
      correctIndex: 1,
      explanation: "Ethics is an internal environment. When a leader's values, thoughts, and actions stop contradicting one another, ethics becomes a natural, quiet presence."
    }
  },
  {
    id: 11,
    section: 'Section III: RAL in the Real World',
    sectionNumber: 3,
    title: "Leading People Through Uncertainty",
    subtitle: "Becoming the emotional anchor when certainty is obsolete",
    ralLaw: "Uncertainty weakens teams only when leaders lose their inner rhythm. Stability begins in the leader long before it appears in the organisation.",
    mantra: "Lead the atmosphere, not the uncertainty.",
    keyTakeaways: [
      "Uncertainty is no longer an isolated event; it is the permanent climate of modern work.",
      "Pretending to have answers when you do not shatters team trust; honest steadiness creates resilience.",
      "Leaders must pace their teams through the unknown, taking it window by window, not wall by wall."
    ],
    summary: "In hyper-digital environments, uncertainty behaves like weather systems. Employees express anxiety not through explicit words, but through hesitation, silence, or hyperactive busywork. When leaders pretend omniscience, teams detect the dissonance. A reflective leader openly acknowledges the fog while providing calm pacing and unwavering groundedness.",
    microPractice: {
      title: "Team Climate Calibration",
      duration: "30 seconds at the start of ambiguous discussions",
      steps: [
        "Name the climate silently: 'Tension', 'Confusion', or 'Emotional fatigue'.",
        "Deliberately slow the pace of the room: lower vocal volume and lengthen pauses.",
        "Offer grounded sincerity: 'We do not have all the data yet, but we will navigate this step by step.'"
      ]
    },
    reflectionQuestion: "What subtle emotional signals do I routinely overlook in my team, and what does that reveal about my own inner hurriedness?",
    scenario: {
      title: "The Sudden Reorganization Rumor",
      context: "Leaked emails suggest an impending corporate merger, causing anxiety, rumor-mongering, and lost productivity across all squads.",
      challenge: "The division lead does not yet have verified details from corporate HR and is tempted to dodge all questions.",
      ralResolution: "The lead convenes an all-hands, validates the emotional climate with sincerity, separates verified facts from speculation, and commits to transparent weekly syncs."
    },
    quiz: {
      question: "What is the most destructive error a leader can make when guiding a team through severe uncertainty?",
      options: [
        "Acknowledging that the outcome is currently unknown",
        "Pretending to possess complete certainty while internally anxious",
        "Encouraging open questions and dissenting perspectives",
        "Slowing down the meeting tempo to ensure clarity"
      ],
      correctIndex: 1,
      explanation: "Pretending clarity breaks trust because people detect micro-tensions immediately. Sincerity and steadiness are what create psychological stability."
    }
  },
  {
    id: 12,
    section: 'Section III: RAL in the Real World',
    sectionNumber: 3,
    title: "The Reflective Adaptive Team",
    subtitle: "Where individual clarity becomes collective intelligence and psychological safety",
    ralLaw: "A team becomes intelligent the moment the leader's inner clarity becomes collective clarity.",
    mantra: "When the team breathes together, the team thinks together.",
    keyTakeaways: [
      "Teams are living emotional fields that synchronize with the leader's nervous system.",
      "Psychological safety is not softness; it is the oxygen that permits unfiltered truth-telling and adaptation.",
      "A reflective team develops a shared vocabulary: 'Let's pause', 'What are we assuming?', 'What needs reframing?'"
    ],
    summary: "Most teams fail not from lack of intellectual capability, but from silence—silence born of fear, hesitation, or political caution. When the RAL cycle becomes embedded in everyday team interactions, collective intelligence multiplies. Meetings start with shared stillness, assumptions are surfaced without blame, and learning becomes natural.",
    microPractice: {
      title: "The 5-Step Shared Team Micro-Ritual",
      duration: "2 minutes at the start of team huddles",
      steps: [
        "Pause together: 2 seconds of deliberate collective silence.",
        "Name the room: 'What is our collective energy right now?'",
        "Surface assumptions: 'What unexamined story are we holding?'",
        "Reframe collectively: 'What else could this challenge represent?'",
        "Align action: Commit to ONE clear next step, not three."
      ]
    },
    reflectionQuestion: "How is my personal emotional state subtly shaping the psychological climate my team is working inside today?",
    scenario: {
      title: "The Siloed Feature Deadlock",
      context: "Product managers and backend engineers blame each other for missing an architectural milestone.",
      challenge: "Each side defends their territory, withholding context and speaking defensively in cross-functional meetings.",
      ralResolution: "The team lead introduces the 2-second pause and the vocabulary of shared perception: 'Let's stop defending and think together. What are the unspoken constraints each side is facing?'"
    },
    quiz: {
      question: "How does psychological safety function in high-performing reflective teams?",
      options: [
        "It protects underperformance by eliminating all accountability",
        "It provides the freedom for early truth-telling, surfacing errors without fear of punishment",
        "It ensures nobody ever disagrees with the leader",
        "It replaces project milestones with casual conversation"
      ],
      correctIndex: 1,
      explanation: "Psychological safety is the bedrock of adaptation; when individuals know their minds are respected, they speak truth early before minor fractures become catastrophic failures."
    }
  },
  {
    id: 13,
    section: 'Section III: RAL in the Real World',
    sectionNumber: 3,
    title: "The Adaptive Organisation",
    subtitle: "Engineering collective cognitive coherence through institutional rituals",
    ralLaw: "An organisation becomes adaptive the moment its people begin to think clearly together, not just work together.",
    mantra: "Clarity scales. Confusion spreads.",
    keyTakeaways: [
      "Every organization carries two realities: visible structures (charts, KPIs) and unseen realities (emotional climate, trust, hidden assumptions).",
      "Culture is built through small, consistent rituals, not executive speeches or handbooks.",
      "Core RAL Rituals: The Silent Start, the Daily 10-Minute RAL Huddle, and the Weekly Reflection Circle."
    ],
    summary: "Traditional enterprises prioritize structural efficiency and vertical hierarchy, which break down in volatile, fast-moving environments. An adaptive organization builds cognitive coherence: departments share perception, assumptions are clarified cross-functionally, and learning happens continuously after every decision, not merely post-failure.",
    microPractice: {
      title: "The 5-Minute Silent Start Meeting Ritual",
      duration: "5 minutes",
      steps: [
        "Begin every strategic session with 3 minutes of complete silence.",
        "Each attendee privately writes down: 'What do I believe is the real, unaddressed problem here?'",
        "Compare notes openly to eliminate hidden misalignment before discussing solutions."
      ]
    },
    reflectionQuestion: "What cultural patterns inside my organization are driving strategic decisions more than the objective facts themselves?",
    scenario: {
      title: "The Multi-Million Rupee Analyst Discovery",
      context: "As detailed in Chapter 13, a junior analyst conceals a cost-saving insight for six months due to fear of executive criticism.",
      challenge: "The hierarchy suppressed ground-level signals because dissent was perceived as defiance.",
      ralResolution: "The leadership instituted the Silent Start and psychological safety protocols. The analyst felt safe to share the idea, saving the company lakhs in waste and validating the power of open cognitive layers."
    },
    quiz: {
      question: "What is the primary function of the 'Silent Start' ritual in adaptive organizations?",
      options: [
        "To allow latecomers to join without interrupting the speaker",
        "To clear emotional noise and surface independent perspectives before groupthink takes hold",
        "To meditate for spiritual enlightenment during company hours",
        "To prepare disciplinary action for underperforming staff"
      ],
      correctIndex: 1,
      explanation: "The Silent Start clears emotional rush, forces individuals to write their genuine diagnosis of the problem, and prevents dominant voices from monopolizing collective perception."
    }
  },
  {
    id: 14,
    section: 'Section III: RAL in the Real World',
    sectionNumber: 3,
    title: "Navigating Crisis Without Losing Yourself",
    subtitle: "The inner stillness that sustains leadership under fire and solitude",
    ralLaw: "In crisis, the real danger is not the event - it is the mind that interprets it.",
    mantra: "Calm is my first response. Clarity is my real power.",
    keyTakeaways: [
      "Crisis attacks internal perception before circumstances; leaders fail when panic becomes the narrator.",
      "The leader's first duty in chaos is not to the crisis, but to their own inner grounding.",
      "Acceptance is not surrender; it is clear-eyed acknowledgement of reality: 'This is the terrain. Now let me lead.'"
    ],
    summary: "When crisis erupts, the chest tightens, breathing accelerates, and instinct shouts to take immediate, noisy action. In modern digital crises, panic spreads through instant messaging, rumors, and narrative acceleration. The reflective adaptive leader steps into acceptance, refuses to allow fear to author decisions, and acts with deliberate, calm precision.",
    microPractice: {
      title: "Crisis Inner Grounding Sequence",
      duration: "5 seconds",
      steps: [
        "Exhale sharply (1s) to break the somatic panic spike.",
        "Lower shoulders (1s) to send an immediate safety signal to the vagal nerve.",
        "Name the real threat (1s): Is the danger the external event, or my runaway emotion?",
        "Anchor the mind (1s): 'I will not decide from fear.'",
        "Shift into clarity (1s): Step forward with steady, measured presence."
      ]
    },
    reflectionQuestion: "When the last serious crisis hit my organization, what hijacked me first: the operational situation, or my own internal anxiety?",
    scenario: {
      title: "The Hostile Boardroom Ultimatum",
      context: "During a severe market downturn, an activist investor demands immediate mass layoffs within 24 hours.",
      challenge: "The executive team is terrified, fragmented, and preparing to make panicked cuts that would destroy long-term capability.",
      ralResolution: "The CEO applies Chapter 14: steps alone into silence, regulates their nervous system, accepts the reality of the downturn without drama, and presents an alternative structured restructuring plan with clear strategic trade-offs."
    },
    quiz: {
      question: "According to RAL, why is 'Acceptance' the true turning point in any severe crisis?",
      options: [
        "Because it means giving up and letting events take their course",
        "Because it shifts the leader from futile emotional resistance to grounded reality: 'This is what I have; now let me lead'",
        "Because it convinces regulators that the company is compliant",
        "Because it proves that the crisis was completely unavoidable"
      ],
      correctIndex: 1,
      explanation: "Acceptance is not surrender; it is the psychological pivot where the leader stops fighting the fact of the crisis and begins actively navigating the real terrain."
    }
  },
  {
    id: 15,
    section: 'Section III: RAL in the Real World',
    sectionNumber: 3,
    title: "The Rise of Measurable Leadership",
    subtitle: "Quantifying inner states, decision pathways, and the four diagnostic matrices",
    ralLaw: "Leadership becomes reliable only when the inner state, the decision pathway, the decision quality, and the cultural imprint are all measurable and visible.",
    mantra: "Measure the mind; the decisions will follow.",
    keyTakeaways: [
      "Intuition collapses under digital acceleration; leadership must transition into a science-driven discipline.",
      "Lag indicators (revenue, attrition) only report damage after it occurs; inner indicators predict it.",
      "The Four Matrices convert subjective executive personality into an assessable, trainable operating system."
    ],
    summary: "Traditional business schools evaluate charisma, agility, and retrospective 360-degree feedback—measuring the shadow rather than the source. The RAL psychometric framework introduces quantifiable inner metrics: the Awareness Grid (Matrix 1), the State Transition Map (Matrix 2), the Adaptive Decision Grid (Matrix 3), and the Adaptive Culture Lattice (Matrix 4).",
    microPractice: {
      title: "The 4-Matrix Quick Health Check",
      duration: "2 minutes at end-of-day",
      steps: [
        "Matrix 1: In which quadrant did I spend the majority of my working hours today?",
        "Matrix 2: Did I execute the Pause-Perceive-Reframe loop when triggered?",
        "Matrix 3: Did my decisions stem from Aligned Action or Emotional Bias?",
        "Matrix 4: Did our team communicate with psychological safety or silence?"
      ]
    },
    reflectionQuestion: "In which area of my leadership do I still dangerously lean on subjective 'gut feel' instead of disciplined, measurable clarity?",
    scenario: {
      title: "The AI Recommendation Governance Dilemma",
      context: "An enterprise AI system recommends cutting 40 suppliers based on an algorithmic optimization model.",
      challenge: "The executive team wants to accept it blindly because 'the AI confirmed our cost-cutting hypothesis.'",
      ralResolution: "The VP applies the RAL Decision Protocol: examines whether confirmation bias is distorting judgment, verifies whether contextual human constraints were considered, and mandates human accountability override before execution."
    },
    quiz: {
      question: "Why does RAL assert that traditional leadership metrics (360 reviews, output KPIs) are incomplete?",
      options: [
        "Because metrics should only be calculated by financial accountants",
        "Because they measure lag indicators of external behavior rather than the internal perception engine that generates those behaviors",
        "Because they require too many software integrations",
        "Because leadership cannot be measured in any way"
      ],
      correctIndex: 1,
      explanation: "Traditional reviews track what people did after the fact (the shadow). RAL measures where leaders decide from (the inner source), preventing distortion before action."
    }
  },
  {
    id: 16,
    section: 'Section III: RAL in the Real World',
    sectionNumber: 3,
    title: "The RAL Journey Forward",
    subtitle: "Carrying inner architecture into life, relationships, and timeless legacy",
    ralLaw: "Leadership matures the moment RAL stops being a method you apply and becomes the consciousness you live from - Presence, not position, becomes the leader's true architecture.",
    mantra: "Presence is my leadership. Clarity is my true power.",
    keyTakeaways: [
      "The final stage of RAL is identity coherence: leading through who you are rather than what you project.",
      "RAL expands beyond corporate walls into personal relationships, emotional stability, and societal contribution.",
      "The RAL leader becomes a lighthouse: not shouting instructions, but standing steady in their own clarity so others can orient themselves."
    ],
    summary: "When the titles fade and the intensity settles, the foundational question remains: 'How do I now live?' In full maturity, you stop 'using' RAL; you inhabit it. The pauses become second nature, perception is unclouded, and adaptation is an effortless posture. You lead not by dominance, but by radiating undeniable steadiness into every space you enter.",
    microPractice: {
      title: "Presence Reboot & Identity Alignment",
      duration: "30 seconds",
      steps: [
        "Drop shoulders, exhale slowly, and release any impulse to perform strength.",
        "Ask: 'Am I responding from my true identity or from situational pressure?'",
        "Enter your next conversation with presence, listening deeply, and speaking with measured grace."
      ]
    },
    reflectionQuestion: "Where does my identity still cling to external titles and achievements, rather than resting in inner coherence and presence?",
    scenario: {
      title: "The Veteran's Timeless Legacy",
      context: "A retiring executive reflects on how to transition leadership to the next generation without micromanagement or emotional withdrawal.",
      challenge: "The fear of losing relevance tempts the executive to meddle in operational details.",
      ralResolution: "The leader embodies Chapter 16: stepping into the lighthouse posture, serving as a sounding board of stillness, offering questions rather than directives, and elevating the new leadership team with trust."
    },
    quiz: {
      question: "What is the ultimate mark of maturity in Reflective Adaptive Leadership?",
      options: [
        "Having memorized all 16 chapters and reciting them during meetings",
        "When RAL ceases to be a conscious technique and becomes your natural, default state of presence and coherence",
        "Achieving a promotion to Chief Executive Officer",
        "Eliminating every single emotion so you never feel anything"
      ],
      correctIndex: 1,
      explanation: "RAL achieves its highest purpose when doing becomes being: reflection becomes instinct, adaptation becomes posture, and clarity becomes your way of living."
    }
  }
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  // SECTION 1: RAAG (Reflective Adaptive Awareness Grid)
  { id: 1, sectionKey: 'RAAG', sectionName: 'Reflective Adaptive Awareness Grid', questionNumber: 1, text: "I can detect emotional shifts in myself before they influence my decisions." },
  { id: 2, sectionKey: 'RAAG', sectionName: 'Reflective Adaptive Awareness Grid', questionNumber: 2, text: "I notice when my perception is being distorted by stress or speed." },
  { id: 3, sectionKey: 'RAAG', sectionName: 'Reflective Adaptive Awareness Grid', questionNumber: 3, text: "I separate facts from assumptions during high-pressure moments." },
  { id: 4, sectionKey: 'RAAG', sectionName: 'Reflective Adaptive Awareness Grid', questionNumber: 4, text: "I can recognise when my mind is narrowing into defensive thinking." },
  { id: 5, sectionKey: 'RAAG', sectionName: 'Reflective Adaptive Awareness Grid', questionNumber: 5, text: "I stay aware of how others may be interpreting my behaviour." },
  { id: 6, sectionKey: 'RAAG', sectionName: 'Reflective Adaptive Awareness Grid', questionNumber: 6, text: "I can pause instantly when I sense internal turbulence." },
  { id: 7, sectionKey: 'RAAG', sectionName: 'Reflective Adaptive Awareness Grid', questionNumber: 7, text: "I can identify the root emotion beneath my initial reaction." },
  { id: 8, sectionKey: 'RAAG', sectionName: 'Reflective Adaptive Awareness Grid', questionNumber: 8, text: "I regularly examine whether my worldview is outdated or biased." },
  { id: 9, sectionKey: 'RAAG', sectionName: 'Reflective Adaptive Awareness Grid', questionNumber: 9, text: "I can observe discomfort without being hijacked by it." },
  { id: 10, sectionKey: 'RAAG', sectionName: 'Reflective Adaptive Awareness Grid', questionNumber: 10, text: "I adjust my internal state before engaging in important conversations." },

  // SECTION 2: LSTM (Leadership State Transition Map)
  { id: 11, sectionKey: 'LSTM', sectionName: 'Leadership State Transition Map', questionNumber: 1, text: "I can immediately recognise when I enter a reactive mental state." },
  { id: 12, sectionKey: 'LSTM', sectionName: 'Leadership State Transition Map', questionNumber: 2, text: "I consciously shift from reaction to reflection during conflict." },
  { id: 13, sectionKey: 'LSTM', sectionName: 'Leadership State Transition Map', questionNumber: 3, text: "I can slow down my thinking even when urgency is high." },
  { id: 14, sectionKey: 'LSTM', sectionName: 'Leadership State Transition Map', questionNumber: 4, text: "I can transit into problem-solving without emotional residue." },
  { id: 15, sectionKey: 'LSTM', sectionName: 'Leadership State Transition Map', questionNumber: 5, text: "I consciously choose whether to respond, delay, or disengage." },
  { id: 16, sectionKey: 'LSTM', sectionName: 'Leadership State Transition Map', questionNumber: 6, text: "I can reframe a situation quickly when the first interpretation is wrong." },
  { id: 17, sectionKey: 'LSTM', sectionName: 'Leadership State Transition Map', questionNumber: 7, text: "I shift from control to curiosity when things go off plan." },
  { id: 18, sectionKey: 'LSTM', sectionName: 'Leadership State Transition Map', questionNumber: 8, text: "I can reset my mental state in less than one minute when required." },
  { id: 19, sectionKey: 'LSTM', sectionName: 'Leadership State Transition Map', questionNumber: 9, text: "I rarely carry yesterday's emotional load into today's decisions." },
  { id: 20, sectionKey: 'LSTM', sectionName: 'Leadership State Transition Map', questionNumber: 10, text: "I can identify exactly what state I am operating from at any moment." },

  // SECTION 3: ADG (Adaptive Decision Grid)
  { id: 21, sectionKey: 'ADG', sectionName: 'Adaptive Decision Grid', questionNumber: 1, text: "I consistently check whether my inner clarity matches outer reality." },
  { id: 22, sectionKey: 'ADG', sectionName: 'Adaptive Decision Grid', questionNumber: 2, text: "I differentiate between noise and signal before deciding." },
  { id: 23, sectionKey: 'ADG', sectionName: 'Adaptive Decision Grid', questionNumber: 3, text: "I verify assumptions before accepting them as truth." },
  { id: 24, sectionKey: 'ADG', sectionName: 'Adaptive Decision Grid', questionNumber: 4, text: "I rarely make decisions from ego, fear, or insecurity." },
  { id: 25, sectionKey: 'ADG', sectionName: 'Adaptive Decision Grid', questionNumber: 5, text: "I look for second and third-order effects naturally." },
  { id: 26, sectionKey: 'ADG', sectionName: 'Adaptive Decision Grid', questionNumber: 6, text: "I make decisions based on alignment, not pressure or speed." },
  { id: 27, sectionKey: 'ADG', sectionName: 'Adaptive Decision Grid', questionNumber: 7, text: "I re-evaluate decisions when conditions shift." },
  { id: 28, sectionKey: 'ADG', sectionName: 'Adaptive Decision Grid', questionNumber: 8, text: "I seek perceptual diversity to improve decision accuracy." },
  { id: 29, sectionKey: 'ADG', sectionName: 'Adaptive Decision Grid', questionNumber: 9, text: "I avoid premature closure; I hold ambiguity when needed." },
  { id: 30, sectionKey: 'ADG', sectionName: 'Adaptive Decision Grid', questionNumber: 10, text: "I can justify every major decision with clear reasoning." },

  // SECTION 4: ACL (Adaptive Culture Lattice)
  { id: 31, sectionKey: 'ACL', sectionName: 'Adaptive Culture Lattice', questionNumber: 1, text: "People feel safe speaking honestly around me." },
  { id: 32, sectionKey: 'ACL', sectionName: 'Adaptive Culture Lattice', questionNumber: 2, text: "I reduce defensiveness and distortion during conversations." },
  { id: 33, sectionKey: 'ACL', sectionName: 'Adaptive Culture Lattice', questionNumber: 3, text: "My presence stabilises teams during uncertainty." },
  { id: 34, sectionKey: 'ACL', sectionName: 'Adaptive Culture Lattice', questionNumber: 4, text: "I model adaptive behaviour instead of demanding it." },
  { id: 35, sectionKey: 'ACL', sectionName: 'Adaptive Culture Lattice', questionNumber: 5, text: "I pick up emotional signals in teams early." },
  { id: 36, sectionKey: 'ACL', sectionName: 'Adaptive Culture Lattice', questionNumber: 6, text: "I address misalignment before it turns into conflict." },
  { id: 37, sectionKey: 'ACL', sectionName: 'Adaptive Culture Lattice', questionNumber: 7, text: "I create rituals that encourage shared reflection." },
  { id: 38, sectionKey: 'ACL', sectionName: 'Adaptive Culture Lattice', questionNumber: 8, text: "My clarity influences others without authority." },
  { id: 39, sectionKey: 'ACL', sectionName: 'Adaptive Culture Lattice', questionNumber: 9, text: "I reinforce truth-telling, not comfort-seeking." },
  { id: 40, sectionKey: 'ACL', sectionName: 'Adaptive Culture Lattice', questionNumber: 10, text: "My team becomes more coherent when I am present." }
];

export const PRACTICE_DAYS: PracticeDay[] = [
  // Week 1: Foundation (Pause & Notice)
  {
    day: 1,
    week: 1,
    weekTitle: "WEEK 1 — THE FOUNDATION (PAUSE & NOTICE)",
    weekTheme: "Rewiring the automatic mind and building micro-muscles of stopping unconscious momentum.",
    title: "The 10-Second Baseline Reset",
    objective: "Interrupt reactivity at the physical level before daily meetings begin.",
    instructions: [
      "Exhale slowly (2 seconds) to signal safety to your nervous system.",
      "Scan your inner state: notice pulse, jaw, and chest tightness.",
      "Name your dominant emotion in one precise word (e.g., 'hurried', 'anticipatory').",
      "Ask: 'What am I misreading right now?'",
      "Shift posture to clarity over speed."
    ],
    microDrill: "Execute the 10-Second Reset 3 times today before opening unread emails.",
    journalPrompt: "What physical sensation told me I was speeding up today, and how did pausing alter my response?"
  },
  {
    day: 2,
    week: 1,
    weekTitle: "WEEK 1 — THE FOUNDATION (PAUSE & NOTICE)",
    weekTheme: "Rewiring the automatic mind.",
    title: "10-Second Reset Under Stress",
    objective: "Deploy the baseline reset immediately when an unexpected interruption occurs.",
    instructions: [
      "When someone brings an unexpected problem, refrain from immediate comment.",
      "Release your shoulders and exhale for 2 seconds.",
      "Observe their face: look for the human fear underneath the operational issue.",
      "Respond at 80% of your normal vocal speed."
    ],
    microDrill: "Use the 2-second exhale when answering incoming phone calls.",
    journalPrompt: "Where did slowing my words prevent an unnecessary escalation today?"
  },
  {
    day: 3,
    week: 1,
    weekTitle: "WEEK 1 — THE FOUNDATION (PAUSE & NOTICE)",
    weekTheme: "Rewiring the automatic mind.",
    title: "Baseline Calibration Lock",
    objective: "Consolidate the physical habit of conscious pausing.",
    instructions: [
      "Practice pausing between finishing a task and beginning the next one.",
      "Do not rush to fill the transition with your phone screen.",
      "Take 3 conscious breaths in stillness."
    ],
    microDrill: "Sit in complete silence for 30 seconds before your lunch break.",
    journalPrompt: "How much of my daily rush is self-inflicted rather than externally required?"
  },
  {
    day: 4,
    week: 1,
    weekTitle: "WEEK 1 — THE FOUNDATION (PAUSE & NOTICE)",
    weekTheme: "Rewiring the automatic mind.",
    title: "Awareness Grid Morning Check (Matrix 1)",
    objective: "Map your internal state onto the 4 quadrants of the RAAG.",
    instructions: [
      "Ask at 9 AM: 'What quadrant am I in?' (Reactive-Rigid, Reactive-Flexible, Reflective-Rigid, or Reflective-Adaptive).",
      "Identify what specific interaction or notification nudged you there.",
      "Identify one micro-shift (breathing, posture, question) that moves you toward Reflective-Adaptive."
    ],
    microDrill: "Re-check your quadrant at 2:00 PM.",
    journalPrompt: "Did I drift into Reactive-Flexible (frantic doing) today? What triggered it?"
  },
  {
    day: 5,
    week: 1,
    weekTitle: "WEEK 1 — THE FOUNDATION (PAUSE & NOTICE)",
    weekTheme: "Rewiring the automatic mind.",
    title: "Mid-Day Grid Re-alignment",
    objective: "Detect when quiet stagnation (Reflective-Rigid) or urgency (Reactive-Rigid) creeps into your afternoon.",
    instructions: [
      "Notice if you are saying 'Yes' to requests out of habit rather than clarity.",
      "Notice if you are clinging to an outdated plan to avoid difficult discussions.",
      "Shift to adaptive fluidity."
    ],
    microDrill: "Ask your closest collaborator: 'What am I seeing too rigidly right now?'",
    journalPrompt: "Which of the 4 quadrants felt like my default baseline today?"
  },
  {
    day: 6,
    week: 1,
    weekTitle: "WEEK 1 — THE FOUNDATION (PAUSE & NOTICE)",
    weekTheme: "Rewiring the automatic mind.",
    title: "Emotional Truth Mapping",
    objective: "Unpack every emotional trigger into emotion, assumption, and distortion.",
    instructions: [
      "For every trigger experienced today, write down: 1. Emotion (e.g., irritation), 2. Assumption (e.g., 'They think I'm incompetent'), 3. Distortion (e.g., Mind-reading).",
      "Replace the distortion with a clearer, curious question."
    ],
    microDrill: "Map 2 triggers immediately after they happen.",
    journalPrompt: "What false story did my brain concoct during a tense moment today?"
  },
  {
    day: 7,
    week: 1,
    weekTitle: "WEEK 1 — THE FOUNDATION (PAUSE & NOTICE)",
    weekTheme: "Rewiring the automatic mind.",
    title: "Week 1 Foundation Reset Drill",
    objective: "Weekly evening journal to consolidate foundational micro-muscles.",
    instructions: [
      "Review the past 6 days in your evening journal.",
      "List 3 moments you went reactive.",
      "List 3 moments you successfully paused.",
      "Select ONE specific communication behaviour to upgrade next week."
    ],
    microDrill: "Review your total scorecard points for Week 1 (Goal: >= 30 points).",
    journalPrompt: "How has pausing changed the emotional temperature of my work environment?"
  },

  // Week 2: The Shift (Reframe & Reinterpret)
  {
    day: 8,
    week: 2,
    weekTitle: "WEEK 2 — THE SHIFT (REFRAME & REINTERPRET)",
    weekTheme: "Rebuilding the leader's cognitive architecture and reducing perceptual distortion.",
    title: "The RAL Reframe Loop (Part 1)",
    objective: "Run the Reframe Loop after every stressful event.",
    instructions: [
      "Step 1: Pause.",
      "Step 2: Perceive: 'What is actually real here, stripped of my fears?'",
      "Step 3: Reframe: 'What else could this be? What is this teaching me?'",
      "Step 4: Decide minimum-action clarity."
    ],
    microDrill: "Apply the loop to one frustrating email before clicking Reply.",
    journalPrompt: "What new meaning did I uncover when I refused my first negative interpretation?"
  },
  {
    day: 9,
    week: 2,
    weekTitle: "WEEK 2 — THE SHIFT (REFRAME & REINTERPRET)",
    weekTheme: "Rebuilding cognitive architecture.",
    title: "The RAL Reframe Loop (Part 2)",
    objective: "Practice generating at least two plausible alternative explanations for interpersonal conflict.",
    instructions: [
      "When someone disagrees sharply, silently write down two reasons: 1. They see a risk I missed; 2. They are carrying private pressure.",
      "Address their perspective with curiosity."
    ],
    microDrill: "Ask: 'Help me see what you're seeing from your vantage point.'",
    journalPrompt: "How did assuming positive or neutral intent alter the conversation's trajectory?"
  },
  {
    day: 10,
    week: 2,
    weekTitle: "WEEK 2 — THE SHIFT (REFRAME & REINTERPRET)",
    weekTheme: "Rebuilding cognitive architecture.",
    title: "Minimum-Action Clarity",
    objective: "Avoid over-reacting with complex restructuring when a simple micro-step suffices.",
    instructions: [
      "When ambiguity arises, avoid launching 5 initiatives.",
      "Find the ONE aligned, reversible micro-action that produces signal.",
      "Commit to that action cleanly."
    ],
    microDrill: "Identify a looming decision and define the smallest reversible test step.",
    journalPrompt: "Where was I tempted to over-engineer a solution due to internal anxiety?"
  },
  {
    day: 11,
    week: 2,
    weekTitle: "WEEK 2 — THE SHIFT (REFRAME & REINTERPRET)",
    weekTheme: "Rebuilding cognitive architecture.",
    title: "Cognitive Distortion Drills: Catastrophising & Mind-Reading",
    objective: "Identify and neutralize catastrophising and mind-reading in real time.",
    instructions: [
      "Catastrophising: 'Everything is ruined' -> Replace with: 'We have a localized setback in module X.'",
      "Mind-reading: 'They think I'm failing' -> Replace with: 'I have not asked them their assessment yet.'"
    ],
    microDrill: "Catch yourself making an unverified assumption about someone's opinion today.",
    journalPrompt: "Which cognitive distortion is my most habitual default under stress?"
  },
  {
    day: 12,
    week: 2,
    weekTitle: "WEEK 2 — THE SHIFT (REFRAME & REINTERPRET)",
    weekTheme: "Rebuilding cognitive architecture.",
    title: "Cognitive Distortion Drills: Hero-Saviour Bias",
    objective: "Recognize when you are rescuing others to feed your own identity rather than developing their capability.",
    instructions: [
      "Notice the urge to step in and fix a subordinate's struggle.",
      "Pause. Ask them a catalytic question instead of providing the solution.",
      "Allow them the space to think and grow."
    ],
    microDrill: "Let a team member solve an operational problem without intervening today.",
    journalPrompt: "What fear drove my desire to take over their responsibility?"
  },
  {
    day: 13,
    week: 2,
    weekTitle: "WEEK 2 — THE SHIFT (REFRAME & REINTERPRET)",
    weekTheme: "Rebuilding cognitive architecture.",
    title: "Meaning Reconstruction Drill",
    objective: "Rewrite interpretations of a conflict, a fear, and a leadership doubt.",
    instructions: [
      "Write out: 1. An ongoing conflict -> reframe it as a boundary clarification.",
      "2. A recurring fear -> reframe it as a signal of high personal value.",
      "3. A leadership doubt -> reframe it as healthy humility."
    ],
    microDrill: "Share one reframed perspective with a trusted peer or mentor.",
    journalPrompt: "How does shifting the meaning of my past struggles give me renewed energy?"
  },
  {
    day: 14,
    week: 2,
    weekTitle: "WEEK 2 — THE SHIFT (REFRAME & REINTERPRET)",
    weekTheme: "Rebuilding cognitive architecture.",
    title: "Week 2 Reflection: Reframe Ledger",
    objective: "Audit where reframing changed real outcomes this week.",
    instructions: [
      "Where did reframing change an outcome for the better?",
      "Where did I resist reframing and remain stubborn?",
      "Which core assumption dominated my week?"
    ],
    microDrill: "Calculate your scorecard progress (Target: >= 70 cumulative points).",
    journalPrompt: "What is the biggest difference between my mindset on Day 1 and Day 14?"
  },

  // Week 3: Alignment (Decide & Act)
  {
    day: 15,
    week: 3,
    weekTitle: "WEEK 3 — THE ALIGNMENT (DECIDE & ACT)",
    weekTheme: "Decision quality without emotional contamination: aligning internal clarity with external action.",
    title: "ADG Decision Protocol (Matrix 3)",
    objective: "Run the 3-point alignment check before any medium or high-stakes decision.",
    instructions: [
      "Question 1: Is my inner state clear?",
      "Question 2: Is the environment clear?",
      "Question 3: Is there hidden emotional leakage (fear, pride, exhaustion)?",
      "If any mismatch -> WAIT / DELAY / GATHER SIGNAL."
    ],
    microDrill: "Use the protocol on your most consequential decision today.",
    journalPrompt: "Did I postpone an action today because my inner state was cloudy? What was the outcome?"
  },
  {
    day: 16,
    week: 3,
    weekTitle: "WEEK 3 — THE ALIGNMENT (DECIDE & ACT)",
    weekTheme: "Decision quality without emotional contamination.",
    title: "Reflective Delay Mastery",
    objective: "Embrace strategic waiting as an active exercise in wisdom, not passive hesitation.",
    instructions: [
      "When pressed for an immediate answer in uncertainty, say: 'I have inner clarity on our intent, but outer signals are still shifting. We will decide tomorrow at 10 AM after the data lands.'",
      "Notice the relief in the room when artificial speed is removed."
    ],
    microDrill: "Practice buying 1 hour of reflection time on an incoming request.",
    journalPrompt: "How did choosing Reflective Delay prevent a premature, flawed decision?"
  },
  {
    day: 17,
    week: 3,
    weekTitle: "WEEK 3 — THE ALIGNMENT (DECIDE & ACT)",
    weekTheme: "Decision quality without emotional contamination.",
    title: "The 3-Layer Decision Scan",
    objective: "Scan the emotional, cognitive, and behavioural layers of your decisions.",
    instructions: [
      "Emotional layer: Am I reacting to a slight or fear?",
      "Cognitive layer: Am I falling into confirmation bias?",
      "Behavioural layer: Am I over-compensating for past mistakes?"
    ],
    microDrill: "Conduct this 3-layer scan during your budget or resource review.",
    journalPrompt: "Which of the 3 layers was most prone to bias today?"
  },
  {
    day: 18,
    week: 3,
    weekTitle: "WEEK 3 — THE ALIGNMENT (DECIDE & ACT)",
    weekTheme: "Decision quality without emotional contamination.",
    title: "Signal vs Noise Filtration",
    objective: "Filter operational signals from ambient noise before setting strategic direction.",
    instructions: [
      "Review your project metrics or dashboard.",
      "Identify the 2 numbers that truly matter (Signal).",
      "Identify 5 metrics that create anxiety but require no change in course (Noise)."
    ],
    microDrill: "Turn off 3 non-essential notifications on your mobile device.",
    journalPrompt: "What noise did I successfully ignore today that previously would have stressed me?"
  },
  {
    day: 19,
    week: 3,
    weekTitle: "WEEK 3 — THE ALIGNMENT (DECIDE & ACT)",
    weekTheme: "Decision quality without emotional contamination.",
    title: "Action with Minimum Energy (Precision Over Effort)",
    objective: "Lead with clean precision rather than exhausting muscular force.",
    instructions: [
      "Practice acting without over-explaining.",
      "Practice acting without defending your choices pre-emptively.",
      "Practice acting without second-guessing after committing.",
      "Goal: Surgical precision over anxious effort."
    ],
    microDrill: "Deliver a directive or request in half the usual word count.",
    journalPrompt: "How did speaking less actually increase the clarity and authority of my leadership?"
  },
  {
    day: 20,
    week: 3,
    weekTitle: "WEEK 3 — THE ALIGNMENT (DECIDE & ACT)",
    weekTheme: "Decision quality without emotional contamination.",
    title: "Second- and Third-Order Effect Mapping",
    objective: "Trace the systemic ripples of your key decisions before execution.",
    instructions: [
      "Take your primary decision today.",
      "First order: What happens immediately?",
      "Second order: How will our peers and customers react in 3 weeks?",
      "Third order: What cultural precedent does this set for our junior leaders in 6 months?"
    ],
    microDrill: "Discuss second-order impacts with a team member.",
    journalPrompt: "Did anticipating a downstream reaction save our team future rework?"
  },
  {
    day: 21,
    week: 3,
    weekTitle: "WEEK 3 — THE ALIGNMENT (DECIDE & ACT)",
    weekTheme: "Decision quality without emotional contamination.",
    title: "Week 3 Decision Audit Reset",
    objective: "Review 3 major decisions made this week.",
    instructions: [
      "Diagnose the clarity source for each decision (Aligned Action vs Emotional Bias).",
      "Identify 1 recurring decision error pattern.",
      "Set an intention for Week 4 cultural integration."
    ],
    microDrill: "Verify scorecard tally (Target: >= 105 cumulative points).",
    journalPrompt: "Where have I grown most in separating urgency from true importance?"
  },

  // Week 4: Integration (Identity & Culture)
  {
    day: 22,
    week: 4,
    weekTitle: "WEEK 4 — THE INTEGRATION (IDENTITY & CULTURE)",
    weekTheme: "Moving from doing RAL to becoming RAL: shaping presence, team resonance, and systemic trust.",
    title: "Psychological Safety Micro-Behaviours (Part 1)",
    objective: "Model subtle micro-actions that establish psychological safety for those around you.",
    instructions: [
      "Consciously slow your vocal tone by 15% in meetings.",
      "Ask at least 1 clarifying question before delivering your view.",
      "Name your internal state transparently: 'I am processing what you just shared; give me 5 seconds to think.'"
    ],
    microDrill: "Use 'I am processing this...' in your next team huddle.",
    journalPrompt: "How did naming my processing state help others relax and speak more honestly?"
  },
  {
    day: 23,
    week: 4,
    weekTitle: "WEEK 4 — THE INTEGRATION (IDENTITY & CULTURE)",
    weekTheme: "Moving from doing RAL to becoming RAL.",
    title: "Psychological Safety Micro-Behaviours (Part 2)",
    objective: "Acknowledge and validate someone's emotional signal in real time.",
    instructions: [
      "When someone hesitates, acknowledge it gently: 'I sense you might have reservations about this timeline. I want to hear them.'",
      "Protect their dignity even if the news is difficult."
    ],
    microDrill: "Encourage a dissenting perspective during an operational sync.",
    journalPrompt: "What truth emerged when I gave permission for someone to disagree?"
  },
  {
    day: 24,
    week: 4,
    weekTitle: "WEEK 4 — THE INTEGRATION (IDENTITY & CULTURE)",
    weekTheme: "Moving from doing RAL to becoming RAL.",
    title: "The Cultural Lattice Pulse (Matrix 4 Scan)",
    objective: "Conduct the daily E-C-B scan across your team or household.",
    instructions: [
      "Emotional layer: Was truth spoken early today? Did people feel safe?",
      "Cognitive layer: Did we think together or separately? Did assumptions get unpacked?",
      "Behavioural layer: Did we adapt our plans or defend past turf?"
    ],
    microDrill: "Perform the E-C-B scan at the conclusion of your working day.",
    journalPrompt: "What is the true emotional temperature of my team right now?"
  },
  {
    day: 25,
    week: 4,
    weekTitle: "WEEK 4 — THE INTEGRATION (IDENTITY & CULTURE)",
    weekTheme: "Moving from doing RAL to becoming RAL.",
    title: "Engineering Team Rituals",
    objective: "Introduce a repeatable reflection ritual into your group's operating cadence.",
    instructions: [
      "Test either the Silent Start (3 minutes of quiet writing before discussing a problem), or the 10-Minute RAL Huddle ('What changed? What matters? What needs reframing?')."
    ],
    microDrill: "Propose a 10-Minute Friday Reflection Circle to your team.",
    journalPrompt: "How receptive was the group to building intentional pause into their rhythm?"
  },
  {
    day: 26,
    week: 4,
    weekTitle: "WEEK 4 — THE INTEGRATION (IDENTITY & CULTURE)",
    weekTheme: "Moving from doing RAL to becoming RAL.",
    title: "Identity Alignment Drill",
    objective: "Distinguish between your old reactive identity and your emerging reflective adaptive identity.",
    instructions: [
      "Ask: 'What behaviour today reflected my old identity (need to control, perform, impress)?'",
      "Ask: 'What behaviour reflected my reflective adaptive identity (presence, listening, groundedness)?'",
      "Celebrate the shift."
    ],
    microDrill: "Catch and interrupt one habitual performance behavior today.",
    journalPrompt: "What identity shift is quietly cementing within me as this journey progresses?"
  },
  {
    day: 27,
    week: 4,
    weekTitle: "WEEK 4 — THE INTEGRATION (IDENTITY & CULTURE)",
    weekTheme: "Moving from doing RAL to becoming RAL.",
    title: "Presence Conditioning (The 3-Second Gap)",
    objective: "Master the practice of staying silent for 3 full seconds before replying.",
    instructions: [
      "Whenever asked a consequential question, do not jump into answer mode.",
      "Stay silent for 3 seconds: breathe, let the other person know they were heard, and allow clarity to surface.",
      "Speak from groundedness."
    ],
    microDrill: "Use the 3-second gap in at least 4 conversations today.",
    journalPrompt: "How does 3 seconds of stillness change who holds the real gravitas in a room?"
  },
  {
    day: 28,
    week: 4,
    weekTitle: "WEEK 4 — THE INTEGRATION (IDENTITY & CULTURE)",
    weekTheme: "Moving from doing RAL to becoming RAL.",
    title: "Tracking the Emotional Temperature of Rooms",
    objective: "Read group dynamics as an invisible field of energy before engaging.",
    instructions: [
      "Before speaking upon entering a conference room or video call, observe:",
      "Where is the tension? Who is quiet? Whose energy is scattered?",
      "Modulate your own presence to act as the calming anchor."
    ],
    microDrill: "Anchor a tense discussion purely through steady breathing and posture.",
    journalPrompt: "Did my calm presence de-escalate tension without me having to give a speech?"
  },
  {
    day: 29,
    week: 4,
    weekTitle: "WEEK 4 — THE INTEGRATION (IDENTITY & CULTURE)",
    weekTheme: "Moving from doing RAL to becoming RAL.",
    title: "The Lighthouse Posture Integration",
    objective: "Embody the principle of the lighthouse: illuminating without shouting instructions.",
    instructions: [
      "Stop chasing ships. Stop demanding attention.",
      "Lead by being undeniable in your inner coherence, fairness, and calm.",
      "Allow others to orient themselves around your steadfastness."
    ],
    microDrill: "Remind yourself before every meeting: 'Presence is my leadership.'",
    journalPrompt: "Where have I transitioned from performing leadership to simply being clear?"
  },
  {
    day: 30,
    week: 4,
    weekTitle: "WEEK 4 — THE INTEGRATION (IDENTITY & CULTURE)",
    weekTheme: "Moving from doing RAL to becoming RAL.",
    title: "The Integration Ritual: 1-Page New RAL Identity Sheet",
    objective: "Synthesize your 30-day journey into your lifelong personal leadership compass.",
    instructions: [
      "Draft your 1-page RAL Identity Sheet with the 5 core declarations:",
      "1. My State Signature (How I stay centered under speed)",
      "2. My Distortion Tendencies (The traps I notice and release)",
      "3. My Adaptive Strengths (How I turn ambiguity into signal)",
      "4. My Leadership Presence Promise (How I stabilize those around me)",
      "5. My Cultural Imprint (The psychological safety and truth I leave behind)."
    ],
    microDrill: "Generate and save your official RAL Identity Sheet in the app toolkit.",
    journalPrompt: "I am no longer someone who merely 'uses' RAL. I am a Reflective Adaptive Leader."
  }
];

export const INITIAL_GLOBAL_INSIGHTS: GlobalInsightItem[] = [
  {
    id: "gi-book-1",
    title: "Leadership Collapses Internally Before It Collapses Externally",
    summary: "From more than two decades in uniform and boardrooms, RK Vedant observes that leaders are never defeated by external complexity, competition, or tech disruption. They collapse from unprocessed internal congestion, emotional backlog, and cognitive fatigue.",
    category: "From the Book",
    relatedChapter: 1,
    chapterName: "When the Old Self Breaks",
    source: "Reflective Adaptive Leadership (RK Vedant)",
    date: "2026-10-01",
    status: "approved",
    relevanceNote: "Foundational axiom of the entire RAL doctrine. State must always precede strategy.",
    upvotes: 48
  },
  {
    id: "gi-book-2",
    title: "The Four Non-Negotiables of Conscious Leadership",
    summary: "1. State before strategy. 2. Clarity before speed. 3. Awareness before influence. 4. Inner coherence before outer performance. These form the unbending compass when digital noise threatens to fracture attention.",
    category: "From the Book",
    relatedChapter: 6,
    chapterName: "The Reflective Adaptive Turning Point",
    source: "Annexure A & Introduction (RK Vedant)",
    date: "2026-09-28",
    status: "approved",
    relevanceNote: "Directly referenced in Annexure A and matrix calibration protocols.",
    upvotes: 56
  },
  {
    id: "gi-global-1",
    title: "HBR 2025 Study: How Executive Micro-Pauses Cut Decision Rework by 41%",
    summary: "Empirical research across 850 global executives revealed that leaders who institute 10 to 30-second cognitive pauses before finalizing high-velocity decisions exhibit a 41% drop in strategic reversals and significantly higher team psychological safety.",
    category: "Global Practice",
    relatedChapter: 7,
    chapterName: "The Reflective Mind in Daily Leadership",
    source: "Harvard Business Review (Executive Decision Intelligence Series)",
    url: "https://hbr.org",
    date: "2025-12-10",
    status: "approved",
    relevanceNote: "Empirically corroborates RK Vedant's Matrix 2 (LSTM) and the 10-Second Baseline Reset.",
    upvotes: 39
  },
  {
    id: "gi-global-2",
    title: "Nature Neuroscience: Emotional Regulation and Amygdala Decoupling via Slow Exhalations",
    summary: "Physiological studies demonstrate that 4-second slow exhalations stimulate the vagus nerve, down-regulating sympathetic arousal and re-engaging dorsolateral prefrontal cortical networks essential for nuanced moral reasoning.",
    category: "Global Practice",
    relatedChapter: 5,
    chapterName: "When Reaction Breaks Leadership",
    source: "Nature Neuroscience Review",
    url: "https://nature.com/neuro",
    date: "2025-08-22",
    status: "approved",
    relevanceNote: "Provides clinical backing for the RAL 4-2-6 breathing reset and Chapter 5's reflex arc breaker.",
    upvotes: 31
  },
  {
    id: "gi-global-3",
    title: "Stanford Executive AI Survey: Human Accountability in Algorithmic Decision-Making",
    summary: "A survey of 1,200 tech and healthcare leaders confirmed that organizations mandating human cognitive checks on AI recommendations—specifically auditing assumptions and emotional confirmation bias—suffer 72% fewer algorithmic compliance failures.",
    category: "Global Practice",
    relatedChapter: 15,
    chapterName: "The Rise of Measurable Leadership",
    source: "Stanford Institute for Human-Centered AI (HAI)",
    url: "https://hai.stanford.edu",
    date: "2026-02-14",
    status: "approved",
    relevanceNote: "Directly integrates with the AI-supported decision data and Matrix 3 decision governance.",
    upvotes: 44
  },
  {
    id: "gi-pending-1",
    title: "McKinsey Global Institute 2026: The Cost of Silence in Remote Tech Teams",
    summary: "Analysis of 450 hybrid engineering teams found that unresolved emotional tension and lack of psychological safety accounted for $2.4M in annual lost engineering velocity per 100 developers.",
    category: "Global Practice",
    relatedChapter: 12,
    chapterName: "The Reflective Adaptive Team",
    source: "McKinsey Quarterly",
    url: "https://mckinsey.com",
    date: "2026-03-01",
    status: "pending_review",
    relevanceNote: "Awaiting admin confirmation before surfacing to general user coaching feeds.",
    upvotes: 12
  }
];

export const SIMULATION_SCENARIOS = [
  {
    id: 'sim-1',
    title: "The Boardroom Ambush",
    chapterId: 9,
    chapterName: "Leadership Under Pressure",
    roleName: "Vance Sterling (Lead Investor & Board Critic)",
    briefing: "You are presenting the Q3 product roadmap. Five minutes into your presentation, Vance cuts you off sharply: 'This strategy is out of touch with the market. Our competitors are moving twice as fast with generative agents, and your team is burning cash on architecture. Give me three reasons why we shouldn't replace this entire roadmap today.'",
    counterpartPersonality: "Aggressive, skeptical, driven by digital speed, testing whether you buckle or explode.",
    initialMessage: "I've reviewed these slides, and frankly, they are out of touch with reality. Competitors are shipping AI features weekly while your team is wasting time on architectural refactoring. Why shouldn't the board freeze your roadmap right here?"
  },
  {
    id: 'sim-2',
    title: "The Silent Team Mutiny",
    chapterId: 12,
    chapterName: "The Reflective Adaptive Team",
    roleName: "Priya Nair (Principal Architect)",
    briefing: "Your engineering organization has missed two consecutive deployment deadlines. In the retrospective, Priya sits with crossed arms and has spoken only three clipped words. You know that if the architect doesn't believe in the path, the entire team will silently disengage.",
    counterpartPersonality: "Exhausted, guarded, feeling unheard, testing whether you demand compliance or build psychological safety.",
    initialMessage: "Everything is fine. Just tell us what dates management wants on the Jira board and we'll log the overtime."
  },
  {
    id: 'sim-3',
    title: "The Ethical Dilemma: Loyal Colleague vs Corporate Truth",
    chapterId: 10,
    chapterName: "The Quiet Architecture of Ethical Leadership",
    roleName: "Marcus Reed (Close Friend & Head of Sales)",
    briefing: "Marcus, your longtime ally who helped build the company, privately asks you to sign off on an unverified revenue accrual for Q4 so his team can hit their annual milestone. He promises the client contract will formally arrive in January. 'We've been through too much together for you to doubt me on this,' he insists.",
    counterpartPersonality: "Persuasive, leaning on personal loyalty and past camaraderie, testing your moral architecture under social pressure.",
    initialMessage: "Come on, we've known each other for eight years. The verbal agreement is locked in with the client; legal is just slow on the signature. If you approve the milestone today, we hit our targets and nobody gets hurt. Can I count on you to have my back?"
  },
  {
    id: 'sim-4',
    title: "The AI Algorithmic Disruption",
    chapterId: 15,
    chapterName: "The Rise of Measurable Leadership",
    roleName: "Dr. Elena Rostova (VP of Enterprise AI Systems)",
    briefing: "A new machine learning recommendation engine suggests cutting 35% of senior customer support staff, claiming automation will handle ticket volume. The executives want to execute immediately, but you suspect the training data missed key customer nuance and emotional escalation cases.",
    counterpartPersonality: "Data-dogmatic, eager to show instant ROI, dismissive of qualitative human concerns.",
    initialMessage: "The optimization model is conclusive. By phasing out 35 Tier-2 agents, we reduce operational expenses by $2.8M annually with negligible SLA impact. We need your operational sign-off to announce the transition next Tuesday."
  }
];

export const HUMAN_COACHES = [
  {
    id: 'coach-1',
    name: "Col. Sanjeev Rawat (Retd.)",
    title: "Senior Military-to-Civilian & Crisis Leadership Fellow",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    experience: "24 Years Military Command + 8 Years Fortune 500 Executive Coaching",
    specialties: ["Crisis Leadership", "Stress Inoculation", "State Transition (LSTM)"],
    rating: 4.96,
    reviewsCount: 142,
    hourlyRate: 350,
    currency: "USD",
    bio: "Specializes in high-stakes operational environments, helping leaders bridge instinct with reflective clarity when the ground trembles beneath them."
  },
  {
    id: 'coach-2',
    name: "Dr. Alistair Vance, Ph.D.",
    title: "Cognitive Neuroscientist & Executive Leadership Advisor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    experience: "Former Oxford Researcher, Advisor to Silicon Valley Unicorns",
    specialties: ["Digital Noise & Burnout", "Prefrontal Recovery", "Decision Governance"],
    rating: 4.98,
    reviewsCount: 215,
    hourlyRate: 420,
    currency: "USD",
    bio: "Translates brain plasticity and the 4 RAL matrices into measurable executive decision hygiene for fast-moving technology leaders."
  },
  {
    id: 'coach-3',
    name: "Meera Subramanian",
    title: "Organizational Culture & Psychological Safety Consultant",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    experience: "18 Years Global CHRO & Executive Transformation Coach",
    specialties: ["Adaptive Culture Lattice (ACL)", "Team Coherence", "Ethical Leadership"],
    rating: 4.95,
    reviewsCount: 189,
    hourlyRate: 320,
    currency: "USD",
    bio: "Helps senior teams diagnose hidden emotional fractures, eliminate defensive silence, and engineer high-trust collective intelligence."
  }
];
