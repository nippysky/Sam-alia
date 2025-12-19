import { SiteHeader } from "@/components/shared/site-header";
import { LegacyCraftHero } from "@/components/legacy-craft/legacy-craft-hero";
import { HouseNotesSection } from "@/components/journal/house-notes-section";
import { BespokeServiceSection } from "@/components/shared/landing-page/BespokeServiceSection";
import { VisualArchiveSection } from "@/components/journal/visual-archive-section";

export default function JournalPage() {
  return (
    <main className="bg-white">
      <SiteHeader variant="solid" />
      <LegacyCraftHero />
      <HouseNotesSection />
      <VisualArchiveSection />
      <BespokeServiceSection />
    </main>
  );
}
