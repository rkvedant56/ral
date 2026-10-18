import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Key, 
  Building2, 
  CheckCircle, 
  Send, 
  Lock, 
  Users, 
  RefreshCw, 
  AlertCircle,
  ExternalLink,
  Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EnterpriseSSOModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { ssoConfig, updateSSOConfig, cohorts, deployCohortPulseSurvey } = useApp();

  const [provider, setProvider] = useState<'okta' | 'azure_ad' | 'google_workspace'>(ssoConfig.provider);
  const [tenantId, setTenantId] = useState(ssoConfig.tenantId);
  const [clientId, setClientId] = useState(ssoConfig.clientId);
  const [domain, setDomain] = useState(ssoConfig.domain);
  const [ssoUrl, setSsoUrl] = useState(ssoConfig.ssoUrl);
  const [isConnecting, setIsConnecting] = useState(false);
  const [surveyNotification, setSurveyNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      updateSSOConfig({
        provider,
        tenantId,
        clientId,
        domain,
        ssoUrl,
        isConnected: true,
        lastSyncAt: new Date().toISOString()
      });
      setIsConnecting(false);
    }, 900);
  };

  const handleDisconnect = () => {
    updateSSOConfig({
      isConnected: false
    });
  };

  const handleDeployAllSurveys = () => {
    cohorts.forEach(c => deployCohortPulseSurvey(c.id));
    setSurveyNotification("Anonymized ACL Pulse Survey deployed across all enterprise cohorts! Auto-segmentation active.");
    setTimeout(() => setSurveyNotification(null), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#0f172a] to-[#070c1e] border border-sky-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-lg font-heading font-bold text-slate-100 flex items-center gap-2">
                Enterprise SSO & Multi-Tenant Setup
                <span className="text-[10px] px-2 py-0.5 rounded bg-sky-400/10 text-sky-300 border border-sky-400/20 font-sans uppercase">
                  SAML 2.0 / OIDC
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Connect Okta or Azure AD to deploy anonymized company-wide ACL surveys with automatic team segmentation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Status banner */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            ssoConfig.isConnected 
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}>
            <div className="flex items-center gap-2.5">
              <span className={`w-3 h-3 rounded-full ${ssoConfig.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
              <div>
                <span className="font-bold block text-sm text-slate-200">
                  {ssoConfig.isConnected ? `${provider.toUpperCase()} SSO Connection Active` : 'SSO Disconnected'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {ssoConfig.isConnected ? `Tenant: ${ssoConfig.tenantId} · Auto-syncing directory cohorts` : 'Configure identity provider below'}
                </span>
              </div>
            </div>

            {ssoConfig.isConnected && (
              <button
                onClick={handleDisconnect}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-red-300 text-[11px] border border-slate-700 transition"
              >
                Disconnect
              </button>
            )}
          </div>

          {/* Identity Provider Selector */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Choose Enterprise Identity Provider (IdP)</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setProvider('okta')}
                className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                  provider === 'okta'
                    ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-[#007dc1] text-white flex items-center justify-center font-bold text-xs">O</div>
                <span>Okta SAML 2.0</span>
              </button>

              <button
                type="button"
                onClick={() => setProvider('azure_ad')}
                className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                  provider === 'azure_ad'
                    ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="w-6 h-6 rounded-md bg-[#0089d6] text-white flex items-center justify-center font-bold text-xs">M</div>
                <span>Azure AD (Entra)</span>
              </button>

              <button
                type="button"
                onClick={() => setProvider('google_workspace')}
                className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                  provider === 'google_workspace'
                    ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">G</div>
                <span>Google Workspace</span>
              </button>
            </div>
          </div>

          {/* Configuration Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Directory Tenant ID</label>
              <input
                type="text"
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value)}
                placeholder="e.g. okta-corp-tenant-ral-9401"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:border-sky-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Client ID / Application ID</label>
              <input
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="e.g. 0oa4ral938fkq392X1d7"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:border-sky-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Corporate Domain</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. enterprise.okta.com"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:border-sky-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">SAML ACS / SSO URL</label>
              <input
                type="text"
                value={ssoUrl}
                onChange={(e) => setSsoUrl(e.target.value)}
                placeholder="https://enterprise.okta.com/app/sso"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:border-sky-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Connect / Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition shadow-md shadow-sky-500/20"
            >
              {isConnecting ? <RefreshCw className="animate-spin" size={14} /> : <Key size={14} />}
              <span>{ssoConfig.isConnected ? 'Save & Sync Identity Provider' : 'Verify & Connect SSO'}</span>
            </button>
          </div>

          {/* Anonymized Company-Wide ACL Survey Deployment Section */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs uppercase font-bold text-sky-300 flex items-center gap-1.5">
                  <Users size={14} />
                  Anonymized Company-Wide ACL Pulse Deployment
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  HR departments can deploy the 10-12 question ACL assessment to all auto-segmented cohorts with strict k-anonymity (min 5 respondents).
                </p>
              </div>

              <button
                onClick={handleDeployAllSurveys}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold transition shadow-md"
              >
                <Send size={13} />
                <span>Deploy to All Cohorts</span>
              </button>
            </div>

            {surveyNotification && (
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle size={14} />
                <span>{surveyNotification}</span>
              </div>
            )}

            {/* Cohorts summary list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {cohorts.map(c => (
                <div key={c.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-200 block truncate">{c.name}</span>
                    <span className="text-slate-500 text-[10px]">{c.memberCount} members · {c.surveyCompletionRate}% completed</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    c.ragStatus === 'green' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    ACL {c.aclIndex}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <Lock size={13} className="text-sky-400" />
            <span>Zero-PII Storage: Individual leadership scores are never exposed to employers</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
