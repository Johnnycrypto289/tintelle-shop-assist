import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, Search as SearchIcon } from "lucide-react";
import { PageShell } from "@/components/tintelle/PageShell";
import { useProducts } from "@/hooks/useProducts";
import { JOURNAL_POSTS } from "@/data/journal";
import { formatPrice } from "@/lib/shopify";

const HELP = [
  { title: "How do returns work?", href: "/shipping", excerpt: "Free returns within 30 days, including our shade-match guarantee." },
  { title: "Track your order", href: "/track", excerpt: "Look up an order by ID and email for live tracking." },
  { title: "Contact support", href: "/contact", excerpt: "Our team replies within one business day." },
  { title: "FAQ", href: "/faq", excerpt: "Common questions on shipping, ingredients, and care." },
];

const Search = () => {
  const [params, setParams] = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const [debounced, setDebounced] = useState(initial);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (debounced) setParams({ q: debounced }, { replace: true });
    else setParams({}, { replace: true });
  }, [debounced, setParams]);

  const { data: products, isLoading } = useProducts(debounced ? `title:*${debounced}*` : undefined, 12);
  const productHits = (products ?? []).filter((p) =>
    debounced ? p.node.title.toLowerCase().includes(debounced.toLowerCase()) : true
  );
  const journalHits = useMemo(
    () =>
      JOURNAL_POSTS.filter(
        (p) =>
          !debounced ||
          p.title.toLowerCase().includes(debounced.toLowerCase()) ||
          p.tags.join(" ").toLowerCase().includes(debounced.toLowerCase())
      ),
    [debounced]
  );
  const helpHits = HELP.filter((h) =>
    !debounced || h.title.toLowerCase().includes(debounced.toLowerCase())
  );

  const Section = ({ title, count, children }: { title: string; count: number; children: React.ReactNode }) =>
    count > 0 ? (
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-serif text-2xl text-mauve">{title}</h2>
          <span className="text-xs tracking-[0.18em] uppercase text-taupe">{count} {count === 1 ? "result" : "results"}</span>
        </div>
        {children}
      </section>
    ) : null;

  return (
    <PageShell title="Search" description="Search Tintelle products, journal, and help.">
      <section className="container pt-12 pb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-taupe">Search Tintelle</p>
        <div className="relative mt-4 max-w-2xl">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-taupe" strokeWidth={1.5} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder="Try ‘peptide’, ‘shade match’, ‘routine’…"
            className="w-full pl-12 pr-4 h-14 bg-card border border-border focus:border-primary outline-none text-lg font-serif text-mauve rounded-none"
          />
        </div>
        {debounced && (
          <p className="text-sm text-taupe mt-3">
            Showing results for <span className="text-mauve">“{debounced}”</span>
          </p>
        )}
      </section>

      <section className="container pb-24">
        {isLoading && debounced ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-mauve" />
          </div>
        ) : !debounced ? (
          <p className="text-taupe py-12 text-center">Start typing to search.</p>
        ) : productHits.length + journalHits.length + helpHits.length === 0 ? (
          <p className="text-taupe py-12 text-center">Nothing matched. Try a different word.</p>
        ) : (
          <>
            <Section title="Products" count={productHits.length}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {productHits.map((p) => {
                  const img = p.node.images.edges[0]?.node;
                  return (
                    <Link
                      key={p.node.id}
                      to={`/product/${p.node.handle}`}
                      className="group bg-card border border-border hover:border-primary/40 transition-colors"
                    >
                      <div className="aspect-square bg-cream overflow-hidden">
                        {img && <img src={img.url} alt={p.node.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />}
                      </div>
                      <div className="p-4 text-center">
                        <p className="font-serif text-mauve">{p.node.title}</p>
                        <p className="font-serif text-mauve text-sm mt-1">
                          {formatPrice(p.node.priceRange.minVariantPrice.amount, p.node.priceRange.minVariantPrice.currencyCode)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Section>

            <Section title="Journal" count={journalHits.length}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {journalHits.map((p) => (
                  <Link
                    key={p.id}
                    to={`/journal/${p.slug}`}
                    className="block border border-border bg-card p-6 hover:border-primary/40 transition-colors"
                  >
                    <p className="text-[11px] tracking-[0.25em] uppercase text-taupe">{p.category}</p>
                    <h3 className="font-serif text-xl text-mauve mt-2">{p.title}</h3>
                    <p className="text-sm text-taupe mt-2 leading-relaxed">{p.excerpt.slice(0, 140)}…</p>
                  </Link>
                ))}
              </div>
            </Section>

            <Section title="Help" count={helpHits.length}>
              <ul className="divide-y divide-border border-y border-border">
                {helpHits.map((h) => (
                  <li key={h.title}>
                    <Link to={h.href} className="block py-5 hover:bg-cream/40 transition-colors px-2">
                      <p className="font-serif text-mauve">{h.title}</p>
                      <p className="text-sm text-taupe mt-1">{h.excerpt}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          </>
        )}
      </section>
    </PageShell>
  );
};

export default Search;
