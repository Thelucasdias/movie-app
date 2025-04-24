import { FavoriteList } from "@/components/FavoriteList";

export default function FavoritesPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Filmes Favoritados</h1>
      <FavoriteList />
    </main>
  );
}
