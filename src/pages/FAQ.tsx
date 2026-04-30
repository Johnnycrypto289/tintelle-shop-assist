import { useMemo, useState } from "react";
import { PageShell } from "@/components/tintelle/PageShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ_DATA = [
  {
    category: "Orders",
    items: [
      { q: "How long does it take to process my order?", a: "Orders ship within 1–2 business days. You'll get tracking the moment it's on the truck." },
      { q: "Can I edit or cancel an order?", a: "Yes — within 60 minutes of placing it. After that the warehouse takes over. Email hi@tintellebeauty.com and we'll do our best." },
      { q: "Do you ship internationally?", a: "U.S., Canada, and the U.K. for now. EU and Australia later this year." },
    ],
  },
  {
    category: "Returns",
    items: [
      { q: "What's the 30-day shade match?", a: "If your shade is off, we replace or refund — no questions asked, within 30 days of delivery." },
      { q: "Are returns free?", a: "Yes. We email a prepaid label and refund within 5 business days of receiving the return." },
      { q: "Can I return an opened product?", a: "For shade matches, yes. For other reasons, please return unopened with seals intact." },
    ],
  },
  {
    category: "Ingredients",
    items: [
      { q: "Are your products vegan?", a: "Every formula. We don't use beeswax, lanolin, carmine, or any animal-derived ingredient." },
      { q: "Are you cruelty-free?", a: "Yes — Leaping Bunny certified. We never test on animals and don't sell in regions that require it." },
      { q: "What's not in your formulas?", a: "No parabens, phthalates, synthetic fragrance, oxybenzone, or formaldehyde-releasers." },
    ],
  },
  {
    category: "Care",
    items: [
      { q: "How should I store the products?", a: "Cool and dry, out of direct sunlight. Glass primaries hold up well at room temperature." },
      { q: "How long does each product last?", a: "Skin Tint lasts ~2 months, Lip and Cheek Tints ~3–4 months at daily use." },
      { q: "Are the formulas pregnancy-safe?", a: "Most are — but we always recommend checking with your doctor. We're happy to share full ingredient lists by email." },
    ],
  },
];

const FAQ = () => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query.trim()) return FAQ_DATA;
    const q = query.toLowerCase();
    return FAQ_DATA.map((cat) => ({
      ...cat,
      items: cat.items.filter((i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q)),
    })).filter((c) => c.items.length > 0);
  }, [query]);

  return (
    <PageShell title="FAQ" description="Frequently asked questions about Tintelle products, shipping, and returns.">
      <section className="container pt-14 pb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-taupe">Help center</p>
        <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">
          Frequently asked.
        </h1>
        <p className="text-base md:text-lg text-taupe max-w-xl leading-relaxed mt-4">
          Can't find your answer? Email <a className="text-mauve underline-offset-4 hover:underline" href="mailto:hi@tintellebeauty.com">hi@tintellebeauty.com</a>.
        </p>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the FAQ"
          className="w-full md:max-w-md mt-6 px-4 py-3 bg-card border border-border focus:border-primary outline-none rounded-none"
        />
      </section>

      <section className="container pb-24 space-y-12">
        {filtered.length === 0 ? (
          <p className="text-taupe text-center py-12">Nothing matched. Try a different word.</p>
        ) : (
          filtered.map((cat) => (
            <div key={cat.category}>
              <h2 className="font-serif text-2xl text-mauve mb-4">{cat.category}</h2>
              <Accordion type="single" collapsible className="border-t border-border">
                {cat.items.map((item) => (
                  <AccordionItem key={item.q} value={item.q} className="border-border">
                    <AccordionTrigger className="text-mauve font-serif text-base text-left">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-taupe leading-relaxed">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))
        )}
      </section>
    </PageShell>
  );
};

export default FAQ;
