import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface Crumb {
  label: string;
  href?: string;
}

const SITE = "https://tintellebeauty.com";

export const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE}${c.href}` } : {}),
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="container py-6 text-xs tracking-[0.15em] uppercase text-taupe">
        <ol className="flex flex-wrap items-center">
          {items.map((c, i) => (
            <li key={i} className="flex items-center">
              {c.href ? (
                <Link to={c.href} className="hover:text-mauve transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-mauve" aria-current="page">{c.label}</span>
              )}
              {i < items.length - 1 && <span className="mx-3" aria-hidden="true">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};
