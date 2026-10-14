import sesameImg from "@/assets/product-sesame.jpg";
import cashewImg from "@/assets/product-cashew.jpg";
import soybeanImg from "@/assets/product-soybean.jpg";
import riceImg from "@/assets/product-rice.jpg";
import maizeImg from "@/assets/product-maize.jpg";
import hibiscusImg from "@/assets/product-hibiscus.jpg";
import coffeeImg from "@/assets/product-coffee.jpg";
import gingerImg from "@/assets/product-ginger.jpg";
import cocoaImg from "@/assets/product-cocoa.jpg";
import milletImg from "@/assets/product-millet.jpg";
import sorghumImg from "@/assets/product-sorghum.jpg";

// WebP renditions (full width and 640px) generated next to each JPEG; the JPEG stays the fallback
// and is used for social previews.
const webpFiles = import.meta.glob("../assets/product-*.webp", { eager: true, import: "default" }) as Record<string, string>;
const webpSrcSet = (file: string, width: number) => {
  const small = webpFiles[`../assets/${file}-640.webp`];
  const full = webpFiles[`../assets/${file}.webp`];
  return width > 640 ? `${small} 640w, ${full} ${width}w` : `${full} ${width}w`;
};

export const PRODUCT_GROUPS = ["Oilseeds & Legumes", "Grains & Cereals", "Spices & Botanicals", "Nuts, Cocoa & Coffee"] as const;
export type ProductGroup = (typeof PRODUCT_GROUPS)[number];

export type Product = {
  slug: string;
  /** Buyer-facing grouping used by the catalogue filters. */
  group: ProductGroup;
  /** Anchor used by the old single-page catalogue (/products#anchor); kept so old links still work. */
  anchor: string;
  name: string;
  h1: string;
  category: string;
  image: string;
  /** Responsive WebP sources for <img srcSet>. */
  imageSrcSet: string;
  imageAlt: string;
  summary: string;
  description: string[];
  applications: string[];
  grades: string[];
  packaging: string[];
  origin: string;
  status: string;
  related: string[];
  seoTitle: string;
  seoDescription: string;
};

const DEFAULT_STATUS =
  "Available on enquiry — subject to seasonal availability, volumes and confirmation in a written quotation.";

