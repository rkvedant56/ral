import { SectorType, UserProfile, CustomOrgQuestion } from '../types';
import { DiagnosticQuestion } from '../data/ralFramework';

// Sector specific contextual modifiers
const SECTOR_THEMES: Record<SectorType, {
  label: string;
  contextPill: string;
  stakes: string[];
}> = {
  startup: {
    label: "High-Growth Startup & Scaleup",
    contextPill: "Runway & Velocity Dynamics",
    stakes: [
      "under rapid cash runway pressure",
      "during contentious co-founder roadmap disagreements",
      "when key engineering or sales talent suddenly resigns",
      "facing investor term-sheet negotiations and valuation scrutiny",
      "when product release bugs threaten market momentum",
      "under intense board pressure to sacrifice quality for hyper-growth",
      "during sprint planning when context-switching across 10 priorities",
      "when deciding whether to execute a major business model pivot",
      "in critical customer escalation meetings after system downtime",
      "when experiencing the intense personal dread of payroll solvency"
    ]
  },
  military_civilian: {
    label: "Military-to-Civilian & Transition",
    contextPill: "Command-to-Consensus Shift",
    stakes: [
      "translating operational command discipline to matrixed civilian ambiguity",
      "when corporate stakeholders mistake direct clarity for personal aggression",
      "navigating flat organizational cultures lacking clear hierarchy",
      "when peer managers hesitate to act without prolonged consensus committee meetings",
      "interpreting complex corporate politics through a dispassionate lens",
      "calibrating internal composure when civilian operational pace feels sluggish",
      "de-escalating internal arousal during unnecessary bureaucratic gridlock",
      "shifting from authoritative directive posture to persuasive storytelling",
      "deciding on moral integrity when corporate pressure urges convenient shortcuts",
      "building trust and brotherhood without relying on formal military rank"
    ]
  },
  corporate: {
    label: "Corporate Executive & Enterprise",
    contextPill: "Matrix Politics & Scale Coherence",
    stakes: [
      "during high-stakes boardroom budget allocations",
      "when navigating cross-functional silo turf wars and competing executive egos",
      "under acute quarterly analyst pressure to hit short-term profit margins",
      "when evaluating whether consensus represents genuine agreement or polite groupthink",
      "facing enterprise reorganization or unexpected executive restructuring",
      "when peer senior leaders attempt to shift blame for delayed delivery",
      "handling defensive impulses during annual performance and strategy reviews",
      "detecting passive-aggressive resistance in matrixed departmental stakeholders",
      "defending long-term R&D investments against short-term cost cuts",
      "establishing enterprise psychological safety across globally dispersed teams"
    ]
  },
  public_sector: {
    label: "Public Sector, Policy & Civil Service",
    contextPill: "Bureaucracy, Politics & Public Trust",
    stakes: [
      "under aggressive legislative committee scrutiny and media attention",
      "when navigating stubborn bureaucratic inertia and statutory compliance mandates",
      "during multi-agency jurisdictional standoffs over emergency response",
      "when political administrations change and strategic programs are abruptly canceled",
      "distinguishing genuine public interest from vocal lobbying campaigns",
      "resisting cynical resignation within massive civil service institutions",
      "upholding non-partisan integrity against political appointee pressure",
      "making equitable resource allocation decisions for vulnerable citizen groups",
      "protecting principled civil servants who speak truth to institutional power",
      "restoring public faith through uncompromised ethical transparency"
    ]
  },
  education: {
    label: "Education & Academic Governance",
    contextPill: "Faculty Governance & Student Welfare",
    stakes: [
      "navigating contentious faculty senate debates over curriculum and tenure",
      "when student activism and polarized campus discourse generate institutional tension",
      "under acute institutional endowment cuts and demographic enrollment drops",
      "balancing traditional academic rigor with evolving student mental health needs",
      "assessing whether departmental pushback stems from scholarly merit or territorialism",
      "re-centering internal balance when alumni or donors threaten withdrawal",
      "protecting academic freedom against external political interference",
      "allocating research endowments strictly to safeguard scholarly discovery",
      "fostering deep faculty psychological safety to explore unconventional hypotheses",
      "unifying fragmented academic departments into a vibrant intellectual community"
    ]
  },
  personal: {
    label: "Personal Mastery & Life Leadership",
    contextPill: "Family, Relationships & Self-Sovereignty",
    stakes: [
      "in moments of heated emotional friction with partners, children, or family members",
      "when financial volatility or unexpected health emergencies threaten domestic peace",
      "noticing when chronic fatigue impairs emotional patience with loved ones",
      "recognizing internal shame, perfectionism, and self-critical dialogue in real time",
      "distinguishing healthy personal boundaries from fear-based emotional withdrawal",
      "executing a deliberate physiological pause before reacting harshly at home",
      "transitioning from guilt-ridden procrastination into purposeful micro-action",
      "saying clean, guilt-free 'no' to social demands that deplete personal energy",
      "forgiving past betrayals without compromising future personal safety",
      "radiating grounded warmth that creates emotional sanctuary for loved ones"
    ]
  }
};

