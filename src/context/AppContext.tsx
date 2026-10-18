import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  DiagnosticResult, 
  DayScorecardData, 
  ChatMessage, 
  BookedSession, 
  TeamMemberProfile, 
  CurrencyCode,
  MemoryVaultItem,
  UserDocument,
  PsychometricReport,
  SessionVideo,
  CustomOrgQuestion,
  EnterpriseSSOConfig,
  TenantCohort,
  LifeStage,
  CulturalRegion,
  AppPathway,
  JourneyStep,
  OrgProfile,
  OrgCultureMetrics,
  ReflectiveSentiment,
  FocusSessionLog
} from '../types';
import { SupportedLanguage, TRANSLATIONS, TranslationDict } from '../i18n/translations';
import { INITIAL_GLOBAL_INSIGHTS, GlobalInsightItem } from '../data/ralFramework';

interface AppContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDict;
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  
  // Individual User Profile
  user: UserProfile;
  updateUser: (fields: Partial<UserProfile>) => void;
  loadDemoProfile: () => void;
  resetToNewVisitor: () => void;

  // Organization Isolated Profile & Metrics
  orgProfile: OrgProfile;
  updateOrgProfile: (fields: Partial<OrgProfile>) => void;
  orgCultureMetrics: OrgCultureMetrics;
  updateOrgCultureMetrics: (fields: Partial<OrgCultureMetrics>) => void;
  
  // Diagnostic
  diagnostic: DiagnosticResult | null;
  diagnosticHistory: DiagnosticResult[];
  saveDiagnostic: (result: DiagnosticResult) => void;
  clearDiagnostic: () => void;
  
  // Practice Plan (30 Days)
  currentDay: number;
  setCurrentDay: (day: number) => void;
  scorecards: Record<number, DayScorecardData>;
  updateScorecard: (day: number, updates: Partial<DayScorecardData>) => void;
  streakDays: number;
  identitySheet: {
    stateSignature: string;
    distortionTendencies: string;
    adaptiveStrengths: string;
    presencePromise: string;
    culturalImprint: string;
  };
  updateIdentitySheet: (updates: Partial<AppContextType['identitySheet']>) => void;

  // Learn Modules
  completedChapters: number[];
  markChapterComplete: (chapterId: number) => void;
  chapterNotes: Record<number, string>;
  saveChapterNote: (chapterId: number, note: string) => void;
  quizScores: Record<number, number>;
  saveQuizScore: (chapterId: number, score: number) => void;

  // Coach Chat
  chatMessages: ChatMessage[];
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  rateChatMessage: (messageId: string, helpful: boolean) => void;
  clearChat: () => void;

  // Global Insights
  insights: GlobalInsightItem[];
  addInsight: (item: GlobalInsightItem) => void;
  reviewInsight: (id: string, status: 'approved' | 'pending_review' | 'archived') => void;
  upvoteInsight: (id: string) => void;

  // Individual Memory Vault & Context
  memoryVault: MemoryVaultItem[];
  addMemoryItem: (item: Omit<MemoryVaultItem, 'id' | 'createdAt'>) => void;
  removeMemoryItem: (id: string) => void;

  // User & Company Documents Integration
  userDocuments: UserDocument[];
  addUserDocument: (doc: Omit<UserDocument, 'id' | 'updatedAt'>) => void;
  removeUserDocument: (id: string) => void;

  // Psychometric Adaptive Methodology Reports
  psychometricReports: PsychometricReport[];
  addPsychometricReport: (report: PsychometricReport) => void;

  // Video Session Recordings
  sessionVideos: SessionVideo[];
  addSessionVideo: (video: Omit<SessionVideo, 'id'>) => void;

  // Team
  teamName: string;
  setTeamName: (name: string) => void;
  teamMembers: TeamMemberProfile[];
  addTeamMember: (member: Omit<TeamMemberProfile, 'id'>) => void;

  // Human Coaching Booking
  bookedSessions: BookedSession[];
  bookSession: (session: Omit<BookedSession, 'id' | 'status'>) => void;

  // Global Pause Modal
  isPauseModalOpen: boolean;
  openPauseModal: (type?: '10s' | '90s' | '4-2-6') => void;
  closePauseModal: () => void;
  pauseModalType: '10s' | '90s' | '4-2-6';

  // User Profile Modal
  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;

  // Custom Organization Diagnostic Questions (up to 10)
  customOrgQuestions: CustomOrgQuestion[];
  addCustomOrgQuestion: (q: Omit<CustomOrgQuestion, 'id' | 'addedAt'>) => void;
  removeCustomOrgQuestion: (id: string) => void;

  // Enterprise SSO & Multi-Tenant Cohorts
  ssoConfig: EnterpriseSSOConfig;
  updateSSOConfig: (cfg: Partial<EnterpriseSSOConfig>) => void;
  cohorts: TenantCohort[];
  currentCohort: string;
  setCurrentCohort: (cohortId: string) => void;
  deployCohortPulseSurvey: (cohortId: string) => void;

  // Life Stage & Personalization
  lifeStage: LifeStage;
  setLifeStage: (stage: LifeStage) => void;
  culturalRegion: CulturalRegion;
  setCulturalRegion: (region: CulturalRegion) => void;
  pathway: AppPathway;
  setPathway: (p: AppPathway) => void;
  activeJourneyStep: JourneyStep;
  setActiveJourneyStep: (step: JourneyStep) => void;

  // Persistent AI Coach Dock & Reflective Sentiment
  isAiCoachOpen: boolean;
  setIsAiCoachOpen: (open: boolean) => void;
  reflectiveSentiment: ReflectiveSentiment;
  setReflectiveSentiment: (s: ReflectiveSentiment) => void;

  // Life Stage Switcher Modal
  isLifeStageModalOpen: boolean;
  openLifeStageModal: () => void;
  closeLifeStageModal: () => void;

  // Author & Credentials Modal
  isAuthorModalOpen: boolean;
  openAuthorModal: () => void;
  closeAuthorModal: () => void;
  authorPhotoUrl: string;
  setAuthorPhotoUrl: (url: string) => void;

  // Soothe Music Player Modal Integration
  isMusicOpen: boolean;
  openMusic: (initialMood?: string) => void;
  closeMusic: () => void;
  musicInitialMood: string;

  // Pomodoro Focus Sessions
  focusSessionLogs: FocusSessionLog[];
  addFocusSessionLog: (log: Omit<FocusSessionLog, 'id' | 'timestamp'>) => void;

  // Navigation tab & Hash Routing
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Reset all for privacy
  resetAllUserData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INDIVIDUAL_STORAGE_KEY = 'ral_individual_data_v2';
