"use client";

import React, { memo } from "react";
import { Phone, Brain, Database, UserCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const SystemDiagram = memo(function SystemDiagram() {
  const steps = [
    {
      num: "01",
      phase: "Inbound Call",
      title: "Call Received",
      subtitle: "Answers instantly on your business phone line via conditional forwarding or SIP trunking.",
      icon: Phone,
      pill: "Sub-second Pickup",
    },
    {
      num: "02",
      phase: "Dialogue Core",
      title: "Understanding Intent",
      subtitle: "Listens naturally to the caller's request, parses parameters, and extracts criteria.",
      icon: Brain,
      pill: "Natural Language",
    },
    {
      num: "03",
      phase: "API Execution",
      title: "Taking Action",
      subtitle: "Queries live calendar availability, updates CRM records, or triggers custom webhooks.",
      icon: Database,
      pill: "Real-time Sync",
    },
    {
      num: "04",
      phase: "Resolution",
      title: "Confirm or Handoff",
      subtitle: "Sends instant SMS confirmation or executes a warm SIP transfer with call summary notes.",
      icon: UserCheck,
      pill: "100% Closure",
    },
  ];

  return (
    <section id="architecture" className="py-20 md:py-28 relative overflow-hidden bg-black/[0.015] dark:bg-white/[0.01] border-y border-black/[0.03] dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full type-eyebrow text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-3">
            <span>Architecture</span>
          </div>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-3">
            How Lunor turns calls into completed actions.
          </h2>

          <p className="type-body text-zinc-600 dark:text-zinc-400">
            A continuous architectural pipeline converting raw conversational audio into structured, reliable business execution.
          </p>
        </div>

        {/* Continuous Horizontal Pipeline */}
        <div className="relative p-6 sm:p-8 rounded-3xl structured-card shadow-sm space-y-8">
          {/* Top Stage Tracker Bar */}
          <div className="hidden lg:flex items-center justify-between relative px-2">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-black/[0.06] dark:bg-white/[0.08] -translate-y-1/2 -z-10" />
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 -translate-y-1/2 -z-10"
            />

            {steps.map((step, idx) => (
              <div key={step.num} className="flex items-center gap-2 bg-[var(--surface-card)] px-3 py-1 rounded-full border border-black/[0.05] dark:border-white/[0.07] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="type-eyebrow text-zinc-700 dark:text-zinc-300">Phase {step.num}: {step.phase}</span>
              </div>
            ))}
          </div>

          {/* 4 Pipeline Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-5 rounded-2xl bg-black/[0.015] dark:bg-white/[0.02] border border-black/[0.03] dark:border-white/[0.04] flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.05] pb-2.5 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="type-label-tech font-bold text-blue-600 dark:text-blue-400">
                          {step.num}
                        </span>
                        <span className="type-eyebrow text-zinc-400">
                          {step.phase}
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-black/[0.03] dark:bg-white/[0.05] text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <h3 className="type-h3 text-zinc-950 dark:text-white mb-1 leading-snug">
                      {step.title}
                    </h3>

                    <p className="type-body-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {step.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-black/[0.03] dark:border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500">
                    <span className="font-medium">{step.pill}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});
