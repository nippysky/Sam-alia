"use client";

import Image from "next/image";

export function CollectionsHero() {
  return (
    <section className="py-10 sm:py-14 overflow-x-clip">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        {/* Samalia Icon */}
        <div className="flex justify-center hero-anim hero-anim--logo">
          <Image
            src="/Samalia_Logo.svg"
            alt="Samalia"
            width={80}
            height={80}
            priority
            className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
        </div>

        {/* Headline */}
        <h1 className="mt-6 text-center font-serif text-3xl leading-tight tracking-wide text-neutral-900 sm:text-4xl md:text-5xl hero-anim hero-anim--title">
          LUXURIOUS AND
          <br />
          CONTEMPORARY APPEAL
          <br />
          – FOR AFRICANS
        </h1>

        {/* Body */}
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-neutral-600 sm:text-base hero-anim hero-anim--body">
          Adipiscing pharetra molestie porttitor phasellus nec massa sed volutpat.
          Convallis volutpat bibendum ultrices consequat aliquet. Bibendum ullamcorper
          montes fermentum nunc iaculis pharetra vitae libero.
        </p>
      </div>

      {/* Full-bleed hero image (ONLY large screens) */}
      <div className="hidden lg:block my-20 w-full hero-anim hero-anim--image">
        {/* No w-screen, no negative margins => no horizontal scroll */}
        <Image
          src="/images/Collections_Hero.svg"
          alt="Samalia collections hero"
          width={2400}
          height={900}
          priority
          className="block h-auto w-full select-none"
          sizes="100vw"
        />
      </div>

      {/* Smooth entrance animation (CSS-only, no client component needed) */}
      <style jsx>{`
        .hero-anim {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: opacity, transform;
        }
        .hero-anim--logo {
          animation-delay: 60ms;
        }
        .hero-anim--title {
          animation-delay: 120ms;
        }
        .hero-anim--body {
          animation-delay: 180ms;
        }
        .hero-anim--image {
          transform: translateY(16px);
          animation-name: fadeUpSoft;
          animation-delay: 220ms;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeUpSoft {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-anim {
            opacity: 1;
            transform: none;
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
