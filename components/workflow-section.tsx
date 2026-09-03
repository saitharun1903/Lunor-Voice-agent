"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { PhoneIncoming, BrainCircuit, GitCommit, CheckCircle2 } from "lucide-react";

export const WorkflowSection = memo(function WorkflowSection() {
  const workflowNodes = [
    {
      step: "01",
      title: "CALL",
      subtitle: "Inbound Audio Stream",
      description: "Direct carrier handoff in sub-400ms without hold queues or robotic touch-tone menus.",
      icon: PhoneIncoming,
    },
    {
      step: "02",
      title: "UNDERSTAND",
      subtitle: "Speech & Intent",
      description: "Interprets conversational nuances, addresses interruptions, and extracts structured data.",
      icon: BrainCircuit,
    },
    {
      step: "03",
      title: "DECIDE",
      subtitle: "Operational Rules",
      description: "Evaluates your booking logic, pricing matrices, practitioner calendars, and escalation policies.",
      icon: GitCommit,
    },
    {
      step: "04",
      title: "ACT",
      subtitle: "System Execution",
      description: "Locks the slot, updates CRM pipelines, dispatches SMS confirmations, or triggers warm staff transfer.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="workflow" className="py-28 md:py-40 relative overflow-hidden bg-[#F5F1E8] dark:bg-[#07090e] border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] transition-colors">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Large Typography Statement (Editorial Break) */}
        <div className="max-w-3xl mb-16 sm:mb-24 text-left space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="type-editorial-eyebrow text-blue-600 dark:text-blue-400"
          >
            HOW IT WORKS
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="type-serif-display text-zinc-950 dark:text-white font-normal leading-[1.08]"
          >
            Calls should end
            <br />
            <span className="italic font-light text-[#6E685E] dark:text-zinc-400">
              in verified actions.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="type-sans-body-lg text-[#58534C] dark:text-zinc-400 leading-relaxed font-normal max-w-xl"
          >
            VoiceOps turns spoken conversations directly into structured outcomes across your software systems.
          </motion.p>
        </div>

        {/* Large Visual Workflow with Continuous Animated Signal */}
        <div className="relative pt-6">
          {/* Continuous Glowing Signal Pathway (Desktop) */}
          <div className="hidden md:block absolute top-[4.2rem] left-12 right-12 h-[2px] bg-[rgba(36,33,26,0.08)] dark:bg-white/[0.08] pointer-events-none z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent w-48"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {workflowNodes.map((node, idx) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4 pt-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[rgba(36,33,26,0.04)] dark:bg-white/[0.06] border border-[rgba(36,33,26,0.07)] dark:border-white/[0.08] flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#888278] dark:text-zinc-400">
                      PHASE {node.step}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-sans font-bold text-base text-zinc-950 dark:text-white tracking-tight">
                      {node.title}
                    </h3>
                    <p className="font-mono text-[11px] text-blue-600 dark:text-blue-400">
                      {node.subtitle}
                    </p>
                  </div>

                  <p className="type-sans-body-sm text-[#58534C] dark:text-zinc-400 text-xs leading-relaxed">
                    {node.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});
