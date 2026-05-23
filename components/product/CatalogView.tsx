"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product, WooCategory } from "../../types";
import ProductCard from "./ProductCard";
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CatalogViewProps {
  initialProducts: Product[];
  categories: WooCategory[];
}

type SortOption = "recent" | "price-asc" | "price-desc";

export default function CatalogView({ initialProducts, categories }: CatalogViewProps) {
  const searchParams = useSearchParams();
  
  // States for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Read initial search query or category from URL if present
  useEffect(() => {
    const search = searchParams.get("search");
    if (search && search !== "active") {
      setSearchQuery(search);
    }

    const cat = searchParams.get("categoria");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Handle URL filters when category is updated
  const handleCategorySelect = (catSlug: string) => {
    setSelectedCategory(catSlug);
    // Safely update history URL
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (catSlug === "all") {
        url.searchParams.delete("categoria");
      } else {
        url.searchParams.set("categoria", catSlug);
      }
      window.history.replaceState({}, "", url.pathname + url.search);
    }
  };

  // Filter options definitions
  const materials = [
    { name: "Todos", value: "all" },
    { name: "Perlas", value: "perla" },
    { name: "Oro", value: "oro" },
    { name: "Plata", value: "plata" },
  ];

  const priceRanges = [
    { name: "Todos", value: "all" },
    { name: "Menos de $1,500", value: "under-1500" },
    { name: "$1,500 - $2,500", value: "1500-2500" },
    { name: "Más de $2,500", value: "over-2500" },
  ];

  // Filtering & Sorting core logic
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // 1. Text Search Filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.short_description.toLowerCase().includes(query)
      );
    }

    // 2. Category Filter
    if (selectedCategory !== "all") {
      result = result.filter((product) =>
        product.categories.some((c) => c.slug === selectedCategory)
      );
    }

    // 3. Material Filter
    if (selectedMaterial !== "all") {
      const query = selectedMaterial.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // 4. Price Range Filter
    if (selectedPriceRange !== "all") {
      result = result.filter((product) => {
        const price = parseFloat(product.price);
        if (selectedPriceRange === "under-1500") return price < 1500;
        if (selectedPriceRange === "1500-2500") return price >= 1500 && price <= 2500;
        if (selectedPriceRange === "over-2500") return price > 2500;
        return true;
      });
    }

    // 5. Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else {
      // "recent" or default (by WooCommerce ID descending / order as retrieved)
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [initialProducts, searchQuery, selectedCategory, selectedMaterial, selectedPriceRange, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedMaterial("all");
    setSelectedPriceRange("all");
    setSortBy("recent");
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("categoria");
      url.searchParams.delete("search");
      window.history.replaceState({}, "", url.pathname);
    }
  };

  const activeFilterCount = 
    (selectedCategory !== "all" ? 1 : 0) + 
    (selectedMaterial !== "all" ? 1 : 0) + 
    (selectedPriceRange !== "all" ? 1 : 0) +
    (searchQuery !== "" ? 1 : 0);

  if (initialProducts.length === 0) {
    return (
      <div className="w-full py-24 px-6 text-center border border-pearl-gray/10 bg-white max-w-xl mx-auto flex flex-col items-center gap-5 shadow-xs">
        <span className="font-eyebrow text-pearl-gray">Colección Exclusiva</span>
        <h2 className="font-display text-2xl sm:text-3xl text-pearl-ink font-medium leading-tight">
          Nuestra colección está en preparación
        </h2>
        <p className="text-sm leading-[1.6] text-pearl-brown max-w-sm font-sans">
          Actualmente nos encontramos vistiendo nuestro catálogo digital. Muy pronto compartiremos nuestras piezas únicas hechas a mano.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Search and Quick Filters bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-pearl-gray/20 pb-6 mb-8">
        {/* Text Search Input */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar joyas, perlas, oro..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-pearl-gray/30 text-sm font-sans focus:outline-none focus:border-pearl-deep transition-colors rounded-none"
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-pearl-gray" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3.5 text-pearl-gray hover:text-pearl-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center justify-between md:justify-end gap-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-pearl-gray/30 text-xs font-sans font-medium uppercase tracking-wider text-pearl-ink rounded-none"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filtros {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block font-sans text-xs text-pearl-brown uppercase tracking-wider">
              Ordenar por:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white border border-pearl-gray/30 pl-4 pr-10 py-3 text-xs font-sans font-medium uppercase tracking-wider text-pearl-ink rounded-none focus:outline-none focus:border-pearl-deep cursor-pointer"
              >
                <option value="recent">Más recientes</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 h-4.5 w-4.5 text-pearl-gray pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden lg:block w-60 flex-shrink-0 text-left">
          <div className="flex items-center justify-between pb-4 border-b border-pearl-gray/20 mb-6">
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-pearl-ink">
              Filtros
            </span>
            {activeFilterCount > 0 && (
              <button 
                onClick={clearAllFilters}
                className="text-[10px] uppercase tracking-wider font-sans font-medium text-pearl-deep hover:text-pearl-deep-hover underline"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-pearl-ink mb-4">
              Categorías
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleCategorySelect("all")}
                className={cn(
                  "text-sm font-sans py-1 text-left transition-colors",
                  selectedCategory === "all" ? "text-pearl-deep font-semibold" : "text-pearl-brown hover:text-pearl-ink"
                )}
              >
                Todas las piezas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={cn(
                    "text-sm font-sans py-1 text-left transition-colors",
                    selectedCategory === cat.slug ? "text-pearl-deep font-semibold" : "text-pearl-brown hover:text-pearl-ink"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Material Filter */}
          <div className="mb-8">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-pearl-ink mb-4">
              Materiales
            </h4>
            <div className="flex flex-col gap-2">
              {materials.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setSelectedMaterial(m.value)}
                  className={cn(
                    "text-sm font-sans py-1 text-left transition-colors",
                    selectedMaterial === m.value ? "text-pearl-deep font-semibold" : "text-pearl-brown hover:text-pearl-ink"
                  )}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-pearl-ink mb-4">
              Precio
            </h4>
            <div className="flex flex-col gap-2">
              {priceRanges.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setSelectedPriceRange(r.value)}
                  className={cn(
                    "text-sm font-sans py-1 text-left transition-colors",
                    selectedPriceRange === r.value ? "text-pearl-deep font-semibold" : "text-pearl-brown hover:text-pearl-ink"
                  )}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid Content */}
        <div className="flex-grow">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center border border-pearl-gray/10 bg-white">
              <p className="text-base text-pearl-brown font-sans mb-4">
                No encontramos piezas que coincidan con tu búsqueda.
              </p>
              <button
                onClick={clearAllFilters}
                className="text-xs uppercase tracking-wider font-sans font-medium text-pearl-deep hover:text-pearl-deep-hover underline"
              >
                Ver toda la colección
              </button>
            </div>
          ) : (
            <div>
              <p className="text-left font-sans text-xs text-pearl-brown tracking-wider mb-6">
                Mostrando {filteredProducts.length} pieza{filteredProducts.length !== 1 && "s"}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 sm:gap-x-8 sm:gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filters Modal Panel - Mobile */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xs flex justify-end lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="w-full max-w-xs bg-white h-full p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-pearl-gray/20 pb-4 mb-6">
                  <span className="font-sans text-xs font-semibold uppercase tracking-widest text-pearl-ink">
                    Filtros
                  </span>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <X className="h-5 w-5 text-pearl-gray" />
                  </button>
                </div>

                {/* Categories - Mobile */}
                <div className="mb-6">
                  <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-pearl-ink mb-3">
                    Categorías
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCategorySelect("all")}
                      className={cn(
                        "px-3 py-1.5 font-sans text-xs rounded-none transition-colors border",
                        selectedCategory === "all" 
                          ? "bg-pearl-deep text-white border-transparent" 
                          : "bg-pearl-white text-pearl-brown border-pearl-gray/20"
                      )}
                    >
                      Todas
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.slug)}
                        className={cn(
                          "px-3 py-1.5 font-sans text-xs rounded-none transition-colors border",
                          selectedCategory === cat.slug 
                            ? "bg-pearl-deep text-white border-transparent" 
                            : "bg-pearl-white text-pearl-brown border-pearl-gray/20"
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Materials - Mobile */}
                <div className="mb-6">
                  <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-pearl-ink mb-3">
                    Materiales
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {materials.map((m) => (
                      <button
                        key={m.value}
                        onClick={() => setSelectedMaterial(m.value)}
                        className={cn(
                          "px-3 py-1.5 font-sans text-xs rounded-none transition-colors border",
                          selectedMaterial === m.value 
                            ? "bg-pearl-deep text-white border-transparent" 
                            : "bg-pearl-white text-pearl-brown border-pearl-gray/20"
                        )}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price - Mobile */}
                <div className="mb-6">
                  <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-pearl-ink mb-3">
                    Precio
                  </h4>
                  <div className="flex flex-col gap-2">
                    {priceRanges.map((r) => (
                      <button
                        key={r.value}
                        onClick={() => setSelectedPriceRange(r.value)}
                        className={cn(
                          "text-sm font-sans py-1.5 text-left border-b border-pearl-gray/5 transition-colors",
                          selectedPriceRange === r.value ? "text-pearl-deep font-semibold" : "text-pearl-brown"
                        )}
                      >
                        {r.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="flex-1 py-3 text-xs font-sans font-medium uppercase tracking-wider bg-pearl-white border border-pearl-gray/20 text-pearl-brown hover:bg-pearl-cream transition-colors text-center"
                  >
                    Limpiar
                  </button>
                )}
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 py-3 text-xs font-sans font-medium uppercase tracking-wider bg-pearl-deep text-white text-center"
                >
                  Ver Resultados
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
