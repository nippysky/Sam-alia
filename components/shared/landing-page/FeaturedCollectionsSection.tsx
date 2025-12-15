"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LookViewerModal, LookViewerState, LookViewerItem } from "@/components/shared/look-viewer-modal";

type FeaturedItem = LookViewerItem & {
  id: number;
  ctaLabel: string;
};

const featuredCollections: FeaturedItem[] = [
  {
    id: 1,
    title: "The Retro Prince",
    ctaLabel: "View look",
    viewerCtaLabel: "Commission this look",
    viewerCtaHref: "/inquiry/retro-prince",
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
    viewerCtaHref: "/inquiry/adire-print-gown",
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
    viewerCtaHref: "/inquiry/african-top-shirt",
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
    viewerCtaHref: "/inquiry/adire-print-gown",
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
    viewerCtaHref: "/inquiry/african-top-shirt",
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

export function FeaturedCollectionsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const [viewer, setViewer] = useState<LookViewerState<FeaturedItem>>({
    open: false,
    item: null,
    activeShot: null,
  });

  const openViewer = useCallback((item: FeaturedItem) => {
    setViewer({ open: true, item, activeShot: item.image });
  }, []);

  const closeViewer = useCallback(() => {
    setViewer({ open: false, item: null, activeShot: null });
  }, []);

  const selectShot = useCallback((src: string) => {
    setViewer((prev) => ({ ...prev, activeShot: src }));
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

      <LookViewerModal
        state={viewer}
        onClose={closeViewer}
        onSelectShot={selectShot}
        zIndexClass="z-[60]"
      />
    </>
  );
}
