"use client";

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import Link from "next/link";
import { PhoneCall, Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { LunorLogo } from "./ui/lunor-logo";

export const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Lightweight scroll listener with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside and Escape key listeners for More dropdown
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

  // Smooth anchor scrolling with 70px header offset
  const scrollToSection = useCallback((id: string) => {
    setMoreOpen(false);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setMoreOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Two-Tier Navigation IA
  const primaryLinks = [
    { label: "Live Demo", id: "demo" },
    { label: "Capabilities", id: "use-cases" },
    { label: "Industries", id: "industries" },
    { label: "Work", id: "work" },
    { label: "Process", id: "process" },
  ];

  const secondaryLinks = [
    { label: "Architecture", id: "architecture" },
    { label: "Methodology", id: "process" },
    { label: "Case Studies", id: "work" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-150 py-2 sm:py-2.5 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex justify-center">
        <nav
          className={`w-full flex items-center justify-between px-3.5 sm:px-4 py-1.5 rounded-2xl transition-all duration-150 ${
            scrolled
              ? "glass-surface shadow-md border border-black/[0.06] dark:border-white/[0.08]"
              : "bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md border border-black/[0.03] dark:border-white/[0.05]"
          }`}
        >
          {/* 1. Brand Logo (Clicking smoothly scrolls to top) */}
          <a
            href="/"
            onClick={scrollToTop}
            className="flex items-center gap-2 group shrink-0"
            aria-label="Lunor Home"
          >
            <div className="transition-transform duration-150 group-hover:scale-105">
              <LunorLogo size={20} showWordmark={true} />
            </div>
          </a>

          {/* 2. Desktop Primary Navigation Links with Zero-Wrapping */}
          <div className="hidden md:flex items-center gap-1 text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
            {primaryLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-2.5 py-1 rounded-lg whitespace-nowrap hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all"
              >
                <span>{link.label}</span>
              </button>
            ))}

            {/* Polished "More" Dropdown Menu */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                aria-expanded={moreOpen}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg whitespace-nowrap transition-all ${
                  moreOpen
                    ? "text-zinc-950 dark:text-white bg-black/[0.04] dark:bg-white/[0.06]"
                    : "hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    moreOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : "text-zinc-400"
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-44 p-1.5 rounded-2xl glass-surface border border-black/[0.06] dark:border-white/[0.08] shadow-xl z-50 space-y-0.5"
                  >
                    {secondaryLinks.map((subLink) => (
                      <button
                        key={subLink.label}
                        onClick={() => scrollToSection(subLink.id)}
                        className="w-full text-left px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.06] rounded-xl flex items-center justify-between whitespace-nowrap transition-colors"
                      >
                        <span>{subLink.label}</span>
                        <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 3. Right Control Deck */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => scrollToSection("demo")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap btn-solid-primary shadow-sm"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Talk to Lunor</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Dedicated Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className="md:hidden mt-2 p-4 rounded-2xl glass-surface border border-black/[0.06] dark:border-white/[0.08] shadow-2xl max-w-sm mx-auto space-y-3"
          >
            {/* Primary Section */}
            <div className="space-y-1">
              <span className="type-eyebrow text-zinc-400 px-3 block">Navigation</span>
              {primaryLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.04] flex items-center justify-between transition-colors whitespace-nowrap"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </button>
              ))}
            </div>

            {/* Secondary Section */}
            <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.05] space-y-1">
              <span className="type-eyebrow text-zinc-400 px-3 block">Explore</span>
              {secondaryLinks.map((subLink) => (
                <button
                  key={subLink.label}
                  onClick={() => scrollToSection(subLink.id)}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.04] flex items-center justify-between transition-colors whitespace-nowrap"
                >
                  <span>{subLink.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </button>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.05]">
              <button
                onClick={() => scrollToSection("demo")}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold btn-solid-primary shadow-sm whitespace-nowrap"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Talk to Lunor</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});
