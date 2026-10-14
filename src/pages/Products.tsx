import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

import { products, productPath } from "@/data/products";

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
                Nigerian Agricultural Commodities & Raw Materials
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
                  id={product.anchor}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`scroll-mt-28 grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-medium border border-border/40">
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                      <Link to={productPath(product)} className="hover:text-emerald-800 transition-colors">
                        {product.name}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{product.description[0]}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="font-semibold text-foreground text-sm mb-2">Grades we can source</h3>
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
                        <h3 className="font-semibold text-foreground text-sm mb-2">Packaging options</h3>
                        <ul className="space-y-1">
                          {product.packaging.map((pack) => (
                            <li key={pack} className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Check className="w-4 h-4 text-secondary shrink-0" />
                              <span className="line-clamp-1">{pack}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="gold" size="lg" asChild>
                        <Link to={`/contact?product=${product.slug}#inquiry`}>
                          Request Quote
                          <ArrowRight className="w-5 h-5" aria-hidden="true" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link to={productPath(product)}>
                          {product.name} details
                        </Link>
                      </Button>
                    </div>
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
