/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { PauseModal } from './components/PauseModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AuthorModal } from './components/AuthorModal';
import { LifeStageModal } from './components/LifeStageModal';
import { SootheMusicPlayer } from './components/SootheMusicPlayer';
import { SessionVideoRecorder } from './components/SessionVideoRecorder';
import { PersistentAiCoachDock } from './components/PersistentAiCoachDock';
import { HomeView } from './views/HomeView';
import { DiagnosticView } from './views/DiagnosticView';
import { CoachView } from './views/CoachView';
import { PracticeView } from './views/PracticeView';
import { LearnView } from './views/LearnView';
import { SimulatorView } from './views/SimulatorView';
import { TeamView } from './views/TeamView';
import { InsightsView } from './views/InsightsView';
import { ToolkitView } from './views/ToolkitView';
import { PricingView } from './views/PricingView';
import { AdminView } from './views/AdminView';
import { MemoryAndVaultView } from './views/MemoryAndVaultView';
import { PsychometricResearchView } from './views/PsychometricResearchView';
import { 
  Compass, 
  Sparkles, 
  Calendar, 
  BookOpen, 
  Zap, 
  MoreHorizontal,
  BarChart3,
  Wrench,
  Users,
  Brain,
  BarChart4,
  CreditCard,
  Sliders,
  X
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    t, 
    isMusicOpen, 
    openMusic, 
    closeMusic, 
    musicInitialMood 
  } = useApp();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const moreSubTabs = [
    { id: 'diagnostic', label: 'Diagnostics', icon: BarChart3, desc: '360° Psychometric Self-Diagnostic' },
    { id: 'toolkit', label: 'Toolkit', icon: Wrench, desc: 'One-page practical matrix & daily drills' },
    { id: 'team', label: 'Team & Org', icon: Users, desc: 'Culture Lattice & Team Coherence' },
    { id: 'vault', label: 'Vault', icon: Brain, desc: 'Private personal memory & context' },
    { id: 'psychometrics', label: 'Research', icon: BarChart4, desc: 'Psychometric citations & data' },
    { id: 'insights', label: 'Insights', icon: Compass, desc: 'Book lore & real-world cases' },
    { id: 'pricing', label: 'Membership', icon: CreditCard, desc: 'Individual & Enterprise tiers' },
    { id: 'admin', label: 'Admin', icon: Sliders, desc: 'Governance, SSO & cohort deployment' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#041510] text-emerald-50 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navbar */}
      <Navbar 
        onOpenMusic={() => openMusic()} 
        onOpenVideo={() => setIsVideoOpen(true)} 
      />

      {/* Main Body Container (Space preserved at bottom so tab bar never overlaps footer) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-32 md:pb-16">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'coach' && <CoachView />}
        {activeTab === 'diagnostic' && <DiagnosticView />}
        {activeTab === 'practice' && <PracticeView />}
        {activeTab === 'learn' && <LearnView />}
        {activeTab === 'simulator' && <SimulatorView />}
        {activeTab === 'vault' && <MemoryAndVaultView />}
        {activeTab === 'psychometrics' && <PsychometricResearchView />}
        {activeTab === 'team' && <TeamView />}
        {activeTab === 'insights' && <InsightsView />}
        {activeTab === 'toolkit' && <ToolkitView />}
        {activeTab === 'pricing' && <PricingView />}
        {activeTab === 'admin' && <AdminView />}
      </main>

      {/* Persistent AI Coach / Chatbot Dock */}
      <PersistentAiCoachDock />

      {/* Global State Calibration Pause Modal */}
      <PauseModal />

      {/* Executive Profile & Camera Photo Studio Modal */}
      <UserProfileModal />

      {/* Life Stage & Cultural Region Switcher Modal */}
      <LifeStageModal />

      {/* Official Doctrine Author (RK Vedant) Credentials & Portrait Modal */}
      <AuthorModal />

      {/* Restorative Sound & World Instruments Soothe Player */}
      <SootheMusicPlayer isOpen={isMusicOpen} onClose={closeMusic} initialMood={musicInitialMood} />

      {/* Executive Session Video Studio */}
      <SessionVideoRecorder isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

      {/* Mobile "More" Drawer Modal */}
      {mobileMoreOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-[#061e16] border-t border-[#184d3c] rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto space-y-4 animate-slideUp">
            <div className="flex items-center justify-between pb-3 border-b border-[#12382c]">
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm text-slate-100">All RAL Features</span>
                <span className="text-[10px] text-emerald-400 font-mono">Navigation</span>
              </div>
              <button 
                onClick={() => setMobileMoreOpen(false)}
                className="p-2 rounded-full bg-[#0a2e23] text-emerald-300 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {moreSubTabs.map(sub => {
                const Icon = sub.icon;
                const isCurrent = activeTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setActiveTab(sub.id);
                      setMobileMoreOpen(false);
                    }}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between min-h-[64px] ${
                      isCurrent
                        ? 'bg-[#0a3527] border-amber-400 text-amber-300 font-bold'
                        : 'bg-[#041510] border-[#144234] text-emerald-100 hover:bg-[#08291f]'
                    }`}
                  >
                    <Icon size={16} className={isCurrent ? 'text-amber-400' : 'text-emerald-400'} />
                    <div className="mt-2">
                      <div className="font-semibold text-xs text-slate-100">{sub.label}</div>
                      <div className="text-[10px] text-emerald-400/60 truncate">{sub.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Fix 2, 4, 8 of UX Audit) */}
      <nav 
        aria-label="Mobile Navigation" 
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#041510]/98 backdrop-blur-lg border-t border-[#144234] px-1 py-1 flex items-center justify-around"
      >
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-xl transition ${
            activeTab === 'home' ? 'text-amber-400 font-bold bg-[#08281d]' : 'text-emerald-300/80 hover:text-emerald-100'
          }`}
        >
          <Compass size={20} />
          <span className="text-[11px] mt-0.5">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('coach')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-xl transition ${
            activeTab === 'coach' ? 'text-amber-400 font-bold bg-[#08281d]' : 'text-emerald-300/80 hover:text-emerald-100'
          }`}
        >
          <Sparkles size={20} />
          <span className="text-[11px] mt-0.5">Coach</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-xl transition ${
            activeTab === 'practice' ? 'text-amber-400 font-bold bg-[#08281d]' : 'text-emerald-300/80 hover:text-emerald-100'
          }`}
        >
          <Calendar size={20} />
          <span className="text-[11px] mt-0.5">Practice</span>
        </button>

        <button
          onClick={() => setActiveTab('learn')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-xl transition ${
            activeTab === 'learn' ? 'text-amber-400 font-bold bg-[#08281d]' : 'text-emerald-300/80 hover:text-emerald-100'
          }`}
        >
          <BookOpen size={20} />
          <span className="text-[11px] mt-0.5">Learn</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-xl transition ${
            activeTab === 'simulator' ? 'text-amber-400 font-bold bg-[#08281d]' : 'text-emerald-300/80 hover:text-emerald-100'
          }`}
        >
          <Zap size={20} />
          <span className="text-[11px] mt-0.5">Simulate</span>
        </button>

        <button
          onClick={() => setMobileMoreOpen(true)}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-xl transition ${
            moreSubTabs.some(s => s.id === activeTab) ? 'text-amber-400 font-bold bg-[#08281d]' : 'text-emerald-300/80 hover:text-emerald-100'
          }`}
        >
          <MoreHorizontal size={20} />
          <span className="text-[11px] mt-0.5">More</span>
        </button>
      </nav>

      {/* Dignified Executive Footer (Sufficient bottom padding ensures it is visible) */}
      <footer className="border-t border-[#144234] bg-[#03100c] py-8 text-xs text-emerald-400/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-[10px]">
              RAL
            </div>
            <span className="text-emerald-200/90 text-xs">
              Reflective Adaptive Leadership (RAL) Doctrine · Author: <strong>RK Vedant</strong> (Former Military Commander & Executive Mentor)
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-300/80 text-xs">
            <button onClick={() => setActiveTab('toolkit')} className="hover:text-amber-300 transition">Toolkit</button>
            <button onClick={() => setActiveTab('diagnostic')} className="hover:text-amber-300 transition">Diagnostics</button>
            <button onClick={() => setActiveTab('pricing')} className="hover:text-amber-300 transition">Memberships</button>
            <button onClick={() => setActiveTab('admin')} className="hover:text-amber-300 transition">Admin</button>
          </div>

          <p className="text-[11px] text-emerald-400/60 text-center sm:text-right">
            Coaching for executive clarity and reflective mastery. Not medical or psychiatric therapy.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