export const products: Product[] = [
  {
    slug: "sesame-seeds",
    group: "Oilseeds & Legumes",
    anchor: "sesame",
    name: "Sesame Seeds",
    h1: "Nigerian Sesame Seeds",
    category: "Food Manufacturing",
    image: sesameImg,
    imageSrcSet: webpSrcSet("product-sesame", 1018),
    imageAlt: "Natural white sesame seeds from Nigeria",
    summary: "Natural white, hulled and black sesame seeds for food manufacturing, oil extraction and processing.",
    description: [
      "Sesame is one of Nigeria's leading agricultural exports. Damakasu Multi-Link Investment Ltd sources sesame seeds for food manufacturers, oil processors and international buyers, with cleaning and sorting arranged to meet the purity and moisture requirements set out in each buyer's specification.",
      "Typical applications include tahini, halva, bakery toppings, confectionery and sesame oil extraction. Grade, purity and moisture targets are agreed per contract, and inspection or laboratory testing can be arranged where the buyer or destination market requires it.",
    ],
    applications: ["Sesame oil extraction", "Tahini and halva production", "Bakery and confectionery", "Food ingredient processing"],
    grades: ["Natural White", "Hulled", "Black Sesame"],
    packaging: ["25kg Bags", "50kg Bags", "Bulk Bags"],
    origin: "Nigeria",
    status: DEFAULT_STATUS,
    related: ["soybeans", "ginger", "dried-hibiscus"],
    seoTitle: "Nigerian Sesame Seeds Supplier | Natural White & Hulled",
    seoDescription:
      "Source natural white, hulled and black sesame seeds from Nigeria through Damakasu Multi-Link Investment Ltd. Specifications agreed per contract. Request a quotation.",
  },
  {
    slug: "cashew-nuts",
    group: "Nuts, Cocoa & Coffee",
    anchor: "cashew",
    name: "Cashew Nuts",
    h1: "Nigerian Cashew Nuts",
    category: "Export Quality",
    image: cashewImg,
    imageSrcSet: webpSrcSet("product-cashew", 1200),
    imageAlt: "Raw cashew nuts sourced in Nigeria",
    summary: "Raw cashew nuts and kernel grades for processors, food manufacturers and international buyers.",
    description: [
      "Damakasu Multi-Link Investment Ltd sources cashew nuts for processors, food manufacturers and international buyers. Nut count, outturn and moisture expectations are agreed with each buyer before shipment to support efficient shelling, processing and storage.",
      "Kernel grades can be discussed on request. Final grades, quantities and quality parameters are confirmed in the written quotation and contract.",
    ],
    applications: ["Cashew shelling and processing", "Snack and confectionery manufacturing", "Food ingredient supply"],
    grades: ["W180", "W240", "W320", "Splits"],
    packaging: ["50kg Jute Bags", "Vacuum Packs", "Bulk Containers"],
    origin: "Nigeria",
    status: DEFAULT_STATUS,
    related: ["sesame-seeds", "ginger", "cocoa-beans"],
    seoTitle: "Nigerian Cashew Nuts Supplier | Raw Cashew Sourcing",
    seoDescription:
      "Source Nigerian cashew nuts for processing and food manufacturing through Damakasu Multi-Link Investment Ltd. Grades and quality agreed per contract. Request a quote.",
  },
  {
    slug: "soybeans",
    group: "Oilseeds & Legumes",
    anchor: "soybeans",
    name: "Soybeans",
    h1: "Nigerian Soybeans",
    category: "Industrial Supply",
    image: soybeanImg,
    imageSrcSet: webpSrcSet("product-soybean", 1018),
    imageAlt: "Dried soybeans for oil extraction and animal feed",
    summary: "Soybeans for oil extraction, animal feed production and food processing.",
    description: [
      "Damakasu Multi-Link Investment Ltd sources soybeans for animal feed producers, oil crushers and food processors. Beans are selected and dried with protein, oil content and moisture in mind so that they travel safely and process consistently.",
      "Food, oil-extraction and feed grades can be discussed. Protein, oil and moisture targets are confirmed per contract rather than guaranteed in advance.",
    ],
    applications: ["Oil crushing and extraction", "Animal feed production", "Food processing"],
    grades: ["Food Grade", "Oil Extraction Grade", "Animal Feed Grade"],
    packaging: ["25kg Bags", "50kg Bags", "Bulk Vessels"],
    origin: "Nigeria",
    status: DEFAULT_STATUS,
    related: ["yellow-maize", "sorghum", "sesame-seeds"],
    seoTitle: "Nigerian Soybeans Supplier | Feed & Oil Extraction Grade",
    seoDescription:
      "Source Nigerian soybeans for oil extraction, animal feed and food processing through Damakasu Multi-Link Investment Ltd. Grades confirmed per contract. Request a quote.",
  },
  {
    slug: "rice",
    group: "Grains & Cereals",
    anchor: "rice",
    name: "Industrial Grade Rice",
    h1: "Industrial Grade Rice",
    category: "Food Processing",
    image: riceImg,
    imageSrcSet: webpSrcSet("product-rice", 554),
    imageAlt: "Long grain white rice for bulk food processing",
    summary: "Bulk rice supply for food processing and manufacturing industries.",
    description: [
      "Damakasu Multi-Link Investment Ltd supplies bulk rice for food processing and manufacturing buyers. Long grain white, parboiled and broken rice can be discussed depending on the buyer's processing needs.",
      "Milling standard, broken percentage and moisture expectations are agreed per order and confirmed in the written quotation.",
    ],
    applications: ["Food processing and manufacturing", "Commercial catering supply", "Flour and ingredient milling"],
    grades: ["Long Grain White", "Parboiled", "Broken Rice"],
    packaging: ["25kg Bags", "50kg Bags", "Bulk Bags"],
    origin: "Nigeria",
    status: DEFAULT_STATUS,
    related: ["yellow-maize", "sorghum", "pearl-millet"],
    seoTitle: "Industrial Grade Rice Supply in Nigeria | Bulk Rice",
    seoDescription:
      "Bulk long grain, parboiled and broken rice for food processors through Damakasu Multi-Link Investment Ltd. Specifications confirmed per order. Request a quotation.",
  },
  {
    slug: "yellow-maize",
    group: "Grains & Cereals",
    anchor: "maize",
    name: "Yellow Maize",
    h1: "Nigerian Yellow Maize",
    category: "Industrial Processing",
    image: maizeImg,
    imageSrcSet: webpSrcSet("product-maize", 447),
    imageAlt: "Yellow maize grain for feed mills and food processing",
    summary: "Yellow maize for feed mills, food production and industrial processing.",
    description: [
      "Damakasu Multi-Link Investment Ltd sources yellow maize for feed mills, food producers and industrial processors in Nigeria and abroad.",
      "Moisture and aflatoxin limits are agreed with each buyer, and testing can be arranged before shipment where the contract or destination market requires it.",
    ],
    applications: ["Animal feed milling", "Food production", "Starch and industrial processing"],
    grades: ["Grade A Premium", "Grade B Milling", "Feed Grade"],
    packaging: ["50kg Bags", "Bulk Silos", "Bulk Vessels"],
    origin: "Nigeria",
    status: DEFAULT_STATUS,
    related: ["sorghum", "soybeans", "pearl-millet"],
    seoTitle: "Nigerian Yellow Maize Supplier | Feed & Milling Grade",
    seoDescription:
      "Source yellow maize from Nigeria for feed mills and food processing through Damakasu Multi-Link Investment Ltd. Quality limits agreed per contract. Request a quote.",
  },
  {
    slug: "dried-hibiscus",
    group: "Spices & Botanicals",
    anchor: "hibiscus",
    name: "Dried Hibiscus Flowers",
    h1: "Nigerian Dried Hibiscus Flowers",
    category: "Export Product",
    image: hibiscusImg,
    imageSrcSet: webpSrcSet("product-hibiscus", 612),
    imageAlt: "Dried hibiscus flower calyces from Nigeria",
    summary: "Dried hibiscus calyces for beverage production, herbal processing and food ingredients.",
    description: [
      "Northern Nigeria is a well-known source of dried hibiscus (Hibiscus sabdariffa). Damakasu Multi-Link Investment Ltd sources dried hibiscus calyces for beverage producers, herbal processors and ingredient buyers.",
      "Calyces are cleaned of sand and debris and dried before packing. Grade, colour, moisture and cleanliness requirements are agreed per contract.",
    ],
    applications: ["Beverage and tea production", "Herbal processing", "Natural colour and food ingredients"],
    grades: ["Grade A Calyx", "Siftings", "Fine Powder"],
    packaging: ["25kg Woven Bags", "Press-Packed Bales", "Bulk"],
    origin: "Nigeria",
    status: DEFAULT_STATUS,
    related: ["ginger", "sesame-seeds", "cashew-nuts"],
    seoTitle: "Nigerian Dried Hibiscus Flowers Supplier | Hibiscus Calyx",
    seoDescription:
      "Source dried hibiscus flowers (calyces) from Nigeria for beverages and herbal processing through Damakasu Multi-Link Investment Ltd. Request a quotation.",
  },
  {
    slug: "coffee-beans",
    group: "Nuts, Cocoa & Coffee",
    anchor: "coffee",
    name: "Coffee Beans",
    h1: "Coffee Beans",
    category: "Sourcing on Request",
    image: coffeeImg,
    imageSrcSet: webpSrcSet("product-coffee", 800),
    imageAlt: "Green coffee beans for roasters and distributors",
    summary: "Coffee bean sourcing for roasters, processors and distributors, on request.",
    description: [
      "Damakasu Multi-Link Investment Ltd can source coffee beans on request for food processors, roasters and distributors. Beans are graded by size and density with defect monitoring agreed for each order.",
      "Origin, variety and grade are confirmed in the written quotation for each enquiry.",
    ],
    applications: ["Coffee roasting", "Food and beverage processing", "Distribution"],
    grades: ["Arabica", "Robusta", "Screen sizes on request"],
    packaging: ["60kg Jute Bags", "Bulk Liners"],
    origin: "Confirmed per quotation",
    status: "Sourcing on request — origin, grade and availability confirmed per quotation.",
    related: ["cocoa-beans", "ginger", "sesame-seeds"],
    seoTitle: "Coffee Beans Sourcing | Damakasu Multi-Link Investment Ltd",
    seoDescription:
      "Coffee bean sourcing on request for roasters and distributors through Damakasu Multi-Link Investment Ltd. Origin and grade confirmed per quotation. Enquire today.",
  },
  {
    slug: "ginger",
    group: "Spices & Botanicals",
    anchor: "ginger",
    name: "Dried Ginger",
    h1: "Nigerian Dried Ginger",
    category: "Industrial Sourcing",
    image: gingerImg,
    imageSrcSet: webpSrcSet("product-ginger", 576),
    imageAlt: "Dried split ginger from Nigeria",
    summary: "Split and whole dried ginger for food processing, extraction and beverages.",
    description: [
      "Nigerian ginger is valued for its strong aroma and pungency. Damakasu Multi-Link Investment Ltd sources dried split and whole ginger for food processors, spice traders, extractors and beverage manufacturers.",
      "Moisture, cleanliness and oil/oleoresin requirements are agreed per contract, with testing arranged where the buyer requires it.",
    ],
    applications: ["Spice processing and grinding", "Oleoresin and oil extraction", "Beverage manufacturing"],
    grades: ["Split Dried", "Whole Dried", "Ginger Powder"],
    packaging: ["25kg Bags", "40kg Jute Bags", "Bulk"],
    origin: "Nigeria",
    status: DEFAULT_STATUS,
    related: ["dried-hibiscus", "sesame-seeds", "cashew-nuts"],
    seoTitle: "Nigerian Dried Ginger Supplier | Split & Whole Ginger",
    seoDescription:
      "Source dried split and whole ginger from Nigeria for spice processing and extraction through Damakasu Multi-Link Investment Ltd. Request a quotation.",
  },
  {
    slug: "cocoa-beans",
    group: "Nuts, Cocoa & Coffee",
    anchor: "cocoa",
    name: "Cocoa Beans",
    h1: "Nigerian Cocoa Beans",
    category: "Food Manufacturing",
    image: cocoaImg,
    imageSrcSet: webpSrcSet("product-cocoa", 640),
    imageAlt: "Fermented and dried cocoa beans",
    summary: "Fermented, sun-dried cocoa beans for confectionery and cocoa processing.",
    description: [
      "Nigeria is one of the world's notable cocoa producers. Damakasu Multi-Link Investment Ltd sources fermented, sun-dried cocoa beans for confectionery manufacturers and cocoa butter and powder processors.",
      "Grade, bean count, moisture and fermentation requirements are agreed per contract and confirmed in the written quotation.",
    ],
    applications: ["Chocolate and confectionery", "Cocoa butter and powder processing"],
    grades: ["Grade 1 Fermented", "Grade 2"],
    packaging: ["64kg Jute Bags", "Bulk Shipping"],
    origin: "Nigeria",
    status: DEFAULT_STATUS,
    related: ["coffee-beans", "cashew-nuts", "ginger"],
    seoTitle: "Nigerian Cocoa Beans Supplier | Fermented Cocoa",
    seoDescription:
      "Source fermented, sun-dried Nigerian cocoa beans for confectionery and cocoa processing through Damakasu Multi-Link Investment Ltd. Request a quotation.",
  },
  {
    slug: "pearl-millet",
    group: "Grains & Cereals",
    anchor: "millet",
    name: "Pearl Millet",
    h1: "Nigerian Pearl Millet",
    category: "Staple Grain Supply",
    image: milletImg,
    imageSrcSet: webpSrcSet("product-millet", 1200),
    imageAlt: "Pearl millet grain from northern Nigeria",
    summary: "Pearl millet for food manufacturers, animal feed producers and grain buyers.",
    description: [
      "Pearl millet is a staple grain of northern Nigeria. Damakasu Multi-Link Investment Ltd sources pearl millet for food manufacturers, feed producers and grain buyers.",
      "Grain is cleaned, dried and graded for consistent quality, with moisture and impurity limits agreed per contract.",
    ],
    applications: ["Flour and food manufacturing", "Animal feed production", "Grain trading"],
    grades: ["Grade A Whole", "De-husked", "Millet Flour"],
    packaging: ["25kg Bags", "50kg Bags", "Bulk"],
    origin: "Nigeria",
    status: DEFAULT_STATUS,
    related: ["sorghum", "yellow-maize", "rice"],
    seoTitle: "Nigerian Pearl Millet Supplier | Bulk Millet Grain",
    seoDescription:
      "Source pearl millet from northern Nigeria for food manufacturing and animal feed through Damakasu Multi-Link Investment Ltd. Request a quotation.",
  },
  {
    slug: "sorghum",
    group: "Grains & Cereals",
    anchor: "sorghum",
    name: "Sorghum",
    h1: "Nigerian Sorghum",
    category: "Industrial Grain Supply",
    image: sorghumImg,
    imageSrcSet: webpSrcSet("product-sorghum", 732),
    imageAlt: "White and red sorghum grain from Nigeria",
    summary: "White and red sorghum for flour milling, animal feed and brewing.",
    description: [
      "Nigeria is one of Africa's largest sorghum producers. Damakasu Multi-Link Investment Ltd sources white and red sorghum for flour millers, feed producers and brewing industries.",
      "Grain is sorted and dried before packing, with aflatoxin and moisture limits agreed per contract and testing arranged where required.",
    ],
    applications: ["Flour milling", "Animal feed production", "Brewing and malting"],
    grades: ["White Sorghum", "Red Sorghum", "Feed Grade"],
    packaging: ["50kg Bags", "Bulk Silos", "Bulk Vessels"],
    origin: "Nigeria",
    status: DEFAULT_STATUS,
    related: ["yellow-maize", "pearl-millet", "soybeans"],
    seoTitle: "Nigerian Sorghum Supplier | White & Red Sorghum",
    seoDescription:
      "Source white and red sorghum from Nigeria for milling, animal feed and brewing through Damakasu Multi-Link Investment Ltd. Request a quotation.",
  },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);

export const productPath = (product: Pick<Product, "slug">) => `/products/${product.slug}`;
