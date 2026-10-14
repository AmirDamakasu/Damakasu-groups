import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { Plugin } from "vite";

// The production CSP (index.html <meta> + public/.htaccess) allows no inline scripts. The dev
// server's React Refresh preamble is inline, so relax the meta copy only while serving locally.
const devInlineScripts = (): Plugin => ({
  name: "dev-csp-inline-scripts",
  apply: "serve",
  transformIndexHtml: (html) =>
    html.replace("script-src 'self'", "script-src 'self' 'unsafe-inline' 'unsafe-eval'").replace(
      "connect-src 'self'",
      "connect-src 'self' ws: wss: http://127.0.0.1:54321",
    ),
});

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    // Security headers served during local development
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      // Relaxed CSP for dev (Vite HMR needs 'unsafe-eval')
      "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        "connect-src 'self' ws: wss: https://*.supabase.co https://www.google.com",
        "frame-src https://www.google.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join("; "),
    },
  },
  plugins: [react(), devInlineScripts()],
  // The build-time prerender (scripts/prerender.mjs) bundles all dependencies into one SSR file.
  ssr: { noExternal: true },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
