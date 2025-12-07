// components/shared/landing-page/BespokeServiceSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

// Same background asset
const BESPOKE_BG = "/images/BespokeHero.svg";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export function BespokeServiceSection() {
  return (
    <section className="relative w-full bg-black">
      <div className="relative h-[520px] sm:h-[560px] lg:h-[640px]">
        {/* Background image */}
        <Image
          src={BESPOKE_BG}
          alt="Sam’Alia bespoke fitting room interior"
          fill
          priority
          className="object-cover"
        />

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <motion.div
          className="relative z-10 flex h-full items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <div className="w-full px-5 sm:px-10 lg:px-20">
            <div className="mx-auto max-w-3xl text-center text-white">
              <h2 className="font-heading text-3xl leading-tight sm:text-4xl lg:text-[44px]">
                Bespoke Service
              </h2>

              <p className="mt-6 text-sm leading-relaxed text-white/85 sm:text-[15px]">
                A personalized fitting room where clients can try on
                custom-made garments, blending contemporary elegance with
                traditional motifs for a unique and cultural experience.
              </p>

              <motion.div
                className="mt-10 inline-flex"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Note: scroll={false} keeps the scroll position for smoother feel */}
                <Link
                  href="/bespoke"
                  scroll={false}
                  className="inline-flex items-center border border-white bg-transparent px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:bg-white hover:text-neutral-900"
                >
                  Begin your bespoke journey
                  <span className="ml-3 inline-block text-sm leading-none">
                    →
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
