export type ProdNode = {
  title: string;
  productType?: string;
  tags?: string[];
};

export const resolveSubcategory = (node: ProdNode): string => {
  const title = node.title || "";
  const tags = (node.tags || []).map((t) => t.toLowerCase());
  const has = (t: string) => tags.includes(t);

  if (/foundation/i.test(title) || has("foundation")) return "Foundation";
  if (/bb\s*cream/i.test(title) || has("bb-cream")) return "BB Cream";
  if (/concealer/i.test(title) || has("concealer")) return "Concealer";
  if (/bronzer/i.test(title)) return "Bronzer";
  if (/blush\s*palette/i.test(title)) return "Blush Palette";
  if (/eyeshadow\s*palette/i.test(title)) return "Eyeshadow Palette";
  if (/eyebrow\s*pencil/i.test(title)) return "Hydro Pencil";
  if (/lip\s*gloss/i.test(title)) return "Lip Gloss";
  if (/lip\s*liner/i.test(title)) return "Lip Liner";
  if (/lip\s*tint/i.test(title)) return "Lip Tint";
  // Eyebrow gel/mascara are makeup, not treatment — check before "eye treatment"
  if (/eyebrow\s*gel|eyebrow\s*mascara/i.test(title)) return "Eye Makeup";
  if (/eye\s*cream/i.test(title)) return "Eye Treatment";
  if (/eye\s*treatment/i.test(title)) return "Eye Treatment";
  if (/eye\s*makeup|eyeshadow|mascara|eyeliner|eyebrow/i.test(title)) return "Eye Makeup";
  if (/serum/i.test(title) || has("serum") || has("skincare")) return "Skincare";
  if (/blender|brush|sponge/i.test(title) || has("tools") || has("blender")) return "Tools";

  return node.productType?.trim() || "Other";
};

// Some products belong to more than one subcategory (e.g. an eye cream is both
// Skincare and Eye Treatment). Returns extra category names beyond the primary.
export const resolveExtraSubcategories = (node: ProdNode): string[] => {
  const title = node.title || "";
  const extras: string[] = [];
  if (/eye\s*cream/i.test(title)) extras.push("Skincare");
  return extras;
};
