"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Utensils,
  Stethoscope,
  Building2,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { IndustryItem } from "@/lib/types";

interface IndustriesProps {
  industries?: IndustryItem[];
}

const INDUSTRY_SOLUTIONS = [
  {
    id: "real-estate",
    name: "Real Estate & Leasing",
    icon: Home,
    tagline: "Turn every property inquiry into a qualified private showing.",
    headline: "Automate inbound buyer intake, budget & timeline qualification, and private showing calendar locks.",
    stats: "100% Weekend Inquiries Captured · 4.2x Faster Broker Lead Dispatch",
    workflows: [
      { step: "01. Intake", title: "Property Specs & Pricing", detail: "Answers questions regarding square footage, HOA rules, parking, and listing prices instantly." },
      { step: "02. Qualify", title: "Budget & Move-in Date", detail: "Captures pre-approval status, financing timeline, and specific bedroom/bathroom requirements." },
      { step: "03. Schedule", title: "Live Calendar Sync", detail: "Queries listing agent calendar in real time to reserve showing slots without phone tag." },
      { step: "04. Dispatch", title: "CRM & SMS Handoff", detail: "Dispatches SMS summary to the broker and creates a fully populated CRM buyer lead record." },
    ],
  },
  {
    id: "restaurant",
    name: "Restaurants & Dining",
    icon: Utensils,
    tagline: "Capture table reservations during peak dinner rush.",
    headline: "Handle table reservations, party sizes, and dietary restrictions without pulling floor staff from diners.",
    stats: "Zero Missed Dinner Bookings · 92% Reservation Calls Resolved Autonomously",
    workflows: [
      { step: "01. Availability", title: "Live Table Query", detail: "Checks reservation software for open dining slots and table inventory in real time." },
      { step: "02. Intake", title: "Party Size & Diet", detail: "Logs party count, high-chair needs, seating preferences, and dietary restrictions." },
      { step: "03. Confirm", title: "SMS Confirmation", detail: "Dispatches instant SMS booking confirmation with calendar invite and cancellation link." },
      { step: "04. Escalation", title: "VIP Transfer", detail: "Transfers large party buyouts and private dining requests directly to the general manager." },
    ],
  },
  {
    id: "clinic",
    name: "Healthcare & Dental",
    icon: Stethoscope,
    tagline: "Patient scheduling, intake, and triage routing.",
    headline: "Coordinate patient appointments across practitioners, verify insurance providers, and triage urgent calls with complete HIPAA compliance.",
    stats: "78% Phone Load Reduction · +22% New Patient Intake Appointments",
    workflows: [
      { step: "01. Slot Check", title: "Practitioner Calendar", detail: "Checks real-time availability across specialists and clinical practitioners." },
      { step: "02. Intake", title: "Insurance & Reason", detail: "Collects insurance provider details, policy numbers, and chief medical complaint." },
      { step: "03. Privacy", title: "Encrypted Data", detail: "Strict end-to-end data encryption ensuring patient records remain protected." },
      { step: "04. Triage", title: "Emergency Transfer", detail: "Instantly routes urgent emergency clinical cases to the on-call physician." },
    ],
  },
  {
    id: "hotel",
    name: "Hotels & Stays",
    icon: Building2,
    tagline: "24/7 guest concierge, reservations, and room service.",
    headline: "Provide 24/7 guest service for room rates, check-in logistics, amenities, and seamless front desk transfers.",
    stats: "100% 24/7 Call Coverage · Sub-90s Average Call Duration",
    workflows: [
      { step: "01. Rates", title: "Live Room Availability", detail: "Provides real-time room availability, pet policies, amenities, and rate quotes." },
      { step: "02. Concierge", title: "Amenity Bookings", detail: "Coordinates on-site restaurant reservations, spa time slots, and valet requests." },
      { step: "03. Logistics", title: "Check-in Guidance", detail: "Guides late-arriving guests on keycard pickup and parking garage procedures." },
      { step: "04. Transfer", title: "Front Desk SIP", detail: "Executes warm transfer to the front desk when personal assistance is required." },
    ],
  },
  {
    id: "services",
    name: "Field & Trade Services",
    icon: Briefcase,
    tagline: "Quote requests, job dispatch, and emergency service intake.",
    headline: "Capture job details, address information, and urgency levels to dispatch technicians and update field software.",
    stats: "Instant Job Dispatch · Zero Lost Emergency Commercial Calls",
    workflows: [
      { step: "01. Scope", title: "Job Intake", detail: "Logs service problem details, equipment model, and site address." },
      { step: "02. Urgency", title: "Triage & Alert", detail: "Identifies urgent commercial leaks or electrical outages for instant dispatch." },
      { step: "03. Quote", title: "Estimate Booking", detail: "Schedules on-site quote inspection visits directly on technician calendars." },
      { step: "04. Pipeline", title: "Field CRM Sync", detail: "Synchronizes lead record with your field service software and dispatch board." },
    ],
  },
];

export const IndustriesSection = memo(function IndustriesSection({ industries }: IndustriesProps) {
  const [activeTab, setActiveTab] = useState<string>("real-estate");

  const activeIndustry =
    INDUSTRY_SOLUTIONS.find((ind) => ind.id === activeTab) || INDUSTRY_SOLUTIONS[0];

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="industries" className="py-24 md:py-32 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16 text-left">
          <p className="type-eyebrow text-blue-600 dark:text-blue-400 mb-3 tracking-wider">
            INDUSTRY SOLUTIONS
          </p>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-4">
            Voice automation tailored to your operational workflows.
          </h2>

          <p className="type-body-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Every studio deployment is configured with the exact business rules, software tools, and compliance guidelines of your vertical.
          </p>
        </div>

        {/* Minimalist Tab Switcher with Fluid Spring Glider */}
        <div className="flex items-center gap-2 pb-3 overflow-x-auto border-b border-black/[0.06] dark:border-white/[0.08] mb-8">
          {INDUSTRY_SOLUTIONS.map((ind) => {
            const Icon = ind.icon;
            const isSelected = activeTab === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors duration-150 outline-none ${
                  isSelected
                    ? "text-white dark:text-zinc-950"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeIndustryPill"
                    className="absolute inset-0 bg-zinc-950 dark:bg-white rounded-xl shadow-md -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Industry Operational Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="p-7 sm:p-9 rounded-3xl structured-card space-y-7 shadow-xl border border-black/[0.08] dark:border-white/[0.1]"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-5">
              <div className="space-y-1">
                <span className="type-eyebrow text-blue-600 dark:text-blue-400 block">
                  {activeIndustry.name} Blueprint
                </span>
                <h3 className="type-h2 text-zinc-950 dark:text-white">
                  {activeIndustry.tagline}
                </h3>
                <p className="type-body text-zinc-600 dark:text-zinc-400 max-w-2xl">
                  {activeIndustry.headline}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{activeIndustry.stats}</span>
              </div>
            </div>

            {/* 4-Step Operational Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeIndustry.workflows.map((wf, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] space-y-2"
                >
                  <span className="type-eyebrow text-blue-600 dark:text-blue-400 block font-bold">
                    {wf.step}
                  </span>
                  <h4 className="type-h3 text-zinc-950 dark:text-white">
                    {wf.title}
                  </h4>
                  <p className="type-body-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {wf.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Row */}
            <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-zinc-500">
                Custom voice persona, phone forwarding, and CRM synchronization included.
              </span>
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold btn-solid-primary shadow-sm"
              >
                <span>Deploy {activeIndustry.name} Solution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
});
