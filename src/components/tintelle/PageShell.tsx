import { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageShellProps {
  children: ReactNode;
  title?: string;
  description?: string;
  ogType?: "website" | "article" | "product";
  /** Optional override; defaults to current pathname under tintellebeauty.com */
  canonicalPath?: string;
  /** Optional og:image url override */
  ogImage?: string;
}

const SITE = "https://tintellebeauty.com";
const SUFFIX = " — Tintelle";

export const PageShell = ({
  children,
  title,
  description,
  ogType = "website",
  canonicalPath,
  ogImage,
}: PageShellProps) => {
  const path = canonicalPath ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const url = `${SITE}${path}`;
  const fullTitle = title
    ? title.length + SUFFIX.length > 60
      ? title
      : `${title}${SUFFIX}`
    : undefined;

  // Honor hash anchors (e.g. /about#ingredients) instead of always jumping to top
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo(0, 0);
      }, 50);
    } else {
      window.scrollTo(0, 0);
    }
  }, [path]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        {fullTitle && <title>{fullTitle}</title>}
        {description && <meta name="description" content={description} />}
        <link rel="canonical" href={url} />
        {fullTitle && <meta property="og:title" content={fullTitle} />}
        {fullTitle && <meta name="twitter:title" content={fullTitle} />}
        {description && <meta property="og:description" content={description} />}
        {description && <meta name="twitter:description" content={description} />}
        <meta property="og:url" content={url} />
        <meta property="og:type" content={ogType} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Helmet>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
