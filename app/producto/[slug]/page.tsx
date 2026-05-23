import React, { Suspense } from "react";
import { getProductBySlug, getProductsByCategory } from "../../../lib/woo";
import ProductGallery from "../../../components/product/ProductGallery";
import ProductPurchaseSection from "../../../components/product/ProductPurchaseSection";
import Accordion from "../../../components/ui/Accordion";
import ProductCard from "../../../components/product/ProductCard";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Product } from "../../../types";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

// Generate dynamic SEO metadata for each product
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto No Encontrado",
      description: "El artículo solicitado no se encuentra disponible."
    };
  }

  const plainTextDescription = product.short_description
    ? product.short_description.replace(/<[^>]*>/g, "")
    : "Detalle de joyería fina hecha a mano. Julia Guillén.";

  return {
    title: product.name,
    description: plainTextDescription,
    openGraph: {
      title: `${product.name} | Julia Guillén Joyería Fina`,
      description: plainTextDescription,
      type: "article",
      images: product.images.map((img) => ({ url: img.src, alt: img.alt || product.name }))
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the asynchronous params promise as required in Next.js 16/15
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch related products (same category)
  const categoryId = product.categories[0]?.id;
  let relatedProducts: Product[] = [];
  if (categoryId) {
    const fetchedRelated = await getProductsByCategory(categoryId);
    // Filter out the current product itself
    relatedProducts = fetchedRelated
      .filter((p) => p.id !== product.id)
      .slice(0, 4); // Limit to top 4 related products
  }

  // Build accordion contents
  const accordionItems = [
    {
      id: "description",
      title: "Descripción",
      content: (
        <div 
          dangerouslySetInnerHTML={{ __html: product.description || product.short_description }} 
          className="prose prose-sm text-pearl-brown font-sans leading-relaxed"
        />
      )
    },
    {
      id: "materials",
      title: "Materiales",
      content: (
        <p className="font-sans text-sm text-pearl-brown leading-relaxed">
          Nuestras piezas se confeccionan a mano utilizando perlas naturales cultivadas de agua dulce, seleccionadas rigurosamente por su lustre y forma única. Complementadas con broches y componentes de chapa de oro de 14k o plata esterlina .925 de la más alta ley mexicana.
        </p>
      )
    },
    {
      id: "care",
      title: "Cuidados",
      content: (
        <ul className="list-disc pl-5 font-sans text-sm text-pearl-brown flex flex-col gap-1.5 leading-relaxed">
          <li>Limpia suavemente tus piezas con un paño de microfibra después de usarlas.</li>
          <li>Evita el contacto directo con perfumes, cremas, alcohol y sudor excesivo.</li>
          <li>No sumergir en agua clorada (albercas) o salada (mar).</li>
          <li>Guarda las perlas en su estuche original de tela suave para evitar raspaduras.</li>
        </ul>
      )
    },
    {
      id: "shipping",
      title: "Envíos y Devoluciones",
      content: (
        <div className="font-sans text-sm text-pearl-brown flex flex-col gap-2 leading-relaxed">
          <p>
            <strong>Envíos:</strong> Express a toda la República Mexicana. Entrega asegurada de 3 a 5 días hábiles en zonas de cobertura regular.
          </p>
          <p>
            <strong>Devoluciones:</strong> En Julia Guillén valoramos la entera satisfacción. Aceptamos devoluciones en piezas sin usar y con empaque original intacto dentro de los primeros 7 días naturales tras la recepción.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="bg-pearl-white min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Double-column Product Details Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-pearl-gray/20">
          
          {/* Left Column: Visual Gallery (60% / spans 7 columns) */}
          <div className="lg:col-span-7 w-full">
            <ProductGallery images={product.images} />
          </div>

          {/* Right Column: Info & Purchase (40% / spans 5 columns) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left gap-6 w-full lg:sticky lg:top-28">
            {/* Category / Collection breadcrumb */}
            <div className="flex flex-col gap-1">
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-pearl-brown">
                {product.categories[0]?.name || "Colección Exclusiva"}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl text-pearl-ink font-medium leading-tight mt-1">
                {product.name}
              </h1>
            </div>

            {/* Price tag */}
            <span className="font-sans text-2xl font-semibold text-pearl-deep">
              ${parseFloat(product.price).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>

            {/* Short HTML Description snippet */}
            {product.short_description && (
              <div 
                dangerouslySetInnerHTML={{ __html: product.short_description }} 
                className="prose prose-sm text-pearl-brown font-sans leading-relaxed border-t border-pearl-gray/10 pt-4"
              />
            )}

            {/* Interactive selectors & Checkout dispatch client */}
            <ProductPurchaseSection product={product} />

            {/* Product Meta Accordion details */}
            <Accordion items={accordionItems} className="w-full mt-6" />
          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-20 text-left">
            <h2 className="font-display text-2xl text-pearl-ink mb-10">
              También te puede gustar
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((relatedProd) => (
                <ProductCard key={relatedProd.id} product={relatedProd} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
