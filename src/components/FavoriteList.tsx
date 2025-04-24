import { useFavorites } from "@/contexts/FavoritesContext";

export const FavoriteList = () => {
  const { favorites } = useFavorites();

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
    </div>
  );
};
