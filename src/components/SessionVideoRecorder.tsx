import React, { useState, useRef } from 'react';
import { 
  Video, 
  Download, 
  Play, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Film,
  Compass,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

interface SessionVideoRecorderProps {
  isOpen: boolean;
  onClose: () => void;
  sessionTitle?: string;
  summaryText?: string;
  prescribedAction?: string;
}

export const SessionVideoRecorder: React.FC<SessionVideoRecorderProps> = ({
  isOpen,
  onClose,
  sessionTitle = "Leadership Calibration & Strategic Reset",
  summaryText = "The leader pauses to decouple instinct from fear, separating facts from defensive assumptions.",
  prescribedAction = "Practice the 10-Second Baseline Reset before tomorrow's executive review."
}) => {
  const { user, diagnostic, addSessionVideo } = useApp();

  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleGenerateVideo = async () => {
    setIsRecording(true);
    setProgressPercent(0);
    setRecordedVideoUrl(null);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Web Audio setup to inject pleasant chime into video audio track
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const dest = audioCtx.createMediaStreamDestination();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(432, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(dest);
    osc.start();

    // Stream from canvas + audio
    const canvasStream = canvas.captureStream(30);
    const combinedTracks = [
      ...canvasStream.getVideoTracks(),
      ...dest.stream.getAudioTracks()
    ];
    const combinedStream = new MediaStream(combinedTracks);

    let mediaRecorder: MediaRecorder;
    try {
      mediaRecorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm' });
    } catch (e) {
      mediaRecorder = new MediaRecorder(combinedStream);
    }

    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      osc.stop();
      audioCtx.close();
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedVideoUrl(url);
      setIsRecording(false);

      addSessionVideo({
        title: sessionTitle,
        date: new Date().toISOString().slice(0, 10),
        durationSec: 8,
        videoBlobUrl: url,
        transcriptSummary: summaryText,
        matrixScores: {
          raag: diagnostic?.raagScore || 35,
          lstm: diagnostic?.lstmScore || 35,
          adg: diagnostic?.adgScore || 35,
          acl: diagnostic?.aclScore || 35
        }
      });

      try {
        confetti({ particleCount: 60, spread: 60 });
      } catch (e) {}
    };

    mediaRecorder.start();

    // Render loop for 8 seconds (240 frames at 30fps)
    let frame = 0;
    const totalFrames = 240;

    const renderFrame = () => {
      frame++;
      setProgressPercent(Math.round((frame / totalFrames) * 100));

      const w = canvas.width;
      const h = canvas.height;

      // 1. Dark executive navy background
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#070c1e');
      grad.addColorStop(0.5, '#0b142e');
      grad.addColorStop(1, '#050917');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // 2. Animated breathing golden circle in background
      const scale = 1 + 0.15 * Math.sin(frame * 0.05);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.beginPath();
      ctx.arc(0, 0, 160 * scale, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.12)';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 220 * scale, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.stroke();
      ctx.restore();

      // 3. Header badge
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('RAL EXECUTIVE COACHING SESSION RECAP', 60, 70);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px sans-serif';
      ctx.fillText(`Leader: ${user.name} (${user.title}) · Doctrine by RK Vedant`, 60, 100);

      // Gold divider line
      ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.fillRect(60, 115, w - 120, 2);

      // 4. Session Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px serif';
      ctx.fillText(sessionTitle, 60, 175);

      // 5. Matrix Snapshot Card
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fillRect(60, 210, 360, 300);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(60, 210, 360, 300);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('FOUR CORE MATRICES', 85, 250);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '16px sans-serif';
      ctx.fillText(`RAAG (Awareness): ${diagnostic?.raagScore || 36} / 50`, 85, 290);
      ctx.fillText(`LSTM (Transition): ${diagnostic?.lstmScore || 32} / 50`, 85, 330);
      ctx.fillText(`ADG (Decisions): ${diagnostic?.adgScore || 34} / 50`, 85, 370);
      ctx.fillText(`ACL (Culture): ${diagnostic?.aclScore || 31} / 50`, 85, 410);

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(`Composite Score: ${diagnostic?.compositeScore || 133} / 200`, 85, 460);

      // 6. Summary and Prescribed Action
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px serif';
      ctx.fillText('Reflective Core Insight:', 460, 250);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '18px sans-serif';
      // Simple text wrapping
      ctx.fillText(`"${summaryText.slice(0, 80)}"`, 460, 290);
      if (summaryText.length > 80) {
        ctx.fillText(`"${summaryText.slice(80, 160)}"`, 460, 320);
      }

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 22px serif';
      ctx.fillText('Prescribed Behavioral Action:', 460, 380);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '18px sans-serif';
      ctx.fillText(`• ${prescribedAction.slice(0, 75)}`, 460, 420);
      if (prescribedAction.length > 75) {
        ctx.fillText(`  ${prescribedAction.slice(75, 150)}`, 460, 450);
      }

      // 7. Footer quote & progress indicator
      ctx.fillStyle = '#64748b';
      ctx.font = 'italic 16px sans-serif';
      ctx.fillText('"Leadership collapses internally before it collapses externally." — RK Vedant', 60, 650);

      // Animated progress timeline at bottom
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(0, h - 8, (w * frame) / totalFrames, 8);

      if (frame < totalFrames) {
        requestAnimationFrame(renderFrame);
      } else {
        mediaRecorder.stop();
      }
    };

    renderFrame();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#0a122c] border border-amber-500/40 rounded-3xl p-6 text-slate-100 shadow-2xl relative space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
              <Film size={20} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">
                Executive Video Studio
              </span>
              <h3 className="text-xl font-heading font-bold text-slate-100">
                Generate Session Video Recap
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X size={20} />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          Render an animated executive HD video of this session complete with your diagnostic baseline, core reflections, and prescribed action plan for offline personal review.
        </p>

        {/* Hidden Canvas for Video Rendering (1280x720) */}
        <div className="flex justify-center bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 relative aspect-video">
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="w-full h-full object-contain"
          />

          {!isRecording && !recordedVideoUrl && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 p-6 text-center">
              <Film size={40} className="text-amber-400 mb-3" />
              <h4 className="font-heading font-bold text-slate-100 text-base">
                Ready to Record Session Video
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Generates a personal 8-second animated video with high-definition matrix graphics and 432Hz ambient soundscape.
              </p>
            </div>
          )}

          {isRecording && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/85 p-6 text-center">
              <span className="text-3xl font-mono font-bold text-amber-400 mb-2">
                {progressPercent}%
              </span>
              <p className="text-xs text-slate-300">Rendering video frames & encoding neuro-acoustic audio...</p>
              <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mt-3">
                <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          )}

          {recordedVideoUrl && !isRecording && (
            <video
              src={recordedVideoUrl}
              controls
              autoPlay
              loop
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-400">
            Format: WebM / MP4 · 1280x720 HD · Free Personal Use
          </span>

          <div className="flex items-center gap-2">
            {!recordedVideoUrl ? (
              <button
                onClick={handleGenerateVideo}
                disabled={isRecording}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition"
              >
                <Video size={14} />
                <span>{isRecording ? 'Rendering Video...' : 'Record Video Now'}</span>
              </button>
            ) : (
              <a
                href={recordedVideoUrl}
                download={`RAL-Session-${new Date().toISOString().slice(0, 10)}.webm`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition"
              >
                <Download size={14} />
                <span>Download Video File</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
