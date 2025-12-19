import Image from "next/image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

type CommunitySectionContent = {
  title: string;
  p1: string;
  p2: string;
  images: {
    top: { src: string; alt: string };
    bottom: { src: string; alt: string };
  };
};

const content: CommunitySectionContent = {
  title: "A HOUSE OF COMMUNITY",
  p1:
    "Sam’Alia is more than a fashion house—it is a circle of people: artisans, muses, clients, and culture-shapers who carry our work into the world. Together, they form our living legacy, proving that craft is not just what we make but what we share.",
  p2:
    "We see each piece not as clothing but as a vessel of memory, a story passed on, a heritage renewed. This is the essence of Sam’Alia: fashion that honors the past, celebrates the present, and inspires the future.",
  images: {
    top: { src: "/images/LC1.svg", alt: "Community image top" },
    bottom: { src: "/images/LC2.svg", alt: "Community image bottom" },
  },
};

export function HouseOfCommunitySection() {
  return (
    <section className="w-full bg-[#F6F4EF] py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <ScrollReveal variant="slide-right" delayMs={0}>
            <div className="grid gap-6">
              <MediaCard
                src={content.images.top.src}
                alt={content.images.top.alt}
                ratio="pt-[62%]"
              />
              <MediaCard
                src={content.images.bottom.src}
                alt={content.images.bottom.alt}
                ratio="pt-[86%]"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slide-left" delayMs={60}>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-neutral-900">
              {content.title}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-700 sm:text-base">
              {content.p1}
            </p>

            <div className="mt-7 h-px w-full max-w-2xl bg-neutral-900/20" />

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
  ratio = "pt-[70%]",
}: {
  src: string;
  alt: string;
  ratio?: string;
}) {
  return (
    <div className="overflow-hidden bg-white shadow-[0_22px_70px_-50px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
      <div className={["relative w-full", ratio].join(" ")}>
        <Image
          src={src}
          alt={alt}
          fill
          quality={92}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 44vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