const ORG_STORAGE_KEY = 'ral_org_data_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [activeTab, setActiveTabState] = useState<string>('home');
  const [isPauseModalOpen, setIsPauseModalOpen] = useState<boolean>(false);
  const [pauseModalType, setPauseModalType] = useState<'10s' | '90s' | '4-2-6'>('10s');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Guided Journey & Segmentation states
  const [lifeStage, setLifeStageState] = useState<LifeStage>('professionals');
  const [culturalRegion, setCulturalRegionState] = useState<CulturalRegion>('india');
  const [pathway, setPathwayState] = useState<AppPathway>('individual');
  const [activeJourneyStep, setActiveJourneyStep] = useState<JourneyStep>('understand');
  const [isAiCoachOpen, setIsAiCoachOpen] = useState<boolean>(false);
  const [isLifeStageModalOpen, setIsLifeStageModalOpen] = useState<boolean>(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState<boolean>(false);
  const [authorPhotoUrl, setAuthorPhotoUrlState] = useState<string>(() => {
    try {
      return localStorage.getItem('ral_author_photo_url') || '/src/assets/images/rk_vedant_author_1792241867695.jpg';
    } catch {
      return '/src/assets/images/rk_vedant_author_1792241867695.jpg';
    }
  });

  const setAuthorPhotoUrl = (url: string) => {
    setAuthorPhotoUrlState(url);
    try {
      localStorage.setItem('ral_author_photo_url', url);
    } catch {
      // ignore
    }
  };

  // Reflective Sentiment (Captures current mood and recalibrates AI coaching tone)
  const [reflectiveSentiment, setReflectiveSentimentState] = useState<ReflectiveSentiment>(() => {
    try {
      return (localStorage.getItem('ral_reflective_sentiment') as ReflectiveSentiment) || 'centered';
    } catch {
      return 'centered';
    }
  });

  const setReflectiveSentiment = (sentiment: ReflectiveSentiment) => {
    setReflectiveSentimentState(sentiment);
    try {
      localStorage.setItem('ral_reflective_sentiment', sentiment);
    } catch (e) {
      // ignore
    }
  };

  // Soothe Music Modal Global State
  const [isMusicOpen, setIsMusicOpen] = useState<boolean>(false);
  const [musicInitialMood, setMusicInitialMood] = useState<string>('focus');
  const openMusic = (initialMood?: string) => {
    if (initialMood) setMusicInitialMood(initialMood);
    setIsMusicOpen(true);
  };
  const closeMusic = () => setIsMusicOpen(false);

  // Pomodoro Focus Sessions
  const [focusSessionLogs, setFocusSessionLogs] = useState<FocusSessionLog[]>(() => {
    try {
      const saved = localStorage.getItem('ral_focus_logs_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addFocusSessionLog = (log: Omit<FocusSessionLog, 'id' | 'timestamp'>) => {
    const newLog: FocusSessionLog = {
      ...log,
      id: `fl-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setFocusSessionLogs(prev => {
      const next = [newLog, ...prev];
      try {
        localStorage.setItem('ral_focus_logs_v1', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // New Visitor State by default (Priya persona from UX audit)
  const [user, setUser] = useState<UserProfile>({
    name: "Priya",
    email: "priya.leader@executive.io",
    title: "Leadership Explorer",
    sector: "corporate",
    lifeStage: "professionals",
    culturalRegion: "india",
    country: "India",
    pathway: "individual",
    experienceYears: 10,
    tier: "free",
    createdAt: new Date().toISOString(),
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    authorPhotoUrl: "/rk_vedant_portrait.jpg",
    bio: "Seeking to master inner clarity before reacting in fast-paced executive environments.",
    leadershipGoal: "Lead myself first: quiet the mental noise before making strategic decisions.",
    currentChallenge: "Balancing speed with presence and emotional steadiness under pressure.",
    hasCompletedOnboarding: false
  });

  // Isolated Organization Profile
  const [orgProfile, setOrgProfile] = useState<OrgProfile>({
    orgName: "Acme Global Technology & Systems",
    industry: "Enterprise Software & Infrastructure",
    domain: "acmeglobal.com",
    employeeCount: 450,
    executiveSponsor: "Vice President of Engineering",
    pulseCadence: "weekly",
    privacyTier: "strict_anonymized",
    lastAuditDate: "2026-10-01"
  });

  const [orgCultureMetrics, setOrgCultureMetrics] = useState<OrgCultureMetrics>({
    overallCoherence: 79,
    psychologicalSafetyScore: 82,
    truthSpeakingIndex: 76,
    siloIndex: 28,
    activeSurveysCompleted: 103,
    emotionalLayerState: 'safe',
    cognitiveLayerState: 'aligned',
    behaviouralLayerState: 'adaptive'
  });

  // Default diagnostic is null for new visitor (Priya), so she sees her own clean start!
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null);
  const [diagnosticHistory, setDiagnosticHistory] = useState<DiagnosticResult[]>([]);

  // 30 Days Practice
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [scorecards, setScorecards] = useState<Record<number, DayScorecardData>>({});

  const [identitySheet, setIdentitySheet] = useState({
    stateSignature: "I anchor in diaphragmatic stillness before high-stakes decisions.",
    distortionTendencies: "I watch for hero-saviour impulses and premature closure under time scarcity.",
    adaptiveStrengths: "Translating ambiguous friction into clear, curious hypotheses.",
    presencePromise: "I bring calm, honest listening so those around me feel psychologically safe.",
    culturalImprint: "Truth spoken early, assumptions illuminated, zero defensive posturing."
  });

  // Learn
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [chapterNotes, setChapterNotes] = useState<Record<number, string>>({});
  const [quizScores, setQuizScores] = useState<Record<number, number>>({});

  // Coach Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'model',
      content: `Welcome to your Reflective Adaptive Leadership sanctuary. I am your RAL Socratic Coach, grounded in RK Vedant's doctrine.\n\nTake a slow breath. What decision or interpersonal challenge is currently on your mind?`,
      timestamp: new Date().toISOString()
    }
  ]);

  // Global Insights
  const [insights, setInsights] = useState<GlobalInsightItem[]>(INITIAL_GLOBAL_INSIGHTS);

  // Team
  const [teamName, setTeamName] = useState<string>("Core Engineering & Platform Group");
  const [teamMembers, setTeamMembers] = useState<TeamMemberProfile[]>([
    { id: 'tm-1', name: "Priya (You)", role: "Engineering Leader", department: "Engineering", compositeScore: 133, primaryQuadrant: "Reflective-Adaptive", psychologicalSafetyRating: 80 },
    { id: 'tm-2', name: "Rahul Sharma", role: "Principal Systems Architect", department: "Architecture", compositeScore: 122, primaryQuadrant: "Reflective-Rigid", psychologicalSafetyRating: 64 },
    { id: 'tm-3', name: "David Chen", role: "Product VP", department: "Product", compositeScore: 110, primaryQuadrant: "Reactive-Flexible", psychologicalSafetyRating: 59 },
    { id: 'tm-4', name: "Sophia Rossi", role: "Lead Infrastructure Engineer", department: "Infrastructure", compositeScore: 146, primaryQuadrant: "Reflective-Adaptive", psychologicalSafetyRating: 88 }
  ]);

  // Booked sessions
  const [bookedSessions, setBookedSessions] = useState<BookedSession[]>([]);

  // Memory Vault
  const [memoryVault, setMemoryVault] = useState<MemoryVaultItem[]>([
    {
      id: 'mv-1',
      category: 'value',
      content: 'Never sacrifice deep team psychological safety for a temporary deadline speed illusion.',
      createdAt: '2026-10-01'
    }
  ]);

  // User Documents
  const [userDocuments, setUserDocuments] = useState<UserDocument[]>([
    {
      id: 'ud-1',
      title: 'Q4 Strategic Architecture Dilemma',
      category: 'dilemma_brief',
      content: 'Board requesting 20% budget reductions across infrastructure while expanding real-time AI capabilities.',
      updatedAt: '2026-10-04'
    }
  ]);

  // Psychometric Reports
  const [psychometricReports, setPsychometricReports] = useState<PsychometricReport[]>([]);

  // Session Video Recordings
  const [sessionVideos, setSessionVideos] = useState<SessionVideo[]>([]);

  // Enterprise Custom Organization Diagnostic Questions
  const [customOrgQuestions, setCustomOrgQuestions] = useState<CustomOrgQuestion[]>([
    {
      id: 'cq-1',
      text: 'When balancing hybrid vs office working rhythms, I ensure fairness and emotional safety without resorting to surveillance metrics.',
      category: 'hybrid_compliance',
      orgTag: 'People & Culture',
      addedAt: '2026-10-04'
    },
    {
      id: 'cq-2',
      text: 'When adopting generative AI into strategic decision pipelines, our leadership retains full moral accountability for algorithmic edge-case failures.',
      category: 'ai_governance',
      orgTag: 'AI Governance',
      addedAt: '2026-10-04'
    }
  ]);

  // Enterprise SSO
  const [ssoConfig, setSsoConfig] = useState<EnterpriseSSOConfig>({
    provider: 'okta',
    tenantId: 'okta-corp-tenant-ral-9401',
    clientId: '0oa4ral938fkq392X1d7',
    domain: 'enterprise.okta.com',
    ssoUrl: 'https://enterprise.okta.com/app/ral-coach/sso/saml',
    isConnected: true,
    lastSyncAt: new Date().toISOString(),
    anonymizedSurveyDeployed: true
  });

  // Enterprise Multi-Tenant Cohorts
  const [cohorts, setCohorts] = useState<TenantCohort[]>([
    {
      id: 'cohort-eng',
      name: 'Core Engineering & Platform Group',
      department: 'Engineering',
      memberCount: 42,
      surveyCompletionRate: 94,
      aclIndex: 82,
      psychologicalSafety: 78,
      ragStatus: 'green',
      lastSurveyDate: '2026-10-04'
    },
    {
      id: 'cohort-sales',
      name: 'Global Enterprise Sales & Revenue',
      department: 'Sales',
      memberCount: 38,
      surveyCompletionRate: 88,
      aclIndex: 68,
      psychologicalSafety: 62,
      ragStatus: 'amber',
      lastSurveyDate: '2026-10-03'
    }
  ]);
  const [currentCohort, setCurrentCohort] = useState<string>('cohort-eng');

  // URL Hash Routing synchronization (Fix 3 from UX Audit)
  const validTabs = ['home', 'coach', 'practice', 'learn', 'simulator', 'diagnostic', 'team', 'insights', 'toolkit', 'pricing', 'admin', 'vault', 'psychometrics'];

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    if (window.location.hash !== `#/${tab}`) {
      window.location.hash = `#/${tab}`;
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (!hash) return;
      
      const parts = hash.split('/');
      const mainRoute = parts[0];

      if (validTabs.includes(mainRoute)) {
        setActiveTabState(mainRoute);
        // Handle sub-routes like practice/day-5
        if (mainRoute === 'practice' && parts[1]?.startsWith('day-')) {
          const dayNum = parseInt(parts[1].replace('day-', ''), 10);
          if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= 30) {
            setCurrentDay(dayNum);
          }
        }
      }
    };

    // Initial check from current URL
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Load from local storage
  useEffect(() => {
    try {
      const savedIndiv = localStorage.getItem(INDIVIDUAL_STORAGE_KEY);
      if (savedIndiv) {
        const parsed = JSON.parse(savedIndiv);
        if (parsed.user) setUser(parsed.user);
        if (parsed.language) setLanguageState(parsed.language);
        if (parsed.diagnostic) setDiagnostic(parsed.diagnostic);
        if (parsed.diagnosticHistory) setDiagnosticHistory(parsed.diagnosticHistory);
        if (parsed.currentDay) setCurrentDay(parsed.currentDay);
        if (parsed.scorecards) setScorecards(parsed.scorecards);
        if (parsed.completedChapters) setCompletedChapters(parsed.completedChapters);
        if (parsed.chapterNotes) setChapterNotes(parsed.chapterNotes);
        if (parsed.quizScores) setQuizScores(parsed.quizScores);
        if (parsed.chatMessages && parsed.chatMessages.length > 0) setChatMessages(parsed.chatMessages);
        if (parsed.identitySheet) setIdentitySheet(parsed.identitySheet);
        if (parsed.memoryVault) setMemoryVault(parsed.memoryVault);
        if (parsed.userDocuments) setUserDocuments(parsed.userDocuments);
        if (parsed.lifeStage) setLifeStageState(parsed.lifeStage);
        if (parsed.culturalRegion) setCulturalRegionState(parsed.culturalRegion);
        if (parsed.pathway) setPathwayState(parsed.pathway);
        if (parsed.authorPhotoUrl) setAuthorPhotoUrl(parsed.authorPhotoUrl);
      }

      const savedOrg = localStorage.getItem(ORG_STORAGE_KEY);
      if (savedOrg) {
        const parsedOrg = JSON.parse(savedOrg);
        if (parsedOrg.orgProfile) setOrgProfile(parsedOrg.orgProfile);
        if (parsedOrg.orgCultureMetrics) setOrgCultureMetrics(parsedOrg.orgCultureMetrics);
        if (parsedOrg.teamMembers) setTeamMembers(parsedOrg.teamMembers);
        if (parsedOrg.customOrgQuestions) setCustomOrgQuestions(parsedOrg.customOrgQuestions);
        if (parsedOrg.ssoConfig) setSsoConfig(parsedOrg.ssoConfig);
        if (parsedOrg.cohorts) setCohorts(parsedOrg.cohorts);
      }
    } catch (e) {
      console.error("Failed to load local state:", e);
    }
  }, []);

  // Persist individual data
  useEffect(() => {
    try {
      const indivData = {
        user,
        language,
        lifeStage,
        culturalRegion,
        pathway,
        activeJourneyStep,
        authorPhotoUrl,
        diagnostic,
        diagnosticHistory,
        currentDay,
        scorecards,
        completedChapters,
        chapterNotes,
        quizScores,
        chatMessages,
        identitySheet,
        memoryVault,
        userDocuments
      };
      localStorage.setItem(INDIVIDUAL_STORAGE_KEY, JSON.stringify(indivData));
    } catch (e) {
      console.error("Failed to persist individual state:", e);
    }
  }, [user, language, lifeStage, culturalRegion, pathway, activeJourneyStep, authorPhotoUrl, diagnostic, diagnosticHistory, currentDay, scorecards, completedChapters, chapterNotes, quizScores, chatMessages, identitySheet, memoryVault, userDocuments]);

  // Persist organization data
  useEffect(() => {
    try {
      const orgData = {
        orgProfile,
        orgCultureMetrics,
        teamMembers,
        customOrgQuestions,
        ssoConfig,
        cohorts
      };
      localStorage.setItem(ORG_STORAGE_KEY, JSON.stringify(orgData));
    } catch (e) {
      console.error("Failed to persist org state:", e);
    }
  }, [orgProfile, orgCultureMetrics, teamMembers, customOrgQuestions, ssoConfig, cohorts]);

  // Load Alex Vance demo profile (for demonstration/reviewers)
  const loadDemoProfile = () => {
    setUser({
      name: "Alex Vance",
      email: "alex.vance@executive.io",
      title: "Senior Director & Engineering Leader",
      sector: "corporate",
      lifeStage: "professionals",
      culturalRegion: "india",
      country: "India",
      pathway: "individual",
      experienceYears: 14,
      tier: "pro",
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      authorPhotoUrl: "/rk_vedant_portrait.jpg",
      bio: "Engineering leader focused on shifting from reactive velocity to reflective presence under enterprise board pressure.",
      leadershipGoal: "Shift from reactive speed to reflective clarity during high-stakes strategic transitions.",
      currentChallenge: "Balancing quarterly speed demands with deep team psychological safety and inner coherence.",
      hasCompletedOnboarding: true
    });

    setDiagnostic({
      completedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      raagScore: 36,
      lstmScore: 32,
      adgScore: 34,
      aclScore: 31,
      compositeScore: 133,
      band: "Emerging Adaptive Leader",
      weakestMatrix: "ACL",
      answers: {
        1: 4, 2: 3, 3: 4, 4: 3, 5: 4, 6: 3, 7: 4, 8: 4, 9: 3, 10: 4,
        11: 4, 12: 3, 13: 3, 14: 3, 15: 3, 16: 3, 17: 3, 18: 3, 19: 3, 20: 4,
        21: 4, 22: 4, 23: 3, 24: 3, 25: 3, 26: 3, 27: 4, 28: 3, 29: 3, 30: 4,
        31: 3, 32: 3, 33: 3, 34: 4, 35: 3, 36: 3, 37: 3, 38: 3, 39: 3, 40: 3
      }
    });

    setCurrentDay(3);
    setScorecards({
      1: {
        pause: true,
        perceive: true,
        reframe: true,
        act: true,
        grow: true,
        adjust: true,
        score: 6,
        journalText: "Pausing for 10 seconds before the 9 AM standup lowered my heart rate and gave my senior architect room to bring up an unmentioned deployment risk.",
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      2: {
        pause: true,
        perceive: true,
        reframe: true,
        act: true,
        grow: false,
        adjust: true,
        score: 5,
        journalText: "Slowing my vocal tempo by 20% prevented an escalation with marketing regarding release deadlines.",
        updatedAt: new Date(Date.now() - 86400000).toISOString()
      },
      3: {
        pause: true,
        perceive: true,
        reframe: false,
        act: false,
        grow: false,
        adjust: false,
        score: 2,
        journalText: "",
        updatedAt: new Date().toISOString()
      }
    });

    setCompletedChapters([1, 2]);
    setActiveTab('home');
  };

  // Reset to fresh visitor (Priya flow from UX audit)
  const resetToNewVisitor = () => {
    setUser({
      name: "Priya",
      email: "priya@example.com",
      title: "First-time Visitor",
      sector: "corporate",
      lifeStage: "professionals",
      culturalRegion: "india",
      country: "India",
      pathway: "individual",
      experienceYears: 8,
      tier: "free",
      createdAt: new Date().toISOString(),
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      authorPhotoUrl: "/rk_vedant_portrait.jpg",
      bio: "Learning Reflective Adaptive Leadership to master calmness before deciding.",
      leadershipGoal: "Lead myself first.",
      currentChallenge: "Navigating complexity without reactive panic.",
      hasCompletedOnboarding: false
    });
    setDiagnostic(null);
    setScorecards({});
    setCurrentDay(1);
    setCompletedChapters([]);
    setActiveTab('home');
  };

  const setLifeStage = (stage: LifeStage) => {
    setLifeStageState(stage);
    updateUser({ lifeStage: stage });
  };

  const setCulturalRegion = (region: CulturalRegion) => {
    setCulturalRegionState(region);
    updateUser({ culturalRegion: region });
  };

  const setPathway = (p: AppPathway) => {
    setPathwayState(p);
    updateUser({ pathway: p });
  };

  const addMemoryItem = (item: Omit<MemoryVaultItem, 'id' | 'createdAt'>) => {
    const newItem: MemoryVaultItem = {
      ...item,
      id: `mem-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setMemoryVault(prev => [newItem, ...prev]);
  };

  const removeMemoryItem = (id: string) => {
    setMemoryVault(prev => prev.filter(m => m.id !== id));
  };

  const addUserDocument = (doc: Omit<UserDocument, 'id' | 'updatedAt'>) => {
    const newDoc: UserDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      updatedAt: new Date().toISOString().slice(0, 10)
    };
    setUserDocuments(prev => [newDoc, ...prev]);
  };

  const removeUserDocument = (id: string) => {
    setUserDocuments(prev => prev.filter(d => d.id !== id));
  };

  const addPsychometricReport = (report: PsychometricReport) => {
    setPsychometricReports(prev => [report, ...prev]);
  };

  const addSessionVideo = (video: Omit<SessionVideo, 'id'>) => {
    const newVideo: SessionVideo = {
      ...video,
      id: `vid-${Date.now()}`
    };
    setSessionVideos(prev => [newVideo, ...prev]);
  };

  const addCustomOrgQuestion = (q: Omit<CustomOrgQuestion, 'id' | 'addedAt'>) => {
    if (customOrgQuestions.length >= 10) return;
    const newQ: CustomOrgQuestion = {
      ...q,
      id: `cq-${Date.now()}`,
      addedAt: new Date().toISOString().slice(0, 10)
    };
    setCustomOrgQuestions(prev => [...prev, newQ]);
  };

  const removeCustomOrgQuestion = (id: string) => {
    setCustomOrgQuestions(prev => prev.filter(q => q.id !== id));
  };

  const updateSSOConfig = (cfg: Partial<EnterpriseSSOConfig>) => {
    setSsoConfig(prev => ({ ...prev, ...cfg }));
  };

  const deployCohortPulseSurvey = (cohortId: string) => {
    setCohorts(prev => prev.map(c => {
      if (c.id === cohortId) {
        return {
          ...c,
          surveyCompletionRate: 100,
          lastSurveyDate: new Date().toISOString().slice(0, 10)
        };
      }
      return c;
    }));
  };

  const updateUser = (fields: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...fields }));
  };

  const updateOrgProfile = (fields: Partial<OrgProfile>) => {
    setOrgProfile(prev => ({ ...prev, ...fields }));
  };

  const updateOrgCultureMetrics = (fields: Partial<OrgCultureMetrics>) => {
    setOrgCultureMetrics(prev => ({ ...prev, ...fields }));
  };

  const saveDiagnostic = (result: DiagnosticResult) => {
    setDiagnostic(result);
    setDiagnosticHistory(prev => [result, ...prev]);
    updateUser({ hasCompletedOnboarding: true });
  };

  const clearDiagnostic = () => {
    setDiagnostic(null);
  };

  const updateScorecard = (day: number, updates: Partial<DayScorecardData>) => {
    setScorecards(prev => {
      const current = prev[day] || {
        pause: false,
        perceive: false,
        reframe: false,
        act: false,
        grow: false,
        adjust: false,
        score: 0,
        journalText: '',
        updatedAt: new Date().toISOString()
      };
      const merged = { ...current, ...updates };
      let newScore = 0;
      if (merged.pause) newScore += 1;
      if (merged.perceive) newScore += 1;
      if (merged.reframe) newScore += 1;
      if (merged.act) newScore += 1;
      if (merged.grow) newScore += 1;
      if (merged.adjust) newScore += 1;
      merged.score = newScore;
      merged.updatedAt = new Date().toISOString();
      return { ...prev, [day]: merged };
    });
  };

  const markChapterComplete = (chapterId: number) => {
    setCompletedChapters(prev => prev.includes(chapterId) ? prev : [...prev, chapterId]);
  };

  const saveChapterNote = (chapterId: number, note: string) => {
    setChapterNotes(prev => ({ ...prev, [chapterId]: note }));
  };

  const saveQuizScore = (chapterId: number, score: number) => {
    setQuizScores(prev => ({ ...prev, [chapterId]: score }));
  };

  const addChatMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString()
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const rateChatMessage = (messageId: string, helpful: boolean) => {
    setChatMessages(prev => prev.map(m => m.id === messageId ? { ...m, helpful } : m));
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: `init-${Date.now()}`,
        role: 'model',
        content: `Reflective space renewed. Pause for 4 seconds. What truth or challenge shall we examine?`,
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const addInsight = (item: GlobalInsightItem) => {
    setInsights(prev => [item, ...prev]);
  };

  const reviewInsight = (id: string, status: 'approved' | 'pending_review' | 'archived') => {
    setInsights(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const upvoteInsight = (id: string) => {
    setInsights(prev => prev.map(i => i.id === id ? { ...i, upvotes: (i.upvotes || 0) + 1 } : i));
  };

  const addTeamMember = (member: Omit<TeamMemberProfile, 'id'>) => {
    const newMember: TeamMemberProfile = {
      ...member,
      id: `tm-${Date.now()}`
    };
    setTeamMembers(prev => [...prev, newMember]);
  };

  const bookSession = (session: Omit<BookedSession, 'id' | 'status'>) => {
    const newSession: BookedSession = {
      ...session,
      id: `bs-${Date.now()}`,
      status: 'confirmed'
    };
    setBookedSessions(prev => [newSession, ...prev]);
  };

  const openPauseModal = (type: '10s' | '90s' | '4-2-6' = '10s') => {
    setPauseModalType(type);
    setIsPauseModalOpen(true);
  };

  const closePauseModal = () => {
    setIsPauseModalOpen(false);
  };

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const updateIdentitySheet = (updates: Partial<AppContextType['identitySheet']>) => {
    setIdentitySheet(prev => ({ ...prev, ...updates }));
  };

  const streakDays = Object.values(scorecards).filter(s => s.score >= 3).length;

  const resetAllUserData = () => {
    try {
      localStorage.removeItem(INDIVIDUAL_STORAGE_KEY);
      localStorage.removeItem(ORG_STORAGE_KEY);
      resetToNewVisitor();
    } catch (e) {
      console.error(e);
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage: setLanguageState,
        t,
        currency,
        setCurrency,
        user,
        updateUser,
        loadDemoProfile,
        resetToNewVisitor,
        orgProfile,
        updateOrgProfile,
        orgCultureMetrics,
        updateOrgCultureMetrics,
        diagnostic,
        diagnosticHistory,
        saveDiagnostic,
        clearDiagnostic,
        currentDay,
        setCurrentDay,
        scorecards,
        updateScorecard,
        streakDays,
        identitySheet,
        updateIdentitySheet,
        completedChapters,
        markChapterComplete,
        chapterNotes,
        saveChapterNote,
        quizScores,
        saveQuizScore,
        chatMessages,
        addChatMessage,
        rateChatMessage,
        clearChat,
        insights,
        addInsight,
        reviewInsight,
        upvoteInsight,
        memoryVault,
        addMemoryItem,
        removeMemoryItem,
        userDocuments,
        addUserDocument,
        removeUserDocument,
        psychometricReports,
        addPsychometricReport,
        sessionVideos,
        addSessionVideo,
        teamName,
        setTeamName,
        teamMembers,
        addTeamMember,
        bookedSessions,
        bookSession,
        isPauseModalOpen,
        openPauseModal,
        closePauseModal,
        pauseModalType,
        isProfileModalOpen,
        openProfileModal,
        closeProfileModal,
        lifeStage,
        setLifeStage,
        culturalRegion,
        setCulturalRegion,
        pathway,
        setPathway,
        activeJourneyStep,
        setActiveJourneyStep,
        isAiCoachOpen,
        setIsAiCoachOpen,
        reflectiveSentiment,
        setReflectiveSentiment,
        isLifeStageModalOpen,
        openLifeStageModal: () => setIsLifeStageModalOpen(true),
        closeLifeStageModal: () => setIsLifeStageModalOpen(false),
        isAuthorModalOpen,
        openAuthorModal: () => setIsAuthorModalOpen(true),
        closeAuthorModal: () => setIsAuthorModalOpen(false),
        authorPhotoUrl,
        setAuthorPhotoUrl,
        customOrgQuestions,
        addCustomOrgQuestion,
        removeCustomOrgQuestion,
        ssoConfig,
        updateSSOConfig,
        cohorts,
        currentCohort,
        setCurrentCohort,
        deployCohortPulseSurvey,
        activeTab,
        setActiveTab,
        isMusicOpen,
        openMusic,
        closeMusic,
        musicInitialMood,
        focusSessionLogs,
        addFocusSessionLog,
        resetAllUserData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
