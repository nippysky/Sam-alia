// components/home-hero.tsx
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="relative w-full">
      <div className="relative h-[85vh] min-h-[460px] w-full">
        {/* Background image – full-width, sharp */}
        <Image
          src="/images/Samalia_Hero.png"
          alt="Sam’Alia – A living design house"
          fill
          priority
          className="object-cover"
        />

        {/* Very light tint overlay, keep image sharp/visible */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          {/* Match header padding: px-5 / sm:px-10 / lg:px-20 */}
          <div className="w-full px-5 sm:px-10 lg:px-20">
            {/* Glassy card */}
            <div className="max-w-xl border border-white/70 bg-white/82 px-8 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-10 sm:py-12">
              <h1 className="font-heading text-3xl leading-tight text-neutral-900 sm:text-4xl md:text-5xl">
                A Living
                <br />
                Design House
              </h1>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-800/90 sm:text-base">
                Where heritage meets modernity across fashion, culture, and
                lifestyle. Each collection is a dialogue between past and
                future, Africa and the world.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {/* Primary CTA – link + arrow, still shadcn Button */}
                <Button
                  asChild
                  className="rounded-none bg-neutral-900 px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white hover:bg-black"
                >
                  <Link href="/collections">
                    <span className="inline-flex items-center gap-3">
                      <span>View Collection</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </Button>

                {/* Secondary CTA – link with animated underline, via Button asChild */}
                <Button
                  asChild
                  variant="ghost"
                  type="button"
                  className="group relative inline-flex items-center bg-transparent px-0 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-900 hover:bg-transparent"
                >
                  <Link href="/about">
                    <span className="relative pb-0.5">
                      Discover Sam’Alia
                      <span
                        className="
                          pointer-events-none absolute inset-x-0 -bottom-0.5 h-px
                          origin-left scale-x-0 bg-neutral-900
                          transition-transform duration-300
                          group-hover:scale-x-100
                        "
                      />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
