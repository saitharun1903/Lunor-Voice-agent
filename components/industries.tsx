"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building2,
  UtensilsCrossed,
  HeartPulse,
  Hotel,
  Wrench,
  Send,
  Database,
} from "lucide-react";
import { IndustryItem, IndustryStory } from "@/lib/types";
import { MOTION_EASINGS } from "@/lib/motion-config";

interface IndustriesProps {
  industries?: IndustryItem[];
  industryStories?: IndustryStory[];
}

interface EnrichedIndustryStory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  summary: string;
  callerAudio: string;
  extractedIntent: string;
  targetSoftware: string;
  actionResult: string;
  steps: string[];
  metric: string;
}

const ENRICHED_INDUSTRY_STORIES: EnrichedIndustryStory[] = [
  {
    id: "real-estate",
    name: "Real Estate",
    icon: Building2,
    tagline: "Turn every property call into a qualified private showing.",
    summary:
      "Captures inbound buyer inquiries, scores budget and financing timeline, checks broker calendars, and locks showing appointments directly into CRM.",
    callerAudio: "Hi, do you have any open viewings for the penthouse at 14 Elm Street this Saturday?",
    extractedIntent: "Showing Request · 14 Elm Street · Saturday 2:00 PM",
    targetSoftware: "Follow Up Boss / HubSpot CRM",
    actionResult: "Showing Locked on Broker Calendar · Buyer Lead Qualified",
    steps: ["Property Enquiry", "Buyer Qualification", "Calendar Slot Lock", "Showing Confirmation", "Broker SMS Sync"],
    metric: "100% weekend calls captured · 4x faster lead response",
  },
  {
    id: "restaurants",
    name: "Restaurants",
    icon: UtensilsCrossed,
    tagline: "Capture dinner reservations during peak service hours.",
    summary:
      "Handles incoming table reservations, party sizes, high-chair needs, and dietary restrictions without pulling waitstaff away from dining guests.",
    callerAudio: "Can we reserve a table for four tonight around 7:30 PM with a high chair?",
    extractedIntent: "Dining Reservation · 4 Guests · Tonight 7:30 PM · High Chair",
    targetSoftware: "OpenTable / Resy Seating Engine",
    actionResult: "Table 12 Assigned · SMS Reservation Sent to Diner",
    steps: ["Guest Request", "Table Availability Check", "Party Details & Notes", "Reservation Lock", "SMS Confirmation"],
    metric: "Zero missed bookings during rush · 92% resolved autonomously",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    tagline: "Coordinate patient appointments with complete discretion.",
    summary:
      "Coordinates patient visits across clinical practitioners, collects intake insurance details, and transfers urgent clinical emergencies instantly.",
    callerAudio: "I need to schedule a follow-up consultation with Dr. Chen for next Tuesday morning.",
    extractedIntent: "Follow-up Consultation · Dr. Chen · Tuesday 9:30 AM",
    targetSoftware: "Epic / Cerner EHR Scheduling",
    actionResult: "Slot Confirmed in Clinical Schedule · Intake Form Sent",
    steps: ["Patient Identification", "Practitioner Availability", "Clinical Intake Record", "Appointment Lock", "Discreet SMS Sync"],
    metric: "78% routine call reduction · Zero double-booked slots",
  },
  {
    id: "hotels",
    name: "Hotels",
    icon: Hotel,
    tagline: "24/7 guest concierge, room inquiries, and late arrivals.",
    summary:
      "Provides real-time room availability, pet policies, amenities, and check-in guidance with seamless warm transfer to front desk staff.",
    callerAudio: "We're landing late tonight around 11:30 PM — will late check-in and valet parking be available?",
    extractedIntent: "Late Arrival Notice · Valet Service Requested · ETA 11:30 PM",
    targetSoftware: "Opera Cloud PMS / Cloudbeds",
    actionResult: "Guest Folio Updated · Mobile Key Prepared · Valet Alerted",
    steps: ["Guest Query", "PMS Folio Lookup", "Policy Verification", "Reservation Note Written", "Front Desk Alert"],
    metric: "Sub-90 second resolution · 24/7 continuous guest coverage",
  },
  {
    id: "services",
    name: "Services",
    icon: Wrench,
    tagline: "Instant job intake, emergency dispatch, and estimate booking.",
    summary:
      "Captures site address, equipment models, and urgency levels to dispatch emergency technicians and schedule estimate visits on technician calendars.",
    callerAudio: "Our rooftop HVAC unit is leaking water into the main office — can you send a technician immediately?",
    extractedIntent: "Emergency HVAC Leak · Commercial Facility · High Priority",
    targetSoftware: "ServiceTitan / Housecall Pro",
    actionResult: "Work Order #4921 Created · Lead Technician Dispatched",
    steps: ["Urgency Classification", "Site Address Verification", "Technician Routing", "Calendar Booking", "GPS Dispatch Alert"],
    metric: "Zero lost emergency calls · Instant technician sync",
  },
];

