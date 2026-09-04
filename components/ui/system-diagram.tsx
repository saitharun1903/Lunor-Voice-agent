"use client";

import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  PhoneIncoming,
  Cpu,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Terminal,
  Activity,
  Check,
} from "lucide-react";
import { MOTION_EASINGS } from "@/lib/motion-config";

interface PipelineStage {
  num: string;
  label: string;
  headline: string;
  description: string;
  detail: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    num: "01",
    label: "CALL",
    headline: "Inbound Phone Call",
    description:
      "A customer calls your business number with an urgent booking, inquiry, or question.",
    detail: "Direct connection through your existing phone line with zero hardware needed.",
    summary: "Instant pickup through carrier forwarding or direct line integration.",
    icon: PhoneIncoming,
  },
  {
    num: "02",
    label: "VOICEOPS",
    headline: "Instant Voice Response",
    description:
      "Answers in under a second with natural conversational cadence. Zero hold music, zero robotic phone trees.",
    detail: "VoiceOps answers naturally, adapting to interruptions without delays.",
    summary: "Immediate pickup that speaks with clarity and conversational warmth.",
    icon: Cpu,
  },
  {
    num: "03",
    label: "UNDERSTAND",
    headline: "Natural Understanding",
    description:
      "Listens to natural phrasing, clarifies preferences, and extracts key details with high accuracy.",
    detail: "Captures caller intent, contact info, and specific requests without rigid menus.",
    summary: "Deep language comprehension that clarifies ambiguous customer requests.",
    icon: CheckCircle2,
  },
  {
    num: "04",
    label: "ACT",
    headline: "Real Action & Commitment",
    description:
      "Checks live availability, books appointments, looks up inventory, or updates your business systems.",
    detail: "Directly syncs with your calendars, booking systems, and workflows in real time.",
    summary: "Executes actual operations in your business tools while the caller is on the line.",
    icon: Calendar,
  },
  {
    num: "05",
    label: "RESOLVE",
    headline: "Resolution & Summary",
    description:
      "Completes the request seamlessly, sends instant confirmation, or transfers to your team with full context.",
    detail: "Your team receives clear notes and clean recordings so context is never lost.",
    summary: "Leaves customers confirmed and staff updated with zero administrative overhead.",
    icon: Layers,
  },
];

