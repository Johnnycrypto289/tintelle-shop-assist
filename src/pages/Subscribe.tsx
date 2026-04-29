import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { PageShell } from "@/components/tintelle/PageShell";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

const FREQUENCIES = [
  { id: "30", label: "Every 30 days", description: "Most popular" },
  { id: "60", label: "Every 60 days", description: "Standard rotation" },
  { id: "90", label: "Every 90 days", description: "Slow burner" },
];

const DISCOUNT = 0.15;

const FAQ = [
  { q: "When can I cancel?", a: "Anytime, in your account dashboard. No fees, no questions." },
  { q: "How do I skip a delivery?", a: "Adjust the next ship date or skip directly from your dashboard at least 48 hours before fulfillment." },
  { q: "Do shades adjust over time?", a: "Yes — swap shades for free at any point. Returns within 30 days are always free." },
  { q: "Can I pause?", a: "Yes — pause for up to 6 months and resume when you're ready." },
];

const Subscribe = () => {
  const { data: products, isLoading } = useProducts(undefined, 24);
  const subscribable = useMemo(
    () => (products ?? []).filter((p) => !p.node.tags.includes("bundle")),
    [products]
  );

  const [selectedHandle, setSelectedHandle] = useState<string | null>(null);
  const [frequency, setFrequency] = useState("30");
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  const selected = subscribable.find((p) => p.node.handle === selectedHandle) ?? subscribable[0];
  const variant = selected?.node.variants.edges[0]?.node;
  const price = variant ? parseFloat(variant.price.amount) : 0;
  const discounted = +(price * (1 - DISCOUNT)).toFixed(2);
  const currency = variant?.price.currencyCode ?? "USD";

  const handleStart = async () => {
    if (!selected || !variant) return;
    await addItem({
      product: selected,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <PageShell
      title="Subscribe & Save"
      description="Subscribe to your Tintelle essentials and save 15% on every refill."
    >
      <section className="container pt-14 pb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-taupe">Subscribe & Save</p>
        <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">
          Your routine, on repeat. Saves 15%.
        </h1>
        <p className="text-base md:text-lg text-taupe max-w-xl leading-relaxed mt-4">
          Auto-replenish what you actually use. Cancel, skip, or swap anytime.
        </p>
      </section>

      <section className="container grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-14 pb-24">
        <div className="space-y-10">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-taupe mb-4">1. Pick your essential</p>
            {isLoading ? (
              <div className="py-10 flex justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-mauve" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {subscribable.map((p) => {
                  const img = p.node.images.edges[0]?.node;
                  const active = p.node.handle === (selected?.node.handle ?? "");
                  return (
                    <button
                      key={p.node.id}
                      onClick={() => setSelectedHandle(p.node.handle)}
                      className={`text-left bg-card border transition-colors ${
                        active ? "border-mauve" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="aspect-square bg-cream overflow-hidden">
                        {img && <img src={img.url} alt={p.node.title} className="w-full h-full object-cover" />}
                      </div>
                      <div className="p-3">
                        <p className="font-serif text-mauve text-sm leading-tight">{p.node.title}</p>
                        <p className="text-xs text-taupe mt-1">
                          {formatPrice(p.node.priceRange.minVariantPrice.amount, p.node.priceRange.minVariantPrice.currencyCode)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-taupe mb-4">2. Pick your frequency</p>
            <div className="space-y-3">
              {FREQUENCIES.map((f) => (
                <label
                  key={f.id}
                  className={`flex items-start gap-4 p-4 border bg-card cursor-pointer transition-colors ${
                    frequency === f.id ? "border-mauve" : "border-border hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="frequency"
                    checked={frequency === f.id}
                    onChange={() => setFrequency(f.id)}
                    className="mt-1 accent-[hsl(var(--primary))]"
                  />
                  <div>
                    <p className="font-serif text-mauve">{f.label}</p>
                    <p className="text-sm text-taupe mt-0.5">{f.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-taupe mb-4">3. Common questions</p>
            <Accordion type="single" collapsible className="border-t border-border">
              {FAQ.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="border-border">
                  <AccordionTrigger className="text-mauve font-serif text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-taupe leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <aside className="bg-card border border-border p-7 md:p-8 md:sticky md:top-28 md:self-start">
          <h3 className="font-serif text-xl text-mauve mb-5">Your subscription</h3>
          {selected ? (
            <>
              <div className="flex gap-4 items-center pb-5 border-b border-border">
                {selected.node.images.edges[0]?.node && (
                  <div className="w-20 h-20 bg-cream">
                    <img src={selected.node.images.edges[0].node.url} alt={selected.node.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <p className="font-serif text-mauve">{selected.node.title}</p>
                  <p className="text-sm text-taupe mt-1">Ships every {frequency} days</p>
                </div>
              </div>
              <div className="space-y-2 pt-5 text-sm text-taupe">
                <div className="flex justify-between"><span>One-time price</span><span className="line-through">{formatPrice(price, currency)}</span></div>
                <div className="flex justify-between text-mauve"><span>Subscriber price (−15%)</span><span>{formatPrice(discounted, currency)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
              </div>
              <p className="text-xs text-taupe mt-5 leading-relaxed">
                You'll be charged {formatPrice(discounted, currency)} on every shipment. Cancel, swap, or pause anytime
                in your account.
              </p>
              <Button
                onClick={handleStart}
                disabled={isAdding}
                size="lg"
                className="w-full rounded-none mt-6 h-12 text-xs tracking-[0.18em] uppercase"
              >
                {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Start subscription"}
              </Button>
              <p className="text-[11px] tracking-[0.18em] uppercase text-taupe mt-3 text-center">
                Adds the first shipment to your bag — recurring billing is set up at checkout.
              </p>
            </>
          ) : (
            <p className="text-taupe">Select a product to see pricing.</p>
          )}
        </aside>
      </section>
    </PageShell>
  );
};

export default Subscribe;
