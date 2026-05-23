"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../../types";
import { useCartStore } from "../../lib/cart-store";
import { showToast } from "../ui/Toast";
import Button from "../ui/Button";
import { Plus, Minus, ShoppingBag, CreditCard } from "lucide-react";

interface ProductPurchaseSectionProps {
  product: Product;
}

export default function ProductPurchaseSection({ product }: ProductPurchaseSectionProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.add);
  const setCartOpen = useCartStore((state) => state.setIsOpen);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`Agregado: ${quantity} x ${product.name}`);
    setCartOpen(true); // Open the drawer immediately for elegant feedback
  };

  // Immediate headless buy-now redirect
  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col gap-6 text-left w-full">
      {/* Selector de cantidad */}
      <div className="flex flex-col gap-2">
        <label className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-pearl-brown">
          Cantidad
        </label>
        <div className="flex items-center border border-pearl-gray/30 rounded-none bg-white w-32 justify-between">
          <button
            onClick={handleDecrease}
            className="p-3 text-pearl-brown hover:text-pearl-ink transition-colors focus:outline-none"
            aria-label="Disminuir cantidad"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="font-sans text-sm font-medium text-pearl-ink min-w-[24px] text-center select-none">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="p-3 text-pearl-brown hover:text-pearl-ink transition-colors focus:outline-none"
            aria-label="Aumentar cantidad"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Botones de compra */}
      <div className="flex flex-col gap-3 w-full">
        {/* Agregar al carrito (Primary Button) */}
        <Button
          onClick={handleAddToCart}
          variant="primary"
          className="w-full py-4 text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-3"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Agregar al Carrito</span>
        </Button>

        {/* Comprar ahora (Inverted Button / Direct checkout link) */}
        <Button
          variant="inverse"
          type="button"
          onClick={handleBuyNow}
          className="w-full py-4 text-xs font-semibold tracking-[0.2em] uppercase border border-pearl-deep flex items-center justify-center gap-3 text-pearl-deep hover:bg-pearl-white/80"
        >
          <CreditCard className="h-4 w-4 text-pearl-deep" />
          <span>Comprar Ahora</span>
        </Button>
      </div>
    </div>
  );
}
