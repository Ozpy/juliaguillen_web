export type WooImage = {
  id: number;
  src: string;
  alt: string;
};

export type WooCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: { src: string } | null;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  featured: boolean;
  short_description: string; // HTML
  description: string;       // HTML
  images: WooImage[];
  categories: WooCategory[];
  stock_status: "instock" | "outofstock" | "onbackorder";
  permalink: string;
};

export type CartItem = {
  id: number;
  quantity: number;
  product?: Product; // Cached product info for drawer UI
};
