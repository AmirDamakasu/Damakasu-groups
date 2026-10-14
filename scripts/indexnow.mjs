// Notify IndexNow search engines (Bing, Yandex, Seznam, Naver; Bing also feeds Yahoo, DuckDuckGo
// and Ecosia) that the site's pages exist or changed. Run after deploying:
//   npm run indexnow
// The key file public/<key>.txt must be live at https://damakasu.com/<key>.txt first.
import fs from "node:fs/promises";

const KEY = "ba97f3c1fe5472b5014ed2d99f052f6d";
const HOST = "damakasu.com";
const urls = JSON.parse(await fs.readFile(new URL("../dist/indexnow-urls.json", import.meta.url), "utf8"));

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URLs`, (await res.text()).slice(0, 200));
process.exit(res.ok ? 0 : 1);
