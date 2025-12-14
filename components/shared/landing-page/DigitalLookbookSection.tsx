// components/shared/landing-page/DigitalLookbookSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Your real image paths
const LOOKBOOK_MAIN = "/images/LB_Main.png";
const LOOKBOOK_FLOAT = "/images/LB3.png";
const LOOKBOOK_STRIP = "/images/LB2.png";

export function DigitalLookbookSection() {
  return (
    <section
      className="
        w-full bg-[#f5f4f2]
        flex flex-col md:flex-row
        items-stretch justify-center
        h-auto md:h-[500px] lg:h-[780px]
        overflow-x-hidden
      "
    >
      {/* LEFT SIDE MAIN IMAGE */}
      <motion.div
        className="relative w-full md:w-1/2 h-80 sm:h-[380px] md:h-full overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <Image
          src={LOOKBOOK_MAIN}
          alt="Sam’Alia digital lookbook hero"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* RIGHT SIDE */}
      <div className="relative w-full md:w-1/2 h-auto md:h-full flex flex-col">
        {/* Text block */}
        <motion.div
          className="w-full px-5 md:px-10 lg:px-20 py-10 lg:py-20 flex flex-col md:h-1/2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="font-heading text-3xl leading-tight text-neutral-900 sm:text-4xl lg:text-6xl">
            <span>Digital Lookbook</span>
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-neutral-800/90 sm:text-[15px]">
            Our designs are more than just clothing; they&apos;re a testament to
            the rich cultural heritage of Northern and Western Nigeria.
            Experience the fusion of tradition and trend.
          </p>

          <div className="mt-8 inline-flex">
            <Link
              href="/lookbook"
              className="inline-flex items-center gap-3 border border-neutral-900 bg-transparent px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-900 transition-colors duration-200 hover:bg-neutral-900 hover:text-white"
            >
              <span>View Lookbook</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Collage image grid */}
        <motion.div
          className="
            w-full
            h-[260px] sm:h-[300px] md:h-1/2
            grid grid-cols-2
            grid-rows-1 md:grid-rows-2
          "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Top-left dummy tile (desktop only) */}
          <div className="hidden md:block w-full h-full bg-[#f5f4f2]" />

          {/* Right column – FLOAT image */}
          <div className="w-full h-full relative overflow-hidden">
            <Image
              src={LOOKBOOK_FLOAT}
              alt="Sam’Alia digital lookbook float"
              fill
              className="object-cover"
            />
          </div>

          {/* Bottom-left – STRIP image */}
          <div className="w-full h-full relative overflow-hidden">
            <Image
              src={LOOKBOOK_STRIP}
              alt="Sam’Alia digital lookbook strip"
              fill
              className="object-cover"
            />
          </div>

          {/* Bottom-right dummy tile (desktop only) */}
          <div className="hidden md:block w-full h-full bg-[#f5f4f2]" />
        </motion.div>
      </div>
    </section>
  );
}
