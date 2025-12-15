// app/inquiry/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCommissionLook } from "@/lib/commission-looks";
import { SiteHeader } from "@/components/shared/site-header";
import { LookInquiryClient } from "@/components/inquiry/look-inquiry-client";

export default async function InquiryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const look = getCommissionLook(slug);

  if (!look) notFound();

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
