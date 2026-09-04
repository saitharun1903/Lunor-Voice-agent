"use client";

import React, { memo, useCallback, useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Radio,
  PhoneIncoming,
  Cpu,
  CheckCircle2,
  Calendar,
  Sparkles,
  Layers,
  Database,
  Volume2,
} from "lucide-react";
import { MOTION_EASINGS } from "@/lib/motion-config";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  onTalkToVoiceOps?: () => void;
  onTalkToLuno?: () => void;
}

const HERO_SCENARIOS = [
  {
    id: "booking",
    title: "Appointment Booking",
    callerQuote: '"Can I see your modern door showroom this Thursday at 3 PM?"',
    intent: "Schedule Showroom Visit · 2 Guests",
    action: "Calendar Slot Reserved + SMS Confirmation",
    latency: "340ms",
    status: "Confirmed in Google Calendar",
  },
  {
    id: "qualification",
    title: "Lead Qualification",
    callerQuote: '"We need acoustic soundproofing for a 4,000 sq ft office."',
    intent: "Commercial Tier 1 · >$25k Project Scope",
    action: "High-Priority Lead Tagged + Sales Rep Notified",
    latency: "390ms",
    status: "Synced to HubSpot CRM",
  },
  {
    id: "enquiry",
    title: "Instant Specification",
    callerQuote: '"What are the standard lead times for pivot glass doors?"',
    intent: "Product Specification & Lead Time Query",
    action: "Verified Knowledge Base Answer Delivered",
    latency: "310ms",
    status: "Resolved with Zero Hold Time",
  },
];

