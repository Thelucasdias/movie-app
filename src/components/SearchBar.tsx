import { useState } from "react";

export default function SearchBar({
  onResults,
  onQueryChange,
}: {
  onResults: (data: any, query: string) => void;
  onQueryChange: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await fetch(`/api/search?query=${query}`);
      const data = await res.json();
      onResults(data.results, query);
      onQueryChange(query);
    } catch (err) {
      console.error("Erro na busca:", err);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        placeholder="Buscar filmes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-4 py-2 rounded-md w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Buscar
      </button>
    </form>
  );
}
