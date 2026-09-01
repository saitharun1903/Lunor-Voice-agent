"use client";

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { PhoneCall, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LunorLogo } from "./ui/lunor-logo";

export const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("work");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const isScrolled = window.scrollY > 20;
        setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const sectionIds = ["work", "use-cases", "industries", "process", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { label: "Work", href: "#work", id: "work" },
    { label: "Capabilities", href: "#use-cases", id: "use-cases" },
    { label: "Industries", href: "#industries", id: "industries" },
    { label: "How It Works", href: "#process", id: "process" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const scrollToDemo = useCallback(() => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/85 dark:bg-black/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08] shadow-sm"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Distinctive LUNOR Brand Mark & Wordmark */}
          <Link href="/" className="group" aria-label="Lunor Home">
            <LunorLogo size={32} showWordmark={true} />
          </Link>

          {/* Desktop Navigation Links with Sliding Pill Indicator */}
          <nav
            onMouseLeave={() => setHoveredNav(null)}
            className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-black/[0.035] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.08] backdrop-blur-md relative"
          >
            {navLinks.map((link) => {
              const isHovered = hoveredNav === link.id;
              const isActive = (hoveredNav === null && activeSection === link.id) || isHovered;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredNav(link.id)}
                  onClick={() => setActiveSection(link.id)}
                  className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-150 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 font-bold"
                      : "text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-300"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>

                  {/* Sliding Indicator Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-sliding-pill"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                      className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-50 to-indigo-50/90 dark:from-blue-950/80 dark:to-blue-900/60 shadow-sm border border-blue-500/25 dark:border-blue-400/35 -z-0"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={scrollToDemo}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold glass-button-primary shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Talk to Lunor</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-zinc-800 dark:text-zinc-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-[64px] z-30 p-5 lg:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.1] shadow-2xl"
          >
            <div className="flex flex-col gap-2.5 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:bg-white/[0.06] dark:hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToDemo();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold glass-button-primary shadow-lg"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Talk to Lunor</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
