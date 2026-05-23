"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../ui/Button";

export default function BrandStory() {
  return (
    <section className="bg-pearl-cream py-20 md:py-32 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column 1: Editorial Image (Lg spans 7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative aspect-[3/2] bg-pearl-white overflow-hidden border border-pearl-gray/10 shadow-md"
          >
            <Image
              src="https://placehold.co/1200x800/EDF2F5/857B76?text=Julia+Guillen+Fotografia+Editorial"
              alt="Modelo luciendo collar de perlas moderno de Julia Guillén"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </motion.div>

          {/* Column 2: Story Copy (Lg spans 5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col items-start text-left max-w-md"
          >
            {/* Brand Quote in Serif Italics */}
            <span className="font-eyebrow text-pearl-brown mb-4 block">
              Nuestra esencia
            </span>
            <h2 className="text-display-2 text-pearl-ink mb-6 italic font-medium leading-tight">
              Las perlas no son para viejitas
            </h2>

            {/* Paragraph */}
            <p className="text-base leading-[1.8] text-pearl-brown mb-8 font-sans">
              Empezamos modernizando collares de perlas considerados &ldquo;para viejitas&rdquo; y los convertimos en piezas contemporáneas y sofisticadas. Hoy hacemos piezas únicas a mano que rompen lo clásico y celebran la individualidad de quien las lleva.
            </p>

            {/* Action */}
            <Link href="/historia">
              <Button variant="secondary">
                Conoce la historia
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
