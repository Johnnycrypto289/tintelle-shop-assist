import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Loader2 } from "lucide-react";
import { AnnouncementBar } from "@/components/tintelle/AnnouncementBar";
import { Header } from "@/components/tintelle/Header";
import { Footer } from "@/components/tintelle/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useProduct } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProduct(handle);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);
  const [variantIndex, setVariantIndex] = useState(0);

  const variants = product?.node.variants.edges ?? [];
  const variant = variants[variantIndex]?.node;

  useEffect(() => {
    if (product) document.title = `${product.node.title} — Tintelle`;
  }, [product]);

  const images = useMemo(() => product?.node.images.edges.map((e) => e.node) ?? [], [product]);

  const handleAdd = async () => {
    if (!product || !variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main className="container py-10 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-taupe hover:text-mauve mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to shop
        </Link>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-mauve" />
          </div>
        ) : !product ? (
          <p className="text-center text-taupe py-20">Product not found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-3">
              <div className="aspect-square bg-cream overflow-hidden">
                {images[0] && (
                  <img
                    src={images[0].url}
                    alt={images[0].altText || product.node.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(0, 4).map((img, i) => (
                    <div key={i} className="aspect-square bg-cream overflow-hidden">
                      <img src={img.url} alt={img.altText || ""} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-taupe">{product.node.productType}</p>
                <h1 className="font-serif text-3xl md:text-5xl text-mauve mt-2">{product.node.title}</h1>
                {variant && (
                  <p className="font-serif text-2xl text-mauve mt-3">
                    {formatPrice(variant.price.amount, variant.price.currencyCode)}
                  </p>
                )}
              </div>

              <p className="text-taupe leading-relaxed">{product.node.description}</p>

              {variants.length > 1 && (
                <div className="space-y-3">
                  <p className="text-xs tracking-[0.2em] uppercase text-taupe">
                    Shade — <span className="text-mauve">{variant?.title}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v, i) => (
                      <button
                        key={v.node.id}
                        onClick={() => setVariantIndex(i)}
                        className={`px-3 py-2 text-xs border transition-colors ${
                          i === variantIndex
                            ? "border-mauve bg-mauve text-background"
                            : "border-border text-mauve hover:border-mauve"
                        }`}
                      >
                        {v.node.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={handleAdd}
                disabled={isAdding || !variant?.availableForSale}
                size="lg"
                className="w-full rounded-none h-12 text-sm tracking-wider uppercase"
              >
                {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Bag"}
              </Button>

              <Accordion type="single" collapsible className="border-t border-border pt-2">
                <AccordionItem value="ingredients" className="border-border">
                  <AccordionTrigger className="text-mauve">Key Ingredients</AccordionTrigger>
                  <AccordionContent className="text-taupe">
                    Hyaluronic acid, peptides, squalane and broad-spectrum mineral filters. Formulated without
                    parabens, sulfates, or silicones.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how" className="border-border">
                  <AccordionTrigger className="text-mauve">How to Use</AccordionTrigger>
                  <AccordionContent className="text-taupe">
                    Apply a small amount to clean skin and blend with fingertips for a sheer, buildable finish.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ship" className="border-border">
                  <AccordionTrigger className="text-mauve">Shipping & Returns</AccordionTrigger>
                  <AccordionContent className="text-taupe">
                    Free shipping on orders over $50. 30-day shade match guarantee — return it if it's not your hue.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
