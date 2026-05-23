import React from "react";
import { Product } from "../../types";
import ProductCard from "./ProductCard";
import { cn } from "../../lib/utils";

interface ProductGridProps {
  products: Product[];
  className?: string;
  emptyMessage?: string;
}

export default function ProductGrid({ 
  products, 
  className,
  emptyMessage = "No se encontraron productos." 
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="w-full py-16 text-center">
        <p className="text-sm text-pearl-brown font-sans">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 sm:gap-x-8 sm:gap-y-16", 
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
