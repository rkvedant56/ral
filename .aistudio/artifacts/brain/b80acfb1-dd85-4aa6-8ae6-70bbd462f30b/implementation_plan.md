# Four Major Enhancements: Dynamic Research, Adaptive Question Agent, Homepage Image & Affordable Coaching

A comprehensive upgrade to the RAL Coach platform delivering an authentic 100+ paper scholarly research repository with automated weekly rotation, a bulletproof persistent homepage image manager, an adaptive psychometric question agent delivering 10–15 tailored questions per session, and an affordable 1-on-1 coaching marketplace with 75% subsidized pricing and directly editable coach cards.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during Phase 1 clarification and govern this implementation plan:
> - **Adaptive Question Agent Delivery**: Hybrid approach (Options 1 & 2) — users will interact via a **Dedicated Daily Check-In Modal & Practice Dashboard widget** AND have the questions **seamlessly integrated into the Socratic AI Coach chat sessions**.
> - **Scholarly Research Presentation**: Dual experience (Options 1 & 2) — a **Curated Active Shelf of 100 verified papers** with an automated **Featured Weekly Spotlight**, backed by a full searchable catalog archive with filtering by RAL phase, publication date, and methodology.
> - **Coaching Marketplace Management**: Option 3 — **Editable coach cards with direct contact links and rates**, enabling verified recommendations, transparent ~25% pricing, and direct administrative editing.

---

## 1. Overview & Core Concept

The Reflective Adaptive Leadership (RAL) platform transforms executive decision-making through rigorous cognitive training. These four enhancements elevate the platform from a conceptual tool into an authoritative enterprise-grade ecosystem:

1. **Dynamic Research Repository (100+ Papers)**: An authentic, peer-reviewed database of over 100 verified scholarly papers from premier journals (*Harvard Business Review*, *The Leadership Quarterly*, *Journal of Applied Psychology*, *Nature Human Behaviour*, *Psychological Science*). 60–70% of papers are published between 2021 and 2026. Includes an automated weekly rotation engine that highlights fresh papers each calendar week while preserving permanent citation access and DOI links.
2. **Functional Homepage Image Replacement**: Robust, resilient image management for the Doctrine Author credentials on the Home view. Features direct hover/click triggers on the homepage card, drag-and-drop file upload with client-side image compression, custom URL support, curated executive presets, instant state synchronization across the navigation bar and Author Modal, and failover storage in `localStorage`.
3. **Adaptive, Personality-Based Question Agent**: An intelligent diagnostic agent backed by a bank of 120–150 calibrated questions spanning all RAL phases (Pause, Pursue, Reframe, Decouple, and Team Coherence). Generates 10–15 personalized questions per login tailored to the user's role (C-Suite, VP, Founder, Commander), developmental stage, psychometric diagnostic scores, and current emotional sentiment. Exposed in both a focused check-in modal/practice tracker and the conversational AI coach dock.
4. **Affordable, Customizable Coaching Marketplace**: Democratizes access to elite executive mentorship by reducing rates to approximately 25% of prevailing executive market rates (subsidized from $450–$600 down to $95–$145 per session). Features a verified roster of certified RAL Doctrine Fellows, military mentors, and executive coaches, complete with in-place editable cards, availability toggles, negotiated pricing, and direct calendar/contact links.

---

## 2. User Experience & Visual Design

### Key User Flows

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. Dynamic Research Repository Flow                                         │
│    Explore Research Tab ──► View Weekly Spotlight ──► Filter by RAL Phase    │
│    (Pause/Pursue/Reframe) ──► View DOI & Executive Takeaway ──► Export APA  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. Homepage Image Customization Flow                                        │
│    Home View Author Card ──► Click "Change Photo" Badge ──► Open Image Hub  │
│    Upload Local Image OR Select Preset ──► Live Preview ──► Save & Persist  │
│    (Auto-syncs across Home, Author Modal & Header Nav)                      │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. Adaptive Question Agent Flow                                             │
│    Session Login ──► Personality Calibration Check ──► 10-15 Tailored Qs    │
│    Engage in Daily Practice Modal OR Ask AI Coach to Run Question Drill    │
│    Submit Answers ──► Visual Radar Shift ──► Personalized RAL Action Plan   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 4. Affordable Coaching Flow                                                 │
│    Pricing / Coaching Tab ──► Filter Approved RAL Coaches ──► View 25% Rate │
│    Direct Booking / WhatsApp / Email ──► [Admin] Edit Coach Card In-Place   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Visual Identity & Layout Architecture

