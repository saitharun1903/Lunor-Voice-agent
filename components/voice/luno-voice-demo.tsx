"use client";

import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import {
  Mic,
  MicOff,
  PhoneCall,
  PhoneOff,
  AlertCircle,
} from "lucide-react";
import { getVoiceAgentService, LunoVoiceState } from "@/lib/voice-service";

interface LunoVoiceDemoProps {
  className?: string;
}

export const LunoVoiceDemo = memo(function LunoVoiceDemo({ className = "" }: LunoVoiceDemoProps) {
  const [state, setState] = useState<LunoVoiceState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [transcripts, setTranscripts] = useState<Array<{ role: string; text: string }>>([]);

  const serviceRef = useRef(getVoiceAgentService());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  // Subscribe to real voice agent service
  useEffect(() => {
    const service = serviceRef.current;
    const unsubscribe = service.subscribe({
      onStateChange: (newState) => {
        setState(newState);
        setIsMuted(service.getIsMuted());
        if (newState !== "error") {
          setErrorMessage("");
        }
      },
      onTranscript: (t) => {
        if (t.text && t.text.trim()) {
          setTranscripts((prev) => {
            const next = [...prev, { role: t.role, text: t.text }];
            return next.slice(-4);
          });
        }
      },
      onError: (msg) => {
        setErrorMessage(msg);
      },
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Custom Lunor Dynamic Spectral Waveform Canvas Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      phase += 0.035;

      ctx.strokeStyle = "rgba(100, 100, 120, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      let amplitude = 10;
      let waveColor = "#3b82f6";
      let waveGlow = "rgba(59, 130, 246, 0.25)";

      if (state === "speaking") {
        amplitude = 28 + Math.sin(phase * 3) * 10;
        waveColor = "#2563eb";
        waveGlow = "rgba(37, 99, 235, 0.4)";
      } else if (state === "listening") {
        amplitude = 18 + Math.cos(phase * 2) * 6;
        waveColor = "#10b981";
        waveGlow = "rgba(16, 185, 129, 0.35)";
      } else if (state === "connecting") {
        amplitude = 12;
        waveColor = "#f59e0b";
        waveGlow = "rgba(245, 158, 11, 0.25)";
      }

      ctx.shadowBlur = 8;
      ctx.shadowColor = waveGlow;
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const norm = (x / width) * Math.PI * 4;
        const envelope = Math.sin((x / width) * Math.PI);
        const y = midY + Math.sin(norm + phase) * amplitude * envelope;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      ctx.shadowBlur = 2;
      ctx.strokeStyle = state === "speaking" ? "#60a5fa" : "rgba(100, 116, 139, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const norm = (x / width) * Math.PI * 6;
        const envelope = Math.sin((x / width) * Math.PI);
        const y = midY + Math.cos(norm - phase * 1.5) * (amplitude * 0.4) * envelope;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [state]);

  const handleStartCall = useCallback(async () => {
    setTranscripts([]);
    await serviceRef.current.start();
  }, []);

  const handleStopCall = useCallback(() => {
    serviceRef.current.stop();
  }, []);

  const handleToggleMute = useCallback(() => {
    serviceRef.current.toggleMute();
    setIsMuted(serviceRef.current.getIsMuted());
  }, []);

  const isActive = state === "listening" || state === "speaking" || state === "muted";

  const getStatusBadge = () => {
    switch (state) {
      case "connecting":
        return { label: "Connecting...", color: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" };
      case "listening":
        return { label: "Listening...", color: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" };
      case "speaking":
        return { label: "Lunor is speaking...", color: "text-blue-600 dark:text-blue-400", dot: "bg-blue-500" };
      case "muted":
        return { label: "Microphone muted", color: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" };
      case "error":
        return { label: "Connection error", color: "text-rose-600 dark:text-rose-400", dot: "bg-rose-500" };
      default:
        return { label: "Ready to talk", color: "text-zinc-600 dark:text-zinc-400", dot: "bg-zinc-400" };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <div className="relative rounded-2xl p-6 sm:p-7 structured-card shadow-lg space-y-5">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusBadge.dot} ${isActive ? "animate-ping" : ""}`} />
            <span className={`text-xs font-semibold ${statusBadge.color}`}>{statusBadge.label}</span>
          </div>

          <span className="text-xs text-zinc-400">
            Live Voice Session
          </span>
        </div>

        {/* Dynamic Acoustic Waveform Canvas */}
        <div className="relative h-24 w-full rounded-xl bg-black/[0.02] dark:bg-black/30 border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            width={600}
            height={96}
            className="w-full h-full object-cover"
          />

          {!isActive && state !== "connecting" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="type-body-sm text-zinc-500 dark:text-zinc-400 bg-white/90 dark:bg-zinc-900/90 px-3.5 py-1 rounded-full border border-black/[0.05] dark:border-white/[0.07] shadow-sm">
                Click &apos;Start Conversation&apos; to speak
              </span>
            </div>
          )}
        </div>

        {/* Live Conversation Transcript Feed */}
        <div className="min-h-[80px] space-y-2 p-3.5 rounded-xl bg-black/[0.015] dark:bg-white/[0.02] border border-black/[0.03] dark:border-white/[0.04] text-xs leading-relaxed">
          {transcripts.length === 0 ? (
            <div className="text-center py-3 text-zinc-400">
              {isActive
                ? "Speak naturally: 'Do you have property in Gachibowli?' or 'I'd like to book an appointment'..."
                : "Live transcript will stream here during your call..."}
            </div>
          ) : (
            transcripts.map((t, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span
                  className={`text-[11px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                    t.role === "user"
                      ? "bg-black/[0.05] dark:bg-white/[0.08] text-zinc-700 dark:text-zinc-300"
                      : "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {t.role === "user" ? "YOU" : "LUNOR"}
                </span>
                <p className="type-body-sm text-zinc-800 dark:text-zinc-200">{t.text}</p>
              </div>
            ))
          )}
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 type-body-sm text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Controls */}
        <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-zinc-400">
            Microphone access is requested only during the live call.
          </span>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {!isActive ? (
              <button
                onClick={handleStartCall}
                disabled={state === "connecting"}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full type-btn btn-solid-primary disabled:opacity-50 shadow-md"
              >
                {state === "connecting" ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Start Conversation</span>
                  </>
                )}
              </button>
            ) : (
              <>
                <button
                  onClick={handleToggleMute}
                  className={`px-4 py-2 rounded-full type-btn flex items-center gap-1.5 transition-colors ${
                    isMuted
                      ? "bg-amber-500 text-white"
                      : "btn-outline-secondary"
                  }`}
                >
                  {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  <span>{isMuted ? "Unmute" : "Mute"}</span>
                </button>

                <button
                  onClick={handleStopCall}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2 rounded-full type-btn bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors"
                >
                  <PhoneOff className="w-3.5 h-3.5" />
                  <span>End Call</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
