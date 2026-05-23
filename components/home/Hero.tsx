"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-white border-b border-pearl-gray/10 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
          
          {/* Column 1: Editorial Text & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start text-left max-w-xl"
          >
            {/* Eyebrow */}
            <span className="font-eyebrow text-pearl-gray mb-4 inline-block">
              Joyería Fina
            </span>

            {/* Title (Cormorant Garamond text-hero) */}
            <h1 className="text-hero text-pearl-ink mb-6">
              Perlas que rompen el tabú
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg leading-[1.7] text-pearl-brown mb-10">
              Piezas únicas hechas a mano. Modernizamos lo clásico para que cada perla cuente una historia tuya.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full sm:w-auto">
              <Link href="/tienda">
                <Button variant="primary" className="flex items-center gap-2 group justify-center">
                  <span>Ver colección</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/historia" className="self-start sm:self-auto py-2">
                <Button variant="secondary">
                  Conoce la historia
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Column 2: Large Visual Asset */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[4/5] md:aspect-square bg-pearl-white overflow-hidden border border-pearl-gray/10"
          >
            <Image
              src="https://placehold.co/1920x1920/EDF2F5/909FAD?text=Julia+Guillen+Coleccion+Perlas"
              alt="Joyería fina de perlas Julia Guillén hechas a mano"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
