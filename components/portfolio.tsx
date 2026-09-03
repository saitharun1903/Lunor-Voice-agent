"use client";

import React, { memo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Check } from "lucide-react";
import { Project, SiteStats } from "@/lib/types";

interface PortfolioProps {
  projects?: Project[];
  stats?: SiteStats;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "noor-doors",
    name: "Noor Modern Doors",
    industry: "Doors & Windows",
    tagline: "AI voice automation for customer enquiries, lead qualification, and showroom scheduling.",
    problem: "Customers phoned at all hours inquiring about custom sizing and pricing. The showroom sales team lost hours to repetitive sizing questions while missed calls after 6 PM went completely cold.",
    whatLunoAutomated: "VoiceOps answers every inbound call in under a second. The agent understands architectural specifications, qualifies contractor timelines and budgets, and locks showroom consultation appointments directly onto sales calendars.",
    handles: [
      "Custom door sizing & catalog specifications",
      "Contractor budget & timeline qualification",
      "Showroom consultation appointment booking",
      "Automated CRM lead record creation",
    ],
    result: "Faster lead response and fewer missed opportunities.",
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
    result: "100% weekend inquiry capture and 68% showing booking conversion.",
    active: true,
  },
];

export const PortfolioSection = memo(function PortfolioSection({ projects }: PortfolioProps) {
  const activeProjects =
    projects && projects.length > 0 ? projects.filter((p) => p.active) : DEFAULT_PROJECTS;

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const handleConsult = useCallback(() => {
    setSelectedProject(null);
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }, []);

  return (
    <section id="work" className="py-24 md:py-36 relative overflow-hidden bg-[#F5F1E8] dark:bg-[#07090e] border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] transition-colors">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14 sm:mb-20 text-left space-y-3"
        >
          <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
            CASE STUDIES
          </p>

          <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal">
            Real deployments. Measured results.
          </h2>

          <p className="type-sans-body-lg text-[#58534C] dark:text-zinc-400 font-normal leading-relaxed">
            How growing companies replaced missed calls and phone tag with an automated first layer.
          </p>
        </motion.div>

        {/* Clean, Fast-to-Scan Editorial Case Study Previews */}
        <div className="border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] divide-y divide-[rgba(36,33,26,0.08)] dark:divide-white/[0.08]">
          {activeProjects.slice(0, 2).map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline text-left group"
            >
              {/* Left Column: Category, Project Name, 1-2 Line Description */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
                  <span>CASE STUDY</span>
                  <span>·</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    0{idx + 1} / {project.industry.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-zinc-950 dark:text-white font-normal tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#58534C] dark:text-zinc-400 leading-relaxed font-normal max-w-xl">
                  {project.tagline}
                </p>
              </div>

              {/* Right Column: Short Result & Single Clean CTA */}
              <div className="lg:col-span-5 space-y-4 pt-1 lg:pt-0 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                    RESULT
                  </span>
                  <p className="font-sans text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-snug">
                    {project.result}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 min-h-[44px] py-2 font-sans text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/btn outline-none touch-manipulation"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Full Detailed Case Study Modal / Drawer (Preserves 100% of the Deep Data) */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl bg-[#FAF8F2] dark:bg-[#0c101c] border border-[rgba(36,33,26,0.08)] dark:border-white/[0.09] shadow-2xl p-6 sm:p-10 space-y-8 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-5">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                    CASE STUDY · {selectedProject.industry.toUpperCase()}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-zinc-950 dark:text-white font-normal">
                    {selectedProject.name}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] flex items-center justify-center text-zinc-600 dark:text-zinc-300 transition-colors touch-manipulation"
                  aria-label="Close Case Study"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Business Problem */}
              <div className="space-y-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 block">
                  THE BUSINESS CHALLENGE
                </span>
                <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {selectedProject.problem}
                </p>
              </div>

              {/* What VoiceOps Built */}
              <div className="space-y-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                  WHAT VOICEOPS BUILT & DEPLOYED
                </span>
                <p className="font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                  {selectedProject.whatLunoAutomated}
                </p>
              </div>

              {/* Automated Workflows */}
              {selectedProject.handles && selectedProject.handles.length > 0 && (
                <div className="space-y-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 block">
                    AUTOMATED WORKFLOWS
                  </span>
                  <ul className="space-y-2.5 font-sans text-xs text-zinc-700 dark:text-zinc-300">
                    {selectedProject.handles.map((h, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Measured Result */}
              <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] space-y-1">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                  MEASURED OUTCOME
                </span>
                <p className="font-sans text-xs sm:text-sm font-semibold text-zinc-950 dark:text-white leading-snug">
                  {selectedProject.result}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/[0.06] dark:border-white/[0.08]">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="font-sans text-xs text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Close preview
                </button>

                <button
                  onClick={handleConsult}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 font-sans text-xs font-semibold tracking-tight transition-all shadow-sm"
                >
                  <span>Deploy for My Business</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
});
