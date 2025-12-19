// app/collections/page.tsx
import { SiteHeader } from "@/components/shared/site-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

import { CollectionsHero } from "@/components/collections/collections-hero";
import { LatestAttiresSection } from "@/components/collections/latest-attires-section";
import { OurCollectionsSection } from "@/components/collections/our-collections-section";
import { TopPicksSection } from "@/components/collections/top-picks-section";
import { ShopAttiresSection } from "@/components/collections/shop-attires-section";
import { BespokeServiceSection } from "@/components/shared/landing-page/BespokeServiceSection";

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-clip">
      <SiteHeader variant="solid" />

      {/* 1) Hero keeps its own intro animation */}
      <CollectionsHero />

      {/* 2) Latest Attires */}
      <ScrollReveal
        as="section"
        variant="fade-up"
        durationMs={780}
        delayMs={0}
        once={false}
        threshold={0.15}
        rootMargin="0px 0px -12% 0px"
      >
        <LatestAttiresSection />
      </ScrollReveal>

      {/* 3) Our Collections */}
      <ScrollReveal
        as="section"
        variant="fade-up"
        durationMs={780}
        delayMs={60}
        once={false}
        threshold={0.15}
        rootMargin="0px 0px -12% 0px"
      >
        <OurCollectionsSection />
      </ScrollReveal>

      {/* 4) Top Picks */}
      <ScrollReveal
        as="section"
        variant="fade-up"
        durationMs={820}
        delayMs={60}
        once={false}
        threshold={0.15}
        rootMargin="0px 0px -12% 0px"
      >
        <TopPicksSection />
      </ScrollReveal>

      {/* 5) Shop Attires */}
      <ScrollReveal
        as="section"
        variant="fade-up"
        durationMs={780}
        delayMs={60}
        once={false}
        threshold={0.15}
        rootMargin="0px 0px -12% 0px"
      >
        <ShopAttiresSection />
      </ScrollReveal>

      {/* 6) Bespoke Service */}
      <ScrollReveal
        as="section"
        variant="fade-up"
        durationMs={780}
        delayMs={60}
        once={false}
        threshold={0.15}
        rootMargin="0px 0px -12% 0px"
      >
        <BespokeServiceSection />
      </ScrollReveal>
    </main>
  );
}
