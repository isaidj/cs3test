import { NextRequest, NextResponse } from "next/server";
//category
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const res = await fetch("https://api.mercadolibre.com/categories/" + id, {
    next: { revalidate: 60 },
  });
  const product = await res.json();

  return Response.json({ product });
}
