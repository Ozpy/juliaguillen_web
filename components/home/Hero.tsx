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
      {/* 
        Editorial Layout: 
        We use a 12-column grid on desktop.
        Image spans the right side (cols 5-12).
        Text block spans the left side (cols 1-6) and overlaps the image.
      */}
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-12 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center relative min-h-[75vh]">

          {/* Large Visual Asset (Background/Right side) */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-start-5 lg:col-span-8 relative w-full h-[60vh] lg:h-full min-h-[500px] bg-pearl-cream overflow-hidden shadow-2xl z-0"
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
            <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none" />
          </motion.div>

          {/* Editorial Text Block (Overlapping) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-start-1 lg:col-span-6 z-10 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-12 xl:left-24 bg-white/90 backdrop-blur-md p-8 md:p-12 shadow-xl border border-white/20 max-w-xl"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="font-eyebrow text-pearl-deep inline-block">
                Colección Exclusiva
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={itemVariants} className="text-hero text-pearl-ink mb-6 italic">
              Perlas que <br /><span className="not-italic">rompen</span> el tabú
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg leading-[1.7] text-pearl-brown mb-10">
              Piezas únicas hechas a mano. Modernizamos lo clásico para que cada perla cuente una historia tuya, diseñada para destacar.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full sm:w-auto">
              <Link href="/tienda">
                <Button variant="primary" className="flex items-center gap-2 group justify-center w-full sm:w-auto">
                  <span>Ver colección</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/historia" className="self-center sm:self-auto group">
                <span className="text-pearl-deep font-medium border-b border-transparent group-hover:border-pearl-deep transition-colors duration-300 pb-0.5">
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
