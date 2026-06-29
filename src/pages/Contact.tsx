import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { motion } from "framer-motion";
import { useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Mail, Phone, MapPin, Clock, Send, ExternalLink,
  CheckCircle, AlertCircle, Loader2,
} from "lucide-react";
import { sanitizeFormData, isValidEmail, isValidPhone } from "@/lib/sanitize";

const WHATSAPP_LINK =
  "https://wa.me/2349160595507?text=Hello%20Damakasu%20Multi-Link%20Investiment%20Ltd.%20I%20would%20like%20to%20request%20a%20quotation.";
const LINKEDIN_LINK = "https://www.linkedin.com/in/muhammad-hassandamakasu-58079040b/";

// Supabase Edge Function URL — filled in after deployment
const EDGE_FUNCTION_URL =
  import.meta.env.VITE_SUPABASE_URL
    ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-quote`
    : null;

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "";

const contactInfo = [
  { icon: MapPin, title: "Head Office", details: ["Damakasu Multilink Investiment L.T.D", "Damaturu LGA, Nigeria"] },
  { icon: MapPin, title: "Kano Office", details: ["Kano Dawanau Market", "Damakasu Street, Kano"] },
  { icon: Phone, title: "Call Us", details: ["+234 903 784 4338", "+234 903 598 893"] },
  { icon: Mail, title: "Email Us", details: ["damakasumultilinkinvestmentlimited@gmail.com"] },
  { icon: Clock, title: "Business Hours", details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 2:00 PM"] },
];

const EMPTY_FORM = { name: "", email: "", company: "", phone: "", product: "", message: "" };

// ─── Inner form component (uses reCAPTCHA hook) ────────────────
function QuoteForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { toast } = useToast();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) errs.name = "Full name is required (min 2 characters).";
    if (!isValidEmail(formData.email)) errs.email = "A valid email address is required.";
    if (formData.phone && !isValidPhone(formData.phone)) errs.phone = "Phone number format is invalid.";
    if (!formData.message.trim() || formData.message.trim().length < 10) errs.message = "Please describe your requirements (min 10 characters).";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // 1. Sanitize
      const clean = sanitizeFormData(formData);

      // 2. reCAPTCHA token
      let recaptchaToken = "";
      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha("quote_form");
      }

      // 3. Submit to Edge Function (if configured) or fallback
      if (EDGE_FUNCTION_URL) {
        const res = await fetch(EDGE_FUNCTION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
          },
          body: JSON.stringify({ ...clean, recaptchaToken }),
        });

        const json = await res.json();

        if (!res.ok) {
          toast({
            title: "Submission Failed",
            description: json.error ?? "Something went wrong. Please try again.",
            variant: "destructive",
          });
          return;
        }
      } else {
        // Development fallback — simulate 1s delay
        console.info("[Dev] Edge Function not configured. Would submit:", clean);
        await new Promise((r) => setTimeout(r, 1000));
      }

      setSubmitted(true);
      setFormData(EMPTY_FORM);
    } catch (err) {
      console.error(err);
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Success screen ────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl p-10 shadow-medium border border-border/50 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-9 h-9 text-green-600" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Message Sent!</h2>
        <p className="text-muted-foreground leading-relaxed mb-2">
          Thank you for your inquiry. Our sales team will contact you within 24 hours.
        </p>
        <p className="text-muted-foreground text-sm mb-6">
          A confirmation email has been sent to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="gold" onClick={() => setSubmitted(false)}>
            Submit Another Request
          </Button>
          <Button variant="outline" asChild>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </motion.div>
    );
  }

  // ─── Form ──────────────────────────────────────────────────
  const Field = ({ id, error }: { id: string; error?: string }) =>
    error ? (
      <p className="flex items-center gap-1 text-red-600 text-xs mt-1">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
      </p>
    ) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="bg-card rounded-2xl p-8 md:p-10 shadow-medium border border-border/50">
        <h2 className="font-serif text-2xl font-bold text-card-foreground mb-2">Request a Quote</h2>
        <p className="text-muted-foreground text-sm mb-6">
          All submissions are encrypted, stored securely, and responded to within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange}
                placeholder="John Doe" className={fieldErrors.name ? "border-red-400" : ""} />
              <Field id="name" error={fieldErrors.name} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                placeholder="john@company.com" className={fieldErrors.email ? "border-red-400" : ""} />
              <Field id="email" error={fieldErrors.email} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" name="company" value={formData.company} onChange={handleChange}
                placeholder="Your Company Ltd." />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange}
                placeholder="+234 900 000 0000" className={fieldErrors.phone ? "border-red-400" : ""} />
              <Field id="phone" error={fieldErrors.phone} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="product">Product of Interest</Label>
            <select id="product" name="product" value={formData.product} onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option value="">Select a product / raw material</option>
              <option value="Sesame Seeds">Sesame Seeds</option>
              <option value="Cashew Nuts">Cashew Nuts</option>
              <option value="Soybeans">Soybeans</option>
              <option value="Industrial Grade Rice">Industrial Grade Rice</option>
              <option value="Yellow Maize">Yellow Maize</option>
              <option value="Hibiscus Flower">Hibiscus Flower</option>
              <option value="Coffee Beans">Coffee Beans</option>
              <option value="Ginger">Ginger</option>
              <option value="Cocoa Beans">Cocoa Beans</option>
              <option value="Multiple Raw Materials">Multiple Raw Materials</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">Message *</Label>
            <Textarea id="message" name="message" value={formData.message} onChange={handleChange}
              placeholder="Describe your requirements, quantities, delivery location, and any specific needs…"
              rows={5} className={fieldErrors.message ? "border-red-400" : ""} />
            <Field id="message" error={fieldErrors.message} />
          </div>

          <p className="text-xs text-muted-foreground">
            🔒 Protected by Google reCAPTCHA v3. Your data is encrypted in transit and stored securely.
          </p>

          <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
            ) : (
              <>Send Message <Send className="w-5 h-5" /></>
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────
const Contact = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20">
          {/* Hero */}
          <section className="py-24 bg-primary relative overflow-hidden">
            <div className="absolute inset-0 bg-grain opacity-20" />
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-secondary font-medium text-sm uppercase tracking-wider">
                  Contact Us
                </motion.span>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-3 mb-6">
                  Let's Start a Conversation
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-primary-foreground/80 text-lg leading-relaxed">
                  Ready to secure your raw material supply? Get in touch with our procurement team
                  to discuss your manufacturing requirements and receive a customized quote.
                </motion.p>
              </div>
            </div>
          </section>

          {/* Connect With Us */}
          <section className="py-16 bg-background border-b border-border/40">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-10">
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-serif text-3xl font-bold text-foreground mb-3">
                  Connect With Us
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="text-muted-foreground">
                  Speak directly with our team for product inquiries, quotations, partnerships, and bulk commodity supply requirements.
                </motion.p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {/* WhatsApp */}
                <motion.a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="group flex flex-col items-center gap-5 bg-card border border-border/40 hover:border-green-400/40 rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 text-center cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 32 32" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#25D366"/>
                      <path d="M23.5 8.5C21.5 6.5 18.9 5.4 16.1 5.4C10.4 5.4 5.8 10 5.8 15.7C5.8 17.6 6.3 19.4 7.3 21L5.7 26.4L11.2 24.8C12.7 25.7 14.4 26.2 16.1 26.2C21.8 26.2 26.4 21.6 26.4 15.9C26.4 13.1 25.5 10.5 23.5 8.5Z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-1 group-hover:text-green-600 transition-colors">WhatsApp Business</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">Chat directly with our sales team for instant assistance.</p>
                    <span className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200">
                      Chat on WhatsApp <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.a>

                {/* LinkedIn */}
                <motion.a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.2 }}
                  className="group flex flex-col items-center gap-5 bg-card border border-border/40 hover:border-blue-500/40 rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 text-center cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 32 32" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="32" height="32" rx="6" fill="#0A66C2"/>
                      <path d="M10.5 13H7V25H10.5V13ZM8.75 11.5C9.85 11.5 10.75 10.6 10.75 9.5C10.75 8.4 9.85 7.5 8.75 7.5C7.65 7.5 6.75 8.4 6.75 9.5C6.75 10.6 7.65 11.5 8.75 11.5ZM25.25 25H21.75V19.2C21.75 17.8 21.7 16 19.8 16C17.9 16 17.6 17.5 17.6 19.1V25H14.1V13H17.4V14.6H17.45C17.9 13.8 18.9 12.9 20.4 12.9C23.9 12.9 24.5 15.3 24.5 18.3V25H25.25Z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-1 group-hover:text-blue-600 transition-colors">LinkedIn</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">Connect with our company and stay updated on our latest products.</p>
                    <span className="inline-flex items-center gap-2 bg-[#0A66C2] hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200">
                      Visit LinkedIn <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.a>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-24 bg-gradient-earth bg-grain">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid lg:grid-cols-5 gap-12">
                {/* Contact Info */}
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
                    <p className="text-muted-foreground">
                      Have questions about our products or services? We're here to help.
                    </p>
                  </div>
                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <motion.div key={info.title}
                        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                          {info.details.map((d) => (
                            <p key={d} className="text-muted-foreground text-sm">{d}</p>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quote Form */}
                <div className="lg:col-span-3">
                  <QuoteForm />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default Contact;
