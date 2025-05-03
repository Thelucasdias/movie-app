import { useState } from "react";
import { MovieDetails } from "@/types/movie";
import { fetchMovieDetails } from "@/lib/fetchMovieDetails";

export function useMovieModal() {
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = async (movieId: string) => {
    try {
      const data = await fetchMovieDetails(movieId);
      setSelectedMovie(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return {
    selectedMovie,
    isModalOpen,
    handleCardClick,
    closeModal,
  };
}
