import { useFavorites } from "@/contexts/FavoritesContext";
import { Movie } from "@/types/movie";
import { Heart, HeartOff } from "lucide-react";

type Props = {
  movie: Movie;
};

export const FavoriteButton = ({ movie }: Props) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  return (
    <button
      onClick={() => toggleFavorite(movie)}
      className="flex items-center space-x-1 text-red-500 p-2"
    >
      {favorite ? <Heart fill="currentColor" /> : <HeartOff />}
      <span>{favorite ? "Remover" : "Favoritar"}</span>
    </button>
  );
};
