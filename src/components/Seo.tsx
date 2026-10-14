import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta, renderHeadTags } from "@/seo/meta";

/** Keeps the document head in sync with the current route during client-side navigation. */
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    document.head.querySelectorAll("[data-seo]").forEach((node) => node.remove());
    const fragment = document.createRange().createContextualFragment(renderHeadTags(meta));
    fragment.querySelector("title")?.remove();
    document.title = meta.title;
    document.head.append(fragment);
  }, [pathname]);

  return null;
}
