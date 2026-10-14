import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ClipboardList, FileSignature, MessageSquareText, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: MessageSquareText,
    title: "Send your inquiry",
    text: "Tell us the commodity, grade, quantity, destination port and preferred delivery terms.",
  },
  {
    icon: ClipboardList,
    title: "Quotation & specification",
    text: "We confirm availability, specification, packaging and price in a written quotation.",
  },
  {
    icon: FileSignature,
    title: "Contract & quality checks",
    text: "Terms are agreed in a written contract, with inspection or laboratory testing arranged as required.",
  },
  {
    icon: Ship,
    title: "Packing & shipment",
    text: "Goods are packed, documented and delivered or shipped on the agreed terms.",
  },
];

const checklist = [
  "Commodity and grade (e.g. hulled sesame, white sorghum)",
  "Quantity and delivery schedule",
  "Destination country and port",
  "Preferred delivery terms (e.g. FOB, CFR, CIF)",
  "Packaging and quality requirements",
];

/** How a purchase works, from inquiry to shipment — shown on the homepage and Services page. */
export function SupplyProcess() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, ease: "easeOut" as const, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="supply-process-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div {...reveal()} className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">How it works</p>
          <h2 id="supply-process-heading" className="mt-3 font-serif text-3xl font-bold text-primary md:text-4xl">
            How Buying From Us Works
          </h2>
          <p className="mt-4 text-muted-foreground">
            A clear, documented process from your first message to delivery.
          </p>
        </motion.div>

        <ol className="relative mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line behind the step numbers on wide screens. */}
          <span className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-emerald-700/20 lg:block" aria-hidden="true" />
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              {...reveal(index * 0.08)}
              className="relative rounded-2xl border border-border/60 bg-card p-6 text-center shadow-soft"
            >
              <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white shadow-soft ring-8 ring-white">
                <step.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Step {index + 1}</p>
              <h3 className="mt-1 text-lg font-bold text-primary">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </motion.li>
          ))}
        </ol>

        <motion.div
          {...reveal(0.1)}
          className="mx-auto mt-10 grid max-w-6xl gap-6 rounded-2xl bg-cream p-6 sm:p-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center"
        >
          <div>
            <h3 className="text-lg font-bold text-primary">What to include in your inquiry</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button variant="gold" size="lg" asChild className="flex-1">
              <Link to="/contact#inquiry">
                Request a Quote <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="flex-1 border-emerald-700/30 text-emerald-800 hover:bg-emerald-50">
              <Link to="/contact?type=supplier#inquiry">Become a Supplier</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
