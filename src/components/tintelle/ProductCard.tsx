import { Link } from "react-router-dom";
import { Heart, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
  fromCategory?: string;
}

export const ProductCard = ({ product, fromCategory }: ProductCardProps) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const wishlistHas = useWishlistStore((s) => s.has);
  const wishlistToggle = useWishlistStore((s) => s.toggle);
  const node = product.node;
  const firstVariant = node.variants.edges[0]?.node;
  const images = node.images.edges.map((e) => e.node);
  const firstImage = images[0];
  const saved = wishlistHas(node.handle);

  // Image carousel: auto-cycles on desktop hover; swipeable on mobile.
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!hasMultiple || !isHovering) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % images.length);
    }, 900);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovering, hasMultiple, images.length]);

  // Reset to first image when hover ends (desktop only)
  useEffect(() => {
    if (!isHovering) setActiveIdx(0);
  }, [isHovering]);

  // Sync mobile scroll position to active dot indicator
  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== activeIdx) setActiveIdx(idx);
  };

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

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wishlistToggle(node.handle);
    toast.success(saved ? "Removed from wishlist" : "Saved to wishlist");
  };

  return (
    <Link
      to={`/product/${node.handle}${fromCategory ? `?from=${encodeURIComponent(fromCategory)}` : ""}`}
      className="group block bg-card border border-border/70 hover:border-primary/40 transition-colors"
    >
      <div
        className="relative aspect-square bg-cream overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {!firstImage ? (
          <div className="w-full h-full bg-cream" />
        ) : (
          <>
            {/* Desktop: stacked fading images, auto-cycles on hover */}
            <div className="hidden md:block w-full h-full">
              {images.map((img, i) => (
                <img
                  key={img.url}
                  src={img.url}
                  alt={img.altText || node.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                    i === activeIdx ? "opacity-100" : "opacity-0"
                  } ${i === activeIdx && isHovering ? "scale-[1.03]" : ""}`}
                />
              ))}
            </div>

            {/* Mobile: horizontal swipe carousel */}
            <div
              ref={scrollerRef}
              onScroll={handleScroll}
              className="md:hidden flex w-full h-full overflow-x-auto snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {images.map((img) => (
                <img
                  key={img.url}
                  src={img.url}
                  alt={img.altText || node.title}
                  loading="lazy"
                  className="w-full h-full flex-shrink-0 snap-center object-cover"
                />
              ))}
            </div>

            {/* Dots indicator */}
            {hasMultiple && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-none">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeIdx ? "w-4 bg-mauve" : "w-1.5 bg-mauve/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={saved}
          className="absolute top-2 right-2 z-10 h-9 w-9 inline-flex items-center justify-center rounded-full bg-background/90 backdrop-blur-sm border border-border/60 text-mauve hover:text-primary transition-colors"
        >
          <Heart
            className="h-4 w-4"
            strokeWidth={1.5}
            fill={saved ? "currentColor" : "none"}
          />
        </button>
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
