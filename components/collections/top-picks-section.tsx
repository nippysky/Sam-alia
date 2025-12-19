import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type TopPick = {
  title: string;
  subtitle: string;
  body: string;
  bullets: { label: string; text: string }[];
  ctaLabel: string;
  ctaHref: string;
  heroImage: string;
  cardImage: string;
};

const topPick: TopPick = {
  title: "THE GAZELLE ATTIRE",
  subtitle:
    "Displayed against a clean contrast, the Gazelle Attire is more than a garment—it's a compositional culture, memory, and style.",
  body:
    "Designed for intentional wear: it’s modern, grounded, and crafted to feel like you belong in the room before you speak.",
  bullets: [
    {
      label: "Story",
      text:
        "Inspired by cultural heritage reimagined, this piece reflects resilience, contemporary identity, and modernity. It’s not only clothing—it’s a statement you carry.",
    },
    {
      label: "Craftsmanship",
      text:
        "A closer gaze reveals hand-finished detailing, deliberate fabric choices, and a silhouette built to move with presence—never to hide.",
    },
  ],
  ctaLabel: "Talk an order",
  ctaHref: "/inquiry/gazelle-attire",
  heroImage: "/images/Col_TopPicks.svg",
  cardImage: "/images/Col_TopPCard.svg",
};

export function TopPicksSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-x-clip">
      {/* Eyebrow + spacing (kept in brand container) */}
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-16 xl:px-20">
        <div className="flex justify-center">
          <h1 className="anim-fade-up anim-delay-1 font-serif text-4xl leading-[0.95] tracking-tight text-neutral-900 sm:text-5xl">
            TOP PICKS
          </h1>
        </div>
      </div>

      {/* HERO (FULL BLEED) */}
      <div className="mt-6 anim-fade-up anim-delay-2">
        <div className="relative w-full overflow-hidden bg-neutral-100">
          {/* Use aspect ratio to control height like Figma */}
          <div className="relative w-full aspect-16/6 sm:aspect-16/5 lg:aspect-16/4">
            <Image
              src={topPick.heroImage}
              alt="Top picks hero"
              fill
              priority={false}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-black/0 to-black/0" />
          </div>
        </div>
      </div>

      {/* Bottom content (back in container) */}
      <div className="mx-auto mt-10 w-full max-w-7xl px-5 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* Left media card */}
          <div className="anim-fade-up anim-delay-3">
            <div className="overflow-hidden bg-white shadow-[0_18px_55px_-35px_rgba(0,0,0,0.35)]">
              <div className="relative w-full overflow-hidden bg-neutral-100">
                <div className="relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3">
                  <Image
                    src={topPick.cardImage}
                    alt={topPick.title}
                    fill
                    sizes="(max-width: 1024px) 92vw, 38vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right editorial copy */}
          <div className="anim-fade-up anim-delay-4">
            {/* Brand-consistent heading style */}
            <h3 className="font-heading text-2xl tracking-[0.18em] text-neutral-900 sm:text-[26px]">
              {topPick.title}
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-neutral-700 sm:text-base">
              {topPick.subtitle}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-neutral-700 sm:text-base">
              {topPick.body}
            </p>

            <div className="mt-8 space-y-7">
              {topPick.bullets.map((b) => (
                <div key={b.label}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-900">
                    {b.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700 sm:text-base">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href={topPick.ctaHref}
                className="inline-flex items-center gap-2 border border-neutral-900/80 px-5 py-2 text-[11px] uppercase tracking-[0.22em] text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
              >
                Explore this pick <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
