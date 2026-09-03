"use client";

import React, { useState, memo } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaqItem } from "@/lib/types";

interface FaqProps {
  faqs?: FaqItem[];
}

const DEFAULT_FAQS = [
  {
    q: "Do we need to change our existing business phone number?",
    a: "No. You keep your existing number with zero disruption. We set up simple conditional call forwarding or SIP trunking from your current carrier (Verizon, AT&T, Twilio, RingCentral, Vonage, Telnyx, etc.) so VoiceOps answers whenever your line rings.",
  },
  {
    q: "What happens when a caller needs a human specialist?",
    a: "VoiceOps handles escalation with complete poise. If a caller requests a team member, has an urgent concern, or presents an edge case, VoiceOps performs an instant warm transfer to your staff line, providing an audio or SMS summary so your team knows the context immediately.",
  },
  {
    q: "Can VoiceOps check real-time calendar availability and prevent double bookings?",
    a: "Yes. VoiceOps integrates directly with Google Calendar, Outlook 365, Calendly, Cal.com, OpenTable, or custom booking software. Before confirming any reservation or appointment, VoiceOps queries live availability in real time to lock the slot with zero conflict.",
  },
  {
    q: "How fast does VoiceOps respond during a live phone call?",
    a: "VoiceOps operates with sub-400ms conversational turn cadence. This delivers natural human-like cadence, dynamic turn-taking, intelligent interruption handling, and zero awkward pauses.",
  },
  {
    q: "How long does a custom deployment take from audit to live calls?",
    a: "Most custom studio deployments go live within 7 to 10 business days. This covers auditing past call recordings, designing decision trees, integrating calendars & CRMs, and performing live validation testing before public launch.",
  },
];

export const FaqSection = memo(function FaqSection({ faqs }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items =
    faqs && faqs.length > 0
      ? faqs.map((f) => ({ q: f.q, a: f.a }))
      : DEFAULT_FAQS;

  return (
    <section id="faq" className="py-28 md:py-40 relative overflow-hidden bg-[#F5F1E8] dark:bg-[#07090e] border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] transition-colors">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Editorial Two-Column Structure (Reference Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4 text-left lg:sticky lg:top-28"
          >
            <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
              FAQ
            </p>

            <h2 className="type-serif-display text-zinc-950 dark:text-white font-normal leading-[1.08]">
              Your questions.
            </h2>

            <p className="type-sans-body-lg text-[#58534C] dark:text-zinc-400 font-normal leading-relaxed">
              Everything business owners and operations teams need to know about deploying VoiceOps.
            </p>
          </motion.div>

          {/* Right Column: Question List with Thin Rules and Smooth Accordion */}
          <div className="lg:col-span-7 divide-y divide-[rgba(36,33,26,0.08)] dark:divide-white/[0.1] border-y border-[rgba(36,33,26,0.08)] dark:border-white/[0.1]">
            {items.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="py-6 text-left">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left flex items-baseline justify-between gap-6 group outline-none"
                  >
                    <span className="font-serif text-xl sm:text-2xl text-zinc-950 dark:text-white font-normal group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {faq.q}
                    </span>

                    <span className="text-[#888278] group-hover:text-zinc-950 dark:group-hover:text-white transition-colors shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 type-sans-body text-[#58534C] dark:text-zinc-400 leading-relaxed text-sm">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});
