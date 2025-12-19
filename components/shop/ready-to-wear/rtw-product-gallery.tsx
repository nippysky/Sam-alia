"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function RTWProductGallery({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const safeImages = useMemo(() => {
    const list = (images ?? []).filter(Boolean);
    return list.length ? list : ["/images/F1.png"];
  }, [images]);

  // keep raw state, but clamp it for usage (no effect needed)
  const [activeRaw, setActiveRaw] = useState(0);
  const active = clamp(activeRaw, 0, safeImages.length - 1);

  const hero = safeImages[active];

  return (
    <div className="w-full">
      {/* Main hero (always visible) */}
      <div className="relative w-full bg-neutral-100 ring-1 ring-black/10">
        <div className="relative w-full pt-[86%] sm:pt-[88%]">
          <Image
            src={hero}
            alt={title}
            fill
            priority
            quality={95}
            sizes="(max-width: 1024px) 92vw, 44vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Thumbnails rail (supports any count) */}
      <div className="mt-4">
        <div
          className="
            -mx-1 flex gap-3 overflow-x-auto px-1 pb-1
            scroll-smooth
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
          role="tablist"
          aria-label="Product images"
        >
          {safeImages.map((src, i) => {
            const isActive = i === active;

            return (
              <button
                key={`${src}-${i}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show image ${i + 1}`}
                onClick={() => setActiveRaw(i)}
                className={[
                  "shrink-0 bg-neutral-100 ring-1 ring-black/10 transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25",
                  isActive ? "ring-2 ring-neutral-900" : "hover:ring-neutral-400",
                ].join(" ")}
                style={{ width: "min(180px, 38vw)" }}
              >
                <div className="relative w-full pt-[72%]">
                  <Image
                    src={src}
                    alt={`${title} thumbnail ${i + 1}`}
                    fill
                    quality={90}
                    sizes="(max-width: 640px) 38vw, (max-width: 1024px) 22vw, 12vw"
                    className="object-cover object-center"
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-neutral-500">
          Image {active + 1} of {safeImages.length}
        </div>
      </div>
    </div>
  );
}
