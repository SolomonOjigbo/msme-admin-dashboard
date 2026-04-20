export type MsmeStatus = "Active" | "Archived" | "Pending";

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  initials: string;
}

export interface Msme {
  id: string;
  msmeId: string;
  name: string;
  category: string;
  location: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  status: MsmeStatus;
  capacity: string;
  capacityFull: string;
  established: string;
  hours: string;
  verified: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  services: string[];
  brandImage: string;
  addedBy: string;
  dateAdded: string;
  archiveReason?: string;
  attachments: { name: string; date: string; size: string }[];
  reviews: Review[];
}

// In Next.js, static assets live in /public. Place brand-textiles.jpg there.
const BRAND_IMAGE = "/brand-textiles.jpg";

const sharedReviews: Review[] = [
  {
    id: "r1",
    author: "Ngozi Eze",
    initials: "NE",
    date: "February 10, 2026",
    rating: 4,
    text: "Good experience overall. The staff was friendly and professional. Pricing is competitive and the quality meets industry standards. Will definitely work with them again.",
  },
  {
    id: "r2",
    author: "Adebayo Okonkwo",
    initials: "AO",
    date: "March 15, 2026",
    rating: 3,
    text: "Excellent service and high-quality products! I've been working with this business for over 2 years and they consistently deliver on time. Their attention to detail and customer service is outstanding.",
  },
  {
    id: "r3",
    author: "Ibrahim Yusuf",
    initials: "IY",
    date: "February 20, 2026",
    rating: 4,
    text: "Amazing craftsmanship! The team is very knowledgeable and helped me choose the right products for my needs. Highly recommend to anyone looking for quality.",
  },
];

const baseAttachments = [
  { name: "CAC Document", date: "4, Jan 2026", size: "14KB" },
  { name: "NIN Document", date: "4, Jan 2026", size: "14KB" },
];

export const msmes: Msme[] = [
  {
    id: "1",
    msmeId: "MSME-00123",
    name: "Ahmed Textiles Ltd",
    category: "Leather goods",
    location: "Nnewi North",
    phone: "08022378456",
    email: "momatiti@gmail.com",
    address: "27 Allen Avenue, Ikeja, Lagos",
    website: "www.Ahtextiles.com",
    status: "Active",
    capacity: "500unit/mo",
    capacityFull: "50000 kg/month",
    established: "2015",
    hours: "Daily: 9am-9pm",
    verified: true,
    rating: 5.0,
    reviewsCount: 127,
    description:
      "Leading textile manufacturer specializing in premium fabrics and traditional designs. Over 15 years of excellence.",
    services: ["Garments", "Lace", "Guinea Brocade", "Ankara Fabrics"],
    brandImage: BRAND_IMAGE,
    addedBy: "Femi Adebayo",
    dateAdded: "24th, Apr 2026 2:30 pm",
    attachments: baseAttachments,
    reviews: sharedReviews,
  },
  {
    id: "2",
    msmeId: "MSME-00542",
    name: "BlueThread Garments",
    category: "Garment & Apparel",
    location: "Aba south",
    phone: "08024569123",
    email: "bluethread@gmail.com",
    address: "12 Market Rd, Aba",
    website: "www.bluethread.com",
    status: "Archived",
    capacity: "1000units/mo",
    capacityFull: "1000 units/month",
    established: "2018",
    hours: "Mon-Sat: 8am-6pm",
    verified: true,
    rating: 4.6,
    reviewsCount: 84,
    description:
      "Modern garment producer focused on bulk wholesale orders for retailers across the south east.",
    services: ["Garments", "Uniforms"],
    brandImage: BRAND_IMAGE,
    addedBy: "Eric Thomas",
    dateAdded: "12th, Mar 2026 10:00 am",
    archiveReason: "Non availability of required document",
    attachments: [],
    reviews: sharedReviews.slice(0, 2),
  },
  {
    id: "3",
    msmeId: "MSME-00198",
    name: "Nkwo Footwear Co.",
    category: "Footwear",
    location: "Onitsha North",
    phone: "07023489011",
    email: "nkwo@gmail.com",
    address: "5 Bridge Head, Onitsha",
    website: "www.nkwofootwear.com",
    status: "Archived",
    capacity: "100units/mo",
    capacityFull: "100 units/month",
    established: "2020",
    hours: "Daily: 9am-7pm",
    verified: false,
    rating: 4.2,
    reviewsCount: 22,
    description: "Handcrafted leather shoes and sandals made by skilled artisans.",
    services: ["Footwear", "Sandals"],
    brandImage: BRAND_IMAGE,
    addedBy: "Eric Thomas",
    dateAdded: "2nd, Feb 2026 4:15 pm",
    archiveReason: "Inactive for 6 months",
    attachments: baseAttachments.slice(0, 1),
    reviews: [],
  },
  {
    id: "4",
    msmeId: "MSME-00321",
    name: "Indigo Stitch Hub",
    category: "Garment & Apparel",
    location: "Owerri Municipal",
    phone: "08154671200",
    email: "indigo@gmail.com",
    address: "3 Wetheral Rd, Owerri",
    website: "www.indigostitch.com",
    status: "Active",
    capacity: "196units/mo",
    capacityFull: "196 units/month",
    established: "2019",
    hours: "Mon-Fri: 9am-5pm",
    verified: true,
    rating: 4.8,
    reviewsCount: 56,
    description:
      "Premium tailoring and ready-to-wear collections in indigo-dyed fabrics.",
    services: ["Tailoring", "Adire"],
    brandImage: BRAND_IMAGE,
    addedBy: "Femi Adebayo",
    dateAdded: "18th, Apr 2026 11:00 am",
    attachments: baseAttachments,
    reviews: sharedReviews.slice(0, 2),
  },
  {
    id: "5",
    msmeId: "MSME-00712",
    name: "Prime Sole Creations",
    category: "Footwear",
    location: "Aba North",
    phone: "07023344112",
    email: "primesole@gmail.com",
    address: "9 Faulks Rd, Aba",
    website: "www.primesole.com",
    status: "Archived",
    capacity: "74units/mo",
    capacityFull: "74 units/month",
    established: "2017",
    hours: "Daily: 8am-8pm",
    verified: false,
    rating: 4.1,
    reviewsCount: 18,
    description:
      "Affordable everyday footwear produced from sustainable leather offcuts.",
    services: ["Footwear"],
    brandImage: BRAND_IMAGE,
    addedBy: "Ola Aina",
    dateAdded: "30th, Jan 2026 9:00 am",
    archiveReason: "Duplicate listing",
    attachments: [],
    reviews: [],
  },
  {
    id: "6",
    msmeId: "MSME-00833",
    name: "Coal City Apparel",
    category: "Garments",
    location: "Enugu North",
    phone: "08011122334",
    email: "coalcity@gmail.com",
    address: "21 Ogui Rd, Enugu",
    website: "www.coalcityapparel.com",
    status: "Active",
    capacity: "250units/mo",
    capacityFull: "250 units/month",
    established: "2021",
    hours: "Mon-Sat: 9am-6pm",
    verified: true,
    rating: 4.7,
    reviewsCount: 41,
    description: "Contemporary streetwear inspired by coal city culture.",
    services: ["Streetwear", "Caps"],
    brandImage: BRAND_IMAGE,
    addedBy: "Eric Thomas",
    dateAdded: "15th, Apr 2026 3:45 pm",
    attachments: baseAttachments,
    reviews: sharedReviews.slice(1),
  },
];

export function getMsme(id: string) {
  return msmes.find((m) => m.id === id);
}
