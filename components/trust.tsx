"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe2, ShieldCheck, Zap, PhoneForwarded, Lock, Layers } from "lucide-react";

export function TrustSection() {
  const trustFeatures = [
    {
      title: "Sub-450ms Latency",
      description:
        "Engineered for natural conversational cadence without awkward delays, pauses, or overlapping interruptions.",
      icon: Zap,
    },
    {
      title: "Multilingual Intelligence",
      description:
        "Fluidly converse in English, Spanish, French, German, Japanese, and 30+ international languages and accents.",
      icon: Globe2,
    },
    {
      title: "Warm Human Escalation",
      description:
        "When a caller needs a human specialist, VoiceOps summarizes the context and executes an instant warm phone transfer.",
      icon: PhoneForwarded,
    },
    {
      title: "Enterprise Privacy & Security",
      description:
        "Compliant data governance with configurable encryption, caller redaction, and strict zero-training privacy standards.",
      icon: Lock,
    },
    {
      title: "Direct System Integration",
      description:
        "Integrates with Google Calendar, Outlook, Salesforce, HubSpot, OpenTable, JaneApp, and custom REST APIs.",
      icon: Layers,
    },
    {
      title: "99.98% Telephony Reliability",
      description:
        "Redundant carrier-grade routing ensures your business voice layer stays online around the clock, 365 days a year.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-black/[0.015] dark:bg-white/[0.015] border-y border-black/[0.04] dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 font-mono">
            Enterprise Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white mb-4">
            Engineered for high-trust business phone systems.
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We provide the reliability, security, and precision required to represent your brand on live telephone lines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-3xl p-7 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
