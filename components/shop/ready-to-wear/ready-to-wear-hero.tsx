export function ReadyToWearHero() {
  return (
    <section className="w-full bg-white pt-10 sm:pt-14">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-10 lg:px-16 xl:px-20">
        <div className="anim-fade-up anim-delay-1 flex justify-center">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20">
              {/* keep logo as background via css or replace with next/image if you want */}
              <img
                src="/Samalia_Logo.svg"
                alt="Samalia"
                className="h-full w-full object-contain"
                loading="eager"
              />
            </div>

            <h1 className="mt-6 font-heading text-3xl leading-tight tracking-wide text-neutral-900 sm:text-4xl md:text-5xl">
              READY-TO-WEAR
            </h1>

            <p className="mx-auto mt-3 max-w-3xl text-xs leading-relaxed text-neutral-600 sm:text-sm md:text-base">
              Adipiscing pharetra molestie porttitor phasellus nec massa sed volutpat.
              Convallis volutpat bibendum ultrices consequat aliquet. Bibendum ullamcorper
              montes fermentum nunc iaculis pharetra vitae libero.
            </p>
          </div>
        </div>
      </div>

      {/* subtle divider bar like your screenshot */}
      <div className="mt-10 h-8 w-full bg-[#F2F0EA]" />
    </section>
  );
}
