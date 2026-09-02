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
} from "lucide-react";
import { IndustryItem } from "@/lib/types";

interface IndustriesProps {
  industries?: IndustryItem[];
}

const INDUSTRY_SOLUTIONS = [
  {
    id: "real-estate",
    name: "Real Estate",
    icon: Home,
    tagline: "Turn every property enquiry into a qualified viewing.",
    headline: "Automate inbound buyer intake, budget qualification, and private showing coordination.",
    workflows: [
      { step: "01. Intake", title: "Property Specs", detail: "Answers questions regarding square footage, HOA rules, and pricing." },
      { step: "02. Qualify", title: "Budget & Timeline", detail: "Captures pre-approval status, target move-in date, and bedroom criteria." },
      { step: "03. Schedule", title: "Calendar Sync", detail: "Queries broker calendar in real time to lock in private showing appointments." },
      { step: "04. Dispatch", title: "Agent Handoff", detail: "Dispatches SMS summary and creates complete CRM lead record." },
    ],
  },
  {
    id: "restaurant",
    name: "Restaurants",
    icon: Utensils,
    tagline: "Capture dinner reservations during peak rush hours.",
    headline: "Handle table reservations, party sizes, and dietary requests without pulling floor staff from diners.",
    workflows: [
      { step: "01. Availability", title: "Table Query", detail: "Checks reservation software for open tables in real time." },
      { step: "02. Intake", title: "Party & Diet", detail: "Logs party size, seating preferences, and special dietary notes." },
      { step: "03. Confirm", title: "SMS Booking", detail: "Dispatches instant SMS booking confirmation with cancellation policy." },
      { step: "04. Escalation", title: "VIP Transfer", detail: "Transfers large buyouts and special requests to the general manager." },
    ],
  },
  {
    id: "clinic",
    name: "Clinics & Dental",
    icon: Stethoscope,
    tagline: "Appointment coordination and patient intake.",
    headline: "Coordinate patient appointments across practitioners, verify insurance providers, and triage urgent calls.",
    workflows: [
      { step: "01. Slot Check", title: "Practitioner Slot", detail: "Checks real-time availability across doctors and specialists." },
      { step: "02. Intake", title: "Insurance & Reason", detail: "Collects insurance provider details, policy numbers, and reason for visit." },
      { step: "03. Privacy", title: "Protected Data", detail: "Strict encryption ensuring caller details remain protected." },
      { step: "04. Triage", title: "Urgent Transfer", detail: "Instantly routes urgent emergency cases to the on-call staff." },
    ],
  },
  {
    id: "hotel",
    name: "Hotels & Stays",
    icon: Building2,
    tagline: "24/7 guest concierge, reservations, and room routing.",
    headline: "Provide 24/7 front desk service for room rates, check-in logistics, amenities, and manager transfers.",
    workflows: [
      { step: "01. Rates", title: "Live Availability", detail: "Provides real-time room availability, pet policies, and rate quotes." },
      { step: "02. Concierge", title: "Amenity Bookings", detail: "Coordinates on-site restaurant reservations and spa time slots." },
      { step: "03. Logistics", title: "Check-in Guidance", detail: "Guides late-arriving guests on keycard pickup and parking procedures." },
      { step: "04. Transfer", title: "Front Desk SIP", detail: "Executes warm transfer to the front desk when personal help is needed." },
    ],
  },
  {
    id: "services",
    name: "Services",
    icon: Briefcase,
    tagline: "Quote requests, job dispatch, and emergency service intake.",
    headline: "Capture job details, address information, and urgency levels to dispatch technicians and update field software.",
    workflows: [
      { step: "01. Scope", title: "Job Intake", detail: "Logs service problem details, equipment models, and site address." },
      { step: "02. Urgency", title: "Triage", detail: "Identifies urgent commercial leaks or outages for instant alerts." },
      { step: "03. Quote", title: "Estimate Booking", detail: "Schedules on-site quote inspection visits directly on dispatch calendars." },
      { step: "04. Pipeline", title: "CRM Sync", detail: "Synchronizes lead record with your field service software." },
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
    <section id="industries" className="py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 md:mb-12 text-left">
          <p className="type-eyebrow text-zinc-400 mb-3">Industries</p>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-3">
            Voice automation for real business.
          </h2>

          <p className="type-body text-zinc-600 dark:text-zinc-400">
            Every studio deployment is tailored to the exact decision trees and software tools of your industry.
          </p>
        </div>

        {/* Minimalist Tab Switcher */}
        <div className="flex items-center gap-2 pb-2.5 overflow-x-auto border-b border-black/[0.04] dark:border-white/[0.05] mb-6">
          {INDUSTRY_SOLUTIONS.map((ind) => {
            const Icon = ind.icon;
            const isSelected = activeTab === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? "btn-solid-primary shadow-sm"
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
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="p-6 sm:p-8 rounded-2xl structured-card space-y-6 shadow-sm"
          >
            <div className="border-b border-black/[0.04] dark:border-white/[0.05] pb-4">
              <span className="type-eyebrow text-blue-600 dark:text-blue-400 block">
                {activeIndustry.name} Workflow
              </span>
              <h3 className="type-h2 text-zinc-950 dark:text-white mt-0.5">
                {activeIndustry.tagline}
              </h3>
              <p className="type-body-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mt-1">
                {activeIndustry.headline}
              </p>
            </div>

            {/* 4-Step Operational Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {activeIndustry.workflows.map((wf, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-black/[0.015] dark:bg-white/[0.02] border border-black/[0.03] dark:border-white/[0.04] space-y-1.5"
                >
                  <span className="type-eyebrow text-blue-600 dark:text-blue-400 block">
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
            <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-zinc-500">
                Custom voice persona, phone routing, and API integration included.
              </span>
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold btn-solid-primary shadow-sm"
              >
                <span>Discuss {activeIndustry.name} Workflow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
});
