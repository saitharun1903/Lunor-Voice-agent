"use client";

import React, { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FlipCard } from "./ui/flip-card";
import { CapabilityItem, UseCase } from "@/lib/types";

interface UseCasesProps {
  useCases?: UseCase[];
  capabilities?: CapabilityItem[];
}

const CAPABILITY_CARDS = [
  {
    index: "01",
    title: "ENQUIRIES",
    subtitle: "Answer repetitive customer questions.",
    explanation: "Answers incoming customer questions about hours, services, pricing and locations using verified business data.",
    workflow: ["Ask", "Understand", "Answer", "Resolve"],
    outcome: "Verified business response",
    tiltClass: "lg:rotate-[-0.5deg]",
  },
  {
    index: "02",
    title: "BOOKINGS",
    subtitle: "Handle reservations and appointments.",
    explanation: "Handles booking requests and checks availability before confirming a slot.",
    workflow: ["Request", "Check", "Book", "Confirm"],
    outcome: "Booking completed",
    tiltClass: "lg:rotate-[0.5deg]",
  },
  {
    index: "03",
    title: "QUALIFICATION",
    subtitle: "Capture requirements and identify intent.",
    explanation: "Collects the important requirements needed to understand caller intent.",
    workflow: ["Ask", "Qualify", "Score", "Route"],
    outcome: "Qualified lead",
    tiltClass: "lg:rotate-[-0.5deg]",
  },
  {
    index: "04",
    title: "SALES",
    subtitle: "Support inbound sales conversations.",
    explanation: "Answers product questions, handles common objections and captures interest.",
    workflow: ["Listen", "Answer", "Qualify", "Route"],
    outcome: "Lead captured",
    tiltClass: "lg:rotate-[0.5deg]",
  },
  {
    index: "05",
    title: "SUPPORT",
    subtitle: "Resolve common customer issues.",
    explanation: "Handles routine support questions and provides accurate status information.",
    workflow: ["Identify", "Resolve", "Confirm", "Close"],
    outcome: "Issue resolved",
    tiltClass: "lg:rotate-[-0.5deg]",
  },
  {
    index: "06",
    title: "FOLLOW-UPS",
    subtitle: "Handle structured outbound follow-ups.",
    explanation: "Handles reminders, confirmations and structured follow-up conversations.",
    workflow: ["Call", "Confirm", "Update", "Complete"],
    outcome: "Follow-up completed",
    tiltClass: "lg:rotate-[0.5deg]",
  },
];

export const UseCasesSection = memo(function UseCasesSection({
  useCases,
  capabilities,
}: UseCasesProps) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const itemsToRender =
    capabilities && capabilities.length > 0
      ? capabilities.map((c, idx) => ({
          index: c.index || String(idx + 1).padStart(2, "0"),
          title: c.title,
          subtitle: c.subtitle,
          explanation: c.explanation,
          workflow:
            c.workflow && c.workflow.length > 0
              ? c.workflow
              : ["Ask", "Understand", "Answer", "Resolve"],
          outcome: c.outcome,
          tiltClass:
            c.tiltClass || (idx % 2 === 0 ? "lg:rotate-[-0.5deg]" : "lg:rotate-[0.5deg]"),
        }))
      : CAPABILITY_CARDS;

  const handleCardToggle = useCallback((id: string) => {
    setActiveCardId((current) => (current === id ? null : id));
  }, []);

  return (
    <section id="capabilities" className="py-28 md:py-40 relative overflow-hidden bg-[#F5F1E8] dark:bg-[#07090e] border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] transition-colors scroll-mt-16">
      {/* Invisible anchor for backward compatibility with legacy #use-cases */}
      <div id="use-cases" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 sm:mb-20 text-left space-y-3"
        >
          <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
            CAPABILITIES
          </p>

          <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal">
            Autonomous phone capabilities.
          </h2>

          <p className="type-sans-body-lg text-[#58534C] dark:text-zinc-400 leading-relaxed font-normal">
            Click any card to inspect the exact conversational workflow and verified outcome.
          </p>
        </motion.div>

        {/* Asymmetric Focal Matrix: Tier 1 Frontline (2 Col) + Tier 2 Specialized (4 Col) */}
        <div className="space-y-6 lg:space-y-8">
          {/* Tier 1: Frontline Intake & Scheduling (2 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {itemsToRender.slice(0, 2).map((card, idx) => (
              <motion.div
                key={card.index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <FlipCard
                  id={card.index}
                  index={card.index}
                  title={card.title}
                  subtitle={card.subtitle}
                  explanation={card.explanation}
                  workflow={card.workflow}
                  outcome={card.outcome}
                  tiltClass={card.tiltClass}
                  isFlipped={activeCardId === card.index}
                  onToggle={() => handleCardToggle(card.index)}
                />
              </motion.div>
            ))}
          </div>

          {/* Tier 2: Specialized Execution Capabilities (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {itemsToRender.slice(2, 6).map((card, idx) => (
              <motion.div
                key={card.index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx + 2) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <FlipCard
                  id={card.index}
                  index={card.index}
                  title={card.title}
                  subtitle={card.subtitle}
                  explanation={card.explanation}
                  workflow={card.workflow}
                  outcome={card.outcome}
                  tiltClass={card.tiltClass}
                  isFlipped={activeCardId === card.index}
                  onToggle={() => handleCardToggle(card.index)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quiet Bottom Editorial Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 pt-8 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs text-zinc-500 font-sans"
        >
          <span>All 6 capabilities adapt dynamically to your company&apos;s custom knowledge base and booking software.</span>
          <span className="font-mono text-zinc-400">Interactive Progressive Disclosure</span>
        </motion.div>
      </div>
    </section>
  );
});