// 50 Questions per Matrix = 200 validated items in the deep pool
const RAAG_STEMS = [
  "I immediately recognize when my internal state shifts from reflective clarity into reactive rigidity.",
  "I cleanly differentiate between objective observable facts and my ego's defensive story.",
  "I notice somatic stress signals (tight chest, rapid breath, clenched jaw) before they distort my words.",
  "I catch myself when I am reacting merely to prove myself right rather than uncovering what is true.",
  "I recognize when I mistake frantic speed for genuine strategic clarity.",
  "I actively investigate what unspoken assumptions or biases I might be protecting.",
  "I detect whether my listening is defensive (preparing a rebuttal) or generative (seeking understanding).",
  "I accurately map my location on the awareness grid (from Collapse to Peak Adaptive Flow).",
  "I recognize how my own emotional climate is coloring my perception of team competence.",
  "In moments of ambiguity, I maintain perceptual stillness rather than grasping at premature conclusions.",
  "I notice when pride or fear of looking foolish prevents me from saying 'I do not know'.",
  "I distinguish between genuine external threat and internal catastrophic imagination.",
  "I observe my immediate emotional impulse before deciding whether to act on it.",
  "I remain aware of the subtle urge to control people or outcomes when feeling vulnerable.",
  "I can articulate what is actually happening in the room without editorial embellishment.",
  "I identify when old personal triggers are being activated by current workplace dynamics.",
  "I track how my presence influences the room's tension level as soon as I enter a meeting.",
  "I catch myself rationalizing shortcuts or ethical compromises before I execute them.",
  "I notice when fatigue is eroding my capacity for nuanced thinking.",
  "I recognize when I am projecting past disappointments onto new team members.",
  "I identify when my desire to be liked is compromising honest, needed feedback.",
  "I notice the onset of cognitive tunnel vision when under acute deadlines.",
  "I can step back internally to observe myself as an impartial witness during heated debates.",
  "I recognize when cynicism is masquerading as realistic pragmatism.",
  "I notice when I am hoarding information to protect personal indispensability.",
  "I detect subtle resentment before it expresses itself as passive aggression.",
  "I recognize when excessive optimism is blinding me to critical operational vulnerabilities.",
  "I remain aware of the emotional tone of my voice during high-stakes presentations.",
  "I identify when my sense of self-worth is overly tethered to short-term project outcomes.",
  "I catch myself dismissing counter-evidence that contradicts my favored hypothesis.",
  "I notice when I am speaking to fill anxious silence rather than add genuine value.",
  "I recognize the physical sensation of defensiveness before verbalizing an excuse.",
  "I differentiate between authentic intuition and fear-based hesitation.",
  "I perceive when team consensus is merely polite compliance masking hidden dissent.",
  "I catch myself holding lingering grievances that cloud future collaboration.",
  "I notice when I am rushing decisions simply to relieve my personal discomfort with uncertainty.",
  "I identify when my focus has drifted from the collective mission to personal reputation.",
  "I recognize when I am over-functioning to compensate for others' lack of accountability.",
  "I observe how my energy ebbs and flows throughout demanding operational cycles.",
  "I notice when intellectual analysis is being used to bypass authentic emotional reality.",
  "I detect when I am judging others by their actions while judging myself by my intentions.",
  "I remain aware of how power dynamics alter the candidness of information shared with me.",
  "I recognize when I am reacting to the tone of a message rather than its essential substance.",
  "I catch myself catastrophizing when faced with unexpected systemic disruptions.",
  "I notice when I am numbing or distracting myself to avoid confronting painful organizational truths.",
  "I identify when competition with peers is undermining collective enterprise goals.",
  "I recognize the subtle shift from curious exploration to rigid dogma.",
  "I perceive the unspoken emotional undercurrents operating beneath meeting agendas.",
  "I notice when my standards of excellence have quietly degenerated into punitive perfectionism.",
  "I maintain an unbroken thread of inner mindfulness even amidst operational turbulence."
];

