"use client";

import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Shield, Zap, Clock } from "lucide-react";
import { Lunor3DMark } from "./ui/lunor-3d-mark";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  onTalkToLuno?: () => void;
}

export const Hero = memo(function Hero({
  eyebrow = "VOICE AUTOMATION FOR BUSINESS",
  subheadline = "Lunor builds AI voice systems that handle repetitive business conversations — from enquiries and bookings to lead qualification, support, follow-ups and more.",
  onTalkToLuno,
}: HeroProps) {
  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleTalkToLunor = useCallback(() => {
    if (onTalkToLuno) {
      onTalkToLuno();
    } else {
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [onTalkToLuno]);

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Asymmetrical Editorial Typography & Manifesto */}
          <div className="lg:col-span-8 space-y-7 text-left">
            {/* 1. Subtle Architectural Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider text-zinc-900 dark:text-zinc-200 bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>{eyebrow}</span>
            </motion.div>

            {/* 2. Bold Editorial Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-[-0.035em] text-zinc-950 dark:text-white leading-[1.08]"
            >
              AUTOMATE THE{" "}
              <span className="text-blue-600 dark:text-blue-400">FIRST LAYER</span>
              <br />
              OF EVERY CALL.
            </motion.h1>

            {/* 3. Restrained Human Statement */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl font-normal"
            >
              {subheadline}
            </motion.p>

            {/* 4. Tactile Solid CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <button
                onClick={scrollToContact}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold btn-solid-primary shadow-lg"
              >
                <span>BUILD MY VOICE AGENT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleTalkToLunor}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold btn-outline-secondary"
              >
                <PhoneCall className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>TALK TO LUNOR</span>
              </button>
            </motion.div>

            {/* 5. Production Reliability Telemetry Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="pt-4 flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono text-zinc-500 dark:text-zinc-400 border-t border-black/[0.05] dark:border-white/[0.06]"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Sub-400ms Turn Cadence</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>SIP Warm Transfers</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                <span>100% Inbound Capture</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Physical Lunor 3D Acoustic Signal Core & Console Plate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm rounded-3xl p-8 structured-card text-center space-y-6">
              <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.06] pb-3 text-[11px] font-mono text-zinc-500">
                <span>ACOUSTIC CORE</span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  ONLINE
                </span>
              </div>

              {/* 3D Physical Chamber Asset */}
              <div
                onClick={handleTalkToLunor}
                className="py-4 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                title="Click to launch live voice session"
              >
                <Lunor3DMark size={140} />
              </div>

              <div className="space-y-1 text-left">
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white font-mono">
                  Autonomous Telephony Layer
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Real-time speech synthesis, dynamic interruption handling, and continuous data sync.
                </p>
              </div>

              <button
                onClick={handleTalkToLunor}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-semibold btn-outline-secondary"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>EXPERIENCE LIVE DEMO ↓</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
