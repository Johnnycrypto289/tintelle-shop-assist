import { useEffect, useState } from "react";
import { ExternalLink, Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

export const CartDrawer = () => {
  const [open, setOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode || "USD";

  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Cart"
          className="relative p-2 hover:text-primary transition-colors"
        >
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-background p-4 sm:p-6">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl sm:text-2xl text-mauve">Your Bag</SheetTitle>
          <SheetDescription className="text-taupe text-sm">
            {totalItems === 0 ? "Your bag is empty" : `${totalItems} item${totalItems === 1 ? "" : "s"}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 text-taupe">
              <ShoppingBag className="h-10 w-10" strokeWidth={1.5} />
              <p>Your bag is empty.</p>
              <Button onClick={() => setOpen(false)} variant="outline" className="rounded-none mt-2">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0 space-y-4">
                {items.map((item) => {
                  const img = item.product.node.images.edges[0]?.node;
                  return (
                    <div key={item.variantId} className="flex gap-4 py-3 border-b border-border">
                      <div className="w-20 h-20 bg-cream overflow-hidden flex-shrink-0">
                        {img && <img src={img.url} alt={item.product.node.title} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-serif text-mauve">{item.product.node.title}</h4>
                        <p className="text-xs text-taupe">{item.selectedOptions.map((o) => o.value).join(" · ")}</p>
                        <p className="text-sm text-mauve">{formatPrice(item.price.amount, item.price.currencyCode)}</p>
                        <div className="flex items-center gap-2 pt-2">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="h-9 w-9 border border-border flex items-center justify-center hover:border-mauve"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="h-9 w-9 border border-border flex items-center justify-center hover:border-mauve"
                            aria-label="Increase"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="ml-auto h-9 w-9 flex items-center justify-center text-taupe hover:text-destructive"
                            aria-label="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex-shrink-0 pt-4 border-t border-border space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm tracking-wider uppercase text-taupe">Subtotal</span>
                  <span className="font-serif text-xl text-mauve">{formatPrice(totalPrice, currency)}</span>
                </div>
                <p className="text-xs text-taupe">Shipping and taxes calculated at checkout.</p>
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading || isSyncing}
                  size="lg"
                  className="w-full rounded-none text-sm tracking-wider uppercase h-12"
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4 mr-2" /> Checkout
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
