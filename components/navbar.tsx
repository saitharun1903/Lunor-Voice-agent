"use client";

import React, { useState, useEffect, memo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export const Navbar = memo(function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const navLinks = [
    { label: "Live Demo", id: "demo" },
    { label: "Capabilities", id: "use-cases" },
    { label: "Industries", id: "industries" },
    { label: "Work", id: "work" },
    { label: "Process", id: "process" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2.5 bg-[#06080e]/85 dark:bg-[#06080e]/85 backdrop-blur-md border-b border-white/[0.08]"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Mark */}
          <Link
            href="/"
            aria-label="VoiceOps Home"
            className="flex items-center gap-2 group outline-none"
          >
            {/* Minimal Acoustic Mark */}
            <div className="w-5 h-5 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12V12.01M8 8V16M12 4V20M16 8V16M20 12V12.01"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="text-blue-500 group-hover:text-blue-400 transition-colors"
                />
              </svg>
            </div>
            <span className="font-sans font-bold text-sm tracking-tight uppercase text-white">
              VOICEOPS
            </span>
          </Link>

          {/* Quiet Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-sans text-[13px] font-normal text-zinc-400 hover:text-white transition-colors duration-150 outline-none"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Stack */}
          <div className="flex items-center gap-3">
            {/* Minimal Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Compact CTA */}
            <button
              onClick={() => scrollToSection("demo")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all duration-150 shadow-xs active:scale-[0.98]"
            >
              <span>Talk to VoiceOps</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="md:hidden w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Editorial Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#06080e] text-white flex flex-col justify-between p-7 sm:p-10"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-sm tracking-tight uppercase text-white">
                VOICEOPS
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 rounded-full bg-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Editorial Nav Index */}
            <div className="space-y-6 my-auto">
              <span className="type-editorial-eyebrow text-zinc-500 block">
                INDEX
              </span>
              <div className="space-y-4">
                {navLinks.map((link, idx) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="flex items-baseline justify-between w-full text-left group"
                  >
                    <span className="font-serif text-3xl sm:text-4xl text-zinc-300 group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                    <span className="font-mono text-xs text-zinc-600 group-hover:text-blue-400 transition-colors">
                      0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/[0.08] space-y-4">
              <button
                onClick={() => scrollToSection("demo")}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium text-sm flex items-center justify-center gap-2"
              >
                <span>Talk to VoiceOps Live</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>voiceops.in</span>
                <span>Sub-400ms Voice Automation</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