export const SystemDiagram = memo(function SystemDiagram() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Gentle auto-cycle through stages when user has not manually clicked
  useEffect(() => {
    if (hasUserInteracted || shouldReduceMotion) return;
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [hasUserInteracted, shouldReduceMotion]);

  const handleSelectStep = useCallback((index: number) => {
    setHasUserInteracted(true);
    setActiveStepIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (index + 1) % PIPELINE_STAGES.length;
        handleSelectStep(next);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (index - 1 + PIPELINE_STAGES.length) % PIPELINE_STAGES.length;
        handleSelectStep(prev);
      }
    },
    [handleSelectStep]
  );

  const activePercent = 10 + activeStepIndex * 20;
  const activeStage = PIPELINE_STAGES[activeStepIndex];

  return (
    <section
      id="architecture"
      ref={sectionRef}
      aria-label="VoiceOps Call Architecture Pipeline"
      className="py-20 sm:py-24 md:py-28 relative bg-white dark:bg-[#07090e] border-t border-slate-100 dark:border-white/[0.08] transition-colors scroll-mt-16"
      onMouseEnter={() => setHasUserInteracted(true)}
      onTouchStart={() => setHasUserInteracted(true)}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: MOTION_EASINGS.editorial }}
              className="max-w-2xl text-left space-y-2"
            >
              <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
                THE SIGNATURE CONTINUOUS ARCHITECTURE
              </p>

              <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal text-3xl sm:text-4xl md:text-5xl">
                Every business has a first layer.
              </h2>

              <p className="type-sans-body-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal text-sm sm:text-base">
                VoiceOps sits quietly in front of your phones, resolving initial conversations before they interrupt your operational team.
              </p>
            </motion.div>

            {/* Live Pipeline Flow Indicator */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.07] text-zinc-700 dark:text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <span>Stage {activeStage.num} of 05 · {activeStage.label}</span>
            </div>
          </div>

          {/* =========================================================
              DESKTOP PIPELINE (lg & xl)
              Dedicated Elevated Conduit Rail ABOVE the Cards
              ========================================================= */}
          <div className="hidden lg:block relative">
            {/* Elevated Conduit Rail Area */}
            <div className="relative h-10 mb-2 flex items-center">
              {/* Base Neutral Rail */}
              <div
                className="absolute h-[2px] bg-slate-200 dark:bg-white/[0.12] rounded-full"
                style={{ left: "10%", right: "10%" }}
              />

              {/* Active Blue Signal Progress */}
              <motion.div
                className="absolute h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full"
                style={{ left: "10%" }}
                animate={{
                  width: `${activeStepIndex * 20}%`,
                }}
                transition={{ duration: 0.4, ease: MOTION_EASINGS.editorial }}
              />

              {/* Traveling Signal Ring: Luminous beacon gliding across stages */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600/20 dark:bg-blue-400/25 flex items-center justify-center pointer-events-none z-20"
                animate={{
                  left: `${activePercent}%`,
                }}
                transition={{ duration: 0.4, ease: MOTION_EASINGS.editorial }}
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shadow-sm" />
              </motion.div>

              {/* Five Anchor Nodes */}
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
                              : "bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-500"
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

            {/* 5-Card Grid with Single Active Spotlight Focus */}
            <div
              role="tablist"
              aria-label="Pipeline Stages"
              className="grid grid-cols-5 gap-4 relative"
            >
              {PIPELINE_STAGES.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                const Icon = step.icon;

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
                    className={`text-left p-5 rounded-2xl transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex flex-col justify-between select-none ${
                      isActive
                        ? "bg-slate-50 dark:bg-[#0d1222] border border-blue-500/50 dark:border-blue-400/40 shadow-lg shadow-blue-950/[0.04] dark:shadow-black/50 -translate-y-1.5 scale-[1.02]"
                        : "bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.07] hover:border-slate-300 dark:hover:border-white/[0.14] opacity-85 hover:opacity-100"
                    }`}
                    style={{ minHeight: "250px" }}
                  >
                    <div>
                      {/* Top Row: Index & Label */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-white/[0.08]">
                        <span
                          className={`font-mono text-xs font-bold transition-colors ${
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-400 dark:text-zinc-500"
                          }`}
                        >
                          {step.num}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-400"}`} />
                          <span
                            className={`type-editorial-eyebrow text-[10px] tracking-wider uppercase transition-colors ${
                              isActive
                                ? "text-zinc-950 dark:text-white font-semibold"
                                : "text-slate-400 dark:text-zinc-500"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      </div>

                      {/* Headline */}
                      <h3
                        className={`font-serif text-base lg:text-lg font-normal mb-2 leading-snug transition-colors ${
                          isActive
                            ? "text-zinc-950 dark:text-white font-medium"
                            : "text-zinc-800 dark:text-zinc-300"
                        }`}
                      >
                        {step.headline}
                      </h3>

                      {/* Description */}
                      <p
                        className={`type-sans-body-sm text-xs leading-relaxed transition-colors ${
                          isActive
                            ? "text-slate-800 dark:text-zinc-300"
                            : "text-slate-600 dark:text-zinc-400"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Active Secondary Detail Reveal */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/[0.06] min-h-[36px] flex items-center">
                      {isActive ? (
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-700 dark:text-blue-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                          <span className="line-clamp-1">{step.detail}</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 dark:text-zinc-600 font-mono">
                          Phase 0{idx + 1}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Clean Editorial Stage Progression Callout */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.num}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: MOTION_EASINGS.editorial }}
                className="mt-6 p-4 rounded-2xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        STAGE {activeStage.num} — {activeStage.label}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-zinc-500">·</span>
                      <span className="text-xs text-zinc-900 dark:text-zinc-200 font-medium">
                        {activeStage.headline}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">
                      {activeStage.summary}
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-white dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.1] text-[11px] text-slate-700 dark:text-zinc-300 font-medium shrink-0 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Continuous Telephony Flow</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* =========================================================
              MOBILE VERTICAL PIPELINE (<lg)
              ========================================================= */}
          <div className="block lg:hidden relative pl-6 sm:pl-8">
            <div className="absolute left-2.5 sm:left-3.5 top-6 bottom-6 w-[2px] bg-slate-200 dark:bg-white/[0.12] rounded-full">
              <motion.div
                className="w-full bg-blue-600 dark:bg-blue-400 rounded-full"
                style={{ originY: 0 }}
                animate={{
                  height: `${(activeStepIndex / (PIPELINE_STAGES.length - 1)) * 100}%`,
                }}
                transition={{ duration: 0.35, ease: MOTION_EASINGS.editorial }}
              />
            </div>

            <div
              role="tablist"
              aria-label="Mobile Pipeline Stages"
              aria-orientation="vertical"
              className="space-y-4"
            >
              {PIPELINE_STAGES.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                return (
                  <div key={step.num} className="relative">
                    {/* Node Dot on Conduit */}
                    <div
                      className={`absolute -left-[19px] sm:-left-[23px] top-6 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? "bg-blue-600 dark:bg-blue-400 border-white dark:border-[#07090e] ring-4 ring-blue-500/20 scale-125 z-10"
                          : idx < activeStepIndex
                          ? "bg-blue-600 dark:bg-blue-400 border-white dark:border-[#07090e]"
                          : "bg-slate-300 dark:bg-zinc-700 border-white dark:border-[#07090e]"
                      }`}
                    />

                    {/* Step Card Button */}
                    <button
                      type="button"
                      role="tab"
                      id={`mobile-pipeline-tab-${step.num}`}
                      aria-selected={isActive}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => handleSelectStep(idx)}
                      className={`w-full text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        isActive
                          ? "bg-white dark:bg-[#0d1222] border border-blue-500/50 dark:border-blue-400/40 shadow-sm"
                          : "bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.07] opacity-80"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100 dark:border-white/[0.08]">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-400 dark:text-zinc-500"
                          }`}
                        >
                          {step.num}
                        </span>
                        <span
                          className={`type-editorial-eyebrow text-[10px] tracking-wider uppercase ${
                            isActive
                              ? "text-zinc-950 dark:text-white font-semibold"
                              : "text-slate-400 dark:text-zinc-500"
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
                            ? "text-slate-700 dark:text-zinc-300"
                            : "text-slate-500 dark:text-zinc-400"
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
                            transition={{ duration: 0.22, ease: MOTION_EASINGS.editorial }}
                            className="pt-2.5 border-t border-slate-100 dark:border-white/[0.06] space-y-2 overflow-hidden"
                          >
                            <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-700 dark:text-blue-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                              <span>{step.detail}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-zinc-400">
                              {step.summary}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quiet Editorial Footer */}
          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-baseline justify-between gap-3 text-xs text-zinc-500 font-sans">
            <span>Compatible with all carriers, Twilio, SIP trunks, or simple conditional phone forwarding.</span>
            <span className="font-mono text-zinc-400">Zero telephone hardware to install</span>
          </div>
        </div>
    </section>
  );
});
