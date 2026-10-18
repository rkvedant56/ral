import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  BarChart3, 
  Calendar, 
  BookOpen, 
  Users, 
  Globe2, 
  Wrench, 
  CreditCard, 
  Sliders, 
  Menu, 
  X, 
  Flame, 
  Shield, 
  Zap,
  Brain, 
  BarChart4, 
  Headphones, 
  Film, 
  User, 
  Layers,
  Award,
  ChevronDown,
  Lock,
  RefreshCw,
  LogOut,
  Building2,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../i18n/translations';
import { CurrencyCode, LifeStage } from '../types';

export const Navbar: React.FC<{ onOpenMusic: () => void; onOpenVideo: () => void }> = ({ onOpenMusic, onOpenVideo }) => {
  const { 
    t, 
    language, 
    setLanguage, 
    currency, 
    setCurrency, 
    user, 
    activeTab, 
    setActiveTab, 
    openPauseModal,
    openProfileModal,
    openLifeStageModal,
    openAuthorModal,
    authorPhotoUrl,
    lifeStage,
    pathway,
    setPathway,
    loadDemoProfile,
    resetToNewVisitor,
    diagnostic
  } = useApp();

  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 5 core primary navigation items (identical names across laptop and phone)
  const coreNavItems = [
    { id: 'home', label: t.nav.home, icon: Compass },
    { id: 'coach', label: t.nav.coach, icon: Sparkles },
    { id: 'practice', label: t.nav.practice, icon: Calendar },
    { id: 'learn', label: t.nav.learn, icon: BookOpen },
    { id: 'simulator', label: t.nav.simulator, icon: Zap }
  ];

  // Secondary items cleanly arranged under "More"
  const moreNavItems = [
    { id: 'diagnostic', label: t.nav.diagnostic, icon: BarChart3, desc: '360° Psychometric Self-Diagnostic' },
    { id: 'toolkit', label: t.nav.toolkit, icon: Wrench, desc: 'One-page practical matrix & daily drills' },
    { id: 'team', label: t.nav.team, icon: Users, desc: 'Culture Lattice & Team Coherence' },
    { id: 'vault', label: t.nav.vault, icon: Brain, desc: 'Private personal memory & context' },
    { id: 'psychometrics', label: t.nav.research, icon: BarChart4, desc: 'Psychometric methodology & citations' },
    { id: 'insights', label: t.nav.insights, icon: Globe2, desc: 'Book lore & real-world case studies' },
    { id: 'pricing', label: t.nav.pricing, icon: CreditCard, desc: 'Individual & Enterprise memberships' },
    { id: 'admin', label: t.nav.admin, icon: Sliders, desc: 'Governance, SSO & cohort deployment' }
  ];

  const languages: { code: SupportedLanguage; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'es', label: 'ES' },
    { code: 'fr', label: 'FR' },
    { code: 'de', label: 'DE' },
    { code: 'ar', label: 'العربية' },
    { code: 'pt', label: 'PT' },
    { code: 'ja', label: '日本語' }
  ];

  const currencies: CurrencyCode[] = ['USD', 'INR', 'EUR', 'GBP'];

  return (
    <header className="sticky top-0 z-40 bg-[#041510]/98 backdrop-blur-md border-b border-[#144234]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-emerald-600 to-[#041e16] border border-amber-400/30 flex items-center justify-center shadow-lg shadow-emerald-950/40 shrink-0">
              <span className="font-heading font-black text-slate-950 text-xl tracking-tighter">RAL</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-lg text-slate-100 tracking-wide">RAL Coach</span>
                <span className="text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">
                  {pathway === 'organization' ? 'ORG' : 'INDIVIDUAL'}
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/70 hidden sm:block truncate max-w-[240px]">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Primary Navigation (5 items + More dropdown) */}
          <nav className="hidden lg:flex items-center gap-1">
            {coreNavItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition min-h-[44px] ${
                    isActive
                      ? 'bg-[#092e22] text-amber-300 border border-amber-400/30 shadow-sm'
                      : 'text-emerald-200/80 hover:text-white hover:bg-[#07241b]'
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* More Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition min-h-[44px] ${
                  moreNavItems.some(i => i.id === activeTab) || moreMenuOpen
                    ? 'bg-[#092e22] text-amber-300 border border-amber-400/30'
                    : 'text-emerald-200/80 hover:text-white hover:bg-[#07241b]'
                }`}
              >
                <span>{t.nav.more}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#061e16] border border-[#184d3c] shadow-2xl p-2 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-emerald-400/60 border-b border-[#12382c] mb-1">
                    Leadership Systems
                  </div>
                  {moreNavItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMoreMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs transition ${
                          isActive
                            ? 'bg-[#0a3527] text-amber-300 font-bold'
                            : 'text-emerald-100 hover:bg-[#092a20]'
                        }`}
                      >
                        <div className="w-6 h-6 rounded-lg bg-[#041510] border border-[#144234] flex items-center justify-center text-emerald-400 shrink-0">
                          <Icon size={13} />
                        </div>
                        <div className="truncate">
                          <div className="font-semibold text-xs text-slate-100">{item.label}</div>
                          <div className="text-[10px] text-emerald-300/60 truncate">{item.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Quick Header Actions: Restorative Soundscapes, Video, Author & Profile */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* 10s Pause Reset Quick Action (Secondary/Calm) */}
            <button
              onClick={() => openPauseModal('10s')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#07241b] hover:bg-[#0a3225] border border-[#144234] text-xs text-emerald-200 transition min-h-[44px]"
              title="Take a 10-Second State Calibration Pause"
            >
              <Zap size={14} className="text-amber-400" />
              <span className="hidden sm:inline font-medium">10s Pause</span>
            </button>

            {/* Restorative Instrumental Soundscape Player Button */}
            <button
              onClick={onOpenMusic}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#07241b] hover:bg-[#0a3225] border border-[#144234] text-xs text-emerald-200 transition min-h-[44px]"
              title="100+ Instrumental Soundscapes (Bansuri, Veena, Santoor)"
            >
              <Headphones size={15} className="text-emerald-400" />
              <span className="hidden md:inline font-medium">Soothe</span>
            </button>

            {/* Executive Session Video Studio Button */}
            <button
              onClick={onOpenVideo}
              className="p-2 rounded-xl bg-[#07241b] hover:bg-[#0a3225] border border-[#144234] text-emerald-300 hover:text-white transition min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Executive Video Session Studio"
            >
              <Film size={16} />
            </button>

            {/* Author RK Vedant Official Credentials Badge */}
            <button
              onClick={openAuthorModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#07241b] hover:bg-[#0a3225] border border-amber-400/40 text-xs text-amber-300 transition min-h-[44px]"
              title="Author RK Vedant - Credentials & Portrait"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden border border-amber-400/60 bg-[#092c20] shrink-0">
                <img 
                  src={authorPhotoUrl || '/src/assets/images/rk_vedant_author_1792241867695.jpg'} 
                  alt="RK Vedant" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as any).src = '/rk_vedant_portrait.jpg';
                  }}
                />
              </div>
              <span className="hidden xl:inline text-xs font-semibold">RK Vedant</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="bg-[#07241b] border border-[#144234] text-emerald-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-400 transition cursor-pointer min-h-[44px]"
                title="Change Language"
              >
                {languages.map(l => (
                  <option key={l.code} value={l.code} className="bg-[#061e16] text-emerald-100">
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* User Profile & Demo Switcher Circle */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="w-10 h-10 rounded-xl bg-[#092c20] hover:bg-[#0c3829] border border-emerald-400/40 flex items-center justify-center text-xs font-bold text-amber-300 transition shadow"
                title="Profile & Quick Controls"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-xl object-cover" />
                ) : (
                  <span>{user.name?.charAt(0) || 'P'}</span>
                )}
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#061e16] border border-[#184d3c] shadow-2xl p-3 z-50 animate-fadeIn text-xs text-emerald-100 space-y-3">
                  {/* User Info Header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-[#12382c]">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400/50 bg-[#092c20] shrink-0">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="truncate">
                      <div className="font-heading font-bold text-sm text-slate-100 truncate">{user.name || 'Priya'}</div>
                      <div className="text-[11px] text-emerald-300/70 truncate">{user.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold">
                          {user.tier.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-emerald-400/60 capitalize">{lifeStage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Persona Switcher (Priya vs Alex Demo) as required by UX audit */}
                  <div className="p-2.5 rounded-xl bg-[#041510] border border-[#144234] space-y-2">
                    <span className="text-[10px] uppercase font-bold text-emerald-400/70 block">
                      Persona View (UX Audit Switcher)
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => {
                          resetToNewVisitor();
                          setProfileDropdownOpen(false);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-left text-[11px] font-semibold border transition ${
                          !diagnostic 
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold' 
                            : 'bg-[#07241b] text-emerald-200 border-[#144234] hover:text-white'
                        }`}
                      >
                        <div>Priya (New)</div>
                        <div className="text-[9px] opacity-80">Clean Start</div>
                      </button>

                      <button
                        onClick={() => {
                          loadDemoProfile();
                          setProfileDropdownOpen(false);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-left text-[11px] font-semibold border transition ${
                          diagnostic 
                            ? 'bg-emerald-600 text-slate-950 border-emerald-400 font-bold' 
                            : 'bg-[#07241b] text-emerald-200 border-[#144234] hover:text-white'
                        }`}
                      >
                        <div>Alex Vance</div>
                        <div className="text-[9px] opacity-80">Day 3 / 133 Score</div>
                      </button>
                    </div>
                  </div>

                  {/* Pathway Segregation Toggle */}
                  <div className="p-2 rounded-xl bg-[#041510] border border-[#144234] flex items-center justify-between">
                    <span className="text-[11px] text-emerald-300">Data Boundary:</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPathway('individual')}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                          pathway === 'individual' ? 'bg-emerald-600 text-slate-950' : 'text-emerald-400/60'
                        }`}
                      >
                        Personal
                      </button>
                      <button
                        onClick={() => setPathway('organization')}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                          pathway === 'organization' ? 'bg-amber-500 text-slate-950' : 'text-emerald-400/60'
                        }`}
                      >
                        Org Space
                      </button>
                    </div>
                  </div>

                  {/* Quick Profile Actions */}
                  <div className="space-y-1 pt-1">
                    <button
                      onClick={() => {
                        openLifeStageModal();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#08291f] text-left transition"
                    >
                      <span>Change Life Stage & Region</span>
                      <span className="text-amber-300 capitalize text-[11px] font-medium">{lifeStage}</span>
                    </button>

                    <button
                      onClick={() => {
                        openProfileModal();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#08291f] text-left transition"
                    >
                      <span>Executive Profile & Bio</span>
                      <User size={13} className="text-emerald-400" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('pricing');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#08291f] text-left transition"
                    >
                      <span>Membership & Currency</span>
                      <span className="text-amber-400 font-bold">{currency}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
