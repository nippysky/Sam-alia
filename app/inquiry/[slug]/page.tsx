// app/inquiry/[slug]/page.tsx
import Link from "next/link";
import { SiteHeader } from "@/components/shared/site-header";
import { LookInquiryClient } from "@/components/inquiry/look-inquiry-client";

/**
 * Temporary frontend-only mode:
 * - Accept ANY slug and render the Inquiry UI.
 * - No backend integration yet, so we generate a placeholder "look".
 */

function titleFromSlug(slug: string) {
  const clean = decodeURIComponent(slug || "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!clean) return "Selected Look";

  // Title Case-ish (simple + clean)
  return clean.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function InquiryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const look = {
    slug,
    title: titleFromSlug(slug),
    // ✅ Use a safe default image for demo. Change anytime.
    image: "/images/F1.png",
    // optional (not required by your UI)
    gallery: ["/images/F1.png", "/images/F2.png", "/images/F3.png"],
  };

  return (
    <div className="w-full bg-white text-neutral-900">
      <SiteHeader variant="solid" />

      {/* Breadcrumbs (plain, on white) */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto w-full max-w-7xl px-5 pt-6 sm:px-10"
      >
        <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-neutral-600">
          <li>
            <Link href="/" className="hover:text-neutral-900">
              Home
            </Link>
          </li>
          <li className="text-neutral-300">/</li>
          <li>
            <Link href="/lookbook" className="hover:text-neutral-900">
              Lookbook
            </Link>
          </li>
          <li className="text-neutral-300">/</li>
          <li className="max-w-[60vw] truncate text-neutral-800 sm:max-w-[55ch]">
            {look.title}
          </li>
          <li className="text-neutral-300">/</li>
          <li className="text-neutral-900">Inquiry</li>
        </ol>
      </nav>

      <LookInquiryClient look={look} />
    </div>
  );
}
