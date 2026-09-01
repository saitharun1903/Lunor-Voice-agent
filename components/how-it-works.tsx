"use client";

import React, { memo } from "react";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

export const HowItWorksSection = memo(function HowItWorksSection() {
  const steps = [
    {
      phase: "01",
      name: "UNDERSTAND",
      title: "Audit Call Records & Workflows",
      description: "We audit your recent call recordings, intake scripts, and frequent inquiry patterns to identify edge cases, repeated questions, and operational bottlenecks.",
      deliverable: "Conversation Map & Escalation Criteria",
      icon: Search,
    },
    {
      phase: "02",
      name: "DESIGN",
      title: "Engineer Dialogue & Business Rules",
      description: "We design deterministic conversational pathways, tone parameters, structured intake fields, and human warm-transfer protocols tailored to your brand.",
      deliverable: "Prompt Architecture & Persona Spec",
      icon: PenTool,
    },
    {
      phase: "03",
      name: "BUILD",
      title: "Connect Calendars, CRMs & Carriers",
      description: "We wire your voice agent directly to your calendars, CRM databases, carrier SIP trunks, and webhook notification pipelines with sub-400ms routing.",
      deliverable: "SIP Trunking & Staging Validation",
      icon: Code2,
    },
    {
      phase: "04",
      name: "LAUNCH",
      title: "Deploy, Supervise & Optimize",
      description: "Your voice agent answers live incoming calls 24/7 with automatic transcript synchronization, zero hold times, and continuous accuracy supervision.",
      deliverable: "Production Cutover & Telemetry Dashboard",
      icon: Rocket,
    },
  ];

  return (
    <section id="process" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4 uppercase">
            <span>Operational Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.035em] text-zinc-950 dark:text-white mb-5">
            How implementation works.
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            A transparent four-phase engineering framework designed to deliver a tested, brand-accurate voice layer with zero disruption to your daily operations.
          </p>
        </div>

        {/* 4-Phase Connected Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.phase}
                className="p-6 rounded-3xl structured-card flex flex-col justify-between space-y-6 group"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.06] pb-4 mb-5">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      PHASE {step.phase}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    {step.name}
                  </span>
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.04] dark:border-white/[0.06]">
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-0.5">
                    Deliverable:
                  </p>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
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
