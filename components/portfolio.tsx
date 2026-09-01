"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, X, ArrowRight } from "lucide-react";
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
    tagline: "Inbound Product Consultation, Custom Specs & Showroom Booking",
    problem: "Sales representatives spent 4+ hours daily answering repetitive calls regarding custom dimensions, material specs, and pricing, leading to missed high-intent builder leads.",
    whatLunoAutomated: "Engineered an autonomous conversational agent that fields incoming calls, extracts architectural requirements, qualifies project timeline and budget, provides catalog specs, and schedules showroom consultations directly into sales calendars.",
    result: "Instant lead response; 100% weekend inquiry capture; 40% increase in qualified showroom visits.",
    handles: ["Product specification & sizing intake", "Contractor & homeowner budget qualification", "Showroom consultation scheduling", "Instant CRM lead synchronization"],
    active: true,
  },
  {
    id: "apex-realty",
    name: "Apex Luxury Properties",
    industry: "Real Estate & Commercial Leasing",
    tagline: "Autonomous Inbound Buyer Qualification & Showing Dispatch",
    problem: "Real estate brokers were missing 40% of inbound weekend calls from prospective property buyers and tenants inquiring about active listings.",
    whatLunoAutomated: "Engineered a custom conversational telephony agent that answers instantly, qualifies buyer pre-approval & budget, answers property spec FAQs, and schedules private showings into broker calendars.",
    result: "100% call capture; 68% showing booking conversion rate; 18 hours/week saved per agent.",
    handles: ["Property specification inquiries", "Budget & location intake", "Private showing scheduling", "Agent calendar sync"],
    active: true,
  },
  {
    id: "horizon-dental",
    name: "Horizon Healthcare Network",
    industry: "Medical & Dental Clinics",
    tagline: "24/7 Patient Appointment Coordination & Emergency Triage",
    problem: "Front desk staff spent 5+ hours per day handling repetitive booking calls and appointment confirmations instead of attending to in-clinic patients.",
    whatLunoAutomated: "Built a HIPAA-conscious voice layer integrated directly with the clinic's EHR calendar to coordinate new patient bookings, cancellations, insurance verification, and urgent emergency transfers.",
    result: "Zero hold times; 42% reduction in front-desk call load; 99.4% patient satisfaction rating.",
    handles: ["Patient appointment scheduling", "Rescheduling & cancellation", "Insurance intake Q&A", "Urgent clinical escalation"],
    active: true,
  },
];

const DEFAULT_STATS: SiteStats = {
  companiesBuilt: 12,
  voiceAgents: 24,
  useCasesAutomated: 40,
  uptime: "99.98%",
  avgResponseLatency: "<400ms",
};

export const PortfolioSection = memo(function PortfolioSection({ projects, stats }: PortfolioProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const rawProjects = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;
  const activeProjects = rawProjects.filter((p) => p && p.active);
  const safeStats = stats || DEFAULT_STATS;

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="work" className="py-24 md:py-32 relative overflow-hidden bg-black/[0.015] dark:bg-white/[0.015] border-y border-black/[0.04] dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4 uppercase">
            <span>Verified Studio Deployments</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.035em] text-zinc-950 dark:text-white mb-5">
            Built for real business conversations.
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            Every studio deployment solves a high-friction phone problem with customized business rules and direct system integrations.
          </p>
        </div>

        {/* Verified Stats Bar */}
        <div className="mb-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl structured-card">
          <div className="text-center p-3 border-r border-black/[0.05] dark:border-white/[0.06] last:border-r-0">
            <div className="text-2xl sm:text-4xl font-extrabold font-mono text-zinc-950 dark:text-white mb-1">
              {safeStats.companiesBuilt || 12}
            </div>
            <p className="text-[10px] sm:text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
              Companies Built
            </p>
          </div>

          <div className="text-center p-3 border-r border-black/[0.05] dark:border-white/[0.06] last:border-r-0">
            <div className="text-2xl sm:text-4xl font-extrabold font-mono text-zinc-950 dark:text-white mb-1">
              {safeStats.voiceAgents || 24}
            </div>
            <p className="text-[10px] sm:text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
              Voice Agents Active
            </p>
          </div>

          <div className="text-center p-3 border-r border-black/[0.05] dark:border-white/[0.06] last:border-r-0">
            <div className="text-2xl sm:text-4xl font-extrabold font-mono text-zinc-950 dark:text-white mb-1">
              {safeStats.useCasesAutomated || 40}
            </div>
            <p className="text-[10px] sm:text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
              Workflows Automated
            </p>
          </div>

          <div className="text-center p-3">
            <div className="text-2xl sm:text-4xl font-extrabold font-mono text-zinc-950 dark:text-white mb-1">
              {safeStats.uptime || "99.98%"}
            </div>
            <p className="text-[10px] sm:text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
              Telephony Uptime
            </p>
          </div>
        </div>

        {/* Large Editorial Case Studies */}
        <div className="space-y-8">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              className="p-8 sm:p-10 rounded-3xl structured-card space-y-6 flex flex-col justify-between group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.05] dark:border-white/[0.06] pb-5">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {project.industry}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white mt-0.5">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-1">
                    {project.tagline}
                  </p>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-mono shrink-0">
                  {project.result.split(";")[0]}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                <div className="space-y-2">
                  <h4 className="font-bold text-zinc-950 dark:text-white text-xs font-mono uppercase tracking-wider">
                    The Challenge
                  </h4>
                  <p>{project.problem}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-zinc-950 dark:text-white text-xs font-mono uppercase tracking-wider">
                    What Lunor Engineered
                  </h4>
                  <p>{project.whatLunoAutomated}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.04] dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {(project.handles || project.workflow || []).slice(0, 3).map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-zinc-700 dark:text-zinc-300"
                    >
                      <Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 shrink-0"
                >
                  <span>Full Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              transition={{ duration: 0.18 }}
              className="relative w-full max-w-xl rounded-3xl structured-card p-7 sm:p-9 shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-4">
                <div>
                  <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
                    {selectedProject.industry}
                  </span>
                  <h3 className="text-2xl font-bold text-zinc-950 dark:text-white mt-0.5">
                    {selectedProject.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.08] text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                <div>
                  <h4 className="font-bold text-zinc-950 dark:text-white mb-1 font-mono uppercase text-xs">
                    The Challenge
                  </h4>
                  <p>{selectedProject.problem}</p>
                </div>

                <div>
                  <h4 className="font-bold text-zinc-950 dark:text-white mb-1 font-mono uppercase text-xs">
                    What Lunor Engineered
                  </h4>
                  <p>{selectedProject.whatLunoAutomated}</p>
                </div>

                <div>
                  <h4 className="font-bold text-zinc-950 dark:text-white mb-1.5 font-mono uppercase text-xs">
                    Automated Workflows
                  </h4>
                  <div className="space-y-1.5">
                    {(selectedProject.handles || selectedProject.workflow || []).map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06]">
                  <h4 className="font-bold text-zinc-950 dark:text-white mb-1 font-mono uppercase text-xs">
                    Impact & Results
                  </h4>
                  <p className="font-medium text-emerald-600 dark:text-emerald-400">
                    {selectedProject.result}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">
                  Ready to deploy a similar system?
                </span>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    scrollToContact();
                  }}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold btn-solid-primary"
                >
                  <span>Build My Voice Agent</span>
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
