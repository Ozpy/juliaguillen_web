import { NextRequest, NextResponse } from "next/server";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://juliaguillen.com";
const KEY = process.env.NEXT_PUBLIC_WC_KEY || "";
const SECRET = process.env.WC_SECRET || "";

export const dynamic = "force-dynamic";

const getAuthHeader = () => {
  if (!KEY || !SECRET) return "";
  try {
    return `Basic ${Buffer.from(`${KEY}:${SECRET}`).toString("base64")}`;
  } catch (e) {
    return "";
  }
};

export async function POST(request: NextRequest) {
  try {
    const { orderId, email } = await request.json();

    if (!orderId || !email) {
      return NextResponse.json(
        { error: "Por favor introduce el número de pedido y tu correo electrónico." },
        { status: 400 }
      );
    }

    const auth = getAuthHeader();
    if (!auth) {
      console.error("WooCommerce API keys are missing in track-order route.");
      return NextResponse.json(
        { error: "Error de configuración en el servidor." },
        { status: 500 }
      );
    }

    // Query WooCommerce REST API for this specific order
    // We fetch directly to bypass all server-side caches and get 100% real-time order status
    const res = await fetch(`${WP_URL}/wp-json/wc/v3/orders/${orderId.trim()}`, {
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Bypasses Next.js fetch caching
    });

    if (res.status === 404) {
      return NextResponse.json(
        { error: "No encontramos ningún pedido con los datos proporcionados." },
        { status: 404 }
      );
    }

    if (!res.ok) {
      throw new Error(`WooCommerce API responded with status ${res.status}`);
    }

    const order = await res.json();

    // Secure Verification: Email must match the billing email of the order (case-insensitive)
    const billingEmail = order.billing?.email?.trim().toLowerCase() || "";
    const inputEmail = email.trim().toLowerCase();

    if (billingEmail !== inputEmail) {
      // Return a generic error to prevent email/order probing attacks
      return NextResponse.json(
        { error: "No encontramos ningún pedido con los datos proporcionados." },
        { status: 401 }
      );
    }

    // Extract relevant fields to keep response payload secure and light
    const orderDetails = {
      id: order.id,
      status: order.status, // e.g. "pending", "processing", "on-hold", "completed", "cancelled", "refunded"
      dateCreated: order.date_created,
      total: order.total,
      paymentMethodTitle: order.payment_method_title,
      billing: {
        firstName: order.billing?.first_name || "",
        lastName: order.billing?.last_name || "",
        email: order.billing?.email || "",
        phone: order.billing?.phone || "",
      },
      shipping: {
        address1: order.shipping?.address_1 || "",
        city: order.shipping?.city || "",
        state: order.shipping?.state || "",
        postcode: order.shipping?.postcode || "",
      },
      lineItems: order.line_items.map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
        productId: item.product_id,
        // Fallback placeholder image for line items since orders line items usually don't include images
        image: item.image?.src || "https://placehold.co/400x400/EDF2F5/909FAD?text=Joya",
      })),
    };

    return NextResponse.json(orderDetails);
  } catch (error) {
    console.error("Error in /api/track-order:", error);
    return NextResponse.json(
      { error: "Hubo un error al buscar tu pedido. Por favor intenta de nuevo." },
      { status: 500 }
    );
  }
}
