import React from "react";
import OrderTrackerForm from "../../components/product/OrderTrackerForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rastrear Pedido",
  description: "Portal exclusivo de seguimiento de pedidos de Julia Guillén. Sigue el estatus de confección a mano y envío express de tus piezas de joyería de perla.",
};

export default function SeguimientoPage() {
  return (
    <div className="bg-pearl-white min-h-screen py-16 md:py-24 text-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Heading */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-eyebrow text-pearl-gray mb-3 inline-block">
            Atención al Cliente
          </span>
          <h1 className="text-display-1 text-pearl-ink mb-4">
            Rastrea tu pedido
          </h1>
          <p className="text-sm text-pearl-brown max-w-xl mx-auto leading-relaxed">
            Sigue de cerca cada paso de tus piezas exclusivas de perlas hechas a mano. Monitorea la confirmación de pago, la confección artesanal y el estatus de tu envío express seguro.
          </p>
        </div>

        {/* Tracker Form Dashboard Mount */}
        <OrderTrackerForm />

      </div>
    </div>
  );
}
