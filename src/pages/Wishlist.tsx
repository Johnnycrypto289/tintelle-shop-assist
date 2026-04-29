import { Link } from "react-router-dom";
import { Heart, Loader2 } from "lucide-react";
import { PageShell } from "@/components/tintelle/PageShell";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

const Wishlist = () => {
  const ids = useWishlistStore((s) => s.ids);
  const toggle = useWishlistStore((s) => s.toggle);
  const { data: allProducts, isLoading } = useProducts(undefined, 50);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  const items = (allProducts ?? []).filter((p) => ids.includes(p.node.handle));

  const moveAllToBag = async () => {
    for (const p of items) {
      const v = p.node.variants.edges[0]?.node;
      if (v) {
        await addItem({
          product: p,
          variantId: v.id,
          variantTitle: v.title,
          price: v.price,
          quantity: 1,
          selectedOptions: v.selectedOptions || [],
        });
      }
    }
  };

  return (
    <PageShell title="Wishlist" description="Your saved Tintelle products.">
      <section className="container pt-16 pb-6">
        <p className="text-xs tracking-[0.3em] uppercase text-taupe">Saved for later</p>
        <div className="flex justify-between items-end gap-6 mt-3 flex-wrap">
          <h1 className="font-serif text-4xl md:text-6xl text-mauve leading-[1.05] m-0">Your Wishlist</h1>
          {items.length > 0 && (
            <div className="flex items-center gap-3">
              <p className="text-sm text-taupe">{items.length} saved</p>
              <Button
                onClick={moveAllToBag}
                disabled={isAdding}
                className="rounded-none px-5 h-11 text-xs tracking-[0.18em] uppercase"
              >
                {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Move all to bag"}
              </Button>
            </div>
          )}
        </div>
      </section>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-mauve" />
        </div>
      ) : items.length === 0 ? (
        <section className="max-w-[720px] mx-auto px-6 py-12 pb-24 text-center">
          <div className="w-[88px] h-[88px] mx-auto mb-5 border border-border rounded-full inline-flex items-center justify-center text-taupe">
            <Heart className="h-9 w-9" strokeWidth={1.25} />
          </div>
          <p className="font-serif text-2xl md:text-3xl text-mauve mb-2">Nothing saved yet.</p>
          <p className="text-taupe mb-7 leading-relaxed">
            Tap the heart on any product to add it here. Your wishlist saves to this device.
          </p>
          <div className="inline-flex gap-3 flex-wrap justify-center">
            <Button asChild className="rounded-none h-11 px-6 text-xs tracking-[0.18em] uppercase">
              <Link to="/shop">Browse the shop</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-none h-11 px-6 text-xs tracking-[0.18em] uppercase border-mauve text-mauve hover:bg-mauve hover:text-background">
              <Link to="/account">Sign in</Link>
            </Button>
          </div>
        </section>
      ) : (
        <section className="container pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((p) => {
              const img = p.node.images.edges[0]?.node;
              const v = p.node.variants.edges[0]?.node;
              return (
                <div key={p.node.id} className="bg-card border border-border relative flex flex-col">
                  <button
                    onClick={() => toggle(p.node.handle)}
                    aria-label="Remove from wishlist"
                    className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-background/95 border border-border flex items-center justify-center text-primary z-10"
                  >
                    <Heart className="h-[18px] w-[18px]" strokeWidth={1.25} fill="currentColor" />
                  </button>
                  <Link to={`/product/${p.node.handle}`} className="block aspect-square bg-cream overflow-hidden">
                    {img && <img src={img.url} alt={p.node.title} className="w-full h-full object-cover" />}
                  </Link>
                  <div className="p-4 text-center flex-1 flex flex-col">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-taupe">{p.node.productType || "Tintelle"}</p>
                    <Link to={`/product/${p.node.handle}`} className="block">
                      <p className="font-serif text-mauve mt-2 mb-1">{p.node.title}</p>
                    </Link>
                    <p className="font-serif text-mauve mb-3">
                      {formatPrice(p.node.priceRange.minVariantPrice.amount, p.node.priceRange.minVariantPrice.currencyCode)}
                    </p>
                    <Button
                      onClick={async () => {
                        if (!v) return;
                        await addItem({
                          product: p,
                          variantId: v.id,
                          variantTitle: v.title,
                          price: v.price,
                          quantity: 1,
                          selectedOptions: v.selectedOptions || [],
                        });
                      }}
                      variant="outline"
                      className="mt-auto w-full rounded-none border-mauve text-mauve hover:bg-mauve hover:text-background text-xs tracking-[0.18em] uppercase"
                    >
                      Add to Bag
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </PageShell>
  );
};

export default Wishlist;
