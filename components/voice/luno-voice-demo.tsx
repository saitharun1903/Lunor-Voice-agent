"use client";

import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  PhoneCall,
  PhoneOff,
  AlertCircle,
  Radio,
  Volume2,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { getVoiceAgentService, LunoVoiceState } from "@/lib/voice-service";
import { MOTION_EASINGS } from "@/lib/motion-config";

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
  const transcriptsEndRef = useRef<HTMLDivElement>(null);

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
            return next.slice(-6);
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

  // Auto-scroll transcripts
  useEffect(() => {
    transcriptsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcripts]);

  // Precision Horizontal Oscilloscope Waveform with Dynamic Response
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

      phase += 0.028;

      let amplitude = 4;
      let lineColor = "rgba(113, 113, 122, 0.35)";

      if (state === "speaking") {
        amplitude = 26 + Math.sin(phase * 3.2) * 12;
        lineColor = "#3B82F6";
      } else if (state === "listening") {
        amplitude = 18 + Math.cos(phase * 2.5) * 8;
        lineColor = "#10B981";
      } else if (state === "connecting") {
        amplitude = 10 + Math.sin(phase * 4) * 4;
        lineColor = "#F59E0B";
      }

      // 1. Background Harmonic Shadow Wave
      ctx.strokeStyle =
        state === "speaking"
          ? "rgba(59, 130, 246, 0.22)"
          : state === "listening"
          ? "rgba(16, 185, 129, 0.18)"
          : "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const norm = (x / width) * Math.PI * 6;
        const envelope = Math.sin((x / width) * Math.PI);
        const y = midY + Math.cos(norm - phase * 1.4) * (amplitude * 0.45) * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Primary Resonant Signal Spline
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const norm = (x / width) * Math.PI * 4;
        const envelope = Math.sin((x / width) * Math.PI);
        const y = midY + Math.sin(norm + phase) * amplitude * envelope;
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

  const getStateMeta = () => {
    switch (state) {
      case "connecting":
        return {
          title: "CONNECTING TO FIRST-LAYER AGENT",
          subtitle: "Negotiating WebRTC telephony audio stream (<400ms)",
          badge: "CONNECTING",
          dotClass: "bg-amber-400 animate-pulse",
          themeBorder: "border-amber-500/40",
        };
      case "listening":
        return {
          title: "VOICEOPS IS LISTENING",
          subtitle: "Speak naturally — ask about services, hours, or appointments",
          badge: "LIVE · LISTENING",
          dotClass: "bg-emerald-400 animate-pulse",
          themeBorder: "border-emerald-500/40",
        };
      case "speaking":
        return {
          title: "VOICEOPS IS RESPONDING",
          subtitle: "Synthetic voice cadence streaming in sub-400ms turn",
          badge: "LIVE · SPEAKING",
          dotClass: "bg-blue-500 animate-ping",
          themeBorder: "border-blue-500/50",
        };
      case "muted":
        return {
          title: "MICROPHONE MUTED",
          subtitle: "Voice input suspended — click unmute to resume speaking",
          badge: "MUTED",
          dotClass: "bg-amber-400",
          themeBorder: "border-amber-500/30",
        };
      case "ended":
        return {
          title: "CALL COMPLETED",
          subtitle: "Session closed gracefully · Ready for next test",
          badge: "COMPLETED",
          dotClass: "bg-zinc-400",
          themeBorder: "border-zinc-500/30",
        };
      case "error":
        return {
          title: "SYSTEM TEMPORARILY BUSY",
          subtitle: errorMessage || "Unable to start session",
          badge: "UNAVAILABLE",
          dotClass: "bg-rose-500",
          themeBorder: "border-rose-500/40",
        };
      default:
        return {
          title: "VOICEOPS HARDWARE TELEPHONY DECK",
          subtitle: "Real-time WebRTC audio demo · Sub-second conversational turnaround",
          badge: "READY TO CONNECT",
          dotClass: "bg-zinc-400",
          themeBorder: "border-[rgba(36,33,26,0.08)] dark:border-white/[0.08]",
        };
    }
  };

  const meta = getStateMeta();

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      {/* The App-Grade Communication Surface */}
      <motion.div
        layout
        transition={{ duration: 0.35, ease: MOTION_EASINGS.editorial }}
        className={`relative rounded-3xl p-6 sm:p-8 bg-[#FAF8F2] dark:bg-[#10131B] border ${meta.themeBorder} shadow-2xl space-y-6 text-left transition-colors duration-300`}
      >
        {/* Top Deck Telemetry Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 dark:bg-blue-400/15 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono text-xs font-bold tracking-wider text-zinc-900 dark:text-white uppercase">
                {meta.title}
              </div>
              <div className="font-sans text-[11px] text-zinc-500 dark:text-zinc-400 font-normal">
                {meta.subtitle}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] self-start sm:self-auto">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06]">
              <span className={`w-2 h-2 rounded-full ${meta.dotClass}`} />
              <span className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase">
                {meta.badge}
              </span>
            </span>
          </div>
        </div>

        {/* Large Interactive Voice Surface (Oscilloscope + Status Pill) */}
        <div className="relative h-32 sm:h-36 w-full rounded-2xl bg-zinc-950 border border-black/10 dark:border-white/[0.08] flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            width={720}
            height={144}
            className="w-full h-full object-cover"
          />

          {!isActive && state !== "connecting" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
              <span className="font-sans text-xs text-zinc-300 bg-zinc-900/90 px-4 py-2 rounded-full border border-white/10 shadow-lg text-center">
                Click &apos;Start Live Conversation&apos; to speak with VoiceOps in real-time
              </span>
            </div>
          )}

          {isActive && (
            <div className="absolute bottom-3 right-4 flex items-center gap-2 font-mono text-[10px] text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded border border-white/10">
              <Volume2 className="w-3 h-3 text-blue-400 animate-pulse" />
              <span>WebRTC Telephony Stream Active</span>
            </div>
          )}
        </div>

        {/* Real-time Streaming Conversational Transcript Terminal */}
        <div className="min-h-[110px] max-h-[160px] overflow-y-auto space-y-2.5 p-4 rounded-2xl bg-[#F2EDE3] dark:bg-black/50 border border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] text-xs font-sans text-zinc-800 dark:text-zinc-300">
          {transcripts.length === 0 ? (
            <div className="text-center py-6 text-zinc-500 dark:text-zinc-400 font-normal">
              {isActive
                ? "Listening... Speak naturally (e.g., 'What hours are you open?' or 'Book an appointment')"
                : "Conversational telemetry log will stream here once connected"}
            </div>
          ) : (
            transcripts.map((t, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 uppercase tracking-wider ${
                    t.role === "user"
                      ? "bg-zinc-300 text-zinc-900 dark:bg-white/10 dark:text-zinc-200 font-semibold"
                      : "bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 font-bold"
                  }`}
                >
                  {t.role === "user" ? "CALLER" : "VOICEOPS"}
                </span>
                <p className="font-sans text-zinc-900 dark:text-zinc-100 leading-relaxed font-normal">
                  {t.text}
                </p>
              </div>
            ))
          )}
          <div ref={transcriptsEndRef} />
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Deck Action Controls Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-zinc-500 font-sans">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Direct Browser Audio</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Microphone Encrypted</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!isActive ? (
              <button
                onClick={handleStartCall}
                disabled={state === "connecting"}
                className="w-full sm:w-auto min-h-[46px] px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-[13px] font-semibold tracking-tight transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleToggleMute}
                  className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 touch-manipulation ${
                    isMuted
                      ? "bg-amber-500 text-white"
                      : "bg-black/[0.05] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-800 dark:text-zinc-200"
                  }`}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isMuted ? "Unmute" : "Mute"}</span>
                </button>

                <button
                  onClick={handleStopCall}
                  className="min-h-[44px] px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-1.5 touch-manipulation shadow-sm"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Session</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
});

export const VoiceOpsVoiceDemo = LunoVoiceDemo;
