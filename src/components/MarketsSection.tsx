import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { markets } from "@/data/markets";

const destinations = markets;

// Diagram geometry, in percent of the diagram box. HTML nodes are placed with these
// percentages; the SVG is drawn in measured pixels so lines meet the markers exactly.
const ORIGIN_X = 20;
const ORIGIN_Y = 50;
const MARKER_X = 54;
const FIRST_ROW_Y = 6;
const ROW_STEP = (100 - FIRST_ROW_Y * 2) / (destinations.length - 1);

const rowY = (index: number) => FIRST_ROW_Y + index * ROW_STEP;

const connectorPath = (index: number, width: number, height: number) => {
  const x0 = (ORIGIN_X / 100) * width;
  const y0 = (ORIGIN_Y / 100) * height;
  const x1 = (MARKER_X / 100) * width;
  const y1 = (rowY(index) / 100) * height;
  const bend = (x1 - x0) * 0.55;
  return `M ${x0} ${y0} C ${x0 + bend} ${y0}, ${x1 - bend} ${y1}, ${x1} ${y1}`;
};

type MarketsSectionProps = {
  /** Where "Explore" points; omit on the Markets page itself. */
  cta?: { label: string; to: string };
};

export function MarketsSection({ cta = { label: "Explore Our Markets", to: "/markets" } }: MarketsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const diagramRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const active = hovered ?? selected;

  const fadeIn = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const node = diagramRef.current;
    if (!node) return;
    setSize({ width: node.offsetWidth, height: node.offsetHeight });
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const toggle = (index: number) => setSelected((current) => (current === index ? null : index));

  const destinationButton = (index: number, className?: string) => {
    const destination = destinations[index];
    const isActive = active === index;
    return (
      <button
        type="button"
        onClick={() => toggle(index)}
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(index)}
        onBlur={() => setHovered(null)}
        aria-pressed={selected === index}
        className={cn(
          "group flex w-full items-center gap-4 rounded-lg px-3 py-1.5 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700",
          isActive ? "bg-emerald-50" : "hover:bg-emerald-50/70",
          active !== null && !isActive && "opacity-60",
          className,
        )}
      >
        <span
          className={cn(
            "relative z-10 h-3.5 w-3.5 shrink-0 rounded-full bg-emerald-700 ring-4 transition-all duration-300",
            isActive ? "scale-125 bg-emerald-800 ring-emerald-200" : "ring-emerald-100",
          )}
          aria-hidden="true"
        />
        <span className="min-w-0">
          <span className="block text-base font-extrabold leading-5 text-slate-950">
            {destination.country}
          </span>
          <span className="mt-0.5 block text-sm leading-5 text-slate-500">{destination.use}</span>
        </span>
      </button>
    );
  };

  return (
    <section id="markets" className="overflow-x-clip bg-white py-24 md:py-28" aria-labelledby="markets-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">
              06 • MARKETS
            </p>
            <h2
              id="markets-heading"
              className="max-w-lg font-sans text-4xl font-extrabold leading-[1.05] text-slate-950 md:text-5xl lg:text-6xl"
            >
              One origin. Nine global markets.
            </h2>
            <p className="mt-7 text-lg leading-8 text-slate-600">
              Our agricultural commodities originate in Nigeria and are positioned to serve international
              buyers across key global markets. From sesame processing and food manufacturing in India to
              agricultural ingredient supply in Canada and industrial applications across Asia, the Middle
              East and Europe, Damakasu Multi-Link Investment Ltd is focused on connecting Nigerian
              agricultural supply with international demand.
            </p>
            <Link
              to={cta.to}
              className="group mt-8 inline-flex items-center text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4"
            >
              {cta.label}
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
            <p className="mt-10 max-w-lg border-l-2 border-emerald-700/35 pl-5 text-sm leading-7 text-slate-500">
              Quality assurance may include aflatoxin, Salmonella, moisture, purity and other relevant testing,
              subject to buyer specifications and destination-market requirements. Compliance claims are made
              only where supported by current documentation.
            </p>
          </motion.div>

          {/* Tablet & desktop: network diagram */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative hidden h-[700px] md:block"
            role="group"
            aria-label="Nigeria to nine target destination markets"
          >
            <div ref={diagramRef} className="absolute inset-0" aria-hidden="true">
              {size.width > 0 && (
                <svg
                  className="h-full w-full overflow-visible"
                  viewBox={`0 0 ${size.width} ${size.height}`}
                >
              {destinations.map((destination, index) => {
                const isActive = active === index;
                return (
                  <motion.path
                    key={destination.country}
                    d={connectorPath(index, size.width, size.height)}
                    fill="none"
                    strokeLinecap="round"
                    className="transition-[stroke,stroke-width,opacity] duration-300"
                    stroke={isActive ? "#047857" : "#059669"}
                    strokeWidth={isActive ? 2.5 : 1.25}
                    strokeOpacity={active === null ? 0.45 : isActive ? 1 : 0.15}
                    initial={prefersReducedMotion ? false : { pathLength: 0 }}
                    whileInView={prefersReducedMotion ? undefined : { pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 + index * 0.06 }}
                  />
                );
              })}
                </svg>
              )}
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="absolute z-10 flex h-36 w-36 items-center justify-center rounded-full bg-emerald-950 text-center shadow-[0_24px_60px_rgba(6,78,59,0.22)] ring-8 ring-emerald-900/5 lg:h-40 lg:w-40"
              style={{ left: `${ORIGIN_X}%`, top: `${ORIGIN_Y}%`, x: "-50%", y: "-50%" }}
            >
              <div>
                <p className="text-xl font-extrabold text-white">Nigeria</p>
                <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-emerald-200">
                  ORIGIN
                </p>
              </div>
            </motion.div>

            <ul className="absolute inset-y-0 right-0" style={{ left: `calc(${MARKER_X}% - 19px)` }}>
              {destinations.map((destination, index) => (
                <motion.li
                  key={destination.country}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.42, ease: "easeOut", delay: 0.2 + index * 0.06 }}
                  className="absolute left-0 right-0"
                  style={{ top: `${rowY(index)}%`, y: "-50%" }}
                >
                  {destinationButton(index, "pl-3")}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Mobile: vertical list */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:hidden"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-emerald-950 text-center shadow-[0_16px_40px_rgba(6,78,59,0.22)] ring-8 ring-emerald-900/5">
                <div>
                  <p className="text-base font-extrabold text-white">Nigeria</p>
                  <p className="mt-1 text-[0.55rem] font-bold uppercase tracking-[0.3em] text-emerald-200">
                    ORIGIN
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-600">Supplying nine target markets</p>
            </div>
            <ul
              className="relative ml-12 mt-2 border-l border-emerald-700/30 py-2"
              aria-label="Nigeria to nine target destination markets"
            >
              {destinations.map((destination, index) => (
                <li key={destination.country} className="relative -ml-[7px] py-0.5">
                  {destinationButton(index, "px-0 pr-2")}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
