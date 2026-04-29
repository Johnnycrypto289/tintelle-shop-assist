import { Link } from "react-router-dom";
import { Leaf, ShieldCheck, Sparkles, Heart } from "lucide-react";
import { PageShell } from "@/components/tintelle/PageShell";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/tintelle-hero.jpg";
import routineImg from "@/assets/tintelle-routine.jpg";

const PILLARS = [
  { icon: ShieldCheck, label: "Skin-first", body: "Every formula starts with what skin actually needs — peptides, squalane, mineral SPF, hyaluronic acid." },
  { icon: Leaf, label: "Clean & vegan", body: "Plant-based, cruelty-free, never silicones, parabens, or synthetic fragrance." },
  { icon: Sparkles, label: "Effortless color", body: "Buildable, sheer-to-medium pigment that looks like skin — at its most rested." },
  { icon: Heart, label: "Made with care", body: "Formulated and packed in North America, in small batches we can stand behind." },
];

const About = () => (
  <PageShell title="About" description="Tintelle is tinted skincare-makeup hybrids — skin-first, clean, vegan.">
    <section className="container pt-14 pb-16 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div>
        <p className="text-xs tracking-[0.3em] uppercase text-taupe">Our story</p>
        <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">
          Skincare that shows.<br /><span className="italic text-primary">Color that cares.</span>
        </h1>
        <p className="text-base md:text-lg text-taupe mt-5 leading-relaxed">
          Tintelle started with one question: what's the smallest number of products you actually need to look like
          yourself? The answer became a tinted skincare line — formulas that wear like makeup and treat like skincare.
        </p>
        <p className="text-base md:text-lg text-taupe mt-4 leading-relaxed">
          Every shade is built around a peptide, a hydrator, and a mineral filter. Every product is small-batch, vegan,
          and made in North America.
        </p>
      </div>
      <div className="aspect-[4/5] overflow-hidden bg-cream">
        <img src={heroImg} alt="Tintelle aesthetic" className="w-full h-full object-cover" />
      </div>
    </section>

    <section id="ingredients" className="bg-cream py-16 md:py-20">
      <div className="container">
        <p className="text-xs tracking-[0.3em] uppercase text-taupe text-center">What we stand for</p>
        <h2 className="font-serif text-3xl md:text-4xl text-mauve text-center mt-3 mb-12">Four pillars.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map(({ icon: Icon, label, body }) => (
            <div key={label} className="text-center">
              <Icon className="h-8 w-8 mx-auto text-accent" strokeWidth={1.5} />
              <h3 className="font-serif text-xl text-mauve mt-4">{label}</h3>
              <p className="text-sm text-taupe mt-2 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="sustainability" className="container py-16 md:py-20 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div className="aspect-[5/4] overflow-hidden bg-cream order-2 md:order-1">
        <img src={routineImg} alt="The Tintelle Routine" className="w-full h-full object-cover" />
      </div>
      <div className="order-1 md:order-2">
        <p className="text-xs tracking-[0.3em] uppercase text-taupe">Sustainability</p>
        <h2 className="font-serif text-3xl md:text-4xl text-mauve mt-3 leading-tight">
          Less, but better.
        </h2>
        <p className="text-taupe mt-5 leading-relaxed">
          Recyclable glass primaries, FSC-certified outers, and a refill program for our most-loved formulas. We ship
          carbon-neutral with USPS Priority and offset every order through verified reforestation projects.
        </p>
        <Button asChild size="lg" className="rounded-none mt-7 px-7 h-12 text-xs tracking-[0.18em] uppercase">
          <Link to="/shop">Shop the collection</Link>
        </Button>
      </div>
    </section>
  </PageShell>
);

export default About;
