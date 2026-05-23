import { Product, WooCategory } from "../types";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://juliaguillen.com";
const KEY = process.env.NEXT_PUBLIC_WC_KEY || "";
const SECRET = process.env.WC_SECRET || "";

// Generate basic auth token safely on server-side
const getAuthHeader = () => {
  if (!KEY || !SECRET) return "";
  try {
    return `Basic ${Buffer.from(`${KEY}:${SECRET}`).toString("base64")}`;
  } catch (e) {
    return "";
  }
};

async function wooFetch<T>(path: string): Promise<T> {
  const auth = getAuthHeader();
  if (!auth) {
    throw new Error("WooCommerce API keys are missing or invalid");
  }

  const res = await fetch(`${WP_URL}/wp-json/wc/v3${path}`, {
    headers: {
      Authorization: auth,
      "Content-Type": "application/json",
    },
    next: { revalidate: 300 }, // ISR: 5 minutes revalidation
  });

  if (!res.ok) {
    throw new Error(`Woo API error ${res.status}: ${path}`);
  }

  return res.json();
}

export const getProducts = async (params = ""): Promise<Product[]> => {
  try {
    return await wooFetch<Product[]>(`/products?per_page=12&${params}`);
  } catch (error) {
    console.warn("WooCommerce API getProducts failed. Error:", error instanceof Error ? error.message : error);
    return [];
  }
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const data = await wooFetch<Product[]>(`/products?slug=${slug}`);
    return data[0] ?? null;
  } catch (error) {
    console.warn(`WooCommerce API getProductBySlug for '${slug}' failed. Error:`, error instanceof Error ? error.message : error);
    return null;
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const products = await wooFetch<Product[]>("/products?featured=true&per_page=8");
    return products;
  } catch (error) {
    console.warn("WooCommerce API getFeaturedProducts failed. Error:", error instanceof Error ? error.message : error);
    return [];
  }
};

export const getCategories = async (): Promise<(WooCategory & { image: { src: string } | null; description: string })[]> => {
  try {
    return await wooFetch<(WooCategory & { image: { src: string } | null; description: string })[]>(
      "/products/categories?per_page=20&hide_empty=true"
    );
  } catch (error) {
    console.warn("WooCommerce API getCategories failed. Error:", error instanceof Error ? error.message : error);
    return [];
  }
};

export const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  try {
    return await wooFetch<Product[]>(`/products?category=${categoryId}&per_page=24`);
  } catch (error) {
    console.warn(`WooCommerce API getProductsByCategory for '${categoryId}' failed. Error:`, error instanceof Error ? error.message : error);
    return [];
  }
};
