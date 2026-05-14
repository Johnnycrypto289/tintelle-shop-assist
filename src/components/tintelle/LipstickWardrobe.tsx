import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { AddToBagPill } from "./AddToBagPill";
import lipsMauve from "@/assets/lipstick-lips-mauve.jpg";
import lipsParisianPink from "@/assets/lips-parisian-pink.jpg";
import lipsNaughtyNude from "@/assets/lips-naughty-nude.jpg";
import lipsRosewood from "@/assets/lips-rosewood.jpg";
import lipsBrownNude from "@/assets/lips-brown-nude.jpg";

const LIP_SWATCHES = [
  { src: lipsMauve, shade: "Magical Mauve" },
  { src: lipsParisianPink, shade: "Parisian Pink" },
  { src: lipsNaughtyNude, shade: "Naughty Nude" },
  { src: lipsRosewood, shade: "Rosewood" },
];

/**
 * Lipstick wardrobe — luxury cream lipsticks shown as a magazine "wardrobe":
 * a single wide cinematic feature on the left, a tight grid of 3 shades on
 * the right. Reorders to stacked on mobile.
 */
export const LipstickWardrobe = () => {
  const { data, isLoading } = useProducts(
    "title:Lipstick OR product_type:Lipstick OR tag:lipstick",
    30
  );
  const lipsticks = (data ?? []).filter((p) => /lipstick/i.test(p.node.title));
  const feature = lipsticks[0];
  const grid = lipsticks.slice(1, 5);

  return (
    <section className="relative bg-petal/25 py-14 md:py-24 overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-14">
          <div className="max-w-xl">
            <p className="text-[10px] md:text-[11px] tracking-[0.42em] uppercase text-taupe">
              The Wardrobe — Chapter 05
            </p>
            <h2 className="font-serif font-light text-mauve leading-[1] tracking-[-0.01em] mt-3 text-3xl md:text-5xl lg:text-[60px]">
              Luxury cream, <span className="italic font-extralight">on tap.</span>
            </h2>
          </div>
          <Link
            to="/shop?category=Lipstick"
            className="self-start md:self-auto group inline-flex items-center text-[11px] tracking-[0.32em] uppercase text-mauve pb-1.5 border-b border-mauve/50 hover:border-mauve transition-colors"
          >
            <span>Shop Lipsticks</span>
            <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Editorial lip swatch row — 4 shades worn */}
        <div className="mb-6 md:mb-10">
          <div className="flex items-end justify-between gap-4 mb-4 md:mb-5">
            <p className="text-[10px] md:text-[11px] tracking-[0.42em] uppercase text-taupe">
              Worn on lips — the four shades
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {LIP_SWATCHES.map((s) => (
              <div
                key={s.shade}
                className="group relative overflow-hidden aspect-square bg-cream"
              >
                <img
                  src={s.src}
                  alt={`Lips wearing Tintelle luxury cream lipstick in ${s.shade}`}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-x-0 bottom-0 p-2.5 md:p-3 bg-gradient-to-t from-black/55 via-black/10 to-transparent">
                  <p className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-white/95">
                    {s.shade}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-mauve" />
          </div>
        ) : !feature ? (
          <p className="text-center text-taupe py-12">Coming soon.</p>
        ) : (
          <div className="grid grid-cols-12 gap-3 md:gap-5 md:items-stretch">
            {/* Left feature */}
            <div className="col-span-12 md:col-span-7">
              <FeatureCard product={feature} />
            </div>
            {/* Right grid */}
            <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-3 md:gap-4 md:grid-rows-2">
              {grid.map((p) => (
                <ShadeCard key={p.node.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const FeatureCard = ({ product }: { product: ShopifyProduct }) => {
  const node = product.node;
  const img = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const shade = node.title.split(" - ")[1] ?? node.title;

  return (
    <Link
      to={`/product/${node.handle}`}
      className="group relative block overflow-hidden bg-cream aspect-[4/5] md:aspect-auto md:h-full md:min-h-[420px]"
    >
      {img ? (
        <img
          src={img.url}
          alt={img.altText || node.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 bg-petal/40" />
      )}
      <div className="absolute inset-x-0 top-0 p-4 md:p-6">
        <p className="text-[10px] md:text-xs tracking-[0.36em] uppercase text-mauve bg-background/85 backdrop-blur-sm inline-block px-2.5 py-1.5">
          The Headliner
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-7 bg-gradient-to-t from-black/65 via-black/15 to-transparent">
        <p className="text-[10px] md:text-xs tracking-[0.32em] uppercase text-white/90">
          Luxury Cream Lipstick
        </p>
        <h3 className="font-serif text-white text-2xl md:text-4xl mt-1.5 leading-tight">
          {shade}
        </h3>
        <div className="mt-3 md:mt-5 flex items-center justify-between gap-3">
          <span className="text-white text-sm md:text-base">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          <AddToBagPill product={product} />
        </div>
      </div>
    </Link>
  );
};

const ShadeCard = ({ product }: { product: ShopifyProduct }) => {
  const node = product.node;
  const img = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const shade = node.title.split(" - ")[1] ?? node.title;

  return (
    <Link
      to={`/product/${node.handle}`}
      className="group relative block overflow-hidden bg-cream aspect-square"
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
      <div className="absolute inset-x-0 bottom-0 p-2.5 md:p-3 bg-gradient-to-t from-black/60 via-black/15 to-transparent">
        <h4 className="font-serif text-white text-sm md:text-base leading-tight truncate">
          {shade}
        </h4>
        <div className="flex items-center justify-between gap-2 mt-1">
          <span className="text-[10px] tracking-[0.18em] uppercase text-white/90">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          <AddToBagPill product={product} label="+" className="px-2.5 py-1.5" />
        </div>
      </div>
    </Link>
  );
};
