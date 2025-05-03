import { useFavorites } from "@/contexts/FavoritesContext";
import MovieModal from "@/components/MovieModal";
import { Movie, MovieDetails } from "@/types/movie";
import { useState } from "react";

export const FavoriteList = () => {
  const { favorites } = useFavorites();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);

  const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
    const res = await fetch(`/api/movies/${id}`);
    if (!res.ok) {
      throw new Error("Erro ao buscar detalhes do filme.");
    }
    const data = await res.json();
    return data;
  };
  const handleCardClick = async (movieId: string) => {
    try {
      const data = await fetchMovieDetails(movieId);
      setSelectedMovie(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
    }
  };

  if (favorites.length === 0) return <p>Nenhum filme favoritado.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {favorites.map((movie) => (
        <div
          key={movie.id}
          className="border rounded-lg p-2 cursor-pointer hover:shadow-md transition"
        >
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="rounded"
          />
          <h3 className="text-sm font-semibold mt-2">{movie.title}</h3>
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
};
