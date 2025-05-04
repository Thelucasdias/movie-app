import { Movie } from "@/types/movie";

export async function fetchRandomMovies(page?: number): Promise<Movie[]> {
  const randomPage = Math.floor(Math.random() * 50) + 1;

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=pt-BR&sort_by=popularity.desc&page=${randomPage}`
  );

  const data = await res.json();
  return data.results || [];
}
