

export async function GET(request: Request) {
  try {
    const res = await fetch(
      "https://api.mercadolibre.com/sites/MLA/categories",
      { next: { revalidate: 60 } }
    );
    const data = await res.json();

    return Response.json({ data });
  } catch (error) {
    return Response.error();
  }
}
