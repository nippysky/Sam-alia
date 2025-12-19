/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type VisualArchiveItem = {
  id: string;
  title: string;
  image: string;
  alt: string;
};

const items: VisualArchiveItem[] = [
  { id: "va-1", title: "Look 01", image: "/images/F1.png", alt: "Visual archive look 01" },
  { id: "va-2", title: "Look 02", image: "/images/LC2.svg", alt: "Visual archive look 02" },
  { id: "va-3", title: "Look 03", image: "/images/F2.png", alt: "Visual archive look 03" },
  { id: "va-4", title: "Look 04", image: "/images/F3.png", alt: "Visual archive look 04" },
  { id: "va-5", title: "Look 05", image: "/images/F1.png", alt: "Visual archive look 05" },
  { id: "va-6", title: "Look 06", image: "/images/F3.png", alt: "Visual archive look 06" },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Infinite carousel:
 * extended = [last, ...items, first]
 * real slides are indices 1..n
 */
export function VisualArchiveSection() {
  const base = items;
  const n = base.length;
  const infinite = n > 1;

  const extended = useMemo(() => {
    if (!infinite) return base;
    return [base[n - 1], ...base, base[0]];
  }, [base, infinite, n]);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [idx, setIdx] = useState(infinite ? 1 : 0);
  const [enableTransition, setEnableTransition] = useState(true);

  const isAnimating = useRef(false);

  const [wrapW, setWrapW] = useState(0);
  const [slideW, setSlideW] = useState(0);
  const [gap, setGap] = useState(40);

  const step = slideW + gap;

  // drag
  const drag = useRef({ down: false, startX: 0, startIdx: 0, dx: 0 });
  const [dragPx, setDragPx] = useState(0);

  // wheel
  const wheelAcc = useRef(0);
  const wheelTimer = useRef<number | null>(null);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [modalToken, setModalToken] = useState(0);

  const openModalAt = useCallback((realIdx: number) => {
    setModalIndex(realIdx);
    setModalToken((t) => t + 1);
    setModalOpen(true);
    setModalClosing(false);
  }, []);

  const closeModal = useCallback(() => {
    setModalClosing(true);
    window.setTimeout(() => {
      setModalOpen(false);
      setModalClosing(false);
    }, 180);
  }, []);

  const realIndex = useMemo(() => {
    if (!infinite) return idx;
    return clamp(idx - 1, 0, n - 1);
  }, [idx, infinite, n]);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    setWrapW(wrap.getBoundingClientRect().width);

    const slide = track.querySelector<HTMLDivElement>("[data-slide]");
    if (slide) setSlideW(slide.getBoundingClientRect().width);

    const cs = window.getComputedStyle(track);
    const g = parseFloat(cs.gap || cs.columnGap || "40");
    if (!Number.isNaN(g) && g > 0) setGap(g);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (wrapRef.current) ro.observe(wrapRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const baseTranslate = useMemo(() => {
    if (!wrapW || !slideW) return 0;
    const centerOffset = wrapW / 2 - slideW / 2;
    return centerOffset - idx * step;
  }, [wrapW, slideW, idx, step]);

  const jumpWithoutAnim = useCallback((to: number) => {
    setEnableTransition(false);
    setIdx(to);
    requestAnimationFrame(() => requestAnimationFrame(() => setEnableTransition(true)));
  }, []);

  const onTransitionEnd = useCallback(() => {
    isAnimating.current = false;
    if (!infinite) return;
    if (idx === 0) jumpWithoutAnim(n);
    if (idx === n + 1) jumpWithoutAnim(1);
  }, [idx, infinite, jumpWithoutAnim, n]);

  const goTo = useCallback(
    (nextIdx: number) => {
      if (n <= 1) return;
      if (isAnimating.current) return;

      isAnimating.current = true;
      setEnableTransition(true);

      if (!infinite) {
        setIdx(clamp(nextIdx, 0, n - 1));
        return;
      }

      setIdx(clamp(nextIdx, 0, n + 1));
    },
    [infinite, n]
  );

  const next = useCallback(() => goTo(idx + 1), [goTo, idx]);
  const prev = useCallback(() => goTo(idx - 1), [goTo, idx]);

  // ✅ IMPORTANT: ignore pointer capture when clicking buttons/links etc.
  const shouldIgnoreDrag = (target: EventTarget | null) => {
    const el = target as HTMLElement | null;
    if (!el) return false;
    return Boolean(el.closest("button, a, input, textarea, select, [data-no-drag]"));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (n <= 1) return;

    // ✅ If they clicked VIEW (or any interactive element), do NOT start drag.
    if (shouldIgnoreDrag(e.target)) return;

    drag.current.down = true;
    drag.current.startX = e.clientX;
    drag.current.startIdx = idx;
    drag.current.dx = 0;

    setDragPx(0);
    setEnableTransition(false);

    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.dx = dx;
    setDragPx(dx);
  };

  const endDrag = () => {
    if (!drag.current.down) return;
    drag.current.down = false;

    const dx = drag.current.dx;
    setDragPx(0);
    setEnableTransition(true);

    const threshold = Math.max(52, Math.min(160, slideW * 0.22));
    if (Math.abs(dx) < threshold) {
      isAnimating.current = false;
      setIdx(drag.current.startIdx);
      return;
    }

    const direction = dx > 0 ? -1 : 1;
    goTo(drag.current.startIdx + direction);
  };

  // wheel -> snap by 1
  useEffect(() => {
    const el = stageRef.current;
    if (!el || n <= 1) return;

    const onWheel = (ev: WheelEvent) => {
      const dominant = Math.abs(ev.deltaX) > Math.abs(ev.deltaY) ? ev.deltaX : ev.deltaY;
      if (Math.abs(dominant) < 2) return;

      ev.preventDefault();
      if (isAnimating.current) return;

      wheelAcc.current += dominant;

      const threshold = Math.max(70, Math.min(220, step * 0.45));
      if (Math.abs(wheelAcc.current) >= threshold) {
        const dir = wheelAcc.current > 0 ? 1 : -1;
        wheelAcc.current = 0;
        dir === 1 ? next() : prev();
      }

      if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
      wheelTimer.current = window.setTimeout(() => {
        wheelAcc.current = 0;
      }, 120);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
    };
  }, [n, next, prev, step]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (n <= 1) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n, next, prev]);

  const dots = useMemo(() => Array.from({ length: n }, (_, i) => i), [n]);

  return (
    <>
      <section className="w-full bg-[#F6F4EF] py-16 md:py-24 overflow-x-clip">
        <div className="mx-auto w-full px-5 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex justify-center anim-fade-up anim-delay-1">
            <h2 className="font-heading text-3xl tracking-[0.12em] text-neutral-900 sm:text-4xl md:text-5xl text-center">
              THE VISUAL ARCHIVE
            </h2>
          </div>

          <p className="mx-auto mt-4 max-w-4xl text-center text-sm leading-relaxed text-neutral-700 sm:text-base anim-fade-up anim-delay-2">
            Every image is a story; every frame, a memory suspended in time. The Sam’Alia
            Journal presents photographs not merely as documentation, but as art—editorials
            sculpted in light and shadow, portraits that embody identity, and moments that
            reveal the poetry of dress.
          </p>
        </div>

        {/* Full-bleed canvas */}
        <div className="mt-10">
          <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden">
            <div ref={wrapRef} className="relative w-full">
              <div
                ref={stageRef}
                className="relative"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                style={{ touchAction: "pan-y" }}
                role="region"
                aria-label="Visual archive carousel"
              >
                <div
                  ref={trackRef}
                  onTransitionEnd={onTransitionEnd}
                  className={[
                    "flex items-stretch gap-10 select-none",
                    enableTransition ? "transition-transform duration-500 ease-out" : "",
                  ].join(" ")}
                  style={{
                    transform: `translate3d(${baseTranslate + dragPx}px,0,0)`,
                    willChange: "transform",
                  }}
                >
                  {extended.map((item, i) => {
                    const active = i === idx;
                    const near = Math.abs(i - idx) === 1;

                    return (
                      <div
                        key={`${item.id}__${i}`}
                        data-slide
                        className="
                          shrink-0
                          w-[72vw] sm:w-[46vw] md:w-[36vw] lg:w-[28vw] xl:w-[24vw]
                          max-w-[520px]
                        "
                        aria-hidden={!active}
                      >
                        <div
                          className={[
                            "transition-[transform,opacity] duration-500 ease-out",
                            active
                              ? "opacity-100 scale-[1.06]"
                              : near
                              ? "opacity-80 scale-[1]"
                              : "opacity-55 scale-[0.94]",
                          ].join(" ")}
                        >
                          <ArchiveCard
                            item={item}
                            active={active}
                            onView={() => openModalAt(infinite ? clamp(i - 1, 0, n - 1) : i)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-linear-to-r from-[#F6F4EF] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-linear-to-l from-[#F6F4EF] to-transparent" />
              </div>

              {/* Controls */}
              <div className="mt-12 px-5 sm:px-10 lg:px-16 xl:px-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Previous"
                      className="
                        flex h-10 w-10 items-center justify-center rounded-full
                        border border-neutral-300 bg-white text-neutral-900
                        transition-colors duration-200 hover:bg-neutral-900 hover:text-white
                      "
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next"
                      className="
                        flex h-10 w-10 items-center justify-center rounded-full
                        border border-neutral-900 bg-neutral-900 text-white
                        transition-colors duration-200 hover:bg-black
                      "
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {dots.map((d) => {
                        const on = d === realIndex;
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() => (infinite ? goTo(d + 1) : goTo(d))}
                            aria-label={`Go to item ${d + 1}`}
                            className={[
                              "h-2 w-2 rounded-full transition-all duration-200",
                              on ? "bg-neutral-900" : "bg-neutral-400/40 hover:bg-neutral-500/70",
                            ].join(" ")}
                          />
                        );
                      })}
                    </div>

                    <div className="hidden sm:block">
                      <div className="h-[3px] w-28 rounded-full bg-neutral-300/60 overflow-hidden">
                        <div
                          className="h-full bg-neutral-900 transition-all duration-300"
                          style={{ width: n <= 1 ? "100%" : `${((realIndex + 1) / n) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /controls */}
            </div>
          </div>
        </div>
      </section>

      {(modalOpen || modalClosing) && (
        <ImageModal
          key={modalToken}
          open={modalOpen}
          closing={modalClosing}
          items={base}
          startIndex={modalIndex}
          onClose={closeModal}
        />
      )}
    </>
  );
}

function ArchiveCard({
  item,
  active,
  onView,
}: {
  item: VisualArchiveItem;
  active: boolean;
  onView: () => void;
}) {
  return (
    <div className="relative overflow-hidden bg-white shadow-[0_22px_70px_-50px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
      <div className="relative w-full aspect-4/3">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 72vw, (max-width: 1024px) 46vw, 28vw"
          className="object-cover"
        />
      </div>

      {/* VIEW button only on active */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={onView}
          onPointerDown={(e) => e.stopPropagation()} // ✅ prevents drag capture
          className={[
            "transition-all duration-200",
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none",
          ].join(" ")}
          aria-label={`View ${item.title}`}
          data-no-drag
        >
          <span className="inline-flex items-center justify-center border border-white/35 bg-black/55 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/70">
            VIEW
          </span>
        </button>
      </div>
    </div>
  );
}

function ImageModal({
  open,
  closing,
  items,
  startIndex,
  onClose,
}: {
  open: boolean;
  closing: boolean;
  items: VisualArchiveItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const n = items.length;
  const [i, setI] = useState(() => clamp(startIndex, 0, Math.max(0, n - 1)));

  const prev = useCallback(() => {
    setI((p) => (n ? (p - 1 + n) % n : 0));
  }, [n]);

  const next = useCallback(() => {
    setI((p) => (n ? (p + 1) % n : 0));
  }, [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [next, onClose, prev]);

  const item = items[i];

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center px-4 sm:px-6" role="dialog" aria-modal="true">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className={[
          "absolute inset-0 bg-black/60 backdrop-blur-[2px]",
          "transition-opacity duration-200",
          open && !closing ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      <div
        className={[
          "relative w-full max-w-5xl",
          "transition-all duration-200",
          open && !closing ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]",
        ].join(" ")}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/85">
            {item?.title ?? ""}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative overflow-hidden bg-neutral-950 ring-1 ring-white/10 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]">
          <div className="relative h-[62vh] sm:h-[70vh]">
            {item && (
              <Image
                src={item.image}
                alt={item.alt}
                fill
                priority
                sizes="(max-width: 768px) 92vw, 70vw"
                className="object-contain"
              />
            )}
          </div>

          {n > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {n > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {items.map((_, d) => {
              const activeDot = d === i;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setI(d)}
                  aria-label={`Go to image ${d + 1}`}
                  className={[
                    "h-2 w-2 rounded-full transition-all duration-200",
                    activeDot ? "bg-white" : "bg-white/35 hover:bg-white/60",
                  ].join(" ")}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
