import sipmateTeaImg from "@/assets/sipmate-hero.jpg";
import sipmateCoolImg from "@/assets/sipmate-cool-hero.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  tagline: string;
  image: string;
  features: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "sipmate-tea",
    name: "SipMate Portable Tea Maker",
    price: 79,
    currency: "USD",
    tagline: "USB-rechargeable. Boils water and brews loose-leaf or bagged tea, anywhere.",
    image: sipmateTeaImg,
    features: [
      "Compact & travel-friendly",
      "Stainless steel infuser",
      "Auto-shutoff safety sensor",
      "USB-C fast charging",
      "30-day money-back guarantee",
    ],
  },
  {
    id: "sipmate-cool",
    name: "SipMate Cool — Juice & Cold Drink Flask",
    price: 59,
    currency: "USD",
    tagline: "Vacuum-insulated flask that keeps juices and cold drinks chilled for up to 24 hours.",
    image: sipmateCoolImg,
    features: [
      "24-hour cold retention",
      "Double-wall vacuum insulation",
      "BPA-free food-grade interior",
      "Leak-proof twist cap",
      "30-day money-back guarantee",
    ],
  },
];

export const getProduct = (id: string): Product =>
  PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];

// Backward-compat default product
export const PRODUCT = PRODUCTS[0];
