import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { highlights, HIGHLIGHT_CATEGORIES, type Highlight, type HighlightCategory } from "@/data/highlights";
import { cn } from "@/lib/utils";
import { FilterPills } from "./FilterPills";
import { HighlightCard } from "./HighlightCard";
import { HighlightLightbox } from "./HighlightLightbox";

type Filter = "all" | HighlightCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All Highlights" },
  ...HIGHLIGHT_CATEGORIES.map((category) => ({ value: category, label: category })),
];

// Editorial layout for the "All Highlights" view: tile 1 is a 2×2 feature, and these tiles span two
// columns so the 4-column desktop grid fills three complete rows.
const WIDE_ON_DESKTOP = new Set([10]);
const WIDE_ON_TABLET = new Set([10]);

export function HighlightsGallery() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<Highlight | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const tileRefs = useRef(new Map<number, HTMLButtonElement>());

  const visible = filter === "all" ? highlights : highlights.filter((item) => item.category === filter);
  const editorial = filter === "all";

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: reduceMotion ? 0.01 : 0.6, ease: "easeOut" as const, delay: reduceMotion ? 0 : delay },
  });

  const open = (item: Highlight) => {
    openerRef.current = tileRefs.current.get(item.id) ?? null;
    setActive(item);
  };

  return (
    <section className="relative bg-cream pb-16 pt-2 md:pb-24 md:pt-4" aria-labelledby="highlights-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p {...fadeUp(0)} className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">
              Business &amp; Leadership Highlights
            </motion.p>
            <motion.h2
              {...fadeUp(0.1)}
              id="highlights-heading"
              className="mt-4 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl"
            >
              Building Relationships. Creating Opportunities.
            </motion.h2>
            <motion.p {...fadeUp(0.2)} className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Explore moments from our business activities, leadership engagements, professional meetings, industry
              events, and relationships that support our company's growth.
            </motion.p>
          </div>

          <div className="mt-10">
            <FilterPills<Filter>
              options={FILTERS}
              value={filter}
              onChange={setFilter}
              panelId="highlights-grid"
              label="Filter highlights by category"
            />
          </div>

          <motion.ul
            layout={!reduceMotion}
            id="highlights-grid"
            role="tabpanel"
            aria-labelledby={`highlights-grid-tab-${FILTERS.findIndex((f) => f.value === filter)}`}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-4 lg:auto-rows-[180px]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((item, index) => {
                const feature = editorial && index === 0;
                const wideDesktop = editorial && WIDE_ON_DESKTOP.has(item.id);
                const wideTablet = editorial && WIDE_ON_TABLET.has(item.id);
                return (
                  <motion.li
                    key={item.id}
                    layout={!reduceMotion}
                    initial={feature ? { opacity: 0, scale: reduceMotion ? 1 : 0.96 } : { opacity: 0, y: reduceMotion ? 0 : 24 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.3 } }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: reduceMotion ? 0.01 : feature ? 0.6 : 0.5,
                      ease: "easeOut",
                      delay: reduceMotion ? 0 : index * 0.08,
                      layout: { duration: 0.3, ease: "easeOut" },
                    }}
                    className={cn(
                      "aspect-[4/3] lg:aspect-auto",
                      feature && "sm:col-span-2 sm:aspect-[16/10] lg:row-span-2 lg:aspect-auto",
                      wideTablet && "sm:col-span-2 sm:aspect-[16/9]",
                      wideDesktop && "lg:col-span-2",
                    )}
                  >
                    <HighlightCard
                      ref={(node) => {
                        if (node) tileRefs.current.set(item.id, node);
                        else tileRefs.current.delete(item.id);
                      }}
                      highlight={item}
                      feature={feature}
                      onOpen={open}
                    />
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>

      <HighlightLightbox
        highlight={active}
        onClose={() => setActive(null)}
        returnFocusTo={openerRef}
      />
    </section>
  );
}