- **Aesthetic Direction**: Executive Navy & Emerald Editorial (`#030d0a` deep pine canvas, `#0a192f` slate navy surfaces, `#d97706` warm amber accents, `#10b981` emerald vitality indicators).
- **Zero-Pill & Metadata Discipline**: In accordance with the frontend design constitution, static paper metadata (publication year, journal name, citations count, reading time) will appear as clean unboxed text separated by subtle typographic dots (`·`), avoiding colored candy pill boxes.
- **Top Bar Contract**: Maintain the strict three-zone top navigation contract with single-line text links and no extraneous badges or secondary pills.
- **Desktop & Mobile Rhythm**: 1440px baseline container layout with generous 24px–32px whitespace, hairline borders (`border-slate-800` / `border-emerald-950`), and single-elevation cards.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Research Repository Storage & Weekly Rotation Engine
- **Chosen Approach**: A comprehensive in-app typed dataset (`scholarlyPapers.ts`) containing 100+ fully verified, authentic scholarly papers with actual DOIs, authors, publication years (65% 2021–2026), abstracts, and RAL matrix alignments. The weekly rotation is calculated using an ISO week-number hash (`getWeeklySpotlight(weekNumber)`) that deterministically selects 12 spotlight papers for the active week while maintaining full access to the complete 100+ repository.
- **Why**: Guarantees zero broken external API dependencies or network rate limits, ensures 100% authentic academic rigor, and provides an immediate, offline-capable rotation experience.
- **Alternatives Considered**: Live PubMed/Semantic Scholar API calls on each render; rejected because external academic APIs have strict CORS rules, rate limits, and often return non-leadership medical noise.

### Decision 2: Homepage Image Persistence & Reliability
- **Chosen Approach**: Multi-tier persistence storing image data in `localStorage` under `ral_author_photo_url` with automatic fallback to `/public/rk_vedant_portrait.jpg` and `/src/assets/images/rk_vedant_author_1792241867695.jpg`. Client-side Canvas downsampling for user-uploaded images ensures payloads stay comfortably within `localStorage` quotas (<2MB) without quota-exceeded exceptions.
- **Why**: Protects user uploads from breaking across reloads or server restarts, operates purely client-side without requiring authenticated S3/GCS buckets, and updates all three image consumers (`HomeView`, `Navbar`, and `AuthorModal`) instantaneously.

### Decision 3: Adaptive Question Agent Architecture
- **Chosen Approach**: A psychometric question bank of 130+ multi-dimensional questions categorized across RAL phases, leadership roles, and developmental tiers. An adaptive selection function evaluates the user's profile (role, life stage, diagnostic scores, and active emotional sentiment) to generate a tailored 10–15 question cohort per login.
- **Why**: Solves repetitive diagnostic fatigue. Users receive relevant, progressive inquiries that challenge their specific blind spots (e.g., an "Agitated" VP receives de-escalation and frame-separation questions; a "Depleted" C-suite leader receives energy conservation and somatic questions).

### Decision 4: Affordable Coaching Architecture & In-Place Editing
- **Chosen Approach**: A dedicated, interactive Coaching Marketplace component embedded within the membership/pricing experience and accessible via the Coach view. Displays approved certified coaches at transparent 25% rates (e.g. $110/session vs $440 standard). Each card features an "Edit Profile" mode with direct inputs for rates, bio, specialty, availability status, and booking URL, saved to persistent state.
- **Why**: Satisfies the user's exact requirement for editable sections, transparent pricing reduction, verified coach exclusivity, and direct booking links without complicated backend setups.

---

## 4. Technical Architecture & Data Strategy

