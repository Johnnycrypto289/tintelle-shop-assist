import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { AddToBagPill } from "./AddToBagPill";

/**
 * Highlighter strip — 4 sticks shown side-by-side as an editorial colour
 * story. Mobile: horizontal swipe of 1.4 tiles. Desktop: 4-up wide row.
 */
export const HighlighterStrip = () => {
  const { data, isLoading } = useProducts("title:Highlighter", 12);
  const sticks = (data ?? []).filter((p) => /highlighter/i.test(p.node.title));

  return (
    <section className="relative bg-background py-14 md:py-24 overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-14">
          <div className="max-w-xl">
            <p className="text-[10px] md:text-[11px] tracking-[0.42em] uppercase text-taupe">
              The Glow — Chapter 04
            </p>
            <h2 className="font-serif font-light text-mauve leading-[1] tracking-[-0.01em] mt-3 text-3xl md:text-5xl lg:text-[60px]">
              Catch the <span className="italic font-extralight">light.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-taupe max-w-sm">
            Four highlighter sticks. One for every mood, every undertone, every hour of the day.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-mauve" />
          </div>
        ) : (
          <>
            {/* Mobile rail */}
            <div
              className="md:hidden -mx-4 px-4 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {sticks.map((p) => (
                <Stick key={p.node.id} product={p} mobile />
              ))}
            </div>
            {/* Desktop wide strip */}
            <div className="hidden md:grid grid-cols-4 gap-2 lg:gap-3">
              {sticks.map((p) => (
                <Stick key={p.node.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const Stick = ({ product, mobile }: { product: ShopifyProduct; mobile?: boolean }) => {
  const node = product.node;
  const img = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  // Pull shade name from "Highlighter Stick - Beige Lights" → "Beige Lights"
  const shade = node.title.split(" - ")[1] ?? node.title;

  return (
    <Link
      to={`/product/${node.handle}`}
      className={`group relative overflow-hidden bg-cream aspect-[3/4] md:aspect-[3/5] ${
        mobile ? "snap-start flex-shrink-0 w-[72%]" : ""
      }`}
    >
      {img ? (
        <img
          src={img.url}
          alt={img.altText || node.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
      ) : (
        <div className="absolute inset-0 bg-petal/40" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-5 flex flex-col gap-2.5">
        <p className="text-[9px] md:text-[10px] tracking-[0.34em] uppercase text-white/85">
          Highlighter
        </p>
        <h3 className="font-serif text-white text-lg md:text-2xl leading-tight">{shade}</h3>
        <div className="flex items-center justify-between gap-2 mt-1">
          <span className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-white/90">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          <AddToBagPill product={product} label="+ Bag" />
        </div>
      </div>
    </Link>
  );
};
