import { Link } from "react-router-dom";
import lipLinerImg from "@/assets/featured-lip-liner-raspberry.webp";
import blushImg from "@/assets/featured-blush-kissable.webp";
import bbCreamImg from "@/assets/featured-bb-cream-pearly.webp";
import lipGlossImg from "@/assets/featured-lip-gloss-brick.webp";

interface FeaturedTile {
  number: string;
  category: string;
  shade: string;
  tagline: string;
  image: string;
  alt: string;
  href: string;
}

const TILES: FeaturedTile[] = [
  {
    number: "N° 01",
    category: "Lip Liner",
    shade: "Raspberry",
    tagline: "Define. Soften. Stay.",
    image: lipLinerImg,
    alt: "Model holding Tintelle Raspberry lip liner",
    href: "/shop?category=Lip%20Liner",
  },
  {
    number: "N° 02",
    category: "Blush Palette",
    shade: "Kissable",
    tagline: "A flush, three ways.",
    image: blushImg,
    alt: "Model with Tintelle Kissable blush palette",
    href: "/shop?category=Blush%20Palette",
  },
  {
    number: "N° 03",
    category: "BB Cream",
    shade: "Pearly",
    tagline: "Skin, only better.",
    image: bbCreamImg,
    alt: "Model holding Tintelle Pearly BB cream",
    href: "/shop?category=BB%20Cream",
  },
  {
    number: "N° 04",
    category: "Lip Gloss",
    shade: "Brick",
    tagline: "Glass-finish warmth.",
    image: lipGlossImg,
    alt: "Close-up lips wearing Tintelle Brick lip gloss",
    href: "/shop?category=Lip%20Gloss",
  },
];

export const ShopByCategory = () => {
  return (
    <section className="py-14 md:py-24 bg-background">
      <div className="container">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-16">
          <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-taupe">The Edit</p>
          <h2 className="font-serif text-3xl md:text-5xl text-mauve mt-2.5 md:mt-4 leading-[1.1]">
            Four to fall for.
          </h2>
          <p className="text-sm md:text-base text-taupe mt-3 md:mt-4 max-w-md mx-auto">
            A hand-picked quartet of staples — the shades our community keeps coming back for.
          </p>
        </div>

        {/* Editorial 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-12 md:gap-y-16 max-w-5xl mx-auto">
          {TILES.map((tile) => (
            <Link
              key={tile.category}
              to={tile.href}
              className="group block"
            >
              <div className="relative overflow-hidden bg-cream aspect-[4/5]">
                <img
                  src={tile.image}
                  alt={tile.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                {/* Bottom-left overlay tag */}
                <div className="absolute left-4 bottom-4 md:left-5 md:bottom-5 bg-background/85 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2">
                  <p className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-mauve">
                    {tile.category} — {tile.shade}
                  </p>
                </div>
              </div>

              {/* Caption */}
              <div className="mt-4 md:mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-taupe">
                    {tile.number} — {tile.category}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-mauve mt-1.5 md:mt-2 leading-tight">
                    {tile.shade}
                  </h3>
                  <p className="font-serif italic text-sm md:text-base text-taupe mt-1">
                    {tile.tagline}
                  </p>
                </div>
                <span className="shrink-0 mt-2 text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-mauve border-b border-mauve pb-0.5 transition-opacity group-hover:opacity-70">
                  Discover →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
