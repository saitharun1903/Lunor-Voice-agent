"use client";

import React, { memo, useState } from "react";
import { Phone, Brain, Database, UserCheck, ArrowRight, Zap, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const SystemDiagram = memo(function SystemDiagram() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const steps = [
    {
      num: "01",
      phase: "Inbound Call",
      title: "Call Received",
      subtitle: "Answers instantly on your business phone line via conditional forwarding or SIP trunking.",
      icon: Phone,
      pill: "Sub-second Pickup",
      metric: "< 150ms SIP Connect",
    },
    {
      num: "02",
      phase: "Dialogue Core",
      title: "Understanding Intent",
      subtitle: "Listens naturally to the caller's request, parses parameters, and extracts criteria.",
      icon: Brain,
      pill: "Natural Language",
      metric: "Sub-400ms Turn",
    },
    {
      num: "03",
      phase: "API Execution",
      title: "Taking Action",
      subtitle: "Queries live calendar availability, updates CRM records, or triggers custom webhooks.",
      icon: Database,
      pill: "Real-time Sync",
      metric: "100% Deterministic",
    },
    {
      num: "04",
      phase: "Resolution",
      title: "Confirm or Handoff",
      subtitle: "Sends instant SMS confirmation or executes a warm SIP transfer with call summary notes.",
      icon: UserCheck,
      pill: "100% Closure",
      metric: "Instant SMS/Transfer",
    },
  ];

  return (
    <section id="architecture" className="py-24 md:py-32 relative overflow-hidden bg-black/[0.015] dark:bg-white/[0.01] border-y border-black/[0.03] dark:border-white/[0.04]">
      {/* Ambient glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] ambient-glow-blue pointer-events-none -z-10 blur-3xl opacity-50" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-16 text-left">
          <p className="type-eyebrow text-blue-600 dark:text-blue-400 mb-3 tracking-wider">
            ARCHITECTURE & DATA PIPELINE
          </p>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-3">
            How VoiceOps turns calls into completed actions.
          </h2>

          <p className="type-body-lg text-zinc-600 dark:text-zinc-400">
            A continuous architectural pipeline converting raw conversational audio into structured, reliable business execution.
          </p>
        </div>

        {/* Continuous Horizontal Pipeline Workbench */}
        <div className="relative p-6 sm:p-9 rounded-3xl structured-card shadow-xl space-y-8 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1]">
          {/* Top Stage Tracker Bar with Flowing Light Beam */}
          <div className="hidden lg:flex items-center justify-between relative px-4">
            {/* Background Track */}
            <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-black/[0.06] dark:bg-white/[0.08] -translate-y-1/2 -z-10" />

            {/* Continuous Energy Flow Light Beam */}
            <motion.div
              animate={{
                left: ["0%", "100%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 w-48 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-emerald-400 -translate-y-1/2 -z-10 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
            />

            {steps.map((step, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={step.num}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-200 shadow-xs ${
                    isHovered
                      ? "bg-blue-600 text-white border-blue-600 scale-105"
                      : "bg-[var(--surface-card)] text-zinc-700 dark:text-zinc-300 border-black/[0.06] dark:border-white/[0.08]"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isHovered ? "bg-white animate-ping" : "bg-blue-600"}`} />
                  <span className="type-eyebrow text-xs font-bold font-mono">
                    Phase {step.num}: {step.phase}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 4 Pipeline Interactive Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isHovered = hoveredIdx === index;

              return (
                <motion.div
                  key={step.num}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`relative p-5 sm:p-6 rounded-2xl flex flex-col justify-between space-y-4 transition-all duration-200 cursor-pointer border ${
                    isHovered
                      ? "bg-blue-500/[0.04] dark:bg-blue-500/[0.08] border-blue-500/30 shadow-lg"
                      : "bg-black/[0.015] dark:bg-white/[0.02] border-black/[0.04] dark:border-white/[0.06]"
                  }`}
                >
                  <div>
                    {/* Card Top */}
                    <div className="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.05] pb-3 mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="type-label-tech font-bold text-blue-600 dark:text-blue-400 font-mono">
                          {step.num}
                        </span>
                        <span className="type-eyebrow text-zinc-400 text-[11px]">
                          {step.phase}
                        </span>
                      </div>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        isHovered
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-black/[0.03] dark:bg-white/[0.05] text-zinc-700 dark:text-zinc-300"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="type-h3 text-zinc-950 dark:text-white mb-1.5 leading-snug font-semibold">
                      {step.title}
                    </h3>

                    <p className="type-body-sm text-zinc-600 dark:text-zinc-400 leading-relaxed text-xs">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Card Bottom: Metrics & Verification */}
                  <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between text-[11px]">
                    <span className="font-mono text-zinc-500 dark:text-zinc-400">
                      {step.metric}
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      ✓ {step.pill}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});
