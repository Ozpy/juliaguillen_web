import { NextResponse } from "next/server";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://juliaguillen.com";
const KEY = process.env.NEXT_PUBLIC_WC_KEY || "";
const SECRET = process.env.WC_SECRET || "";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { billing, shipping, line_items } = body;

    const auth = Buffer.from(`${KEY}:${SECRET}`).toString("base64");

    const orderData = {
      payment_method: "bacs",
      payment_method_title: "Transferencia Bancaria Directa",
      set_paid: false,
      billing,
      shipping,
      line_items,
      status: "pending"
    };

    const response = await fetch(`${WP_URL}/wp-json/wc/v3/orders`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (NextJS Headless Client)"
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `WooCommerce error: ${errorText}` }, { status: response.status });
    }

    const order = await response.json();
    return NextResponse.json({ success: true, orderId: order.id, total: order.total });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
  }
}
