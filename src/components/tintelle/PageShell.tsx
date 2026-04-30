import { ReactNode } from "react";
import { useEffect } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageShellProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const PageShell = ({ children, title, description }: PageShellProps) => {
  useEffect(() => {
    if (title) document.title = `${title} — Tintelle`;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
    // Canonical URL per route
    const canonicalHref = `https://www.tintellebeauty.com${window.location.pathname}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalHref);
    // Honor hash anchors (e.g. /about#ingredients) instead of always jumping to top
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      // Wait a tick for the section to render
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo(0, 0);
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
  }, [title, description]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
