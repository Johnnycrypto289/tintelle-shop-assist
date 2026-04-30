import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

export const BestsellerSpotlight = () => {
  const tagged = useProducts("tag:spotlight OR tag:bestseller", 1);
  const fallback = useProducts(undefined, 1);

  const product = tagged.data?.[0] ?? fallback.data?.[0] ?? null;
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
    <section id="spotlight" className="py-12 md:py-24 bg-background">
      <div className="container grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="aspect-[4/5] md:aspect-[5/4] overflow-hidden bg-cream order-1 -mx-4 md:mx-0">
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

        <div className="order-2 space-y-4 md:space-y-5">
          <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-taupe">Editor's Pick</p>
          <h2 className="font-serif text-2xl md:text-5xl text-mauve leading-tight">
            {product?.node.title ?? "Discover the spotlight"}
          </h2>
          <p className="text-taupe max-w-md leading-relaxed text-sm md:text-base">
            {product?.node.description?.slice(0, 180) ??
              "Loved by our community for skin-first color that wears all day."}
            {product && product.node.description.length > 180 ? "…" : ""}
          </p>

          {variant ? (
            <div className="flex items-baseline gap-3 pt-1 md:pt-2">
              <span className="font-serif text-xl md:text-2xl text-mauve">
                {formatPrice(variant.price.amount, variant.price.currencyCode)}
              </span>
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={handleAdd}
              disabled={cartLoading || !variant}
              size="lg"
              className="rounded-none px-8 h-12 text-xs tracking-[0.18em] uppercase w-full sm:w-auto"
            >
              {cartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Bag"}
            </Button>
            {product ? (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-none px-8 h-12 text-xs tracking-[0.18em] uppercase border-mauve text-mauve hover:bg-mauve hover:text-background w-full sm:w-auto"
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
