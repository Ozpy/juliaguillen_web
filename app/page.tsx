import React from "react";
import Hero from "../components/home/Hero";
import CategoriesGrid from "../components/home/CategoriesGrid";
import FeaturedProducts from "../components/home/FeaturedProducts";
import BrandStory from "../components/home/BrandStory";
import Guarantees from "../components/home/Guarantees";
import CtaFinal from "../components/home/CtaFinal";
import CartClearer from "../components/layout/CartClearer";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  // Await search parameters to check if user returned from a successful WooCommerce checkout
  const resolvedParams = await searchParams;
  const isOrderComplete = resolvedParams.order_complete === "1";

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      {/* Client-side cart cleaner triggered upon WooCommerce return */}
      <CartClearer clear={isOrderComplete} />

      {/* Hero Banner Section */}
      <Hero />

      {/* Product Categories Section */}
      <CategoriesGrid />

      {/* Featured Collection Section */}
      <FeaturedProducts />

      {/* Brand Narrative Section */}
      <BrandStory />

      {/* Guarantees Section */}
      <Guarantees />

      {/* CTA Final Section */}
      <CtaFinal />
    </div>
  );
}
