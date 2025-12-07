// components/shared/landing-page/LegacyCraftSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Swap these with your real asset paths
const LEGACY_BG = "/images/legacy-bg.png";
const LEGACY_LEFT = "/images/legacy-l.png";
const LEGACY_RIGHT = "/images/legacy-r.png";

export function LegacyCraftSection() {
  return (
    <section className="relative w-full bg-black text-white">
      {/* Background image + dark overlay */}
      <div className="relative h-[420px] sm:h-[480px] md:h-[580px] lg:h-[660px]">
        <Image
          src={LEGACY_BG}
          alt="Sam’Alia legacy and craft background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <motion.div
          className="relative z-10 flex h-full items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {/* Match hero horizontal padding */}
          <div className="w-full px-5 sm:px-10 lg:px-20">
            <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-20">
              {/* LEFT CARD – hidden on mobile */}
              <div className="order-1 hidden md:flex justify-center md:justify-start">
                <motion.div
                  className="w-36 sm:w-40 md:w-52 lg:w-60"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="block w-full border-18 border-white bg-white shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
                    <div className="relative w-full overflow-hidden pt-[120%]">
                      <Image
                        src={LEGACY_LEFT}
                        alt="Sam’Alia legacy detail"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* CENTER TEXT + BUTTON */}
              <div className="order-2 max-w-2xl text-center md:order-2 md:text-center">
                <h2 className="font-heading text-3xl tracking-[0.18em] text-white sm:text-4xl md:text-[42px] lg:text-[48px]">
                  LEGACY &amp; CRAFT
                </h2>

                <p className="mt-6 text-sm leading-relaxed text-white/85 sm:text-[15px] md:text-[16px] md:leading-relaxed">
                  Every creation at Sam’Alia begins with a memory and ends with
                  a moment. Our legacy is written not only in fabrics and
                  threads, but in the lives, celebrations, and milestones of
                  those who wear our pieces.
                </p>

                <div className="mt-9 flex justify-center">
                  <Link
                    href="/legacy"
                    className="inline-flex items-center border border-white bg-transparent px-7 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-white transition-colors duration-200 hover:bg-white hover:text-neutral-900"
                  >
                    Take a tour
                  </Link>
                </div>
              </div>

              {/* RIGHT CARD – hidden on mobile */}
              <div className="order-3 hidden md:flex justify-center md:justify-end">
                <motion.div
                  className="w-36 sm:w-40 md:w-52 lg:w-60"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="block w-full border-18 border-white bg-white shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
                    <div className="relative w-full overflow-hidden pt-[120%]">
                      <Image
                        src={LEGACY_RIGHT}
                        alt="Sam’Alia portrait"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