const LSTM_STEMS = [
  "When caught off-guard, I execute a deliberate 10-second physiological pause to prevent reactive hijack.",
  "In the midst of sudden crisis, I deliberately regulate my breathing (4-2-6 cadence) to restore calm.",
  "When emotional reactivity spikes, I voluntarily shift out of defense into curious presence in <90 seconds.",
  "Under acute pressure, I break catastrophic default narratives and generate three empowering reframes.",
  "Before engaging in contentious dialogues, I calibrate my inner state to ensure I speak from stillness.",
  "When plans suddenly collapse, I release emotional resistance quickly and orient toward adaptation.",
  "If I notice myself becoming harsh, I have the humility to halt the exchange and reset my baseline.",
  "During prolonged exhaustion, I practice deliberate boundary re-anchoring to preserve reflective clarity.",
  "When receiving sharp criticism, I transition out of rationalization into grateful inquiry.",
  "I consistently demonstrate the mastery to choose my response rather than obey conditioned impulses.",
  "I can interrupt a spiral of anxiety by grounding my attention in immediate physical sensory reality.",
  "I voluntarily soften my physical posture and jaw when entering tense negotiation environments.",
  "When tempted to send an angry message, I enforce an unconditional 2-hour reflective delay.",
  "I shift from blame to curiosity by asking: 'What is this situation teaching me about our system?'",
  "I can recalibrate my nervous system between consecutive meetings without carrying emotional residue.",
  "When feeling overwhelmed, I step outside or look at the horizon to reset visual and cognitive scope.",
  "I transmute anger into fierce, protective commitment to ethical standards and team safety.",
  "I release the compulsive urge to have the final word in disagreements.",
  "When stuck in mental loops, I use pen and paper to externalize and dissolve cognitive bottlenecks.",
  "I shift my focus from 'What could go wrong?' to 'What is the most elegant adaptive step right now?'",
  "I intentionally lower my vocal pitch and slow my speech cadence when team anxiety begins to spike.",
  "I can forgive an operational blunder rapidly so the team can focus on repair and recovery.",
  "When feeling paralyzed by options, I identify the single two-way reversible experiment to unlock motion.",
  "I deliberately let go of grudges through conscious somatic release and radical acceptance.",
  "I transition from victim mindset to total ownership within moments of an unexpected setback.",
  "I replace panic-driven multi-tasking with single-pointed, surgical focus on the critical priority.",
  "When faced with disrespect, I remain anchored in self-sovereign dignity without counter-attacking.",
  "I can shift from analytical rigor to empathetic heart-centered listening at will.",
  "I deliberately disrupt group panic by introducing calm, structured reflective questions.",
  "When my ego feels bruised, I soothe myself internally rather than seeking external validation.",
  "I can step back from the operational weeds to re-engage with 10,000-foot strategic perspective.",
  "I reset feelings of imposter syndrome by anchoring in objective track record and servant mission.",
  "When facing relentless demands, I protect micro-moments of silence throughout the working day.",
  "I dissolve frustration with slow progress by celebrating micro-wins and iterative momentum.",
  "I can transition from an introverted state of reflection into high-voltage inspirational leadership.",
  "I disarm passive resistance in others through genuine warmth, transparency, and calm directness.",
  "When an initiative fails, I facilitate a blameless post-mortem that extracts wisdom without shame.",
  "I shift from self-preservation to collective service whenever team distress is palpable.",
  "I can consciously interrupt catastrophic rumination before going to sleep.",
  "When a team member is panicking, my physiological steadiness acts as an emotional anchor.",
  "I step away from screens and devices when my cognitive bandwidth reaches saturation.",
  "I shift from transactional urgency to relational investment during critical 1-on-1 conversations.",
  "I can drop defensive pride instantly when new facts reveal that my recommendation was incorrect.",
  "I transform feelings of loneliness in leadership into deep solidarity with all who carry responsibility.",
  "I recalibrate my state following bitter disappointment so it does not infect the next meeting.",
  "I practice intentional gratitude for difficult adversaries who serve as crucibles for my growth.",
  "I can access quiet inner stillness even while sitting in noisy, contentious environments.",
  "I deliberately suspend judgment during the first 10 minutes of hearing unconventional ideas.",
  "I transition out of work mode fully when crossing the threshold into my personal life.",
  "My state transition ability is so practiced that team members feel an immediate calming presence around me."
];

