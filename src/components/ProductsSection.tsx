import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
    description: "Premium export-quality sesame seeds for food manufacturing, oil extraction, and industrial processing.",
    image: sesameImg,
    category: "Food Manufacturing",
    slug: "sesame",
  },
  {
    name: "Cashew Nuts",
    description: "High-grade raw cashew nuts supplied to food manufacturers, processors, and international buyers.",
    image: cashewImg,
    category: "Export Quality",
    slug: "cashew",
  },
  {
    name: "Soybeans",
    description: "Protein-rich soybeans for animal feed production, food processing, and industrial applications.",
    image: soybeanImg,
    category: "Industrial Supply",
    slug: "soybeans",
  },
  {
    name: "Industrial Grade Rice",
    description: "Bulk rice supply for food processing and manufacturing industries.",
    image: riceImg,
    category: "Food Processing",
    slug: "rice",
  },
  {
    name: "Yellow Maize",
    description: "Quality maize for feed mills, food production, and industrial processing.",
    image: maizeImg,
    category: "Industrial Processing",
    slug: "maize",
  },
  {
    name: "Hibiscus Flower",
    description: "Premium dried hibiscus flowers for beverage production, herbal processing, and export markets.",
    image: hibiscusImg,
    category: "Export Product",
    slug: "hibiscus",
  },
  {
    name: "Coffee Beans",
    description: "Premium grade coffee beans sourced for food processors, roasters, and international distributors.",
    image: coffeeImg,
    category: "Premium Import",
    slug: "coffee",
  },
  {
    name: "Ginger",
    description: "Dried and split ginger roots for food processing, extraction, and beverage manufacturing.",
    image: gingerImg,
    category: "Industrial Sourcing",
    slug: "ginger",
  },
  {
    name: "Cocoa Beans",
    description: "Premium fermented cocoa beans for confectionery production and cocoa butter processing.",
    image: cocoaImg,
    category: "Food Manufacturing",
    slug: "cocoa",
  },
];

export function ProductsSection() {
  return (
    <section className="py-24 bg-gradient-earth bg-grain">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-secondary font-medium text-sm uppercase tracking-wider"
          >
            Our Offerings
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6"
          >
            Industrial Raw Materials & Agricultural Commodities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            Reliable bulk supply of premium agricultural commodities for manufacturers, processors, exporters, and industrial buyers worldwide.
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="h-full"
            >
              <Link
                to={`/products#${product.slug}`}
                className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium border border-border/40 hover:border-secondary/20 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Image container with aspect ratio and overlay */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white bg-secondary px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-serif text-xl font-bold text-card-foreground group-hover:text-secondary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 shrink-0 transition-all duration-300 mt-1" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                    {product.description}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-secondary font-bold hover:text-secondary/80 transition-colors"
          >
            Explore Specifications
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
