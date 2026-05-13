import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { AddToBagPill } from "./AddToBagPill";

/**
 * Serum apothecary — apothecary "shelf" of all serums. Horizontal scroll on
 * mobile, edge-to-edge editorial grid on desktop. Each tile is its own column
 * with a portrait image, name, price and Add to Bag.
 */
export const SerumApothecary = () => {
  const { data, isLoading } = useProducts(
    "title:Serum OR title:Oil OR product_type:Serum OR tag:serum",
    30
  );

  const serums = (data ?? []).filter((p) => /serum|oil/i.test(p.node.title));

  return (
    <section className="relative bg-mauve/[0.04] py-14 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-9 md:mb-14">
          <p className="text-[10px] md:text-[11px] tracking-[0.42em] uppercase text-taupe">
            The Apothecary — Chapter 03
          </p>
          <h2 className="font-serif font-light text-mauve leading-[1] tracking-[-0.01em] mt-3 text-3xl md:text-5xl lg:text-[60px]">
            One drop, <span className="italic font-extralight">a little louder.</span>
          </h2>
          <p className="text-sm md:text-base text-taupe leading-relaxed mt-4 md:mt-5">
            Our serum library — formulated like skincare, finished like a daily ritual. Pick a chapter for your skin.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-mauve" />
          </div>
        ) : serums.length === 0 ? (
          <p className="text-center text-taupe py-12">Coming soon.</p>
        ) : (
          <>
            {/* Mobile: horizontal swipe rail */}
            <div
              className="md:hidden -mx-4 px-4 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {serums.map((p, i) => (
                <SerumBottle key={p.node.id} product={p} index={i} mobile />
              ))}
            </div>

            {/* Desktop: editorial column shelf */}
            <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
              {serums.map((p, i) => (
                <SerumBottle key={p.node.id} product={p} index={i} />
              ))}
            </div>
          </>
        )}

        <div className="flex justify-center mt-10 md:mt-14">
          <Link
            to="/shop?category=Serum"
            className="text-[11px] tracking-[0.32em] uppercase text-mauve border-b border-mauve pb-1 hover:opacity-70 transition-opacity"
          >
            See all Serums →
          </Link>
        </div>
      </div>
    </section>
  );
};

const SerumBottle = ({
  product,
  index,
  mobile,
}: {
  product: ShopifyProduct;
  index: number;
  mobile?: boolean;
}) => {
  const node = product.node;
  const img = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={`/product/${node.handle}`}
      className={`group flex flex-col bg-background border-t border-mauve/20 pt-3 ${
        mobile ? "snap-start flex-shrink-0 w-[68%]" : ""
      }`}
    >
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-serif italic text-mauve text-base md:text-lg">N° {num}</span>
        <span className="text-[10px] tracking-[0.22em] uppercase text-taupe">Serum</span>
      </div>
      <div className="relative aspect-[3/4] bg-cream overflow-hidden">
        {img ? (
          <img
            src={img.url}
            alt={img.altText || node.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 bg-petal/30" />
        )}
      </div>
      <div className="pt-3 md:pt-4 flex flex-col gap-2">
        <h3 className="font-serif text-mauve text-sm md:text-base leading-tight line-clamp-2">
          {node.title}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <span className="text-mauve text-sm">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          <AddToBagPill product={product} label="+ Bag" />
        </div>
      </div>
    </Link>
  );
};
