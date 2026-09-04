"use client";

import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { Mic, MicOff, PhoneCall, PhoneOff, AlertCircle, Sparkles } from "lucide-react";
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

  // Precision Horizontal Oscilloscope Waveform
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

      phase += 0.025;

      let amplitude = 4;
      let lineColor = "rgba(113, 113, 122, 0.4)";

      if (state === "speaking") {
        amplitude = 24 + Math.sin(phase * 2.8) * 10;
        lineColor = "#3b82f6";
      } else if (state === "listening") {
        amplitude = 16 + Math.cos(phase * 2.2) * 6;
        lineColor = "#10b981";
      } else if (state === "connecting") {
        amplitude = 10;
        lineColor = "#f59e0b";
      }

      // Primary Wave
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2.0;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const norm = (x / width) * Math.PI * 4;
        const envelope = Math.sin((x / width) * Math.PI);
        const y = midY + Math.sin(norm + phase) * amplitude * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Subtle Secondary Harmonic
      ctx.strokeStyle =
        state === "speaking"
          ? "rgba(96, 165, 250, 0.25)"
          : state === "listening"
          ? "rgba(52, 211, 153, 0.2)"
          : "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const norm = (x / width) * Math.PI * 6;
        const envelope = Math.sin((x / width) * Math.PI);
        const y = midY + Math.cos(norm - phase * 1.2) * (amplitude * 0.4) * envelope;
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

  const getStateBadge = () => {
    switch (state) {
      case "connecting":
        return { text: "CONNECTING", dot: "bg-amber-400 animate-pulse" };
      case "listening":
        return { text: "LISTENING", dot: "bg-emerald-400 animate-pulse" };
      case "speaking":
        return { text: "SPEAKING", dot: "bg-blue-500 animate-ping" };
      case "muted":
        return { text: "MUTED", dot: "bg-amber-400" };
      case "error":
        return { text: "UNAVAILABLE", dot: "bg-rose-500" };
      default:
        return { text: "READY TO CONNECT", dot: "bg-zinc-400" };
    }
  };

  const badge = getStateBadge();

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="relative rounded-3xl p-6 sm:p-8 bg-[#FAF8F2] dark:bg-[#11141E] border border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] shadow-xl space-y-6 text-left transition-colors">
        {/* Console Header Bar */}
        <div className="flex items-center justify-between border-b border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] pb-4">
          <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-[rgba(36,33,26,0.04)] dark:bg-white/[0.04] border border-[rgba(36,33,26,0.06)] dark:border-white/[0.06]">
            <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
            <span className="font-mono text-xs font-semibold tracking-wider text-zinc-700 dark:text-zinc-300 uppercase">
              {badge.text}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>VoiceOps Telephony Engine</span>
          </div>
        </div>

        {/* Dynamic Voice Visualizer Canvas */}
        <div className="relative h-28 w-full rounded-2xl bg-zinc-950 border border-black/10 dark:border-white/[0.08] flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            width={640}
            height={112}
            className="w-full h-full object-cover"
          />

          {!isActive && state !== "connecting" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-sans text-xs text-zinc-300 bg-zinc-900/90 px-3.5 py-1.5 rounded-full border border-white/10 shadow-sm">
                Press &apos;Start Conversation&apos; to speak live
              </span>
            </div>
          )}
        </div>

        {/* Real Conversational Transcript Feed */}
        <div className="min-h-[88px] space-y-2.5 p-4 rounded-2xl bg-[#F2EDE3] dark:bg-black/40 border border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] text-xs font-sans text-zinc-800 dark:text-zinc-300">
          {transcripts.length === 0 ? (
            <div className="text-center py-3 text-zinc-500 font-normal">
              {isActive
                ? "Speak naturally: Ask about appointments, service pricing, or qualification..."
                : "Live conversational transcript streams here when active"}
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
                  {t.role === "user" ? "YOU" : "VOICEOPS"}
                </span>
                <p className="font-sans text-zinc-900 dark:text-zinc-100 leading-relaxed font-normal">
                  {t.text}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Controls Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-zinc-500 font-sans">
            Requires standard browser microphone permission
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!isActive ? (
              <button
                onClick={handleStartCall}
                disabled={state === "connecting"}
                className="w-full sm:w-auto min-h-[46px] px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-[13px] font-semibold tracking-tight transition-all shadow-md active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {state === "connecting" ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <PhoneCall className="w-4 h-4" />
                    <span>Start Conversation</span>
                  </>
                )}
              </button>
            ) : (
              <>
                <button
                  onClick={handleToggleMute}
                  className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 touch-manipulation ${
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
                  className="min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-1.5 touch-manipulation shadow-sm"
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

export const VoiceOpsVoiceDemo = LunoVoiceDemo;
