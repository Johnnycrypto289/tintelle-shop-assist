import { useMemo, useState } from "react";
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
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const { data: products, isLoading } = useProducts(filterFor(filter), 24);

  const list = useMemo(() => products ?? [], [products]);

  return (
    <PageShell title="Shop" description="The full Tintelle collection — tinted skincare hybrids.">
      <section className="container pt-16 pb-6">
        <p className="text-xs tracking-[0.3em] uppercase text-taupe">The Collection</p>
        <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">Shop everything.</h1>
        <p className="text-base md:text-lg text-taupe max-w-xl leading-relaxed mt-4">
          Every formula is a skincare-makeup hybrid. Build your routine one tint at a time.
        </p>
      </section>

      <section className="container pb-24">
        <div className="flex gap-6 md:gap-8 mb-8 border-b border-border pb-4 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
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

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-mauve" />
          </div>
        ) : list.length === 0 ? (
          <p className="text-center text-taupe py-20">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {list.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
};

export default Shop;
