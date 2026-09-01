"use client";

import React, { memo } from "react";
import { Search, PenTool, Code2, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";

export const HowItWorksSection = memo(function HowItWorksSection() {
  const steps = [
    {
      phase: "01",
      name: "UNDERSTAND",
      title: "Understand how your business handles calls",
      description:
        "We audit call recordings, intake scripts, and frequent inquiry types to identify edge cases, repeated questions, and high-friction operational bottlenecks.",
      deliverable: "Call volume audit, conversation map & escalation criteria",
      icon: Search,
    },
    {
      phase: "02",
      name: "DESIGN",
      title: "Design the conversation and business rules",
      description:
        "We engineer deterministic dialogue flows, tone parameters, structured intake fields, and human escalation triggers tailored to your brand.",
      deliverable: "Prompt architecture & voice persona specification",
      icon: PenTool,
    },
    {
      phase: "03",
      name: "BUILD",
      title: "Build the voice system around the workflow",
      description:
        "We connect your voice agent to your calendars, CRM databases, carrier SIP trunks, and webhook notification pipelines with low-latency routing.",
      deliverable: "Carrier SIP trunking, bi-directional API sync & staging tests",
      icon: Code2,
    },
    {
      phase: "04",
      name: "LAUNCH",
      title: "Deploy, monitor, and continuously improve",
      description:
        "Your voice agent fields incoming calls 24/7 with sub-400ms cadence, automatic transcript sync, and continuous accuracy optimization.",
      deliverable: "Zero-downtime production cutover & telemetry dashboard",
      icon: Rocket,
    },
  ];

  return (
    <section id="process" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 mb-4 uppercase font-mono">
            <span>Operational Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-5">
            How implementation works.
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto text-balance">
            A transparent four-phase engineering framework designed to deliver a tested, brand-accurate voice layer with zero disruption to your daily operations.
          </p>
        </div>

        {/* 4-Phase Connected Operational Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.phase}
                className="relative rounded-3xl p-7 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-200 flex flex-col justify-between group"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />

                <div>
                  {/* Phase Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full">
                      PHASE {step.phase}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] text-zinc-800 dark:text-zinc-200 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    {step.name}
                  </span>
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-2.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.04] dark:border-white/[0.06]">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                    Deliverable:
                  </p>
                  <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    {step.deliverable}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
