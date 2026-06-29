import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ClipboardCheck, Package, Ship, FileText, ArrowRight, CheckCircle, BarChart2 } from "lucide-react";

const services = [
  {
    icon: Package,
    slug: "sourcing",
    title: "Bulk Raw Material Supply",
    description: "Large-volume supply contracts for manufacturers, processors, and industrial buyers.",
    features: [
      "High-volume procurement and fulfillment",
      "Long-term supply contracts and frameworks",
      "Consistent product availability and stock management",
      "Flexible delivery schedules aligned to production timelines",
      "Competitive bulk pricing for manufacturing clients",
    ],
  },
  {
    icon: Search,
    slug: "strategic-sourcing",
    title: "Strategic Sourcing",
    description: "Reliable supplier identification, vetting, and procurement management to secure your raw material supply.",
    features: [
      "Supplier identification and due diligence",
      "Multi-source procurement for supply continuity",
      "Seasonal planning and advance procurement",
      "Price benchmarking and market intelligence",
      "Vendor risk assessment and diversification",
    ],
  },
  {
    icon: ClipboardCheck,
    slug: "inspection",
    title: "Quality Inspection",
    description: "Comprehensive testing, grading, and compliance verification against international standards.",
    features: [
      "Laboratory testing and chemical analysis",
      "Moisture content and purity verification",
      "Contaminant and aflatoxin screening",
      "Physical grading and sorting procedures",
      "Third-party certification and documentation",
    ],
  },
  {
    icon: FileText,
    slug: "packaging",
    title: "Warehousing & Inventory Management",
    description: "Secure storage facilities and real-time inventory management to support your production operations.",
    features: [
      "Climate-controlled warehousing facilities",
      "Real-time inventory tracking and reporting",
      "Multiple packaging options (bags, bulk, containers)",
      "Fumigation, pest control, and quality preservation",
      "Dedicated stock management for manufacturing clients",
    ],
  },
  {
    icon: Ship,
    slug: "logistics",
    title: "Logistics & Distribution",
    description: "Domestic and international delivery solutions with end-to-end tracking and on-time guarantees.",
    features: [
      "Sea freight (FCL and LCL) for large volumes",
      "Air freight for time-critical shipments",
      "Multi-modal transport solutions",
      "Real-time shipment tracking systems",
      "Insurance coverage and cargo protection",
    ],
  },
  {
    icon: BarChart2,
    slug: "documentation",
    title: "Procurement Consulting",
    description: "Supply-chain optimization, vendor assessment, and strategic sourcing support for manufacturers.",
    features: [
      "Supply-chain risk assessment and mitigation",
      "Procurement process optimization",
      "Vendor qualification and management support",
      "Cost reduction and savings identification",
      "Compliance documentation and trade advisory",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-20" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-secondary font-medium text-sm uppercase tracking-wider"
              >
                Our Services
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-3 mb-6"
              >
                End-to-End Procurement & Supply Solutions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary-foreground/80 text-lg leading-relaxed"
              >
                From raw material sourcing to final delivery, we manage every step of your supply chain 
                with expertise, precision, and unwavering commitment to quality.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-24 bg-gradient-earth bg-grain">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="space-y-16">
              {services.map((service, index) => (
                <motion.div
                  key={service.slug}
                  id={service.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="bg-primary rounded-2xl p-12 flex items-center justify-center aspect-[4/3]">
                      <service.icon className="w-32 h-32 text-secondary" />
                    </div>
                  </div>
                  <div>
                    <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                      Service {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/contact">
                      <Button variant="gold" size="lg">
                        Get a Quote
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-earth">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-3xl md:text-4xl font-bold text-accent-foreground mb-6"
              >
                Ready to Secure Your Supply Chain?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-accent-foreground/80 text-lg mb-8"
              >
                Contact us today to discuss your procurement requirements and discover how our 
                comprehensive supply solutions can support your manufacturing operations.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/contact">
                  <Button variant="gold" size="xl">
                    Request a Quote
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Services;
