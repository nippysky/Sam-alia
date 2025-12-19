import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image (full-bleed) */}
      <div className="relative h-[72vh] min-h-[560px] w-full">
        <Image
          src="/images/AboutHero.svg"
          alt="About Samalia"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Soft dark overlay for readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Glass panel */}
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
          <div
            className="
              w-full max-w-5xl
              rounded-none
              border border-white/20
              bg-white/10
              backdrop-blur-xl
              shadow-[0_40px_140px_-80px_rgba(0,0,0,0.7)]
              anim-fade-up
            "
          >
            <div className="px-6 py-12 sm:px-10 sm:py-14 md:px-14 md:py-16">
              {/* Logo */}
              <div className="flex justify-center">
                <Image
                  src="/Samalia_Logo.svg"
                  alt="Samalia"
                  width={84}
                  height={84}
                  className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20"
                />
              </div>

              {/* Heading */}
              <h1 className="mt-6 text-center font-heading text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
                ABOUT SAM’ALIA
              </h1>

              {/* Body */}
              <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-white/90 sm:text-base">
                At Sam’Alia, fashion is not just an adornment—it is heritage made visible,
                artistry made tangible, and identity made timeless. We are a house where
                culture and couture meet, creating garments that carry meaning far beyond
                the runway.
              </p>

              {/* CTA */}
              <div className="mt-8 flex justify-center">
                <Link
                  href="/collections"
                  className="
                    inline-flex items-center gap-3
                    border border-white/60 bg-white/10 px-6 py-3
                    text-[11px] font-medium uppercase tracking-[0.22em] text-white
                    transition-colors duration-200
                    hover:bg-white hover:text-neutral-900
                  "
                >
                  Shop Collection
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle top fade like the screenshot */}
        <div className="pointer-events-none absolute top-0 h-16 w-full bg-linear-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
