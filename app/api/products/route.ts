import { NextRequest, NextResponse } from "next/server";
//category
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sellerId = "179571326"; //  seller ID
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10); //por defecto solo se muestran 10 productos

  let apiUrl = `https://api.mercadolibre.com/sites/MLA/search?seller_id=${sellerId}&offset=${
    page * limit
  }&limit=${limit}`;
  if (category) {
    apiUrl += `&category=${category}`; // Agrega la categoría si está presente
  }
  const res = await fetch(apiUrl, { next: { revalidate: 60 } });

  const product = await res.json();

  return Response.json({ product });
}
