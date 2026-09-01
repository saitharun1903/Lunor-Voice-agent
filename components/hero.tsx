"use client";

import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
  Shield,
  Clock,
  Zap,
  Volume2,
  Mic,
} from "lucide-react";
import { Lunor3DMark } from "./ui/lunor-3d-mark";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  onTalkToLuno?: () => void;
}

export const Hero = memo(function Hero({
  eyebrow = "VOICE AUTOMATION FOR BUSINESS",
  headline = "AUTOMATE THE FIRST LAYER OF EVERY CALL.",
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
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* 1. Subtle Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider text-zinc-900 dark:text-zinc-100 bg-white/90 dark:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.12] shadow-sm mb-6 uppercase font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>{eyebrow}</span>
          </motion.div>

          {/* 2. Dominant Display Typography with Signature LUNOR 3D Brand Mark */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.12] mb-6 text-balance select-none"
          >
            AUTOMATE THE{" "}
            {/* Signature LUNOR 3D Brand Mark */}
            <motion.span
              onClick={handleTalkToLunor}
              title="Click to talk with Lunor"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center align-middle mx-2 sm:mx-3 my-1 relative cursor-pointer"
            >
              <Lunor3DMark size={72} />
            </motion.span>
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              FIRST LAYER
            </span>{" "}
            OF EVERY CALL.
          </motion.h1>

          {/* 3. Restrained Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal mb-10 max-w-2xl text-balance"
          >
            {subheadline}
          </motion.p>

          {/* 4. High-Converting Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
          >
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold glass-button-primary shadow-xl"
            >
              <span>BUILD MY VOICE AGENT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleTalkToLunor}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold glass-button-secondary"
            >
              <PhoneCall className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>TALK TO LUNOR</span>
            </button>
          </motion.div>

          {/* 5. Production Reliability Telemetry Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs font-semibold text-zinc-600 dark:text-zinc-400"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Sub-400ms Voice Cadence</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Warm Human Escalation</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>100% Inbound Call Capture</span>
            </div>
          </motion.div>
        </div>

        {/* 6. Modern Autonomous Telephony Deck Console */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-12 sm:mt-16 max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/90 dark:bg-zinc-900/80 border border-black/[0.08] dark:border-white/[0.12] shadow-xl overflow-hidden transform-gpu">
            {/* Top Specular Line Accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left: Indicator & Service Description */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
                  <Volume2 className="w-6 h-6 animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-zinc-950 dark:text-white">
                      Lunor Autonomous Telephony Layer
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Live Ready
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Handling inquiries, calendar reservations, qualification & smart transfers
                  </p>
                </div>
              </div>

              {/* Center: GPU-Composited Equalizer Waveform Frequency Bars */}
              <div className="flex items-center gap-1.5 h-8 px-4 py-2 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.04] dark:border-white/[0.08]">
                {[0.4, 0.75, 1.0, 0.6, 0.85, 0.45, 0.95, 0.7, 0.5, 0.8, 0.65, 0.9, 0.45, 0.75, 0.6].map((scale, i) => (
                  <motion.span
                    key={i}
                    style={{ transformOrigin: "bottom" }}
                    animate={{
                      scaleY: [scale * 0.3, scale, scale * 0.4],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.1 + (i % 4) * 0.25,
                      ease: "easeInOut",
                      repeatType: "mirror",
                      delay: i * 0.06,
                    }}
                    className="w-1 h-full rounded-full bg-gradient-to-t from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-cyan-300"
                  />
                ))}
              </div>

              {/* Right: Instant Trigger Button */}
              <button
                onClick={handleTalkToLunor}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold glass-button-primary shrink-0"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>TEST LIVE DEMO</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
