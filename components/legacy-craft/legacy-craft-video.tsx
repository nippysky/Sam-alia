"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);

    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    // youtube.com/watch?v=<id>
    if (u.hostname.includes("youtube.com")) {
      // /watch?v=
      if (u.pathname === "/watch") {
        return u.searchParams.get("v");
      }
      // /embed/<id>
      if (u.pathname.startsWith("/embed/")) {
        return u.pathname.split("/embed/")[1]?.split("/")[0] ?? null;
      }
      // /shorts/<id>
      if (u.pathname.startsWith("/shorts/")) {
        return u.pathname.split("/shorts/")[1]?.split("/")[0] ?? null;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function LegacyCraftVideo({
  youtubeUrl,
  posterImage,
  title = "Video",
}: {
  youtubeUrl: string;
  posterImage: string; // local path in /public
  title?: string;
}) {
  const [playing, setPlaying] = useState(false);

  const videoId = useMemo(() => extractYouTubeId(youtubeUrl), [youtubeUrl]);

  const embedSrc = useMemo(() => {
    if (!videoId) return null;

    // modestbranding/rel make it cleaner
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "0",
      controls: "1",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }, [videoId]);

  return (
    <div className="w-full">
      <div
        className="
          relative w-full overflow-hidden bg-neutral-200
          shadow-[0_30px_120px_-80px_rgba(0,0,0,0.6)]
        "
      >
        {/* Aspect ratio close to screenshot */}
        <div className="relative w-full pt-[56%] sm:pt-[52%] md:pt-[48%]">
          {!playing && (
            <>
              <Image
                src={posterImage}
                alt={title}
                fill
                priority={false}
                sizes="(max-width: 1024px) 92vw, 70vw"
                className="object-cover"
              />

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Play button */}
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play video"
                className="
                  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                  flex h-20 w-20 items-center justify-center rounded-full
                  bg-white/90 text-neutral-900
                  shadow-[0_25px_80px_-35px_rgba(0,0,0,0.6)]
                  transition-transform duration-200
                  hover:scale-[1.03]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40
                  focus-visible:ring-offset-4 focus-visible:ring-offset-white
                "
              >
                <span className="sr-only">Play</span>
                <div className="ml-1 h-0 w-0 border-y-10 border-y-transparent border-l-16 border-l-neutral-900" />
              </button>
            </>
          )}

          {playing && embedSrc && (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={embedSrc}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}

          {playing && !embedSrc && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 px-6 text-center">
              <p className="text-sm text-neutral-700">
                Invalid YouTube URL. Please provide a standard YouTube link.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
