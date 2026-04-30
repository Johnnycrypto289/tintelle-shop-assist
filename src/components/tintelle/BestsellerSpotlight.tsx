import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

/**
 * BestsellerSpotlight
 * Replaces the legacy "Routine" mock-up upsell with a single hero product
 * pulled live from Shopify. Falls back gracefully if no bestseller is tagged.
 */
export const BestsellerSpotlight = () => {
  // Try a tagged bestseller first, then fall back to any product.
  const tagged = useProducts("tag:spotlight OR tag:bestseller", 1);
  const fallback = useProducts(undefined, 1);

  const product =
    tagged.data?.[0] ??
    fallback.data?.[0] ??
    null;

  const isLoading = tagged.isLoading && fallback.isLoading;

  const variant = product?.node.variants.edges[0]?.node;
  const image = product?.node.images.edges[0]?.node;
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);

  const handleAdd = async () => {
    if (!product || !variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <section id="spotlight" className="py-16 md:py-24 bg-background">
      <div className="container grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="aspect-[5/4] overflow-hidden bg-cream order-2 md:order-1">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-mauve" />
            </div>
          ) : image ? (
            <img
              src={image.url}
              alt={image.altText ?? product!.node.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>

        <div className="order-1 md:order-2 space-y-5">
          <p className="text-xs tracking-[0.3em] uppercase text-taupe">Editor's Pick</p>
          <h2 className="font-serif text-3xl md:text-5xl text-mauve leading-tight">
            {product?.node.title ?? "Discover the spotlight"}
          </h2>
          <p className="text-taupe max-w-md leading-relaxed">
            {product?.node.description?.slice(0, 180) ??
              "Loved by our community for skin-first color that wears all day."}
            {product && product.node.description.length > 180 ? "…" : ""}
          </p>

          {variant ? (
            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-serif text-2xl text-mauve">
                {formatPrice(variant.price.amount, variant.price.currencyCode)}
              </span>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={handleAdd}
              disabled={cartLoading || !variant}
              size="lg"
              className="rounded-none px-8 h-12 text-sm tracking-wider uppercase"
            >
              {cartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Bag"}
            </Button>
            {product ? (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-none px-8 h-12 text-sm tracking-wider uppercase border-mauve text-mauve hover:bg-mauve hover:text-background"
              >
                <Link to={`/product/${product.node.handle}`}>View Details</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
