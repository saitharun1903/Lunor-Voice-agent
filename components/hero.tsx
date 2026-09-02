"use client";

import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, ShieldCheck, Zap, Radio } from "lucide-react";
import { Lunor3DMark } from "./ui/lunor-3d-mark";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  onTalkToLuno?: () => void;
}

export const Hero = memo(function Hero({
  eyebrow = "Telephony Voice Intelligence",
  subheadline = "Lunor builds deterministic AI voice systems that automate the first layer of business calls — from customer enquiries and calendar bookings to lead qualification and CRM sync with sub-400ms latency.",
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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-ambient-radial">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Monumental Editorial Display */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* 1. Precision Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08]"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="tracking-wide uppercase text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                {eyebrow}
              </span>
            </motion.div>

            {/* 2. Editorial Product Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="type-display text-zinc-950 dark:text-white max-w-2xl text-left"
            >
              Automate the first layer
              <br />
              <span className="text-zinc-400 dark:text-zinc-500">
                of every business call.
              </span>
            </motion.h1>

            {/* 3. Product Thesis */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="type-body-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed"
            >
              {subheadline}
            </motion.p>

            {/* 4. Tactile CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <button
                onClick={scrollToContact}
                className="flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl type-btn btn-solid-primary shadow-md"
              >
                <span>Build My Voice Agent</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleTalkToLunor}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl type-btn btn-outline-secondary"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Talk to Lunor Live</span>
              </button>
            </motion.div>

            {/* 5. Telephony Telemetry Trust Chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400"
            >
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Sub-400ms Realtime Audio</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Zero Hallucination Workflows</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-indigo-500" />
                <span>Direct SIP & PSTN Forwarding</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Physical Acoustic Console Anchor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm rounded-3xl p-6 sm:p-7 structured-card text-center space-y-6 shadow-xl">
              {/* Telephony Header */}
              <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.07] pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    Acoustic Core
                  </span>
                </div>
                <span className="type-label-tech text-zinc-400">
                  48kHz HD Audio
                </span>
              </div>

              {/* 3D Physical Signal Centerpiece */}
              <div
                onClick={handleTalkToLunor}
                className="py-4 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105"
                title="Click to launch live voice demo"
              >
                <Lunor3DMark size={125} />
              </div>

              {/* Interactive Signal Trigger */}
              <div className="space-y-2">
                <button
                  onClick={handleTalkToLunor}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold btn-solid-primary shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                  <span>Experience Live Voice Session ↓</span>
                </button>

                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Direct browser microphone WebRTC stream
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
