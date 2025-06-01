import React from "react";
import { useRouter } from "next/router";
import { Genre } from "../types/genre";

type GenreFilterProps = {
  genres: Genre[];
};

const GenreFilter: React.FC<GenreFilterProps> = ({ genres }) => {
  const router = useRouter();

  const handleGenreClick = (genreId: number) => {
    router.push({
      pathname: "/",
      query: { genre: genreId },
    });
  };

  if (!genres || genres.length === 0) {
    return (
      <div className="p-4 m-4 text-gray-500 italic">
        Nenhum gênero disponível no momento.
      </div>
    );
  }

  return (
    <div className="p-4 m-4 border border-gray-300 rounded-lg bg-white shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Filtrar por Gênero:
      </h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
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
