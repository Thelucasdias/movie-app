import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, page = "1" } = req.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Query não informada." });
  }

  const apiKey = process.env.TMDB_API_KEY;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=pt-BR&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar filmes." });
  }
}
