"use client";

import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { Lunor3DMark } from "./ui/lunor-3d-mark";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  onTalkToLuno?: () => void;
}

export const Hero = memo(function Hero({
  eyebrow = "Voice automation for business",
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
    <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Monumental Editorial Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* 1. Architectural Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full type-eyebrow text-zinc-700 dark:text-zinc-300 bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.07]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>{eyebrow}</span>
            </motion.div>

            {/* 2. Sentence-Case Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.04 }}
              className="type-display text-zinc-950 dark:text-white max-w-2xl text-left"
            >
              Automate the first layer
              <br />
              of every call.
            </motion.h1>

            {/* 3. Restrained Product Thesis */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="type-body-lg text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed"
            >
              {subheadline}
            </motion.p>

            {/* 4. Tactile CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <button
                onClick={scrollToContact}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl type-btn btn-solid-primary shadow-sm"
              >
                <span>Build My Voice Agent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleTalkToLunor}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl type-btn btn-outline-secondary"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Talk to Lunor</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Interactive Acoustic Signal Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-xs rounded-2xl p-5 structured-card text-center space-y-4 shadow-sm">
              {/* Status Bar */}
              <div className="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.05] pb-2.5 text-xs">
                <span className="type-eyebrow text-zinc-400">Voice Signal</span>
                <span className="flex items-center gap-1.5 type-eyebrow text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>

              {/* 3D Physical Signal Core */}
              <div
                onClick={handleTalkToLunor}
                className="py-4 flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105"
                title="Click to try live voice demo"
              >
                <Lunor3DMark size={110} />
              </div>

              <button
                onClick={handleTalkToLunor}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold btn-outline-secondary"
              >
                <PhoneCall className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span>Try Live Voice Demo</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
