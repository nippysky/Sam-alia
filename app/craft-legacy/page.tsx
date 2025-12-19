import { SiteHeader } from "@/components/shared/site-header";
import { LegacyCraftHero } from "@/components/legacy-craft/legacy-craft-hero";
import { LegacyWovenSection } from "@/components/legacy-craft/legacy-woven-section";
import { ArtOfCraftSection } from "@/components/legacy-craft/art-of-craft-section";
import { HouseOfCommunitySection } from "@/components/legacy-craft/house-of-community-section";
import { BespokeServiceSection } from "@/components/shared/landing-page/BespokeServiceSection";
import { LatestAttiresSection } from "@/components/collections/latest-attires-section";

export default function LegacyAndCraftPage() {
  return (
    <main className="bg-white">
      <SiteHeader variant="solid" />
      <LegacyCraftHero />
      <LegacyWovenSection />
      <ArtOfCraftSection />
      <HouseOfCommunitySection />
     <LatestAttiresSection />
      <BespokeServiceSection />
    </main>
  );
}
