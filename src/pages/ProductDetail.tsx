import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Loader2, RotateCcw, Truck } from "lucide-react";
import { PageShell } from "@/components/tintelle/PageShell";
import { Breadcrumbs } from "@/components/tintelle/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { formatPrice } from "@/lib/shopify";

const SHADE_PALETTE_FALLBACK: Record<string, string[]> = {
  "skin-tint": ["#F7DBC6","#EFC9AC","#E5B58F","#D69972","#B57A55","#8C5A3C","#6B4429","#4A2E1C","#F0CFB8","#DCAA85","#A87454","#5B3825"],
  "lip-tint": ["#D4A0A0","#E8A598","#C97D7D","#B05B5B","#A04545","#82303D"],
  "cheek-tint": ["#F0D4D4","#E8A598","#D4A0A0","#B57A7A"],
  "eye-serum": ["#F5C9B5"],
};

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProduct(handle);
  const { data: relatedProducts } = useProducts(undefined, 6);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);
  const wishlistHas = useWishlistStore((s) => s.has);
  const wishlistToggle = useWishlistStore((s) => s.toggle);
  const [variantIndex, setVariantIndex] = useState(0);
  const [qty, setQty] = useState(1);

  const variants = product?.node.variants.edges ?? [];
  const variant = variants[variantIndex]?.node;
  const images = useMemo(() => product?.node.images.edges.map((e) => e.node) ?? [], [product]);
  const palette = useMemo(() => {
    if (!product) return [];
    if (variants.length > 1) return variants.map((v) => v.node.title);
    return SHADE_PALETTE_FALLBACK[handle ?? ""] ?? [];
  }, [product, variants, handle]);

  const saved = handle ? wishlistHas(handle) : false;

  const handleAdd = async () => {
    if (!product || !variant) return;
    for (let i = 0; i < qty; i++) {
      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || [],
      });
    }
  };

  const cross = useMemo(
    () => (relatedProducts ?? []).filter((p) => p.node.handle !== handle).slice(0, 3),
    [relatedProducts, handle]
  );

  return (
    <PageShell title={product?.node.title} description={product?.node.description?.slice(0, 155)}>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product?.node.title ?? "Product" },
        ]}
      />

      {isLoading ? (
        <div className="container py-20 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-mauve" />
        </div>
      ) : !product ? (
        <p className="container text-center text-taupe py-20">Product not found.</p>
      ) : (
        <>
          <section className="container pb-16 md:pb-24 grid md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <div className="aspect-square bg-cream overflow-hidden">
                {images[0] && (
                  <img
                    src={images[0].url}
                    alt={images[0].altText || product.node.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[0, 1, 2, 3].map((i) => {
                    const img = images[i] ?? images[0];
                    return (
                      <div
                        key={i}
                        className={`aspect-square bg-cream overflow-hidden border ${
                          i === 0 ? "border-mauve" : "border-border"
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.altText || ""}
                          className="w-full h-full object-cover opacity-90"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="md:sticky md:top-28 md:self-start space-y-6">
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-taupe">{product.node.productType || "Tintelle"}</p>
                <h1 className="font-serif text-3xl md:text-5xl text-mauve leading-[1.05] mt-3">{product.node.title}</h1>
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-accent tracking-widest" aria-hidden>★★★★★</span>
                  <span className="text-sm text-taupe">Reviews coming soon</span>
                </div>
                {variant && (
                  <p className="font-serif text-2xl text-mauve mt-5">
                    {formatPrice(variant.price.amount, variant.price.currencyCode)}
                  </p>
                )}
              </div>

              <p className="text-taupe leading-relaxed whitespace-pre-line">{product.node.description}</p>

              {palette.length > 1 && (
                <div className="space-y-3">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-taupe">
                    {variants.length > 1 ? "Shade" : "Available shades"} · {String(variantIndex + 1).padStart(2, "0")}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {palette.map((shade, i) => {
                      const color =
                        variants.length > 1
                          ? SHADE_PALETTE_FALLBACK[handle ?? ""]?.[i] ?? "hsl(var(--primary))"
                          : (shade as string);
                      return (
                        <button
                          key={i}
                          onClick={() => variants.length > 1 && setVariantIndex(i)}
                          aria-label={`Shade ${i + 1}`}
                          className={`w-9 h-9 rounded-full transition-all ${
                            i === variantIndex ? "ring-2 ring-mauve ring-offset-2 ring-offset-background" : "border border-border"
                          }`}
                          style={{ backgroundColor: color }}
                          disabled={variants.length <= 1}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <div className="inline-flex items-center border border-mauve">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 h-12 text-mauve hover:bg-mauve/5 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-4 font-serif text-mauve min-w-[2ch] text-center">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-4 h-12 text-mauve hover:bg-mauve/5 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <Button
                  onClick={handleAdd}
                  disabled={isAdding || !variant?.availableForSale}
                  size="lg"
                  className="flex-1 rounded-none h-12 text-xs tracking-[0.18em] uppercase"
                >
                  {isAdding ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    `Add to Bag · ${variant ? formatPrice(parseFloat(variant.price.amount) * qty, variant.price.currencyCode) : ""}`
                  )}
                </Button>
                <button
                  onClick={() => handle && wishlistToggle(handle)}
                  aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
                  className={`w-12 h-12 border border-mauve transition-colors flex items-center justify-center ${
                    saved ? "bg-mauve text-background" : "text-mauve hover:bg-mauve/5"
                  }`}
                >
                  <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} fill={saved ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="flex flex-wrap gap-5 text-xs text-taupe">
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5" strokeWidth={1.5} /> Free shipping over $50
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} /> 30-day returns
                </span>
              </div>

              <Accordion type="single" collapsible className="border-t border-border pt-2">
                <AccordionItem value="key" className="border-border">
                  <AccordionTrigger className="text-mauve font-serif text-base">Key Ingredients</AccordionTrigger>
                  <AccordionContent className="text-taupe leading-relaxed">
                    Peptides · Squalane · Niacinamide · Mineral SPF · Hyaluronic Acid
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="full" className="border-border">
                  <AccordionTrigger className="text-mauve font-serif text-base">Full Ingredient List</AccordionTrigger>
                  <AccordionContent className="text-taupe leading-relaxed">
                    Aqua, Caprylic/Capric Triglyceride, Niacinamide, Glycerin, Squalane, Sodium Hyaluronate, Tocopherol,
                    Palmitoyl Tripeptide-1, Zinc Oxide, Titanium Dioxide…
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how" className="border-border">
                  <AccordionTrigger className="text-mauve font-serif text-base">How to Use</AccordionTrigger>
                  <AccordionContent className="text-taupe leading-relaxed">
                    Apply 1–2 pumps to clean skin. Blend with fingertips or a damp sponge from the center outward.
                    Build for more coverage.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {cross.length > 0 && (
            <section className="bg-cream py-16 md:py-20">
              <div className="container">
                <p className="text-xs tracking-[0.3em] uppercase text-taupe">Pairs well with</p>
                <h2 className="font-serif text-3xl md:text-4xl text-mauve mt-3 mb-8">Build the routine.</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cross.map((p) => {
                    const img = p.node.images.edges[0]?.node;
                    return (
                      <Link
                        key={p.node.id}
                        to={`/product/${p.node.handle}`}
                        className="group bg-card border border-border hover:border-primary/40 transition-colors"
                      >
                        <div className="aspect-square bg-cream overflow-hidden">
                          {img && (
                            <img
                              src={img.url}
                              alt={p.node.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                          )}
                        </div>
                        <div className="p-5 text-center">
                          <h4 className="font-serif text-lg text-mauve">{p.node.title}</h4>
                          <p className="font-serif text-mauve mt-1">
                            {formatPrice(p.node.priceRange.minVariantPrice.amount, p.node.priceRange.minVariantPrice.currencyCode)}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </PageShell>
  );
};

export default ProductDetail;