const ADG_STEMS = [
  "When pressured to make rushed choices, I anchor every commitment in non-negotiable core values.",
  "In complex dilemmas, I refuse to sacrifice long-term systemic health for convenient short-term victories.",
  "When external stakeholders demand compliance, I hold the line on ethics with moral courage.",
  "I clearly distinguish reversible tactical decisions from irreversible architectural commitments.",
  "When hard trade-offs must be made, I communicate the rationale with radical transparency and respect.",
  "I actively invite and protect dissenting viewpoints before finalizing pivotal choices.",
  "My choices are grounded in empirical reality rather than wishful thinking, ego, or sunk costs.",
  "When an existing strategy proves flawed, I pivot without defensiveness or scapegoating.",
  "I make decisions from the expansive vantage point of future stewardship rather than survival panic.",
  "Every significant decree I execute aligns with both rigorous analytical reason and inner coherence.",
  "I refuse to defer difficult personnel terminations out of personal discomfort or avoidance.",
  "I resist the temptation to make cosmetic policy changes that leave root causes unaddressed.",
  "I allocate budget and resources strictly based on verified impact rather than internal politics.",
  "When facing incomplete data, I act with courageous decisiveness while remaining open to iteration.",
  "I decline lucrative opportunities that would dilute our core mission or compromise organizational values.",
  "I evaluate decisions through the lens of those who have the least power in the organization.",
  "I ensure ethical boundaries are non-negotiable even when competitors take shortcuts.",
  "I balance algorithmic AI recommendations with human judgment, moral intuition, and lived context.",
  "I resist the pressure of vanity metrics that look impressive externally but measure nothing meaningful.",
  "I make decisions that increase the organization's long-term optionality rather than lock it in.",
  "I hold partners and vendors to the same rigorous ethical standards that govern our internal team.",
  "I openly share the uncertainties and assumptions embedded within my strategic decisions.",
  "I refrain from committing resources to projects whose underlying logic cannot be explained simply.",
  "I decouple decision-making from personal vanity and the desire to leave a personal monument.",
  "When regulatory or compliance gray areas arise, I consistently choose the path of highest integrity.",
  "I establish clear decision rights so team members know exactly where their autonomy begins and ends.",
  "I reject compromises that solve today's crisis by mortgaging tomorrow's organizational health.",
  "I make time for second-order thinking, asking: 'And then what happens three years from now?'",
  "I do not allow loud, aggressive voices to dominate quieter, deeper analytical perspectives.",
  "I am willing to make unpopular decisions when collective longevity demands it.",
  "I design decision architectures that minimize cognitive bias, anchoring, and confirmation traps.",
  "I ensure team members who speak uncomfortable truths are rewarded rather than marginalized.",
  "I make choices that distribute ownership and agency rather than concentrate power at the top.",
  "I ruthlessly cut zombie initiatives that consume resources without advancing strategic goals.",
  "When crisis strikes, I establish clear priorities (safety, continuity, ethics) and stick to them.",
  "I audit past decisions systematically to learn whether good outcomes resulted from skill or luck.",
  "I prevent team fatigue by pacing strategic initiatives sustainably rather than running perpetual sprints.",
  "I protect capital reserves during prosperity so the organization can lead during downturns.",
  "I refuse to sign off on misleading marketing narratives or over-hyped product claims.",
  "I anchor major strategic bets in authentic human needs rather than transient industry fads.",
  "I align executive compensation with long-term culture health and sustainable value creation.",
  "I ensure that ethical guidelines are living operating principles rather than buried legal disclaimers.",
  "I decide with velocity on low-risk decisions to preserve cognitive energy for high-stakes crossroads.",
  "I actively seek input from frontline workers who directly experience the friction of current policies.",
  "I make room for experimentation and failure in non-critical domains to foster genuine innovation.",
  "I maintain equanimity whether a decision produces immediate acclaim or temporary public criticism.",
  "I never use company resources for personal prestige, comfort, or aggrandizement.",
  "I build cross-functional consensus without allowing decisions to be watered down into mediocrity.",
  "I make decisions with sufficient clarity that any team member can articulate why we chose this path.",
  "My decisions leave behind a legacy of integrity, wisdom, and institutional resilience."
];

