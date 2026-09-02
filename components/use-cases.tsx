"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, CheckCircle2, Layers } from "lucide-react";
import { UseCase } from "@/lib/types";

interface UseCasesProps {
  useCases?: UseCase[];
}

const EDITORIAL_CASES = [
  {
    id: "enquiries",
    num: "01",
    title: "Enquiries",
    headline: "Instant Customer Inquiries",
    description: "Understand customer questions regarding pricing, location, policies, opening hours, and service specifications with zero hold times.",
    caller: "What are your holiday hours, and do you have guest parking on-site?",
    agent: "We're open until 9 PM tonight, and we have complimentary guest parking behind the main building on 4th Ave.",
    workflow: ["Listen to Question", "Look up Information", "Answer Naturally"],
    extracted: { topic: "Hours & Parking", location: "4th Ave Main", status: "Resolved Instantly" },
    actions: ["Instant intent parsing", "Knowledge base lookup", "Natural voice response"],
  },
  {
    id: "bookings",
    num: "02",
    title: "Bookings",
    headline: "Calendar Scheduling & Reservations",
    description: "Check calendar availability in real time, reserve open time slots directly, and send instant confirmation messages.",
    caller: "I'd like to book a consultation for tomorrow afternoon at 3:00 PM.",
    agent: "Tomorrow at 3:00 PM is open. I've reserved that slot for you and sent an SMS confirmation with the calendar invite.",
    workflow: ["Check Availability", "Verify Slot", "Reserve & Confirm"],
    extracted: { service: "Consultation", slot: "Tomorrow 3:00 PM", status: "Confirmed & Texted" },
    actions: ["Calendar availability query", "Double-booking prevention", "SMS calendar invite dispatch"],
  },
  {
    id: "qualification",
    num: "03",
    title: "Qualification",
    headline: "Lead Qualification & Intake",
    description: "Ask structured questions to understand caller budget, location, urgency, and project requirements before handing off to your team.",
    caller: "I'm looking to buy a 3-bedroom property in Westside with a budget of ₹90L.",
    agent: "Understood. I've recorded your criteria, budget, and timeline. Our senior broker is preparing matching property listings for you.",
    workflow: ["Ask Criteria", "Understand Needs", "Collect Details", "Qualify Lead"],
    extracted: { property: "3BHK", location: "Westside", budget: "₹90,00,000", priority: "High Intent" },
    actions: ["Budget & timeline intake", "Lead criteria scoring", "Priority CRM notification"],
  },
  {
    id: "sales",
    num: "04",
    title: "Sales",
    headline: "First-Layer Sales Discovery",
    description: "Engage prospective buyers with product details, answer common questions, collect contact data, and schedule sales discovery calls.",
    caller: "How does your phone integration work with our existing phone carrier?",
    agent: "You can keep your existing phone number via simple call forwarding or direct SIP trunking. Would you like to schedule a quick 10-minute setup call?",
    workflow: ["Understand Interest", "Address Questions", "Schedule Discovery"],
    extracted: { interest: "Carrier Setup", question: "Call Forwarding", nextStep: "Setup Call Scheduled" },
    actions: ["Requirement extraction", "Question answering", "Sales calendar dispatch"],
  },
  {
    id: "support",
    num: "05",
    title: "Support",
    headline: "Tier-One Customer Support",
    description: "Resolve common support questions, look up order and ticket statuses, and guide callers through straightforward troubleshooting.",
    caller: "I need to check the status of repair work order #8491.",
    agent: "Work order #8491 was marked completed at 11:30 AM today by our technician. I can text you the full report if you'd like.",
    workflow: ["Verify Identity", "Check Status", "Send Summary"],
    extracted: { orderNumber: "#8491", currentStatus: "Completed", report: "SMS Dispatched" },
    actions: ["Status database query", "Verification check", "Customer SMS notification"],
  },
  {
    id: "followups",
    num: "06",
    title: "Follow-ups",
    headline: "Structured Callbacks & Reminders",
    description: "Conduct structured outbound calls for booking confirmations, appointment reminders, estimate follow-ups, and feedback.",
    caller: "Just calling back regarding the service estimate emailed yesterday.",
    agent: "I see your estimate was approved. Would you like me to schedule the technician dispatch for this Thursday morning?",
    workflow: ["Match Estimate", "Verify Approval", "Schedule Dispatch"],
    extracted: { estimate: "Approved", dispatchSlot: "Thursday 09:30 AM", systemSync: "Updated" },
    actions: ["Estimate lookup", "Approval confirmation", "Dispatch calendar sync"],
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
    <section id="use-cases" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full type-eyebrow text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-3.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Capabilities</span>
          </div>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-4">
            What Lunor automates.
          </h2>

          <p className="type-body text-zinc-600 dark:text-zinc-400">
            From everyday customer enquiries and calendar bookings to multi-step lead qualification and warm human handoffs, Lunor handles structured business calls.
          </p>
        </div>

        {/* Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 01-06 Typographic Index */}
          <div className="lg:col-span-5 divide-y divide-black/[0.05] dark:divide-white/[0.06]">
            {EDITORIAL_CASES.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left py-4 px-3.5 transition-all flex items-center justify-between group rounded-2xl ${
                    isSelected
                      ? "bg-black/[0.03] dark:bg-white/[0.05]"
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
                      <p className="type-body-sm text-zinc-500 dark:text-zinc-400 mt-0.5 max-w-sm line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected
                        ? "text-blue-600 dark:text-blue-400 translate-x-1"
                        : "text-zinc-300 dark:text-zinc-600"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Sticky Workflow Preview */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="rounded-3xl p-6 sm:p-7 structured-card space-y-5 shadow-lg"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.06] pb-3.5">
                  <div>
                    <span className="type-eyebrow text-blue-600 dark:text-blue-400 block">
                      Workflow {currentCase.num}
                    </span>
                    <h3 className="type-h3 text-zinc-950 dark:text-white mt-0.5">
                      {currentCase.headline}
                    </h3>
                  </div>
                  <span className="type-eyebrow px-2.5 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-300 font-medium">
                    Verified
                  </span>
                </div>

                {/* Workflow Steps */}
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300">
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
                <div className="space-y-2.5">
                  <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]">
                    <span className="type-eyebrow text-zinc-400 block mb-0.5">Caller</span>
                    <p className="type-body-sm text-zinc-800 dark:text-zinc-200">
                      “{currentCase.caller}”
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-blue-500/[0.05] dark:bg-blue-500/10 border border-blue-500/15">
                    <span className="type-eyebrow text-blue-600 dark:text-blue-400 block mb-0.5">Lunor</span>
                    <p className="type-body-sm font-medium text-zinc-950 dark:text-white">
                      “{currentCase.agent}”
                    </p>
                  </div>
                </div>

                {/* Details Captured */}
                <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.05] space-y-1.5">
                  <span className="type-eyebrow text-zinc-400 block mb-1">Details Captured</span>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {Object.entries(currentCase.extracted).map(([key, val]) => (
                      <div key={key} className="p-1.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.03]">
                        <span className="text-zinc-400 text-[10px] uppercase block">{key}</span>
                        <span className="text-zinc-800 dark:text-zinc-200 font-medium truncate block">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions Executed */}
                <div className="space-y-1.5 pt-1 border-t border-black/[0.04] dark:border-white/[0.06]">
                  <span className="type-eyebrow text-zinc-400 block mb-1">Actions Taken</span>
                  {currentCase.actions.map((act, i) => (
                    <div key={i} className="flex items-center gap-2 type-body-sm text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <button
                    onClick={scrollToContact}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full type-btn btn-solid-primary shadow-md"
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
