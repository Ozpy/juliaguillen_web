import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../../components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuestra Historia",
  description: "Conoce el origen de Julia Guillén. Desde modernizar los collares de perlas considerados 'para viejitas' hasta crear piezas contemporáneas y sofisticadas hechas a mano.",
};

export default function HistoriaPage() {
  return (
    <div className="bg-pearl-white min-h-screen text-left">
      
      {/* 1. Hero Section */}
      <section className="bg-white border-b border-pearl-gray/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <span className="font-eyebrow text-pearl-gray mb-3 inline-block">
              Nuestra Historia
            </span>
            <h1 className="text-hero text-pearl-ink mb-6">
              Las perlas no son para viejitas
            </h1>
            <p className="text-base sm:text-lg leading-[1.8] text-pearl-brown">
              Comenzamos con una idea simple y audaz: redefinir la joya más atemporal de todas. Tomamos las perlas del joyero tradicional y las convertimos en declaraciones de estilo contemporáneo, hechas a mano para durar toda la vida.
            </p>
          </div>
          <div className="relative aspect-video lg:aspect-[4/3] bg-pearl-white border border-pearl-gray/10 overflow-hidden shadow-sm">
            <Image
              src="https://placehold.co/1200x800/EDF2F5/909FAD?text=Fundacion+Lupita+Guillen"
              alt="Lupita Guillén diseñando joyería fina de perlas"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* 2. Bloque de origen — El cuento de Lupita */}
      <section className="bg-pearl-cream py-20 md:py-32 border-b border-pearl-gray/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-square max-w-md mx-auto w-full bg-pearl-white border border-pearl-gray/10 overflow-hidden order-last lg:order-first">
            <Image
              src="https://placehold.co/800x800/EDF2F5/857B76?text=Primeros+Disenos"
              alt="Primeros diseños de collares de perlas modernizados"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-lg">
            <span className="font-eyebrow text-pearl-brown mb-3 inline-block">
              El Origen
            </span>
            <h2 className="text-display-2 text-pearl-ink mb-6">
              Modernizamos lo clásico
            </h2>
            <p className="text-sm sm:text-base leading-[1.8] text-pearl-brown mb-6 font-sans">
              Nuestra fundadora, Lupita Guillén, empezó reestructurando aquellos collares de perlas de río que descansaban en los joyeros de la familia, etiquetados bajo el prejuicio de ser &ldquo;para viejitas&rdquo;. Lupita vio en ellos una nobleza y una luz que merecían brillar en el presente.
            </p>
            <p className="text-sm sm:text-base leading-[1.8] text-pearl-brown font-sans">
              Desarmó los hilos rígidos, mezcló las perlas con metales frescos y asimetrías orgánicas, y creó las primeras piezas. El resultado fue inmediato: la joyería cobró una vitalidad nueva y rompió con décadas de estigmas clásicos.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Bloque de hijas/modelos — Susi como modelo */}
      <section className="bg-white py-20 md:py-32 border-b border-pearl-gray/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="max-w-lg">
            <span className="font-eyebrow text-pearl-gray mb-3 inline-block">
              La Inspiración
            </span>
            <h2 className="text-display-2 text-pearl-ink mb-6">
              La frescura de la juventud
            </h2>
            <p className="text-sm sm:text-base leading-[1.8] text-pearl-brown mb-6 font-sans">
              Para mostrar que nuestras perlas se adaptaban a cualquier momento, Susi, hija y sobrina del equipo, comenzó a modelar las piezas cuando apenas tenía 11 o 12 años.
            </p>
            <p className="text-sm sm:text-base leading-[1.8] text-pearl-brown font-sans">
              La vestíamos con ropa sumamente simple (camisetas básicas de algodón blanco, mezclilla cruda) con el fin de que lo único que destacara fuera la joyería. Esa naturalidad sin poses rompió de golpe la idea de que las perlas exigen vestidos solemnes de etiqueta. Se convirtieron en el complemento de la vida real.
            </p>
          </div>
          <div className="relative aspect-[3/4] max-w-sm mx-auto w-full bg-pearl-white border border-pearl-gray/10 overflow-hidden">
            <Image
              src="https://placehold.co/900x1200/EDF2F5/909FAD?text=Susi+Modelando"
              alt="Susi modelando joyería fina de perlas con ropa simple"
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. Bloque de proceso — Hecho a mano */}
      <section className="bg-pearl-cream py-20 md:py-32 border-b border-pearl-gray/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-square max-w-md mx-auto w-full bg-pearl-white border border-pearl-gray/10 overflow-hidden order-last lg:order-first">
            <Image
              src="https://placehold.co/800x800/EDF2F5/857B76?text=Proceso+Artesanal"
              alt="Manos artesanas enhebrando collar de perlas de río"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-lg">
            <span className="font-eyebrow text-pearl-brown mb-3 inline-block">
              Nuestra Técnica
            </span>
            <h2 className="text-display-2 text-pearl-ink mb-6">
              Joyería hecha a mano
            </h2>
            <p className="text-sm sm:text-base leading-[1.8] text-pearl-brown mb-6 font-sans">
              Detrás de cada pieza hay horas de atención minuciosa. No creemos en la producción masiva. Seleccionamos perla por perla, buscando harmonías en sus reflejos iridiscentes naturales, y las enhebramos una a una mediante nudos artesanales franceses tradicionales.
            </p>
            <p className="text-sm sm:text-base leading-[1.8] text-pearl-brown font-sans">
              Trabajamos con chapa de oro de 14 y 18 quilates, plata esterlina mexicana pulida y pedrería fina certificada. Al ser perlas cultivadas naturales, ninguna pieza es idéntica a otra. Te llevas una obra irrepetible.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Cierre / CTA */}
      <section className="bg-white py-24 text-center">
        <div className="max-w-xl mx-auto px-6">
          <span className="font-eyebrow text-pearl-gray mb-3 inline-block">
            El Catálogo
          </span>
          <h2 className="text-display-1 text-pearl-ink mb-6">
            Encuentra tu historia
          </h2>
          <p className="text-sm sm:text-base leading-[1.7] text-pearl-brown mb-10 font-sans">
            Te invitamos a explorar nuestra colección completa y a encontrar esa pieza que conecte con tu estilo y te acompañe en las ocasiones que merecen ser recordadas.
          </p>
          <Link href="/tienda">
            <Button variant="primary">
              Ir a la tienda
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
