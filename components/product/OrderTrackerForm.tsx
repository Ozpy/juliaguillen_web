"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import { Search, Loader2, ArrowLeft, CheckCircle2, AlertTriangle, Truck, Clock, Sparkles, Copy, Check, MessageCircle } from "lucide-react";
import Image from "next/image";

type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: string;
  total: string;
  productId: number;
  image: string;
};

type OrderData = {
  id: number;
  status: string;
  dateCreated: string;
  total: string;
  paymentMethodTitle: string;
  billing: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shipping: {
    address1: string;
    city: string;
    state: string;
    postcode: string;
  };
  lineItems: OrderItem[];
};

export default function OrderTrackerForm() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<OrderData | null>(null);
  
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const response = await fetch("/api/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No pudimos encontrar tu pedido. Revisa los datos e intenta de nuevo.");
      }

      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const copyCLABE = () => {
    navigator.clipboard.writeText("012345678901234567");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setOrderId("");
    setEmail("");
    setOrder(null);
    setError("");
  };

  // Stepper mapping logic based on WooCommerce status
  const getStatusStep = (status: string) => {
    const s = status.toLowerCase();
    if (s === "pending" || s === "on-hold") return 1; // Recibido / Esperando Pago
    if (s === "processing") return 2; // Procesando / Confeccionando
    if (s === "completed") return 3; // Enviado / Entregado
    return 1;
  };

  const getStatusText = (status: string) => {
    const s = status.toLowerCase();
    if (s === "pending" || s === "on-hold") return "Recibido (Esperando pago)";
    if (s === "processing") return "Pago confirmado (Confeccionando joya)";
    if (s === "completed") return "Enviado con éxito";
    if (s === "cancelled") return "Pedido cancelado";
    if (s === "refunded") return "Pedido reembolsado";
    if (s === "failed") return "Pago fallido";
    return status;
  };

  const getStatusDescription = (status: string) => {
    const s = status.toLowerCase();
    if (s === "pending" || s === "on-hold") return "Recibimos tu solicitud. Realiza tu transferencia bancaria de BBVA y envíanos tu comprobante para iniciar la confección de tu joya a mano.";
    if (s === "processing") return "¡Tu pago ha sido validado! Manos mexicanas expertas están enhebrando tus perlas y confeccionando tus piezas. Recibirás tu código de rastreo en breve.";
    if (s === "completed") return "¡Tus piezas exclusivas ya están en camino! Tu paquete viaja a través de envío seguro express directo a tu domicilio.";
    if (s === "cancelled") return "Este pedido fue cancelado. Si tienes dudas, ponte en contacto con nuestro equipo.";
    return "";
  };

  // Build custom WhatsApp link prefilled with order details
  const getWhatsAppLink = (order: OrderData) => {
    const message = `Hola Lupita y Susi, me gustaría consultar una duda sobre mi pedido #${order.id} a nombre de ${order.billing.firstName} ${order.billing.lastName}.`;
    return `https://wa.me/5219991234567?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!order ? (
        // Búsqueda Form Screen
        <form 
          onSubmit={handleSubmit}
          className="bg-white border border-pearl-gray/20 p-8 md:p-12 shadow-2xl flex flex-col gap-6 w-full text-left"
        >
          <div className="text-center mb-4">
            <span className="font-eyebrow text-pearl-gray">Portal de Rastreo</span>
            <h2 className="font-display text-2xl md:text-3xl text-pearl-ink font-medium mt-2">
              Sigue el camino de tu perla
            </h2>
            <p className="text-xs md:text-sm text-pearl-brown font-sans mt-2 max-w-md mx-auto leading-relaxed">
              Introduce el número de pedido (ej: 615) que recibiste en pantalla al comprar, y el correo registrado para ver el estatus real de confección y envío.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs md:text-sm p-4 border-l-4 border-red-500 font-sans flex items-center gap-2">
              <AlertTriangle className="h-4.5 w-4.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Order ID Input */}
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="orderId" 
                className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-pearl-brown"
              >
                Número de pedido *
              </label>
              <input
                type="text"
                id="orderId"
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                disabled={loading}
                placeholder="Ej: 615"
                className="w-full border border-pearl-gray/30 px-4 py-3 text-sm font-sans focus:outline-none focus:border-pearl-deep transition-colors bg-white rounded-none disabled:opacity-50"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="email" 
                className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-pearl-brown"
              >
                Correo de facturación *
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="cliente@correo.com"
                className="w-full border border-pearl-gray/30 px-4 py-3 text-sm font-sans focus:outline-none focus:border-pearl-deep transition-colors bg-white rounded-none disabled:opacity-50"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full py-4 text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Buscando en WooCommerce...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>Rastrear Pedido</span>
              </>
            )}
          </Button>
        </form>
      ) : (
        // Visual Tracking Dashboard Screen
        <div className="flex flex-col gap-6 text-left">
          
          {/* Back button */}
          <button 
            onClick={handleReset}
            className="inline-flex items-center gap-2 self-start text-xs uppercase tracking-wider text-pearl-brown hover:text-pearl-ink transition-colors group cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>Buscar otro pedido</span>
          </button>

          {/* Stepper Status Panel */}
          <div className="bg-white border border-pearl-gray/20 p-6 md:p-10 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-pearl-gray/10 pb-6 mb-8 gap-4">
              <div>
                <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-pearl-gray">
                  Pedido #{order.id}
                </span>
                <h2 className="font-display text-2xl font-medium text-pearl-ink mt-1">
                  Estatus: {getStatusText(order.status)}
                </h2>
              </div>
              <div className="text-right md:text-left self-start md:self-auto text-xs text-pearl-brown font-sans">
                <span className="block">Fecha: {new Date(order.dateCreated).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}</span>
                <span className="block font-semibold text-pearl-deep mt-0.5">Total: ${parseFloat(order.total).toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</span>
              </div>
            </div>

            {/* Premium Interactive Timeline Stepper */}
            {order.status.toLowerCase() !== "cancelled" && order.status.toLowerCase() !== "refunded" && (
              <div className="mb-10 relative">
                {/* Visual Line */}
                <div className="absolute top-[22px] left-[15%] right-[15%] h-[2px] bg-pearl-gray/20 z-0 hidden sm:block" />
                <div 
                  className="absolute top-[22px] left-[15%] h-[2px] bg-pearl-deep z-0 transition-all duration-1000 hidden sm:block" 
                  style={{ 
                    width: getStatusStep(order.status) === 1 ? "0%" : getStatusStep(order.status) === 2 ? "35%" : "70%" 
                  }}
                />

                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center relative z-10 gap-6 sm:gap-0">
                  {/* Step 1: Recibido */}
                  <div className="flex sm:flex-col items-center gap-4 sm:gap-2 flex-1 text-center">
                    <div className={`h-11 w-11 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                      getStatusStep(order.status) >= 1 
                        ? "bg-pearl-deep/10 border-pearl-deep text-pearl-deep" 
                        : "bg-white border-pearl-gray/20 text-pearl-gray"
                    }`}>
                      <Clock className="h-5 w-5 stroke-[1.5]" />
                    </div>
                    <div className="text-left sm:text-center">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-pearl-ink">Recibido</span>
                      <span className="text-[10px] text-pearl-gray font-sans">Esperando pago</span>
                    </div>
                  </div>

                  {/* Step 2: Procesando */}
                  <div className="flex sm:flex-col items-center gap-4 sm:gap-2 flex-1 text-center">
                    <div className={`h-11 w-11 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                      getStatusStep(order.status) >= 2 
                        ? "bg-pearl-deep/10 border-pearl-deep text-pearl-deep" 
                        : "bg-white border-pearl-gray/20 text-pearl-gray"
                    }`}>
                      <Sparkles className="h-5 w-5 stroke-[1.5]" />
                    </div>
                    <div className="text-left sm:text-center">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-pearl-ink">Confeccionando</span>
                      <span className="text-[10px] text-pearl-gray font-sans">Hecho a mano</span>
                    </div>
                  </div>

                  {/* Step 3: Enviado */}
                  <div className="flex sm:flex-col items-center gap-4 sm:gap-2 flex-1 text-center">
                    <div className={`h-11 w-11 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                      getStatusStep(order.status) === 3 
                        ? "bg-pearl-deep/10 border-pearl-deep text-pearl-deep animate-pulse" 
                        : "bg-white border-pearl-gray/20 text-pearl-gray"
                    }`}>
                      <Truck className="h-5 w-5 stroke-[1.5]" />
                    </div>
                    <div className="text-left sm:text-center">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-pearl-ink">Enviado</span>
                      <span className="text-[10px] text-pearl-gray font-sans">Express protegido</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Status Narrative Description */}
            <div className="bg-pearl-white/60 p-5 border border-pearl-gray/10 rounded-none mb-4">
              <p className="text-sm leading-relaxed text-pearl-brown font-sans">
                {getStatusDescription(order.status) || "Tu pedido se encuentra registrado. Estaremos actualizando el estatus conforme se complete la validación."}
              </p>
            </div>
          </div>

          {/* CLABE Bank Transfer Remind Box (If status is pending or on-hold) */}
          {(order.status.toLowerCase() === "pending" || order.status.toLowerCase() === "on-hold") && (
            <div className="bg-pearl-deep text-white p-6 md:p-8 shadow-md relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-radial-gradient from-white/30 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="font-eyebrow text-white/80">Validación Pendiente</span>
                    <h3 className="font-display text-lg font-medium">Instrucciones de Transferencia</h3>
                  </div>
                </div>
                
                <p className="text-xs md:text-sm text-white/85 leading-relaxed font-sans">
                  Para iniciar la confección a mano de tus perlas exclusivas, realiza tu transferencia bancaria e infórmanos del pago.
                </p>

                <div className="bg-white/10 p-5 border border-white/20 font-sans text-xs md:text-sm flex flex-col gap-2.5">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/70">Banco:</span>
                    <strong className="text-white">BBVA México</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/70">Beneficiario:</span>
                    <strong className="text-white">Julia Guillén Joyería</strong>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-white/70">CLABE:</span>
                    <div className="flex items-center gap-2">
                      <strong className="text-white">0123 4567 8901 2345 67</strong>
                      <button 
                        onClick={copyCLABE}
                        className="p-1 hover:text-white/80 transition-colors text-white/70 cursor-pointer"
                        title="Copiar CLABE"
                      >
                        {copied ? <Check className="h-4.5 w-4.5 text-green-300" /> : <Copy className="h-4.5 w-4.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-white/70 font-semibold">Total a transferir:</span>
                    <strong className="text-white text-base font-bold">${parseFloat(order.total).toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</strong>
                  </div>
                </div>
                
                <p className="text-[10px] text-white/75 leading-relaxed">
                  * Envía la captura del comprobante al correo <a href="mailto:contacto@juliaguillen.com" className="underline font-semibold hover:text-white text-white">contacto@juliaguillen.com</a> o por WhatsApp al <strong className="text-white">+52 (999) 123-4567</strong> incluyendo tu número de pedido #{order.id} como referencia.
                </p>
              </div>
            </div>
          )}

          {/* Details layout: Items + Addresses split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Box: Items list (spans 7 cols) */}
            <div className="md:col-span-7 bg-white border border-pearl-gray/20 p-6 md:p-8 shadow-md">
              <h3 className="font-display text-lg font-medium text-pearl-ink mb-6 pb-2 border-b border-pearl-gray/10">
                Piezas Adquiridas
              </h3>
              
              <div className="flex flex-col gap-4 divide-y divide-pearl-gray/5">
                {order.lineItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pt-4 first:pt-0">
                    <div className="relative h-16 w-16 bg-pearl-white flex-shrink-0 border border-pearl-gray/10 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between text-sm font-sans">
                      <div className="flex justify-between gap-2">
                        <h4 className="font-display text-pearl-ink font-semibold leading-snug">{item.name}</h4>
                        <span className="font-semibold text-pearl-ink">
                          ${(parseFloat(item.price) * item.quantity).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-pearl-brown mt-1">
                        <span>Cantidad: {item.quantity}</span>
                        <span>${parseFloat(item.price).toLocaleString("es-MX", { minimumFractionDigits: 2 })} c/u</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Box: Billing/Shipping & WhatsApp (spans 5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {/* Address details */}
              <div className="bg-white border border-pearl-gray/20 p-6 md:p-8 shadow-md text-sm font-sans">
                <h3 className="font-display text-lg font-medium text-pearl-ink mb-6 pb-2 border-b border-pearl-gray/10">
                  Datos de Envío
                </h3>
                <div className="flex flex-col gap-4 text-pearl-brown">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-pearl-gray">Destinatario</span>
                    <strong className="text-pearl-ink">{order.billing.firstName} {order.billing.lastName}</strong>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-pearl-gray">Dirección</span>
                    <p className="text-pearl-ink leading-relaxed">{order.shipping.address1}</p>
                    <p className="text-pearl-ink">{order.shipping.city}, {order.shipping.state}. CP {order.shipping.postcode}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-pearl-gray">Teléfono</span>
                    <span className="text-pearl-ink">{order.billing.phone}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp direct help action */}
              <a 
                href={getWhatsAppLink(order)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white p-5 shadow-md flex items-center justify-center gap-3 transition-colors font-sans text-sm font-semibold uppercase tracking-wider focus:outline-none cursor-pointer"
              >
                <MessageCircle className="h-5 w-5 text-white" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
