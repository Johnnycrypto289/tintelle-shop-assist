import { useProduct } from "@/hooks/useProducts";

interface JournalHeroImageProps {
  handle: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}

/**
 * Renders a product's primary image (from Shopify) as a journal hero.
 * Shows a soft cream placeholder while loading or if the product is missing.
 */
export const JournalHeroImage = ({ handle, alt, className, loading = "lazy" }: JournalHeroImageProps) => {
  const { data: product } = useProduct(handle);
  const url = product?.node.images.edges[0]?.node.url;

  if (!url) {
    return <div className={`bg-cream ${className ?? ""}`} aria-hidden />;
  }

  return (
    <img
      src={url}
      alt={alt}
      loading={loading}
      className={className}
    />
  );
};
