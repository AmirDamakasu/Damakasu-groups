import { motion } from "framer-motion";
import { Users, Globe, Package, Award } from "lucide-react";

const stats = [
  { icon: Globe, value: "40+", label: "Countries Served" },
  { icon: Package, value: "50K+", label: "Tons Exported Annually" },
  { icon: Users, value: "5,000+", label: "Partner Farmers" },
  { icon: Award, value: "15+", label: "Years of Excellence" },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 bg-secondary-foreground/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-secondary-foreground" />
              </div>
              <div className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-secondary-foreground/80 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
