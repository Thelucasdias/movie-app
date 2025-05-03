import { useRouter } from "next/router";
import { Movie } from "@/types/movie";

export function useMovieSearch(
  setResults: (results: Movie[]) => void,
  setQuery: (query: string) => void,
  setPage: (page: number) => void
) {
  const router = useRouter();

  const handleNewSearch = (newResults: Movie[], searchTerm: string) => {
    setResults(newResults);
    setQuery(searchTerm);
    setPage(1);
    router.push(`/?search=${searchTerm}&page=1`);
  };

  return { handleNewSearch };
}
