"use client";

import React, { useState, useEffect, memo, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown, ArrowRight } from "lucide-react";
import { useTheme } from "./theme-provider";
import { VoiceOpsSymbol } from "./ui/lunor-logo";
import { NavigationContent } from "@/lib/types";

interface NavLink {
  label: string;
  id: string;
}

interface NavbarProps {
  navigation?: NavigationContent;
}

export const Navbar = memo(function Navbar({ navigation }: NavbarProps) {
  const primaryLinks: NavLink[] = [
    { label: navigation?.demoLabel || "Live Demo", id: "demo" },
    { label: navigation?.capabilitiesLabel || "Capabilities", id: "capabilities" },
    { label: navigation?.industriesLabel || "Industries", id: "industries" },
    { label: navigation?.workLabel || "Work", id: "work" },
    { label: navigation?.processLabel || "Process", id: "process" },
  ];

  const secondaryLinks: NavLink[] = [
    { label: "Architecture", id: "workflow" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  const ctaText = navigation?.ctaLabel || "Talk to VoiceOps";

  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const moreRef = useRef<HTMLDivElement>(null);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor scroll for compact elevation
  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 24);
        if (window.scrollY < 200) {
          setActiveSection("");
        }
        rafId = null;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // IntersectionObserver for active section detection (primary links only)
  useEffect(() => {
    const sectionIds = ["demo", "capabilities", "industries", "work", "process"];
    const elements: HTMLElement[] = [];

    sectionIds.forEach((id) => {
      let el = document.getElementById(id);
      if (!el && id === "capabilities") {
        el = document.getElementById("use-cases");
      }
      if (el) elements.push(el);
    });

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrollingRef.current) return;

        // Find the visible section with the largest intersection ratio or top proximity
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          // Sort by visibility ratio
          intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const activeId = intersecting[0].target.id;
          const normalized = activeId === "use-cases" ? "capabilities" : activeId;
          setActiveSection(normalized);
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.1, 0.3, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMoreMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Smooth scroll handler with lock to prevent jumping
  const handleNavClick = useCallback((id: string, isSecondary = false) => {
    if (!isSecondary) {
      setActiveSection(id);
    }
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    setMobileMenuOpen(false);
    setMoreMenuOpen(false);

    let target = document.getElementById(id);
    if (!target && id === "capabilities") {
      target = document.getElementById("use-cases");
    }
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 sm:pt-4 pointer-events-none transition-all duration-300">
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-3.5 sm:px-5 py-2 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-[#0D0F14]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/[0.1] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            : "bg-white/80 dark:bg-[#0D0F14]/80 backdrop-blur-sm border border-slate-200/60 dark:border-white/[0.06] shadow-sm"
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 group py-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
          aria-label="VOICEOPS Home"
        >
          <VoiceOpsSymbol size={24} className="transition-transform duration-200 group-hover:scale-105" />
          <span className="font-extrabold text-[15px] sm:text-base tracking-tight text-zinc-950 dark:text-white font-sans">
            VOICEOPS
          </span>
        </Link>

        {/* Desktop Primary Navigation with Single Shared Active Surface */}
        <div className="hidden md:flex items-center gap-1 relative">
          {primaryLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs sm:text-[13px] transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 select-none ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-medium"
                }`}
              >
                {/* One Shared Active Pill Surface (Framer Motion layoutId) */}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute inset-0 rounded-lg bg-blue-600/[0.08] dark:bg-blue-400/[0.14] -z-10"
                    transition={{ type: "spring", stiffness: 440, damping: 34 }}
                  />
                )}
                <span>{link.label}</span>
              </button>
            );
          })}

          {/* More Secondary Menu Popover */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreMenuOpen((prev) => !prev)}
              aria-expanded={moreMenuOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>More</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  moreMenuOpen ? "rotate-180 text-zinc-900 dark:text-white" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {moreMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-full right-0 mt-2 w-44 p-1.5 rounded-xl bg-white dark:bg-[#12151E] border border-slate-200/80 dark:border-white/[0.1] shadow-xl text-left z-50"
                >
                  {secondaryLinks.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => handleNavClick(sec.id, true)}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-zinc-950 dark:hover:text-white transition-colors"
                    >
                      {sec.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Controls: Theme Toggle & Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary CTA (Talk to VoiceOps) */}
          <button
            onClick={() => handleNavClick("contact", true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 text-xs font-semibold tracking-tight transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto fixed inset-x-4 top-16 z-50 p-5 rounded-2xl bg-white dark:bg-[#0D0F14] border border-slate-200 dark:border-white/[0.12] shadow-2xl md:hidden text-left space-y-4"
          >
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block font-semibold px-2">
                NAVIGATION
              </span>
              {primaryLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-600/[0.08] dark:bg-blue-400/[0.14] text-blue-600 dark:text-blue-400 font-semibold"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-white/[0.08] space-y-1">
              <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block font-semibold px-2">
                EXPLORE
              </span>
              {secondaryLinks.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => handleNavClick(sec.id, true)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                >
                  {sec.label}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNavClick("contact", true)}
                className="w-full py-3 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-sans text-xs font-semibold tracking-tight text-center shadow-sm"
              >
                {ctaText}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});
