// Site-wide SEO constants. SITE_URL is the production domain registered in the Hostinger account.
export const SITE_URL = "https://damakasu.com";
export const SITE_NAME = "Damakasu Multi-Link Investment Ltd";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";
export const LOGO_IMAGE = "/logo-512.png";

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;
