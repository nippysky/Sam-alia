"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/craft-legacy", label: "Craft & Legacy" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export function MainMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <HiOutlineMenuAlt2 className="h-7 w-7 text-neutral-600" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[85vw] max-w-sm border-none p-0 bg-white"
      >
        <div className="flex h-full flex-col bg-white">
          {/* Accessible title + visual top bar */}
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

            {/* Screen-reader title/description (visually hidden) */}
            <SheetTitle className="sr-only">Main navigation</SheetTitle>
            <SheetDescription className="sr-only">
              Primary site navigation links for Sam’Alia.
            </SheetDescription>
          </SheetHeader>

          {/* Nav list */}
          <nav className="flex-1 px-6 py-6">
            <ul className="space-y-1 text-[0.85rem] font-medium tracking-[0.26em] text-neutral-900">
              {navItems.map((item) => (
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
