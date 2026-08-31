"use client";

import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* Top Ambient Glow Orb */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-blue-500/10 via-indigo-400/5 to-transparent blur-[140px] rounded-full dark:from-blue-600/15 dark:via-blue-900/10" />

      {/* Mid Left Subtle Accent Glow */}
      <div className="absolute top-[30%] -left-48 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 via-cyan-400/5 to-transparent blur-[150px] rounded-full dark:from-blue-500/10" />

      {/* Bottom Right Subtle Accent Glow */}
      <div className="absolute bottom-10 -right-48 w-[650px] h-[650px] bg-gradient-to-l from-indigo-400/5 via-purple-400/5 to-transparent blur-[150px] rounded-full dark:from-indigo-500/10" />

      {/* Modern Grid Texture Layer */}
      <div className="absolute inset-0 bg-modern-grid opacity-70" />
    </div>
  );
}
