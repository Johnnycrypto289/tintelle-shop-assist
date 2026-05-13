export type ProdNode = {
  title: string;
  productType?: string;
  tags?: string[];
};

export const resolveSubcategory = (node: ProdNode): string => {
  const title = node.title || "";
  const tags = (node.tags || []).map((t) => t.toLowerCase());
  const has = (t: string) => tags.includes(t);

  // --- Lips ---
  if (/lip\s*gloss/i.test(title)) return "Lip Gloss";
  if (/lip\s*liner|automatic\s*lip\s*liner/i.test(title)) return "Lip Liner";
  if (/lip\s*tint/i.test(title)) return "Lip Tint";
  if (/luxury\s*cream\s*lipstick|lip\s*stick|lipstick/i.test(title) || has("lipstick"))
    return "Lipstick";
  if (/lip\s*&\s*eye\s*primer|eye\s*&\s*lip\s*primer/i.test(title)) return "Primer";

  // --- Face complexion ---
  if (/foundation\s*primer|primer/i.test(title)) return "Primer";
  if (/foundation/i.test(title) || has("foundation")) return "Foundation";
  if (/bb\s*cream/i.test(title) || has("bb-cream")) return "BB Cream";
  if (/concealer/i.test(title) || has("concealer")) return "Concealer";
  if (/highlighter/i.test(title)) return "Highlighter";
  if (/bronzer/i.test(title)) return "Bronzer";
  if (/blush\s*palette/i.test(title)) return "Blush Palette";
  if (/liquid\s*blush/i.test(title) || has("liquid-blush") || has("liquid blush"))
    return "Liquid Blush";

  // --- Eyes ---
  if (/eyeshadow\s*palette/i.test(title)) return "Eyeshadow Palette";
  if (/eyebrow\s*pencil/i.test(title)) return "Hydro Pencil";
  if (/brow\s*pomade|brow\s*soap|eyebrow\s*gel|eyebrow\s*mascara/i.test(title))
    return "Eye Makeup";
  if (/eye\s*cream/i.test(title)) return "Eye Treatment";
  if (/eye\s*treatment/i.test(title)) return "Eye Treatment";
  if (/eye\s*makeup|eyeshadow|mascara|eyeliner|eyebrow/i.test(title)) return "Eye Makeup";

  // --- Skincare ---
  if (/moisturizer|moisturiser|collagen\s*moisturizer/i.test(title)) return "Moisturizer";
  if (/serum/i.test(title) || has("serum")) return "Serum";
  if (/rose\s*gold\s*oil|face\s*oil|anti[- ]aging.*oil/i.test(title)) return "Skincare";
  if (has("skincare")) return "Skincare";

  // --- Tools ---
  if (/blender|brush|sponge|fan\s*brush/i.test(title) || has("tools") || has("blender"))
    return "Tools";

  return node.productType?.trim() || "Other";
};

// Some products belong to more than one subcategory (e.g. an eye cream is both
// Skincare and Eye Treatment). Returns extra category names beyond the primary.
export const resolveExtraSubcategories = (node: ProdNode): string[] => {
  const title = node.title || "";
  const extras: string[] = [];
  if (/eye\s*cream/i.test(title)) extras.push("Skincare");
  if (/serum|moisturizer|moisturiser|rose\s*gold\s*oil|face\s*oil/i.test(title))
    extras.push("Skincare");
  return extras;
};
