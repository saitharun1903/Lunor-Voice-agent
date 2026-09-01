"use client";

import React, { memo } from "react";

export const AmbientBackground = memo(function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none transform-gpu"
      style={{ transform: "translate3d(0, 0, 0)" }}
    >
      {/* Top Ambient Glow Orb via Hardware Accelerated Radial Gradient */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full opacity-60 dark:opacity-75 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(99, 102, 241, 0.05) 45%, transparent 70%)",
        }}
      />

      {/* Mid Left Subtle Accent Glow */}
      <div
        className="absolute top-[30%] -left-48 w-[600px] h-[600px] rounded-full opacity-40 dark:opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(6, 182, 212, 0.03) 50%, transparent 70%)",
        }}
      />

      {/* Bottom Right Subtle Accent Glow */}
      <div
        className="absolute bottom-10 -right-48 w-[650px] h-[650px] rounded-full opacity-40 dark:opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.03) 50%, transparent 70%)",
        }}
      />

      {/* Modern Grid Texture Layer */}
      <div className="absolute inset-0 bg-modern-grid opacity-60 pointer-events-none" />
    </div>
  );
});
