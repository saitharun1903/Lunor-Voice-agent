"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IndustryItem, IndustryStory } from "@/lib/types";

interface IndustriesProps {
  industries?: IndustryItem[];
  industryStories?: IndustryStory[];
}

const INDUSTRY_STORIES = [
  {
    id: "real-estate",
    name: "Real Estate",
    tagline: "Turn every property call into a qualified private showing.",
    summary: "Captures inbound buyer inquiries, scores budget and financing timeline, checks broker calendars, and locks showing appointments directly into CRM.",
    steps: ["Property enquiry", "Requirement", "Qualification", "Viewing", "Follow-up"],
    metric: "100% weekend calls captured · 4x faster lead response",
  },
  {
    id: "restaurants",
    name: "Restaurants",
    tagline: "Capture dinner reservations during peak service hours.",
    summary: "Handles incoming table reservations, party sizes, high-chair needs, and dietary restrictions without pulling waitstaff away from dining guests.",
    steps: ["Reservation", "Availability", "Booking", "Confirmation"],
    metric: "Zero missed bookings during rush · 92% resolved autonomously",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    tagline: "Coordinate patient appointments with complete discretion.",
    summary: "Coordinates patient visits across clinical practitioners, collects intake insurance details, and transfers urgent clinical emergencies instantly.",
    steps: ["Appointment", "Information", "Scheduling", "Confirmation"],
    metric: "78% routine call reduction · Zero double-booked slots",
  },
  {
    id: "hotels",
    name: "Hotels",
    tagline: "24/7 guest concierge, room inquiries, and late arrivals.",
    summary: "Provides real-time room availability, pet policies, amenities, and check-in guidance with seamless warm transfer to front desk staff.",
    steps: ["Reservation", "Availability", "Booking", "Guest follow-up"],
    metric: "Sub-90 second resolution · 24/7 continuous guest coverage",
  },
  {
    id: "services",
    name: "Services",
    tagline: "Instant job intake, emergency dispatch, and estimate booking.",
    summary: "Captures site address, equipment models, and urgency levels to dispatch emergency technicians and schedule estimate visits on technician calendars.",
    steps: ["Lead", "Qualification", "Scheduling", "Follow-up"],
    metric: "Zero lost emergency calls · Instant technician sync",
  },
];

export const IndustriesSection = memo(function IndustriesSection({
  industries,
  industryStories,
}: IndustriesProps) {
  const stories =
    industryStories && industryStories.length > 0 ? industryStories : INDUSTRY_STORIES;
  const [activeId, setActiveId] = useState<string>(stories[0]?.id || "real-estate");

  const current =
    stories.find((s) => s.id === activeId) || stories[0];

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="industries" className="py-28 md:py-40 relative overflow-hidden bg-[#F5F1E8] dark:bg-[#07090e] border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] transition-colors">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14 sm:mb-18 text-left space-y-3"
        >
          <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
            INDUSTRIES
          </p>

          <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal">
            Voice automation for the way your business works.
          </h2>

          <p className="type-sans-body-lg text-[#58534C] dark:text-zinc-400 max-w-xl font-normal leading-relaxed">
            Every deployment is configured around the specific operational rules, scheduling systems, and compliance guidelines of your vertical.
          </p>
        </motion.div>

        {/* Horizontal Editorial Selector with Gliding Active Signal */}
        <div className="flex items-center gap-2 pb-3 overflow-x-auto border-b border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] mb-10 no-scrollbar">
          {stories.map((ind) => {
            const isSelected = activeId === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveId(ind.id)}
                className={`relative min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 outline-none touch-manipulation flex items-center justify-center ${
                  isSelected
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs"
                    : "text-[#58534C] dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                {ind.name}
              </button>
            );
          })}
        </div>

        {/* One Featured Editorial Industry Story (Not a Card Grid) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl bg-[#FAF8F2] dark:bg-[#0c101c] border border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] shadow-sm space-y-8"
          >
            {/* Industry Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[rgba(36,33,26,0.06)] dark:border-white/[0.08] pb-6">
              <div className="space-y-2 max-w-2xl text-left">
                <span className="font-mono text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider block font-semibold">
                  {current.name} Blueprint
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-zinc-950 dark:text-white font-normal leading-snug">
                  {current.tagline}
                </h3>
                <p className="type-sans-body text-[#58534C] dark:text-zinc-400 leading-relaxed text-sm">
                  {current.summary}
                </p>
              </div>

              <div className="px-4 py-2 rounded-lg bg-emerald-600/[0.08] border border-emerald-600/20 text-emerald-800 dark:text-emerald-400 text-xs font-mono shrink-0">
                ✓ {current.metric}
              </div>
            </div>

            {/* Step-by-Step Flow: Illustrative Workflow */}
            <div className="text-left">
              <span className="type-editorial-eyebrow text-[#888278] dark:text-zinc-400 block mb-4">
                WORKFLOW PATHWAY
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {current.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FFFDF8] dark:bg-black/40 border border-[rgba(36,33,26,0.07)] dark:border-white/[0.05] space-y-1.5"
                  >
                    <span className="font-mono text-[10px] text-[#888278] dark:text-zinc-500 block">0{idx + 1}</span>
                    <p className="font-sans text-xs text-zinc-900 dark:text-white font-medium leading-snug">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-baseline justify-between gap-4 border-t border-black/[0.06] dark:border-white/[0.06]">
              <span className="text-xs text-zinc-500 font-sans">
                Illustrative workflow. Prompts, calendar integrations, and custom CRM actions configured during onboarding.
              </span>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 text-xs font-semibold tracking-tight transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 shadow-sm shrink-0"
              >
                <span>Configure for My Business</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
});
