import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { motion } from "framer-motion";
import { Target, Eye, TrendingUp, CheckSquare, Globe, Users, Award } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Quality Excellence",
    description: "Strict inspection and quality control procedures at every stage ensure only certified products reach our clients.",
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
    title: "Global Reach",
    description: "Established distribution networks and supplier relationships spanning multiple continents.",
  },
  {
    icon: Award,
    title: "Compliance & Standards",
    description: "Full compliance with international trade regulations, quality certifications, and industry standards.",
  },
];

const team = [
  {
    name: "Alhaji Hassan Damakasu",
    role: "Chief Executive Officer",
    image: "/images/team/ceo.jpg",
  },
  {
    name: "Yarima Bukar",
    role: "Director of Operations",
    image: "/images/team/operations-director.jpg",
  },
  {
    name: "Muhammad Hassan Damakasu",
    role: "Head of Quality Assurance",
    image: "/images/team/quality-head.jpg",
  },
  {
    name: "Nasiru Adamu",
    role: "Procurement & Supply Chain Manager",
    image: "/images/team/procurement-manager.jpg",
  },
];

const About = () => {
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
                About Us
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-3 mb-6"
              >
                Your Trusted Manufacturing Supply Partner
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
        <section className="py-24 bg-gradient-earth bg-grain">
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
                    Founded in 2009, RawMat Global Supply Co. began with a clear mission: to bridge the gap 
                    between raw material suppliers and manufacturing industries worldwide. What started as a 
                    focused commodity trading operation has grown into one of the region's most trusted 
                    industrial supply companies.
                  </p>
                  <p>
                    Today, we serve over 100 manufacturing clients across 40+ countries, supplying more than 
                    50,000 metric tons of industrial and agricultural raw materials annually. Our commitment to 
                    quality, supply reliability, and procurement excellence has earned us long-term partnerships 
                    with leading manufacturers, processors, and FMCG companies.
                  </p>
                  <p>
                    We believe that reliable raw material supply is the backbone of manufacturing success. 
                    Our integrated procurement approach helps businesses reduce supply-chain risk, optimize 
                    costs, and maintain uninterrupted production.
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
                  <div className="font-serif text-4xl font-bold text-primary mb-2">15+</div>
                  <div className="text-muted-foreground text-sm">Years of Excellence</div>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-soft text-center">
                  <div className="font-serif text-4xl font-bold text-primary mb-2">40+</div>
                  <div className="text-muted-foreground text-sm">Countries Served</div>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-soft text-center">
                  <div className="font-serif text-4xl font-bold text-primary mb-2">100+</div>
                  <div className="text-muted-foreground text-sm">Manufacturing Clients</div>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-soft text-center">
                  <div className="font-serif text-4xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-muted-foreground text-sm">Metric Tons Annually</div>
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
                  To support manufacturers with reliable access to quality raw materials through efficient sourcing, 
                  strategic partnerships, and world-class supply-chain solutions that enable uninterrupted production 
                  and sustainable business growth.
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
                  To become a leading global supplier recognized for reliability, product quality, 
                  and long-term industrial partnerships — setting the benchmark for procurement excellence 
                  in manufacturing supply chains worldwide.
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

        {/* Team */}
        <section className="py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-secondary font-medium text-sm uppercase tracking-wider"
              >
                LEADERSHIP
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4"
              >
                Meet Our Team
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-base max-w-2xl mx-auto"
              >
                Our experienced leadership team is committed to delivering reliable agricultural commodities and industrial raw materials to manufacturers, processors, and global buyers.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card rounded-2xl p-8 border border-border/40 shadow-soft hover:shadow-medium hover:border-secondary/20 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-background shadow-soft mb-6 transition-all duration-300 group-hover:shadow-medium shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-1 group-hover:text-secondary transition-colors line-clamp-1">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed flex-grow">
                    {member.role}
                  </p>
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

export default About;
