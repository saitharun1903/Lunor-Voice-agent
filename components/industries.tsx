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
    tagline: "Turn every property enquiry into a qualified viewing.",
    headline: "Automate inbound buyer intake, budget qualification, and private showing coordination.",
    workflows: [
      { step: "01. Intake", title: "Property Specification", detail: "Answers questions regarding square footage, HOA rules, floor plans, and pricing." },
      { step: "02. Qualify", title: "Budget & Timeline", detail: "Captures pre-approval status, target move-in date, and specific bedroom/location criteria." },
      { step: "03. Schedule", title: "Showing Calendar Sync", detail: "Queries broker calendar in real time to lock in private showing appointments." },
      { step: "04. Dispatch", title: "Instant Broker Handoff", detail: "Dispatches SMS summary and creates complete CRM lead record with caller notes." },
    ],
    verifiedMetric: "68% Showing Conversion · Zero Weekend Drop-off",
  },
  {
    id: "restaurant",
    name: "Restaurants & Hospitality",
    icon: Utensils,
    tagline: "Capture dinner reservations during peak rush hours.",
    headline: "Handle high-volume table reservations, party sizes, and dietary restrictions without pulling floor staff from diners.",
    workflows: [
      { step: "01. Availability", title: "Table Inventory Query", detail: "Checks OpenTable, Resy, or custom POS table availability in real time." },
      { step: "02. Logging", title: "Party & Dietary Intake", detail: "Logs party size, seating preferences, allergies, and special anniversary notes." },
      { step: "03. Confirm", title: "Instant SMS Confirmation", detail: "Dispatches SMS booking confirmation with map directions and cancellation policy." },
      { step: "04. VIP Route", title: "Private Dining Escalation", detail: "Transfers large buyouts and VIP requests to the general manager." },
    ],
    verifiedMetric: "92% Calls Resolved Autonomously · 0 Missed Covers",
  },
  {
    id: "clinic",
    name: "Medical & Dental Clinics",
    icon: Stethoscope,
    tagline: "HIPAA-compliant appointment coordination and emergency triage.",
    headline: "Coordinate patient appointments across multiple practitioners, verify insurance providers, and triage urgent medical calls.",
    workflows: [
      { step: "01. Slot Check", title: "Practitioner Calendar", detail: "Checks real-time availability across doctors and dental hygienists." },
      { step: "02. Intake", title: "Insurance & Reason for Visit", detail: "Collects insurance provider details, policy numbers, and chief complaint." },
      { step: "03. Compliance", title: "HIPAA PHI Redaction", detail: "Strict encryption ensuring caller data is protected according to health regulations." },
      { step: "04. Triage", title: "Urgent Clinical Transfer", detail: "Instantly routes acute emergency cases to the on-call physician." },
    ],
    verifiedMetric: "42% Reduction in Front-Desk Load · 99.4% Satisfaction",
  },
  {
    id: "hotel",
    name: "Hotels & Resorts",
    icon: Building2,
    tagline: "24/7 guest concierge, amenities booking, and room routing.",
    headline: "Provide 24/7 front desk service for room rates, check-in logistics, amenities, spa bookings, and manager transfers.",
    workflows: [
      { step: "01. Rates", title: "Live Availability & Quotes", detail: "Provides real-time room availability, pet policies, and rate quotes." },
      { step: "02. Concierge", title: "Amenity & Spa Bookings", detail: "Coordinates on-site restaurant reservations and spa time slots." },
      { step: "03. Logistics", title: "Check-in & Valet Guidance", detail: "Guides late-arriving guests on keycard pickup and parking procedures." },
      { step: "04. Transfer", title: "Front Desk Manager SIP", detail: "Executes warm transfer to the front desk when personal assistance is required." },
    ],
    verifiedMetric: "100% 24/7 Answer Rate · Average Call Duration <90s",
  },
  {
    id: "services",
    name: "Service Businesses",
    icon: Briefcase,
    tagline: "Quote requests, job dispatch, and emergency service intake.",
    headline: "Capture job details, address information, and urgency levels to dispatch technicians and update field service software.",
    workflows: [
      { step: "01. Scope", title: "Job Requirement Intake", detail: "Logs service problem details, equipment models, and site address." },
      { step: "02. Urgency", title: "Emergency Triage", detail: "Identifies urgent commercial leaks/power outages for instant technician alert." },
      { step: "03. Quote", title: "Estimate Coordination", detail: "Schedules on-site quote inspection visits directly onto dispatch calendars." },
      { step: "04. Pipeline", title: "CRM Sync & Follow-up", detail: "Synchronizes lead record with ServiceTitan, Jobber, or Salesforce." },
    ],
    verifiedMetric: "3.5x Faster Estimate Booking · 100% Lead Capture",
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
    <section id="industries" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4 uppercase">
            <span>Industry Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.035em] text-zinc-950 dark:text-white mb-5">
            Voice automation for real business.
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            Every studio deployment is tailored to the exact decision trees, software systems, and edge cases of your industry.
          </p>
        </div>

        {/* Minimalist Tab Switcher */}
        <div className="flex items-center gap-2 pb-4 overflow-x-auto border-b border-black/[0.06] dark:border-white/[0.08] mb-8">
          {INDUSTRY_SOLUTIONS.map((ind) => {
            const Icon = ind.icon;
            const isSelected = activeTab === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? "btn-solid-primary"
                    : "btn-outline-secondary text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Industry Operational Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="p-8 sm:p-10 rounded-3xl structured-card space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.05] dark:border-white/[0.06] pb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {activeIndustry.name} Blueprinted Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white">
                  {activeIndustry.tagline}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mt-1">
                  {activeIndustry.headline}
                </p>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.08] text-xs font-mono text-emerald-600 dark:text-emerald-400 shrink-0">
                {activeIndustry.verifiedMetric}
              </div>
            </div>

            {/* 4-Step Operational Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeIndustry.workflows.map((wf, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] space-y-2.5"
                >
                  <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">
                    {wf.step}
                  </span>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                    {wf.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {wf.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Row */}
            <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-zinc-500 font-mono">
                Custom voice persona, telephony routing, and API integration included.
              </span>
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold btn-solid-primary"
              >
                <span>Deploy for {activeIndustry.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
});
