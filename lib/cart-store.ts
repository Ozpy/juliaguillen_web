"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "../types";

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  add: (product: Product, quantity?: number) => void;
  remove: (id: number) => void;
  setQty: (id: number, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (open) => set({ isOpen: open }),
      add: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { id: product.id, quantity, product }],
          });
        }
      },
      remove: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },
      setQty: (id, quantity) => {
        if (quantity <= 0) {
          get().remove(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: "julia-guillen-cart",
    }
  )
);
