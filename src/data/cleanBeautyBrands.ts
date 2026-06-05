// Comparison data for the /clean-beauty-brands pillar page.
// Honest, factual one-liners — no marketing fluff. Update sparingly.

export interface CleanBeautyBrand {
  name: string;
  founded: number;
  focus: string;
  signature: string;
  cleanStandard: string;
  priceTier: "$" | "$$" | "$$$";
  vegan: "Yes" | "Mostly" | "Partial" | "No";
  crueltyFree: boolean;
  whereToBuy: string;
  isTintelle?: boolean;
}

export const CLEAN_BEAUTY_BRANDS: CleanBeautyBrand[] = [
  {
    name: "Tintelle",
    founded: 2024,
    focus: "Skincare-makeup hybrids",
    signature: "Tinted Lip Treatment",
    cleanStandard: "EWG-aligned, vegan, dermatologist-tested",
    priceTier: "$$",
    vegan: "Yes",
    crueltyFree: true,
    whereToBuy: "tintellebeauty.com",
    isTintelle: true,
  },
  {
    name: "Ilia",
    founded: 2011,
    focus: "Skin-tint complexion + color",
    signature: "Super Serum Skin Tint",
    cleanStandard: "Credo Clean, vegan options, reef-safe",
    priceTier: "$$",
    vegan: "Mostly",
    crueltyFree: true,
    whereToBuy: "Sephora, Credo, DTC",
  },
  {
    name: "Merit",
    founded: 2021,
    focus: "Minimalist multipurpose color",
    signature: "Flush Balm",
    cleanStandard: "EU-compliant restricted list, vegan",
    priceTier: "$$",
    vegan: "Yes",
    crueltyFree: true,
    whereToBuy: "Sephora, DTC",
  },
  {
    name: "RMS Beauty",
    founded: 2009,
    focus: "Raw, food-grade ingredients",
    signature: "Un Cover-Up",
    cleanStandard: "Organic-first, EWG-verified items",
    priceTier: "$$",
    vegan: "Partial",
    crueltyFree: true,
    whereToBuy: "Credo, Detox Market, DTC",
  },
  {
    name: "Tower 28",
    founded: 2019,
    focus: "Sensitive-skin-safe color",
    signature: "ShineOn Lip Jelly",
    cleanStandard: "NEA-accepted, fragrance-free options",
    priceTier: "$",
    vegan: "Yes",
    crueltyFree: true,
    whereToBuy: "Sephora, DTC",
  },
  {
    name: "Saie",
    founded: 2019,
    focus: "Everyday clean essentials",
    signature: "Glowy Super Gel",
    cleanStandard: "Sephora Clean+Planet Positive, vegan",
    priceTier: "$$",
    vegan: "Yes",
    crueltyFree: true,
    whereToBuy: "Sephora, DTC",
  },
  {
    name: "Kosas",
    founded: 2015,
    focus: "Skincare-infused makeup",
    signature: "Revealer Concealer",
    cleanStandard: "Sephora Clean, EU-compliant",
    priceTier: "$$",
    vegan: "Mostly",
    crueltyFree: true,
    whereToBuy: "Sephora, DTC",
  },
  {
    name: "Ami Colé",
    founded: 2021,
    focus: "Melanin-rich complexion",
    signature: "Skin-Enhancing Tint",
    cleanStandard: "EWG-aligned, vegan",
    priceTier: "$$",
    vegan: "Yes",
    crueltyFree: true,
    whereToBuy: "Sephora, DTC",
  },
  {
    name: "Westman Atelier",
    founded: 2018,
    focus: "Luxury clean color",
    signature: "Vital Skincare Complexion Drops",
    cleanStandard: "EU + EWG restricted lists",
    priceTier: "$$$",
    vegan: "Partial",
    crueltyFree: true,
    whereToBuy: "Net-a-Porter, Violet Grey, DTC",
  },
  {
    name: "Tatcha",
    founded: 2009,
    focus: "Japanese-ritual skincare",
    signature: "The Dewy Skin Cream",
    cleanStandard: "Sephora Clean, no parabens/sulfates",
    priceTier: "$$$",
    vegan: "Partial",
    crueltyFree: true,
    whereToBuy: "Sephora, DTC",
  },
];

export interface BrandQA {
  brand: string;
  question: string;
  answer: string;
}

