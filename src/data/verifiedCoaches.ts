import { VerifiedCoach } from '../types';

/**
 * Initial roster of approved, verified coaches recommended by RK Vedant.
 * Rates subsidized to approximately 25% of prevailing executive coaching rates.
 */
export const DEFAULT_VERIFIED_COACHES: VerifiedCoach[] = [
  {
    id: 'coach-vedant',
    name: 'RK Vedant',
    title: 'Doctrine Author & Strategic Mentor',
    credentials: ['Former Military Commander', '22+ Yrs High-Stakes Command', 'Executive C-Suite Advisor'],
    bio: 'Pioneered the Reflective Adaptive Leadership doctrine through decades of operational command and post-command executive guidance for Fortune 500 CEOs, senior civil servants, and board directors.',
    avatarUrl: '/src/assets/images/rk_vedant_author_1792241867695.jpg',
    specialties: ['Command Presence', 'Crisis Decoupling', 'Upanishadic Introspection', 'Boardroom Governance'],
    originalMarketRateUsd: 600,
    subsidizedRateUsd: 145, // ~24% of market rate
    currency: 'USD',
    availabilityStatus: '2 Slots Left',
    contactEmail: 'rkvedant56@gmail.com',
    bookingCalendarUrl: 'https://calendly.com/rkvedant-executive/ral-mentorship',
    whatsappContact: '+91 98110 00000',
    linkedInUrl: 'https://linkedin.com/in/rk-vedant-doctrine',
    isRecommended: true,
    verifiedBadge: true,
    cohortTags: ['Doctrine Author', 'Military & C-Suite', 'Bespoke Executive'],
    yearsExperience: 24,
    sessionsCompleted: 1420
  },
  {
    id: 'coach-sengupta',
    name: 'Dr. Aarav Sengupta',
    title: 'Cognitive Neuroscientist & Senior RAL Fellow',
    credentials: ['Ph.D. Cognitive Neuroscience (NIMHANS)', 'Ex-Defense Research Lead', 'Biofeedback Certified'],
    bio: 'Specializes in the neural mechanics of executive decision fatigue, vagal nerve tone regulation, and rapid recovery protocols following high-stakes operational crises.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    specialties: ['Somatic Down-Regulation', 'Amygdala Calming', 'Interoceptive Calibration', 'Sleep Architecture'],
    originalMarketRateUsd: 460,
    subsidizedRateUsd: 115, // 25% of market rate
    currency: 'USD',
    availabilityStatus: 'Available This Week',
    contactEmail: 'aarav.sengupta@ralcoach.org',
    bookingCalendarUrl: 'https://calendly.com/dr-aarav-sengupta/neuro-calibration',
    whatsappContact: '+91 98450 11223',
    linkedInUrl: 'https://linkedin.com/in/dr-aarav-sengupta',
    isRecommended: true,
    verifiedBadge: true,
    cohortTags: ['Neuroscience', 'Burnout Inoculation', 'RAL Fellow'],
    yearsExperience: 14,
    sessionsCompleted: 880
  },
  {
    id: 'coach-rathore',
    name: 'Col. Vikramaditya Rathore (Retd.)',
    title: 'Crisis Command Specialist & Operational Mentor',
    credentials: ['Special Forces Veteran', 'National Defence Academy Alum', 'High-Hazard Incident Director'],
    bio: 'Brings battlefield-tested clarity into corporate crises. Specializes in rapid frame separation, team psychological armor under hostile takeovers, and high-velocity decision grids.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    specialties: ['High-Velocity Incident Response', 'Commander Intent Execution', 'Tactical Silence', 'Operational Resilience'],
    originalMarketRateUsd: 500,
    subsidizedRateUsd: 125, // 25% of market rate
    currency: 'USD',
    availabilityStatus: 'Available This Week',
    contactEmail: 'col.rathore@ralcoach.org',
    bookingCalendarUrl: 'https://calendly.com/col-rathore/crisis-command',
    whatsappContact: '+91 99100 44556',
    linkedInUrl: 'https://linkedin.com/in/col-vikram-rathore',
    isRecommended: true,
    verifiedBadge: true,
    cohortTags: ['Crisis Management', 'Military Veteran', 'High-Reliability'],
    yearsExperience: 22,
    sessionsCompleted: 950
  },
  {
    id: 'coach-rostova',
    name: 'Dr. Elena Rostova',
    title: 'Organizational Psychologist & Culture Architect',
    credentials: ['Ph.D. Org Behavior (INSEAD)', 'ICF Master Certified Coach (MCC)', 'Board Assessment Specialist'],
    bio: 'Guides executive committees through complex systemic realignments, unblocking truth-speaking channels, eliminating dysfunctional executive silos, and establishing collective psychological safety.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    specialties: ['Adaptive Culture Lattice', 'Truth-Speaking Indices', 'Cross-Functional Trust', 'Boardroom Coherence'],
    originalMarketRateUsd: 480,
    subsidizedRateUsd: 120, // 25% of market rate
    currency: 'USD',
    availabilityStatus: '2 Slots Left',
    contactEmail: 'elena.rostova@ralcoach.org',
    bookingCalendarUrl: 'https://calendly.com/dr-elena-rostova/culture-lattice',
    linkedInUrl: 'https://linkedin.com/in/elena-rostova-phd',
    isRecommended: true,
    verifiedBadge: true,
    cohortTags: ['Culture Lattice', 'Board Governance', 'ICF Master'],
    yearsExperience: 16,
    sessionsCompleted: 1120
  },
  {
    id: 'coach-chen',
    name: 'Marcus Chen',
    title: 'Venture & Scale-Up Executive Mentor',
    credentials: ['2x Enterprise Founder Exit', 'Stanford GSB Fellow', 'Product Execution Strategist'],
    bio: 'Mentors founders and scaling tech executives through rapid growth bottlenecks, capital allocation trade-offs, and decisive execution using the Adaptive Decision Grid (ADG).',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    specialties: ['Adaptive Decision Grid', 'Kill-Criteria Formulation', 'Founder Identity Decoupling', 'Capital Velocity'],
    originalMarketRateUsd: 440,
    subsidizedRateUsd: 110, // 25% of market rate
    currency: 'USD',
    availabilityStatus: 'By Waitlist',
    contactEmail: 'marcus.chen@ralcoach.org',
    bookingCalendarUrl: 'https://calendly.com/marcus-chen/adg-strategy',
    linkedInUrl: 'https://linkedin.com/in/marcus-chen-exec',
    isRecommended: true,
    verifiedBadge: true,
    cohortTags: ['Venture Scale', 'Tech Founders', 'ADG Mastery'],
    yearsExperience: 12,
    sessionsCompleted: 740
  },
  {
    id: 'coach-nambisan',
    name: 'Priya Nambisan',
    title: 'Executive Presence & Contemplative Mastery Lead',
    credentials: ['Mindfulness in Governance Certified', 'Former Civil Services Counselor', 'Vipassana Acharya'],
    bio: 'Trains senior bureaucrats, diplomats, and healthcare executives in the subtle art of dispassionate presence, somatic grounding under political scrutiny, and cognitive spaciousness.',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    specialties: ['Witness-Consciousness', 'Empathic Detachment', 'Somatic Centering', 'Diplomatic Composure'],
    originalMarketRateUsd: 380,
    subsidizedRateUsd: 95, // 25% of market rate
    currency: 'USD',
    availabilityStatus: 'Available This Week',
    contactEmail: 'priya.nambisan@ralcoach.org',
    bookingCalendarUrl: 'https://calendly.com/priya-nambisan/presence-guidance',
    whatsappContact: '+91 97200 88990',
    linkedInUrl: 'https://linkedin.com/in/priya-nambisan',
    isRecommended: true,
    verifiedBadge: true,
    cohortTags: ['Executive Presence', 'Public Sector', 'Contemplative'],
    yearsExperience: 15,
    sessionsCompleted: 1040
  }
];

const STORAGE_KEY = 'ral_verified_coaches_v2';

/**
 * Loads verified coaches from localStorage with fallback to default preset
 */
export function loadVerifiedCoaches(): VerifiedCoach[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse cached verified coaches', e);
  }
  return DEFAULT_VERIFIED_COACHES;
}

/**
 * Persists verified coaches list to localStorage
 */
export function saveVerifiedCoaches(coaches: VerifiedCoach[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(coaches));
  } catch (e) {
    console.error('Failed to save verified coaches to localStorage', e);
  }
}
