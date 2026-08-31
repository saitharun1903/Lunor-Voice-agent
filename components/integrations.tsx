"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Calendar,
  Layers,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  Sparkles,
  Server,
  Share2,
  Workflow,
  CheckCircle2,
} from "lucide-react";

export function IntegrationsSection() {
  const categories = [
    {
      title: "Telephony & Carrier Networks",
      description: "Keep your existing business phone number. Connect via simple carrier forwarding or direct SIP trunking.",
      items: ["Twilio", "RingCentral", "Telnyx", "Vonage", "8x8", "FreePBX / Asterisk", "SIP Trunking", "Direct Forwarding"],
      icon: PhoneCall,
      highlight: "Keep Your Existing Number",
    },
    {
      title: "Calendar & Scheduling Engines",
      description: "Real-time bi-directional slot verification, conflict prevention, and instant booking dispatch.",
      items: ["Google Calendar", "Outlook 365", "Calendly", "OpenTable", "Resy", "JaneApp", "Mindbody", "Acuity"],
      icon: Calendar,
      highlight: "Real-Time Slot Sync",
    },
    {
      title: "CRMs & Operational Systems",
      description: "Automatically log caller transcripts, qualified lead attributes, and booking confirmations into your database.",
      items: ["Salesforce", "HubSpot", "GoHighLevel", "Zoho CRM", "Zendesk", "Zapier", "Make.com", "Custom Webhooks"],
      icon: Layers,
      highlight: "Instant Lead & Data Sync",
    },
    {
      title: "Enterprise Governance & Security",
      description: "Strict isolation ensuring zero caller audio or transcripts are ever used to train foundation models.",
      items: ["SOC2 Type II Ready", "HIPAA PHI Safeguards", "TLS 1.3 / SRTP", "Zero Model Retention", "Role-Based Access", "99.98% Telephony SLA"],
      icon: ShieldCheck,
      highlight: "Enterprise Guardrails",
    },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="integrations" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 mb-4 uppercase"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Carrier & Software Ecosystem</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-5"
          >
            Integrates natively into your existing phone stack.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto text-balance"
          >
            No complex phone system rip-and-replace. Luno sits seamlessly in front of your carriers, booking tools, and CRMs.
          </motion.p>
        </div>

        {/* Integration Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-3xl p-8 sm:p-9 backdrop-blur-2xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.08] dark:border-white/[0.12] shadow-lg hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Specular Line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-zinc-700 dark:text-zinc-300">
                      {cat.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* Badges Pill Grid */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {cat.items.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.08] text-zinc-800 dark:text-zinc-200"
                      >
                        <CheckCircle2 className="w-3 h-3 text-blue-500" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-medium">
                  <span>Custom Telephony Protocol</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">Zero Lock-In</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
