import { useFavorites } from "@/contexts/FavoritesContext";
import Link from "next/link";

export const FavoriteList = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) return <p>Nenhum filme favoritado.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {favorites.map((movie) => (
        <div key={movie.id} className="bg-white rounded-lg shadow p-2">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="rounded"
          />
          <h3 className="text-sm font-semibold mt-2">{movie.title}</h3>
          <Link href={`/movie/${movie.id}`} className="text-blue-500 text-xs">
            Ver detalhes
          </Link>
        </div>
      ))}
    </div>
  );
};
