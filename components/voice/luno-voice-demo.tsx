"use client";

import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  PhoneCall,
  PhoneOff,
  AlertCircle,
  Volume2,
} from "lucide-react";
import { getVoiceAgentService, LunoVoiceState } from "@/lib/voice-service";
import { MOTION_EASINGS } from "@/lib/motion-config";

interface LunoVoiceDemoProps {
  className?: string;
}

export type OperationalState =
  | "ready"
  | "connecting"
  | "listening"
  | "understanding"
  | "speaking"
  | "action"
  | "complete"
  | "error";

export const LunoVoiceDemo = memo(function LunoVoiceDemo({ className = "" }: LunoVoiceDemoProps) {
  const [serviceState, setServiceState] = useState<LunoVoiceState>("idle");
  const [operationalState, setOperationalState] = useState<OperationalState>("ready");
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
        setServiceState(newState);
        setIsMuted(service.getIsMuted());

        if (newState === "idle") {
          setOperationalState("ready");
        } else if (newState === "connecting") {
          setOperationalState("connecting");
        } else if (newState === "listening") {
          setOperationalState("listening");
        } else if (newState === "speaking") {
          setOperationalState("speaking");
        } else if (newState === "ended") {
          setOperationalState("complete");
        } else if (newState === "error") {
          setOperationalState("error");
        }

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

          // State progression heuristics on real transcripts
          if (t.role === "user") {
            setOperationalState("understanding");
          } else if (t.role === "agent") {
            const lower = t.text.toLowerCase();
            if (
              lower.includes("booked") ||
              lower.includes("confirmed") ||
              lower.includes("scheduled") ||
              lower.includes("calendar") ||
              lower.includes("locked")
            ) {
              setOperationalState("action");
              setTimeout(() => {
                setOperationalState("speaking");
              }, 1200);
            } else {
              setOperationalState("speaking");
            }
          }
        }
      },
      onError: (msg) => {
        setErrorMessage(msg);
        setOperationalState("error");
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

  // Calibrated Dual-Harmonic Oscilloscope Waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;
    let currentAmp = 3;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      phase += 0.026;

      let targetAmp = 3;
      let lineColor = "rgba(148, 163, 184, 0.35)";

      if (operationalState === "speaking") {
        targetAmp = 28 + Math.sin(phase * 3.2) * 12;
        lineColor = "#2563EB";
      } else if (operationalState === "listening") {
        targetAmp = 18 + Math.cos(phase * 2.8) * 9;
        lineColor = "#10B981";
      } else if (operationalState === "understanding") {
        targetAmp = 14 + Math.sin(phase * 4.5) * 6;
        lineColor = "#6366F1";
      } else if (operationalState === "action") {
        targetAmp = 18 + Math.cos(phase * 5) * 8;
        lineColor = "#10B981";
      } else if (operationalState === "connecting") {
        targetAmp = 8 + Math.sin(phase * 6) * 5;
        lineColor = "#F59E0B";
      } else {
        // Ready / Idle: calm subtle breathing movement
        targetAmp = 2.5 + Math.sin(phase * 1.2) * 1.2;
        lineColor = "rgba(148, 163, 184, 0.35)";
      }

      // Smooth amplitude interpolation (no popping)
      currentAmp += (targetAmp - currentAmp) * 0.08;

      // 1. Background Harmonic Glow Shadow
      ctx.strokeStyle =
        operationalState === "speaking"
          ? "rgba(37, 99, 235, 0.2)"
          : operationalState === "listening"
          ? "rgba(16, 185, 129, 0.18)"
          : operationalState === "understanding"
          ? "rgba(99, 102, 241, 0.2)"
          : "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const norm = (x / width) * Math.PI * 6;
        const envelope = Math.sin((x / width) * Math.PI);
        const y = midY + Math.cos(norm - phase * 1.4) * (currentAmp * 0.45) * envelope;
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
        const y = midY + Math.sin(norm + phase) * currentAmp * envelope;
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
  }, [operationalState]);

  const handleStartCall = useCallback(async () => {
    setTranscripts([]);
    setOperationalState("connecting");
    await serviceRef.current.start();
  }, []);

  const handleStopCall = useCallback(() => {
    serviceRef.current.stop();
    setOperationalState("complete");
    setTimeout(() => {
      setOperationalState("ready");
    }, 2000);
  }, []);

  const handleToggleMute = useCallback(() => {
    serviceRef.current.toggleMute();
    setIsMuted(serviceRef.current.getIsMuted());
  }, []);

  const isActive =
    serviceState === "listening" ||
    serviceState === "speaking" ||
    serviceState === "muted";

  const getStatusMeta = () => {
    switch (operationalState) {
      case "connecting":
        return {
          label: "Connecting...",
          dotClass: "bg-amber-500 animate-pulse",
          title: "VoiceOps Interactive Demo",
        };
      case "listening":
        return {
          label: "Listening",
          dotClass: "bg-emerald-500 animate-pulse",
          title: "VoiceOps is Listening",
        };
      case "understanding":
        return {
          label: "Processing",
          dotClass: "bg-blue-500 animate-pulse",
          title: "VoiceOps is Processing",
        };
      case "speaking":
        return {
          label: "Speaking",
          dotClass: "bg-blue-600 animate-pulse",
          title: "VoiceOps is Speaking",
        };
      case "action":
        return {
          label: "Committed",
          dotClass: "bg-emerald-500",
          title: "Action Confirmed",
        };
      case "complete":
        return {
          label: "Call Ended",
          dotClass: "bg-slate-400",
          title: "Call Complete",
        };
      case "error":
        return {
          label: "Unavailable",
          dotClass: "bg-rose-500",
          title: "Service Temporarily Busy",
        };
      default:
        return {
          label: "Ready to connect",
          dotClass: "bg-emerald-500",
          title: "Talk to VoiceOps",
        };
    }
  };

  const status = getStatusMeta();

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      {/* Clean Pure White Communication Surface */}
      <motion.div
        layout
        transition={{ duration: 0.35, ease: MOTION_EASINGS.editorial }}
        className="relative rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#10131B] border border-slate-200/80 dark:border-white/[0.08] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] space-y-6 text-left transition-colors duration-300"
      >
        {/* Top Header: Simple Title + Single Current Status Pill */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.06] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-sans text-sm font-semibold text-slate-900 dark:text-white">
                {status.title}
              </div>
              <div className="font-sans text-xs text-slate-500 dark:text-slate-400">
                Real-time WebRTC browser speech interface
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${status.dotClass}`} />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {status.label}
              </span>
            </span>
          </div>
        </div>

        {/* Large Responsive Waveform Canvas */}
        <div className="relative h-32 sm:h-36 w-full rounded-2xl bg-slate-950 border border-slate-900 flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            width={720}
            height={144}
            className="w-full h-full object-cover"
          />

          {!isActive && operationalState !== "connecting" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
              <span className="font-sans text-xs text-slate-300 bg-slate-900/90 px-4 py-2 rounded-full border border-white/10 shadow-lg text-center">
                Click &apos;Start Conversation&apos; below to speak with VoiceOps
              </span>
            </div>
          )}

          {isActive && (
            <div className="absolute bottom-3 right-4 flex items-center gap-2 font-mono text-[10px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-white/10">
              <Volume2 className="w-3 h-3 text-blue-400 animate-pulse" />
              <span>Audio Active</span>
            </div>
          )}
        </div>

        {/* Real-time Streaming Conversation Transcript */}
        <div className="min-h-[100px] max-h-[150px] overflow-y-auto space-y-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/[0.04] text-xs font-sans text-slate-800 dark:text-slate-300">
          {transcripts.length === 0 ? (
            <div className="text-center py-6 text-slate-400 dark:text-slate-500 font-normal">
              {isActive
                ? "Listening... Speak naturally to VoiceOps"
                : "Conversation transcript will appear here once connected"}
            </div>
          ) : (
            transcripts.map((t, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 uppercase tracking-wider ${
                    t.role === "user"
                      ? "bg-slate-200 text-slate-800 dark:bg-white/10 dark:text-slate-200 font-semibold"
                      : "bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 font-bold"
                  }`}
                >
                  {t.role === "user" ? "YOU" : "VOICEOPS"}
                </span>
                <p className="font-sans text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
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

        {/* Primary Action Controls Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-white/[0.06]">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-sans">
            Encrypted WebRTC · Direct browser microphone
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!isActive ? (
              <button
                onClick={handleStartCall}
                disabled={serviceState === "connecting"}
                className="w-full sm:w-auto min-h-[48px] px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-[13px] font-semibold tracking-tight transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {serviceState === "connecting" ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <PhoneCall className="w-4 h-4" />
                    <span>Start Conversation</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={handleToggleMute}
                  className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 touch-manipulation ${
                    isMuted
                      ? "bg-amber-500 text-white"
                      : "bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-200"
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
                  <span>End Call</span>
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
