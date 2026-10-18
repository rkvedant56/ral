import React, { useState, useMemo } from 'react';
import { 
  BarChart4, 
  Search, 
  RefreshCw, 
  FileText, 
  Download, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Globe2,
  Compass,
  BookOpen,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  Filter,
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { PsychometricReport, ScholarlyPaper, RalPhase } from '../types';
import { 
  getWeeklyRotatedRepository, 
  generateApaCitation, 
  generateBibtex 
} from '../data/scholarlyRepository';

export const PsychometricResearchView: React.FC = () => {
  const { psychometricReports, addPsychometricReport, setActiveTab } = useApp();

  // Weekly rotation simulation offset
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const repositoryData = useMemo(() => getWeeklyRotatedRepository(weekOffset), [weekOffset]);

  // View mode: 'repository' or 'methodology'
  const [activeMainTab, setActiveMainTab] = useState<'repository' | 'spotlight' | 'methodology'>('repository');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<'all' | RalPhase>('all');
  const [recencyFilter, setRecencyFilter] = useState<'all' | 'recent5Years' | 'foundations'>('all');

  // Citation modal
  const [citationPaper, setCitationPaper] = useState<ScholarlyPaper | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<'apa' | 'bibtex' | null>(null);

  // Search Grounding Methodology updater state
  const [focusArea, setFocusArea] = useState('executive cognitive agility psychometrics AI decision governance 2025 2026');
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeReportIndex, setActiveReportIndex] = useState(0);

  const currentReport: PsychometricReport | undefined = psychometricReports[activeReportIndex] || psychometricReports[0];

  const handleRunAnalysis = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch('/api/psychometrics/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ focusArea })
      });

      const data = await response.json();
      if (data.report) {
        const newRep: PsychometricReport = {
          title: data.report.title || "2026 Adaptive Psychometrics & Cognitive Resilience Report",
          date: new Date().toISOString().slice(0, 10),
          methodologyUpdates: data.report.methodologyUpdates || "Updated cognitive calibration indices with latest empirical peer-reviewed findings.",
          newQuestions: data.report.newQuestions || []
        };
        addPsychometricReport(newRep);
        setActiveReportIndex(0);
        try {
          confetti({ particleCount: 50, spread: 60 });
        } catch (e) {}
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Filtered papers logic
  const filteredPapers = useMemo(() => {
    return repositoryData.papers.filter((paper) => {
      // Tab filter
      if (activeMainTab === 'spotlight' && !paper.isWeeklySpotlight) {
        return false;
      }

      // Phase filter
      if (selectedPhase !== 'all' && paper.ralPhase !== selectedPhase) {
        return false;
      }

      // Recency filter
      const currentYear = new Date().getFullYear();
      if (recencyFilter === 'recent5Years' && paper.year < currentYear - 5) {
        return false;
      }
      if (recencyFilter === 'foundations' && paper.year >= currentYear - 5) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = paper.title.toLowerCase().includes(q);
        const matchesAuthors = paper.authors.some(a => a.toLowerCase().includes(q));
        const matchesJournal = paper.journal.toLowerCase().includes(q);
        const matchesSummary = paper.executiveSummary.toLowerCase().includes(q);
        const matchesDoi = paper.doi.toLowerCase().includes(q);
        return matchesTitle || matchesAuthors || matchesJournal || matchesSummary || matchesDoi;
      }

      return true;
    });
  }, [repositoryData, activeMainTab, selectedPhase, recencyFilter, searchQuery]);

  const copyToClipboard = (text: string, format: 'apa' | 'bibtex') => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Empirical Foundations · Continuous Academic Rigor
          </span>
          <h1 className="text-3xl font-heading font-bold text-slate-100 mt-1">
            Dynamic Scholarly Research Repository
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            100+ verified, peer-reviewed papers grounding Reflective Adaptive Leadership (RAL). 67% published within the last 5 years (2021–2026), with automatic weekly spotlight rotation.
          </p>
        </div>

        {/* Weekly Rotation Badge / Trigger */}
        <div className="flex items-center gap-2 p-2 bg-[#0a1128] border border-slate-800 rounded-2xl shrink-0 text-xs">
          <div className="px-3 py-1 bg-amber-500/10 border border-amber-400/30 text-amber-300 rounded-xl font-mono text-[11px] font-bold">
            Week {repositoryData.currentWeek} Active
          </div>
          <button
            onClick={() => {
              setWeekOffset(prev => prev + 1);
              try {
                confetti({ particleCount: 35, spread: 50 });
              } catch (e) {}
            }}
            title="Rotate to next calendar week's spotlight shelf"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition"
          >
            <RefreshCw size={12} />
            <span>Next Week Rotation</span>
          </button>
        </div>
      </div>

      {/* Main Mode Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setActiveMainTab('repository')}
          className={`py-2 px-4 rounded-xl font-bold transition flex items-center gap-2 ${
            activeMainTab === 'repository' 
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
          }`}
        >
          <BookOpen size={14} />
          <span>Complete Repository ({repositoryData.totalVerifiedCount} Papers)</span>
        </button>

        <button
          onClick={() => setActiveMainTab('spotlight')}
          className={`py-2 px-4 rounded-xl font-bold transition flex items-center gap-2 ${
            activeMainTab === 'spotlight' 
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
          }`}
        >
          <Sparkles size={14} />
          <span>Week {repositoryData.currentWeek} Spotlight Shelf (12 Selected)</span>
        </button>

        <button
          onClick={() => setActiveMainTab('methodology')}
          className={`py-2 px-4 rounded-xl font-bold transition flex items-center gap-2 ${
            activeMainTab === 'methodology' 
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
          }`}
        >
          <Globe2 size={14} />
          <span>Live Search Grounding Engine</span>
        </button>
      </div>

      {/* =========================================================================
         TAB 1 & 2: REPOSITORY & WEEKLY SPOTLIGHT
         ========================================================================= */}
      {activeMainTab !== 'methodology' && (
        <div className="space-y-6">
          {/* Metrics summary strip (Clean unboxed figures complying with design guidelines) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-[#0a1128] border border-slate-800 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Verified Papers</span>
              <span className="text-xl font-bold font-mono text-slate-100">{repositoryData.totalVerifiedCount}</span>
            </div>
            <div className="p-3.5 bg-[#0a1128] border border-slate-800 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Recent 5 Years (2021-2026)</span>
              <span className="text-xl font-bold font-mono text-emerald-400">{repositoryData.recentFiveYearPercentage}%</span>
            </div>
            <div className="p-3.5 bg-[#0a1128] border border-slate-800 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Active Week Rotation</span>
              <span className="text-xl font-bold font-mono text-amber-400">Week {repositoryData.currentWeek}</span>
            </div>
            <div className="p-3.5 bg-[#0a1128] border border-slate-800 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Indexed Citations</span>
              <span className="text-xl font-bold font-mono text-sky-400">12,400+</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 bg-[#0a1128] border border-slate-800 rounded-2xl space-y-3 text-xs">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search across 100+ verified papers by title, author, DOI, or keyword (e.g., fMRI, amygdala, paradox)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans"
              />
            </div>

            {/* Phase Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400 font-semibold mr-1">RAL Phase:</span>
                {(['all', 'Pause', 'Pursue', 'Reframe', 'Decouple', 'Team Coherence'] as const).map((phase) => (
                  <button
                    key={phase}
                    onClick={() => setSelectedPhase(phase)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      selectedPhase === phase 
                        ? 'bg-amber-500 text-slate-950 font-bold' 
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {phase === 'all' ? 'All Phases' : phase}
                  </button>
                ))}
              </div>

              {/* Recency Segmented Control */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
                <button
                  onClick={() => setRecencyFilter('all')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    recencyFilter === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All Years
                </button>
                <button
                  onClick={() => setRecencyFilter('recent5Years')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    recencyFilter === 'recent5Years' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  2021–2026 (67%)
                </button>
                <button
                  onClick={() => setRecencyFilter('foundations')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    recencyFilter === 'foundations' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Seminal Foundations
                </button>
              </div>
            </div>
          </div>

          {/* Papers Count Status */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing <strong className="text-slate-200">{filteredPapers.length}</strong> matching scholarly papers</span>
            {activeMainTab === 'spotlight' && (
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <Sparkles size={12} />
                <span>Rotated for Calendar Week {repositoryData.currentWeek}</span>
              </span>
            )}
          </div>

          {/* Papers Grid */}
          <div className="space-y-4">
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="p-6 bg-[#0a1128] border border-slate-800 hover:border-amber-500/40 rounded-2xl space-y-4 transition shadow-lg group"
              >
                {/* Clean unboxed metadata row (Zero-pill discipline) */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pb-2 border-b border-slate-800/80">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-amber-300">{paper.ralPhase} Phase</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-300 font-medium">{paper.journal}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="font-mono text-slate-300">{paper.year}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="font-mono text-slate-400">{paper.citationCount} citations</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-400">{paper.readTimeMinutes} min read</span>
                  </div>

                  {paper.isWeeklySpotlight && (
                    <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                      <Sparkles size={11} />
                      <span>Weekly Spotlight</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-heading font-bold text-slate-100 group-hover:text-amber-200 transition">
                  {paper.title}
                </h3>

                {/* Authors */}
                <p className="text-xs text-slate-400">
                  <strong className="text-slate-300">Authors:</strong> {paper.authors.join(', ')}
                </p>

                {/* Executive Summary */}
                <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-2">
                  <p>
                    <strong className="text-amber-300">Executive Summary:</strong> {paper.executiveSummary}
                  </p>
                  <p className="text-emerald-300/90">
                    <strong>Key Finding:</strong> {paper.keyFinding}
                  </p>
                  <p className="text-sky-300/90">
                    <strong>Practical Application:</strong> {paper.practicalApplication}
                  </p>
                </div>

                {/* Bottom Actions: DOI link & Cite Button */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono text-[11px]">DOI:</span>
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-slate-300 hover:text-amber-400 flex items-center gap-1 transition"
                    >
                      <span>{paper.doi}</span>
                      <ExternalLink size={12} className="text-slate-500" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCitationPaper(paper)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl transition font-semibold"
                    >
                      <Copy size={12} />
                      <span>Cite Paper</span>
                    </button>

                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-xl transition font-semibold"
                    >
                      <FileText size={12} />
                      <span>Full Text (Publisher)</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
         TAB 3: LIVE METHODOLOGY UPDATER (Preserved from original view)
         ========================================================================= */}
      {activeMainTab === 'methodology' && (
        <div className="space-y-6">
          <div className="p-4 bg-[#0a1128] border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex-1">
              <label className="text-slate-400 font-medium block mb-1">
                Research Focus Area (Search Grounding Target):
              </label>
              <input
                type="text"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              onClick={handleRunAnalysis}
              disabled={isUpdating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition shrink-0"
            >
              <RefreshCw size={14} className={isUpdating ? 'animate-spin' : ''} />
              <span>{isUpdating ? 'Analyzing Global Research...' : 'Update Assessment Methodology'}</span>
            </button>
          </div>

          {currentReport && (
            <div className="bg-[#0a1128] border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                    Psychometric Report · {currentReport.date}
                  </span>
                  <h2 className="text-2xl font-heading font-bold text-slate-100 mt-0.5">
                    {currentReport.title}
                  </h2>
                </div>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition"
                >
                  <Printer size={14} />
                  <span>Print Report</span>
                </button>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <h4 className="font-heading font-bold text-amber-300 text-base">Methodology Synthesis & Evolution</h4>
                <p className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  {currentReport.methodologyUpdates}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-slate-100 text-sm">
                    Calibrated Diagnostic Questions Mapped to RAL Matrices ({currentReport.newQuestions?.length || 0})
                  </h4>
                  <button
                    onClick={() => setActiveTab('diagnostic')}
                    className="text-xs text-amber-400 font-semibold hover:underline"
                  >
                    Incorporate into Self-Diagnostic →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {currentReport.newQuestions?.map((q, idx) => (
                    <div key={idx} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase font-bold text-amber-400">
                          {q.sectionKey}: {q.sectionName}
                        </span>
                        <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                          {q.citation}
                        </span>
                      </div>
                      <p className="text-slate-200 font-medium leading-relaxed">
                        "{q.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
         CITATION MODAL
         ========================================================================= */}
      {citationPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0a162b] border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-base text-slate-100">
                Cite Academic Paper
              </h3>
              <button onClick={() => setCitationPaper(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-400 font-semibold">APA 7th Edition:</span>
                  <button
                    onClick={() => copyToClipboard(generateApaCitation(citationPaper), 'apa')}
                    className="text-amber-400 hover:underline flex items-center gap-1"
                  >
                    {copiedFormat === 'apa' ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedFormat === 'apa' ? 'Copied!' : 'Copy APA'}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-sans text-slate-300 leading-relaxed select-all">
                  {generateApaCitation(citationPaper)}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-400 font-semibold">BibTeX Entry:</span>
                  <button
                    onClick={() => copyToClipboard(generateBibtex(citationPaper), 'bibtex')}
                    className="text-amber-400 hover:underline flex items-center gap-1"
                  >
                    {copiedFormat === 'bibtex' ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedFormat === 'bibtex' ? 'Copied!' : 'Copy BibTeX'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto select-all">
                  {generateBibtex(citationPaper)}
                </pre>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setCitationPaper(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
