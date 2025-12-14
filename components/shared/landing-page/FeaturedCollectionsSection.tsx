// components/shared/landing-page/FeaturedCollectionsSection.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type FeaturedItem = {
  id: number;
  title: string;

  // carousel
  ctaLabel: string;

  // viewer modal CTA (EDIT THESE PER LOOK)
  viewerCtaLabel: string;
  viewerCtaHref: string;

  image: string;
  eyebrow?: string;
  description?: string;
  gallery: string[];
};

const featuredCollections: FeaturedItem[] = [
  {
    id: 1,
    title: "The Retro Prince",
    ctaLabel: "View look",
    viewerCtaLabel: "Commission this look",
    viewerCtaHref: "/commission/retro-prince",
    image: "/images/F1.png",
    eyebrow: "Explore Look",
    description:
      "A signature Sam’Alia look—crafted with intention, heritage, and modern elegance.",
    gallery: ["/images/F1.png", "/images/F2.png", "/images/F3.png"],
  },
  {
    id: 2,
    title: "Adire Print Gown",
    ctaLabel: "View look",
    viewerCtaLabel: "I want this look",
    viewerCtaHref: "/commission/adire-print-gown",
    image: "/images/F2.png",
    eyebrow: "Explore Look",
    description:
      "A modern silhouette, anchored in craft—adire textures, refined detailing, and presence.",
    gallery: ["/images/F2.png", "/images/F1.png", "/images/F3.png"],
  },
  {
    id: 3,
    title: "African Top Shirt",
    ctaLabel: "View look",
    viewerCtaLabel: "Commission this look",
    viewerCtaHref: "/commission/african-top-shirt",
    image: "/images/F3.png",
    eyebrow: "Explore Look",
    description:
      "A tailored statement piece—clean structure, elevated fabric language, timeless wearability.",
    gallery: ["/images/F3.png", "/images/F2.png", "/images/F1.png"],
  },
  {
    id: 4,
    title: "Adire Print Gown",
    ctaLabel: "View look",
    viewerCtaLabel: "I want this look",
    viewerCtaHref: "/commission/adire-print-gown",
    image: "/images/F2.png",
    eyebrow: "Explore Look",
    description:
      "A modern silhouette, anchored in craft—adire textures, refined detailing, and presence.",
    gallery: ["/images/F2.png", "/images/F1.png", "/images/F3.png"],
  },
  {
    id: 5,
    title: "African Top Shirt",
    ctaLabel: "View look",
    viewerCtaLabel: "Commission this look",
    viewerCtaHref: "/commission/african-top-shirt",
    image: "/images/F3.png",
    eyebrow: "Explore Look",
    description:
      "A tailored statement piece—clean structure, elevated fabric language, timeless wearability.",
    gallery: ["/images/F3.png", "/images/F2.png", "/images/F1.png"],
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

type ViewerState = {
  open: boolean;
  item: FeaturedItem | null;
  activeShot: string | null;
};

function FeaturedCollectionViewer({
  state,
  onClose,
}: {
  state: ViewerState;
  onClose: () => void;
}) {
  const open = state.open && !!state.item;
  const item = state.item;

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const hero = state.activeShot ?? item?.image ?? "";
  const gallery = item?.gallery?.length ? item.gallery : hero ? [hero] : [];

  const HERO_SIZES =
    "(max-width: 768px) 92vw, (max-width: 1024px) 78vw, 1100px";

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close viewer"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal frame */}
          <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-6 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="
                relative w-full max-w-6xl overflow-hidden rounded-2xl
                border border-white/15 bg-neutral-950/70
                backdrop-blur-xl
                shadow-[0_30px_120px_rgba(0,0,0,0.75)]
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button pill (keep this one only) */}
              <button
                type="button"
                onClick={onClose}
                className="
                  absolute right-4 top-4 z-20
                  inline-flex items-center gap-2
                  rounded-full border border-white/18 bg-black/40
                  px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white
                  backdrop-blur-md transition hover:bg-white/10
                "
              >
                Close <X className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                {/* Left */}
                <div className="relative z-10 px-6 pb-6 pt-16 sm:px-10 sm:pb-10 lg:py-12">
                  <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-white/70">
                    {item.eyebrow ?? "Explore Look"}
                  </p>

                  <h1 className="mt-3 font-heading text-3xl leading-tight text-white sm:text-4xl lg:text-[44px]">
                    {item.title}
                  </h1>

                  {item.description && (
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-[15px]">
                      {item.description}
                    </p>
                  )}

                  {/* ✅ Only one CTA button now */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={item.viewerCtaHref}
                      className="
                        inline-flex items-center gap-3
                        border border-white bg-white
                        px-5 py-2 text-[11px] font-medium uppercase tracking-[0.22em]
                        text-neutral-900 transition hover:bg-transparent hover:text-white
                      "
                    >
                      {item.viewerCtaLabel} <span className="text-xs">→</span>
                    </Link>
                  </div>

                  {/* Thumbnails */}
                  <div className="mt-10">
                    <div
                      className="
                        inline-flex max-w-full items-center gap-3
                        overflow-x-auto rounded-xl
                        border border-white/12 bg-black/30
                        p-2 backdrop-blur-md
                        no-scrollbar
                      "
                    >
                      {gallery.map((src) => {
                        const active = src === hero;
                        return (
                          <button
                            key={src}
                            type="button"
                            onClick={() => {
                              const ev = new CustomEvent("samalia:featured-shot", {
                                detail: { src },
                              });
                              window.dispatchEvent(ev);
                            }}
                            className={`
                              relative shrink-0 overflow-hidden rounded-lg
                              ${active ? "ring-2 ring-white/90" : "opacity-80 hover:opacity-100"}
                            `}
                            style={{ width: 72, height: 72 }}
                            aria-label="Select image"
                          >
                            <Image
                              src={src}
                              alt=""
                              fill
                              sizes="72px"
                              quality={95}
                              className="object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right: hero */}
                <div className="relative">
                  <div className="relative aspect-16/11 w-full lg:aspect-auto lg:h-full">
                    <Image
                      src={hero}
                      alt={item.title}
                      fill
                      priority
                      quality={95}
                      sizes={HERO_SIZES}
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute inset-y-0 left-0 hidden w-24 bg-linear-to-r from-black/55 to-transparent lg:block" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FeaturedCollectionsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const [viewer, setViewer] = useState<ViewerState>({
    open: false,
    item: null,
    activeShot: null,
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ src: string }>;
      const src = ce.detail?.src;
      if (!src) return;
      setViewer((prev) => ({ ...prev, activeShot: src }));
    };
    window.addEventListener("samalia:featured-shot", handler as EventListener);
    return () =>
      window.removeEventListener(
        "samalia:featured-shot",
        handler as EventListener
      );
  }, []);

  const openViewer = useCallback((item: FeaturedItem) => {
    setViewer({ open: true, item, activeShot: item.image });
  }, []);

  const closeViewer = useCallback(() => {
    setViewer({ open: false, item: null, activeShot: null });
  }, []);

  const CARD_GAP = 32;

  const getCardWidth = useCallback(() => {
    if (!trackRef.current) return 0;
    const firstCard =
      trackRef.current.querySelector<HTMLDivElement>("[data-card]");
    if (!firstCard) return 0;
    const rect = firstCard.getBoundingClientRect();
    return rect.width + CARD_GAP;
  }, []);

  useEffect(() => {
    const calcPages = () => {
      if (!trackRef.current) return;
      const cardWidth = getCardWidth();
      if (!cardWidth) return;

      const { scrollWidth, clientWidth } = trackRef.current;
      const max =
        scrollWidth <= clientWidth
          ? 0
          : Math.max(0, Math.round((scrollWidth - clientWidth) / cardWidth));

      setMaxIndex(max);
      setActiveIndex((prev) => clamp(prev, 0, max));
    };

    calcPages();
    window.addEventListener("resize", calcPages);
    return () => window.removeEventListener("resize", calcPages);
  }, [getCardWidth]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!trackRef.current) return;
      const cardWidth = getCardWidth();
      if (!cardWidth) return;

      const clamped = clamp(index, 0, maxIndex);

      trackRef.current.scrollTo({
        left: clamped * cardWidth,
        behavior: "smooth",
      });
      setActiveIndex(clamped);
    },
    [getCardWidth, maxIndex]
  );

  const handleNext = () => scrollToIndex(activeIndex + 1);
  const handlePrev = () => scrollToIndex(activeIndex - 1);

  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const cardWidth = getCardWidth();
    if (!cardWidth) return;

    const raw = trackRef.current.scrollLeft / cardWidth;
    const nearest = Math.round(raw);
    setActiveIndex(clamp(nearest, 0, maxIndex));
  }, [getCardWidth, maxIndex]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const listener = () => handleScroll();
    el.addEventListener("scroll", listener, { passive: true });
    return () => el.removeEventListener("scroll", listener);
  }, [handleScroll]);

  const pageCount = useMemo(() => maxIndex + 1, [maxIndex]);

  return (
    <>
      <section className="w-full bg-white py-20 md:py-24">
        <div className="w-full px-5 sm:px-10 lg:px-20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <h2 className="font-heading text-2xl tracking-[0.18em] text-neutral-900 sm:text-[26px]">
              Featured Collection
            </h2>

            <Link
              href="/collections"
              className="inline-flex items-center gap-3 border border-neutral-800/80 px-5 py-2 text-[11px] uppercase tracking-[0.22em] text-neutral-900 transition-colors duration-200 hover:bg-neutral-900 hover:text-white"
            >
              <span>View Collections</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10">
            <div className="relative">
              <div
                ref={trackRef}
                className="
                  flex gap-8
                  overflow-x-auto scroll-smooth
                  snap-x snap-mandatory
                  pb-4 no-scrollbar
                "
              >
                {featuredCollections.map((item) => (
                  <article
                    key={`${item.id}-${item.viewerCtaHref}`}
                    data-card
                    className="
                      snap-start shrink-0
                      basis-[78%] sm:basis-[55%] md:basis-[30%] lg:basis-[22%]
                    "
                  >
                    <button
                      type="button"
                      onClick={() => openViewer(item)}
                      className="group block w-full text-left"
                      aria-label={`Open ${item.title}`}
                    >
                      <div className="relative w-full overflow-hidden bg-neutral-100">
                        <div className="relative w-full pt-[70%]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            quality={90}
                            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 35vw, 22vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col gap-3">
                        <h3 className="text-sm font-medium tracking-[0.05em] text-neutral-900 sm:text-base">
                          {item.title}
                        </h3>

                        <span className="inline-flex w-fit items-center border border-neutral-900 bg-neutral-900 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:bg-black">
                          {item.ctaLabel}
                        </span>
                      </div>
                    </button>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-end gap-5">
                <div className="flex items-center gap-2">
                  {Array.from({ length: pageCount }).map((_, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => scrollToIndex(idx)}
                        aria-label={`Go to section ${idx + 1}`}
                        className={`h-2 w-2 rounded-full transition-all duration-200 ${
                          isActive
                            ? "bg-neutral-900"
                            : "bg-neutral-400/40 hover:bg-neutral-500/70"
                        }`}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous items"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition-colors duration-200 hover:bg-neutral-900 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next items"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-900 bg-neutral-900 text-white transition-colors duration-200 hover:bg-black"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedCollectionViewer state={viewer} onClose={closeViewer} />
    </>
  );
}
