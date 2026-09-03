"use client";

import React, { memo } from "react";

export const HowItWorksSection = memo(function HowItWorksSection() {
  const stages = [
    {
      step: "01",
      title: "Understand",
      description: "We audit your inbound call recordings, common questions, and exception cases to map your team's exact conversational decision tree.",
    },
    {
      step: "02",
      title: "Design",
      description: "We craft tailored conversational pathways, human-like cadences, and business boundaries in our testing environment.",
    },
    {
      step: "03",
      title: "Build & Integrate",
      description: "We connect VoiceOps directly to your calendar software, CRM, and carrier numbers for real-time reads and writes.",
    },
    {
      step: "04",
      title: "Launch & Supervise",
      description: "We deploy the first layer to live phone lines, audit early transcripts, and continuously calibrate response accuracy.",
    },
  ];

  return (
    <section id="process" className="py-24 md:py-36 relative overflow-hidden chapter-stone border-t border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left space-y-3">
          <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
            METHODOLOGY
          </p>

          <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal">
            From initial call audit to live phone lines.
          </h2>

          <p className="type-sans-body-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            How we take your company from missed calls and phone tag to an automated first layer in days.
          </p>
        </div>

        {/* Continuous Editorial Journey (No Generic Boxed Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
          {stages.map((stage, idx) => (
            <div key={stage.step} className="space-y-4 pt-4 border-t border-black/[0.12] dark:border-white/[0.12]">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 block">
                PHASE {stage.step}
              </span>

              <h3 className="font-serif text-2xl text-zinc-950 dark:text-white font-normal">
                {stage.title}
              </h3>

              <p className="type-sans-body-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
