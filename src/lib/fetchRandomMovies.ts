import { Movie } from "@/types/movie";

export async function fetchRandomMovies(page = 1): Promise<Movie[]> {
  const randomPage = Math.floor(Math.random() * 500) + 1;

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&page=${randomPage}`
  );

  const data = await res.json();
  return data.results || [];
}
