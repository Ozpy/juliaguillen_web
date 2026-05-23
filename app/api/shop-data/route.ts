import { NextResponse } from "next/server";
import { getProducts, getCategories } from "../../../lib/woo";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Fetch up to 100 products and all active categories in parallel
    const [products, categories] = await Promise.all([
      getProducts("per_page=100"),
      getCategories()
    ]);

    return NextResponse.json({ products, categories }, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      }
    });
  } catch (error) {
    console.error("API /api/shop-data failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch shop data" },
      { status: 500 }
    );
  }
}
