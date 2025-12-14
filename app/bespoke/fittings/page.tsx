// app/bespoke/fittings/page.tsx
import { BespokeAreaPage } from "@/components/bespoke/BespokeAreaPage";

export default function FittingsPage() {
  return (
    <BespokeAreaPage
      config={{
        id: "fittings",
        bgImage: "/images/BespokeHero.svg",
        eyebrow: "Fitting Room",
        title: "The Fittings Section",
        description:
          "In the fitting room, every seam is refined. Our tailors sculpt each garment on your body, adjusting proportions and details until the piece feels inevitable.",
        ctaLabel: "Schedule a fitting",
        ctaHref: "/appointments?area=fittings",
        videoUrl: "https://youtu.be/fNzLGXkXjpQ?si=7yw3tNjDeLYnRISx",
      }}
    />
  );
}
