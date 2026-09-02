"use client";

import React, { memo } from "react";
import { ArrowRight } from "lucide-react";
import { Project, SiteStats } from "@/lib/types";

interface PortfolioProps {
  projects?: Project[];
  stats?: SiteStats;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "noor-doors",
    name: "Noor Modern Doors",
    industry: "Doors & Architectural Systems",
    tagline: "Inbound Product Consultation & Showroom Booking",
    problem: "Sales representatives spent 4+ hours daily answering repetitive calls regarding custom dimensions and pricing, leading to missed high-intent builder leads.",
    whatLunoAutomated: "Built a conversational agent that fields incoming calls, extracts architectural requirements, qualifies timeline and budget, and schedules showroom visits directly into sales calendars.",
    result: "100% weekend inquiry capture · 40% increase in qualified showroom visits",
    active: true,
  },
  {
    id: "apex-realty",
    name: "Apex Luxury Properties",
    industry: "Real Estate & Leasing",
    tagline: "Autonomous Buyer Qualification & Showing Dispatch",
    problem: "Brokers missed 40% of inbound weekend calls from prospective property buyers inquiring about active listings.",
    whatLunoAutomated: "Engineered a voice agent that answers instantly, qualifies buyer pre-approval & budget, answers property FAQs, and schedules private showings.",
    result: "100% call capture · 68% showing booking conversion rate",
    active: true,
  },
  {
    id: "horizon-dental",
    name: "Horizon Healthcare",
    industry: "Medical & Dental Clinics",
    tagline: "24/7 Patient Appointment Coordination",
    problem: "Front desk staff spent 5+ hours per day handling booking calls and appointment confirmations instead of attending to in-clinic patients.",
    whatLunoAutomated: "Built a patient voice layer integrated with the clinic EHR calendar to coordinate bookings, cancellations, insurance questions, and urgent triage.",
    result: "Zero hold times · 42% reduction in front-desk call load",
    active: true,
  },
];

export const PortfolioSection = memo(function PortfolioSection({ projects }: PortfolioProps) {
  const rawProjects = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;
  const activeProjects = rawProjects.filter((p) => p && p.active);

  return (
    <section id="work" className="py-20 md:py-24 relative overflow-hidden bg-black/[0.01] dark:bg-white/[0.01] border-y border-black/[0.03] dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full type-eyebrow text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-3">
            <span>Case Studies</span>
          </div>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-3">
            Built for real business conversations.
          </h2>

          <p className="type-body text-zinc-600 dark:text-zinc-400">
            Every studio deployment solves a high-friction phone problem with customized business rules and direct system integrations.
          </p>
        </div>

        {/* Editorial Case Studies */}
        <div className="space-y-6">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 sm:p-8 rounded-2xl structured-card space-y-4 shadow-sm"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/[0.04] dark:border-white/[0.05] pb-3.5">
                <div>
                  <span className="type-eyebrow text-blue-600 dark:text-blue-400 block">
                    {project.industry}
                  </span>
                  <h3 className="type-h2 text-zinc-950 dark:text-white mt-0.5">
                    {project.name}
                  </h3>
                </div>

                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {project.result}
                </div>
              </div>

              {/* Problem & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 type-body-sm text-zinc-600 dark:text-zinc-400">
                <div className="space-y-1">
                  <span className="type-eyebrow text-zinc-900 dark:text-zinc-200 block">
                    The Problem
                  </span>
                  <p className="leading-relaxed">{project.problem}</p>
                </div>

                <div className="space-y-1">
                  <span className="type-eyebrow text-zinc-900 dark:text-zinc-200 block">
                    What Lunor Built
                  </span>
                  <p className="leading-relaxed">{project.whatLunoAutomated}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
