import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-pearl-gray/20 pt-16 pb-12 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-16">
          {/* Column 1: Brand / Story */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block focus:outline-none">
              <Image
                src="/images/logo.png"
                alt="Julia Guillén Joyería Fina"
                width={140}
                height={40}
                className="h-8 w-auto object-contain brightness-90"
              />
            </Link>
            <p className="text-sm leading-[1.7] text-pearl-brown max-w-sm mt-2">
              Modernizamos lo clásico. Creemos en el valor de las perlas como el ADN de nuestra marca, diseñando piezas contemporáneas y sofisticadas hechas a mano en México.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pearl-ink mb-1">
              Colección
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/tienda" className="text-sm text-pearl-brown hover:text-pearl-deep transition-colors">
                Toda la colección
              </Link>
              <Link href="/tienda?categoria=collares" className="text-sm text-pearl-brown hover:text-pearl-deep transition-colors">
                Collares de perlas
              </Link>
              <Link href="/tienda?categoria=aretes" className="text-sm text-pearl-brown hover:text-pearl-deep transition-colors">
                Aretes y broqueles
              </Link>
              <Link href="/tienda?categoria=pulseras" className="text-sm text-pearl-brown hover:text-pearl-deep transition-colors">
                Pulseras y brazaletes
              </Link>
              <Link href="/historia" className="text-sm text-pearl-brown hover:text-pearl-deep transition-colors">
                Nuestra historia
              </Link>
            </nav>
          </div>

          {/* Column 3: Contact / Socials */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pearl-ink mb-1">
              Contacto
            </h4>
            <div className="flex flex-col gap-2 text-sm text-pearl-brown">
              <p>Mérida, Yucatán. México.</p>
              <a 
                href="mailto:contacto@juliaguillen.com" 
                className="hover:text-pearl-deep transition-colors inline-block"
              >
                contacto@juliaguillen.com
              </a>
              <a 
                href="https://wa.me/5219991234567" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-pearl-deep transition-colors inline-block"
              >
                WhatsApp: +52 (999) 123-4567
              </a>
            </div>
            
            <div className="flex items-center gap-4 mt-2">
              <a 
                href="https://instagram.com/juliaguillen.joyeria" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs uppercase tracking-wider text-pearl-brown hover:text-pearl-deep transition-colors"
              >
                Instagram
              </a>
              <span className="text-pearl-gray/40 text-xs">|</span>
              <a 
                href="https://facebook.com/juliaguillen.joyeria" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs uppercase tracking-wider text-pearl-brown hover:text-pearl-deep transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Below Footer */}
        <div className="border-t border-pearl-gray/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-pearl-gray text-center md:text-left">
            &copy; {currentYear} Julia Guillén Joyería Fina. Hecho a mano en México. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-pearl-gray">
            <Link href="/tienda" className="hover:text-pearl-deep transition-colors">
              Envíos y Devoluciones
            </Link>
            <Link href="/contacto" className="hover:text-pearl-deep transition-colors">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
