"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { UseCase } from "@/lib/types";

interface UseCasesProps {
  useCases: UseCase[];
}

const SAMPLE_DIALOGUES: Record<string, { caller: string; agent: string; workflow: string[] }> = {
  "customer-enquiries": {
    caller: "What are your holiday hours, and do you have parking on-site?",
    agent: "We're open until 9 PM tonight, and we have complimentary guest parking behind the building on 4th Ave.",
    workflow: ["Intent Recognition", "Knowledge Base Lookup", "Natural Audio Delivery"],
  },
  "reservations-bookings": {
    caller: "I'd like to book a consultation for tomorrow afternoon at 3:00 PM.",
    agent: "Tomorrow at 3:00 PM is open. I've reserved that slot for you and dispatched a confirmation to your phone.",
    workflow: ["Live Calendar Slot Query", "Conflict Avoidance", "Bi-directional Booking Sync"],
  },
  "lead-qualification": {
    caller: "I'm looking to buy a 3-bedroom home in Westside with a budget of $1.2M.",
    agent: "Excellent. I've logged your location criteria and pre-approval status. Our senior broker is preparing listing matches for you.",
    workflow: ["Budget & Timeline Intake", "Criteria Verification", "High-Priority Agent Alert"],
  },
  "sales-conversations": {
    caller: "How does your enterprise deployment compare to standard setup?",
    agent: "Our enterprise tier includes custom SIP routing, SLA guarantees, and dedicated webhook sync. Let's schedule your technical scoping call.",
    workflow: ["Requirement Discovery", "Tier Qualification", "Executive Calendar Dispatch"],
  },
  "customer-support": {
    caller: "I need to check the status of work order #8491.",
    agent: "Work order #8491 was marked completed at 11:30 AM today by our technician. Would you like the full report texted to you?",
    workflow: ["Database Query", "Identity Confirmation", "SMS Status Notification"],
  },
  "follow-ups": {
    caller: "Just calling back regarding the inspection estimate sent yesterday.",
    agent: "I see your estimate was approved. Would you like me to schedule the technician dispatch for this Thursday morning?",
    workflow: ["CRM Record Lookup", "Approval Status Check", "Dispatch Coordination"],
  },
  "information-collection": {
    caller: "I want to file an intake for the commercial lease inquiry.",
    agent: "I'll take your company name, square footage requirement, and target lease start date right now.",
    workflow: ["Multi-field Structured Intake", "Data Normalization", "Instant CRM Record Injection"],
  },
  "call-routing": {
    caller: "I have an urgent billing dispute that requires an account manager.",
    agent: "Understood. I am executing an immediate warm transfer to Sarah in Accounts with your full account history.",
    workflow: ["Priority Evaluation", "SIP REFER Hand-off", "Warm Agent Context Delivery"],
  },
};

export const UseCasesSection = memo(function UseCasesSection({ useCases }: UseCasesProps) {
  const [selectedId, setSelectedId] = useState<string>("customer-enquiries");
  const activeCases = useCases.filter((uc) => uc.active);

  const selectedCase = activeCases.find((c) => c.id === selectedId) || activeCases[0];
  const dialogueData = SAMPLE_DIALOGUES[selectedId] || {
    caller: "I have a question regarding your business services.",
    agent: "I can answer your questions, capture requirements, or schedule a direct consultation.",
    workflow: ["Caller Intent Analysis", "Business Action Trigger", "CRM Dispatch"],
  };

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="use-cases" className="py-24 md:py-32 relative overflow-hidden bg-black/[0.015] dark:bg-white/[0.015] border-y border-black/[0.04] dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 mb-4 uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>Universal Business Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-5">
            What can Luno automate?
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto text-balance">
            From high-intent inquiries and automated booking to complex lead qualification and warm human routing, Luno handles structured business conversations.
          </p>
        </div>

        {/* Editorial Split Layout: Left Stacked Rows / Right Product Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Numbered Editorial Capability Rows */}
          <div className="lg:col-span-6 space-y-2">
            {activeCases.map((uc, index) => {
              const isSelected = selectedId === uc.id;
              const formattedNumber = String(index + 1).padStart(2, "0");

              return (
                <button
                  key={uc.id}
                  onClick={() => setSelectedId(uc.id)}
                  className={`w-full text-left p-4.5 rounded-2xl transition-all duration-150 border flex items-center justify-between group ${
                    isSelected
                      ? "bg-white dark:bg-zinc-900 border-blue-500/30 dark:border-blue-400/40 shadow-md"
                      : "bg-white/40 dark:bg-white/[0.03] border-transparent hover:border-black/[0.06] dark:hover:border-white/[0.08] hover:bg-white/80 dark:hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono font-bold transition-colors ${
                        isSelected
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
                      }`}
                    >
                      {formattedNumber}
                    </span>
                    <div>
                      <h3
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isSelected
                            ? "text-zinc-950 dark:text-white"
                            : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white"
                        }`}
                      >
                        {uc.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                        {uc.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? "text-blue-600 dark:text-blue-400 translate-x-1"
                        : "text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Conversational Simulation & Workflow Preview */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.12] shadow-xl relative overflow-hidden space-y-6"
              >
                {/* Top Specular Line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                {/* Capability Header */}
                <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                      Capability Preview
                    </span>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white mt-0.5">
                      {selectedCase.title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Workflow
                  </span>
                </div>

                {/* Live Dialogue Exchange */}
                <div className="space-y-3.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    Live Dialogue Interaction
                  </span>

                  {/* Caller */}
                  <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-xs sm:text-sm">
                    <span className="font-semibold text-zinc-500 text-[11px] block mb-1">
                      Caller:
                    </span>
                    <p className="text-zinc-800 dark:text-zinc-200">
                      “{dialogueData.caller}”
                    </p>
                  </div>

                  {/* Luno Agent */}
                  <div className="p-4 rounded-2xl bg-blue-500/[0.07] dark:bg-blue-500/15 border border-blue-500/20 text-xs sm:text-sm">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 text-[11px] block mb-1">
                      Luno Voice Agent:
                    </span>
                    <p className="text-zinc-900 dark:text-white font-medium">
                      “{dialogueData.agent}”
                    </p>
                  </div>
                </div>

                {/* Real-time Business Pipeline */}
                <div className="space-y-2 pt-2 border-t border-black/[0.05] dark:border-white/[0.06]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    Automated Actions Executed:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {dialogueData.workflow.map((action, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-center"
                      >
                        <span className="text-[10px] font-mono text-zinc-400 block mb-0.5">
                          Step {i + 1}
                        </span>
                        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                          {action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <button
                    onClick={scrollToContact}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold glass-button-primary shadow-md"
                  >
                    <span>Configure {selectedCase.title} for Your Calls</span>
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
