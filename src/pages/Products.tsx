import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Search, PackageSearch } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FilterPills } from "@/components/highlights/FilterPills";

import { products, productPath, PRODUCT_GROUPS, type ProductGroup } from "@/data/products";

type GroupFilter = "all" | ProductGroup;
const GROUP_FILTERS: { value: GroupFilter; label: string }[] = [
  { value: "all", label: "All Products" },
  ...PRODUCT_GROUPS.map((group) => ({ value: group, label: group })),
];

// Matches words that start with the query, so "oil" finds "oil extraction" but not "parboiled".
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const matches = (query: string, ...fields: string[]) => {
  const pattern = new RegExp(`(^|[^a-z])${escapeRegExp(query)}`, "i");
  return fields.some((field) => pattern.test(field));
};

const Products = () => {
  const [group, setGroup] = useState<GroupFilter>("all");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const visible = products.filter(
    (product) =>
      (group === "all" || product.group === group) &&
      (!q || matches(q, product.name, product.summary, product.category, ...product.grades, ...product.applications)),
  );

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
                className="text-blue-400 font-medium text-sm uppercase tracking-wider"
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
            {/* Catalogue search & filters */}
            <div className="mx-auto mb-14 max-w-4xl space-y-5 rounded-2xl border border-border/60 bg-card p-5 shadow-soft sm:p-6">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search commodities, grades or uses — e.g. hulled, feed, oil"
                  aria-label="Search products"
                  className="h-12 pl-9"
                />
              </div>
              <FilterPills<GroupFilter>
                options={GROUP_FILTERS}
                value={group}
                onChange={setGroup}
                panelId="product-list"
                label="Filter products by group"
              />
              <p className="text-center text-sm text-muted-foreground" aria-live="polite">
                Showing {visible.length} of {products.length} commodities
              </p>
            </div>

            {visible.length === 0 && (
              <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-emerald-700/30 bg-card p-10 text-center">
                <PackageSearch className="mx-auto h-10 w-10 text-emerald-700/60" aria-hidden="true" />
                <h2 className="mt-4 font-serif text-2xl font-bold text-primary">No matching commodities</h2>
                <p className="mt-2 text-muted-foreground">
                  Looking for something not listed? Tell us what you need and we will confirm what we can source.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button variant="gold" asChild>
                    <Link to="/contact#inquiry">Send an Inquiry</Link>
                  </Button>
                  <Button variant="outline" onClick={() => { setQuery(""); setGroup("all"); }}>
                    Show all products
                  </Button>
                </div>
              </div>
            )}

            <div
              id="product-list"
              role="tabpanel"
              aria-labelledby={`product-list-tab-${GROUP_FILTERS.findIndex((f) => f.value === group)}`}
              className="space-y-24"
            >
              {visible.map((product, index) => (
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
                        srcSet={product.imageSrcSet}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        alt={product.imageAlt}
                        decoding="async"
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
