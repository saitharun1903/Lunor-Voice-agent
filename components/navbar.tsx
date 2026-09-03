"use client";

import React, { useState, useEffect, memo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export const Navbar = memo(function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 28, restDelta: 0.001 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("demo");

  // Scroll direction and compression logic
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);

      if (currentY > 80) {
        if (currentY > lastY && currentY - lastY > 4) {
          setScrollDirection("down");
        } else if (currentY < lastY && lastY - currentY > 4) {
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
        { threshold: 0.3 }
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const navLinks = [
    { label: "Live Demo", id: "demo" },
    { label: "Capabilities", id: "use-cases" },
    { label: "Workflow", id: "workflow" },
    { label: "Industries", id: "industries" },
    { label: "Work", id: "work" },
    { label: "Process", id: "process" },
  ];

  const isCompressed = isScrolled && scrollDirection === "down";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCompressed
            ? "-translate-y-2 py-2 opacity-85"
            : "translate-y-0 py-3 sm:py-3.5 opacity-100"
        } ${
          isScrolled
            ? scrollDirection === "up"
              ? "bg-[#06080e]/95 dark:bg-[#06080e]/95 backdrop-blur-md border-b border-white/[0.08] shadow-md"
              : "bg-[#06080e]/90 dark:bg-[#06080e]/90 backdrop-blur-sm border-b border-white/[0.05]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Subtle Reading Progress Indicator Line on Scroll */}
        {isScrolled && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-600/40 via-blue-500 to-blue-400/40 origin-left pointer-events-none"
            style={{ scaleX: smoothProgress }}
          />
        )}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Mark with VoiceOps Signal Wave */}
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
                  className="text-blue-500 group-hover:text-blue-400 transition-colors"
                />
              </svg>
            </div>
            <span className="font-sans font-bold text-[13px] sm:text-sm tracking-tight uppercase text-white transition-opacity group-hover:opacity-85">
              VOICEOPS
            </span>
          </Link>

          {/* Quiet Desktop Navigation with Gliding Active Signal */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative font-sans text-[13px] font-normal text-zinc-400 hover:text-white transition-colors duration-200 outline-none py-1"
                >
                  <span className={isActive ? "text-white font-medium" : ""}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavSignal"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-blue-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Stack with Matte Controls */}
          <div className="flex items-center gap-3">
            {/* Minimal Matte Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-zinc-300 hover:text-white transition-all shadow-xs"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Compact CTA */}
            <button
              onClick={() => scrollToSection("demo")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all duration-200 shadow-xs hover:-translate-y-0.5 active:translate-y-0.5"
            >
              <span>Talk to VoiceOps</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="md:hidden w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
            >
              <Menu className="w-4 h-4" />
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

            {/* Editorial Nav Index with Staggered Entrance */}
            <div className="space-y-6 my-auto">
              <span className="type-editorial-eyebrow text-zinc-500 block">
                INDEX
              </span>
              <div className="space-y-4">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    onClick={() => scrollToSection(link.id)}
                    className="flex items-baseline justify-between w-full text-left group"
                  >
                    <span className="font-serif text-3xl sm:text-4xl text-zinc-300 group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                    <span className="font-mono text-xs text-zinc-600 group-hover:text-blue-400 transition-colors">
                      0{idx + 1}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/[0.08] space-y-4">
              <button
                onClick={() => scrollToSection("demo")}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors"
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
