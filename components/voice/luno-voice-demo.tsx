"use client";

import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import {
  Mic,
  MicOff,
  PhoneCall,
  PhoneOff,
  AlertCircle,
  Activity,
  Zap,
  Volume2,
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
  const [callDuration, setCallDuration] = useState(0);

  const serviceRef = useRef(getVoiceAgentService());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const timerRef = useRef<NodeJS.Timeout>();

  // Call timer effect
  useEffect(() => {
    const isActive = state === "listening" || state === "speaking" || state === "muted";
    if (isActive) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state]);

  // Subscribe to real OmniDimension voice agent service
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

  // 60fps Multi-Harmonic Spectral Audio Waveform Canvas
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

      phase += 0.04;

      // Base Grid Lines
      ctx.strokeStyle = "rgba(120, 120, 140, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      let amplitude = 8;
      let primaryColor = "#3b82f6";
      let glowColor = "rgba(59, 130, 246, 0.3)";

      if (state === "speaking") {
        amplitude = 28 + Math.sin(phase * 2.5) * 14;
        primaryColor = "#2563eb";
        glowColor = "rgba(37, 99, 235, 0.55)";
      } else if (state === "listening") {
        amplitude = 18 + Math.cos(phase * 1.8) * 10;
        primaryColor = "#10b981";
        glowColor = "rgba(16, 185, 129, 0.45)";
      } else if (state === "connecting") {
        amplitude = 14;
        primaryColor = "#f59e0b";
        glowColor = "rgba(245, 158, 11, 0.35)";
      }

      // 1. Primary Wave with Glowing Gradient
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, "rgba(59, 130, 246, 0.2)");
      grad.addColorStop(0.5, primaryColor);
      grad.addColorStop(1, "rgba(59, 130, 246, 0.2)");

      ctx.shadowBlur = 14;
      ctx.shadowColor = glowColor;
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const norm = (x / width) * Math.PI * 4;
        const envelope = Math.sin((x / width) * Math.PI);
        const y = midY + Math.sin(norm + phase) * amplitude * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Harmonic Echo Wave with Refraction
      ctx.shadowBlur = 6;
      ctx.strokeStyle = state === "speaking" ? "#60a5fa" : "rgba(148, 163, 184, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const norm = (x / width) * Math.PI * 6;
        const envelope = Math.sin((x / width) * Math.PI);
        const y = midY + Math.cos(norm - phase * 1.3) * (amplitude * 0.5) * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
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

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusBadge = () => {
    switch (state) {
      case "connecting":
        return { label: "CONNECTING WEBRTC...", color: "text-amber-500", dot: "bg-amber-500" };
      case "listening":
        return { label: "LISTENING TO YOU", color: "text-emerald-500", dot: "bg-emerald-500 animate-pulse" };
      case "speaking":
        return { label: "VOICEOPS TRANSMITTING", color: "text-blue-500", dot: "bg-blue-500 animate-ping" };
      case "muted":
        return { label: "MIC MUTED", color: "text-amber-500", dot: "bg-amber-500" };
      case "error":
        return { label: "TELEPHONY ERROR", color: "text-rose-500", dot: "bg-rose-500" };
      default:
        return { label: "STUDIO READY", color: "text-zinc-400", dot: "bg-zinc-400" };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
      <div className="relative rounded-3xl p-6 sm:p-8 structured-card shadow-2xl space-y-6">
        {/* Top Hardware Telemetry Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-full ${statusBadge.dot}`} />
            <span className={`type-label-tech font-bold ${statusBadge.color}`}>
              {statusBadge.label}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            {isActive && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                {formatTimer(callDuration)}
              </span>
            )}
            <span className="hidden sm:inline">LATENCY: ~340ms</span>
            <span className="hidden sm:inline">HD VOICE</span>
          </div>
        </div>

        {/* Dynamic Acoustic Waveform Canvas */}
        <div className="relative h-28 w-full rounded-2xl bg-black/[0.03] dark:bg-black/40 border border-black/[0.05] dark:border-white/[0.06] flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            width={720}
            height={112}
            className="w-full h-full object-cover"
          />

          {!isActive && state !== "connecting" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="type-body-sm text-zinc-700 dark:text-zinc-300 bg-white/95 dark:bg-zinc-900/95 px-4 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.1] shadow-md font-medium">
                Click &apos;Start Live Conversation&apos; to speak
              </span>
            </div>
          )}
        </div>

        {/* Live Conversation Transcript Terminal */}
        <div className="min-h-[90px] space-y-2.5 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.05] text-xs leading-relaxed font-sans">
          {transcripts.length === 0 ? (
            <div className="text-center py-4 text-zinc-400 dark:text-zinc-500">
              {isActive
                ? "Speak naturally: Ask about properties, booking an appointment, or service pricing..."
                : "Live audio transcript and real-time tool execution stream here..."}
            </div>
          ) : (
            transcripts.map((t, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span
                  className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md shrink-0 uppercase tracking-wider ${
                    t.role === "user"
                      ? "bg-black/[0.06] dark:bg-white/[0.08] text-zinc-800 dark:text-zinc-200"
                      : "bg-blue-600/15 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {t.role === "user" ? "YOU" : "VOICEOPS"}
                </span>
                <p className="type-body-sm text-zinc-900 dark:text-zinc-100 font-normal">{t.text}</p>
              </div>
            ))
          )}
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 type-body-sm text-rose-600 dark:text-rose-400 flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Tactile Call Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Volume2 className="w-3.5 h-3.5 text-zinc-500" />
            <span>Browser audio permissions requested on connect</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!isActive ? (
              <button
                onClick={handleStartCall}
                disabled={state === "connecting"}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl type-btn btn-solid-primary disabled:opacity-50 shadow-lg"
              >
                {state === "connecting" ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <PhoneCall className="w-4 h-4" />
                    <span>Start Live Conversation</span>
                  </>
                )}
              </button>
            ) : (
              <>
                <button
                  onClick={handleToggleMute}
                  className={`px-5 py-2.5 rounded-xl type-btn flex items-center gap-2 transition-colors ${
                    isMuted
                      ? "bg-amber-500 text-white"
                      : "btn-outline-secondary"
                  }`}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isMuted ? "Unmute" : "Mute Mic"}</span>
                </button>

                <button
                  onClick={handleStopCall}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl type-btn bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-colors"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Session</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
