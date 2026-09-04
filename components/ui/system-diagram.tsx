"use client";

import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView, type Transition } from "framer-motion";

interface PipelineStage {
  num: string;
  label: string;
  headline: string;
  description: string;
  detail: string;
  telemetryPacket: string;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    num: "01",
    label: "CUSTOMER",
    headline: "Inbound Phone Call",
    description: "A customer calls your regular business phone number with an urgent booking, inquiry, or question.",
    detail: "Caller reaches your regular business line.",
    telemetryPacket: "SIP Protocol · Sub-second Inbound Ring",
  },
  {
    num: "02",
    label: "VOICEOPS",
    headline: "Instant Answer",
    description: "Answers in under a second with natural conversational cadence. Zero hold music, zero robotic menus.",
    detail: "VoiceOps answers naturally with sub-second cadence.",
    telemetryPacket: "Voice Engine · 380ms Synthetic Turn",
  },
  {
    num: "03",
    label: "UNDERSTAND",
    headline: "Context & Intent",
    description: "Listens to natural phrasing, clarifies specific preferences, and qualifies the caller's requirements.",
    detail: "Extracts intent, booking slots, and caller requirements.",
    telemetryPacket: "NER Pipeline · Entities & Slot Extracted",
  },
  {
    num: "04",
    label: "ACT",
    headline: "Real Execution",
    description: "Checks live calendars, reserves confirmed slots, queries product specs, or creates CRM records.",
    detail: "Executes real calendar bookings and database actions.",
    telemetryPacket: "API Mutation · Confirmed Calendar Lock",
  },
  {
    num: "05",
    label: "RESOLUTION",
    headline: "System Sync or Handoff",
    description: "Completed directly in software, or warm-transferred to your specialist with complete summary notes.",
    detail: "Syncs directly to CRM or warm-transfers with notes.",
    telemetryPacket: "Closed Loop · CRM Synchronized + Notes",
  },
];

