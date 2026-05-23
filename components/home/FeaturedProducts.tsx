import React from "react";
import Link from "next/link";
import { getFeaturedProducts } from "../../lib/woo";
import ProductCard from "../product/ProductCard";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

export default async function FeaturedProducts() {
  // Fetch featured products server-side
  const products = await getFeaturedProducts();
  const displayProducts = products.slice(0, 4); // Limit to top 4 products

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20 md:py-32 border-y border-pearl-gray/10 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-eyebrow text-pearl-gray mb-3 inline-block">
            Colección destacada
          </span>
          <h2 className="text-display-1 text-pearl-ink">
            Las piezas del momento
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16 mb-16">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <Link href="/tienda">
            <Button variant="primary" className="flex items-center gap-2 group mx-auto">
              <span>Ver toda la tienda</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