const ACL_STEMS = [
  "My daily demeanor and non-verbal presence consistently transmit calm, grounded confidence to those around me.",
  "I intentionally create psychological safety where team members surface critical failures without fear.",
  "There is complete congruence between what I profess as leadership values and what people observe in daily action.",
  "When mistakes or setbacks occur, I focus on systemic learning and root causes rather than punitive blame.",
  "I do not allow personal anxieties to become emotional pollution that infects team culture.",
  "I empower others with genuine autonomy and trust rather than hovering with covert micromanagement.",
  "In moments of shared victory, I deflect credit to the team; in moments of setback, I step forward to take accountability.",
  "I cultivate authentic human connections where colleagues feel deeply seen, respected, and valued.",
  "I actively mentor and elevate emerging leaders, creating leadership capacity that outlasts my tenure.",
  "My leadership presence leaves the people and culture measurably more coherent, courageous, and adaptive.",
  "I address toxic behavior swiftly and compassionately before it corrupts collective team trust.",
  "I listen with such total presence that team members leave conversations feeling genuinely understood.",
  "I model healthy rest and boundaries so the team feels permission to unplug without guilt.",
  "I break down tribal departmental rivalries by fostering cross-functional empathy and shared goals.",
  "I welcome direct challenges to my own thinking with warm encouragement and curiosity.",
  "I protect direct reports from executive political crossfire and organizational chaos.",
  "I communicate difficult organizational news with total honesty, dignity, and compassion.",
  "I celebrate the quiet, behind-the-scenes contributors whose diligence keeps the enterprise running.",
  "I ensure that performance reviews evaluate cultural contribution and ethics alongside numerical output.",
  "I design team rituals that build genuine community rather than forced corporate camaraderie.",
  "I apologize sincerely and publicly when my words or actions fall short of our standards.",
  "I cultivate an environment where diverse perspectives and cognitive styles are actively sought out.",
  "I refuse to participate in office gossip or permit backchannel character assassination.",
  "I create space in team gatherings to celebrate personal milestones, grief, and shared humanity.",
  "I coach team members through their own blind spots with patient, unwavering belief in their potential.",
  "I ensure the team's operational rhythm allows for deep reflective work alongside execution.",
  "I maintain an open-door policy of authentic emotional accessibility rather than aloof detachment.",
  "I challenge team members to stretch beyond their self-imposed limitations while providing unwavering support.",
  "I ensure that psychological safety is not mistaken for low standards; high trust drives high excellence.",
  "I handle interpersonal conflict between peers by facilitating direct, courageous dialogue.",
  "I build a culture of peer-to-peer appreciation that operates without executive prompting.",
  "I insulate the team from knee-jerk executive reactions, translating noise into calm clarity.",
  "I ensure junior employees are heard in high-level meetings where their insights matter.",
  "I inspire others through passionate commitment to our noble purpose rather than through fear.",
  "I reward team members who catch systemic errors before they reach customers or the public.",
  "I model vulnerable self-awareness, showing that executive authority does not require infallibility.",
  "I promote leaders based on emotional maturity and character, not merely individual technical heroics.",
  "I cultivate shared rituals of celebration that genuinely energize the collective spirit.",
  "I protect team time and attention from useless meetings and bureaucratic overhead.",
  "I foster an atmosphere where laughter, joy, and serious dedication coexist naturally.",
  "I teach and transmit the principles of Reflective Adaptive Leadership throughout the organization.",
  "I ensure that remote and hybrid team members feel equally integrated, valued, and visible.",
  "I maintain deep loyalty to team members during their personal hardships and family crises.",
  "I cultivate resilience that enables the team to absorb severe industry shocks without fracture.",
  "I demystify leadership so that every person feels empowered to act as a leader in their domain.",
  "I dismantle the illusion that leadership requires stoic emotional numbness or aggressive bravado.",
  "I facilitate collective reflective pauses before major team milestones and transitions.",
  "I leave every team and department I touch with higher trust, clearer purpose, and stronger cohesion.",
  "I treat every human being in the organization with the same fundamental dignity, regardless of rank.",
  "The cultural resonance of my leadership endures as a positive force long after I have moved on."
];

