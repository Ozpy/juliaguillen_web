"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCartStore } from "../../lib/cart-store";
import { cn } from "../../lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const cartItems = useCartStore((state) => state.items);
  const setCartOpen = useCartStore((state) => state.setIsOpen);

  // Compute total items quantity in cart
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Tienda", href: "/tienda" },
    { name: "Nuestra Historia", href: "/historia" },
    { name: "Contacto", href: "/contacto" },
    { name: "Rastrear", href: "/seguimiento" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 border-b",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md border-pearl-gray/20 shadow-sm py-4" 
          : "bg-white border-pearl-gray/10 py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-pearl-ink hover:text-pearl-deep transition-colors focus:outline-none"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Brand Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-sans text-xs font-medium uppercase tracking-[0.2em] transition-colors relative py-1",
                pathname === link.href 
                  ? "text-pearl-deep font-semibold" 
                  : "text-pearl-brown hover:text-pearl-ink"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-pearl-deep" />
              )}
            </Link>
          ))}
        </nav>

        {/* Centered Brand Logo */}
        <div className="flex justify-center flex-1 md:flex-initial">
          <Link href="/" className="inline-block text-center focus:outline-none py-1">
            <Image
              src="/images/logo.png"
              alt="Julia Guillén Joyería Fina"
              width={160}
              height={45}
              className="h-9 sm:h-11 w-auto object-contain brightness-95"
              priority
            />
          </Link>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Simple search representation */}
          <Link
            href="/tienda?search=active"
            className="text-pearl-brown hover:text-pearl-ink transition-colors p-1"
            aria-label="Buscar productos"
          >
            <Search className="h-4.5 w-4.5" />
          </Link>

          {/* Cart Bag trigger */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-pearl-brown hover:text-pearl-ink transition-colors p-1 focus:outline-none"
            aria-label="Ver carrito"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pearl-deep text-white text-[9px] font-sans font-medium w-4.5 h-4.5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-pearl-gray/20 shadow-lg py-6 px-8 flex flex-col gap-5 z-40">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "font-sans text-sm font-medium uppercase tracking-[0.2em] py-2 border-b border-pearl-gray/5",
                pathname === link.href ? "text-pearl-deep font-semibold" : "text-pearl-brown"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
