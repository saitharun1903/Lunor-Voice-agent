"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  PhoneOff,
  Zap,
  Target,
  Clock,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export function ResultsValueSection() {
  const outcomes = [
    {
      title: "Zero missed inbound calls",
      description:
        "Every ring is answered in under 2 seconds, eliminating busy signals, voicemail drop-offs, and lost customer revenue.",
      icon: PhoneOff,
    },
    {
      title: "Less repetitive phone work",
      description:
        "Offload routine questions, booking requests, and intake forms so your core staff can focus on in-person and high-value work.",
      icon: Sparkles,
    },
    {
      title: "Instant sub-second responses",
      description:
        "No waiting on hold. Real-time conversational intelligence provides immediate resolution for your callers.",
      icon: Zap,
    },
    {
      title: "More captured & qualified leads",
      description:
        "Structure caller intent, capture essential contact details, and qualify budgets 24 hours a day.",
      icon: Target,
    },
    {
      title: "24/7 continuous availability",
      description:
        "Provide uninterrupted hospitality, after-hours medical intake, or weekend real estate inquiries without extra shifts.",
      icon: Clock,
    },
    {
      title: "Standardized brand experience",
      description:
        "Deliver polite, accurate, and protocol-compliant conversations every single time with zero bad mood variability.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-black/[0.015] dark:bg-white/[0.015] border-y border-black/[0.04] dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
            Tangible Business Outcomes
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white mb-4">
            Built for measurable operational return.
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We don't sell generic AI experiments. We eliminate the repetitive phone friction that costs businesses customers and time.
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            return (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="rounded-3xl p-7 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                    {outcome.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
