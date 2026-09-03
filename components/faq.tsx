"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do we need to change our existing business phone number?",
      a: "No. You keep your existing numbers with zero disruption. We simply set up conditional call forwarding, SIP trunking, or simultaneous ringing from your existing carrier (Twilio, RingCentral, Vonage, Telnyx, Verizon, AT&T, FreePBX, etc.) into your VoiceOps voice agent.",
    },
    {
      q: "What happens when a caller asks something complex or requests a human specialist?",
      a: "VoiceOps handles human escalation gracefully. If a caller requests a specialist, exhibits high urgency, or presents a complex edge case, VoiceOps performs an instant warm transfer (SIP REFER) to your designated staff line while automatically dispatching a real-time transcript summary to your phone or CRM.",
    },
    {
      q: "Can VoiceOps check real-time calendar availability and prevent double bookings?",
      a: "Yes. VoiceOps integrates directly with your Google Calendar, Outlook 365, Calendly, OpenTable, JaneApp, or custom booking API. Before confirming any booking, VoiceOps queries live availability and holds the slot in real time with zero risk of double booking.",
    },
    {
      q: "How fast is VoiceOps's voice response cadence during a live conversation?",
      a: "VoiceOps operates with an ultra-low conversational latency of sub-400ms. This enables natural human-like cadence, dynamic turn-taking, intelligent interruption handling, and zero awkward pauses.",
    },
    {
      q: "Is our caller conversation and patient/client data secure?",
      a: "Yes. VoiceOps is engineered with enterprise security guardrails including SOC2 readiness, HIPAA safeguards for PHI redaction, TLS 1.3/SRTP encrypted audio streams, and a strict zero data retention policy for foundation model training.",
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
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-20 text-left">
          <p className="type-eyebrow text-zinc-400 mb-4">FAQ</p>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-5">
            Frequently asked questions.
          </h2>

          <p className="type-body text-zinc-600 dark:text-zinc-400">
            Everything business owners and technical leaders need to know about deploying VoiceOps voice systems.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all border ${
                  isOpen
                    ? "bg-white dark:bg-zinc-900 border-black/[0.12] dark:border-white/[0.16] shadow-sm"
                    : "bg-black/[0.015] dark:bg-white/[0.02] border-black/[0.05] dark:border-white/[0.06] hover:border-black/[0.09]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="type-h3 text-zinc-950 dark:text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-black text-white dark:bg-white dark:text-black rotate-180"
                        : "bg-black/[0.04] dark:bg-white/[0.08] text-zinc-500"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="px-6 pb-6 type-body text-zinc-600 dark:text-zinc-300 border-t border-black/[0.04] dark:border-white/[0.05] pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Have custom requirement */}
        <div className="mt-12 p-8 rounded-3xl structured-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <h4 className="type-h3 text-zinc-950 dark:text-white">
              Have a custom telephony architecture requirement?
            </h4>
            <p className="type-body-sm text-zinc-500 dark:text-zinc-400">
              Our engineering team will review your call recording samples and provide a custom blueprint.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full type-btn btn-solid-primary shrink-0"
          >
            <span>Speak With An Engineer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
