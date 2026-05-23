"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

export default function CtaFinal() {
  return (
    <section className="bg-pearl-deep py-24 md:py-36 w-full text-center relative overflow-hidden flex items-center justify-center">
      {/* Decorative background perla sutil texture */}
      <div className="absolute inset-0 opacity-10 bg-radial-gradient from-white/30 to-transparent pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <span className="font-eyebrow text-white/70">
            Piezas Únicas
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white font-medium leading-tight max-w-xl">
            Encuentra tu pieza
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-md font-sans mb-4">
            Explora la colección completa de perlas cultivadas y metales nobles hechas a mano para durar toda la vida.
          </p>
          <Link href="/tienda" className="focus:outline-none">
            <Button variant="inverse" className="flex items-center gap-2 group">
              <span>Ir a la tienda</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 text-pearl-deep" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
