"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { PhoneCall, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("work");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section on scroll
      const sections = ["work", "use-cases", "industries", "integrations", "faq", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "#work", id: "work" },
    { label: "Capabilities", href: "#use-cases", id: "use-cases" },
    { label: "Industries", href: "#industries", id: "industries" },
    { label: "Integrations", href: "#integrations", id: "integrations" },
    { label: "Process", href: "#process", id: "process" },
    { label: "FAQ", href: "#faq", id: "faq" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/85 dark:bg-black/80 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/[0.08] shadow-sm"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
              L
            </div>
            <span className="font-extrabold text-lg tracking-tight text-zinc-950 dark:text-white">
              LUNO
            </span>
          </Link>

          {/* Desktop Navigation Links with Light Blue Sliding Pill Animation */}
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
                  className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 font-bold"
                      : "text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-300"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>

                  {/* Sliding Indicator Pill with Light Blue Material */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-sliding-pill"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 32,
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
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>Talk to Luno</span>
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
            className="fixed inset-x-0 top-[64px] z-30 p-5 lg:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.1] shadow-2xl"
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
                  <span>Talk to Luno</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
