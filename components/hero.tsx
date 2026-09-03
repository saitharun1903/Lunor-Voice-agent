"use client";

import React, { memo, useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
  Check,
  Calendar,
  Sparkles,
  Play,
  RotateCcw,
  Zap,
  ShieldCheck,
  Building2,
  Clock,
  User,
  Bot
} from "lucide-react";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  onTalkToLuno?: () => void;
  onTalkToVoiceOps?: () => void;
}

const HERO_SCENARIOS = [
  {
    id: "realestate",
    category: "Real Estate Showing",
    caller: "Hi, I'd like to check availability for a 3-bedroom private showing tomorrow afternoon around 3 PM.",
    agent: "Tomorrow at 3:00 PM with Marcus Vance is open. I've reserved that slot for you and sent an SMS confirmation with the invite link.",
    actionTitle: "Google Calendar & Hubspot Synced",
    actionDetail: "Showing Locked: Tomorrow 3:00 PM · Lead Scored 98/100",
    latency: "320ms",
  },
  {
    id: "clinic",
    category: "Dental Consultation",
    caller: "Do you have any openings for an emergency dental clean and checkup this Thursday morning?",
    agent: "We have an opening Thursday at 9:30 AM with Dr. Aris. I've reserved that time and dispatched your digital intake link.",
    actionTitle: "EHR Dental Schedule Confirmed",
    actionDetail: "Slot Reserved: Thursday 9:30 AM · Patient Record Updated",
    latency: "290ms",
  },
  {
    id: "restaurant",
    category: "VIP Table Booking",
    caller: "Can I book a booth for a party of 4 this Friday at 7:30 PM? We have one peanut allergy.",
    agent: "A corner booth for 4 is confirmed for Friday at 7:30 PM. I've flagged the kitchen regarding the peanut allergy.",
    actionTitle: "OpenTable Reservation Written",
    actionDetail: "Table #12 Locked · Dietary Safety Alert Attached",
    latency: "340ms",
  },
];

