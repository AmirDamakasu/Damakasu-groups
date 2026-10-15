import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Truck, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-farm.webp";
import heroImageSmall from "@/assets/hero-farm-800.webp";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          srcSet={`${heroImageSmall} 800w, ${heroImage} 1600w`}
          sizes="100vw"
          alt=""
          {...{ fetchpriority: "high" }}
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
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 border border-secondary/30 rounded-full text-blue-300 text-sm font-medium mb-8">
              <Globe className="w-4 h-4" />
              Trusted Industrial Supply Partner
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Nigerian Agricultural Commodity
            <br />
            <span className="text-blue-400">Sourcing and Supply</span>
          </motion.h1>

          <motion.p
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Damakasu Multi-Link Investment Ltd sources sesame seeds, soybeans, sorghum, ginger, dried hibiscus
            and other agricultural commodities in Nigeria for processors, manufacturers and international buyers —
            with specifications, quality checks and logistics agreed for every order.
          </motion.p>

          <motion.div
            initial={{ y: 12 }}
            animate={{ y: 0 }}
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
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {[
            { icon: Shield, title: "Quality to Specification", desc: "Grades and quality limits agreed in every contract" },
            { icon: CheckCircle, title: "Direct Sourcing", desc: "Commodities sourced in northern Nigeria" },
            { icon: Globe, title: "Domestic & Export Buyers", desc: "Serving buyers in Nigeria and abroad" },
            { icon: Truck, title: "Coordinated Logistics", desc: "Packing, documents and shipment arranged per order" },
          ].map((item, index) => (
            <div
              key={item.title}
              className="flex items-center gap-4 bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-5"
            >
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">{item.title}</p>
                <p className="text-sm text-primary-foreground/70">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
