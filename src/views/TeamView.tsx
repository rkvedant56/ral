import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  BarChart2, 
  Printer, 
  Calendar, 
  Award, 
  CheckCircle, 
  AlertCircle,
  FileSpreadsheet,
  Download,
  Star,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  Key,
  Building2,
  Send,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { HUMAN_COACHES } from '../data/ralFramework';
import { RadarChart } from '../components/RadarChart';
import { EnterpriseSSOModal } from '../components/EnterpriseSSOModal';

export const TeamView: React.FC = () => {
  const { 
    teamName, 
    setTeamName, 
    teamMembers, 
    addTeamMember, 
    bookedSessions, 
    bookSession, 
    currency,
    ssoConfig,
    cohorts,
    deployCohortPulseSurvey
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'assessment' | 'marketplace' | 'report' | 'sso_cohorts'>('dashboard');
  const [isSSOOpen, setIsSSOOpen] = useState(false);

  // New member invite modal
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');
  const [newMemberDept, setNewMemberDept] = useState('');

  // Coach booking modal
  const [selectedCoach, setSelectedCoach] = useState<any | null>(null);
  const [bookingDate, setBookingDate] = useState('2026-10-15');
  const [bookingTime, setBookingTime] = useState('14:00');
  const [bookingTopic, setBookingTopic] = useState('Navigating Team Disconnection Under Speed');

  // Pulse Survey Simulator
  const [pulseScores, setPulseScores] = useState({
    emotional: 76,  // Safety vs silence
    cognitive: 68,  // Shared meaning vs fragmented
    behavioural: 72 // Adaptive execution vs stagnation
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    addTeamMember({
      name: newMemberName.trim(),
      role: newMemberRole.trim() || 'Team Lead',
      department: newMemberDept.trim() || 'Operations',
      compositeScore: Math.floor(Math.random() * 40) + 120, // 120 - 160
      primaryQuadrant: 'Reflective-Adaptive',
      psychologicalSafetyRating: Math.floor(Math.random() * 25) + 65
    });

    setNewMemberName('');
    setNewMemberRole('');
    setNewMemberDept('');
    setIsInviteOpen(false);
  };

  const handleConfirmBooking = () => {
    if (!selectedCoach) return;
    bookSession({
      coachId: selectedCoach.id,
      coachName: selectedCoach.name,
      dateTime: `${bookingDate} at ${bookingTime}`,
      sessionTopic: bookingTopic,
      fee: selectedCoach.hourlyRate,
      currency: currency
    });
    setSelectedCoach(null);
    try {
      confetti({ particleCount: 50, spread: 50 });
    } catch (e) {}
  };

  // Aggregated team stats
  const avgComposite = Math.round(teamMembers.reduce((a, b) => a + b.compositeScore, 0) / teamMembers.length);
  const avgSafety = Math.round(teamMembers.reduce((a, b) => a + b.psychologicalSafetyRating, 0) / teamMembers.length);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold">
            Collective Intelligence & Systemic Alignment
          </span>
          <h1 className="text-3xl font-heading font-bold text-slate-100 mt-1">
            Reflective Adaptive Team & Org Mode
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Engineer collective psychological safety and diagnose hidden systemic fractures across the Adaptive Culture Lattice (ACL).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsInviteOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-md shadow-amber-500/20"
          >
            <UserPlus size={14} />
            <span>Invite Colleague</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-semibold overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Team Health Dashboard
        </button>
        <button
          onClick={() => setActiveTab('assessment')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'assessment' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Guided Org Assessment
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'report' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Consulting Executive Report
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'marketplace' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Book a Human Coach
        </button>
      </div>

      {/* Tab 1: Team Health Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Top Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#0a1128] border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Team Composite Score</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-heading font-bold text-amber-300">{avgComposite}</span>
                <span className="text-xs text-slate-400">/ 200 (Emerging RAL)</span>
              </div>
              <p className="text-[10px] text-emerald-400 mt-1">↑ +8% from last month's baseline</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0a1128] border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Psychological Safety Index</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-heading font-bold text-sky-300">{avgSafety}%</span>
                <span className="text-xs text-slate-400">Target: &gt;80%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Low defensive silence reported</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0a1128] border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Decision Alignment Rate</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-heading font-bold text-emerald-300">84%</span>
                <span className="text-xs text-slate-400">ADG Matrix 3</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Reflective Delay utilized effectively</p>
            </div>
          </div>

          {/* ACL Three Layers Pulse */}
          <div className="bg-[#0a1128] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-heading font-bold text-slate-100 text-base">Adaptive Culture Lattice (ACL) Pulse</h3>
                <p className="text-xs text-slate-400">Three-layer systemic diagnostic protocol</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Live Anonymized Scan
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-slate-200">1. Emotional Layer: Safety vs Silence</span>
                  <span className="font-mono text-amber-300 font-bold">{pulseScores.emotional}%</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${pulseScores.emotional}%` }} />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Question: "Was truth spoken early today? Did people feel safe to disagree?"
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-slate-200">2. Cognitive Layer: Shared Meaning vs Fragmentation</span>
                  <span className="font-mono text-sky-300 font-bold">{pulseScores.cognitive}%</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${pulseScores.cognitive}%` }} />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Question: "Did we align meaning and clarify assumptions, or did teams think separately?"
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-slate-200">3. Behavioural Layer: Adaptive Execution vs Stagnation</span>
                  <span className="font-mono text-emerald-300 font-bold">{pulseScores.behavioural}%</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pulseScores.behavioural}%` }} />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Question: "Did we adapt plans to new evidence or defensively cling to outdated habit?"
                </p>
              </div>
            </div>
          </div>

          {/* Team Member Directory */}
          <div className="bg-[#0a1128] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-slate-100 text-base">Active Team Cohort ({teamMembers.length})</h3>
              <span className="text-xs text-slate-400">{teamName}</span>
            </div>

            <div className="divide-y divide-slate-800/80">
              {teamMembers.map((member) => (
                <div key={member.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-200 block">{member.name}</span>
                    <span className="text-[11px] text-slate-400">{member.role} · {member.department}</span>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="font-mono font-bold text-amber-300 block">{member.compositeScore}</span>
                      <span className="text-[10px] text-slate-500">RAL Composite</span>
                    </div>

                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-medium">
                      {member.primaryQuadrant}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Guided Org Assessment */}
      {activeTab === 'assessment' && (
        <div className="bg-[#0a1128] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <span className="text-xs uppercase font-mono text-amber-400 font-bold">Consulting Diagnostic Engine</span>
            <h3 className="text-xl font-heading font-bold text-slate-100 mt-0.5">
              Organizational Coherence & Friction Audit
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Identifies unseen friction lines across communication, executive pacing, and digital noise.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-200">1. Digital Speed & Meeting Overload</h4>
              <p className="text-slate-400">Do teams spend more than 40% of their bandwidth reacting to instant messages and unreflective emergency syncs?</p>
              <div className="flex gap-2 pt-1">
                {['Severe Friction', 'Moderate Noise', 'Balanced Rhythm'].map((opt, i) => (
                  <button key={i} className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:border-amber-400 text-xs">
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-200">2. Psychological Safety in Retrospectives</h4>
              <p className="text-slate-400">When projects encounter failure or slippage, is truth spoken early or concealed until quarterly reports?</p>
              <div className="flex gap-2 pt-1">
                {['Truth Spoken Early', 'Hesitant Disclosure', 'Defensive Silence'].map((opt, i) => (
                  <button key={i} className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:border-amber-400 text-xs">
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-200">3. Cross-Functional Cognitive Alignment</h4>
              <p className="text-slate-400">Do Engineering, Product, and Leadership share a coherent interpretation of strategic trade-offs?</p>
              <div className="flex gap-2 pt-1">
                {['Highly Coherent', 'Partial Misalignment', 'Siloed Friction'].map((opt, i) => (
                  <button key={i} className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:border-amber-400 text-xs">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => setActiveTab('report')}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
            >
              <span>Generate Executive Action Plan</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Consulting Executive Report (Printable) */}
      {activeTab === 'report' && (
        <div className="bg-[#0a1128] border border-amber-500/30 rounded-2xl p-6 sm:p-10 space-y-8 shadow-2xl print:border-none print:p-0">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">Confidential Leadership Audit</span>
              <h2 className="text-2xl font-heading font-bold text-slate-100 mt-1">
                Reflective Adaptive Organization Report
              </h2>
              <p className="text-xs text-slate-400">
                Prepared for: {teamName} · Benchmark Date: October 2026
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition"
            >
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>
          </div>

          {/* Executive Summary Narrative */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h4 className="font-heading font-bold text-amber-300 text-base">1. Executive Overview</h4>
            <p>
              Based on the psychometric evaluation across the four core RAL matrices (RAAG, LSTM, ADG, ACL), the evaluated cohort exhibits an aggregate score of <strong>{avgComposite}/200</strong>, categorizing the organization in the <em>Emerging Adaptive Leader</em> band.
            </p>
            <p>
              While technical competence remains superior, the organization carries quantifiable friction in the <strong>Cognitive Layer of the Culture Lattice</strong>. Information acceleration has induced localized reactive patterns, where leaders misread team hesitation as inefficiency rather than emotional fatigue.
            </p>
          </div>

          {/* Key Measurable Findings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1 font-bold">Psychological Safety</span>
              <span className="text-2xl font-bold text-sky-400">{avgSafety}%</span>
              <p className="text-slate-500 mt-1">Risk of defensive silence during deadline crunches.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1 font-bold">Decision Speed vs Quality</span>
              <span className="text-2xl font-bold text-amber-400">84%</span>
              <p className="text-slate-500 mt-1">Need to expand usage of Reflective Delay (ADG State 2).</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1 font-bold">Estimated Rework Avoidance</span>
              <span className="text-2xl font-bold text-emerald-400">320 Hrs</span>
              <p className="text-slate-500 mt-1">Annual savings achieved by instituting the 5-Minute Silent Start.</p>
            </div>
          </div>

          {/* 90-Day Systemic Action Plan */}
          <div className="space-y-4 text-xs">
            <h4 className="font-heading font-bold text-amber-300 text-base">2. Recommended 90-Day Systemic Intervention</h4>
            <div className="space-y-2.5">
              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-100 block mb-0.5">Days 1–30: Institutionalize the Silent Start</span>
                <p className="text-slate-300">Mandate 3 minutes of quiet writing before all cross-functional design reviews to clear emotional noise and eliminate assumption layering.</p>
              </div>
              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-100 block mb-0.5">Days 31–60: Deploy the ADG Decision Protocol</span>
                <p className="text-slate-300">Require all tier-1 architectural changes to check whether inner clarity matches outer reality before committing resources, enforcing Reflective Delay when ambiguity persists.</p>
              </div>
              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-100 block mb-0.5">Days 61–90: Cultural Lattice Re-Audit</span>
                <p className="text-slate-300">Run an anonymized 360° pulse across all squads to verify psychological safety gains and baseline scores above 35 on every matrix.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Book a Human Coach Marketplace */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0a1538] to-[#070e24] border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400">Certified Executive Mentorship</span>
              <h3 className="text-xl font-heading font-bold text-slate-100 mt-0.5">
                The RAL Executive Coaching Network
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Partner with certified former military commanders, cognitive neuroscientists, and corporate transformation partners trained directly in the RAL doctrine.
              </p>
            </div>
            <span className="text-xs text-amber-300 px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/30 font-semibold self-start md:self-center">
              100% Guaranteed Confidentiality
            </span>
          </div>

          {/* Coach Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HUMAN_COACHES.map((coach) => (
              <div
                key={coach.id}
                className="bg-[#0a1128] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/40 transition group shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={coach.avatar}
                      alt={coach.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-amber-400/30"
                    />
                    <div>
                      <h4 className="font-heading font-bold text-slate-100 text-sm group-hover:text-amber-200 transition">
                        {coach.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{coach.title}</p>
                      <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-1">
                        <Star size={12} fill="currentColor" />
                        <span className="font-bold">{coach.rating}</span>
                        <span className="text-slate-500">({coach.reviewsCount} sessions)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {coach.bio}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px]">
                    <span className="text-slate-400 block font-medium">Specialties:</span>
                    <div className="flex flex-wrap gap-1">
                      {coach.specialties.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-amber-300 font-mono">
                      ${coach.hourlyRate}
                    </span>
                    <span className="text-[10px] text-slate-400"> / hour</span>
                  </div>

                  <button
                    onClick={() => setSelectedCoach(coach)}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Booked Sessions List (if any) */}
          {bookedSessions.length > 0 && (
            <div className="bg-[#0a1128] border border-slate-800 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs uppercase font-bold text-slate-300">Your Confirmed Human Coaching Sessions</h4>
              <div className="space-y-2">
                {bookedSessions.map((b) => (
                  <div key={b.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-amber-300 block">{b.coachName}</span>
                      <span className="text-slate-400">{b.sessionTopic}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-200 block font-mono">{b.dateTime}</span>
                      <span className="text-[10px] text-emerald-400 font-semibold uppercase">Confirmed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upsell: RAL Certified Practitioner */}
          <div className="p-6 bg-gradient-to-br from-[#121c3b] to-[#091128] border border-amber-500/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400">Certification Program</span>
              <h4 className="text-lg font-heading font-bold text-slate-100 mt-0.5">
                Become a RAL Certified Executive Practitioner
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Master RK Vedant's four matrices, psychometrics, and culture transformation protocols. Lead workshops and consult organizations globally.
              </p>
            </div>
            <button
              onClick={() => alert("Registration for the next RAL Executive Certification cohort opens next quarter. Your seat priority has been recorded.")}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/40 font-bold text-xs transition shrink-0"
            >
              Join Certification Waitlist
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {selectedCoach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#0c142b] border border-amber-500/30 rounded-2xl p-6 text-slate-100 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400">Direct Consultation</span>
                <h3 className="font-heading font-bold text-base text-slate-100">Book {selectedCoach.name}</h3>
              </div>
              <button onClick={() => setSelectedCoach(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Select Preferred Date:</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Select Time Slot (EST):</label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="09:00">09:00 AM EST</option>
                  <option value="11:30">11:30 AM EST</option>
                  <option value="14:00">02:00 PM EST</option>
                  <option value="16:30">04:30 PM EST</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Coaching Focus / Dilemma:</label>
                <input
                  type="text"
                  value={bookingTopic}
                  onChange={(e) => setBookingTopic(e.target.value)}
                  placeholder="e.g. Navigating high-stakes board tension..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span>Session Fee (60 Mins):</span>
                <span className="font-mono font-bold text-amber-300 text-sm">${selectedCoach.hourlyRate} USD</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelectedCoach(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold hover:from-amber-400 hover:to-amber-500 shadow-md"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Colleague Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <form onSubmit={handleAddMember} className="w-full max-w-md bg-[#0c142b] border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-base text-slate-100">Add Team Member to Cohort</h3>
              <button type="button" onClick={() => setIsInviteOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Colleague Full Name:</label>
                <input
                  type="text"
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Rachel Adams"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Role / Title:</label>
                <input
                  type="text"
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  placeholder="e.g. Lead Product Manager"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Department:</label>
                <input
                  type="text"
                  value={newMemberDept}
                  onChange={(e) => setNewMemberDept(e.target.value)}
                  placeholder="e.g. Product Strategy"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsInviteOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 shadow-md"
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
