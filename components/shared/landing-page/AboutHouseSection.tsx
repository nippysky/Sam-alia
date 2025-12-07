// components/shared/landing-page/AboutHouseSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

// Swap this with your real image path
const ABOUT_HOUSE_IMAGE = "/images/AboutSec.svg";

export function AboutHouseSection() {
  return (
    <section className="w-full bg-white py-20 md:py-24">
      {/* Brand padding container */}
      <div className="mx-auto max-w-[1920px] px-5 sm:px-10 lg:px-20">
        
        {/* Split layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:h-[520px] lg:h-[620px]">
          
          {/* LEFT — Image */}
          <div className="relative h-[380px] md:h-full">
            <Image
              src={ABOUT_HOUSE_IMAGE}
              alt="Sam’Alia — inside the house"
              fill
              priority
              className="object-cover rounded-sm"
            />
          </div>

          {/* RIGHT — Text */}
          <div className="flex items-center justify-center bg-white">
            <div className="w-full max-w-sm text-center md:text-left">
              
              <h2 className="font-heading text-3xl leading-tight text-neutral-900 sm:text-4xl lg:text-[42px]">
                <span>About The</span>
                <br />
                <span>House</span>
              </h2>

              <div className="mt-10 flex justify-center md:justify-start">
                <Link
                  href="/about"
                  className="inline-flex items-center border border-neutral-900 px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-900 transition-colors duration-200 hover:bg-neutral-900 hover:text-white"
                >
                  More about our heritage
                  <span className="ml-3 inline-block text-sm leading-none">
                    →
                  </span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
