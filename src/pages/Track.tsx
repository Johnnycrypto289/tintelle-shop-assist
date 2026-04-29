import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2, Truck, Package, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/tintelle/PageShell";
import { Button } from "@/components/ui/button";
import { useCustomer } from "@/hooks/useCustomer";
import { formatPrice } from "@/lib/shopify";
import { supabase } from "@/integrations/supabase/client";

const STAGES = ["Order placed", "Processing", "Shipped", "Out for delivery", "Delivered"];

const stageFromFulfillment = (status: string | null | undefined): number => {
  switch ((status ?? "").toUpperCase()) {
    case "DELIVERED":
      return 4;
    case "OUT_FOR_DELIVERY":
      return 3;
    case "IN_TRANSIT":
    case "SHIPPED":
    case "FULFILLED":
    case "PARTIALLY_FULFILLED":
      return 2;
    case "READY_FOR_PICKUP":
    case "PICKED_UP":
      return 2;
    case "ATTEMPTED_DELIVERY":
      return 3;
    case "CONFIRMED":
    case "ON_HOLD":
    case "OPEN":
    case "PENDING":
      return 1;
    default:
      return 0;
  }
};

interface ShopMoney {
  amount: string;
  currencyCode: string;
}

interface GuestOrder {
  name: string;
  processedAt: string;
  financialStatus: string | null;
  fulfillmentStatus: string | null;
  statusUrl: string | null;
  total: ShopMoney | null;
  shippingAddress: {
    firstName: string | null;
    lastName: string | null;
    address1: string | null;
    address2: string | null;
    city: string | null;
    province: string | null;
    country: string | null;
    zip: string | null;
  } | null;
  lineItems: Array<{
    title: string;
    quantity: number;
    price: ShopMoney | null;
    image: { url: string; altText: string | null } | null;
  }>;
  fulfillments: Array<{
    status: string;
    createdAt: string;
    updatedAt: string;
    trackingInfo: Array<{ number: string | null; url: string | null; company: string | null }>;
    events: Array<{ status: string; happenedAt: string; message: string | null }>;
  }>;
}

const inputCls =
  "w-full px-4 py-3 bg-background border border-border focus:border-primary outline-none text-sm rounded-none transition-colors";
