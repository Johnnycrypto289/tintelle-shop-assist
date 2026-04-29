import { Button } from "@/components/ui/button";
import heroImg from "@/assets/tintelle-hero.jpg";

export const Hero = () => {
  return (
    <section className="bg-cream">
      <div className="container grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-24">
        <div className="space-y-6 animate-fade-up">
          <p className="text-xs tracking-[0.3em] uppercase text-taupe">Tinted skincare, redefined</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-mauve leading-[1.05]">
            Skincare that shows.
            <br />
            <span className="text-primary italic">Color that cares.</span>
          </h1>
          <p className="text-base md:text-lg text-taupe max-w-md leading-relaxed">
            Tinted skincare-makeup hybrids with real ingredients that deliver effortless, skin-first color.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="rounded-none px-8 h-12 text-xs tracking-[0.18em] uppercase">
              <a href="/shop">Shop the Collection</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none px-8 h-12 text-xs tracking-[0.18em] uppercase border-mauve text-mauve hover:bg-mauve hover:text-background"
            >
              <a href="#routine">The Routine</a>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={heroImg}
              alt="Soft silk drape on warm cream marble — Tintelle aesthetic"
              width={1280}
              height={1280}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-background border border-border px-5 md:px-6 py-3 md:py-4">
            <p className="text-[11px] tracking-[0.2em] uppercase text-taupe">Dermatologist-tested</p>
            <p className="font-serif text-mauve text-base md:text-lg mt-1">Skin-first formulas</p>
          </div>
        </div>
      </div>
    </section>
  );
};
