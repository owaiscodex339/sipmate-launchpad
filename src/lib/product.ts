import sipmate2in1Img from "@/assets/sipmate-2in1.jpeg";

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
    id: "sipmate-2in1",
    name: "SipMate 2-in-1 Portable Tea Maker + Juicer",
    price: 7999,
    currency: "INR",
    tagline: "Two functions. One smart design. Brew hot tea or blend fresh juice — anywhere.",
    image: sipmate2in1Img,
    features: [
      "2-in-1: Tea Maker + Juicer / Blender",
      "USB-C rechargeable — 2000mAh battery",
      "350ml capacity, BPA-free materials",
      "100W heating (Tea) · 150W motor (Juicer)",
      "Safety sensor & safety lock built-in",
      "Compact, travel-friendly design",
    ],
  },
];

export const getProduct = (id: string): Product =>
  PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];

export const PRODUCT = PRODUCTS[0];
