// app/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import SearchBar from "../components/SearchBar";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
};

export default function Home() {
  const [results, setResults] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading || !query) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loading, hasMore, query]);

  useEffect(() => {
    if (page === 1 || !query) return;

    const fetchMore = async () => {
      setLoading(true);
      const res = await fetch(`/api/search?query=${query}&page=${page}`);
      const data = await res.json();
      setResults((prev) => [...prev, ...data.results]);
      setHasMore(data.page < data.total_pages);
      setLoading(false);
    };
    fetchMore();
  }, [page]);

  const handleNewSearch = (newResults: Movie[]) => {
    setResults(newResults);
    setPage(1);
    setHasMore(true);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Buscar Filmes</h1>
      <SearchBar onResults={handleNewSearch} onQueryChange={setQuery} />

      {results.length > 0 && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {results.map((movie) => (
            <div key={movie.id} className="border rounded-lg p-2">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto rounded"
                />
              ) : (
                <div className="bg-gray-200 w-full h-44 flex items-center justify-center text-gray-500">
                  Sem imagem
                </div>
              )}
              <h2 className="mt-2 text-sm font-semibold">{movie.title}</h2>
              <p className="text-xs text-gray-500">{movie.release_date}</p>
            </div>
          ))}
        </div>
      )}

      <div ref={loadMoreRef} className="h-10" />
      {loading && <p className="text-center mt-4">Carregando mais...</p>}
    </main>
  );
}
