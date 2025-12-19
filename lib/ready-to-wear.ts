// lib/ready-to-wear.ts
export type RTWProduct = {
  slug: string;
  title: string;
  description: string;
  priceNgn: number;
  images: string[]; // [hero, thumb1, thumb2, ...]
  sizes: string[];
  categoryLabel?: string; // e.g. "READY-TO-WEAR"
};

const baseProducts: RTWProduct[] = [
  {
    slug: "the-gazelle-attire",
    title: "The Gazelle Attire",
    description:
      "Displayed against a clean canvas, The Gazelle Attire is more than a garment—it is a composition of culture, memory, and artistry. Every line, every fold is intentional, created to be admired as much as it is to be worn.",
    priceNgn: 20000,
    images: ["/images/F1.png", "/images/F2.png", "/images/F3.png"],
    sizes: ["XS", "S", "M", "L", "XL"],
    categoryLabel: "READY-TO-WEAR",
  },
  {
    slug: "african-top-shirt",
    title: "African Top Shirt",
    description:
      "A crisp silhouette with bold detail—built for presence. Clean lines, confident texture, and effortless styling from day to night.",
    priceNgn: 18000,
    images: ["/images/F2.png", "/images/F1.png", "/images/F3.png"],
    sizes: ["S", "M", "L", "XL"],
    categoryLabel: "READY-TO-WEAR",
  },
  {
    slug: "african-print-pants",
    title: "African Print Pants",
    description:
      "Cut for movement with a refined finish. A statement piece grounded in comfort and unmistakable character.",
    priceNgn: 22000,
    images: ["/images/F3.png", "/images/F1.png", "/images/F2.png"],
    sizes: ["S", "M", "L", "XL"],
    categoryLabel: "READY-TO-WEAR",
  },
  {
    slug: "adire-print-gown",
    title: "Adire Print Gown",
    description:
      "An elevated drape with cultural texture—designed to hold attention while staying timeless.",
    priceNgn: 30000,
    images: ["/images/F1.png", "/images/F3.png", "/images/F2.png"],
    sizes: ["XS", "S", "M", "L"],
    categoryLabel: "READY-TO-WEAR",
  },
];

function titleFromSlug(slug: string) {
  const clean = decodeURIComponent(slug || "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return "Ready-to-wear piece";
  return clean.replace(/\b\w/g, (c) => c.toUpperCase());
}

function hashToIndex(str: string, mod: number) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % mod;
}

/** ✅ For now: accept ANY slug and still render a nice product */
export function getRTWProduct(slug: string): RTWProduct {
  const found = baseProducts.find((p) => p.slug === slug);
  if (found) return found;

  const pool = [
    ["/images/F1.png", "/images/F2.png", "/images/F3.png"],
    ["/images/F2.png", "/images/F3.png", "/images/F1.png"],
    ["/images/F3.png", "/images/F1.png", "/images/F2.png"],
  ];
  const pick = pool[hashToIndex(slug, pool.length)];

  return {
    slug,
    title: titleFromSlug(slug),
    description:
      "A refined ready-to-wear piece designed with intention—clean silhouette, confident detail, and effortless presence. (Placeholder copy until backend/product data lands.)",
    priceNgn: 20000,
    images: pick,
    sizes: ["XS", "S", "M", "L", "XL"],
    categoryLabel: "READY-TO-WEAR",
  };
}

export function getRelatedRTWProducts(currentSlug: string): RTWProduct[] {
  const list = baseProducts.filter((p) => p.slug !== currentSlug);
  // Keep it tight like your screenshot: 3 items
  return list.slice(0, 3);
}

export function formatNgn(amount: number) {
  // e.g. ₦20,000.00
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
