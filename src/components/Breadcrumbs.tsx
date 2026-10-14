import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type Crumb = { name: string; to?: string };

/** Visible breadcrumb trail; the matching BreadcrumbList structured data lives in src/seo/meta.ts. */
export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const trail = [{ name: "Home", to: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {trail.map((crumb, index) => (
          <li key={crumb.name} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />}
            {crumb.to && index < trail.length - 1 ? (
              <Link to={crumb.to} className="opacity-80 underline-offset-4 hover:underline hover:opacity-100">
                {crumb.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
