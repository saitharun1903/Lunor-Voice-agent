"use client";

import React, { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CapabilityItem, UseCase } from "@/lib/types";
import { FlipCard } from "@/components/ui/flip-card";
import { MOTION_EASINGS } from "@/lib/motion-config";

interface UseCasesProps {
  useCases?: UseCase[];
  capabilities?: CapabilityItem[];
}

const DEFAULT_CAPABILITIES = [
  {
    id: "enquiries",
    index: "01",
    title: "ENQUIRIES",
    subtitle: "Answer repetitive customer questions instantly.",
    explanation:
      "Answers inbound customer questions regarding business hours, services, pricing, and locations using your verified operational knowledge.",
    workflow: ["Listen & Parse", "Context Lookup", "Precise Answer", "Confirm Satisfied"],
    outcome: "Verified business resolution delivered without waiting on hold",
  },
  {
    id: "bookings",
    index: "02",
    title: "BOOKINGS",
    subtitle: "Handle reservations and appointments automatically.",
    explanation:
      "Gathers date and time preferences, checks real-time calendar availability, and locks confirmed bookings directly into your scheduling software.",
    workflow: ["Request Preference", "Calendar Lookup", "Slot Allocation", "SMS Confirmation"],
    outcome: "Guaranteed calendar slot committed with zero scheduling friction",
  },
  {
    id: "qualification",
    index: "03",
    title: "QUALIFICATION",
    subtitle: "Capture requirements and score caller intent.",
    explanation:
      "Asks structured qualifying questions to identify project scope, budget, and timeline before escalating qualified opportunities to your team.",
    workflow: ["Requirement Discovery", "Budget & Scope", "Intent Scoring", "Priority Routing"],
    outcome: "High-intent lead captured and routed with structured notes",
  },
  {
    id: "sales-intake",
    index: "04",
    title: "SALES INTAKE",
    subtitle: "Support inbound sales conversations around the clock.",
    explanation:
      "Provides product details, answers questions, and captures buyer contact details for immediate team follow-up.",
    workflow: ["Intent Recognition", "Objection Handling", "Specification Match", "Staff Notification"],
    outcome: "100% inbound capture during peak hours, nights, and weekends",
  },
  {
    id: "routine-support",
    index: "05",
    title: "ROUTINE SUPPORT",
    subtitle: "Resolve common customer inquiries autonomously.",
    explanation:
      "Guides callers through standard account lookups, order status checks, and common troubleshooting without hold delays.",
    workflow: ["Identify Issue", "Verify Account", "Apply Resolution", "Confirm Resolution"],
    outcome: "First-contact resolution without burdening front-line staff",
  },
  {
    id: "structured-follow-ups",
    index: "06",
    title: "STRUCTURED FOLLOW-UPS",
    subtitle: "Automate outbound reminders and booking updates.",
    explanation:
      "Calls customers to confirm upcoming appointments, follow up on quotes, or deliver order updates automatically.",
    workflow: ["Scheduled Dial", "Identity Check", "Status Update", "Response Sync"],
    outcome: "Dramatic reduction in no-shows and missed appointment slots",
  },
];

export const UseCasesSection = memo(function UseCasesSection({
  capabilities,
}: UseCasesProps) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const items =
    capabilities && capabilities.length > 0
      ? capabilities.map((c, idx) => ({
          id: `cap-${idx}`,
          index: c.index || String(idx + 1).padStart(2, "0"),
          title: c.title,
          subtitle: c.subtitle,
          explanation: c.explanation,
          workflow:
            c.workflow && c.workflow.length > 0
              ? c.workflow
              : ["Ask", "Understand", "Answer", "Resolve"],
          outcome: c.outcome,
        }))
      : DEFAULT_CAPABILITIES;

  const handleToggle = useCallback((idx: number) => {
    // Exactly one active card: clicking one closes any other open card
    setFlippedIndex((prev) => (prev === idx ? null : idx));
  }, []);

  return (
    <section
      id="capabilities"
      aria-label="VoiceOps Autonomous Phone Capabilities"
      className="py-20 sm:py-24 md:py-28 relative overflow-hidden bg-white dark:bg-[#07090e] border-t border-slate-100 dark:border-white/[0.08] transition-colors scroll-mt-16"
    >
      <div id="use-cases" className="absolute top-0 pointer-events-none" />

      {/* Downward Continuity Beam from Live Demo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-10 bg-gradient-to-b from-blue-600 via-blue-500 to-transparent pointer-events-none z-10 opacity-70" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: MOTION_EASINGS.editorial }}
          className="max-w-3xl mb-14 sm:mb-18 text-left space-y-3"
        >
          <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
            AUTONOMOUS TELEPHONY CAPABILITIES
          </p>

          <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal text-3xl sm:text-4xl md:text-5xl">
            Autonomous phone capabilities.
          </h2>

          <p className="type-sans-body-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal text-sm sm:text-base">
            Select any card to explore its conversational execution pathway and verified business outcome.
          </p>
        </motion.div>

        {/* 3D Interactive Capabilities Grid (Exactly One Card Open) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {items.map((item, idx) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: MOTION_EASINGS.editorial }}
            >
              <FlipCard
                id={item.id}
                index={item.index}
                title={item.title}
                subtitle={item.subtitle}
                explanation={item.explanation}
                workflow={item.workflow}
                outcome={item.outcome}
                isFlipped={flippedIndex === idx}
                onToggle={() => handleToggle(idx)}
              />
            </motion.div>
          ))}
        </div>

        {/* Quiet Bottom Editorial Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 pt-8 border-t border-slate-100 dark:border-white/[0.08] flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs text-zinc-500 font-sans"
        >
          <span>All 6 capabilities adapt dynamically to your company&apos;s custom knowledge base and booking software.</span>
          <span className="font-mono text-zinc-400">Deterministic First-Layer Resolution</span>
        </motion.div>
      </div>
    </section>
  );
});
