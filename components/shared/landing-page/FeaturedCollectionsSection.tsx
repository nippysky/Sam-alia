// components/shared/landing-page/FeaturedCollectionsSection.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FeaturedItem = {
  id: number;
  title: string;
  ctaLabel: string;
  href: string;
  image: string;
};

const featuredCollections: FeaturedItem[] = [
  {
    id: 1,
    title: "The Retro Prince",
    ctaLabel: "View look",
    href: "/collections/retro-prince",
    image: "/images/F1.png",
  },
  {
    id: 2,
    title: "Adire Print Gown",
    ctaLabel: "View look",
    href: "/collections/adire-print-gown",
    image: "/images/F2.png",
  },
  {
    id: 3,
    title: "African Top Shirt",
    ctaLabel: "View look",
    href: "/collections/african-top-shirt",
    image: "/images/F3.png",
  },
  {
    id: 4,
    title: "The Retro Prince",
    ctaLabel: "View look",
    href: "/collections/retro-prince",
    image: "/images/F1.png",
  },
  {
    id: 5,
    title: "Adire Print Gown",
    ctaLabel: "View look",
    href: "/collections/adire-print-gown",
    image: "/images/F2.png",
  },
  {
    id: 6,
    title: "African Top Shirt",
    ctaLabel: "View look",
    href: "/collections/african-top-shirt",
    image: "/images/F3.png",
  },
];

export function FeaturedCollectionsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0); // current “page”
  const [maxIndex, setMaxIndex] = useState(0); // last “page” index

  // Tailwind gap-8 ≈ 32px between cards
  const CARD_GAP = 32;

  const getCardWidth = useCallback(() => {
    if (!trackRef.current) return 0;
    const firstCard =
      trackRef.current.querySelector<HTMLDivElement>("[data-card]");
    if (!firstCard) return 0;
    const rect = firstCard.getBoundingClientRect();
    return rect.width + CARD_GAP;
  }, []);

  // Recalculate how many “pages” we have whenever layout changes
  useEffect(() => {
    const calcPages = () => {
      if (!trackRef.current) return;
      const cardWidth = getCardWidth();
      if (!cardWidth) return;

      const { scrollWidth, clientWidth } = trackRef.current;
      // How many card-width steps until we reach the far right
      const max =
        scrollWidth <= clientWidth
          ? 0
          : Math.max(
              0,
              Math.round((scrollWidth - clientWidth) / cardWidth)
            );

      setMaxIndex(max);
      setActiveIndex((prev) => Math.min(prev, max));
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

      const clamped = Math.max(0, Math.min(maxIndex, index));

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
    const clamped = Math.max(0, Math.min(maxIndex, nearest));
    setActiveIndex(clamped);
  }, [getCardWidth, maxIndex]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const listener = () => handleScroll();
    el.addEventListener("scroll", listener, { passive: true });
    return () => el.removeEventListener("scroll", listener);
  }, [handleScroll]);

  const pageCount = maxIndex + 1; // number of dots / pages

  return (
    <section className="w-full bg-white py-20 md:py-24">
      <div className="w-full px-5 sm:px-10 lg:px-20">
        {/* Heading row */}
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

        {/* Carousel */}
        <div className="mt-10">
          <div className="relative">
            <div
              ref={trackRef}
              className="
                flex gap-8
                overflow-x-auto
                scroll-smooth
                snap-x snap-mandatory
                pb-4
                no-scrollbar
              "
            >
              {featuredCollections.map((item) => (
                <article
                  key={item.id}
                  data-card
                  className="
                    snap-start
                    shrink-0
                    basis-[78%]
                    sm:basis-[55%]
                    md:basis-[30%]
                    lg:basis-[22%]
                  "
                >
                  <div className="relative w-full overflow-hidden bg-neutral-100">
                    <div className="relative w-full pt-[70%]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    <h3 className="text-sm font-medium tracking-[0.05em] text-neutral-900 sm:text-base">
                      {item.title}
                    </h3>

                    <Link
                      href={item.href}
                      className="inline-flex w-fit items-center border border-neutral-900 bg-neutral-900 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:bg-black"
                    >
                      {item.ctaLabel}
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Dots + arrows */}
            <div className="mt-10 flex items-center justify-end gap-5">
              {/* Dots based on scroll pages, not items */}
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

              {/* Arrow controls */}
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
  );
}
