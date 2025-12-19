// components/shared/main-menu.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

type MenuColor = "white" | "dark";

interface MainMenuProps {
  color?: MenuColor;
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/craft-legacy", label: "Craft & Legacy" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export function MainMenu({ color = "dark" }: MainMenuProps) {
  const iconColor = color === "white" ? "text-white" : "text-neutral-600";
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex items-center justify-center cursor-pointer"
        >
          <HiOutlineMenuAlt2
            className={`h-7 w-7 transition-colors duration-200 ${iconColor}`}
          />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[85vw] max-w-sm border-none p-0 bg-white"
      >
        <div className="flex h-full flex-col bg-white">
          <SheetHeader className="border-b border-neutral-200 px-6 py-4 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/Samalia_Logo.svg"
                  alt="Sam’Alia"
                  fill
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
              <span className="text-xs font-medium tracking-[0.18em] text-neutral-600">
                MENU
              </span>
            </div>

            <SheetTitle className="sr-only">Main navigation</SheetTitle>
            <SheetDescription className="sr-only">
              Primary site navigation links for Sam’Alia.
            </SheetDescription>
          </SheetHeader>

          <nav className="flex-1 px-6 py-6">
            <ul className="space-y-1 text-[0.85rem] font-medium tracking-[0.26em] text-neutral-900">
              {/* HOME */}
              <li>
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="flex items-center justify-between py-3 uppercase hover:text-neutral-500"
                  >
                    <span>Home</span>
                    <span className="text-[10px] text-neutral-400">&gt;</span>
                  </Link>
                </SheetClose>
              </li>

              {/* SHOP (accordion, NOT a link) */}
              <li>
                <button
                  type="button"
                  onClick={() => setShopOpen((v) => !v)}
                  aria-expanded={shopOpen}
                  className="flex w-full items-center justify-between py-3 uppercase hover:text-neutral-500"
                >
                  <span>Shop</span>
                  <span
                    className={[
                      "text-[10px] text-neutral-400 transition-transform duration-300 ease-out",
                      shopOpen ? "rotate-90" : "rotate-0",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    &gt;
                  </span>
                </button>

                {/* Smooth accordion panel */}
                <div
                  className={[
                    "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out",
                    shopOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="min-h-0">
                    <div className="mt-1 space-y-1 border-l border-neutral-200 pl-4">
                      <SheetClose asChild>
                        <Link
                          href="/shop/bespoke"
                          className="flex items-center justify-between py-2 text-[0.78rem] font-medium tracking-[0.22em] uppercase text-neutral-800 hover:text-neutral-500"
                        >
                          <span>Bespoke</span>
                          <span className="text-[10px] text-neutral-400">&gt;</span>
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          href="/shop/ready-to-wear"
                          className="flex items-center justify-between py-2 text-[0.78rem] font-medium tracking-[0.22em] uppercase text-neutral-800 hover:text-neutral-500"
                        >
                          <span>Ready to wear</span>
                          <span className="text-[10px] text-neutral-400">&gt;</span>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                </div>
              </li>

              {/* REST */}
              {navItems
                .filter((i) => i.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between py-3 uppercase hover:text-neutral-500"
                      >
                        <span>{item.label}</span>
                        <span className="text-[10px] text-neutral-400">&gt;</span>
                      </Link>
                    </SheetClose>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
