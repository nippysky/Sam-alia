"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";


export type FeaturedLook = {
  id: number;
  title: string;
  image: string;
};

interface FeaturedLookViewerProps {
  items: FeaturedLook[];
  activeIndex: number;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export function FeaturedLookViewer({
  items,
  activeIndex,
  onClose,
  onSelect,
}: FeaturedLookViewerProps) {
  const activeItem = items[activeIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-60 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Image */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          exit={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src={activeItem.image}
            alt={activeItem.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </motion.div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-full border border-white/40 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-white/10"
        >
          Close ✕
        </button>

        {/* Title */}
        <div className="relative z-10 flex h-full items-center px-5 sm:px-10 lg:px-20">
          <div className="max-w-xl">
            <h1 className="font-heading text-3xl leading-tight text-white sm:text-4xl lg:text-[44px]">
              {activeItem.title}
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-white/85">
              A signature Sam’Alia look — crafted with intention, heritage,
              and modern elegance.
            </p>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => onSelect(idx)}
              className={`relative h-14 w-10 overflow-hidden rounded-md border transition ${
                idx === activeIndex
                  ? "border-white"
                  : "border-white/30 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
