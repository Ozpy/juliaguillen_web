"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../../lib/cart-store";
import Button from "../../components/ui/Button";
import { ArrowLeft, CheckCircle2, Copy, Check } from "lucide-react";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clear);

  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<{ id: number; total: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Redirect if cart is empty and order hasn't been successfully placed yet
  useEffect(() => {
    if (items.length === 0 && !orderSuccess) {
      // We don't hard redirect immediately to allow the page to mount smoothly
    }
  }, [items, orderSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = items.reduce((acc, item) => {
    const price = parseFloat(item.product?.price || "0");
    return acc + price * item.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const billing = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address_1: formData.address,
      city: formData.city,
      state: formData.state,
      postcode: formData.zip,
      country: "MX",
    };

    const line_items = items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          billing,
          shipping: billing, // Same shipping as billing for simplicity
          line_items,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Hubo un error al crear tu pedido. Intenta de nuevo.");
      }

      setOrderSuccess({ id: data.orderId, total: data.total });
      clearCart(); // Clear local Zustand cart
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de red.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("012345678901234567");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If order was placed successfully, show the premium Success screen
  if (orderSuccess) {
    return (
      <div className="bg-pearl-white min-h-screen py-16 md:py-24 flex items-center justify-center text-left">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl w-full bg-white border border-pearl-gray/20 shadow-2xl p-8 md:p-12 text-pearl-ink"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-pearl-deep/15 text-pearl-deep p-3 rounded-full">
              <CheckCircle2 className="h-8 w-8 stroke-[1.5]" />
            </div>
            <div>
              <span className="font-eyebrow text-pearl-deep">¡Pedido Recibido!</span>
              <h1 className="font-display text-3xl font-medium mt-1">Gracias por tu compra</h1>
            </div>
          </div>

          <div className="border-y border-pearl-gray/10 py-6 mb-8 text-sm leading-[1.6]">
            <p className="mb-2 text-pearl-brown">
              Tu pedido <strong className="text-pearl-ink">#{orderSuccess.id}</strong> ha sido registrado con éxito. 
            </p>
            <p className="text-pearl-brown">
              Para completar la adquisición de tus piezas hechas a mano, realiza tu transferencia bancaria y envíanos tu comprobante.
            </p>
          </div>

          {/* Bank Transfer Details Box */}
          <div className="bg-pearl-white p-6 border border-pearl-gray/15 mb-8">
            <h3 className="font-display text-lg font-medium mb-4">Instrucciones de Transferencia</h3>
            <div className="flex flex-col gap-3 text-sm font-sans text-pearl-brown">
              <div className="flex justify-between border-b border-pearl-gray/5 pb-2">
                <span>Banco:</span>
                <strong className="text-pearl-ink">BBVA México</strong>
              </div>
              <div className="flex justify-between border-b border-pearl-gray/5 pb-2">
                <span>Beneficiario:</span>
                <strong className="text-pearl-ink">Julia Guillén Joyería</strong>
              </div>
              <div className="flex justify-between items-center border-b border-pearl-gray/5 pb-2">
                <span>CLABE:</span>
                <div className="flex items-center gap-2">
                  <strong className="text-pearl-ink">0123 4567 8901 2345 67</strong>
                  <button 
                    onClick={copyToClipboard}
                    className="p-1 hover:text-pearl-deep transition-colors text-pearl-gray"
                    title="Copiar CLABE"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between pt-1">
                <span>Total a Transferir:</span>
                <strong className="text-pearl-deep text-base">${parseFloat(orderSuccess.total).toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</strong>
              </div>
            </div>
          </div>

          <p className="text-xs text-pearl-gray leading-relaxed mb-8">
            * Envía tu captura de pantalla o comprobante de pago a <a href="mailto:contacto@juliaguillen.com" className="text-pearl-deep underline">contacto@juliaguillen.com</a> o vía WhatsApp al <strong className="text-pearl-ink">+52 (999) 123-4567</strong> con tu número de pedido como referencia. Tus piezas se enviarán en cuanto confirmemos la transacción.
          </p>

          <Link href="/">
            <Button variant="primary" className="w-full py-4 text-xs font-semibold tracking-widest uppercase">
              Volver a la Página Principal
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Empty state checkout page
  if (items.length === 0) {
    return (
      <div className="bg-pearl-white min-h-screen py-24 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-pearl-gray/10 p-8 text-center shadow-md flex flex-col items-center gap-6">
          <span className="font-eyebrow text-pearl-gray">Headless Checkout</span>
          <h2 className="font-display text-2xl font-medium">Tu bolsa de compras está vacía</h2>
          <p className="text-sm text-pearl-brown max-w-xs leading-relaxed font-sans">
            Agrega algunas piezas de joyería fina de perlas hechas a mano antes de proceder al pago.
          </p>
          <Link href="/tienda">
            <Button variant="primary" className="py-3 px-6 text-xs uppercase tracking-widest">
              Ir a la tienda
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pearl-white min-h-screen py-12 md:py-24 text-left">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Back Link */}
        <Link href="/tienda" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-pearl-brown hover:text-pearl-ink transition-colors mb-10 group">
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span>Volver a la tienda</span>
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl text-pearl-ink font-medium mb-12">
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Billing / Shipping Info Form */}
          <div className="lg:col-span-7 bg-white border border-pearl-gray/10 shadow-lg p-6 md:p-8">
            <h2 className="font-display text-xl font-medium mb-6 pb-2 border-b border-pearl-gray/10">
              Datos de Envío y Facturación
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-pearl-brown">Nombre *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-pearl-gray/30 p-3 text-sm focus:outline-none focus:border-pearl-deep transition-colors bg-pearl-white/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-pearl-brown">Apellidos *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-pearl-gray/30 p-3 text-sm focus:outline-none focus:border-pearl-deep transition-colors bg-pearl-white/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-pearl-brown">Correo Electrónico *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-pearl-gray/30 p-3 text-sm focus:outline-none focus:border-pearl-deep transition-colors bg-pearl-white/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-pearl-brown">Teléfono *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-pearl-gray/30 p-3 text-sm focus:outline-none focus:border-pearl-deep transition-colors bg-pearl-white/10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-pearl-brown">Dirección Completa *</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Calle, Número, Colonia, Municipio"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border border-pearl-gray/30 p-3 text-sm focus:outline-none focus:border-pearl-deep transition-colors bg-pearl-white/10"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-pearl-brown">Ciudad *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border border-pearl-gray/30 p-3 text-sm focus:outline-none focus:border-pearl-deep transition-colors bg-pearl-white/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-pearl-brown">Estado *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full border border-pearl-gray/30 p-3 text-sm focus:outline-none focus:border-pearl-deep transition-colors bg-pearl-white/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-pearl-brown">Código Postal *</label>
                  <input
                    type="text"
                    name="zip"
                    required
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full border border-pearl-gray/30 p-3 text-sm focus:outline-none focus:border-pearl-deep transition-colors bg-pearl-white/10"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-4 border-l-4 border-red-500 font-sans mt-2">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                variant="primary"
                className="w-full py-4 text-xs font-semibold tracking-widest uppercase mt-4 flex items-center justify-center gap-2"
              >
                <span>{loading ? "Procesando pedido..." : "Confirmar y Completar Pedido"}</span>
              </Button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-pearl-gray/10 shadow-lg p-6 md:p-8">
              <h2 className="font-display text-xl font-medium mb-6 pb-2 border-b border-pearl-gray/10">
                Resumen de Compra
              </h2>
              
              <div className="flex flex-col gap-4 divide-y divide-pearl-gray/5">
                {items.map((item) => {
                  const product = item.product;
                  if (!product) return null;
                  const itemImage = product.images[0]?.src || "https://placehold.co/1200x1200/EDF2F5/909FAD?text=Producto";
                  return (
                    <div key={item.id} className="flex gap-4 pt-4 first:pt-0">
                      <div className="relative h-16 w-16 bg-pearl-white flex-shrink-0 border border-pearl-gray/10 overflow-hidden">
                        <Image
                          src={itemImage}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between text-sm">
                        <div className="flex justify-between gap-2">
                          <h4 className="font-display text-pearl-ink leading-snug">{product.name}</h4>
                          <span className="font-sans font-semibold text-pearl-ink">
                            ${(parseFloat(product.price) * item.quantity).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-pearl-brown mt-1">
                          <span>Cantidad: {item.quantity}</span>
                          <span>${parseFloat(product.price).toLocaleString("es-MX", { minimumFractionDigits: 2 })} c/u</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Calculation */}
              <div className="border-t border-pearl-gray/15 pt-6 mt-6 flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-pearl-brown">
                  <span>Subtotal:</span>
                  <span>${subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-pearl-brown">
                  <span>Envío Express:</span>
                  <span className="text-green-600 font-medium">¡Gratis!</span>
                </div>
                <div className="flex justify-between text-pearl-ink border-t border-pearl-gray/5 pt-3 font-semibold text-base">
                  <span>Total:</span>
                  <span className="text-pearl-deep">${subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</span>
                </div>
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="bg-pearl-cream/20 border border-pearl-gray/15 p-6 text-sm text-pearl-brown leading-relaxed rounded-none">
              <h3 className="font-display text-base font-medium text-pearl-ink mb-2">Compra Protegida</h3>
              <p>Tu orden es enviada de forma express en un empaque rígido y acolchado especial de alta resistencia para garantizar que tus perlas y piezas lleguen en perfecto estado.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
