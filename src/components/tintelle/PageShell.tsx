import { ReactNode } from "react";
import { useEffect } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageShellProps {
  children: ReactNode;
  title?: string;
  description?: string;
  ogType?: "website" | "article" | "product";
}

const SITE = "https://tintellebeauty.com";

const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export const PageShell = ({ children, title, description, ogType = "website" }: PageShellProps) => {
  useEffect(() => {
    // Keep titles ≤60 chars: skip the " — Tintelle" suffix when the base title is already long.
    const SUFFIX = " — Tintelle";
    const fullTitle = title
      ? title.length + SUFFIX.length > 60
        ? title
        : `${title}${SUFFIX}`
      : document.title;
    if (title) document.title = fullTitle;
    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
    }

    const url = `${SITE}${window.location.pathname}`;

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Per-route Open Graph + Twitter
    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    if (description) {
      setMeta('meta[property="og:description"]', "property", "og:description", description);
      setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    }
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:type"]', "property", "og:type", ogType);

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
  }, [title, description, ogType]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