export const IndustriesSection = memo(function IndustriesSection({
  industries,
  industryStories,
}: IndustriesProps) {
  const [activeId, setActiveId] = useState<string>("real-estate");

  const current =
    ENRICHED_INDUSTRY_STORIES.find((s) => s.id === activeId) || ENRICHED_INDUSTRY_STORIES[0];

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="industries"
      aria-label="VoiceOps Industry Deployments"
      className="py-20 sm:py-24 md:py-28 relative overflow-hidden bg-white dark:bg-[#07090e] border-t border-slate-100 dark:border-white/[0.08] transition-colors scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: MOTION_EASINGS.editorial }}
          className="max-w-3xl mb-12 sm:mb-16 text-left space-y-3"
        >
          <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
            VERTICAL ARCHITECTURES
          </p>

          <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal text-3xl sm:text-4xl md:text-5xl">
            Voice automation for the way your business works.
          </h2>

          <p className="type-sans-body-lg text-slate-600 dark:text-zinc-400 max-w-xl font-normal leading-relaxed text-sm sm:text-base">
            Every deployment is configured around the specific operational rules, scheduling systems, and compliance guidelines of your vertical.
          </p>
        </motion.div>

        {/* Horizontal Tactile Selector Deck */}
        <div className="flex items-center gap-2 pb-3 overflow-x-auto border-b border-slate-100 dark:border-white/[0.08] mb-8 sm:mb-10 no-scrollbar relative">
          {ENRICHED_INDUSTRY_STORIES.map((ind) => {
            const isSelected = activeId === ind.id;
            const Icon = ind.icon;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveId(ind.id)}
                className={`relative min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-150 outline-none touch-manipulation flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "text-white dark:text-zinc-950 font-semibold"
                    : "text-slate-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-industry-pill"
                    className="absolute inset-0 rounded-xl bg-zinc-950 dark:bg-white shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================
            WOW #5: INTERACTIVE PRODUCT EXPLORER CANVAS
            Visualizes: Caller Inbound -> Neural Extraction -> Deterministic Software Commit
            ========================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.3, ease: MOTION_EASINGS.editorial }}
            className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white dark:bg-[#10131B] border border-slate-200/80 dark:border-white/[0.09] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)] space-y-8 text-left"
          >
            {/* Header: Title, Tagline & Measured Metric */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-100 dark:border-white/[0.08] pb-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider font-bold">
                    {current.name} Operational Blueprint
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-zinc-950 dark:text-white font-normal leading-snug">
                  {current.tagline}
                </h3>
                <p className="type-sans-body text-slate-600 dark:text-zinc-400 leading-relaxed text-xs sm:text-sm">
                  {current.summary}
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-emerald-600/[0.08] border border-emerald-600/20 text-emerald-800 dark:text-emerald-400 text-xs font-mono shrink-0">
                ✓ {current.metric}
              </div>
            </div>

            {/* Conversational Flow (Caller -> Understanding -> Operational Result) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 items-stretch">
              {/* Node 1: Inbound Dialogue */}
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between space-y-3">
                <div className="font-mono text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
                  Caller Question
                </div>
                <p className="font-sans text-xs text-zinc-800 dark:text-zinc-200 italic leading-relaxed">
                  &ldquo;{current.callerAudio}&rdquo;
                </p>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 font-sans pt-2 border-t border-slate-100 dark:border-white/[0.05]">
                  Inbound speech received
                </div>
              </div>

              {/* Node 2: Intent Understanding */}
              <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-500/20 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300 font-mono text-[10px] uppercase tracking-wider font-semibold">
                  <Sparkles className="w-3 h-3 text-blue-500 shrink-0" />
                  <span>Agent Understanding</span>
                </div>
                <p className="font-sans text-xs text-blue-950 dark:text-blue-200 font-medium leading-relaxed">
                  {current.extractedIntent}
                </p>
                <div className="text-[11px] text-blue-700/80 dark:text-blue-300/80 font-sans pt-2 border-t border-blue-500/10">
                  Direct intent mapped
                </div>
              </div>

              {/* Node 3: Connected Action */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-mono text-[10px] uppercase tracking-wider font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Integrated Action</span>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold mb-1">
                    ↳ {current.targetSoftware}
                  </div>
                  <p className="font-sans text-xs text-emerald-900 dark:text-emerald-200 font-medium leading-snug">
                    {current.actionResult}
                  </p>
                </div>
                <div className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 font-sans pt-2 border-t border-emerald-500/10">
                  Synchronized with business tools
                </div>
              </div>
            </div>

            {/* Step-by-Step Flow: Illustrative Workflow */}
            <div className="text-left space-y-2">
              <span className="type-editorial-eyebrow text-slate-400 dark:text-zinc-400 block">
                EXECUTION PATHWAY
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {current.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/70 dark:bg-black/40 border border-slate-200/80 dark:border-white/[0.05] space-y-1 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold block">
                        0{idx + 1}
                      </span>
                      {idx < current.steps.length - 1 && (
                        <span className="hidden lg:inline text-zinc-400 text-[10px] font-mono">→</span>
                      )}
                    </div>
                    <p className="font-sans text-xs text-zinc-900 dark:text-white font-medium leading-snug">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-2 flex flex-col sm:flex-row items-baseline justify-between gap-4 border-t border-black/[0.06] dark:border-white/[0.06]">
              <span className="text-xs text-zinc-500 font-sans">
                Illustrative workflow. Prompts, calendar integrations, and custom CRM actions configured during onboarding.
              </span>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 text-xs font-semibold tracking-tight transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 shadow-sm shrink-0 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
