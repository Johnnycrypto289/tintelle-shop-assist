import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { TiltedCategoryTile } from "@/components/tintelle/TiltedCategoryTile";
import type { ShopifyProduct } from "@/lib/shopify";

interface CategoryTile {
  name: string;
  filterKey: string;
  imageUrl: string | null;
  imageAlt: string;
}

const VIRTUAL_CATEGORIES: { match: (p: ShopifyProduct) => boolean; name: string }[] = [
  { match: (p) => /eyebrow pencil/i.test(p.node.title), name: "Hydro Pencil" },
  {
    match: (p) =>
      /bb cream/i.test(p.node.title) ||
      (p.node.tags ?? []).some((t) => /bb[-\s]?cream/i.test(t)),
    name: "BB Cream",
  },
];

const resolveCategory = (p: ShopifyProduct): string | null => {
  for (const v of VIRTUAL_CATEGORIES) {
    if (v.match(p)) return v.name;
  }
  return p.node.productType?.trim() || null;
};

const buildCategories = (products: ShopifyProduct[]): CategoryTile[] => {
  const map = new Map<string, CategoryTile>();
  for (const p of products) {
    const name = resolveCategory(p);
    if (!name) continue;
    if (map.has(name)) continue;
    const img = p.node.images.edges[0]?.node;
    map.set(name, {
      name,
      filterKey: name,
      imageUrl: img?.url ?? null,
      imageAlt: img?.altText || name,
    });
  }
  return Array.from(map.values());
};

export const ShopByCategory = () => {
  const { data: products, isLoading } = useProducts(undefined, 100);
  const categories = buildCategories(products ?? []);

  return (
    <section className="py-12 md:py-24">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-8 md:mb-12">
          <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-taupe">Shop by Category</p>
          <h2 className="font-serif text-2xl md:text-4xl text-mauve mt-2.5 md:mt-3">Explore the Collection</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-mauve" />
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-taupe py-12">No categories found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:gap-x-10 md:gap-y-12">
            {categories.map((c) => (
              <TiltedCategoryTile
                key={c.name}
                to={`/shop?category=${encodeURIComponent(c.filterKey)}`}
                name={c.name}
                imageUrl={c.imageUrl}
                imageAlt={c.imageAlt}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