export const SystemDiagram = memo(function SystemDiagram() {
  // CRITICAL: Exactly ONE active card at any time
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();

  // Handle manual selection (immediate state update, stops autoplay)
  const handleSelectStep = useCallback((index: number) => {
    setHasUserInteracted(true);
    setActiveStepIndex(index);
  }, []);

  // Keyboard navigation across tabs
  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (index + 1) % PIPELINE_STAGES.length;
      handleSelectStep(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (index - 1 + PIPELINE_STAGES.length) % PIPELINE_STAGES.length;
      handleSelectStep(prev);
    }
  }, [handleSelectStep]);

  // Autoplay progression when section enters viewport (stops at Step 05 or on user interaction)
  useEffect(() => {
    if (!isInView || hasUserInteracted || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev < PIPELINE_STAGES.length - 1) {
          return prev + 1;
        } else {
          // Pause at Step 05 Resolution
          clearInterval(interval);
          return prev;
        }
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [isInView, hasUserInteracted, shouldReduceMotion]);

  // Spring / ease transition curve: cubic-bezier(0.22, 1, 0.36, 1)
  const transitionConfig: Transition = shouldReduceMotion
    ? { duration: 0.01 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  // Desktop horizontal positions: column centers in a 5-column grid
  // Col 0: 10%, Col 1: 30%, Col 2: 50%, Col 3: 70%, Col 4: 90%
  const activePercent = 10 + activeStepIndex * 20;

  return (
    <section
      id="architecture"
      ref={containerRef}
      aria-label="VoiceOps Call Architecture Pipeline"
      className="py-24 sm:py-32 md:py-40 relative overflow-hidden bg-[#F5F1E8] dark:bg-[#07090e] border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] transition-colors"
      onMouseEnter={() => setHasUserInteracted(true)}
      onTouchStart={() => setHasUserInteracted(true)}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* =========================================================
            SECTION HEADER
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-12 sm:mb-16 text-left space-y-3"
        >
          <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
            THE SIGNATURE CONCEPT
          </p>

          <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal text-3xl sm:text-4xl md:text-5xl">
            Every business has a first layer.
          </h2>

          <p className="type-sans-body-lg text-[#58534C] dark:text-zinc-400 leading-relaxed font-normal text-sm sm:text-base">
            VoiceOps sits quietly in front of your phones, taking care of initial conversations before they interrupt your operational team.
          </p>
        </motion.div>

        {/* =========================================================
            DESKTOP & TABLET PIPELINE (lg & xl)
            Dedicated Connector Track ABOVE the Cards
            ========================================================= */}
        <div className="hidden lg:block relative mb-12">
          {/* Connector Rail Area */}
          <div className="relative h-10 mb-2 flex items-center">
            {/* 1. Base Neutral Rail: stretches from center of col 1 (10%) to center of col 5 (90%) */}
            <div
              className="absolute h-[2px] bg-[rgba(36,33,26,0.12)] dark:bg-white/[0.12] rounded-full"
              style={{ left: "10%", right: "10%" }}
            />

            {/* 2. Active Blue Signal Fill: expands from 10% to current active node center */}
            <motion.div
              className="absolute h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full"
              style={{ left: "10%" }}
              animate={{
                width: `${activeStepIndex * 20}%`,
              }}
              transition={transitionConfig}
            />

            {/* 3. Traveling Signal Node: soft luminous point sliding between steps */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600/20 dark:bg-blue-400/25 flex items-center justify-center pointer-events-none z-20"
              animate={{
                left: `${activePercent}%`,
              }}
              transition={transitionConfig}
            >
              <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shadow-sm" />
            </motion.div>

            {/* 4. Five Anchor Nodes centered over each column */}
            <div className="w-full grid grid-cols-5 gap-4 relative z-10">
              {PIPELINE_STAGES.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                const isPassed = activeStepIndex >= idx;

                return (
                  <div key={step.num} className="flex justify-center items-center">
                    <button
                      type="button"
                      onClick={() => handleSelectStep(idx)}
                      aria-label={`Activate step ${step.num}: ${step.label}`}
                      className="group p-2 -m-2 outline-none cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
                    >
                      <motion.div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors duration-200 ${
                          isActive
                            ? "bg-white dark:bg-[#07090e] ring-2 ring-blue-600 dark:ring-blue-400 shadow-sm"
                            : isPassed
                            ? "bg-blue-600/70 dark:bg-blue-400/70 ring-1 ring-blue-600/30"
                            : "bg-[#D8D2C6] dark:bg-zinc-700 hover:bg-[#B5ADA0] dark:hover:bg-zinc-500"
                        }`}
                        animate={{
                          scale: isActive ? 1.25 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            isActive
                              ? "bg-blue-600 dark:bg-blue-400"
                              : isPassed
                              ? "bg-white dark:bg-[#07090e]"
                              : "bg-transparent"
                          }`}
                        />
                      </motion.div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <div
            role="tablist"
            aria-label="Pipeline Stages"
            className="grid grid-cols-5 gap-4 relative"
          >
            {PIPELINE_STAGES.map((step, idx) => {
              const isActive = activeStepIndex === idx;

              return (
                <button
                  key={step.num}
                  type="button"
                  role="tab"
                  id={`pipeline-tab-${step.num}`}
                  aria-selected={isActive}
                  aria-controls={`pipeline-panel-${step.num}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleSelectStep(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex flex-col justify-between select-none ${
                    isActive
                      ? "bg-[#FCFAF5] dark:bg-[#0d1222] border border-blue-500/50 dark:border-blue-400/40 shadow-md shadow-blue-950/[0.04] dark:shadow-black/50 -translate-y-1 scale-[1.012]"
                      : "bg-[#FAF8F2]/80 dark:bg-white/[0.03] border border-[rgba(36,33,26,0.08)] dark:border-white/[0.07] hover:border-[rgba(36,33,26,0.2)] dark:hover:border-white/[0.14] opacity-80 hover:opacity-100"
                  }`}
                  style={{ minHeight: "260px" }}
                >
                  <div>
                    {/* Top Row: Number & Label */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(36,33,26,0.07)] dark:border-white/[0.08]">
                      <span
                        className={`font-mono text-xs font-bold transition-colors ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-[#888278] dark:text-zinc-500"
                        }`}
                      >
                        {step.num}
                      </span>
                      <span
                        className={`type-editorial-eyebrow text-[10px] tracking-wider uppercase transition-colors ${
                          isActive
                            ? "text-zinc-950 dark:text-white font-semibold"
                            : "text-[#888278] dark:text-zinc-500"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3
                      className={`font-serif text-base lg:text-lg font-normal mb-2 leading-snug transition-colors ${
                        isActive
                          ? "text-zinc-950 dark:text-white"
                          : "text-zinc-800 dark:text-zinc-300"
                      }`}
                    >
                      {step.headline}
                    </h3>

                    {/* Description */}
                    <p
                      className={`type-sans-body-sm text-xs leading-relaxed transition-colors ${
                        isActive
                          ? "text-[#36322C] dark:text-zinc-300"
                          : "text-[#6C665D] dark:text-zinc-400"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Active Secondary Detail Reveal (Fixed height prevents layout jumps) */}
                  <div className="mt-4 pt-3 border-t border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] min-h-[38px] flex items-center">
                    {isActive ? (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-1 w-full"
                      >
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-700 dark:text-blue-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                          <span className="line-clamp-1">{step.detail}</span>
                        </div>
                        <div className="font-mono text-[9px] text-zinc-500 dark:text-zinc-400 pl-3">
                          {step.telemetryPacket}
                        </div>
                      </motion.div>
                    ) : (
                      <span className="text-[11px] text-[#A8A298] dark:text-zinc-600">
                        Stage {step.num}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            MOBILE & TABLET VERTICAL PIPELINE (<lg)
            Vertical Signal Rail with Stacked Cards
            ========================================================= */}
        <div className="block lg:hidden relative pl-6 sm:pl-8">
          {/* Vertical Signal Rail */}
          <div className="absolute left-2.5 sm:left-3.5 top-6 bottom-6 w-[2px] bg-[rgba(36,33,26,0.12)] dark:bg-white/[0.12] rounded-full">
            {/* Active Vertical Blue Progress */}
            <motion.div
              className="w-full bg-blue-600 dark:bg-blue-400 rounded-full"
              style={{ originY: 0 }}
              animate={{
                height: `${(activeStepIndex / (PIPELINE_STAGES.length - 1)) * 100}%`,
              }}
              transition={transitionConfig}
            />
          </div>

          <div
            role="tablist"
            aria-label="Mobile Pipeline Stages"
            className="space-y-4 relative"
          >
            {PIPELINE_STAGES.map((step, idx) => {
              const isActive = activeStepIndex === idx;

              return (
                <div key={step.num} className="relative">
                  {/* Anchor Node on the Vertical Rail */}
                  <div className="absolute -left-6 sm:-left-8 top-6 -translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-white dark:bg-[#07090e] ring-2 ring-blue-600 dark:ring-blue-400 shadow-sm"
                          : activeStepIndex >= idx
                          ? "bg-blue-600/70 dark:bg-blue-400/70"
                          : "bg-[#D8D2C6] dark:bg-zinc-700"
                      }`}
                      animate={{
                        scale: isActive ? 1.25 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive
                            ? "bg-blue-600 dark:bg-blue-400"
                            : activeStepIndex >= idx
                            ? "bg-white dark:bg-[#07090e]"
                            : "bg-transparent"
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* Card Button */}
                  <button
                    type="button"
                    role="tab"
                    id={`mobile-pipeline-tab-${step.num}`}
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleSelectStep(idx)}
                    className={`w-full text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isActive
                        ? "bg-[#FCFAF5] dark:bg-[#0d1222] border border-blue-500/50 dark:border-blue-400/40 shadow-sm"
                        : "bg-[#FAF8F2]/80 dark:bg-white/[0.03] border border-[rgba(36,33,26,0.08)] dark:border-white/[0.07] opacity-80"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[rgba(36,33,26,0.07)] dark:border-white/[0.08]">
                      <span
                        className={`font-mono text-xs font-bold ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-[#888278] dark:text-zinc-500"
                        }`}
                      >
                        {step.num}
                      </span>
                      <span
                        className={`type-editorial-eyebrow text-[10px] tracking-wider uppercase ${
                          isActive
                            ? "text-zinc-950 dark:text-white font-semibold"
                            : "text-[#888278] dark:text-zinc-500"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>

                    <h3
                      className={`font-serif text-base font-normal mb-1.5 ${
                        isActive
                          ? "text-zinc-950 dark:text-white font-medium"
                          : "text-zinc-800 dark:text-zinc-300"
                      }`}
                    >
                      {step.headline}
                    </h3>

                    <p
                      className={`type-sans-body-sm text-xs leading-relaxed ${
                        isActive
                          ? "text-[#36322C] dark:text-zinc-300"
                          : "text-[#6C665D] dark:text-zinc-400"
                      }`}
                    >
                      {step.description}
                    </p>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="pt-2.5 border-t border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] flex items-center gap-1.5 text-[11px] font-medium text-blue-700 dark:text-blue-300 overflow-hidden"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                          <span>{step.detail}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            QUIET EDITORIAL FOOTER NOTE
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-14 pt-8 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs text-zinc-500 font-sans"
        >
          <span>Compatible with all carriers, Twilio, SIP trunks, or simple conditional phone forwarding.</span>
          <span className="font-mono text-zinc-400">Zero telephone hardware to install</span>
        </motion.div>
      </div>
    </section>
  );
});
