"use client";

import React, { memo } from "react";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

export const HowItWorksSection = memo(function HowItWorksSection() {
  const steps = [
    {
      phase: "01",
      name: "Understand",
      title: "Audit Call Records & Questions",
      description: "We review your common caller questions, intake scripts, and operational bottlenecks.",
      icon: Search,
    },
    {
      phase: "02",
      name: "Design",
      title: "Engineer Conversation Flow",
      description: "We design natural conversational pathways, tone parameters, and warm-transfer rules.",
      icon: PenTool,
    },
    {
      phase: "03",
      name: "Build",
      title: "Connect Calendars & CRMs",
      description: "We connect the voice system to your phone numbers, booking software, and databases.",
      icon: Code2,
    },
    {
      phase: "04",
      name: "Launch",
      title: "Go Live & Supervise",
      description: "Your voice agent answers incoming calls 24/7 with zero hold times and automatic logging.",
      icon: Rocket,
    },
  ];

  return (
    <section id="process" className="py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full type-eyebrow text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-3">
            <span>Process</span>
          </div>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-3">
            How implementation works.
          </h2>

          <p className="type-body text-zinc-600 dark:text-zinc-400">
            A straightforward four-step process to deploy a custom voice agent for your business with zero operational downtime.
          </p>
        </div>

        {/* 4-Step Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.phase}
                className="p-5 rounded-2xl structured-card flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.05] pb-2.5 mb-3">
                    <span className="type-eyebrow font-bold text-blue-600 dark:text-blue-400">
                      PHASE {step.phase}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <span className="type-eyebrow text-zinc-400 block mb-0.5">
                    {step.name}
                  </span>
                  <h3 className="type-h3 text-zinc-950 dark:text-white mb-1 leading-snug">
                    {step.title}
                  </h3>
                  <p className="type-body-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {step.description}
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
