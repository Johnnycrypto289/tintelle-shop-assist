import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { PageShell } from "@/components/tintelle/PageShell";
import { ProductCard } from "@/components/tintelle/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const FILTERS = ["All", "Face", "Lips", "Eyes"] as const;

const filterFor = (label: (typeof FILTERS)[number]) => {
  switch (label) {
    case "Face":
      return "tag:face OR product_type:Face OR product_type:Cheek OR product_type:'Skin Tint' OR product_type:'Blush Palette'";
    case "Lips":
      return "tag:lips OR product_type:Lip OR product_type:'Lip Tint' OR product_type:'Lip Gloss' OR product_type:'Lip Liner'";
    case "Eyes":
      return "tag:eyes OR product_type:Eye OR product_type:'Eye Treatment' OR product_type:'Eye Makeup'";
    default:
      return undefined;
  }
};

// Order in which subcategory groups should appear when showing "All" or a Face/Lips/Eyes view.
const GROUP_ORDER = [
  // Lips
  "Lip Tint",
  "Lip Gloss",
  "Lip Liner",
  // Face — granular subcategories
  "Foundation",
  "BB Cream",
  "Concealer",
  "Bronzer",
  "Blush Palette",
  "Skincare",
  "Tools",
  "Face",
  // Eyes
  "Eyeshadow Palette",
  "Eye Makeup",
  "Eye Treatment",
  "Hydro Pencil",
];

const sortGroups = (a: string, b: string) => {
  const ai = GROUP_ORDER.indexOf(a);
  const bi = GROUP_ORDER.indexOf(b);
  if (ai === -1 && bi === -1) return a.localeCompare(b);
  if (ai === -1) return 1;
  if (bi === -1) return -1;
  return ai - bi;
};

// Resolve a finer-grained subcategory using title + tags so the giant generic
// "Face" bucket gets split into real subgroups customers expect.
type ProdNode = {
  title: string;
  productType?: string;
  tags?: string[];
};

const resolveSubcategory = (node: ProdNode): string => {
  const title = node.title || "";
  const tags = (node.tags || []).map((t) => t.toLowerCase());
  const has = (t: string) => tags.includes(t);

  if (/foundation/i.test(title) || has("foundation")) return "Foundation";
  if (/bb\s*cream/i.test(title) || has("bb-cream")) return "BB Cream";
  if (/concealer/i.test(title) || has("concealer")) return "Concealer";
  if (/bronzer/i.test(title)) return "Bronzer";
  if (/blush\s*palette/i.test(title)) return "Blush Palette";
  if (/eyeshadow\s*palette/i.test(title)) return "Eyeshadow Palette";
  if (/eyebrow\s*pencil/i.test(title)) return "Hydro Pencil";
  if (/serum/i.test(title) || has("serum") || has("skincare")) return "Skincare";
  if (/blender|brush|sponge/i.test(title) || has("tools") || has("blender")) return "Tools";

  return node.productType?.trim() || "Other";
};


const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const handleFilterClick = (f: (typeof FILTERS)[number]) => {
    setFilter(f);
    if (category) {
      const next = new URLSearchParams(searchParams);
      next.delete("category");
      setSearchParams(next, { replace: true });
    }
  };

  const VIRTUAL_CATEGORY_QUERIES: Record<string, string> = {
    "Hydro Pencil": "title:'Eyebrow Pencil'",
    "BB Cream": "tag:bb-cream",
    "Foundation": "tag:foundation",
  };

  const query = category
    ? VIRTUAL_CATEGORY_QUERIES[category] ??
      `product_type:"${category.replace(/"/g, '\\"')}"`
    : filterFor(filter);

  const { data: products, isLoading } = useProducts(query, 100);
  const list = useMemo(() => products ?? [], [products]);

  const grouped = useMemo(() => {
    if (category) return null;
    const map = new Map<string, typeof list>();
    list.forEach((p) => {
      const sub = resolveSubcategory(p.node as ProdNode);
      if (!map.has(sub)) map.set(sub, []);
      map.get(sub)!.push(p);
    });
    return Array.from(map.entries()).sort(([a], [b]) => sortGroups(a, b));
  }, [list, category]);

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
        ) : grouped ? (
          <div className="space-y-14 md:space-y-20">
            {grouped.map(([groupName, items]) => (
              <div key={groupName}>
                <div className="flex items-baseline justify-between mb-5 md:mb-8 pb-2 md:pb-3 border-b border-border">
                  <h2 className="font-serif text-2xl md:text-3xl text-mauve">{groupName}</h2>
                  <span className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-taupe">
                    {items.length} {items.length === 1 ? "product" : "products"}
                  </span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
                  {items.map((p) => (
                    <ProductCard key={p.node.id} product={p} fromCategory={groupName} />
                  ))}
                </div>
              </div>
            ))}
          </div>
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
