"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

type ToastMessage = {
  id: string;
  message: string;
};

let toastListeners: Array<(toast: ToastMessage) => void> = [];

export const showToast = (message: string) => {
  const toast = { id: Math.random().toString(), message };
  toastListeners.forEach((listener) => listener(toast));
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const listener = (newToast: ToastMessage) => {
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3000);
    };
    
    toastListeners.push(listener);
    
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="pointer-events-auto flex items-center gap-3 bg-pearl-ink text-white px-6 py-4 shadow-xl border border-white/10 rounded-none text-xs font-sans font-medium uppercase tracking-wider"
          >
            <Check className="h-4 w-4 text-pearl-deep" />
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
