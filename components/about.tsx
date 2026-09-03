"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";

export const AboutSection = memo(function AboutSection() {
  return (
    <section id="about" className="py-28 md:py-40 relative overflow-hidden chapter-ivory border-t border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Editorial Eyebrow with Reveal */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="type-editorial-eyebrow text-blue-600 dark:text-blue-400 mb-4"
        >
          THE OPERATIONAL PROBLEM
        </motion.p>

        {/* Large Editorial Serif Headline */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="type-serif-display font-normal text-zinc-950 dark:text-white leading-[1.06]"
          >
            The calls your team
            <br />
            <span className="italic font-light text-zinc-500 dark:text-zinc-400">
              shouldn&apos;t have to answer.
            </span>
          </motion.h2>
        </div>

        {/* Two-Column Editorial Narrative with Generous Whitespace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="type-sans-body-lg text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal">
              In almost every growing enterprise, over 65% of incoming telephone calls repeat the exact same five conversations: checking opening times, asking service pricing, booking appointment slots, or qualifying basic requirements.
            </p>
            <p className="type-sans-body text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When key team members spend their day answering repetitive phone questions, customer wait times spike, staff attention is fragmented, and high-value deals slip through unanswered.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="type-sans-body text-zinc-800 dark:text-zinc-200 leading-relaxed">
              <strong className="text-zinc-950 dark:text-white font-semibold">VoiceOps creates a dedicated first layer.</strong> Every incoming caller is greeted in under a second by an intelligent conversational voice agent trained on your actual business rules, booking calendars, and product catalogs.
            </p>

            {/* Clean Editorial Numbers (No Heavy Cards) */}
            <div className="space-y-4 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0">01</span>
                <p className="type-sans-body-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-200">Zero Hold Times:</strong> Every caller receives immediate attention without traditional phone menus or IVR trees.
                </p>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0">02</span>
                <p className="type-sans-body-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-200">Real Work Completed:</strong> Appointments booked directly into your calendar and client profiles written to CRM.
                </p>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0">03</span>
                <p className="type-sans-body-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-200">Warm Human Handoff:</strong> When a caller needs a specialist, VoiceOps summarizes the conversation and transfers the line instantly.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
