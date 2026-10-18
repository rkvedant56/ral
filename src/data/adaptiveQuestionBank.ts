import { AdaptiveQuestion, RalPhase, ReflectiveSentiment, UserProfile, DiagnosticResult } from '../types';
import { getIsoWeekNumber } from './scholarlyRepository';

/**
 * Question Bank of 130 calibrated questions covering all RAL phases:
 * Pause, Pursue, Reframe, Decouple, and Team Coherence.
 */
export const ADAPTIVE_QUESTION_BANK: AdaptiveQuestion[] = [
  // =========================================================================
  // 1. PAUSE (State before Strategy, Autonomic Calming, Somatic Awareness)
  // =========================================================================
  {
    id: 'aq-p01',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'When a critical operational crisis erupts, how consistently do you observe a mandatory 10-second silent breathing pause before issuing any directive?',
    subtext: 'Evaluates your ability to decouple acute fight-or-flight sympathetic arousal from strategic verbal command.',
    targetRole: ['c_suite', 'vp_director', 'military_ops', 'all'],
    developmentalStage: ['senior_executive', 'all'],
    targetedSentiments: ['agitated', 'overwhelmed'],
    difficulty: 'foundational',
    rationale: 'Suppresses initial amygdala hijack, allowing prefrontal cortical networks to regain executive control.',
    reflectionPrompt: 'Recall the last time you reacted within 2 seconds of receiving bad news. What did that reaction cost your team?',
    microDrill: 'Take 3 deep box breaths (4s inhale, 4s hold, 4s exhale, 4s hold) before opening your inbox.'
  },
  {
    id: 'aq-p02',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'How frequently do you audit your physical body (jaw clenching, shallow breathing, shoulder tension) during high-stakes board or stakeholder briefings?',
    subtext: 'Tests visceral interoceptive awareness as an early-warning signal of cognitive narrowing.',
    targetRole: ['c_suite', 'vp_director', 'founder', 'all'],
    developmentalStage: ['mid_career', 'senior_executive', 'all'],
    targetedSentiments: ['overwhelmed', 'agitated'],
    difficulty: 'intermediate',
    rationale: 'Interoception alerts leaders to subconscious threat detection up to 800ms before conscious logical articulation.',
    reflectionPrompt: 'Where does acute stress physically reside in your anatomy, and how does that physical contraction alter your vocal tone?',
    microDrill: 'Unclench your jaw, drop your shoulders 2 inches, and plant both feet flat on the floor right now.'
  },
  {
    id: 'aq-p03',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'Do you protect an uncompromised 90-minute morning contemplative block free from email notifications, Slack pings, and emergency fire drills?',
    subtext: 'Measures structural defense of high-leverage reflective bandwidth against organizational urgency addiction.',
    targetRole: ['c_suite', 'founder', 'vp_director', 'all'],
    developmentalStage: ['senior_executive', 'all'],
    targetedSentiments: ['depleted', 'overwhelmed'],
    difficulty: 'advanced',
    rationale: 'Uninterrupted deep work preserves working memory capacity and prevents executive decision fatigue before noon.',
    reflectionPrompt: 'What manufactured crisis would collapse if you did not check messages before 9:30 AM tomorrow?',
    microDrill: 'Place your phone in a separate room or drawer for the first 60 minutes of tomorrow morning.'
  },
  {
    id: 'aq-p04',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'When receiving hostile or unfair personal criticism from a peer or superior, can you withhold defense for a full 24 hours before crafting a response?',
    subtext: 'Gauges self-regulatory capacity and resilience against the impulsive urge to counter-attack.',
    targetRole: ['vp_director', 'team_lead', 'founder', 'all'],
    developmentalStage: ['emerging', 'mid_career', 'all'],
    targetedSentiments: ['agitated', 'reflective'],
    difficulty: 'advanced',
    rationale: 'Enforces temporal latency so that neurochemical cortisol spikes clear before strategic diplomacy is drafted.',
    reflectionPrompt: 'What would happen if you treated hostile criticism as an interesting piece of ethnographic data rather than a personal assault?',
    microDrill: 'Draft your angry counter-response in a local scratchpad, then delete it without sending.'
  },
  {
    id: 'aq-p05',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'How deliberately do you slow down your speaking tempo and lower your vocal pitch when the room enters high-arousal panic?',
    subtext: 'Assesses the intentional use of vocal and behavioral pacing as an autonomic anchor for the team.',
    targetRole: ['military_ops', 'c_suite', 'team_lead', 'all'],
    developmentalStage: ['senior_executive', 'mid_career', 'all'],
    targetedSentiments: ['agitated', 'centered'],
    difficulty: 'intermediate',
    rationale: 'Subconscious vocal mimicry spreads calm across mirror neurons, stabilizing collective group focus.',
    reflectionPrompt: 'Does your voice speed up when danger approaches, or does it become an unshakeable bedrock for others?',
    microDrill: 'Practice speaking your next sentence at 70% of your normal speed, pausing 1 full second between thoughts.'
  },
  {
    id: 'aq-p06',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'Do you schedule deliberate 2-to-5 minute somatic resets between back-to-back operational video meetings rather than stacking calendar slots?',
    subtext: 'Checks attention residue management and the prevention of cumulative cognitive contamination.',
    targetRole: ['all'],
    developmentalStage: ['all'],
    targetedSentiments: ['depleted', 'overwhelmed'],
    difficulty: 'foundational',
    rationale: 'Prevents task-switching attention residue from accumulating across consecutive video conferences.',
    reflectionPrompt: 'How much of your previous meeting\'s emotional turbulence are you currently carrying into the next one?',
    microDrill: 'Shorten your standard 30-minute meetings to 25 minutes and 60-minute meetings to 50 minutes.'
  },
  {
    id: 'aq-p07',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'Can you sit in total stillness for 5 continuous minutes without reaching for your phone, fidgeting, or planning tomorrow’s agenda?',
    subtext: 'Evaluates baseline tolerance for boredom and internal neural quietude.',
    targetRole: ['all'],
    developmentalStage: ['all'],
    targetedSentiments: ['depleted', 'reflective'],
    difficulty: 'foundational',
    rationale: 'Re-sensitizes dopamine pathways and strengthens top-down prefrontal inhibitory control.',
    reflectionPrompt: 'What uncomfortable sensation arises within you when external digital stimulation ceases?',
    microDrill: 'Set a 3-minute timer right now, close your eyes, and simply count 20 conscious breaths.'
  },
  {
    id: 'aq-p08',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'When faced with an ambiguous dilemma lacking definitive data, do you resist premature closure and allow the tension of not-knowing to breathe?',
    subtext: 'Measures negative capability—the capacity to remain in uncertainty without irritable reaching after fact and reason.',
    targetRole: ['c_suite', 'founder', 'vp_director'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['reflective', 'centered'],
    difficulty: 'advanced',
    rationale: 'Premature closure locks organizations into flawed early assumptions to satisfy executive anxiety.',
    reflectionPrompt: 'What premature decision are you currently rushing simply to relieve the discomfort of ambiguity?',
    microDrill: 'Declare: "We will not decide this today. We will sleep on this and reconvene at 10 AM tomorrow."'
  },
  {
    id: 'aq-p09',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'Do you establish a clear physical and digital shutdown ritual at the end of each operational workday to prevent perseverative nighttime rumination?',
    subtext: 'Assesses psychological detachment from work and sleep boundary hygiene.',
    targetRole: ['all'],
    developmentalStage: ['all'],
    targetedSentiments: ['depleted', 'overwhelmed'],
    difficulty: 'intermediate',
    rationale: 'Eliminates cognitive perseveration, which is the primary driver of cardiovascular strain and chronic insomnia.',
    reflectionPrompt: 'What unfinished tasks are you allowing to invade your restorative evening hours?',
    microDrill: 'Write down tomorrow’s top 2 priorities on an index card, close your laptop lid, and say: "The workday is complete."'
  },
  {
    id: 'aq-p10',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'In meetings, do you listen to the complete thought of your interlocutor until they fully finish speaking before formatting your own counter-argument?',
    subtext: 'Evaluates active cognitive listening versus covert rehearsal of rebuttal.',
    targetRole: ['team_lead', 'vp_director', 'all'],
    developmentalStage: ['emerging', 'mid_career', 'all'],
    targetedSentiments: ['centered', 'reflective'],
    difficulty: 'intermediate',
    rationale: 'Rehearsing counter-arguments blinds the listener to novel information and subtle nuances.',
    reflectionPrompt: 'In your last conversation, were you listening to understand or merely waiting for your turn to speak?',
    microDrill: 'Wait 2 full seconds after someone finishes speaking before offering your reply.'
  },
  {
    id: 'aq-p11',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'How quickly can you recognize that your emotional battery is depleted and grant yourself permission to step away from operational triage?',
    subtext: 'Tests self-compassion and realistic recognition of biological limits.',
    targetRole: ['all'],
    developmentalStage: ['all'],
    targetedSentiments: ['depleted', 'overwhelmed'],
    difficulty: 'foundational',
    rationale: 'Pushing through severe exhaustion degrades executive decision quality to the level of legally intoxicated judgment.',
    reflectionPrompt: 'Do you view rest as a reward for work completed or as a biological prerequisite for quality thinking?',
    microDrill: 'Take a 10-minute walk outside with zero headphones, zero podcasts, and zero calls.'
  },
  {
    id: 'aq-p12',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'When a subordinate makes an unforced operational error, do you pause and ask clarifying inquiry before expressing disappointment or prescribing a fix?',
    subtext: 'Assesses curiosity over emotional retribution in managerial coaching.',
    targetRole: ['team_lead', 'vp_director', 'c_suite'],
    developmentalStage: ['emerging', 'mid_career'],
    targetedSentiments: ['agitated', 'centered'],
    difficulty: 'intermediate',
    rationale: 'Curiosity maintains psychological safety while uncovering the true systemic failure mode.',
    reflectionPrompt: 'How does your first reaction to an error shape whether your team will report the next mistake?',
    microDrill: 'Ask: "Walk me through how that looked from your seat in that moment."'
  },
  {
    id: 'aq-p13',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'Do you actively notice when organizational urgency is being weaponized by colleagues to bypass thorough governance and due diligence?',
    subtext: 'Tests immunity against manufactured panic and peer pressure.',
    targetRole: ['c_suite', 'vp_director', 'founder'],
    developmentalStage: ['senior_executive', 'mid_career'],
    targetedSentiments: ['centered', 'reflective'],
    difficulty: 'advanced',
    rationale: 'Urgency contagion is the primary vehicle through which fraudulent or flawed proposals bypass executive scrutiny.',
    reflectionPrompt: 'Who in your ecosystem routinely converts their personal poor planning into an emergency for you?',
    microDrill: 'Ask: "If we took 48 hours to evaluate this, what is the exact quantifiable downside?"'
  },
  {
    id: 'aq-p14',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'Can you comfortably allow dead silence to hang in a room during a strategic negotiation for more than 15 seconds without feeling compelled to fill it?',
    subtext: 'Measures tactical patience and comfort with social tension.',
    targetRole: ['c_suite', 'founder', 'military_ops'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['centered'],
    difficulty: 'advanced',
    rationale: 'Silence forces the counter-party to confront internal inconsistencies and often elicits voluntary concessions.',
    reflectionPrompt: 'Why does silence in meetings feel threatening, and what power do you give away by rushing to speak?',
    microDrill: 'In your next contract or budget negotiation, ask your question and then place your hands in your lap in complete stillness.'
  },
  {
    id: 'aq-p15',
    phase: 'Pause',
    matrixAlignment: 'LSTM',
    text: 'How frequently do you conduct a "Calendar Cleansing Audit" to purge recurring meetings that have outlived their original strategic necessity?',
    subtext: 'Tests subtraction discipline and organizational hygiene.',
    targetRole: ['vp_director', 'c_suite', 'all'],
    developmentalStage: ['senior_executive', 'all'],
    targetedSentiments: ['overwhelmed', 'depleted'],
    difficulty: 'intermediate',
    rationale: 'Without systematic subtraction, executive schedules suffer from bureaucratic accretive sclerosis.',
    reflectionPrompt: 'Which recurring meeting on your calendar would you pay $500 out of pocket to avoid attending tomorrow?',
    microDrill: 'Decline or delete 2 non-essential recurring calendar meetings before 5 PM today.'
  },

  // =========================================================================
  // 2. PURSUE (Adaptive Decision Grids, Execution Velocity, Decisive Bets)
  // =========================================================================
  {
    id: 'aq-u01',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'Do you clearly differentiate between Type 1 (irreversible One-Way Door) and Type 2 (reversible Two-Way Door) decisions in your strategic portfolio?',
    subtext: 'Measures speed-rigor balance and the prevention of decision paralysis on reversible initiatives.',
    targetRole: ['c_suite', 'vp_director', 'founder', 'all'],
    developmentalStage: ['mid_career', 'senior_executive', 'all'],
    targetedSentiments: ['centered', 'reflective'],
    difficulty: 'foundational',
    rationale: 'Treating reversible choices like irreversible ones stalls organizational momentum and suffocates initiative.',
    reflectionPrompt: 'What decision are you currently over-analyzing that could easily be undone if the initial pilot fails?',
    microDrill: 'Label your top 3 decisions today as "Reversible" or "Irreversible." Delegate the reversible ones immediately.'
  },
  {
    id: 'aq-u02',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'When committing capital or resources, do you systematically map out second- and third-order consequences across a 3-to-5 year horizon?',
    subtext: 'Evaluates systemic foresight and the anticipation of downstream blowback.',
    targetRole: ['c_suite', 'founder', 'vp_director'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['centered'],
    difficulty: 'advanced',
    rationale: 'First-order thinking solves today\'s symptom while manufacturing tomorrow\'s catastrophic systemic failure.',
    reflectionPrompt: 'If your current primary initiative succeeds wildly, what new vulnerability will that success create in 24 months?',
    microDrill: 'Draw a decision branch: Action -> 1st Order Effect -> 2nd Order Effect -> 3rd Order Cultural Consequence.'
  },
  {
    id: 'aq-u03',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'Do you establish explicit, quantitative "Kill Criteria" (tripwires) at the inception of a strategic project to dictate when to pull the plug without emotional regret?',
    subtext: 'Tests insulation against sunk-cost fallacy and institutional escalation of commitment.',
    targetRole: ['c_suite', 'founder', 'vp_director'],
    developmentalStage: ['senior_executive', 'mid_career'],
    targetedSentiments: ['centered', 'reflective'],
    difficulty: 'advanced',
    rationale: 'Deciding when to quit before emotions and public ego are invested prevents catastrophic resource bleeding.',
    reflectionPrompt: 'What zombie project is your department sustaining solely because leadership is embarrassed to admit it failed?',
    microDrill: 'Define 2 objective metric thresholds for your newest project that, if breached, trigger an automatic sunset review.'
  },
  {
    id: 'aq-u04',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'Can your frontline team members make high-impact operational trade-offs autonomously based on 3 to 4 clear, non-negotiable heuristic boundary rules?',
    subtext: 'Gauges decentralized execution velocity versus bureaucratic bottlenecks.',
    targetRole: ['vp_director', 'c_suite', 'military_ops'],
    developmentalStage: ['senior_executive', 'mid_career'],
    targetedSentiments: ['centered'],
    difficulty: 'intermediate',
    rationale: 'Simple rules empower rapid local adaptation; complex rulebooks guarantee paralysis during communication blackouts.',
    reflectionPrompt: 'If your team could not contact you for 72 hours during a crisis, what core doctrine principles would guide them?',
    microDrill: 'Draft 3 simple heuristic decision rules: "In this organization, we always prioritize [X] over [Y]."'
  },
  {
    id: 'aq-u05',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'How rapidly do you update your confidence and reallocate budget when reliable empirical field data contradicts your cherished business model?',
    subtext: 'Assesses strategic agility and the willingness to sacrifice pet hypotheses.',
    targetRole: ['founder', 'c_suite', 'vp_director'],
    developmentalStage: ['senior_executive', 'all'],
    targetedSentiments: ['reflective', 'agitated'],
    difficulty: 'advanced',
    rationale: 'Elite leaders update their bayesian priors incrementally rather than resisting data until catastrophe forces collapse.',
    reflectionPrompt: 'What belief about your customer or market are you currently clinging to despite deteriorating metrics?',
    microDrill: 'Identify one negative trend line you have been rationalizing away, and model a scenario where it continues for 12 months.'
  },
  {
    id: 'aq-u06',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'Do you ruthlessly concentrate at least 70% of your leadership team\'s creative capital on the single decisive operational bottleneck?',
    subtext: 'Tests strategic focus and resistance against peanut-butter resource dilution.',
    targetRole: ['c_suite', 'founder', 'vp_director'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['centered'],
    difficulty: 'intermediate',
    rationale: 'Diffusing resources equally across 12 initiatives is political appeasement, not strategy.',
    reflectionPrompt: 'What is the single constraint that, if unlocked, would render half your current departmental fires irrelevant?',
    microDrill: 'List your current top 10 initiatives. Cross off numbers 4 through 10 and declare them off-limits this month.'
  },
  {
    id: 'aq-u07',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'Before launching a major strategic initiative, do you conduct a structured Pre-Mortem asking the team to explain why the initiative has already failed?',
    subtext: 'Evaluates prospective hindsight and the unearthing of socially suppressed risk data.',
    targetRole: ['vp_director', 'c_suite', 'team_lead'],
    developmentalStage: ['mid_career', 'senior_executive'],
    targetedSentiments: ['reflective', 'centered'],
    difficulty: 'intermediate',
    rationale: 'Prospective hindsight legitimizes constructive skepticism and neutralizes groupthink overconfidence.',
    reflectionPrompt: 'Why are smart colleagues hesitant to voice their true doubts about executive proposals in formal meetings?',
    microDrill: 'Spend 15 minutes writing: "It is one year from now and this project has completely collapsed because..."'
  },
  {
    id: 'aq-u08',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'How consistently do you hold peers and direct reports accountable to concrete behavioral commitments without softening feedback into vague praise?',
    subtext: 'Measures execution rigor and the willingness to endure social discomfort for operational clarity.',
    targetRole: ['team_lead', 'vp_director', 'all'],
    developmentalStage: ['emerging', 'mid_career', 'all'],
    targetedSentiments: ['centered', 'agitated'],
    difficulty: 'intermediate',
    rationale: 'Unenforced standards communicate to high performers that mediocrity is tolerated.',
    reflectionPrompt: 'What poor behavior or missed deadline did you let slide last week to avoid an awkward conversation?',
    microDrill: 'Schedule a 10-minute candid calibration meeting with the direct report whose performance is lagging.'
  },
  {
    id: 'aq-u09',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'Do you balance rigorous analytical forecasting with fast, cheap, safe-to-fail field experiments in highly novel problem domains?',
    subtext: 'Tests experimental agility in complex adaptive environments versus bureaucratic spreadsheet paralysis.',
    targetRole: ['founder', 'vp_director', 'c_suite'],
    developmentalStage: ['all'],
    targetedSentiments: ['centered'],
    difficulty: 'intermediate',
    rationale: 'In complex spaces, you cannot analyze your way to the answer; you must probe, sense, and respond.',
    reflectionPrompt: 'How can you convert a 6-month feasibility study into a 2-week live operational prototype?',
    microDrill: 'Design a micro-pilot that costs less than $1,000 and answers your riskiest customer assumption within 5 days.'
  },
  {
    id: 'aq-u10',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'When executing a multi-stage project, do you monitor leading indicators of customer adoption and behavioral friction rather than lagging financial revenue?',
    subtext: 'Assesses proactive operational steering versus retrospective post-mortems.',
    targetRole: ['vp_director', 'founder', 'team_lead'],
    developmentalStage: ['mid_career', 'emerging'],
    targetedSentiments: ['centered'],
    difficulty: 'foundational',
    rationale: 'Lagging indicators inform you of what has already died; leading indicators allow you to steer away from the iceberg.',
    reflectionPrompt: 'What weekly behavioral signal tells you a customer is disengaging before they officially cancel their contract?',
    microDrill: 'Identify 1 weekly leading metric that your team will track every Monday morning.'
  },
  {
    id: 'aq-u11',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'Do you maintain an intentional "Stop Doing List" with the same organizational rigor as your annual strategic roadmap?',
    subtext: 'Measures subtraction discipline in executive prioritization.',
    targetRole: ['c_suite', 'vp_director', 'founder'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['overwhelmed', 'depleted'],
    difficulty: 'intermediate',
    rationale: 'True strategy is about choosing what NOT to do; addition without subtraction leads to systemic burnout.',
    reflectionPrompt: 'What low-value legacy activity is consuming 15% of your team\'s weekly cognitive bandwidth?',
    microDrill: 'Formally announce the cancellation of one legacy reporting deliverable this Friday.'
  },
  {
    id: 'aq-u12',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'Can you communicate the core strategic objective (Commander\'s Intent) in two concise sentences that any frontline employee can recite?',
    subtext: 'Tests clarity of purpose and message distillation.',
    targetRole: ['c_suite', 'military_ops', 'founder', 'all'],
    developmentalStage: ['all'],
    targetedSentiments: ['centered'],
    difficulty: 'foundational',
    rationale: 'If your frontline staff cannot articulate the goal, they cannot improvise effectively when your plan fails.',
    reflectionPrompt: 'Can you state what success looks like this quarter without using corporate buzzwords?',
    microDrill: 'Write your team\'s Q3 objective on a single post-it note in 15 words or fewer.'
  },
  {
    id: 'aq-u13',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'When an unexpected regulatory or technological disruption hits, do you pivot resources within 48 hours without waiting for the annual budget review?',
    subtext: 'Evaluates capital reallocation fluidity in dynamic markets.',
    targetRole: ['c_suite', 'founder'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['centered', 'agitated'],
    difficulty: 'advanced',
    rationale: 'Rigid annual budgeting cycles are the chief impediment to corporate survival in hyper-turbulent markets.',
    reflectionPrompt: 'What bureaucratic hurdle would currently prevent you from redeploying $100,000 to an emerging opportunity tomorrow?',
    microDrill: 'Model a dynamic contingency budget reallocation reserve for unforeseen market shifts.'
  },
  {
    id: 'aq-u14',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'Do you track the explicit financial and market opportunity "Cost of Delay" for major decisions awaiting committee approval?',
    subtext: 'Measures awareness of the invisible drag caused by consensus-seeking bureaucracy.',
    targetRole: ['c_suite', 'vp_director'],
    developmentalStage: ['senior_executive', 'mid_career'],
    targetedSentiments: ['centered'],
    difficulty: 'advanced',
    rationale: 'Committees delay decisions to eliminate personal risk, while the organization bleeds competitive advantage.',
    reflectionPrompt: 'How much revenue is being lost each week that a key product feature sits in executive sign-off queue?',
    microDrill: 'Calculate: [Estimated Annual Value / 52] = The weekly financial cost of delaying this decision.'
  },
  {
    id: 'aq-u15',
    phase: 'Pursue',
    matrixAlignment: 'ADG',
    text: 'How consistently do you protect your highest-performing individual contributors from being pulled into low-leverage administrative meetings?',
    subtext: 'Assesses executive defense of key organizational talent and deep-work bandwidth.',
    targetRole: ['vp_director', 'c_suite', 'team_lead'],
    developmentalStage: ['mid_career', 'senior_executive'],
    targetedSentiments: ['centered', 'reflective'],
    difficulty: 'intermediate',
    rationale: 'Subsidizing administrative bloat with high-performer deep work results in talent attrition and technological decay.',
    reflectionPrompt: 'Is your best engineer spending more time writing status slides than writing core system architecture?',
    microDrill: 'Exempt your top technical performers from all general organizational status updates.'
  },

  // =========================================================================
  // 3. REFRAME (Cognitive Reappraisal, Narrative Flexibility, Mental Models)
  // =========================================================================
  {
    id: 'aq-r01',
    phase: 'Reframe',
    matrixAlignment: 'RAAG',
    text: 'When a crisis strikes, do you consciously separate verifiable raw facts from the emotional alarm bells and catastrophic stories your mind fabricates?',
    subtext: 'Tests mastery of the RAL Frame-Separation Drill (Fact vs. Emotion vs. Story).',
    targetRole: ['all'],
    developmentalStage: ['all'],
    targetedSentiments: ['overwhelmed', 'agitated'],
    difficulty: 'foundational',
    rationale: 'Separating objective event data from subjective anxiety prevents panic-induced strategic errors.',
    reflectionPrompt: 'What terrible story is your mind inventing right now about a recent setback, and what are the actual verifiable facts?',
    microDrill: 'Write down: 1. The Fact (one sentence), 2. The Emotion (one word), 3. The Story I am making up.'
  },
  {
    id: 'aq-r02',
    phase: 'Reframe',
    matrixAlignment: 'RAAG',
    text: 'Can you articulate the underlying strategic incentives and hidden fears of your fiercest internal competitor better than they can explain it themselves?',
    subtext: 'Evaluates cognitive empathy and ideological Turing tests in high-friction executive rivalries.',
    targetRole: ['c_suite', 'vp_director', 'founder'],
    developmentalStage: ['senior_executive', 'mid_career'],
    targetedSentiments: ['agitated', 'reflective'],
    difficulty: 'advanced',
    rationale: 'Demonizing opponents leads to catastrophic blindspots; understanding their legitimate constraints unlocks breakthrough deal structures.',
    reflectionPrompt: 'Why does your rival executive believe their proposal is in the best long-term interest of the enterprise?',
    microDrill: 'Spend 5 minutes writing a pitch for your opponent\'s proposal from their exact emotional viewpoint.'
  },
  {
    id: 'aq-r03',
    phase: 'Reframe',
    matrixAlignment: 'RAAG',
    text: 'How frequently do you reframe severe resource constraints not as an unfair handicap, but as a deliberate architectural catalyst for innovation?',
    subtext: 'Assesses frugal innovation mindset and rejection of victim narratives in leadership.',
    targetRole: ['founder', 'team_lead', 'all'],
    developmentalStage: ['emerging', 'mid_career', 'all'],
    targetedSentiments: ['depleted', 'reflective'],
    difficulty: 'intermediate',
    rationale: 'Excessive capital subsidizes sloppy thinking; constraints force radical simplicity and structural efficiency.',
    reflectionPrompt: 'If you had only 50% of your current budget, what bloated assumptions would you be forced to eliminate immediately?',
    microDrill: 'Ask your team: "What breakthrough would we be forced to invent if we had zero marketing budget?"'
  },
  {
    id: 'aq-r04',
    phase: 'Reframe',
    matrixAlignment: 'RAAG',
    text: 'When a project fails, do you reframe the setback as expensive, high-value training data rather than a permanent indictment of your competence?',
    subtext: 'Tests epistemic resilience and growth-oriented narrative consolidation.',
    targetRole: ['all'],
    developmentalStage: ['all'],
    targetedSentiments: ['depleted', 'reflective'],
    difficulty: 'foundational',
    rationale: 'Reframing failures as diagnostic feedback loops protects self-worth and preserves exploratory boldness.',
    reflectionPrompt: 'What is the precise operational insight you paid for with your most recent painful mistake?',
    microDrill: 'Write a 1-page debrief titled: "The $50,000 Tuition: Three Invaluable Lessons We Just Purchased."'
  },
  {
    id: 'aq-r05',
    phase: 'Reframe',
    matrixAlignment: 'RAAG',
    text: 'Do you embrace "Both/And" paradoxical cognitive frames when addressing competing demands (e.g., speed vs. rigor, empathy vs. accountability)?',
    subtext: 'Evaluates dialectical thinking versus simplistic binary polarization.',
    targetRole: ['c_suite', 'vp_director'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['centered', 'reflective'],
    difficulty: 'advanced',
    rationale: 'Sophisticated leadership problems are not puzzles to be solved, but ongoing polarities to be dynamically balanced.',
    reflectionPrompt: 'Where are you currently caught in an "Either/Or" debate where the true answer requires integrating both poles?',
    microDrill: 'Rephrase a conflict: Instead of "X or Y," ask: "How can we execute X in a way that actively strengthens Y?"'
  },
  {
    id: 'aq-r06',
    phase: 'Reframe',
    matrixAlignment: 'RAAG',
    text: 'Can you hold your most cherished strategic convictions with epistemic humility, actively looking for dissonant signals that disprove them?',
    subtext: 'Measures intellectual courage and active resistance to confirmation bias.',
    targetRole: ['c_suite', 'founder', 'military_ops'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['reflective', 'centered'],
    difficulty: 'advanced',
    rationale: 'The hallmark of elite strategic acumen is the aggressive search for disconfirming evidence.',
    reflectionPrompt: 'What is one core business assumption you would be devastated to learn is 100% false?',
    microDrill: 'Ask your trusted analyst: "Find me the 3 most credible data points that suggest our Q4 strategy is wrong."'
  },
  {
    id: 'aq-r07',
    phase: 'Reframe',
    matrixAlignment: 'RAAG',
    text: 'When stakeholder feedback feels defensive or hostile, do you reframe their aggression as an expression of their unaddressed anxiety?',
    subtext: 'Assesses affective decoupling and the neutralization of interpersonal conflict triggers.',
    targetRole: ['all'],
    developmentalStage: ['all'],
    targetedSentiments: ['agitated'],
    difficulty: 'intermediate',
    rationale: 'Most corporate aggression is panicked self-protection; recognizing this disarms your own defensive reflexes.',
    reflectionPrompt: 'What vulnerability or unexpressed threat is making your colleague lash out right now?',
    microDrill: 'Silently say to yourself: "Their reaction is diagnostic of their inner pressure, not my baseline value."'
  },
  {
    id: 'aq-r08',
    phase: 'Reframe',
    matrixAlignment: 'RAAG',
    text: 'How consistently do you audit your own vocabulary to eliminate absolute words like "always", "never", "impossible", and "catastrophic"?',
    subtext: 'Tests linguistic hygiene and emotional moderation in crisis framing.',
    targetRole: ['team_lead', 'vp_director', 'all'],
    developmentalStage: ['all'],
    targetedSentiments: ['overwhelmed', 'agitated'],
    difficulty: 'foundational',
    rationale: 'Absolute cognitive distortions amplify physiological stress and blind teams to incremental workarounds.',
    reflectionPrompt: 'When you tell your team "this is a complete disaster," what neural state are you triggering across the department?',
    microDrill: 'Replace "This is impossible" with "We have not yet identified the structural mechanism to solve this."'
  },
  {
    id: 'aq-r09',
    phase: 'Reframe',
    matrixAlignment: 'RAAG',
    text: 'Do you view organizational conflict as an invaluable signal that uncovers hidden systemic flaws rather than an annoying disruption?',
    subtext: 'Evaluates conflict normalization and systemic inquiry.',
    targetRole: ['team_lead', 'vp_director', 'c_suite'],
    developmentalStage: ['mid_career', 'senior_executive'],
    targetedSentiments: ['centered', 'reflective'],
    difficulty: 'intermediate',
    rationale: 'Friction points to misaligned incentives and broken handoffs; suppressing conflict preserves systemic decay.',
    reflectionPrompt: 'What persistent team argument is revealing an underlying structural defect in departmental incentives?',
    microDrill: 'Bring the two conflicting parties together and investigate: "What systemic gap is forcing you two into opposition?"'
  },
  {
    id: 'aq-r10',
    phase: 'Reframe',
    matrixAlignment: 'RAAG',
    text: 'Can you reframe the pain of organizational change not as loss, but as the necessary shedding of obsolete cognitive baggage?',
    subtext: 'Measures narrative leadership during painful organizational restructurings.',
    targetRole: ['c_suite', 'vp_director'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['reflective', 'depleted'],
    difficulty: 'advanced',
    rationale: 'Humans resist loss, not change; reframing transitions around what is being preserved and unlocked eases friction.',
    reflectionPrompt: 'What legacy identity does your team need to grieve and release before they can embrace the future?',
    microDrill: 'Acknowledge the honorable service of the old protocol before explaining the strategic necessity of the new.'
  },

  // =========================================================================
  // 4. DECOUPLE (Ego Detachment, Identity vs Role, Witness-Consciousness)
  // =========================================================================
  {
    id: 'aq-d01',
    phase: 'Decouple',
    matrixAlignment: 'RAAG',
    text: 'Can you cleanly differentiate between "Who You Are as a Conscious Human" and "The Operational Role You Occupy on the Organizational Chart"?',
    subtext: 'Evaluates identity-role differentiation and insulation against status anxiety.',
    targetRole: ['all'],
    developmentalStage: ['all'],
    targetedSentiments: ['reflective', 'depleted'],
    difficulty: 'intermediate',
    rationale: 'When identity is fused with title, any organizational challenge registers neurologically as a mortal existential threat.',
    reflectionPrompt: 'If your title, executive authority, and company badge vanished tonight, what unshakeable core remains?',
    microDrill: 'Mentally rehearse: "I steward this office today; I am not defined by this title tomorrow."'
  },
  {
    id: 'aq-d02',
    phase: 'Decouple',
    matrixAlignment: 'RAAG',
    text: 'When a high-visibility project succeeds brilliantly, can you pass 100% of the public credit and limelight to your frontline team without ego resentment?',
    subtext: 'Measures servant leadership and freedom from narcissistic credit-seeking.',
    targetRole: ['c_suite', 'vp_director', 'team_lead'],
    developmentalStage: ['senior_executive', 'mid_career'],
    targetedSentiments: ['centered'],
    difficulty: 'intermediate',
    rationale: 'Ego detachment allows leaders to amplify collective motivation while neutralizing internal political jealousy.',
    reflectionPrompt: 'Do you feel a subtle urge to make sure the board knows "it was actually my idea"?',
    microDrill: 'Forward a high-visibility congratulatory email to your executive sponsor, highlighting your junior lead\'s brilliance.'
  },
  {
    id: 'aq-d03',
    phase: 'Decouple',
    matrixAlignment: 'RAAG',
    text: 'Can you step back and witness your own emotional weather (anger, fear, jealousy, defensiveness) as an objective observer without getting swept away by it?',
    subtext: 'Tests practice of Witness-Consciousness (*Sakshi Bhava*) in executive environments.',
    targetRole: ['all'],
    developmentalStage: ['all'],
    targetedSentiments: ['agitated', 'overwhelmed', 'reflective'],
    difficulty: 'advanced',
    rationale: 'Observer awareness decouples consciousness from transient physiological arousal, establishing supreme inner equanimity.',
    reflectionPrompt: 'Can you observe anger rising in your chest with the same curious detachment that you watch dark storm clouds outside?',
    microDrill: 'Silently name your internal state: "I notice the presence of anxiety in this body right now."'
  },
  {
    id: 'aq-d04',
    phase: 'Decouple',
    matrixAlignment: 'RAAG',
    text: 'How free are you from the exhausting need to prove your intellectual superiority or win every trivial argument in executive committee meetings?',
    subtext: 'Assesses the relinquishment of intellectual vanity in service of collective clarity.',
    targetRole: ['c_suite', 'vp_director', 'founder'],
    developmentalStage: ['all'],
    targetedSentiments: ['centered', 'agitated'],
    difficulty: 'intermediate',
    rationale: 'Wasting cognitive energy defending trivial points squanders authority needed for decisive strategic interventions.',
    reflectionPrompt: 'Would you rather be proven right or achieve the optimal long-term outcome for the enterprise?',
    microDrill: 'In your next meeting, let an inaccurate minor comment pass without correcting it if it does not harm the core mission.'
  },
  {
    id: 'aq-d05',
    phase: 'Decouple',
    matrixAlignment: 'RAAG',
    text: 'When your team discovers an innovative solution that fundamentally renders your own past work obsolete, do you celebrate it wholeheartedly?',
    subtext: 'Tests the absence of territorial ego and openness to generational succession.',
    targetRole: ['founder', 'c_suite', 'vp_director'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['reflective', 'centered'],
    difficulty: 'advanced',
    rationale: 'True leadership maturity is measured by how easily the leader rejoices when superseded by their disciples.',
    reflectionPrompt: 'Are you building systems designed to depend on your genius, or systems designed to outgrow you?',
    microDrill: 'Promote and publicly spotlight the junior architect whose novel code replaced your legacy architecture.'
  },
  {
    id: 'aq-d06',
    phase: 'Decouple',
    matrixAlignment: 'RAAG',
    text: 'Can you receive public censure or unfair media critiques without rushing into defensive legal PR battles to polish your personal reputation?',
    subtext: 'Measures dispassion and the refusal to divert corporate resources for personal vanity defense.',
    targetRole: ['c_suite', 'founder'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['agitated', 'reflective'],
    difficulty: 'advanced',
    rationale: 'Ego-driven PR wars burn corporate credibility to salve a CEO\'s wounded self-esteem.',
    reflectionPrompt: 'Whose opinion are you still trying to impress that is preventing you from acting with pure strategic objectivity?',
    microDrill: 'Let the critical headline sit without commentary; focus 100% of executive energy on delivering operational excellence.'
  },
  {
    id: 'aq-d07',
    phase: 'Decouple',
    matrixAlignment: 'RAAG',
    text: 'Do you maintain an inner sanctuary of purpose and values that remains completely unaffected by stock price volatility or quarterly shareholder applause?',
    subtext: 'Evaluates intrinsic motivation versus extrinsic validation addiction.',
    targetRole: ['c_suite', 'founder', 'all'],
    developmentalStage: ['senior_executive', 'all'],
    targetedSentiments: ['reflective', 'centered'],
    difficulty: 'intermediate',
    rationale: 'Leaders addicted to external praise become puppets of market sentiment, unable to execute contrarian bets.',
    reflectionPrompt: 'Does your personal self-esteem rise and fall in lockstep with the company\'s valuation?',
    microDrill: 'Re-read your personal core doctrine charter and recommit to serving enduring human principles.'
  },
  {
    id: 'aq-d08',
    phase: 'Decouple',
    matrixAlignment: 'RAAG',
    text: 'Can you gracefully transition out of operational command when a new lifecycle phase requires a different leadership archetype?',
    subtext: 'Tests self-awareness and the courage to step aside for the health of the institution.',
    targetRole: ['founder', 'c_suite'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['reflective'],
    difficulty: 'advanced',
    rationale: 'Founders who cannot let go often strangle the very enterprise they birthed.',
    reflectionPrompt: 'Are your current personal strengths what this organization needs for its next stage of scaling?',
    microDrill: 'Begin mentoring and delegating your top 3 operational duties to your prospective successor.'
  },

  // =========================================================================
  // 5. TEAM COHERENCE (Adaptive Culture Lattice, Psychological Safety, Truth)
  // =========================================================================
  {
    id: 'aq-t01',
    phase: 'Team Coherence',
    matrixAlignment: 'ACL',
    text: 'Do junior engineers and frontline personnel feel completely safe to challenge your strategic assumptions publicly in group meetings without fear of reprisal?',
    subtext: 'Evaluates psychological safety and the health of the Truth-Speaking Index.',
    targetRole: ['all'],
    developmentalStage: ['all'],
    targetedSentiments: ['centered', 'reflective'],
    difficulty: 'foundational',
    rationale: 'When junior team members fear speaking up, systemic anomalies go unreported until catastrophic failure occurs.',
    reflectionPrompt: 'When was the last time an intern or junior analyst openly told you that your idea was flawed?',
    microDrill: 'In your next all-hands, say: "I need someone to tell me where this plan will break. Who sees it first?"'
  },
  {
    id: 'aq-t02',
    phase: 'Team Coherence',
    matrixAlignment: 'ACL',
    text: 'When bad news or missed targets are reported early, is the messenger rewarded for their vigilance rather than blamed for the reality?',
    subtext: 'Measures error reporting hygiene versus defensive suppression.',
    targetRole: ['team_lead', 'vp_director', 'c_suite'],
    developmentalStage: ['mid_career', 'emerging', 'all'],
    targetedSentiments: ['agitated', 'centered'],
    difficulty: 'foundational',
    rationale: 'Shooting the messenger teaches the organization to hide impending trainwrecks until the crash is irreversible.',
    reflectionPrompt: 'How did you respond the last time a subordinate alerted you to a major unforeseen cost overrun?',
    microDrill: 'Say: "Thank you for bringing this to my attention immediately. Let us solve this together."'
  },
  {
    id: 'aq-t03',
    phase: 'Team Coherence',
    matrixAlignment: 'ACL',
    text: 'Do your departmental meetings ensure equal conversational turn-taking rather than allowing two dominant extroverts to monopolize the debate?',
    subtext: 'Tests collective intelligence optimization and conversational equity.',
    targetRole: ['team_lead', 'vp_director', 'all'],
    developmentalStage: ['emerging', 'mid_career', 'all'],
    targetedSentiments: ['centered'],
    difficulty: 'intermediate',
    rationale: 'Teams with equal turn-taking demonstrate significantly higher collective problem-solving intelligence.',
    reflectionPrompt: 'Who in your room possesses deep technical wisdom but remains silent because the loud voices drown them out?',
    microDrill: 'Directly invite the quietest analyst: "[Name], what is your perspective on this architecture?"'
  },
  {
    id: 'aq-t04',
    phase: 'Team Coherence',
    matrixAlignment: 'ACL',
    text: 'How effectively do you dismantle cross-functional silos by forcing shared accountability metrics between rival departments (e.g., Sales vs Engineering)?',
    subtext: 'Assesses structural alignment and the dissolution of departmental warfare.',
    targetRole: ['c_suite', 'vp_director'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['centered', 'agitated'],
    difficulty: 'advanced',
    rationale: 'When departments have opposing key performance indicators, political infighting is guaranteed by organizational design.',
    reflectionPrompt: 'Are your sales incentives incentivizing promises that engineering cannot fulfill without burning out?',
    microDrill: 'Tie 30% of sales bonuses and engineering bonuses to shared customer retention and uptime metrics.'
  },
  {
    id: 'aq-t05',
    phase: 'Team Coherence',
    matrixAlignment: 'ACL',
    text: 'Do you begin high-stakes strategic meetings with a "Silent Start"—reading a concise narrative memo in shared silence before discussion begins?',
    subtext: 'Tests adoption of high-density cognitive meeting hygiene over performative slide decks.',
    targetRole: ['c_suite', 'vp_director', 'founder'],
    developmentalStage: ['senior_executive', 'mid_career'],
    targetedSentiments: ['centered', 'reflective'],
    difficulty: 'intermediate',
    rationale: 'Silent narrative reading forces authors to synthesize clear prose and guarantees every attendee has digested the data.',
    reflectionPrompt: 'How much meeting time is currently wasted listening to someone read bullet points off a PowerPoint deck?',
    microDrill: 'Replace slides with a 2-page memo for your next strategic debate and allocate 10 minutes of silent reading at the start.'
  },
  {
    id: 'aq-t06',
    phase: 'Team Coherence',
    matrixAlignment: 'ACL',
    text: 'Can your team members openly express personal doubt, grief, or emotional overwhelm during major crises without being perceived as weak or uncommitted?',
    subtext: 'Evaluates emotional bandwidth and human sustainability in corporate culture.',
    targetRole: ['all'],
    developmentalStage: ['all'],
    targetedSentiments: ['overwhelmed', 'depleted'],
    difficulty: 'intermediate',
    rationale: 'Suppressing authentic emotional vulnerability leads to sudden cynicism, disengagement, and quiet quitting.',
    reflectionPrompt: 'Do you create space to acknowledge human sorrow and exhaustion before demanding operational throughput?',
    microDrill: 'Open your next 1-on-1 by asking: "Beyond the project deadlines, how are you truly holding up as a human being?"'
  },
  {
    id: 'aq-t07',
    phase: 'Team Coherence',
    matrixAlignment: 'ACL',
    text: 'Do you conduct completely Blameless Retrospectives after major outages or failed launches, focusing strictly on tooling and systemic failure modes?',
    subtext: 'Measures high-reliability error management culture.',
    targetRole: ['team_lead', 'vp_director', 'military_ops'],
    developmentalStage: ['all'],
    targetedSentiments: ['centered', 'reflective'],
    difficulty: 'foundational',
    rationale: 'Focusing on personal blame guarantees future anomalies will be covered up; focusing on systems prevents recurrence.',
    reflectionPrompt: 'Does your incident debrief search for a scapegoat to discipline or a systemic flaw to re-engineer?',
    microDrill: 'Ban the attribution of "Human Error" in your next post-mortem; ask what system flaw made that error possible.'
  },
  {
    id: 'aq-t08',
    phase: 'Team Coherence',
    matrixAlignment: 'ACL',
    text: 'How swiftly do you identify and remove toxic, high-performing individuals whose brilliance is accompanied by chronic contempt and psychological abuse?',
    subtext: 'Tests commitment to cultural non-negotiables over short-term revenue convenience.',
    targetRole: ['c_suite', 'founder', 'vp_director'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['centered'],
    difficulty: 'advanced',
    rationale: 'Tolerating a brilliant jerk signals to the entire organization that performance excuses moral bankruptcy.',
    reflectionPrompt: 'Who in your organization is producing high numbers while quietly crushing the spirit of everyone around them?',
    microDrill: 'Deliver a firm, unambiguous behavioral boundary to the toxic performer: culture standards are non-negotiable.'
  },
  {
    id: 'aq-t09',
    phase: 'Team Coherence',
    matrixAlignment: 'ACL',
    text: 'Do you actively celebrate and elevate dissenting viewpoints when they prevent your team from succumbing to euphoric groupthink?',
    subtext: 'Measures institutional protection of contrarian intelligence.',
    targetRole: ['c_suite', 'vp_director', 'founder'],
    developmentalStage: ['senior_executive', 'mid_career'],
    targetedSentiments: ['reflective', 'centered'],
    difficulty: 'intermediate',
    rationale: 'Unanimous enthusiastic agreement in a boardroom is almost always a terrifying sign of social compliance.',
    reflectionPrompt: 'When was the last time a contrarian saved your company from a disastrous investment, and did you reward them?',
    microDrill: 'Appoint an official "Devil\'s Advocate" whose formal responsibility is to build the strongest counter-argument.'
  },
  {
    id: 'aq-t10',
    phase: 'Team Coherence',
    matrixAlignment: 'ACL',
    text: 'How consistently do you communicate with radical transparency about organizational finances and macro headwinds, treating your employees as adult partners?',
    subtext: 'Evaluates adult-to-adult cultural contract versus patronizing corporate paternalism.',
    targetRole: ['c_suite', 'founder', 'vp_director'],
    developmentalStage: ['senior_executive'],
    targetedSentiments: ['centered'],
    difficulty: 'intermediate',
    rationale: 'Treating employees like fragile children breeds childish gossip and panic; transparency cultivates co-ownership.',
    reflectionPrompt: 'What crucial business truth are you currently hiding from your team because you don\'t trust them to handle it?',
    microDrill: 'Share the unvarnished quarterly cash runway and unit economics transparently in your upcoming Town Hall.'
  }
];

/**
 * Dynamically generates 10 to 15 tailored questions for a specific user session.
 * Tailored by:
 * - Current reflective sentiment (e.g., overwhelmed, agitated, centered, depleted)
 * - User's role (C-suite, VP/Director, Founder, Military Ops, Team Lead)
 * - User's developmental stage
 * - Diagnostic weakest matrix (RAAG, LSTM, ADG, ACL)
 * - Current calendar week number for progressive weekly variation
 */
export function generateAdaptiveQuestionSet(options: {
  user?: UserProfile;
  sentiment?: ReflectiveSentiment;
  diagnostic?: DiagnosticResult | null;
  count?: number; // 10-15
  sessionSeed?: number;
}): AdaptiveQuestion[] {
  const count = Math.min(Math.max(options.count || 12, 10), 15);
  const activeSentiment = options.sentiment || 'centered';
  const currentWeek = getIsoWeekNumber();
  const weakestMatrix = options.diagnostic?.weakestMatrix;

  // Role mapping
  let userRoleKey: 'c_suite' | 'vp_director' | 'team_lead' | 'military_ops' | 'founder' | 'all' = 'all';
  if (options.user?.title) {
    const t = options.user.title.toLowerCase();
    if (t.includes('ceo') || t.includes('c-suite') || t.includes('chief') || t.includes('president') || t.includes('founder')) {
      userRoleKey = 'c_suite';
    } else if (t.includes('vp') || t.includes('director') || t.includes('head')) {
      userRoleKey = 'vp_director';
    } else if (t.includes('commander') || t.includes('colonel') || t.includes('major') || t.includes('captain') || t.includes('ops')) {
      userRoleKey = 'military_ops';
    } else if (t.includes('lead') || t.includes('manager')) {
      userRoleKey = 'team_lead';
    }
  }

  // Score candidate questions based on multidimensional fit
  const scored = ADAPTIVE_QUESTION_BANK.map((q, index) => {
    let score = 0;

    // 1. Sentiment match (high priority for emotional recalibration)
    if (q.targetedSentiments.includes(activeSentiment)) {
      score += 35;
    }

    // 2. Weakest matrix match from diagnostic (helps targeted growth)
    if (weakestMatrix && q.matrixAlignment === weakestMatrix) {
      score += 25;
    }

    // 3. Role match
    if (q.targetRole.includes('all') || q.targetRole.includes(userRoleKey)) {
      score += 15;
    }

    // 4. Sentiment phase affinities
    if (activeSentiment === 'overwhelmed' || activeSentiment === 'depleted') {
      if (q.phase === 'Pause') score += 20;
    } else if (activeSentiment === 'agitated') {
      if (q.phase === 'Reframe' || q.phase === 'Decouple') score += 20;
    } else if (activeSentiment === 'centered') {
      if (q.phase === 'Pursue' || q.phase === 'Team Coherence') score += 15;
    }

    // 5. Weekly rotation factor: hash with week number and index to guarantee fresh questions weekly
    const rotationSalt = ((index * 13 + currentWeek * 7 + (options.sessionSeed || 0)) % 100);
    score += (rotationSalt * 0.15);

    return { question: q, score };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Guarantee balanced phase representation across the top selections
  const selected: AdaptiveQuestion[] = [];
  const phasesSeen = new Set<RalPhase>();

  // First pass: pick highest scoring distinct phases
  for (const item of scored) {
    if (selected.length >= count) break;
    if (!phasesSeen.has(item.question.phase) || selected.length >= 5) {
      selected.push(item.question);
      phasesSeen.add(item.question.phase);
    }
  }

  // If still under count, fill from top scored
  for (const item of scored) {
    if (selected.length >= count) break;
    if (!selected.some(sq => sq.id === item.question.id)) {
      selected.push(item.question);
    }
  }

  return selected;
}

/**
 * Evaluates completed answers and generates tailored recommendations
 */
export function evaluateAdaptiveAnswers(
  questions: AdaptiveQuestion[],
  answers: Record<string, number>
): {
  overallScore: number; // 0..100
  phaseScores: Record<RalPhase, number>;
  lowestPhase: RalPhase;
  highestPhase: RalPhase;
  tailoredRecommendation: string;
} {
  const phaseTotals: Record<RalPhase, { sum: number; count: number }> = {
    Pause: { sum: 0, count: 0 },
    Pursue: { sum: 0, count: 0 },
    Reframe: { sum: 0, count: 0 },
    Decouple: { sum: 0, count: 0 },
    'Team Coherence': { sum: 0, count: 0 }
  };

  let totalSum = 0;
  let totalCount = 0;

  for (const q of questions) {
    const val = answers[q.id] || 3;
    phaseTotals[q.phase].sum += val;
    phaseTotals[q.phase].count += 1;
    totalSum += val;
    totalCount += 1;
  }

  const phaseScores: Record<RalPhase, number> = {
    Pause: 50,
    Pursue: 50,
    Reframe: 50,
    Decouple: 50,
    'Team Coherence': 50
  };

  const phases: RalPhase[] = ['Pause', 'Pursue', 'Reframe', 'Decouple', 'Team Coherence'];
  let minPhase: RalPhase = 'Pause';
  let maxPhase: RalPhase = 'Pursue';
  let minAvg = 999;
  let maxAvg = -1;

  for (const p of phases) {
    const stat = phaseTotals[p];
    const avg = stat.count > 0 ? stat.sum / stat.count : 3;
    const scaled = Math.round((avg / 5) * 100);
    phaseScores[p] = scaled;

    if (avg < minAvg) {
      minAvg = avg;
      minPhase = p;
    }
    if (avg > maxAvg) {
      maxAvg = avg;
      maxPhase = p;
    }
  }

  const overallScore = totalCount > 0 ? Math.round((totalSum / (totalCount * 5)) * 100) : 60;

  // Generate tailored executive recommendation
  const recommendations: Record<RalPhase, string> = {
    Pause: 'Your autonomic down-regulation index indicates vulnerability to urgency panics. Practice the 10-Second Command Pause before opening high-stakes meetings, and block a daily 90-minute quiet work sanctuary.',
    Pursue: 'Your decisive execution alignment requires sharper boundaries. Implement explicit One-Way vs Two-Way Door labeling on all strategic proposals and codify pre-determined kill-criteria to prevent sunk-cost drag.',
    Reframe: 'Your cognitive flexibility will benefit from the Frame-Separation Drill. Distinguish verifiable facts from emotional narrative on contentious issues, and invite structured counter-factual devil\'s advocacy.',
    Decouple: 'Your leadership identity is slightly over-fused with daily tactical outcomes. Cultivate witness-consciousness (Sakshi Bhava)—observe organizational turbulence as external weather rather than personal existential critique.',
    'Team Coherence': 'Your systemic cultural safety requires intentional reinforcement. Institute conversational turn-taking in executive syncs, reward the early reporting of anomalies, and conduct completely blameless retrospectives.'
  };

  return {
    overallScore,
    phaseScores,
    lowestPhase: minPhase,
    highestPhase: maxPhase,
    tailoredRecommendation: recommendations[minPhase]
  };
}
