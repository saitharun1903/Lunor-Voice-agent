"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { ProcessStep } from "@/lib/types";

interface HowItWorksProps {
  processSteps?: ProcessStep[];
}

const DEFAULT_STAGES = [
  {
    step: "01",
    title: "Understand",
    description: "We audit your inbound call recordings, common questions, and exception cases to map your team's exact conversational decision tree.",
  },
  {
    step: "02",
    title: "Design",
    description: "We craft tailored conversational pathways, human-like cadences, and business boundaries in our dedicated testing environment.",
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

export const HowItWorksSection = memo(function HowItWorksSection({
  processSteps,
}: HowItWorksProps) {
  const stages =
    processSteps && processSteps.length > 0
      ? processSteps.map((s, idx) => ({
          step: s.step || String(idx + 1).padStart(2, "0"),
          title: s.title,
          description: s.description,
        }))
      : DEFAULT_STAGES;

  return (
    <section id="process" className="py-28 md:py-40 relative overflow-hidden bg-[#F5F1E8] dark:bg-[#07090e] border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] transition-colors">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 sm:mb-24 text-left space-y-3"
        >
          <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
            METHODOLOGY
          </p>

          <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal">
            From initial call audit to live phone lines.
          </h2>

          <p className="type-sans-body-lg text-[#58534C] dark:text-zinc-400 font-normal leading-relaxed">
            How we take your company from missed calls and phone tag to an automated first layer in days.
          </p>
        </motion.div>

        {/* Continuous Connected Visual Path with VoiceOps Signal Transformation */}
        <div className="relative">
          {/* Animated Connecting Line (Desktop only) */}
          <div className="hidden lg:block absolute top-6 left-6 right-6 h-[1.5px] bg-[rgba(36,33,26,0.08)] dark:bg-white/[0.08] pointer-events-none z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent w-40"
              animate={{
                x: ["-50%", "350%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "linear",
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
            {stages.map((stage, idx) => {
              const deliverables = [
                "Call Taxonomy & Logic Map",
                "Prompt Architecture & Tone",
                "Calendar & CRM Webhooks",
                "Supervised Production Cutover",
              ];
              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4 pt-4 border-t border-[rgba(36,33,26,0.12)] dark:border-white/[0.12] text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                      PHASE {stage.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-zinc-950 dark:text-white font-normal">
                    {stage.title}
                  </h3>

                  <p className="type-sans-body-sm text-[#58534C] dark:text-zinc-400 leading-relaxed text-xs">
                    {stage.description}
                  </p>

                  <div className="pt-2 border-t border-[rgba(36,33,26,0.06)] dark:border-white/[0.06]">
                    <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 bg-black/[0.03] dark:bg-white/[0.04] px-2.5 py-1 rounded-md inline-block">
                      ↳ {deliverables[idx] || "Production milestone"}
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