export const BRAND_FAQS: BrandQA[] = [
  {
    brand: "Ilia",
    question: "Is Ilia clean beauty?",
    answer:
      "Yes — Ilia is Credo Clean certified and meets Sephora's Clean+Planet Positive criteria. Most formulas are vegan; check individual product pages for confirmation.",
  },
  {
    brand: "Tatcha",
    question: "Is Tatcha clean beauty?",
    answer:
      "By Sephora's Clean standard, yes — Tatcha avoids parabens, sulfates, and synthetic fragrance. It is not fully vegan; some products contain silk or honey-derived ingredients.",
  },
  {
    brand: "Merit",
    question: "Is Merit clean beauty?",
    answer:
      "Yes. Merit follows the EU's restricted-ingredient list (more conservative than the FDA's), is vegan and cruelty-free, and lists every ingredient on the product page.",
  },
  {
    brand: "Rare Beauty",
    question: "Is Rare Beauty clean?",
    answer:
      "Mostly — Rare Beauty is cruelty-free and avoids many flagged ingredients, but it is not certified clean by EWG or Credo. Sephora classifies most of its line as Clean at Sephora.",
  },
  {
    brand: "e.l.f.",
    question: "Is e.l.f. clean beauty?",
    answer:
      "e.l.f. is fully vegan and cruelty-free at the price tier. It is not Credo or EWG certified — some formulas use synthetic ingredients that pass FDA but not the strictest clean standards.",
  },
  {
    brand: "Drunk Elephant",
    question: "Is Drunk Elephant clean beauty?",
    answer:
      "Drunk Elephant uses its own 'Suspicious 6' free-from list (essential oils, drying alcohols, silicones, fragrance, SLS, chemical sunscreens). It is not vegan across the line.",
  },
  {
    brand: "Charlotte Tilbury",
    question: "Is Charlotte Tilbury clean or vegan?",
    answer:
      "Charlotte Tilbury is cruelty-free (since 2018) but not fully vegan — several lipstick shades, including Pillow Talk, contain carmine. The brand is not certified by EWG or Credo.",
  },
  {
    brand: "Rare Beauty",
    question: "Is Rare Beauty vegan and cruelty-free?",
    answer:
      "Rare Beauty is fully vegan and cruelty-free. It meets Sephora's Clean standard but is not Credo or EWG certified.",
  },
  {
    brand: "Fenty Beauty",
    question: "Is Fenty Beauty clean and vegan?",
    answer:
      "Fenty Beauty is cruelty-free. The line is mostly vegan but a small number of products contain beeswax or carmine — check individual product pages. Fenty is not Credo or EWG certified.",
  },
  {
    brand: "Tintelle",
    question: "Is Tintelle clean, vegan, and cruelty-free?",
    answer:
      "Yes — Tintelle is 100% vegan across every product, Leaping Bunny cruelty-free, dermatologist-tested, and formulated without parabens, phthalates, synthetic fragrance, oxybenzone, octinoxate, or EU-banned ingredients.",
  },

];

export const PILLAR_FAQS: { question: string; answer: string }[] = [
  {
    question: "What does 'clean beauty' actually mean?",
    answer:
      "There is no FDA-regulated definition. In practice, clean beauty means a brand publishes a 'free-from' list (parabens, phthalates, formaldehyde, etc.), discloses its full ingredient deck, and avoids ingredients flagged by independent bodies like EWG or the EU's stricter cosmetic regulations.",
  },
  {
    question: "Is clean beauty actually better for your skin?",
    answer:
      "It depends on your skin. Clean formulations often skip fragrance and harsh surfactants, which helps sensitive skin. They are not automatically more effective — efficacy comes from formulation, not absence of ingredients.",
  },
  {
    question: "What's the difference between clean, natural, and organic?",
    answer:
      "Clean = avoids a defined list of flagged ingredients. Natural = derived from plants or minerals (no efficacy guarantee). Organic = grown without synthetic pesticides and certified (USDA Organic, COSMOS).",
  },
  {
    question: "Are clean beauty products vegan and cruelty-free?",
    answer:
      "Often, but not always. Beeswax, lanolin, carmine, and silk are common in clean formulas. Always check the brand's vegan and Leaping Bunny certifications individually.",
  },
  {
    question: "What's the difference between clean beauty and sustainable makeup?",
    answer:
      "Clean beauty is about what's inside the formula — the free-from list and ingredient transparency. Sustainable makeup is about everything around it: recyclable or refillable packaging, responsibly sourced raw materials, lower-carbon manufacturing, and end-of-life take-back programs. The most rigorous brands do both. Tintelle's standard covers ingredient cleanliness (EU-aligned, EWG-referenced) and sustainability (FSC-certified outer cartons, PCR plastic components, refillable lipstick bullets, and carbon-neutral shipping).",
  },
  {
    question: "Which clean beauty brands are also the most sustainable?",
    answer:
      "On packaging and sourcing, Ilia (post-consumer recycled aluminum), Kjaer Weis (refillable metal compacts), Axiology (plastic-free 'Balmies'), and Tintelle (FSC cartons, PCR components, refillable bullets) lead the sustainable makeup conversation. Tower 28 and Saie are clean but use more virgin plastic; Westman Atelier is moving toward refills across the line.",
  },
  {
    question: "How does Tintelle compare to Ilia and Merit?",
    answer:
      "Tintelle sits in the same skincare-makeup hybrid space as Ilia, with Merit's minimalist routine philosophy. We publish full ingredient decks, dermatologist-test every formula, and price between Tower 28 and Westman Atelier.",
  },
  {
    question: "Where can I buy Tintelle?",
    answer:
      "Direct at tintellebeauty.com. We ship across the United States with carbon-neutral packaging and free returns within 30 days.",
  },
];
