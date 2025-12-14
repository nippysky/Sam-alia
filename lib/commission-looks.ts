// lib/commission-looks.ts
export type CommissionLook = {
  slug: string;
  title: string;
  image: string;        // hero image
  gallery?: string[];   // optional (for later use)
};

export const COMMISSION_LOOKS: CommissionLook[] = [
  {
    slug: "retro-prince",
    title: "The Retro Prince",
    image: "/images/F1.png",
    gallery: ["/images/F1.png", "/images/F2.png", "/images/F3.png"],
  },
  {
    slug: "adire-print-gown",
    title: "Adire Print Gown",
    image: "/images/F2.png",
    gallery: ["/images/F2.png", "/images/F1.png", "/images/F3.png"],
  },
  {
    slug: "african-top-shirt",
    title: "African Top Shirt",
    image: "/images/F3.png",
    gallery: ["/images/F3.png", "/images/F2.png", "/images/F1.png"],
  },
  {
    slug: "look-04",
    title: "Lookbook 04",
    image: "/images/LB2.png",
    gallery: ["/images/LB2.png", "/images/LB3.png", "/images/F1.png"],
  },
  {
    slug: "look-05",
    title: "Lookbook 05",
    image: "/images/LB3.png",
    gallery: ["/images/LB3.png", "/images/LB2.png", "/images/F2.png"],
  },
];

export function getCommissionLook(slug: string) {
  return COMMISSION_LOOKS.find((l) => l.slug === slug) ?? null;
}
