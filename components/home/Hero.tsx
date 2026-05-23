"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    }
  },
};

export default function Hero() {
  return (
    <section className="bg-pearl-white w-full relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto w-full px-0 sm:px-6 lg:px-12 py-0 sm:py-12 md:py-24">
        <div className="flex flex-col lg:grid lg:grid-cols-12 items-center relative min-h-[85vh] sm:min-h-0 sm:h-auto lg:min-h-[75vh]">

          {/* Large Visual Asset (Background on Mobile / Right side on Desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-[85vh] lg:relative lg:h-full lg:col-start-5 lg:col-span-8 lg:min-h-[500px] bg-pearl-cream overflow-hidden shadow-none lg:shadow-2xl z-0"
          >
            {/* Very slow continuous scale to give a "breathing" parallax effect */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src="/images/hero.png"
                alt="Joyería fina de perlas Julia Guillén hechas a mano"
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
                priority
              />
            </motion.div>
            {/* Overlay gradient on mobile for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0 lg:hidden pointer-events-none" />
            <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none" />
          </motion.div>

          {/* Editorial Text Block (Overlapping bottom on mobile, left on desktop) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="absolute bottom-0 w-full px-5 py-8 pb-10 bg-white/95 backdrop-blur-md shadow-2xl lg:shadow-xl border-t border-white/20 lg:border lg:w-auto lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:left-12 xl:left-24 lg:p-8 xl:p-12 z-10 lg:col-start-1 lg:col-span-6 max-w-xl lg:rounded-none"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-3 lg:mb-4">
              <span className="font-eyebrow text-pearl-deep inline-block text-xs lg:text-sm">
                Colección Exclusiva
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={itemVariants} className="text-hero text-pearl-ink mb-4 lg:mb-6 italic">
              Perlas que <br className="hidden sm:block" /><span className="not-italic">rompen</span> el tabú
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="text-sm sm:text-base lg:text-lg leading-[1.6] lg:leading-[1.7] text-pearl-brown mb-8 lg:mb-10">
              Piezas únicas hechas a mano. Modernizamos lo clásico para que cada perla cuente una historia tuya, diseñada para destacar.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:gap-6 w-full sm:w-auto">
              <Link href="/tienda">
                <Button variant="primary" className="flex items-center gap-2 group justify-center w-full py-4 lg:py-auto">
                  <span>Ver colección</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/historia" className="self-center sm:self-auto group mt-2 sm:mt-0">
                <span className="text-pearl-deep font-medium border-b border-transparent group-hover:border-pearl-deep transition-colors duration-300 pb-0.5 text-sm lg:text-base">
                  Conoce la historia
                </span>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
