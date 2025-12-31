import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, Eye, Heart, TrendingUp, Users, Award, Globe, Leaf } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "Rigorous quality control at every stage ensures only premium products reach our partners worldwide.",
  },
  {
    icon: Heart,
    title: "Farmer Empowerment",
    description: "Fair trade practices that support local farming communities and sustainable livelihoods.",
  },
  {
    icon: TrendingUp,
    title: "Market Access",
    description: "Opening global opportunities for African agricultural products to reach international buyers.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Complete traceability from farm to destination with full documentation and reporting.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Environmentally responsible practices that protect our planet for future generations.",
  },
  {
    icon: Globe,
    title: "Global Standards",
    description: "Compliance with international trade regulations and quality certifications.",
  },
];

const team = [
  { name: "Adewale Okonkwo", role: "Chief Executive Officer" },
  { name: "Fatima Al-Hassan", role: "Director of Operations" },
  { name: "Emmanuel Mensah", role: "Head of Quality Assurance" },
  { name: "Sarah Williams", role: "International Trade Manager" },
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
                Bridging Continents Through Agricultural Excellence
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary-foreground/80 text-lg leading-relaxed"
              >
                For over a decade, AgroExport Global Trade Co. has been at the forefront of agricultural trade, 
                connecting local farmers to international markets with integrity and excellence.
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
                    Founded in 2009, AgroExport Global Trade Co. began with a simple mission: to bridge the gap 
                    between African farmers and global markets. What started as a small operation has grown into 
                    one of the region's most trusted agricultural export companies.
                  </p>
                  <p>
                    Today, we work with over 5,000 partner farmers across West Africa, exporting premium agricultural 
                    products to more than 40 countries. Our commitment to quality, sustainability, and fair trade 
                    practices has earned us recognition as an industry leader.
                  </p>
                  <p>
                    We believe that agriculture is not just a business—it's a pathway to economic development, 
                    food security, and sustainable growth for communities across Africa and beyond.
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
                  <div className="font-serif text-4xl font-bold text-primary mb-2">5K+</div>
                  <div className="text-muted-foreground text-sm">Partner Farmers</div>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-soft text-center">
                  <div className="font-serif text-4xl font-bold text-primary mb-2">50K</div>
                  <div className="text-muted-foreground text-sm">Tons Annually</div>
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
                  To empower farmers, ensure food security, and expand global trade by delivering high-quality 
                  agricultural products to international buyers while maintaining sustainable and ethical business 
                  practices that benefit all stakeholders.
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
                  To become Africa's leading agricultural export company, recognized globally for quality, 
                  reliability, and positive impact on farming communities, setting the standard for 
                  sustainable agricultural trade worldwide.
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
                What Drives Us Forward
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
            <div className="max-w-2xl mx-auto text-center mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-secondary font-medium text-sm uppercase tracking-wider"
              >
                Leadership
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3"
              >
                Meet Our Team
              </motion.h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