const labelCls = "block text-[11px] tracking-[0.2em] uppercase text-taupe mb-2";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const niceLabel = (s: string | null | undefined) => {
  if (!s) return "Pending";
  return s
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const Track = () => {
  const [params, setParams] = useSearchParams();
  const { isSignedIn, customer } = useCustomer();

  const [orderNumber, setOrderNumber] = useState(params.get("order") ?? "");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<GuestOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("lookup-order", {
        body: { orderNumber, email },
      });
      if (fnError) {
        // Edge function returned non-2xx; try to surface its message.
        const message =
          (fnError as any)?.context?.error ??
          (fnError as any)?.message ??
          "We couldn't look up that order.";
        setError(message);
      } else if (data?.order) {
        setOrder(data.order as GuestOrder);
        setParams({ order: orderNumber.replace(/^#/, "") });
      } else if (data?.error) {
        setError(data.error);
      } else {
        setError("We couldn't find that order.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If the URL had ?order=X on first load and we're not signed in,
  // we still need email — leave it for the user to submit.

  const stage = useMemo(() => {
    if (!order) return 0;
    // Use the latest fulfillment event status if available, otherwise the order-level status.
    const lastEvent = order.fulfillments
      .flatMap((f) => f.events)
      .sort((a, b) => new Date(b.happenedAt).getTime() - new Date(a.happenedAt).getTime())[0];
    return stageFromFulfillment(lastEvent?.status ?? order.fulfillmentStatus);
  }, [order]);

  const total = order?.total
    ? formatPrice(order.total.amount, order.total.currencyCode)
    : null;

  const allEvents = useMemo(() => {
    if (!order) return [];
    const events = order.fulfillments
      .flatMap((f) => f.events.map((ev) => ({ ...ev, fulfillmentStatus: f.status })))
      .sort((a, b) => new Date(a.happenedAt).getTime() - new Date(b.happenedAt).getTime());
    // Always show "Order placed"
    return [
      { status: "ORDER_PLACED", happenedAt: order.processedAt, message: null, fulfillmentStatus: "" },
      ...events,
    ];
  }, [order]);

  const tracking = order?.fulfillments
    .flatMap((f) => f.trackingInfo)
    .find((t) => t?.number || t?.url);

  return (
    <PageShell title="Track Order" description="Look up a Tintelle order to see real-time status and tracking.">
      <section className="container pt-14 pb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-taupe">Order tracking</p>
        <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">Where's my order?</h1>
        <p className="text-base md:text-lg text-taupe max-w-xl leading-relaxed mt-4">
          Enter your order number and the email used at checkout. {isSignedIn ? (
            <>
              Or skip the form — your orders are listed in{" "}
              <Link to="/account" className="text-mauve underline-offset-4 hover:underline">your account</Link>.
            </>
          ) : (
            <>
              Have an account?{" "}
              <Link to="/account" className="text-mauve underline-offset-4 hover:underline">Sign in</Link>{" "}
              to see all your orders.
            </>
          )}
        </p>
      </section>

      {/* Signed-in: show recent orders quick list */}
      {isSignedIn && customer && (customer.orders?.edges?.length ?? 0) > 0 && (
        <section className="container pb-8">
          <div className="bg-card border border-border">
            <div className="p-5 border-b border-border flex items-center gap-2">
              <Package className="h-4 w-4 text-mauve" />
              <h2 className="font-serif text-mauve">Your recent orders</h2>
            </div>
            <ul className="divide-y divide-border">
              {customer.orders.edges.slice(0, 5).map(({ node }) => {
                const t = node.successfulFulfillments?.[0]?.trackingInfo?.[0];
                return (
                  <li key={node.id} className="p-5 flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-mauve">Order #{node.orderNumber}</p>
                      <p className="text-xs text-taupe mt-0.5">
                        {new Date(node.processedAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        {" · "}
                        {niceLabel(node.fulfillmentStatus)}
                      </p>
                    </div>
                    <p className="font-serif text-mauve">
                      {formatPrice(node.totalPrice.amount, node.totalPrice.currencyCode)}
                    </p>
                    {t?.url && (
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs tracking-[0.18em] uppercase text-primary inline-flex items-center gap-1"
                      >
                        <Truck className="h-3.5 w-3.5" />
                        Track
                      </a>
                    )}
                    {node.statusUrl && (
                      <a
                        href={node.statusUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs tracking-[0.18em] uppercase text-mauve underline-offset-4 hover:underline inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <section className="container pb-12">
        <form
          onSubmit={lookup}
          className="bg-card border border-border p-6 md:p-8 grid md:grid-cols-[1fr_1fr_auto] gap-4 items-end"
        >
          <div>
            <label className={labelCls}>Order number</label>
            <input
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="#1001"
              required
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className={inputCls}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="rounded-none h-12 text-xs tracking-[0.18em] uppercase"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Track order"}
          </Button>
        </form>
        {error && <p className="text-sm text-destructive mt-4">{error}</p>}
      </section>

      {order && (
        <section className="container pb-24 grid md:grid-cols-[1.6fr_1fr] gap-10">
          <div className="space-y-10">
            <div className="bg-card border border-border p-6 md:p-8">
              <p className="text-xs tracking-[0.18em] uppercase text-taupe">Order {order.name}</p>
              <h2 className="font-serif text-2xl md:text-3xl text-mauve mt-2">
                {STAGES[stage]}
              </h2>
              <p className="text-sm text-taupe mt-1">
                Placed {new Date(order.processedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              <div className="mt-7">
                <div className="flex justify-between mb-2 text-[10px] tracking-[0.2em] uppercase text-taupe gap-2">
                  {STAGES.map((s, i) => (
                    <span key={s} className={`flex-1 ${i <= stage ? "text-mauve" : ""}`}>
                      {s}
                    </span>
                  ))}
                </div>
                <div className="h-1 bg-border relative">
                  <div
                    className="h-1 bg-primary transition-all"
                    style={{ width: `${((stage + 1) / STAGES.length) * 100}%` }}
                  />
                </div>
              </div>

              {order.statusUrl && (
                <a
                  href={order.statusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1 text-xs tracking-[0.18em] uppercase text-primary"
                >
                  Open Shopify status page <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            <div className="bg-card border border-border p-6 md:p-8">
              <h3 className="font-serif text-xl text-mauve mb-5">Activity</h3>
              {allEvents.length === 0 ? (
                <p className="text-sm text-taupe">No activity yet.</p>
              ) : (
                <ol className="space-y-5">
                  {allEvents.map((ev, idx) => (
                    <li key={`${ev.status}-${idx}`} className="grid grid-cols-[24px_1fr_auto] gap-4 items-start">
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary" />
                      <div>
                        <p className="font-serif text-mauve">{niceLabel(ev.status)}</p>
                        {ev.message && <p className="text-sm text-taupe">{ev.message}</p>}
                      </div>
                      <p className="text-sm text-taupe whitespace-nowrap">{formatDate(ev.happenedAt)}</p>
                    </li>
                  ))}
                </ol>
              )}

              {tracking && (tracking.number || tracking.url) && (
                <div className="border-t border-border mt-7 pt-5 grid sm:grid-cols-2 gap-5 text-sm text-taupe">
                  {tracking.company && (
                    <div>
                      <p className="text-[11px] tracking-[0.2em] uppercase">Carrier</p>
                      <p className="text-mauve mt-1">{tracking.company}</p>
                    </div>
                  )}
                  {tracking.number && (
                    <div>
                      <p className="text-[11px] tracking-[0.2em] uppercase">Tracking #</p>
                      <p className="text-mauve mt-1 font-mono text-xs">{tracking.number}</p>
                    </div>
                  )}
                  {tracking.url && (
                    <a
                      href={tracking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm:col-span-2 inline-flex items-center gap-1 text-xs tracking-[0.18em] uppercase text-primary"
                    >
                      <Truck className="h-3.5 w-3.5" />
                      Track on carrier site <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <aside className="bg-card border border-border p-6 md:p-7 md:sticky md:top-28 md:self-start">
            <h3 className="font-serif text-xl text-mauve">In your order</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {order.lineItems.map((i, idx) => (
                <li key={`${i.title}-${idx}`} className="flex justify-between gap-3">
                  <span className="text-mauve">
                    {i.title} <span className="text-taupe">× {i.quantity}</span>
                  </span>
                  {i.price && (
                    <span className="text-mauve">
                      {formatPrice(
                        (parseFloat(i.price.amount) * i.quantity).toString(),
                        i.price.currencyCode
                      )}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {total && (
              <div className="border-t border-border mt-4 pt-4 flex justify-between font-serif text-mauve">
                <span>Total</span>
                <span>{total}</span>
              </div>
            )}
            {order.shippingAddress && (
              <>
                <p className="text-xs tracking-[0.18em] uppercase text-taupe mt-6">Ships to</p>
                <address className="not-italic text-mauve mt-1 leading-relaxed text-sm">
                  {[order.shippingAddress.firstName, order.shippingAddress.lastName]
                    .filter(Boolean)
                    .join(" ")}
                  <br />
                  {order.shippingAddress.address1}
                  {order.shippingAddress.address2 ? `, ${order.shippingAddress.address2}` : ""}
                  <br />
                  {[
                    order.shippingAddress.city,
                    order.shippingAddress.province,
                    order.shippingAddress.zip,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                  <br />
                  {order.shippingAddress.country}
                </address>
              </>
            )}
          </aside>
        </section>
      )}
    </PageShell>
  );
};

export default Track;
