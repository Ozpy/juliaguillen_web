"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "../../lib/cart-store";
import Button from "../ui/Button";

export default function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const setIsOpen = useCartStore((state) => state.setIsOpen);
  const items = useCartStore((state) => state.items);
  const setQty = useCartStore((state) => state.setQty);
  const remove = useCartStore((state) => state.remove);
  
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  // Close drawer if clicking outside the side panel
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  // Calculate cart subtotal
  const subtotal = items.reduce((acc, item) => {
    const price = parseFloat(item.product?.price || "0");
    return acc + price * item.quantity;
  }, 0);

  // Generate the special WooCommerce add-to-cart redirect URL
  const getCheckoutUrl = () => {
    if (items.length === 0) return "#";
    const wpUrl = process.env.NEXT_PUBLIC_WP_URL || "https://wp.juliaguillen.com";
    const productIds = items.map((item) => item.id).join(",");
    const quantities = items.map((item) => item.quantity).join(",");
    return `${wpUrl}/?add-to-cart=${productIds}&quantity=${quantities}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 bg-black/25 backdrop-blur-xs flex justify-end"
        >
          {/* Side Drawer Panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-pearl-gray/10 relative"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-pearl-gray/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pearl-ink">
                  Tu Bolsa
                </span>
                {items.length > 0 && (
                  <span className="bg-pearl-white text-pearl-deep text-[10px] font-sans font-medium px-2 py-0.5 rounded-none">
                    {items.reduce((acc, i) => acc + i.quantity, 0)} piezas
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-pearl-brown hover:text-pearl-ink p-1 transition-colors focus:outline-none"
                aria-label="Cerrar bolsa"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-pearl-gray/10">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-12">
                  <p className="text-sm text-pearl-brown max-w-[240px]">
                    Tu bolsa está vacía. Encuentra perlas que rompen el tabú en nuestra tienda.
                  </p>
                  <Link href="/tienda" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" className="text-[10px] py-3 px-6">
                      Explorar Tienda
                    </Button>
                  </Link>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => {
                    const product = item.product;
                    if (!product) return null;
                    const mainImage = product.images[0]?.src || "https://placehold.co/1200x1200/EDF2F5/909FAD?text=Producto";
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="py-5 flex gap-4"
                      >
                        {/* Thumbnail image (Squared 1:1) */}
                        <div className="relative h-20 w-20 bg-pearl-white flex-shrink-0 border border-pearl-gray/10 overflow-hidden">
                          <Image
                            src={mainImage}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between gap-2">
                              <h4 className="font-display text-sm text-pearl-ink leading-snug">
                                <Link 
                                  href={`/producto/${product.slug}`} 
                                  onClick={() => setIsOpen(false)}
                                  className="hover:text-pearl-deep transition-colors"
                                >
                                  {product.name}
                                </Link>
                              </h4>
                              <span className="font-sans text-xs font-semibold text-pearl-ink">
                                ${parseFloat(product.price).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            <p className="text-[11px] text-pearl-gray mt-0.5">
                              {product.categories[0]?.name || "Joyería"}
                            </p>
                          </div>

                          {/* Action controls (Qty & Remove) */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-pearl-gray/30 rounded-none bg-pearl-white">
                              <button
                                onClick={() => setQty(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-pearl-brown hover:text-pearl-ink transition-colors focus:outline-none"
                                aria-label="Disminuir cantidad"
                              >
                                <Minus className="h-2.5 w-2.5" />
                              </button>
                              <span className="px-2 font-sans text-xs font-medium text-pearl-ink min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => setQty(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-pearl-brown hover:text-pearl-ink transition-colors focus:outline-none"
                                aria-label="Aumentar cantidad"
                              >
                                <Plus className="h-2.5 w-2.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => remove(item.id)}
                              className="text-pearl-gray hover:text-red-600 transition-colors p-1"
                              aria-label="Quitar artículo"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer Summary (if has items) */}
            {items.length > 0 && (
              <div className="border-t border-pearl-gray/20 bg-pearl-white px-6 py-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs font-medium uppercase tracking-wider text-pearl-brown">
                    Subtotal
                  </span>
                  <span className="font-sans text-lg font-semibold text-pearl-ink">
                    ${subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <p className="text-[11px] leading-[1.5] text-pearl-brown">
                  Los envíos, impuestos y descuentos se calculan durante el checkout en wp.juliaguillen.com.
                </p>

                <a 
                  href={getCheckoutUrl()} 
                  className="w-full inline-block mt-2 focus:outline-none"
                >
                  <Button variant="primary" className="w-full py-4 text-xs tracking-[0.2em] font-medium flex items-center justify-center gap-2 group">
                    <span>Proceder al Pago</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </a>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-[10px] uppercase tracking-wider font-sans font-medium text-pearl-brown hover:text-pearl-ink transition-colors mt-1 py-1"
                >
                  Continuar Comprando
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
