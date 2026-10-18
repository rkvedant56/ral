import React, { useState } from 'react';
import { 
  Brain, 
  Upload, 
  Trash2, 
  Plus, 
  FileText, 
  Building2, 
  User, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  Wifi, 
  WifiOff,
  CheckCircle2,
  Camera
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const MemoryAndVaultView: React.FC = () => {
  const { 
    user, 
    updateUser, 
    memoryVault, 
    addMemoryItem, 
    removeMemoryItem, 
    userDocuments, 
    addUserDocument, 
    removeUserDocument 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'memory' | 'documents' | 'offline'>('profile');

  // New Memory item modal
  const [newMemoryCategory, setNewMemoryCategory] = useState<'value' | 'trigger' | 'breakthrough' | 'goal' | 'personal_trait'>('trigger');
  const [newMemoryContent, setNewMemoryContent] = useState('');

  // New Document modal
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<'company_mission' | 'team_charter' | 'performance_review' | 'dilemma_brief'>('company_mission');
  const [newDocContent, setNewDocContent] = useState('');

  // Offline status check
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const [cacheStatus, setCacheStatus] = useState<string>('Pre-cached in service worker');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        updateUser({ avatar: result });
        try {
          confetti({ particleCount: 40, spread: 50 });
        } catch (err) {}
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryContent.trim()) return;
    addMemoryItem({
      category: newMemoryCategory,
      content: newMemoryContent.trim()
    });
    setNewMemoryContent('');
    try {
      confetti({ particleCount: 30, spread: 40 });
    } catch (err) {}
  };

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim() || !newDocContent.trim()) return;
    addUserDocument({
      title: newDocTitle.trim(),
      category: newDocCategory,
      content: newDocContent.trim()
    });
    setNewDocTitle('');
    setNewDocContent('');
    try {
      confetti({ particleCount: 40, spread: 50 });
    } catch (err) {}
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          Personalization · Executive Context
        </span>
        <h1 className="text-3xl font-heading font-bold text-slate-100 mt-1">
          Identity, Memory Vault & Custom Content
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your personal executive photo, long-term memory cues for the AI Coach, integrated company documents, and offline storage.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-semibold overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'profile' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Photo & Identity Profile
        </button>
        <button
          onClick={() => setActiveTab('memory')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'memory' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <span>AI Coach Memory Vault</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
            {memoryVault.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'documents' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <span>Company & Custom Docs</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
            {userDocuments.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('offline')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'offline' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Offline Content & Cache
        </button>
      </div>

      {/* Tab 1: Profile & Photo Upload */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-[#0a1128] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="font-heading font-bold text-slate-100 text-lg">Executive Profile & Portrait</h3>

            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
              {/* Photo Display */}
              <div className="relative group">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-amber-400/50 shadow-2xl bg-slate-900 flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-[#121f47] flex flex-col items-center justify-center p-2 text-center">
                      <User size={36} className="text-amber-400 mb-1" />
                      <span className="text-[10px] text-slate-400">No Photo Uploaded</span>
                    </div>
                  )}
                </div>

                {/* Upload Button overlay */}
                <label className="absolute bottom-1 right-1 p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer shadow-lg transition">
                  <Camera size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* User Identity Details Form */}
              <div className="flex-1 space-y-3 w-full text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => updateUser({ name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Executive Title</label>
                    <input
                      type="text"
                      value={user.title}
                      onChange={(e) => updateUser({ title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Sector</label>
                    <select
                      value={user.sector}
                      onChange={(e) => updateUser({ sector: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                    >
                      <option value="corporate">Corporate / Enterprise</option>
                      <option value="military_civilian">Military-to-Civilian</option>
                      <option value="startup">Startup Founder / Tech</option>
                      <option value="public_sector">Public Sector & Government</option>
                      <option value="education">Higher Education / Healthcare</option>
                      <option value="personal">Personal Leadership & Life</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Years of Leadership Experience</label>
                    <input
                      type="number"
                      value={user.experienceYears}
                      onChange={(e) => updateUser({ experienceYears: parseInt(e.target.value) || 0 })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Author Attribution Card with RK Vedant */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-heading text-sm">
                  RKV
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">RK Vedant · Doctrine Author</h4>
                  <p className="text-slate-400 text-[11px]">Former Military Commander, Leadership Strategist & Executive Mentor</p>
                </div>
              </div>
              <span className="text-[11px] text-amber-400 italic">"State before strategy."</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Individual Memory Vault */}
      {activeTab === 'memory' && (
        <div className="space-y-6">
          <div className="bg-[#0a1128] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-heading font-bold text-slate-100 text-lg">AI Coach Persistent Memory Vault</h3>
                <p className="text-xs text-slate-400">
                  Your AI Coach retains these personal anchors across all sessions to provide hyper-personalized Socratic inquiry.
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-medium">
                Active in System Prompts
              </span>
            </div>

            {/* Add Memory Form */}
            <form onSubmit={handleAddMemory} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3 text-xs">
              <span className="font-bold text-amber-300 block">Teach the Coach a New Personal Trait or Anchor:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <select
                  value={newMemoryCategory}
                  onChange={(e) => setNewMemoryCategory(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="trigger">Recurring Emotional Trigger</option>
                  <option value="value">Core Non-Negotiable Value</option>
                  <option value="breakthrough">Breakthrough / Past Insight</option>
                  <option value="goal">Active Leadership Goal</option>
                  <option value="personal_trait">Personal Decision Habit</option>
                </select>

                <input
                  type="text"
                  required
                  value={newMemoryContent}
                  onChange={(e) => setNewMemoryContent(e.target.value)}
                  placeholder="e.g. Tendency to over-explain when challenged by senior executives..."
                  className="sm:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition"
                >
                  <Plus size={14} />
                  <span>Commit to Memory</span>
                </button>
              </div>
            </form>

            {/* List of Memories */}
            <div className="space-y-2.5">
              {memoryVault.map((item) => (
                <div key={item.id} className="p-3.5 bg-slate-900/40 rounded-xl border border-slate-800 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-400">
                      {item.category.replace('_', ' ')}
                    </span>
                    <p className="text-slate-200 mt-1">{item.content}</p>
                    <span className="text-[10px] text-slate-500 block">Logged: {item.createdAt}</span>
                  </div>

                  <button
                    onClick={() => removeMemoryItem(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                    title="Remove from memory"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Company & Custom Docs Integration */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="bg-[#0a1128] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-heading font-bold text-slate-100 text-lg">Integrated User & Organizational Content</h3>
                <p className="text-xs text-slate-400">
                  Upload or paste your team charters, company mission statements, and live dilemmas. The AI Coach uses this context to tailor advice to your real environment.
                </p>
              </div>
            </div>

            {/* Add Document Form */}
            <form onSubmit={handleAddDoc} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3 text-xs">
              <span className="font-bold text-amber-300 block">Add Context Document or Dilemma Brief:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder="Document Title (e.g. 2026 Engineering Strategy)"
                  className="bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200 focus:outline-none focus:border-amber-400"
                />

                <select
                  value={newDocCategory}
                  onChange={(e) => setNewDocCategory(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="company_mission">Company Mission / Roadmap</option>
                  <option value="team_charter">Team Charter / Operating Agreement</option>
                  <option value="performance_review">Recent 360 Feedback / Review</option>
                  <option value="dilemma_brief">Specific Leadership Dilemma Brief</option>
                </select>
              </div>

              <textarea
                required
                rows={4}
                value={newDocContent}
                onChange={(e) => setNewDocContent(e.target.value)}
                placeholder="Paste key excerpts, goals, constraints, or cultural guidelines..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
              />

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition"
                >
                  <Plus size={14} />
                  <span>Index Document into AI Context</span>
                </button>
              </div>
            </form>

            {/* List of Documents */}
            <div className="space-y-3">
              {userDocuments.map((doc) => (
                <div key={doc.id} className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm">{doc.title}</h4>
                      <span className="text-[10px] text-amber-400 uppercase font-mono">
                        {doc.category.replace('_', ' ')} · Updated {doc.updatedAt}
                      </span>
                    </div>
                    <button
                      onClick={() => removeUserDocument(doc.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-slate-300 line-clamp-3 leading-relaxed">{doc.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Offline Content & Cache */}
      {activeTab === 'offline' && (
        <div className="bg-[#0a1128] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-heading font-bold text-slate-100 text-lg">Offline PWA Architecture</h3>
              <p className="text-xs text-slate-400">
                All 16 masterclass modules, 30-day micro-practices, psychometric diagnostics, and toolkits are 100% available offline.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isOnline ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-semibold">
                  <Wifi size={14} /> Online
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 font-semibold">
                  <WifiOff size={14} /> Offline Mode
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Local Storage Cache</span>
              <span className="font-mono text-emerald-300 font-bold text-base">Verified Active</span>
              <p className="text-slate-500 mt-1">Diagnostics & Journals persist locally.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Service Worker Caching</span>
              <span className="font-mono text-sky-300 font-bold text-base">v1.0 (sw.js)</span>
              <p className="text-slate-500 mt-1">Core doctrine assets precached.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Offline AI Fallback</span>
              <span className="font-mono text-amber-300 font-bold text-base">Standby Ready</span>
              <p className="text-slate-500 mt-1">Structured Socratic prompts active.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
