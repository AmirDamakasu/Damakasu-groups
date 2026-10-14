// Smoke test for a built or deployed copy of the site. No dependencies (Node 18+).
//
//   node scripts/smoke-test.mjs https://damakasu.com
//   npm run test:smoke -- https://mistyrose-echidna-938984.hostingersite.com
//
// Checks every sitemap page (status, title, single H1, description, canonical), every internal
// link and image they reference, redirects, the 404 page, robots.txt and noindex on /admin.
const base = (process.argv[2] ?? "").replace(/\/$/, "");
if (!/^https?:\/\//.test(base)) {
  console.error("Usage: node scripts/smoke-test.mjs <base URL>");
  process.exit(2);
}

const results = [];
const check = (name, pass, detail = "") => results.push({ name, pass: Boolean(pass), detail });
const get = (path, opts = {}) => fetch(base + path, { redirect: "manual", ...opts });
const attr = (html, re) => (html.match(re) ?? [])[1];

// Sitemap URLs point at the production domain; test the same paths on `base`.
const sitemap = await (await get("/sitemap.xml")).text();
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
check("sitemap.xml lists pages", paths.length > 0, `${paths.length} URLs`);

const linked = new Set();
const assets = new Set();
for (const path of paths) {
  const res = await get(path);
  const html = await res.text();
  const label = `page ${path}`;
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  const title = attr(html, /<title[^>]*>([^<]*)<\/title>/);
  const description = attr(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/);
  const canonical = attr(html, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/);
  const problems = [
    res.status !== 200 && `status ${res.status}`,
    !title && "no <title>",
    h1s !== 1 && `${h1s} <h1>`,
    (!description || description.length < 50 || description.length > 170) && `description length ${description?.length ?? 0}`,
    (!canonical || !canonical.endsWith(path === "/" ? "/" : path)) && `canonical ${canonical}`,
    /name="robots"[^>]*noindex/.test(html) && "noindex on a public page",
  ].filter(Boolean);
  check(label, problems.length === 0, problems.join(", ") || title);
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) linked.add(href);
  for (const [, src] of html.matchAll(/(?:src|content)="((?:\/|https?:\/\/[^"]*damakasu\.com\/)(?:assets|images)[^"]+)"/g)) {
    assets.add(src.replace(/^https?:\/\/[^/]+/, ""));
  }
}

const broken = [];
for (const href of linked) {
  const res = await get(href);
  if (res.status !== 200) broken.push(`${href} (${res.status})`);
}
check("internal links resolve", broken.length === 0, broken.join(", ") || `${linked.size} links`);

const missing = [];
for (const src of assets) {
  const res = await get(src, { method: "HEAD" });
  if (res.status !== 200) missing.push(`${src} (${res.status})`);
}
check("images and scripts load", missing.length === 0, missing.join(", ") || `${assets.size} files`);

const redirects = [
  ["/about.html", "/about"],
  ["/products/", "/products"],
  ["/index.html", "/"],
];
for (const [from, to] of redirects) {
  const res = await get(from);
  const location = (res.headers.get("location") ?? "").replace(/^https?:\/\/[^/]+/, "");
  check(`redirect ${from} → ${to}`, res.status === 301 && location === to, `${res.status} ${location}`);
}

const notFound = await get("/this-page-does-not-exist");
check("unknown URL returns 404 page", notFound.status === 404 && /Page not found/i.test(await notFound.text()), String(notFound.status));

const robots = await (await get("/robots.txt")).text();
check("robots.txt allows crawling and lists sitemap", /Allow: \//.test(robots) && /Sitemap: https:\/\//.test(robots));

const admin = await (await get("/admin")).text();
check("/admin is noindex", /name="robots"[^>]*noindex/.test(admin));

const htaccess = await get("/.htaccess");
check(".htaccess is not downloadable", htaccess.status !== 200, String(htaccess.status));

for (const r of results) console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `  — ${r.detail}` : ""}`);
const failed = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} checks passed against ${base}`);
process.exit(failed ? 1 : 0);
