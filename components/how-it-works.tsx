"use client";

import React, { memo } from "react";

const steps = [
  {
    num: "01",
    name: "Understand",
    description: "We review your common caller questions, intake scripts, and operational bottlenecks.",
  },
  {
    num: "02",
    name: "Design",
    description: "We map natural conversational pathways, tone parameters, and warm-transfer logic.",
  },
  {
    num: "03",
    name: "Build",
    description: "We connect the voice system to your phone lines, booking calendar, and CRM.",
  },
  {
    num: "04",
    name: "Launch",
    description: "Your voice agent goes live 24/7 with automatic call logging and performance monitoring.",
  },
];

export const HowItWorksSection = memo(function HowItWorksSection() {
  return (
    <section id="process" className="py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 border-b border-black/[0.04] dark:border-white/[0.05] pb-10">
          <div className="max-w-lg">
            <p className="type-eyebrow text-zinc-400 mb-3">Process</p>
            <h2 className="type-h1 text-zinc-950 dark:text-white">
              How implementation works.
            </h2>
          </div>
          <p className="type-body text-zinc-500 dark:text-zinc-400 max-w-sm lg:text-right">
            Four steps from brief to a live voice agent answering your calls.
          </p>
        </div>

        {/* Numbered Ledger — no cards, just type & space */}
        <div className="divide-y divide-black/[0.04] dark:divide-white/[0.05]">
          {steps.map((step) => (
            <div
              key={step.num}
              className="grid grid-cols-12 items-baseline gap-4 py-6"
            >
              <span className="col-span-1 type-label-tech text-zinc-300 dark:text-zinc-600">
                {step.num}
              </span>
              <h3 className="col-span-3 type-h3 text-zinc-950 dark:text-white">
                {step.name}
              </h3>
              <p className="col-span-8 type-body text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
