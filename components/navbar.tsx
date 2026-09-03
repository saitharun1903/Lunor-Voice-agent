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
  { label: "Process & Methodology", id: "process" },
  { label: "Architecture", id: "architecture" },
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

  // Single persistent Apple-style liquid active indicator state
  const [indicatorMounted, setIndicatorMounted] = useState(false);
  const [indicatorPos, setIndicatorPos] = useState({ x: 0, y: 0, opacity: 0, scale: 0.92 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const moreRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Update single persistent liquid indicator position via transforms
  const updateIndicatorPosition = useCallback(
    (isInitial = false) => {
      const nav = navRef.current;
      if (!nav) return;

      let targetKey = activeSection;
      if (!linkRefs.current[targetKey]) {
        const isSecondary = SECONDARY_LINKS.some((s) => s.id === activeSection);
        if (isSecondary && linkRefs.current["more"]) {
          targetKey = "more";
        } else if (linkRefs.current["demo"]) {
          targetKey = "demo";
        }
      }

      const targetEl = linkRefs.current[targetKey];
      if (!targetEl) return;

      const navRect = nav.getBoundingClientRect();
      const elRect = targetEl.getBoundingClientRect();

      // Position the 18px pale light-blue luminous circle near the lower-right portion of the active item
      const x = elRect.left - navRect.left + elRect.width - 20;
      const y = elRect.top - navRect.top + (elRect.height - 18) / 2 + 1;

      if (isInitial) {
        setIndicatorPos({ x, y, opacity: 1, scale: 1 });
        setIndicatorMounted(true);
      } else {
        setIndicatorPos({ x, y, opacity: 1, scale: 1 });
      }
    },
    [activeSection]
  );

  // Re-measure indicator position on activeSection change, fonts loaded, and window resize
  useEffect(() => {
    updateIndicatorPosition(!indicatorMounted);

    if (document.fonts) {
      document.fonts.ready.then(() => {
        updateIndicatorPosition();
      });
    }

    const onResize = () => updateIndicatorPosition();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateIndicatorPosition, indicatorMounted]);

  // Passive, rAF-throttled scroll listener (zero continuous re-renders)
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

  // IntersectionObserver to update active navigation state stably on scroll
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
        { threshold: 0.25, rootMargin: "-80px 0px -40% 0px" }
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    // Instant feedback: latest click wins immediately
    setActiveSection(id);
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
  const isSecondaryActive = SECONDARY_LINKS.some((s) => s.id === activeSection);

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
              ZONE 2: CENTER NAVIGATION (With Apple-Style Liquid Indicator)
              ========================================================= */}
          <nav
            ref={navRef}
            aria-label="Primary Navigation"
            className="relative hidden md:flex items-center gap-1 lg:gap-1.5 text-[13px] font-medium"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* ONE Persistent Light-Blue Luminous Circle Active Indicator (Moves with Transform) */}
            {indicatorMounted && (
              <motion.div
                aria-hidden="true"
                className="absolute pointer-events-none z-0 rounded-full flex items-center justify-center"
                initial={{
                  x: indicatorPos.x,
                  y: indicatorPos.y,
                  opacity: 0,
                  scale: 0.92,
                }}
                animate={{
                  x: indicatorPos.x,
                  y: indicatorPos.y,
                  opacity: indicatorPos.opacity,
                  scale: indicatorPos.scale,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.15 }
                    : {
                        duration: 0.30,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
                style={{ width: 18, height: 18 }}
              >
                {/* Small Pale Light-Blue Luminous Sphere (No White Core, No Neon) */}
                <div
                  className="w-full h-full rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: isDark
                      ? "radial-gradient(circle at 35% 35%, #CDE3FF 0%, #BBD8FF 45%, #9BC4FF 100%)"
                      : "radial-gradient(circle at 35% 35%, #DCEBFF 0%, #C9E1FF 45%, #B4D5FF 100%)",
                    border: isDark
                      ? "1px solid rgba(147, 197, 253, 0.35)"
                      : "1px solid rgba(100, 160, 255, 0.28)",
                    boxShadow: isDark
                      ? "0 0 0 2px rgba(96, 165, 250, 0.20), 0 0 10px rgba(96, 165, 250, 0.28), 0 1px 3px rgba(37, 99, 235, 0.20)"
                      : "0 0 0 2px rgba(100, 160, 255, 0.16), 0 0 10px rgba(100, 170, 255, 0.24), 0 1px 3px rgba(37, 99, 235, 0.12)",
                  }}
                >
                  {/* Subtle Atmospheric Blue Center Dot */}
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: isDark ? "#60A5FA" : "#3B82F6",
                      opacity: isDark ? 0.75 : 0.65,
                      boxShadow: isDark
                        ? "0 0 3px rgba(96, 165, 250, 0.6)"
                        : "0 0 3px rgba(59, 130, 246, 0.4)",
                    }}
                  />
                </div>
              </motion.div>
            )}

            {PRIMARY_LINKS.map((link, idx) => {
              const isActive = activeSection === link.id;
              const isHovered = hoveredIndex === idx;
              // On tablet (768-1023px), Process is accessible via More popover to prevent cramping
              const isTabletHidden = link.id === "process";

              return (
                <button
                  key={link.id}
                  ref={(el) => {
                    linkRefs.current[link.id] = el;
                  }}
                  onClick={() => scrollToSection(link.id)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={`relative z-10 px-2.5 sm:px-3 py-2 rounded-lg transition-colors duration-150 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-blue-600 touch-manipulation min-h-[44px] flex items-center justify-center ${
                    isTabletHidden ? "hidden lg:inline-flex" : "inline-flex"
                  } ${
                    isActive
                      ? "text-[#141414] dark:text-white font-semibold"
                      : "text-[#4E4A43] dark:text-[#A9A7A2] hover:text-[#141414] dark:hover:text-white"
                  }`}
                >
                  {/* Subtle Local Hover Highlight (Independent of Active Indicator) */}
                  {isHovered && !isActive && (
                    <motion.span
                      layoutId="navHoverPlate"
                      className="absolute inset-0 rounded-lg bg-black/[0.035] dark:bg-white/[0.05] pointer-events-none -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}

            {/* "More" Secondary Navigation Popover */}
            <div className="relative" ref={moreRef}>
              <button
                ref={(el) => {
                  linkRefs.current["more"] = el;
                }}
                onClick={() => setMoreMenuOpen((prev) => !prev)}
                aria-expanded={moreMenuOpen}
                aria-haspopup="true"
                aria-label="More navigation options"
                className={`relative z-10 flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-lg transition-colors duration-150 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-blue-600 touch-manipulation min-h-[44px] ${
                  moreMenuOpen
                    ? "text-[#141414] dark:text-white font-semibold bg-black/[0.035] dark:bg-white/[0.05]"
                    : isSecondaryActive
                    ? "text-[#141414] dark:text-white font-semibold"
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
                    className="absolute top-full right-0 mt-2.5 w-52 py-2 rounded-xl bg-[#FFFDF8] dark:bg-[#0c101c] border border-[rgba(28,25,20,0.09)] dark:border-white/[0.10] shadow-[0_12px_36px_rgba(28,25,20,0.08)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.7)] z-50 text-left"
                  >
                    {SECONDARY_LINKS.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToSection(item.id)}
                        className="w-full min-h-[44px] px-4 py-2.5 text-[13px] font-sans font-medium text-[#4E4A43] dark:text-[#A9A7A2] hover:text-[#141414] dark:hover:text-white hover:bg-black/[0.035] dark:hover:bg-white/[0.06] text-left transition-colors flex items-center justify-between whitespace-nowrap touch-manipulation"
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
            {/* Theme Toggle (Tactile control with smooth 90deg rotation and 44px touch area) */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
              className="w-10 h-10 min-h-[44px] min-w-[44px] sm:w-9 sm:h-9 sm:min-h-[36px] sm:min-w-[36px] rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.07] dark:hover:bg-white/[0.12] border border-[rgba(28,25,20,0.08)] dark:border-white/[0.08] flex items-center justify-center text-[#141414] dark:text-zinc-200 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 touch-manipulation"
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

            {/* Primary Compact CTA (High Contrast, Tactile, 42px touch height on tablet) */}
            <button
              onClick={() => scrollToSection("demo")}
              className="group hidden sm:inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3.5 sm:px-4 rounded-xl bg-[#141414] hover:bg-black text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-[#141414] text-xs sm:text-[13px] font-semibold tracking-tight transition-all duration-150 shadow-xs hover:-translate-y-[1px] active:scale-[0.985] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 touch-manipulation"
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
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          background: isDark ? "#BBD8FF" : "#C9E1FF",
                          border: "1px solid rgba(100, 160, 255, 0.35)",
                          boxShadow: "0 0 6px rgba(100, 170, 255, 0.4)",
                        }}
                      />
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
