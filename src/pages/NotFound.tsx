import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Button } from "@/components/ui/button";
import { products, productPath } from "@/data/products";

const helpfulLinks = [
  { name: "Products", to: "/products" },
  { name: "Markets", to: "/markets" },
  { name: "Services", to: "/services" },
  { name: "About Us", to: "/about" },
  { name: "Contact Us", to: "/contact" },
];

const NotFound = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-20">
      <section className="bg-cream py-20 md:py-28">
        <div className="container mx-auto max-w-3xl px-4 text-center lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-700">Error 404</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-primary md:text-5xl">Page not found</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            The page you were looking for has moved or doesn't exist. These links should help you find what you need.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="gold" size="lg" asChild>
              <Link to="/">Go to the homepage <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact#inquiry">Request a Quotation</Link>
            </Button>
          </div>

          <nav aria-label="Helpful links" className="mt-12 grid gap-8 text-left sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary">Explore</h2>
              <ul className="mt-3 space-y-2">
                {helpfulLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-emerald-700 underline-offset-4 hover:underline">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary">Popular commodities</h2>
              <ul className="mt-3 space-y-2">
                {products.slice(0, 6).map((product) => (
                  <li key={product.slug}>
                    <Link to={productPath(product)} className="text-emerald-700 underline-offset-4 hover:underline">{product.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </main>
    <Footer />
    <FloatingWhatsApp />
  </div>
);

export default NotFound;
