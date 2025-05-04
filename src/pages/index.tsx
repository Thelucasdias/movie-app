import SearchBar from "@/components/SearchBar";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Movie } from "@/types/movie";
import Pagination from "@/components/Pagination";
import { fetchRandomMovies } from "@/lib/fetchRandomMovies";
import MovieModal from "@/components/MovieModal";
import { useMovieModal } from "@/hooks/useMovieModal";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { usePagination } from "@/hooks/usePagination";
import MovieGrid from "@/components/MovieGrid";
import { useMovies } from "@/hooks/useMovies";

type Props = {
  initialResults: Movie[];
  initialTotalPages: number;
  initialQuery?: string;
  initialPage?: number;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const search = (context.query.search as string) || "";
  const page = parseInt((context.query.page as string) || "1", 10);

  if (!search) {
    const randomMovies = await fetchRandomMovies(page);
    return {
      props: {
        initialResults: randomMovies,
      },
    };
  }

  const res = await fetch(
    `http://localhost:3000/api/search?query=${search}&page=${page}`
  );
  const data = await res.json();

  return {
    props: {
      initialResults: data.results || [],
      initialQuery: search,
      initialPage: page,
      initialTotalPages: data.total_pages || 1,
    },
  };
};
export default function Home({
  initialResults,
  initialTotalPages,
  initialQuery = "",
  initialPage = 1,
}: Props) {
  const router = useRouter();

  const { query, page, results, totalPages, setQuery, setPage, setResults } =
    useMovies(initialQuery, initialPage, initialResults, initialTotalPages);

  const { handleNewSearch } = useMovieSearch(setResults, setQuery, setPage);

  const { handlePageChange } = usePagination(query, setPage);

  const { handleCardClick, isModalOpen, selectedMovie, closeModal } =
    useMovieModal();

  const isSearch = query.trim().length > 0;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Buscar Filmes</h1>

      <SearchBar onResults={handleNewSearch} onQueryChange={setQuery} />

      {results.length > 0 && (
        <>
          <MovieGrid movies={results} onMovieClick={handleCardClick} />
          {isSearch && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </main>
  );
}
