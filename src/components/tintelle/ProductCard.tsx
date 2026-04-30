import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";

interface ProductCardProps {
  product: ShopifyProduct;
  fromCategory?: string;
}

export const ProductCard = ({ product, fromCategory }: ProductCardProps) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const node = product.node;
  const firstVariant = node.variants.edges[0]?.node;
  const firstImage = node.images.edges[0]?.node;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!firstVariant) return;
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });
  };

  return (
    <Link
      to={`/product/${node.handle}${fromCategory ? `?from=${encodeURIComponent(fromCategory)}` : ""}`}
      className="group block bg-card border border-border/70 hover:border-primary/40 transition-colors"
    >
      <div className="aspect-square bg-cream overflow-hidden">
        {firstImage ? (
          <img
            src={firstImage.url}
            alt={firstImage.altText || node.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full bg-cream" />
        )}
      </div>
      <div className="p-3 sm:p-5 md:p-6 text-center space-y-1.5 sm:space-y-2">
        <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-taupe truncate">{node.productType || "Tintelle"}</p>
        <h3 className="font-serif text-sm sm:text-lg md:text-xl text-mauve leading-tight line-clamp-2">{node.title}</h3>
        <p className="text-mauve text-sm sm:text-base">
          {formatPrice(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode)}
        </p>
        <Button
          onClick={handleAdd}
          disabled={isLoading || !firstVariant}
          variant="outline"
          className="w-full rounded-none border-mauve text-mauve hover:bg-mauve hover:text-background mt-2 sm:mt-3 text-[10px] sm:text-xs tracking-wider uppercase h-10 sm:h-11 px-2"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Bag"}
        </Button>
      </div>
    </Link>
  );
};
