"use client";

import React from "react";
import { Sparkles, Truck, Gem } from "lucide-react";
import { motion } from "framer-motion";

export default function Guarantees() {
  const guarantees = [
    {
      icon: Sparkles,
      title: "Hecho a mano",
      description: "Cada pieza es única y confeccionada artesanalmente por manos mexicanas."
    },
    {
      icon: Truck,
      title: "Envío seguro",
      description: "Envío express protegido y rastreable a cualquier parte de la República Mexicana."
    },
    {
      icon: Gem,
      title: "Materiales finos",
      description: "Selección rigurosa de perlas naturales de cultivo, oro, plata esterlina y gemas finas."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="bg-white py-16 md:py-24 border-b border-pearl-gray/10 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center p-4 max-w-sm mx-auto"
              >
                <div className="bg-pearl-white text-pearl-deep p-4 rounded-none border border-pearl-gray/10 mb-5 flex items-center justify-center">
                  <Icon className="h-6 w-6 stroke-[1.25]" />
                </div>
                <h3 className="font-display text-lg text-pearl-ink mb-2 font-medium">
                  {guarantee.title}
                </h3>
                <p className="text-sm leading-[1.6] text-pearl-brown">
                  {guarantee.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
