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
  Radio,
  Sparkles,
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
            return next.slice(-4); // Keep last 4 turns for clean studio feel
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

      phase += 0.04;

      // Draw subtle grid lines
      ctx.strokeStyle = "rgba(100, 100, 120, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      // Configure waveform frequency & amplitude based on active speech state
      let amplitude = 12;
      let waveColor = "#3b82f6";
      let waveGlow = "rgba(59, 130, 246, 0.4)";

      if (state === "speaking") {
        amplitude = 36 + Math.sin(phase * 3) * 14;
        waveColor = "#2563eb";
        waveGlow = "rgba(37, 99, 235, 0.6)";
      } else if (state === "listening") {
        amplitude = 24 + Math.cos(phase * 2) * 8;
        waveColor = "#10b981";
        waveGlow = "rgba(16, 185, 129, 0.5)";
      } else if (state === "connecting") {
        amplitude = 16;
        waveColor = "#f59e0b";
        waveGlow = "rgba(245, 158, 11, 0.4)";
      }

      // Draw harmonic primary wave
      ctx.shadowBlur = 12;
      ctx.shadowColor = waveGlow;
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const norm = (x / width) * Math.PI * 4;
        const envelope = Math.sin((x / width) * Math.PI); // Window function at edges
        const y = midY + Math.sin(norm + phase) * amplitude * envelope;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw secondary trailing harmonic
      ctx.shadowBlur = 4;
      ctx.strokeStyle = state === "speaking" ? "#60a5fa" : "rgba(100, 116, 139, 0.3)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const norm = (x / width) * Math.PI * 6;
        const envelope = Math.sin((x / width) * Math.PI);
        const y = midY + Math.cos(norm - phase * 1.5) * (amplitude * 0.5) * envelope;
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
        return { label: "CONNECTING TO LUNOR", color: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" };
      case "listening":
        return { label: "LISTENING TO YOU", color: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" };
      case "speaking":
        return { label: "LUNOR TRANSMITTING", color: "text-blue-600 dark:text-blue-400", dot: "bg-blue-500" };
      case "muted":
        return { label: "MICROPHONE MUTED", color: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" };
      case "error":
        return { label: "CONNECTION ERROR", color: "text-rose-600 dark:text-rose-400", dot: "bg-rose-500" };
      default:
        return { label: "LIVE ENGINE STANDBY", color: "text-zinc-500", dot: "bg-zinc-400" };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Tactile Hardware Studio Deck */}
      <div className="relative rounded-3xl p-6 sm:p-9 structured-card shadow-2xl overflow-hidden space-y-6">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-4 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusBadge.dot} ${isActive ? "animate-ping" : ""}`} />
            <span className={`font-bold ${statusBadge.color}`}>{statusBadge.label}</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span>PROTOCOL: WEBRTC</span>
            <span>LATENCY: &lt;400MS</span>
          </div>
        </div>

        {/* Dynamic Acoustic Spectral Waveform Visualizer */}
        <div className="relative h-28 w-full rounded-2xl bg-black/[0.03] dark:bg-black/40 border border-black/[0.05] dark:border-white/[0.06] flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            width={600}
            height={112}
            className="w-full h-full object-cover"
          />

          {!isActive && state !== "connecting" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 bg-white/70 dark:bg-zinc-900/80 px-3 py-1 rounded-full border border-black/[0.05] dark:border-white/[0.08]">
                Click &apos;Start Conversation&apos; to speak
              </span>
            </div>
          )}
        </div>

        {/* Live Conversation Transcript Feed */}
        <div className="min-h-[100px] space-y-2.5 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.05] text-xs leading-relaxed">
          {transcripts.length === 0 ? (
            <div className="text-center py-4 text-zinc-400 font-mono text-[11px]">
              {isActive
                ? "Speak into your mic: 'Do you have property in Gachibowli?' or 'I want to schedule an appointment'..."
                : "Live telemetry transcript will appear here during call..."}
            </div>
          ) : (
            transcripts.map((t, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span
                  className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                    t.role === "user"
                      ? "bg-black/[0.06] dark:bg-white/[0.08] text-zinc-700 dark:text-zinc-300"
                      : "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {t.role === "user" ? "YOU" : "LUNOR"}
                </span>
                <p className="text-zinc-800 dark:text-zinc-200">{t.text}</p>
              </div>
            ))
          )}
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Hardware Studio Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Radio className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span>Direct Carrier Audio Node</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {!isActive ? (
              <button
                onClick={handleStartCall}
                disabled={state === "connecting"}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold btn-solid-primary disabled:opacity-50"
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
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
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
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-colors"
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
