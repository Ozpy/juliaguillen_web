import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "../../lib/woo";

export default async function CategoriesGrid() {
  // Fetch real WooCommerce categories from WordPress server-side
  const categories = await getCategories();

  // If there are no categories configured, hide the section entirely
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-pearl-white py-12 md:py-24 lg:py-32 w-full border-b border-pearl-gray/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-6">
          <div className="max-w-lg text-left">
            <span className="font-eyebrow text-pearl-deep mb-2 md:mb-4 inline-block">
              Colecciones
            </span>
            <h2 className="text-display-1 text-pearl-ink italic">
              Explora por <span className="not-italic">tipo de pieza</span>
            </h2>
          </div>
          <div className="md:pb-2">
             <Link href="/tienda" className="text-sm uppercase tracking-widest text-pearl-brown hover:text-pearl-ink transition-colors duration-300 border-b border-pearl-brown/30 hover:border-pearl-ink pb-1">
               Ver toda la tienda
             </Link>
          </div>
        </div>

        {/* Categories Grid (Staggered Bento Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 auto-rows-[250px] md:auto-rows-[350px]">
          {categories.map((category, index) => {
            const categoryImage = category.image?.src || `https://placehold.co/800x800/EDF2F5/909FAD?text=${encodeURIComponent(category.name)}`;
            
            // Dynamic column spans for a Bento box feel
            // Pattern for 4 items: [lg-7, lg-5], [lg-5, lg-7]
            let colSpanClass = "lg:col-span-4";
            if (index % 4 === 0) colSpanClass = "lg:col-span-7";
            else if (index % 4 === 1) colSpanClass = "lg:col-span-5";
            else if (index % 4 === 2) colSpanClass = "lg:col-span-5";
            else if (index % 4 === 3) colSpanClass = "lg:col-span-7";
            
            // Stagger vertical alignment slightly on desktop
            const marginTopClass = index % 2 !== 0 ? "lg:mt-12 lg:-mb-12" : "";

            return (
              <div key={category.id} className={`w-full relative h-full group ${colSpanClass} ${marginTopClass}`}>
                <Link 
                  href={`/tienda/categoria/${category.slug}`}
                  className="block w-full h-full relative overflow-hidden bg-white border border-pearl-gray/20 shadow-sm focus:outline-none"
                >
                  {/* Image Background */}
                  <div className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                    <Image
                      src={categoryImage}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pearl-ink/40 via-pearl-ink/0 to-pearl-ink/0 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Category Name & Action (Floating bottom left) */}
                  <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                    <h3 className="font-display text-2xl text-pearl-pure italic drop-shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      {category.name}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 border border-white/30">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
