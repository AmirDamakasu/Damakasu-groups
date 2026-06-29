import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import damakasuLogo from "/damakasu.png";

const WHATSAPP_LINK =
  "https://wa.me/2349160595507?text=Hello%20Damakasu%20Multi-Link%20Investiment%20Ltd.%20I%20would%20like%20to%20request%20a%20quotation.";
const LINKEDIN_LINK = "https://www.linkedin.com/in/muhammad-hassandamakasu-58079040b/";
const EMAIL = "damakasumultilinkinvestimentlimited@gmail.com";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const products = [
  { name: "Sesame Seeds", href: "/products#sesame" },
  { name: "Cashew Nuts", href: "/products#cashew" },
  { name: "Soybeans", href: "/products#soybeans" },
  { name: "Industrial Grade Rice", href: "/products#rice" },
  { name: "Yellow Maize", href: "/products#maize" },
  { name: "Hibiscus Flower", href: "/products#hibiscus" },
];

const COMPANY_NAME = "DAMAKASU MULTI-LINK INVESTIMENT LTD";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={damakasuLogo}
                alt="Damakasu Multi-Link Investment Ltd Logo"
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                style={{ maxHeight: "56px" }}
              />
              <div className="flex flex-col">
                <span className="font-serif text-base font-bold leading-tight tracking-wide">DAMAKASU</span>
                <span className="text-[10px] text-primary-foreground/70 -mt-0.5 tracking-widest uppercase font-medium">MULTI-LINK INVESTMENT LTD</span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Powering Manufacturing Through Reliable Supply Solutions. Premium industrial raw materials with quality assurance and efficient logistics.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              {/* WhatsApp */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md"
                title="Chat on WhatsApp"
              >
                <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M27.5 4.5C24.4 1.4 20.4-0.1 16.1 0 7.3.1.1 7.4.2 16.2c0 2.9.8 5.7 2.3 8.1L0 32l7.9-2.5c2.3 1.4 5 2.1 7.8 2.1h.1C24.5 31.6 31.8 24.4 31.8 15.7c.1-4.3-1.6-8.4-4.3-11.2zM15.8 29c-2.5 0-4.9-.7-7-2l-.5-.3-4.7 1.3 1.3-4.6-.4-.5C3.1 20.7 2.3 18.1 2.3 15.5 2.2 8.5 7.9 2.8 15.1 2.8c3.5 0 6.8 1.3 9.3 3.8s3.8 5.8 3.8 9.3c-.1 7-5.7 13.1-12.4 13.1zM22.4 18.9c-.4-.2-2.4-1.2-2.7-1.3-.3-.1-.6-.2-.9.2-.3.4-1.1 1.3-1.3 1.6-.2.3-.5.3-.8.2-1.7-.8-2.9-1.5-4-3.3-.3-.4.1-.4.4-1 .2-.3.1-.6 0-.8-.1-.2-.8-2.2-1.1-2.8-.3-.6-.6-.6-.8-.6h-.5c-.3 0-.7.1-1 .5-.3.4-1.2 1.2-1.2 3.2s1.3 3.9 1.5 4.1c.2.2 2.7 4.1 6.6 5.9 2.7 1.2 3.7 1.3 4.9 1.1.8-.1 2.2-.9 2.6-1.8.4-.9.4-1.7.3-1.8-.1-.3-.4-.4-.8-.6l-1.2-2.9z" fill="white"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={LINKEDIN_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#0A66C2] hover:bg-blue-500 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md"
                title="Visit LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Email */}
              <a
                href={`mailto:${EMAIL}?subject=Product%20Inquiry&body=Hello%20Damakasu%20Multi-Link%20Investiment%20Ltd.%0A%0AI%20would%20like%20to%20inquire%20about%20your%20products%20and%20request%20a%20quotation.%0A%0AThank%20you.`}
                aria-label="Email us"
                className="w-9 h-9 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md"
                title="Send us an email"
              >
                <Mail className="w-4 h-4 text-secondary-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Our Products</h4>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.name}>
                  <Link
                    to={product.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  Damakasu Multilink Investiment L.T.D<br />Damaturu LGA, Nigeria
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  Kano Dawanau Market<br />Damakasu Street, Kano
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <a href="tel:+2349037844338" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  +234 903 784 4338
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <a href="tel:+234903598893" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  +234 903 598 893
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a
                  href={`mailto:${EMAIL}?subject=Product%20Inquiry&body=Hello%20Damakasu%20Multi-Link%20Investiment%20Ltd.%0A%0AI%20would%20like%20to%20inquire%20about%20your%20products.%0A%0AThank%20you.`}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm break-all"
                >
                  damakasumultilinkinvestimentlimited@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} DAMAKASU MULTI-LINK INVESTIMENT LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
