// components/shop/ready-to-wear/rtw-variant-panel.tsx
"use client";

import { useMemo, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export function RTWVariantPanel({
  sizes,
  priceLabel,
}: {
  sizes: string[];
  priceLabel: string;
}) {
  const sizeOptions = useMemo(() => (sizes?.length ? sizes : ["S", "M", "L"]), [sizes]);

  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-6 space-y-5">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-700">
          Size &amp; Fit
        </p>

        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="
            mt-2 w-full border border-neutral-200 bg-white px-4 py-3
            text-[13px] text-neutral-900 outline-none
            focus:border-neutral-400 focus:ring-2 focus:ring-black/10
          "
        >
          <option value="" disabled>
            Select size
          </option>
          {sizeOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-700">
          Quantity
        </p>

        <div className="mt-2 flex items-stretch">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-12 border border-neutral-200 bg-white text-lg hover:bg-neutral-50"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <input
            inputMode="numeric"
            value={qty}
            onChange={(e) => {
              const n = Number(e.target.value.replace(/[^\d]/g, ""));
              setQty(Number.isFinite(n) && n > 0 ? n : 1);
            }}
            className="
              w-full border-y border-neutral-200 bg-white px-4
              text-[13px] text-neutral-900 outline-none
              focus:ring-2 focus:ring-black/10
            "
            aria-label="Quantity"
          />

          <button
            type="button"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="w-12 border border-neutral-200 bg-white text-lg hover:bg-neutral-50"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-700">
          Price:
        </p>
        <p className="mt-2 text-sm font-semibold text-neutral-900">{priceLabel}</p>
      </div>

      <button
        type="button"
        className="
          mt-2 inline-flex w-full items-center justify-center gap-2
          bg-neutral-900 px-6 py-4
          text-[11px] font-medium uppercase tracking-[0.22em] text-white
          transition hover:bg-black
          disabled:opacity-60
        "
        disabled={!size}
        aria-label="Add to bag"
      >
        Add to bag <HiOutlineShoppingBag className="h-4 w-4" />
      </button>

      <p className="text-xs text-neutral-500">
        Select a size to enable Add to Bag.
      </p>
    </div>
  );
}
