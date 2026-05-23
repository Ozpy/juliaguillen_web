import React, { Suspense } from "react";
import CatalogView from "../../../../components/product/CatalogView";
import type { Metadata } from "next";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

// Generate metadata dynamically
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prettyName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: prettyName,
    description: `Explora nuestra colección exclusiva de ${prettyName} hechos a mano. Joyería fina Julia Guillén.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  return (
    <div className="bg-pearl-white min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <Suspense fallback={
          <div className="w-full py-24 text-center animate-pulse">
            <span className="font-sans text-xs uppercase tracking-widest text-pearl-gray">
              Cargando categoría...
            </span>
          </div>
        }>
          <CatalogView 
            initialProducts={[]} 
            categories={[]} 
            initialCategorySlug={slug}
          />
        </Suspense>
      </div>
    </div>
  );
}
