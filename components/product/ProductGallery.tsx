"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { WooImage } from "../../types";
import { cn } from "../../lib/utils";

interface ProductGalleryProps {
  images: WooImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback image if list is empty
  const defaultImage = "https://placehold.co/1200x1200/EDF2F5/909FAD?text=Producto";
  const galleryImages = images.length > 0 
    ? images 
    : [{ id: 0, src: defaultImage, alt: "Imagen de Joyería Julia Guillén" }];

  const activeImage = galleryImages[activeIndex];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
      {/* Thumbnails Sidebar */}
      {galleryImages.length > 1 && (
        <div className="flex flex-row md:flex-col gap-3 justify-start overflow-x-auto md:overflow-x-visible md:w-20 w-full flex-shrink-0 py-1">
          {galleryImages.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={image.id || index}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)} // Elegant hover switch
                className={cn(
                  "relative aspect-square w-16 md:w-20 bg-pearl-white border transition-all duration-300 overflow-hidden flex-shrink-0 cursor-pointer focus:outline-none",
                  isActive 
                    ? "border-pearl-deep ring-1 ring-pearl-deep" 
                    : "border-pearl-gray/20 hover:border-pearl-gray"
                )}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt || `Miniatura ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Primary Large Image (Squared 1:1) */}
      <div className="relative flex-1 aspect-square bg-pearl-white border border-pearl-gray/10 overflow-hidden w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage.id || activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="relative w-full h-full"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt || "Imagen principal de joyería"}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
