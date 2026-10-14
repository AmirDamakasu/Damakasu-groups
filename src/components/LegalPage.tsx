import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Mail, MapPin } from "lucide-react";
import { PRIMARY_EMAIL, PRIMARY_EMAIL_HREF } from "@/lib/contact";

export type LegalBlock = string | { list: string[] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

type LegalPageProps = {
  title: string;
  effectiveDate: string;
  company: string;
  sections: LegalSection[];
  /** The final "Contact Us" section, rendered as a contact card. */
  contact: { id: string; title: string; intro: string; location: string };
  related: { label: string; to: string };
};

export function LegalPage({ title, effectiveDate, company, sections, contact, related }: LegalPageProps) {
  const toc = [...sections, contact];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="relative overflow-hidden bg-primary py-16 md:py-20">
          <div className="absolute inset-0 bg-grain opacity-20" />
          <div className="container relative z-10 mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-secondary">Legal</p>
              <h1 className="mt-3 font-serif text-4xl font-bold text-primary-foreground md:text-5xl">{title}</h1>
              <p className="mt-5 text-sm text-primary-foreground/75">
                Effective Date: {effectiveDate}
                <span className="mx-2" aria-hidden="true">•</span>
                Company: {company}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-cream py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
              <nav aria-label={`${title} contents`} className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Contents</p>
                  <ol className="mt-3 space-y-0.5 text-sm">
                    {toc.map((section, index) => (
                      <li key={section.id}>
                        <a href={`#${section.id}`}
                          className="flex min-h-9 items-center gap-2 rounded-md px-2 text-muted-foreground transition-colors hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
                          <span className="w-5 shrink-0 text-xs font-semibold text-emerald-700">{index + 1}.</span>
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>

              <article className="min-w-0 rounded-2xl border border-border/60 bg-card p-6 shadow-soft sm:p-10 lg:p-12">
                {sections.map((section, index) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28 border-b border-border/60 py-8 first:pt-0 last:border-b-0">
                    <h2 className="font-serif text-xl font-bold text-primary sm:text-2xl">
                      <span className="mr-2 text-emerald-700">{index + 1}.</span>
                      {section.title}
                    </h2>
                    <div className="mt-4 space-y-4 leading-relaxed text-foreground/85">
                      {section.blocks.map((block, blockIndex) =>
                        typeof block === "string" ? (
                          <p key={blockIndex}>{block}</p>
                        ) : (
                          <ul key={blockIndex} className="space-y-2 pl-1">
                            {block.list.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" aria-hidden="true" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ),
                      )}
                    </div>
                  </section>
                ))}

                <section id={contact.id} className="scroll-mt-28 pt-8">
                  <h2 className="font-serif text-xl font-bold text-primary sm:text-2xl">
                    <span className="mr-2 text-emerald-700">{toc.length}.</span>
                    {contact.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-foreground/85">{contact.intro}</p>
                  <div className="mt-5 rounded-xl border border-emerald-700/20 bg-emerald-50/60 p-5">
                    <p className="font-semibold text-primary">{company}</p>
                    <a href={PRIMARY_EMAIL_HREF}
                      className="mt-2 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-emerald-800 underline-offset-4 hover:underline">
                      <Mail className="h-4 w-4" aria-hidden="true" /> Email: {PRIMARY_EMAIL}
                    </a>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-emerald-700" aria-hidden="true" /> Location: {contact.location}
                    </p>
                  </div>
                </section>

                <p className="mt-10 border-t border-border/60 pt-6 text-sm text-muted-foreground">
                  See also our{" "}
                  <Link to={related.to} className="font-semibold text-emerald-700 underline-offset-4 hover:underline">
                    {related.label}
                  </Link>
                  .
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
