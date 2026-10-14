// Business & Leadership Highlights gallery (About Us page).
//
// To add or replace a photo: put the file in public/images/highlights/, set `image` to its path
// ("/images/highlights/<file>.jpg"), and write a factual `alt`. Leave `image` as null to show a
// labelled placeholder. Only use authorized company photographs with verified captions — never
// stock or AI-generated images, and don't name people or events unless that has been confirmed.

export const HIGHLIGHT_CATEGORIES = [
  "Leadership",
  "Business Meetings",
  "Commodity Operations",
  "Industry Events",
] as const;

export type HighlightCategory = (typeof HIGHLIGHT_CATEGORIES)[number];

export type Highlight = {
  id: number;
  caption: string;
  category: HighlightCategory;
  /** Path under public/, or null while waiting for an authorized photo. */
  image: string | null;
  alt: string;
  width?: number;
  height?: number;
  /** CSS object-position for the cropped tile (the lightbox always shows the full photo). */
  focus?: string;
};

export const highlights: Highlight[] = [
  {
    id: 1,
    caption: "Political Leaders of Yobe State",
    category: "Leadership",
    image: "/images/highlights/leadership-group.jpg",
    alt: "Group photograph with political leaders of Yobe State in traditional attire in a formal reception room",
    width: 720,
    height: 480,
  },
  {
    id: 2,
    caption: "Business Engagement",
    category: "Business Meetings",
    image: "/images/highlights/business-engagement-handshake.jpg",
    alt: "Handshake between a company representative and a visitor in an office",
    width: 900,
    height: 1200,
    focus: "50% 30%",
  },
  {
    id: 4,
    caption: "Commodity Sourcing",
    category: "Commodity Operations",
    image: "/images/highlights/commodity-sourcing-warehouse.jpg",
    alt: "Workers handling bagged commodities inside a warehouse",
    width: 900,
    height: 1200,
    focus: "50% 55%",
  },
  {
    id: 5,
    caption: "Warehouse & Inspection",
    category: "Commodity Operations",
    image: "/images/highlights/warehouse-compound.jpg",
    alt: "Warehouse compound and loading yard at dusk under floodlights",
    width: 1200,
    height: 900,
  },
  {
    id: 7,
    caption: "Industry Event",
    category: "Industry Events",
    image: "/images/highlights/industry-event-hall.jpg",
    alt: "Guests seated at decorated tables during a large event in a hall",
    width: 1200,
    height: 800,
  },
  {
    id: 8,
    caption: "Partnership Discussion",
    category: "Business Meetings",
    image: "/images/highlights/partnership-discussion.jpg",
    alt: "Company representative standing with a visitor in an office",
    width: 900,
    height: 1200,
    focus: "50% 30%",
  },
  {
    id: 9,
    caption: "Political Event",
    category: "Leadership",
    image: "/images/highlights/business-engagement-gathering.jpg",
    alt: "Delegates in traditional attire seated in the front rows at a political event",
    width: 1400,
    height: 933,
    focus: "50% 40%",
  },
  {
    id: 10,
    caption: "Company Activities",
    category: "Leadership",
    image: "/images/highlights/company-activities-dinner.jpg",
    alt: "Guests seated at a dinner table during a company event",
    width: 1000,
    height: 750,
  },
];
