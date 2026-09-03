"use client";

import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  onTalkToLuno?: () => void;
  onTalkToVoiceOps?: () => void;
}

export const Hero = memo(function Hero({
  eyebrow = "Voice Automation for Business",
  subheadline = "VoiceOps builds AI voice systems that handle repetitive business conversations — from enquiries and bookings to lead qualification, support, follow-ups and more.",
  onTalkToLuno,
  onTalkToVoiceOps,
}: HeroProps) {
  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleTalkToVoiceOps = useCallback(() => {
    const trigger = onTalkToVoiceOps || onTalkToLuno;
    if (trigger) {
      trigger();
    } else {
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [onTalkToLuno, onTalkToVoiceOps]);

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden chapter-midnight min-h-[92vh] flex flex-col justify-between">
      {/* 1. Atmospheric Midnight Sapphire Lighting Fields */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[480px] ambient-glow-midnight pointer-events-none -z-10 blur-3xl opacity-75" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] ambient-glow-sapphire pointer-events-none -z-10 blur-3xl opacity-60" />

      {/* Subtle Hairline Geometry Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full">
        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          {/* Left / Primary Typography Block */}
          <div className="lg:col-span-8 space-y-6 text-left">
            {/* Editorial Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 text-zinc-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="type-editorial-eyebrow text-zinc-400">
                {eyebrow}
              </span>
            </motion.div>

            {/* Large Serif Headline with Intentional Line Breaks */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="type-serif-display text-white max-w-2xl text-left font-normal"
            >
              Automate the first layer
              <br />
              <span className="italic font-light text-zinc-400">
                of every business call.
              </span>
            </motion.h1>

            {/* Concise Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="type-sans-body-lg text-zinc-400 max-w-xl leading-relaxed"
            >
              {subheadline}
            </motion.p>

            {/* Compact Refined CTAs with Tactile Motion */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={scrollToContact}
                className="btn-compact-primary hover:bg-zinc-200 text-zinc-950 font-medium hover:-translate-y-0.5 active:translate-y-0.5 transition-transform"
              >
                <span>Build My Voice Agent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleTalkToVoiceOps}
                className="btn-compact-secondary text-zinc-300 border-white/20 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0.5 transition-transform"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                <span>Talk to VoiceOps</span>
              </button>
            </motion.div>
          </div>

          {/* Right / Minimal Atmospheric Cadence Spec */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end space-y-4 text-left lg:text-right"
          >
            <div className="space-y-1 font-mono text-xs text-zinc-500">
              <div className="flex items-center lg:justify-end gap-2 text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-white font-medium">Turn Cadence: &lt;400ms</span>
              </div>
              <p>Autonomous Telephony Integration</p>
              <p>Direct SIP Trunk & Carrier Forwarding</p>
            </div>

            {/* Acoustic Signal Motif */}
            <div className="flex items-center gap-1.5 h-6">
              {[12, 22, 10, 26, 18, 14, 24, 10].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}px` }}
                  className="w-0.5 bg-blue-500/70 rounded-full animate-soundwave"
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* 2. Art-Directed Visual Scene Featuring the Signature VOICEOPS SIGNAL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-20 relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.09] bg-[#0b0e1a]/95 shadow-2xl"
        >
          {/* Subtle Specular Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-white/[0.02] pointer-events-none" />

          {/* Physical Acoustic Environment */}
          <div className="relative p-8 sm:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Studio Scene Left: The Physical Setting */}
            <div className="md:col-span-7 space-y-4">
              <span className="font-mono text-[11px] text-blue-400 tracking-wider uppercase block">
                FIRST LAYER CALL TELEPHONY
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                Where high-intent callers meet instant conversational resolution.
              </h3>
              <p className="type-sans-body text-zinc-400 max-w-lg leading-relaxed text-sm">
                VoiceOps answers the moment inbound lines ring — understanding caller intent, resolving operational inquiries, and coordinating calendar appointments with natural human cadence.
              </p>
            </div>

            {/* Visual Studio Scene Right: Live VOICEOPS SIGNAL Flow */}
            <div className="md:col-span-5 flex flex-col justify-center space-y-4 bg-black/40 rounded-2xl p-6 border border-white/[0.06] backdrop-blur-md">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  VOICEOPS SIGNAL ACTIVE
                </span>
                <span className="text-zinc-500">Live Carrier Link</span>
              </div>

              {/* Flowing SVG VoiceOps Signal Ribbon */}
              <div className="h-16 flex items-center justify-center relative overflow-hidden bg-white/[0.02] rounded-xl border border-white/[0.04] px-4">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 320 60"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0 30 Q 40 10, 80 30 T 160 30 T 240 30 T 320 30"
                    stroke="rgba(59, 130, 246, 0.4)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M 0 30 Q 40 48, 80 30 T 160 30 T 240 30 T 320 30"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  >
                    <animate
                      attributeName="d"
                      dur="6s"
                      repeatCount="indefinite"
                      values="
                        M 0 30 Q 40 48, 80 30 T 160 30 T 240 30 T 320 30;
                        M 0 30 Q 40 12, 80 30 T 160 30 T 240 30 T 320 30;
                        M 0 30 Q 40 48, 80 30 T 160 30 T 240 30 T 320 30
                      "
                    />
                  </path>
                  <path
                    d="M 0 30 Q 40 20, 80 30 T 160 30 T 240 30 T 320 30"
                    stroke="rgba(96, 165, 250, 0.5)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 font-sans">
                <span>Inbound Audio Stream</span>
                <span className="text-emerald-400 font-mono">✓ Instant Resolution</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
