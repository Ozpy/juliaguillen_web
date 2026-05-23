"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "../../types";
import { cn } from "../../lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const mainImage = product.images[0]?.src || "https://placehold.co/1200x1200/EDF2F5/909FAD?text=Producto";
  const altText = product.images[0]?.alt || product.name;
  
  // Format prices nicely
  const displayPrice = parseFloat(product.price).toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const displayRegularPrice = product.regular_price 
    ? parseFloat(product.regular_price).toLocaleString("es-MX", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    : null;

  return (
    <Link 
      href={`/producto/${product.slug}`} 
      className={cn("group block focus:outline-none", className)}
    >
      {/* Visual Image Container - Squared 1:1 */}
      <div className="relative aspect-square w-full bg-pearl-white overflow-hidden border border-pearl-gray/10 mb-4">
        {product.on_sale && (
          <div className="absolute top-3 left-3 z-10 bg-pearl-deep text-white text-[9px] font-sans font-medium uppercase tracking-widest px-2.5 py-1 rounded-none shadow-sm">
            Oferta
          </div>
        )}
        
        {/* Discrete Image Hover Zoom */}
        <motion.div 
          className="relative w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={mainImage}
            alt={altText}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            priority={false}
          />
        </motion.div>
      </div>

      {/* Product Metadata */}
      <div className="flex flex-col gap-1 text-left">
        {/* Category (Eyebrow/Caption style) */}
        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-pearl-brown">
          {product.categories[0]?.name || "Joyería Fina"}
        </span>

        {/* Product Name (Cormorant Garamond Serif) */}
        <h3 className="font-display text-base sm:text-lg text-pearl-ink font-medium leading-snug group-hover:text-pearl-deep transition-colors duration-300">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="flex items-center gap-2 mt-0.5">
          {product.on_sale && displayRegularPrice ? (
            <>
              <span className="font-sans text-xs text-pearl-gray line-through">
                ${displayRegularPrice}
              </span>
              <span className="font-sans text-sm font-semibold text-pearl-deep">
                ${displayPrice}
              </span>
            </>
          ) : (
            <span className="font-sans text-sm font-semibold text-pearl-ink">
              ${displayPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
