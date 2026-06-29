import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

import sesameImg from "@/assets/product-sesame.jpg";
import cashewImg from "@/assets/product-cashew.jpg";
import soybeanImg from "@/assets/product-soybean.jpg";
import riceImg from "@/assets/product-rice.jpg";
import maizeImg from "@/assets/product-maize.jpg";
import hibiscusImg from "@/assets/product-hibiscus.png";
import coffeeImg from "@/assets/product-coffee.png";
import gingerImg from "@/assets/product-ginger.jpg";
import cocoaImg from "@/assets/product-cocoa.jpg";

const products = [
  {
    name: "Sesame Seeds",
    slug: "sesame",
    image: sesameImg,
    category: "Food Manufacturing",
    grades: ["Natural White", "Hulled", "Black Sesame"],
    packaging: ["25kg Bags", "50kg Bags", "Bulk Bags"],
    standards: ["NAFDAC Approved", "99.95% Purity", "SGS Certified"],
    description: "Premium export-quality sesame seeds for food manufacturing, oil extraction, and industrial processing. Our seeds undergo rigorous mechanical cleaning and sorting to achieve high purity and low moisture levels, meeting international manufacturing standards.",
  },
  {
    name: "Cashew Nuts",
    slug: "cashew",
    image: cashewImg,
    category: "Export Quality",
    grades: ["W180", "W240", "W320", "Splits"],
    packaging: ["50kg Jute Bags", "Vacuum Packs", "Bulk Containers"],
    standards: ["HACCP Certified", "ISO 22000", "BRC Food Compliant"],
    description: "High-grade raw cashew nuts supplied to food manufacturers, processors, and international buyers. We ensure optimal nut-count and moisture levels for efficient shelling, processing, and long-term shelf stability.",
  },
  {
    name: "Soybeans",
    slug: "soybeans",
    image: soybeanImg,
    category: "Industrial Supply",
    grades: ["Food Grade", "Oil Extraction Grade", "Animal Feed Grade"],
    packaging: ["25kg Bags", "50kg Bags", "Bulk Vessels"],
    standards: ["Non-GMO Verified", "High Protein (>36%)", "ISO Certified"],
    description: "Protein-rich soybeans for animal feed production, food processing, and industrial applications. Our soybeans are selected for high protein and oil content, dried properly to ensure safe transit and stable processing.",
  },
  {
    name: "Industrial Grade Rice",
    slug: "rice",
    image: riceImg,
    category: "Food Processing",
    grades: ["Long Grain White", "Parboiled", "Broken Rice"],
    packaging: ["25kg Bags", "50kg Bags", "Bulk Bags"],
    standards: ["SON Certified", "ISO 22000", "Grade A Quality"],
    description: "Bulk rice supply for food processing and manufacturing industries. Sourced and processed in modern milling facilities, our rice is free from impurities and parboiled uniformly to fit commercial culinary processing.",
  },
  {
    name: "Yellow Maize",
    slug: "maize",
    image: maizeImg,
    category: "Industrial Processing",
    grades: ["Grade A Premium", "Grade B Milling", "Feed Grade"],
    packaging: ["50kg Bags", "Bulk Silos", "Bulk Vessels"],
    standards: ["Aflatoxin-Free", "Moisture < 13%", "SGS Certified"],
    description: "Quality maize for feed mills, food production, and industrial processing. Our maize is tested thoroughly for moisture content and aflatoxin levels to guarantee a safe, premium raw material for milling and processing lines.",
  },
  {
    name: "Hibiscus Flower",
    slug: "hibiscus",
    image: hibiscusImg,
    category: "Export Product",
    grades: ["Grade A Calyx", "Siftings", "Fine Powder"],
    packaging: ["25kg Woven Bags", "Press-Packed Bales", "Bulk"],
    standards: ["Phytosanitary Certified", "FDA Compliant", "Organic Certified"],
    description: "Premium dried hibiscus flowers for beverage production, herbal processing, and export markets. Sourced from optimal growing regions, cleaned of sand and debris, and dried under strict hygienic conditions.",
  },
  {
    name: "Coffee Beans",
    slug: "coffee",
    image: coffeeImg,
    category: "Premium Import",
    grades: ["Arabica AA", "Robusta Screen 18", "Single Origin"],
    packaging: ["60kg Jute Bags", "Bulk Liners"],
    standards: ["ICO Standard", "Fair Trade Certified", "Rainforest Alliance"],
    description: "Premium grade coffee beans sourced for food processors, roasters, and international distributors. Carefully graded by size and density with strict defect monitoring, delivering consistent quality and flavor profiles.",
  },
  {
    name: "Ginger",
    slug: "ginger",
    image: gingerImg,
    category: "Industrial Sourcing",
    grades: ["Split Dried", "Whole Dried", "Ginger Powder"],
    packaging: ["25kg Bags", "40kg Jute Bags", "Bulk"],
    standards: ["High Oleoresin (>5%)", "Pesticide-Free", "Phytosanitary Certified"],
    description: "Dried and split ginger roots for food processing, extraction, and beverage manufacturing. Known for its strong aroma, high pungency, and oleoresin concentration, optimized for industrial processing.",
  },
  {
    name: "Cocoa Beans",
    slug: "cocoa",
    image: cocoaImg,
    category: "Food Manufacturing",
    grades: ["Grade 1 Fermented", "Grade 2", "Organic"],
    packaging: ["64kg Jute Bags", "Bulk Shipping"],
    standards: ["UTZ Certified", "Rainforest Alliance", "Grade A Quality"],
    description: "Premium fermented cocoa beans for confectionery production and cocoa butter processing. Properly sun-dried and fermented to develop chocolate flavor notes, complying with international quality standards.",
  },
];

const Products = () => {
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
                Our Catalog
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-3 mb-6"
              >
                Industrial Raw Materials & Agricultural Commodities
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary-foreground/80 text-lg leading-relaxed"
              >
                Reliable bulk supply of premium agricultural commodities for manufacturers, processors, 
                exporters, and industrial buyers worldwide.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Products List */}
        <section className="py-24 bg-gradient-earth bg-grain">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="space-y-24">
              {products.map((product, index) => (
                <motion.div
                  key={product.slug}
                  id={product.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-medium border border-border/40">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                      {product.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-2">Available Grades</h4>
                        <ul className="space-y-1">
                          {product.grades.map((grade) => (
                            <li key={grade} className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Check className="w-4 h-4 text-secondary shrink-0" />
                              <span className="line-clamp-1">{grade}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-2">Packaging</h4>
                        <ul className="space-y-1">
                          {product.packaging.map((pack) => (
                            <li key={pack} className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Check className="w-4 h-4 text-secondary shrink-0" />
                              <span className="line-clamp-1">{pack}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-2">Standards</h4>
                        <ul className="space-y-1">
                          {product.standards.map((standard) => (
                            <li key={standard} className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Check className="w-4 h-4 text-secondary shrink-0" />
                              <span className="line-clamp-1">{standard}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link to="/contact">
                      <Button variant="gold" size="lg">
                        Request Quote
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Products;
