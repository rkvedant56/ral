import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  ShieldCheck, 
  Award,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HomepageImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_PORTRAITS = [
  {
    id: 'official-ai-studio',
    label: 'Official Executive Portrait (Current Reference)',
    sublabel: 'Custom tailored executive blazer with spectacles',
    url: '/src/assets/images/rk_vedant_author_1792241867695.jpg'
  },
  {
    id: 'public-fallback',
    label: 'Doctrine Public Fallback',
    sublabel: 'High-res primary asset deployed to /public',
    url: '/rk_vedant_portrait.jpg'
  }
];

export const HomepageImageManagerModal: React.FC<HomepageImageManagerModalProps> = ({ isOpen, onClose }) => {
  const { authorPhotoUrl, setAuthorPhotoUrl } = useApp();

  const [previewUrl, setPreviewUrl] = useState<string>(authorPhotoUrl || '/src/assets/images/rk_vedant_author_1792241867695.jpg');
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  /**
   * Resizes an image file using an HTML5 Canvas to prevent LocalStorage Quota Exceeded errors.
   * Produces a lightweight, crisp high-res 600x600 JPEG.
   */
  const processAndCompressFile = (file: File) => {
    setIsProcessing(true);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onerror = () => {
      setIsProcessing(false);
      setErrorMessage("Could not read image file.");
    };

    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => {
        setIsProcessing(false);
        setErrorMessage("Invalid image format. Please select a JPG, PNG, or WebP file.");
      };

      img.onload = () => {
        try {
          const maxDim = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            throw new Error('Canvas context unavailable');
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Export compressed JPEG data URL (quality 0.88 is crystal clear yet ~50KB)
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          setPreviewUrl(compressedDataUrl);
          setIsProcessing(false);
        } catch (err) {
          console.error(err);
          setIsProcessing(false);
          setErrorMessage("Failed to compress image. Falling back to direct URL.");
        }
      };

      if (typeof e.target?.result === 'string') {
        img.src = e.target.result;
      }
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndCompressFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processAndCompressFile(file);
    }
  };

  const handleSave = () => {
    try {
      setAuthorPhotoUrl(previewUrl);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 1000);
    } catch (e) {
      console.error(e);
      setErrorMessage("Could not save to persistent storage.");
    }
  };

  const handleResetToDefault = () => {
    const defaultUrl = '/src/assets/images/rk_vedant_author_1792241867695.jpg';
    setPreviewUrl(defaultUrl);
    setAuthorPhotoUrl(defaultUrl);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#07221a] border border-[#1b4d3b] rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden text-emerald-50">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#0a2e23] text-emerald-300 hover:text-emerald-100 hover:bg-[#11382b] transition"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="space-y-1 pb-4 border-b border-[#134435]">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-300">
            <Award size={12} />
            <span>Doctrine Author Image Hub</span>
          </div>
          <h3 className="text-xl font-heading font-bold text-slate-100">
            Customize Homepage Author Portrait
          </h3>
          <p className="text-xs text-emerald-200/70">
            Upload a fresh portrait or select a verified asset. Saved photos persist across sessions, devices, and the entire app.
          </p>
        </div>

        {/* Main Content: Live Preview & Tabs */}
        <div className="py-4 space-y-4">
          {/* Live Preview Container */}
          <div className="flex items-center gap-5 p-3.5 bg-[#0a2e23] rounded-2xl border border-[#134435]">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-amber-400/60 shadow-lg shrink-0 bg-[#061e16]">
              <img
                src={previewUrl}
                alt="Author Preview"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as any).src = '/rk_vedant_portrait.jpg';
                }}
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                Live Preview
              </span>
              <p className="text-sm font-heading font-bold text-slate-100">
                RK Vedant
              </p>
              <p className="text-[11px] text-emerald-300/80">
                Synchronized on Home card, Author bio modal, and top navigation.
              </p>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex gap-1 p-1 bg-[#051c14] rounded-xl border border-[#113d2f] text-xs">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'upload' ? 'bg-amber-500 text-slate-950 shadow' : 'text-emerald-300 hover:text-emerald-100'
              }`}
            >
              <Upload size={13} />
              <span>Upload Local</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'presets' ? 'bg-amber-500 text-slate-950 shadow' : 'text-emerald-300 hover:text-emerald-100'
              }`}
            >
              <ImageIcon size={13} />
              <span>Verified Presets</span>
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'url' ? 'bg-amber-500 text-slate-950 shadow' : 'text-emerald-300 hover:text-emerald-100'
              }`}
            >
              <LinkIcon size={13} />
              <span>Image URL</span>
            </button>
          </div>

          {/* Tab 1: Upload */}
          {activeTab === 'upload' && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="p-6 border-2 border-dashed border-[#1c5541] hover:border-amber-400/60 rounded-2xl bg-[#092c20]/60 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
            >
              <div className="p-3 rounded-full bg-emerald-500/10 text-amber-400 group-hover:scale-110 transition">
                <Upload size={20} />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-emerald-100">
                  Click to browse or drag & drop photo here
                </p>
                <p className="text-[11px] text-emerald-300/60">
                  JPG, PNG, or WebP (Automatically optimized for fast persistence)
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}

          {/* Tab 2: Verified Presets */}
          {activeTab === 'presets' && (
            <div className="space-y-2">
              {PRESET_PORTRAITS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => setPreviewUrl(preset.url)}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between gap-3 ${
                    previewUrl === preset.url
                      ? 'bg-amber-500/15 border-amber-400 text-amber-100'
                      : 'bg-[#0a2e23] border-[#134435] text-emerald-200 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-10 h-10 rounded-lg object-cover object-top border border-emerald-500/30 shrink-0"
                    />
                    <div>
                      <p className="text-xs font-semibold text-slate-100">{preset.label}</p>
                      <p className="text-[10px] text-emerald-300/70">{preset.sublabel}</p>
                    </div>
                  </div>
                  {previewUrl === preset.url && (
                    <Check size={16} className="text-amber-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: URL Input */}
          {activeTab === 'url' && (
            <div className="space-y-2">
              <label className="text-xs text-emerald-300 font-medium block">
                Enter Web Image URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://example.com/portrait.jpg"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  className="flex-1 bg-[#051c14] border border-[#1b4d3b] rounded-xl px-3 py-2 text-xs text-emerald-100 focus:outline-none focus:border-amber-400 font-mono"
                />
                <button
                  onClick={() => {
                    if (customUrlInput.trim()) {
                      setPreviewUrl(customUrlInput.trim());
                    }
                  }}
                  className="px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-slate-100 text-xs font-semibold rounded-xl transition shrink-0"
                >
                  Preview
                </button>
              </div>
              <p className="text-[11px] text-emerald-300/60">
                Note: Ensure the image host allows cross-origin loading.
              </p>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Banner */}
          {saveSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
              <Check size={14} className="text-emerald-400 shrink-0" />
              <span>Homepage author image updated and persisted successfully!</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#134435] flex items-center justify-between gap-3 text-xs">
          <button
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-emerald-300/80 hover:text-amber-300 transition"
          >
            <RotateCcw size={12} />
            <span>Reset to Official Default</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#1b4d3b] hover:bg-[#0a2e23] text-emerald-200 transition font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold transition shadow-lg shadow-amber-500/20"
            >
              <Check size={14} />
              <span>{isProcessing ? 'Optimizing...' : 'Save & Persist'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
