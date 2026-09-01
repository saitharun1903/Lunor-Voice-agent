"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { UseCase } from "@/lib/types";

interface UseCasesProps {
  useCases?: UseCase[];
}

const DEFAULT_EDITORIAL_CASES = [
  {
    id: "enquiries",
    num: "01",
    title: "ENQUIRIES",
    headline: "Customer Enquiries & Information",
    description: "Understand and respond to repetitive customer questions regarding pricing, location, policies, opening hours, and service specifications without hold times.",
    caller: "What are your holiday hours, and do you have guest parking on-site?",
    agent: "We're open until 9 PM tonight, and we have complimentary guest parking behind the main building on 4th Ave.",
    pipeline: ["CALL INTENT", "KNOWLEDGE BASE", "SPEECH SYNTHESIS"],
    actions: ["Instant intent parsing", "Knowledge base vector query", "Sub-400ms audio response"],
  },
  {
    id: "bookings",
    num: "02",
    title: "BOOKINGS",
    headline: "Reservations, Appointments & Scheduling",
    description: "Check real-time calendar availability, resolve scheduling conflicts, reserve slots directly into your booking software, and trigger instant SMS confirmations.",
    caller: "I'd like to book a private consultation for tomorrow afternoon at 3:00 PM.",
    agent: "Tomorrow at 3:00 PM is open. I've reserved that slot for you and dispatched an SMS confirmation with the calendar invite.",
    pipeline: ["AVAILABILITY QUERY", "CONFLICT PREVENTION", "CALENDAR HOLD", "SMS CONFIRMATION"],
    actions: ["Real-time calendar slot query", "Zero double-booking guarantee", "Instant SMS calendar dispatch"],
  },
  {
    id: "qualification",
    num: "03",
    title: "QUALIFICATION",
    headline: "Inbound Lead Qualification",
    description: "Ask structured questions to determine caller budget, urgency, location, timeline, and project suitability before routing to senior brokers or sales reps.",
    caller: "I'm looking to purchase a 3-bedroom property in Westside with a budget of ₹90L.",
    agent: "Understood. I've logged your location criteria, budget, and pre-approval status. Our senior broker is preparing matching property listings for you.",
    pipeline: ["REQUIREMENT CAPTURE", "BUDGET NORMALIZATION", "CRM SCORE", "PRIORITY ROUTING"],
    actions: ["Budget & timeline intake", "Criteria scoring", "High-priority CRM injection"],
  },
  {
    id: "sales",
    num: "04",
    title: "SALES",
    headline: "First-Layer Sales Conversations",
    description: "Engage inbound prospective buyers with product details, answer common objection queries, collect contact data, and book high-intent consultation meetings.",
    caller: "How does your enterprise telephony setup compare to standard call forwarding?",
    agent: "Our enterprise tier includes custom carrier SIP routing, SLA guarantees, and dedicated webhook sync. Let's schedule your technical scoping call.",
    pipeline: ["INTENT SCOPING", "OBJECTION HANDLING", "DISCOVERY DISPATCH"],
    actions: ["Requirement extraction", "Tier qualification", "Executive calendar dispatch"],
  },
  {
    id: "support",
    num: "05",
    title: "SUPPORT",
    headline: "Tier-One Customer Support",
    description: "Resolve common tier-one customer service questions, provide work order status lookups, and guide callers through structured troubleshooting.",
    caller: "I need to check the status of repair work order #8491.",
    agent: "Work order #8491 was marked completed at 11:30 AM today by our technician. Would you like the full technician report texted to your phone?",
    pipeline: ["IDENTITY VERIFICATION", "DATABASE QUERY", "STATUS LOGGING"],
    actions: ["Database record query", "Customer verification", "SMS status notification"],
  },
  {
    id: "followups",
    num: "06",
    title: "FOLLOW-UPS",
    headline: "Structured Outbound & Callback Coordination",
    description: "Conduct structured outbound calls for booking confirmations, appointment reminders, estimate check-ins, and feedback collection.",
    caller: "Just calling back regarding the service estimate emailed yesterday.",
    agent: "I see your estimate was approved. Would you like me to schedule the technician dispatch for this Thursday morning?",
    pipeline: ["ESTIMATE MATCH", "STATUS CHECK", "DISPATCH HOLD"],
    actions: ["CRM record lookup", "Approval verification", "Dispatch schedule sync"],
  },
];

