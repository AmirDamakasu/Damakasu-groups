import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { motion, useReducedMotion } from "framer-motion";
import { HighlightsGallery } from "@/components/highlights/HighlightsGallery";
import { Target, Eye, TrendingUp, CheckSquare, Globe, Users, Award } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Quality Excellence",
    description: "Grading, sorting and quality checks against the specification agreed with each buyer.",
  },
  {
    icon: CheckSquare,
    title: "Supply Reliability",
    description: "Consistent availability of products and dependable delivery schedules for uninterrupted production.",
  },
  {
    icon: TrendingUp,
    title: "Transparency",
    description: "Clear communication, full documentation, and end-to-end traceability for every shipment.",
  },
  {
    icon: Eye,
    title: "Customer Success",
    description: "Helping manufacturers optimize procurement, reduce costs, and improve production efficiency.",
  },
  {
    icon: Globe,
    title: "Market Reach",
    description: "Connecting produce sourced in Nigeria with domestic buyers and international markets.",
  },
  {
    icon: Award,
    title: "Compliance & Documentation",
    description: "Trade documentation prepared for every order, with inspection and testing arranged as contracts require.",
  },
];

const team = [
  {
    name: "Alhaji Hassan Damakasu",
    role: "Founder, Managing Director & Chief Executive Officer (MD/CEO)",
    image: "/images/team/ceo.jpg",
  },
];

