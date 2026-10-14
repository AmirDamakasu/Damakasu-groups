import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, LOGO_IMAGE, absoluteUrl } from "@/lib/site";
import { PRIMARY_EMAIL, PHONES, LOCATIONS } from "@/lib/contact";
import { products, getProduct, productPath } from "@/data/products";
import { markets } from "@/data/markets";

export type JsonLd = Record<string, unknown>;

export type RouteMeta = {
  title: string;
  description: string;
  /** Canonical path; null for pages that should not be indexed. */
  path: string | null;
  image: string;
  imageAlt: string;
  noindex?: boolean;
  jsonLd: JsonLd[];
};

const ORG_ID = `${SITE_URL}/#organization`;

const organization: JsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  alternateName: ["Damakasu", "Damakasu Multilink Investment Ltd"],
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: absoluteUrl(LOGO_IMAGE), width: 512, height: 512 },
  description:
    "Nigerian agricultural commodity sourcing, trading and supply company serving buyers of sesame seeds, soybeans, sorghum, ginger, dried hibiscus and other commodities.",
  email: PRIMARY_EMAIL,
  telephone: PHONES[0].href.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Damaturu",
    addressRegion: "Yobe State",
    addressCountry: "NG",
  },
  location: LOCATIONS.map((location) => ({
    "@type": "Place",
    name: location.title,
    address: location.lines.join(", "),
    hasMap: location.mapsUrl,
  })),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: PRIMARY_EMAIL,
      telephone: PHONES[0].href.replace("tel:", ""),
      availableLanguage: ["English"],
      areaServed: ["NG", "IN", "CA", "CN", "JP", "SA", "TR", "AE", "NL", "DE"],
    },
  ],
};

const website: JsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
};

const breadcrumbs = (items: { name: string; path: string }[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

const defaults = { image: DEFAULT_OG_IMAGE, imageAlt: "Agricultural fields — Damakasu Multi-Link Investment Ltd" };

const page = (path: string, title: string, description: string, crumb?: string): RouteMeta => ({
  ...defaults,
  title,
  description,
  path,
  jsonLd: crumb ? [breadcrumbs([{ name: crumb, path }])] : [],
});

const staticPages: Record<string, RouteMeta> = {
  "/": {
    ...defaults,
    path: "/",
    title: "Damakasu Multi-Link Investment Ltd | Nigerian Agricultural Commodities Supplier",
    description:
      "Damakasu Multi-Link Investment Ltd sources Nigerian sesame seeds, soybeans, sorghum, ginger, hibiscus and other agricultural commodities for buyers worldwide.",
    jsonLd: [organization, website],
  },
  "/about": page(
    "/about",
    "About Us | Damakasu Multi-Link Investment Ltd",
    "Learn about Damakasu Multi-Link Investment Ltd, a Nigerian agricultural commodity sourcing and supply company based in Damaturu with operations at Dawanau Market, Kano.",
    "About Us",
  ),
  "/products": page(
    "/products",
    "Nigerian Agricultural Commodities | Products | Damakasu Multi-Link",
    "Nigerian sesame seeds, soybeans, sorghum, maize, ginger, dried hibiscus, cashew nuts and more, sourced to buyer specifications by Damakasu Multi-Link Investment Ltd.",
    "Products",
  ),
  "/services": page(
    "/services",
    "Sourcing, Quality Inspection & Logistics Services | Damakasu",
    "Agricultural commodity procurement in Nigeria: bulk supply, strategic sourcing, quality inspection, warehousing, logistics and procurement consulting from Damakasu.",
    "Services",
  ),
  "/markets": page(
    "/markets",
    "International Markets for Nigerian Agricultural Commodities | Damakasu",
    "How Damakasu connects Nigerian sesame, soybeans, ginger, hibiscus and other commodities with buyers in India, Canada, China, Japan, the Middle East and Europe.",
    "Markets",
  ),
  "/contact": page(
    "/contact",
    "Contact Us & Request a Quote | Damakasu Multi-Link Investment Ltd",
    "Contact Damakasu Multi-Link Investment Ltd for Nigerian agricultural commodity sourcing and quotations. Email info@damakasu.com or call +234 903 784 4338.",
    "Contact Us",
  ),
  "/privacy-policy": page(
    "/privacy-policy",
    "Privacy Policy | Damakasu Multi-Link Investment Ltd",
    "How Damakasu Multi-Link Investment Ltd collects, uses and protects personal information submitted through its website.",
    "Privacy Policy",
  ),
  "/terms-of-service": page(
    "/terms-of-service",
    "Terms of Service | Damakasu Multi-Link Investment Ltd",
    "The terms that govern use of the Damakasu Multi-Link Investment Ltd website, enquiries and quotations.",
    "Terms of Service",
  ),
  "/admin": { ...defaults, path: null, noindex: true, title: `Admin | ${SITE_NAME}`, description: "Restricted area.", jsonLd: [] },
};

export const notFoundMeta: RouteMeta = {
  ...defaults,
  path: null,
  noindex: true,
  title: `Page Not Found | ${SITE_NAME}`,
  description: "The page you were looking for could not be found.",
  jsonLd: [],
};

const normalize = (pathname: string) => (pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname);

export function getRouteMeta(pathname: string): RouteMeta {
  const path = normalize(pathname);
  if (staticPages[path]) return staticPages[path];

  const match = path.match(/^\/products\/([^/]+)$/);
  const product = match && getProduct(match[1]);
  if (product) {
    return {
      title: product.seoTitle,
      description: product.seoDescription,
      path: productPath(product),
      image: product.image,
      imageAlt: product.imageAlt,
      jsonLd: [breadcrumbs([{ name: "Products", path: "/products" }, { name: product.name, path: productPath(product) }])],
    };
  }

  return notFoundMeta;
}

/** Every public, indexable URL — used for prerendering and the sitemap. */
export const indexablePaths = [
  ...Object.entries(staticPages).filter(([, meta]) => !meta.noindex).map(([path]) => path),
  ...products.map(productPath),
];

/** Paths that are prerendered but kept out of search results. */
export const unlistedPaths = ["/admin"];

// Used by the market list to confirm every referenced product exists.
export const unknownMarketProducts = markets.flatMap((market) => market.products.filter((slug) => !getProduct(slug)));

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const absoluteImage = (src: string) => (src.startsWith("http") ? src : absoluteUrl(src));

/** Serialised head tags for a route, injected at build time. The client Seo component keeps them in sync. */
export function renderHeadTags(meta: RouteMeta): string {
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
  ];
  if (meta.path) tags.push(`<link rel="canonical" href="${absoluteUrl(meta.path)}" />`);
  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_NG" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:image" content="${absoluteImage(meta.image)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(meta.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${absoluteImage(meta.image)}" />`,
  );
  if (meta.path) tags.push(`<meta property="og:url" content="${absoluteUrl(meta.path)}" />`);
  for (const data of meta.jsonLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`);
  }
  // data-seo marks the tags the client Seo component replaces on navigation.
  return tags.map((tag) => `    ${tag.replace(/^<(\w+)/, '<$1 data-seo=""')}`).join("\n");
}
