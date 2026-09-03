"use client";

import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Volume2 } from "lucide-react";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  onTalkToLuno?: () => void;
  onTalkToVoiceOps?: () => void;
}

export const Hero = memo(function Hero({
  eyebrow = "Voice Automation for Business",
  subheadline = "VoiceOps builds custom AI voice systems that handle repetitive conversations — from customer enquiries and bookings to lead qualification, support, and warm staff handoffs.",
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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden chapter-midnight min-h-[92vh] flex flex-col justify-between">
      {/* 1. Cinematic Atmospheric Lighting Fields */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] ambient-glow-midnight pointer-events-none -z-10 blur-3xl opacity-80" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] ambient-glow-sapphire pointer-events-none -z-10 blur-3xl opacity-60" />

      {/* Subtle Hairline Geometry */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full">
        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          {/* Left / Primary Typography Block */}
          <div className="lg:col-span-8 space-y-6 text-left">
            {/* Editorial Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 text-zinc-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="type-editorial-eyebrow text-zinc-400">
                {eyebrow}
              </span>
            </motion.div>

            {/* Large Serif Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="type-serif-display text-white max-w-2xl text-left font-normal"
            >
              Automate the first layer
              <br />
              <span className="italic font-light text-zinc-400">
                of every business call.
              </span>
            </motion.h1>

            {/* Short Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="type-sans-body-lg text-zinc-400 max-w-xl leading-relaxed"
            >
              {subheadline}
            </motion.p>

            {/* Compact Refined CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={scrollToContact}
                className="btn-compact-primary hover:bg-zinc-200 text-zinc-950 font-medium"
              >
                <span>Build My Voice Agent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleTalkToVoiceOps}
                className="btn-compact-secondary text-zinc-300 border-white/20 hover:border-white/40"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                <span>Talk to VoiceOps</span>
              </button>
            </motion.div>
          </div>

          {/* Right / Minimal Atmospheric Telemetry Spec */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
            <div className="flex items-center gap-1 h-6">
              <span className="w-0.5 h-3 bg-blue-500/60 rounded-full animate-soundwave" />
              <span className="w-0.5 h-5 bg-blue-400 rounded-full animate-soundwave [animation-delay:0.15s]" />
              <span className="w-0.5 h-2 bg-blue-500/40 rounded-full animate-soundwave [animation-delay:0.3s]" />
              <span className="w-0.5 h-6 bg-blue-400 rounded-full animate-soundwave [animation-delay:0.45s]" />
              <span className="w-0.5 h-4 bg-blue-500/80 rounded-full animate-soundwave [animation-delay:0.6s]" />
              <span className="w-0.5 h-2 bg-blue-500/50 rounded-full animate-soundwave [animation-delay:0.75s]" />
            </div>
          </motion.div>
        </div>

        {/* Art-Directed Architectural Visual Scene (Physical Environment with Voice Signal) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-20 relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.1] bg-[#0c101c]/90 shadow-2xl"
        >
          {/* Subtle Ambient Specular Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-white/[0.03] pointer-events-none" />

          {/* Realistic Physical Environment Layout */}
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
                VoiceOps handles inbound volume the moment phones ring — verifying caller intent, answering operational questions, and locking calendar availability with human poise.
              </p>
            </div>

            {/* Visual Studio Scene Right: Live Signal Rhythm */}
            <div className="md:col-span-5 flex flex-col justify-center space-y-4 bg-black/40 rounded-2xl p-6 border border-white/[0.06] backdrop-blur-md">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  VOICE LAYER ACTIVE
                </span>
                <span>00:18</span>
              </div>

              {/* Soundwave Spectral Visualization */}
              <div className="h-14 flex items-center justify-center gap-1.5 px-4 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                {[20, 45, 15, 60, 30, 75, 40, 90, 55, 30, 65, 25, 50, 20, 40, 15].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full transition-all duration-300"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 font-sans">
                <span>Inbound Caller Audio</span>
                <span className="text-emerald-400 font-mono">✓ Sub-second Cadence</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
