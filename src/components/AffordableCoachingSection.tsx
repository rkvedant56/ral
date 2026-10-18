import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Calendar, 
  Mail, 
  MessageCircle, 
  ExternalLink, 
  Edit3, 
  Plus, 
  Check, 
  X, 
  Sparkles, 
  RotateCcw,
  Clock,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VerifiedCoach, CurrencyCode } from '../types';
import { loadVerifiedCoaches, saveVerifiedCoaches, DEFAULT_VERIFIED_COACHES } from '../data/verifiedCoaches';

export const AffordableCoachingSection: React.FC = () => {
  const { currency } = useApp();
  const [coaches, setCoaches] = useState<VerifiedCoach[]>(() => loadVerifiedCoaches());
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'recommended' | 'crisis' | 'neuroscience' | 'culture'>('all');
  const [editingCoach, setEditingCoach] = useState<VerifiedCoach | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Currency conversion
  const currencySymbols: Record<CurrencyCode, string> = {
    USD: '$',
    INR: '₹',
    EUR: '€',
    GBP: '£'
  };

  const currencyMultipliers: Record<CurrencyCode, number> = {
    USD: 1,
    INR: 84,
    EUR: 0.92,
    GBP: 0.78
  };

  const formatPrice = (baseUsd: number) => {
    const converted = Math.round(baseUsd * currencyMultipliers[currency]);
    if (currency === 'INR') {
      return `${currencySymbols[currency]}${converted.toLocaleString('en-IN')}`;
    }
    return `${currencySymbols[currency]}${converted}`;
  };

  const triggerToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoach) return;

    const updated = coaches.map(c => c.id === editingCoach.id ? editingCoach : c);
    setCoaches(updated);
    saveVerifiedCoaches(updated);
    setEditingCoach(null);
    triggerToast(`Updated profile for ${editingCoach.name}.`);
  };

  const handleAddNewCoach = (newCoach: VerifiedCoach) => {
    const updated = [newCoach, ...coaches];
    setCoaches(updated);
    saveVerifiedCoaches(updated);
    setIsAddingNew(false);
    triggerToast(`Added ${newCoach.name} to approved coach roster.`);
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset all coach listings to default verified roster?")) {
      setCoaches(DEFAULT_VERIFIED_COACHES);
      saveVerifiedCoaches(DEFAULT_VERIFIED_COACHES);
      triggerToast("Reset coach roster to official defaults.");
    }
  };

  const filteredCoaches = coaches.filter(c => {
    if (selectedFilter === 'recommended') return c.isRecommended;
    if (selectedFilter === 'crisis') return c.specialties.some(s => s.toLowerCase().includes('crisis') || s.toLowerCase().includes('command'));
    if (selectedFilter === 'neuroscience') return c.specialties.some(s => s.toLowerCase().includes('neuro') || s.toLowerCase().includes('somatic') || s.toLowerCase().includes('calm'));
    if (selectedFilter === 'culture') return c.specialties.some(s => s.toLowerCase().includes('culture') || s.toLowerCase().includes('truth') || s.toLowerCase().includes('board'));
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 bg-emerald-950 border border-emerald-400 text-emerald-200 text-xs rounded-xl shadow-2xl flex items-center gap-2 animate-fadeIn">
          <Check size={14} className="text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header Banner: 25% Subsidized Pricing */}
      <div className="p-6 bg-gradient-to-r from-[#0d1d3d] to-[#071329] border border-amber-500/30 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-semibold">
            <ShieldCheck size={12} />
            <span>Negotiated 25% Executive Rates · Fellow Subsidized</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-100">
            One-to-One Reflective Leadership Coaching
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            Through the RAL Doctrine Fellowship, executive mentorship rates have been reduced to approximately <strong className="text-amber-300 font-semibold">25% of standard market pricing</strong> ($95–$145 vs $400–$600/hr). Connect directly with hand-picked, doctrine-certified military commanders, cognitive neuroscientists, and boardroom advisors.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-md shadow-amber-500/20"
          >
            <Plus size={14} />
            <span>Add Coach Listing</span>
          </button>

          <button
            onClick={handleResetDefaults}
            title="Reset to default verified roster"
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs transition"
          >
            <RotateCcw size={13} />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold transition shrink-0 ${
            selectedFilter === 'all' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          All Approved Coaches ({coaches.length})
        </button>
        <button
          onClick={() => setSelectedFilter('recommended')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold transition shrink-0 ${
            selectedFilter === 'recommended' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          RK Vedant Recommended
        </button>
        <button
          onClick={() => setSelectedFilter('crisis')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold transition shrink-0 ${
            selectedFilter === 'crisis' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          Crisis & Command Ops
        </button>
        <button
          onClick={() => setSelectedFilter('neuroscience')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold transition shrink-0 ${
            selectedFilter === 'neuroscience' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          Neuroscience & Burnout
        </button>
        <button
          onClick={() => setSelectedFilter('culture')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold transition shrink-0 ${
            selectedFilter === 'culture' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          Culture & Boardroom
        </button>
      </div>

      {/* Coach Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCoaches.map((coach) => (
          <div
            key={coach.id}
            className="p-5 rounded-2xl bg-[#09152b] border border-slate-800 hover:border-amber-500/40 transition shadow-xl flex flex-col justify-between space-y-4 group"
          >
            {/* Top section: Avatar, Info, Badges */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400/50 shrink-0 bg-slate-950">
                    <img
                      src={coach.avatarUrl}
                      alt={coach.name}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as any).src = '/rk_vedant_portrait.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-heading font-bold text-slate-100 text-base">
                        {coach.name}
                      </h4>
                      {coach.verifiedBadge && (
                        <span title="Verified RAL Doctrine Fellow">
                          <ShieldCheck size={14} className="text-amber-400 shrink-0" />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-amber-300 font-medium line-clamp-1">
                      {coach.title}
                    </p>
                  </div>
                </div>

                {/* Edit Card Button */}
                <button
                  onClick={() => setEditingCoach(coach)}
                  title="Edit coach profile & negotiated rates"
                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-amber-300 transition shrink-0"
                >
                  <Edit3 size={13} />
                </button>
              </div>

              {/* Credentials / Experience */}
              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Briefcase size={11} className="text-slate-500" />
                  <span>{coach.yearsExperience} yrs exp</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={11} className="text-slate-500" />
                  <span>{coach.sessionsCompleted}+ sessions</span>
                </span>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-300/80 leading-relaxed line-clamp-3">
                {coach.bio}
              </p>

              {/* Specialties */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">
                  Core Specialties
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {coach.specialties.map((spec, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom section: Pricing & Direct Actions */}
            <div className="pt-3 border-t border-slate-800/80 space-y-3">
              {/* Pricing breakdown */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 line-through">
                    {formatPrice(coach.originalMarketRateUsd)} market
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-heading font-extrabold text-amber-300 font-mono">
                      {formatPrice(coach.subsidizedRateUsd)}
                    </span>
                    <span className="text-[10px] text-slate-400">/ session</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                    75% Subsidized
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {coach.availabilityStatus}
                  </p>
                </div>
              </div>

              {/* Direct Booking & Contacts */}
              <div className="flex items-center gap-2">
                <a
                  href={coach.bookingCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs text-center transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
                >
                  <Calendar size={13} />
                  <span>Book Session</span>
                </a>

                {coach.contactEmail && (
                  <a
                    href={`mailto:${coach.contactEmail}?subject=RAL 1-on-1 Mentorship Inquiry`}
                    title={`Email ${coach.name}`}
                    className="p-2 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition"
                  >
                    <Mail size={14} />
                  </a>
                )}

                {coach.whatsappContact && (
                  <a
                    href={`https://wa.me/${coach.whatsappContact.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Direct WhatsApp Contact"
                    className="p-2 rounded-xl border border-slate-800 hover:border-emerald-500/40 bg-slate-900 text-slate-300 hover:text-emerald-300 transition"
                  >
                    <MessageCircle size={14} />
                  </a>
                )}

                {coach.linkedInUrl && (
                  <a
                    href={coach.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn Profile"
                    className="p-2 rounded-xl border border-slate-800 hover:border-sky-500/40 bg-slate-900 text-slate-300 hover:text-sky-300 transition"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================================
         EDIT COACH MODAL
         ========================================================================= */}
      {editingCoach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0a162b] border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-lg text-slate-100">
                Edit Coach Listing: {editingCoach.name}
              </h3>
              <button onClick={() => setEditingCoach(null)} className="text-slate-400 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingCoach.name}
                  onChange={(e) => setEditingCoach({ ...editingCoach, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title & Role</label>
                <input
                  type="text"
                  value={editingCoach.title}
                  onChange={(e) => setEditingCoach({ ...editingCoach, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Standard Market Rate ($USD)</label>
                  <input
                    type="number"
                    value={editingCoach.originalMarketRateUsd}
                    onChange={(e) => setEditingCoach({ ...editingCoach, originalMarketRateUsd: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-amber-300 font-semibold mb-1">Subsidized 25% Rate ($USD)</label>
                  <input
                    type="number"
                    value={editingCoach.subsidizedRateUsd}
                    onChange={(e) => setEditingCoach({ ...editingCoach, subsidizedRateUsd: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-amber-500/50 rounded-xl p-2.5 text-amber-200 font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Availability Status</label>
                <select
                  value={editingCoach.availabilityStatus}
                  onChange={(e) => setEditingCoach({ ...editingCoach, availabilityStatus: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                >
                  <option value="Available This Week">Available This Week</option>
                  <option value="2 Slots Left">2 Slots Left</option>
                  <option value="By Waitlist">By Waitlist</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Booking Link (Calendly / Custom URL)</label>
                <input
                  type="text"
                  value={editingCoach.bookingCalendarUrl}
                  onChange={(e) => setEditingCoach({ ...editingCoach, bookingCalendarUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={editingCoach.contactEmail}
                    onChange={(e) => setEditingCoach({ ...editingCoach, contactEmail: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp / Phone</label>
                  <input
                    type="text"
                    value={editingCoach.whatsappContact || ''}
                    onChange={(e) => setEditingCoach({ ...editingCoach, whatsappContact: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Bio & Background</label>
                <textarea
                  rows={3}
                  value={editingCoach.bio}
                  onChange={(e) => setEditingCoach({ ...editingCoach, bio: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCoach(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
         ADD NEW COACH MODAL
         ========================================================================= */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0a162b] border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-lg text-slate-100">
                Add Recommended Coach
              </h3>
              <button onClick={() => setIsAddingNew(false)} className="text-slate-400 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const newCoach: VerifiedCoach = {
                  id: `coach-${Date.now()}`,
                  name: (form.elements.namedItem('name') as HTMLInputElement).value,
                  title: (form.elements.namedItem('title') as HTMLInputElement).value,
                  credentials: ['Certified RAL Mentor'],
                  bio: (form.elements.namedItem('bio') as HTMLTextAreaElement).value,
                  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
                  specialties: ['Executive Mentorship', 'RAL Foundations'],
                  originalMarketRateUsd: Number((form.elements.namedItem('marketRate') as HTMLInputElement).value) || 450,
                  subsidizedRateUsd: Number((form.elements.namedItem('subsidizedRate') as HTMLInputElement).value) || 115,
                  currency: 'USD',
                  availabilityStatus: 'Available This Week',
                  contactEmail: (form.elements.namedItem('email') as HTMLInputElement).value,
                  bookingCalendarUrl: (form.elements.namedItem('bookingUrl') as HTMLInputElement).value || 'https://calendly.com',
                  isRecommended: true,
                  verifiedBadge: true,
                  cohortTags: ['New Mentor'],
                  yearsExperience: 10,
                  sessionsCompleted: 100
                };
                handleAddNewCoach(newCoach);
              }}
              className="py-4 space-y-3.5 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input name="name" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100" />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title & Credentials</label>
                <input name="title" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Market Rate ($)</label>
                  <input name="marketRate" type="number" defaultValue={450} required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-mono" />
                </div>
                <div>
                  <label className="block text-amber-300 font-semibold mb-1">Subsidized Rate ($)</label>
                  <input name="subsidizedRate" type="number" defaultValue={115} required className="w-full bg-slate-950 border border-amber-500/50 rounded-xl p-2.5 text-amber-200 font-mono font-bold" />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Booking Calendar Link (Calendly / URL)</label>
                <input name="bookingUrl" defaultValue="https://calendly.com/mentor" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-mono" />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email</label>
                <input name="email" type="email" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100" />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Bio</label>
                <textarea name="bio" rows={3} required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100" />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md"
                >
                  Add Coach
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
