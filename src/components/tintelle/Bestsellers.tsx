import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";

export const Bestsellers = () => {
  const { data: products, isLoading } = useProducts("tag:bestseller", 6);

  return (
    <section id="bestsellers" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-taupe">Bestsellers</p>
          <h2 className="font-serif text-3xl md:text-4xl text-mauve mt-3">The Essentials</h2>
          <p className="text-taupe mt-3">The trio our community can't put down.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-mauve" />
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.slice(0, 3).map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-taupe py-12">No products found.</p>
        )}
      </div>
    </section>
  );
};
