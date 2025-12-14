// app/lookbook/page.tsx
import { LookbookShowcaseCarousel } from "@/components/lookbook/lookbook-showcase-carousel";
import { SiteHeader } from "@/components/shared/site-header";


export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <SiteHeader variant="transparent" />

      <main className="relative w-full h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] overflow-hidden">
        <LookbookShowcaseCarousel />
      </main>
    </div>
  );
}
