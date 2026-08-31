"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useSpring(0, { stiffness: 200, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 200, damping: 25 });

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted || isTouch) return null;

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="fixed top-0 left-0 w-[420px] h-[420px] rounded-full bg-blue-500/[0.04] dark:bg-blue-400/[0.06] blur-[80px] pointer-events-none -z-10 transition-opacity duration-300"
    />
  );
}
