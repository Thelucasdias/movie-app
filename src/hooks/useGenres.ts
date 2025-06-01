import { useState, useEffect } from "react";
import { Genre } from "@/types/genre";

export interface UseGenresReturn {
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

export const useGenres = (): UseGenresReturn => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar gêneros");
        }

        const data = await response.json();
        setGenres(data.genres);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
};
