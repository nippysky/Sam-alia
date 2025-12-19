// components/shared/landing-page/SamaliaJournalSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

// Easy-to-swap image paths
const JOURNAL_HOUSE_NOTES = "/images/J1.svg";
const JOURNAL_STORIES = "/images/J2.svg";
const JOURNAL_VISUALS = "/images/J3.svg";

export function SamaliaJournalSection() {
  return (
    <section className="w-full bg-[#f5f4f2] py-20 md:py-24">
      <div className="mx-auto max-w-[1920px] px-5 sm:px-10 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:items-center">
          {/* LEFT: Heading + Copy */}
          <div className="max-w-md lg:h-full flex flex-col justify-center lg:py-8">
            <h2 className="font-heading text-3xl leading-tight text-neutral-900 sm:text-4xl lg:text-[42px]">
              <span>Sam’Alia</span>
              <br />
              <span>Journal</span>
            </h2>

            <p className="mt-6 text-sm leading-relaxed text-neutral-800/90 sm:text-[15px]">
              At Sam’Alia, fashion is more than fabric—it’s a story woven with
              culture, identity, and expression. Our world extends beyond
              collections into a rich archive of conversations, perspectives,
              and visuals that celebrate African creativity.
            </p>

            <div className="mt-9">
              <Link
                href="/journal"
                className="inline-flex items-center border border-neutral-900 bg-transparent px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-900 transition-colors duration-200 hover:bg-neutral-900 hover:text-white"
              >
                Read more
                <span className="ml-3 inline-block text-sm leading-none">→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT: Collage (NOT LINKS) */}
          <div className="grid gap-4 md:gap-5 lg:gap-6">
            {/* Top row: 2 cards */}
            <div className="grid grid-cols-2 gap-4 md:gap-5 lg:gap-6">
              <JournalCard
                image={JOURNAL_HOUSE_NOTES}
                alt="House Notes – conversations and reflections from Sam’Alia"
                label="House Notes"
                ratioClass="pt-[56%]"
              />

              <JournalCard
                image={JOURNAL_STORIES}
                alt="Stories – narratives behind the pieces"
                label="Stories"
                ratioClass="pt-[56%]"
              />
            </div>

            {/* Bottom: wide VISUALS card – reduced height */}
            <JournalCard
              image={JOURNAL_VISUALS}
              alt="Visuals – imagery from the Sam’Alia world"
              label="Visuals"
              ratioClass="pt-[46%] sm:pt-[50%] lg:pt-[45%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalCard({
  image,
  alt,
  label,
  ratioClass,
}: {
  image: string;
  alt: string;
  label: string;
  ratioClass: string;
}) {
  return (
    <div
      className="
        group relative block overflow-hidden bg-neutral-200
        select-none
      "
      role="img"
      aria-label={label}
    >
      <div className={["relative w-full", ratioClass].join(" ")}>
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          draggable={false}
        />

        {/* subtle gradient for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white">
          {label}
        </p>
      </div>
    </div>
  );
}
