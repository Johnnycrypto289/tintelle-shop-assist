import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { JOURNAL_AUTHORS, JOURNAL_CATEGORIES, JOURNAL_POSTS } from "@/data/journal";
import { PageShell } from "@/components/tintelle/PageShell";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const Journal = () => {
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get("category") ?? "all";
  const queryParam = params.get("q") ?? "";
  const [query, setQuery] = useState(queryParam);

  const featured = JOURNAL_POSTS.find((p) => p.featured) ?? JOURNAL_POSTS[0];

  const filtered = useMemo(() => {
    return JOURNAL_POSTS.filter((p) => {
      const inCategory = activeCategory === "all" || p.category === activeCategory;
      const inQuery =
        !query.trim() ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.join(" ").toLowerCase().includes(query.toLowerCase());
      return inCategory && inQuery;
    });
  }, [activeCategory, query]);

  const setCategory = (cat: string) => {
    const next = new URLSearchParams(params);
    if (cat === "all") next.delete("category");
    else next.set("category", cat);
    setParams(next, { replace: true });
  };

  return (
    <PageShell title="Journal" description="Notes, rituals, and ingredient stories from Tintelle.">
      <section className="container pt-14 pb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-taupe">The Journal</p>
        <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">
          Notes from the studio.
        </h1>
        <p className="text-base md:text-lg text-taupe max-w-xl leading-relaxed mt-4">
          Skin-first rituals, ingredient stories, and shade-finder field guides.
        </p>
      </section>

      {featured && (
        <section className="container pb-12">
          <Link
            to={`/journal/${featured.slug}`}
            className="grid md:grid-cols-2 gap-8 md:gap-12 group items-center bg-card border border-border"
          >
            <div className="aspect-[4/3] bg-cream overflow-hidden">
              <img
                src={featured.hero.src}
                alt={featured.hero.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-6 md:p-10">
              <p className="text-[11px] tracking-[0.3em] uppercase text-primary">Featured · {featured.category}</p>
              <h2 className="font-serif text-2xl md:text-4xl text-mauve mt-4 leading-tight">
                {featured.title}
              </h2>
              <p className="text-taupe mt-4 leading-relaxed">{featured.subtitle}</p>
              <p className="text-xs tracking-[0.18em] uppercase text-taupe mt-6">
                {JOURNAL_AUTHORS[featured.author]?.name} · {featured.readTime} min · {formatDate(featured.publishedAt)}
              </p>
            </div>
          </Link>
        </section>
      )}

      <section className="container pb-8 flex flex-wrap gap-3 md:gap-4 items-center justify-between border-b border-border">
        <div className="flex flex-wrap gap-4 md:gap-6">
          {[{ slug: "all", name: "All" }, ...JOURNAL_CATEGORIES].map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={`text-xs tracking-[0.18em] uppercase pb-2 border-b transition-colors ${
                activeCategory === c.slug ? "text-mauve border-mauve" : "text-taupe border-transparent hover:text-mauve"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the journal"
          className="w-full md:w-64 px-4 py-2.5 bg-card border border-border focus:border-primary outline-none text-sm rounded-none"
        />
      </section>

      <section className="container py-12 pb-24">
        {filtered.length === 0 ? (
          <p className="text-center text-taupe py-12">No posts matched your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filtered.map((p) => (
              <Link key={p.id} to={`/journal/${p.slug}`} className="group block">
                <div className="aspect-[4/5] bg-cream overflow-hidden">
                  <img
                    src={p.hero.src}
                    alt={p.hero.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-taupe mt-5">{p.category}</p>
                <h3 className="font-serif text-xl md:text-2xl text-mauve mt-2 leading-snug group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-taupe mt-2 leading-relaxed">{p.excerpt.slice(0, 140)}…</p>
                <p className="text-[11px] tracking-[0.18em] uppercase text-taupe mt-3">
                  {JOURNAL_AUTHORS[p.author]?.name} · {p.readTime} min
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
};

export default Journal;
