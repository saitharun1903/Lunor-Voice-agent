"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { UseCase } from "@/lib/types";

interface UseCasesProps {
  useCases?: UseCase[];
}

const EDITORIAL_CASES = [
  {
    id: "enquiries",
    num: "01",
    title: "Enquiries",
    headline: "Instant Customer Answers",
    description: "Understand questions regarding pricing, location, policies, opening hours, and service details with zero hold time.",
    caller: "What are your holiday hours, and do you have guest parking on-site?",
    agent: "We're open until 9 PM tonight, and we have complimentary guest parking behind the main building on 4th Ave.",
    workflow: ["Listen to Question", "Look up Information", "Answer Naturally"],
    outcome: "Answers provided instantly without staff intervention.",
  },
  {
    id: "bookings",
    num: "02",
    title: "Bookings",
    headline: "Calendar Reservations & Scheduling",
    description: "Check live calendar availability, reserve open slots directly, and send instant confirmation messages.",
    caller: "I'd like to book a consultation for tomorrow afternoon at 3:00 PM.",
    agent: "Tomorrow at 3:00 PM is open. I've reserved that slot for you and sent an SMS confirmation with the calendar invite.",
    workflow: ["Check Availability", "Verify Slot", "Reserve & Confirm"],
    outcome: "Appointment booked directly in your calendar with SMS confirmation.",
  },
  {
    id: "qualification",
    num: "03",
    title: "Qualification",
    headline: "Lead Intake & Qualification",
    description: "Ask structured questions to understand caller budget, location, urgency, and project requirements before routing to your team.",
    caller: "I'm looking to buy a 3-bedroom property in Westside with a budget of ₹90L.",
    agent: "Understood. I've recorded your criteria, budget, and timeline. Our senior broker is preparing matching property listings for you.",
    workflow: ["Ask Criteria", "Understand Needs", "Qualify Lead"],
    outcome: "Qualified lead details logged and routed to the right team member.",
  },
  {
    id: "sales",
    num: "04",
    title: "Sales",
    headline: "First-Layer Sales Discovery",
    description: "Engage prospective buyers with product details, answer common questions, and schedule sales discovery calls.",
    caller: "How does your phone integration work with our existing phone carrier?",
    agent: "You can keep your existing phone number via simple call forwarding or direct SIP trunking. Would you like to schedule a quick 10-minute setup call?",
    workflow: ["Understand Interest", "Address Questions", "Schedule Call"],
    outcome: "Discovery call scheduled directly onto your sales team calendar.",
  },
  {
    id: "support",
    num: "05",
    title: "Support",
    headline: "Tier-One Support & Lookups",
    description: "Resolve common support questions, look up order and ticket statuses, and guide callers through straightforward troubleshooting.",
    caller: "I need to check the status of repair work order #8491.",
    agent: "Work order #8491 was marked completed at 11:30 AM today by our technician. I can text you the full report if you'd like.",
    workflow: ["Verify Identity", "Check Status", "Send Summary"],
    outcome: "Status looked up and summary texted to customer automatically.",
  },
  {
    id: "followups",
    num: "06",
    title: "Follow-ups",
    headline: "Outbound Reminders & Callbacks",
    description: "Conduct structured outbound calls for booking confirmations, appointment reminders, estimate follow-ups, and feedback.",
    caller: "Just calling back regarding the service estimate emailed yesterday.",
    agent: "I see your estimate was approved. Would you like me to schedule the technician dispatch for this Thursday morning?",
    workflow: ["Match Estimate", "Verify Approval", "Schedule Dispatch"],
    outcome: "Follow-up completed and next steps confirmed in your system.",
  },
];

export const UseCasesSection = memo(function UseCasesSection({ useCases }: UseCasesProps) {
  const [selectedId, setSelectedId] = useState<string>("enquiries");

  const currentCase =
    EDITORIAL_CASES.find((c) => c.id === selectedId) || EDITORIAL_CASES[0];

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="use-cases" className="py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full type-eyebrow text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-3">
            <span>Capabilities</span>
          </div>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-3">
            What Lunor automates.
          </h2>

          <p className="type-body text-zinc-600 dark:text-zinc-400">
            From everyday customer enquiries and calendar bookings to lead qualification and warm handoffs, Lunor handles structured business calls.
          </p>
        </div>

        {/* Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 01-06 Fast-Scanning List */}
          <div className="lg:col-span-5 divide-y divide-black/[0.04] dark:divide-white/[0.05]">
            {EDITORIAL_CASES.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left py-3.5 px-3 transition-all flex items-center justify-between group rounded-xl ${
                    isSelected
                      ? "bg-black/[0.025] dark:bg-white/[0.04]"
                      : "hover:bg-black/[0.015] dark:hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-start gap-3">
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
                      <p className="type-body-sm text-zinc-500 dark:text-zinc-400 mt-0.5 max-w-sm line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected
                        ? "text-blue-600 dark:text-blue-400 translate-x-0.5"
                        : "text-zinc-300 dark:text-zinc-600"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Sticky Clean Workflow Preview */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="rounded-2xl p-6 structured-card space-y-4 shadow-sm"
              >
                {/* Header */}
                <div className="border-b border-black/[0.04] dark:border-white/[0.05] pb-3">
                  <span className="type-eyebrow text-blue-600 dark:text-blue-400 block">
                    Workflow {currentCase.num}
                  </span>
                  <h3 className="type-h3 text-zinc-950 dark:text-white mt-0.5">
                    {currentCase.headline}
                  </h3>
                </div>

                {/* Workflow Steps */}
                <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.025] border border-black/[0.03] dark:border-white/[0.04] flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300">
                  {currentCase.workflow.map((step, i) => (
                    <React.Fragment key={i}>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{step}</span>
                      {i < currentCase.workflow.length - 1 && (
                        <span className="text-zinc-400">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Conversation Snippet */}
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-black/[0.015] dark:bg-white/[0.02] border border-black/[0.03] dark:border-white/[0.04]">
                    <span className="type-eyebrow text-zinc-400 block mb-0.5">Caller</span>
                    <p className="type-body-sm text-zinc-800 dark:text-zinc-200">
                      “{currentCase.caller}”
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-500/[0.04] dark:bg-blue-500/[0.08] border border-blue-500/15">
                    <span className="type-eyebrow text-blue-600 dark:text-blue-400 block mb-0.5">Lunor</span>
                    <p className="type-body-sm font-medium text-zinc-950 dark:text-white">
                      “{currentCase.agent}”
                    </p>
                  </div>
                </div>

                {/* Outcome */}
                <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between gap-4">
                  <p className="type-body-sm text-zinc-600 dark:text-zinc-400">
                    {currentCase.outcome}
                  </p>
                  <button
                    onClick={scrollToContact}
                    className="shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold btn-solid-primary shadow-sm"
                  >
                    <span>Deploy This</span>
                    <ArrowRight className="w-3 h-3" />
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
