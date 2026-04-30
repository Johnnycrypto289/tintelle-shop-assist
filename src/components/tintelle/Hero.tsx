import { Button } from "@/components/ui/button";
import heroImg from "@/assets/tintelle-hero.jpg";

export const Hero = () => {
  return (
    <section className="bg-cream">
      <div className="container grid md:grid-cols-2 gap-8 md:gap-16 items-center py-10 md:py-24">
        {/* Image first on mobile so it's the visual anchor; second on desktop */}
        <div className="relative order-1 md:order-2 -mx-4 md:mx-0">
          <div className="aspect-[4/5] md:aspect-square overflow-hidden">
            <img
              src={heroImg}
              alt="Model holding Tintelle tinted lip product"
              width={1200}
              height={1200}
              loading="eager"
              decoding="async"
              // @ts-expect-error fetchpriority is a valid HTML attribute
              fetchpriority="high"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-3 left-4 md:-bottom-4 md:-left-4 bg-background border border-border px-4 md:px-6 py-2.5 md:py-4">
            <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-taupe">Dermatologist-tested</p>
            <p className="font-serif text-mauve text-sm md:text-lg mt-0.5 md:mt-1">Skin-first formulas</p>
          </div>
        </div>

        <div className="space-y-5 md:space-y-6 animate-fade-up order-2 md:order-1 pt-6 md:pt-0">
          <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-taupe">Tinted skincare, redefined</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-mauve leading-[1.05]">
            Skincare that shows.
            <br />
            <span className="text-primary italic">Color that cares.</span>
          </h1>
          <p className="text-base md:text-lg text-taupe max-w-md leading-relaxed">
            Tinted skincare-makeup hybrids with real ingredients that deliver effortless, skin-first color.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild size="lg" className="rounded-none px-8 h-12 text-xs tracking-[0.18em] uppercase w-full sm:w-auto">
              <a href="/shop">Shop the Collection</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none px-8 h-12 text-xs tracking-[0.18em] uppercase border-mauve text-mauve hover:bg-mauve hover:text-background w-full sm:w-auto"
            >
              <a href="/journal">Read the Journal</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
