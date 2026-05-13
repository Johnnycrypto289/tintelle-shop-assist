import { Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";

interface Props {
  product: ShopifyProduct;
  className?: string;
  label?: string;
}

/** Compact "Add to Bag" pill used inside editorial magazine tiles. */
export const AddToBagPill = ({ product, className = "", label = "Add to Bag" }: Props) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const variant = product.node.variants.edges[0]?.node;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
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
    <button
      type="button"
      onClick={handleAdd}
      disabled={isLoading || !variant}
      className={`inline-flex items-center justify-center gap-2 text-[10px] md:text-[11px] tracking-[0.22em] uppercase border border-mauve text-mauve px-3.5 md:px-4 py-2 md:py-2.5 rounded-full bg-background/85 backdrop-blur-sm hover:bg-mauve hover:text-background transition-colors disabled:opacity-50 ${className}`}
    >
      {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : label}
    </button>
  );
};
