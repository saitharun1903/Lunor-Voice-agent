"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { UseCase } from "@/lib/types";

interface UseCasesProps {
  useCases?: UseCase[];
}

const CAPABILITIES = [
  {
    id: "enquiries",
    num: "01",
    title: "Customer Enquiries",
    headline: "Answers routine questions instantly with zero hold time.",
    description: "Opening hours, service pricing, directions, policies, and parking answered directly from your verified business knowledge.",
    caller: "What are your operating hours this weekend, and is customer parking available?",
    agent: "We're open Saturday and Sunday from 9:00 AM to 8:00 PM. Free customer parking is located right behind the main entrance on 4th Ave.",
    workflow: ["Question", "Understand", "Answer", "Resolved"],
    outcome: "Resolved in 1.2 seconds without staff interruption",
  },
  {
    id: "bookings",
    num: "02",
    title: "Reservations & Scheduling",
    headline: "Checks calendar availability and locks confirmed slots.",
    description: "Connects directly with your Google Calendar, Outlook, or booking software to schedule visits, consultations, and reservations.",
    caller: "I'd like to book an appointment for tomorrow afternoon around 3:00 PM.",
    agent: "Tomorrow at 3:00 PM with Dr. Reynolds is open. I've locked that slot for you and sent an SMS confirmation with the invite link.",
    workflow: ["Request", "Availability", "Reserve", "Confirm"],
    outcome: "Slot written directly into your booking system",
  },
  {
    id: "qualification",
    num: "03",
    title: "Lead Qualification",
    headline: "Asks the right questions before routing to your sales team.",
    description: "Gathers caller budget, timeline, and project requirements so your senior specialists receive fully scored, high-intent profiles.",
    caller: "Looking for a 3-bedroom property in Westside with a budget around ₹90 Lakhs.",
    agent: "Recorded your 3-bedroom preference, ₹90L budget, and next-month timeline. A senior property specialist has received your verified profile.",
    workflow: ["Question", "Requirement", "Score", "Qualify"],
    outcome: "High-intent buyer verified and logged in CRM",
  },
  {
    id: "sales",
    num: "04",
    title: "Sales Discovery",
    headline: "Engages high-intent inbound prospects and schedules demos.",
    description: "Answers product scope queries, handles initial pricing considerations, and coordinates introductory discovery meetings.",
    caller: "How does your phone integration connect with our existing carrier lines?",
    agent: "You can keep your existing phone number via simple call forwarding or direct SIP trunking. Would you like to schedule a 15-minute setup review?",
    workflow: ["Inquire", "Verify Scope", "Coordinate", "Invite"],
    outcome: "Introductory demo scheduled on representative's calendar",
  },
  {
    id: "support",
    num: "05",
    title: "Tier-One Support",
    headline: "Resolves common status lookups and guided troubleshooting.",
    description: "Looks up order numbers, ticket statuses, and returns policies directly from your database, freeing support staff for complex issues.",
    caller: "Can you check the current status of service ticket #7842?",
    agent: "Ticket #7842 was completed this morning by technician Marcus. A complete service report has been emailed to your account address.",
    workflow: ["Lookup", "Fetch DB", "Explain", "Dispatch"],
    outcome: "Routine inquiry closed without human intervention",
  },
  {
    id: "followups",
    num: "06",
    title: "Outbound Follow-ups",
    headline: "Automates appointment confirmations and callback workflows.",
    description: "Reaches out automatically to confirm next-day visits, follow up on pending estimates, or confirm job readiness.",
    caller: "Hi, calling back regarding the commercial quote emailed yesterday.",
    agent: "I see your estimate was approved. Would you like me to schedule the technician dispatch for this Thursday morning?",
    workflow: ["Initiate", "Context", "Confirm", "Dispatch"],
    outcome: "Estimate converted into scheduled dispatch",
  },
];

export const UseCasesSection = memo(function UseCasesSection({ useCases }: UseCasesProps) {
  const [selectedId, setSelectedId] = useState<string>("enquiries");

  const currentCase =
    CAPABILITIES.find((c) => c.id === selectedId) || CAPABILITIES[0];

  return (
    <section id="use-cases" className="py-28 md:py-40 relative overflow-hidden chapter-ivory border-t border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
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
            What VoiceOps automates.
          </h2>

          <p className="type-sans-body-lg text-zinc-600 dark:text-zinc-400 max-w-xl font-normal leading-relaxed">
            Every business has specific call patterns. VoiceOps is configured around your exact procedures, questions, and software.
          </p>
        </motion.div>

        {/* Editorial Two-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Calm Typographic Ledger with Gliding Active Pill */}
          <div className="lg:col-span-5 space-y-2">
            {CAPABILITIES.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center justify-between group outline-none relative ${
                    isSelected
                      ? "bg-black/[0.06] dark:bg-white/[0.08]"
                      : "hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-baseline gap-4 relative z-10">
                    <span
                      className={`font-mono text-xs font-bold transition-colors ${
                        isSelected
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                      }`}
                    >
                      {item.num}
                    </span>
                    <span
                      className={`font-sans text-base transition-colors ${
                        isSelected
                          ? "font-semibold text-zinc-950 dark:text-white"
                          : "font-normal text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-zinc-200"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-mono transition-opacity relative z-10 ${
                      isSelected
                        ? "text-blue-600 dark:text-blue-400 opacity-100"
                        : "opacity-0 group-hover:opacity-60"
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: One Changing Workflow Canvas with Smooth Layout Animations */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#0c0f18] border border-black/[0.08] dark:border-white/[0.09] shadow-xl space-y-6"
              >
                {/* Header */}
                <div className="border-b border-black/[0.06] dark:border-white/[0.07] pb-5 space-y-2">
                  <span className="type-editorial-eyebrow text-blue-600 dark:text-blue-400 block">
                    CAPABILITY #{currentCase.num}
                  </span>
                  <h3 className="font-serif text-2xl text-zinc-950 dark:text-white font-normal leading-snug">
                    {currentCase.headline}
                  </h3>
                  <p className="type-sans-body-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {currentCase.description}
                  </p>
                </div>

                {/* Clear Dialogue Example */}
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] space-y-1">
                    <span className="text-[11px] font-sans font-medium text-zinc-500 block">Caller</span>
                    <p className="font-sans text-sm text-zinc-900 dark:text-zinc-100 font-normal">
                      “{currentCase.caller}”
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-600/[0.04] dark:bg-blue-600/[0.07] border border-blue-600/20 space-y-1">
                    <span className="text-[11px] font-sans font-semibold text-blue-600 dark:text-blue-400 block">VoiceOps</span>
                    <p className="font-sans text-sm text-zinc-950 dark:text-white font-medium">
                      “{currentCase.agent}”
                    </p>
                  </div>
                </div>

                {/* 4-Step Process Progression Line */}
                <div className="pt-2">
                  <span className="type-editorial-eyebrow text-zinc-400 block mb-3">
                    EXECUTION PATHWAY
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                    {currentCase.workflow.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] text-zinc-700 dark:text-zinc-300 flex flex-col justify-between"
                      >
                        <span className="text-[9px] text-zinc-400 block mb-1">0{idx + 1}</span>
                        <span className="font-sans leading-tight font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Outcome Banner */}
                <div className="p-3.5 rounded-xl bg-emerald-500/[0.08] dark:bg-emerald-500/[0.1] border border-emerald-500/20 flex items-center justify-between text-xs">
                  <span className="font-sans font-medium text-emerald-700 dark:text-emerald-300">
                    {currentCase.outcome}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                    VERIFIED
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});
