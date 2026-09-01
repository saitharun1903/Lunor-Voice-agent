"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, X, Shield, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteSettings } from "@/lib/types";
import { LunorLogo } from "./ui/lunor-logo";

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);

  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <footer className="py-16 border-t border-black/[0.06] dark:border-white/[0.08] bg-black/[0.01] dark:bg-black/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-black/[0.05] dark:border-white/[0.06]">
            {/* Column 1: Brand & Tagline */}
            <div className="md:col-span-5 space-y-4">
              <Link href="/" className="inline-block group" aria-label="Lunor Home">
                <LunorLogo size={28} showWordmark={true} />
              </Link>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
                {settings.tagline || "Voice automation for the first layer of business calls."}
              </p>
              <p className="text-xs text-zinc-500 font-mono">
                Custom voice systems engineered for real business workflows.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-white font-mono">
                Studio
              </p>
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="#work" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                    Client Work
                  </a>
                </li>
                <li>
                  <a href="#use-cases" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                    Capabilities
                  </a>
                </li>
                <li>
                  <a href="#industries" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                    Industry Solutions
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <button
                    onClick={scrollToDemo}
                    className="hover:text-zinc-950 dark:hover:text-white transition-colors text-left"
                  >
                    Talk to Lunor
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Direct */}
            <div className="md:col-span-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-white font-mono">
                Contact & Inquiries
              </p>
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <li>
                  <a
                    href={`mailto:${settings.email || "conversations@lunor.co.in"}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {settings.email || "conversations@lunor.co.in"}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${settings.phone || "+18885866240"}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {settings.phone || "+1 (888) 586-6240"}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${(settings.whatsapp || "").replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    WhatsApp Business Chat
                  </a>
                </li>
                <li className="pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Build My Voice Agent →
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <p>© {new Date().getFullYear()} Lunor Technologies Inc. All rights reserved.</p>

            <div className="flex items-center gap-5">
              <button
                onClick={() => setLegalModal("privacy")}
                className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setLegalModal("terms")}
                className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Dialog Modal */}
      <AnimatePresence>
        {legalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLegalModal(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl backdrop-blur-2xl bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/15 p-6 sm:p-8 shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  {legalModal === "privacy" ? (
                    <Shield className="w-4 h-4 text-blue-500" />
                  ) : (
                    <FileText className="w-4 h-4 text-blue-500" />
                  )}
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {legalModal === "privacy" ? "Privacy Policy" : "Terms of Service"}
                  </h3>
                </div>
                <button
                  onClick={() => setLegalModal(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.08] text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                {legalModal === "privacy" ? (
                  <>
                    <p>
                      <strong>1. Privacy Commitments:</strong> Lunor designs conversational systems that respect customer data sovereignty. We do not sell or monetize caller data.
                    </p>
                    <p>
                      <strong>2. Telephony & Audio Data:</strong> Voice audio processed during calls is routed exclusively through enterprise-grade channels and stored according to your business data retention policies.
                    </p>
                    <p>
                      <strong>3. Zero Model Training:</strong> Client phone transcripts are strictly isolated and never used to train public foundation models without explicit contractual agreement.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>1. Service Scope:</strong> Lunor provides voice automation studio services, conversational agent deployment, and telephony workflow integration.
                    </p>
                    <p>
                      <strong>2. Service Level Agreement:</strong> Enterprise tier deployments include high availability telephony routing with automated fallback and warm human transfer capabilities.
                    </p>
                    <p>
                      <strong>3. Compliance:</strong> Clients are responsible for ensuring their telecommunication disclosures comply with regional call recording and disclosure laws.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
