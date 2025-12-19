import Image from "next/image";

type AboutBlock = {
  title: string;
  paragraphs: string[];
};

const blocks: AboutBlock[] = [
  {
    title: "OUR STORY",
    paragraphs: [
      "Sam’Alia was born from a vision: to create a fashion house that honors Africa’s traditions while embracing the elegance of global modernity. What began as sketches and hand-cut fabrics has grown into a name celebrated for its ability to merge authenticity with refinement.",
      "Our journey is written in the lives of those who wear us—at ceremonies, on stages, in portrait, and across continents. Every moment shared in Sam’Alia becomes part of our living story.",
    ],
  },
  {
    title: "OUR PHILOSOPHY",
    paragraphs: [
      "At the heart of Sam’Alia lies a simple belief: clothing should not only be seen, but felt. Each piece is designed to resonate with spirit and meaning, turning garments into heirlooms of culture and self-expression.",
      "We reject the fleeting nature of trends in favor of timelessness. Our philosophy is to design for memory, for legacy, for the moments that matter most.",
    ],
  },
  {
    title: "OUR CRAFT",
    paragraphs: [
      "Every creation begins with a sketch—a line inspired by heritage, a vision of form. In our ateliers, artisans transform these visions with meticulous care, hand-finishing every detail with patience and pride. From fabric selection to final stitch, nothing is accidental; everything is intentional.",
      "Our craft is not mass production. It is mastery—slow, deliberate, and deeply human. It is the meeting of tradition and innovation, of artistry and culture. This is what makes each Sam’Alia piece not just clothing, but a work of art.",
    ],
  },
];

const images = {
  hero: "/images/AboutStory.svg",   // big image (right top)
  small1: "/images/AboutStory.svg", // bottom left
  small2: "/images/AboutStory.svg", // bottom right
};

export function AboutStorySection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto w-full  px-5 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          {/* LEFT: copy blocks */}
          <div className="space-y-12">
            {blocks.map((b, i) => (
              <div
                key={b.title}
                className={[
                  "anim-fade-up",
                  i === 0 ? "anim-delay-1" : i === 1 ? "anim-delay-2" : "anim-delay-3",
                ].join(" ")}
              >
                <h2 className="font-heading text-3xl leading-[1.05] text-neutral-900 sm:text-4xl">
                  {b.title}
                </h2>

                <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-700 sm:text-base">
                  {b.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* divider line */}
                <div className="mt-8 h-px w-full bg-neutral-300/70" />
              </div>
            ))}
          </div>

          {/* RIGHT: image column */}
          <div className="anim-fade-up anim-delay-2">
            {/* Top big image */}
            <div className="relative w-full overflow-hidden bg-neutral-100">
              <div className="relative w-full pt-[82%] lg:pt-[92%]">
                <Image
                  src={images.hero}
                  alt="Samalia in studio"
                  fill
                  priority={false}
                  sizes="(max-width: 1024px) 92vw, 38vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bottom two images */}
            <div className="mt-6 grid grid-cols-2 gap-5">
              <div className="relative w-full overflow-hidden bg-neutral-100">
                <div className="relative w-full pt-[86%]">
                  <Image
                    src={images.small1}
                    alt="Craft detail 1"
                    fill
                    sizes="(max-width: 1024px) 46vw, 18vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="relative w-full overflow-hidden bg-neutral-100">
                <div className="relative w-full pt-[86%]">
                  <Image
                    src={images.small2}
                    alt="Craft detail 2"
                    fill
                    sizes="(max-width: 1024px) 46vw, 18vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
