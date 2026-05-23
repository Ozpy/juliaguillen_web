import React from "react";
import ContactForm from "../../components/contact/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Hablemos",
  description: "Ponte en contacto con Julia Guillén. Escríbenos para consultas de catálogo, dudas con tu pedido o diseños de joyería fina personalizados.",
};

export default function ContactoPage() {
  return (
    <div className="bg-pearl-white min-h-screen py-16 md:py-24 text-left">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Heading */}
        <div className="mb-12 md:mb-16">
          <span className="font-eyebrow text-pearl-gray mb-3 inline-block">
            Atención Personalizada
          </span>
          <h1 className="text-display-1 text-pearl-ink mb-4">
            Hablemos
          </h1>
          <p className="text-sm text-pearl-brown max-w-xl leading-relaxed">
            ¿Tienes alguna duda sobre nuestras piezas o buscas un diseño de joyería personalizado? Nos encantaría escucharte. Escríbenos directamente o llena el formulario.
          </p>
        </div>

        {/* 2-Column Split Details / Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Direct Info (spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Location */}
            <div className="flex flex-col gap-2">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pearl-ink">
                Ubicación
              </h3>
              <p className="text-sm text-pearl-brown leading-relaxed font-sans">
                Mérida, Yucatán. México.<br />
                Enviamos piezas con amor y seguridad a todo el país.
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pearl-ink">
                Correo Electrónico
              </h3>
              <a 
                href="mailto:contacto@juliaguillen.com" 
                className="text-sm text-pearl-deep hover:text-pearl-deep-hover underline font-sans"
              >
                contacto@juliaguillen.com
              </a>
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col gap-2">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pearl-ink">
                WhatsApp
              </h3>
              <a 
                href="https://wa.me/5219991234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-pearl-deep hover:text-pearl-deep-hover underline font-sans block"
              >
                +52 (999) 123-4567
              </a>
              <span className="text-xs text-pearl-gray font-sans -mt-1 block">
                Atención inmediata de lunes a sábado de 9:00 am a 7:00 pm.
              </span>
            </div>

            {/* Inception reminder */}
            <div className="border-t border-pearl-gray/20 pt-8 mt-4">
              <p className="font-display text-lg italic text-pearl-brown leading-relaxed">
                &ldquo;Cada perla cuenta una historia tuya, hagamos que la tuya brille hoy.&rdquo;
              </p>
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-pearl-gray mt-2 block">
                — Lupita Guillén
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Form (spans 7 cols) */}
          <div className="lg:col-span-7 w-full flex justify-center">
            <ContactForm />
          </div>

        </div>

      </div>
    </div>
  );
}
