import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Strict validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos." },
        { status: 400 }
      );
    }

    // Server-side audit logging
    console.log(`[CONTACT INCOMING]: Name: ${name}, Email: ${email}`);
    console.log(`[MESSAGE CONTENT]: ${message}`);

    // TODO: Integrar servicio de envío de correos real (por ejemplo Resend, SendGrid o WordPress Webhook)
    // const resendResponse = await fetch('https://api.resend.com/emails', { ... })

    return NextResponse.json(
      { success: true, message: "Mensaje recibido con éxito en el servidor." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CONTACT API ERROR]:", error);
    return NextResponse.json(
      { error: "Ocurrió un error en el servidor. Intenta de nuevo más tarde." },
      { status: 500 }
    );
  }
}
