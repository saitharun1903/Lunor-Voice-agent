"use client";

import React, { memo } from "react";
import { ArrowRight, Check } from "lucide-react";

export const AboutSection = memo(function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-36 relative overflow-hidden chapter-ivory border-t border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Editorial Eyebrow */}
        <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400 mb-4">
          THE OPERATIONAL PROBLEM
        </p>

        {/* Large Editorial Serif Headline */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="type-serif-display font-normal text-zinc-950 dark:text-white leading-[1.08]">
            Your team shouldn&apos;t have to answer
            <br />
            <span className="italic font-light text-zinc-500 dark:text-zinc-400">
              the same call twice.
            </span>
          </h2>
        </div>

        {/* Two-Column Editorial Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-6">
            <p className="type-sans-body-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              In almost every growing business, over 65% of inbound telephone calls repeat the exact same five conversations: checking opening times, asking service pricing, booking appointment slots, or qualifying basic requirements.
            </p>
            <p className="type-sans-body text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When key team members spend their day answering repetitive phone questions, customer wait times spike, staff attention is fragmented, and high-value deals slip through unanswered.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6 pt-2">
            <p className="type-sans-body text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <strong className="text-zinc-950 dark:text-white font-semibold">VoiceOps creates a dedicated first layer.</strong> Every incoming caller is greeted in under a second by an intelligent conversational voice agent trained on your actual business rules, booking calendars, and product catalogs.
            </p>

            {/* Clean Editorial Bullet Points (No Heavy Cards) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0">01</span>
                <p className="type-sans-body-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-200">Zero Hold Times:</strong> Every caller receives immediate attention without traditional phone menus or IVR trees.
                </p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0">02</span>
                <p className="type-sans-body-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-200">Real Work Completed:</strong> Appointments booked directly into your calendar and client profiles written to CRM.
                </p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0">03</span>
                <p className="type-sans-body-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-200">Warm Human Handoff:</strong> When a caller needs a specialist, VoiceOps summarizes the conversation and transfers the line instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
