"use client";

import { useEffect } from "react";
import { useShopStore } from "../../lib/shop-store";

export default function ShopPreloader() {
  const { isLoaded, isLoading, setShopData, setLoading } = useShopStore();

  useEffect(() => {
    // If the cache is already populated or currently fetching, do not run again
    if (isLoaded || isLoading) return;

    const fetchCachedData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/shop-data");
        if (!response.ok) throw new Error("Failed to fetch preloaded shop data");
        const data = await response.json();
        
        if (data.products && data.categories) {
          setShopData(data.products, data.categories);
        }
      } catch (error) {
        console.warn("Shop preloading background task failed:", error);
      } finally {
        setLoading(false);
      }
    };

    // Defer the background fetch to ensure absolute priority for LCP (Hero, layout paint, etc.)
    // We wait 1500ms after the component mounts to trigger the preloader during idle CPU time
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        if ("requestIdleCallback" in window) {
          (window as any).requestIdleCallback(() => {
            fetchCachedData();
          });
        } else {
          fetchCachedData();
        }
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isLoaded, isLoading, setShopData, setLoading]);

  // This is a headless background provider, renders nothing
  return null;
}
