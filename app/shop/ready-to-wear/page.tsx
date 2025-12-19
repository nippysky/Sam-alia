import { BespokeServiceSection } from "@/components/shared/landing-page/BespokeServiceSection";
import { SiteHeader } from "@/components/shared/site-header";
import { ReadyToWearAttiresShowcase } from "@/components/shop/ready-to-wear/ready-to-wear-attires-showcase";
import { ReadyToWearHero } from "@/components/shop/ready-to-wear/ready-to-wear-hero";


export default function ReadyToWearShopPage() {
  return (
    <main className="bg-white">
      <SiteHeader variant="solid" />
      <ReadyToWearHero />
      <ReadyToWearAttiresShowcase />
      <BespokeServiceSection />
    </main>
  );
}
