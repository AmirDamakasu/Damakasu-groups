import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
// Self-hosted fonts (latin subset) — weights used by the site.
import "@fontsource/playfair-display/latin-400.css";
import "@fontsource/playfair-display/latin-600.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "@fontsource/dm-sans/latin-800.css";
import "./index.css";

// After a deploy, a tab opened on the previous version can ask for code-split files that no
// longer exist (e.g. the admin page), which would leave a blank screen. Reload once to pick up
// the new version; the timestamp guard prevents a reload loop if the file is genuinely missing.
window.addEventListener("vite:preloadError", (event) => {
  const KEY = "damakasu:chunk-reload";
  let last = 0;
  try {
    last = Number(sessionStorage.getItem(KEY) ?? 0);
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    // Storage unavailable (private mode): still reload, the guard just can't apply.
  }
  if (Date.now() - last > 10_000) {
    event.preventDefault();
    window.location.reload();
  }
});

const root = document.getElementById("root")!;
// Pages are prerendered at build time: hydrate the existing HTML instead of re-creating it, so
// content painted from the HTML stays on screen while the JavaScript starts. The admin page is
// code-split and has no meaningful prerendered content, so it is rendered fresh.
const isAdmin = window.location.pathname.replace(/\/+$/, "") === "/admin";
if (root.hasChildNodes() && !isAdmin) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
