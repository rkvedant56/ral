export type MembershipTier = 'free' | 'pro' | 'team' | 'enterprise';
export type SectorType = 'corporate' | 'military_civilian' | 'startup' | 'public_sector' | 'education' | 'personal';
export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP';
export type LifeStage = 'kids' | 'teenagers' | 'students' | 'professionals' | 'seniors' | 'teams';
export type CulturalRegion = 'india' | 'europe' | 'americas' | 'east_asia' | 'global';
export type AppPathway = 'individual' | 'organization';
export type JourneyStep = 'understand' | 'path' | 'reflect' | 'diagnose' | 'practice' | 'adapt' | 'growth';

export type ReflectiveSentiment = 'centered' | 'reflective' | 'overwhelmed' | 'agitated' | 'depleted';

export interface SentimentOption {
  id: ReflectiveSentiment;
  label: string;
  icon: string;
  description: string;
  toneSummary: string;
}

export interface DailyAffirmation {
  id: string;
  dateKey: string;
  quote: string;
  inquiry: string;
  microAction: string;
  chapterRef: string;
  matrixAnchor: 'RAAG' | 'LSTM' | 'ADG' | 'ACL';
  principle: string;
  authorCitation: string;
  isBookmarked?: boolean;
}

export interface FocusSessionLog {
  id: string;
  timestamp: string;
  durationMinutes: number;
  taskTitle: string;
  mode: 'classic' | 'extended' | 'sprint' | 'custom';
  soundscapeUsed?: string;
}

export interface OrgProfile {
  orgName: string;
  industry: string;
  domain: string;
  employeeCount: number;
  executiveSponsor: string;
  pulseCadence: 'daily' | 'weekly' | 'biweekly';
  privacyTier: 'strict_anonymized' | 'aggregated_cohorts';
  lastAuditDate?: string;
}

export interface OrgCultureMetrics {
  overallCoherence: number;
  psychologicalSafetyScore: number;
  truthSpeakingIndex: number;
  siloIndex: number;
  activeSurveysCompleted: number;
  emotionalLayerState: 'safe' | 'silent' | 'turbulent';
  cognitiveLayerState: 'aligned' | 'fragmented';
  behaviouralLayerState: 'adaptive' | 'defensive';
}

export interface UserProfile {
  name: string;
  email: string;
  title: string;
  sector: SectorType;
  lifeStage: LifeStage;
  culturalRegion: CulturalRegion;
  country: string;
  pathway: AppPathway;
  experienceYears: number;
  tier: MembershipTier;
  createdAt: string;
  avatar?: string;
  photoUrl?: string;
  authorPhotoUrl?: string;
  bio?: string;
  leadershipGoal?: string;
  currentChallenge?: string;
  coreValues?: string[];
  hasCompletedOnboarding?: boolean;
}

export interface MemoryVaultItem {
  id: string;
  category: 'value' | 'trigger' | 'breakthrough' | 'goal' | 'personal_trait';
  content: string;
  createdAt: string;
}

export interface UserDocument {
  id: string;
  title: string;
  category: 'company_mission' | 'team_charter' | 'performance_review' | 'dilemma_brief';
  content: string;
  updatedAt: string;
}

export interface PsychometricReport {
  title: string;
  date: string;
  methodologyUpdates: string;
  newQuestions: Array<{
    sectionKey: 'RAAG' | 'LSTM' | 'ADG' | 'ACL';
    sectionName: string;
    text: string;
    citation: string;
  }>;
}

export interface SessionVideo {
  id: string;
  title: string;
  date: string;
  durationSec: number;
  videoBlobUrl?: string;
  transcriptSummary: string;
  matrixScores?: { raag: number; lstm: number; adg: number; acl: number };
}

export interface DiagnosticResult {
  completedAt: string;
  raagScore: number;
  lstmScore: number;
  adgScore: number;
  aclScore: number;
  compositeScore: number;
  band: string;
  weakestMatrix: 'RAAG' | 'LSTM' | 'ADG' | 'ACL';
  answers: Record<number, number>;
}

export interface DayScorecardData {
  pause: boolean;
  perceive: boolean;
  reframe: boolean;
  act: boolean;
  grow: boolean;
  adjust: boolean;
  score: number;
  journalText: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  helpful?: boolean;
}

