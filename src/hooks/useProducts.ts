import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";

export function useProducts(query?: string, first = 24) {
  return useQuery({
    queryKey: ["products", query, first],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query: query ?? null });
      return (data?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });
}

export function useProduct(handle: string | undefined) {
  return useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      if (!handle) return null;
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      const product = data?.data?.productByHandle;
      if (!product) return null;
      return { node: product } as ShopifyProduct;
    },
    enabled: !!handle,
  });
}
