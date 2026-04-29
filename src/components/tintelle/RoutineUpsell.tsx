import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import routineImg from "@/assets/tintelle-routine.jpg";

export const RoutineUpsell = () => {
  const { data: products } = useProducts("tag:bundle", 1);
  const bundle = products?.[0];
  const variant = bundle?.node.variants.edges[0]?.node;
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const handleAdd = async () => {
    if (!bundle || !variant) return;
    await addItem({
      product: bundle,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <section id="routine" className="py-16 md:py-24 bg-background">
      <div className="container grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="aspect-[5/4] overflow-hidden bg-cream order-2 md:order-1">
          <img
            src={routineImg}
            alt="The Tintelle Routine — three core products together"
            loading="lazy"
            width={1280}
            height={1024}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="order-1 md:order-2 space-y-5">
          <p className="text-xs tracking-[0.3em] uppercase text-taupe">The Routine</p>
          <h2 className="font-serif text-3xl md:text-5xl text-mauve leading-tight">
            The complete look in three steps.
          </h2>
          <p className="text-taupe max-w-md leading-relaxed">
            Skin Tint. Lip Tint. Cheek Tint. The effortless trio our routine is built around — bundled at a softer
            price.
          </p>
          {variant ? (
            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-serif text-2xl text-mauve">
                {formatPrice(variant.price.amount, variant.price.currencyCode)}
              </span>
              <span className="text-sm line-through text-taupe">$90</span>
            </div>
          ) : null}
          <Button
            onClick={handleAdd}
            disabled={isLoading || !variant}
            size="lg"
            className="rounded-none px-8 h-12 text-sm tracking-wider uppercase mt-2"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Shop the Set"}
          </Button>
        </div>
      </div>
    </section>
  );
};
