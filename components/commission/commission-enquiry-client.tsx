"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Look = {
  slug: string;
  title: string;
  image: string;
  gallery?: string[];
};

// --------- Validation (FAANG-grade strict but friendly)
const schema = z.object({
  lookSlug: z.string().min(1),
  lookTitle: z.string().min(1),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  country: z.string().min(2, "Please select a country"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(7, "Phone number is required")
    .max(20, "Phone number is too long"),
  subject: z.string().min(6, "Subject must be at least 6 characters"),
  timeline: z.string().min(1, "Please pick a date"),
  description: z.string().min(12, "Tell us a bit more (min 12 characters)"),
});

type FormValues = z.infer<typeof schema>;

// --------- Lightweight, modern date picker (no external calendar libs)
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
    const firstWeekday = first.getDay(); // 0..6
    const total = daysInMonth(viewMonth);

    const cells: Array<{ date: Date | null; key: string }> = [];

    // leading blanks
    for (let i = 0; i < firstWeekday; i++) {
      cells.push({ date: null, key: `b-${i}` });
    }

    // month days
    for (let day = 1; day <= total; day++) {
      const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
      cells.push({ date, key: formatYMD(date) });
    }

    // pad to full weeks
    while (cells.length % 7 !== 0) cells.push({ date: null, key: `t-${cells.length}` });

    return cells;
  }, [viewMonth]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={[
          "w-full rounded-md border px-3 py-2 text-left text-[13px] transition",
          "bg-white",
          error ? "border-red-500" : "border-neutral-200 hover:border-neutral-300",
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
            {/* click-away */}
            <motion.button
              type="button"
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close date picker"
            />

            {/* popover */}
            <motion.div
              className="
                absolute z-50 mt-2 w-full min-w-[280px]
                rounded-xl border border-neutral-200 bg-white
                p-3 shadow-[0_18px_70px_rgba(0,0,0,0.12)]
              "
              initial={{ opacity: 0, y: 8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.99 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setViewMonth((m) => addMonths(m, -1))}
                  className="rounded-md border border-neutral-200 px-2 py-1 text-xs hover:bg-neutral-50"
                  aria-label="Previous month"
                >
                  ←
                </button>

                <div className="text-[12px] font-medium tracking-wide text-neutral-800">
                  {viewMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                </div>

                <button
                  type="button"
                  onClick={() => setViewMonth((m) => addMonths(m, 1))}
                  className="rounded-md border border-neutral-200 px-2 py-1 text-xs hover:bg-neutral-50"
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

              <div className="mt-1 grid grid-cols-7 gap-1">
                {grid.map(({ date, key }) => {
                  if (!date) return <div key={key} className="h-9" />;

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
                        "h-9 rounded-md text-[12px] transition",
                        disabled
                          ? "cursor-not-allowed text-neutral-300"
                          : "hover:bg-neutral-100 text-neutral-900",
                        isSel ? "bg-neutral-900 text-white hover:bg-neutral-900" : "",
                      ].join(" ")}
                      aria-label={`Pick ${date.toDateString()}`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-between">
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

// --------- UI
export function CommissionEnquiryClient({ look }: { look: Look }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const COUNTRIES = useMemo(
    () => ["Nigeria", "United Kingdom", "United States", "Canada", "France", "Germany", "UAE", "South Africa", "Ghana"],
    []
  );

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
      country: "",
      timeline: "",
      subject: `Requesting: ${look.title}`,
    },
    mode: "onTouched",
  });

  const timeline = watch("timeline");

  const onSubmit = async (values: FormValues) => {
    try {
      setStatus("submitting");

      const res = await fetch("/api/commission", {
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
    <div className="relative min-h-screen">
      {/* Background frame */}
      <div className="absolute inset-0 bg-black" />

      <div className="relative mx-auto min-h-screen w-full max-w-[1400px]">
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          {/* Left: image */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0">
              <Image
                src={look.image}
                alt={look.title}
                fill
                priority
                quality={95}
                sizes="(max-width: 1024px) 0vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),transparent_60%)] opacity-50" />
            </div>
          </motion.aside>

          {/* Right: form */}
          <motion.section
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative bg-white"
          >
            {/* Top bar */}
            <div className="sticky top-0 z-20 border-b border-neutral-200 bg-white/85 backdrop-blur-md">
              <div className="flex items-center justify-between px-5 py-4 sm:px-10">
                <Link
                  href="/lookbook"
                  className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-700 hover:text-black"
                >
                  <span aria-hidden>←</span> Back
                </Link>

                <div className="relative h-7 w-36">
                  <Image
                    src="/Samalia_Wordmark.svg"
                    alt="Sam’Alia"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Mobile hero */}
            <div className="relative lg:hidden">
              <div className="relative h-[42vh] w-full">
                <Image
                  src={look.image}
                  alt={look.title}
                  fill
                  priority
                  quality={95}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/35" />
              </div>
            </div>

            <div className="px-5 py-8 sm:px-10 sm:py-10">
              <div className="max-w-2xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-neutral-600">
                  Enquiry / Booking
                </p>

                <h1 className="mt-3 font-heading text-3xl text-neutral-900 sm:text-[40px]">
                  {look.title}
                </h1>

                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Fill the form below and our team will contact you to confirm your session and requirements.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                  {/* hidden look context */}
                  <input type="hidden" {...register("lookSlug")} />
                  <input type="hidden" {...register("lookTitle")} />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <SelectField
                      label="Country"
                      required
                      error={errors.country?.message}
                      {...register("country")}
                      options={COUNTRIES}
                      placeholder="Select your country"
                    />

                    <Field
                      label="Phone Number"
                      required
                      placeholder="eg. +234-000-0000-000"
                      error={errors.phone?.message}
                      {...register("phone")}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Email Address"
                      required
                      placeholder="e.g. name@domain.com"
                      error={errors.email?.message}
                      {...register("email")}
                    />

                    <div>
                      <Label label="Timeline" />
                      <DatePicker
                        value={timeline}
                        onChange={(ymd) => setValue("timeline", ymd, { shouldValidate: true })}
                        error={errors.timeline?.message}
                      />
                    </div>
                  </div>

                  <Field
                    label="Subject Message"
                    required
                    placeholder="Eg. Requesting a look for my traditional wedding"
                    error={errors.subject?.message}
                    {...register("subject")}
                  />

                  <TextArea
                    label="Description"
                    required
                    placeholder="Message"
                    error={errors.description?.message}
                    {...register("description")}
                  />

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="
                        w-full rounded-lg bg-neutral-900 px-6 py-4
                        text-[11px] font-medium uppercase tracking-[0.22em] text-white
                        transition hover:bg-black disabled:opacity-60
                      "
                    >
                      {status === "submitting" ? "Submitting..." : "Get in Touch"}
                    </button>

                    <AnimatePresence>
                      {status === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
                        >
                          Submitted successfully. We’ll reach out shortly.
                        </motion.div>
                      )}

                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900"
                        >
                          Something went wrong. Please try again.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

// --------- Form primitives (clean + consistent)
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

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  required?: boolean;
  error?: string;
};

const Field = React.forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, required, error, ...props },
  ref
) {
  return (
    <div>
      <Label label={label} required={required} />
      <input
        ref={ref}
        {...props}
        className={[
          "w-full rounded-md border px-3 py-2 text-[13px] transition",
          "bg-white",
          error ? "border-red-500" : "border-neutral-200 focus:border-neutral-400",
          "focus:outline-none",
        ].join(" ")}
      />
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
});

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  required?: boolean;
  error?: string;
  options: string[];
  placeholder?: string;
};

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField({ label, required, error, options, placeholder, ...props }, ref) {
    return (
      <div>
        <Label label={label} required={required} />
        <select
          ref={ref}
          {...props}
          className={[
            "w-full rounded-md border px-3 py-2 text-[13px] transition",
            "bg-white",
            error ? "border-red-500" : "border-neutral-200 focus:border-neutral-400",
            "focus:outline-none",
          ].join(" ")}
          defaultValue=""
        >
          <option value="" disabled>
            {placeholder ?? "Select"}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
      </div>
    );
  }
);

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  required?: boolean;
  error?: string;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, required, error, ...props },
  ref
) {
  return (
    <div>
      <Label label={label} required={required} />
      <textarea
        ref={ref}
        {...props}
        rows={5}
        className={[
          "w-full rounded-md border px-3 py-2 text-[13px] transition",
          "bg-white",
          error ? "border-red-500" : "border-neutral-200 focus:border-neutral-400",
          "focus:outline-none",
        ].join(" ")}
      />
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
});
