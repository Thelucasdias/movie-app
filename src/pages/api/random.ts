import { NextApiRequest, NextApiResponse } from "next";
import { fetchRandomMovies } from "@/lib/fetchRandomMovies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = parseInt((req.query.page as string) || "1", 10);

  try {
    const movies = await fetchRandomMovies(page);
    res.status(200).json(movies);
  } catch (error) {
    console.error("Erro na API /api/random:", error);
    res.status(500).json({ message: "Erro ao buscar filmes aleatórios" });
  }
}
