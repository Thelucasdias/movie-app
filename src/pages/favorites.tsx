import { FavoriteList } from "@/components/FavoriteList";
import { useMovieModal } from "@/hooks/useMovieModal";
import MovieModal from "@/components/MovieModal";
import BackButton from "@/components/BackButton";

export default function FavoritesPage() {
  const { handleCardClick, isModalOpen, selectedMovie, closeModal } =
    useMovieModal();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative mb-12">
        <div className="absolute left-0">
          <BackButton />
        </div>
        <h1 className="text-4xl font-bold text-center">Filmes Favoritos</h1>
      </div>

      <FavoriteList onMovieClick={handleCardClick} />

      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </main>
  );
}
