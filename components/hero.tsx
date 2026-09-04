"use client";

import React, { memo, useCallback, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Zap, Radio } from "lucide-react";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  onTalkToVoiceOps?: () => void;
  onTalkToLuno?: () => void;
}

export const Hero = memo(function Hero({
  eyebrow = "VOICE AUTOMATION FOR BUSINESS",
  headline = "Automate the first layer of every call.",
  subheadline = "VoiceOps builds AI voice systems that handle repetitive business conversations — from enquiries and bookings to lead qualification, support, and follow-ups.",
  onTalkToVoiceOps,
  onTalkToLuno,
}: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  const handleTalkToVoiceOps = useCallback(() => {
    const trigger = onTalkToVoiceOps || onTalkToLuno;
    if (trigger) {
      trigger();
    } else {
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [onTalkToLuno, onTalkToVoiceOps]);

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPointerOffset({ x: x * 16, y: y * 16 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPointerOffset({ x: 0, y: 0 });
  }, []);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-14 sm:pb-20 px-5 sm:px-8 overflow-hidden bg-[#FAF8F5] dark:bg-[#0D0F14] transition-colors duration-300"
    >
      {/* Background Soft Architectural Gradient Surface */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-[600px] sm:w-[900px] h-[450px] rounded-full bg-gradient-to-tr from-blue-500/[0.04] via-blue-600/[0.03] to-transparent dark:from-blue-500/[0.06] dark:via-indigo-500/[0.04] dark:to-transparent blur-3xl" />
      </div>

      {/* Main Content & Signal Grid */}
      <div className="relative max-w-5xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Controlled Editorial Typography & Value Proposition */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(36,33,26,0.04)] dark:bg-white/[0.06] border border-[rgba(36,33,26,0.08)] dark:border-white/[0.08]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="font-mono text-[11px] font-semibold tracking-wider text-zinc-700 dark:text-zinc-300 uppercase">
              {eyebrow}
            </span>
          </motion.div>

          {/* Controlled Headline (Max 3.25rem - Never 50% of screen) */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] font-bold leading-[1.12] text-zinc-950 dark:text-white tracking-tight"
          >
            {headline.toLowerCase().includes("of every call") ? (
              <>
                {headline.substring(0, headline.toLowerCase().indexOf("of every call")).trim()}
                <br />
                <span className="text-zinc-500 dark:text-zinc-400 font-normal">
                  {headline.substring(headline.toLowerCase().indexOf("of every call"))}
                </span>
              </>
            ) : (
              headline
            )}
          </motion.h1>

          {/* Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal max-w-xl"
          >
            {subheadline}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pt-2 flex flex-wrap items-center gap-3.5"
          >
            <button
              onClick={handleTalkToVoiceOps}
              className="inline-flex items-center gap-2 min-h-[46px] px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs sm:text-[13px] font-semibold tracking-tight shadow-md hover:shadow-lg transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>Talk to VoiceOps</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 min-h-[46px] px-5 py-2.5 rounded-xl bg-transparent text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white border border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30 font-sans text-xs sm:text-[13px] font-medium transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>Build My Voice Agent</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Organic VoiceOps Signal Instrument */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
          style={{
            transform: shouldReduceMotion
              ? undefined
              : `translate(${pointerOffset.x}px, ${pointerOffset.y}px)`,
            transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="w-full max-w-sm rounded-3xl p-6 sm:p-7 bg-[#FAF8F2] dark:bg-[#11141E] border border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] shadow-lg relative overflow-hidden space-y-5 text-left">
            {/* Header Telemetry */}
            <div className="flex items-center justify-between border-b border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] pb-3.5">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="font-mono text-xs font-semibold tracking-wider text-zinc-800 dark:text-zinc-200 uppercase">
                  FIRST-LAYER ENGINE
                </span>
              </div>
              <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Active · &lt;400ms
              </span>
            </div>

            {/* Acoustic Signal Waveform Canvas */}
            <div className="relative h-32 w-full rounded-2xl bg-zinc-950 border border-black/10 dark:border-white/[0.08] flex items-center justify-center overflow-hidden px-4">
              <svg
                viewBox="0 0 320 80"
                className="w-full h-full text-blue-500 overflow-visible"
                preserveAspectRatio="none"
              >
                {/* Secondary Harmonic Wave */}
                <motion.path
                  d="M0,40 Q40,15 80,40 T160,40 T240,40 T320,40"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.35)"
                  strokeWidth="1.5"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          d: [
                            "M0,40 Q40,15 80,40 T160,40 T240,40 T320,40",
                            "M0,40 Q40,65 80,40 T160,40 T240,40 T320,40",
                            "M0,40 Q40,15 80,40 T160,40 T240,40 T320,40",
                          ],
                        }
                  }
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                />

                {/* Primary Resonant Voice Spline */}
                <motion.path
                  d="M0,40 Q40,60 80,40 T160,40 T240,40 T320,40"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          d: [
                            "M0,40 Q40,60 80,40 T160,40 T240,40 T320,40",
                            "M0,40 Q40,20 80,40 T160,40 T240,40 T320,40",
                            "M0,40 Q40,60 80,40 T160,40 T240,40 T320,40",
                          ],
                        }
                  }
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                />

                {/* Traveling Signal Pulse Node */}
                <motion.circle
                  r="3.5"
                  fill="#60A5FA"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          cx: [20, 300, 20],
                          cy: [40, 40, 40],
                        }
                  }
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                />
              </svg>

              {/* Center Status Pill */}
              <div className="absolute bottom-2.5 right-3">
                <span className="font-mono text-[10px] text-zinc-400 bg-zinc-900/90 px-2 py-0.5 rounded border border-white/10">
                  Sub-second Cadence
                </span>
              </div>
            </div>

            {/* Three Pillar Verification Points */}
            <div className="space-y-2 pt-1 font-sans text-xs">
              <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <span className="text-zinc-500 dark:text-zinc-400">Response Speed</span>
                <span className="font-mono font-medium text-blue-600 dark:text-blue-400">Under 1 second</span>
              </div>
              <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <span className="text-zinc-500 dark:text-zinc-400">Action Execution</span>
                <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">Calendar + CRM</span>
              </div>
              <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <span className="text-zinc-500 dark:text-zinc-400">Staff Handoff</span>
                <span className="font-mono font-medium text-zinc-900 dark:text-zinc-200">Warm transfer</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Anchor Bar */}
      <div className="relative max-w-5xl mx-auto w-full pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08]">
        <div className="flex items-center gap-6 text-xs text-zinc-600 dark:text-zinc-400 font-sans">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Autonomous Telephony</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Zero Call Loss</span>
          </div>
        </div>

        <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
          voiceops.in · Production AI Voice Operations
        </p>
      </div>
    </section>
  );
});
