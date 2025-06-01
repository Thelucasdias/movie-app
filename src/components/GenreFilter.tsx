import React from "react";
import { useGenres } from "../hooks/useGenres";

const GenreFilter: React.FC = () => {
  const { genres, loading, error } = useGenres();

  if (loading) {
    return (
      <div className="p-4 m-4 text-gray-600 italic">Carregando gêneros...</div>
    );
  }

  if (error) {
    return (
      <div className="p-4 m-4 text-red-600 font-bold">
        Erro ao carregar gêneros: {error}
      </div>
    );
  }

  return (
    <div className="p-4 m-4 border border-gray-300 rounded-lg bg-white shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Filtrar por Gênero:
      </h3>
      <div className="flex flex-wrap gap-2">
        {" "}
        {genres.map((genre) => (
          <button
            key={genre.id}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
