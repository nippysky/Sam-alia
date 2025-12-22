import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CollectionCard = {
  id: string;
  label: string;
  href: string;
  image: string;
  alt: string;
};

const collectionCards: CollectionCard[] = [
  {
    id: "bespoke",
    label: "BESPOKE",
    href: "/shop/bespoke",
    image: "/images/Col_Bespoke.svg",
    alt: "Bespoke collection",
  },
  {
    id: "ready",
    label: "READY TO WEAR",
    href: "/shop/ready-to-wear",
    image: "/images/Col_RTW.svg",
    alt: "Ready to wear collection",
  },
];

export function OurCollectionsSection() {
  return (
    <section className="w-full bg-[#F6F4EF] py-16 md:py-32 lg:py-40">
      {/* Wider container */}
      <div className="mx-auto w-full  px-5 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Left copy */}
          <div>
            <h2 className="font-serif text-4xl leading-[0.95] tracking-tight text-neutral-900 sm:text-5xl">
              OUR
              <br />
              COLLECTIONS
            </h2>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-700 sm:text-base">
              Neque volutpat sed quisque ut sed porttitor. Etiam purus egestas
              semper pulvinar nulla mauris non metus. Vitae etiam sit egestas
              venenatis. Eget sit massa sit tortor placerat augue mi porttitor
              eget. Sit tincidunt pharetra.
            </p>

            <div className="mt-8">
              <Link
                href="/collections"
                className="inline-flex items-center gap-3 border border-neutral-900/80 bg-transparent px-5 py-2 text-[11px] uppercase tracking-[0.22em] text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
              >
                View All Collections
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right: 2 equal cards side-by-side */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <CollectionImageCard {...collectionCards[0]} />
            <CollectionImageCard {...collectionCards[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CollectionImageCard({ label, href, image, alt }: CollectionCard) {
  return (
    <Link
      href={href}
      className="
        group relative block w-full overflow-hidden bg-neutral-200
        shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]
      "
      aria-label={label}
    >
      {/* Same aspect ratio for both cards */}
      <div className="relative w-full pt-[120%] sm:pt-[135%] lg:pt-[120%]">
        <Image
          src={image}
          alt={alt}
          fill
          priority={false}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 36vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Soft overlay */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-black/0 to-black/0 opacity-90" />

        {/* Bottom label + arrow */}
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
          <div className="text-[11px] font-medium tracking-[0.28em] text-white drop-shadow-sm">
            {label}
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm transition-all duration-200 group-hover:bg-white group-hover:scale-[1.03]">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
