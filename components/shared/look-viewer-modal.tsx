"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export type LookViewerItem = {
  title: string;

  image: string;
  gallery?: string[];

  eyebrow?: string;
  description?: string;

  viewerCtaLabel: string;
  viewerCtaHref: string;
};

export type LookViewerState<T extends LookViewerItem> = {
  open: boolean;
  item: T | null;
  activeShot: string | null;
};

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

export function LookViewerModal<T extends LookViewerItem>({
  state,
  onClose,
  onSelectShot,
  zIndexClass = "z-[70]",
}: {
  state: LookViewerState<T>;
  onClose: () => void;
  onSelectShot: (src: string) => void;
  zIndexClass?: string; // let any page decide stacking
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
  const gallery =
    item?.gallery?.length ? item.gallery : hero ? [hero] : [];

  const HERO_SIZES =
    "(max-width: 768px) 92vw, (max-width: 1024px) 78vw, 1100px";

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className={`fixed inset-0 ${zIndexClass}`}
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
              {/* Close pill */}
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

                  {/* Single CTA */}
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
                            onClick={() => onSelectShot(src)}
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

                {/* Right hero */}
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
