"use client";

import React, { memo, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Database,
  Calendar,
  PhoneCall,
  UserCheck,
  Headphones,
  Check,
  Play,
} from "lucide-react";
import { CapabilityItem, UseCase } from "@/lib/types";
import { MOTION_EASINGS } from "@/lib/motion-config";

interface UseCasesProps {
  useCases?: UseCase[];
  capabilities?: CapabilityItem[];
}

const DEFAULT_CAPABILITIES = [
  {
    index: "01",
    title: "ENQUIRIES",
    subtitle: "Answer repetitive customer questions.",
    explanation:
      "Answers incoming customer queries about business hours, catalog specifications, pricing, and locations using verified company data.",
    workflow: ["Listen & Parse", "Context Lookup", "Precise Answer", "Confirm Satisfied"],
    outcome: "Verified business answer delivered in <400ms without hold time",
    telemetry: "KB Vector Query · 320ms Synthetic Turn",
    icon: Headphones,
  },
  {
    index: "02",
    title: "BOOKINGS",
    subtitle: "Handle reservations and appointments.",
    explanation:
      "Collects date/time preferences, queries real-time calendar availability, and writes confirmed appointments directly to your booking software.",
    workflow: ["Request Preference", "Calendar Availability Check", "Slot Allocation", "Lock & SMS Confirmation"],
    outcome: "Guaranteed calendar slot committed with zero scheduling friction",
    telemetry: "CalDAV/Google Calendar API Lock · Realtime Confirmed",
    icon: Calendar,
  },
  {
    index: "03",
    title: "QUALIFICATION",
    subtitle: "Capture requirements and identify intent.",
    explanation:
      "Asks structured qualifying questions to identify project scope, budget, and timeline before escalating to your sales team.",
    workflow: ["Requirement Discovery", "Budget & Scope Qualification", "Intent Scoring", "Priority Routing"],
    outcome: "High-intent lead captured and routed with structured notes",
    telemetry: "CRM Intent Classifier · Tier 1 Enterprise Tagged",
    icon: UserCheck,
  },
  {
    index: "04",
    title: "SALES INTAKE",
    subtitle: "Support inbound sales conversations.",
    explanation:
      "Provides product details, answers objections, and captures contact information for immediate sales team follow-up.",
    workflow: ["Intent Recognition", "Objection Handling", "Specification Match", "Sales Rep Notification"],
    outcome: "100% inbound capture during peak hours and weekends",
    telemetry: "Lead Pipeline Webhook · Instant Sales Notification",
    icon: PhoneCall,
  },
  {
    index: "05",
    title: "ROUTINE SUPPORT",
    subtitle: "Resolve common customer issues.",
    explanation:
      "Guides customers through standard troubleshooting, tracks delivery orders, and resolves frequent repetitive requests.",
    workflow: ["Identify Issue", "Verify Account", "Apply Solution", "Confirm Resolution"],
    outcome: "First-contact resolution without burdening senior technical support",
    telemetry: "Helpdesk Ticket Update · Automated Closed Status",
    icon: Layers,
  },
  {
    index: "06",
    title: "STRUCTURED FOLLOW-UPS",
    subtitle: "Automate outbound reminders and updates.",
    explanation:
      "Calls customers to confirm upcoming appointments, follow up on quotes, or deliver order status updates automatically.",
    workflow: ["Scheduled Dial", "Caller Identity Confirmation", "State Update", "Response Sync"],
    outcome: "94% reduction in no-shows and missed appointment slots",
    telemetry: "Outbound Queue Dispatch · 2-Way CRM Status Sync",
    icon: Database,
  },
];

