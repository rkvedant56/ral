import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Building2, 
  Globe2, 
  Check, 
  X, 
  ArrowRight,
  Shield,
  Smile
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LifeStage, CulturalRegion, AppPathway } from '../types';

export const LifeStageModal: React.FC = () => {
  const { 
    isLifeStageModalOpen, 
    closeLifeStageModal, 
    lifeStage, 
    setLifeStage,
    culturalRegion,
    setCulturalRegion,
    pathway,
    setPathway,
    t,
    user,
    updateUser
  } = useApp();

  const [selectedStage, setSelectedStage] = useState<LifeStage>(lifeStage);
  const [selectedRegion, setSelectedRegion] = useState<CulturalRegion>(culturalRegion);
  const [selectedCountry, setSelectedCountry] = useState<string>(user.country || 'India');

  if (!isLifeStageModalOpen) return null;

  const stageOptions: Array<{
    id: LifeStage;
    title: string;
    age: string;
    icon: any;
    desc: string;
    focus: string;
    pathway: AppPathway;
    accent: string;
  }> = [
    {
      id: 'kids',
      title: t.lifeStages.kids.title,
      age: t.lifeStages.kids.age,
      icon: Smile,
      desc: t.lifeStages.kids.desc,
      focus: t.lifeStages.kids.focus,
      pathway: 'individual',
      accent: 'border-emerald-400/40 hover:border-emerald-400'
    },
    {
      id: 'teenagers',
      title: t.lifeStages.teenagers.title,
      age: t.lifeStages.teenagers.age,
      icon: Sparkles,
      desc: t.lifeStages.teenagers.desc,
      focus: t.lifeStages.teenagers.focus,
      pathway: 'individual',
      accent: 'border-teal-400/40 hover:border-teal-400'
    },
    {
      id: 'students',
      title: t.lifeStages.students.title,
      age: t.lifeStages.students.age,
      icon: GraduationCap,
      desc: t.lifeStages.students.desc,
      focus: t.lifeStages.students.focus,
      pathway: 'individual',
      accent: 'border-amber-400/40 hover:border-amber-400'
    },
    {
      id: 'professionals',
      title: t.lifeStages.professionals.title,
      age: t.lifeStages.professionals.age,
      icon: Briefcase,
      desc: t.lifeStages.professionals.desc,
      focus: t.lifeStages.professionals.focus,
      pathway: 'individual',
      accent: 'border-emerald-500/50 hover:border-emerald-400'
    },
    {
      id: 'seniors',
      title: t.lifeStages.seniors.title,
      age: t.lifeStages.seniors.age,
      icon: Heart,
      desc: t.lifeStages.seniors.desc,
      focus: t.lifeStages.seniors.focus,
      pathway: 'individual',
      accent: 'border-amber-500/50 hover:border-amber-400'
    },
    {
      id: 'teams',
      title: t.lifeStages.teams.title,
      age: t.lifeStages.teams.age,
      icon: Building2,
      desc: t.lifeStages.teams.desc,
      focus: t.lifeStages.teams.focus,
      pathway: 'organization',
      accent: 'border-sky-500/50 hover:border-sky-400'
    }
  ];

  const regions: Array<{ id: CulturalRegion; label: string; desc: string }> = [
    { id: 'india', label: 'India & South Asia', desc: 'Respect hierarchy, high-context dialogue, familial duty, community resonance' },
    { id: 'europe', label: 'Europe & UK', desc: 'Consensus-driven governance, egalitarian feedback, structural balance' },
    { id: 'americas', label: 'Americas (US & LatAm)', desc: 'Direct accountability, entrepreneurial velocity, individual initiative' },
    { id: 'east_asia', label: 'East Asia & APAC', desc: 'Collective harmony, nuanced indirect critique, face preservation' },
    { id: 'global', label: 'Global Universal', desc: 'Cross-cultural balance across multinational environments' }
  ];

  const handleSave = () => {
    setLifeStage(selectedStage);
    setCulturalRegion(selectedRegion);
    const chosenPathway = selectedStage === 'teams' ? 'organization' : 'individual';
    setPathway(chosenPathway);
    updateUser({ 
      lifeStage: selectedStage, 
      culturalRegion: selectedRegion, 
      country: selectedCountry,
      pathway: chosenPathway,
      hasCompletedOnboarding: true 
    });
    closeLifeStageModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#061e16] border border-[#144234] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-emerald-50 max-h-[92vh] overflow-y-auto">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeLifeStageModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#0a2e23] text-emerald-300 hover:text-emerald-100 hover:bg-[#11382b] transition"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Users size={14} className="text-emerald-400" />
            <span>Personalized Leadership Journey</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-100">
            {t.lifeStages.selectTitle}
          </h2>

          <p className="text-xs sm:text-sm text-emerald-200/80">
            {t.lifeStages.selectSubtitle}
          </p>
        </div>

        {/* Life Stage Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8">
          {stageOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedStage === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setSelectedStage(opt.id)}
                className={`relative cursor-pointer p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-[#0b3327] border-amber-400/80 shadow-lg shadow-emerald-950/50 ring-1 ring-amber-400/40' 
                    : 'bg-[#07241b] border-[#134233] hover:bg-[#0a2c20]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-[#0a2e23] text-emerald-300 border border-[#144234]'}`}>
                      <Icon size={20} />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-medium text-emerald-300/80 uppercase">
                        {opt.age}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className={`font-heading font-bold text-sm mb-1 ${isSelected ? 'text-amber-200' : 'text-slate-100'}`}>
                    {opt.title}
                  </h3>

                  <p className="text-[12px] text-emerald-100/70 leading-relaxed mb-3">
                    {opt.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#12382c] text-[10px] text-emerald-300/90 font-medium">
                  {opt.focus}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cultural & Regional Adaptation Section */}
        <div className="bg-[#07241b] border border-[#144234] rounded-2xl p-5 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Globe2 size={16} className="text-amber-400" />
            <h4 className="font-heading font-semibold text-slate-100 text-sm">
              Cultural & Contextual Adaptation
            </h4>
          </div>
          <p className="text-xs text-emerald-200/70 mb-4">
            Reflection questions and leadership interpretations differ by geography and social norms. Select your cultural lens so the AI coach and diagnostics calibrate accurately.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {regions.map((reg) => (
              <button
                key={reg.id}
                type="button"
                onClick={() => setSelectedRegion(reg.id)}
                className={`p-3 rounded-xl border text-left transition text-xs ${
                  selectedRegion === reg.id
                    ? 'bg-[#0b3327] border-amber-400 text-slate-100'
                    : 'bg-[#092a20] border-[#12382c] text-emerald-200/80 hover:bg-[#0c3327]'
                }`}
              >
                <div className="font-semibold text-slate-100 mb-0.5">{reg.label}</div>
                <div className="text-[10px] text-emerald-300/70 line-clamp-2">{reg.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#144234]">
          <div className="text-xs text-emerald-300/70 flex items-center gap-2">
            <Shield size={14} className="text-amber-400" />
            <span>{t.pathways.privacyNotice}</span>
          </div>

          <button
            onClick={handleSave}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition transform active:scale-95"
          >
            <span>Confirm & Enter Experience</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
