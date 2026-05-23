"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "../ui/Button";

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for the image: moves slightly up as you scroll down
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={containerRef} className="bg-pearl-cream py-12 md:py-24 lg:py-40 w-full overflow-hidden relative" style={{ position: "relative" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

          {/* Column 1: Editorial Image (Lg spans 7 cols) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative bg-pearl-white/20 overflow-hidden shadow-2xl z-10 w-full"
            style={{
              aspectRatio: "3/4",
              // We constrain the height on desktop so it doesn't get too massive
              maxHeight: "80vh"
            }}
          >
            <motion.div style={{ y }} className="absolute inset-0 w-full h-[110%] -top-[5%]">
              <Image
                src="/images/perlas-history.png"
                alt="Joyería de perlas finas Julia Guillén hechas a mano"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Column 2: Story Copy (Lg spans 5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col items-start text-left z-20"
          >
            {/* Brand Quote in Serif Italics */}
            <span className="font-eyebrow text-pearl-brown mb-6 block">
              Nuestra esencia
            </span>
            <h2 className="text-display-2 text-pearl-ink mb-8 italic font-medium leading-[1.15]">
              Las perlas no son <br /><span className="not-italic">para viejitas</span>
            </h2>

            {/* Paragraph */}
            <p className="text-base sm:text-lg leading-[1.8] text-pearl-ink/80 mb-10 font-sans max-w-sm">
              Empezamos modernizando collares de perlas que se consideraban "clásicos" y los convertimos en piezas audaces y sofisticadas. Hoy hacemos joyería única a mano que rompe esquemas y celebra tu individualidad.
            </p>

            {/* Action */}
            <Link href="/historia" className="group">
              <span className="text-pearl-deep font-display italic text-xl border-b border-pearl-deep/30 group-hover:border-pearl-deep transition-colors duration-300 pb-1">
                Conoce la historia
              </span>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Decorative large text behind everything */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.03] overflow-hidden mix-blend-color-burn z-0">
        <span className="font-display italic text-[20vw] leading-none whitespace-nowrap">
          Julia Guillén
        </span>
      </div>
    </section>
  );
}
