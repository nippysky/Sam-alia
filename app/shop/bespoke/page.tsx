import { BespokeServiceSection } from "@/components/shared/landing-page/BespokeServiceSection";
import { SiteHeader } from "@/components/shared/site-header";
import { BespokeAttiresShowcase } from "@/components/shop/bespoke/bespoke-attires-showcase";
import { BespokeHero } from "@/components/shop/bespoke/bespoke-hero";


export default function BespokeShopPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-clip">
      <SiteHeader variant="solid" />
      <BespokeHero />
      <BespokeAttiresShowcase />
      <BespokeServiceSection />
    </main>
  );
}
