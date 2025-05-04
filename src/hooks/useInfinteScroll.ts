import { useState, useEffect, useRef, useCallback } from "react";
import { Movie } from "@/types/movie";
import { fetchRandomMovies } from "@/lib/fetchRandomMovies";

export function useInfiniteScroll(isActive: boolean) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchMore = useCallback(async () => {
    setLoading(true);
    const newMovies = await fetchRandomMovies();
    if (newMovies.length > 0) {
      setMovies((prev) => [...prev, ...newMovies]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchMore();
        }
      },
      { rootMargin: "100px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchMore, isActive, loading]);

  useEffect(() => {
    if (isActive) {
      setMovies([]);
      fetchMore();
    }
  }, [isActive, fetchMore]);

  return { movies, loaderRef, loading };
}
