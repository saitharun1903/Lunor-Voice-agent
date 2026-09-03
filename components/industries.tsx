"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { IndustryItem } from "@/lib/types";

interface IndustriesProps {
  industries?: IndustryItem[];
}

const INDUSTRY_STORIES = [
  {
    id: "real-estate",
    name: "Real Estate & Leasing",
    tagline: "Turn every property call into a qualified private showing.",
    summary: "Captures inbound buyer inquiries, scores budget and financing timeline, checks broker calendars, and locks showing appointments directly into CRM.",
    steps: ["Inbound Buyer Call", "Property Specs & Pricing", "Budget & Timeline Scored", "Showing Calendar Locked", "Broker SMS Handoff"],
    metric: "100% weekend calls captured · 4x faster lead response",
  },
  {
    id: "restaurants",
    name: "Dining & Hospitality",
    tagline: "Capture dinner reservations during peak service hours.",
    summary: "Handles incoming table reservations, party sizes, high-chair needs, and dietary restrictions without pulling waitstaff away from dining guests.",
    steps: ["Reservation Call", "Live Table Capacity Check", "Dietary Notes Logged", "SMS Confirmation Sent", "VIP Escalation if Needed"],
    metric: "Zero missed bookings during rush · 92% resolved autonomously",
  },
  {
    id: "healthcare",
    name: "Healthcare & Clinics",
    tagline: "Coordinate patient appointments with complete discretion.",
    summary: "Coordinates patient visits across clinical practitioners, collects intake insurance details, and transfers urgent clinical emergencies instantly.",
    steps: ["Patient Intake Call", "Practitioner Availability", "Insurance & Reason Logged", "Calendar Invite Written", "Urgent Cases Routed"],
    metric: "78% routine call reduction · Zero double-booked slots",
  },
  {
    id: "hotels",
    name: "Hotels & Stays",
    tagline: "24/7 guest concierge, room inquiries, and late arrivals.",
    summary: "Provides real-time room availability, pet policies, amenities, and check-in guidance with seamless warm transfer to front desk staff.",
    steps: ["Guest Query", "Room Availability & Rates", "Amenity Guidance", "Check-in Instructions", "Front Desk Warm Transfer"],
    metric: "Sub-90 second resolution · 24/7 continuous guest coverage",
  },
  {
    id: "trade",
    name: "Field & Trade Services",
    tagline: "Instant job intake, emergency dispatch, and estimate booking.",
    summary: "Captures site address, equipment models, and urgency levels to dispatch emergency technicians and schedule estimate visits on technician calendars.",
    steps: ["Customer Service Call", "Issue & Site Address Logged", "Urgency Scored", "Technician Dispatched", "Field Service CRM Synced"],
    metric: "Zero lost emergency commercial calls · Instant technician sync",
  },
];

export const IndustriesSection = memo(function IndustriesSection({ industries }: IndustriesProps) {
  const [activeId, setActiveId] = useState<string>("real-estate");

  const current =
    INDUSTRY_STORIES.find((s) => s.id === activeId) || INDUSTRY_STORIES[0];

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="industries" className="py-24 md:py-36 relative overflow-hidden chapter-midnight border-t border-white/[0.08]">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] ambient-glow-sapphire pointer-events-none -z-10 blur-3xl opacity-60" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18 text-left space-y-3">
          <p className="type-editorial-eyebrow text-blue-400">
            INDUSTRY SOLUTIONS
          </p>

          <h2 className="type-serif-h1 text-white font-normal">
            Voice automation for every business world.
          </h2>

          <p className="type-sans-body-lg text-zinc-400 max-w-xl font-normal leading-relaxed">
            Every deployment is configured around the specific operational rules, scheduling systems, and compliance guidelines of your vertical.
          </p>
        </div>

        {/* Horizontal Editorial Selector */}
        <div className="flex items-center gap-2 pb-3 overflow-x-auto border-b border-white/[0.08] mb-10 no-scrollbar">
          {INDUSTRY_STORIES.map((ind) => {
            const isSelected = activeId === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveId(ind.id)}
                className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 outline-none ${
                  isSelected
                    ? "bg-white text-zinc-950 font-semibold shadow-xs"
                    : "text-zinc-400 hover:text-white"
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
            transition={{ duration: 0.25 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#0c101c] border border-white/[0.08] shadow-2xl space-y-8"
          >
            {/* Industry Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
              <div className="space-y-2 max-w-2xl">
                <span className="font-mono text-xs text-blue-400 uppercase tracking-wider block">
                  {current.name} Blueprint
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                  {current.tagline}
                </h3>
                <p className="type-sans-body text-zinc-400 leading-relaxed text-sm">
                  {current.summary}
                </p>
              </div>

              <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono shrink-0">
                ✓ {current.metric}
              </div>
            </div>

            {/* Step-by-Step Flow: CALL → REQUIREMENTS → QUALIFICATION → VIEWING → FOLLOW-UP */}
            <div>
              <span className="type-editorial-eyebrow text-zinc-500 block mb-4">
                WORKFLOW FLOW
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {current.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-black/40 border border-white/[0.05] space-y-1.5"
                  >
                    <span className="font-mono text-[10px] text-zinc-500 block">STEP 0{idx + 1}</span>
                    <p className="font-sans text-xs text-white font-medium leading-snug">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-baseline justify-between gap-4 border-t border-white/[0.06]">
              <span className="text-xs text-zinc-500 font-sans">
                Tailored prompts, calendar integrations, and custom CRM actions configured during onboarding.
              </span>

              <button
                onClick={scrollToContact}
                className="btn-compact-accent"
              >
                <span>Configure for My Industry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
});
