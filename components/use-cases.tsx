"use client";

import React, { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FlipCard } from "./ui/flip-card";
import { UseCase } from "@/lib/types";

interface UseCasesProps {
  useCases?: UseCase[];
}

const CAPABILITY_CARDS = [
  {
    index: "01",
    title: "ENQUIRIES",
    subtitle: "Answer repetitive customer questions.",
    explanation: "Answers incoming questions about hours, services, pricing, and locations directly from your verified business data.",
    workflow: ["Question", "Understand", "Answer", "Resolved"],
    outcome: "Resolved in 1.2s without staff interruption.",
    tiltClass: "lg:rotate-[-0.5deg]",
  },
  {
    index: "02",
    title: "BOOKINGS",
    subtitle: "Handle reservations and appointments.",
    explanation: "Checks live calendar availability and locks confirmed appointments directly into your scheduling software.",
    workflow: ["Request", "Check Availability", "Reserve", "Confirm"],
    outcome: "Works with existing booking systems.",
    tiltClass: "lg:rotate-[0.5deg]",
  },
  {
    index: "03",
    title: "QUALIFICATION",
    subtitle: "Capture requirements and identify intent.",
    explanation: "Gathers caller budget, project timeline, and specific needs before passing verified profiles to your specialists.",
    workflow: ["Ask", "Collect", "Qualify", "Pass Result"],
    outcome: "High-intent buyer verified in CRM.",
    tiltClass: "lg:rotate-[-0.5deg]",
  },
  {
    index: "04",
    title: "SALES",
    subtitle: "Start structured prospect conversations.",
    explanation: "Answers product scope queries, handles initial pricing considerations, and coordinates introductory discovery meetings.",
    workflow: ["Understand Need", "Answer Scope", "Collect Details", "Route / Follow Up"],
    outcome: "Discovery meeting locked on rep calendar.",
    tiltClass: "lg:rotate-[0.5deg]",
  },
  {
    index: "05",
    title: "SUPPORT",
    subtitle: "Handle first-level customer requests.",
    explanation: "Looks up order numbers, ticket statuses, and guidelines directly from your database, freeing staff for complex issues.",
    workflow: ["Identify Request", "Answer", "Lookup Info", "Escalate if Needed"],
    outcome: "Routine ticket closed without human delay.",
    tiltClass: "lg:rotate-[-0.5deg]",
  },
  {
    index: "06",
    title: "FOLLOW-UPS",
    subtitle: "Run structured outbound conversations.",
    explanation: "Reaches out automatically to confirm next-day visits, follow up on pending estimates, or confirm job readiness.",
    workflow: ["Context", "Call", "Conversation", "Next Action"],
    outcome: "Estimate converted into scheduled dispatch.",
    tiltClass: "lg:rotate-[0.5deg]",
  },
];

export const UseCasesSection = memo(function UseCasesSection({ useCases }: UseCasesProps) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCardToggle = useCallback((id: string) => {
    setActiveCardId((current) => (current === id ? null : id));
  }, []);

  return (
    <section id="use-cases" className="py-28 md:py-40 relative overflow-hidden bg-[#F5F1E8] dark:bg-[#07090e] border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] transition-colors">
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

        {/* 3D Flip Card Collection (3 Columns Desktop, 1 Column Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CAPABILITY_CARDS.map((card, idx) => (
            <motion.div
              key={card.index}
              initial={{ opacity: 0, y: 20 }}
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
