import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import damakasuLogo from "/damakasu.png";

const products = [
  { name: "Sesame Seeds", href: "/products#sesame" },
  { name: "Cashew Nuts", href: "/products#cashew" },
  { name: "Soybeans", href: "/products#soybeans" },
  { name: "Industrial Grade Rice", href: "/products#rice" },
  { name: "Yellow Maize", href: "/products#maize" },
  { name: "Hibiscus Flower", href: "/products#hibiscus" },
  { name: "Coffee Beans", href: "/products#coffee" },
  { name: "Ginger", href: "/products#ginger" },
  { name: "Cocoa Beans", href: "/products#cocoa" },
];

const services = [
  { name: "Bulk Raw Material Supply", href: "/services#sourcing" },
  { name: "Strategic Sourcing", href: "/services#strategic-sourcing" },
  { name: "Quality Inspection", href: "/services#inspection" },
  { name: "Warehousing & Inventory", href: "/services#packaging" },
  { name: "Logistics & Distribution", href: "/services#logistics" },
  { name: "Procurement Consulting", href: "/services#documentation" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products", dropdown: products },
  { name: "Services", href: "/services", dropdown: services },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={damakasuLogo}
              alt="Damakasu Multi-Link Investment Ltd Logo"
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              style={{ maxHeight: "56px" }}
            />
            <div className="flex flex-col">
              <span className="font-serif text-base font-bold leading-tight text-foreground tracking-wide">DAMAKASU</span>
              <span className="text-[10px] text-muted-foreground -mt-0.5 tracking-widest uppercase font-medium">MULTI-LINK INVESTMENT LTD</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 rounded-lg hover:bg-muted ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-lg shadow-medium overflow-hidden z-50"
                    >
                      <div className="py-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/contact">
              <Button variant="gold" size="lg">
                Request a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                        location.pathname === link.href
                          ? "text-primary bg-muted"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </div>
                ))}
                <div className="pt-4 px-4">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <Button variant="gold" size="lg" className="w-full">
                      Request a Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
