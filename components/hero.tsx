"use client";

import React, { memo, useCallback, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  PhoneIncoming,
  Cpu,
  CheckCircle2,
  Calendar,
  Database,
  Send,
  Sparkles,
  Radio,
} from "lucide-react";
import { MOTION_EASINGS } from "@/lib/motion-config";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  onTalkToVoiceOps?: () => void;
  onTalkToLuno?: () => void;
}

interface Scenario {
  id: string;
  title: string;
  category: string;
  callerQuote: string;
  intentEntity: string;
  intentScope: string;
  actionDestination: "calendar" | "crm" | "dispatch";
  actionTitle: string;
  actionResult: string;
  latency: string;
}

const HERO_SCENARIOS: Scenario[] = [
  {
    id: "booking",
    title: "Showroom Booking",
    category: "High-Intent Customer",
    callerQuote: "Can I see your modern door showroom this Thursday at 3 PM?",
    intentEntity: "Showroom Visit",
    intentScope: "2 Guests · Thu 3:00 PM",
    actionDestination: "calendar",
    actionTitle: "Google Calendar & SMS",
    actionResult: "Slot Reserved · Confirmed",
    latency: "340ms",
  },
  {
    id: "qualification",
    title: "Commercial Lead",
    category: "B2B Qualification",
    callerQuote: "We need acoustic soundproofing for a 4,000 sq ft office.",
    intentEntity: "Commercial Tier 1",
    intentScope: "4,000 sq ft · >$25k Scope",
    actionDestination: "crm",
    actionTitle: "HubSpot CRM Sync",
    actionResult: "AE Assigned · Score 94",
    latency: "385ms",
  },
  {
    id: "specification",
    title: "Instant Specification",
    category: "Technical Enquiry",
    callerQuote: "What are the standard lead times for pivot glass doors?",
    intentEntity: "Specification Query",
    intentScope: "Pivot Doors · 4–6 Wk Lead",
    actionDestination: "dispatch",
    actionTitle: "Instant SMS Resolution",
    actionResult: "Spec Sheet Delivered",
    latency: "310ms",
  },
];

