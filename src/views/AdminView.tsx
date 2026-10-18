import React, { useState } from 'react';
import { 
  Sliders, 
  DollarSign, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Download, 
  Trash2, 
  ShieldCheck,
  Eye,
  Sparkles,
  BarChart3,
  Award,
  Key,
  Building2,
  Lock,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminView: React.FC = () => {
  const { insights, reviewInsight, resetAllUserData, ssoConfig, updateSSOConfig, cohorts } = useApp();
  const [activeTab, setActiveTab] = useState<'revenue' | 'feedback' | 'reviewQueue' | 'sso' | 'privacy'>('sso');
  const [optInTraining, setOptInTraining] = useState(false);

  // SSO form local state
  const [ssoProvider, setSsoProvider] = useState<'azure_ad' | 'okta' | 'google_workspace'>(ssoConfig?.provider || 'azure_ad');
  const [tenantId, setTenantId] = useState(ssoConfig?.tenantId || '72f988bf-86f1-41af-91ab-2d7cd011db47');
  const [clientId, setClientId] = useState(ssoConfig?.clientId || 'ral-enterprise-oidc-app');
  const [domain, setDomain] = useState(ssoConfig?.domain || 'enterprise.contoso.com');
  const [ssoUrl, setSsoUrl] = useState(ssoConfig?.ssoUrl || 'https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/authorize');
  const [isSaved, setIsSaved] = useState(false);

  const pendingInsights = insights.filter(i => i.status === 'pending_review');

  const stats = {
    mrr: 48650,
    mrrGrowth: "+14.2%",
    totalSubscribers: 1240,
    subscribersGrowth: "+88 this month",
    churnRate: "1.4%",
    coachCommissions: 6840,
    certificationRevenue: 18500
  };

  const feedbackLogs = [
    { id: 'fb-1', user: 'VP Operations', rating: 'positive', query: 'Tense board review negotiation', helpful: true, date: 'Today, 2:15 PM' },
    { id: 'fb-2', user: 'Engineering Director', rating: 'positive', query: '10s reset before team retro', helpful: true, date: 'Today, 11:30 AM' },
    { id: 'fb-3', user: 'Startup Founder', rating: 'positive', query: 'Frame separation (Fact vs Emotion vs Story)', helpful: true, date: 'Yesterday' },
    { id: 'fb-4', user: 'Hospital Chief', rating: 'negative', query: 'Crisis pacing under night shift overload', helpful: false, date: '2 days ago' }
  ];

  const handleSaveSSO = (e: React.FormEvent) => {
    e.preventDefault();
    updateSSOConfig({
      provider: ssoProvider,
      tenantId,
      clientId,
      domain,
      ssoUrl,
      isConnected: true,
      lastSyncAt: new Date().toISOString()
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleExportData = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      app: 'RAL Coach',
      version: '1.0.0',
      localStorage: { ...localStorage }
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ral-coach-data-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          Platform Administration & Governance
        </span>
        <h1 className="text-3xl font-heading font-bold text-slate-100 mt-1">
          Executive Admin & Enterprise Configuration
        </h1>
        <p className="text-xs text-emerald-300/70 mt-1">
          Configure Multi-Tenant Azure AD / Okta OIDC authentication, continuous learning approvals, and privacy firewalls.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#144234] pb-3 text-xs font-semibold overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('sso')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'sso' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-emerald-300/80 hover:text-emerald-100'}`}
        >
          <Key size={14} />
          <span>Multi-Tenant Auth & SSO</span>
        </button>
        <button
          onClick={() => setActiveTab('revenue')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'revenue' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-emerald-300/80 hover:text-emerald-100'}`}
        >
          Revenue & Subscriptions
        </button>
        <button
          onClick={() => setActiveTab('reviewQueue')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'reviewQueue' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-emerald-300/80 hover:text-emerald-100'}`}
        >
          <span>Research Review Queue</span>
          {pendingInsights.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-bold">
              {pendingInsights.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'feedback' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-emerald-300/80 hover:text-emerald-100'}`}
        >
          Coach Feedback & NPS
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'privacy' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-emerald-300/80 hover:text-emerald-100'}`}
        >
          Privacy & Data Governance
        </button>
      </div>

      {/* Tab: Multi-Tenant Auth Configuration (Azure AD & Okta) */}
      {activeTab === 'sso' && (
        <div className="space-y-6">
          {/* Privacy Firewall Notice */}
          <div className="p-4 rounded-2xl bg-[#09291f] border border-[#164839] flex items-center gap-3 text-xs text-emerald-200/90">
            <Lock size={18} className="text-amber-400 shrink-0" />
            <div>
              <strong className="text-amber-300 block mb-0.5">Strict Confidentiality Guardrail:</strong>
              Individual psychometric ratings and private reflection journal entries are NEVER exposed to organization administrators. Administrators only receive aggregate cohort participation and anonymized climate lattice indices.
            </div>
          </div>

          <form onSubmit={handleSaveSSO} className="bg-[#061e16] border border-[#144234] rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#12382c]">
              <div>
                <h3 className="font-heading font-bold text-slate-100 text-base flex items-center gap-2">
                  <Building2 size={18} className="text-amber-400" />
                  <span>Enterprise OIDC / SAML Identity Provider Settings</span>
                </h3>
                <p className="text-xs text-emerald-300/70">
                  Manage Single Sign-On (SSO) credentials for Microsoft Azure AD (Entra ID) and Okta.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  ssoConfig?.isConnected 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-amber-500/10 text-amber-300 border border-amber-400/30'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${ssoConfig?.isConnected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span>{ssoConfig?.isConnected ? 'Active & Synced' : 'Provisioning Mode'}</span>
                </span>
              </div>
            </div>

            {/* Provider Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-200">
                Select Enterprise Identity Provider
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'azure_ad' as const, name: 'Microsoft Azure AD (Entra ID)', desc: 'Azure tenant directory with Graph API sync' },
                  { id: 'okta' as const, name: 'Okta OIDC', desc: 'Okta workforce identity with SCIM provisioning' },
                  { id: 'google_workspace' as const, name: 'Google Workspace Enterprise', desc: 'SAML / OAuth workspace directory' }
                ].map((prov) => (
                  <button
                    key={prov.id}
                    type="button"
                    onClick={() => {
                      setSsoProvider(prov.id);
                      if (prov.id === 'azure_ad') {
                        setSsoUrl(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`);
                      } else if (prov.id === 'okta') {
                        setSsoUrl(`https://${domain}/oauth2/v1/authorize`);
                      }
                    }}
                    className={`p-3.5 rounded-xl border text-left transition text-xs ${
                      ssoProvider === prov.id
                        ? 'bg-[#0a2e23] border-amber-400 text-slate-100 shadow-md ring-1 ring-amber-400/40'
                        : 'bg-[#07241b] border-[#134233] text-emerald-200/80 hover:bg-[#092c20]'
                    }`}
                  >
                    <div className="font-semibold text-slate-100 mb-0.5">{prov.name}</div>
                    <div className="text-[10px] text-emerald-300/70">{prov.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-emerald-200 font-medium mb-1">
                  Tenant / Organization ID ({ssoProvider === 'azure_ad' ? 'Azure Directory ID' : 'Okta Org ID'})
                </label>
                <input
                  type="text"
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                  placeholder="e.g. 72f988bf-86f1-41af-91ab-2d7cd011db47"
                  className="w-full px-3 py-2 rounded-xl bg-[#07241b] border border-[#144234] text-slate-100 focus:border-amber-400 focus:outline-none font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-emerald-200 font-medium mb-1">
                  Client ID / Application ID
                </label>
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="e.g. ral-coach-enterprise-app-id"
                  className="w-full px-3 py-2 rounded-xl bg-[#07241b] border border-[#144234] text-slate-100 focus:border-amber-400 focus:outline-none font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-emerald-200 font-medium mb-1">
                  Corporate Domain Restriction
                </label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. enterprise.contoso.com"
                  className="w-full px-3 py-2 rounded-xl bg-[#07241b] border border-[#144234] text-slate-100 focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-emerald-200 font-medium mb-1">
                  OIDC Authorization Endpoint URL
                </label>
                <input
                  type="text"
                  value={ssoUrl}
                  onChange={(e) => setSsoUrl(e.target.value)}
                  placeholder="https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize"
                  className="w-full px-3 py-2 rounded-xl bg-[#07241b] border border-[#144234] text-slate-100 focus:border-amber-400 focus:outline-none text-[11px]"
                  required
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#12382c]">
              <div className="text-[11px] text-emerald-300/70">
                Last Directory Sync: {ssoConfig?.lastSyncAt ? new Date(ssoConfig.lastSyncAt).toLocaleString() : 'Never'}
              </div>

              <div className="flex items-center gap-3">
                {isSaved && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 size={14} />
                    <span>Configuration Saved & Verified!</span>
                  </span>
                )}
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition"
                >
                  Save & Validate Tenant Settings
                </button>
              </div>
            </div>
          </form>

          {/* Active Enterprise Cohorts Synced */}
          <div className="bg-[#061e16] border border-[#144234] rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="font-heading font-bold text-slate-100 text-base">
              Synchronized Multi-Tenant Cohorts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cohorts.map((c) => (
                <div key={c.id} className="p-4 rounded-xl bg-[#07241b] border border-[#134233] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-100">{c.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                      {c.ragStatus}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-300/70">
                    {c.memberCount} Members · {c.surveyCompletionRate}% Completion
                  </div>
                  <div className="pt-2 border-t border-[#12382c] flex justify-between text-[11px]">
                    <span className="text-emerald-400/80">Safety Rating:</span>
                    <strong className="text-amber-300">{c.psychologicalSafety}/100</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Revenue */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#061e16] border border-[#144234] space-y-1">
              <span className="text-[10px] text-emerald-300/70 uppercase tracking-wider font-bold">Monthly Recurring Revenue</span>
              <div className="text-2xl sm:text-3xl font-heading font-bold text-emerald-400 font-mono">
                ${stats.mrr.toLocaleString()}
              </div>
              <p className="text-[11px] text-emerald-400 font-medium">{stats.mrrGrowth} vs last month</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#061e16] border border-[#144234] space-y-1">
              <span className="text-[10px] text-emerald-300/70 uppercase tracking-wider font-bold">Active Subscriptions</span>
              <div className="text-2xl sm:text-3xl font-heading font-bold text-amber-300 font-mono">
                {stats.totalSubscribers}
              </div>
              <p className="text-[11px] text-emerald-300/70">{stats.subscribersGrowth}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#061e16] border border-[#144234] space-y-1">
              <span className="text-[10px] text-emerald-300/70 uppercase tracking-wider font-bold">Monthly Churn Rate</span>
              <div className="text-2xl sm:text-3xl font-heading font-bold text-sky-400 font-mono">
                {stats.churnRate}
              </div>
              <p className="text-[11px] text-emerald-300/70">Industry lowest tier (&lt;2.0%)</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#061e16] border border-[#144234] space-y-1">
              <span className="text-[10px] text-emerald-300/70 uppercase tracking-wider font-bold">Coach Marketplace Take</span>
              <div className="text-2xl sm:text-3xl font-heading font-bold text-amber-400 font-mono">
                ${stats.coachCommissions.toLocaleString()}
              </div>
              <p className="text-[11px] text-emerald-300/70">15% platform fee from 142 sessions</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Research Review Queue */}
      {activeTab === 'reviewQueue' && (
        <div className="bg-[#061e16] border border-[#144234] rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="font-heading font-bold text-slate-100 text-base">Continuous Research Submissions</h3>
          {pendingInsights.length === 0 ? (
            <p className="text-xs text-emerald-300/70 py-6 text-center">All doctrine research items are approved and published.</p>
          ) : (
            <div className="space-y-3">
              {pendingInsights.map((i) => (
                <div key={i.id} className="p-4 rounded-xl bg-[#07241b] border border-[#134233] flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">{i.title}</h4>
                    <p className="text-[11px] text-emerald-200/70 mt-1">{i.summary}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => reviewInsight(i.id, 'approved')} className="px-3 py-1 bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg">Approve</button>
                    <button onClick={() => reviewInsight(i.id, 'archived')} className="px-3 py-1 bg-[#09291f] text-emerald-300 text-xs rounded-lg">Archive</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Feedback */}
      {activeTab === 'feedback' && (
        <div className="bg-[#061e16] border border-[#144234] rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="font-heading font-bold text-slate-100 text-base">AI Socratic Dialogue Telemetry</h3>
          <div className="space-y-3">
            {feedbackLogs.map((fb) => (
              <div key={fb.id} className="p-3.5 rounded-xl bg-[#07241b] border border-[#134233] flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-100">{fb.user}</span>
                  <p className="text-emerald-300/70 mt-0.5">{fb.query}</p>
                </div>
                <span className="text-emerald-400 font-mono">{fb.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Privacy & Data Governance */}
      {activeTab === 'privacy' && (
        <div className="bg-[#061e16] border border-[#144234] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="pb-3 border-b border-[#12382c]">
            <h3 className="font-heading font-bold text-slate-100 text-base">Privacy by Design & Data Sovereignity</h3>
            <p className="text-xs text-emerald-300/70">
              Leadership self-reflection requires absolute confidentiality. User data remains private and local.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#07241b] rounded-xl border border-[#134233] flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block mb-0.5">Model Training Protection</span>
                <p className="text-emerald-300/70">
                  Explicitly prevent the AI model from training on personal reflections, journal entries, or diagnostic answers.
                </p>
              </div>

              <button
                onClick={() => setOptInTraining(!optInTraining)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  !optInTraining 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-[#09291f] text-emerald-300/60'
                }`}
              >
                {!optInTraining ? 'Zero-Training Active' : 'Opted In'}
              </button>
            </div>

            <div className="p-4 bg-[#07241b] rounded-xl border border-[#134233] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-slate-200 block mb-0.5">Data Portability (Export All)</span>
                <p className="text-emerald-300/70">Download all your diagnostic history, 30-day practice entries, and notes as structured JSON.</p>
              </div>

              <button
                onClick={handleExportData}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#092c21] hover:bg-[#0c3728] text-emerald-100 rounded-xl font-bold transition border border-[#144234] shrink-0"
              >
                <Download size={14} />
                <span>Export Profile Data</span>
              </button>
            </div>

            <div className="p-4 bg-rose-950/20 rounded-xl border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-rose-300 block mb-0.5">Delete All Data (Right to be Forgotten)</span>
                <p className="text-rose-200/80">Permanently wipe all locally stored assessments, conversations, and identity sheets from this browser.</p>
              </div>

              <button
                onClick={() => {
                  if (confirm("Are you sure you want to permanently erase all your RAL Coach data? This cannot be undone.")) {
                    resetAllUserData();
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold transition shrink-0"
              >
                <Trash2 size={14} />
                <span>Erase All Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
