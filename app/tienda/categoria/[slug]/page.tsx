import React, { Suspense } from "react";
import { getCategories, getProductsByCategory } from "../../../../lib/woo";
import CatalogView from "../../../../components/product/CatalogView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

// Generate dynamic metadata for categories
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Categoría No Encontrada",
      description: "La categoría solicitada no se encuentra disponible."
    };
  }

  return {
    title: category.name,
    description: category.description || `Explora nuestra colección exclusiva de ${category.name} hechos a mano. Joyería fina Julia Guillén.`
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await the asynchronous params promise as required in Next.js 16/15
  const { slug } = await params;

  // Fetch all categories to locate the target one
  const categories = await getCategories();
  const currentCategory = categories.find((c) => c.slug === slug);

  if (!currentCategory) {
    notFound();
  }

  // Fetch only products belonging to this category ID
  const categoryProducts = await getProductsByCategory(currentCategory.id);

  return (
    <div className="bg-pearl-white min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Editorial Heading */}
        <div className="text-left mb-12 md:mb-16">
          <span className="font-eyebrow text-pearl-gray mb-3 inline-block">
            Colección / Categoría
          </span>
          <h1 className="text-display-1 text-pearl-ink mb-4">
            {currentCategory.name}
          </h1>
          {currentCategory.description && (
            <p className="text-sm text-pearl-brown max-w-xl leading-relaxed">
              {currentCategory.description}
            </p>
          )}
        </div>

        {/* Suspense boundary for search params / client filtering */}
        <Suspense fallback={
          <div className="w-full py-24 text-center">
            <span className="font-sans text-xs uppercase tracking-widest text-pearl-gray animate-pulse">
              Cargando piezas...
            </span>
          </div>
        }>
          <CatalogView 
            initialProducts={categoryProducts} 
            categories={categories} 
          />
        </Suspense>
      </div>
    </div>
  );
}
