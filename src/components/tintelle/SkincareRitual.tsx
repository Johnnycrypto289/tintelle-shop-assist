import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { AddToBagPill } from "./AddToBagPill";

const TITLES = [
  "Embrace Collagen Moisturizer",
  "Foundation Primer - Clear",
  "Active Eye Cream",
  "Anti-aging Rose Gold Oil",
];

const findByTitle = (list: ShopifyProduct[] | undefined, t: string) =>
  list?.find((p) => p.node.title.toLowerCase() === t.toLowerCase()) ?? null;

/**
 * Skincare ritual — magazine spread. Two tall hero tiles + two square cards.
 * Mobile: stacked single column. Desktop: editorial 12-col grid.
 */
export const SkincareRitual = () => {
  const { data, isLoading } = useProducts(
    "title:Moisturizer OR title:Primer OR title:Eye OR title:Oil OR tag:skincare",
    40
  );

  const hero = findByTitle(data, TITLES[0]);
  const second = findByTitle(data, TITLES[1]);
  const third = findByTitle(data, TITLES[2]);
  const fourth = findByTitle(data, TITLES[3]);
  const items = [hero, second, third, fourth].filter(Boolean) as ShopifyProduct[];

  return (
    <section className="relative bg-cream/40 py-14 md:py-24 overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-14">
          <div className="max-w-xl">
            <p className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-taupe">
              The Ritual — Chapter 02
            </p>
            <h2 className="font-serif font-light text-mauve leading-[1] tracking-[-0.01em] mt-3 text-3xl md:text-5xl lg:text-[64px]">
              Skincare,
              <br />
              <span className="italic font-extralight">unhurried.</span>
            </h2>
            <p className="text-sm md:text-base text-taupe leading-relaxed mt-4 md:mt-5 max-w-md">
              The quiet half of your routine. Plumping moisturisers, weightless primers, and one small ritual at a time.
            </p>
          </div>
          <Link
            to="/shop?category=Skincare"
            className="self-start md:self-auto group inline-flex items-center text-[11px] tracking-[0.32em] uppercase text-mauve pb-1.5 border-b border-mauve/50 hover:border-mauve transition-colors"
          >
            <span>Shop Skincare</span>
            <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-mauve" />
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-3 md:gap-5">
            {items[0] && <SkinTile product={items[0]} variant="hero" caption="N° 01 — Hydration" />}
            {items[1] && <SkinTile product={items[1]} variant="tall" caption="N° 02 — Prep" />}
            {items[2] && <SkinTile product={items[2]} variant="square" caption="N° 03 — Eyes" />}
            {items[3] && <SkinTile product={items[3]} variant="square" caption="N° 04 — Glow" />}
          </div>
        )}
      </div>
    </section>
  );
};

const SkinTile = ({
  product,
  variant,
  caption,
}: {
  product: ShopifyProduct;
  variant: "hero" | "tall" | "square";
  caption: string;
}) => {
  const node = product.node;
  const img = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const sizing =
    variant === "hero"
      ? "col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[16/12]"
      : variant === "tall"
      ? "col-span-12 md:col-span-5 aspect-[4/5] md:aspect-[4/5]"
      : "col-span-6 md:col-span-6 aspect-[1/1] md:aspect-[16/12]";

  return (
    <Link
      to={`/product/${node.handle}`}
      className={`group relative overflow-hidden bg-cream ${sizing}`}
    >
      {img ? (
        <img
          src={img.url}
          alt={img.altText || node.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 bg-petal/40" />
      )}
      <div className="absolute inset-x-0 top-0 p-3 md:p-5">
        <p className="text-[9px] md:text-[10px] tracking-[0.36em] uppercase text-mauve bg-background/85 backdrop-blur-sm inline-block px-2 py-1">
          {caption}
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-5 bg-gradient-to-t from-black/55 via-black/20 to-transparent">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-serif text-white text-base md:text-xl leading-tight truncate">
              {node.title}
            </h3>
            <p className="text-[10px] md:text-xs tracking-[0.18em] uppercase text-white/85 mt-1">
              {formatPrice(price.amount, price.currencyCode)}
            </p>
          </div>
          <AddToBagPill product={product} className="flex-shrink-0" label="+ Bag" />
        </div>
      </div>
    </Link>
  );
};
