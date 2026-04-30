import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Loader2, ShoppingBag } from "lucide-react";
import { PageShell } from "@/components/tintelle/PageShell";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

const STEPS = [
  { id: "cart", label: "Cart" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "done", label: "Confirmation" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

const inputCls =
  "w-full px-4 py-3 bg-background border border-border focus:border-primary outline-none text-sm font-sans rounded-none transition-colors";
const labelCls = "block text-[11px] tracking-[0.2em] uppercase text-taupe mb-2";

const Cart = () => {
  const { items, updateQuantity, removeItem, getCheckoutUrl, isLoading, isSyncing } = useCartStore();
  const [step, setStep] = useState<StepId>("cart");

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0),
    [items]
  );
  const currency = items[0]?.price.currencyCode ?? "USD";
  const shipping = subtotal === 0 || subtotal >= 99 ? 0 : 6.5;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + shipping + tax;
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const stepIdx = STEPS.findIndex((s) => s.id === step);

  const handleShopifyCheckout = () => {
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
  };

  const Steps = () => (
    <div className="flex border-b border-border mb-12 overflow-x-auto">
      {STEPS.map((s, i) => (
        <button
          key={s.id}
          onClick={() => i < stepIdx && setStep(s.id)}
          className={`px-5 md:px-6 py-3.5 text-xs tracking-[0.18em] uppercase whitespace-nowrap border-b-2 transition-colors ${
            i === stepIdx
              ? "text-mauve border-mauve"
              : "text-taupe border-transparent" + (i < stepIdx ? " cursor-pointer hover:text-mauve" : " cursor-default")
          }`}
          disabled={i > stepIdx}
        >
          <span className="opacity-60 mr-2">{String(i + 1).padStart(2, "0")}</span>
          {s.label}
        </button>
      ))}
    </div>
  );

  const Summary = () => (
    <aside className="bg-card border border-border p-6 md:p-7 md:sticky md:top-28 md:self-start">
      <h3 className="font-serif text-xl text-mauve mb-4">Order summary</h3>
      <div className="space-y-3.5 mb-4">
        {items.map((i) => {
          const img = i.product.node.images.edges[0]?.node;
          return (
            <div key={i.variantId} className="grid grid-cols-[56px_1fr_auto] gap-3 items-center">
              <div className="w-14 h-14 bg-cream relative">
                {img && <img src={img.url} alt={i.product.node.title} className="w-full h-full object-cover" />}
                <span className="absolute -top-1.5 -right-1.5 bg-mauve text-background text-[10px] px-1.5 py-0.5 rounded-full">
                  {i.quantity}
                </span>
              </div>
              <p className="text-sm text-mauve font-serif leading-tight">{i.product.node.title}</p>
              <p className="text-sm text-mauve">
                {formatPrice(parseFloat(i.price.amount) * i.quantity, i.price.currencyCode)}
              </p>
            </div>
          );
        })}
      </div>
      <div className="border-t border-border pt-3.5 text-sm text-taupe space-y-2">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal, currency)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>{shipping ? formatPrice(shipping, currency) : "Free"}</span></div>
        <div className="flex justify-between"><span>Estimated tax</span><span>{formatPrice(tax, currency)}</span></div>
      </div>
      <div className="border-t border-border pt-3.5 mt-3.5 flex justify-between items-baseline font-serif text-mauve text-lg">
        <span>Total</span><span>{formatPrice(total, currency)}</span>
      </div>
    </aside>
  );

  return (
    <PageShell title="Cart" description="Review your bag and check out.">
      <section className="max-w-[1180px] mx-auto px-6 pt-14 pb-24">
        <p className="text-xs tracking-[0.3em] uppercase text-taupe">Your bag</p>
        <h1 className="font-serif text-4xl md:text-5xl text-mauve leading-[1.05] mt-3 mb-8">
          {step === "done" ? "Thank you." : "Checkout"}
        </h1>

        {items.length === 0 && step === "cart" ? (
          <div className="text-center py-20 bg-card border border-border">
            <ShoppingBag className="h-12 w-12 mx-auto text-taupe" strokeWidth={1} />
            <h2 className="font-serif text-2xl md:text-3xl text-mauve mt-4 mb-2">Your bag is empty.</h2>
            <p className="text-taupe mb-6">Discover something to start your routine.</p>
            <Button asChild size="lg" className="rounded-none px-8 text-xs tracking-[0.18em] uppercase">
              <Link to="/shop">Shop the collection</Link>
            </Button>
          </div>
        ) : (
          <>
            <Steps />
            <div className="grid md:grid-cols-[1fr_360px] gap-10 md:gap-12">
              <div>
                {step === "cart" && (
                  <div className="bg-card border border-border">
                    {items.map((i) => {
                      const img = i.product.node.images.edges[0]?.node;
                      return (
                        <div
                          key={i.variantId}
                          className="grid grid-cols-[100px_1fr_auto] md:grid-cols-[120px_1fr_auto] gap-5 md:gap-6 p-5 md:p-6 border-b border-border items-center"
                        >
                          <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] bg-cream">
                            {img && <img src={img.url} alt={i.product.node.title} className="w-full h-full object-cover" />}
                          </div>
                          <div>
                            <h4 className="font-serif text-mauve text-base md:text-lg">{i.product.node.title}</h4>
                            <p className="text-sm text-taupe mt-1 mb-3">
                              {formatPrice(i.price.amount, i.price.currencyCode)}
                            </p>
                            <div className="inline-flex items-center border border-mauve">
                              <button onClick={() => updateQuantity(i.variantId, Math.max(1, i.quantity - 1))} className="px-3 h-9 text-mauve">−</button>
                              <span className="px-3 font-serif text-mauve">{i.quantity}</span>
                              <button onClick={() => updateQuantity(i.variantId, i.quantity + 1)} className="px-3 h-9 text-mauve">+</button>
                            </div>
                            <button
                              onClick={() => removeItem(i.variantId)}
                              className="ml-4 text-xs tracking-[0.18em] uppercase text-taupe hover:text-mauve transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                          <p className="font-serif text-lg md:text-xl text-mauve">
                            {formatPrice(parseFloat(i.price.amount) * i.quantity, i.price.currencyCode)}
                          </p>
                        </div>
                      );
                    })}
                    <div className="p-5 md:p-6 flex items-center justify-between flex-wrap gap-3">
                      <Link
                        to="/shop"
                        className="text-xs tracking-[0.18em] uppercase text-taupe hover:text-mauve transition-colors"
                      >
                        ← Continue shopping
                      </Link>
                      <Button
                        onClick={handleShopifyCheckout}
                        disabled={isLoading || isSyncing}
                        size="lg"
                        className="rounded-none h-12 px-7 text-xs tracking-[0.18em] uppercase"
                      >
                        {isLoading || isSyncing ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Checkout · {totalItems} {totalItems === 1 ? "item" : "items"}
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="px-5 md:px-6 pb-5 text-xs text-taupe">
                      Secure checkout powered by Shopify. The shipping & payment steps preview the flow — actual
                      payment happens in the Shopify-hosted checkout.
                    </p>
                  </div>
                )}

                {step === "shipping" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep("payment");
                    }}
                    className="bg-card border border-border p-7 md:p-8 space-y-6"
                  >
                    <h3 className="font-serif text-xl text-mauve">Contact</h3>
                    <div>
                      <label className={labelCls}>Email</label>
                      <input type="email" required className={inputCls} />
                    </div>
                    <h3 className="font-serif text-xl text-mauve pt-2">Shipping address</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className={labelCls}>First name</label><input required className={inputCls} /></div>
                      <div><label className={labelCls}>Last name</label><input required className={inputCls} /></div>
                    </div>
                    <div><label className={labelCls}>Address</label><input required className={inputCls} /></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div><label className={labelCls}>City</label><input required className={inputCls} /></div>
                      <div><label className={labelCls}>State</label><input required className={inputCls} /></div>
                      <div><label className={labelCls}>ZIP</label><input required className={inputCls} /></div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <button type="button" onClick={() => setStep("cart")} className="text-xs tracking-[0.18em] uppercase text-taupe">← Back to cart</button>
                      <Button type="submit" className="rounded-none h-12 px-7 text-xs tracking-[0.18em] uppercase">Continue to payment</Button>
                    </div>
                  </form>
                )}

                {step === "payment" && (
                  <div className="bg-card border border-border p-7 md:p-8 space-y-6">
                    <h3 className="font-serif text-xl text-mauve">Payment</h3>
                    <p className="text-taupe text-sm leading-relaxed">
                      For secure payment, we'll redirect you to Shopify's hosted checkout. Your cart items, shipping
                      details, and pricing are already synced.
                    </p>
                    <Button
                      onClick={handleShopifyCheckout}
                      size="lg"
                      className="w-full rounded-none h-12 text-xs tracking-[0.18em] uppercase"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Pay securely with Shopify
                    </Button>
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="text-xs tracking-[0.18em] uppercase text-taupe"
                    >
                      ← Back to shipping
                    </button>
                  </div>
                )}

                {step === "done" && (
                  <div className="bg-card border border-border p-10 text-center">
                    <p className="text-xs tracking-[0.3em] uppercase text-taupe">Order placed</p>
                    <h2 className="font-serif text-3xl text-mauve mt-3 mb-3">A confirmation is on the way.</h2>
                    <p className="text-taupe">Check your email for tracking and a receipt.</p>
                  </div>
                )}
              </div>
              <Summary />
            </div>
          </>
        )}
      </section>
    </PageShell>
  );
};

export default Cart;
