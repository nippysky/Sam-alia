import Image from "next/image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

type LegacyWovenContent = {
  title: string;
  p1: string;
  p2: string;
  imageTop: { src: string; alt: string };
  imageBottom: { src: string; alt: string };
};

const content: LegacyWovenContent = {
  title: "A LEGACY WOVEN IN CULTURE",
  p1:
    "Sam’Alia was founded on the belief that fashion can honor where we come from while shaping where we are going. Each piece is a living archive—rooted in African heritage, refined with modern elegance, and designed to endure beyond seasons. Our legacy is not fast—it is timeless.",
  p2:
    "From honorary images of our clients and muses adorned in Sam’Alia pieces, to moments of celebration captured across continents, the house has grown into a cultural emblem: a name that represents dignity, artistry, and unapologetic African identity.",
  imageTop: { src: "/images/LegW1.svg", alt: "Tailored fabric detail" },
  imageBottom: { src: "/images/LegW2.svg", alt: "Samalia muse portrait" },
};

export function LegacyWovenSection() {
  return (
    <section className="w-full bg-[#F6F4EF] py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* LEFT: images */}
          <ScrollReveal variant="slide-right" delayMs={0} className="space-y-8">
            <MediaCard
              src={content.imageTop.src}
              alt={content.imageTop.alt}
              ratio="pt-[56%]"
            />
            <MediaCard
              src={content.imageBottom.src}
              alt={content.imageBottom.alt}
              ratio="pt-[72%]"
            />
          </ScrollReveal>

          {/* RIGHT: copy */}
          <ScrollReveal variant="slide-left" delayMs={60}>
            <h2 className="font-heading text-2xl tracking-[0.18em] text-neutral-900 sm:text-3xl md:text-4xl">
              {content.title}
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-700 sm:text-base">
              {content.p1}
            </p>

            <div className="mt-7 h-px w-full max-w-2xl bg-neutral-900/35" />

            <p className="mt-7 max-w-2xl text-sm leading-relaxed text-neutral-700 sm:text-base">
              {content.p2}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function MediaCard({
  src,
  alt,
  ratio,
}: {
  src: string;
  alt: string;
  ratio: string;
}) {
  return (
    <div className="overflow-hidden bg-white shadow-[0_18px_60px_-40px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
      <div className={["relative w-full", ratio].join(" ")}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 92vw, 42vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
