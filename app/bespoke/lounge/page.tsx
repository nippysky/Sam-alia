// app/bespoke/lounge/page.tsx
import { BespokeAreaPage } from "@/components/bespoke/BespokeAreaPage";

export default function LoungePage() {
  return (
    <BespokeAreaPage
      config={{
        id: "lounge",
        bgImage: "/images/BespokeHero.svg", 
        eyebrow: "Lounge Section",
        title: "The Lounge Section",
        description:
          "A warm, intimate space where fittings begin with conversation. Settle into the lounge as we understand your lifestyle, preferences, and the stories you want your pieces to tell.",
        ctaLabel: "Book a consultation",
        ctaHref: "/appointments?area=lounge",
        videoUrl: "https://youtu.be/fNzLGXkXjpQ?si=7yw3tNjDeLYnRISx",
      }}
    />
  );
}
