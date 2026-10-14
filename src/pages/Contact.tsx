import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail, Phone, MapPin, Clock, Send, ExternalLink, Navigation,
  CheckCircle, AlertCircle, Loader2, ArrowRight,
} from "lucide-react";
import { sanitizeFormData, isValidEmail, isValidPhone } from "@/lib/sanitize";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { FunctionsHttpError } from "@supabase/supabase-js";
import {
  COMPANY_NAME, PRIMARY_EMAIL, PRIMARY_EMAIL_HREF, SECONDARY_EMAIL, SECONDARY_EMAIL_HREF,
  PHONES, LOCATIONS, WHATSAPP_LINK,
} from "@/lib/contact";
import { products as catalog, getProduct } from "@/data/products";

const LINKEDIN_LINK = "https://www.linkedin.com/in/muhammad-hassandamakasu-58079040b/";


const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "";

const INQUIRY_TYPES = [
  "Product Inquiry",
  "Request a Quotation",
  "Supply Partnership",
  "Export & Logistics",
  "Other Business Opportunity",
];

const PRODUCTS = [...catalog.map((product) => product.name), "Multiple Raw Materials"];

const EMPTY_FORM = {
  name: "", email: "", company: "", phone: "", inquiryType: "", product: "",
  quantity: "", destination: "", specifications: "", message: "",
};

type FormState = typeof EMPTY_FORM;

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const cardClass =
  "rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-shadow duration-300 hover:shadow-medium sm:p-7";

const iconWrapClass = "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700";

