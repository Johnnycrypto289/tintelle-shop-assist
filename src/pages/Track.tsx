import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageShell } from "@/components/tintelle/PageShell";
import { Button } from "@/components/ui/button";

const STAGES = ["Order placed", "Processing", "Shipped", "Out for delivery", "Delivered"];

interface SampleOrder {
  id: string;
  email: string;
  placedAt: string;
  stage: number;
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  items: { title: string; qty: number; price: number }[];
  shipTo: string;
  timeline: { stage: string; at: string; note?: string }[];
}

const SAMPLE_ORDERS: Record<string, SampleOrder> = {
  "TT-10428": {
    id: "TT-10428",
    email: "you@example.com",
    placedAt: "2026-04-22",
    stage: 3,
    carrier: "USPS Priority",
    trackingNumber: "9400 1112 0288 5421 0033 12",
    estimatedDelivery: "Apr 26 – Apr 28",
    items: [
      { title: "Skin Tint SPF 30 — 04 Honey", qty: 1, price: 38 },
      { title: "Peptide Lip Tint — 02 Rosé", qty: 1, price: 24 },
    ],
    shipTo: "1280 Hayes Street · San Francisco, CA",
    timeline: [
      { stage: "Order placed", at: "Apr 22 · 09:14" },
      { stage: "Processing", at: "Apr 22 · 14:02", note: "Picked & packed" },
      { stage: "Shipped", at: "Apr 23 · 18:30", note: "USPS · San Francisco" },
      { stage: "Out for delivery", at: "Apr 26 · 08:11", note: "On the truck" },
    ],
  },
  "TT-10311": {
    id: "TT-10311",
    email: "you@example.com",
    placedAt: "2026-04-12",
    stage: 4,
    carrier: "USPS Priority",
    trackingNumber: "9400 1112 0288 5198 7732 04",
    estimatedDelivery: "Delivered Apr 16",
    items: [{ title: "The Tintelle Routine", qty: 1, price: 75 }],
    shipTo: "84 Brunswick Square · New York, NY",
    timeline: [
      { stage: "Order placed", at: "Apr 12 · 11:22" },
      { stage: "Processing", at: "Apr 12 · 16:45" },
      { stage: "Shipped", at: "Apr 13 · 19:10" },
      { stage: "Out for delivery", at: "Apr 16 · 07:48" },
      { stage: "Delivered", at: "Apr 16 · 14:32", note: "Left at front desk" },
    ],
  },
};

const inputCls =
  "w-full px-4 py-3 bg-background border border-border focus:border-primary outline-none text-sm rounded-none transition-colors";
const labelCls = "block text-[11px] tracking-[0.2em] uppercase text-taupe mb-2";

const Track = () => {
  const [params, setParams] = useSearchParams();
  const initial = params.get("order") ?? "";
  const [orderId, setOrderId] = useState(initial);
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<SampleOrder | null>(initial ? SAMPLE_ORDERS[initial] ?? null : null);
  const [error, setError] = useState<string | null>(null);

  const lookup = (e: React.FormEvent) => {
    e.preventDefault();
    const found = SAMPLE_ORDERS[orderId.trim().toUpperCase()];
    if (!found) {
      setOrder(null);
      setError("We couldn't find that order. Try TT-10428 or TT-10311.");
      return;
    }
    setOrder(found);
    setError(null);
    setParams({ order: found.id });
  };

  const total = order ? order.items.reduce((s, i) => s + i.price * i.qty, 0) : 0;

  return (
    <PageShell title="Track Order" description="Look up a Tintelle order to see real-time status and tracking.">
      <section className="container pt-14 pb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-taupe">Order tracking</p>
        <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">Where's my order?</h1>
        <p className="text-base md:text-lg text-taupe max-w-xl leading-relaxed mt-4">
          Enter your order ID and email. Try the demo IDs <span className="text-mauve">TT-10428</span> or{" "}
          <span className="text-mauve">TT-10311</span>.
        </p>
      </section>

      <section className="container pb-12">
        <form onSubmit={lookup} className="bg-card border border-border p-6 md:p-8 grid md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
          <div>
            <label className={labelCls}>Order ID</label>
            <input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="TT-10428" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className={inputCls} />
          </div>
          <Button type="submit" size="lg" className="rounded-none h-12 text-xs tracking-[0.18em] uppercase">
            Track order
          </Button>
        </form>
        {error && <p className="text-sm text-destructive mt-4">{error}</p>}
      </section>

      {order && (
        <section className="container pb-24 grid md:grid-cols-[1.6fr_1fr] gap-10">
          <div className="space-y-10">
            <div className="bg-card border border-border p-6 md:p-8">
              <p className="text-xs tracking-[0.18em] uppercase text-taupe">Order {order.id}</p>
              <h2 className="font-serif text-2xl md:text-3xl text-mauve mt-2">{STAGES[order.stage]}</h2>
              <p className="text-sm text-taupe mt-1">{order.estimatedDelivery}</p>

              <div className="mt-7">
                <div className="flex justify-between mb-2 text-[10px] tracking-[0.2em] uppercase text-taupe">
                  {STAGES.map((s, i) => (
                    <span key={s} className={`flex-1 ${i <= order.stage ? "text-mauve" : ""}`}>
                      {s}
                    </span>
                  ))}
                </div>
                <div className="h-1 bg-border relative">
                  <div
                    className="h-1 bg-primary transition-all"
                    style={{ width: `${((order.stage + 1) / STAGES.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-6 md:p-8">
              <h3 className="font-serif text-xl text-mauve mb-5">Activity</h3>
              <ol className="space-y-5">
                {order.timeline.map((t) => (
                  <li key={t.stage} className="grid grid-cols-[24px_1fr_auto] gap-4 items-start">
                    <span className="w-2 h-2 mt-2 rounded-full bg-primary" />
                    <div>
                      <p className="font-serif text-mauve">{t.stage}</p>
                      {t.note && <p className="text-sm text-taupe">{t.note}</p>}
                    </div>
                    <p className="text-sm text-taupe whitespace-nowrap">{t.at}</p>
                  </li>
                ))}
              </ol>
              <div className="border-t border-border mt-7 pt-5 grid sm:grid-cols-2 gap-5 text-sm text-taupe">
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase">Carrier</p>
                  <p className="text-mauve mt-1">{order.carrier}</p>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase">Tracking #</p>
                  <p className="text-mauve mt-1 font-mono text-xs">{order.trackingNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="bg-card border border-border p-6 md:p-7 md:sticky md:top-28 md:self-start">
            <h3 className="font-serif text-xl text-mauve">In your order</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {order.items.map((i) => (
                <li key={i.title} className="flex justify-between gap-3">
                  <span className="text-mauve">{i.title} <span className="text-taupe">× {i.qty}</span></span>
                  <span className="text-mauve">${(i.price * i.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-border mt-4 pt-4 flex justify-between font-serif text-mauve">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="text-xs tracking-[0.18em] uppercase text-taupe mt-6">Ships to</p>
            <p className="text-mauve mt-1 leading-relaxed">{order.shipTo}</p>
          </aside>
        </section>
      )}
    </PageShell>
  );
};

export default Track;
