import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, LogOut, Package, Truck } from "lucide-react";
import { PageShell } from "@/components/tintelle/PageShell";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { useCustomer } from "@/hooks/useCustomer";
import { formatPrice } from "@/lib/shopify";
import { toast } from "sonner";

type Tab = "signin" | "signup" | "forgot";

const inputCls =
  "w-full px-4 py-3 bg-background border border-border focus:border-primary outline-none text-sm rounded-none transition-colors";
const labelCls = "block text-[11px] tracking-[0.2em] uppercase text-taupe mb-2";

const statusLabel = (s: string | null) => {
  if (!s) return "Pending";
  return s
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const Account = () => {
  const { isSignedIn, customer, isHydrating } = useCustomer();
  const isLoading = useAuthStore((s) => s.isLoading);
  const signIn = useAuthStore((s) => s.signIn);
  const signUp = useAuthStore((s) => s.signUp);
  const signOut = useAuthStore((s) => s.signOut);
  const recover = useAuthStore((s) => s.recoverPassword);
  const refreshCustomer = useAuthStore((s) => s.refreshCustomer);

  const [tab, setTab] = useState<Tab>("signin");

  // Sign-in fields
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");

  // Sign-up fields
  const [suFirst, setSuFirst] = useState("");
  const [suLast, setSuLast] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suMarketing, setSuMarketing] = useState(true);

  // Forgot
  const [fpEmail, setFpEmail] = useState("");

  useEffect(() => {
    if (isSignedIn) refreshCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn(siEmail, siPassword);
    if (res.ok) {
      toast.success("Welcome back.");
      setSiPassword("");
    } else {
      toast.error(res.error ?? "Could not sign in.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signUp({
      firstName: suFirst,
      lastName: suLast,
      email: suEmail,
      password: suPassword,
      acceptsMarketing: suMarketing,
    });
    if (res.ok) {
      toast.success("Account created. You're signed in.");
      setSuPassword("");
    } else {
      toast.error(res.error ?? "Could not create account.");
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await recover(fpEmail);
    if (res.ok) {
      toast.success("If that email exists, a reset link is on the way.");
      setFpEmail("");
      setTab("signin");
    } else {
      toast.error(res.error ?? "Could not send reset email.");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out.");
    setTab("signin");
  };

  // ======= Dashboard =======
  if (isSignedIn && customer) {
    const orders = customer.orders?.edges ?? [];
    const addr = customer.defaultAddress;

    return (
      <PageShell title="Account" description="Your Tintelle dashboard.">
        <section className="container pt-14 pb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-taupe">Account</p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">
              Welcome{customer.firstName ? `, ${customer.firstName}` : " back"}.
            </h1>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="rounded-none h-11 text-xs tracking-[0.18em] uppercase"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
          {customer.email && (
            <p className="text-sm text-taupe mt-2">{customer.email}</p>
          )}
        </section>

        <section className="container pb-24 space-y-10">
          {/* Top tiles */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border p-6">
              <p className="text-xs tracking-[0.18em] uppercase text-taupe">Orders</p>
              <p className="font-serif text-mauve mt-2">
                {orders.length === 0 ? "No orders yet." : `${orders.length} order${orders.length === 1 ? "" : "s"}.`}
              </p>
              <Link to="/track" className="text-sm text-primary mt-3 inline-block">
                Track an order →
              </Link>
            </div>
            <div className="bg-card border border-border p-6">
              <p className="text-xs tracking-[0.18em] uppercase text-taupe">Wishlist</p>
              <p className="font-serif text-mauve mt-2">Your saved items live here.</p>
              <Link to="/wishlist" className="text-sm text-primary mt-3 inline-block">
                Open wishlist →
              </Link>
            </div>
            <div className="bg-card border border-border p-6">
              <p className="text-xs tracking-[0.18em] uppercase text-taupe">Wishlist</p>
              <p className="font-serif text-mauve mt-2">Your saved items live here.</p>
              <Link to="/wishlist" className="text-sm text-primary mt-3 inline-block">
                Open wishlist →
              </Link>
            </div>
          </div>

          {/* Orders list */}
          <div className="bg-card border border-border">
            <div className="p-6 border-b border-border flex items-center gap-2">
              <Package className="h-4 w-4 text-mauve" />
              <h2 className="font-serif text-mauve text-lg">Recent orders</h2>
            </div>
            {isHydrating && orders.length === 0 ? (
              <div className="p-10 flex justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-taupe" />
              </div>
            ) : orders.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm text-taupe">You haven't placed any orders yet.</p>
                <Link to="/shop" className="text-sm text-primary mt-3 inline-block">
                  Shop the collection →
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {orders.map(({ node: order }) => {
                  const tracking = order.successfulFulfillments?.[0]?.trackingInfo?.[0];
                  return (
                    <li key={order.id} className="p-6 flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="font-serif text-mauve">Order #{order.orderNumber}</p>
                          <span className="text-[10px] tracking-[0.18em] uppercase px-2 py-1 bg-secondary/40 text-mauve">
                            {statusLabel(order.fulfillmentStatus)}
                          </span>
                        </div>
                        <p className="text-xs text-taupe mt-1">
                          {new Date(order.processedAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                          {" · "}
                          {order.lineItems.edges.length} item
                          {order.lineItems.edges.length === 1 ? "" : "s"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-serif text-mauve">
                          {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
                        </p>
                        {tracking?.url && (
                          <a
                            href={tracking.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs tracking-[0.18em] uppercase text-primary inline-flex items-center gap-1"
                          >
                            <Truck className="h-3.5 w-3.5" />
                            Track
                          </a>
                        )}
                        {order.statusUrl && (
                          <a
                            href={order.statusUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs tracking-[0.18em] uppercase text-mauve underline-offset-4 hover:underline"
                          >
                            View
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Default address */}
          <div className="bg-card border border-border p-6">
            <p className="text-xs tracking-[0.18em] uppercase text-taupe">Default address</p>
            {addr ? (
              <address className="not-italic text-sm text-mauve mt-3 leading-relaxed">
                {[addr.firstName, addr.lastName].filter(Boolean).join(" ")}
                <br />
                {addr.address1}
                {addr.address2 ? `, ${addr.address2}` : ""}
                <br />
                {[addr.city, addr.province, addr.zip].filter(Boolean).join(", ")}
                <br />
                {addr.country}
              </address>
            ) : (
              <p className="font-serif text-mauve mt-2">No address saved.</p>
            )}
          </div>
        </section>
      </PageShell>
    );
  }

  // ======= Auth forms =======
  return (
    <PageShell title="Account" description="Sign in to manage your orders, subscription, and wishlist.">
      <section className="container pt-14 pb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-taupe">Account</p>
        <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">
          Your Tintelle account.
        </h1>
      </section>

      <div className="container border-b border-border flex gap-6">
        {([
          ["signin", "Sign in"],
          ["signup", "Create account"],
          ["forgot", "Reset password"],
        ] as [Tab, string][]).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`text-xs tracking-[0.18em] uppercase pb-3 border-b transition-colors ${
              tab === id ? "text-mauve border-mauve" : "text-taupe border-transparent hover:text-mauve"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="container py-12 pb-24">
        {tab === "signin" && (
          <form onSubmit={handleSignIn} className="max-w-md mx-auto bg-card border border-border p-7 md:p-8 space-y-5">
            <h2 className="font-serif text-xl text-mauve">Sign in</h2>
            <div>
              <label className={labelCls}>Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={siEmail}
                onChange={(e) => setSiEmail(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Password</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={siPassword}
                onChange={(e) => setSiPassword(e.target.value)}
                className={inputCls}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full rounded-none h-12 text-xs tracking-[0.18em] uppercase"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
            </Button>
            <div className="flex justify-between text-xs text-taupe">
              <button
                type="button"
                onClick={() => setTab("signup")}
                className="text-mauve underline-offset-4 hover:underline"
              >
                Create account
              </button>
              <button
                type="button"
                onClick={() => setTab("forgot")}
                className="text-mauve underline-offset-4 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </form>
        )}

        {tab === "signup" && (
          <form onSubmit={handleSignUp} className="max-w-md mx-auto bg-card border border-border p-7 md:p-8 space-y-5">
            <h2 className="font-serif text-xl text-mauve">Create your account</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>First name</label>
                <input
                  required
                  autoComplete="given-name"
                  value={suFirst}
                  onChange={(e) => setSuFirst(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Last name</label>
                <input
                  required
                  autoComplete="family-name"
                  value={suLast}
                  onChange={(e) => setSuLast(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={suEmail}
                onChange={(e) => setSuEmail(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Password</label>
              <input
                type="password"
                required
                minLength={5}
                autoComplete="new-password"
                value={suPassword}
                onChange={(e) => setSuPassword(e.target.value)}
                className={inputCls}
              />
              <p className="text-[11px] text-taupe mt-1.5">Minimum 5 characters.</p>
            </div>
            <label className="flex items-start gap-2 text-xs text-taupe">
              <input
                type="checkbox"
                checked={suMarketing}
                onChange={(e) => setSuMarketing(e.target.checked)}
                className="mt-0.5"
              />
              <span>Email me about new launches and rituals.</span>
            </label>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full rounded-none h-12 text-xs tracking-[0.18em] uppercase"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
            </Button>
            <p className="text-xs text-center text-taupe">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setTab("signin")}
                className="text-mauve underline-offset-4 hover:underline"
              >
                Sign in
              </button>
            </p>
          </form>
        )}

        {tab === "forgot" && (
          <form onSubmit={handleForgot} className="max-w-md mx-auto bg-card border border-border p-7 md:p-8 space-y-5">
            <h2 className="font-serif text-xl text-mauve">Reset password</h2>
            <p className="text-sm text-taupe">
              Enter your email and we'll send a reset link from Shopify.
            </p>
            <div>
              <label className={labelCls}>Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={fpEmail}
                onChange={(e) => setFpEmail(e.target.value)}
                className={inputCls}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full rounded-none h-12 text-xs tracking-[0.18em] uppercase"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send reset link"}
            </Button>
            <p className="text-xs text-center text-taupe">
              <button
                type="button"
                onClick={() => setTab("signin")}
                className="text-mauve underline-offset-4 hover:underline"
              >
                Back to sign in
              </button>
            </p>
          </form>
        )}
      </section>
    </PageShell>
  );
};

export default Account;
