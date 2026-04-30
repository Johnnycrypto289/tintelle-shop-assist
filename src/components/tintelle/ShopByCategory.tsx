import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import type { ShopifyProduct } from "@/lib/shopify";

interface CategoryTile {
  name: string;        // display name
  filterKey: string;   // value passed in ?category=
  imageUrl: string | null;
  imageAlt: string;
}

// Virtual sub-categories detected by product title keywords.
// Each rule overrides the productType so eyebrow pencils get their own tile
// instead of being lumped under "Eye Makeup".
const VIRTUAL_CATEGORIES: { match: RegExp; name: string }[] = [
  { match: /eyebrow pencil/i, name: "Hydro Pencil" },
];

const resolveCategory = (p: ShopifyProduct): string | null => {
  for (const v of VIRTUAL_CATEGORIES) {
    if (v.match.test(p.node.title)) return v.name;
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
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-taupe">Shop by Category</p>
          <h2 className="font-serif text-3xl md:text-4xl text-mauve mt-3">Explore the Collection</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-mauve" />
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-taupe py-12">No categories found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-10 md:gap-y-12">
            {categories.map((c) => (
              <Link
                key={c.name}
                to={`/shop?category=${encodeURIComponent(c.filterKey)}`}
                className="group flex flex-col items-center gap-4 text-center"
              >
                <div className="aspect-square w-32 md:w-40 rounded-full overflow-hidden bg-cream transition-transform duration-500 group-hover:scale-105">
                  {c.imageUrl ? (
                    <img
                      src={c.imageUrl}
                      alt={c.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-petal" aria-hidden />
                  )}
                </div>
                <span className="font-serif text-mauve text-lg">{c.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
