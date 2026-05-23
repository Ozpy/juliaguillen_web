"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "../../lib/utils";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  id: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={cn("border-t border-pearl-gray/20 divide-y divide-pearl-gray/20", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between py-2 text-left font-sans text-xs font-medium uppercase tracking-[0.2em] text-pearl-ink hover:text-pearl-deep transition-colors focus:outline-none"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span className="text-pearl-gray ml-4">
                {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 pb-2 text-sm leading-[1.7] text-pearl-brown pr-4">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
