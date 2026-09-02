"use client";

import React, { memo } from "react";
import { ArrowUpRight, CheckCircle2, TrendingUp } from "lucide-react";
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
    whatLunoAutomated: "Built a custom bilingual voice agent that fields incoming calls, extracts architectural requirements, qualifies timeline and budget, and schedules showroom visits directly into sales calendars.",
    result: "100% weekend inquiry capture · 40% increase in qualified showroom visits",
    active: true,
  },
  {
    id: "apex-realty",
    name: "Apex Luxury Properties",
    industry: "Real Estate & Leasing",
    tagline: "Autonomous Buyer Qualification & Showing Dispatch",
    problem: "Brokers missed 40% of inbound weekend calls from prospective property buyers inquiring about active high-value listings.",
    whatLunoAutomated: "Engineered a voice agent that answers instantly, qualifies buyer pre-approval & budget, answers property FAQs, and schedules private showings directly onto broker calendars.",
    result: "100% call capture · 68% showing booking conversion rate",
    active: true,
  },
  {
    id: "horizon-dental",
    name: "Horizon Healthcare Clinics",
    industry: "Medical & Dental Clinics",
    tagline: "24/7 Patient Appointment Coordination",
    problem: "Front desk staff spent 5+ hours per day handling routine booking calls and appointment confirmations instead of attending to in-clinic patients.",
    whatLunoAutomated: "Built a patient voice layer integrated with the clinic EHR calendar to coordinate bookings, cancellations, insurance questions, and urgent clinical triage.",
    result: "Zero hold times · 78% reduction in front-desk call load",
    active: true,
  },
];

export const PortfolioSection = memo(function PortfolioSection({ projects, stats }: PortfolioProps) {
  const rawProjects = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;
  const activeProjects = rawProjects.filter((p) => p && p.active);

  return (
    <section id="work" className="py-24 md:py-32 relative overflow-hidden bg-black/[0.015] dark:bg-white/[0.01] border-y border-black/[0.04] dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20 text-left">
          <p className="type-eyebrow text-blue-600 dark:text-blue-400 mb-3 tracking-wider">
            VERIFIED CASE STUDIES
          </p>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-4">
            Proven performance in production environments.
          </h2>

          <p className="type-body-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Every studio deployment delivers measurable business outcomes — eliminating missed calls, automating customer qualification, and saving hundreds of operational staff hours.
          </p>
        </div>

        {/* Editorial Case Studies Spreads */}
        <div className="space-y-8">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              className="p-8 sm:p-10 rounded-3xl structured-card space-y-6 shadow-xl border border-black/[0.08] dark:border-white/[0.1]"
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-5">
                <div>
                  <span className="type-eyebrow text-blue-600 dark:text-blue-400 block mb-1">
                    {project.industry}
                  </span>
                  <h3 className="type-h2 text-zinc-950 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="type-body-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {project.tagline}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{project.result}</span>
                </div>
              </div>

              {/* Problem & Solution Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 type-body text-zinc-600 dark:text-zinc-400">
                <div className="space-y-2 p-5 rounded-2xl bg-black/[0.015] dark:bg-white/[0.02] border border-black/[0.03] dark:border-white/[0.04]">
                  <span className="type-eyebrow text-zinc-950 dark:text-white block font-bold">
                    The Business Challenge
                  </span>
                  <p className="leading-relaxed type-body-sm">
                    {project.problem}
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-2xl bg-blue-600/[0.02] dark:bg-blue-600/[0.04] border border-blue-600/15">
                  <span className="type-eyebrow text-blue-600 dark:text-blue-400 block font-bold">
                    What Lunor Built & Deployed
                  </span>
                  <p className="leading-relaxed type-body-sm text-zinc-800 dark:text-zinc-200">
                    {project.whatLunoAutomated}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
