"use client";

import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  PhoneIncoming,
  Cpu,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Terminal,
  Activity,
  Check,
} from "lucide-react";
import { MOTION_EASINGS } from "@/lib/motion-config";

interface PipelineStage {
  num: string;
  label: string;
  headline: string;
  description: string;
  detail: string;
  telemetryPacket: string;
  systemLog: {
    protocol: string;
    action: string;
    payload: string;
    status: string;
  };
  icon: React.ComponentType<{ className?: string }>;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    num: "01",
    label: "CALL",
    headline: "Inbound Phone Call",
    description:
      "A customer calls your regular business phone number with an urgent booking, inquiry, or question.",
    detail: "Carrier SIP Ingest · Instant Ring",
    telemetryPacket: "SIP Protocol · Sub-second Inbound Ring",
    systemLog: {
      protocol: "SIP / Opus Audio Stream Initialized",
      action: "Direct Inward Dialing (DID) Carrier Handshake",
      payload: '{ event: "call.inbound", caller: "+1 (888) 586-XXXX", queue: "direct_layer" }',
      status: "HANDSHAKE COMMITTED · 0ms",
    },
    icon: PhoneIncoming,
  },
  {
    num: "02",
    label: "VOICEOPS",
    headline: "Instant Synthetic Answer",
    description:
      "Answers in under a second with natural conversational cadence. Zero hold music, zero robotic phone trees.",
    detail: "VoiceOps answers naturally with sub-second cadence.",
    telemetryPacket: "Acoustic Engine · 380ms Synthetic Turn",
    systemLog: {
      protocol: "Neural Acoustic Streaming Engine",
      action: 'Greeting Stream: "Thank you for calling. How can I help your project today?"',
      payload: '{ turn_cadence: "340ms", voice_model: "voiceops-neural-v2", interruptions: "supported" }',
      status: "STREAMING SYNTHETIC AUDIO",
    },
    icon: Cpu,
  },
  {
    num: "03",
    label: "UNDERSTAND",
    headline: "Context & Intent Extraction",
    description:
      "Listens to natural phrasing, clarifies preferences, and extracts key entities and qualification criteria.",
    detail: "Extracts intent, booking slots, and caller requirements.",
    telemetryPacket: "NER Pipeline · Entities & Slot Extracted",
    systemLog: {
      protocol: "Real-time Entity & Intent Resolution",
      action: "Extracted Slots: [Showroom Visit] · [Thursday 3:00 PM] · [Acoustic Glass]",
      payload: '{ intent: "schedule_appointment", confidence: 0.994, entities: { guests: 2 } }',
      status: "INTENT PARSED · 100% CERTAINTY",
    },
    icon: CheckCircle2,
  },
  {
    num: "04",
    label: "ACT",
    headline: "Real Execution & Commitment",
    description:
      "Queries live calendar slots, locks bookings, looks up inventory, or writes records to your business CRM.",
    detail: "Executes real calendar bookings and database actions.",
    telemetryPacket: "API Mutation · Confirmed Calendar Lock",
    systemLog: {
      protocol: "Two-Way Business Software Webhook",
      action: "POST /api/calendar/bookings -> 200 OK Confirmed",
      payload: '{ calendar_event_id: "evt_99214", crm_lead_id: "lead_4482", slot_locked: true }',
      status: "CALENDAR & CRM COMMITTED",
    },
    icon: Calendar,
  },
  {
    num: "05",
    label: "RESOLVE",
    headline: "System Sync or Warm Handoff",
    description:
      "Resolves the call autonomously in software, or warm-transfers to your specialist with complete summary notes.",
    detail: "Syncs directly to CRM or warm-transfers with notes.",
    telemetryPacket: "Closed Loop · CRM Synchronized + Notes",
    systemLog: {
      protocol: "Closed-Loop Call Summary & Verification",
      action: "SMS Confirmation Dispatched to Caller + Full Telephony Audio Transcript Archived",
      payload: '{ call_duration: "58s", human_staff_interrupted: 0, outcome: "autonomous_complete" }',
      status: "CALL RESOLVED AUTONOMOUSLY",
    },
    icon: Layers,
  },
];