export const Hero = memo(function Hero({
  eyebrow = "VOICE AUTOMATION FOR BUSINESS",
  headline = "Automate the first layer of every call.",
  subheadline = "VoiceOps builds AI voice systems that handle repetitive business conversations — from enquiries and bookings to lead qualification, support, and follow-ups.",
  onTalkToVoiceOps,
  onTalkToLuno,
}: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [isHoveringMatrix, setIsHoveringMatrix] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Auto-cycle scenario subtly every 5.5s unless hovered or reduced motion
  useEffect(() => {
    if (shouldReduceMotion || isHoveringMatrix) return;
    const interval = setInterval(() => {
      setActiveScenarioIdx((prev) => (prev + 1) % HERO_SCENARIOS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [shouldReduceMotion, isHoveringMatrix]);

  const handleTalkToVoiceOps = useCallback(() => {
    const trigger = onTalkToVoiceOps || onTalkToLuno;
    if (trigger) {
      trigger();
    } else {
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [onTalkToLuno, onTalkToVoiceOps]);

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Subtle spatial pointer tilt (clamped to ±3 deg, GPU transform)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({
        rotateX: -y * 5,
        rotateY: x * 5,
      });
    },
    [shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHoveringMatrix(false);
  }, []);

  const activeScenario = HERO_SCENARIOS[activeScenarioIdx];

  // Refined editorial line-break rendering
  const renderHeadline = () => {
    const lower = headline.toLowerCase();
    if (lower.includes("of every call")) {
      return (
        <>
          <span className="block text-zinc-950 dark:text-white font-semibold tracking-tight">
            Automate the first layer
          </span>
          <span className="block text-zinc-500 dark:text-zinc-400 font-normal tracking-tight">
            of every call.
          </span>
        </>
      );
    }
    return (
      <span className="text-zinc-950 dark:text-white font-semibold tracking-tight">
        {headline}
      </span>
    );
  };

  return (
    <section
      aria-label="VoiceOps Introduction & Inbound Telephony Routing System"
      className="relative min-h-[92vh] lg:min-h-[96vh] flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 xl:px-16 overflow-hidden bg-[#FAF8F5] dark:bg-[#0D0F14] transition-colors duration-300"
    >
      {/* Background Architectural Grid & Soft Focal Radiance */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-1/4 right-1/4 w-[650px] h-[450px] rounded-full bg-gradient-to-br from-blue-500/[0.04] via-indigo-500/[0.02] to-transparent dark:from-blue-500/[0.07] dark:via-blue-600/[0.03] dark:to-transparent blur-3xl" />
      </div>

      {/* =========================================================================
          MAIN ASYMMETRIC STAGE (1440x900 Architectural Composition)
          Left: Confident Editorial Anchor + Immediate Tactile CTAs
          Right: Expansive Live Conversational Routing Matrix (Call -> Understand -> Act)
          ========================================================================= */}
      <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-center py-6 sm:py-8">
        
        {/* -----------------------------------------------------------------------
            LEFT COLUMN: Editorial Brand & Intent Framing (lg:col-span-5)
            ----------------------------------------------------------------------- */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-7 text-left">
          
          {/* Monospace Precision Telemetry Pill (Load: 100–300ms) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15, ease: MOTION_EASINGS.editorial }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="font-mono text-[11px] font-semibold tracking-wider text-zinc-800 dark:text-zinc-200 uppercase">
              {eyebrow}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
              SUB-400MS LATENCY
            </span>
          </motion.div>

          {/* Controlled Editorial Headline (Load: 350–650ms) */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35, ease: MOTION_EASINGS.editorial }}
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] tracking-tight"
          >
            {renderHeadline()}
          </motion.h1>

          {/* Supporting Product Thesis Statement (Load: 500–800ms) */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.5, ease: MOTION_EASINGS.editorial }}
            className="font-sans text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal max-w-lg"
          >
            {subheadline}
          </motion.p>

          {/* Immediate-Response Tactile CTAs (Load: 650–950ms) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.65, ease: MOTION_EASINGS.editorial }}
            className="pt-1 flex flex-wrap items-center gap-3.5"
          >
            <button
              onClick={handleTalkToVoiceOps}
              className="inline-flex items-center gap-2.5 min-h-[48px] px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs sm:text-[13px] font-semibold tracking-tight shadow-md hover:shadow-lg transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span>Talk to VoiceOps</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 min-h-[48px] px-5 py-2.5 rounded-xl bg-transparent text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white border border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30 font-sans text-xs sm:text-[13px] font-medium transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>Build My Voice Agent</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            </button>
          </motion.div>

          {/* Micro-Telemetry Architecture Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8, ease: MOTION_EASINGS.editorial }}
            className="pt-2 flex items-center gap-3.5 text-xs font-mono text-zinc-500 dark:text-zinc-400"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Direct Carrier SIP
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span>Zero Queue Hold</span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span>Deterministic Write</span>
          </motion.div>
        </div>

        {/* -----------------------------------------------------------------------
            RIGHT COLUMN: The Live Conversational Routing Matrix (lg:col-span-7)
            Visually communicates: CALL ENTERS -> UNDERSTANDS -> ACTS
            ----------------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: MOTION_EASINGS.editorial }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringMatrix(true)}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1000px" }}
          className="lg:col-span-7 relative w-full select-none"
        >
          {/* Main Architectural Routing Instrument */}
          <div
            className="w-full rounded-3xl p-5 sm:p-6 lg:p-7 bg-[#FAF8F2] dark:bg-[#10131B] border border-[rgba(36,33,26,0.09)] dark:border-white/[0.09] shadow-2xl relative overflow-hidden transition-all duration-200 ease-out flex flex-col space-y-4 sm:space-y-5"
            style={{
              transform: shouldReduceMotion
                ? undefined
                : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Top Telephony Control Rail */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[rgba(36,33,26,0.07)] dark:border-white/[0.07] pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-blue-600/10 dark:bg-blue-400/15 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Radio className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                    VOICEOPS ROUTING MATRIX
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                    v2.4
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  CARRIER INGEST: LIVE
                </span>
                <span className="px-2 py-0.5 rounded-md bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-medium">
                  {activeScenario.latency}
                </span>
              </div>
            </div>

            {/* Connecting Luminous Conduit Rail (Desktop & Tablet) */}
            <div className="hidden md:flex items-center justify-between px-6 py-1 relative z-10 text-[10px] font-mono">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span>01 SIP INGEST</span>
              </div>

              <div className="flex-1 mx-3 h-[2px] bg-black/[0.06] dark:bg-white/[0.08] relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { x: ["-100%", "300%"] }
                  }
                  transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
                />
              </div>

              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                <Cpu className="w-3 h-3" />
                <span>02 NEURAL CLASSIFIER</span>
              </div>

              <div className="flex-1 mx-3 h-[2px] bg-black/[0.06] dark:bg-white/[0.08] relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { x: ["-100%", "300%"] }
                  }
                  transition={{ repeat: Infinity, duration: 2.4, ease: "linear", delay: 1.2 }}
                />
              </div>

              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>03 ACTION COMMITTED</span>
              </div>
            </div>

            {/* ===================================================================
                THE 3-STAGE NODES: INBOUND CALL -> VOICEOPS CORE -> ACTION EXECUTED
                =================================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3.5 items-stretch relative">
              
              {/* NODE 1: Inbound Call Ingress */}
              <div className="rounded-2xl p-3.5 sm:p-4 bg-white dark:bg-zinc-900/90 border border-black/[0.06] dark:border-white/[0.08] shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <PhoneIncoming className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="font-mono text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                      INBOUND CALL
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-400">48kHz PCM</span>
                </div>

                {/* Acoustic Signal Waveform Mini-Display */}
                <div className="h-14 w-full rounded-xl bg-zinc-950 flex items-center justify-center px-3 relative overflow-hidden">
                  <svg
                    viewBox="0 0 160 40"
                    className="w-full h-full text-blue-400"
                    preserveAspectRatio="none"
                  >
                    {/* Secondary subtle wave */}
                    <motion.path
                      d="M 0,20 Q 20,10 40,20 T 80,20 T 120,20 T 160,20"
                      fill="none"
                      stroke="rgba(56, 189, 248, 0.4)"
                      strokeWidth="1.2"
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : {
                              d: [
                                "M 0,20 Q 20,10 40,20 T 80,20 T 120,20 T 160,20",
                                "M 0,20 Q 20,30 40,20 T 80,20 T 120,20 T 160,20",
                                "M 0,20 Q 20,10 40,20 T 80,20 T 120,20 T 160,20",
                              ],
                            }
                      }
                      transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                    />
                    {/* Primary harmonic wave */}
                    <motion.path
                      d="M 0,20 Q 20,5 40,20 T 80,20 T 120,20 T 160,20"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : {
                              d: [
                                "M 0,20 Q 20,6 40,20 T 80,20 T 120,20 T 160,20",
                                "M 0,20 Q 20,34 40,20 T 80,20 T 120,20 T 160,20",
                                "M 0,20 Q 20,6 40,20 T 80,20 T 120,20 T 160,20",
                              ],
                            }
                      }
                      transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
                    />
                  </svg>
                  <div className="absolute bottom-1 right-2 font-mono text-[9px] text-zinc-400">
                    SIGNAL: AUDIO
                  </div>
                </div>

                {/* Caller Audio Snippet */}
                <div className="bg-black/[0.02] dark:bg-white/[0.03] p-2.5 rounded-xl border border-black/[0.04] dark:border-white/[0.05]">
                  <div className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">
                    Caller Inbound Audio
                  </div>
                  <p className="text-xs font-sans text-zinc-700 dark:text-zinc-300 italic leading-snug">
                    &ldquo;{activeScenario.callerQuote}&rdquo;
                  </p>
                </div>
              </div>

              {/* NODE 2: VoiceOps Processing Core */}
              <div className="rounded-2xl p-3.5 sm:p-4 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-500/20 dark:border-blue-500/30 shadow-xs flex flex-col justify-between space-y-3 relative overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="font-mono text-[11px] font-semibold text-blue-900 dark:text-blue-200">
                    UNDERSTANDING
                  </span>
                </div>

                {/* Live Structured Intent Payload */}
                <div className="space-y-1.5 py-1">
                  <div className="font-mono text-[9px] text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                    Extracted Intent
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-blue-500/20 dark:border-blue-500/30">
                    <div className="font-mono text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-blue-500 shrink-0" />
                      <span>{activeScenario.intentEntity}</span>
                    </div>
                    <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 pl-4.5 mt-0.5">
                      {activeScenario.intentScope}
                    </div>
                  </div>
                </div>

                {/* Cadence Verification */}
                <div className="flex items-center justify-between font-mono text-[9px] text-blue-600 dark:text-blue-400 pt-1 border-t border-blue-500/10">
                  <span>DISPATCH LATENCY</span>
                  <span className="font-semibold">{activeScenario.latency}</span>
                </div>
              </div>

              {/* NODE 3: Deterministic Action Resolution */}
              <div className="rounded-2xl p-3.5 sm:p-4 bg-white dark:bg-zinc-900/90 border border-black/[0.06] dark:border-white/[0.08] shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-mono text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                      ACTION EXECUTED
                    </span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>

                {/* Destination Action Card */}
                <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/25 border border-emerald-500/25">
                  <div className="flex items-center gap-1.5 mb-1 text-emerald-800 dark:text-emerald-300">
                    {activeScenario.actionDestination === "calendar" && (
                      <Calendar className="w-3.5 h-3.5" />
                    )}
                    {activeScenario.actionDestination === "crm" && (
                      <Database className="w-3.5 h-3.5" />
                    )}
                    {activeScenario.actionDestination === "dispatch" && (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span className="font-mono text-[10px] font-semibold uppercase">
                      {activeScenario.actionTitle}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-emerald-900 dark:text-emerald-200 font-medium leading-tight">
                    {activeScenario.actionResult}
                  </p>
                </div>

                {/* Lock Status */}
                <div className="flex items-center justify-between font-mono text-[9px] text-zinc-500 dark:text-zinc-400 pt-1 border-t border-black/[0.04] dark:border-white/[0.05]">
                  <span>TRANSACTION LOCKED</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    100% RELIABLE
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Interactive Scenario Selector */}
            <div className="pt-2 border-t border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mr-1">
                  SCENARIOS:
                </span>
                {HERO_SCENARIOS.map((sc, idx) => {
                  const isSelected = idx === activeScenarioIdx;
                  return (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => setActiveScenarioIdx(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-sans font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        isSelected
                          ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-xs font-semibold"
                          : "bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                      }`}
                    >
                      {sc.title}
                    </button>
                  );
                })}
              </div>

              {/* Status Verification Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/[0.08] dark:bg-blue-400/[0.12] text-xs font-mono text-blue-700 dark:text-blue-300 w-fit whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                <span>Deterministic Route · Zero Hallucination</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          DOWNWARD CONTINUITY ANCHOR (Connecting to Next Chapter)
          ========================================================================= */}
      <div className="relative max-w-7xl mx-auto w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] text-xs text-zinc-500 font-sans">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            TELEPHONY SIGNAL: CONTINUOUS
          </span>
          <span className="hidden sm:inline-block text-zinc-300 dark:text-zinc-700">·</span>
          <span className="hidden sm:inline-block text-zinc-600 dark:text-zinc-400">
            Automating the first layer of inbound operations
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          <span>voiceops.in</span>
          <span>·</span>
          <span>Sub-second Business OS</span>
        </div>
      </div>
    </section>
  );
});
