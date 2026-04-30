import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Heart, Loader2, RotateCcw, Truck } from "lucide-react";
import { PageShell } from "@/components/tintelle/PageShell";
import { Breadcrumbs } from "@/components/tintelle/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { formatPrice } from "@/lib/shopify";
import { parseProductDescription } from "@/lib/parseProductDescription";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [searchParams] = useSearchParams();
  const fromCategory = searchParams.get("from");
  const backToShopHref = fromCategory ? `/shop?category=${encodeURIComponent(fromCategory)}` : "/shop";
  const fromQuery = fromCategory ? `?from=${encodeURIComponent(fromCategory)}` : "";
  const { data: product, isLoading } = useProduct(handle);
  const { data: relatedProducts } = useProducts(undefined, 6);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);
  const wishlistHas = useWishlistStore((s) => s.has);
  const wishlistToggle = useWishlistStore((s) => s.toggle);
  const [variantIndex, setVariantIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const parsedDesc = useMemo(
    () => parseProductDescription(product?.node.descriptionHtml),
    [product?.node.descriptionHtml]
  );
  const introHtml = parsedDesc.introHtml;
  const benefitsHtml = parsedDesc.sections.benefits?.html ?? "";
  const applicationHtml = parsedDesc.sections.application?.html ?? "";
  const howToUseHtml = parsedDesc.sections.howToUse?.html ?? "";
  const ingredientsHtml = parsedDesc.sections.ingredients?.html ?? "";
  const keyIngredientsHtml = parsedDesc.sections.keyIngredients?.html ?? "";

  // Combine "How to Use" + "Application" for the accordion
  const usageHtml = [howToUseHtml, applicationHtml].filter(Boolean).join("");
  // Fall back: if there is no parsed intro but description exists, show full HTML in collapsible
  const summaryHtml = introHtml || product?.node.descriptionHtml || "";
  const hasMoreContent = Boolean(benefitsHtml || usageHtml || ingredientsHtml || keyIngredientsHtml);

  const variants = product?.node.variants.edges ?? [];
  const variant = variants[variantIndex]?.node;
  const productImages = useMemo(() => product?.node.images.edges.map((e) => e.node) ?? [], [product]);

  // Build the gallery: variant images first (deduped), then remaining product images
  const gallery = useMemo(() => {
    const seen = new Set<string>();
    const list: { url: string; altText: string | null }[] = [];
    variants.forEach((v) => {
      const img = v.node.image;
      if (img?.url && !seen.has(img.url)) {
        seen.add(img.url);
        list.push(img);
      }
    });
    productImages.forEach((img) => {
      if (img?.url && !seen.has(img.url)) {
        seen.add(img.url);
        list.push(img);
      }
    });
    return list;
  }, [variants, productImages]);

  // Reset image index when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setVariantIndex(0);
  }, [handle]);

  // When user picks a shade, swap the main image to that variant's image
  const handleSelectVariant = (i: number) => {
    setVariantIndex(i);
    const variantImageUrl = variants[i]?.node.image?.url;
    if (variantImageUrl) {
      const idx = gallery.findIndex((g) => g.url === variantImageUrl);
      if (idx >= 0) setActiveImageIndex(idx);
    }
  };

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

  const hasMultipleVariants = variants.length > 1;
  const activeImage = gallery[activeImageIndex] ?? gallery[0];

  return (
    <PageShell title={product?.node.title} description={product?.node.description?.slice(0, 155)}>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          ...(fromCategory ? [{ label: fromCategory, href: backToShopHref }] : []),
          { label: product?.node.title ?? "Product" },
        ]}
      />
      {fromCategory && (
        <div className="container -mt-2 mb-2">
          <Link
            to={backToShopHref}
            className="inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-mauve hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            Back to {fromCategory}
          </Link>
        </div>
      )}

      {isLoading ? (
        <div className="container py-20 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-mauve" />
        </div>
      ) : !product ? (
        <p className="container text-center text-taupe py-20">Product not found.</p>
      ) : (
        <>
          <section className="container pb-24 md:pb-24 grid md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <div className="aspect-square bg-cream overflow-hidden -mx-4 md:mx-0">
                {activeImage && (
                  <img
                    src={activeImage.url}
                    alt={activeImage.altText || product.node.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mt-2">
                  {gallery.slice(0, 10).map((img, i) => (
                    <button
                      key={`${img.url}-${i}`}
                      type="button"
                      onClick={() => setActiveImageIndex(i)}
                      aria-label={`View image ${i + 1}`}
                      className={`aspect-square bg-cream overflow-hidden border transition-colors ${
                        i === activeImageIndex ? "border-mauve" : "border-border hover:border-mauve/50"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.altText || ""}
                        className={`w-full h-full object-cover transition-opacity ${
                          i === activeImageIndex ? "opacity-100" : "opacity-80 hover:opacity-100"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="md:sticky md:top-28 md:self-start space-y-5 md:space-y-6">
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-taupe">{product.node.productType || "Tintelle"}</p>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-mauve leading-[1.05] mt-2.5 md:mt-3">{product.node.title}</h1>
                <div className="flex items-center gap-3 mt-3 md:mt-4">
                  <span className="text-taupe/40 tracking-widest" aria-hidden>☆☆☆☆☆</span>
                  <span className="text-xs sm:text-sm text-taupe">No reviews yet — be the first</span>
                </div>
                {variant && (
                  <p className="font-serif text-xl md:text-2xl text-mauve mt-4 md:mt-5">
                    {formatPrice(variant.price.amount, variant.price.currencyCode)}
                  </p>
                )}
              </div>

              {summaryHtml ? (
                <div className="space-y-2">
                  <div
                    className={`text-taupe leading-relaxed product-description relative text-sm md:text-base
                      [&_p]:mb-3 [&_strong]:text-mauve [&_strong]:font-medium
                      [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ul]:space-y-1
                      [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_ol]:space-y-1
                      [&_a]:text-mauve [&_a]:underline
                      ${!showFullDesc && hasMoreContent ? "max-h-32 overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent)]" : ""}`}
                    dangerouslySetInnerHTML={{ __html: showFullDesc ? summaryHtml + benefitsHtml : summaryHtml }}
                  />
                  {hasMoreContent && (
                    <button
                      type="button"
                      onClick={() => setShowFullDesc((v) => !v)}
                      className="text-xs tracking-[0.18em] uppercase text-mauve underline underline-offset-4 hover:opacity-70 transition-opacity"
                    >
                      {showFullDesc ? "See less" : "See more"}
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-taupe leading-relaxed whitespace-pre-line text-sm md:text-base">{product.node.description}</p>
              )}

              {hasMultipleVariants && (
                <div className="space-y-3">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-taupe">
                    Shade · <span className="text-mauve">{variant?.title}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v, i) => {
                      const isActive = i === variantIndex;
                      const unavailable = !v.node.availableForSale;
                      return (
                        <button
                          key={v.node.id}
                          onClick={() => handleSelectVariant(i)}
                          aria-pressed={isActive}
                          aria-label={`Select shade ${v.node.title}`}
                          title={v.node.title}
                          className={`px-3.5 min-h-11 text-xs tracking-wide border transition-colors ${
                            isActive
                              ? "bg-mauve text-background border-mauve"
                              : "border-border text-mauve hover:border-mauve"
                          } ${unavailable ? "opacity-50 line-through" : ""}`}
                        >
                          {v.node.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add to cart row — visible on desktop, hidden on mobile (sticky bar handles it) */}
              <div className="hidden md:flex gap-3">
                <div className="inline-flex items-center border border-mauve">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-12 h-12 text-mauve hover:bg-mauve/5 transition-colors text-lg"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-3 font-serif text-mauve min-w-[2ch] text-center">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-12 h-12 text-mauve hover:bg-mauve/5 transition-colors text-lg"
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
                    <>
                      Add to Bag
                      {hasMultipleVariants && variant ? ` · ${variant.title}` : ""}
                      {variant ? ` · ${formatPrice(parseFloat(variant.price.amount) * qty, variant.price.currencyCode)}` : ""}
                    </>
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

              {/* Mobile: qty + wishlist row, sticky bar holds the add-to-bag */}
              <div className="flex md:hidden items-center justify-between gap-3">
                <div className="inline-flex items-center border border-mauve">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-11 h-11 text-mauve text-lg"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-3 font-serif text-mauve min-w-[2ch] text-center">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-11 h-11 text-mauve text-lg"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handle && wishlistToggle(handle)}
                  aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
                  className={`h-11 px-4 border border-mauve transition-colors flex items-center gap-2 text-xs tracking-[0.18em] uppercase ${
                    saved ? "bg-mauve text-background" : "text-mauve"
                  }`}
                >
                  <Heart className="h-4 w-4" strokeWidth={1.5} fill={saved ? "currentColor" : "none"} />
                  {saved ? "Saved" : "Save"}
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

              {(keyIngredientsHtml || ingredientsHtml || usageHtml) && (
                <Accordion type="single" collapsible className="border-t border-border pt-2">
                  {keyIngredientsHtml && (
                    <AccordionItem value="key" className="border-border">
                      <AccordionTrigger className="text-mauve font-serif text-base">Key Ingredients</AccordionTrigger>
                      <AccordionContent className="text-taupe leading-relaxed">
                        <div
                          className="[&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5"
                          dangerouslySetInnerHTML={{ __html: keyIngredientsHtml }}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  {ingredientsHtml && (
                    <AccordionItem value="full" className="border-border">
                      <AccordionTrigger className="text-mauve font-serif text-base">Full Ingredient List</AccordionTrigger>
                      <AccordionContent className="text-taupe leading-relaxed">
                        <div className="[&_p]:mb-2" dangerouslySetInnerHTML={{ __html: ingredientsHtml }} />
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  {usageHtml && (
                    <AccordionItem value="how" className="border-border">
                      <AccordionTrigger className="text-mauve font-serif text-base">How to Use</AccordionTrigger>
                      <AccordionContent className="text-taupe leading-relaxed">
                        <div
                          className="[&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5"
                          dangerouslySetInnerHTML={{ __html: usageHtml }}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              )}
            </div>
          </section>

          {/* Sticky mobile add-to-cart bar */}
          <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur-md border-t border-border pb-safe">
            <div className="px-4 py-3">
              <Button
                onClick={handleAdd}
                disabled={isAdding || !variant?.availableForSale}
                size="lg"
                className="w-full rounded-none h-12 text-xs tracking-[0.18em] uppercase"
              >
                {isAdding ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Add to Bag
                    {variant ? ` · ${formatPrice(parseFloat(variant.price.amount) * qty, variant.price.currencyCode)}` : ""}
                  </>
                )}
              </Button>
            </div>
          </div>

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
                        to={`/product/${p.node.handle}${fromQuery}`}
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
