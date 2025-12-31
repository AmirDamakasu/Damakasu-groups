import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import riceImg from "@/assets/product-rice.jpg";
import maizeImg from "@/assets/product-maize.jpg";
import sesameImg from "@/assets/product-sesame.jpg";
import cocoaImg from "@/assets/product-cocoa.jpg";
import cashewImg from "@/assets/product-cashew.jpg";
import gingerImg from "@/assets/product-ginger.jpg";

const products = [
  {
    name: "Premium Rice",
    description: "High-quality long-grain and parboiled rice varieties",
    image: riceImg,
    origin: "West Africa",
    slug: "rice",
  },
  {
    name: "Yellow Maize",
    description: "Grade A maize for food and feed industries",
    image: maizeImg,
    origin: "Nigeria",
    slug: "maize",
  },
  {
    name: "Sesame Seeds",
    description: "Natural white and hulled sesame seeds",
    image: sesameImg,
    origin: "Nigeria",
    slug: "sesame",
  },
  {
    name: "Cocoa Beans",
    description: "Premium fermented cocoa beans for chocolate production",
    image: cocoaImg,
    origin: "Ghana & Nigeria",
    slug: "cocoa",
  },
  {
    name: "Cashew Nuts",
    description: "Raw and processed cashew nuts, all grades",
    image: cashewImg,
    origin: "West Africa",
    slug: "cashew",
  },
  {
    name: "Fresh Ginger",
    description: "Aromatic ginger root for culinary and medicinal use",
    image: gingerImg,
    origin: "Nigeria",
    slug: "ginger",
  },
];

export function ProductsSection() {
  return (
    <section className="py-24 bg-gradient-earth bg-grain">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-secondary font-medium text-sm uppercase tracking-wider"
          >
            Our Products
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6"
          >
            Premium Agricultural Exports
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Quality-assured crops sourced directly from trusted farmers, meeting international export standards.
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
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/products#${product.slug}`}
                className="group block bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-earth bg-earth/10 px-2 py-1 rounded-full">
                    Origin: {product.origin}
                  </span>
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
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
