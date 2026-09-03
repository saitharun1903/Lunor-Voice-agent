"use client";

import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Check, Calendar, MessageSquare, Sparkles } from "lucide-react";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  onTalkToLuno?: () => void;
  onTalkToVoiceOps?: () => void;
}

export const Hero = memo(function Hero({
  eyebrow = "Voice Automation for Business",
  subheadline = "VoiceOps builds custom AI voice systems that handle repetitive conversations — answering customer enquiries, qualifying leads, and booking appointments directly into your calendar with zero hold times.",
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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Display */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* 1. Context Label */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-400 bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>{eyebrow}</span>
            </motion.div>

            {/* 2. Editorial Product Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="type-display text-zinc-950 dark:text-white max-w-2xl text-left"
            >
              Automate the first layer
              <br />
              <span className="text-zinc-500 dark:text-zinc-400">
                of every business call.
              </span>
            </motion.h1>

            {/* 3. Product Thesis */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="type-body-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed"
            >
              {subheadline}
            </motion.p>

            {/* 4. Tactile CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <button
                onClick={scrollToContact}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl type-btn btn-solid-primary shadow-sm"
              >
                <span>Build My Voice Agent</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleTalkToVoiceOps}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl type-btn btn-outline-secondary"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Talk to VoiceOps Live ↓</span>
              </button>
            </motion.div>

            {/* 5. Authentic Trust Pillars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400"
            >
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Natural Conversational Cadence</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Calendar & CRM Integration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Instant Warm Team Transfer</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: First-Layer Conversational Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md rounded-2xl p-6 structured-card space-y-4 shadow-md border border-black/[0.08] dark:border-white/[0.09]">
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="type-eyebrow text-zinc-800 dark:text-zinc-200 font-bold">
                    How VoiceOps Operates
                  </span>
                </div>
                <span className="type-label-tech text-zinc-400">
                  Sub-400ms Turn Cadence
                </span>
              </div>

              {/* 3-Step First-Layer Story */}
              <div className="space-y-3">
                {/* 1. Inbound Caller */}
                <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.05] space-y-1">
                  <span className="type-eyebrow text-zinc-400 block text-[10px]">
                    01. Caller Asks
                  </span>
                  <p className="type-body-sm text-zinc-900 dark:text-zinc-100 font-normal leading-snug">
                    “Hi, I&apos;d like to check availability for a 3-bedroom showing tomorrow afternoon.”
                  </p>
                </div>

                {/* 2. VoiceOps Voice System */}
                <div className="p-3.5 rounded-xl bg-blue-600/[0.03] dark:bg-blue-600/[0.06] border border-blue-600/20 space-y-1">
                  <span className="type-eyebrow text-blue-600 dark:text-blue-400 block text-[10px]">
                    02. VoiceOps Understands & Responds
                  </span>
                  <p className="type-body-sm text-zinc-950 dark:text-white font-medium leading-snug">
                    “Tomorrow at 3:00 PM is open. I&apos;ve reserved that slot for you and sent an SMS confirmation.”
                  </p>
                </div>

                {/* 3. Real Business Action */}
                <div className="p-3.5 rounded-xl bg-emerald-500/[0.05] dark:bg-emerald-500/[0.08] border border-emerald-500/20 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="type-eyebrow text-emerald-600 dark:text-emerald-400 block text-[10px]">
                      03. Operational Action
                    </span>
                    <p className="type-body-sm text-zinc-900 dark:text-zinc-100 font-semibold">
                      Calendar Locked · CRM Synced
                    </p>
                  </div>
                  <span className="type-label-tech text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    ✓ 100% Resolved
                  </span>
                </div>
              </div>

              {/* Call to Action Bar */}
              <div className="pt-2">
                <button
                  onClick={handleTalkToVoiceOps}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold btn-solid-primary shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                  <span>Try Live Voice Demo Below ↓</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
