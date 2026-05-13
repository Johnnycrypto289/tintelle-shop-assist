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
    <div className="container py-10 md:py-14">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
        <div>
          <p className="text-[11px] tracking-[0.4em] uppercase text-taupe">The Tintelle standard</p>
          <h2 className="mt-3 font-serif font-light text-mauve text-3xl md:text-4xl leading-tight">
            Clean beauty, done <span className="italic">honestly</span>.
          </h2>
        </div>
        <Link
          to="/clean-beauty-brands"
          className="text-[11px] tracking-[0.32em] uppercase text-mauve pb-1 border-b border-mauve hover:text-primary hover:border-primary transition-colors w-fit"
        >
          Compare clean beauty brands →
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6 md:gap-10">
        {PILLARS.map((p) => (
          <div key={p.title} className="border-t border-mauve/30 pt-5">
            <h3 className="font-serif text-mauve text-xl">{p.title}</h3>
            <p className="mt-2 text-taupe text-sm leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
