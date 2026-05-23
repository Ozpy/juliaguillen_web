import React, { Suspense } from "react";
import { getProducts, getCategories } from "../../lib/woo";
import CatalogView from "../../components/product/CatalogView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toda la Colección",
  description: "Explora nuestra colección completa de joyería fina hecha a mano. Aretes, collares de perlas, pulseras y conjuntos únicos creados en México.",
};

export default async function TiendaPage() {
  // Fetch products and categories in parallel server-side
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <div className="bg-pearl-white min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Editorial Heading */}
        <div className="text-left mb-12 md:mb-16">
          <span className="font-eyebrow text-pearl-gray mb-3 inline-block">
            Joyería Julia Guillén
          </span>
          <h1 className="text-display-1 text-pearl-ink mb-4">
            Toda la colección
          </h1>
          <p className="text-sm text-pearl-brown max-w-xl leading-relaxed">
            Explora piezas contemporáneas diseñadas a mano. Modernizamos lo clásico combinando perlas naturales cuidadosamente seleccionadas con oro, plata y pedrería fina.
          </p>
        </div>

        {/* Suspense boundary for search params / client filtering */}
        <Suspense fallback={
          <div className="w-full py-24 text-center">
            <span className="font-sans text-xs uppercase tracking-widest text-pearl-gray animate-pulse">
              Cargando colección...
            </span>
          </div>
        }>
          <CatalogView initialProducts={products} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
