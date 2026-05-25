import { cache } from "react";
import { Product, WooCategory } from "../types";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://juliaguillen.com";
const KEY = process.env.NEXT_PUBLIC_WC_KEY || "";
const SECRET = process.env.WC_SECRET || "";

// Local memory cache for server-side persistence (bypasses dev-mode revalidate: 0 delays)
const serverCache = new Map<string, { data: any; expiresAt: number }>();
const CACHE_EXPIRY_MS = 3 * 60 * 1000; // 3 minutes cache

export function clearServerCache() {
  serverCache.clear();
  console.log("WooCommerce API local memory cache cleared successfully.");
}

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
  const now = Date.now();
  const cached = serverCache.get(path);
  if (cached && cached.expiresAt > now) {
    return cached.data as T;
  }

  const auth = getAuthHeader();
  if (!auth) {
    throw new Error("WooCommerce API keys are missing or invalid");
  }

  const res = await fetch(`${WP_URL}/wp-json/wc/v3${path}`, {
    headers: {
      Authorization: auth,
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (NextJS Headless Client)"
    },
    next: { 
      revalidate: process.env.NODE_ENV === "development" ? 0 : 3600 
    },
  });

  if (!res.ok) {
    throw new Error(`Woo API error ${res.status}: ${path}`);
  }

  const data = await res.json();
  serverCache.set(path, {
    data,
    expiresAt: Date.now() + CACHE_EXPIRY_MS
  });

  return data as T;
}

export const getProducts = cache(async (params = ""): Promise<Product[]> => {
  try {
    return await wooFetch<Product[]>(`/products?per_page=12&${params}`);
  } catch (error) {
    console.warn("WooCommerce API getProducts failed. Error:", error instanceof Error ? error.message : error);
    return [];
  }
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  try {
    const data = await wooFetch<Product[]>(`/products?slug=${slug}`);
    return data[0] ?? null;
  } catch (error) {
    console.warn(`WooCommerce API getProductBySlug for '${slug}' failed. Error:`, error instanceof Error ? error.message : error);
    return null;
  }
});

export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  try {
    const products = await wooFetch<Product[]>("/products?featured=true&per_page=8");
    
    // Fallback: If there are fewer than 4 featured products, pad with recent products
    if (products.length < 4) {
      const recentProducts = await wooFetch<Product[]>("/products?per_page=8");
      const uniqueIds = new Set(products.map(p => p.id));
      const combined = [...products];
      
      for (const p of recentProducts) {
        if (!uniqueIds.has(p.id)) {
          combined.push(p);
          if (combined.length >= 8) break;
        }
      }
      return combined;
    }
    
    return products;
  } catch (error) {
    console.warn("WooCommerce API getFeaturedProducts failed. Error:", error instanceof Error ? error.message : error);
    return [];
  }
});

export const getCategories = cache(async (): Promise<(WooCategory & { image: { src: string } | null; description: string })[]> => {
  try {
    const categories = await wooFetch<(WooCategory & { image: { src: string } | null; description: string })[]>(
      "/products/categories?per_page=20&hide_empty=true"
    );
    return categories.filter(
      (cat) =>
        cat.slug !== "sin-categorizar" &&
        cat.slug !== "uncategorized" &&
        cat.name.toLowerCase() !== "sin categorizar" &&
        cat.name.toLowerCase() !== "uncategorized"
    );
  } catch (error) {
    console.warn("WooCommerce API getCategories failed. Error:", error instanceof Error ? error.message : error);
    return [];
  }
});

export const getProductsByCategory = cache(async (categoryId: number): Promise<Product[]> => {
  try {
    return await wooFetch<Product[]>(`/products?category=${categoryId}&per_page=24`);
  } catch (error) {
    console.warn(`WooCommerce API getProductsByCategory for '${categoryId}' failed. Error:`, error instanceof Error ? error.message : error);
    return [];
  }
});
