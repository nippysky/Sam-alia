// components/shared/landing-page/SamaliaTriptychSection.tsx
"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
  hover: {
    y: -6,
    scale: 1.01,
    transition: { duration: 0.35 },
  },
};

export default function SamaliaTriptychSection() {
  return (
    <section className="w-full bg-[#f5f4f2] py-16 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:px-6 md:flex-row md:items-start md:justify-between md:gap-12 lg:gap-20">
        {/* LEFT COLUMN */}
        <div className="flex flex-col md:w-1/3">
          <motion.div
            className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md"
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
            transition={{ delay: 0.05 }}
          >
            <Link
              href="/shop/ready-to-wear"
              aria-label="Go to Ready to Wear"
              className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            >
              <div className="block w-full border-18 border-white bg-white shadow-sm">
                <Image
                  src="/images/T1.png"
                  alt="Ready to wear look"
                  width={640}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          </motion.div>

          {/* Label beneath left image (mobile centered, md+ left) */}
          <div className="mt-8 flex justify-center md:justify-start">
            <Link
              href="/shop/ready-to-wear"
              className="group inline-flex flex-col items-center md:items-start gap-3 text-[11px] tracking-[0.26em] text-neutral-900 sm:text-xs"
            >
              <span className="uppercase">Ready to wear</span>
              <span className="h-px w-24 origin-left scale-x-0 bg-neutral-900 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div className="flex flex-col md:w-1/3 md:pt-10">
          {/* On mobile: image first, label below. On md+: label above, image below. */}
          <motion.div
            className="order-1 md:order-2 relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md"
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
            transition={{ delay: 0.15 }}
          >
            <Link
              href="/shop/bespoke"
              aria-label="Go to Bespoke"
              className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            >
              <div className="block w-full border-18 border-white bg-white shadow-sm">
                <Image
                  src="/images/T2.png"
                  alt="Elevated everyday look"
                  width={640}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          </motion.div>

          {/* Label */}
          <div className="order-2 md:order-1 mb-8 mt-8 md:mb-10 md:mt-0 flex justify-center">
            <Link
              href="/shop/bespoke"
              className="group inline-flex flex-col items-center gap-3 text-[11px] tracking-[0.26em] text-neutral-900 sm:text-xs"
            >
              <span className="uppercase">Elevated everyday</span>
              <span className="h-px w-24 origin-left scale-x-0 bg-neutral-900 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col md:w-1/3">
          {/* On mobile: image then label; on md+: label above, image below, right-aligned */}
          <motion.div
            className="order-1 md:order-2 relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md"
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
            transition={{ delay: 0.25 }}
          >
            <Link
              href="/craft-legacy"
              aria-label="Go to Craft & Legacy"
              className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            >
              <div className="block w-full border-18 border-white bg-white shadow-sm">
                <Image
                  src="/images/T3.png"
                  alt="Craft and legacy detail"
                  width={640}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          </motion.div>

          {/* Label (mobile centered, md+ right) */}
          <div className="order-2 md:order-1 mb-0 mt-8 md:mb-10 md:mt-0 flex justify-center md:justify-end">
            <Link
              href="/craft-legacy"
              className="group inline-flex flex-col items-center md:items-end gap-3 text-[11px] tracking-[0.26em] text-neutral-900 sm:text-xs"
            >
              <span className="uppercase md:text-right">Craft &amp; legacy</span>
              <span className="h-px w-24 origin-left scale-x-0 bg-neutral-900 transition-transform duration-300 ease-out group-hover:scale-x-100 md:origin-right" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
