"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";

type ShopAttireItem = {
  id: string;
  title: string;
  href: string;
  image: string;
  alt: string;
  ctaLabel?: string;
};

const shopAttires: ShopAttireItem[] = [
  {
    id: "adire-print-gown-1",
    title: "Adire Print Gown",
    href: "/shop/adire-print-gown",
    image: "/images/F3.png",
    alt: "Adire Print Gown",
  },
  {
    id: "african-top-shirt-1",
    title: "African Top Shirt",
    href: "/shop/african-top-shirt",
    image: "/images/F2.png",
    alt: "African Top Shirt",
  },
  {
    id: "african-print-pants-1",
    title: "African Print Pants",
    href: "/shop/african-print-pants",
    image: "/images/F1.png",
    alt: "African Print Pants",
  },
  {
    id: "adire-print-gown-2",
    title: "Adire Print Gown",
    href: "/shop/adire-print-gown",
    image: "/images/F3.png",
    alt: "Adire Print Gown",
  },
  {
    id: "african-top-shirt-2",
    title: "African Top Shirt",
    href: "/shop/african-top-shirt",
    image: "/images/F2.png",
    alt: "African Top Shirt",
  },
  {
    id: "african-print-pants-2",
    title: "African Print Pants",
    href: "/shop/african-print-pants",
    image: "/images/F1.png",
    alt: "African Print Pants",
  },
  // you can add more items freely; the section will clamp per breakpoint
];

export function ShopAttiresSection() {
  /**
   * We render 3 invisible “breakpoint probes”.
   * Exactly ONE will be visible at a time, and we infer the max items.
   */
  const maxItems = useMemo(() => {
    // default (mobile/sm): 6 items (2 per row => 3 full rows)
    return 6;
  }, []);

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto w-full px-5 sm:px-10 lg:px-16 xl:px-20">
        {/* Title */}
        <div className="flex justify-center">
          <h2 className="font-serif text-4xl leading-[0.95] tracking-tight text-neutral-900 sm:text-5xl">
            SHOP ATTIRES
          </h2>
        </div>

        {/* CTA buttons (brand conventional) */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/shop/bespoke"
            className="
              inline-flex items-center justify-center gap-2
              border border-neutral-900 bg-neutral-900 px-6 py-2.5
              text-[11px] font-medium uppercase tracking-[0.22em] text-white
              transition-colors hover:bg-black
            "
          >
           View Bespoke Attires
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <Link
            href="/shop/ready-to-wear"
            className="
              inline-flex items-center justify-center gap-2
              border border-neutral-900/80 bg-white px-6 py-2.5
              text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-900
              transition-colors hover:bg-neutral-900 hover:text-white
            "
          >
            Shop Ready-To-Wear
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Breakpoint probes (no layout impact) */}
        <BreakpointLimiter
          items={shopAttires}
          render={(items) => (
            <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {items.map((item) => (
                <ShopAttireCard key={item.id} item={item} />
              ))}
            </div>
          )}
        />
      </div>
    </section>
  );
}

/**
 * This component decides how many items to show per breakpoint:
 * - xl: show 5 (exactly 1 row of 5)
 * - lg: show 6 (2 rows of 3)
 * - sm and down: show 6 (3 rows of 2)
 *
 * It uses CSS-only breakpoint visibility; no window listeners.
 */
function BreakpointLimiter({
  items,
  render,
}: {
  items: ShopAttireItem[];
  render: (items: ShopAttireItem[]) => React.ReactNode;
}) {
  // We compute all three slices once
  const sliceXL = items.slice(0, 5);
  const sliceLG = items.slice(0, 6);
  const sliceSM = items.slice(0, 6);

  return (
    <>
      {/* xl and up */}
      <div className="hidden xl:block">{render(sliceXL)}</div>

      {/* lg to <xl */}
      <div className="hidden lg:block xl:hidden">{render(sliceLG)}</div>

      {/* <lg (mobile + sm + md) */}
      <div className="block lg:hidden">{render(sliceSM)}</div>
    </>
  );
}

function ShopAttireCard({ item }: { item: ShopAttireItem }) {
  return (
    <article className="group">
      <Link href={item.href} className="block">
        <div className="relative w-full overflow-hidden bg-neutral-100">
          <div className="relative w-full pt-[120%]">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              quality={90}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 18vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <p className="text-sm font-medium text-neutral-900">{item.title}</p>

          <span
            className="
              inline-flex w-fit items-center
              border border-neutral-900/70 bg-white
              px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-900
              transition-colors duration-200
              group-hover:bg-neutral-900 group-hover:text-white
            "
          >
            {item.ctaLabel ?? "BUY OUTFIT"}
          </span>
        </div>
      </Link>
    </article>
  );
}
