import React, { useState } from 'react';
import { Award, Shield, BookOpen, X, Upload, CheckCircle2, Compass, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HomepageImageManagerModal } from './HomepageImageManagerModal';

export const AuthorModal: React.FC = () => {
  const { 
    isAuthorModalOpen, 
    closeAuthorModal, 
    authorPhotoUrl, 
    setAuthorPhotoUrl,
    t
  } = useApp();

  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);

  if (!isAuthorModalOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAuthorPhotoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#07221a] border border-[#1b4d3b] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-emerald-50 max-h-[90vh] overflow-y-auto">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthorModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#0a2e23] text-emerald-300 hover:text-emerald-100 hover:bg-[#11382b] transition"
        >
          <X size={18} />
        </button>

        {/* Header / Profile */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#134435]">
          {/* Portrait Container */}
          <div className="relative group shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-xl bg-gradient-to-br from-[#0c2a21] to-[#041510] flex items-center justify-center relative">
              <img 
                src={authorPhotoUrl || '/src/assets/images/rk_vedant_author_1792241867695.jpg'} 
                alt="RK Vedant" 
                className="w-full h-full object-cover object-top" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as any).src = '/rk_vedant_portrait.jpg';
                }}
              />

              {/* Upload / Change Photo Overlay */}
              <button
                onClick={() => setIsImageManagerOpen(true)}
                title="Upload, change, or select official photograph"
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-xs text-amber-200 transition gap-1"
              >
                <Upload size={16} />
                <span>Change Photo</span>
              </button>
            </div>
            
            <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1">
              <Award size={10} />
              <span>Doctrine</span>
            </div>
          </div>

          {/* Author Details */}
          <div className="text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-medium">
              <Compass size={12} />
              <span>Doctrine Author & Conceptual Authority</span>
            </div>

            <h2 className="text-2xl font-heading font-bold text-slate-100">
              RK Vedant
            </h2>

            <p className="text-xs sm:text-sm text-emerald-300/90 font-medium">
              Doctrine Author | Leadership Strategist | Former Military Commander & Executive Mentor
            </p>

            <p className="text-xs text-emerald-100/70 italic leading-relaxed pt-1">
              “A leader cannot lead others until they learn to lead their own mind through complexity. Leadership collapses internally long before it collapses externally.”
            </p>
          </div>
        </div>

        {/* Bio & Doctrine Foundations */}
        <div className="py-6 space-y-4 text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
          <h3 className="font-heading font-semibold text-emerald-200 text-base flex items-center gap-2">
            <BookOpen size={16} className="text-amber-400" />
            <span>The Genesis of Reflective Adaptive Leadership (RAL)</span>
          </h3>

          <p>
            Reflective Adaptive Leadership was forged through decades of high-stakes operational command in unpredictable, ambiguous military environments, and subsequently synthesized with modern cognitive neuroscience, organizational psychometrics, and executive governance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#0a2e23] border border-[#134435]">
              <div className="font-semibold text-amber-300 text-xs mb-1">Operational Command Decoupling</div>
              <p className="text-[12px] text-emerald-200/70">
                Pioneered techniques to break neural amygdala hijack in split-second tactical and strategic decision windows.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#0a2e23] border border-[#134435]">
              <div className="font-semibold text-emerald-300 text-xs mb-1">Executive Mentorship</div>
              <p className="text-[12px] text-emerald-200/70">
                Trained C-suite executives, senior civil servants, and board directors across India, Europe, the Americas, and global enterprises.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
            <p className="font-semibold text-amber-300 mb-1">The 4 Non-Negotiables of RAL:</p>
            <ul className="list-disc list-inside space-y-1 text-emerald-100/90 text-[12px]">
              <li><strong>State before strategy</strong> — Never execute from an agitated nervous system.</li>
              <li><strong>Clarity before speed</strong> — Speed without clarity is accelerated panic.</li>
              <li><strong>Awareness before influence</strong> — Govern your inner filters before governing the room.</li>
              <li><strong>Inner coherence before outer performance</strong> — External success fractures if internal architecture collapses.</li>
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-[#134435] flex items-center justify-between">
          <span className="text-[11px] text-emerald-300/60">Official RAL Doctrine Verification</span>
          <button
            onClick={closeAuthorModal}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition"
          >
            Close Profile
          </button>
        </div>
      </div>

      {/* Embedded Image Hub */}
      <HomepageImageManagerModal
        isOpen={isImageManagerOpen}
        onClose={() => setIsImageManagerOpen(false)}
      />
    </div>
  );
};
