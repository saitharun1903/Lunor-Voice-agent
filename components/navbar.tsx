"use client";

import React, { useState, useEffect, memo, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "./theme-provider";

export const Navbar = memo(function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 28, restDelta: 0.001 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("demo");
  const moreRef = useRef<HTMLDivElement>(null);

  // Scroll direction and elevation logic
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);

      if (currentY > 60) {
        if (currentY > lastY && currentY - lastY > 5) {
          setScrollDirection("down");
          setMoreMenuOpen(false);
        } else if (currentY < lastY && lastY - currentY > 5) {
          setScrollDirection("up");
        }
      } else {
        setScrollDirection("up");
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Section observer to update active indicator
  useEffect(() => {
    const sections = ["demo", "use-cases", "workflow", "industries", "work", "process", "faq", "contact"];
    const observers = sections.map((id) => {
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
        { threshold: 0.25 }
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
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const primaryNavLinks = [
    { label: "Live Demo", id: "demo" },
    { label: "Capabilities", id: "use-cases" },
    { label: "Industries", id: "industries" },
    { label: "Work", id: "work" },
    { label: "Process", id: "process" },
  ];

  const secondaryNavLinks = [
    { label: "Architecture", id: "workflow" },
    { label: "System Blueprint", id: "about" },
    { label: "Case Studies", id: "work" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  const isCompressed = isScrolled && scrollDirection === "down";

  return (
    <>
      <header
        className={`fixed top-3 sm:top-4 left-0 right-0 z-50 px-4 sm:px-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCompressed ? "-translate-y-2 opacity-90" : "translate-y-0 opacity-100"
        }`}
      >
        <div
          className={`max-w-5xl mx-auto h-14 sm:h-[54px] px-4 sm:px-6 rounded-2xl flex items-center justify-between transition-all duration-300 ${
            isScrolled
              ? "bg-[#FAF8F2]/95 dark:bg-[#080a11]/95 backdrop-blur-md border border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] shadow-md dark:shadow-2xl"
              : "bg-[#FAF8F2]/80 dark:bg-[#080a11]/80 backdrop-blur-sm border border-[rgba(36,33,26,0.05)] dark:border-white/[0.06]"
          }`}
        >
          {/* Brand Mark with VoiceOps Signal Wave (High Contrast in both Light & Dark) */}
          <Link
            href="/"
            aria-label="VoiceOps Home"
            className="flex items-center gap-2.5 group outline-none"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12V12.01M8 8V16M12 4V20M16 8V16M20 12V12.01"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform"
                />
              </svg>
            </div>
            <span className="font-sans font-bold text-[13px] tracking-tight uppercase text-zinc-950 dark:text-white transition-opacity group-hover:opacity-80">
              VOICEOPS
            </span>
          </Link>

          {/* Desktop Navigation (Deep Graphite in Light Mode, Warm White in Dark Mode) */}
          <nav className="hidden md:flex items-center gap-6">
            {primaryNavLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative font-sans text-[13px] font-medium transition-colors duration-150 outline-none py-1 ${
                    isActive
                      ? "text-zinc-950 dark:text-white font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* "More" Secondary Navigation Popover */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreMenuOpen((prev) => !prev)}
                className={`flex items-center gap-1 font-sans text-[13px] font-medium transition-colors outline-none py-1 ${
                  moreMenuOpen
                    ? "text-zinc-950 dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
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
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full right-0 mt-3 w-48 py-2 rounded-xl bg-[#FAF8F2] dark:bg-[#0f1320] border border-[rgba(36,33,26,0.09)] dark:border-white/[0.09] shadow-xl z-50 text-left"
                  >
                    {secondaryNavLinks.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToSection(item.id)}
                        className="w-full px-4 py-2 text-[12px] font-sans font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-left transition-colors flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Controls: Theme Toggle + Compact Solid Matte CTA */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle (High Contrast) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="w-8 h-8 rounded-lg bg-black/[0.05] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Compact Primary CTA (Solid Matte, High Contrast) */}
            <button
              onClick={() => scrollToSection("demo")}
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 text-xs font-semibold tracking-tight transition-all duration-150 shadow-xs hover:-translate-y-0.5 active:translate-y-0.5"
            >
              <span>Talk to VoiceOps</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="md:hidden w-8 h-8 rounded-lg bg-black/[0.05] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reading Progress Indicator Line on Scroll */}
        {isScrolled && (
          <motion.div
            className="max-w-5xl mx-auto h-[1.5px] bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 origin-left pointer-events-none rounded-full"
            style={{ scaleX: smoothProgress }}
          />
        )}
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden flex justify-end"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-[82%] max-w-sm h-full bg-[#F5F1E8] dark:bg-[#090c14] border-l border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] p-6 flex flex-col justify-between shadow-2xl text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-black/[0.06] dark:border-white/[0.08]">
                <span className="font-sans font-bold text-sm tracking-tight uppercase text-zinc-950 dark:text-white">
                  VOICEOPS
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center text-zinc-600 dark:text-zinc-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Links */}
              <div className="space-y-1 py-4 my-auto overflow-y-auto">
                {[...primaryNavLinks, ...secondaryNavLinks].map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(link.id)}
                    className="w-full px-3 py-2.5 rounded-lg text-left font-sans text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] space-y-3">
                <button
                  onClick={() => scrollToSection("demo")}
                  className="w-full py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-sans text-xs font-semibold tracking-tight shadow-md flex items-center justify-center"
                >
                  Talk to VoiceOps
                </button>
                <div className="text-center">
                  <span className="text-[11px] font-mono text-zinc-500">
                    voiceops.in · AI Voice Automation
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
