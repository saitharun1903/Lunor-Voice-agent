"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`h-8 w-24 rounded-full bg-black/5 dark:bg-white/10 ${className}`} />
    );
  }

  const options: {
    value: "light" | "dark" | "system";
    icon: React.ComponentType<{ className?: string }>;
    label: string;
  }[] = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Theme selection"
      onMouseLeave={() => setHovered(null)}
      className={`relative inline-flex items-center p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.08] backdrop-blur-md border border-black/[0.06] dark:border-white/[0.1] shadow-inner ${className}`}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isSelected = theme === opt.value;
        const isHovered = hovered === opt.value && !isSelected;

        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            onMouseEnter={() => setHovered(opt.value)}
            aria-label={`Switch to ${opt.label} theme`}
            aria-checked={isSelected}
            role="radio"
            className={`relative z-10 flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium transition-colors duration-200 ${
              isSelected
                ? "text-blue-600 dark:text-blue-400 font-bold"
                : "text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-300"
            }`}
          >
            <motion.div
              animate={{
                scale: isSelected ? 1.08 : 0.92,
                rotate:
                  isSelected && opt.value === "light"
                    ? 20
                    : isSelected && opt.value === "dark"
                    ? -20
                    : 0,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Icon className="w-3.5 h-3.5" />
            </motion.div>

            {/* Active Selected Sliding Pill with Light Blue Accent */}
            {isSelected && (
              <motion.div
                layoutId="theme-active-indicator"
                transition={{
                  type: "spring",
                  stiffness: 480,
                  damping: 34,
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-50 to-indigo-50/90 dark:from-blue-950/80 dark:to-zinc-900 shadow-sm border border-blue-500/30 dark:border-blue-400/40 -z-10"
              />
            )}

            {/* Subtle Hover Indicator Pill */}
            {isHovered && (
              <motion.div
                layoutId="theme-hover-indicator"
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 32,
                }}
                className="absolute inset-0 rounded-full bg-blue-500/[0.06] dark:bg-blue-400/[0.08] -z-20"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
