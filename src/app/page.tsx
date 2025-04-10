"use client";

import { useState } from "react";
import SearchBar from "../components/SearchBar";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
};

export default function Home() {
  const [results, setResults] = useState<Movie[]>([]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Buscar Filmes</h1>
      <SearchBar onResults={setResults} />

      {results.length > 0 && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
    </main>
  );
}
