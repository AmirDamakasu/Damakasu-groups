import { forwardRef } from "react";
import { ImageIcon, Maximize2 } from "lucide-react";
import type { Highlight } from "@/data/highlights";
import { cn } from "@/lib/utils";

type HighlightCardProps = {
  highlight: Highlight;
  feature?: boolean;
  onOpen: (highlight: Highlight) => void;
};

/** One gallery tile. Real photos open the lightbox; placeholders are inert, labelled tiles. */
export const HighlightCard = forwardRef<HTMLButtonElement, HighlightCardProps>(({ highlight, feature, onOpen }, ref) => {
  const placeholder = !highlight.image;
  const caption = (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 p-4 sm:p-5",
        placeholder ? "" : "bg-gradient-to-t from-primary/80 via-primary/25 to-transparent pt-10",
      )}
    >
      <p className={cn("text-[0.65rem] font-bold uppercase tracking-[0.22em]", placeholder ? "text-emerald-700" : "text-emerald-300")}>
        {highlight.category}
      </p>
      <p
        className={cn(
          "relative mt-1 inline-block font-serif font-bold",
          placeholder ? "text-primary" : "text-white",
          feature ? "text-xl sm:text-2xl" : "text-base",
        )}
      >
        {highlight.caption}
        {/* Thin green underline that slides across on hover. */}
        <span
          className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-emerald-400 transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </p>
    </div>
  );

  const frame =
    "group relative block h-full w-full overflow-hidden rounded-2xl border border-border/60 bg-card text-left shadow-soft transition-[transform,box-shadow] duration-500 ease-out";

  if (placeholder) {
    return (
      <div
        className={cn(frame, "border-dashed border-emerald-700/30 bg-gradient-to-br from-emerald-50 to-white")}
        role="img"
        aria-label={highlight.alt}
      >
        <div className="flex items-start gap-2 p-4 sm:p-5">
          <ImageIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700/60" aria-hidden="true" />
          <p className="text-xs font-medium leading-snug text-muted-foreground">
            Image placeholder — replace with authorized company photograph
          </p>
        </div>
        {caption}
      </div>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onOpen(highlight)}
      aria-label={`View larger: ${highlight.caption}`}
      className={cn(
        frame,
        "cursor-zoom-in hover:-translate-y-1 hover:shadow-medium focus-visible:-translate-y-1 focus-visible:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      <img
        src={highlight.image}
        alt={highlight.alt}
        width={highlight.width}
        height={highlight.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        style={{ objectPosition: highlight.focus ?? "50% 50%" }}
      />
      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-primary opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
        <Maximize2 className="h-4 w-4" />
      </span>
      {caption}
    </button>
  );
});
HighlightCard.displayName = "HighlightCard";
