import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"SF Mono"',
          "ui-monospace",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      colors: {
        luno: {
          50: "#f5f7ff",
          100: "#ebf0fe",
          200: "#d6e0fd",
          300: "#b4c8fb",
          400: "#8ba7f7",
          500: "#5c7ff2",
          600: "#3b5de6",
          700: "#2945d0",
          800: "#1e33a8",
          900: "#1b2d84",
          accent: "#2563eb",
          accentDark: "#3b82f6",
        },
      },
      boxShadow: {
        "apple-subtle": "0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
        "apple-card": "0 8px 30px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.03)",
        "apple-card-dark": "0 10px 40px -10px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.1)",
        "apple-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.06)",
        "apple-hover-dark": "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.15)",
        "glass-inner": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)",
        "glass-inner-dark": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)",
        "orb-glow": "0 0 80px 20px rgba(59, 130, 246, 0.35)",
        "glow-subtle": "0 0 30px rgba(37, 99, 235, 0.15)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "wave-bar": "wave 1.2s ease-in-out infinite alternate",
        "glow-breathe": "breathe 5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "shimmer-sweep": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        wave: {
          "0%": { transform: "scaleY(0.2)" },
          "100%": { transform: "scaleY(1.0)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.96)" },
          "50%": { opacity: "0.85", transform: "scale(1.04)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
