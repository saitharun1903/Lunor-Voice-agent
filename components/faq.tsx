"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do we need to change our existing business phone number?",
      a: "No. You keep your existing numbers with zero disruption. We simply set up conditional call forwarding, SIP trunking, or simultaneous ringing from your existing carrier (Twilio, RingCentral, Vonage, Telnyx, Verizon, AT&T, etc.) into your Lunor voice agent.",
    },
    {
      q: "What happens when a caller asks something complex or requests a human manager?",
      a: "Lunor handles human escalation gracefully. If a caller requests a specialist, exhibits high urgency, or presents a complex edge case, Lunor performs an instant warm transfer (SIP REFER) to your designated staff line while automatically dispatching a real-time transcript summary to your phone or CRM.",
    },
    {
      q: "Can Lunor check real-time calendar availability and prevent double bookings?",
      a: "Yes. Lunor integrates directly with your Google Calendar, Outlook 365, Calendly, OpenTable, JaneApp, or custom booking API. Before confirming any booking, Lunor queries live availability and holds the slot in real time with zero risk of double booking.",
    },
    {
      q: "How fast is Lunor's voice response cadence during a live conversation?",
      a: "Lunor operates with an ultra-low conversational latency of sub-400ms. This enables natural human-like cadence, dynamic turn-taking, intelligent interruption handling, and zero awkward pauses.",
    },
    {
      q: "Is our caller conversation and patient/client data secure?",
      a: "Yes. Lunor is engineered with enterprise security guardrails including SOC2 readiness, HIPAA safeguards for PHI redaction, TLS 1.3/SRTP encrypted audio streams, and a strict zero data retention policy for foundation model training.",
    },
    {
      q: "How long does a custom studio deployment take from kickoff to go-live?",
      a: "Standard studio deployments go live within 7 to 14 business days. This includes call auditing, prompt engineering, calendar & CRM API integration, edge-case testing, and live pilot validation before public rollout.",
    },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden bg-black/[0.015] dark:bg-white/[0.015] border-y border-black/[0.04] dark:border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 mb-4 uppercase font-mono"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Technical & Operational Clarity</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-5"
          >
            Frequently asked questions.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed text-balance"
          >
            Everything business owners and technical leaders need to know about deploying Lunor voice systems.
          </motion.p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-3xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-white dark:bg-zinc-900 border-blue-500/40 shadow-lg"
                    : "bg-white/70 dark:bg-zinc-900/60 border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.15]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-blue-600 text-white rotate-180"
                        : "bg-black/[0.04] dark:bg-white/[0.08] text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 sm:px-7 pb-6 sm:pb-7 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-black/[0.04] dark:border-white/[0.06] pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Have more questions CTA */}
        <div className="mt-12 text-center p-8 rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/[0.08]">
          <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
            Have a custom workflow or enterprise telephony architecture requirement?
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-5">
            Our engineering team will review your call recording samples and provide a custom conversational blueprint.
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold glass-button-primary shadow-md"
          >
            <span>Speak With An Engineer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
