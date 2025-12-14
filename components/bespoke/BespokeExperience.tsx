// components/bespoke/BespokeExperience.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/shared/site-header";

const BG = "/images/BespokeHero.svg";
const LOGO = "/Samalia_Logo.svg";

const AREAS = [
  {
    id: "fabric",
    label: "Fabric Library",
    description: "Curated textiles",
    href: "/bespoke/fabrics",
  },
  {
    id: "fittings",
    label: "Fitting Session",
    description: "Precision tailoring",
    href: "/bespoke/fittings",
  },
  {
    id: "lounge",
    label: "Lounge Suite",
    description: "Relaxed consultations",
    href: "/bespoke/lounge",
  },
  {
    id: "ready",
    label: "Ready-to-Wear",
    description: "Timeless wardrobe",
    href: "/bespoke/ready-to-wear",
  },
];

export function BespokeExperience() {
  // Always land at the top when this page loads
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={BG}
          alt="Sam’Alia bespoke fitting room interior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Header */}
      <SiteHeader variant="transparent" />

      {/* Content */}
      <div className="relative z-20 px-5 pb-16 sm:px-10 lg:px-20 lg:pb-24">
        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl flex-col">
          {/* HERO BLOCK — centered on mobile, cinematic on desktop */}
          <section className="flex min-h-[60vh] items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 1.1 }}
              animate={{ opacity: 1, y: -20, scale: 1 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="text-center"
            >
              {/* Logo mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="mx-auto mb-6 h-14 w-14 sm:h-16 sm:w-16"
              >
                <Image
                  src={LOGO}
                  alt="Sam’Alia Mark"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="font-heading text-3xl leading-tight sm:text-4xl lg:text-[42px]"
              >
                Bespoke Service
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-white/85 sm:text-[15px]"
              >
                Step into a dedicated fitting space where custom garments are
                crafted around your story—merging contemporary silhouettes
                with heritage details.
              </motion.p>
            </motion.div>
          </section>

          {/* GLASS CARDS — scrollable on mobile, full grid on desktop */}
          <section className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AREAS.map((item, i) => (
              <Link key={item.id} href={item.href} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.12,
                    ease: "easeOut",
                  }}
                  whileHover={{ translateY: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    group flex h-full flex-col justify-between
                    rounded-xl border border-white/15
                    bg-white/10 px-4 py-4
                    text-left text-white
                    backdrop-blur-lg
                    shadow-[0_18px_60px_rgba(0,0,0,0.55)]
                    hover:bg-white/16 hover:border-white/25
                    transition-all duration-200
                    min-h-[120px]
                  "
                >
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/80">
                      {item.label}
                    </p>
                    <p className="mt-2 text-[11px] leading-relaxed text-white/75">
                      {item.description}
                    </p>
                  </div>

                  <span className="mt-4 inline-flex items-center text-[11px] font-medium uppercase tracking-[0.22em] text-white/70 group-hover:text-white">
                    Explore <span className="ml-2 text-xs">↗</span>
                  </span>
                </motion.div>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
