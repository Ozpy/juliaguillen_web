"use client";

import { useEffect } from "react";
import { useCartStore } from "../../lib/cart-store";
import { showToast } from "../ui/Toast";

interface CartClearerProps {
  clear: boolean;
}

export default function CartClearer({ clear }: CartClearerProps) {
  const clearCart = useCartStore((state) => state.clear);

  useEffect(() => {
    if (clear) {
      clearCart();
      // Show confirmation toast to the user
      setTimeout(() => {
        showToast("¡Pedido completado con éxito! Gracias por tu compra.");
      }, 500);
      
      // Clean up the URL search params so reloads don't re-trigger
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("order_complete");
        window.history.replaceState({}, "", url.pathname);
      }
    }
  }, [clear, clearCart]);

  return null;
}