export interface BookedSession {
  id: string;
  coachId: string;
  coachName: string;
  dateTime: string;
  sessionTopic: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  fee: number;
  currency: string;
}

export interface TeamMemberProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  compositeScore: number;
  primaryQuadrant: string;
  psychologicalSafetyRating: number;
}

export interface CustomOrgQuestion {
  id: string;
  text: string;
  category: 'hybrid_compliance' | 'ai_governance' | 'remote_alignment' | 'cross_functional' | 'ethical_oversight' | 'custom';
  customCategoryLabel?: string;
  orgTag: string;
  addedAt: string;
}

export interface EnterpriseSSOConfig {
  provider: 'okta' | 'azure_ad' | 'google_workspace';
  tenantId: string;
  clientId: string;
  domain: string;
  ssoUrl: string;
  isConnected: boolean;
  lastSyncAt?: string;
  anonymizedSurveyDeployed: boolean;
}

export interface TenantCohort {
  id: string;
  name: string;
  department: string;
  memberCount: number;
  surveyCompletionRate: number;
  aclIndex: number;
  psychologicalSafety: number;
  ragStatus: 'green' | 'amber' | 'red';
  lastSurveyDate: string;
}

// =========================================================================
// ENHANCEMENT 1: DYNAMIC SCHOLARLY RESEARCH REPOSITORY
// =========================================================================
export type RalPhase = 'Pause' | 'Pursue' | 'Reframe' | 'Decouple' | 'Team Coherence';

export interface ScholarlyPaper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number; // 60-70% published in 2021-2026
  doi: string;
  ralPhase: RalPhase;
  matrixAlignment: 'RAAG' | 'LSTM' | 'ADG' | 'ACL' | 'General';
  methodology: 'Empirical Meta-Analysis' | 'Neuroimaging (fMRI)' | 'Randomized Controlled Trial' | 'Longitudinal Field Study' | 'Longitudinal Cohort' | 'Behavioral Experiment' | 'Qualitative Executive Ethnography';
  citationCount: number;
  executiveSummary: string;
  keyFinding: string;
  practicalApplication: string;
  readTimeMinutes: number;
  externalLink?: string;
  isWeeklySpotlight?: boolean;
}

// =========================================================================
// ENHANCEMENT 3: ADAPTIVE, PERSONALITY-BASED QUESTION AGENT
// =========================================================================
export interface AdaptiveQuestion {
  id: string;
  phase: RalPhase;
  matrixAlignment: 'RAAG' | 'LSTM' | 'ADG' | 'ACL';
  text: string;
  subtext: string;
  targetRole: ('c_suite' | 'vp_director' | 'team_lead' | 'military_ops' | 'founder' | 'all')[];
  developmentalStage: ('emerging' | 'mid_career' | 'senior_executive' | 'all')[];
  targetedSentiments: ReflectiveSentiment[];
  difficulty: 'foundational' | 'intermediate' | 'advanced';
  rationale: string;
  reflectionPrompt: string;
  microDrill: string;
}

export interface AdaptiveQuestionSession {
  id: string;
  dateKey: string;
  weekNumber: number;
  questions: AdaptiveQuestion[];
  answers: Record<string, number>; // questionId -> 1..5 score
  sentimentAtStart: ReflectiveSentiment;
  completedAt?: string;
  overallScore?: number;
  phaseScores?: Record<RalPhase, number>;
  tailoredRecommendation?: string;
}

// =========================================================================
// ENHANCEMENT 4: AFFORDABLE, CUSTOMIZABLE COACHING
// =========================================================================
export interface VerifiedCoach {
  id: string;
  name: string;
  title: string;
  credentials: string[];
  bio: string;
  avatarUrl: string;
  specialties: string[];
  originalMarketRateUsd: number; // e.g. 480
  subsidizedRateUsd: number;      // ~25% of market rate, e.g. 120
  currency: CurrencyCode;
  availabilityStatus: 'Available This Week' | '2 Slots Left' | 'By Waitlist';
  contactEmail: string;
  bookingCalendarUrl: string;
  whatsappContact?: string;
  linkedInUrl?: string;
  isRecommended: boolean;
  verifiedBadge: boolean;
  cohortTags: string[];
  yearsExperience: number;
  sessionsCompleted: number;
}

