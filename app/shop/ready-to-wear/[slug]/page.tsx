// app/shop/ready-to-wear/[slug]/page.tsx
import Link from "next/link";
import { SiteHeader } from "@/components/shared/site-header";
import { getRTWProduct, getRelatedRTWProducts, formatNgn } from "@/lib/ready-to-wear";
import { RelatedProducts } from "@/components/shop/ready-to-wear/related-products";
import { RTWProductGallery } from "@/components/shop/ready-to-wear/rtw-product-gallery";
import { RTWVariantPanel } from "@/components/shop/ready-to-wear/rtw-variant-panel";
import { BespokeServiceSection } from "@/components/shared/landing-page/BespokeServiceSection";


export default async function ReadyToWearProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ✅ Accept any slug for now (frontend demo mode)
  const product = getRTWProduct(slug);
  const related = getRelatedRTWProducts(product.slug);

  return (
    <main className="w-full bg-white text-neutral-900">
      <SiteHeader variant="solid" />

      <div className="mx-auto w-full max-w-[1200px] px-5 pb-14 pt-6 sm:px-10">
        {/* Breadcrumb row like screenshot */}
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-neutral-600">
          <Link href="/shop/ready-to-wear" className="hover:text-neutral-900">
            ← Back
          </Link>
          <span className="text-neutral-300">/</span>
          <Link href="/collections" className="hover:text-neutral-900">
            Collections
          </Link>
          <span className="text-neutral-300">/</span>
          <Link href="/shop/ready-to-wear" className="hover:text-neutral-900">
            Ready-to-wear
          </Link>
        </div>

        {/* Main layout */}
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* Left: gallery */}
          <section className="anim-fade-up anim-delay-1">
            <RTWProductGallery title={product.title} images={product.images} />
          </section>

          {/* Right: details */}
          <section className="anim-fade-up anim-delay-2">
            <div className="max-w-xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">
                {product.categoryLabel ?? "READY-TO-WEAR"}
              </p>

              <h1 className="mt-3 font-heading text-3xl tracking-[0.06em] sm:text-4xl">
                {product.title}
              </h1>

              <p className="mt-5 text-sm leading-relaxed text-neutral-600">
                {product.description}
              </p>

              <RTWVariantPanel sizes={product.sizes} priceLabel={formatNgn(product.priceNgn)} />
            </div>
          </section>
        </div>
      </div>

      {/* Related pieces */}
      <RelatedProducts items={related} />
      <BespokeServiceSection />
    </main>
  );
}
