"use client";

import React, { memo } from "react";
import { CheckCircle2, TrendingUp, Check } from "lucide-react";
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
    tagline: "AI voice agent for instant customer enquiries, lead qualification, and appointment scheduling",
    problem: "Customers called at different times, but missed calls and delayed responses caused potential leads to be lost. The sales team also spent significant time answering repetitive questions about doors, windows, pricing, and requirements.",
    whatLunoAutomated: "Deployed a 24/7 AI voice agent that answers customer calls naturally, understands their requirements, asks qualifying questions, provides basic product information, captures lead details, and schedules follow-ups or showroom visits automatically.",
    handles: [
      "Product specifications, pricing & custom sizing",
      "Buyer & contractor timeline and budget qualification",
      "Instant showroom consultation scheduling",
      "Automated CRM sync and sales rep notification",
    ],
    result: "Reduced lead response time from hours to seconds, improved lead capture, reduced missed-call opportunities, and allowed the sales team to focus on high-intent customers.",
    active: true,
  },
  {
    id: "apex-realty",
    name: "Apex Luxury Properties",
    industry: "Real Estate & Leasing",
    tagline: "Autonomous Buyer Qualification & Showing Dispatch",
    problem: "Brokers missed 40% of inbound weekend calls from prospective property buyers inquiring about active high-value listings.",
    whatLunoAutomated: "Engineered a voice agent that answers instantly, qualifies buyer pre-approval & budget, answers property FAQs, and schedules private showings directly onto broker calendars.",
    handles: [
      "Property specifications & pricing inquiries",
      "Buyer budget and move-in timeline qualification",
      "Instant private showing calendar scheduling",
      "Broker CRM synchronization & instant SMS alerts",
    ],
    result: "100% weekend inquiry capture · 68% showing booking conversion rate · Average response time reduced to 0 seconds.",
    active: true,
  },
  {
    id: "horizon-dental",
    name: "Horizon Healthcare Clinics",
    industry: "Medical & Dental Clinics",
    tagline: "24/7 Patient Appointment Coordination",
    problem: "Front desk staff spent 5+ hours per day handling routine booking calls and appointment confirmations instead of attending to in-clinic patients.",
    whatLunoAutomated: "Built a patient voice layer integrated with the clinic EHR calendar to coordinate bookings, cancellations, insurance questions, and urgent clinical triage.",
    handles: [
      "Specialist calendar appointment booking",
      "Insurance provider & policy collection",
      "Pre-procedure preparation guidance",
      "Emergency clinical triage escalation",
    ],
    result: "Zero hold times · 78% reduction in front-desk call load · 22% increase in new patient intake appointments.",
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
        <div className="space-y-10">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              className="p-7 sm:p-9 md:p-10 rounded-3xl structured-card space-y-6 shadow-xl border border-black/[0.08] dark:border-white/[0.1] overflow-hidden"
            >
              {/* Header */}
              <div className="border-b border-black/[0.06] dark:border-white/[0.08] pb-5 space-y-2">
                <span className="type-eyebrow text-blue-600 dark:text-blue-400 block font-bold">
                  {project.industry}
                </span>
                <h3 className="type-h2 text-zinc-950 dark:text-white">
                  {project.name}
                </h3>
                <p className="type-body text-zinc-600 dark:text-zinc-400 max-w-3xl">
                  {project.tagline}
                </p>
              </div>

              {/* Problem & Solution Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5 p-5 sm:p-6 rounded-2xl bg-black/[0.015] dark:bg-white/[0.02] border border-black/[0.03] dark:border-white/[0.04]">
                  <span className="type-eyebrow text-zinc-950 dark:text-white block font-bold">
                    The Business Challenge
                  </span>
                  <p className="leading-relaxed type-body-sm text-zinc-600 dark:text-zinc-400">
                    {project.problem}
                  </p>
                </div>

                <div className="space-y-2.5 p-5 sm:p-6 rounded-2xl bg-blue-600/[0.02] dark:bg-blue-600/[0.04] border border-blue-600/15">
                  <span className="type-eyebrow text-blue-600 dark:text-blue-400 block font-bold">
                    What VoiceOps Built & Deployed
                  </span>
                  <p className="leading-relaxed type-body-sm text-zinc-800 dark:text-zinc-200">
                    {project.whatLunoAutomated}
                  </p>
                </div>
              </div>

              {/* Handled Capabilities List (if present) */}
              {project.handles && project.handles.length > 0 && (
                <div className="pt-1">
                  <span className="type-eyebrow text-zinc-400 block mb-3">
                    Automated Workflows
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.handles.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 bg-black/[0.015] dark:bg-white/[0.02] px-3.5 py-2 rounded-xl border border-black/[0.03] dark:border-white/[0.04]"
                      >
                        <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full-width Verified Business Impact Highlight Box */}
              {project.result && (
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/[0.06] dark:bg-emerald-500/[0.08] border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs type-eyebrow">
                    <TrendingUp className="w-4 h-4 shrink-0" />
                    <span>Verified Business Outcome</span>
                  </div>
                  <p className="type-body-sm text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed">
                    {project.result}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
