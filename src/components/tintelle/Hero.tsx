import { useEffect, useState } from "react";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";

const slides = [
  { src: hero1, alt: "Tintelle model with natural glow holding lip product" },
  { src: hero2, alt: "Tintelle pouch with signature lip tint" },
  { src: hero3, alt: "Tintelle model in soft brown knit holding tinted lip" },
  { src: hero4, alt: "Tintelle BB cream held by model in natural light" },
];

export const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-bone overflow-hidden">
      {/* Full-bleed image stage */}
      <div className="relative h-[88vh] min-h-[640px] max-h-[920px] w-full">
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            // @ts-expect-error fetchpriority is a valid HTML attribute
            fetchpriority={i === 0 ? "high" : "low"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1800ms] ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Editorial gradient overlay — keeps text crisp without killing the photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

        {/* Asymmetric typography — Hermès-style */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container pb-14 md:pb-20">
            <div className="max-w-3xl">
              <p className="text-[10px] md:text-[11px] tracking-[0.45em] uppercase text-white/85 mb-5 md:mb-7">
                Tintelle — Est. Beauty
              </p>
              <h1 className="font-serif font-light text-white leading-[0.95] tracking-[-0.01em] text-5xl sm:text-6xl md:text-7xl lg:text-[112px]">
                Color
                <br />
                <span className="italic font-extralight">that cares.</span>
              </h1>
              <p className="mt-6 md:mt-8 text-white/80 text-sm md:text-base max-w-md leading-relaxed font-light">
                Tinted skincare-makeup hybrids, crafted with real ingredients for effortless, skin-first color.
              </p>

              {/* Thin underlined text links — no buttons */}
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-5 sm:gap-10">
                <a
                  href="/shop"
                  className="group inline-flex items-center text-[11px] md:text-xs tracking-[0.32em] uppercase text-white pb-1.5 border-b border-white/60 hover:border-white transition-colors w-fit"
                >
                  <span>Shop the Collection</span>
                  <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="/journal"
                  className="group inline-flex items-center text-[11px] md:text-xs tracking-[0.32em] uppercase text-white/85 pb-1.5 border-b border-white/30 hover:border-white/80 hover:text-white transition-colors w-fit"
                >
                  <span>Read the Journal</span>
                  <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators — minimal, top-right */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`View slide ${i + 1}`}
              className={`h-px transition-all duration-500 ${
                i === index ? "w-10 bg-white" : "w-5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Tiny corner mark — Celine-style */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-right">
          <p className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/70">
            Tinted Skincare
          </p>
          <p className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/50 mt-1">
            Redefined
          </p>
        </div>
      </div>
    </section>
  );
};