const About = () => {
  const reduceMotion = useReducedMotion();

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
                initial={false}
                animate={{ opacity: 1 }}
                className="text-blue-400 font-medium text-sm uppercase tracking-wider"
              >
                About Us
              </motion.span>
              <motion.h1
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-3 mb-6"
              >
                Your Trusted Manufacturing Supply Partner
              </motion.h1>
              <motion.p
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary-foreground/80 text-lg leading-relaxed"
              >
                We specialize in sourcing, procurement, storage, and distribution of high-quality industrial
                and agricultural raw materials for manufacturers worldwide.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="overflow-x-clip py-24 bg-gradient-earth bg-grain">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">DAMAKASU MULTI-LINKS INVESTMENT LTD</strong> was built on a legacy of hard work,
                    trust, and entrepreneurial vision.
                  </p>
                  <p>
                    Our journey began in <strong className="text-foreground">2003</strong>, when our founder started as an independent
                    trader, buying and selling agricultural commodities and general merchandise across local
                    markets in Nigeria. Through honesty, consistency, and strong relationships with farmers,
                    suppliers, and customers, the business steadily expanded and earned a reputation for
                    reliability.
                  </p>
                  <p>
                    As demand grew and new opportunities emerged in domestic and international trade, the
                    business was formally incorporated as{" "}
                    <strong className="text-foreground">DAMAKASU MULTI-LINKS INVESTMENT LTD</strong> in{" "}
                    <strong className="text-foreground">2015</strong>. This milestone marked our transformation
                    into a professionally managed company dedicated to delivering high-quality products and
                    dependable business solutions.
                  </p>
                  <p>
                    Today, we operate across multiple sectors, with a strong focus on the sourcing,
                    procurement, and supply of premium agricultural commodities—including{" "}
                    <strong className="text-foreground">
                      including Sesame Seeds, Ginger, Cashew Nuts, Cocoa Beans, Soybeans, Sorghum, Pearl Millet, Hibiscus Flowers, and other export-grade products
                    </strong>. We also provide general procurement, import and export services, construction
                    supplies, and strategic business solutions to clients in Nigeria and international markets.
                  </p>
                  <p>
                    Our success is driven by long-term partnerships with trusted farmers, cooperatives,
                    processors, manufacturers, and logistics partners. Every order is sourced and handled to the
                    quality specification agreed with the buyer, with delivery timelines and pricing confirmed in
                    writing.
                  </p>
                  <p>
                    As we continue to grow, we remain committed to the values that have guided us since
                    2003—{" "}
                    <strong className="text-foreground">
                      Integrity, Quality, Reliability, Excellence, and Customer Satisfaction
                    </strong>.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                <div className="bg-card rounded-2xl p-8 shadow-soft text-center">
                  <div className="font-serif text-4xl font-bold text-primary mb-2">22+</div>
                  <div className="text-muted-foreground text-sm">Years Trading Experience</div>
                  <div className="text-muted-foreground/60 text-xs mt-1">Since 2003</div>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-soft text-center">
                  <div className="font-serif text-4xl font-bold text-primary mb-2">2015</div>
                  <div className="text-muted-foreground text-sm">Official Company Registration</div>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-soft text-center">
                  <div className="font-serif text-4xl font-bold text-primary mb-2">Global</div>
                  <div className="text-muted-foreground text-sm">Import &amp; Export Operations</div>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-soft text-center">
                  <div className="font-serif text-4xl font-bold text-primary mb-2">Trusted</div>
                  <div className="text-muted-foreground text-sm">Farmers, Suppliers &amp; Partners</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-primary rounded-2xl p-10"
              >
                <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary-foreground mb-4">Our Mission</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  To provide high-quality products and dependable business solutions through ethical sourcing,
                  efficient supply chains, innovation, and exceptional customer service, contributing to
                  economic growth both locally and internationally.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-earth rounded-2xl p-10"
              >
                <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-accent-foreground mb-4">Our Vision</h3>
                <p className="text-accent-foreground/80 leading-relaxed">
                  To become one of Africa's leading diversified trading and investment companies, connecting
                  local producers with global markets while delivering sustainable value to our customers,
                  partners, and communities.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-gradient-earth bg-grain">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-secondary font-medium text-sm uppercase tracking-wider"
              >
                Our Values
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3"
              >
                The Principles That Drive Us
              </motion.h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 shadow-soft border border-border/50"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-card-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section
          className="relative overflow-hidden bg-cream py-20 md:py-28"
          aria-labelledby="leadership-heading"
        >
          {/* Faint dot pattern and soft background shapes */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: "radial-gradient(hsl(var(--primary) / 0.12) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-700/5 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-secondary/5 blur-3xl"
            aria-hidden="true"
          />

          <div className="container relative mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
            >
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">
                Our Leadership
              </p>
              <h2
                id="leadership-heading"
                className="mt-4 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl"
              >
                Meet the Person Behind Our Vision
              </h2>
              <div className="mx-auto mt-6 h-1 w-14 rounded-full bg-emerald-700" aria-hidden="true" />
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Led by experienced management, Damakasu Multi-Link Investment Ltd is committed to building
                trusted agricultural supply partnerships and connecting Nigerian commodities with global markets.
              </p>
            </motion.div>

            {team.map((member) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="group mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-shadow duration-300 hover:shadow-medium"
              >
                <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div className="relative bg-gradient-to-b from-emerald-50 to-cream p-6 sm:p-8 md:p-10">
                    <div className="relative mx-auto max-w-[280px] md:max-w-none">
                      <div
                        className="absolute -inset-2 rounded-[1.75rem] border border-emerald-700/15"
                        aria-hidden="true"
                      />
                      <div className="relative aspect-[1117/1306] overflow-hidden rounded-2xl bg-muted shadow-soft ring-4 ring-white">
                        <img
                          src={member.image}
                          srcSet={`${member.image.replace(/\.jpg$/, "-640.webp")} 640w, ${member.image.replace(/\.jpg$/, ".webp")} 900w`}
                          sizes="(min-width: 768px) 400px, 280px"
                          alt={`Portrait of ${member.name}, ${member.role}`}
                          width={1117}
                          height={1306}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-col justify-center border-t border-border/60 p-8 text-center sm:p-10 md:border-t-0 md:p-12 md:pl-[calc(3rem+4px)] md:text-left lg:p-14 lg:pl-[calc(3.5rem+4px)]">
                    {/* Green divider with a very slow, barely-there glow. */}
                    <span
                      className="absolute inset-y-0 left-0 hidden w-1 bg-emerald-700 md:block md:animate-accent-breathe motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
                      Founder &amp; MD/CEO
                    </p>
                    <h3 className="mt-3 font-serif text-2xl font-bold leading-tight text-primary sm:text-3xl lg:text-4xl">
                      {member.name}
                    </h3>
                    <p className="mt-3 text-base font-medium leading-relaxed text-muted-foreground">
                      {member.role}
                    </p>

                    <div className="my-8 h-px w-full bg-border" aria-hidden="true" />

                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
                      Our leadership principle
                    </p>
                    <p className="mt-3 text-lg leading-relaxed text-foreground md:text-xl">
                      Building trusted partnerships through responsible sourcing, dependable supply, and long-term
                      business relationships.
                    </p>
                    <p className="mt-8 text-sm font-semibold text-primary">Damakasu Multi-Link Investment Ltd</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <HighlightsGallery />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default About;