export interface FullQuestionPool {
  raag: DiagnosticQuestion[];
  lstm: DiagnosticQuestion[];
  adg: DiagnosticQuestion[];
  acl: DiagnosticQuestion[];
}

/**
 * Builds the full 200-question pool (50 questions per matrix)
 * tailored with user sector stakes.
 */
export function buildFull200QuestionPool(user: UserProfile): FullQuestionPool {
  const sector = user.sector || 'corporate';
  const theme = SECTOR_THEMES[sector] || SECTOR_THEMES.corporate;
  const role = user.title || 'Leader';
  const stage = user.lifeStage || 'professionals';
  const region = user.culturalRegion || 'india';

  // Life-stage contextual stem overrides
  const getStagePrefix = (idx: number): string => {
    if (stage === 'kids') {
      const kidPrefixes = [
        "When playing with friends or doing schoolwork",
        "If I get upset because things don't go my way",
        "When a classmate or friend has something I want",
        "Before I say something out loud when I'm angry",
        "When I make a mistake on a puzzle or game"
      ];
      return kidPrefixes[idx % kidPrefixes.length];
    }
    if (stage === 'teenagers') {
      const teenPrefixes = [
        "When studying for high-stakes exams or tests",
        "In group chats when heated arguments or drama break out",
        "When feeling judged or pressured by peers",
        "When doom-scrolling or dealing with social media overload",
        "When deciding whether to speak up against popular opinion"
      ];
      return teenPrefixes[idx % teenPrefixes.length];
    }
    if (stage === 'students') {
      const studentPrefixes = [
        "During stressful semester project deadlines",
        "In job interviews and campus placement screenings",
        "When working in challenging cross-discipline group projects",
        "When battling academic impostor syndrome or self-doubt",
        "When balancing heavy coursework with career preparation"
      ];
      return studentPrefixes[idx % studentPrefixes.length];
    }
    if (stage === 'seniors') {
      const seniorPrefixes = [
        "In intergenerational family discussions and mentoring",
        "When navigating differing modern cultural values with younger generations",
        "During moments of quiet reflection and life retrospection",
        "When offering counsel to loved ones without imposing control",
        "When cultivating daily equanimity and physical acceptance"
      ];
      return seniorPrefixes[idx % seniorPrefixes.length];
    }
    if (stage === 'teams') {
      const teamPrefixes = [
        "In cross-functional executive delivery reviews",
        "When resolving inter-departmental silo standoffs",
        "During high-uncertainty organizational strategy shifts",
        "When evaluating team psychological safety vs polite silence",
        "When ensuring collective ownership without blaming individuals"
      ];
      return teamPrefixes[idx % teamPrefixes.length];
    }
    const stake = theme.stakes[idx % theme.stakes.length];
    return `As a ${role} ${stake}`;
  };

  const getCulturalNuance = (idx: number): string => {
    if (region === 'india') {
      const nuances = [
        " (balancing respect for senior wisdom with truthful conviction)",
        " (protecting relational harmony while upholding rigorous clarity)",
        " (ensuring family and community values remain centered)",
        " (navigating hierarchical expectations with quiet moral courage)"
      ];
      return nuances[idx % nuances.length];
    }
    if (region === 'europe') {
      const nuances = [
        " (valuing consensus-driven governance and structured deliberation)",
        " (ensuring egalitarian contribution across all team members)",
        " (separating objective structural data from emotional friction)"
      ];
      return nuances[idx % nuances.length];
    }
    if (region === 'americas') {
      const nuances = [
        " (maintaining decisiveness and personal accountability under rapid velocity)",
        " (fostering entrepreneurial autonomy while keeping strategic alignment)"
      ];
      return nuances[idx % nuances.length];
    }
    if (region === 'east_asia') {
      const nuances = [
        " (safeguarding collective unity and graceful face preservation)",
        " (offering indirect, constructive insight with respectful poise)"
      ];
      return nuances[idx % nuances.length];
    }
    return "";
  };

  const makeQuestions = (
    key: 'RAAG' | 'LSTM' | 'ADG' | 'ACL',
    name: string,
    stems: string[],
    startId: number
  ): DiagnosticQuestion[] => {
    return stems.map((stem, idx) => {
      const prefix = getStagePrefix(idx);
      const nuance = getCulturalNuance(idx);
      const text = `${prefix}, ${stem.charAt(0).toLowerCase() + stem.slice(1)}${nuance}`;
      return {
        id: startId + idx,
        sectionKey: key,
        sectionName: name,
        questionNumber: idx + 1,
        text
      };
    });
  };

  return {
    raag: makeQuestions('RAAG', 'Reflective–Adaptive Awareness Grid (RAAG)', RAAG_STEMS, 1),
    lstm: makeQuestions('LSTM', 'Leadership State Transition Map (LSTM)', LSTM_STEMS, 51),
    adg: makeQuestions('ADG', 'Adaptive Decisional Grid (ADG)', ADG_STEMS, 101),
    acl: makeQuestions('ACL', 'Action-Coherence Lattice (ACL)', ACL_STEMS, 151)
  };
}

