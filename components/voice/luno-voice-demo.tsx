"use client";

import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  PhoneCall,
  PhoneOff,
  Sparkles,
  Volume2,
  AlertCircle,
  RefreshCw,
  Shield,
  Activity,
  Radio,
  Layers,
  Cpu,
} from "lucide-react";
import { getVoiceAgentService, LunoVoiceState } from "@/lib/voice-service";

interface LunoVoiceDemoProps {
  className?: string;
}

export const LunoVoiceDemo = memo(function LunoVoiceDemo({ className = "" }: LunoVoiceDemoProps) {
  const [state, setState] = useState<LunoVoiceState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [latestTranscript, setLatestTranscript] = useState<{ role: string; text: string } | null>(
    null
  );

  const serviceRef = useRef(getVoiceAgentService());

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
          setLatestTranscript({ role: t.role, text: t.text });
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

  const handleStartCall = useCallback(async () => {
    setLatestTranscript(null);
    await serviceRef.current.start();
  }, []);

  const handleStopCall = useCallback(() => {
    serviceRef.current.stop();
  }, []);

  const handleToggleMute = useCallback(() => {
    serviceRef.current.toggleMute();
    setIsMuted(serviceRef.current.getIsMuted());
  }, []);

  const getStateDetails = () => {
    switch (state) {
      case "connecting":
        return {
          label: "Connecting...",
          sub: "Establishing secure low-latency voice pipeline",
          color: "text-amber-500",
          statusTag: "INITIALIZING",
        };
      case "listening":
        return {
          label: "Listening...",
          sub: "Speak naturally into your microphone",
          color: "text-emerald-500",
          statusTag: "LISTENING",
        };
      case "speaking":
        return {
          label: "Luno is speaking",
          sub: "Streaming real-time neural audio response",
          color: "text-blue-500",
          statusTag: "TRANSMITTING",
        };
      case "muted":
        return {
          label: "Microphone muted",
          sub: "Click unmute to resume speaking",
          color: "text-amber-500",
          statusTag: "MUTED",
        };
      case "ending":
        return {
          label: "Ending conversation...",
          sub: "Releasing audio streams",
          color: "text-zinc-400",
          statusTag: "CLOSING",
        };
      case "ended":
        return {
          label: "Conversation ended",
          sub: "Thank you for exploring Luno voice capabilities",
          color: "text-zinc-500",
          statusTag: "DISCONNECTED",
        };
      case "error":
        return {
          label: "Something went wrong",
          sub: errorMessage || "Please try again or contact Luno directly.",
          color: "text-rose-500",
          statusTag: "ERROR",
        };
      default:
        return {
          label: "Live Voice Engine Ready",
          sub: "Click 'Start Conversation' to talk with Luno's real AI voice agent live.",
          color: "text-zinc-600 dark:text-zinc-400",
          statusTag: "STANDBY",
        };
    }
  };

  const stateDetails = getStateDetails();
  const isActive = state === "listening" || state === "speaking" || state === "muted";

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Dynamic Ambient Background Glow */}
      <div
        className={`absolute -inset-6 rounded-3xl transition-all duration-700 blur-3xl pointer-events-none ${
          state === "speaking"
            ? "bg-blue-500/25 opacity-100 scale-105"
            : state === "listening"
            ? "bg-emerald-500/20 opacity-90 scale-105"
            : state === "connecting"
            ? "bg-amber-500/20 opacity-80"
            : "bg-blue-500/10 opacity-50 dark:opacity-30"
        }`}
      />

      {/* Hardware-Inspired Tactile Voice Terminal */}
      <div className="relative rounded-3xl p-7 sm:p-10 backdrop-blur-xl bg-white/95 dark:bg-zinc-900/80 border border-black/[0.08] dark:border-white/[0.12] shadow-2xl transition-all duration-300">
        {/* Top Specular Line */}
        <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

        {/* Console Telemetry Header Bar */}
        <div className="flex items-center justify-between pb-5 mb-5 border-b border-black/[0.05] dark:border-white/[0.06] text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isActive
                  ? "bg-emerald-500 animate-pulse"
                  : state === "connecting"
                  ? "bg-amber-500 animate-spin"
                  : state === "error"
                  ? "bg-rose-500"
                  : "bg-zinc-400"
              }`}
            />
            <span className="font-bold text-zinc-900 dark:text-white">
              {isActive ? "LIVE ● CONNECTED" : "ENGINE ● " + stateDetails.statusTag}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-zinc-500">
            <span>INTENT: Inbound Enquiry</span>
            <span>CADENCE: Sub-400ms</span>
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          {/* Central Interactive Voice Orb */}
          <div className="relative my-3 flex items-center justify-center">
            {/* Audio Wave Ripples */}
            <AnimatePresence>
              {isActive && (
                <>
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0.7 }}
                    animate={{ scale: 1.45, opacity: 0 }}
                    exit={{ scale: 1, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2.0, ease: "easeOut" }}
                    className={`absolute w-36 h-36 rounded-full border pointer-events-none ${
                      state === "speaking"
                        ? "border-blue-500/50"
                        : state === "listening"
                        ? "border-emerald-500/50"
                        : "border-zinc-400/20"
                    }`}
                  />
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0.5 }}
                    animate={{ scale: 1.25, opacity: 0 }}
                    exit={{ scale: 1, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.6, delay: 0.3, ease: "easeOut" }}
                    className={`absolute w-36 h-36 rounded-full border pointer-events-none ${
                      state === "speaking"
                        ? "border-indigo-500/40"
                        : state === "listening"
                        ? "border-teal-500/40"
                        : "border-zinc-400/10"
                    }`}
                  />
                </>
              )}
            </AnimatePresence>

            {/* Core Action Button / Orb */}
            <div
              className={`relative z-10 flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full transition-all duration-500 shadow-2xl ${
                state === "speaking"
                  ? "bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white shadow-blue-500/40 scale-105"
                  : state === "listening"
                  ? "bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 text-white shadow-emerald-500/40 scale-105"
                  : state === "connecting"
                  ? "bg-gradient-to-tr from-amber-500 to-orange-500 text-white animate-pulse"
                  : state === "muted"
                  ? "bg-gradient-to-tr from-zinc-700 to-zinc-600 text-white"
                  : state === "error"
                  ? "bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-rose-500/30"
                  : "bg-gradient-to-tr from-zinc-950 to-zinc-800 dark:from-zinc-100 dark:to-zinc-300 text-white dark:text-zinc-900 shadow-xl shadow-black/10"
              }`}
            >
              {state === "speaking" ? (
                <Volume2 className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse" />
              ) : state === "listening" ? (
                <Mic className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse" />
              ) : state === "muted" ? (
                <MicOff className="w-10 h-10 sm:w-12 sm:h-12" />
              ) : state === "connecting" ? (
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 animate-spin" />
              ) : state === "error" ? (
                <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12" />
              ) : (
                <PhoneCall className="w-10 h-10 sm:w-12 sm:h-12" />
              )}
            </div>
          </div>

          {/* Real-Time Live Waveform Display When Active */}
          {isActive && (
            <div className="flex items-center gap-1 h-6 my-2">
              {[20, 45, 80, 100, 60, 90, 40, 75, 95, 50, 85, 30].map((h, i) => (
                <motion.span
                  key={i}
                  style={{ transformOrigin: "bottom" }}
                  animate={{
                    scaleY: [`${h * 0.2}%`, `${h}%`, `${h * 0.3}%`],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8 + (i % 3) * 0.2,
                    ease: "easeInOut",
                    repeatType: "mirror",
                    delay: i * 0.05,
                  }}
                  className={`w-1 rounded-full ${
                    state === "speaking"
                      ? "bg-blue-500"
                      : state === "listening"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Subtitle / Live Transcript Bubble */}
          <div className="mt-3 mb-2 min-h-[48px] px-4 py-2 flex items-center justify-center">
            {latestTranscript ? (
              <motion.div
                key={latestTranscript.text}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md px-5 py-2.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.08] text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 shadow-sm"
              >
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {latestTranscript.role === "agent" ? "Luno: " : "You: "}
                </span>
                <span>“{latestTranscript.text}”</span>
              </motion.div>
            ) : (
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
                {stateDetails.sub}
              </p>
            )}
          </div>

          {/* Controls Deck */}
          <div className="mt-6 w-full flex flex-col items-center gap-3">
            {state === "idle" || state === "ended" ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartCall}
                className="w-full sm:w-auto px-10 py-4 rounded-full text-sm font-semibold glass-button-primary flex items-center justify-center gap-2.5 shadow-xl"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Start Conversation</span>
              </motion.button>
            ) : state === "error" ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartCall}
                className="px-7 py-3 rounded-full text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2 shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </motion.button>
            ) : state === "connecting" ? (
              <div className="flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-semibold bg-black/[0.04] dark:bg-white/[0.08] text-zinc-700 dark:text-zinc-300">
                <div className="w-4 h-4 border-2 border-zinc-400 border-t-blue-600 rounded-full animate-spin" />
                <span>Connecting to Luno Voice...</span>
              </div>
            ) : (
              /* Active Controls: Mute & End */
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleToggleMute}
                  aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold transition-all ${
                    isMuted
                      ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md"
                      : "bg-black/[0.05] dark:bg-white/[0.1] text-zinc-800 dark:text-zinc-200 hover:bg-black/[0.08] border border-black/[0.08] dark:border-white/[0.12]"
                  }`}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isMuted ? "Unmute" : "Mute"}</span>
                </button>

                <button
                  onClick={handleStopCall}
                  aria-label="End voice conversation"
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Conversation</span>
                </button>
              </div>
            )}
          </div>

          {/* Privacy Note */}
          <p className="mt-6 text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
            <Shield className="w-3 h-3 text-emerald-500" />
            <span>Microphone access requested only when call begins. Zero audio storage.</span>
          </p>
        </div>
      </div>
    </div>
  );
});
