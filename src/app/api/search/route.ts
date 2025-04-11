import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query não informada." },
      { status: 400 }
    );
  }

  const apiKey = process.env.TMDB_API_KEY;
  const page = searchParams.get("page") || "1";
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=pt-BR&page=${page}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao buscar filmes." },
      { status: 444 }
    );
  }
}
