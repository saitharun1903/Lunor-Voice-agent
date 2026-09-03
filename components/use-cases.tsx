"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, Zap, CheckCircle2, Bot, User } from "lucide-react";
import { UseCase } from "@/lib/types";

interface UseCasesProps {
  useCases?: UseCase[];
}

const CAPABILITIES = [
  {
    id: "enquiries",
    num: "01",
    title: "Customer Enquiries",
    headline: "Instant Policy, Pricing & FAQ Resolution",
    description: "Answers repetitive questions regarding opening hours, service catalogs, location directions, and pricing with zero hold time.",
    caller: "What are your operating hours this weekend, and is customer parking available?",
    agent: "We're open Saturday and Sunday from 9:00 AM to 8:00 PM. Free customer parking is located right behind the main entrance on 4th Ave.",
    actionName: "Instant Knowledge Lookup",
    actionOutput: "Matched 100% with Knowledge Base · Resolution: 1.2s",
    systemEvent: "FAQ_RESOLVED_AUTONOMOUSLY",
  },
  {
    id: "bookings",
    num: "02",
    title: "Reservations & Scheduling",
    headline: "Real-Time Calendar Lock & SMS Confirmation",
    description: "Checks live calendar availability across practitioners or staff, resolves conflicts, and confirms appointments with calendar invites.",
    caller: "I'd like to book an appointment for tomorrow afternoon around 3:00 PM.",
    agent: "Tomorrow at 3:00 PM with Dr. Reynolds is open. I've locked that slot for you and sent an SMS confirmation with the invite link.",
    actionName: "Cal.com / Google Calendar Write",
    actionOutput: "Slot Confirmed: Tomorrow 3:00 PM · SMS Dispatched",
    systemEvent: "CALENDAR_SLOT_RESERVED",
  },
  {
    id: "qualification",
    num: "03",
    title: "Lead Qualification",
    headline: "Structured Intake & Criterion Grading",
    description: "Asks structured qualifying questions to evaluate caller budget, timeline, urgency, and requirement specifics before routing.",
    caller: "Looking for a 3-bedroom property in Westside with a budget around ₹90 Lakhs.",
    agent: "Recorded your 3-bedroom preference, ₹90L budget, and next-month timeline. A senior property specialist has received your verified profile.",
    actionName: "CRM Lead Scoring & Routing",
    actionOutput: "Lead Grade: High Intent (Score 95/100) · Hubspot Synced",
    systemEvent: "LEAD_QUALIFIED_AND_ASSIGNED",
  },
  {
    id: "sales",
    num: "04",
    title: "Sales Discovery",
    headline: "Inbound Prospect Discovery & Demo Booking",
    description: "Engages high-intent buyers with product details, resolves objection queries, and books technical discovery meetings directly.",
    caller: "How does your phone integration connect with our existing carrier lines?",
    agent: "You can keep your existing phone number via simple call forwarding or direct SIP trunking. Would you like to schedule a 15-minute setup review?",
    actionName: "Sales Pipeline Automation",
    actionOutput: "Discovery Call Booked: Friday 11:00 AM · Rep Assigned",
    systemEvent: "SALES_DISCOVERY_CONVERTED",
  },
  {
    id: "support",
    num: "05",
    title: "Tier-One Support",
    headline: "Live Status Lookups & Guided Troubleshooting",
    description: "Resolves routine support queries, looks up order/ticket statuses via API, and guides callers through step-by-step procedures.",
    caller: "Can you check the current status of service ticket #7842?",
    agent: "Ticket #7842 was completed this morning by technician Marcus. A complete service report has been emailed to your account address.",
    actionName: "Helpdesk Database Query",
    actionOutput: "Ticket #7842 Status: Verified Complete · Email Synced",
    systemEvent: "SUPPORT_TICKET_RESOLVED",
  },
  {
    id: "followups",
    num: "06",
    title: "Outbound Follow-ups",
    headline: "Automated Reminders, Confirmations & Callbacks",
    description: "Executes structured outbound calls for appointment confirmations, estimate follow-ups, and feedback collection automatically.",
    caller: "Hi, calling back regarding the commercial quote emailed yesterday.",
    agent: "I see your estimate was approved. Would you like me to schedule the technician dispatch for this Thursday morning?",
    actionName: "Dispatch Coordination Engine",
    actionOutput: "Estimate Approved · Technician Dispatched for Thursday",
    systemEvent: "DISPATCH_CONFIRMED",
  },
];

