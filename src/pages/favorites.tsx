import { FavoriteList } from "@/components/FavoriteList";

export default function FavoritesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">
        Filmes Favoritados
      </h1>
      <FavoriteList />
    </main>
  );
}
