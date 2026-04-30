// Parses a Shopify descriptionHtml into named sections by H1-H4 headings.
// Anything before the first heading is treated as the "intro".
// Section keys are normalized lowercase heading text.

export interface ParsedDescription {
  introHtml: string;
  sections: Record<string, { title: string; html: string }>;
}

const KEY_ALIASES: Record<string, string[]> = {
  benefits: ["benefits", "benefit"],
  application: ["application", "how to apply", "directions", "directions for use"],
  howToUse: ["how to use", "usage", "use"],
  ingredients: ["ingredients", "full ingredients", "full ingredient list", "ingredient list"],
  keyIngredients: ["key ingredients", "hero ingredients", "active ingredients"],
};

export function parseProductDescription(html: string | undefined | null): ParsedDescription {
  const empty: ParsedDescription = { introHtml: "", sections: {} };
  if (!html) return empty;
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    return { introHtml: html, sections: {} };
  }

  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
  const root = doc.body.firstElementChild;
  if (!root) return empty;

  const intro: string[] = [];
  const sections: ParsedDescription["sections"] = {};
  let current: { title: string; key: string; nodes: string[] } | null = null;

  const flush = () => {
    if (current) {
      sections[current.key] = { title: current.title, html: current.nodes.join("") };
      current = null;
    }
  };

  Array.from(root.childNodes).forEach((node) => {
    if (node.nodeType === 1) {
      const el = node as Element;
      const tag = el.tagName.toLowerCase();
      if (/^h[1-4]$/.test(tag)) {
        flush();
        const title = (el.textContent || "").trim();
        const key = normalizeKey(title);
        current = { title, key, nodes: [] };
        return;
      }
    }
    const html = (node as Element).outerHTML ?? (node.textContent || "");
    if (current) current.nodes.push(html);
    else intro.push(html);
  });
  flush();

  return { introHtml: intro.join("").trim(), sections };
}

function normalizeKey(title: string): string {
  const t = title.trim().toLowerCase();
  for (const [canonical, aliases] of Object.entries(KEY_ALIASES)) {
    if (aliases.includes(t)) return canonical;
  }
  return t.replace(/\s+/g, "-");
}

export function pickSection(parsed: ParsedDescription, key: string) {
  return parsed.sections[key]?.html ?? "";
}
