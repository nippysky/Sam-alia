"use client";

import Link from "next/link";
import Image from "next/image";
import { MainMenu } from "./main-menu";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="flex h-16 items-center justify-between px-5 sm:h-20 sm:px-10 lg:px-20">
        {/* Left: menu + logo */}
        <div className="flex items-center gap-2">
          <MainMenu />

          <Link href="/" aria-label="Sam’Alia home">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-48">
                <Image
                  src="/Samalia_Wordmark.svg"
                  alt="Sam’Alia"
                  fill
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Right: cart */}
        <Link href={"/cart"} aria-label="Shopping cart">
  <HiOutlineShoppingBag className="h-7 w-7 text-neutral-600 cursor-pointer" />
        </Link>

      </div>
    </header>
  );
}
