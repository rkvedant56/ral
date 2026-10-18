import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Camera, 
  Upload, 
  Trash2, 
  Check, 
  RefreshCw, 
  User, 
  Briefcase, 
  ShieldCheck, 
  Target, 
  Sparkles, 
  Sliders, 
  AlertCircle,
  HelpCircle,
  Video
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectorType } from '../types';

export const UserProfileModal: React.FC = () => {
  const { user, updateUser, isProfileModalOpen, closeProfileModal } = useApp();

  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState(user.title);
  const [sector, setSector] = useState<SectorType>(user.sector);
  const [experienceYears, setExperienceYears] = useState(user.experienceYears);
  const [currentChallenge, setCurrentChallenge] = useState(user.currentChallenge || '');
  const [leadershipGoal, setLeadershipGoal] = useState(user.leadershipGoal || '');
  const [bio, setBio] = useState(user.bio || '');
  const [previewPhoto, setPreviewPhoto] = useState<string>(user.photoUrl || user.avatar || '');

  // Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isProfileModalOpen) {
      setName(user.name);
      setTitle(user.title);
      setSector(user.sector);
      setExperienceYears(user.experienceYears);
      setCurrentChallenge(user.currentChallenge || '');
      setLeadershipGoal(user.leadershipGoal || '');
      setBio(user.bio || '');
      setPreviewPhoto(user.photoUrl || user.avatar || '');
      setIsCameraActive(false);
      setCameraError(null);
    } else {
      stopCamera();
    }
  }, [isProfileModalOpen, user]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        stopCamera();
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: facingMode,
          width: { ideal: 640 },
          height: { ideal: 640 }
        },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(
        err.name === 'NotAllowedError' 
          ? 'Camera permission was denied. Please allow camera access in browser settings or upload a file instead.' 
          : 'Could not access device camera. Please upload an image file instead.'
      );
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      const size = Math.min(video.videoWidth || 480, video.videoHeight || 480);
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Center crop square
        const startX = ((video.videoWidth || size) - size) / 2;
        const startY = ((video.videoHeight || size) - size) / 2;
        ctx.drawImage(video, startX, startY, size, size, 0, 0, size, size);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        setPreviewPhoto(dataUrl);
        stopCamera();
      }
    } catch (e) {
      console.error('Failed to capture frame', e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPreviewPhoto(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPreviewPhoto('');
  };

  const handleSave = () => {
    updateUser({
      name: name.trim() || 'Leader',
      title: title.trim() || 'Executive Leader',
      sector,
      experienceYears: Number(experienceYears) || 5,
      avatar: previewPhoto || undefined,
      photoUrl: previewPhoto || undefined,
      currentChallenge: currentChallenge.trim(),
      leadershipGoal: leadershipGoal.trim(),
      bio: bio.trim()
    });
    stopCamera();
    closeProfileModal();
  };

  if (!isProfileModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#0f172a] to-[#070c1e] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-lg font-heading font-bold text-slate-100 flex items-center gap-2">
                Executive Profile & Photo Studio
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-sans uppercase">
                  RAL Adaptive Persona
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Personalizes your AI coach dialogues, psychometric tests, and executive presence
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              closeProfileModal();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Photo Studio Section */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Photo Display / Viewfinder */}
              <div className="relative shrink-0">
                {isCameraActive ? (
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl bg-black flex items-center justify-center">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 border-2 border-amber-400/40 rounded-2xl pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-xl bg-slate-950 flex items-center justify-center group">
                    {previewPhoto ? (
                      <img 
                        src={previewPhoto} 
                        alt="Profile Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <User size={48} className="text-slate-600 mb-1" />
                        <span className="text-[10px] uppercase font-mono">No Photo</span>
                      </div>
                    )}
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-slate-900/90 text-[10px] text-amber-300 font-mono border border-amber-400/20">
                      RAL Verified
                    </div>
                  </div>
                )}
              </div>

              {/* Photo Controls */}
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div>
                  <h3 className="text-sm font-semibold text-slate-200">Executive Portrait</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Displayed prominently in the navigation header and your personalized AI coaching thread.
                  </p>
                </div>

                {isCameraActive ? (
                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-xs shadow-md hover:from-amber-400 hover:to-amber-500 transition"
                    >
                      <Camera size={14} />
                      Take Snapshot
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
                        startCamera();
                      }}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                      title="Switch Camera"
                    >
                      <RefreshCw size={13} />
                      Flip
                    </button>
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    {/* Camera Button */}
                    <button
                      type="button"
                      onClick={startCamera}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 hover:bg-amber-500/30 font-medium text-xs transition"
                    >
                      <Camera size={14} />
                      Capture with Camera
                    </button>

                    {/* Upload File Button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
                    >
                      <Upload size={14} />
                      Upload Photo
                    </button>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />

                    {/* Remove Photo */}
                    {previewPhoto && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="flex items-center gap-1 px-2 py-1.5 rounded-xl text-red-400 hover:bg-red-500/10 text-xs transition"
                        title="Remove photo"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                )}

                {cameraError && (
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-[11px] text-left">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>{cameraError}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details Form */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
              <Briefcase size={14} />
              Leadership Context & Domain Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
                  placeholder="e.g. Alex Vance"
                />
              </div>

              {/* Title / Role */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Leadership Title / Role
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
                  placeholder="e.g. Senior Director & Engineering Leader"
                />
              </div>

              {/* Sector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Leadership Sector (Shapes All Unique Tests)
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value as SectorType)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
                >
                  <option value="corporate">Corporate Executive & Enterprise</option>
                  <option value="startup">High-Growth Startup & Scaleup</option>
                  <option value="military_civilian">Military-to-Civilian & Transition</option>
                  <option value="public_sector">Public Sector, Policy & Civil Service</option>
                  <option value="education">Education & Academic Governance</option>
                  <option value="personal">Personal Mastery & Life Leadership</option>
                </select>
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Years of Leadership Experience
                </label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Current Leadership Challenge */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Current Core Leadership Challenge or Pressure Point
              </label>
              <input
                type="text"
                value={currentChallenge}
                onChange={(e) => setCurrentChallenge(e.target.value)}
                placeholder="e.g. Managing high team friction while facing tight board deadlines"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Used to dynamically generate bespoke test dilemmas and tailor Socratic coaching queries.
              </p>
            </div>

            {/* Leadership Goal */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Primary RAL Shift Goal
              </label>
              <input
                type="text"
                value={leadershipGoal}
                onChange={(e) => setLeadershipGoal(e.target.value)}
                placeholder="e.g. Shift from reactive urgency to calm, decisive presence in boardrooms"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Bio / Philosophy */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Leadership Philosophy & Background
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Brief summary of your leadership background and values..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-1.5 text-xs text-amber-300/80">
            <Sparkles size={14} className="text-amber-400" />
            <span>Profile powers bespoke adaptive psychometric tests</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                stopCamera();
                closeProfileModal();
              }}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-medium transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition"
            >
              <Check size={14} />
              Save Profile & Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
