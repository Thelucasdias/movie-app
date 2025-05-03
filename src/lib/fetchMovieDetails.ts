import { MovieDetails } from "@/types/movie";

export const fetchMovieDetails = async (
  id: string | number
): Promise<MovieDetails> => {
  const res = await fetch(`/api/movies/${id}`);
  if (!res.ok) {
    throw new Error("Erro ao buscar detalhes do filme.");
  }
  const data = await res.json();
  return data;
};
