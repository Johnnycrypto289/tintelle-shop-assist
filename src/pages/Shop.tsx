import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { PageShell } from "@/components/tintelle/PageShell";
import { ProductCard } from "@/components/tintelle/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const FILTERS = ["All", "Face", "Lips", "Eyes", "Bundles"] as const;

const filterFor = (label: (typeof FILTERS)[number]) => {
  switch (label) {
    case "Face":
      return "tag:face OR product_type:Face OR product_type:Cheek OR product_type:'Skin Tint'";
    case "Lips":
      return "tag:lips OR product_type:Lip OR product_type:'Lip Tint'";
    case "Eyes":
      return "tag:eyes OR product_type:Eye OR product_type:'Eye Treatment'";
    case "Bundles":
      return "tag:bundle OR product_type:Bundle";
    default:
      return undefined;
  }
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  // When user clicks a top-level filter tab, clear the category param
  const handleFilterClick = (f: (typeof FILTERS)[number]) => {
    setFilter(f);
    if (category) {
      const next = new URLSearchParams(searchParams);
      next.delete("category");
      setSearchParams(next, { replace: true });
    }
  };

  // Virtual categories filter by title instead of productType
  const VIRTUAL_CATEGORY_QUERIES: Record<string, string> = {
    "Hydro Pencil": "title:'Eyebrow Pencil'",
  };

  // If a category is set in URL, that takes precedence over filter tabs
  const query = category
    ? VIRTUAL_CATEGORY_QUERIES[category] ??
      `product_type:"${category.replace(/"/g, '\\"')}"`
    : filterFor(filter);

  const { data: products, isLoading } = useProducts(query, 50);
  const list = useMemo(() => products ?? [], [products]);

  // Reset tab highlight when category param is active
  useEffect(() => {
    if (category) setFilter("All");
  }, [category]);

  const heading = category ?? "Shop everything.";
  const eyebrow = category ? "Category" : "The Collection";

  return (
    <PageShell title={category ?? "Shop"} description="The full Tintelle collection — tinted skincare hybrids.">
      <section className="container pt-10 md:pt-16 pb-4 md:pb-6">
        <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-taupe">{eyebrow}</p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">{heading}</h1>
        <p className="text-sm md:text-lg text-taupe max-w-xl leading-relaxed mt-3 md:mt-4">
          {category
            ? `Browse all ${category.toLowerCase()}.`
            : "Every formula is a skincare-makeup hybrid. Build your routine one tint at a time."}
        </p>
      </section>

      <section className="container pb-16 md:pb-24">
        {!category && (
          <div className="flex gap-5 md:gap-8 mb-6 md:mb-8 border-b border-border pb-3 md:pb-4 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => handleFilterClick(f)}
                className={`text-xs tracking-[0.18em] uppercase pb-1.5 border-b transition-colors whitespace-nowrap ${
                  filter === f
                    ? "text-mauve border-mauve"
                    : "text-taupe border-transparent hover:text-mauve"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-mauve" />
          </div>
        ) : list.length === 0 ? (
          <p className="text-center text-taupe py-20">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
            {list.map((p) => (
              <ProductCard key={p.node.id} product={p} fromCategory={category ?? undefined} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
};

export default Shop;
