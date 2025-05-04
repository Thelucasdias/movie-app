import { useFavorites } from "@/contexts/FavoritesContext";
import MovieModal from "@/components/MovieModal";
import { Movie, MovieDetails } from "@/types/movie";
import { useState } from "react";
import { truncateSinopsys } from "@/utils/truncateText";

interface FavoriteListProps {
  onMovieClick: (movieId: string) => Promise<void>;
}

export function FavoriteList({ onMovieClick }: FavoriteListProps) {
  const { favorites } = useFavorites();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);

  if (favorites.length === 0) return <p>Nenhum filme favoritado.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {favorites.map((movie) => (
        <div
          key={movie.id}
          className="border rounded-lg p-2 cursor-pointer hover:shadow-md transition"
          onClick={() => onMovieClick(String(movie.id))}
        >
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="rounded"
          />
          <h3 className="text-sm font-semibold mt-2">{movie.title}</h3>
          <p className="text-xs text-gray-700 mt-1">
            {truncateSinopsys(movie.overview, 85)}
          </p>
        </div>
      ))}
      {isModalOpen && selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMovie(null);
          }}
        />
      )}
    </div>
  );
}
