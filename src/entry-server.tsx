// Build-time entry used by scripts/prerender.mjs to render each route to static HTML.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell, AppRoutes } from "./App";

export { getRouteMeta, renderHeadTags, indexablePaths, unlistedPaths, notFoundMeta, unknownMarketProducts } from "./seo/meta";
export { SITE_URL } from "./lib/site";

export function render(url: string) {
  return renderToString(
    <AppShell>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppShell>,
  );
}