/**
 * Selects an individualized 10 to 12 question sample from the 200-question bank
 * and appends any active custom organization questions (hybrid compliance, AI governance, etc.).
 *
 * Each session dynamically samples 2-3 questions per matrix + custom org questions,
 * resulting in an optimized 10-12 question assessment that takes only ~3 minutes.
 */
export function selectPersonalizedTestSample(
  user: UserProfile,
  customOrgQuestions: CustomOrgQuestion[] = [],
  sampleSize: number = 12
): DiagnosticQuestion[] {
  const pool = buildFull200QuestionPool(user);

  // Derive stable or session-based pseudorandom seed based on user info & current date
  const seedString = `${user.name}-${user.sector}-${user.experienceYears}-${new Date().toISOString().slice(0, 10)}`;
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash << 5) - hash + seedString.charCodeAt(i);
    hash |= 0;
  }
  const randomWithOffset = (offset: number) => {
    const x = Math.sin(hash + offset) * 10000;
    return x - Math.floor(x);
  };

  // Determine how many slots for standard matrices vs custom org questions
  const activeCustom = customOrgQuestions.slice(0, Math.min(customOrgQuestions.length, 3));
  const remainingSlots = Math.max(8, sampleSize - activeCustom.length);
  const perMatrix = Math.floor(remainingSlots / 4); // usually 2 or 3 per matrix

  const sampleFromList = (list: DiagnosticQuestion[], count: number, offsetSeed: number) => {
    const indices: number[] = [];
    while (indices.length < count && indices.length < list.length) {
      const idx = Math.floor(randomWithOffset(offsetSeed + indices.length * 7) * list.length);
      if (!indices.includes(idx)) {
        indices.push(idx);
      }
    }
    return indices.map(i => list[i]);
  };

  const selectedRAAG = sampleFromList(pool.raag, perMatrix, 10);
  const selectedLSTM = sampleFromList(pool.lstm, perMatrix, 20);
  const selectedADG = sampleFromList(pool.adg, perMatrix, 30);
  const selectedACL = sampleFromList(pool.acl, perMatrix, 40);

  // If there's extra room to reach target sampleSize, pick from user's weakest or primary focus
  const sampledList: DiagnosticQuestion[] = [
    ...selectedRAAG,
    ...selectedLSTM,
    ...selectedADG,
    ...selectedACL
  ];

  // Convert custom org questions into DiagnosticQuestion objects mapped to ACL/ADG
  activeCustom.forEach((cq, idx) => {
    sampledList.push({
      id: 900 + idx,
      sectionKey: cq.category === 'ai_governance' || cq.category === 'ethical_oversight' ? 'ADG' : 'ACL',
      sectionName: `Enterprise Custom: ${cq.customCategoryLabel || cq.category.replace('_', ' ').toUpperCase()}`,
      questionNumber: sampledList.length + 1,
      text: `[${cq.orgTag.toUpperCase()}] ${cq.text}`
    });
  });

  // Re-number 1 to N for clean UI presentation
  return sampledList.slice(0, 12).map((q, idx) => ({
    ...q,
    questionNumber: idx + 1
  }));
}

