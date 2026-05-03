import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { SocialLinks } from "./SocialLinks";
import { toast } from "sonner";

type FooterLink = { label: string; href: string };

const cols: { title: string; links: FooterLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Best Sellers", href: "/shop?sort=bestsellers" },
      { label: "Journal", href: "/journal" },
      
      { label: "Gift Cards", href: "/shop" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Ingredients", href: "/about#ingredients" },
      { label: "Sustainability", href: "/about#sustainability" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Track Order", href: "/track" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const renderLink = (l: FooterLink) => {
  const isHttp = l.href.startsWith("http");
  const hasHash = l.href.includes("#");

  if (isHttp) {
    return (
      <a href={l.href} className="hover:text-primary transition-colors block py-1" target="_blank" rel="noreferrer">
        {l.label}
      </a>
    );
  }

  // For in-app hash links, use a plain anchor so the browser scrolls to the section
  // (react-router <Link> ignores hash fragments and PageShell forces scrollTo(0,0)).
  if (hasHash) {
    const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const [path, hash] = l.href.split("#");
      if (window.location.pathname === path) {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // else: let the browser navigate; effect below handles scroll on arrival
    };
    return (
      <a href={l.href} onClick={handleHashClick} className="hover:text-primary transition-colors block py-1">
        {l.label}
      </a>
    );
  }

  return (
    <Link to={l.href} className="hover:text-primary transition-colors block py-1">
      {l.label}
    </Link>
  );
};

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [openCol, setOpenCol] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("subscribe-newsletter", {
        body: { email: trimmed, source: "footer" },
      });
      if (error) throw error;
      toast.success("You're in. Check your inbox for a welcome note.");
      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error("Could not subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-cream pt-12 md:pt-16 pb-8 mt-8">
      <div className="container">
        {/* Newsletter (always on top) */}
        <div className="space-y-4 mb-10 md:mb-0 md:grid md:grid-cols-4 md:gap-12 md:space-y-0">
          <div className="space-y-3 md:space-y-4 md:col-span-1">
            <p className="font-serif text-2xl font-medium tracking-[0.25em] text-mauve">TINTELLE</p>
            <p className="text-sm text-taupe leading-relaxed max-w-xs">
              Join the Tintelle Community. Get early access to drops, shade guides, and skin-first rituals.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 pt-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                maxLength={255}
                className="rounded-none bg-background border-mauve/30 placeholder:text-taupe/70 h-12"
                aria-label="Email address"
              />
              <Button
                type="submit"
                disabled={submitting}
                className="rounded-none px-5 h-12 text-xs tracking-[0.18em] uppercase shrink-0"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
              </Button>
            </form>
          </div>

          {/* Mobile: accordion. Desktop: open columns. */}
          {cols.map((col) => {
            const open = openCol === col.title;
            return (
              <div key={col.title} className="border-b border-border/70 md:border-0">
                <button
                  type="button"
                  onClick={() => setOpenCol(open ? null : col.title)}
                  className="md:hidden w-full flex items-center justify-between py-4 font-serif text-mauve text-base"
                  aria-expanded={open}
                >
                  {col.title}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                    strokeWidth={1.5}
                  />
                </button>
                <h4 className="hidden md:block font-serif text-mauve text-lg mb-4">{col.title}</h4>
                <ul
                  className={`text-sm text-taupe space-y-1 md:space-y-2.5 md:block pb-4 md:pb-0 ${
                    open ? "block" : "hidden"
                  }`}
                >
                  {col.links.map((l) => (
                    <li key={l.label}>{renderLink(l)}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container mt-10 md:mt-12 pt-6 border-t border-border/70 flex flex-col md:flex-row justify-between gap-3 text-xs text-taupe">
        <p>© {new Date().getFullYear()} Tintelle Beauty. All rights reserved.</p>
        <p>Skincare that shows. Color that cares.</p>
      </div>
    </footer>
  );
};
