"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import { showToast } from "../ui/Toast";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Por favor completa todos los campos.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        showToast("¡Mensaje enviado con éxito!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("API submission failed");
      }
    } catch (error) {
      setStatus("error");
      showToast("Error al enviar el mensaje. Intenta de nuevo.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white border border-pearl-gray/20 p-8 text-center flex flex-col items-center gap-4 max-w-md w-full">
        <CheckCircle2 className="h-10 w-10 text-pearl-deep stroke-[1.25]" />
        <h3 className="font-display text-xl text-pearl-ink font-medium">
          ¡Gracias por escribirnos!
        </h3>
        <p className="text-sm leading-[1.6] text-pearl-brown font-sans">
          Hemos recibido tu mensaje con éxito. Lupita o Susi se pondrán en contacto contigo a la brevedad posible.
        </p>
        <Button 
          onClick={() => setStatus("idle")} 
          variant="secondary"
          className="mt-2"
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white border border-pearl-gray/20 p-8 flex flex-col gap-6 w-full max-w-lg text-left"
    >
      {/* Name Input */}
      <div className="flex flex-col gap-2">
        <label 
          htmlFor="name" 
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-pearl-brown"
        >
          Nombre completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          disabled={status === "submitting"}
          placeholder="Escribe tu nombre"
          className="w-full border border-pearl-gray/30 px-4 py-3 text-sm font-sans focus:outline-none focus:border-pearl-deep transition-colors bg-white rounded-none disabled:opacity-50"
        />
      </div>

      {/* Email Input */}
      <div className="flex flex-col gap-2">
        <label 
          htmlFor="email" 
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-pearl-brown"
        >
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          disabled={status === "submitting"}
          placeholder="tu@correo.com"
          className="w-full border border-pearl-gray/30 px-4 py-3 text-sm font-sans focus:outline-none focus:border-pearl-deep transition-colors bg-white rounded-none disabled:opacity-50"
        />
      </div>

      {/* Message TextArea */}
      <div className="flex flex-col gap-2">
        <label 
          htmlFor="message" 
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-pearl-brown"
        >
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          disabled={status === "submitting"}
          placeholder="¿En qué te podemos ayudar? ¿Buscas una pieza personalizada?"
          className="w-full border border-pearl-gray/30 px-4 py-3 text-sm font-sans focus:outline-none focus:border-pearl-deep transition-colors bg-white rounded-none resize-none disabled:opacity-50"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        disabled={status === "submitting"}
        className="w-full py-4 text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 mt-2"
      >
        <span>{status === "submitting" ? "Enviando..." : "Enviar Mensaje"}</span>
        {status !== "submitting" && <Send className="h-3.5 w-3.5" />}
      </Button>
    </form>
  );
}
