"use client";

import React, { memo } from "react";
import { Phone, Brain, Database, UserCheck } from "lucide-react";

export const SystemDiagram = memo(function SystemDiagram() {
  const steps = [
    {
      num: "01",
      title: "Call Received",
      subtitle: "Answers instantly on your existing business phone number.",
      icon: Phone,
    },
    {
      num: "02",
      title: "Understanding Intent",
      subtitle: "Listens naturally to questions and collects required details.",
      icon: Brain,
    },
    {
      num: "03",
      title: "Taking Action",
      subtitle: "Checks availability, books slots, or updates your CRM in real time.",
      icon: Database,
    },
    {
      num: "04",
      title: "Resolution or Handoff",
      subtitle: "Sends SMS confirmation or connects to your team with notes.",
      icon: UserCheck,
    },
  ];

  return (
    <section id="architecture" className="py-20 md:py-24 relative overflow-hidden bg-black/[0.01] dark:bg-white/[0.01] border-y border-black/[0.03] dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full type-eyebrow text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-3">
            <span>How It Works</span>
          </div>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-3">
            How Lunor turns calls into completed actions.
          </h2>

          <p className="type-body text-zinc-600 dark:text-zinc-400">
            A direct pipeline that converts caller speech into completed business outcomes with zero hold times.
          </p>
        </div>

        {/* 4-Step Architecture Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-5 rounded-2xl structured-card flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.05] pb-2.5 mb-3.5">
                    <span className="type-eyebrow font-bold text-blue-600 dark:text-blue-400">
                      STEP {step.num}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
