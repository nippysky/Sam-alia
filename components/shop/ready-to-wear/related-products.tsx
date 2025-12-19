// components/shop/ready-to-wear/related-products.tsx
import Image from "next/image";
import Link from "next/link";
import type { RTWProduct } from "@/lib/ready-to-wear";

export function RelatedProducts({ items }: { items: RTWProduct[] }) {
  return (
    <section className="w-full bg-[#F2F0EA] py-14 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-10">
        <h2 className="font-heading text-3xl tracking-widest text-neutral-900 sm:text-4xl">
          Related Pieces
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <RelatedCard key={p.slug} item={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedCard({ item }: { item: RTWProduct }) {
  const href = `/shop/ready-to-wear/${item.slug}`;
  const image = item.images?.[0] ?? "/images/F1.png";

  return (
    <article className="group">
      <Link
        href={href}
        className="
          block outline-none
          focus-visible:ring-2 focus-visible:ring-neutral-900/40
          focus-visible:ring-offset-4 focus-visible:ring-offset-[#F2F0EA]
        "
        aria-label={`View ${item.title}`}
      >
        <div
          className="
            p-4 transition-all duration-300 ease-out bg-transparent
            group-hover:bg-white group-hover:shadow-[0_22px_60px_-40px_rgba(0,0,0,0.30)] group-hover:-translate-y-0.5
          "
        >
          <div className="relative w-full overflow-hidden bg-neutral-100">
            <div className="relative w-full pt-[120%]">
              <Image
                src={image}
                alt={item.title}
                fill
                quality={90}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <p className="text-sm font-medium text-neutral-900">{item.title}</p>

            <span
              className="
                inline-flex w-fit items-center gap-2
                border border-neutral-900/60 bg-transparent
                px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-900
                transition-colors duration-200
                group-hover:bg-white
              "
            >
              View <span className="opacity-60">👁</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
