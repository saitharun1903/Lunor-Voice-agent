"use client";

import React, { useState, useEffect, memo, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown, PhoneCall } from "lucide-react";
import { useTheme } from "./theme-provider";

interface NavLink {
  label: string;
  id: string;
}

const PRIMARY_LINKS: NavLink[] = [
  { label: "Live Demo", id: "demo" },
  { label: "Capabilities", id: "use-cases" },
  { label: "Industries", id: "industries" },
  { label: "Work", id: "work" },
  { label: "Process", id: "process" },
];

const SECONDARY_LINKS: NavLink[] = [
  { label: "Architecture", id: "architecture" },
  { label: "Methodology", id: "process" },
  { label: "Case Studies", id: "work" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

export const Navbar = memo(function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompressed, setIsCompressed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("demo");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const moreRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  // Passive, rAF-throttled scroll handler (zero continuous re-renders)
  useEffect(() => {
    const onScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const scrolled = currentY > 20;
        const diff = currentY - lastScrollY.current;

        setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

        if (currentY > 70) {
          if (diff > 8) {
            setIsCompressed(true);
            setMoreMenuOpen(false);
          } else if (diff < -8) {
            setIsCompressed(false);
          }
        } else {
          setIsCompressed(false);
        }

        lastScrollY.current = currentY;
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) window.cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Close "More" popover and mobile drawer on click outside & Escape key
  useEffect(() => {
    const handleMousedown = (e: MouseEvent) => {
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

    document.addEventListener("mousedown", handleMousedown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMousedown);
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

  // Observer to track which section is currently in view
  useEffect(() => {
    const observedIds = ["demo", "use-cases", "industries", "work", "process", "architecture", "faq", "contact"];
    const observers = observedIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" }
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const isDark = theme === "dark";

  return (
    <>
      <header
        className={`fixed top-3 sm:top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCompressed ? "-translate-y-1.5 opacity-95" : "translate-y-0 opacity-100"
        }`}
      >
        <div
          className={`pointer-events-auto max-w-[1140px] mx-auto h-14 sm:h-[56px] px-4 sm:px-6 rounded-2xl flex items-center justify-between transition-all duration-200 ${
            isScrolled
              ? "bg-[#FFFDF8]/98 dark:bg-[#0c101c]/96 backdrop-blur-md border border-[rgba(28,25,20,0.10)] dark:border-white/[0.09] shadow-[0_8px_30px_rgba(28,25,20,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.65)]"
              : "bg-[#FFFDF8]/92 dark:bg-[#0c101c]/90 backdrop-blur-sm border border-[rgba(28,25,20,0.07)] dark:border-white/[0.07] shadow-[0_4px_20px_rgba(28,25,20,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.45)]"
          }`}
        >
          {/* =========================================================
              ZONE 1: BRAND LOGO & SIGNAL MARK (Deep Graphite / Warm White)
              ========================================================= */}
          <Link
            href="/"
            aria-label="VoiceOps Homepage"
            className="flex items-center gap-2.5 group outline-none shrink-0 transition-transform duration-150 hover:-translate-y-[1px]"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12V12.01M8 8V16M12 4V20M16 8V16M20 12V12.01"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  className="text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform"
                />
              </svg>
            </div>
            <span className="font-sans font-bold text-[14px] sm:text-[15px] tracking-tight uppercase text-[#141414] dark:text-white transition-opacity group-hover:opacity-85 whitespace-nowrap">
              VOICEOPS
            </span>
          </Link>

          {/* =========================================================
              ZONE 2: CENTER NAVIGATION (Compact, High Contrast, Never Wraps)
              ========================================================= */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-1.5 text-[13px] font-medium"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {PRIMARY_LINKS.map((link, idx) => {
              const isActive = activeSection === link.id;
              const isHovered = hoveredIndex === idx;

              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={`relative px-3 py-1.5 rounded-lg transition-colors duration-150 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? "text-[#141414] dark:text-white font-semibold"
                      : "text-[#4E4A43] dark:text-[#A9A7A2] hover:text-[#141414] dark:hover:text-white"
                  }`}
                >
                  {/* Subtle Local Hover Highlight */}
                  {isHovered && !isActive && (
                    <motion.span
                      layoutId="navHoverPlate"
                      className="absolute inset-0 rounded-lg bg-black/[0.035] dark:bg-white/[0.05] pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>

                  {/* Refined Gliding Active Blue Underline */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute -bottom-[2px] left-3 right-3 h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}

            {/* "More" Secondary Navigation Popover */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreMenuOpen((prev) => !prev)}
                aria-expanded={moreMenuOpen}
                aria-haspopup="true"
                aria-label="More navigation options"
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors duration-150 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  moreMenuOpen
                    ? "text-[#141414] dark:text-white font-semibold bg-black/[0.035] dark:bg-white/[0.05]"
                    : "text-[#4E4A43] dark:text-[#A9A7A2] hover:text-[#141414] dark:hover:text-white"
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreMenuOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full right-0 mt-2.5 w-48 py-2 rounded-xl bg-[#FFFDF8] dark:bg-[#0c101c] border border-[rgba(28,25,20,0.09)] dark:border-white/[0.10] shadow-[0_12px_36px_rgba(28,25,20,0.08)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.7)] z-50 text-left"
                  >
                    {SECONDARY_LINKS.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToSection(item.id)}
                        className="w-full px-4 py-2 text-[12.5px] font-sans font-medium text-[#4E4A43] dark:text-[#A9A7A2] hover:text-[#141414] dark:hover:text-white hover:bg-black/[0.035] dark:hover:bg-white/[0.06] text-left transition-colors flex items-center justify-between whitespace-nowrap"
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* =========================================================
              ZONE 3: ACTION GROUP (Theme Control + Primary Solid Matte CTA)
              ========================================================= */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Theme Toggle (Tactile 36x36px control with smooth 90deg rotation) */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
              className="w-9 h-9 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.07] dark:hover:bg-white/[0.12] border border-[rgba(28,25,20,0.08)] dark:border-white/[0.08] flex items-center justify-center text-[#141414] dark:text-zinc-200 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? "dark" : "light"}
                  initial={{ opacity: 0, rotate: isDark ? -90 : 90, scale: 0.85 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: isDark ? 90 : -90, scale: 0.85 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#141414]" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Primary Compact CTA (High Contrast, Tactile, No Gloss) */}
            <button
              onClick={() => scrollToSection("demo")}
              className="group hidden sm:inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl bg-[#141414] hover:bg-black text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-[#141414] text-[13px] font-semibold tracking-tight transition-all duration-150 shadow-xs hover:-translate-y-[1px] active:scale-[0.985] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-400 dark:text-blue-600 transition-transform group-hover:translate-x-0.5" />
              <span>Talk to VoiceOps</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-9 h-9 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.07] dark:hover:bg-white/[0.12] border border-[rgba(28,25,20,0.08)] dark:border-white/[0.08] flex items-center justify-center text-[#141414] dark:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MOBILE PURPOSE-BUILT DRAWER / PANEL
          ========================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden flex justify-end"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="w-[86%] max-w-sm h-full bg-[#FFFDF8] dark:bg-[#0c101c] border-l border-[rgba(28,25,20,0.09)] dark:border-white/[0.09] p-6 flex flex-col justify-between shadow-2xl text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[rgba(28,25,20,0.07)] dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 12V12.01M8 8V16M12 4V20M16 8V16M20 12V12.01"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className="font-sans font-bold text-sm tracking-tight uppercase text-[#141414] dark:text-white">
                    VOICEOPS
                  </span>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-8 h-8 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center text-[#4E4A43] dark:text-zinc-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Items (Single List, Never Wraps) */}
              <div className="space-y-1 py-4 my-auto overflow-y-auto">
                {[...PRIMARY_LINKS, ...SECONDARY_LINKS].map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(link.id)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-left font-sans text-sm font-medium text-[#4E4A43] dark:text-[#A9A7A2] hover:text-[#141414] dark:hover:text-white hover:bg-black/[0.035] dark:hover:bg-white/[0.06] transition-colors whitespace-nowrap flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    {activeSection === link.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    )}
                  </button>
                ))}
              </div>

              {/* Action Footer */}
              <div className="pt-5 border-t border-[rgba(28,25,20,0.07)] dark:border-white/[0.08] space-y-3">
                <button
                  onClick={() => scrollToSection("demo")}
                  className="w-full h-10 rounded-xl bg-[#141414] dark:bg-white text-white dark:text-[#141414] font-sans text-xs font-semibold tracking-tight shadow-sm flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-blue-400 dark:text-blue-600" />
                  <span>Talk to VoiceOps</span>
                </button>
                <div className="text-center">
                  <span className="text-[11px] font-mono text-[#888278] dark:text-zinc-500">
                    voiceops.in · AI Voice Automation
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});
