import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { products, productPath } from "@/data/products";

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
                to={productPath(product)}
                className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium border border-border/40 hover:border-secondary/20 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Image container with aspect ratio and overlay */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    srcSet={product.imageSrcSet}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    alt={product.imageAlt}
                    loading="lazy"
                    decoding="async"
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
                    {product.summary}
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
