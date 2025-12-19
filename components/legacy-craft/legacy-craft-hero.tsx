import Image from "next/image";
import { LegacyCraftVideo } from "./legacy-craft-video";


export function LegacyCraftHero() {
  // ✅ Change only this and you're done
  const youtubeUrl = "https://www.youtube.com/watch?v=Ulx1vjAREu0";

  return (
    <section className="w-full bg-white pt-10 sm:pt-14 pb-16 md:pb-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-10 lg:px-16 xl:px-20">
        {/* Logo */}
        <div className="flex justify-center anim-fade-up anim-delay-1">
          <Image
            src="/Samalia_Logo.svg"
            alt="Samalia"
            width={84}
            height={84}
            className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20"
            priority
          />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-center font-heading text-4xl leading-[1.05] text-neutral-900 sm:text-5xl md:text-6xl anim-fade-up anim-delay-2">
          OUR LEGACY AND
          <br />
          CRAFTSMANSHIP
        </h1>

        {/* Body */}
        <p className="mx-auto mt-4 max-w-4xl text-center text-xs leading-relaxed text-neutral-600 sm:text-sm md:text-base anim-fade-up anim-delay-3">
          At Sam’Alia, fashion is more than attire—it is memory, heritage, and art carried
          into the present. Our legacy is not measured only in collections but in the
          stories woven into each garment, the hands that craft them, and the communities
          that wear them with pride.
        </p>

        {/* Video */}
        <div className="mt-10 anim-fade-up anim-delay-4">
          <LegacyCraftVideo
            youtubeUrl={youtubeUrl}
            posterImage="/images/Samalia_Hero.png" // <-- replace
            title="Legacy & Craft"
          />
        </div>
      </div>
    </section>
  );
}