export const SystemDiagram = memo(function SystemDiagram() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking across comfortable 1.8 viewport heights
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Link scroll progress smoothly to stage index unless user manually clicked
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (hasUserInteracted || shouldReduceMotion) return;
    const stage = Math.min(
      Math.floor(latest * PIPELINE_STAGES.length),
      PIPELINE_STAGES.length - 1
    );
    setActiveStepIndex(stage);
  });

  const handleSelectStep = useCallback((index: number) => {
    setHasUserInteracted(true);
    setActiveStepIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (index + 1) % PIPELINE_STAGES.length;
        handleSelectStep(next);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (index - 1 + PIPELINE_STAGES.length) % PIPELINE_STAGES.length;
        handleSelectStep(prev);
      }
    },
    [handleSelectStep]
  );

  const activePercent = 10 + activeStepIndex * 20;
  const activeStage = PIPELINE_STAGES[activeStepIndex];

  return (
    <section
      id="architecture"
      ref={sectionRef}
      aria-label="VoiceOps Call Architecture Pipeline"
      className="relative bg-[#F5F1E8] dark:bg-[#07090e] border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] transition-colors"
      style={{ minHeight: shouldReduceMotion ? "auto" : "180vh" }}
      onMouseEnter={() => setHasUserInteracted(true)}
      onTouchStart={() => setHasUserInteracted(true)}
    >
      <div className={`${shouldReduceMotion ? "py-24" : "sticky top-20 min-h-[88vh] py-14 sm:py-18"} flex flex-col justify-center overflow-hidden`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: MOTION_EASINGS.editorial }}
              className="max-w-2xl text-left space-y-2"
            >
              <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
                THE SIGNATURE CONTINUOUS ARCHITECTURE
              </p>

              <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal text-3xl sm:text-4xl md:text-5xl">
                Every business has a first layer.
              </h2>

              <p className="type-sans-body-lg text-[#58534C] dark:text-zinc-400 leading-relaxed font-normal text-sm sm:text-base">
                VoiceOps sits quietly in front of your phones, resolving initial conversations before they interrupt your operational team.
              </p>
            </motion.div>

            {/* Live Pipeline Telemetry Indicator */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07] text-zinc-700 dark:text-zinc-300">
              <Activity className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
              <span>STAGE {activeStage.num} ACTIVE: {activeStage.label}</span>
            </div>
          </div>

          {/* =========================================================
              DESKTOP PIPELINE (lg & xl)
              Dedicated Elevated Conduit Rail ABOVE the Cards
              ========================================================= */}
          <div className="hidden lg:block relative">
            {/* Elevated Conduit Rail Area */}
            <div className="relative h-10 mb-2 flex items-center">
              {/* Base Neutral Rail */}
              <div
                className="absolute h-[2px] bg-[rgba(36,33,26,0.12)] dark:bg-white/[0.12] rounded-full"
                style={{ left: "10%", right: "10%" }}
              />

              {/* Active Blue Signal Progress */}
              <motion.div
                className="absolute h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full"
                style={{ left: "10%" }}
                animate={{
                  width: `${activeStepIndex * 20}%`,
                }}
                transition={{ duration: 0.4, ease: MOTION_EASINGS.editorial }}
              />

              {/* Traveling Signal Ring: Luminous beacon gliding across stages */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600/20 dark:bg-blue-400/25 flex items-center justify-center pointer-events-none z-20"
                animate={{
                  left: `${activePercent}%`,
                }}
                transition={{ duration: 0.4, ease: MOTION_EASINGS.editorial }}
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shadow-sm" />
              </motion.div>

              {/* Five Anchor Nodes */}
              <div className="w-full grid grid-cols-5 gap-4 relative z-10">
                {PIPELINE_STAGES.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  const isPassed = activeStepIndex >= idx;

                  return (
                    <div key={step.num} className="flex justify-center items-center">
                      <button
                        type="button"
                        onClick={() => handleSelectStep(idx)}
                        aria-label={`Activate step ${step.num}: ${step.label}`}
                        className="group p-2 -m-2 outline-none cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
                      >
                        <motion.div
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors duration-200 ${
                            isActive
                              ? "bg-white dark:bg-[#07090e] ring-2 ring-blue-600 dark:ring-blue-400 shadow-sm"
                              : isPassed
                              ? "bg-blue-600/70 dark:bg-blue-400/70 ring-1 ring-blue-600/30"
                              : "bg-[#D8D2C6] dark:bg-zinc-700 hover:bg-[#B5ADA0] dark:hover:bg-zinc-500"
                          }`}
                          animate={{
                            scale: isActive ? 1.25 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                              isActive
                                ? "bg-blue-600 dark:bg-blue-400"
                                : isPassed
                                ? "bg-white dark:bg-[#07090e]"
                                : "bg-transparent"
                            }`}
                          />
                        </motion.div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5-Card Grid with Single Active Spotlight Focus */}
            <div
              role="tablist"
              aria-label="Pipeline Stages"
              className="grid grid-cols-5 gap-4 relative"
            >
              {PIPELINE_STAGES.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                const Icon = step.icon;

                return (
                  <button
                    key={step.num}
                    type="button"
                    role="tab"
                    id={`pipeline-tab-${step.num}`}
                    aria-selected={isActive}
                    aria-controls={`pipeline-panel-${step.num}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleSelectStep(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={`text-left p-5 rounded-2xl transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex flex-col justify-between select-none ${
                      isActive
                        ? "bg-[#FCFAF5] dark:bg-[#0d1222] border border-blue-500/50 dark:border-blue-400/40 shadow-lg shadow-blue-950/[0.04] dark:shadow-black/50 -translate-y-1.5 scale-[1.02]"
                        : "bg-[#FAF8F2]/75 dark:bg-white/[0.03] border border-[rgba(36,33,26,0.08)] dark:border-white/[0.07] hover:border-[rgba(36,33,26,0.2)] dark:hover:border-white/[0.14] opacity-75 hover:opacity-100"
                    }`}
                    style={{ minHeight: "250px" }}
                  >
                    <div>
                      {/* Top Row: Index & Label */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(36,33,26,0.07)] dark:border-white/[0.08]">
                        <span
                          className={`font-mono text-xs font-bold transition-colors ${
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-[#888278] dark:text-zinc-500"
                          }`}
                        >
                          {step.num}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-400"}`} />
                          <span
                            className={`type-editorial-eyebrow text-[10px] tracking-wider uppercase transition-colors ${
                              isActive
                                ? "text-zinc-950 dark:text-white font-semibold"
                                : "text-[#888278] dark:text-zinc-500"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      </div>

                      {/* Headline */}
                      <h3
                        className={`font-serif text-base lg:text-lg font-normal mb-2 leading-snug transition-colors ${
                          isActive
                            ? "text-zinc-950 dark:text-white font-medium"
                            : "text-zinc-800 dark:text-zinc-300"
                        }`}
                      >
                        {step.headline}
                      </h3>

                      {/* Description */}
                      <p
                        className={`type-sans-body-sm text-xs leading-relaxed transition-colors ${
                          isActive
                            ? "text-[#36322C] dark:text-zinc-300"
                            : "text-[#6C665D] dark:text-zinc-400"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Active Secondary Detail Reveal */}
                    <div className="mt-3 pt-2.5 border-t border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] min-h-[36px] flex items-center">
                      {isActive ? (
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-700 dark:text-blue-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                          <span className="line-clamp-1">{step.detail}</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#A8A298] dark:text-zinc-600 font-mono">
                          Phase 0{idx + 1}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* LIVE SYSTEM TELEMETRY PACKET MONITOR (Creative Studio Wow Factor) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.num}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: MOTION_EASINGS.editorial }}
                className="mt-6 p-4 rounded-2xl bg-zinc-950 border border-white/10 text-zinc-300 font-mono text-xs shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 font-bold">[{activeStage.num} // {activeStage.label}]</span>
                    <span className="text-zinc-400">{activeStage.systemLog.protocol}</span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    ↳ <span className="text-zinc-200">{activeStage.systemLog.action}</span>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-emerald-400 font-semibold shrink-0">
                  {activeStage.systemLog.status}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* =========================================================
              MOBILE VERTICAL PIPELINE (<lg)
              ========================================================= */}
          <div className="block lg:hidden relative pl-6 sm:pl-8">
            <div className="absolute left-2.5 sm:left-3.5 top-6 bottom-6 w-[2px] bg-[rgba(36,33,26,0.12)] dark:bg-white/[0.12] rounded-full">
              <motion.div
                className="w-full bg-blue-600 dark:bg-blue-400 rounded-full"
                style={{ originY: 0 }}
                animate={{
                  height: `${(activeStepIndex / (PIPELINE_STAGES.length - 1)) * 100}%`,
                }}
                transition={{ duration: 0.35, ease: MOTION_EASINGS.editorial }}
              />
            </div>

            <div
              role="tablist"
              aria-label="Mobile Pipeline Stages"
              className="space-y-4 relative"
            >
              {PIPELINE_STAGES.map((step, idx) => {
                const isActive = activeStepIndex === idx;

                return (
                  <div key={step.num} className="relative">
                    <div className="absolute -left-6 sm:-left-8 top-6 -translate-x-1/2 flex items-center justify-center">
                      <motion.div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-white dark:bg-[#07090e] ring-2 ring-blue-600 dark:ring-blue-400 shadow-sm"
                            : activeStepIndex >= idx
                            ? "bg-blue-600/70 dark:bg-blue-400/70"
                            : "bg-[#D8D2C6] dark:bg-zinc-700"
                        }`}
                        animate={{
                          scale: isActive ? 1.25 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive
                              ? "bg-blue-600 dark:bg-blue-400"
                              : activeStepIndex >= idx
                              ? "bg-white dark:bg-[#07090e]"
                              : "bg-transparent"
                          }`}
                        />
                      </motion.div>
                    </div>

                    <button
                      type="button"
                      role="tab"
                      id={`mobile-pipeline-tab-${step.num}`}
                      aria-selected={isActive}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => handleSelectStep(idx)}
                      className={`w-full text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        isActive
                          ? "bg-[#FCFAF5] dark:bg-[#0d1222] border border-blue-500/50 dark:border-blue-400/40 shadow-sm"
                          : "bg-[#FAF8F2]/80 dark:bg-white/[0.03] border border-[rgba(36,33,26,0.08)] dark:border-white/[0.07] opacity-80"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[rgba(36,33,26,0.07)] dark:border-white/[0.08]">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-[#888278] dark:text-zinc-500"
                          }`}
                        >
                          {step.num}
                        </span>
                        <span
                          className={`type-editorial-eyebrow text-[10px] tracking-wider uppercase ${
                            isActive
                              ? "text-zinc-950 dark:text-white font-semibold"
                              : "text-[#888278] dark:text-zinc-500"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>

                      <h3
                        className={`font-serif text-base font-normal mb-1.5 ${
                          isActive
                            ? "text-zinc-950 dark:text-white font-medium"
                            : "text-zinc-800 dark:text-zinc-300"
                        }`}
                      >
                        {step.headline}
                      </h3>

                      <p
                        className={`type-sans-body-sm text-xs leading-relaxed ${
                          isActive
                            ? "text-[#36322C] dark:text-zinc-300"
                            : "text-[#6C665D] dark:text-zinc-400"
                        }`}
                      >
                        {step.description}
                      </p>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.22, ease: MOTION_EASINGS.editorial }}
                            className="pt-2.5 border-t border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] space-y-2 overflow-hidden"
                          >
                            <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-700 dark:text-blue-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                              <span>{step.detail}</span>
                            </div>
                            <div className="font-mono text-[9px] text-zinc-500 dark:text-zinc-400">
                              {step.systemLog.action}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quiet Editorial Footer */}
          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-baseline justify-between gap-3 text-xs text-zinc-500 font-sans">
            <span>Compatible with all carriers, Twilio, SIP trunks, or simple conditional phone forwarding.</span>
            <span className="font-mono text-zinc-400">Zero telephone hardware to install</span>
          </div>
        </div>
      </div>
    </section>
  );
});
