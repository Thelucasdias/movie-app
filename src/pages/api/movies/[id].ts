import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const apiKey = process.env.TMDB_API_KEY;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "ID não informado." });
  }

  try {
    const [detailsRes, creditsRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=pt-BR`
      ),
    ]);

    const details = await detailsRes.json();
    const credits = await creditsRes.json();

    const cast = credits.cast.slice(0, 10).map((member: any) => ({
      id: member.id,
      name: member.name,
      character: member.character,
      profile_path: member.profile_path,
    }));

    return res.status(200).json({ ...details, cast });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar detalhes do filme." });
  }
}
