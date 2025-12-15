"use client";

import Image from "next/image";
import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  MouseEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import countries from "world-countries";

type Look = {
  slug: string;
  title: string;
  image: string;
  gallery?: string[];
};

const schema = z.object({
  lookSlug: z.string().min(1),
  lookTitle: z.string().min(1),

  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),

  country: z.string().min(2, "Please select a country"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Phone number is required").max(22, "Phone number is too long"),

  occasion: z.string().min(3, "Occasion is required (e.g. Wedding, Event, Photoshoot)"),

  timeline: z.string().min(1, "Please pick a date"),
  notes: z.string().min(12, "Tell us a bit more (min 12 characters)"),

  preferredContact: z.enum(["email", "whatsapp", "phone"]),
});

type FormValues = z.infer<typeof schema>;

function formatYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function formatPretty(d: Date) {
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}
function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function daysInMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isPastDay(d: Date) {
  const t = new Date();
  const today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
  return d < today;
}

function hashStringToSeed(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type WorldCountry = { cca2: string; name: { common: string } };
type CountryOption = { code: string; name: string };

function getAllCountryOptions(): CountryOption[] {
  const list = (countries as unknown as WorldCountry[])
    .map((c) => ({ code: c.cca2, name: c.name.common }))
    .filter((c) => c.code && c.name)
    .sort((a, b) => a.name.localeCompare(b.name));

  const seen = new Set<string>();
  const out: CountryOption[] = [];
  for (const c of list) {
    const key = c.name.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(c);
  }
  return out;
}

function DatePicker({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (ymd: string) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);

  const selected = useMemo(() => {
    if (!value) return null;
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }, [value]);

  const [viewMonth, setViewMonth] = useState<Date>(() => startOfMonth(selected ?? new Date()));

  const grid = useMemo(() => {
    const first = startOfMonth(viewMonth);
    const firstWeekday = first.getDay();
    const total = daysInMonth(viewMonth);

    const cells: Array<{ date: Date | null; key: string }> = [];
    for (let i = 0; i < firstWeekday; i++) cells.push({ date: null, key: `b-${i}` });

    for (let day = 1; day <= total; day++) {
      const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
      cells.push({ date, key: formatYMD(date) });
    }

    while (cells.length % 7 !== 0) cells.push({ date: null, key: `t-${cells.length}` });
    return cells;
  }, [viewMonth]);

  return (
    <div className="relative min-w-0">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={[
          "w-full min-w-0 rounded-2xl border px-4 py-3 text-left text-[13px] transition",
          "bg-white",
          error ? "border-red-500" : "border-neutral-200 hover:border-neutral-300",
          "focus:outline-none focus:ring-2 focus:ring-black/10",
        ].join(" ")}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <div className="flex items-center justify-between gap-4">
          <span className={value ? "text-neutral-900" : "text-neutral-400"}>
            {selected ? formatPretty(selected) : "Select date"}
          </span>
          <span className="text-neutral-500">📅</span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close date picker"
            />

            <motion.div
              className="
                absolute left-0 z-50 mt-2
                w-[min(360px,calc(100vw-2.5rem))] sm:w-full
                rounded-3xl border border-neutral-200 bg-white p-4
                shadow-[0_24px_90px_rgba(0,0,0,0.14)]
              "
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setViewMonth((m) => addMonths(m, -1))}
                  className="rounded-xl border border-neutral-200 px-3 py-2 text-xs hover:bg-neutral-50"
                  aria-label="Previous month"
                >
                  ←
                </button>

                <div className="text-[12px] font-medium tracking-wide text-neutral-900">
                  {viewMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                </div>

                <button
                  type="button"
                  onClick={() => setViewMonth((m) => addMonths(m, 1))}
                  className="rounded-xl border border-neutral-200 px-3 py-2 text-xs hover:bg-neutral-50"
                  aria-label="Next month"
                >
                  →
                </button>
              </div>

              <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] text-neutral-500">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="py-1">
                    {d}
                  </div>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-7 gap-1">
                {grid.map(({ date, key }) => {
                  if (!date) return <div key={key} className="h-10" />;

                  const disabled = isPastDay(date);
                  const isSel = selected ? isSameDay(date, selected) : false;

                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        onChange(formatYMD(date));
                        setOpen(false);
                      }}
                      className={[
                        "h-10 rounded-2xl text-[12px] transition",
                        disabled ? "cursor-not-allowed text-neutral-300" : "hover:bg-neutral-100 text-neutral-900",
                        isSel ? "bg-neutral-900 text-white hover:bg-neutral-900" : "",
                      ].join(" ")}
                      aria-label={`Pick ${date.toDateString()}`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const d = new Date();
                    if (!isPastDay(d)) onChange(formatYMD(d));
                    setOpen(false);
                  }}
                  className="text-[11px] uppercase tracking-[0.22em] text-neutral-700 hover:text-black"
                >
                  Today
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-[11px] uppercase tracking-[0.22em] text-neutral-700 hover:text-black"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}

function CountryCombobox({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const id = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const all = useMemo(() => getAllCountryOptions(), []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return all.slice(0, 180);
    return all.filter((c) => c.name.toLowerCase().includes(s)).slice(0, 260);
  }, [all, q]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, [open]);

  return (
    <div className="relative min-w-0">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={[
          "w-full min-w-0 rounded-2xl border px-4 py-3 text-left text-[13px] transition",
          "bg-white",
          error ? "border-red-500" : "border-neutral-200 hover:border-neutral-300",
          "focus:outline-none focus:ring-2 focus:ring-black/10",
        ].join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
      >
        <div className="flex items-center justify-between gap-4">
          <span className={value ? "text-neutral-900" : "text-neutral-400"}>
            {value || "Select your country"}
          </span>
          <span className="text-neutral-500">⌄</span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close country picker"
            />

            <motion.div
              className="
                absolute left-0 z-50 mt-2
                w-[min(460px,calc(100vw-2.5rem))] sm:w-full
                overflow-hidden rounded-3xl border border-neutral-200 bg-white
                shadow-[0_24px_90px_rgba(0,0,0,0.14)]
              "
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="border-b border-neutral-200 p-3">
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search country…"
                  className="
                    w-full rounded-2xl border border-neutral-200 bg-neutral-50
                    px-3 py-2 text-[13px] text-neutral-900
                    outline-none focus:border-neutral-300
                  "
                />
              </div>

              <div id={`${id}-list`} role="listbox" className="max-h-80 overflow-auto p-2">
                {filtered.length === 0 ? (
                  <div className="px-3 py-3 text-sm text-neutral-500">No results.</div>
                ) : (
                  filtered.map((c) => {
                    const active = c.name === value;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => {
                          onChange(c.name);
                          setQ("");
                          setOpen(false);
                        }}
                        className={[
                          "w-full rounded-2xl px-3 py-2 text-left text-[13px] transition",
                          active ? "bg-neutral-900 text-white" : "hover:bg-neutral-100 text-neutral-900",
                        ].join(" ")}
                      >
                        {c.name}
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}

function SuccessFX({ seed }: { seed: number }) {
  const dots = useMemo(() => {
    const rng = mulberry32(seed);
    const n = 14;
    return Array.from({ length: n }).map((_, i) => ({
      id: i,
      x: ((rng() * 220 - 110) | 0),
      delay: rng() * 0.25,
      size: 4 + rng() * 3,
    }));
  }, [seed]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      <motion.div
        className="absolute -inset-x-24 top-0 h-24 rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)] opacity-70"
        initial={{ x: -220 }}
        animate={{ x: 820 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
      <div className="absolute right-10 top-10">
        {dots.map((d) => (
          <motion.span
            key={d.id}
            className="absolute rounded-full bg-neutral-900/70"
            style={{ width: d.size, height: d.size, left: d.x, top: 0 }}
            initial={{ opacity: 0, y: 12, scale: 0.6 }}
            animate={{ opacity: 1, y: -80, scale: 1 }}
            transition={{ duration: 0.75, delay: d.delay, ease: "easeOut" }}
          />
        ))}
      </div>
    </div>
  );
}

/** ✅ Tilt + Image Parallax (real depth) */
function useTiltParallax(enabled: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);

  const [state, setState] = useState({
    rx: 0,
    ry: 0,
    s: 1,
    ix: 0,
    iy: 0,
  });

  const reset = () => setState({ rx: 0, ry: 0, s: 1, ix: 0, iy: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;  // 0..1
      const py = (e.clientY - r.top) / r.height; // 0..1

      const dx = px - 0.5; // -0.5..0.5
      const dy = py - 0.5;

      const ry = dx * 7;
      const rx = -dy * 6;

      // ✅ tiny parallax movement (image shift)
      const ix = dx * 14; // px
      const iy = dy * 12;

      setState({ rx, ry, s: 1.01, ix, iy });
      raf.current = null;
    });
  };

  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return { ref, state, onMove, reset };
}

export function LookInquiryClient({ look }: { look: Look }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      lookSlug: look.slug,
      lookTitle: look.title,
      firstName: "",
      lastName: "",
      country: "",
      email: "",
      phone: "",
      occasion: "",
      timeline: "",
      notes: "",
      preferredContact: "email",
    },
    mode: "onTouched",
  });

  const timeline = watch("timeline");
  const country = watch("country");

  const confettiSeed = useMemo(
    () => hashStringToSeed(`inquiry:${look.slug}:${look.title}`),
    [look.slug, look.title]
  );

  const canHover = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false;
  }, []);

  const tilt = useTiltParallax(canHover);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      setStatus("submitting");
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full overflow-x-hidden bg-white text-neutral-900"
    >
      {/* ✅ This wrapper helps “center” the two cards on large screens under the sticky header */}
      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 sm:px-10">
        <div className="grid w-full grid-cols-1 gap-7 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[0.95fr_1.25fr] lg:items-center lg:gap-10">
          {/* Image card */}
          <motion.section
            className="
              relative overflow-hidden rounded-[28px]
              border border-neutral-200 bg-white
              shadow-[0_24px_80px_rgba(0,0,0,0.10)]
            "
            style={{ transformStyle: "preserve-3d" }}
            onMouseMove={tilt.onMove}
            onMouseLeave={tilt.reset}
          >
            <motion.div
              ref={tilt.ref}
              className="relative"
              animate={{ rotateX: tilt.state.rx, rotateY: tilt.state.ry, scale: tilt.state.s }}
              transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.7 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative aspect-4/5 w-full overflow-hidden">
                {/* ✅ Parallax layer */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ x: tilt.state.ix, y: tilt.state.iy }}
                  transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.6 }}
                >
                  <Image
                    src={look.image}
                    alt={look.title}
                    fill
                    priority
                    quality={95}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center"
                  />
                </motion.div>

                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.45),transparent_62%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),rgba(0,0,0,0.08))]" />
              </div>

              <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />

              <motion.div
                className="pointer-events-none absolute -inset-20 opacity-0"
                animate={{ opacity: canHover ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.65), transparent 55%)",
                  transform: "translateZ(35px)",
                }}
              />
            </motion.div>
          </motion.section>

          {/* Form card */}
          <motion.section
            className="
              relative overflow-hidden rounded-[28px] bg-white
              border border-neutral-200
              shadow-[0_24px_80px_rgba(0,0,0,0.10)]
            "
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="px-6 py-10 sm:px-10 sm:py-12">
              <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-neutral-600">
                Inquiry
              </p>

              <h1 className="mt-3 font-heading text-3xl text-neutral-900 sm:text-[44px]">
                {look.title}
              </h1>

              <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-neutral-600">
                Share your event date and preferences. We’ll contact you to confirm details and next steps.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-7">
                <input type="hidden" {...register("lookSlug")} />
                <input type="hidden" {...register("lookTitle")} />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="First Name"
                    required
                    placeholder="Eg. John"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                  />
                  <Field
                    label="Last Name"
                    required
                    placeholder="Eg. Nippy"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <Label label="Country" required />
                    <CountryCombobox
                      value={country}
                      onChange={(v) => setValue("country", v, { shouldValidate: true })}
                      error={errors.country?.message}
                    />
                  </div>

                  <Field
                    label="Phone Number"
                    required
                    placeholder="eg. +234-000-0000-000"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Email Address"
                    required
                    placeholder="e.g. name@domain.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />

                  <div>
                    <Label label="Timeline" required />
                    <DatePicker
                      value={timeline}
                      onChange={(ymd) => setValue("timeline", ymd, { shouldValidate: true })}
                      error={errors.timeline?.message}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Occasion"
                    required
                    placeholder="Wedding / Event / Photoshoot"
                    error={errors.occasion?.message}
                    {...register("occasion")}
                  />

                  <div>
                    <Label label="Preferred contact" required />
                    <select
                      {...register("preferredContact")}
                      defaultValue="email"
                      className="
                        w-full rounded-2xl border border-neutral-200 bg-white
                        px-4 py-3 text-[13px] text-neutral-900
                        outline-none transition
                        focus:border-neutral-300 focus:ring-2 focus:ring-black/10
                        focus:-translate-y-px
                      "
                    >
                      <option value="email">Email</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="phone">Phone call</option>
                    </select>
                    {errors.preferredContact?.message && (
                      <p className="mt-1 text-[11px] text-red-600">
                        {errors.preferredContact.message}
                      </p>
                    )}
                  </div>
                </div>

                <TextArea
                  label="Notes"
                  required
                  placeholder="Fit preference, fabric vibe, sizing notes, delivery city… anything important."
                  error={errors.notes?.message}
                  {...register("notes")}
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="
                      w-full rounded-2xl bg-neutral-900 px-6 py-4
                      text-[11px] font-medium uppercase tracking-[0.22em] text-white
                      transition hover:bg-black disabled:opacity-60
                    "
                  >
                    {status === "submitting" ? "Submitting…" : "Submit inquiry"}
                  </button>

                  <AnimatePresence>
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="relative mt-5 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
                      >
                        <SuccessFX seed={confettiSeed} />
                        <div className="relative">Submitted successfully. We’ll reach out shortly.</div>
                      </motion.div>
                    )}

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
                      >
                        Something went wrong. Please try again.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-6 text-xs text-neutral-500">
                    By submitting, you agree we can contact you regarding this request.
                  </div>
                </div>
              </form>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}

function Label({ label, required }: { label: string; required?: boolean }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <label className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-700">
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </label>
    </div>
  );
}

type FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label: string;
  required?: boolean;
  error?: string;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, required, error, ...props },
  ref
) {
  return (
    <div className="min-w-0">
      <Label label={label} required={required} />
      <input
        ref={ref}
        {...props}
        className={[
          "w-full min-w-0 rounded-2xl border px-4 py-3 text-[13px] transition",
          "bg-white",
          error ? "border-red-500" : "border-neutral-200 focus:border-neutral-300",
          "focus:outline-none focus:ring-2 focus:ring-black/10 focus:-translate-y-px",
        ].join(" ")}
      />
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
});

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  required?: boolean;
  error?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, required, error, ...props },
  ref
) {
  return (
    <div className="min-w-0">
      <Label label={label} required={required} />
      <textarea
        ref={ref}
        {...props}
        rows={5}
        className={[
          "w-full min-w-0 rounded-2xl border px-4 py-3 text-[13px] transition",
          "bg-white",
          error ? "border-red-500" : "border-neutral-200 focus:border-neutral-300",
          "focus:outline-none focus:ring-2 focus:ring-black/10 focus:-translate-y-px",
        ].join(" ")}
      />
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
});
