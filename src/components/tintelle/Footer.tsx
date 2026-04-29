import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type FooterLink = { label: string; href: string };

const cols: { title: string; links: FooterLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Best Sellers", href: "/shop?sort=bestsellers" },
      { label: "The Routine", href: "/#routine" },
      { label: "Subscribe & Save", href: "/subscribe" },
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
  const isExternalRoute = l.href.startsWith("/#") || l.href.startsWith("http");
  if (isExternalRoute) {
    return (
      <a href={l.href} className="hover:text-primary transition-colors">
        {l.label}
      </a>
    );
  }
  return (
    <Link to={l.href} className="hover:text-primary transition-colors">
      {l.label}
    </Link>
  );
};

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
  <footer className="bg-cream pt-16 pb-8 mt-8">
    <div className="container grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
      <div className="space-y-4">
        <p className="font-serif text-2xl font-medium tracking-[0.25em] text-mauve">TINTELLE</p>
        <p className="text-sm text-taupe leading-relaxed max-w-xs">
          Join the Tintelle Community. Get early access to drops, shade guides, and skin-first rituals.
        </p>
        <form onSubmit={handleSubscribe} className="flex gap-2 pt-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            maxLength={255}
            className="rounded-none bg-background border-mauve/30 placeholder:text-taupe/70"
            aria-label="Email address"
          />
          <Button type="submit" disabled={submitting} className="rounded-none px-5 text-xs tracking-[0.18em] uppercase">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
          </Button>
        </form>
      </div>
      {cols.map((col) => (
        <div key={col.title}>
          <h4 className="font-serif text-mauve text-lg mb-4">{col.title}</h4>
          <ul className="space-y-2.5 text-sm text-taupe">
            {col.links.map((l) => (
              <li key={l.label}>{renderLink(l)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="container mt-12 pt-6 border-t border-border/70 flex flex-col md:flex-row justify-between gap-3 text-xs text-taupe">
      <p>© {new Date().getFullYear()} Tintelle. All rights reserved.</p>
      <p>Skincare that shows. Color that cares.</p>
    </div>
  </footer>
  );
};
