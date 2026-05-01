import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { resolveSubcategory } from "@/lib/categories";
import { ProductCard } from "./ProductCard";
import type { ShopifyProduct } from "@/lib/shopify";

type Tab = {
  key: string;
  label: string;
  match: (p: ShopifyProduct) => boolean;
};

const TABS: Tab[] = [
  { key: "bestsellers", label: "Bestsellers", match: (p) => (p.node.tags ?? []).some((t) => /bestseller/i.test(t)) },
  { key: "foundation", label: "Foundation", match: (p) => resolveSubcategory(p.node) === "Foundation" },
  { key: "bb-cream", label: "BB Cream", match: (p) => resolveSubcategory(p.node) === "BB Cream" },
  { key: "lip-gloss", label: "Lip Gloss", match: (p) => resolveSubcategory(p.node) === "Lip Gloss" },
  { key: "lip-liner", label: "Lip Liner", match: (p) => resolveSubcategory(p.node) === "Lip Liner" },
  { key: "eye-treatment", label: "Eye Treatment", match: (p) => resolveSubcategory(p.node) === "Eye Treatment" },
  { key: "eye-makeup", label: "Eye Makeup", match: (p) => resolveSubcategory(p.node) === "Eye Makeup" },
  { key: "hydro-pencil", label: "Hydro Pencil", match: (p) => resolveSubcategory(p.node) === "Hydro Pencil" },
  { key: "blush-palette", label: "Blush Palette", match: (p) => resolveSubcategory(p.node) === "Blush Palette" },
];

export const CuratedFavorites = () => {
  const { data: products, isLoading } = useProducts(undefined, 100);
  const [activeKey, setActiveKey] = useState<string>("bestsellers");

  const activeTab = TABS.find((t) => t.key === activeKey) ?? TABS[0];
  const items = (products ?? []).filter(activeTab.match).slice(0, 4);

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-8 md:mb-10">
          <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-taupe">Shop by Category</p>
          <h2 className="font-serif text-2xl md:text-4xl text-mauve mt-2.5 md:mt-3">Curated Favorites</h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:gap-x-8 mb-8 md:mb-12 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-x-5 gap-y-3 md:gap-x-8 overflow-x-auto md:overflow-visible w-full md:w-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {TABS.map((tab) => {
              const isActive = tab.key === activeKey;
              return (
                <button
                  key={tab.key}
                  onMouseEnter={() => setActiveKey(tab.key)}
                  onClick={() => setActiveKey(tab.key)}
                  className={`flex-shrink-0 text-[11px] md:text-xs tracking-[0.18em] uppercase pb-1.5 border-b transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-mauve border-mauve"
                      : "text-taupe border-transparent hover:text-mauve"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
            <Link
              to="/shop"
              className="flex-shrink-0 text-[11px] md:text-xs tracking-[0.18em] uppercase border border-mauve text-mauve px-3.5 md:px-4 py-1.5 rounded-full hover:bg-mauve hover:text-background transition-colors whitespace-nowrap"
            >
              Shop All
            </Link>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-mauve" />
          </div>
        ) : items.length > 0 ? (
          <div
            key={activeKey}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 animate-in fade-in duration-300"
          >
            {items.map((p) => (
              <ProductCard key={p.node.id} product={p} fromCategory={activeTab.label} />
            ))}
          </div>
        ) : (
          <div
            key={activeKey}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 animate-in fade-in duration-300"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-cream rounded-md flex items-center justify-center"
              >
                <span className="text-taupe text-xs italic">Coming soon</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
