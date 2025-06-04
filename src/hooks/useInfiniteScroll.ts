import { useState, useEffect, useRef, useCallback } from "react";
import { Movie } from "@/types/movie";

export function useInfiniteScroll(isActive: boolean) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);
  const pageRef = useRef(1);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchMore = useCallback(async () => {
    if (isFetchingRef.current || !isActive) return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      const res = await fetch(`/api/random?page=${pageRef.current}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const newMovies: Movie[] = await res.json();

      if (newMovies?.length > 0) {
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
      pageRef.current = 1;
      return;
    }

    if (movies.length === 0) {
      fetchMore();
    }
  }, [isActive, fetchMore, movies.length]);

  useEffect(() => {
    if (!loaderRef.current || !isActive) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current) {
          fetchMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observerRef.current.observe(loaderRef.current);

    return () => {
      if (observerRef.current && loaderRef.current) {
        observerRef.current.unobserve(loaderRef.current);
      }
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [isActive, fetchMore]);

  return { movies, loaderRef, loading };
}
