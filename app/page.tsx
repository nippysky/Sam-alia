import { HomeHero } from "@/components/shared/home-hero";
import { AboutHouseSection } from "@/components/shared/landing-page/AboutHouseSection";
import { BespokeServiceSection } from "@/components/shared/landing-page/BespokeServiceSection";
import { DigitalLookbookSection } from "@/components/shared/landing-page/DigitalLookbookSection";
import { FeaturedCollectionsSection } from "@/components/shared/landing-page/FeaturedCollectionsSection";
import { LegacyCraftSection } from "@/components/shared/landing-page/LegacyCraftSection";
import { SamaliaJournalSection } from "@/components/shared/landing-page/SamaliaJournalSection";
import SamaliaTriptychSection from "@/components/shared/landing-page/SamaliaTriptychSection";
import { SiteHeader } from "@/components/shared/site-header";

// app/page.tsx
export default function Home() {
  return (
    <> 
<SiteHeader/>
    <main className="min-h-screen bg-background text-foreground">
      <HomeHero />
      <SamaliaTriptychSection />
      <FeaturedCollectionsSection />
      <DigitalLookbookSection />
      <LegacyCraftSection />
      <SamaliaJournalSection />
      <AboutHouseSection />
      <BespokeServiceSection />
    </main>
    </>
  );
}
