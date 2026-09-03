"use client";

import React, { memo } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { SiteSettings } from "@/lib/types";

interface FooterProps {
  settings: SiteSettings;
}

export const Footer = memo(function Footer({ settings }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    const target =
      id === "use-cases" || id === "capabilities"
        ? document.getElementById("capabilities") || document.getElementById("use-cases")
        : document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#F0ECE3] dark:bg-[#05070c] border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] py-16 sm:py-20 text-zinc-950 dark:text-white transition-colors">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 border-b border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] pb-12">
          {/* Brand & Thesis */}
          <div className="space-y-3 max-w-sm text-left">
            <Link href="/" className="inline-block font-sans font-bold text-sm uppercase tracking-tight text-zinc-950 dark:text-white">
              VOICEOPS
            </Link>
            <p className="type-sans-body-sm text-[#58534C] dark:text-zinc-400 font-normal leading-relaxed">
              Voice automation for the first layer of business calls. Custom conversational systems engineered for real operational workflows.
            </p>
            <div className="pt-2 space-y-1 font-mono text-xs text-[#58534C] dark:text-zinc-400">
              <p>
                Email:{" "}
                <a href="mailto:conversations@voiceops.in" className="hover:text-zinc-950 dark:hover:text-white transition-colors underline">
                  conversations@voiceops.in
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+18885866240" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  +1 (888) 586-6240
                </a>
              </p>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="flex flex-wrap gap-12 sm:gap-16 text-xs text-left">
            <div className="space-y-3">
              <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block font-semibold">
                EXPERIENCE
              </span>
              <ul className="space-y-1 font-sans text-zinc-600 dark:text-zinc-400">
                <li>
                  <Link
                    href="/#demo"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("demo");
                    }}
                    className="hover:text-zinc-950 dark:hover:text-white transition-colors min-h-[40px] py-1.5 flex items-center touch-manipulation"
                  >
                    Live Demo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#capabilities"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("capabilities");
                    }}
                    className="hover:text-zinc-950 dark:hover:text-white transition-colors min-h-[40px] py-1.5 flex items-center touch-manipulation"
                  >
                    Capabilities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#industries"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("industries");
                    }}
                    className="hover:text-zinc-950 dark:hover:text-white transition-colors min-h-[40px] py-1.5 flex items-center touch-manipulation"
                  >
                    Industries
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#architecture"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("architecture");
                    }}
                    className="hover:text-zinc-950 dark:hover:text-white transition-colors min-h-[40px] py-1.5 flex items-center touch-manipulation"
                  >
                    The First Layer
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block font-semibold">
                STUDIO
              </span>
              <ul className="space-y-1 font-sans text-zinc-600 dark:text-zinc-400">
                <li>
                  <Link
                    href="/#work"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("work");
                    }}
                    className="hover:text-zinc-950 dark:hover:text-white transition-colors min-h-[40px] py-1.5 flex items-center touch-manipulation"
                  >
                    Work & Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#process"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("process");
                    }}
                    className="hover:text-zinc-950 dark:hover:text-white transition-colors min-h-[40px] py-1.5 flex items-center touch-manipulation"
                  >
                    Process & Methodology
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("faq");
                    }}
                    className="hover:text-zinc-950 dark:hover:text-white transition-colors min-h-[40px] py-1.5 flex items-center touch-manipulation"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("contact");
                    }}
                    className="hover:text-zinc-950 dark:hover:text-white transition-colors min-h-[40px] py-1.5 flex items-center touch-manipulation"
                  >
                    Contact VoiceOps
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block font-semibold">
                ADMIN
              </span>
              <ul className="space-y-1 font-sans text-zinc-600 dark:text-zinc-400">
                <li>
                  <Link href="/admin/login" className="hover:text-zinc-950 dark:hover:text-white transition-colors min-h-[40px] py-1.5 flex items-center touch-manipulation">
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-zinc-500">
          <p>© {new Date().getFullYear()} VoiceOps Technologies Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>voiceops.in</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
});
