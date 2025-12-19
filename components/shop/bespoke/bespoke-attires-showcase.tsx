"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  LookViewerModal,
  LookViewerItem,
  LookViewerState,
} from "@/components/shared/look-viewer-modal";

type BespokeItem = LookViewerItem & {
  id: string;
  ctaLabel: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function makeGallery(base: string) {
  const all = ["/images/F1.png", "/images/F2.png", "/images/F3.png"];
  return [base, ...all.filter((x) => x !== base)];
}

const bespokeItems: BespokeItem[] = [
  {
    id: "b1",
    title: "Adire Print Gown",
    ctaLabel: "VIEW LOOK",
    viewerCtaLabel: "Talk an order",
    viewerCtaHref: "/inquiry/bespoke/adire-print-gown",
    image: "/images/F3.png",
    eyebrow: "Bespoke",
    description: "A tailored statement—crafted with intention and presence.",
    gallery: makeGallery("/images/F3.png"),
  },
  {
    id: "b2",
    title: "African Top Shirt",
    ctaLabel: "VIEW LOOK",
    viewerCtaLabel: "Talk an order",
    viewerCtaHref: "/inquiry/bespoke/african-top-shirt",
    image: "/images/F2.png",
    eyebrow: "Bespoke",
    description: "Refined silhouette, clean detailing, elevated fabric language.",
    gallery: makeGallery("/images/F2.png"),
  },
  {
    id: "b3",
    title: "African Print Pants",
    ctaLabel: "VIEW LOOK",
    viewerCtaLabel: "Talk an order",
    viewerCtaHref: "/inquiry/bespoke/african-print-pants",
    image: "/images/F1.png",
    eyebrow: "Bespoke",
    description: "Modern cut, heritage energy—built to move with confidence.",
    gallery: makeGallery("/images/F1.png"),
  },

  ...Array.from({ length: 15 }).map((_, i) => {
    const idx = i % 3;
    const base =
      idx === 0 ? "/images/F3.png" : idx === 1 ? "/images/F2.png" : "/images/F1.png";
    const title =
      idx === 0 ? "Adire Print Gown" : idx === 1 ? "African Top Shirt" : "African Print Pants";

    return {
      id: `b${i + 4}`,
      title,
      ctaLabel: "VIEW LOOK",
      viewerCtaLabel: "Talk an order",
      viewerCtaHref: `/inquiry/bespoke/${title.toLowerCase().replace(/\s+/g, "-")}`,
      image: base,
      eyebrow: "Bespoke",
      description:
        "A signature look—crafted with intention, heritage, and modern elegance.",
      gallery: makeGallery(base),
    } satisfies BespokeItem;
  }),
];

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

export function BespokeAttiresShowcase() {
  const cols = useColumns();
  const rowsPerSet = 3;
  const perSet = cols * rowsPerSet;

  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");

  const [viewer, setViewer] = useState<LookViewerState<BespokeItem>>({
    open: false,
    item: null,
    activeShot: null,
  });

  const openViewer = useCallback((item: BespokeItem) => {
    setViewer({ open: true, item, activeShot: item.image });
  }, []);

  const closeViewer = useCallback(() => {
    setViewer({ open: false, item: null, activeShot: null });
  }, []);

  const selectShot = useCallback((src: string) => {
    setViewer((prev) => ({ ...prev, activeShot: src }));
  }, []);

  const totalPages = useMemo(() => {
    if (!perSet) return 1;
    return Math.max(1, Math.ceil(bespokeItems.length / perSet));
  }, [perSet]);

  const safePage = useMemo(() => clamp(page, 0, totalPages - 1), [page, totalPages]);

  const currentItems = useMemo(() => {
    const start = safePage * perSet;
    const slice = bespokeItems.slice(start, start + perSet);

    // keep the grid visually even (fill to perSet)
    if (slice.length < perSet && bespokeItems.length > 0) {
      const needed = perSet - slice.length;
      slice.push(...bespokeItems.slice(0, needed));
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
    <>
      <section className="w-full bg-[#F2F0EA] py-12 md:py-16">
        <div className="mx-auto w-full px-5 sm:px-10 lg:px-16 xl:px-20">
          {/* Grid stage (animated swap) */}
          <div
            key={`${safePage}-${cols}-${dir}`}
            className={dir === "next" ? "anim-swap-left" : "anim-swap-right"}
          >
            <div className="grid grid-cols-2 gap-x-10 gap-y-12 lg:grid-cols-3 xl:grid-cols-5">
              {currentItems.map((item) => (
                <BespokeCard
                  key={`${item.id}-${item.viewerCtaHref}`}
                  item={item}
                  onOpen={openViewer}
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
              className="
                flex h-10 w-10 items-center justify-center rounded-full
                border border-neutral-300 bg-white/60 text-neutral-900
                transition-colors hover:bg-neutral-900 hover:text-white
              "
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
              className="
                flex h-10 w-10 items-center justify-center rounded-full
                border border-neutral-900 bg-neutral-900 text-white
                transition-colors hover:bg-black
              "
            >
              <ChevronRight className="h-4 w-4" />
            </button>
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

function BespokeCard({
  item,
  onOpen,
}: {
  item: BespokeItem;
  onOpen: (item: BespokeItem) => void;
}) {
  return (
    <article className="group">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="
          block w-full text-left outline-none
          focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F2F0EA]
        "
      >
        {/* IMPORTANT:
            - No white background by default
            - White background ONLY on hover/focus-visible
        */}
        <div
          className="
            p-4
            transition-all duration-300 ease-out
            bg-transparent
            group-hover:bg-white group-hover:shadow-[0_22px_60px_-40px_rgba(0,0,0,0.35)] group-hover:-translate-y-0.5
            group-focus-visible:bg-white group-focus-visible:shadow-[0_22px_60px_-40px_rgba(0,0,0,0.35)] group-focus-visible:-translate-y-0.5
          "
        >
          <div className="relative w-full overflow-hidden bg-neutral-100">
            <div className="relative w-full pt-[120%]">
              <Image
                src={item.image}
                alt={item.title}
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
                inline-flex w-fit items-center
                border border-neutral-900/60 bg-transparent
                px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-900
                transition-colors duration-200
                group-hover:bg-white
              "
            >
              {item.ctaLabel}
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}