### System Component Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           RAL Coach Application                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                            AppContext                                 │  │
│  │  - authorPhotoUrl + setAuthorPhotoUrl (with Canvas Downsampling)     │  │
│  │  - adaptiveQuestionEngine (130+ Questions, Tailored 10-15 per login) │  │
│  │  - researchRepository (100+ Verified Papers, ISO-Week Rotation)       │  │
│  │  - verifiedCoaches (25% Subsidized Rates, Editable Profiles)         │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│           │                       │                       │                 │
│           ▼                       ▼                       ▼                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐          │
│  │    HomeView     │    │  ResearchView   │    │   Coach &       │          │
│  │  - Direct Image │    │  - 100+ Papers  │    │   PracticeViews │          │
│  │    Editor Modal │    │  - Weekly Shelf │    │  - Adaptive Qs  │          │
│  │  - Preset Hub   │    │  - Phase Filters│    │    Daily Modal  │          │
│  │  - Synchronized │    │  - DOI & BibTeX │    │  - Chat Drill   │          │
│  │    Author Card  │    │    Export       │    │  - 25% Coaching │          │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Core Entities & Data Structures

```typescript
// 1. Scholarly Research Paper
interface ScholarlyPaper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number; // 60-70% in 2021-2026
  doi: string;
  ralPhase: 'Pause' | 'Pursue' | 'Reframe' | 'Decouple' | 'Team Coherence';
  methodology: 'Empirical Meta-Analysis' | 'Neuroimaging (fMRI)' | 'Randomized Controlled Trial' | 'Longitudinal Cohort';
  citationCount: number;
  executiveSummary: string;
  keyFinding: string;
  practicalApplication: string;
  pdfUrl?: string;
  isWeeklySpotlight?: boolean;
}

// 2. Adaptive Question
interface AdaptiveQuestion {
  id: string;
  phase: 'Pause' | 'Pursue' | 'Reframe' | 'Decouple' | 'Team Coherence';
  text: string;
  subtext: string;
  targetRole: ('c_suite' | 'vp_director' | 'team_lead' | 'military_ops' | 'founder' | 'all')[];
  developmentalStage: ('emerging' | 'mid_career' | 'senior_executive' | 'all')[];
  targetedSentiments: ReflectiveSentiment[];
  difficulty: 'foundational' | 'intermediate' | 'advanced';
  rationale: string;
  matrixAlignment: string;
}

// 3. Verified Coach Profile
interface VerifiedCoach {
  id: string;
  name: string;
  title: string;
  credentials: string[];
  avatarUrl: string;
  specialties: string[];
  originalMarketRateUsd: number; // e.g. 450
  subsidizedRateUsd: number;      // e.g. 115 (approx 25%)
  currency: 'USD' | 'INR' | 'EUR' | 'GBP';
  availabilityStatus: 'Available This Week' | '2 Slots Left' | 'By Waitlist';
  contactEmail: string;
  bookingCalendarUrl: string;
  linkedInUrl?: string;
  whatsappContact?: string;
  isRecommended: boolean;
  verifiedBadge: boolean;
}
```

### Component & State Mapping

1. **`src/data/scholarlyRepository.ts`**: Contains 105 meticulously curated, peer-reviewed leadership and neuroscience papers with authentic DOIs, citation counts, and executive summaries (70 papers published 2021–2026; 35 seminal papers 2015–2020). Includes `getWeeklyRotatedShelf()` calculating deterministic week-based rotation.
2. **`src/data/adaptiveQuestionBank.ts`**: Contains 135 calibrated questions with multidimensional tagging and the `generateAdaptiveQuestionSet(user, sentiment, diagnostic)` generator.
3. **`src/components/HomepageImageManagerModal.tsx`**: A polished image replacement modal with file upload, canvas resize, preset selection, URL input, and persistent save callback.
4. **`src/components/AdaptiveQuestionModal.tsx`**: The interactive 10–15 question daily check-in modal with progress bar, scoring, and instant actionable insight.
5. **`src/components/AffordableCoachingSection.tsx`**: The verified 25% pricing coach grid with in-place card editing, filter tabs, and direct booking triggers.
6. **Integration in `HomeView.tsx`, `PsychometricResearchView.tsx`, `CoachView.tsx`, `PracticeView.tsx`, and `PricingView.tsx`**.
