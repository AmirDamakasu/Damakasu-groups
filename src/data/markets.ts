// Target / potential destination markets — not a list of confirmed customers or export relationships.
export type Market = {
  country: string;
  use: string;
  /** Product slugs (src/data/products.ts) with typical buyer applications in this market. */
  products: string[];
};

export const markets: Market[] = [
  { country: "India", use: "Sesame processing, oil extraction & food manufacturing", products: ["sesame-seeds", "cashew-nuts", "ginger"] },
  { country: "Canada", use: "Agricultural commodities, food processing & ingredient supply", products: ["soybeans", "dried-hibiscus", "ginger"] },
  { country: "China", use: "Oil crushing & agricultural processing", products: ["sesame-seeds", "soybeans"] },
  { country: "Saudi Arabia", use: "Edible oil & animal feed", products: ["soybeans", "yellow-maize", "sorghum"] },
  { country: "Japan", use: "Food manufacturing & industrial applications", products: ["sesame-seeds", "ginger"] },
  { country: "Türkiye", use: "Tahini, halva & sesame processing", products: ["sesame-seeds"] },
  { country: "UAE", use: "Re-export & commodity distribution", products: ["sesame-seeds", "cashew-nuts", "dried-hibiscus", "rice"] },
  { country: "Netherlands", use: "Food processing & agricultural ingredients", products: ["cocoa-beans", "dried-hibiscus", "ginger"] },
  { country: "Germany", use: "Food manufacturing & industrial applications", products: ["dried-hibiscus", "ginger", "sesame-seeds", "cocoa-beans"] },
];

export const marketsForProduct = (slug: string) => markets.filter((market) => market.products.includes(slug));

/** URL fragment for a market's section on the Markets page, e.g. "Türkiye" -> "turkiye". */
export const marketAnchor = (country: string) =>
  country.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]+/g, "-");
