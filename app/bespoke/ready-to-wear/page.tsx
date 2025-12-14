// app/bespoke/ready-to-wear/page.tsx
import { BespokeAreaPage } from "@/components/bespoke/BespokeAreaPage";

export default function ReadyToWearPage() {
  return (
    <BespokeAreaPage
      config={{
        id: "ready-to-wear",
        bgImage: "/images/BespokeHero.svg",
        eyebrow: "Ready-to-Wear",
        title: "Ready-to-Wear Section",
        description:
          "Our curated rail of ready-to-wear pieces offers instant elevation: signature cuts, considered detailing, and silhouettes that carry Sam’Alia’s language into everyday life.",
        ctaLabel: "View ready-to-wear looks",
        ctaHref: "/shop?collection=ready-to-wear",
        videoUrl: "https://youtu.be/fNzLGXkXjpQ?si=7yw3tNjDeLYnRISx",
      }}
    />
  );
}
