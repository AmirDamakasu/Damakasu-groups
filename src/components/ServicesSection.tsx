import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, ClipboardCheck, Package, Ship, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Search,
    title: "Crop Sourcing",
    description: "Direct partnerships with verified farmers and cooperatives to source the finest agricultural products.",
    slug: "sourcing",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Inspection",
    description: "Comprehensive testing and grading to ensure products meet international quality standards.",
    slug: "inspection",
  },
  {
    icon: Package,
    title: "Packaging & Warehousing",
    description: "Modern facilities for proper storage and export-ready packaging solutions.",
    slug: "packaging",
  },
  {
    icon: Ship,
    title: "Logistics & Shipping",
    description: "Reliable freight forwarding and shipping to destinations worldwide.",
    slug: "logistics",
  },
  {
    icon: FileText,
    title: "Export Documentation",
    description: "Complete handling of customs clearance, certificates, and trade documentation.",
    slug: "documentation",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-secondary font-medium text-sm uppercase tracking-wider"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6"
          >
            End-to-End Export Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            From farm to global markets, we handle every step of the export process with expertise and care.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-border/50 hover:border-primary/20"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-card-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-primary rounded-2xl p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-serif text-xl font-semibold text-primary-foreground mb-3">
                Ready to Partner With Us?
              </h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
                Get in touch to discuss your agricultural trade requirements and discover how we can help.
              </p>
            </div>
            <Link to="/contact">
              <Button variant="gold" size="lg" className="w-full">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
