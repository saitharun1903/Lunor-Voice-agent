"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket, Sparkles, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      phase: "01",
      name: "DISCOVER",
      title: "Understand the company's calls",
      description:
        "We audit call logs and staff scripts to identify frequent questions, edge cases, and high-frequency friction points.",
      deliverables: "Call volume audit, conversation map & escalation criteria",
      icon: Search,
    },
    {
      phase: "02",
      name: "DESIGN",
      title: "Design the conversation & business logic",
      description:
        "We construct the dialogue trees, brand voice parameters, structured data collection, and warm human handoff rules.",
      deliverables: "Deterministic prompt engineering & voice persona tuning",
      icon: PenTool,
    },
    {
      phase: "03",
      name: "BUILD",
      title: "Develop & connect the system",
      description:
        "We integrate your voice agent with booking calendars, CRM databases, telephony carriers, and notification webhooks.",
      deliverables: "SIP trunking, bi-directional API sync & live staging tests",
      icon: Code2,
    },
    {
      phase: "04",
      name: "LAUNCH",
      title: "Deploy & monitor",
      description:
        "Your voice agent fields incoming calls 24/7 with sub-400ms latency, automatic transcript logging, and zero missed calls.",
      deliverables: "Production cutover, live monitoring & continuous tuning",
      icon: Rocket,
    },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="process" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 mb-4 uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Operational Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-5"
          >
            How implementation works.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto text-balance"
          >
            A transparent four-phase engineering framework designed to deliver a tested, brand-accurate voice layer with zero downtime.
          </motion.p>
        </div>

        {/* 4-Phase Operational Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative rounded-3xl p-7 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />

                <div>
                  {/* Phase Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full">
                      PHASE {step.phase}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] text-zinc-800 dark:text-zinc-200 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    {step.name}
                  </span>
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-2.5">
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
                    {step.deliverables}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
