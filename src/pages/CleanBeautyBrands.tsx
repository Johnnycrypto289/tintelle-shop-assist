import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/tintelle/PageShell";

import {
  CLEAN_BEAUTY_BRANDS,
  BRAND_FAQS,
  PILLAR_FAQS,
} from "@/data/cleanBeautyBrands";

const PAGE_URL = "https://tintellebeauty.com/clean-beauty-brands";
const PUBLISHED = "2026-05-13";

const CleanBeautyBrands = () => {
  // Inject Article + FAQPage JSON-LD (PageShell handles the standard meta tags).
  useEffect(() => {
    const article = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Clean Beauty Brands in 2026: The Honest Guide",
      description:
        "A no-fluff comparison of clean beauty brands — what 'clean' actually means, who's doing it well, and how Tintelle fits in.",
      author: { "@type": "Organization", name: "Tintelle Editorial" },
      publisher: {
        "@type": "Organization",
        name: "Tintelle",
        logo: {
          "@type": "ImageObject",
          url: "https://tintellebeauty.com/favicon.ico",
        },
      },
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      mainEntityOfPage: PAGE_URL,
    };

    const faq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [...PILLAR_FAQS, ...BRAND_FAQS.map((b) => ({ question: b.question, answer: b.answer }))].map(
        (q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: { "@type": "Answer", text: q.answer },
        }),
      ),
    };

    const make = (id: string, data: unknown) => {
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement("script");
        el.id = id;
        el.type = "application/ld+json";
        document.head.appendChild(el);
      }
      el.text = JSON.stringify(data);
      return el;
    };

    const a = make("ld-cbb-article", article);
    const f = make("ld-cbb-faq", faq);
    return () => {
      a.remove();
      f.remove();
    };
  }, []);

  return (
    <PageShell
      title="Clean Beauty Brands in 2026: The Honest Guide"
      description="A no-fluff comparison of clean beauty brands — what 'clean' actually means, who's doing it well, and how Tintelle fits in. Updated 2026."
      ogType="article"
    >
      <article className="bg-background">
        {/* Hero */}
        <header className="bg-bone border-b border-border/60">
          <div className="container py-10 md:py-16 max-w-4xl">
            <nav className="text-[11px] tracking-[0.2em] uppercase text-taupe">
              <Link to="/" className="hover:text-mauve transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-mauve">Clean Beauty Brands</span>
            </nav>
            <p className="mt-6 text-[11px] tracking-[0.4em] uppercase text-taupe">
              The Tintelle Guide · Updated 2026
            </p>
            <h1 className="mt-4 font-serif font-light text-mauve text-4xl md:text-6xl leading-[1.05] tracking-[-0.01em]">
              Clean beauty brands in 2026:
              <br />
              <span className="italic">the honest guide.</span>
            </h1>
            <p className="mt-6 text-taupe text-base md:text-lg max-w-2xl leading-relaxed">
              "Clean beauty" is the most-used and least-defined phrase in modern cosmetics. Here is what
              the term actually means, the brands doing it well, and where Tintelle fits in the
              conversation — written without affiliate links or paid placements.
            </p>
          </div>
        </header>

        <div className="container max-w-4xl py-12 md:py-16 space-y-14 text-mauve">
          {/* Section 1: What clean beauty means */}
          <section className="space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-light">What "clean beauty" actually means</h2>
            <p className="text-taupe leading-relaxed">
              There is no FDA-regulated definition of clean beauty. In practice, the term refers to
              brands that publish a transparent free-from list, disclose every ingredient on the label,
              and avoid substances flagged by independent bodies — most commonly the EWG's Skin Deep
              database and the European Union's restricted-ingredient list, which is roughly a decade
              ahead of US regulation.
            </p>
            <p className="text-taupe leading-relaxed">
              The most rigorous clean beauty brands go further: third-party safety testing,
              dermatologist review, sustainable sourcing, and recyclable packaging. The least rigorous
              simply skip parabens and call it a day. The comparison below sorts the difference.
            </p>
          </section>

          {/* Section 2: How we evaluated */}
          <section className="space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-light">How we evaluated each brand</h2>
            <ul className="text-taupe leading-relaxed space-y-2 list-disc pl-5">
              <li><strong className="text-mauve">Ingredient transparency</strong> — full INCI deck on every product page, not just hero ingredients.</li>
              <li><strong className="text-mauve">Standards body</strong> — which clean list the brand follows (EWG, Credo, Sephora Clean, EU).</li>
              <li><strong className="text-mauve">Vegan & cruelty-free</strong> — Leaping Bunny status and animal-derived ingredient use.</li>
              <li><strong className="text-mauve">Dermatologist or clinical testing</strong> — independent review of finished formulas.</li>
              <li><strong className="text-mauve">Price tier</strong> — accessibility relative to the rest of the clean beauty set.</li>
            </ul>
          </section>

          {/* Section 3: The brands table */}
          <section className="space-y-5">
            <h2 className="font-serif text-3xl md:text-4xl font-light">The clean beauty brands worth knowing</h2>
            <p className="text-taupe leading-relaxed">
              Sorted alphabetically after Tintelle. Where to buy is current as of 2026; brands rotate
              retailers more than they used to.
            </p>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="min-w-[720px] w-full text-sm">
                <thead>
                  <tr className="border-b border-mauve/30 text-left text-[11px] tracking-[0.2em] uppercase text-taupe">
                    <th className="py-3 pr-3 font-medium">Brand</th>
                    <th className="py-3 pr-3 font-medium">Founded</th>
                    <th className="py-3 pr-3 font-medium">Focus</th>
                    <th className="py-3 pr-3 font-medium">Signature</th>
                    <th className="py-3 pr-3 font-medium">Clean standard</th>
                    <th className="py-3 pr-3 font-medium">Price</th>
                    <th className="py-3 pr-3 font-medium">Vegan</th>
                    <th className="py-3 pr-3 font-medium">Where to buy</th>
                  </tr>
                </thead>
                <tbody className="text-taupe">
                  {CLEAN_BEAUTY_BRANDS.map((b) => (
                    <tr key={b.name} className="border-b border-border/60 align-top">
                      <td className="py-4 pr-3 font-serif text-mauve text-base">{b.name}</td>
                      <td className="py-4 pr-3">{b.founded}</td>
                      <td className="py-4 pr-3">{b.focus}</td>
                      <td className="py-4 pr-3">{b.signature}</td>
                      <td className="py-4 pr-3">{b.cleanStandard}</td>
                      <td className="py-4 pr-3">{b.priceTier}</td>
                      <td className="py-4 pr-3">{b.vegan}</td>
                      <td className="py-4 pr-3">{b.whereToBuy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Is X clean? mini-FAQ */}
          <section className="space-y-5">
            <h2 className="font-serif text-3xl md:text-4xl font-light">"Is [brand] clean beauty?" — quick answers</h2>
            <p className="text-taupe leading-relaxed">
              The questions we get asked most about other brands. Honest two-sentence answers, with no
              hidden agenda.
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              {BRAND_FAQS.map((q) => (
                <div key={q.brand} className="border-l-2 border-mauve/40 pl-4 py-1">
                  <h3 className="font-serif text-mauve text-lg">{q.question}</h3>
                  <p className="mt-2 text-taupe leading-relaxed text-[15px]">{q.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Where Tintelle fits */}
          <section className="space-y-4 bg-bone/60 -mx-4 md:mx-0 px-4 md:px-10 py-10 md:py-12 border-y border-border/60 md:border md:rounded-sm">
            <h2 className="font-serif text-3xl md:text-4xl font-light">Where Tintelle fits in</h2>
            <p className="text-taupe leading-relaxed">
              On the skincare-makeup hybrid axis, Tintelle sits closest to <strong>Ilia</strong> and
              <strong> Merit</strong>: complexion-and-color products designed to work like the next layer
              of your skincare routine, not on top of it. Our standard borrows the strictness of the EU
              restricted list, EWG-aligned ingredient sourcing, and dermatologist testing — closer to
              Westman Atelier on rigor — but at a price point between Tower 28 and Saie.
            </p>
            <p className="text-taupe leading-relaxed">
              We publish every ingredient on every product page, list percentages for actives, and never
              use synthetic fragrance. Every formula is vegan and Leaping Bunny cruelty-free. Where we
              differ from most of the brands above: we treat color products as skincare first, which is
              why our lipsticks, gloss, and BB cream sit alongside our serums in the same routine.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center text-[11px] tracking-[0.32em] uppercase text-mauve pb-1.5 border-b border-mauve hover:text-primary hover:border-primary transition-colors"
              >
                Shop the collection →
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center text-[11px] tracking-[0.32em] uppercase text-taupe pb-1.5 border-b border-taupe/50 hover:text-mauve hover:border-mauve transition-colors"
              >
                Our ingredient standards →
              </Link>
            </div>
          </section>

          {/* Section 6: Routine */}
          <section className="space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-light">How to start a clean beauty routine</h2>
            <ol className="space-y-4 text-taupe leading-relaxed list-decimal pl-5">
              <li>
                <strong className="text-mauve">Audit, don't overhaul.</strong> Open your bathroom drawer
                and check your three most-used products against the EWG Skin Deep database. Replace only
                what scores poorly.
              </li>
              <li>
                <strong className="text-mauve">Start with serums.</strong> What sits longest on skin
                matters most. See our{" "}
                <Link to="/shop?category=serums" className="underline decoration-mauve/40 hover:decoration-mauve">
                  serum apothecary
                </Link>
                .
              </li>
              <li>
                <strong className="text-mauve">Switch complexion next.</strong> Foundation and BB cream
                cover the most surface area — choose skincare-infused over full-coverage when you can.
              </li>
              <li>
                <strong className="text-mauve">Color comes last.</strong> Lipstick, gloss, and blush are
                the easiest swap because the formulas are simpler. Our{" "}
                <Link to="/shop?category=lipstick" className="underline decoration-mauve/40 hover:decoration-mauve">
                  lipstick wardrobe
                </Link>{" "}
                is a good starting point.
              </li>
            </ol>
          </section>

          {/* Section 7: Pillar FAQ */}
          <section className="space-y-5">
            <h2 className="font-serif text-3xl md:text-4xl font-light">Frequently asked questions</h2>
            <div className="divide-y divide-border/60 border-y border-border/60">
              {PILLAR_FAQS.map((q) => (
                <details key={q.question} className="group py-5">
                  <summary className="flex items-start justify-between cursor-pointer list-none gap-6">
                    <h3 className="font-serif text-mauve text-lg md:text-xl">{q.question}</h3>
                    <span className="text-mauve text-2xl leading-none transition-transform group-open:rotate-45 select-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-taupe leading-relaxed">{q.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Closing CTA */}
          <section className="text-center py-8 md:py-12 border-t border-border/60">
            <p className="text-[11px] tracking-[0.4em] uppercase text-taupe">Ready to switch?</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-light text-mauve">
              Explore Tintelle's clean beauty edit
            </h2>
            <Link
              to="/shop"
              className="inline-flex items-center mt-6 text-[11px] tracking-[0.32em] uppercase text-mauve pb-1.5 border-b border-mauve hover:text-primary hover:border-primary transition-colors"
            >
              Shop the collection →
            </Link>
          </section>
        </div>
      </article>
    </PageShell>
  );
};

export default CleanBeautyBrands;
