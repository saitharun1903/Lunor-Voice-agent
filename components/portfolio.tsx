"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, X, ArrowRight, Shield, Activity, Sparkles } from "lucide-react";
import { Project, SiteStats } from "@/lib/types";

interface PortfolioProps {
  projects: Project[];
  stats: SiteStats;
}

export function PortfolioSection({ projects, stats }: PortfolioProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const activeProjects = projects.filter((p) => p.active);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="work" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 mb-4 uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Deployments</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-5"
          >
            Built for real business conversations.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto text-balance"
          >
            Every studio deployment solves a high-friction phone problem with customized logic and direct system integrations.
          </motion.p>
        </div>

        {/* Real Stats Metric Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-8 sm:p-10 rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-xl relative overflow-hidden"
        >
          {/* Top Specular Line Accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          <div className="text-center p-4 border-r border-black/[0.05] dark:border-white/[0.06] last:border-r-0">
            <div className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-1.5 font-mono">
              {stats.companiesBuilt}
            </div>
            <p className="text-[11px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Companies Built
            </p>
          </div>

          <div className="text-center p-4 border-r border-black/[0.05] dark:border-white/[0.06] last:border-r-0">
            <div className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-1.5 font-mono">
              {stats.voiceAgents}
            </div>
            <p className="text-[11px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Voice Agents Active
            </p>
          </div>

          <div className="text-center p-4 border-r border-black/[0.05] dark:border-white/[0.06] last:border-r-0">
            <div className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-1.5 font-mono">
              {stats.useCasesAutomated}
            </div>
            <p className="text-[11px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Custom Use Cases
            </p>
          </div>

          <div className="text-center p-4">
            <div className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-1.5 font-mono">
              {stats.uptime || "99.98%"}
            </div>
            <p className="text-[11px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Platform Reliability
            </p>
          </div>
        </motion.div>

        {/* Large Project Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="rounded-3xl p-8 sm:p-10 backdrop-blur-2xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-lg hover:shadow-2xl hover:border-blue-500/30 transition-all duration-400 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Specular Line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {project.industry}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">Case Study</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-6">
                  {project.tagline}
                </p>

                {/* Problem & Solution */}
                <div className="space-y-3.5 mb-7 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white">The Challenge: </span>
                    <span>{project.problem}</span>
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white">What Luno Engineered: </span>
                    <span>{project.whatLunoAutomated}</span>
                  </div>
                </div>

                {/* Key Capabilities */}
                <div className="space-y-2.5 mb-7">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    Automated Workflows:
                  </p>
                  <div className="space-y-1.5">
                    {(project.handles || project.workflow || []).slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-5 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-semibold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  {project.result.split(";")[0] || "100% Autonomous"}
                </div>
              </div>
            </motion.div>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl rounded-3xl backdrop-blur-2xl bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/15 p-7 sm:p-9 shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-4">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {selectedProject.industry}
                  </span>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
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
                  <h4 className="font-bold text-zinc-900 dark:text-white mb-1">The Challenge</h4>
                  <p>{selectedProject.problem}</p>
                </div>

                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white mb-1">What Luno Engineered</h4>
                  <p>{selectedProject.whatLunoAutomated}</p>
                </div>

                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white mb-1.5">Automated Workflows</h4>
                  <div className="space-y-1.5">
                    {(selectedProject.handles || selectedProject.workflow || []).map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/15">
                  <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-1">Measured Outcome</h4>
                  <p className="text-zinc-800 dark:text-zinc-200 font-medium">{selectedProject.result}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    scrollToContact();
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold glass-button-primary"
                >
                  <span>Build A Voice Agent Like This</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
