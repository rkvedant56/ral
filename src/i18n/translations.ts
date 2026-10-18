export type SupportedLanguage = 'en' | 'hi' | 'es' | 'fr' | 'de' | 'ar' | 'pt' | 'ja';

export interface TranslationDict {
  brand: string;
  tagline: string;
  nav: {
    home: string;
    coach: string;
    practice: string;
    learn: string;
    simulator: string;
    more: string;
    diagnostic: string;
    team: string;
    insights: string;
    toolkit: string;
    pricing: string;
    admin: string;
    vault: string;
    research: string;
  };
  welcomeHero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaCheck: string;
    signIn: string;
    exploreDemo: string;
    startFresh: string;
    whatIsRal: string;
    ralCoreTruth: string;
    authorKicker: string;
  };
  journey: {
    title: string;
    subtitle: string;
    understand: string;
    path: string;
    reflect: string;
    diagnose: string;
    practice: string;
    adapt: string;
    growth: string;
  };
  cycle: {
    title: string;
    subtitle: string;
    pause: { name: string; subtitle: string; desc: string; micro: string; neuro: string };
    perceive: { name: string; subtitle: string; desc: string; micro: string; neuro: string };
    reframe: { name: string; subtitle: string; desc: string; micro: string; neuro: string };
    act: { name: string; subtitle: string; desc: string; micro: string; neuro: string };
    adjust: { name: string; subtitle: string; desc: string; micro: string; neuro: string };
    grow: { name: string; subtitle: string; desc: string; micro: string; neuro: string };
  };
  matrices: {
    title: string;
    subtitle: string;
    raag: { plain: string; code: string; label: string; desc: string };
    lstm: { plain: string; code: string; label: string; desc: string };
    adg: { plain: string; code: string; label: string; desc: string };
    acl: { plain: string; code: string; label: string; desc: string };
    weakestAlert: string;
  };
  lifeStages: {
    selectTitle: string;
    selectSubtitle: string;
    changeStage: string;
    kids: { title: string; age: string; desc: string; focus: string };
    teenagers: { title: string; age: string; desc: string; focus: string };
    students: { title: string; age: string; desc: string; focus: string };
    professionals: { title: string; age: string; desc: string; focus: string };
    seniors: { title: string; age: string; desc: string; focus: string };
    teams: { title: string; age: string; desc: string; focus: string };
  };
  pathways: {
    individual: string;
    individualDesc: string;
    organization: string;
    organizationDesc: string;
    privacyNotice: string;
    switchToIndiv: string;
    switchToOrg: string;
  };
  author: {
    name: string;
    role: string;
    creds: string;
    quote: string;
    doctrineTitle: string;
    viewBio: string;
  };
  actions: {
    pause10s: string;
    startDiagnostic: string;
    continuePractice: string;
    retakeDiagnostic: string;
    bookCoach: string;
    viewToolkit: string;
    saveProgress: string;
    exportReport: string;
    openMusic: string;
    exploreBook: string;
  };
  coach: {
    title: string;
    subtitle: string;
    placeholder: string;
    voiceInput: string;
    voiceOutput: string;
    speaking: string;
    listening: string;
    pauseMode: string;
    conflictMode: string;
    crisisMode: string;
    aiReviewMode: string;
    disclaimer: string;
    dockTooltip: string;
    thinking: string;
  };
  diagnostic: {
    title: string;
    subtitle: string;
    scaleDesc: string;
    compositeScore: string;
    weakestMatrix: string;
    prescription: string;
    never: string;
    rarely: string;
    sometimes: string;
    often: string;
    consistently: string;
  };
  soothe: {
    title: string;
    subtitle: string;
    breathingGuide: string;
    inhale: string;
    hold: string;
    exhale: string;
    instruments: string;
    timer: string;
    startBreathing: string;
    stopBreathing: string;
    moodTitle: string;
    soundscapesAvailable: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDict> = {
  en: {
    brand: "RAL Coach",
    tagline: "Inner Clarity, Outer Coherence, Timeless Leadership",
    nav: {
      home: "Home",
      coach: "Coach",
      practice: "Practice",
      learn: "Learn",
      simulator: "Simulate",
      more: "More",
      diagnostic: "Diagnostics",
      team: "Team & Org",
      insights: "Insights",
      toolkit: "Toolkit",
      pricing: "Membership",
      admin: "Admin",
      vault: "Memory Vault",
      research: "Psychometrics"
    },
    welcomeHero: {
      badge: "Reflective Adaptive Leadership (RAL)",
      title: "Lead yourself first.",
      subtitle: "A five-minute check shows where you stand today. Master inner clarity, state transition, decision alignment, and team coherence.",
      ctaCheck: "Start the 5-minute check",
      signIn: "Already have a profile? Sign in",
      exploreDemo: "Explore Demo Profile (Alex Vance)",
      startFresh: "Start fresh as Priya",
      whatIsRal: "What is Reflective Adaptive Leadership?",
      ralCoreTruth: "“A leader cannot lead others until they learn to lead their own mind through complexity. Leadership collapses internally long before it collapses externally.”",
      authorKicker: "Doctrine by RK Vedant · Former Military Commander & Executive Mentor"
    },
    journey: {
      title: "Guided RAL Progression",
      subtitle: "Step-by-step evolution from concept to reflex to timeless identity",
      understand: "1. Understand RAL",
      path: "2. Choose Pathway",
      reflect: "3. 10s Pause Reset",
      diagnose: "4. Self-Diagnostic",
      practice: "5. 30-Day Plan",
      adapt: "6. Simulators",
      growth: "7. Modules & Master"
    },
    cycle: {
      title: "The Six-Stage RAL Cycle",
      subtitle: "PAUSE → PERCEIVE → REFRAME → ACT → ADJUST → GROW",
      pause: {
        name: "1. PAUSE",
        subtitle: "The Space That Saves You",
        desc: "Interrupt automatic neural hijack. Stop instinctive panic before it dictates action.",
        micro: "Exhale slowly (4s) → Drop shoulders → Say: 'Stand down.'",
        neuro: "Shifts blood flow from reactive amygdala back to prefrontal executive cortex."
      },
      perceive: {
        name: "2. PERCEIVE",
        subtitle: "Seeing Without the Story",
        desc: "Separate objective facts from emotional narratives, assumptions, and fears.",
        micro: "Ask: 'What is actually real right now, and what is my fear adding?'",
        neuro: "Reduces threat arousal and cleanses the perceptual mirror."
      },
      reframe: {
        name: "3. REFRAME",
        subtitle: "Changing the Meaning, Not the Moment",
        desc: "Transform threat into information. Explore alternative interpretations.",
        micro: "Ask: 'If this were information and not an attack, what opportunity does it reveal?'",
        neuro: "Recruits cognitive control networks to open multi-scenario flexibility."
      },
      act: {
        name: "4. ACT",
        subtitle: "Clarity in Motion",
        desc: "Move with measured precision, alignment, and calm conviction rather than rush.",
        micro: "Take one aligned, reversible step. Precision over effort.",
        neuro: "Translates cognitive coherence into decisive motor action without friction."
      },
      adjust: {
        name: "5. ADJUST",
        subtitle: "When Wisdom Becomes Habit",
        desc: "Make micro-corrections gracefully as the terrain shifts. Hold ego lightly.",
        micro: "Ask: 'What is the terrain telling me to refine right now?'",
        neuro: "Rewires behavioral loops through neural feedback and rapid adaptation."
      },
      grow: {
        name: "6. GROW",
        subtitle: "Integration, Not Introspection",
        desc: "Let experience reshape identity. Convert friction into permanent inner depth.",
        micro: "Ask: 'What did this moment reveal about myself, and who am I becoming?'",
        neuro: "Hippocampal consolidation turns lived experience into durable wisdom."
      }
    },
    matrices: {
      title: "The Four RAL Diagnostic Matrices",
      subtitle: "The world's first self-correcting leadership measurement architecture",
      raag: {
        plain: "Awareness",
        code: "RAAG",
        label: "Reflective–Adaptive Awareness Grid",
        desc: "Measures internal state in real time: emotional regulation vs cognitive flexibility."
      },
      lstm: {
        plain: "Shifting State",
        code: "LSTM",
        label: "Leadership State Transition Map",
        desc: "Charts the 6 internal shifts to break emotional hijack and return to presence."
      },
      adg: {
        plain: "Decisions",
        code: "ADG",
        label: "Adaptive Decision Grid",
        desc: "Evaluates decision quality through inner clarity matched with outer clarity."
      },
      acl: {
        plain: "Culture",
        code: "ACL",
        label: "Adaptive Culture Lattice",
        desc: "Measures hidden emotional, cognitive, and behavioural layers across teams."
      },
      weakestAlert: "Your weakest area is {matrix}. Start a 7-day drill."
    },
    lifeStages: {
      selectTitle: "Select Your Life Stage & Context",
      selectSubtitle: "RAL applies across all walks of human life, from classrooms to boardrooms to retirement.",
      changeStage: "Change Stage",
      kids: {
        title: "Kids & Young Minds",
        age: "Ages 6–12",
        desc: "Wise Owl pauses, noticing big feelings, gentle words over shouting, and playground sharing.",
        focus: "Emotional self-regulation and playful reflective breathing"
      },
      teenagers: {
        title: "Teenagers & High School",
        age: "Ages 13–18",
        desc: "Digital noise freeze, resisting peer pressure, keeping self-worth independent of social media.",
        focus: "Digital boundaries, social media clarity, self-identity"
      },
      students: {
        title: "Students & Academia",
        age: "Higher Ed & Competitive Exams",
        desc: "Exam panic reset, 4-2-6 breath, first principles reasoning, viva composure, career focus.",
        focus: "Somatic exam calmness, first-principles logic, study stamina"
      },
      professionals: {
        title: "Executives & Professionals",
        age: "Career & Leadership",
        desc: "Boardroom presence, decoupling speed from panic, ethical dilemmas, team culture lattice.",
        focus: "State before strategy, boardroom clarity, adaptive culture"
      },
      seniors: {
        title: "Retired & Seniors",
        age: "Life Reflection & Wisdom",
        desc: "Shedding identity armor, timeless mentoring, peaceful presence for family and community.",
        focus: "Presence as legacy, letting go of control, elder guidance"
      },
      teams: {
        title: "Teams & Organizations",
        age: "All Scales",
        desc: "Collective psychological safety, 10-minute huddles, cross-functional alignment, culture pulse.",
        focus: "Shared emotional safety, cognitive alignment, culture lattice"
      }
    },
    pathways: {
      individual: "Personal Inner Practice",
      individualDesc: "Confidential self-reflections, private memory vault, personal diagnostics, and 30-day habits.",
      organization: "Team & Organization Coherence",
      organizationDesc: "Multi-cohort surveys, cross-functional culture lattice, custom enterprise criteria, and SSO.",
      privacyNotice: "Strict Data Isolation: Your personal reflections, private journal, and individual diagnostics are encrypted and never exposed to organizational administrators.",
      switchToIndiv: "Switch to Personal Mode",
      switchToOrg: "Switch to Organization Mode"
    },
    author: {
      name: "RK Vedant",
      role: "Doctrine Author & Leadership Strategist",
      creds: "Former Military Commander & Executive Mentor",
      quote: "“A leader cannot lead others until they learn to lead their own mind through complexity. Leadership collapses internally long before it collapses externally.”",
      doctrineTitle: "Reflective Adaptive Leadership (RAL)",
      viewBio: "View Author Credentials & Portrait"
    },
    actions: {
      pause10s: "10s Pause Reset",
      startDiagnostic: "Start 360° Diagnostic",
      continuePractice: "Open Practice Plan",
      retakeDiagnostic: "Retake Diagnostic",
      bookCoach: "Book Executive Mentoring",
      viewToolkit: "Open One-Page Toolkit",
      saveProgress: "Save Progress",
      exportReport: "Export Leadership Report",
      openMusic: "Soothing Soundscapes",
      exploreBook: "Read the 16 Chapters"
    },
    coach: {
      title: "RAL Socratic Coach",
      subtitle: "Grounded in RK Vedant's RAL Doctrine",
      placeholder: "Ask for guidance, pause calibration, or dilemma reframing...",
      voiceInput: "Voice Input",
      voiceOutput: "Read Aloud",
      speaking: "Speaking...",
      listening: "Listening...",
      pauseMode: "10s State Reset",
      conflictMode: "Conflict Reframe",
      crisisMode: "Crisis De-escalation",
      aiReviewMode: "Decision Grid Scan",
      disclaimer: "Coaching for executive clarity and reflective mastery. Not psychiatric therapy.",
      dockTooltip: "Open Persistent RAL AI Coach",
      thinking: "Your RAL coach is reflecting..."
    },
    diagnostic: {
      title: "RAL 360° Psychometric Self-Diagnostic",
      subtitle: "Precision tool to evaluate your internal leadership architecture across the 4 RAL matrices",
      scaleDesc: "Rate yourself from 1 (Never) to 5 (Consistently)",
      compositeScore: "Composite Leadership Score",
      weakestMatrix: "Weakest Matrix Node",
      prescription: "4-Step Correction Protocol",
      never: "Never",
      rarely: "Rarely",
      sometimes: "Sometimes",
      often: "Often",
      consistently: "Consistently"
    },
    soothe: {
      title: "Restorative Instrumental Soundscapes",
      subtitle: "Over 100 acoustic combinations dynamically synchronized to your respiratory rhythm",
      breathingGuide: "Breathing Synchronization",
      inhale: "Inhale (Acoustics Swell & Awaken)",
      hold: "Hold (Harmonics Resonate & Stabilize)",
      exhale: "Exhale (Frequencies Soften & Ground)",
      instruments: "Authentic World Instruments",
      timer: "Session Duration",
      startBreathing: "Begin Soundscape",
      stopBreathing: "Pause Soundscape",
      moodTitle: "Acoustic Mood & Intent",
      soundscapesAvailable: "120+ Soundscape Combinations Available"
    }
  },

  hi: {
    brand: "आरएएल कोच",
    tagline: "आंतरिक स्पष्टता, बाह्य सामंजस्य, कालातीत नेतृत्व",
    nav: {
      home: "होम",
      coach: "कोच",
      practice: "अभ्यास",
      learn: "सीखें",
      simulator: "सिम्युलेटर",
      more: "अधिक",
      diagnostic: "मूल्यांकन",
      team: "टीम व संस्था",
      insights: "अंतर्दृष्टि",
      toolkit: "टूलकिट",
      pricing: "सदस्यता",
      admin: "प्रशासन",
      vault: "स्मृति कोष",
      research: "शोध"
    },
    welcomeHero: {
      badge: "रिफ्लेक्टिव एडेप्टिव लीडरशिप (RAL)",
      title: "पहले स्वयं का नेतृत्व करें।",
      subtitle: "5 मिनट का यह परीक्षण बताता है कि आज आपकी आंतरिक स्थिति कहाँ है। आंतरिक स्पष्टता, मानसिक बदलाव, निर्णय संतुलन और टीम सामंजस्य में महारत हासिल करें।",
      ctaCheck: "5 मिनट का परीक्षण शुरू करें",
      signIn: "पहले से खाता है? साइन इन करें",
      exploreDemo: "डेमो प्रोफाइल देखें (एलेक्स वेंस)",
      startFresh: "प्रिया के रूप में नए सिरे से शुरू करें",
      whatIsRal: "रिफ्लेक्टिव एडेप्टिव लीडरशिप क्या है?",
      ralCoreTruth: "“एक नेता तब तक दूसरों का नेतृत्व नहीं कर सकता जब तक वह जटिलता में अपने स्वयं के मन का नेतृत्व करना न सीख ले। नेतृत्व बाहर गिरने से बहुत पहले भीतर गिरता है।”",
      authorKicker: "सिद्धांतकार: आरके वेदांत · पूर्व सैन्य कमांडर एवं वरिष्ठ सलाहकार"
    },
    journey: {
      title: "आरएएल मार्गदर्शिका",
      subtitle: "सिद्धांत से आदत और स्वभाव तक का क्रमिक विकास",
      understand: "1. आरएएल समझें",
      path: "2. अपना वर्ग चुनें",
      reflect: "3. 10 सेकंड का ठहराव",
      diagnose: "4. स्व-मूल्यांकन",
      practice: "5. 30-दिवसीय योजना",
      adapt: "6. सिम्युलेटर",
      growth: "7. अध्ययन व सिद्धि"
    },
    cycle: {
      title: "छह-चरणीय आरएएल चक्र",
      subtitle: "ठहराव (PAUSE) → बोध (PERCEIVE) → पुनर्विचार (REFRAME) → कर्म (ACT) → समायोजन (ADJUST) → विकास (GROW)",
      pause: {
        name: "1. ठहराव (PAUSE)",
        subtitle: "वह मौन जो आपको बचाता है",
        desc: "अचानक प्रतिक्रिया को रोकें। घबराहट को निर्णय न बनने दें।",
        micro: "धीमी सांस छोड़ें (4s) → कंधे ढीले करें → मन से कहें: 'रिलैक्स'।",
        neuro: "अमिग्डाला की घबराहट को शांत कर प्रीफ्रंटल कॉर्टेक्स को सक्रिय करता है।"
      },
      perceive: {
        name: "2. बोध (PERCEIVE)",
        subtitle: "बिना भ्रम के देखना",
        desc: "तथ्य को डर और धारणा से अलग करके वास्तविकता को स्पष्ट देखें।",
        micro: "पूछें: 'अभी सच क्या है, और मेरा डर इसमें क्या जोड़ रहा है?'",
        neuro: "मानसिक दर्पण को स्वच्छ करता है और भावनात्मक तापमान घटाता है।"
      },
      reframe: {
        name: "3. पुनर्विचार (REFRAME)",
        subtitle: "अर्थ बदलना, स्थिति नहीं",
        desc: "खतरे को जानकारी में बदलें। दूसरे दृष्टिकोण से देखें।",
        micro: "पूछें: 'अगर यह कोई हमला नहीं बल्कि केवल जानकारी है, तो इसमें क्या अवसर है?'",
        neuro: "मस्तिष्क के लचीलेपन को बढ़ाकर नए विकल्प खोलता है।"
      },
      act: {
        name: "4. कर्म (ACT)",
        subtitle: "स्पष्टता से संचालित कर्म",
        desc: "जल्दबाजी के बजाय आंतरिक शांति और दृढ़ता से कदम उठाएं।",
        micro: "एक सटीक, सुविचारित कदम उठाएं।",
        neuro: "आंतरिक सामंजस्य को बाहरी प्रभाव में रूपांतरित करता है।"
      },
      adjust: {
        name: "5. समायोजन (ADJUST)",
        subtitle: "जब विवेक आदत बन जाए",
        desc: "अहंकार छोड़े बिना परिस्थितियों के अनुसार सूक्ष्म बदलाव करें।",
        micro: "पूछें: 'परिस्थिति मुझे क्या सुधारने का संकेत दे रही है?'",
        neuro: "न्यूरल लूप्स को नए अनुभवों के साथ अपडेट करता है।"
      },
      grow: {
        name: "6. विकास (GROW)",
        subtitle: "आत्मसात करना",
        desc: "कठिनाई को अपने व्यक्तित्व की गहराई और परिपक्वता में बदलें।",
        micro: "पूछें: 'इस पल ने मुझे मेरे बारे में क्या सिखाया?'",
        neuro: "अनुभव को स्थायी विवेक और अंतर्दृष्टि में बदलता है।"
      }
    },
    matrices: {
      title: "चार आरएएल मूल्यांकन मैट्रिसेस",
      subtitle: "नेतृत्व के आंतरिक तंत्र को मापने की वैश्विक प्रणाली",
      raag: {
        plain: "जागरूकता",
        code: "RAAG",
        label: "रिफ्लेक्टिव-एडेप्टिव अवेयरनेस ग्रिड",
        desc: "भावनात्मक नियमन और मानसिक लचीलेपन की तात्कालिक स्थिति को मापता है।"
      },
      lstm: {
        plain: "अवस्था परिवर्तन",
        code: "LSTM",
        label: "लीडरशिप स्टेट ट्रांज़िशन मैप",
        desc: "प्रतिक्रिया से शांत विवेक में जाने के 6 आंतरिक बदलाव।"
      },
      adg: {
        plain: "निर्णय",
        code: "ADG",
        label: "एडेप्टिव डिसीजन ग्रिड",
        desc: "आंतरिक स्पष्टता और बाह्य यथार्थ के तालमेल से निर्णय की गुणवत्ता परखता है।"
      },
      acl: {
        plain: "संस्कृति",
        code: "ACL",
        label: "एडेप्टिव कल्चर लैटिस",
        desc: "टीम में भावनात्मक सुरक्षा, सामूहिक सोच और व्यवहार की स्थिति को मापता है।"
      },
      weakestAlert: "आपका सबसे कमजोर क्षेत्र {matrix} है। 7-दिवसीय अभ्यास शुरू करें।"
    },
    lifeStages: {
      selectTitle: "अपनी आयु व संदर्भ चुनें",
      selectSubtitle: "आरएएल जीवन के हर चरण में लागू होता है — बच्चों से लेकर वरिष्ठ नागरिकों और कंपनियों तक।",
      changeStage: "वर्ग बदलें",
      kids: {
        title: "बच्चे (6-12 वर्ष)",
        age: "उम्र 6–12",
        desc: "समझदार उल्लू का ठहराव, गहरी सांस, चिल्लाने की जगह शांत शब्द और खिलौने बांटना।",
        focus: "भावनात्मक नियंत्रण और खेल-खेल में ठहराव"
      },
      teenagers: {
        title: "किशोर (13-18 वर्ष)",
        age: "उम्र 13–18",
        desc: "स्क्रीन और सोशल मीडिया के तनाव में विराम, सहपाठियों के दबाव से मुक्ति, अपनी पहचान की स्थिरता।",
        focus: "डिजिटल संयम और आत्मसम्मान"
      },
      students: {
        title: "विद्यार्थी एवं प्रतियोगी",
        age: "उच्च शिक्षा व परीक्षाएं",
        desc: "परीक्षा के भय में 4-2-6 सांस का ठहराव, मूल सिद्धांतों से सोच, इंटरव्यू में शांति।",
        focus: "परीक्षा में एकाग्रता और तार्किक संतुलन"
      },
      professionals: {
        title: "पेशेवर एवं अधिकारी",
        age: "कार्यक्षेत्र व नेतृत्व",
        desc: "दबाव में शांति, बोर्डरूम में विवेक, नैतिक निर्णय और टीम में विश्वास का निर्माण।",
        focus: "रणनीति से पहले मानसिक संतुलन"
      },
      seniors: {
        title: "वरिष्ठ व सेवानिवृत्त",
        age: "जीवन दर्शन व मार्गदर्शन",
        desc: "पद के अहंकार से मुक्ति, परिवार और समाज को शांतिपूर्ण मार्गदर्शन, आंतरिक संतोष।",
        focus: "शांत उपस्थिति और जीवन का सार"
      },
      teams: {
        title: "टीमें एवं संस्थाएं",
        age: "सभी संगठन",
        desc: "मनोवैज्ञानिक सुरक्षा, 10 मिनट की दैनिक बैठक, खुला संवाद और सहयोगात्मक संस्कृति।",
        focus: "सामूहिक सुरक्षा और साझा सोच"
      }
    },
    pathways: {
      individual: "व्यक्तिगत आंतरिक साधना",
      individualDesc: "गोपनीय स्व-चिंतन, निजी स्मृति कोष, व्यक्तिगत स्कोर और 30-दिवसीय अभ्यास।",
      organization: "टीम व संगठन सामंजस्य",
      organizationDesc: "विभागवार सर्वेक्षण, सामूहिक संस्कृति लैटिस, कस्टम प्रश्न और एसएसओ सुरक्षा।",
      privacyNotice: "कड़ा डेटा पृथक्करण: आपकी व्यक्तिगत डायरी और निजी मूल्यांकन कभी भी कंपनी एडमिन को नहीं दिखेंगे।",
      switchToIndiv: "व्यक्तिगत मोड",
      switchToOrg: "संस्थागत मोड"
    },
    author: {
      name: "आरके वेदांत",
      role: "सिद्धांतकार एवं नेतृत्व रणनीतिकार",
      creds: "पूर्व सैन्य कमांडर एवं वरिष्ठ कॉर्पोरेट मेंटर",
      quote: "“एक नेता तब तक दूसरों का नेतृत्व नहीं कर सकता जब तक वह जटिलता में अपने मन का नेतृत्व न कर सके।”",
      doctrineTitle: "रिफ्लेक्टिव एडेप्टिव लीडरशिप (RAL)",
      viewBio: "सिद्धांतकार का परिचय व चित्र"
    },
    actions: {
      pause10s: "10s शांत ठहराव",
      startDiagnostic: "360° मूल्यांकन शुरू करें",
      continuePractice: "30-दिवसीय अभ्यास खोलें",
      retakeDiagnostic: "पुनः मूल्यांकन लें",
      bookCoach: "मेंटर से सत्र बुक करें",
      viewToolkit: "वन-पेज टूलकिट",
      saveProgress: "प्रगति सहेजें",
      exportReport: "रिपोर्ट डाउनलोड करें",
      openMusic: "शांतिदायक वाद्य संगीत",
      exploreBook: "16 अध्याय पढ़ें"
    },
    coach: {
      title: "आरएएल सुकरात कोच",
      subtitle: "आरके वेदांत के आरएएल सिद्धांत पर आधारित",
      placeholder: "किसी चुनौती या निर्णय पर मार्गदर्शन मांगें...",
      voiceInput: "आवाज से बोलें",
      voiceOutput: "सुनें",
      speaking: "बोल रहा है...",
      listening: "सुन रहा है...",
      pauseMode: "10s ठहराव",
      conflictMode: "विवाद समाधान",
      crisisMode: "संकट प्रबंधन",
      aiReviewMode: "निर्णय जांच",
      disclaimer: "यह नेतृत्व स्पष्टता का साधन है, चिकित्सीय उपचार नहीं।",
      dockTooltip: "आरएएल कोच खोलें",
      thinking: "आपका आरएएल कोच विचार कर रहा है..."
    },
    diagnostic: {
      title: "आरएएल 360° साइकोमेट्रिक स्व-मूल्यांकन",
      subtitle: "4 मैट्रिसेस के माध्यम से अपनी आंतरिक नेतृत्व क्षमता की सटीक माप",
      scaleDesc: "1 (कभी नहीं) से 5 (हमेशा) तक अंक दें",
      compositeScore: "समग्र नेतृत्व स्कोर",
      weakestMatrix: "सबसे कमजोर मैट्रिक्स",
      prescription: "4-चरणीय सुधार प्रोटोकॉल",
      never: "कभी नहीं",
      rarely: "शायद ही कभी",
      sometimes: "कभी-कभी",
      often: "प्रायः",
      consistently: "हमेशा"
    },
    soothe: {
      title: "शांतिदायक पारंपरिक वाद्य संगीत",
      subtitle: "100 से अधिक ध्वनियां जो आपकी श्वास गति के साथ गतिशील रूप से लयबद्ध होती हैं",
      breathingGuide: "श्वास समन्वय",
      inhale: "सांस लें (ध्वनि का कोमल उभार)",
      hold: "रोकें (मधुर तरंगों की स्थिरता)",
      exhale: "सांस छोड़ें (गंभीर शांत विश्राम)",
      instruments: "पारंपरिक शास्त्रीय वाद्य",
      timer: "अवधि",
      startBreathing: "ध्वनि शुरू करें",
      stopBreathing: "ध्वनि रोकें",
      moodTitle: "मनोदशा एवं ध्येय",
      soundscapesAvailable: "120+ वाद्य संयोजन उपलब्ध"
    }
  },

  es: {
    brand: "Coach RAL",
    tagline: "Claridad Interior, Coherencia Exterior, Liderazgo Atemporal",
    nav: {
      home: "Inicio",
      coach: "Coach",
      practice: "Práctica",
      learn: "Aprender",
      simulator: "Simular",
      more: "Más",
      diagnostic: "Diagnóstico",
      team: "Equipo y Org",
      insights: "Perspectivas",
      toolkit: "Herramientas",
      pricing: "Planes",
      admin: "Admin",
      vault: "Bóveda",
      research: "Psicometría"
    },
    welcomeHero: {
      badge: "Doctrina de Liderazgo Adaptativo Reflexivo (RAL)",
      title: "Lidérate a ti mismo primero.",
      subtitle: "Una evaluación de cinco minutos revela tu estado actual. Domina la claridad interior, la transición mental, la alineación decisoria y la coherencia de equipo.",
      ctaCheck: "Iniciar prueba de 5 minutos",
      signIn: "¿Ya tienes cuenta? Iniciar sesión",
      exploreDemo: "Explorar perfil demo (Alex Vance)",
      startFresh: "Comenzar desde cero como Priya",
      whatIsRal: "¿Qué es el Liderazgo Adaptativo Reflexivo?",
      ralCoreTruth: "“Un líder no puede guiar a otros hasta que aprende a guiar su propia mente en la complejidad. El liderazgo colapsa internamente mucho antes de colapsar afuera.”",
      authorKicker: "Doctrina por RK Vedant · Excomandante Militar y Mentor Ejecutivo"
    },
    journey: {
      title: "Progresión Guiada RAL",
      subtitle: "De concepto a reflejo e identidad atemporal",
      understand: "1. Comprender RAL",
      path: "2. Elegir Camino",
      reflect: "3. Pausa de 10s",
      diagnose: "4. Autodiagnóstico",
      practice: "5. Plan 30 Días",
      adapt: "6. Simuladores",
      growth: "7. Módulos y Maestría"
    },
    cycle: {
      title: "El Ciclo RAL de Seis Etapas",
      subtitle: "PAUSA → PERCIBIR → REENFOCAR → ACTUAR → AJUSTAR → CRECER",
      pause: {
        name: "1. PAUSA (PAUSE)",
        subtitle: "El espacio que te salva",
        desc: "Interrumpe el secuestro reactivo de la amígdala antes de que dicte tus actos.",
        micro: "Exhala lento (4s) → Relaja hombros → Di: 'Detén el impulso.'",
        neuro: "Devuelve el flujo sanguíneo a la corteza prefrontal ejecutiva."
      },
      perceive: {
        name: "2. PERCIBIR (PERCEIVE)",
        subtitle: "Ver sin distorsión ni historia",
        desc: "Separa los hechos puros del miedo, suposiciones e interpretaciones sesgadas.",
        micro: "¿Qué es 100% real en este instante y qué está agregando mi temor?",
        neuro: "Limpia el espejo perceptual y calma la hipervigilancia."
      },
      reframe: {
        name: "3. REENFOCAR (REFRAME)",
        subtitle: "Cambiar el significado, no el hecho",
        desc: "Transforma la amenaza en información valiosa y abre múltiples opciones.",
        micro: "Si esto fuera información neutral y no un ataque, ¿qué oportunidad revela?",
        neuro: "Activa redes de control cognitivo y flexibilidad mental."
      },
      act: {
        name: "4. ACTUAR (ACT)",
        subtitle: "Claridad en movimiento",
        desc: "Avanza desde la serenidad y alineación interna, no desde la urgencia desbocada.",
        micro: "Da un paso alineado y reversible. Precisión sobre esfuerzo.",
        neuro: "Convierte coherencia interna en ejecución certera sin fricción."
      },
      adjust: {
        name: "5. AJUSTAR (ADJUST)",
        subtitle: "Cuando la sabiduría se vuelve hábito",
        desc: "Realiza microcorrecciones con humildad y sin apego al ego.",
        micro: "¿Qué me indica el entorno que debo afinar ahora mismo?",
        neuro: "Recalibra circuitos de predicción basados en el aprendizaje real."
      },
      grow: {
        name: "6. CRECER (GROW)",
        subtitle: "Integración, no mera introspección",
        desc: "Permite que la experiencia transforme tu identidad y temple tu presencia.",
        micro: "¿Qué reveló este momento sobre mí y en quién me estoy convirtiendo?",
        neuro: "Consolidación hipocampal que transforma vivencias en sabiduría viva."
      }
    },
    matrices: {
      title: "Las Cuatro Matrices RAL",
      subtitle: "La arquitectura de medición del liderazgo que precede al comportamiento",
      raag: {
        plain: "Conciencia",
        code: "RAAG",
        label: "Matriz de Conciencia Reflexiva-Adaptativa",
        desc: "Mide regulación emocional vs flexibilidad cognitiva en tiempo real."
      },
      lstm: {
        plain: "Transición de Estado",
        code: "LSTM",
        label: "Mapa de Transición de Estados",
        desc: "Los 6 cambios internos para desactivar la reactividad y volver al centro."
      },
      adg: {
        plain: "Decisiones",
        code: "ADG",
        label: "Matriz de Decisión Adaptativa",
        desc: "Alinea la claridad interior con la claridad del entorno antes de decidir."
      },
      acl: {
        plain: "Cultura",
        code: "ACL",
        label: "Estructura de Cultura Adaptativa",
        desc: "Diagnostica capas emocionales, cognitivas y conductuales en equipos."
      },
      weakestAlert: "Tu área más vulnerable es {matrix}. Inicia una microintervención de 7 días."
    },
    lifeStages: {
      selectTitle: "Selecciona tu Etapa de Vida y Entorno",
      selectSubtitle: "RAL aplica a todas las generaciones: infantes, jóvenes, estudiantes, ejecutivos y líderes sénior.",
      changeStage: "Cambiar Etapa",
      kids: {
        title: "Niños (6 a 12 años)",
        age: "6–12 años",
        desc: "La pausa del búho sabio, notar emociones grandes, palabras amables en vez de gritos.",
        focus: "Autorregulación emocional y respiración lúdica"
      },
      teenagers: {
        title: "Adolescentes (13 a 18 años)",
        age: "13–18 años",
        desc: "Pausa digital, resistencia a la presión social, autoestima independiente de las redes.",
        focus: "Límites digitales y claridad de identidad"
      },
      students: {
        title: "Estudiantes y Opositores",
        age: "Universidad y Exámenes",
        desc: "Reseteo ante pánico de exámenes, respiración 4-2-6, razonamiento por primeros principios.",
        focus: "Calma somática ante exámenes y enfoque"
      },
      professionals: {
        title: "Profesionales y Directivos",
        age: "Carrera y Liderazgo",
        desc: "Presencia en reuniones, desacoplar velocidad de pánico, dilemas éticos y cultura de equipo.",
        focus: "Estado antes que estrategia, claridad ejecutiva"
      },
      seniors: {
        title: "Jubilados y Veteranos",
        age: "Transición y Sabiduría",
        desc: "Desprenderse de la armadura del rol, mentoría generacional, presencia serena.",
        focus: "Presencia como legado y trascendencia"
      },
      teams: {
        title: "Equipos y Organizaciones",
        age: "Todas las escalas",
        desc: "Seguridad psicológica colectiva, sincronización diaria de 10 min, alineación sin silos.",
        focus: "Seguridad compartida y coherencia cultural"
      }
    },
    pathways: {
      individual: "Práctica Interior Personal",
      individualDesc: "Reflexiones privadas, bóveda de memoria, autodiagnóstico confidencial y hábitos de 30 días.",
      organization: "Coherencia de Equipo y Organización",
      organizationDesc: "Cohortes departamentales, encuestas anónimas, matriz de cultura colectiva y SSO.",
      privacyNotice: "Aislamiento Estricto: Tus reflexiones personales y notas privadas jamás son visibles para la empresa.",
      switchToIndiv: "Modo Personal",
      switchToOrg: "Modo Organizacional"
    },
    author: {
      name: "RK Vedant",
      role: "Autor de la Doctrina y Estratega de Liderazgo",
      creds: "Excomandante Militar y Mentor Ejecutivo",
      quote: "“Un líder no puede guiar a otros hasta que aprende a guiar su propia mente en la complejidad.”",
      doctrineTitle: "Liderazgo Adaptativo Reflexivo (RAL)",
      viewBio: "Ver Credenciales y Retrato del Autor"
    },
    actions: {
      pause10s: "Pausa de 10s",
      startDiagnostic: "Iniciar Diagnóstico 360°",
      continuePractice: "Abrir Plan de 30 Días",
      retakeDiagnostic: "Repetir Diagnóstico",
      bookCoach: "Reservar Mentoría",
      viewToolkit: "Kit de 1 Página",
      saveProgress: "Guardar Progreso",
      exportReport: "Exportar Informe",
      openMusic: "Música Restaurativa",
      exploreBook: "Leer los 16 Capítulos"
    },
    coach: {
      title: "Coach Socrático RAL",
      subtitle: "Basado en la Doctrina RAL de RK Vedant",
      placeholder: "Pide orientación, calibración o reencuadre...",
      voiceInput: "Hablar",
      voiceOutput: "Escuchar",
      speaking: "Hablando...",
      listening: "Escuchando...",
      pauseMode: "Reinicio 10s",
      conflictMode: "Reenfocar Conflicto",
      crisisMode: "Desescalar Crisis",
      aiReviewMode: "Análisis de Decisión",
      disclaimer: "Coaching para claridad ejecutiva. No es terapia psiquiátrica.",
      dockTooltip: "Abrir Coach IA RAL",
      thinking: "Tu coach RAL está reflexionando..."
    },
    diagnostic: {
      title: "Diagnóstico Psicométrico 360° RAL",
      subtitle: "Evaluación de tu arquitectura interna a través de las 4 matrices",
      scaleDesc: "Califica de 1 (Nunca) a 5 (Constantemente)",
      compositeScore: "Puntaje Compuesto",
      weakestMatrix: "Nodo Más Débil",
      prescription: "Protocolo de Corrección en 4 Pasos",
      never: "Nunca",
      rarely: "Rara vez",
      sometimes: "A veces",
      often: "A menudo",
      consistently: "Siempre"
    },
    soothe: {
      title: "Paisajes Sonoros Acústicos",
      subtitle: "Más de 100 combinaciones instrumentales sincronizadas con tu respiración",
      breathingGuide: "Guía de Respiración",
      inhale: "Inhala (Aumento armónico)",
      hold: "Sostén (Resonancia sostenida)",
      exhale: "Exhala (Grave relajación)",
      instruments: "Instrumentos del Mundo",
      timer: "Duración",
      startBreathing: "Iniciar Sonido",
      stopBreathing: "Detener Sonido",
      moodTitle: "Estado de Ánimo e Intención",
      soundscapesAvailable: "+120 Combinaciones Disponibles"
    }
  },

  fr: {
    brand: "Coach RAL",
    tagline: "Clarté Intérieure, Cohérence Extérieure, Leadership Intemporel",
    nav: {
      home: "Accueil",
      coach: "Coach",
      practice: "Pratique",
      learn: "Apprendre",
      simulator: "Simuler",
      more: "Plus",
      diagnostic: "Diagnostic",
      team: "Équipe & Org",
      insights: "Perspectives",
      toolkit: "Boîte à Outils",
      pricing: "Abonnement",
      admin: "Admin",
      vault: "Coffre-fort",
      research: "Psychométrie"
    },
    welcomeHero: {
      badge: "Doctrine de Leadership Réflexif et Adaptatif (RAL)",
      title: "Dirigez-vous d'abord vous-même.",
      subtitle: "Un bilan de cinq minutes révèle où vous en êtes aujourd'hui. Maîtrisez la clarté intérieure, la transition d'état, l'alignement décisionnel et la cohérence d'équipe.",
      ctaCheck: "Lancer le bilan de 5 minutes",
      signIn: "Déjà un compte ? Se connecter",
      exploreDemo: "Explorer le profil démo (Alex Vance)",
      startFresh: "Commencer en tant que nouveau visiteur",
      whatIsRal: "Qu'est-ce que le Leadership Réflexif et Adaptatif ?",
      ralCoreTruth: "« Un leader ne peut guider les autres tant qu'il n'a pas appris à guider son propre esprit dans la complexité. Le leadership s'effondre intérieurement bien avant de s'effondrer à l'extérieur. »",
      authorKicker: "Doctrine par RK Vedant · Ancien Commandant Militaire et Mentor Exécutif"
    },
    journey: {
      title: "Progression Guidée RAL",
      subtitle: "Du concept au réflexe et à l'identité durable",
      understand: "1. Comprendre RAL",
      path: "2. Choisir sa Voie",
      reflect: "3. Pause de 10s",
      diagnose: "4. Auto-diagnostic",
      practice: "5. Plan 30 Jours",
      adapt: "6. Simulateurs",
      growth: "7. Modules et Maîtrise"
    },
    cycle: {
      title: "Le Cycle RAL en Six Étapes",
      subtitle: "PAUSE → PERCEVOIR → RECADRER → AGIR → AJUSTER → GRANDIR",
      pause: {
        name: "1. PAUSE",
        subtitle: "L'espace qui vous sauve",
        desc: "Interrompt le court-circuit impulsif avant qu'il ne dicte votre réaction.",
        micro: "Expirez lentement (4s) → Abaissez les épaules → 'Calme intérieur'.",
        neuro: "Restaure le flux vers le cortex préfrontal exécutif."
      },
      perceive: {
        name: "2. PERCEVOIR",
        subtitle: "Voir sans l'histoire émotionnelle",
        desc: "Distingue les faits bruts des récits d'anxiété et de surenchère.",
        micro: "Qu'est-ce qui est réellement vrai ici, sans mon émotion ?",
        neuro: "Apaise l'amygdale et clarifie la perception situationnelle."
      },
      reframe: {
        name: "3. RECADRER",
        subtitle: "Changer le sens, pas la situation",
        desc: "Transforme la menace perçue en donnée et ouvre plusieurs perspectives.",
        micro: "Si ceci était une information neutre, quelle opportunité offre-t-elle ?",
        neuro: "Mobilise la flexibilité cognitive et l'analyse multicritères."
      },
      act: {
        name: "4. AGIR",
        subtitle: "La clarté en mouvement",
        desc: "Une action issue de l'alignement intérieur plutôt que de l'agitation.",
        micro: "Faites un pas précis et réversible. Précision plutôt qu'effort.",
        neuro: "Transforme la cohérence neuronale en décision sereine."
      },
      adjust: {
        name: "5. AJUSTER",
        subtitle: "Quand la sagesse devient réflexe",
        desc: "Corrigez en douceur selon le retour de la réalité, sans ego.",
        micro: "Qu'est-ce que le terrain me demande d'ajuster maintenant ?",
        neuro: "Actualise les schémas comportementaux par apprentissage continu."
      },
      grow: {
        name: "6. GRANDIR",
        subtitle: "L'intégration, pas seulement la réflexion",
        desc: "Laissez chaque épreuve forger votre maturité et votre identité profonde.",
        micro: "Qu'est-ce que cet événement m'a appris sur moi-même ?",
        neuro: "Consolidation hippocampique convertissant l'expérience en sagesse."
      }
    },
    matrices: {
      title: "Les Quatre Matrices RAL",
      subtitle: "L'architecture mesurable du leadership intérieur",
      raag: {
        plain: "Conscience",
        code: "RAAG",
        label: "Grille de Conscience Réflexive-Adaptative",
        desc: "Mesure la régulation émotionnelle face à la rigidité cognitive."
      },
      lstm: {
        plain: "Transition d'État",
        code: "LSTM",
        label: "Carte de Transition des États",
        desc: "Les 6 transitions pour passer de la réaction à la clarté sereine."
      },
      adg: {
        plain: "Décisions",
        code: "ADG",
        label: "Grille de Décision Adaptative",
        desc: "Évalue si la clarté intérieure correspond à la clarté environnementale."
      },
      acl: {
        plain: "Culture",
        code: "ACL",
        label: "Réseau de Culture Adaptative",
        desc: "Sonde la sécurité émotionnelle, la pensée partagée et l'agilité collective."
      },
      weakestAlert: "Votre point le plus vulnérable est {matrix}. Démarrez un rituel de 7 jours."
    },
    lifeStages: {
      selectTitle: "Choisissez votre étape de vie et contexte",
      selectSubtitle: "Le RAL s'applique aux enfants, ados, étudiants, dirigeants et seniors.",
      changeStage: "Changer d'Étape",
      kids: {
        title: "Enfants (6–12 ans)",
        age: "6–12 ans",
        desc: "La pause de la chouette sage, respirer, parler calmement au lieu de crier.",
        focus: "Régulation des émotions et souffle apaisant"
      },
      teenagers: {
        title: "Adolescents (13–18 ans)",
        age: "13–18 ans",
        desc: "Prendre du recul face aux écrans, résister à la pression sociale, estime de soi.",
        focus: "Frontières numériques et affirmation sereine"
      },
      students: {
        title: "Étudiants & Concours",
        age: "Enseignement Supérieur",
        desc: "Gestion du trac d'examen, souffle 4-2-6, clarté aux oraux, raisonnement méthodique.",
        focus: "Calme somatique et logique fondamentale"
      },
      professionals: {
        title: "Dirigeants & Cadres",
        age: "Carrière & Entreprise",
        desc: "Présence en comité, découpler vitesse et précipitation, dilemmes éthiques.",
        focus: "L'état avant la stratégie, présence exécutive"
      },
      seniors: {
        title: "Retraités & Aînés",
        age: "Sagesse & Transmission",
        desc: "Se détacher des titres, présence bienveillante pour la famille, transmission.",
        focus: "Présence comme héritage et sérénité"
      },
      teams: {
        title: "Équipes & Organisations",
        age: "Toutes tailles",
        desc: "Sécurité psychologique, rituels de 10 min, fin des silos, culture cohérente.",
        focus: "Vérité précoce et intelligence collective"
      }
    },
    pathways: {
      individual: "Pratique Intérieure Personnelle",
      individualDesc: "Réflexions intimes, coffre-fort de mémoire, diagnostics personnels et plan 30 jours.",
      organization: "Cohérence d'Équipe et d'Entreprise",
      organizationDesc: "Cohortes par équipe, sondages anonymisés, grille de culture collective et SSO.",
      privacyNotice: "Confidentialité Absolue : Vos réflexions et scores personnels ne sont jamais partagés avec l'administration de l'entreprise.",
      switchToIndiv: "Mode Personnel",
      switchToOrg: "Mode Organisation"
    },
    author: {
      name: "RK Vedant",
      role: "Auteur de la Doctrine & Stratège en Leadership",
      creds: "Ancien Commandant Militaire & Mentor Exécutif",
      quote: "« Un leader ne peut diriger les autres tant qu'il n'a pas appris à diriger son propre esprit dans la tempête. »",
      doctrineTitle: "Reflective Adaptive Leadership (RAL)",
      viewBio: "Voir le Portrait et les Références de l'Auteur"
    },
    actions: {
      pause10s: "Pause 10s Reset",
      startDiagnostic: "Lancer le Diagnostic 360°",
      continuePractice: "Ouvrir le Plan 30 Jours",
      retakeDiagnostic: "Refaire le Diagnostic",
      bookCoach: "Réserver un Mentorat",
      viewToolkit: "Kit 1 Page",
      saveProgress: "Enregistrer",
      exportReport: "Exporter le Bilan",
      openMusic: "Musique Restauratrice",
      exploreBook: "Lire les 16 Chapitres"
    },
    coach: {
      title: "Coach Socratique RAL",
      subtitle: "Fondé sur la Doctrine RAL de RK Vedant",
      placeholder: "Demandez conseil ou recadrez un dilemme...",
      voiceInput: "Parler",
      voiceOutput: "Écouter",
      speaking: "En cours...",
      listening: "Écoute...",
      pauseMode: "Pause 10s",
      conflictMode: "Recadrage Conflit",
      crisisMode: "Désescalade Crise",
      aiReviewMode: "Analyse Décision",
      disclaimer: "Accompagnement pour la clarté exécutive. Ne remplace pas un avis médical.",
      dockTooltip: "Ouvrir le Coach IA RAL",
      thinking: "Votre coach RAL réfléchit..."
    },
    diagnostic: {
      title: "Diagnostic Psychométrique 360° RAL",
      subtitle: "Évaluez votre architecture de leadership sur les 4 matrices fondamentales",
      scaleDesc: "Évaluez de 1 (Jamais) à 5 (Constamment)",
      compositeScore: "Score Global de Leadership",
      weakestMatrix: "Point le Plus Vulnérable",
      prescription: "Protocole de Correction en 4 Étapes",
      never: "Jamais",
      rarely: "Rarement",
      sometimes: "Parfois",
      often: "Souvent",
      consistently: "Constamment"
    },
    soothe: {
      title: "Paysages Sonores Instrumentaux",
      subtitle: "Plus de 100 ambiances acoustiques synchronisées en temps réel avec votre souffle",
      breathingGuide: "Guide Respiratoire",
      inhale: "Inspirez (Montée harmonique)",
      hold: "Retenez (Résonance stable)",
      exhale: "Expirez (Apaisement profond)",
      instruments: "Instruments Traditionnels",
      timer: "Durée",
      startBreathing: "Lancer la Musique",
      stopBreathing: "Mettre en Pause",
      moodTitle: "Ambiance & Intention",
      soundscapesAvailable: "120+ Combinaisons Disponibles"
    }
  },

  de: {
    brand: "RAL Coach",
    tagline: "Innere Klarheit, Äußere Kohärenz, Zeitlose Führung",
    nav: {
      home: "Startseite",
      coach: "Coach",
      practice: "Praxis",
      learn: "Lernen",
      simulator: "Simulator",
      more: "Mehr",
      diagnostic: "Diagnose",
      team: "Team & Org",
      insights: "Einblicke",
      toolkit: "Werkzeuge",
      pricing: "Pläne",
      admin: "Admin",
      vault: "Speicher",
      research: "Psychometrie"
    },
    welcomeHero: {
      badge: "Reflective Adaptive Leadership (RAL)",
      title: "Führe zuerst dich selbst.",
      subtitle: "Ein fünfminütiger Check zeigt Ihren aktuellen Zustand. Meistern Sie innere Klarheit, Zustandswechsel, Entscheidungsbalance und Teamkohärenz.",
      ctaCheck: "5-Minuten-Check starten",
      signIn: "Bereits registriert? Anmelden",
      exploreDemo: "Demo-Profil laden (Alex Vance)",
      startFresh: "Als neuer Besucher starten",
      whatIsRal: "Was ist Reflective Adaptive Leadership?",
      ralCoreTruth: "„Eine Führungskraft kann andere erst leiten, wenn sie ihren eigenen Geist durch Komplexität führen kann. Führung bricht innen zusammen, lange bevor es außen sichtbar wird.“",
      authorKicker: "Doktrin von RK Vedant · Ehemaliger Militärkommandeur & Executive Mentor"
    },
    journey: {
      title: "RAL Fortschrittsplan",
      subtitle: "Schritt für Schritt vom Konzept zur reflexiven Identität",
      understand: "1. RAL Verstehen",
      path: "2. Lebenspfad Wählen",
      reflect: "3. 10s Pause",
      diagnose: "4. Selbstdiagnose",
      practice: "5. 30-Tage-Plan",
      adapt: "6. Simulatoren",
      growth: "7. Meisterschaft"
    },
    cycle: {
      title: "Der 6-Stufen RAL Zyklus",
      subtitle: "INNEHALTEN → WAHRNEHMEN → NEU BEWERTEN → HANDELN → ANPASSEN → WACHSEN",
      pause: {
        name: "1. INNEHALTEN (PAUSE)",
        subtitle: "Der rettende Raum",
        desc: "Unterbricht impulsives Reagieren, bevor der Adrenalinschub Entscheidungen übernimmt.",
        micro: "Langsam ausatmen (4s) → Schultern senken → 'Innehalten'.",
        neuro: "Aktiviert den präfrontalen Kortex und beruhigt die Amygdala."
      },
      perceive: {
        name: "2. WAHRNEHMEN (PERCEIVE)",
        subtitle: "Sehen ohne Verzerrung",
        desc: "Trennt Fakten von Vermutungen, Ängsten und alten Narrativen.",
        micro: "Fragen: 'Was ist jetzt objektiv real und was dichtet meine Sorge hinzu?'",
        neuro: "Klärt die Wahrnehmung und senkt emotionale Hitze."
      },
      reframe: {
        name: "3. NEU BEWERTEN (REFRAME)",
        subtitle: "Bedeutung wandeln",
        desc: "Verwandelt Bedrohung in Information und eröffnet neue Perspektiven.",
        micro: "Fragen: 'Wenn dies Information und kein Angriff wäre, was lerne ich?'",
        neuro: "Aktiviert kognitive Flexibilität für Mehr-Szenarien-Denken."
      },
      act: {
        name: "4. HANDELN (ACT)",
        subtitle: "Klarheit in Bewegung",
        desc: "Handeln aus innerer Zentriertheit statt aus überhasteter Dringlichkeit.",
        micro: "Einen klaren, reversiblen Schritt tun. Präzision vor Kraftaufwand.",
        neuro: "Verbindet neuronale Kohärenz mit zielgerichtetem Handeln."
      },
      adjust: {
        name: "5. ANPASSEN (ADJUST)",
        subtitle: "Wenn Weisheit zur Gewohnheit wird",
        desc: "Feinjustierungen ohne Ego durchführen, sobald sich die Lage ändert.",
        micro: "Fragen: 'Was signalisiert die Umgebung, das ich jetzt nachjustieren sollte?'",
        neuro: "Kalibriert neuronale Reaktionsmuster im Echtzeit-Lernen."
      },
      grow: {
        name: "6. WACHSEN (GROW)",
        subtitle: "Integration statt bloßes Nachdenken",
        desc: "Erfahrungen in innere Reife und unerschütterliche Präsenz transformieren.",
        micro: "Fragen: 'Was hat dieser Moment über mich selbst enthüllt?'",
        neuro: "Hippocampale Konsolidierung überführt Erfahrung in dauerhafte Weisheit."
      }
    },
    matrices: {
      title: "Die vier RAL-Matrizen",
      subtitle: "Die wissenschaftliche Führungsarchitektur zur Messung innerer Zustände",
      raag: {
        plain: "Achtsamkeit",
        code: "RAAG",
        label: "Reflective–Adaptive Awareness Grid",
        desc: "Misst emotionale Regulation gegenüber kognitiver Starrheit in Echtzeit."
      },
      lstm: {
        plain: "Zustandswechsel",
        code: "LSTM",
        label: "Leadership State Transition Map",
        desc: "Die 6 internen Übergänge von reaktiver Panik zu reflexiver Klarheit."
      },
      adg: {
        plain: "Entscheidungen",
        code: "ADG",
        label: "Adaptive Decision Grid",
        desc: "Prüft, ob innere Klarheit mit äußerer Lage übereinstimmt."
      },
      acl: {
        plain: "Kultur",
        code: "ACL",
        label: "Adaptive Culture Lattice",
        desc: "Erfasst emotionale Sicherheit, gemeinsames Verständnis und Verhaltensmuster."
      },
      weakestAlert: "Ihr schwächster Bereich ist {matrix}. Starten Sie eine 7-Tage-Intervention."
    },
    lifeStages: {
      selectTitle: "Wählen Sie Ihre Lebensphase & Kontext",
      selectSubtitle: "RAL entfaltet Wirkung vom Schulkind über Spitzenmanager bis zum Ruhestand.",
      changeStage: "Phase Wechseln",
      kids: {
        title: "Kinder (6–12 Jahre)",
        age: "6–12 Jahre",
        desc: "Die Pause der weisen Eule, große Gefühle bemerken, ruhige Worte statt Schreien.",
        focus: "Emotionale Selbstregulation und spielerisches Innehalten"
      },
      teenagers: {
        title: "Jugendliche (13–18 Jahre)",
        age: "13–18 Jahre",
        desc: "Digitaler Stopp, Gruppendruck widerstehen, Selbstwert unabhängig von Likes bewahren.",
        focus: "Digitale Grenzen und Identitätsfindung"
      },
      students: {
        title: "Studenten & Prüfungen",
        age: "Hochschule & Examen",
        desc: "Prüfungsangst mit 4-2-6 Atem resetten, Denken aus Grundprinzipien, Ruhe im Kolloquium.",
        focus: "Körperliche Gelassenheit und logische Klarheit"
      },
      professionals: {
        title: "Führungskräfte & Experten",
        age: "Karriere & Management",
        desc: "Präsenz im Sitzungssaal, Hektik von Panik entkoppeln, ethische Führung, Teamkultur.",
        focus: "Zustand vor Strategie, Vorstandsklarheit"
      },
      seniors: {
        title: "Senioren & Mentoren",
        age: "Lebensrückblick & Weisheit",
        desc: "Rollenpanzer ablegen, gelassene Präsenz, generationsübergreifende Begleitung.",
        focus: "Präsenz als Vermächtnis und Gelassenheit"
      },
      teams: {
        title: "Teams & Organisationen",
        age: "Alle Größen",
        desc: "Psychologische Sicherheit, tägliche 10-Minuten-Huddles, abteilungsübergreifende Ausrichtung.",
        focus: "Gemeinsame Wahrheit und Kulturkohärenz"
      }
    },
    pathways: {
      individual: "Persönliche Innere Praxis",
      individualDesc: "Vertrauliche Reflexionen, privater Wissensspeicher, persönliche Diagnosen und 30-Tage-Plan.",
      organization: "Team- & Organisationskohärenz",
      organizationDesc: "Kohorten-Befragungen, Kultur-Lattice, firmenspezifische Kriterien und SSO.",
      privacyNotice: "Strikte Datenisolierung: Ihre privaten Einträge und Bewertungen werden niemals an Unternehmensadministratoren weitergegeben.",
      switchToIndiv: "Persönlicher Modus",
      switchToOrg: "Organisationsmodus"
    },
    author: {
      name: "RK Vedant",
      role: "Doktrin-Autor & Führungsstratege",
      creds: "Ehemaliger Militärkommandeur & Executive Mentor",
      quote: "„Eine Führungskraft kann andere erst leiten, wenn sie ihren eigenen Geist durch Komplexität führen kann.“",
      doctrineTitle: "Reflective Adaptive Leadership (RAL)",
      viewBio: "Autorenporträt & Referenzen ansehen"
    },
    actions: {
      pause10s: "10s Pause Reset",
      startDiagnostic: "360° Diagnose Starten",
      continuePractice: "30-Tage-Plan Öffnen",
      retakeDiagnostic: "Diagnose Wiederholen",
      bookCoach: "Executive Mentoring Buchen",
      viewToolkit: "Ein-Seiten-Toolkit",
      saveProgress: "Fortschritt Speichern",
      exportReport: "Bericht Exportieren",
      openMusic: "Klangwelten Öffnen",
      exploreBook: "Alle 16 Kapitel Lesen"
    },
    coach: {
      title: "RAL Sokratischer Coach",
      subtitle: "Basiert auf RK Vedants RAL-Doktrin",
      placeholder: "Fragen Sie nach Führungsklarheit oder Dilemma-Reframe...",
      voiceInput: "Sprechen",
      voiceOutput: "Vorlesen",
      speaking: "Spricht...",
      listening: "Hört zu...",
      pauseMode: "10s Reset",
      conflictMode: "Konflikt Reframe",
      crisisMode: "Krisen-Deeskalation",
      aiReviewMode: "Entscheidungs-Check",
      disclaimer: "Coaching für Führungsklarheit. Keine psychotherapeutische Behandlung.",
      dockTooltip: "RAL AI Coach Öffnen",
      thinking: "Ihr RAL Coach reflektiert..."
    },
    diagnostic: {
      title: "RAL 360° Psychometrische Selbstdiagnose",
      subtitle: "Messung Ihrer inneren Führungsarchitektur über die 4 Matrizen",
      scaleDesc: "Bewerten Sie von 1 (Nie) bis 5 (Immer)",
      compositeScore: "Gesamter Führungsscore",
      weakestMatrix: "Schwächste Matrix",
      prescription: "4-Schritte-Korrekturprotokoll",
      never: "Nie",
      rarely: "Selten",
      sometimes: "Manchmal",
      often: "Oft",
      consistently: "Immer"
    },
    soothe: {
      title: "Regenerative Akustische Klangwelten",
      subtitle: "Über 100 Klangkombinationen, atemsynchron moduliert für maximale Entlastung",
      breathingGuide: "Atemführung",
      inhale: "Einatmen (Harmonische Schwellung)",
      hold: "Halten (Stabiler Klangteppich)",
      exhale: "Ausatmen (Sanfte tiefe Erdung)",
      instruments: "Traditionelle Weltinstrumente",
      timer: "Sitzungsdauer",
      startBreathing: "Klang Starten",
      stopBreathing: "Klang Anhalten",
      moodTitle: "Stimmung & Absicht",
      soundscapesAvailable: "Über 120 Kombinationen verfügbar"
    }
  },

  ar: {
    brand: "مدرب RAL",
    tagline: "الوضوح الداخلي، التماسك الخارجي، القيادة الخالدة",
    nav: {
      home: "الرئيسية",
      coach: "المدرب",
      practice: "الممارسة",
      learn: "التعلم",
      simulator: "المحاكاة",
      more: "المزيد",
      diagnostic: "التقييم",
      team: "الفريق والمؤسسة",
      insights: "الرؤى",
      toolkit: "الأدوات",
      pricing: "الاشتراك",
      admin: "الإدارة",
      vault: "خزينة الذاكرة",
      research: "الأبحاث"
    },
    welcomeHero: {
      badge: "عقيدة القيادة التكيفية التأملية (RAL)",
      title: "قد نفسك أولاً.",
      subtitle: "تقييم من خمس دقائق يوضح لك أين تقف داخلياً اليوم. أتقن الوضوح الداخلي، والتحول الذهني، واتزان القرارات، وتماسك الفريق.",
      ctaCheck: "ابدأ الفحص في 5 دقائق",
      signIn: "لديك ملف شخصي؟ تسجيل الدخول",
      exploreDemo: "استكشف الملف التجريبي (أليكس فانس)",
      startFresh: "ابدأ كزائر جديد (بريا)",
      whatIsRal: "ما هي القيادة التكيفية التأملية (RAL)؟",
      ralCoreTruth: "«لا يمكن للقائد أن يقود الآخرين حتى يتعلم كيف يقود عقله عبر التعقيد. القيادة تنهار من الداخل قبل أن تنهار في العالم الخارجي.»",
      authorKicker: "المؤلف: آر كيه فيدانت · قائد عسكري سابق وخبير تنفيذي"
    },
    journey: {
      title: "مسار RAL الإرشادي",
      subtitle: "من المفهوم النظري إلى العادة والهوية الدائمة",
      understand: "1. فهم العقيدة",
      path: "2. اختيار المسار",
      reflect: "3. توقف 10 ثوانٍ",
      diagnose: "4. التقييم الذاتي",
      practice: "5. خطة 30 يوماً",
      adapt: "6. المحاكيات",
      growth: "7. الدراسة والتمكن"
    },
    cycle: {
      title: "دورة RAL السداسية",
      subtitle: "توقف → أدرك → أعد الصياغة → تصرف → اضبط → انمُ",
      pause: {
        name: "1. التوقف (PAUSE)",
        subtitle: "المساحة التي تنقذك",
        desc: "أوقف رد الفعل التلقائي قبل أن يتحول التوتر إلى قرارات عمياء.",
        micro: "ازفر ببطء (4 ثوانٍ) → أرخِ كتفيك → قل لنفسك: 'اهدأ'.",
        neuro: "يعيد تدفق الدم إلى القشرة الجبهية التنفيذية ويهدئ اللوزة الدماغية."
      },
      perceive: {
        name: "2. الإدراك (PERCEIVE)",
        subtitle: "الرؤية دون قصة عاطفية",
        desc: "افصل الحقائق المجردة عن الأوهام والمخاوف والافتراضات المسبقة.",
        micro: "اسأل: 'ما هو الواقع الفعلي هنا، وما الذي يضيفه خوفي؟'",
        neuro: "ينظف مرآة الإدراك ويخفض درجة الحرارة العاطفية."
      },
      reframe: {
        name: "3. إعادة الصياغة (REFRAME)",
        subtitle: "تغيير المعنى وليس الحدث",
        desc: "حول التهديد إلى معلومة تفتح أمامك خيارات وحلولاً جديدة.",
        micro: "إذا كانت هذه معلومة وليست هجوماً، فما الفرصة التي تخبئها؟",
        neuro: "ينشط المرونة الإدراكية والتفكير متعدد السيناريوهات."
      },
      act: {
        name: "4. التصرف (ACT)",
        subtitle: "الوضوح في حالة حركة",
        desc: "تحرك من منطلق الاتزان الداخلي واليقين، وليس بدافع العجلة.",
        micro: "اتخذ خطوة واحدة دقيقة وقابلة للتعديل. الدقة تتفوق على الاندفاع.",
        neuro: "يترجم التماسك العصبي إلى قرار واثق بلا احتكاك."
      },
      adjust: {
        name: "5. الضبط (ADJUST)",
        subtitle: "حين تصبح الحكمة عادة",
        desc: "أجرِ تعديلات دقيقة ومرنة مع تغير الواقع، دون عناد أو كبرياء.",
        micro: "اسأل: 'ما الذي تخبرني به البيئة لأعدله الآن؟'",
        neuro: "يعيد معايرة الدوائر العصبية عبر التعلم الميداني السريع."
      },
      grow: {
        name: "6. النمو (GROW)",
        subtitle: "الاندماج وليس مجرد التأمل",
        desc: "دع التجارب تصقل هويتك وتعمق هدوءك وحكمتك الدائمة.",
        micro: "اسأل: 'ماذا كشفت هذه اللحظة عن ذاتي وكيف أتطور؟'",
        neuro: "التثبيت في الحصين يحول التجربة الحية إلى حكمة دائمة."
      }
    },
    matrices: {
      title: "مصفوفات RAL الأربع للتقييم",
      subtitle: "أول نظام عالمي لقياس العمليات الداخلية للقيادة",
      raag: {
        plain: "الوعي",
        code: "RAAG",
        label: "شبكة الوعي التأملي التكيفي",
        desc: "تقيس التنظيم العاطفي مقابل المرونة الإدراكية لحظة بلحظة."
      },
      lstm: {
        plain: "تحول الحالة",
        code: "LSTM",
        label: "خريطة التحول بين الحالات القيادية",
        desc: "التحولات الداخلية الستة للخروج من الرد التلقائي نحو الحضور الذهني."
      },
      adg: {
        plain: "القرارات",
        code: "ADG",
        label: "شبكة القرار التكيفي",
        desc: "تختبر مدى توافق الوضوح الداخلي مع وضوح الواقع المحيط."
      },
      acl: {
        plain: "الثقافة",
        code: "ACL",
        label: "نسيج الثقافة التكيفية",
        desc: "تقيس الأمان النفسي، والتفكير المشترك، والسلوك التكيفي في المؤسسة."
      },
      weakestAlert: "أضعف نقطة لديك هي {matrix}. ابدأ تدريباً مكثفاً لسبعة أيام."
    },
    lifeStages: {
      selectTitle: "اختر مرحلتك وسياقك الحياتي",
      selectSubtitle: "تنطبق فلسفة RAL على الأطفال، والمراهقين، والطلاب، والقادة، والمتقاعدين.",
      changeStage: "تغيير المرحلة",
      kids: {
        title: "الأطفال (6–12 سنة)",
        age: "6–12 سنة",
        desc: "وقفة البومة الحكيمة، الانتباه للمشاعر الكبيرة، استخدام الكلمات بدلاً من الصراخ.",
        focus: "التنظيم الذاتي والتنفس الهادئ"
      },
      teenagers: {
        title: "المراهقون (13–18 سنة)",
        age: "13–18 سنة",
        desc: "التوقف الرقمي، مقاومة الضغط الاجتماعي، استقلال القيمة الذاتية عن المنصات.",
        focus: "الحدود الرقمية واستقرار الهوية"
      },
      students: {
        title: "الطلاب والجامعيون",
        age: "التعليم العالي والامتحانات",
        desc: "التغلب على ذعر الاختبارات عبر تنفس 4-2-6، التفكير من المبادئ الأولى، الهدوء في المقابلات.",
        focus: "الهدوء الجسدي والتركيز الفكري"
      },
      professionals: {
        title: "التنفيذيون والمهنيون",
        age: "العمل والقيادة",
        desc: "الحضور في الاجتماعات الكبرى، فصل السرعة عن الذعر، الأخلاقيات، وثقافة الفريق.",
        focus: "الحالة قبل الاستراتيجية، وضوح القرار"
      },
      seniors: {
        title: "المتقاعدون والحكماء",
        age: "التأمل ونقل الحكمة",
        desc: "التخلي عن درع المناصب، الحضور المطمئن للعائلة والمجتمع، الإرشاد الهادئ.",
        focus: "الحضور كإرث وسلام داخلي"
      },
      teams: {
        title: "فرق العمل والمؤسسات",
        age: "كافة الأحجام",
        desc: "الأمان النفسي، الاجتماعات اليومية المصغرة، كسر الحواجز الإدارية، الثقافة المشتركة.",
        focus: "الأمان المشترك والتماسك المؤسسي"
      }
    },
    pathways: {
      individual: "الممارسة الداخلية الفردية",
      individualDesc: "تأملات شخصية مشفرة، خزينة ذاكرة خاصة، تقييمات فردية وخطة 30 يوماً.",
      organization: "تماسك الفريق والمؤسسة",
      organizationDesc: "استطلاعات جماعية مجهولة الهوية، نسيج ثقافة المؤسسة، أسئلة مخصصة ودخول SSO.",
      privacyNotice: "عزل أمني تام: ملاحظاتك الشخصية وتقييماتك الفردية لا يمكن لإدارة الشركة الاطلاع عليها مطلقاً.",
      switchToIndiv: "الوضع الفردي",
      switchToOrg: "وضع المؤسسة"
    },
    author: {
      name: "آر كيه فيدانت",
      role: "مؤلف العقيدة وخبير استراتيجيات القيادة",
      creds: "قائد عسكري سابق ومرشد تنفيذي رفيع",
      quote: "«لا يمكن للقائد أن يقود الآخرين حتى يتعلم كيف يقود عقله عبر التعقيد.»",
      doctrineTitle: "القيادة التكيفية التأملية (RAL)",
      viewBio: "عرض صورة واعتمادات المؤلف"
    },
    actions: {
      pause10s: "توقف 10 ثوانٍ",
      startDiagnostic: "بدء التقييم الشامل 360°",
      continuePractice: "فتح خطة 30 يوماً",
      retakeDiagnostic: "إعادة التقييم",
      bookCoach: "حجز جلسة توجيه",
      viewToolkit: "أدوات الصفحة الواحدة",
      saveProgress: "حفظ التقدم",
      exportReport: "تصدير التقرير",
      openMusic: "الأجواء الصوتية المهدئة",
      exploreBook: "قراءة الفصول الستة عشر"
    },
    coach: {
      title: "مدرب RAL السقراطي",
      subtitle: "مستند لعقيدة RAL لآر كيه فيدانت",
      placeholder: "اطلب توجيهاً، أو إعادة صياغة معضلة قيادية...",
      voiceInput: "تحدث",
      voiceOutput: "استمع",
      speaking: "يتحدث...",
      listening: "يستمع...",
      pauseMode: "توقف 10 ثوانٍ",
      conflictMode: "إعادة صياغة الخلاف",
      crisisMode: "تهدئة الأزمات",
      aiReviewMode: "فحص القرارات",
      disclaimer: "أداة تدريبية للوضوح القيادي وليست بديلاً عن العلاج النفسي.",
      dockTooltip: "فتح مدرب RAL الذكي",
      thinking: "مدرب RAL يفكر في معضلتك..."
    },
    diagnostic: {
      title: "التقييم السيكومتري الشامل 360°",
      subtitle: "أداة دقيقة لقياس بنيتك القيادية الداخلية عبر مصفوفات RAL الأربع",
      scaleDesc: "قيم نفسك من 1 (أبداً) إلى 5 (دائماً)",
      compositeScore: "الدرجة القيادية الإجمالية",
      weakestMatrix: "المصفوفة الأضعف",
      prescription: "بروتوكول التصحيح الرباعي",
      never: "أبداً",
      rarely: "نادراً",
      sometimes: "أحياناً",
      often: "غالباً",
      consistently: "دائماً"
    },
    soothe: {
      title: "المشاهد الصوتية الآلية المريحة",
      subtitle: "أكثر من 100 توليفة موسيقية حية تتناغم ديناميكياً مع نمط تنفسك",
      breathingGuide: "دليل التنفس",
      inhale: "شهيق (ارتفاع النغمات وتفتحها)",
      hold: "حبس النفس (رنين توافقي متزن)",
      exhale: "زفير (انسياب عميق يبعث على السكينة)",
      instruments: "آلات شرقية وعالمية أصيلة",
      timer: "المدة",
      startBreathing: "تشغيل المشهد الصوتي",
      stopBreathing: "إيقاف مؤقت",
      moodTitle: "الحالة والمقصد الصوتي",
      soundscapesAvailable: "أكثر من 120 توليفة متاحة"
    }
  },

  pt: {
    brand: "Coach RAL",
    tagline: "Clareza Interior, Coerência Exterior, Liderança Atemporal",
    nav: {
      home: "Início",
      coach: "Coach",
      practice: "Prática",
      learn: "Aprender",
      simulator: "Simular",
      more: "Mais",
      diagnostic: "Diagnóstico",
      team: "Equipe e Org",
      insights: "Perspectivas",
      toolkit: "Ferramentas",
      pricing: "Planos",
      admin: "Admin",
      vault: "Cofre",
      research: "Psicometria"
    },
    welcomeHero: {
      badge: "Doutrina de Liderança Reflexiva e Adaptativa (RAL)",
      title: "Lidere a si mesmo primeiro.",
      subtitle: "Um diagnóstico de cinco minutos revela onde você está hoje. Domine clareza interna, transição de estado, alinhamento de decisões e coerência de equipe.",
      ctaCheck: "Iniciar avaliação de 5 minutos",
      signIn: "Já tem conta? Entrar",
      exploreDemo: "Ver perfil de demonstração (Alex Vance)",
      startFresh: "Começar do zero como novo visitante",
      whatIsRal: "O que é Liderança Reflexiva e Adaptativa?",
      ralCoreTruth: "“Um líder não pode guiar os outros até que aprenda a guiar sua própria mente na complexidade. A liderança entra em colapso internamente muito antes de ruir externamente.”",
      authorKicker: "Doutrina por RK Vedant · Ex-Comandante Militar e Mentor Executivo"
    },
    journey: {
      title: "Progressão Guiada RAL",
      subtitle: "Do conceito ao reflexo e à identidade atemporal",
      understand: "1. Compreender RAL",
      path: "2. Escolher Caminho",
      reflect: "3. Pausa de 10s",
      diagnose: "4. Autodiagnóstico",
      practice: "5. Plano de 30 Dias",
      adapt: "6. Simuladores",
      growth: "7. Módulos e Maestria"
    },
    cycle: {
      title: "O Ciclo RAL de Seis Estágios",
      subtitle: "PAUSA → PERCEBER → RESSIGNIFICAR → AGIR → AJUSTAR → CRESCER",
      pause: {
        name: "1. PAUSA (PAUSE)",
        subtitle: "O espaço que salva você",
        desc: "Interrompe o sequestro reativo antes que o medo dite seus atos.",
        micro: "Expire devagar (4s) → Baixe os ombros → Diga: 'Recue o impulso.'",
        neuro: "Restaura o fluxo para o córtex pré-frontal executivo."
      },
      perceive: {
        name: "2. PERCEBER (PERCEIVE)",
        subtitle: "Ver sem a narrativa emocional",
        desc: "Separa os fatos reais das histórias de ansiedade e projeções do ego.",
        micro: "Pergunte: 'O que é verdade objetiva aqui e o que meu medo acrescentou?'",
        neuro: "Acalma a amígdala e clareia o espelho perceptivo."
      },
      reframe: {
        name: "3. RESSIGNIFICAR (REFRAME)",
        subtitle: "Mudar o sentido, não o momento",
        desc: "Transforma a ameaça em informação útil e revela novas opções.",
        micro: "Se isto fosse apenas informação e não um ataque, que oportunidade traz?",
        neuro: "Mobiliza redes de controle e flexibilidade cognitiva."
      },
      act: {
        name: "4. AGIR (ACT)",
        subtitle: "Clareza em movimento",
        desc: "Ação que nasce do alinhamento sereno, não da pressa desordenada.",
        micro: "Dê um passo alinhado e reversível. Precisão antes do esforço.",
        neuro: "Converte coerência neural em decisão firme sem atrito."
      },
      adjust: {
        name: "5. AJUSTAR (ADJUST)",
        subtitle: "Quando a sabedoria vira hábito",
        desc: "Ajustes suaves em tempo real com humildade e sem apego ao ego.",
        micro: "Pergunte: 'O que a realidade está me pedindo para calibrar agora?'",
        neuro: "Recalibra circuitos neurais por aprendizado prático contínuo."
      },
      grow: {
        name: "6. CRESCER (GROW)",
        subtitle: "Integração viva, não mera teoria",
        desc: "Deixe cada atrito amadurecer sua identidade e solidez de presença.",
        micro: "Pergunte: 'O que este momento revelou sobre quem eu sou?'",
        neuro: "A consolidação no hipocampo transforma experiência em sabedoria permanente."
      }
    },
    matrices: {
      title: "As Quatro Matrizes RAL",
      subtitle: "A arquitetura de medição da liderança antes da ação externa",
      raag: {
        plain: "Consciência",
        code: "RAAG",
        label: "Grade de Consciência Reflexiva-Adaptativa",
        desc: "Mede regulação emocional versus flexibilidade cognitiva em tempo real."
      },
      lstm: {
        plain: "Mudança de Estado",
        code: "LSTM",
        label: "Mapa de Transição de Estado",
        desc: "Os 6 passos internos para desarmar a reação e voltar à presença."
      },
      adg: {
        plain: "Decisões",
        code: "ADG",
        label: "Grade de Decisão Adaptativa",
        desc: "Avalia a correspondência entre clareza interior e clareza do ambiente."
      },
      acl: {
        plain: "Cultura",
        code: "ACL",
        label: "Malha de Cultura Adaptativa",
        desc: "Diagnostica segurança emocional, pensamento compartilhado e agilidade em equipes."
      },
      weakestAlert: "Seu ponto mais vulnerável é {matrix}. Comece uma intervenção de 7 dias."
    },
    lifeStages: {
      selectTitle: "Selecione sua Fase de Vida e Contexto",
      selectSubtitle: "RAL é aplicável a crianças, jovens, estudantes, executivos e aposentados.",
      changeStage: "Alterar Fase",
      kids: {
        title: "Crianças (6–12 anos)",
        age: "6–12 anos",
        desc: "A pausa da coruja sábia, respirar fundo, palavras gentis em vez de gritos.",
        focus: "Autorregulação emocional e respiração lúdica"
      },
      teenagers: {
        title: "Adolescentes (13–18 anos)",
        age: "13–18 anos",
        desc: "Pausa digital, firmeza contra pressão dos colegas, autoimagem estável.",
        focus: "Limites digitais e clareza de identidade"
      },
      students: {
        title: "Estudantes e Vestibulandos",
        age: "Ensino Superior e Concursos",
        desc: "Superar pânico de provas com respiração 4-2-6, raciocínio por primeiros princípios.",
        focus: "Calma somática e foco analítico"
      },
      professionals: {
        title: "Profissionais e Executivos",
        age: "Carreira e Liderança",
        desc: "Presença em reuniões de alta pressão, separar pressa de pânico, ética e cultura.",
        focus: "Estado antes da estratégia, clareza diretiva"
      },
      seniors: {
        title: "Aposentados e Mentores",
        age: "Reflexão de Vida e Sabedoria",
        desc: "Despir a armadura do cargo, presença serena para a família e conselho.",
        focus: "Presença como legado e serenidade"
      },
      teams: {
        title: "Equipes e Organizações",
        age: "Todos os portes",
        desc: "Segurança psicológica, reuniões diárias de 10 min, eliminação de silos e alinhamento.",
        focus: "Segurança compartilhada e coesão cultural"
      }
    },
    pathways: {
      individual: "Prática Interior Individual",
      individualDesc: "Reflexões privadas, cofre de memória, autodiagnóstico sigiloso e hábitos de 30 dias.",
      organization: "Coerência de Equipe e Organização",
      organizationDesc: "Pesquisas anônimas por coortes, malha de cultura coletiva, critérios sob medida e SSO.",
      privacyNotice: "Isolamento Estrito: Suas notas íntimas e scores individuais nunca são exibidos para administradores corporativos.",
      switchToIndiv: "Modo Individual",
      switchToOrg: "Modo Organização"
    },
    author: {
      name: "RK Vedant",
      role: "Autor da Doutrina e Estrategista de Liderança",
      creds: "Ex-Comandante Militar e Mentor Executivo",
      quote: "“Um líder não pode guiar os outros até que aprenda a guiar sua própria mente na complexidade.”",
      doctrineTitle: "Reflective Adaptive Leadership (RAL)",
      viewBio: "Ver Credenciais e Retrato Oficial"
    },
    actions: {
      pause10s: "Pausa de 10s",
      startDiagnostic: "Iniciar Diagnóstico 360°",
      continuePractice: "Abrir Plano de 30 Dias",
      retakeDiagnostic: "Repetir Diagnóstico",
      bookCoach: "Agendar Mentoria",
      viewToolkit: "Kit de 1 Página",
      saveProgress: "Salvar Progresso",
      exportReport: "Exportar Relatório",
      openMusic: "Música Restaurativa",
      exploreBook: "Ler os 16 Capítulos"
    },
    coach: {
      title: "Coach Socrático RAL",
      subtitle: "Fundamentado na Doutrina RAL de RK Vedant",
      placeholder: "Peça conselhos ou ressignifique um dilema...",
      voiceInput: "Falar",
      voiceOutput: "Ouvir",
      speaking: "Falando...",
      listening: "Ouvindo...",
      pauseMode: "Reset 10s",
      conflictMode: "Ressignificar Conflito",
      crisisMode: "Desescalar Crise",
      aiReviewMode: "Análise de Decisão",
      disclaimer: "Mentoria para clareza executiva. Não substitui terapia psicológica.",
      dockTooltip: "Abrir Coach IA RAL",
      thinking: "Seu coach RAL está refletindo..."
    },
    diagnostic: {
      title: "Diagnóstico Psicométrico 360° RAL",
      subtitle: "Avalie sua arquitetura interna através das quatro matrizes RAL",
      scaleDesc: "Classifique de 1 (Nunca) a 5 (Consistentemente)",
      compositeScore: "Pontuação Composta",
      weakestMatrix: "Ponto Mais Frágil",
      prescription: "Protocolo de Correção em 4 Etapas",
      never: "Nunca",
      rarely: "Raramente",
      sometimes: "Às vezes",
      often: "Frequentemente",
      consistently: "Consistentemente"
    },
    soothe: {
      title: "Paisagens Sonoras Restaurativas",
      subtitle: "Mais de 100 timbres acústicos sincronizados dinamicamente com seu ritmo respiratório",
      breathingGuide: "Guia de Respiração",
      inhale: "Inspire (Crescendo acústico)",
      hold: "Segure (Harmônicos estáveis)",
      exhale: "Expire (Grave aterramento)",
      instruments: "Instrumentos do Mundo",
      timer: "Duração",
      startBreathing: "Tocar Música",
      stopBreathing: "Pausar",
      moodTitle: "Estado de Espírito & Intenção",
      soundscapesAvailable: "Mais de 120 Combinações Disponíveis"
    }
  },

  ja: {
    brand: "RALコーチ",
    tagline: "内なる明晰さ、外なる調和、時代を超越するリーダーシップ",
    nav: {
      home: "ホーム",
      coach: "コーチ",
      practice: "実践",
      learn: "学ぶ",
      simulator: "シミュレーション",
      more: "その他",
      diagnostic: "診断",
      team: "チームと組織",
      insights: "洞察",
      toolkit: "ツールキット",
      pricing: "プラン",
      admin: "管理",
      vault: "メモリ保管庫",
      research: "心理測定学"
    },
    welcomeHero: {
      badge: "内省的適応リーダーシップ (RAL) ドクトリン",
      title: "まず己を導け。",
      subtitle: "5分間の診断であなたの現在の内面状態を可視化します。内なる静寂、状態の切り替え、判断の整合性、チームの調和を体得してください。",
      ctaCheck: "5分間の診断を開始する",
      signIn: "プロファイルをお持ちですか？ ログイン",
      exploreDemo: "デモプロファイルを探索 (Alex Vance)",
      startFresh: "新規訪問者として開始する",
      whatIsRal: "内省的適応リーダーシップ (RAL) とは？",
      ralCoreTruth: "「複雑さの中で自らの心を導くことを学ばない限り、他者を導くことはできない。リーダーシップは外側に崩壊する遥か前に、内側から崩壊する。」",
      authorKicker: "提唱者: RK Vedant · 元軍事司令官・エグゼクティブメンター"
    },
    journey: {
      title: "RAL ガイド付きステップ",
      subtitle: "概念から習慣、そして無意識の品格へ",
      understand: "1. RALを理解する",
      path: "2. ライフステージ選択",
      reflect: "3. 10秒の一時停止",
      diagnose: "4. 自己診断",
      practice: "5. 30日間プラン",
      adapt: "6. シミュレータ",
      growth: "7. 16章の修得"
    },
    cycle: {
      title: "6段階のRALサイクル",
      subtitle: "静止 (PAUSE) → 観察 (PERCEIVE) → 再構成 (REFRAME) → 行動 (ACT) → 調整 (ADJUST) → 成長 (GROW)",
      pause: {
        name: "1. 静止 (PAUSE)",
        subtitle: "あなたを救う空間",
        desc: "衝動的な反応を遮断し、感情のハイジャックを未然に防ぎます。",
        micro: "ゆっくりと息を吐く (4秒) → 肩を下ろす → 「落ち着け」と心に告げる。",
        neuro: "偏桃体の興奮を鎮め、前頭前野の司令塔機能を回復させます。"
      },
      perceive: {
        name: "2. 観察 (PERCEIVE)",
        subtitle: "歪みなく現実を直視する",
        desc: "恐怖や思い込み、過去の物語を事実から切り離してありのままを見つめます。",
        micro: "「今、客観的な現実は何か？ 恐れが何を付け加えているか？」と問う。",
        neuro: "認識の鏡を磨き、感情的な熱を下げます。"
      },
      reframe: {
        name: "3. 再構成 (REFRAME)",
        subtitle: "状況ではなく意味を変える",
        desc: "脅威を客観的な情報へと変換し、新たな可能性と選択肢を開きます。",
        micro: "「これが攻撃ではなく単なる情報なら、何が学べるか？」",
        neuro: "認知的柔軟性を呼び起こし、多角的なシナリオを構築します。"
      },
      act: {
        name: "4. 行動 (ACT)",
        subtitle: "明晰さから生まれる行動",
        desc: "焦燥感からではなく、内なる整列と落ち着きから迷いなく実行します。",
        micro: "可逆的で確実な一歩を踏み出す。力みではなく精度を重んじる。",
        neuro: "神経系の整合性を迷いのない確かな行動へと変換します。"
      },
      adjust: {
        name: "5. 調整 (ADJUST)",
        subtitle: "知恵が習慣となる瞬間",
        desc: "現実のフィードバックに合わせてエゴなく穏やかに微調整します。",
        micro: "「今、環境は何を修正するよう求めているか？」",
        neuro: "生きた学習を通じて行動パターンを継続的に更新します。"
      },
      grow: {
        name: "6. 成長 (GROW)",
        subtitle: "統合される自己",
        desc: "困難を自らの深みと人格の器へと昇華させ、存在感を磨きます。",
        micro: "「この出来事は私自身について何を教えてくれたか？」",
        neuro: "海馬での記憶定着により、実体験を揺るぎない知恵へと変えます。"
      }
    },
    matrices: {
      title: "RAL 4つの測定マトリクス",
      subtitle: "行動の源泉である内面状態を可視化する世界初のシステム",
      raag: {
        plain: "気づき",
        code: "RAAG",
        label: "内省的適応アウェアネス・グリッド",
        desc: "感情の自己調整と認知的柔軟性をリアルタイムに測定します。"
      },
      lstm: {
        plain: "状態の移行",
        code: "LSTM",
        label: "リーダーシップ状態移行マップ",
        desc: "反応的パニックから静かな明晰さへと移行する6つの内的シフト。"
      },
      adg: {
        plain: "意思決定",
        code: "ADG",
        label: "適応的意思決定グリッド",
        desc: "内なる明晰さと環境の透明性が一致しているかを診断します。"
      },
      acl: {
        plain: "組織文化",
        code: "ACL",
        label: "適応型カルチャー・ラティス",
        desc: "チームの心理的安全性、思考の共有、適応行動を可視化します。"
      },
      weakestAlert: "最も改善が必要な領域は {matrix} です。7日間のマイクロ訓練を始めましょう。"
    },
    lifeStages: {
      selectTitle: "ライフステージと背景を選択",
      selectSubtitle: "RALは子どもから学生、ビジネスリーダー、シニアまで全世代に適用されます。",
      changeStage: "ステージ変更",
      kids: {
        title: "子ども (6〜12歳)",
        age: "6〜12歳",
        desc: "賢いフクロウの一時停止、大きな感情に気づき、叫ぶ代わりに穏やかな言葉を使う。",
        focus: "感情の自己調整と遊び心ある深呼吸"
      },
      teenagers: {
        title: "ティーンエイジャー (13〜18歳)",
        age: "13〜18歳",
        desc: "デジタルノイズから離れる一時停止、同調圧力への対処、SNSに左右されない自尊心。",
        focus: "デジタル境界線と自己同一性の確立"
      },
      students: {
        title: "学生・受験生",
        age: "高等教育・試験対策",
        desc: "4-2-6呼吸による試験パニックのリセット、第一原理からの論理的思考、面接での落ち着き。",
        focus: "身体的沈着と集中力の持続"
      },
      professionals: {
        title: "エグゼクティブ・社会人",
        age: "キャリアと経営",
        desc: "重役会議での存在感、スピードとパニックの切り離し、倫理的判断、心理的安全な組織づくり。",
        focus: "戦略の前に状態を整える、指導者の風格"
      },
      seniors: {
        title: "シニア・引退後",
        age: "人生の内省と知恵の継承",
        desc: "肩書の鎧を下ろし、家族や地域社会に穏やかな存在感と知恵を伝える。",
        focus: "存在そのものが遺産となる静寂"
      },
      teams: {
        title: "チームと組織",
        age: "あらゆる規模",
        desc: "心理的安全性、毎朝10分のRAL朝礼、縦割り排除、共通認識の醸成。",
        focus: "安全性の共有と文化的統合"
      }
    },
    pathways: {
      individual: "個人の内的実践",
      individualDesc: "秘密の自己内省、個人メモリ保管庫、非公開の診断スコア、30日間プラン。",
      organization: "チームと組織の調和",
      organizationDesc: "部門別コホート、匿名組織サーベイ、集合カルチャーラティス、SSO認証。",
      privacyNotice: "厳格なデータ隔離: 個人の日記や個人的な診断結果は暗号化され、組織管理者に閲覧されることはありません。",
      switchToIndiv: "個人モードへ",
      switchToOrg: "組織モードへ"
    },
    author: {
      name: "RK Vedant",
      role: "RALドクトリン提唱者・リーダーシップ戦略家",
      creds: "元軍事司令官・エグゼクティブメンター",
      quote: "「複雑さの中で自らの心を導くことを学ばない限り、他者を導くことはできない。」",
      doctrineTitle: "Reflective Adaptive Leadership (RAL)",
      viewBio: "著者の写真と資格情報を見る"
    },
    actions: {
      pause10s: "10秒のリセット一時停止",
      startDiagnostic: "360°自己診断を開始",
      continuePractice: "30日プランを開く",
      retakeDiagnostic: "診断をやり直す",
      bookCoach: "メンターセッションを予約",
      viewToolkit: "1枚ツールキット",
      saveProgress: "進捗を保存",
      exportReport: "レポートを書き出す",
      openMusic: "癒しの音響空間",
      exploreBook: "全16章を読む"
    },
    coach: {
      title: "RAL ソクラテス式コーチ",
      subtitle: "RK VedantのRALドクトリンに準拠",
      placeholder: "リーダーシップの悩みやジレンマをご相談ください...",
      voiceInput: "音声入力",
      voiceOutput: "読み上げ",
      speaking: "発話中...",
      listening: "聴取中...",
      pauseMode: "10秒リセット",
      conflictMode: "対立の再構成",
      crisisMode: "危機の沈静化",
      aiReviewMode: "決定グリッド検証",
      disclaimer: "経営判断の明晰さを育むコーチングです。精神科的治療ではありません。",
      dockTooltip: "RAL AIコーチを開く",
      thinking: "RALコーチが内省中です..."
    },
    diagnostic: {
      title: "RAL 360° 心理測定自己診断",
      subtitle: "4つのマトリクスを通じて内なるリーダーシップ構造を精密測定",
      scaleDesc: "1 (全くない) から 5 (常にそうである) で評価",
      compositeScore: "総合リーダーシップスコア",
      weakestMatrix: "最優先改善ノード",
      prescription: "4段階の改善プロトコル",
      never: "全くない",
      rarely: "めったにない",
      sometimes: "時々ある",
      often: "よくある",
      consistently: "常にそうである"
    },
    soothe: {
      title: "伝統楽器による回復音響空間",
      subtitle: "呼吸リズムに合わせてリアルタイムに周波数と強度が変化する100以上の音響",
      breathingGuide: "呼吸同期ガイド",
      inhale: "吸う (倍音の柔らかな高まり)",
      hold: "止める (安定した和音の響き)",
      exhale: "吐く (大地に根づく深い静けさ)",
      instruments: "世界の伝統楽器",
      timer: "セッション時間",
      startBreathing: "音響を開始",
      stopBreathing: "一時停止",
      moodTitle: "気分と目的",
      soundscapesAvailable: "120以上の組み合わせが利用可能"
    }
  }
};
