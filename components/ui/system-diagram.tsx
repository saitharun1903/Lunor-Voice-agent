"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight, UserCheck, CalendarCheck, Shield } from "lucide-react";

export const SystemDiagram = memo(function SystemDiagram() {
  const steps = [
    {
      num: "01",
      label: "CUSTOMER",
      headline: "Inbound Phone Call",
      description: "A customer calls your regular business phone number with an urgent booking, inquiry, or question.",
    },
    {
      num: "02",
      label: "VOICEOPS",
      headline: "Instant Answer",
      description: "Answers in under a second with natural conversational cadence. Zero hold music, zero robotic menus.",
    },
    {
      num: "03",
      label: "UNDERSTAND",
      headline: "Context & Intent",
      description: "Listens to natural phrasing, clarifies specific preferences, and qualifies the caller's requirements.",
      highlight: true,
    },
    {
      num: "04",
      label: "ACT",
      headline: "Real Execution",
      description: "Checks live calendars, reserves confirmed slots, queries product specs, or creates CRM records.",
      highlight: true,
    },
    {
      num: "05",
      label: "RESOLUTION",
      headline: "System Sync or Handoff",
      description: "Completed directly in software, or warm-transferred to your specialist with complete summary notes.",
    },
  ];

  return (
    <section id="architecture" className="py-28 md:py-40 relative overflow-hidden bg-[#F5F1E8] dark:bg-[#07090e] border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] transition-colors">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section Heading with Staggered Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16 sm:mb-20 text-left space-y-3"
        >
          <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
            THE SIGNATURE CONCEPT
          </p>

          <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal">
            Every business has a first layer.
          </h2>

          <p className="type-sans-body-lg text-[#58534C] dark:text-zinc-400 leading-relaxed font-normal">
            VoiceOps sits quietly in front of your phones, taking care of initial conversations before they interrupt your operational team.
          </p>
        </motion.div>

        {/* The 5-Stage Connected Concept Flow with Animated VoiceOps Signal */}
        <div className="relative">
          {/* Animated Connecting Signal Line (Desktop) */}
          <div className="hidden lg:block absolute top-7 left-8 right-8 h-[2px] bg-[rgba(36,33,26,0.08)] dark:bg-white/[0.08] pointer-events-none z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500/40 via-blue-500 to-blue-500/40"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "linear",
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`p-6 rounded-2xl transition-all duration-200 ${
                  idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                } ${
                  step.highlight
                    ? "bg-[#FAF8F2] dark:bg-[#0e1220] border border-blue-600/35 shadow-sm"
                    : "bg-[#FAF8F2]/75 dark:bg-white/[0.03] border border-[rgba(36,33,26,0.08)] dark:border-white/[0.07]"
                }`}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(36,33,26,0.07)] dark:border-white/[0.08]">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    {step.num}
                  </span>
                  <span className="type-editorial-eyebrow text-[#888278] dark:text-zinc-500 text-[10px]">
                    {step.label}
                  </span>
                </div>

                <h3 className="font-serif text-lg text-zinc-950 dark:text-white font-normal mb-2">
                  {step.headline}
                </h3>

                <p className="type-sans-body-sm text-[#58534C] dark:text-zinc-400 text-xs leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quiet Bottom Editorial Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 pt-8 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs text-zinc-500 font-sans"
        >
          <span>Compatible with all carriers, Twilio, SIP trunks, or simple conditional phone forwarding.</span>
          <span className="font-mono text-zinc-400">Zero telephone hardware to install</span>
        </motion.div>
      </div>
    </section>
  );
});
