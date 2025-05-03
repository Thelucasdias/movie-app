import { FavoriteList } from "@/components/FavoriteList";
import { useMovieModal } from "@/hooks/useMovieModal";
import MovieModal from "@/components/MovieModal";

export default function FavoritesPage() {
  const { handleCardClick, isModalOpen, selectedMovie, closeModal } =
    useMovieModal();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">Filmes Favoritos</h1>
      <FavoriteList onMovieClick={handleCardClick} />

      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </main>
  );
}
