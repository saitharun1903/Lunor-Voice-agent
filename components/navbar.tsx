"use client";

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { LunorLogo } from "./ui/lunor-logo";

export const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Framer Motion smooth scroll tracking for Apple-style glossy sheen movement
  const { scrollY, scrollYProgress } = useScroll();
  
  // Smooth spring physics for liquid gloss movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Glossy light blue reflection moves horizontally across the navbar as page scrolls
  const sheenTranslateX = useTransform(smoothProgress, [0, 1], ["-120%", "120%"]);
  
  // Subtle top-edge light beam position
  const borderBeamX = useTransform(smoothProgress, [0, 1], ["-100%", "200%"]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setScrolled(latest > 15);
    });
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMoreOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setMoreOpen(false);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - 68;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }, []);

  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setMoreOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const primaryLinks = [
    { label: "Live Demo", id: "demo" },
    { label: "Capabilities", id: "use-cases" },
    { label: "Industries", id: "industries" },
    { label: "Work", id: "work" },
    { label: "Process", id: "process" },
  ];

  const secondaryLinks = [
    { label: "Architecture", id: "architecture" },
    { label: "Case Studies", id: "work" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 pb-0 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <nav
          className={`relative w-full flex items-center justify-between h-[48px] px-4 rounded-2xl overflow-hidden transition-all duration-300 ${
            scrolled
              ? "bg-white/85 dark:bg-[#0c0d12]/85 backdrop-blur-2xl border border-blue-500/20 dark:border-blue-400/20 shadow-[0_8px_30px_-4px_rgba(59,130,246,0.12),0_2px_10px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_-4px_rgba(37,99,235,0.25),0_0_1px_1px_rgba(255,255,255,0.08)]"
              : "bg-white/70 dark:bg-[#0c0d12]/70 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm"
          }`}
        >
          {/* 1. Dynamic Moving Light-Blue Glossy Liquid Sheen across the navbar */}
          <motion.div
            style={{ x: sheenTranslateX }}
            className="absolute inset-y-0 w-3/4 pointer-events-none -skew-x-12 opacity-80 dark:opacity-60 bg-gradient-to-r from-transparent via-blue-400/[0.18] to-transparent blur-md will-change-transform"
          />

          {/* 2. Top-Edge Ambient Blue Specular Light Beam */}
          <motion.div
            style={{ x: borderBeamX }}
            className="absolute top-0 left-0 w-1/3 h-[1.5px] pointer-events-none bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-90 will-change-transform"
          />

          {/* 3. Brand Logo */}
          <a
            href="/"
            onClick={scrollToTop}
            className="relative z-10 flex items-center shrink-0 group"
            aria-label="Lunor Home"
          >
            <LunorLogo size={18} showWordmark={true} />
          </a>

          {/* 4. Desktop Navigation Links */}
          <div className="relative z-10 hidden md:flex items-center gap-0.5">
            {primaryLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="relative px-3 py-1 text-[13px] font-normal text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 whitespace-nowrap group"
              >
                {link.label}
                {/* Subtle underline indicator on hover */}
                <span className="absolute bottom-0 left-3 right-3 h-px bg-blue-600 dark:bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </button>
            ))}

            {/* More Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                aria-expanded={moreOpen}
                className="flex items-center gap-0.5 px-3 py-1 text-[13px] font-normal text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 whitespace-nowrap"
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3 h-3 mt-px transition-transform duration-150 ${
                    moreOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.14, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 w-44 p-1.5 rounded-2xl bg-white/95 dark:bg-[#111218]/95 backdrop-blur-2xl border border-blue-500/20 dark:border-white/[0.1] shadow-2xl z-50 space-y-0.5"
                  >
                    {secondaryLinks.map((sub) => (
                      <button
                        key={sub.label}
                        onClick={() => scrollToSection(sub.id)}
                        className="w-full text-left px-3 py-2 text-[13px] font-normal text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 rounded-xl transition-colors whitespace-nowrap"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 5. Right Controls: Theme Toggle & Solid CTA */}
          <div className="relative z-10 flex items-center gap-2">
            <ThemeToggle />

            {/* Compact High-Contrast CTA */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden sm:flex items-center px-3.5 h-[30px] rounded-xl text-[12.5px] font-semibold tracking-[-0.01em] whitespace-nowrap transition-all duration-150
                bg-zinc-950 text-white hover:bg-blue-600
                dark:bg-white dark:text-zinc-950 dark:hover:bg-blue-500 dark:hover:text-white
                shadow-[0_1px_3px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.15)]
                active:scale-[0.98]
              "
            >
              Talk to Lunor
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-black/[0.05] dark:hover:bg-white/[0.07] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="md:hidden mt-2 p-3.5 rounded-2xl bg-white/95 dark:bg-[#0f1016]/95 backdrop-blur-2xl border border-blue-500/20 dark:border-white/[0.1] shadow-2xl"
            >
              {/* Primary links */}
              <div className="space-y-0.5">
                {primaryLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="w-full text-left px-3.5 py-2.5 text-[13px] font-normal text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.04] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Secondary links */}
              <div className="mt-2 pt-2 border-t border-black/[0.06] dark:border-white/[0.07] space-y-0.5">
                {secondaryLinks.map((sub) => (
                  <button
                    key={sub.label}
                    onClick={() => scrollToSection(sub.id)}
                    className="w-full text-left px-3.5 py-2 text-[13px] font-normal text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.04] transition-colors"
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-3 pt-3 border-t border-black/[0.06] dark:border-white/[0.07]">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full py-2.5 rounded-xl text-[13px] font-semibold text-white bg-zinc-950 hover:bg-blue-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-blue-500 dark:hover:text-white transition-colors shadow-sm"
                >
                  Talk to Lunor
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
});
