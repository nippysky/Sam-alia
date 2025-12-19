"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type RevealVariant =
  | "fade-up"
  | "fade"
  | "slide-left"
  | "slide-right"
  | "zoom";

// Keep it simple + robust: only HTML tags (no custom components needed here)
type AsTag = keyof React.JSX.IntrinsicElements;

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: AsTag;
  variant?: RevealVariant;
  delayMs?: number;
  durationMs?: number;
  once?: boolean; // if false, re-animates when leaving/entering viewport
  threshold?: number;
  rootMargin?: string;
};

export function ScrollReveal({
  children,
  className = "",
  as = "div",
  variant = "fade-up",
  delayMs = 0,
  durationMs = 720,
  once = false,
  threshold = 0.18,
  rootMargin = "0px 0px -10% 0px",
}: ScrollRevealProps) {
  const elRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  const variantClass = useMemo(() => {
    switch (variant) {
      case "fade":
        return "reveal reveal-fade";
      case "slide-left":
        return "reveal reveal-slide-left";
      case "slide-right":
        return "reveal reveal-slide-right";
      case "zoom":
        return "reveal reveal-zoom";
      case "fade-up":
      default:
        return "reveal reveal-fade-up";
    }
  }, [variant]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setInView(true);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once, rootMargin, threshold]);

  // Render tag safely
  const Tag = as as any;

  return (
    <Tag
      ref={elRef as any}
      data-reveal={inView ? "in" : "hidden"}
      className={`${variantClass} ${className}`.trim()}
      style={
        {
          // CSS vars consumed by global.css
          ["--reveal-delay" as any]: `${delayMs}ms`,
          ["--reveal-duration" as any]: `${durationMs}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
