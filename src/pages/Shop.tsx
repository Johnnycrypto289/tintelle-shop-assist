import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { PageShell } from "@/components/tintelle/PageShell";
import { ProductCard } from "@/components/tintelle/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { resolveSubcategory, resolveExtraSubcategories, type ProdNode } from "@/lib/categories";

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



// Curated edits — keep titles in sync with homepage `ShopByCategory`
const EDITS: Record<string, { titles: string[]; eyebrow: string; title: string; subtitle: string }> = {
  "the-edit": {
    titles: [
      "Lip Liner - Raspberry",
      "Blush Palette - Kissable",
      "BB Cream - Pearly",
      "Lip Gloss - Brick",
    ],
    eyebrow: "The Edit",
    title: "Four to fall for.",
    subtitle:
      "A hand-picked quartet of staples — the shades our community keeps coming back for.",
  },
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const editKey = searchParams.get("edit");
  const edit = editKey ? EDITS[editKey] : null;
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const handleFilterClick = (f: (typeof FILTERS)[number]) => {
    setFilter(f);
    if (category) {
      const next = new URLSearchParams(searchParams);
      next.delete("category");
      setSearchParams(next, { replace: true });
    }
  };

  // Subcategories resolved client-side so the category page matches the
  // grouped section on the main shop page exactly. For these we fetch a
  // broad result set and filter using resolveSubcategory.
  const CLIENT_RESOLVED_CATEGORIES = new Set([
    "Foundation",
    "BB Cream",
    "Concealer",
    "Bronzer",
    "Blush Palette",
    "Eyeshadow Palette",
    "Hydro Pencil",
    "Skincare",
    "Tools",
  ]);

  const query = edit
    ? edit.titles.map((t) => `title:"${t.replace(/"/g, '\\"')}"`).join(" OR ")
    : category
    ? CLIENT_RESOLVED_CATEGORIES.has(category)
      ? undefined
      : `product_type:"${category.replace(/"/g, '\\"')}"`
    : filterFor(filter);

  const { data: products, isLoading } = useProducts(query, 100);

  // Client-side guard: keep eye-related products out of "Face" and include them in "Eyes",
  // since some eye items are tagged with cheek/complexion and would otherwise leak across tabs.
  const isEyeProduct = (node: ProdNode) => {
    const t = node.title || "";
    const tags = (node.tags || []).map((x) => x.toLowerCase());
    return (
      /eyeshadow|eye\s*makeup|eye\s*treatment|eyeliner|mascara|eyebrow/i.test(t) ||
      tags.includes("eyes") ||
      tags.includes("eye")
    );
  };

  const list = useMemo(() => {
    const all = products ?? [];
    if (edit) {
      // Sort by curated order from EDITS config
      const order = new Map(edit.titles.map((t, i) => [t.toLowerCase(), i]));
      return [...all]
        .filter((p) => order.has(p.node.title.toLowerCase()))
        .sort((a, b) => (order.get(a.node.title.toLowerCase()) ?? 99) - (order.get(b.node.title.toLowerCase()) ?? 99));
    }
    if (category) {
      if (CLIENT_RESOLVED_CATEGORIES.has(category)) {
        return all.filter((p) => resolveSubcategory(p.node as ProdNode) === category);
      }
      return all;
    }
    if (filter === "Face") return all.filter((p) => !isEyeProduct(p.node as ProdNode));
    return all;
  }, [products, filter, category, edit]);

  const grouped = useMemo(() => {
    if (category || edit) return null;
    const map = new Map<string, typeof list>();
    list.forEach((p) => {
      const sub = resolveSubcategory(p.node as ProdNode);
      if (!map.has(sub)) map.set(sub, []);
      map.get(sub)!.push(p);
    });
    return Array.from(map.entries()).sort(([a], [b]) => sortGroups(a, b));
  }, [list, category, edit]);

  // Reset tab highlight when category param is active
  useEffect(() => {
    if (category) setFilter("All");
  }, [category]);

  // Slug helper for section ids
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // Track which subcategory section is currently in view (for active chip highlight)
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    if (!grouped || grouped.length < 2) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveGroup(visible.target.getAttribute("data-group"));
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [grouped]);

  const handleJumpTo = (groupName: string) => {
    const el = sectionRefs.current.get(groupName);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveGroup(groupName);
  };

  const heading = edit ? edit.title : (category ?? "Shop everything.");
  const eyebrow = edit ? edit.eyebrow : category ? "Category" : "The Collection";
  const subtitle = edit
    ? edit.subtitle
    : category
    ? `Browse all ${category.toLowerCase()}.`
    : "Every formula is a skincare-makeup hybrid. Build your routine one tint at a time.";

  return (
    <PageShell title={edit?.title ?? category ?? "Shop"} description="The full Tintelle collection — tinted skincare hybrids.">
      <section className="container pt-10 md:pt-16 pb-4 md:pb-6">
        <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-taupe">{eyebrow}</p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">{heading}</h1>
        <p className="text-sm md:text-lg text-taupe max-w-xl leading-relaxed mt-3 md:mt-4">
          {subtitle}
        </p>
      </section>

      <section className="container pb-16 md:pb-24">
        {!category && !edit && (
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

        {/* Subcategory quick-jump chips: appears when there are 2+ groups */}
        {!isLoading && grouped && grouped.length >= 2 && (
          <div className="sticky top-[64px] md:top-[80px] z-20 -mx-4 px-4 md:mx-0 md:px-0 bg-background/95 backdrop-blur-sm py-2 md:py-3 mb-6 md:mb-8 border-b border-border/60">
            <div className="flex gap-2 md:gap-2.5 overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {grouped.map(([groupName, items]) => {
                const isActive = activeGroup === groupName;
                return (
                  <button
                    key={groupName}
                    onClick={() => handleJumpTo(groupName)}
                    className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 md:px-4 py-1.5 md:py-2 rounded-full border text-[11px] md:text-xs tracking-[0.12em] uppercase transition-all ${
                      isActive
                        ? "bg-mauve text-background border-mauve"
                        : "bg-cream text-mauve border-mauve/25 hover:border-mauve hover:bg-mauve/5"
                    }`}
                  >
                    <span>{groupName}</span>
                    <span className={`text-[10px] ${isActive ? "text-background/70" : "text-taupe"}`}>
                      {items.length}
                    </span>
                  </button>
                );
              })}
            </div>
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
              <section
                key={groupName}
                id={`group-${slugify(groupName)}`}
                data-group={groupName}
                ref={(el) => {
                  if (el) sectionRefs.current.set(groupName, el);
                  else sectionRefs.current.delete(groupName);
                }}
                className="scroll-mt-32 md:scroll-mt-40"
              >
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
              </section>
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
