import { motion } from "framer-motion";
import { Target, Eye, TrendingUp, CheckSquare } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Quality Excellence",
    description: "Strict inspection and quality control procedures at every stage of the supply chain.",
  },
  {
    icon: CheckSquare,
    title: "Supply Reliability",
    description: "Consistent availability of products and dependable delivery schedules for uninterrupted production.",
  },
  {
    icon: TrendingUp,
    title: "Transparency",
    description: "Clear communication, full documentation, and end-to-end traceability for every order.",
  },
  {
    icon: Eye,
    title: "Customer Success",
    description: "Helping manufacturers optimize procurement and improve production efficiency.",
  },
];

export function AboutSection() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform origin-top-right" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-secondary font-medium text-sm uppercase tracking-wider"
            >
              About Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-3 mb-6"
            >
              Your Trusted Manufacturing Supply Partner
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/80 text-lg leading-relaxed mb-8"
            >
              We specialize in sourcing, procurement, storage, and distribution of high-quality industrial and agricultural 
              raw materials for manufacturers worldwide. Through strategic supplier partnerships, strict quality control, 
              and efficient logistics management, we help businesses maintain stable production and reduce supply-chain risks.
            </motion.p>

            {/* Mission & Vision */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-6"
              >
                <h3 className="font-serif text-xl font-semibold text-primary-foreground mb-2">Our Mission</h3>
                <p className="text-primary-foreground/70 text-sm">
                  To support manufacturers with reliable access to quality raw materials through efficient sourcing, 
                  strategic partnerships, and world-class supply-chain solutions.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-6"
              >
                <h3 className="font-serif text-xl font-semibold text-primary-foreground mb-2">Our Vision</h3>
                <p className="text-primary-foreground/70 text-sm">
                  To become a leading global supplier recognized for reliability, product quality, 
                  and long-term industrial partnerships.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Content - Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-primary-foreground rounded-2xl p-6 shadow-soft"
              >
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
