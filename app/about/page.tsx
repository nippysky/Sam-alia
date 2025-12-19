import { SiteHeader } from "@/components/shared/site-header";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStorySection } from "@/components/about/about-story-section";
import { LatestAttiresSection } from "@/components/collections/latest-attires-section";
import { BespokeServiceSection } from "@/components/shared/landing-page/BespokeServiceSection";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <SiteHeader variant="solid" />
      <AboutHero />
      <AboutStorySection />
      <LatestAttiresSection />
      <BespokeServiceSection />
    </main>
  );
}
