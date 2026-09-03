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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="chapter-midnight border-t border-white/[0.08] py-16 sm:py-20 text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 border-b border-white/[0.08] pb-12">
          {/* Brand & Thesis */}
          <div className="space-y-3 max-w-sm text-left">
            <Link href="/" className="inline-block font-sans font-bold text-sm uppercase tracking-tight text-white">
              VOICEOPS
            </Link>
            <p className="type-sans-body-sm text-zinc-400 font-normal leading-relaxed">
              Voice automation for the first layer of business calls. Custom conversational systems engineered for real operational workflows.
            </p>
          </div>

          {/* Quiet Navigation Columns */}
          <div className="flex flex-wrap gap-12 sm:gap-16 text-xs text-left">
            <div className="space-y-3">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">
                EXPERIENCE
              </span>
              <ul className="space-y-2 font-sans text-zinc-400">
                <li>
                  <button onClick={() => scrollTo("demo")} className="hover:text-white transition-colors">
                    Live Demo
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("use-cases")} className="hover:text-white transition-colors">
                    Capabilities
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("industries")} className="hover:text-white transition-colors">
                    Industries
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("architecture")} className="hover:text-white transition-colors">
                    The First Layer
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">
                STUDIO
              </span>
              <ul className="space-y-2 font-sans text-zinc-400">
                <li>
                  <button onClick={() => scrollTo("work")} className="hover:text-white transition-colors">
                    Work & Case Studies
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("process")} className="hover:text-white transition-colors">
                    Methodology
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("faq")} className="hover:text-white transition-colors">
                    FAQ
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("contact")} className="hover:text-white transition-colors">
                    Deploy
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">
                ADMIN
              </span>
              <ul className="space-y-2 font-sans text-zinc-400">
                <li>
                  <Link href="/admin/login" className="hover:text-white transition-colors">
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
              className="flex items-center gap-1 hover:text-white transition-colors"
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
