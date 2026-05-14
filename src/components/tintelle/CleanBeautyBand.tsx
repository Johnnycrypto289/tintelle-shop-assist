import { Link } from "react-router-dom";

const PILLARS = [
  {
    title: "Honest formulas",
    body: "EU-restricted ingredient list, full INCI on every product page. No synthetic fragrance, ever.",
  },
  {
    title: "Skin-first results",
    body: "Color products are skincare first — formulated to layer into your routine, not on top of it.",
  },
  {
    title: "Real ingredients listed",
    body: "Active percentages disclosed, vegan and Leaping Bunny cruelty-free across the entire line.",
  },
];

export const CleanBeautyBand = () => (
  <section className="bg-petal/40 border-y border-border/60">
    <div className="container py-6 md:py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5 md:mb-8">
        <div>
          <p className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-taupe">The Tintelle standard</p>
          <h2 className="mt-2 font-serif font-light text-mauve text-2xl md:text-3xl leading-tight">
            Clean beauty, done <span className="italic">honestly</span>.
          </h2>
        </div>
        <Link
          to="/clean-beauty-brands"
          className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-mauve pb-1 border-b border-mauve hover:text-primary hover:border-primary transition-colors w-fit"
        >
          Compare clean beauty brands →
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4 md:gap-8">
        {PILLARS.map((p) => (
          <div key={p.title} className="border-t border-mauve/30 pt-3 md:pt-4">
            <h3 className="font-serif text-mauve text-base md:text-lg">{p.title}</h3>
            <p className="mt-1.5 text-taupe text-xs md:text-sm leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
