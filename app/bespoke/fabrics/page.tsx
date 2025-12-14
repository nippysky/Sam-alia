// app/bespoke/fabrics/page.tsx
import { BespokeAreaPage } from "@/components/bespoke/BespokeAreaPage";

export default function FabricsPage() {
  return (
    <BespokeAreaPage
      config={{
        id: "fabrics",
        bgImage: "/images/BespokeHero.svg",
        eyebrow: "Fabrics",
        title: "The Fabrics Library",
        description:
          "Shelves of curated textiles from across the continent: hand-woven, jacquard, and contemporary blends. Here we explore texture, drape, and colour stories for your commission.",
        ctaLabel: "Explore fabrics with us",
        ctaHref: "/appointments?area=fabrics",
        videoUrl: "https://youtu.be/fNzLGXkXjpQ?si=7yw3tNjDeLYnRISx",
      }}
    />
  );
}