export const UseCasesSection = memo(function UseCasesSection({ useCases }: UseCasesProps) {
  const [selectedId, setSelectedId] = useState<string>("enquiries");

  const currentCase =
    DEFAULT_EDITORIAL_CASES.find((c) => c.id === selectedId) ||
    DEFAULT_EDITORIAL_CASES[0];

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="use-cases" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4 uppercase">
            <span>Capabilities Ledger</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.035em] text-zinc-950 dark:text-white mb-5">
            What Lunor automates.
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            From high-volume customer inquiries and calendar bookings to multi-field lead qualification and warm human handoffs, Lunor handles structured business conversations.
          </p>
        </div>

        {/* Editorial Split: Numbered Index List on Left / Sticky Product Architecture Blueprint on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 01-06 Magazine Style Typographic Index */}
          <div className="lg:col-span-6 divide-y divide-black/[0.06] dark:divide-white/[0.08]">
            {DEFAULT_EDITORIAL_CASES.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left py-5 px-3 transition-colors flex items-center justify-between group rounded-xl ${
                    isSelected
                      ? "bg-black/[0.03] dark:bg-white/[0.04]"
                      : "hover:bg-black/[0.015] dark:hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-xs font-mono font-bold transition-colors mt-0.5 ${
                        isSelected
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
                      }`}
                    >
                      {item.num}
                    </span>
                    <div>
                      <h3
                        className={`text-base sm:text-lg font-bold transition-colors ${
                          isSelected
                            ? "text-zinc-950 dark:text-white"
                            : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-md line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected
                        ? "text-blue-600 dark:text-blue-400 translate-x-1"
                        : "text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Sticky Concrete Dialogue & Real-Time Action Execution Visualizer */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.16 }}
                className="rounded-3xl p-6 sm:p-8 structured-card space-y-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                      OPERATIONAL BLUEPRINT {currentCase.num}
                    </span>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white mt-0.5">
                      {currentCase.headline}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                    Live Verified
                  </span>
                </div>

                {/* Pipeline Flow Bar */}
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono font-semibold text-zinc-700 dark:text-zinc-300 overflow-x-auto">
                  {currentCase.pipeline.map((step, i) => (
                    <React.Fragment key={i}>
                      <span className="text-blue-600 dark:text-blue-400">{step}</span>
                      {i < currentCase.pipeline.length - 1 && (
                        <span className="text-zinc-400 px-1">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Dialogue Simulation */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    CONVERSATIONAL EXCHANGE
                  </span>

                  {/* Caller */}
                  <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] text-xs">
                    <span className="text-[10px] font-mono font-bold text-zinc-500 block mb-1">
                      CALLER:
                    </span>
                    <p className="text-zinc-800 dark:text-zinc-200">
                      “{currentCase.caller}”
                    </p>
                  </div>

                  {/* Lunor Agent */}
                  <div className="p-3.5 rounded-2xl bg-blue-500/[0.06] dark:bg-blue-500/10 border border-blue-500/20 text-xs">
                    <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 block mb-1">
                      LUNOR VOICE ENGINE:
                    </span>
                    <p className="text-zinc-900 dark:text-white font-medium">
                      “{currentCase.agent}”
                    </p>
                  </div>
                </div>

                {/* Autonomous Backend Actions */}
                <div className="space-y-2 pt-2 border-t border-black/[0.05] dark:border-white/[0.06]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    ACTIONS EXECUTED IN YOUR STACK:
                  </span>
                  <div className="space-y-1.5">
                    {currentCase.actions.map((act, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <button
                    onClick={scrollToContact}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold btn-solid-primary"
                  >
                    <span>Configure {currentCase.title} for Your Business</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});
