"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Project, SiteStats } from "@/lib/types";

interface PortfolioProps {
  projects?: Project[];
  stats?: SiteStats;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "noor-doors",
    name: "Noor Modern Doors",
    industry: "Architectural Doors & Glazing",
    tagline: "Converting unpredictable inbound buyer calls into qualified showroom consultations.",
    problem: "Customers phoned at all hours inquiring about custom sizing and pricing. The showroom sales team lost hours to repetitive sizing questions while missed calls after 6 PM went completely cold.",
    whatLunoAutomated: "VoiceOps answers every inbound call in under a second. The agent understands architectural specifications, qualifies contractor timelines and budgets, and locks showroom consultation appointments directly onto sales calendars.",
    handles: [
      "Custom door sizing & catalog specs",
      "Contractor budget & timeline qualification",
      "Showroom consultation appointment booking",
      "Automated CRM lead record creation",
    ],
    result: "Lead response time reduced to 0 seconds · Zero missed weekend inquiries · Sales reps focus exclusively on qualified buyers.",
    active: true,
  },
  {
    id: "apex-realty",
    name: "Apex Luxury Properties",
    industry: "Real Estate & Leasing",
    tagline: "Autonomous buyer qualification and private showing calendar locks.",
    problem: "Brokers missed 40% of inbound weekend calls from prospective property buyers inquiring about active high-value listings during private viewings.",
    whatLunoAutomated: "VoiceOps answers immediately, confirms listing availability, verifies buyer pre-approval and move-in timeline, and writes showings directly into broker calendars.",
    handles: [
      "Property specifications & pricing inquiries",
      "Buyer pre-approval & budget verification",
      "Private showing calendar coordination",
      "Instant SMS summary to listing broker",
    ],
    result: "100% weekend inquiry capture · 68% showing booking conversion rate · Phone tag eliminated entirely.",
    active: true,
  },
];

export const PortfolioSection = memo(function PortfolioSection({ projects }: PortfolioProps) {
  const activeProjects =
    projects && projects.length > 0 ? projects.filter((p) => p.active) : DEFAULT_PROJECTS;

  return (
    <section id="work" className="py-28 md:py-40 relative overflow-hidden bg-[#faf8f5] dark:bg-[#07090e] border-t border-black/[0.06] dark:border-white/[0.08] transition-colors">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 sm:mb-24 text-left space-y-3"
        >
          <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
            CASE STUDY PUBLICATION
          </p>

          <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal">
            Real deployments. Measured results.
          </h2>

          <p className="type-sans-body-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            How growing companies replaced hold music and missed calls with intelligent first-layer voice automation.
          </p>
        </motion.div>

        {/* Magazine-Spread Case Studies with Staggered Scroll Reveal */}
        <div className="space-y-20 sm:space-y-28">
          {activeProjects.slice(0, 2).map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start border-b border-black/[0.06] dark:border-white/[0.08] pb-16 sm:pb-24 last:border-b-0"
            >
              {/* Left Column: Title, Statement & Workflows */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                  <span className="font-bold text-blue-600 dark:text-blue-400">0{idx + 1}</span>
                  <span>/</span>
                  <span className="uppercase tracking-wider">{project.industry}</span>
                </div>

                <h3 className="font-sans font-bold text-xl sm:text-2xl text-zinc-950 dark:text-white tracking-tight">
                  {project.name}
                </h3>

                <p className="font-serif text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100 font-normal leading-snug">
                  “{project.tagline}”
                </p>

                {/* Handled Items */}
                {project.handles && project.handles.length > 0 && (
                  <div className="pt-3 space-y-2.5">
                    <span className="type-editorial-eyebrow text-zinc-400 block">
                      AUTOMATED WORKFLOWS
                    </span>
                    <ul className="space-y-2 font-sans text-xs text-zinc-600 dark:text-zinc-400">
                      {project.handles.map((h, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Problem, What VoiceOps Built, Outcome */}
              <div className="lg:col-span-6 space-y-6 pt-2 text-left">
                <div className="space-y-2">
                  <span className="type-editorial-eyebrow text-zinc-500 block">
                    THE BUSINESS CHALLENGE
                  </span>
                  <p className="type-sans-body-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="type-editorial-eyebrow text-blue-600 dark:text-blue-400 block">
                    WHAT VOICEOPS BUILT & DEPLOYED
                  </span>
                  <p className="type-sans-body-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                    {project.whatLunoAutomated}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/[0.08] dark:bg-emerald-500/[0.1] border border-emerald-500/20 space-y-1">
                  <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">
                    MEASURED OUTCOME
                  </span>
                  <p className="font-sans text-xs font-semibold text-zinc-950 dark:text-white leading-snug">
                    {project.result}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
});
