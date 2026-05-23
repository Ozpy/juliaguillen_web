"use client";

import { create } from "zustand";
import { Product, WooCategory } from "../types";

type ShopStore = {
  products: Product[];
  categories: WooCategory[];
  isLoaded: boolean;
  isLoading: boolean;
  setShopData: (products: Product[], categories: WooCategory[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useShopStore = create<ShopStore>()((set) => ({
  products: [],
  categories: [],
  isLoaded: false,
  isLoading: false,
  setShopData: (products, categories) => set((state) => {
    // Generate semantic signatures of items to check if there are REAL visual changes
    const getProductsSig = (prods: Product[]) => 
      prods.map(p => `${p.id}-${p.price}-${p.name}-${p.images[0]?.src || ""}`).join("|");
    
    const getCategoriesSig = (cats: WooCategory[]) => 
      cats.map(c => `${c.id}-${c.name}-${c.slug}`).join("|");

    const currentProductsSig = getProductsSig(state.products);
    const newProductsSig = getProductsSig(products);

    const currentCategoriesSig = getCategoriesSig(state.categories);
    const newCategoriesSig = getCategoriesSig(categories);

    const productsChanged = currentProductsSig !== newProductsSig;
    const categoriesChanged = currentCategoriesSig !== newCategoriesSig;

    // Only update data if something actually changed OR if it's the very first load
    if (productsChanged || categoriesChanged || !state.isLoaded) {
      return { products, categories, isLoaded: true, isLoading: false };
    }
    
    // Otherwise, silently turn off the loading flag without triggering a state refresh
    return { isLoading: false };
  }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
