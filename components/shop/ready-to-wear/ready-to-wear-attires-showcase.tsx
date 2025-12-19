"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ReadyToWearItem = {
  id: string;
  title: string;
  href: string; // product page
  image: string;
  alt: string;
  ctaLabel?: string; // default: View
};

const rtwItems: ReadyToWearItem[] = [
  {
    id: "rtw-1",
    title: "The Gazelle Attire",
    href: "/shop/ready-to-wear/the-gazelle-attire",
    image: "/images/F1.png", // replace
    alt: "The Gazelle Attire",
  },
  {
    id: "rtw-2",
    title: "African Top Shirt",
    href: "/shop/ready-to-wear/african-top-shirt",
    image: "/images/F2.png", // replace
    alt: "African Top Shirt",
  },
  {
    id: "rtw-3",
    title: "African Print Pants",
    href: "/shop/ready-to-wear/african-print-pants",
    image: "/images/F3.png", // replace
    alt: "African Print Pants",
  },

  // placeholders (swap paths easily)
  ...Array.from({ length: 18 }).map((_, i) => {
    const idx = i % 6;
    const img =
      idx === 0
        ? "/images/F1.png"
        : idx === 1
        ? "/images/F2.png"
        : idx === 2
        ? "/images/F3.png"
        : idx === 3
        ? "/images/F1.png"
        : idx === 4
        ? "/images/F2.png"
        : "/images/F3.png";

    const title =
      idx === 0
        ? "Adire Print Gown"
        : idx === 1
        ? "African Top Shirt"
        : idx === 2
        ? "African Print Pants"
        : idx === 3
        ? "Adire Print Gown"
        : idx === 4
        ? "African Top Shirt"
        : "African Print Pants";

    return {
      id: `rtw-${i + 4}`,
      title,
      href: `/shop/ready-to-wear/${title.toLowerCase().replace(/\s+/g, "-")}`,
      image: img,
      alt: title,
      ctaLabel: "View",
    } satisfies ReadyToWearItem;
  }),
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function useColumns() {
  const [cols, setCols] = useState<2 | 3 | 5>(2);

  useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqXl = window.matchMedia("(min-width: 1280px)");

    const update = () => {
      if (mqXl.matches) setCols(5);
      else if (mqLg.matches) setCols(3);
      else setCols(2);
    };

    update();
    mqLg.addEventListener("change", update);
    mqXl.addEventListener("change", update);
    return () => {
      mqLg.removeEventListener("change", update);
      mqXl.removeEventListener("change", update);
    };
  }, []);

  return cols;
}

export function ReadyToWearAttiresShowcase() {
  const cols = useColumns();
  const rowsPerSet = 3;
  const perSet = cols * rowsPerSet;

  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");

  const totalPages = useMemo(() => {
    if (!perSet) return 1;
    return Math.max(1, Math.ceil(rtwItems.length / perSet));
  }, [perSet]);

  const safePage = useMemo(() => clamp(page, 0, totalPages - 1), [page, totalPages]);

  const currentItems = useMemo(() => {
    const start = safePage * perSet;
    const slice = rtwItems.slice(start, start + perSet);

    // keep grid even per set (fills with earlier items)
    if (slice.length < perSet && rtwItems.length > 0) {
      const needed = perSet - slice.length;
      slice.push(...rtwItems.slice(0, needed));
    }

    return slice;
  }, [safePage, perSet]);

  const goNext = () => {
    setDir("next");
    setPage((p) => (totalPages ? (p + 1) % totalPages : 0));
  };

  const goPrev = () => {
    setDir("prev");
    setPage((p) => (totalPages ? (p - 1 + totalPages) % totalPages : 0));
  };

  const jumpTo = (i: number) => {
    setDir(i > safePage ? "next" : "prev");
    setPage(clamp(i, 0, totalPages - 1));
  };

  return (
    <section className="w-full bg-[#F2F0EA] py-12 md:py-16">
      <div className="mx-auto w-full px-5 sm:px-10 lg:px-16 xl:px-20">
        {/* Grid stage (animated swap) */}
        <div
          key={`${safePage}-${cols}-${dir}`}
          className={dir === "next" ? "anim-swap-left" : "anim-swap-right"}
        >
          <div className="grid grid-cols-2 gap-x-10 gap-y-12 lg:grid-cols-3 xl:grid-cols-5">
            {currentItems.map((item, idx) => (
              <ReadyToWearCard
                key={`${item.id}-${safePage}-${idx}`}
                item={item}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center justify-between">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous set"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white/60 text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const active = i === safePage;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-label={`Go to set ${i + 1}`}
                  className={
                    active
                      ? "h-2 w-8 rounded-full bg-neutral-900 transition-all"
                      : "h-2 w-2 rounded-full bg-neutral-400/40 hover:bg-neutral-500/70 transition-all"
                  }
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next set"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900 bg-neutral-900 text-white transition-colors hover:bg-black"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ReadyToWearCard({ item }: { item: ReadyToWearItem }) {
  return (
    <article className="group">
      <Link
        href={item.href}
        className="
          block w-full text-left outline-none
          focus-visible:ring-2 focus-visible:ring-neutral-900/40
          focus-visible:ring-offset-4 focus-visible:ring-offset-[#F2F0EA]
        "
        aria-label={`View ${item.title}`}
      >
        {/* Figma behavior: only hovered card gets white bg */}
        <div
          className="
            p-4 transition-all duration-300 ease-out bg-transparent
            group-hover:bg-white group-hover:shadow-[0_22px_60px_-40px_rgba(0,0,0,0.35)] group-hover:-translate-y-0.5
            group-focus-visible:bg-white group-focus-visible:shadow-[0_22px_60px_-40px_rgba(0,0,0,0.35)] group-focus-visible:-translate-y-0.5
          "
        >
          <div className="relative w-full overflow-hidden bg-neutral-100">
            <div className="relative w-full pt-[120%]">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                quality={90}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 18vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-medium text-neutral-900">{item.title}</p>

            <span
              className="
                inline-flex w-fit items-center gap-2
                border border-neutral-900/60 bg-transparent
                px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-900
                transition-colors duration-200
                group-hover:bg-white
              "
            >
              {item.ctaLabel ?? "View"}
              <span className="opacity-60">👁</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
