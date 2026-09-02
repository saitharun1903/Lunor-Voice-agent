"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, CheckCircle2, Play, RefreshCw, Terminal, Layers } from "lucide-react";
import { UseCase } from "@/lib/types";

interface UseCasesProps {
  useCases?: UseCase[];
}

const DEFAULT_EDITORIAL_CASES = [
  {
    id: "enquiries",
    num: "01",
    title: "ENQUIRIES",
    headline: "Instant Customer Inquiries & Knowledge Base",
    description: "Understand and resolve repetitive customer questions regarding pricing, location, policies, opening hours, and service specifications with zero hold times.",
    caller: "What are your holiday hours, and do you have guest parking on-site?",
    agent: "We're open until 9 PM tonight, and we have complimentary guest parking behind the main building on 4th Ave.",
    pipeline: ["INTENT PARSER", "VECTOR RAG", "SPEECH SYNTHESIS"],
    extractedData: { intent: "Business Hours & Parking", location: "4th Ave Main", resolution: "Instant Sub-400ms Response" },
    actions: ["Instant intent parsing", "Knowledge base vector query", "Sub-400ms audio response"],
  },
  {
    id: "bookings",
    num: "02",
    title: "BOOKINGS",
    headline: "Conflict-Free Calendar Scheduling",
    description: "Query real-time calendar availability, resolve scheduling conflicts, reserve slots directly into booking software, and trigger instant SMS confirmations.",
    caller: "I'd like to book a private consultation for tomorrow afternoon at 3:00 PM.",
    agent: "Tomorrow at 3:00 PM is open. I've reserved that slot for you and dispatched an SMS confirmation with the calendar invite.",
    pipeline: ["AVAILABILITY QUERY", "CONFLICT PREVENTION", "CALENDAR HOLD", "SMS CONFIRMATION"],
    extractedData: { service: "Private Consultation", slot: "Tomorrow 3:00 PM EST", status: "Slot Reserved & Confirmed" },
    actions: ["Real-time calendar slot query", "Zero double-booking guarantee", "Instant SMS calendar dispatch"],
  },
  {
    id: "qualification",
    num: "03",
    title: "QUALIFICATION",
    headline: "Multi-Tier Inbound Lead Qualification",
    description: "Ask structured questions to extract caller budget, urgency, location, timeline, and project suitability before routing to senior brokers or sales reps.",
    caller: "I'm looking to purchase a 3-bedroom property in Westside with a budget of ₹90L.",
    agent: "Understood. I've logged your location criteria, budget, and pre-approval status. Our senior broker is preparing matching property listings for you.",
    pipeline: ["REQUIREMENT CAPTURE", "BUDGET NORMALIZATION", "CRM SCORE", "PRIORITY ROUTING"],
    extractedData: { propertyType: "3BHK", targetLocation: "Westside", budget: "₹90,00,000", leadTier: "Tier 1 High Intent" },
    actions: ["Budget & timeline intake", "Criteria scoring", "High-priority CRM injection"],
  },
  {
    id: "sales",
    num: "04",
    title: "SALES",
    headline: "First-Layer Sales Discovery",
    description: "Engage inbound prospective buyers with product details, answer common objection queries, collect contact data, and book high-intent discovery calls.",
    caller: "How does your enterprise telephony setup compare to standard call forwarding?",
    agent: "Our enterprise tier includes custom carrier SIP routing, SLA guarantees, and dedicated webhook sync. Let's schedule your technical scoping call.",
    pipeline: ["INTENT SCOPING", "OBJECTION HANDLING", "DISCOVERY DISPATCH"],
    extractedData: { interest: "Enterprise SIP Routing", inquiryType: "Technical Scoping", action: "Discovery Call Scheduled" },
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
    extractedData: { workOrderId: "#8491", status: "Completed 11:30 AM", customerAlert: "SMS Report Dispatched" },
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
    extractedData: { estimateStatus: "Approved", scheduledDispatch: "Thursday 09:30 AM", systemSync: "FieldService Updated" },
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full type-eyebrow text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Capabilities Playground</span>
          </div>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-5">
            What Lunor automates.
          </h2>

          <p className="type-body-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            From customer inquiries and calendar bookings to multi-field lead qualification and warm human handoffs, Lunor handles structured business conversations.
          </p>
        </div>

        {/* Editorial Split: Numbered Index List on Left / Sticky Product Architecture Blueprint on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 01-06 Typographic Index with Comfortable Reading Measure */}
          <div className="lg:col-span-5 divide-y divide-black/[0.06] dark:divide-white/[0.08]">
            {DEFAULT_EDITORIAL_CASES.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left py-5 px-4 transition-all flex items-center justify-between group rounded-2xl ${
                    isSelected
                      ? "bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08]"
                      : "hover:bg-black/[0.015] dark:hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`type-label-tech font-bold transition-colors mt-0.5 ${
                        isSelected
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
                      }`}
                    >
                      {item.num}
                    </span>
                    <div>
                      <h3
                        className={`type-h3 transition-colors ${
                          isSelected
                            ? "text-zinc-950 dark:text-white"
                            : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="type-body-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm line-clamp-2">
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

          {/* Right Column: Sticky Live Call Simulator & Real-Time Action Execution Visualizer */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.16 }}
                className="rounded-3xl p-6 sm:p-8 structured-card space-y-6 shadow-xl"
              >
                {/* Simulator Header */}
                <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-4">
                  <div className="space-y-0.5">
                    <span className="type-label-tech text-blue-600 dark:text-blue-400 font-bold block">
                      CALL SIMULATION {currentCase.num}
                    </span>
                    <h3 className="type-h3 text-zinc-950 dark:text-white">
                      {currentCase.headline}
                    </h3>
                  </div>
                  <span className="type-label-tech px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    LIVE VERIFIED
                  </span>
                </div>

                {/* Pipeline Flow Bar */}
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between type-label-tech text-zinc-700 dark:text-zinc-300 overflow-x-auto">
                  {currentCase.pipeline.map((step, i) => (
                    <React.Fragment key={i}>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold whitespace-nowrap">{step}</span>
                      {i < currentCase.pipeline.length - 1 && (
                        <span className="text-zinc-400 px-1.5">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Dialogue Simulation Stream */}
                <div className="space-y-3">
                  <span className="type-eyebrow text-zinc-500 dark:text-zinc-400 block">
                    Conversational Stream
                  </span>

                  {/* Caller */}
                  <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]">
                    <span className="type-label-tech text-zinc-500 block mb-1">
                      CALLER AUDIO:
                    </span>
                    <p className="type-body text-zinc-800 dark:text-zinc-200 font-medium">
                      “{currentCase.caller}”
                    </p>
                  </div>

                  {/* Lunor Agent */}
                  <div className="p-3.5 rounded-2xl bg-blue-500/[0.06] dark:bg-blue-500/10 border border-blue-500/20">
                    <span className="type-label-tech text-blue-600 dark:text-blue-400 block mb-1">
                      LUNOR VOICE AGENT:
                    </span>
                    <p className="type-body font-medium text-zinc-950 dark:text-white">
                      “{currentCase.agent}”
                    </p>
                  </div>
                </div>

                {/* Live Extracted Intent Schema Inspector */}
                <div className="p-3.5 rounded-2xl bg-black/[0.03] dark:bg-black/50 border border-black/[0.05] dark:border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between type-label-tech text-zinc-400 border-b border-black/[0.04] dark:border-white/[0.06] pb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-blue-500" />
                      <span>EXTRACTED INTENT SCHEMA</span>
                    </span>
                    <span className="text-emerald-500 font-semibold">VALIDATED</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {Object.entries(currentCase.extractedData).map(([key, val]) => (
                      <div key={key} className="p-1.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03]">
                        <span className="text-zinc-400 text-[10px] uppercase block">{key}</span>
                        <span className="text-zinc-800 dark:text-zinc-200 font-medium truncate block">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Autonomous Backend Actions */}
                <div className="space-y-2 pt-2 border-t border-black/[0.05] dark:border-white/[0.06]">
                  <span className="type-eyebrow text-zinc-500 dark:text-zinc-400 block">
                    Automated Actions Executed in Stack:
                  </span>
                  <div className="space-y-1.5">
                    {currentCase.actions.map((act, i) => (
                      <div key={i} className="flex items-center gap-2 type-body-sm text-zinc-700 dark:text-zinc-300">
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
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full type-btn btn-solid-primary shadow-lg"
                  >
                    <span>Deploy {currentCase.title} for Your Business</span>
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