export const Hero = memo(function Hero({
  eyebrow = "Voice Automation for Business",
  subheadline = "VoiceOps builds custom AI voice systems that handle repetitive conversations — answering customer enquiries, qualifying leads, and booking appointments directly into your calendar with zero hold times.",
  onTalkToLuno,
  onTalkToVoiceOps,
}: HeroProps) {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(3); // 1 = caller, 2 = agent, 3 = action resolved

  const currentScenario = HERO_SCENARIOS[activeScenarioIdx];

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleTalkToVoiceOps = useCallback(() => {
    const trigger = onTalkToVoiceOps || onTalkToLuno;
    if (trigger) {
      trigger();
    } else {
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [onTalkToLuno, onTalkToVoiceOps]);

  // Interactive scenario replay simulation
  const handleReplay = useCallback(() => {
    setIsPlaying(true);
    setStep(1);
    const t1 = setTimeout(() => setStep(2), 1200);
    const t2 = setTimeout(() => {
      setStep(3);
      setIsPlaying(false);
    }, 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* 1. Atmospheric Ambient Lighting Glow (Anton Skvortsov / Enigma style) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] ambient-glow-blue pointer-events-none -z-10 blur-3xl opacity-70 dark:opacity-50" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Subtle Background Geometric Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none -z-10 mask-[radial-gradient(ellipse_at_center,black_50%,transparent_80%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Editorial Display & Kinetic Copy */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Context Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-zinc-700 dark:text-zinc-300 bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] shadow-xs backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>{eyebrow}</span>
              <span className="text-zinc-300 dark:text-zinc-600">|</span>
              <span className="text-blue-600 dark:text-blue-400 font-mono font-medium lowercase">sub-400ms latency</span>
            </motion.div>

            {/* Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="type-display text-zinc-950 dark:text-white max-w-2xl text-left"
            >
              Automate the first layer
              <br />
              <span className="text-zinc-400 dark:text-zinc-500">
                of every business call.
              </span>
            </motion.h1>

            {/* Product Thesis */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="type-body-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed"
            >
              {subheadline}
            </motion.p>

            {/* Tactile Kinetic CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <button
                onClick={scrollToContact}
                className="group relative flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl type-btn btn-solid-primary shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden active:scale-[0.98]"
              >
                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <span className="font-semibold text-sm">Build My Voice Agent</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleTalkToVoiceOps}
                className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl type-btn btn-outline-secondary hover:border-blue-500/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all duration-200 active:scale-[0.98]"
              >
                <div className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-blue-600 dark:bg-blue-400 rounded-full group-hover:animate-soundwave" />
                  <span className="w-0.5 h-3 bg-blue-600 dark:bg-blue-400 rounded-full group-hover:animate-soundwave [animation-delay:0.2s]" />
                  <span className="w-0.5 h-2 bg-blue-600 dark:bg-blue-400 rounded-full group-hover:animate-soundwave [animation-delay:0.4s]" />
                </div>
                <span className="font-semibold text-sm">Talk to VoiceOps Live ↓</span>
              </button>
            </motion.div>

            {/* Authentic Trust Pillars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-3 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs text-zinc-500 dark:text-zinc-400"
            >
              <div className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Natural Human-Like Cadence</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Zero Double Booking Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Warm SIP Carrier Transfer</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Kinetic Conversational Terminal (Anton Skvortsov & Enigma aesthetic) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Floating Metric Glass Badge: Latency */}
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:flex absolute -top-4 -left-6 z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#141620]/95 backdrop-blur-xl border border-blue-500/25 shadow-lg text-[11px] font-mono text-zinc-800 dark:text-zinc-200"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>LATENCY: {currentScenario.latency}</span>
            </motion.div>

            {/* Floating Metric Glass Badge: Deterministic Sync */}
            <motion.div
              animate={{ y: [3, -3, 3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:flex absolute -bottom-4 -right-4 z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#141620]/95 backdrop-blur-xl border border-emerald-500/25 shadow-lg text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Deterministic Sync</span>
            </motion.div>

            {/* Main Interactive Studio Terminal */}
            <div className="relative rounded-3xl p-6 sm:p-7 structured-card shadow-2xl border border-black/[0.08] dark:border-white/[0.1] space-y-4 backdrop-blur-xl">
              {/* Terminal Top Bar */}
              <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.07] pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="type-eyebrow text-zinc-950 dark:text-white font-bold">
                      VOICEOPS TELEPHONY CORE
                    </span>
                  </div>
                </div>

                {/* Scenario Switcher Tabs */}
                <div className="flex items-center gap-1 bg-black/[0.04] dark:bg-white/[0.06] p-0.5 rounded-lg text-[11px]">
                  {HERO_SCENARIOS.map((sc, i) => (
                    <button
                      key={sc.id}
                      onClick={() => {
                        setActiveScenarioIdx(i);
                        setStep(3);
                      }}
                      className={`px-2 py-1 rounded-md transition-all font-medium ${
                        activeScenarioIdx === i
                          ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-xs"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                      }`}
                    >
                      {sc.category.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Animated Acoustic Frequency Ribbon */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-blue-600/[0.03] dark:bg-blue-600/[0.06] border border-blue-500/15 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-3.5 rounded-full bg-blue-600 animate-soundwave" />
                    <span className="w-1 h-5 rounded-full bg-blue-500 animate-soundwave [animation-delay:0.15s]" />
                    <span className="w-1 h-2.5 rounded-full bg-blue-400 animate-soundwave [animation-delay:0.3s]" />
                    <span className="w-1 h-6 rounded-full bg-blue-600 animate-soundwave [animation-delay:0.45s]" />
                    <span className="w-1 h-4 rounded-full bg-blue-500 animate-soundwave [animation-delay:0.6s]" />
                  </div>
                  <span className="font-mono text-[11px] text-zinc-600 dark:text-zinc-300 font-medium">
                    {isPlaying ? "Simulating Live Call..." : "Call Session #8491 Active"}
                  </span>
                </div>

                <button
                  onClick={handleReplay}
                  disabled={isPlaying}
                  className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors disabled:opacity-50"
                  title="Replay conversation flow"
                >
                  <RotateCcw className={`w-3 h-3 ${isPlaying ? "animate-spin" : ""}`} />
                  <span>Replay Flow</span>
                </button>
              </div>

              {/* 3-Step First-Layer Story with Dynamic Animation */}
              <div className="space-y-3">
                {/* 01. Inbound Caller */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`caller-${currentScenario.id}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: step >= 1 ? 1 : 0.3, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.05] space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] text-zinc-500">
                      <span className="flex items-center gap-1.5 font-semibold text-zinc-700 dark:text-zinc-300">
                        <User className="w-3 h-3" />
                        01. Inbound Caller
                      </span>
                      <span className="font-mono text-[10px]">00:03</span>
                    </div>
                    <p className="type-body-sm text-zinc-900 dark:text-zinc-100 font-normal leading-relaxed">
                      “{currentScenario.caller}”
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* 02. VoiceOps Voice System */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`agent-${currentScenario.id}`}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: step >= 2 ? 1 : 0.3, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-3.5 rounded-2xl bg-blue-600/[0.04] dark:bg-blue-600/[0.08] border border-blue-600/20 space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Bot className="w-3 h-3" />
                        02. VoiceOps Understands & Responds
                      </span>
                      <span className="font-mono text-[10px]">+{currentScenario.latency}</span>
                    </div>
                    <p className="type-body-sm text-zinc-950 dark:text-white font-medium leading-relaxed">
                      “{currentScenario.agent}”
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* 03. Real Operational Action */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`action-${currentScenario.id}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: step >= 3 ? 1 : 0.3, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="p-3.5 rounded-2xl bg-emerald-500/[0.06] dark:bg-emerald-500/[0.1] border border-emerald-500/25 flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <span className="type-eyebrow text-emerald-600 dark:text-emerald-400 block text-[10px] font-bold">
                        03. OPERATIONAL ACTION EXECUTED
                      </span>
                      <p className="type-body-sm text-zinc-900 dark:text-zinc-100 font-semibold">
                        {currentScenario.actionTitle}
                      </p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                        {currentScenario.actionDetail}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold font-mono">
                        <Check className="w-3 h-3" />
                        RESOLVED
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Terminal Footer CTA */}
              <div className="pt-2">
                <button
                  onClick={handleTalkToVoiceOps}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold btn-solid-primary shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-blue-300" />
                  <span>Experience Real WebRTC Voice Studio Below ↓</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
