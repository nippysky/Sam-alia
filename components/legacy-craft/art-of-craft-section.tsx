import Image from "next/image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

type ArtOfCraftContent = {
  title: string;
  p1: string;
  p2: string;
  images: {
    sketch: { src: string; alt: string };
    garment: { src: string; alt: string };
    fabric: { src: string; alt: string };
  };
};

const content: ArtOfCraftContent = {
  title: "THE ART OF CRAFT",
  p1:
    "Behind every Sam’Alia garment lies a journey of craftsmanship. It begins in sketches, drawn with reverence for tradition and imagination for tomorrow. In our ateliers, artisans translate these visions into form—cutting, stitching, and hand-finishing with precision.",
  p2:
    "From the weight of a fabric to the curve of a seam, nothing is accidental. Every detail is intentional, embodying patience, skill, and pride. Our process is not about mass production—it is about mastery.",
  images: {
    sketch: { src: "/images/AC1.svg", alt: "Design sketches" },
    garment: { src: "/images/AC2.svg", alt: "Garment illustration" },
    fabric: { src: "/images/AC3.svg", alt: "Fabric detail" },
  },
};

export function ArtOfCraftSection() {
  return (
    <section className="w-full bg-[#141414] py-16 md:py-24 text-white">
      <div className="mx-auto w-full px-5 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          {/* LEFT COPY */}
          <ScrollReveal variant="fade-up" delayMs={0}>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white">
              {content.title}
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {content.p1}
            </p>

            <div className="mt-7 h-px w-full max-w-xl bg-white/20" />

            <p className="mt-7 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {content.p2}
            </p>
          </ScrollReveal>

          {/* RIGHT: collage */}
          <ScrollReveal variant="zoom" delayMs={60}>
            {/* Desktop */}
            <div className="hidden lg:grid gap-6">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                  <MediaCard
                    src={content.images.sketch.src}
                    alt={content.images.sketch.alt}
                    ratio="pt-[34%]"
                  />
                </div>

                <div className="col-span-5">
                  <MediaCard
                    src={content.images.garment.src}
                    alt={content.images.garment.alt}
                    ratio="pt-[120%]"
                  />
                </div>

                <div className="col-span-7">
                  <MediaCard
                    src={content.images.fabric.src}
                    alt={content.images.fabric.alt}
                    ratio="pt-[78%]"
                  />
                </div>
              </div>
            </div>

            {/* Mobile/tablet */}
            <div className="grid gap-6 lg:hidden">
              <MediaCard
                src={content.images.sketch.src}
                alt={content.images.sketch.alt}
                ratio="pt-[56%]"
              />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <MediaCard
                  src={content.images.garment.src}
                  alt={content.images.garment.alt}
                  ratio="pt-[110%]"
                />
                <MediaCard
                  src={content.images.fabric.src}
                  alt={content.images.fabric.alt}
                  ratio="pt-[110%]"
                />
              </div>
            </div>
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
    <div className="group relative overflow-hidden bg-white/5 ring-1 ring-white/10 shadow-[0_30px_120px_-80px_rgba(0,0,0,0.9)]">
      <div className={["relative w-full", ratio].join(" ")}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 46vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>

      {/* subtle polish */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/0 to-black/0" />
      </div>
    </div>
  );
}
