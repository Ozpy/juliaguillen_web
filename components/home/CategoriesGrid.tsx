import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "../../lib/woo";
import { cn } from "../../lib/utils";

export default async function CategoriesGrid() {
  // Fetch real WooCommerce categories from WordPress server-side
  const categories = await getCategories();

  // If there are no categories configured, hide the section entirely
  if (categories.length === 0) {
    return null;
  }

  // Handle dynamic grid styling so it aligns beautifully whether you have 1, 2, 3 or 4+ categories
  const gridClasses = 
    categories.length === 1 
      ? "grid grid-cols-1 max-w-xs mx-auto gap-8 justify-center" 
      : categories.length === 2 
      ? "grid grid-cols-2 max-w-xl mx-auto gap-6 md:gap-8 justify-center" 
      : categories.length === 3 
      ? "grid grid-cols-3 max-w-4xl mx-auto gap-6 md:gap-8 justify-center" 
      : "grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8";

  return (
    <section className="bg-pearl-white py-20 md:py-32 w-full border-b border-pearl-gray/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-eyebrow text-pearl-gray mb-3 inline-block">
            Colecciones
          </span>
          <h2 className="text-display-1 text-pearl-ink">
            Explora por tipo de pieza
          </h2>
        </div>

        {/* Categories Grid */}
        <div className={gridClasses}>
          {categories.map((category) => {
            const categoryImage = category.image?.src || `https://placehold.co/800x800/EDF2F5/909FAD?text=${encodeURIComponent(category.name)}`;
            return (
              <div key={category.id} className="w-full">
                <Link 
                  href={`/tienda/categoria/${category.slug}`}
                  className="group block text-center focus:outline-none"
                >
                  {/* Image Wrapper (1:1 Aspect Ratio) */}
                  <div className="relative aspect-square w-full overflow-hidden bg-white border border-pearl-gray/10 mb-4">
                    {/* GPU accelerated Tailwind v4 smooth scale transition */}
                    <div className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                      <Image
                        src={categoryImage}
                        alt={category.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover"
                      />
                    </div>
                    {/* Subtle editorial backdrop overlay */}
                    <div className="absolute inset-0 bg-pearl-ink/0 group-hover:bg-pearl-ink/5 transition-colors duration-300 pointer-events-none" />
                  </div>

                  {/* Category Name */}
                  <h3 className="font-display text-lg text-pearl-ink group-hover:text-pearl-deep transition-colors duration-300 font-medium">
                    {category.name}
                  </h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
