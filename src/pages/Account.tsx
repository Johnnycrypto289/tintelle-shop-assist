import { useState } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/tintelle/PageShell";
import { Button } from "@/components/ui/button";

type Tab = "signin" | "signup" | "dashboard";

const inputCls =
  "w-full px-4 py-3 bg-background border border-border focus:border-primary outline-none text-sm rounded-none transition-colors";
const labelCls = "block text-[11px] tracking-[0.2em] uppercase text-taupe mb-2";

const Account = () => {
  const [tab, setTab] = useState<Tab>("signin");

  // NOTE: This is the UI shell for Tintelle account. Wire to Shopify Customer Accounts
  // when ready. For now, "Sign in" submit just toggles to the dashboard preview.

  const Header = () => (
    <section className="container pt-14 pb-8">
      <p className="text-xs tracking-[0.3em] uppercase text-taupe">Account</p>
      <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">
        {tab === "dashboard" ? "Welcome back." : "Your Tintelle account."}
      </h1>
    </section>
  );

  const Tabs = () => (
    <div className="container border-b border-border flex gap-6">
      {([
        ["signin", "Sign in"],
        ["signup", "Create account"],
        ["dashboard", "Dashboard"],
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
  );

  return (
    <PageShell title="Account" description="Sign in to manage your orders, subscription, and wishlist.">
      <Header />
      <Tabs />

      <section className="container py-12 pb-24">
        {tab === "signin" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setTab("dashboard");
            }}
            className="max-w-md mx-auto bg-card border border-border p-7 md:p-8 space-y-5"
          >
            <h2 className="font-serif text-xl text-mauve">Sign in</h2>
            <div><label className={labelCls}>Email</label><input type="email" required className={inputCls} /></div>
            <div><label className={labelCls}>Password</label><input type="password" required className={inputCls} /></div>
            <Button type="submit" size="lg" className="w-full rounded-none h-12 text-xs tracking-[0.18em] uppercase">
              Sign in
            </Button>
            <p className="text-xs text-center text-taupe">
              No account?{" "}
              <button type="button" onClick={() => setTab("signup")} className="text-mauve underline-offset-4 hover:underline">
                Create one
              </button>
            </p>
            <p className="text-[11px] tracking-[0.18em] uppercase text-taupe text-center pt-2 border-t border-border">
              Sign in is wired to Shopify Customer Accounts at launch.
            </p>
          </form>
        )}

        {tab === "signup" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setTab("dashboard");
            }}
            className="max-w-md mx-auto bg-card border border-border p-7 md:p-8 space-y-5"
          >
            <h2 className="font-serif text-xl text-mauve">Create your account</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelCls}>First name</label><input required className={inputCls} /></div>
              <div><label className={labelCls}>Last name</label><input required className={inputCls} /></div>
            </div>
            <div><label className={labelCls}>Email</label><input type="email" required className={inputCls} /></div>
            <div><label className={labelCls}>Password</label><input type="password" required minLength={8} className={inputCls} /></div>
            <Button type="submit" size="lg" className="w-full rounded-none h-12 text-xs tracking-[0.18em] uppercase">
              Create account
            </Button>
          </form>
        )}

        {tab === "dashboard" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border p-6">
              <p className="text-xs tracking-[0.18em] uppercase text-taupe">Recent orders</p>
              <p className="font-serif text-mauve mt-2">No orders yet.</p>
              <Link to="/shop" className="text-sm text-primary mt-3 inline-block">Shop the collection →</Link>
            </div>
            <div className="bg-card border border-border p-6">
              <p className="text-xs tracking-[0.18em] uppercase text-taupe">Subscriptions</p>
              <p className="font-serif text-mauve mt-2">No active subscriptions.</p>
              <Link to="/subscribe" className="text-sm text-primary mt-3 inline-block">Set one up →</Link>
            </div>
            <div className="bg-card border border-border p-6">
              <p className="text-xs tracking-[0.18em] uppercase text-taupe">Wishlist</p>
              <p className="font-serif text-mauve mt-2">Your saved items live here.</p>
              <Link to="/wishlist" className="text-sm text-primary mt-3 inline-block">Open wishlist →</Link>
            </div>
            <div className="md:col-span-3 bg-card border border-border p-6">
              <p className="text-xs tracking-[0.18em] uppercase text-taupe">Saved addresses</p>
              <p className="font-serif text-mauve mt-2">No addresses saved.</p>
              <p className="text-sm text-taupe mt-2">Address management activates with Shopify Customer Accounts.</p>
            </div>
          </div>
        )}
      </section>
    </PageShell>
  );
};

export default Account;
