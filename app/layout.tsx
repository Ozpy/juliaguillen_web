import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CartDrawer from "../components/layout/CartDrawer";
import ToastContainer from "../components/ui/Toast";
import ShopPreloader from "../components/layout/ShopPreloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Julia Guillén | Joyería Fina Hecha a Mano",
    template: "%s | Julia Guillén Joyería Fina"
  },
  description: "Piezas únicas hechas a mano en México. Modernizamos lo clásico con una selección exclusiva de perlas, oro y plata para que cada pieza cuente tu historia.",
  keywords: ["joyería fina", "perlas mexicanas", "hecho a mano", "perlas modernas", "Lupita Guillén", "diseño mexicano", "aretes de perla", "collares de perlas"],
  openGraph: {
    title: "Julia Guillén | Joyería Fina Hecha a Mano",
    description: "Modernizamos lo clásico con diseños exclusivos de perlas, oro y plata. Joyería fina hecha a mano en México.",
    type: "website",
    locale: "es_MX",
    siteName: "Julia Guillén Joyería Fina"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-pearl-white text-pearl-ink font-sans selection:bg-pearl-deep selection:text-white">
        <Header />
        
        {/* Main content expands to push footer down */}
        <main className="flex-grow w-full">
          {children}
        </main>
        
        <Footer />
        <CartDrawer />
        <ToastContainer />
        <ShopPreloader />
      </body>
    </html>
  );
}
