import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { genre, page = "1" } = req.query;

  if (!genre) {
    return res
      .status(400)
      .json({ error: "O parâmetro 'genre' é obrigatório." });
  }

  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}&page=${page}&language=pt-BR`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Erro ao buscar filmes por gênero." });
    }

    const data = await response.json();

    res.status(200).json({
      results: data.results,
      total_pages: data.total_pages,
      page: data.page,
    });
  } catch (error) {
    console.error("Erro na API /api/genre:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}