export const UseCasesSection = memo(function UseCasesSection({ useCases }: UseCasesProps) {
  const [selectedId, setSelectedId] = useState<string>("enquiries");

  const currentCase =
    CAPABILITIES.find((c) => c.id === selectedId) || CAPABILITIES[0];

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="use-cases" className="py-24 md:py-32 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20 text-left">
          <p className="type-eyebrow text-blue-600 dark:text-blue-400 mb-3 tracking-wider">
            CAPABILITIES MATRIX
          </p>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-4">
            Deterministic voice automation for real business.
          </h2>

          <p className="type-body-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            From inbound enquiries and calendar bookings to lead qualification and CRM updates, VoiceOps executes complete conversational workflows without staff intervention.
          </p>
        </div>

        {/* Interactive Capabilities Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 01-06 Interactive Ledger */}
          <div className="lg:col-span-5 space-y-2">
            {CAPABILITIES.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center justify-between group border ${
                    isSelected
                      ? "bg-black/[0.04] dark:bg-white/[0.06] border-black/[0.1] dark:border-white/[0.12] shadow-sm"
                      : "bg-transparent border-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`type-label-tech font-bold transition-colors mt-0.5 ${
                        isSelected
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
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
                      <p className="type-body-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isSelected
                        ? "text-blue-600 dark:text-blue-400 translate-x-1"
                        : "text-zinc-300 dark:text-zinc-600 opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Conversational Simulator */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl p-7 sm:p-8 structured-card space-y-6 shadow-xl border border-black/[0.08] dark:border-white/[0.1]"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-4">
                  <div>
                    <span className="type-eyebrow text-blue-600 dark:text-blue-400 block mb-1">
                      LIVE WORKFLOW #{currentCase.num}
                    </span>
                    <h3 className="type-h2 text-zinc-950 dark:text-white">
                      {currentCase.headline}
                    </h3>
                  </div>

                  <span className="type-label-tech text-[10px] px-2.5 py-1 rounded-md bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-600/20">
                    {currentCase.systemEvent}
                  </span>
                </div>

                {/* Simulated Conversation Feed */}
                <div className="space-y-3">
                  {/* Caller */}
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] space-y-1">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
                      <User className="w-3.5 h-3.5" />
                      <span>Inbound Caller</span>
                    </div>
                    <p className="type-body text-zinc-900 dark:text-zinc-100">
                      “{currentCase.caller}”
                    </p>
                  </div>

                  {/* VoiceOps AI */}
                  <div className="p-4 rounded-2xl bg-blue-600/[0.04] dark:bg-blue-600/[0.08] border border-blue-600/20 space-y-1">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-medium">
                      <Bot className="w-3.5 h-3.5" />
                      <span>VoiceOps Voice Agent</span>
                    </div>
                    <p className="type-body font-medium text-zinc-950 dark:text-white">
                      “{currentCase.agent}”
                    </p>
                  </div>
                </div>

                {/* Real-time Business System Output Card */}
                <div className="p-4 rounded-2xl bg-emerald-500/[0.05] dark:bg-emerald-500/[0.08] border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="type-eyebrow text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {currentCase.actionName}
                    </span>
                    <span className="type-label-tech text-emerald-600 dark:text-emerald-400">
                      VERIFIED EXECUTION
                    </span>
                  </div>
                  <p className="type-body-sm text-zinc-700 dark:text-zinc-300 font-medium">
                    {currentCase.actionOutput}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="type-body-sm text-zinc-500 dark:text-zinc-400">
                    {currentCase.description}
                  </p>
                  <button
                    onClick={scrollToContact}
                    className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl type-btn btn-solid-primary shadow-sm"
                  >
                    <span>Deploy This Workflow</span>
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
