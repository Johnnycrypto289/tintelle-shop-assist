import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { resolveSubcategory } from "@/lib/categories";
import { ProductCard } from "./ProductCard";
import type { ShopifyProduct } from "@/lib/shopify";
import { BESTSELLER_TITLES } from "@/data/bestsellers";

type Sub = {
  key: string;
  label: string;
  match: (p: ShopifyProduct) => boolean;
};

type Parent = {
  key: string;
  label: string;
  subs: Sub[]; // empty = flat list (Best Sellers)
};

const sub = (key: string, label: string, names: string[]): Sub => ({
  key,
  label,
  match: (p) => {
    const sc = resolveSubcategory(p.node);
    return names.includes(sc);
  },
});

const PARENTS: Parent[] = [
  { key: "bestsellers", label: "Best Sellers", subs: [] },
  {
    key: "face",
    label: "Face",
    subs: [
      sub("foundation", "Foundation", ["Foundation"]),
      sub("bb-cream", "BB Cream", ["BB Cream"]),
      sub("concealer", "Concealer", ["Concealer"]),
      sub("liquid-blush", "Liquid Blush", ["Liquid Blush"]),
      sub("blush-palette", "Blush Palette", ["Blush Palette"]),
      sub("bronzer", "Bronzer", ["Bronzer"]),
      {
        key: "highlighter",
        label: "Highlighter",
        match: (p) => /highlighter/i.test(p.node.title || ""),
      },
    ],
  },
  {
    key: "lips",
    label: "Lips",
    subs: [
      sub("lipstick", "Lipstick", ["Lipstick"]),
      sub("lip-gloss", "Lip Gloss", ["Lip Gloss"]),
      sub("lip-liner", "Lip Liner", ["Lip Liner"]),
    ],
  },
  {
    key: "eyes",
    label: "Eyes",
    subs: [
      sub("eyeshadow", "Eyeshadow", ["Eyeshadow Palette"]),
      sub("eye-makeup", "Eye Makeup", ["Eye Makeup"]),
      sub("eye-treatment", "Eye Treatment", ["Eye Treatment"]),
      sub("hydro-pencil", "Hydro Pencil", ["Hydro Pencil"]),
    ],
  },
];

export const CuratedFavorites = () => {
  const { data: products, isLoading } = useProducts(undefined, 100);
  const [parentKey, setParentKey] = useState<string>("bestsellers");
  const [subKey, setSubKey] = useState<string | null>(null);

  const parent = PARENTS.find((p) => p.key === parentKey) ?? PARENTS[0];
  const activeSub =
    parent.subs.find((s) => s.key === subKey) ?? parent.subs[0] ?? null;

  const items = useMemo(() => {
    const all = products ?? [];
    if (parent.key === "bestsellers") {
      const order = new Map(
        BESTSELLER_TITLES.map((t, i) => [t.toLowerCase(), i] as const),
      );
      return all
        .filter((p) => order.has(p.node.title.toLowerCase()))
        .sort(
          (a, b) =>
            (order.get(a.node.title.toLowerCase()) ?? 99) -
            (order.get(b.node.title.toLowerCase()) ?? 99),
        )
        .slice(0, 8);
    }
    if (!activeSub) return [];
    return all.filter(activeSub.match).slice(0, 4);
  }, [products, parent, activeSub]);

  const handleParent = (key: string) => {
    setParentKey(key);
    setSubKey(null); // reset to first sub of new parent
  };

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-8 md:mb-10">
          <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-taupe">
            Shop the Edit
          </p>
          <h2 className="font-serif text-2xl md:text-4xl text-mauve mt-2.5 md:mt-3">
            Loved by You
          </h2>
        </div>

        {/* Parent tabs */}
        <div className="flex items-center justify-start md:justify-center gap-x-6 md:gap-x-10 mb-5 md:mb-6 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {PARENTS.map((p) => {
            const isActive = p.key === parentKey;
            return (
              <button
                key={p.key}
                onClick={() => handleParent(p.key)}
                className={`flex-shrink-0 text-[11px] md:text-xs tracking-[0.22em] uppercase pb-1.5 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-mauve border-mauve"
                    : "text-taupe border-transparent hover:text-mauve"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Sub chips (hidden on Best Sellers) */}
        {parent.subs.length > 0 && (
          <div className="flex items-center justify-start md:justify-center gap-2 md:gap-2.5 mb-8 md:mb-12 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {parent.subs.map((s) => {
              const isActive = (activeSub?.key ?? parent.subs[0].key) === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setSubKey(s.key)}
                  className={`flex-shrink-0 px-3.5 md:px-4 py-1.5 md:py-2 rounded-full border text-[10px] md:text-[11px] tracking-[0.16em] uppercase transition-colors ${
                    isActive
                      ? "bg-mauve text-background border-mauve"
                      : "bg-cream text-mauve border-mauve/25 hover:border-mauve"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-mauve" />
          </div>
        ) : items.length > 0 ? (
          <div
            key={`${parent.key}-${activeSub?.key ?? "all"}`}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 animate-in fade-in duration-300"
          >
            {items.map((p) => (
              <ProductCard
                key={p.node.id}
                product={p}
                fromCategory={activeSub?.label ?? "Best Sellers"}
              />
            ))}
          </div>
        ) : (
          <div
            key={`${parent.key}-${activeSub?.key ?? "all"}-empty`}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 animate-in fade-in duration-300"
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

        {/* See more */}
        {!isLoading && (
          <div className="flex justify-center mt-8 md:mt-12">
            {parent.key === "bestsellers" ? (
              <Link
                to="/shop?category=Best%20Sellers"
                className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-mauve border-b border-mauve pb-1 hover:opacity-70 transition-opacity"
              >
                See all Best Sellers →
              </Link>
            ) : activeSub ? (
              <Link
                to={`/shop?category=${encodeURIComponent(activeSub.label)}`}
                className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-mauve border-b border-mauve pb-1 hover:opacity-70 transition-opacity"
              >
                See all {activeSub.label} →
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
};
