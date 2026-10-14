// Renders every public route to its own HTML file so search engines and social previews receive
// real content and per-page metadata. Also writes sitemap.xml, robots.txt and a 404 page.
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const ssr = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const template = await fs.readFile(path.join(dist, "index.html"), "utf8");

const HEAD_PLACEHOLDER = /<!--seo-head-->\s*<title[^>]*>[\s\S]*?<\/title>/;
if (!HEAD_PLACEHOLDER.test(template) || !template.includes("<!--app-html-->")) {
  throw new Error("index.html is missing the <!--seo-head--> or <!--app-html--> placeholder.");
}
if (ssr.unknownMarketProducts.length > 0) {
  throw new Error(`Markets reference unknown products: ${ssr.unknownMarketProducts.join(", ")}`);
}

const renderPage = (url, meta) =>
  template
    .replace(HEAD_PLACEHOLDER, ssr.renderHeadTags(meta).trimStart())
    .replace("<!--app-html-->", ssr.render(url));

// "/" -> index.html, "/about" -> about.html, "/products/soybeans" -> products--soybeans.html.
// Nested pages are stored flat so no "products/" folder collides with products.html; .htaccess maps
// the clean URLs back to these files.
const fileFor = (url) => (url === "/" ? "index.html" : `${url.slice(1).replaceAll("/", "--")}.html`);

const write = async (file, html) => {
  const target = path.join(dist, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, html);
};

const pages = [...ssr.indexablePaths, ...ssr.unlistedPaths];
for (const url of pages) {
  await write(fileFor(url), renderPage(url, ssr.getRouteMeta(url)));
}
await write("404.html", renderPage("/404", ssr.notFoundMeta));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ssr.indexablePaths.map((url) => `  <url><loc>${ssr.SITE_URL}${url}</loc></url>`).join("\n")}
</urlset>
`;
await write("sitemap.xml", sitemap);

await write(
  "robots.txt",
  `User-agent: *
Allow: /

Sitemap: ${ssr.SITE_URL}/sitemap.xml
`,
);

await fs.rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${pages.length} pages + 404.html; sitemap lists ${ssr.indexablePaths.length} URLs.`);
