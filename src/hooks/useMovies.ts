import { useState, useEffect } from "react";
import { Movie } from "@/types/movie";

export function useMovies(
  initialQuery: string,
  initialPage: number,
  initialResults: Movie[],
  initialTotalPages: number
) {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [results, setResults] = useState<Movie[]>(initialResults);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  useEffect(() => {
    setResults(initialResults);
    setTotalPages(initialTotalPages);
  }, [initialResults, initialTotalPages]);

  useEffect(() => {
    if (!query) return;
    const fetchMovies = async () => {
      const res = await fetch(`/api/search?query=${query}&page=${page}`);
      const data = await res.json();
      setResults(data.results || []);
      setTotalPages(data.total_pages);
    };

    fetchMovies();
  }, [query, page]);

  return {
    query,
    page,
    results,
    totalPages,
    setQuery,
    setPage,
    setResults,
  };
}
