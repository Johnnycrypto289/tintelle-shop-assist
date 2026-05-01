import { Link } from "react-router-dom";
import lipLinerImg from "@/assets/featured-lip-liner-raspberry.webp";
import blushImg from "@/assets/featured-blush-kissable.webp";
import bbCreamImg from "@/assets/featured-bb-cream-pearly.webp";
import lipGlossImg from "@/assets/featured-lip-gloss-brick.webp";

/**
 * Editorial "The Edit" — magazine-style asymmetric spread.
 * Sibling to CampaignFoundation: same luxury vocabulary, different story.
 * Sidebar copy on the left, four tiles of mixed sizes on the right.
 */
export const ShopByCategory = () => {
  const shopAllHref = "/shop";

  return (
    <section className="relative bg-background py-20 md:py-32 overflow-hidden">
      {/* Soft brand wash */}
      <div className="absolute inset-0 bg-gradient-to-bl from-cream/50 via-background to-petal/25 pointer-events-none" />

      <div className="container relative max-w-6xl">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-10">
          {/* ============ Sidebar (editorial intro) ============ */}
          <aside className="col-span-12 md:col-span-3 md:sticky md:top-24 md:self-start md:py-8">
            <p className="text-[10px] md:text-[11px] tracking-[0.42em] uppercase text-taupe">
              The Edit
            </p>
            <h2 className="font-serif font-light text-mauve leading-[0.95] tracking-[-0.015em] mt-3 text-4xl md:text-5xl lg:text-[64px]">
              Four to
              <br />
              <span className="italic font-extralight">fall for.</span>
            </h2>
            <div className="hidden md:block w-10 h-px bg-mauve/30 mt-7" />
            <p className="text-sm md:text-[15px] leading-relaxed text-taupe mt-5 md:mt-6 max-w-xs">
              A hand-picked quartet of staples — the shades our community keeps
              coming back for, season after season.
            </p>
            <Link
              to={shopAllHref}
              className="group inline-flex items-center mt-7 text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-mauve pb-1.5 border-b border-mauve/50 hover:border-mauve transition-colors"
            >
              <span>Shop the edit</span>
              <span className="ml-3 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </aside>

          {/* ============ Editorial tile cluster ============ */}
          <div className="col-span-12 md:col-span-9">
            <div className="grid grid-cols-9 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10">
              {/* Tile 1 — Lip Liner Raspberry — TALL LEFT, spans both rows */}
              <FeaturedTile
                className="col-span-9 md:col-span-4 md:row-span-2 md:mt-0"
                href="/shop?category=Lip%20Liner"
                src={lipLinerImg}
                alt="Model holding Tintelle Raspberry lip liner"
                aspect="aspect-[3/4] md:aspect-auto md:h-full"
                number="N° 01"
                category="Lip Liner"
                shade="Raspberry"
                tagline="Define. Soften. Stay."
              />

              {/* Tile 2 — Blush Kissable — landscape top right */}
              <FeaturedTile
                className="col-span-9 md:col-span-5 md:mt-8 lg:mt-12"
                href="/shop?category=Blush%20Palette"
                src={blushImg}
                alt="Model with Tintelle Kissable blush palette"
                aspect="aspect-[4/3]"
                objectPosition="center 30%"
                number="N° 02"
                category="Blush Palette"
                shade="Kissable"
                tagline="A flush, three ways."
              />

              {/* Tile 3 — BB Cream Pearly — portrait bottom right, offset */}
              <FeaturedTile
                className="col-span-9 md:col-span-4 md:col-start-6 md:ml-4 lg:ml-8"
                href="/shop?category=BB%20Cream"
                src={bbCreamImg}
                alt="Model holding Tintelle Pearly BB cream"
                aspect="aspect-[3/4]"
                number="N° 03"
                category="BB Cream"
                shade="Pearly"
                tagline="Skin, only better."
              />

              {/* Tile 4 — Lip Gloss Brick — wide bottom under Lip Liner */}
              <FeaturedTile
                className="col-span-9 md:col-span-4 md:col-start-1 md:-mt-8 md:mr-6"
                href="/shop?category=Lip%20Gloss"
                src={lipGlossImg}
                alt="Close-up lips wearing Tintelle Brick lip gloss"
                aspect="aspect-[4/5]"
                objectPosition="center 35%"
                number="N° 04"
                category="Lip Gloss"
                shade="Brick"
                tagline="Glass-finish warmth."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ----------------------------------------------------------- */

interface FeaturedTileProps {
  className?: string;
  href: string;
  src: string;
  alt: string;
  aspect: string;
  objectPosition?: string;
  number: string;
  category: string;
  shade: string;
  tagline: string;
}

const FeaturedTile = ({
  className = "",
  href,
  src,
  alt,
  aspect,
  objectPosition,
  number,
  category,
  shade,
  tagline,
}: FeaturedTileProps) => {
  return (
    <Link to={href} className={`group flex flex-col ${className}`}>
      <div className={`relative overflow-hidden bg-cream ${aspect}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={objectPosition ? { objectPosition } : undefined}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
        />
        {/* Caption chip */}
        <div className="absolute left-3 bottom-3 md:left-4 md:bottom-4 bg-background/85 backdrop-blur-sm px-3 py-1.5">
          <p className="text-[9px] md:text-[10px] tracking-[0.32em] uppercase text-mauve">
            {category} — {shade}
          </p>
        </div>
      </div>

      {/* Caption beneath */}
      <div className="mt-4 md:mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.32em] uppercase text-taupe">
            {number} — {category}
          </p>
          <h3 className="font-serif text-mauve text-2xl md:text-[28px] leading-tight mt-1.5">
            {shade}
          </h3>
          <p className="font-serif italic text-sm md:text-[15px] text-taupe mt-1">
            {tagline}
          </p>
        </div>
        <span className="shrink-0 mb-1 text-[10px] tracking-[0.32em] uppercase text-mauve pb-0.5 border-b border-mauve/50 group-hover:border-mauve transition-colors">
          Discover →
        </span>
      </div>
    </Link>
  );
};
