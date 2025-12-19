// components/shared/cart-sheet.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { ShoppingBag } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

export function CartSheet({ iconClassName }: { iconClassName?: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open cart"
          className="inline-flex items-center justify-center"
        >
          <HiOutlineShoppingBag
            className={iconClassName ?? "h-6 w-6 sm:h-7 sm:w-7 text-neutral-600"}
          />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[85vw] max-w-sm border-none p-0 bg-white"
      >
        <div className="flex h-full flex-col bg-white">
          <SheetHeader className="border-b border-neutral-200 px-6 py-4">
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
                CART
              </span>
            </div>

            <SheetTitle className="sr-only">Shopping cart</SheetTitle>
            <SheetDescription className="sr-only">
              Your selected items for checkout.
            </SheetDescription>
          </SheetHeader>

          {/* EMPTY STATE (replace later with real cart items) */}
          <div className="flex flex-1 items-center justify-center px-6">
            <div className="w-full max-w-xs text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-[0_12px_40px_-30px_rgba(0,0,0,0.35)]">
                <ShoppingBag className="h-6 w-6 text-neutral-700" />
              </div>

              <p className="mt-5 text-sm font-medium tracking-[0.18em] text-neutral-900 uppercase">
                Your cart is empty
              </p>

              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Add pieces to your cart and they’ll show up here for checkout.
              </p>

              <div className="mt-6">
                <Link
                  href="/shop/ready-to-wear"
                  className="inline-flex items-center justify-center border border-neutral-900 bg-neutral-900 px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-black"
                >
                  Shop Ready To Wear
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 px-6 py-4">
            <div className="flex items-center justify-between text-xs tracking-[0.18em] text-neutral-500 uppercase">
              <span>Subtotal</span>
              <span>₦0.00</span>
            </div>

            <button
              type="button"
              disabled
              className="mt-3 w-full cursor-not-allowed border border-neutral-300 bg-neutral-100 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-400"
            >
              Checkout
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
