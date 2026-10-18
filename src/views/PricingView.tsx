import React, { useState } from 'react';
import { 
  Check, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Award, 
  Users, 
  Building2,
  Lock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { CurrencyCode, MembershipTier } from '../types';
import { AffordableCoachingSection } from '../components/AffordableCoachingSection';

export const PricingView: React.FC = () => {
  const { user, updateUser, currency, setCurrency } = useApp();
  const [isAnnual, setIsAnnual] = useState(true);
  const [checkoutTier, setCheckoutTier] = useState<MembershipTier | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [upiId, setUpiId] = useState('leader@okaxis');

  // Rates multiplier
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
    const raw = baseUsd * currencyMultipliers[currency];
    const discounted = isAnnual ? raw * 0.75 : raw;
    if (currency === 'INR') {
      return `${currencySymbols[currency]}${Math.round(discounted).toLocaleString('en-IN')}`;
    }
    return `${currencySymbols[currency]}${Math.round(discounted)}`;
  };

  const handleCompleteUpgrade = () => {
    if (!checkoutTier) return;
    updateUser({ tier: checkoutTier });
    setCheckoutTier(null);
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch (e) {}
  };

  const tiers = [
    {
      id: 'free' as MembershipTier,
      name: "RAL Baseline",
      price: "Free",
      period: "forever",
      desc: "For leaders discovering the reflective path and establishing baseline clarity.",
      features: [
        "360° Psychometric Diagnostic Instrument",
        "First 7 Days of the 30-Day Practice Plan",
        "Access to Section I Foundation Modules (1–6)",
        "Daily 10-Second State Calibration",
        "Public Global Insights Feed"
      ],
      cta: "Current Tier",
      popular: false
    },
    {
      id: 'pro' as MembershipTier,
      name: "RAL Executive Pro",
      baseUsd: 24,
      period: isAnnual ? "/ mo (billed annually)" : "/ month",
      desc: "For individual executives, directors, and entrepreneurs seeking daily mastery.",
      features: [
        "All 16 Masterclass Modules & Adaptive Quizzes",
        "Full 30-Day Practice Plan & Identity Sheet",
        "Unlimited Socratic AI Coach with Voice I/O",
        "Full Leadership Scenario Stress Simulator",
        "Before/After Diagnostic Progress Tracking",
        "Complete Downloadable Toolkit Library"
      ],
      cta: "Upgrade to Executive Pro",
      popular: true
    },
    {
      id: 'team' as MembershipTier,
      name: "Reflective Adaptive Team",
      baseUsd: 79,
      period: "per seat / mo",
      desc: "For teams transforming collective psychological safety and decision coherence.",
      features: [
        "Everything in Executive Pro for all members",
        "Adaptive Culture Lattice (ACL) Team Pulse",
        "Anonymized Truth-Telling Team Analytics",
        "Exportable Consulting Executive Report",
        "Shared Team Rituals (Silent Start, Huddle)",
        "Priority Booking with Certified Human Coaches"
      ],
      cta: "Upgrade to Team Cohort",
      popular: false
    },
    {
      id: 'enterprise' as MembershipTier,
      name: "Enterprise Architecture",
      price: "Custom",
      period: "annual engagement",
      desc: "For global enterprises, military academies, and institutions scaling RAL doctrines.",
      features: [
        "White-label corporate RAL portal & SSO",
        "Dedicated Masterclass by RK Vedant Fellows",
        "Systemic Cognitive & Culture Audit API",
        "Custom psychometric matrix calibration",
        "Enterprise SLA & dedicated leadership advisor"
      ],
      cta: "Contact Enterprise Solutions",
      popular: false
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
          Executive Memberships & Licensing
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-100 mt-1">
          Invest in Inner Clarity & Scale Coherence
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          From individual reflection to team-wide cultural transformation. Transparent global pricing with localized currency support.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="inline-flex items-center gap-3 bg-[#0a1128] border border-slate-800 p-1.5 rounded-2xl mt-6">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${!isAnnual ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${isAnnual ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <span>Annual</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-slate-950 font-bold border border-amber-300">
              Save 25%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((tier) => {
          const isCurrent = user.tier === tier.id;
          return (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition relative shadow-xl ${
                tier.popular
                  ? 'bg-gradient-to-b from-[#0e1b3d] to-[#0a1128] border-2 border-amber-400/80 shadow-amber-500/10'
                  : 'bg-[#0a1128] border border-slate-800 hover:border-slate-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="font-heading font-bold text-slate-100 text-base">{tier.name}</h3>
                <p className="text-[11px] text-slate-400 mt-1 min-h-[32px]">{tier.desc}</p>

                <div className="my-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-heading font-extrabold text-slate-100">
                      {tier.price ? tier.price : formatPrice(tier.baseUsd!)}
                    </span>
                    <span className="text-[10px] text-slate-400">{tier.period}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-[11px] leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                {isCurrent ? (
                  <div className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs font-semibold text-emerald-400">
                    Active Plan
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (tier.id === 'enterprise') {
                        alert("Enterprise inquiry submitted. A senior leadership partner will contact you within 24 hours.");
                      } else {
                        setCheckoutTier(tier.id);
                      }
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition ${
                      tier.popular
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {tier.cta}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          AFFORDABLE, CUSTOMIZABLE ONE-TO-ONE COACHING (25% NEGOTIATED RATES)
          ========================================================================= */}
      <div className="pt-8 border-t border-slate-800">
        <AffordableCoachingSection />
      </div>

      {/* Checkout Modal */}
      {checkoutTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#0c142b] border border-amber-500/40 rounded-2xl p-6 text-slate-100 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400">Secure Checkout</span>
                <h3 className="font-heading font-bold text-lg text-slate-100">
                  Upgrade to {checkoutTier === 'pro' ? 'Executive Pro' : 'Team Cohort'}
                </h3>
              </div>
              <button onClick={() => setCheckoutTier(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'card' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <CreditCard size={14} />
                <span>Credit Card (Stripe)</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'upi' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <Zap size={14} />
                <span>UPI / Local Pay</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {paymentMethod === 'card' ? (
                <>
                  <div>
                    <label className="block text-slate-300 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-300 mb-1">Expires</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">CVC</label>
                      <input
                        type="text"
                        defaultValue="842"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 font-mono"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-slate-300 mb-1">UPI Virtual Payment Address</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400 font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Supports Google Pay, PhonePe, Paytm, and BHIM.</p>
                </div>
              )}

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span>Total Due Today:</span>
                <span className="font-mono font-bold text-amber-300 text-sm">
                  {checkoutTier === 'pro' ? formatPrice(24) : formatPrice(79)}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setCheckoutTier(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteUpgrade}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold hover:from-amber-400 hover:to-amber-500 shadow-md"
              >
                Authorize & Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
