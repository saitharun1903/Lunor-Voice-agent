"use client";

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { LunorLogo } from "./ui/lunor-logo";

export const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-3 pb-0">
      <div className="max-w-5xl mx-auto">
        <nav
          className={`w-full flex items-center justify-between h-[46px] px-4 rounded-xl transition-all duration-200 ${
            scrolled
              ? "bg-white/90 dark:bg-[#0a0a0e]/90 backdrop-blur-xl border border-black/[0.07] dark:border-white/[0.08] shadow-[0_2px_16px_-4px_rgba(0,0,0,0.12)]"
              : "bg-white/70 dark:bg-[#0a0a0e]/70 backdrop-blur-md border border-black/[0.05] dark:border-white/[0.06]"
          }`}
        >
          {/* Logo */}
          <a
            href="/"
            onClick={scrollToTop}
            className="flex items-center shrink-0"
            aria-label="Lunor Home"
          >
            <LunorLogo size={18} showWordmark={true} />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center">
            {primaryLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="relative px-3 py-1 text-[13px] font-normal text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap group"
              >
                {link.label}
                {/* Hover underline indicator */}
                <span className="absolute bottom-0 left-3 right-3 h-px bg-zinc-900 dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </button>
            ))}

            {/* More Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                aria-expanded={moreOpen}
                className="flex items-center gap-0.5 px-3 py-1 text-[13px] font-normal text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap"
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3 h-3 mt-px transition-transform duration-150 ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 3, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 3, scale: 0.97 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-1.5 w-40 p-1 rounded-xl bg-white dark:bg-[#111115] border border-black/[0.07] dark:border-white/[0.09] shadow-xl z-50"
                  >
                    {secondaryLinks.map((sub) => (
                      <button
                        key={sub.label}
                        onClick={() => scrollToSection(sub.id)}
                        className="w-full text-left px-3 py-2 text-[13px] font-normal text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.06] rounded-lg transition-colors whitespace-nowrap"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* CTA — no icon, tight, maximum contrast */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden sm:flex items-center px-3.5 h-7 rounded-lg text-[12.5px] font-semibold tracking-[-0.01em] whitespace-nowrap transition-all duration-150
                bg-zinc-950 text-white border border-zinc-800 hover:bg-zinc-800
                dark:bg-white dark:text-zinc-950 dark:border-zinc-200 dark:hover:bg-zinc-100
                shadow-[0_1px_3px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)]
                dark:shadow-[0_1px_3px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]
              "
            >
              Talk to Lunor
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden w-7 h-7 rounded-lg flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-black/[0.05] dark:hover:bg-white/[0.07] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.14, ease: "easeOut" }}
              className="md:hidden mt-2 p-3 rounded-xl bg-white/95 dark:bg-[#0f0f13]/95 backdrop-blur-xl border border-black/[0.07] dark:border-white/[0.08] shadow-2xl"
            >
              {/* Primary links */}
              <div className="space-y-0.5">
                {primaryLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="w-full text-left px-3 py-2.5 text-[13px] font-normal text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
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
                    className="w-full text-left px-3 py-2 text-[13px] font-normal text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-3 pt-3 border-t border-black/[0.06] dark:border-white/[0.07]">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full py-2.5 rounded-lg text-[13px] font-semibold text-white bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 transition-colors"
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
