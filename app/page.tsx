import { HomeHero } from "@/components/shared/home-hero";
import { SiteHeader } from "@/components/shared/site-header";

// app/page.tsx
export default function Home() {
  return (
    <> 
<SiteHeader/>
    <main className="min-h-screen bg-background text-foreground">
      <HomeHero />
    </main>
    </>
  );
}
