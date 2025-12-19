import Image from "next/image";
import Link from "next/link";

type HouseNote = {
  id: string;
  title: string;
  href: string;
  image: string; // easy swap
  alt: string;
  ctaLabel?: string; // default: VIEW MORE
};

const houseNotes: HouseNote[] = [
  {
    id: "house-note-1",
    title: "House Note Topic 1",
    href: "/journal/house-note-1",
    image: "/images/F1.png", // <-- replace
    alt: "House note topic 1",
  },
  {
    id: "house-note-2",
    title: "House Note Topic 2",
    href: "/journal/house-note-2",
    image: "/images/F2.png", // <-- replace
    alt: "House note topic 2",
  },
  {
    id: "house-note-3",
    title: "House Note Topic 3",
    href: "/journal/house-note-3",
    image: "/images/F3.png", // <-- replace
    alt: "House note topic 3",
  },
];

export function HouseNotesSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto w-full px-5 sm:px-10 lg:px-16 xl:px-20">
        {/* Top heading row */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="anim-fade-up anim-delay-1">
            <h2 className="font-heading text-3xl leading-[1.05] tracking-[0.12em] text-neutral-900 sm:text-4xl md:text-5xl">
              HOUSE NOTES:
              <br />
              VOICES IN MOTION
            </h2>
          </div>

          <div className="anim-fade-up anim-delay-2 lg:pt-2">
            <p className="max-w-xl text-sm leading-relaxed text-neutral-700 sm:text-base">
              Fashion is dialogue—between past and present, tradition and
              modernity, Africa and the world. Our podcasts capture this dialogue
              in its purest form: unfiltered, intimate conversations with
              designers, artisans, muses, and culture-shapers. Each episode is a
              thread, weaving together ideas that inspire and redefine what it
              means to create.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {houseNotes.map((note, idx) => (
            <HouseNoteCard key={note.id} note={note} delayIndex={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HouseNoteCard({
  note,
  delayIndex,
}: {
  note: HouseNote;
  delayIndex: number;
}) {
  const delayClass =
    delayIndex === 0
      ? "anim-delay-1"
      : delayIndex === 1
        ? "anim-delay-2"
        : "anim-delay-3";

  return (
    <article className={`anim-fade-up ${delayClass}`}>
      <Link href={note.href} className="group block">
        {/* Image */}
        <div className="relative overflow-hidden bg-neutral-100">
          <div className="relative w-full aspect-4/3">
            <Image
              src={note.image}
              alt={note.alt}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 28vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              priority={false}
            />
          </div>

          {/* Soft polish overlay on hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-black/0 to-black/0" />
          </div>
        </div>

        {/* Text + CTA */}
        <div className="mt-4 space-y-3">
          <h3 className="text-sm font-medium tracking-[0.04em] text-neutral-900 sm:text-base">
            {note.title}
          </h3>

          <span
            className="
              inline-flex w-fit items-center
              border border-neutral-900 bg-neutral-900
              px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white
              transition-colors duration-200
              group-hover:bg-black
            "
          >
            {note.ctaLabel ?? "VIEW MORE"}
          </span>
        </div>
      </Link>
    </article>
  );
}
