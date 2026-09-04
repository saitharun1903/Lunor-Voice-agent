"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";

export const AboutSection = memo(function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-24 md:py-28 relative overflow-hidden bg-white dark:bg-[#07090e] border-t border-slate-100 dark:border-white/[0.08] transition-colors scroll-mt-16">
      {/* Continuous Signal Conduit Bridge from Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-10 bg-gradient-to-b from-blue-600 via-blue-500 to-transparent pointer-events-none z-10 opacity-70" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Editorial Eyebrow with Reveal */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="type-editorial-eyebrow text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
          <span>THE OPERATIONAL PROBLEM</span>
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
            <span className="italic font-light text-slate-500 dark:text-zinc-400">
              shouldn&apos;t have to answer.
            </span>
          </motion.h2>
        </div>

        {/* Two-Column Editorial Narrative with Generous Whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-1 lg:col-span-6 space-y-6"
          >
            <p className="type-sans-body-lg text-slate-900 dark:text-zinc-200 leading-relaxed font-normal">
              In almost every growing enterprise, over 65% of incoming telephone calls repeat the exact same five conversations: checking opening times, asking service pricing, booking appointment slots, or qualifying basic requirements.
            </p>
            <p className="type-sans-body text-slate-600 dark:text-zinc-400 leading-relaxed">
              When key team members spend their day answering repetitive phone questions, customer wait times spike, staff attention is fragmented, and high-value deals slip through unanswered.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-1 lg:col-span-6 space-y-6"
          >
            <p className="type-sans-body text-slate-900 dark:text-zinc-200 leading-relaxed">
              <strong className="text-zinc-950 dark:text-white font-semibold">VoiceOps creates a dedicated first layer.</strong> Every incoming caller is greeted in under a second by an intelligent conversational voice agent trained on your actual business rules, booking calendars, and product catalogs.
            </p>

            {/* Operational Contrast Matrix (Traditional vs VoiceOps First Layer) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-amber-500/[0.04] dark:bg-amber-500/[0.06] border border-amber-500/15 text-left space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-mono text-[11px] font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                    TRADITIONAL PHONES
                  </span>
                </div>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 font-sans">
                  <li>· Callers abandoned on hold queues</li>
                  <li>· Sales reps answer repetitive pricing</li>
                  <li>· After-hours inquiries lost to voicemail</li>
                  <li>· Manual data entry into calendar / CRM</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-blue-500/[0.05] dark:bg-blue-500/[0.08] border border-blue-500/20 text-left space-y-2 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                  <span className="font-mono text-[11px] font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                    VOICEOPS FIRST LAYER
                  </span>
                </div>
                <ul className="text-xs text-zinc-700 dark:text-zinc-300 space-y-1.5 font-sans">
                  <li>· Zero hold time — instant sub-second answer</li>
                  <li>· Autonomous booking & requirements capture</li>
                  <li>· 24/7 capture of every single inbound call</li>
                  <li>· Direct calendar locks & warm staff transfer</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
