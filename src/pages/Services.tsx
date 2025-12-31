import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ClipboardCheck, Package, Ship, FileText, ArrowRight, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Search,
    slug: "sourcing",
    title: "Crop Sourcing",
    description: "Direct partnerships with verified farmers and cooperatives to source the finest agricultural products.",
    features: [
      "Direct farmer relationships across West Africa",
      "Cooperative partnership programs",
      "Seasonal planning and crop reservation",
      "Competitive pricing negotiations",
      "Sustainable sourcing practices",
    ],
  },
  {
    icon: ClipboardCheck,
    slug: "inspection",
    title: "Quality Inspection",
    description: "Comprehensive testing and grading to ensure products meet international quality standards.",
    features: [
      "Laboratory testing and analysis",
      "Moisture content verification",
      "Aflatoxin and contaminant screening",
      "Visual grading and sorting",
      "Third-party certification support",
    ],
  },
  {
    icon: Package,
    slug: "packaging",
    title: "Packaging & Warehousing",
    description: "Modern facilities for proper storage and export-ready packaging solutions.",
    features: [
      "Climate-controlled warehousing",
      "Multiple packaging options (bags, bulk, containers)",
      "Custom labeling and branding",
      "Fumigation and pest control",
      "Inventory management systems",
    ],
  },
  {
    icon: Ship,
    slug: "logistics",
    title: "Logistics & Shipping",
    description: "Reliable freight forwarding and shipping to destinations worldwide.",
    features: [
      "Sea freight (FCL and LCL)",
      "Air freight for urgent shipments",
      "Multi-modal transport solutions",
      "Real-time shipment tracking",
      "Insurance coverage options",
    ],
  },
  {
    icon: FileText,
    slug: "documentation",
    title: "Export Documentation",
    description: "Complete handling of customs clearance, certificates, and trade documentation.",
    features: [
      "Certificate of Origin",
      "Phytosanitary certificates",
      "Bill of Lading preparation",
      "Letter of Credit handling",
      "Customs clearance assistance",
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
                End-to-End Export Solutions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary-foreground/80 text-lg leading-relaxed"
              >
                From farm to global markets, we handle every step of the export process with 
                expertise, efficiency, and unwavering commitment to quality.
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
                        Learn More
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
                Ready to Get Started?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-accent-foreground/80 text-lg mb-8"
              >
                Contact us today to discuss your agricultural trade requirements and discover 
                how our comprehensive services can support your business.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/contact">
                  <Button variant="gold" size="xl">
                    Contact Us
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
