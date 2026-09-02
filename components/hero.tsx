"use client";

import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, CheckCircle2 } from "lucide-react";
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
    <section className="relative pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Sentence-Case Typography & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* 1. Subtle Architectural Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full type-eyebrow text-zinc-800 dark:text-zinc-200 bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.07]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>{eyebrow}</span>
            </motion.div>

            {/* 2. Sentence-Case Editorial Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="type-display text-zinc-950 dark:text-white max-w-2xl text-left"
            >
              Automate the first layer
              <br />
              behind every call.
            </motion.h1>

            {/* 3. Restrained Human Statement */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="type-body-lg text-zinc-600 dark:text-zinc-400 max-w-xl"
            >
              {subheadline}
            </motion.p>

            {/* 4. Clear CTA Hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <button
                onClick={scrollToContact}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full type-btn btn-solid-primary shadow-md"
              >
                <span>Build My Voice Agent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleTalkToLunor}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full type-btn btn-outline-secondary"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Talk to Lunor</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Quiet Product Visual (Signal & Workflow) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm rounded-3xl p-6 sm:p-7 structured-card space-y-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.06] pb-3 text-xs text-zinc-500">
                <span className="type-eyebrow text-zinc-700 dark:text-zinc-300">VOICE SYSTEM FLOW</span>
                <span className="flex items-center gap-1.5 type-eyebrow text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  STANDBY
                </span>
              </div>

              {/* 3D Physical Signal Centerpiece */}
              <div
                onClick={handleTalkToLunor}
                className="py-2 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                title="Click to experience live voice demo"
              >
                <Lunor3DMark size={120} />
              </div>

              {/* Product State Flow */}
              <div className="space-y-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-medium">01. Call received</span>
                  <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Immediate Answer</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-medium">02. Understanding intent</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">Natural Dialogue</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-medium">03. Taking action</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Booking & CRM Sync</span>
                  </span>
                </div>
              </div>

              <button
                onClick={handleTalkToLunor}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl type-btn btn-outline-secondary"
              >
                <PhoneCall className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span>Try Live Voice Demo ↓</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
