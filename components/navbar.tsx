"use client";

import React, { useState, useEffect, memo, useCallback } from "react";
import Link from "next/link";
import { PhoneCall, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { LunorLogo } from "./ui/lunor-logo";

export const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const scrollToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 75;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const navLinks = [
    { label: "Live Demo", id: "demo" },
    { label: "Capabilities", id: "use-cases" },
    { label: "Architecture", id: "architecture" },
    { label: "Industries", id: "industries" },
    { label: "Methodology", id: "process" },
    { label: "Case Studies", id: "work" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-200 py-2.5 sm:py-3 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <nav
          className={`flex items-center justify-between px-4 sm:px-5 py-2 rounded-full transition-all duration-200 ${
            scrolled
              ? "glass-surface shadow-md border border-black/[0.06] dark:border-white/[0.08]"
              : "bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm border border-black/[0.03] dark:border-white/[0.05]"
          }`}
        >
          {/* 1. Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label="Lunor Home"
          >
            <LunorLogo size={22} showWordmark={true} />
          </Link>

          {/* 2. Desktop Editorial Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="hover:text-zinc-950 dark:hover:text-white transition-colors py-1"
              >
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          {/* 3. Action Buttons */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => scrollToSection("demo")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium btn-solid-primary"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Talk to Lunor</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden w-7 h-7 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className="lg:hidden mt-2 p-4 rounded-2xl glass-surface border border-black/[0.06] dark:border-white/[0.08] shadow-xl max-w-sm mx-auto space-y-2.5"
          >
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left px-3 py-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.05] flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </button>
              ))}
              <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.06]">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full text-left px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400"
                >
                  Build My Voice Agent →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});
