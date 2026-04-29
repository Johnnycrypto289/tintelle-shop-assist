import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const cols = [
  { title: "Shop", links: ["All Products", "Best Sellers", "The Routine", "Gift Cards"] },
  { title: "About", links: ["Our Story", "Ingredients", "Sustainability", "Press"] },
  { title: "Support", links: ["Contact", "FAQ", "Shipping", "Returns"] },
];

export const Footer = () => (
  <footer id="journal" className="bg-cream pt-16 pb-8 mt-8">
    <div className="container grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
      <div className="space-y-4">
        <p className="font-serif text-2xl tracking-[0.25em] text-mauve">TINTELLE</p>
        <p className="text-sm text-taupe leading-relaxed max-w-xs">
          Join the Tintelle Community. Get early access to drops, shade guides, and skin-first rituals.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-2 pt-2"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="rounded-none bg-background border-mauve/30 placeholder:text-taupe/70"
          />
          <Button type="submit" className="rounded-none px-5 text-xs tracking-wider uppercase">
            Join
          </Button>
        </form>
      </div>
      {cols.map((col) => (
        <div key={col.title}>
          <h4 className="font-serif text-mauve text-lg mb-4">{col.title}</h4>
          <ul className="space-y-2.5 text-sm text-taupe">
            {col.links.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary transition-colors">
                  {l}
                </a>
              </li>
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
