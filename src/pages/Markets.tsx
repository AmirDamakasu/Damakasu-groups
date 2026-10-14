import { Link } from "react-router-dom";
import { ArrowRight, Globe2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarketsSection } from "@/components/MarketsSection";
import { Button } from "@/components/ui/button";
import { markets, marketAnchor } from "@/data/markets";
import { getProduct, productPath } from "@/data/products";

const Markets = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-20">
      <section className="relative overflow-hidden bg-primary py-14 md:py-20">
        <div className="absolute inset-0 bg-grain opacity-20" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <Breadcrumbs className="text-primary-foreground" items={[{ name: "Markets" }]} />
          <h1 className="mt-8 max-w-3xl font-serif text-4xl font-bold text-primary-foreground md:text-5xl">
            International Markets for Nigerian Agricultural Commodities
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-primary-foreground/80">
            We source agricultural commodities in Nigeria for buyers at home and abroad. Below are the
            international markets we focus on and the commodities buyers there commonly use. They are target
            markets, not a list of existing customers or export contracts.
          </p>
        </div>
      </section>

      <MarketsSection cta={{ label: "Discuss your market with us", to: "/contact#inquiry" }} />

      <section className="bg-cream py-16 md:py-24" aria-labelledby="market-details-heading">
        <div className="container mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">Market by market</p>
            <h2 id="market-details-heading" className="mt-3 font-serif text-3xl font-bold text-primary md:text-4xl">
              Commodities and buyer applications
            </h2>
            <p className="mt-4 text-muted-foreground">
              Buyers in Nigeria and elsewhere can request any commodity in our range — these are the typical
              matches between market and product.
            </p>
          </div>

          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {markets.map((market) => (
              <li
                key={market.country}
                id={marketAnchor(market.country)}
                className="scroll-mt-28 rounded-2xl border border-border/60 bg-card p-6 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Globe2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">{market.country}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{market.use}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Relevant commodities</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {market.products.map(getProduct).filter((product) => product !== undefined).map((product) => (
                    <li key={product.slug}>
                      <Link
                        to={productPath(product)}
                        className="inline-flex min-h-9 items-center rounded-full border border-emerald-700/25 bg-emerald-50 px-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
                      >
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="mt-14 rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">Buying for a market not listed here?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/80">
              Tell us the commodity, quantity, specification and destination, and we will confirm what we can source.
            </p>
            <Button variant="gold" size="lg" className="mt-6" asChild>
              <Link to="/contact#inquiry">
                Request a Quotation <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    <FloatingWhatsApp />
  </div>
);

export default Markets;
