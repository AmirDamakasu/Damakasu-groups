// Company contact details — single source for the Contact page and footer.

export const COMPANY_NAME = "Damakasu Multi-Link Investment Ltd";

export const PRIMARY_EMAIL = "info@damakasu.com";
export const PRIMARY_EMAIL_HREF =
  "mailto:info@damakasu.com?subject=Business%20Inquiry%20-%20Damakasu%20Multi-Link%20Investment%20Ltd";

export const SECONDARY_EMAIL = "damakasumultilinkinvestimentlimited@gmail.com";
export const SECONDARY_EMAIL_HREF =
  "mailto:damakasumultilinkinvestimentlimited@gmail.com?subject=Product%20Inquiry";

export const PHONES = [
  { display: "+234 916 059 5507", href: "tel:+2349160595507" },
  { display: "+234 903 784 4338", href: "tel:+2349037844338" },
];

export const WHATSAPP_NUMBER = "2349160595507";

/** WhatsApp chat link with a ready-to-send enquiry; pass a product name to pre-fill it. */
export const whatsappLink = (product?: string) => {
  const message = [
    "Hello Damakasu Multi-Link Investment Ltd 👋",
    "",
    `I found you on damakasu.com and I'm interested in ${product ?? "your agricultural commodities"}.`,
    "",
    `Product: ${product ?? ""}`,
    "Quantity: ",
    "Destination (country/port): ",
    "",
    "Please share current availability, specifications and a quotation. Thank you!",
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const WHATSAPP_LINK = whatsappLink();

export const LOCATIONS = [
  {
    title: "Company Office",
    lines: ["Damaturu LGA, Nigeria"],
    mapsUrl: "https://maps.app.goo.gl/NJWdHHvMcJtqvn6VA?g_st=ic",
  },
  {
    title: "Dawanau Market",
    lines: ["Damakasu Street, Kano, Nigeria"],
    mapsUrl: "https://maps.app.goo.gl/b9v5k3wND12qiEHH8?g_st=ic",
  },
];
