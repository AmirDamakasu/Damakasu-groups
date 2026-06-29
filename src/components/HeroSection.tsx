import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Truck, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Industrial warehouse and supply chain operations"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(1.1) contrast(1.05)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 20, 60, 0.35), rgba(0, 20, 60, 0.45))",
          }}
        />
        <div className="absolute inset-0 bg-grain opacity-20" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 lg:px-8 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 border border-secondary/30 rounded-full text-secondary text-sm font-medium mb-8">
              <Globe className="w-4 h-4" />
              Trusted Industrial Supply Partner
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Reliable Raw Material Supply
            <br />
            <span className="text-secondary">for Manufacturing Industries</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We provide manufacturers with high-quality raw materials, bulk commodities, and procurement solutions. 
            Our reliable supply chain, quality assurance processes, and efficient logistics ensure uninterrupted 
            production for your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact">
              <Button variant="hero-primary" size="xl">
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="hero" size="xl">
                View Products
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {[
            { icon: Shield, title: "Quality Assured", desc: "Certified products meeting international standards" },
            { icon: CheckCircle, title: "Reliable Supply Chain", desc: "Consistent sourcing and uninterrupted delivery" },
            { icon: Globe, title: "Global Distribution", desc: "Supplying manufacturers across multiple countries" },
            { icon: Truck, title: "Fast Logistics", desc: "On-time delivery and inventory support" },
          ].map((item, index) => (
            <div
              key={item.title}
              className="flex items-center gap-4 bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-5"
            >
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">{item.title}</h3>
                <p className="text-sm text-primary-foreground/70">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
