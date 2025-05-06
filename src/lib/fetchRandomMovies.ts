import { Movie } from "@/types/movie";

export async function fetchRandomMovies(page: number = 1): Promise<Movie[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=pt-BR&sort_by=popularity.desc&page=${page}`
  );

  const data = await res.json();
  return data.results || [];
}
