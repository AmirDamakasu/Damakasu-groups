import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

import riceImg from "@/assets/product-rice.jpg";
import maizeImg from "@/assets/product-maize.jpg";
import sesameImg from "@/assets/product-sesame.jpg";
import cocoaImg from "@/assets/product-cocoa.jpg";
import cashewImg from "@/assets/product-cashew.jpg";
import gingerImg from "@/assets/product-ginger.jpg";
import soybeanImg from "@/assets/product-soybean.jpg";

const products = [
  {
    name: "Premium Rice",
    slug: "rice",
    image: riceImg,
    origin: "West Africa",
    grades: ["Long Grain", "Parboiled", "Brown Rice"],
    packaging: ["25kg", "50kg", "Bulk"],
    standards: ["NAFDAC", "SON", "ISO 22000"],
    description: "Our premium rice varieties are sourced from the fertile fields of West Africa. We offer long-grain white rice, parboiled rice, and brown rice options, all carefully processed to meet international quality standards.",
  },
  {
    name: "Yellow Maize",
    slug: "maize",
    image: maizeImg,
    origin: "Nigeria",
    grades: ["Grade A", "Grade B", "Animal Feed Grade"],
    packaging: ["25kg", "50kg", "Bulk"],
    standards: ["NAFDAC", "SGS Certified", "Aflatoxin-Free"],
    description: "High-quality yellow maize suitable for food processing, animal feed, and industrial applications. Our maize is carefully dried and stored to maintain optimal moisture content and prevent contamination.",
  },
  {
    name: "Sesame Seeds",
    slug: "sesame",
    image: sesameImg,
    origin: "Nigeria",
    grades: ["Natural White", "Hulled", "Black Sesame"],
    packaging: ["25kg", "50kg", "Bulk"],
    standards: ["NAFDAC", "JAS Certified", "99.95% Purity"],
    description: "Premium sesame seeds with high oil content, perfect for confectionery, tahini production, and oil extraction. Our seeds undergo thorough cleaning and grading to ensure consistent quality.",
  },
  {
    name: "Cocoa Beans",
    slug: "cocoa",
    image: cocoaImg,
    origin: "Ghana & Nigeria",
    grades: ["Grade 1", "Grade 2", "Organic"],
    packaging: ["60kg Jute Bags", "Bulk"],
    standards: ["UTZ Certified", "Rainforest Alliance", "Fair Trade"],
    description: "Fermented and sun-dried cocoa beans with rich flavor profiles ideal for chocolate manufacturing. Our cocoa is sourced from certified farms practicing sustainable agriculture.",
  },
  {
    name: "Cashew Nuts",
    slug: "cashew",
    image: cashewImg,
    origin: "West Africa",
    grades: ["W180", "W240", "W320", "Splits"],
    packaging: ["25kg", "50kg", "Bulk"],
    standards: ["HACCP", "ISO 22000", "BRC Certified"],
    description: "Raw and processed cashew nuts in various grades and sizes. From whole premium kernels to splits and pieces, we offer options for different market requirements.",
  },
  {
    name: "Fresh Ginger",
    slug: "ginger",
    image: gingerImg,
    origin: "Nigeria",
    grades: ["Fresh", "Dried", "Split", "Powder"],
    packaging: ["20kg", "50kg", "Bulk"],
    standards: ["NAFDAC", "Phytosanitary Certified", "Pesticide-Free"],
    description: "Aromatic Nigerian ginger known for its strong pungency and high oleoresin content. Available fresh, dried, or processed according to buyer specifications.",
  },
  {
    name: "Soybeans",
    slug: "soybeans",
    image: soybeanImg,
    origin: "Nigeria",
    grades: ["Food Grade", "Oil Extraction", "Animal Feed"],
    packaging: ["25kg", "50kg", "Bulk"],
    standards: ["NAFDAC", "Non-GMO Verified", "ISO Certified"],
    description: "High-protein soybeans suitable for food processing, oil extraction, and livestock feed. Our soybeans are carefully selected and tested for protein content and quality.",
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
                Our Products
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-3 mb-6"
              >
                Premium Agricultural Exports
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary-foreground/80 text-lg leading-relaxed"
              >
                Quality-assured crops sourced directly from trusted farmers, processed to international 
                standards, and delivered to markets worldwide.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Products List */}
        <section className="py-24 bg-gradient-earth bg-grain">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="space-y-16">
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
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-medium">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                      Origin: {product.origin}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                      {product.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

                    <div className="grid sm:grid-cols-3 gap-6 mb-8">
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-2">Available Grades</h4>
                        <ul className="space-y-1">
                          {product.grades.map((grade) => (
                            <li key={grade} className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Check className="w-4 h-4 text-primary" />
                              {grade}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-2">Packaging</h4>
                        <ul className="space-y-1">
                          {product.packaging.map((pack) => (
                            <li key={pack} className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Check className="w-4 h-4 text-primary" />
                              {pack}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-2">Standards</h4>
                        <ul className="space-y-1">
                          {product.standards.map((standard) => (
                            <li key={standard} className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Check className="w-4 h-4 text-primary" />
                              {standard}
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
    </div>
  );
};

export default Products;
