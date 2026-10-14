import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, Mail, MapPin, Package, ShieldCheck, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { getProduct, productPath } from "@/data/products";
import { marketAnchor, marketsForProduct } from "@/data/markets";
import { PRIMARY_EMAIL, WHATSAPP_LINK } from "@/lib/contact";
import NotFound from "./NotFound";

const ProductDetail = () => {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  if (!product) return <NotFound />;

  const productMarkets = marketsForProduct(product.slug);
  const related = product.related.map(getProduct).filter((item) => item !== undefined);
  const quoteLink = `/contact?product=${product.slug}#inquiry`;
  const emailLink = `mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent(`Quotation request - ${product.name}`)}`;

  const facts = [
    { icon: Clock, label: "Availability", value: product.status },
    { icon: MapPin, label: "Origin", value: product.origin },
    {
      icon: ShieldCheck,
      label: "Quality",
      value: "Specifications are agreed per contract. Inspection and laboratory testing can be arranged on request.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="relative overflow-hidden bg-primary py-14 md:py-20">
          <div className="absolute inset-0 bg-grain opacity-20" />
          <div className="container relative z-10 mx-auto px-4 lg:px-8">
            <Breadcrumbs
              className="text-primary-foreground"
              items={[{ name: "Products", to: "/products" }, { name: product.name }]}
            />
            <p className="mt-8 text-sm font-medium uppercase tracking-wider text-blue-400">{product.category}</p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold text-primary-foreground md:text-5xl">
              {product.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">{product.summary}</p>
          </div>
        </section>

        <section className="bg-cream py-12 md:py-20">
          <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
            <div className="overflow-hidden rounded-2xl border border-border/40 shadow-medium lg:self-start">
              <img src={product.image} srcSet={product.imageSrcSet} sizes="(min-width: 1024px) 50vw, 100vw" alt={product.imageAlt} className="aspect-[4/3] h-full w-full object-cover" />
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft sm:p-8">
              <dl className="space-y-5">
                {facts.map((fact) => (
                  <div key={fact.label} className="relative min-h-10 pl-14">
                    <dt className="text-sm font-bold text-primary">
                      <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700" aria-hidden="true">
                        <fact.icon className="h-5 w-5" />
                      </span>
                      {fact.label}
                    </dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 grid gap-6 border-t border-border/60 pt-6 sm:grid-cols-2">
                <div>
                  <h2 className="text-sm font-bold text-primary">Grades we can source</h2>
                  <ul className="mt-2 space-y-1.5">
                    {product.grades.map((grade) => (
                      <li key={grade} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" /> {grade}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="flex items-center gap-1.5 text-sm font-bold text-primary">
                    <Package className="h-4 w-4 text-emerald-700" aria-hidden="true" /> Packaging options
                  </h2>
                  <ul className="mt-2 space-y-1.5">
                    {product.packaging.map((pack) => (
                      <li key={pack} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" /> {pack}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-muted-foreground">Packaging and minimum quantities are confirmed per order.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button variant="gold" size="lg" asChild>
                  <Link to={quoteLink}>
                    Request a Quotation <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={emailLink}>
                    <Mail className="h-5 w-5" aria-hidden="true" /> Email Us
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-12 md:py-20">
          <div className="container mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:px-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary md:text-3xl">About our {product.name.toLowerCase()} supply</h2>
              <div className="mt-5 space-y-4 leading-relaxed text-foreground/85">
                {product.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <h3 className="mt-8 text-lg font-bold text-primary">Typical buyer applications</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {product.applications.map((application) => (
                  <li key={application} className="flex items-center gap-2 text-sm text-foreground/85">
                    <Check className="h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" /> {application}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="space-y-8">
              {productMarkets.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-primary">Target markets</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Destinations where buyers commonly use this commodity. These are target markets, not confirmed customers.
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {productMarkets.map((market) => (
                      <li key={market.country}>
                        <Link
                          to={`/markets#${marketAnchor(market.country)}`}
                          className="inline-flex min-h-9 items-center rounded-full border border-emerald-700/25 bg-emerald-50 px-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
                        >
                          {market.country}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {related.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-primary">Related commodities</h2>
                  <ul className="mt-3 space-y-3">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link
                          to={productPath(item)}
                          className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-3 shadow-soft transition-shadow hover:shadow-medium"
                        >
                          <img src={item.image} srcSet={item.imageSrcSet} sizes="56px" alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" loading="lazy" decoding="async" />
                          <span className="min-w-0">
                            <span className="block font-semibold text-primary group-hover:text-emerald-800">{item.name}</span>
                            <span className="line-clamp-1 text-sm text-muted-foreground">{item.summary}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-900">
                View all products <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default ProductDetail;
