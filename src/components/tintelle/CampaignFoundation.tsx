import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/shopify";
import model1 from "@/assets/model-foundation-1.webp";
import model2 from "@/assets/model-foundation-2.webp";
import model3 from "@/assets/model-foundation-3.webp";

/**
 * Editorial campaign block — luxury "Hermès × Celine" feel.
 * Three model portraits arranged asymmetrically alongside the
 * featured Foundation product. Click anywhere → /shop?category=foundation
 */
export const CampaignFoundation = () => {
  // Featured: Foundation - Maple (bottom wide tile)
  const mapleQuery = useProducts('title:"Foundation - Maple" OR title:Maple', 1);
  // Left tall tile shows the "Amber" foundation
  const amberQuery = useProducts('title:"Foundation - Amber" OR title:Amber', 1);
  // Top right tile shows "Rich Caramel"
  const caramelQuery = useProducts('title:"Foundation - Rich Caramel" OR title:"Rich Caramel"', 1);
  const fallback = useProducts("tag:foundation OR product_type:Foundation OR title:foundation", 1);

  const product = mapleQuery.data?.[0] ?? fallback.data?.[0] ?? null;
  const amberProduct = amberQuery.data?.[0] ?? null;
  const caramelProduct = caramelQuery.data?.[0] ?? null;
  const variant = product?.node.variants.edges[0]?.node;

  const shopHref = "/shop?category=Foundation";
  const mapleHref = product ? `/product/${product.node.handle}` : shopHref;
  const amberHref = amberProduct ? `/product/${amberProduct.node.handle}` : shopHref;
  const caramelHref = caramelProduct ? `/product/${caramelProduct.node.handle}` : shopHref;

  return (
    <section className="relative bg-background py-16 md:py-28 overflow-hidden">
      {/* Soft brand wash — petal/cream gradient instead of flat bone */}
      <div className="absolute inset-0 bg-gradient-to-br from-petal/30 via-background to-cream/60 pointer-events-none" />
      <div className="container relative">
        {/* Eyebrow */}
        <div className="flex items-end justify-between mb-10 md:mb-16">
          <div>
            <p className="text-[10px] md:text-[11px] tracking-[0.42em] uppercase text-taupe">
              The Campaign — Chapter 01
            </p>
            <h2 className="font-serif font-light text-mauve leading-[0.95] tracking-[-0.015em] mt-3 text-4xl md:text-6xl lg:text-[88px]">
              Skin,
              <br />
              <span className="italic font-extralight">unwritten.</span>
            </h2>
          </div>
          <Link
            to={shopHref}
            className="hidden md:inline-flex group items-center text-[11px] tracking-[0.32em] uppercase text-mauve pb-1.5 border-b border-mauve/50 hover:border-mauve transition-colors"
          >
            <span>Discover Foundation</span>
            <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Editorial grid: 3 portraits + product detail */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Left tall portrait — Foundation: Amber */}
          <Link
            to={amberHref}
            className="col-span-6 md:col-span-4 row-span-2 group relative overflow-hidden bg-cream aspect-[3/5]"
          >
            <img
              src={model3}
              alt="Tintelle Foundation — Amber shade"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/40 to-transparent">
              <p className="text-[10px] tracking-[0.32em] uppercase text-white/90">Foundation — Amber</p>
            </div>
          </Link>

          {/* Top right portrait — Foundation: Rich Caramel */}
          <Link
            to={caramelHref}
            className="col-span-6 md:col-span-5 group relative overflow-hidden bg-cream aspect-[4/3]"
          >
            <img
              src={model2}
              alt="Tintelle Foundation — Rich Caramel shade"
              loading="lazy"
              style={{ objectPosition: "center 25%" }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-x-0 bottom-0 p-3 md:p-5 bg-gradient-to-t from-black/40 to-transparent">
              <p className="text-[10px] tracking-[0.32em] uppercase text-white/90">Foundation — Rich Caramel</p>
            </div>
          </Link>

          {/* Product detail card — replaces "boring panel" with editorial spec sheet */}
          <div className="col-span-12 md:col-span-3 flex flex-col justify-between bg-cream/60 backdrop-blur-sm p-5 md:p-6 min-h-[260px]">
            {product ? (
              <>
                <div>
                  <p className="text-[10px] tracking-[0.36em] uppercase text-taupe">N° 01 — Featured</p>
                  <h3 className="font-serif text-mauve text-2xl md:text-[26px] leading-tight mt-3">
                    {product.node.title}
                  </h3>
                  <p className="text-taupe text-sm leading-relaxed mt-3 line-clamp-3">
                    {product.node.description?.slice(0, 130) ??
                      "A weightless veil that lets your skin breathe — buildable, breathable, beautifully you."}
                    {product.node.description && product.node.description.length > 130 ? "…" : ""}
                  </p>
                </div>
                <div className="mt-6 flex items-end justify-between">
                  {variant ? (
                    <span className="font-serif text-mauve text-lg">
                      {formatPrice(variant.price.amount, variant.price.currencyCode)}
                    </span>
                  ) : (
                    <span />
                  )}
                  <Link
                    to={`/product/${product.node.handle}`}
                    className="group inline-flex items-center text-[10px] tracking-[0.32em] uppercase text-mauve pb-1 border-b border-mauve/50 hover:border-mauve transition-colors"
                  >
                    <span>View</span>
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </>
            ) : mapleQuery.isLoading || fallback.isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-mauve" />
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.36em] uppercase text-taupe">N° 01 — Featured</p>
                  <h3 className="font-serif text-mauve text-2xl leading-tight mt-3">Soft Veil Foundation</h3>
                  <p className="text-taupe text-sm leading-relaxed mt-3">
                    A weightless veil that lets your skin breathe.
                  </p>
                </div>
                <Link
                  to={shopHref}
                  className="group inline-flex items-center text-[10px] tracking-[0.32em] uppercase text-mauve pb-1 border-b border-mauve/50 hover:border-mauve transition-colors mt-6 self-start"
                >
                  <span>Explore</span>
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            )}
          </div>

          {/* Bottom right wide portrait — Foundation: Maple */}
          <Link
            to={mapleHref}
            className="col-span-12 md:col-span-8 group relative overflow-hidden bg-cream aspect-[16/9] md:aspect-[16/7]"
          >
            <img
              src={model1}
              alt="Tintelle Foundation — Maple shade"
              loading="lazy"
              style={{ objectPosition: "center 30%" }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-between">
              <p className="text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-white">
                Foundation — Maple
              </p>
              <span className="hidden md:inline text-[11px] tracking-[0.32em] uppercase text-white/90 border-b border-white/60 pb-1 group-hover:border-white">
                Shop Maple →
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 md:hidden flex justify-center">
          <Link
            to={shopHref}
            className="group inline-flex items-center text-[11px] tracking-[0.32em] uppercase text-mauve pb-1.5 border-b border-mauve/60"
          >
            <span>Discover Foundation</span>
            <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
