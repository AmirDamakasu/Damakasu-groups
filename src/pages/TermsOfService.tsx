import { LegalPage, type LegalSection } from "@/components/LegalPage";

const sections: LegalSection[] = [
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    blocks: [
      "These Terms of Service (“Terms”) govern your access to and use of the Damakasu Multilink Investment Ltd website.",
      "By accessing or using our website, you agree to these Terms. If you do not agree, please discontinue using the website.",
    ],
  },
  {
    id: "about-our-business",
    title: "About Our Business",
    blocks: [
      "Damakasu Multilink Investment Ltd provides business information and may facilitate enquiries relating to agricultural commodities, sourcing, supply, distribution, and other business activities described on the website.",
      "The website may be used by prospective buyers, suppliers, distributors, and business partners to learn about our activities and contact our team.",
    ],
  },
  {
    id: "website-information-and-quotations",
    title: "Website Information and Quotations",
    blocks: [
      "Information published on this website is provided for general business and informational purposes.",
      "Product descriptions, photographs, specifications, availability, quantities, delivery arrangements, and prices may change. Unless expressly confirmed in a written agreement, website information does not constitute a binding offer, guarantee of availability, or commitment to supply.",
      "All quotations and commercial arrangements are subject to confirmation by our authorised representatives and any applicable written contract.",
    ],
  },
  {
    id: "business-enquiries",
    title: "Business Enquiries and Communications",
    blocks: [
      "When submitting an enquiry, you agree to provide information that is accurate to the best of your knowledge and to use our contact channels lawfully.",
      "Submitting an enquiry does not automatically establish a buyer-supplier relationship, partnership, agency, or other contractual relationship.",
    ],
  },
  {
    id: "orders-and-commercial-agreements",
    title: "Orders and Commercial Agreements",
    blocks: [
      "Any purchase, supply, distribution, or export transaction will be governed by the specific quotation, purchase order, sales contract, or other written agreement accepted by the relevant parties.",
      "Where applicable, that agreement will determine the product specifications, quantity, price, payment terms, delivery obligations, inspection procedures, risk allocation, and dispute resolution arrangements.",
      "These website Terms do not replace a separate signed commercial agreement.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    blocks: [
      "You agree not to:",
      {
        list: [
          "Use the website for unlawful, fraudulent, or misleading activities.",
          "Submit false business identities or materially inaccurate information.",
          "Attempt to gain unauthorised access to the website, its systems, or other users’ information.",
          "Introduce malicious code or interfere with the website’s operation.",
          "Copy or misuse website content in violation of applicable law or intellectual property rights.",
        ],
      },
      "We may take reasonable steps to protect the website and respond to suspected misuse.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    blocks: [
      "Unless otherwise stated, website text, branding, logos, graphics, and original materials belonging to Damakasu Multilink Investment Ltd are protected by applicable intellectual property laws.",
      "You may view and use the website for lawful personal or business enquiries. You may not reproduce, modify, distribute, or commercially exploit our protected materials without prior permission, except where permitted by law.",
      "Third-party names, logos, and trademarks remain the property of their respective owners.",
    ],
  },
  {
    id: "third-party-services",
    title: "Third-Party Services and Links",
    blocks: [
      "Our website may link to third-party services, including Google Maps, email providers, and external business platforms. These services are operated independently and may be subject to their own terms and privacy policies.",
      "We do not control third-party websites and are not responsible for their content or availability.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    blocks: [
      "We make reasonable efforts to keep website information accurate and up to date. However, we do not guarantee that all content will always be complete, accurate, available, or free from errors.",
      "Nothing on this website guarantees that a particular commodity, quantity, price, delivery date, or business opportunity will be available.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    blocks: [
      "To the extent permitted by applicable law, Damakasu Multilink Investment Ltd will not be liable for indirect or consequential losses arising from the use of, or inability to use, the website.",
      "Nothing in these Terms excludes or limits liability where doing so would be unlawful. Any liability arising from a separate commercial contract will be determined under that contract and applicable law.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    blocks: [
      "Your use of the website is also subject to our Privacy Policy, which explains how we handle personal information.",
    ],
  },
  {
    id: "suspension-or-changes",
    title: "Suspension or Changes",
    blocks: [
      "We may update, suspend, or discontinue parts of the website where reasonably necessary for maintenance, security, business, or legal reasons.",
      "We may revise these Terms by publishing an updated version on this page. The effective date will indicate when the latest version was published.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    blocks: [
      "These Terms are intended to be governed by the laws of the Federal Republic of Nigeria, subject to any mandatory applicable law and any valid dispute-resolution provisions in a separate commercial agreement.",
    ],
  },
];

const TermsOfService = () => (
  <LegalPage
    title="Terms of Service"
    effectiveDate="14 October 2026"
    company="Damakasu Multilink Investment Ltd"
    sections={sections}
    contact={{
      id: "contact-us",
      title: "Contact Us",
      intro: "For questions about these Terms, contact:",
      location: "Damaturu LGA, Nigeria",
    }}
    related={{ label: "Privacy Policy", to: "/privacy-policy" }}
  />
);

export default TermsOfService;
