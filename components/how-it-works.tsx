"use client";

import React, { memo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProcessStep } from "@/lib/types";
import { MOTION_EASINGS } from "@/lib/motion-config";

interface HowItWorksProps {
  processSteps?: ProcessStep[];
}

interface EnrichedStage {
  step: string;
  title: string;
  description: string;
  deliverable: string;
}

const DEFAULT_STAGES: EnrichedStage[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We audit your inbound call recordings, repetitive inquiries, and escalation criteria to map your exact conversational decision tree.",
    deliverable: "Call Taxonomy & Logic Map",
  },
  {
    step: "02",
    title: "Design",
    description:
      "We craft tailored conversational pathways, brand tone of voice, and boundary rules in our dedicated sandbox.",
    deliverable: "Prompt Architecture & Voice Model",
  },
  {
    step: "03",
    title: "Build",
    description:
      "We construct custom conversational pipelines trained on your product catalogs, verified knowledge base, and business logic.",
    deliverable: "Deterministic Neural Engine",
  },
  {
    step: "04",
    title: "Integrate",
    description:
      "We wire VoiceOps directly to your calendar software, CRM, and carrier SIP lines for real-time reads and writes.",
    deliverable: "Bi-directional API & SIP Routing",
  },
  {
    step: "05",
    title: "Launch",
    description:
      "We deploy the first layer to live phone lines, audit early transcripts, and supervise calls to ensure sub-400ms accuracy.",
    deliverable: "Supervised Production Cutover",
  },
];

export const HowItWorksSection = memo(function HowItWorksSection({
  processSteps,
}: HowItWorksProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const stages: EnrichedStage[] =
    processSteps && processSteps.length >= 4
      ? processSteps.map((s, idx) => ({
          step: s.step || String(idx + 1).padStart(2, "0"),
          title: s.title,
          description: s.description,
          deliverable: DEFAULT_STAGES[idx]?.deliverable || "Production milestone",
        }))
      : DEFAULT_STAGES;

  return (
    <section
      id="process"
      aria-label="VoiceOps 5-Phase Deployment Circuit"
      className="py-20 sm:py-24 md:py-28 relative overflow-hidden bg-white dark:bg-[#07090e] border-t border-slate-100 dark:border-white/[0.08] transition-colors scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: MOTION_EASINGS.editorial }}
          className="max-w-3xl mb-14 sm:mb-20 text-left space-y-3"
        >
          <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
            DEPLOYMENT CIRCUIT
          </p>

          <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal text-3xl sm:text-4xl md:text-5xl">
            From initial call audit to live phone lines.
          </h2>

          <p className="type-sans-body-lg text-slate-600 dark:text-zinc-400 font-normal leading-relaxed text-sm sm:text-base">
            How we take your company from missed calls and phone tag to an automated first layer in days.
          </p>
        </motion.div>

        {/* =========================================================
            WOW #7: CONTINUOUS 5-PHASE DEPLOYMENT CONDUIT
            DISCOVER -> DESIGN -> BUILD -> INTEGRATE -> LAUNCH
            ========================================================= */}
        <div className="relative">
          {/* Traveling Continuous Signal Path (Desktop & Tablet) */}
          <div className="hidden lg:block absolute top-7 left-6 right-6 h-[2px] bg-slate-200 dark:bg-white/[0.08] pointer-events-none z-0 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent w-48 rounded-full"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: ["-100%", "450%"],
                    }
              }
              transition={{
                repeat: Infinity,
                duration: 3.8,
                ease: "linear",
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 relative z-10">
            {stages.map((stage, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: MOTION_EASINGS.editorial }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`p-5 rounded-2xl transition-all duration-200 border text-left flex flex-col justify-between space-y-4 ${
                    isHovered
                      ? "bg-slate-50 dark:bg-[#10131B] border-blue-500/40 shadow-md -translate-y-1"
                      : "bg-white dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.06]"
                  }`}
                  style={{ minHeight: "280px" }}
                >
                  <div className="space-y-3">
                    {/* Step Telemetry Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full transition-colors ${
                            isHovered
                              ? "bg-blue-600 dark:bg-blue-400"
                              : "bg-black/20 dark:bg-white/20"
                          }`}
                        />
                        <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                          PHASE {stage.step}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-400">
                        {String(idx + 1).padStart(2, "0")}/05
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-zinc-950 dark:text-white font-normal">
                      {stage.title}
                    </h3>

                    <p className="type-sans-body-sm text-slate-600 dark:text-zinc-400 leading-relaxed text-xs">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                    <span className="font-mono text-[10px] text-zinc-600 dark:text-zinc-400 bg-black/[0.03] dark:bg-white/[0.04] px-2.5 py-1 rounded-md inline-block">
                      ↳ {stage.deliverable}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Continuity Line */}
        <div className="mt-14 pt-6 border-t border-slate-100 dark:border-white/[0.06] flex flex-col sm:flex-row items-baseline justify-between gap-3 text-xs text-zinc-500 font-sans">
          <span>Enterprise deployment timelines typically range between 4 to 9 business days from audit to carrier cutover.</span>
          <span className="font-mono text-zinc-400 shrink-0">Zero downtime cutover</span>
        </div>
      </div>
    </section>
  );
});