/**
 * Computes calibrated diagnostic scores from the 10-12 answered sample.
 * Normalizes scores to the standard 10-50 matrix scale and 40-200 composite scale.
 */
export function calculateNormalizedDiagnosticScores(
  questions: DiagnosticQuestion[],
  answers: Record<number, number>
) {
  const matrixTotals: Record<'RAAG' | 'LSTM' | 'ADG' | 'ACL', { sum: number; count: number }> = {
    RAAG: { sum: 0, count: 0 },
    LSTM: { sum: 0, count: 0 },
    ADG: { sum: 0, count: 0 },
    ACL: { sum: 0, count: 0 }
  };

  questions.forEach(q => {
    const val = answers[q.id] || 3;
    const key = (['RAAG', 'LSTM', 'ADG', 'ACL'].includes(q.sectionKey) ? q.sectionKey : 'ACL') as 'RAAG' | 'LSTM' | 'ADG' | 'ACL';
    matrixTotals[key].sum += val;
    matrixTotals[key].count += 1;
  });

  // Convert average (1-5) to calibrated matrix score (10-50)
  const calcMatrixScore = (key: 'RAAG' | 'LSTM' | 'ADG' | 'ACL') => {
    const item = matrixTotals[key];
    if (item.count === 0) return 30; // neutral baseline
    const avg = item.sum / item.count;
    // Scale 1-5 to 10-50
    return Math.round(avg * 10);
  };

  const raag = calcMatrixScore('RAAG');
  const lstm = calcMatrixScore('LSTM');
  const adg = calcMatrixScore('ADG');
  const acl = calcMatrixScore('ACL');
  const composite = raag + lstm + adg + acl;

  let band = "Emerging Adaptive Leader";
  if (composite >= 160) band = "Reflective Adaptive Leader";
  else if (composite >= 120) band = "Emerging Adaptive Leader";
  else if (composite >= 80) band = "Reactive–Reflective Leader";
  else band = "At-Risk Leadership Pattern";

  const scoresMap = { RAAG: raag, LSTM: lstm, ADG: adg, ACL: acl };
  const weakestMatrix = (Object.keys(scoresMap) as Array<'RAAG' | 'LSTM' | 'ADG' | 'ACL'>).reduce((a, b) =>
    scoresMap[a] < scoresMap[b] ? a : b
  );

  return {
    raag,
    lstm,
    adg,
    acl,
    composite,
    band,
    weakestMatrix
  };
}