export const UseCasesSection = memo(function UseCasesSection({
  useCases,
  capabilities,
}: UseCasesProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isShowingBlueprint, setIsShowingBlueprint] = useState(false);
  const [simStep, setSimStep] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const items =
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
          telemetry: `Autonomous Protocol · Step ${idx + 1}`,
          icon: DEFAULT_CAPABILITIES[idx % DEFAULT_CAPABILITIES.length].icon,
        }))
      : DEFAULT_CAPABILITIES;

  const currentItem = items[activeIndex] || items[0];

  const handleSelect = useCallback((idx: number) => {
    setActiveIndex(idx);
    setIsShowingBlueprint(false);
    setSimStep(null);
    setIsSimulating(false);
  }, []);

  const runSimulation = useCallback(() => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(0);

    const t1 = setTimeout(() => setSimStep(1), 500);
    const t2 = setTimeout(() => setSimStep(2), 1000);
    const t3 = setTimeout(() => setSimStep(3), 1500);
    const t4 = setTimeout(() => {
      setSimStep(null);
      setIsSimulating(false);
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isSimulating]);

  return (
    <section
      id="capabilities"
      aria-label="VoiceOps Autonomous Phone Capabilities"
      className="py-24 sm:py-32 md:py-40 relative overflow-hidden bg-[#F5F1E8] dark:bg-[#07090e] border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] transition-colors scroll-mt-16"
    >
      <div id="use-cases" className="absolute -top-24 pointer-events-none" />

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

          <p className="type-sans-body-lg text-[#58534C] dark:text-zinc-400 leading-relaxed font-normal text-sm sm:text-base">
            Select any capability below to inspect its exact conversational workflow, system triggers, and verified operational outcome.
          </p>
        </motion.div>

        {/* =========================================================
            ASYMMETRIC SPOTLIGHT COMPOSITION
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Focused Spotlight Stage (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.index + (isShowingBlueprint ? "-spec" : "-norm")}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: 0.35, ease: MOTION_EASINGS.editorial }}
                className="w-full rounded-3xl p-7 sm:p-8 bg-[#FAF8F2] dark:bg-[#10131B] border border-[rgba(36,33,26,0.09)] dark:border-white/[0.09] shadow-xl space-y-6 text-left relative min-h-[470px] flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Index, Icon & Action Controls */}
                  <div className="flex items-center justify-between border-b border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                        {currentItem.index}
                      </span>
                      <span className="text-zinc-400">/</span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-800 dark:text-zinc-200 font-semibold">
                        {currentItem.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={runSimulation}
                        disabled={isSimulating}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-sans font-medium bg-blue-600/10 hover:bg-blue-600/20 text-blue-700 dark:text-blue-300 transition-colors disabled:opacity-50"
                      >
                        <Play className={`w-3 h-3 ${isSimulating ? "animate-spin text-blue-500" : ""}`} />
                        <span>{isSimulating ? "Simulating..." : "Simulate Call"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsShowingBlueprint((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-sans font-medium bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.09] text-zinc-700 dark:text-zinc-300 transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>{isShowingBlueprint ? "Overview" : "Inspect Specs"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Content: Overview or Technical Blueprint */}
                  {!isShowingBlueprint ? (
                    <div className="space-y-5 pt-4">
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl text-zinc-950 dark:text-white font-normal mb-2 leading-snug">
                          {currentItem.subtitle}
                        </h3>
                        <p className="font-sans text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                          {currentItem.explanation}
                        </p>
                      </div>

                      {/* 4-Step Execution Pathway Grid */}
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold block">
                            EXECUTION PATHWAY
                          </span>
                          {isSimulating && (
                            <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-semibold animate-pulse">
                              SIMULATING STEP 0{(simStep ?? 0) + 1}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {currentItem.workflow.map((step, idx) => {
                            const isStepActive = simStep === idx;
                            return (
                              <div
                                key={idx}
                                className={`p-3 rounded-xl border transition-all duration-200 flex items-center gap-2.5 ${
                                  isStepActive
                                    ? "bg-blue-500/15 border-blue-500 text-blue-700 dark:text-blue-300 shadow-sm scale-[1.02]"
                                    : "bg-black/[0.02] dark:bg-white/[0.03] border-black/[0.05] dark:border-white/[0.06]"
                                }`}
                              >
                                <span
                                  className={`font-mono text-xs font-bold shrink-0 ${
                                    isStepActive
                                      ? "text-blue-600 dark:text-blue-400"
                                      : "text-zinc-400 dark:text-zinc-500"
                                  }`}
                                >
                                  0{idx + 1}
                                </span>
                                <span className="font-sans text-xs font-medium text-zinc-800 dark:text-zinc-200">
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Technical Blueprint Spec View */
                    <div className="space-y-4 pt-4">
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">
                          TECHNICAL DISPATCH BLUEPRINT
                        </span>
                        <h3 className="font-sans text-lg font-bold text-zinc-900 dark:text-white">
                          Automated Telephony Hook Configuration
                        </h3>
                      </div>

                      <div className="p-4 rounded-xl bg-zinc-950 text-zinc-300 font-mono text-xs space-y-2 border border-white/10">
                        <div className="text-zinc-500">// VoiceOps Runtime Parameters</div>
                        <div><span className="text-blue-400">Trigger:</span> Inbound SIP Direct Ring</div>
                        <div><span className="text-blue-400">Intent Handler:</span> {currentItem.title}_PARSER</div>
                        <div><span className="text-blue-400">Target Latency:</span> &lt;400ms Turn Cadence</div>
                        <div><span className="text-blue-400">Payload Hook:</span> CRM / Webhook Sync</div>
                        <div className="text-emerald-400 pt-1">Status: PRODUCTION READY</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Verified Operational Result */}
                <div className="pt-4 border-t border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="font-sans text-xs font-medium text-zinc-800 dark:text-zinc-200">
                      {currentItem.outcome}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 shrink-0">
                    {currentItem.telemetry}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Tactile Capability Navigation Deck (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block font-semibold px-2 mb-1">
              SELECT CAPABILITY (01–06)
            </span>

            <div className="space-y-2.5">
              {items.map((item, idx) => {
                const isSelected = activeIndex === idx;
                const Icon = item.icon;

                return (
                  <button
                    key={item.index}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 relative flex items-center justify-between ${
                      isSelected
                        ? "bg-[#FCFAF5] dark:bg-[#0D101A] border-blue-500/50 dark:border-blue-400/40 shadow-md -translate-y-0.5"
                        : "bg-[#FAF8F2]/70 dark:bg-white/[0.02] border-[rgba(36,33,26,0.07)] dark:border-white/[0.06] hover:bg-[#FAF8F2] dark:hover:bg-white/[0.04] opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[11px] font-bold ${
                              isSelected
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-zinc-400 dark:text-zinc-500"
                            }`}
                          >
                            {item.index}
                          </span>
                          <span
                            className={`font-sans text-xs font-semibold ${
                              isSelected
                                ? "text-zinc-950 dark:text-white"
                                : "text-zinc-700 dark:text-zinc-300"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                        <p className="font-sans text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected
                          ? "text-blue-600 dark:text-blue-400 translate-x-0.5 -translate-y-0.5"
                          : "text-zinc-400 opacity-60"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quiet Bottom Editorial Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 pt-8 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs text-zinc-500 font-sans"
        >
          <span>All 6 capabilities adapt dynamically to your company&apos;s custom knowledge base and booking software.</span>
          <span className="font-mono text-zinc-400">Deterministic First-Layer Resolution</span>
        </motion.div>
      </div>
    </section>
  );
});
