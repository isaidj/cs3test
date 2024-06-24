import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const res = await fetch(
      "https://api.mercadolibre.com/sites/MLA/categories"
    );
    const data = await res.json();

    return Response.json({ data });
  } catch (error) {
    return Response.error();
  }
}
