import { Link } from "react-router-dom";

interface Crumb {
  label: string;
  href?: string;
}

export const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav className="container py-6 text-xs tracking-[0.15em] uppercase text-taupe">
    {items.map((c, i) => (
      <span key={i}>
        {c.href ? (
          <Link to={c.href} className="hover:text-mauve transition-colors">
            {c.label}
          </Link>
        ) : (
          <span className="text-mauve">{c.label}</span>
        )}
        {i < items.length - 1 && <span className="mx-3">/</span>}
      </span>
    ))}
  </nav>
);
