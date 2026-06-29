import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-earth relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 bg-grain opacity-20" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold-light font-medium text-sm uppercase tracking-wider"
          >
            Secure Your Supply
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-accent-foreground mt-3 mb-6"
          >
            Secure Your Raw Material Supply
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-accent-foreground/80 text-lg mb-10"
          >
            Whether you are a manufacturer, processor, distributor, or procurement manager, we provide reliable 
            sourcing and supply solutions that support your production goals and business growth.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact">
              <Button variant="gold" size="xl">
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="tel:+2341234567890">
              <Button
                variant="outline"
                size="xl"
                className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
