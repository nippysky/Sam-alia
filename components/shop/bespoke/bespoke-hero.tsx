import Image from "next/image";

export function BespokeHero() {
  return (
    <section className="pt-10 sm:pt-14 pb-10">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex justify-center">
          <Image
            src="/Samalia_Logo.svg"
            alt="Samalia"
            width={80}
            height={80}
            priority
            className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20"
          />
        </div>

        <h1 className="mt-6 text-center font-serif text-3xl leading-tight tracking-wide text-neutral-900 sm:text-4xl md:text-5xl">
          BESPOKE ATTIRES
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-neutral-600 sm:text-base">
          Adipiscing pharetra molestie porttitor phasellus nec massa sed volutpat.
          Convallis volutpat bibendum ultrices consequat aliquet. Bibendum ullamcorper
          montes fermentum nunc iaculis pharetra vitae libero.
        </p>
      </div>
    </section>
  );
}
