import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { clearServerCache } from "../../../lib/woo";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-secret");
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret) {
    console.error("REVALIDATE_SECRET environment variable is not defined.");
    return NextResponse.json(
      { message: "Server configuration error: revalidation secret missing." },
      { status: 500 }
    );
  }

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid revalidation secret." }, { status: 401 });
  }

  try {
    // 1. Clear the high-performance local memory cache in Node
    clearServerCache();

    // 2. Clear Next.js Incremental Static Regeneration (ISR) static caches
    // Revalidating "/" with "layout" recursively clears all static page caches under the root layout
    revalidatePath("/", "layout");
    
    // Also explicitly revalidate the shop data aggregator endpoint
    revalidatePath("/api/shop-data");

    console.log("Successfully revalidated all static pages and cleared Node-level caches.");

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: "Cache cleared and static paths queued for revalidation."
    });
  } catch (err) {
    console.error("Revalidation hook error:", err);
    return NextResponse.json(
      { message: "Error revalidating paths", error: err instanceof Error ? err.message : err },
      { status: 500 }
    );
  }
}