const ORCHESTRATION_STAGES = [
  { id: "call", label: "01 Inbound Call", icon: PhoneIncoming, detail: "Carrier SIP Ingest" },
  { id: "voiceops", label: "02 VoiceOps Core", icon: Cpu, detail: "Sub-400ms Turn" },
  { id: "intent", label: "03 Intent Extraction", icon: CheckCircle2, detail: "Entity Resolution" },
  { id: "action", label: "04 Execution Lock", icon: Calendar, detail: "CRM & Calendar Write" },
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
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [isHoveringConsole, setIsHoveringConsole] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-cycle stages smoothly unless user hovers
  useEffect(() => {
    if (shouldReduceMotion || isHoveringConsole) return;
    const stageInterval = setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % ORCHESTRATION_STAGES.length);
    }, 2800);
    return () => clearInterval(stageInterval);
  }, [shouldReduceMotion, isHoveringConsole]);

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

  // Subtle physical 3D perspective tilt
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({
        rotateX: -y * 8,
        rotateY: x * 8,
      });
    },
    [shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHoveringConsole(false);
  }, []);

  const activeScenario = HERO_SCENARIOS[activeScenarioIdx];

  return (
    <section
      ref={containerRef}
      aria-label="VoiceOps Introduction & Visual Telephony Centerpiece"
      className="relative min-h-[96vh] flex flex-col justify-between pt-28 sm:pt-32 pb-16 px-5 sm:px-8 overflow-hidden bg-[#FAF8F5] dark:bg-[#0D0F14] transition-colors duration-300"
    >
      {/* Subtle Atmospheric Light Cone (No AI cliché glows) */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-[800px] lg:w-[1100px] h-[500px] rounded-full bg-gradient-to-b from-blue-500/[0.035] via-blue-600/[0.02] to-transparent dark:from-blue-500/[0.05] dark:via-indigo-500/[0.03] dark:to-transparent blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto w-full space-y-12 sm:space-y-14 my-auto">
        {/* =========================================================
            TOP ROW: Confident Editorial Framing & Typography Statement
            ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: MOTION_EASINGS.editorial }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="font-mono text-[11px] font-semibold tracking-wider text-zinc-800 dark:text-zinc-200 uppercase">
              {eyebrow}
            </span>
          </motion.div>

          {/* Controlled Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: MOTION_EASINGS.editorial }}
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.12] text-zinc-950 dark:text-white tracking-tight"
          >
            {headline.toLowerCase().includes("of every call") ? (
              <>
                {headline.substring(0, headline.toLowerCase().indexOf("of every call")).trim()}
                <br />
                <span className="text-zinc-500 dark:text-zinc-400 font-normal">
                  {headline.substring(headline.toLowerCase().indexOf("of every call"))}
                </span>
              </>
            ) : (
              headline
            )}
          </motion.h1>

          {/* Subtitle Statement */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: MOTION_EASINGS.editorial }}
            className="font-sans text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto font-normal"
          >
            {subheadline}
          </motion.p>

          {/* Dual Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: MOTION_EASINGS.editorial }}
            className="pt-2 flex flex-wrap items-center justify-center gap-3.5"
          >
            <button
              onClick={handleTalkToVoiceOps}
              className="inline-flex items-center gap-2 min-h-[46px] px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs sm:text-[13px] font-semibold tracking-tight shadow-md hover:shadow-lg transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>Talk to VoiceOps</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 min-h-[46px] px-5 py-2.5 rounded-xl bg-transparent text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white border border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30 font-sans text-xs sm:text-[13px] font-medium transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>Build My Voice Agent</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </button>
          </motion.div>
        </div>

        {/* =========================================================
            VISUAL CENTERPIECE: The Autonomous Telephony Instrument
            Expansive, tactile, commanding meaningful screen scale
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: MOTION_EASINGS.editorial }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringConsole(true)}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1200px" }}
          className="relative w-full select-none"
        >
          <div
            className="w-full rounded-3xl p-6 sm:p-8 bg-[#FAF8F2] dark:bg-[#10131B] border border-[rgba(36,33,26,0.09)] dark:border-white/[0.09] shadow-xl space-y-6 text-left transition-all duration-200 ease-out"
            style={{
              transform: shouldReduceMotion
                ? undefined
                : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Top Telemetry Header Rail */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-600/10 dark:bg-blue-400/15 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                    VOICEOPS AUTONOMOUS RUNTIME
                  </div>
                  <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                    Telephony Protocol · Sub-second First Layer
                  </div>
                </div>
              </div>

              {/* Status Chips */}
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ONLINE · 99.98% UPTIME
                </span>
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-medium">
                  {activeScenario.latency}
                </span>
              </div>
            </div>

            {/* Middle Section: Live Resonant Waveform Stage */}
            <div className="relative h-28 sm:h-32 w-full rounded-2xl bg-zinc-950 border border-black/10 dark:border-white/[0.08] flex items-center justify-center overflow-hidden px-5">
              <svg
                viewBox="0 0 400 80"
                className="w-full h-full text-blue-500 overflow-visible"
                preserveAspectRatio="none"
              >
                {/* Secondary Harmonic Wave */}
                <motion.path
                  d="M0,40 Q50,15 100,40 T200,40 T300,40 T400,40"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="1.5"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          d: [
                            "M0,40 Q50,15 100,40 T200,40 T300,40 T400,40",
                            "M0,40 Q50,65 100,40 T200,40 T300,40 T400,40",
                            "M0,40 Q50,15 100,40 T200,40 T300,40 T400,40",
                          ],
                        }
                  }
                  transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
                />

                {/* Primary Resonant Voice Spline */}
                <motion.path
                  d="M0,40 Q50,60 100,40 T200,40 T300,40 T400,40"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          d: [
                            "M0,40 Q50,60 100,40 T200,40 T300,40 T400,40",
                            "M0,40 Q50,20 100,40 T200,40 T300,40 T400,40",
                            "M0,40 Q50,60 100,40 T200,40 T300,40 T400,40",
                          ],
                        }
                  }
                  transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
                />

                {/* Traveling Signal Pulse Node */}
                <motion.circle
                  r="4"
                  fill="#93C5FD"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          cx: [20, 380, 20],
                          cy: [40, 40, 40],
                        }
                  }
                  transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
                />
              </svg>

              {/* Floating Scenario Caller Transcript Bubble */}
              <div className="absolute inset-x-4 sm:inset-x-8 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 bg-zinc-900/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg text-xs font-sans max-w-[80%] truncate">
                  <Volume2 className="w-3.5 h-3.5 text-blue-400 shrink-0 animate-pulse" />
                  <span className="italic truncate">{activeScenario.callerQuote}</span>
                </div>

                <span className="hidden sm:inline-block font-mono text-[10px] text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded border border-white/10">
                  Sub-400ms Cadence
                </span>
              </div>
            </div>

            {/* 4-Stage Intent Orchestration Track */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                <span>ORCHESTRATION PIPELINE</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  STAGE 0{activeStageIdx + 1} / 04
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ORCHESTRATION_STAGES.map((stage, idx) => {
                  const isActive = idx === activeStageIdx;
                  const isPassed = idx < activeStageIdx;
                  const Icon = stage.icon;

                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveStageIdx(idx)}
                      className={`p-3 rounded-xl text-left border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-950/40 border-blue-500/40 text-blue-700 dark:text-blue-300 shadow-sm"
                          : isPassed
                          ? "bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-500/20 text-zinc-700 dark:text-zinc-300"
                          : "bg-black/[0.02] dark:bg-white/[0.02] border-black/[0.05] dark:border-white/[0.06] text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`} />
                        <span className="text-[11px] font-mono font-semibold">{stage.label}</span>
                      </div>
                      <div className="text-[10px] font-mono opacity-80 pl-5">{stage.detail}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Interactive Scenario Selector & Live Resolution */}
            <div className="pt-2 border-t border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Scenario Pills */}
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
                      className={`px-3 py-1 rounded-lg text-xs font-sans font-medium transition-all ${
                        isSelected
                          ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-xs"
                          : "bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                      }`}
                    >
                      {sc.title}
                    </button>
                  );
                })}
              </div>

              {/* Resolved Action Preview */}
              <div className="flex items-center gap-2 text-xs font-sans text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium">{activeScenario.status}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Downward Continuity Anchor to Next Chapter */}
      <div className="relative max-w-5xl mx-auto w-full pt-8 flex items-center justify-between border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] text-xs text-zinc-500 font-sans">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            Deterministic First-Layer Response
          </span>
          <span className="hidden sm:inline-block">· Zero Hold Queues</span>
        </div>
        <span className="font-mono text-[11px] text-zinc-400">voiceops.in · Telephony OS</span>
      </div>
    </section>
  );
});
