"use client";

import React, { useEffect, useRef, useState, memo } from "react";

export const CursorGlow = memo(function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
    };

    const animate = () => {
      if (!glowRef.current) return;
      if (document.visibilityState === "hidden") {
        rafId.current = requestAnimationFrame(animate);
        return;
      }

      // Smooth lerp (linear interpolation) at 60fps
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.12;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.12;

      glowRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!mounted || isTouch) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle, rgba(59, 130, 246, 0.07) 0%, rgba(37, 99, 235, 0.02) 45%, transparent 70%)",
        willChange: "transform",
      }}
      className="fixed top-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none -z-10"
    />
  );
});