// Builds a mailto link carrying the visitor's form content, used when the online form can't deliver.
const buildEmailFallback = (data: FormState) => {
  const subject = `${data.inquiryType || "Business Inquiry"} - ${data.name || COMPANY_NAME}`;
  const details = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.company && `Company: ${data.company}`,
    data.inquiryType && `Inquiry type: ${data.inquiryType}`,
    data.product && `Product of interest: ${data.product}`,
    data.quantity && `Quantity: ${data.quantity}`,
    data.destination && `Destination country: ${data.destination}`,
    data.specifications && `Specification requirements: ${data.specifications}`,
  ].filter(Boolean);
  const body = `${details.join("\n")}\n\n${data.message}`;
  return `mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// ─── Inner form component (uses reCAPTCHA hook) ────────────────
function QuoteForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState(() => {
    // Product pages link here with ?product=<slug> so the buyer doesn't have to pick it again.
    const product = getProduct(searchParams.get("product") ?? "");
    return product ? { ...EMPTY_FORM, product: product.name, inquiryType: "Request a Quotation" } : EMPTY_FORM;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<{ message: string; fallbackHref: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) errs.name = "Full name is required (min 2 characters).";
    if (!isValidEmail(formData.email)) errs.email = "A valid business email address is required.";
    if (formData.phone && !isValidPhone(formData.phone)) errs.phone = "Phone number format is invalid.";
    if (!formData.inquiryType) errs.inquiryType = "Please select an inquiry type.";
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
    setSubmitError(null);
    if (!validate()) return;

    const fallbackHref = buildEmailFallback(formData);

    // No backend configured: never pretend the message was delivered.
    if (!isSupabaseConfigured) {
      setSubmitError({
        message: "Our online form is temporarily unavailable, so your message has not been sent.",
        fallbackHref,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { inquiryType, quantity, destination, specifications, ...rest } = sanitizeFormData(formData);

      let recaptchaToken = "";
      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha("quote_form");
      }

      // The backend stores a fixed set of fields, so the extra inquiry details travel with the message.
      const details = [
        `Inquiry type: ${inquiryType}`,
        quantity && `Quantity: ${quantity}`,
        destination && `Destination country: ${destination}`,
        specifications && `Specification requirements: ${specifications}`,
      ].filter(Boolean).join("\n");
      const payload = { ...rest, message: `${details}\n\n${rest.message}`, recaptchaToken };

      // functions.invoke sends the apikey and Authorization headers the Edge Function gateway expects.
      const { data: json, error: invokeError } = await supabase.functions.invoke("submit-quote", { body: payload });

      if (invokeError) {
        let reason = "Something went wrong";
        if (invokeError instanceof FunctionsHttpError) {
          const body = await invokeError.context.json().catch(() => ({}));
          reason = body.error ?? reason;
        } else {
          reason = "We couldn't reach our server";
        }
        setSubmitError({ message: `${reason} — your message has not been sent.`, fallbackHref });
        return;
      }

      if (!json?.success) {
        setSubmitError({ message: "The server did not confirm your message, so it may not have been sent.", fallbackHref });
        return;
      }

      setSuccessMessage(json.message ?? "Thank you for your inquiry. Our team will be in touch.");
      setFormData(EMPTY_FORM);
    } catch {
      setSubmitError({
        message: "We couldn't reach our server, so your message has not been sent.",
        fallbackHref,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Success screen (only after the server confirms receipt) ───
  if (successMessage) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-border/50 bg-card p-10 text-center shadow-medium"
        role="status"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle className="h-9 w-9 text-emerald-700" aria-hidden="true" />
        </div>
        <h2 className="mb-2 font-serif text-2xl font-bold text-foreground">Message Sent</h2>
        <p className="mb-6 leading-relaxed text-muted-foreground">{successMessage}</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="gold" onClick={() => setSuccessMessage(null)}>
            Send Another Inquiry
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

  const fieldError = (id: string) =>
    fieldErrors[id] ? (
      <p id={`${id}-error`} className="mt-1 flex items-center gap-1 text-xs text-red-600">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {fieldErrors[id]}
      </p>
    ) : null;

  const errorProps = (id: string) => ({
    "aria-invalid": Boolean(fieldErrors[id]),
    "aria-describedby": fieldErrors[id] ? `${id}-error` : undefined,
    className: fieldErrors[id] ? "border-red-400" : "",
  });

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-medium sm:p-8 md:p-10">
      <h2 className="mb-2 font-serif text-2xl font-bold text-card-foreground">Send an Inquiry</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Fields marked * are required. We reply to business inquiries as quickly as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" name="name" autoComplete="name" value={formData.name} onChange={handleChange}
              placeholder="John Doe" {...errorProps("name")} />
            {fieldError("name")}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Business Email *</Label>
            <Input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange}
              placeholder="john@company.com" {...errorProps("email")} />
            {fieldError("email")}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={handleChange}
              placeholder="+234 900 000 0000" {...errorProps("phone")} />
            {fieldError("phone")}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" name="company" autoComplete="organization" value={formData.company} onChange={handleChange}
              placeholder="Your Company Ltd." />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="inquiryType">Inquiry Type *</Label>
            <select id="inquiryType" name="inquiryType" value={formData.inquiryType} onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.inquiryType)}
              aria-describedby={fieldErrors.inquiryType ? "inquiryType-error" : undefined}
              className={`${selectClass} ${fieldErrors.inquiryType ? "border-red-400" : ""}`}>
              <option value="">Select an inquiry type</option>
              {INQUIRY_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
            {fieldError("inquiryType")}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="product">Product of Interest</Label>
            <select id="product" name="product" value={formData.product} onChange={handleChange} className={selectClass}>
              <option value="">Select a product / raw material</option>
              {PRODUCTS.map((product) => <option key={product} value={product}>{product}</option>)}
            </select>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" name="quantity" value={formData.quantity} onChange={handleChange}
              placeholder="e.g. 50 MT or 2 × 20ft containers" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="destination">Destination Country</Label>
            <Input id="destination" name="destination" autoComplete="country-name" value={formData.destination} onChange={handleChange}
              placeholder="e.g. India" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="specifications">Specification Requirements</Label>
          <Input id="specifications" name="specifications" value={formData.specifications} onChange={handleChange}
            placeholder="e.g. purity 99.9%, moisture max 6%, hulled, 50kg bags" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message">Message *</Label>
          <Textarea id="message" name="message" value={formData.message} onChange={handleChange}
            placeholder="Describe your requirements, quantities, delivery location, and any specific needs…"
            rows={5} {...errorProps("message")} />
          {fieldError("message")}
        </div>

        {submitError && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <p className="flex items-start gap-2 font-semibold">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {submitError.message}
            </p>
            <p className="mt-1 pl-6 text-red-700">
              You can still reach us directly — your details will be filled in for you.
            </p>
            <div className="mt-3 flex flex-col gap-2 pl-6 sm:flex-row">
              <a href={submitError.fallbackHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                <Mail className="h-4 w-4" aria-hidden="true" /> Send by email instead
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-semibold text-foreground hover:bg-red-100/60">
                WhatsApp us <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        )}

        {RECAPTCHA_SITE_KEY && (
          <p className="text-xs text-muted-foreground">This form is protected by Google reCAPTCHA v3.</p>
        )}

        <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…</>
          ) : (
            <>Send Inquiry <Send className="h-5 w-5" aria-hidden="true" /></>
          )}
        </Button>
      </form>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────
const Contact = () => {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  });

  const actions = [
    { label: "Email Us", href: PRIMARY_EMAIL_HREF, icon: Mail, primary: true },
    { label: "Call Us", href: PHONES[0].href, icon: Phone },
    { label: "Get Directions", href: LOCATIONS[0].mapsUrl, icon: Navigation, external: true },
    { label: "WhatsApp Us", href: WHATSAPP_LINK, icon: ExternalLink, external: true },
  ];

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20">
          {/* Hero */}
          <section className="relative overflow-hidden bg-primary py-20 md:py-24">
            <div className="absolute inset-0 bg-grain opacity-20" />
            <div className="container relative z-10 mx-auto px-4 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-sm font-medium uppercase tracking-wider text-secondary">
                  Get in Touch
                </motion.span>
                <motion.h1 initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6 mt-3 font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
                  Contact Us
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg leading-relaxed text-primary-foreground/80">
                  Connect with {COMPANY_NAME} for agricultural commodity sourcing, supply partnerships,
                  product inquiries, and business opportunities.
                </motion.p>

                {/* Contact actions */}
                <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center">
                  {actions.map((action) => (
                    <a key={action.label} href={action.href}
                      {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={
                        action.primary
                          ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-secondary px-5 text-sm font-semibold text-secondary-foreground shadow-gold transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
                          : "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-5 text-sm font-semibold text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
                      }>
                      <action.icon className="h-4 w-4" aria-hidden="true" />
                      {action.label}
                      {action.external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact details */}
          <section className="overflow-x-clip bg-cream py-16 md:py-24" aria-labelledby="contact-details-heading">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div {...reveal()} className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">Contact Details</p>
                <h2 id="contact-details-heading" className="mt-3 font-serif text-3xl font-bold text-primary md:text-4xl">
                  How to Reach Us
                </h2>
              </motion.div>

              <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {/* Primary email */}
                <motion.div {...reveal()}
                  className="relative overflow-hidden rounded-2xl bg-primary p-7 text-primary-foreground shadow-medium sm:p-8 md:col-span-2">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-500/10 blur-2xl" aria-hidden="true" />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10 text-emerald-300">
                      <Mail className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">Primary Email</p>
                    <a href={PRIMARY_EMAIL_HREF}
                      className="mt-1 inline-block break-all py-1.5 font-serif text-2xl font-bold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground sm:text-3xl">
                      {PRIMARY_EMAIL}
                    </a>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/75">
                      For sourcing requests, quotations, supply partnerships and general business inquiries.
                    </p>
                    <div className="mt-6 border-t border-primary-foreground/15 pt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">Additional email</p>
                      <a href={SECONDARY_EMAIL_HREF}
                        className="mt-1 inline-flex min-h-11 items-center gap-2 break-all text-sm text-primary-foreground/90 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground">
                        <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {SECONDARY_EMAIL}
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Phones */}
                <motion.div {...reveal(0.05)} className={cardClass}>
                  <div className={iconWrapClass}><Phone className="h-5 w-5" aria-hidden="true" /></div>
                  <h3 className="mt-5 text-lg font-bold text-primary">Call Us</h3>
                  <ul className="mt-2 space-y-1">
                    {PHONES.map((phone) => (
                      <li key={phone.href}>
                        <a href={phone.href}
                          className="inline-flex min-h-11 items-center text-base font-semibold text-foreground transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                          aria-label={`Call ${phone.display}`}>
                          {phone.display}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Locations */}
                {LOCATIONS.map((location, index) => (
                  <motion.div key={location.title} {...reveal(0.1 + index * 0.05)} className={cardClass}>
                    <div className={iconWrapClass}><MapPin className="h-5 w-5" aria-hidden="true" /></div>
                    <h3 className="mt-5 text-lg font-bold text-primary">{location.title}</h3>
                    <address className="mt-2 not-italic leading-relaxed text-muted-foreground">
                      {location.lines.map((line) => <span key={line} className="block">{line}</span>)}
                    </address>
                    <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer"
                      className="group mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
                      View on Google Maps
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      <span className="sr-only">for {location.title} (opens in a new tab)</span>
                    </a>
                  </motion.div>
                ))}

                {/* Hours & social */}
                <motion.div {...reveal(0.2)} className={cardClass}>
                  <div className={iconWrapClass}><Clock className="h-5 w-5" aria-hidden="true" /></div>
                  <h3 className="mt-5 text-lg font-bold text-primary">Business Hours</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Monday – Friday: 8:00 AM – 6:00 PM<br />Saturday: 9:00 AM – 2:00 PM
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-5 border-t border-border/60 pt-3">
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
                      WhatsApp <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                    <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[#0A66C2] hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]">
                      LinkedIn <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Inquiry form */}
          <section id="inquiry" className="scroll-mt-20 bg-gradient-earth bg-grain py-16 md:py-24" aria-label="Inquiry form">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5 lg:gap-12">
                <motion.div {...reveal()} className="lg:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">Business Inquiries</p>
                  <h2 className="mt-3 font-serif text-3xl font-bold text-primary">Tell Us What You Need</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Share your commodity, quantity and delivery requirements and our team will respond with the
                    next steps. Prefer to talk directly? Email{" "}
                    <a href={PRIMARY_EMAIL_HREF} className="font-semibold text-emerald-700 underline-offset-4 hover:underline">
                      {PRIMARY_EMAIL}
                    </a>{" "}
                    or call{" "}
                    <a href={PHONES[0].href} className="whitespace-nowrap font-semibold text-emerald-700 underline-offset-4 hover:underline">
                      {PHONES[0].display}
                    </a>.
                  </p>
                </motion.div>
                <motion.div {...reveal(0.1)} className="lg:col-span-3">
                  <QuoteForm />
                </motion.div>
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
