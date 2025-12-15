"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  LookViewerModal,
  LookViewerItem,
  LookViewerState,
} from "@/components/shared/look-viewer-modal";

type Look = LookViewerItem & {
  id: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function LookbookShowcaseCarousel() {
  const looks: Look[] = useMemo(
    () => [
      {
        id: "look-01",
        title: "The Retro Prince",
        eyebrow: "Explore look",
        description:
          "A signature Sam’Alia look—crafted with intention, heritage, and modern elegance.",
        viewerCtaLabel: "Commission this look",
        viewerCtaHref: "/inquiry/retro-prince",
        image: "/images/F1.png",
        gallery: ["/images/F1.png", "/images/F2.png", "/images/F3.png"],
      },
      {
        id: "look-02",
        title: "Adire Print Gown",
        eyebrow: "Explore look",
        description:
          "A modern silhouette, anchored in craft—adire textures, refined detailing, and presence.",
        viewerCtaLabel: "I want this look",
        viewerCtaHref: "/inquiry/adire-print-gown",
        image: "/images/F2.png",
        gallery: ["/images/F2.png", "/images/F1.png", "/images/F3.png"],
      },
      {
        id: "look-03",
        title: "African Top Shirt",
        eyebrow: "Explore look",
        description:
          "A tailored statement piece—clean structure, elevated fabric language, timeless wearability.",
        viewerCtaLabel: "Commission this look",
        viewerCtaHref: "/inquiry/african-top-shirt",
        image: "/images/F3.png",
        gallery: ["/images/F3.png", "/images/F2.png", "/images/F1.png"],
      },
      {
        id: "look-04",
        title: "Lookbook 04",
        eyebrow: "Explore look",
        description: "Editorial energy—heritage textures with a modern edge.",
        viewerCtaLabel: "Commission this look",
        viewerCtaHref: "/inquiry/retro-prince",
        image: "/images/LB2.png",
        gallery: ["/images/LB2.png", "/images/LB3.png", "/images/F1.png"],
      },
      {
        id: "look-05",
        title: "Lookbook 05",
        eyebrow: "Explore look",
        description: "Quiet luxury in motion—minimal, sharp, intentional.",
        viewerCtaLabel: "I want this look",
        viewerCtaHref: "/inquiry/adire-print-gown",
        image: "/images/LB3.png",
        gallery: ["/images/LB3.png", "/images/LB2.png", "/images/F2.png"],
      },
    ],
    []
  );

  const railRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [viewer, setViewer] = useState<LookViewerState<Look>>({
    open: false,
    item: null,
    activeShot: null,
  });

  const openViewer = useCallback((item: Look) => {
    setViewer({ open: true, item, activeShot: item.image });
  }, []);

  const closeViewer = useCallback(() => {
    setViewer({ open: false, item: null, activeShot: null });
  }, []);

  const selectShot = useCallback((src: string) => {
    setViewer((prev) => ({ ...prev, activeShot: src }));
  }, []);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const rail = railRef.current;
      const el = cardRefs.current[index];
      if (!rail || !el) return;

      const railRect = rail.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      const railCenter = railRect.left + railRect.width / 2;
      const elCenter = elRect.left + elRect.width / 2;

      const delta = elCenter - railCenter;

      rail.scrollTo({ left: rail.scrollLeft + delta, behavior });

      // make arrows feel immediate
      setActiveIndex(index);
    },
    []
  );

  const prev = useCallback(() => {
    scrollToIndex(clamp(activeIndex - 1, 0, looks.length - 1));
  }, [activeIndex, looks.length, scrollToIndex]);

  const next = useCallback(() => {
    scrollToIndex(clamp(activeIndex + 1, 0, looks.length - 1));
  }, [activeIndex, looks.length, scrollToIndex]);

  // Keyboard support (desktop)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (viewer.open) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev, viewer.open]);

  // IntersectionObserver active index (when swiping)
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const els = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        let bestIdx = activeIndex;
        let bestRatio = 0;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = Number((entry.target as HTMLElement).dataset.index ?? 0);
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIdx = idx;
          }
        }

        if (bestRatio >= 0.55) setActiveIndex(bestIdx);
      },
      { root: rail, threshold: [0.25, 0.4, 0.55, 0.7, 0.85] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [looks.length]);

  // Coverflow transforms
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const tick = () => {
      const railRect = rail.getBoundingClientRect();
      const centerX = railRect.left + railRect.width / 2;

      for (const el of cardRefs.current) {
        if (!el) continue;

        const r = el.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;

        const dx = (cardCenter - centerX) / railRect.width;
        const adx = Math.abs(dx);
        const t = clamp(dx * 2.2, -1, 1);

        const scale = 1 - Math.min(adx, 0.6) * 0.26;
        const rotateY = t * -26;
        const translateY = Math.min(adx, 0.7) * 22;
        const opacity = 1 - Math.min(adx, 0.9) * 0.55;

        el.style.transform = `translateZ(0) perspective(1200px) rotateY(${rotateY}deg) translateY(${translateY}px) scale(${scale})`;
        el.style.opacity = String(opacity);

        const blur = Math.min(adx, 0.9) * 1.1;
        el.style.filter = `blur(${blur}px)`;
      }

      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(tick);
    };

    tick();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", tick);

    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", tick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Center on mount
  useEffect(() => {
    const t = window.setTimeout(() => scrollToIndex(0, "auto"), 40);
    return () => window.clearTimeout(t);
  }, [scrollToIndex]);

  const activeLook = looks[activeIndex] ?? looks[0];

  return (
    <>
      <div className="relative h-full w-full overflow-hidden">
        {/* Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLook?.id ?? "bg"}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {activeLook?.image && (
              <Image
                src={activeLook.image}
                alt=""
                fill
                priority={activeIndex === 0}
                className="object-cover scale-[1.08] blur-3xl opacity-[0.28]"
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.92),transparent_35%,rgba(0,0,0,0.92))]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.70))]" />
          </motion.div>
        </AnimatePresence>

        {/* Rail */}
        <div className="relative h-full w-full">
          <div
            ref={railRef}
            className="
              absolute inset-0
              flex items-center
              overflow-x-auto scroll-smooth
              snap-x snap-mandatory
              no-scrollbar
              px-[8vw] sm:px-[12vw] lg:px-[14vw]
            "
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex items-center gap-5 sm:gap-8 lg:gap-10">
              {looks.map((look, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={look.id}
                    data-index={idx}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className="group relative snap-center will-change-transform"
                    style={{
                      width: "clamp(280px, 86vw, 520px)",
                      height: "clamp(360px, 62vh, 780px)",
                    }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() =>
                      setHoveredIndex((p) => (p === idx ? null : p))
                    }
                  >
                    <div
                      className="
                        relative h-full w-full overflow-hidden rounded-2xl
                        border border-white/12 bg-black/30
                        shadow-[0_22px_90px_rgba(0,0,0,0.65)]
                      "
                    >
                      <Image
                        src={look.image}
                        alt={look.title}
                        fill
                        quality={95}
                        sizes="(max-width: 768px) 86vw, (max-width: 1024px) 56vw, 520px"
                        className="object-cover"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.06),rgba(0,0,0,0.62))]" />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />

                      <div className="pointer-events-none absolute left-5 top-5 text-[10px] uppercase tracking-[0.28em] text-white/70">
                        Lookbook
                      </div>

                      {/* Bottom layout: mobile stack / desktop hover reveal */}
                      <div className="absolute bottom-5 left-5 right-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                          <div className="min-w-0">
                            <div className="text-[11px] uppercase tracking-[0.24em] text-white/65">
                              {look.eyebrow ?? "Explore look"}
                            </div>
                            <div className="mt-2 font-heading text-xl text-white">
                              {look.title}
                            </div>
                          </div>

                          <div
                            className={[
                              "pointer-events-auto",
                              "opacity-100",
                              "sm:opacity-0 sm:transition-opacity sm:duration-200",
                              hoveredIndex === idx || isActive
                                ? "sm:opacity-100"
                                : "",
                            ].join(" ")}
                          >
                            <button
                              type="button"
                              onClick={() => openViewer(look)}
                              className="
                                inline-flex w-full sm:w-auto items-center justify-center gap-3
                                border border-white bg-white
                                px-5 py-2 text-[11px] font-medium uppercase tracking-[0.22em]
                                text-neutral-900 transition hover:bg-transparent hover:text-white
                              "
                              aria-label={`Explore ${look.title}`}
                            >
                              Explore look <span className="text-xs">→</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            disabled={activeIndex === 0}
            aria-label="Previous look"
            className="
              absolute left-4 sm:left-8 top-1/2 z-20 -translate-y-1/2
              flex h-11 w-11 items-center justify-center rounded-full
              border border-white/15 bg-white/10 text-white
              backdrop-blur-md transition hover:bg-white/15
              disabled:opacity-40
            "
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={next}
            disabled={activeIndex === looks.length - 1}
            aria-label="Next look"
            className="
              absolute right-4 sm:right-8 top-1/2 z-20 -translate-y-1/2
              flex h-11 w-11 items-center justify-center rounded-full
              border border-white/15 bg-white/10 text-white
              backdrop-blur-md transition hover:bg-white/15
              disabled:opacity-40
            "
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-md">
              {looks.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to look ${i + 1}`}
                  className={[
                    "h-2 w-2 rounded-full transition-all",
                    i === activeIndex
                      ? "bg-white"
                      : "bg-white/30 hover:bg-white/55",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <LookViewerModal
        state={viewer}
        onClose={closeViewer}
        onSelectShot={selectShot}
        zIndexClass="z-[70]"
      />
    </>
  );
}
