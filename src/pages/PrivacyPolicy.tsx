import { LegalPage, type LegalSection } from "@/components/LegalPage";

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    blocks: [
      "Damakasu Multilink Investment Ltd (“Damakasu,” “we,” “our,” or “us”) respects your privacy and is committed to protecting the personal information you provide through our website.",
      "This Privacy Policy explains what information we may collect, how we use it, when we share it, and the choices available to you.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    blocks: [
      "Depending on how you use our website, we may collect:",
      {
        list: [
          "Contact information: Name, email address, telephone number, company name, and business address.",
          "Business and supply information: Commodity enquiries, product specifications, requested quantities, delivery locations, and supplier or buyer details.",
          "Communications: Messages and other information you send through contact forms or email.",
          "Technical information: IP address, browser type, device information, and website usage data, where collected through server logs or analytics tools.",
        ],
      },
      "Please do not submit confidential financial information or identity documents through the website unless we specifically request them through an appropriate channel.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    blocks: [
      "We may use your information to:",
      {
        list: [
          "Respond to enquiries and quotation requests.",
          "Communicate with buyers, suppliers, distributors, and business partners.",
          "Discuss agricultural commodities, availability, specifications, and delivery arrangements.",
          "Provide requested business services and process transactions where applicable.",
          "Improve website functionality, security, and customer experience.",
          "Comply with applicable legal and regulatory obligations.",
        ],
      },
      "We will not use your information for purposes incompatible with the reason it was collected without an appropriate legal basis.",
    ],
  },
  {
    id: "sharing-of-information",
    title: "Sharing of Information",
    blocks: [
      "We do not sell personal information to third parties.",
      "We may share relevant information with trusted service providers, such as website hosting, email, security, and analytics providers, where necessary to operate our website. We may also disclose information where required by law or to protect our legitimate rights.",
      "Where business transactions require it, we may share relevant business contact or delivery information with the parties involved, as permitted by applicable law.",
    ],
  },
  {
    id: "cookies-and-analytics",
    title: "Cookies and Analytics",
    blocks: [
      "Our website may use cookies or similar technologies to support essential functionality, remember preferences, improve performance, or measure website traffic.",
      "Where required by law, we will obtain consent before using non-essential cookies. You may also be able to manage cookies through your browser settings.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    blocks: [
      "We take reasonable technical and organisational measures to protect information against unauthorised access, loss, misuse, alteration, or disclosure. However, no online transmission or electronic storage method can be guaranteed to be completely secure.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    blocks: [
      "We retain personal information only for as long as reasonably necessary for the purposes described in this Policy, including business communications, recordkeeping, dispute resolution, and legal compliance.",
    ],
  },
  {
    id: "your-privacy-rights",
    title: "Your Privacy Rights",
    blocks: [
      "Subject to applicable law, you may have the right to request access to your personal information, correction of inaccurate information, deletion of information, or restriction or objection to certain processing.",
      "To make a privacy-related request, contact us using the details below.",
    ],
  },
  {
    id: "third-party-websites",
    title: "Third-Party Websites",
    blocks: [
      "Our website may contain links to third-party websites, including map services and business platforms. Those websites operate under their own privacy policies, and we are not responsible for their independent privacy practices.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children’s Privacy",
    blocks: [
      "Our website is intended for business and general audiences and is not designed to collect personal information from children. If you believe a child has provided personal information to us, contact us so we can assess the appropriate steps.",
    ],
  },
  {
    id: "international-data-transfers",
    title: "International Data Transfers",
    blocks: [
      "Where personal information is processed or transferred outside Nigeria, we will take steps required by applicable data protection law to ensure that the transfer is handled lawfully and that appropriate safeguards are in place.",
    ],
  },
  {
    id: "changes-to-this-policy",
    title: "Changes to This Policy",
    blocks: [
      "We may update this Privacy Policy from time to time. Any revised version will be published on this page with an updated effective date.",
    ],
  },
];

const PrivacyPolicy = () => (
  <LegalPage
    title="Privacy Policy"
    effectiveDate="14 October 2026"
    company="Damakasu Multilink Investment Ltd"
    sections={sections}
    contact={{
      id: "contact-us",
      title: "Contact Us",
      intro: "For questions or requests relating to this Privacy Policy, contact:",
      location: "Damaturu LGA, Nigeria",
    }}
    related={{ label: "Terms of Service", to: "/terms-of-service" }}
  />
);

export default PrivacyPolicy;
