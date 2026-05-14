// Curated mix of bestsellers spanning the catalog. Title-matched so
// the same list powers both the home "Loved by You → Best Sellers"
// tab and the /shop "Best Sellers" filter. Order is preserved.
//
// To show a product as sold out, set its inventory to 0 in Shopify —
// the storefront API returns availableForSale on variants, and
// ProductCard renders the sold-out state automatically.
export const BESTSELLER_TITLES: string[] = [
  "Foundation - Porcelain",
  "BB Cream - Pearly",
  "Lip Gloss - Mahogany",
  "Lip Gloss - Brick",
  "Lip Liner - Raspberry",
  "Automatic Lip Liner - Scarlet",
  "Blush Palette - Kissable",
  "Liquid Blush - Cuties",
  "Highlighter Stick - Pink Lights",
  "Bronzer - Tawny",
  "Age Defying Serum",
  "Anti-aging Rose Gold Oil",
];

export const isBestsellerTitle = (title: string) =>
  BESTSELLER_TITLES.some((t) => t.toLowerCase() === title.toLowerCase());
