// app/commission/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getCommissionLook } from "@/lib/commission-looks";
import { CommissionEnquiryClient } from "@/components/commission/commission-enquiry-client";

export default async function CommissionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const look = getCommissionLook(slug);

  if (!look) notFound();

  return (
    <div className="min-h-screen bg-black text-neutral-900">
      <CommissionEnquiryClient look={look} />
    </div>
  );
}
