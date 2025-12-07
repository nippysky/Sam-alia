"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MainMenu } from "./main-menu";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import clsx from "clsx";

type HeaderVariant = "solid" | "transparent";

interface SiteHeaderProps {
  variant?: HeaderVariant;
}

export function SiteHeader({ variant = "solid" }: SiteHeaderProps) {
  const isTransparentVariant = variant === "transparent";
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // once user moves even a bit, treat it as scrolled
      setHasScrolled(window.scrollY > 8);
    };

    handleScroll(); // run on mount so refresh-in-middle works
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If transparent variant AND not scrolled → transparent
  // Else → solid white header
  const showSolidHeader = !isTransparentVariant || hasScrolled;

  const headerClasses = clsx(
    "sticky top-0 w-full backdrop-blur-sm transition-colors duration-300",
    showSolidHeader
      ? "border-b border-neutral-200 bg-white"
      : "border-b border-transparent bg-transparent"
  );

  const cartColorClass = showSolidHeader
    ? "text-neutral-600"
    : "text-white";

  const menuColor: "dark" | "white" = showSolidHeader ? "dark" : "white";

  return (
    <header
      style={{ zIndex: 30 }}
      className={headerClasses}
    >
      <div className="flex h-16 items-center justify-between px-5 sm:h-20 sm:px-10 lg:px-20">
        {/* Left: mobile menu + logo */}
        <div className="flex items-center gap-2">
          <MainMenu color={menuColor} />

          <Link href="/" aria-label="Sam’Alia home">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-40 sm:h-12 sm:w-48">
                <Image
                  src="/Samalia_Wordmark.svg"
                  // If you later add a white wordmark, you can do:
                  // src={showSolidHeader ? "/Samalia_Wordmark.svg" : "/Samalia_Wordmark_White.svg"}
                  alt="Sam’Alia"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Right: cart */}
        <Link href={"/cart"} aria-label="Shopping cart">
          <HiOutlineShoppingBag
            className={clsx(
              "h-6 w-6 sm:h-7 sm:w-7 transition-colors duration-200",
              cartColorClass
            )}
          />
        </Link>
      </div>
    </header>
  );
}
