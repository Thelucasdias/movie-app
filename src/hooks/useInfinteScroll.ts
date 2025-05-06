import { useState, useEffect, useRef, useCallback } from "react";
import { Movie } from "@/types/movie";

export function useInfiniteScroll(isActive: boolean) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);
  const pageRef = useRef(1);

  const fetchMore = useCallback(async () => {
    if (isFetchingRef.current || !isActive) return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      console.log(`Fetching page ${pageRef.current}`);
      const res = await fetch(`/api/random?page=${pageRef.current}`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const newMovies: Movie[] = await res.json();

      if (newMovies && newMovies.length > 0) {
        setMovies((prev) => [...prev, ...newMovies]);
        pageRef.current += 1;
      }
    } catch (error) {
      console.error("Erro ao buscar filmes aleatórios:", error);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      setMovies([]);
      return;
    }

    if (movies.length === 0) {
      fetchMore();
    }
  }, [isActive, fetchMore, movies.length]);

  useEffect(() => {
    if (!isActive || !loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current) {
          fetchMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isActive, fetchMore]);

  return { movies, loaderRef, loading };
}
