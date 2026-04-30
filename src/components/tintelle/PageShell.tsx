import { ReactNode } from "react";
import { useEffect } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
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
    window.scrollTo(0, 0);
  }, [title, description]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
