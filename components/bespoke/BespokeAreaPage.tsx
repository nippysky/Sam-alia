// components/bespoke/BespokeAreaPage.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/shared/site-header";
import { Play, X } from "lucide-react";
import Link from "next/link";

export type BespokeAreaConfig = {
  id: string;
  bgImage: string;
  title: string;
  eyebrow?: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  videoUrl: string; // any YouTube URL
};

interface BespokeAreaPageProps {
  config: BespokeAreaConfig;
}

/* --- YouTube helpers --------------------------------------------------- */

function extractYouTubeId(url: string): string | null {
  if (!url) return null;

  try {
    const u = new URL(url);

    // youtu.be/XXXX
    if (u.hostname === "youtu.be") {
      return u.pathname.replace("/", "") || null;
    }

    // youtube.com/watch?v=XXXX
    const v = u.searchParams.get("v");
    if (v) return v;

    // /shorts/XXXX, /embed/XXXX etc.
    const parts = u.pathname.split("/").filter(Boolean);
    const last = parts[parts.length - 1];
    return last || null;
  } catch {
    return null;
  }
}

function buildEmbedUrl(id: string | null): string {
  return id ? `https://www.youtube.com/embed/${id}` : "";
}

/* --- Component --------------------------------------------------------- */

export function BespokeAreaPage({ config }: BespokeAreaPageProps) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const {
    bgImage,
    title,
    eyebrow,
    description,
    ctaLabel,
    ctaHref,
    videoUrl,
  } = config;

  const videoId = useMemo(() => extractYouTubeId(videoUrl), [videoUrl]);
  const embedUrl = useMemo(() => buildEmbedUrl(videoId), [videoId]);

  return (
    <main className="relative min-h-screen w-full bg-black text-white">
      {/* Background hero image behind everything */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-black/85 via-black/55 to-transparent" />
      </div>

      {/* Transparent sticky header */}
      <SiteHeader variant="transparent" />

      {/* Back button */}
      <div className="relative z-20 px-5 pt-4 sm:px-10 lg:px-20">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm transition hover:bg-white/10"
        >
          <span className="text-xs">←</span>
          <span>Back</span>
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-20 flex min-h-[calc(100vh-80px)] flex-col px-5 pb-16 pt-6 sm:px-10 lg:px-20 lg:pb-24">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10">
          {/* HERO TEXT + CTA */}
          <section className="mt-6 flex flex-1 items-start md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="max-w-2xl text-left md:text-center md:mx-auto"
            >
              {eyebrow && (
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.26em] text-white/70">
                  {eyebrow}
                </p>
              )}

              <h1 className="font-heading text-3xl leading-tight sm:text-4xl lg:text-[42px]">
                {title}
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-[15px] md:mx-auto">
                {description}
              </p>

              {/* CTA sits right below the text */}
              <div className="mt-5 flex flex-wrap gap-3 md:justify-center">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center border border-white bg-white px-5 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-transparent hover:text-white"
                >
                  {ctaLabel}
                  <span className="ml-2 text-xs">→</span>
                </Link>
              </div>
            </motion.div>
          </section>

          {/* VIDEO SECTION – single, stretched panel */}
          <section className="mt-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="
                mx-auto max-w-4xl
                overflow-hidden rounded-2xl
                border border-white/20 bg-white/5
                shadow-[0_20px_80px_rgba(0,0,0,0.9)]
              "
            >
              <div className="relative aspect-video w-full">
                {isPlaying && embedUrl ? (
                  <>
                    {/* Close button (top-right on the video) */}
                    <button
                      type="button"
                      onClick={() => setIsPlaying(false)}
                      className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <iframe
                      src={`${embedUrl}?autoplay=1`}
                      title={`${title} film`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => embedUrl && setIsPlaying(true)}
                    className="group relative h-full w-full cursor-pointer"
                  >
                    {/* Still frame */}
                    <Image
                      src={bgImage}
                      alt={`${title} preview`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Absolutely centered play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="
                          inline-flex h-12 w-12 items-center justify-center rounded-full
                          bg-white/95 text-neutral-900 shadow-lg transition
                          group-hover:bg-white
                        "
                      >
                        <Play className="ml-1 h-5 w-5" />
                      </span>
                    </div>
                  </button>
                )}
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </main>
  );
}
