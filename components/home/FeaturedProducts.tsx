import React from "react";
import Link from "next/link";
import { getFeaturedProducts } from "../../lib/woo";
import ProductCard from "../product/ProductCard";
import { ArrowRight } from "lucide-react";

export default async function FeaturedProducts() {
  // Fetch featured products server-side
  const products = await getFeaturedProducts();
  const displayProducts = products.slice(0, 6); // Up to 6 products for the carousel

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 md:py-24 lg:py-32 border-y border-pearl-gray/10 w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Header - Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-lg text-left">
            <span className="font-eyebrow text-pearl-gray mb-3 inline-block">
              Colección Destacada
            </span>
            <h2 className="text-display-1 text-pearl-ink">
              Las piezas <span className="italic">del momento</span>
            </h2>
          </div>
          
          {/* Call to Action Button */}
          <div className="md:pb-2 flex-shrink-0">
            <Link href="/tienda" className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-pearl-brown hover:text-pearl-ink transition-colors duration-300 border-b border-pearl-brown/30 hover:border-pearl-ink pb-1">
              <span>Ver toda la tienda</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div className="relative -mx-6 lg:-mx-12 px-6 lg:px-12">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-12 pt-4 hide-scrollbar">
            {displayProducts.map((product) => (
              <div 
                key={product.id} 
                className="min-w-[85vw] sm:min-w-[45vw] lg:min-w-[30vw] xl:min-w-[25vw] flex-shrink-0 snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
            
            {/* End Spacer to allow last item to scroll into view with padding */}
            <div className="min-w-[5vw] flex-shrink-0" aria-hidden="true" />
          </div>
        </div>

      </div>
    </section>
  );
}
