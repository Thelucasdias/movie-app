import SearchBar from "@/components/SearchBar";
import { GetServerSideProps } from "next";
import { Movie } from "@/types/movie";
import Pagination from "@/components/Pagination";
import { fetchRandomMovies } from "@/lib/fetchRandomMovies";
import MovieModal from "@/components/MovieModal";
import { useMovieModal } from "@/hooks/useMovieModal";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { usePagination } from "@/hooks/usePagination";
import MovieGrid from "@/components/MovieGrid";
import { useMovies } from "@/hooks/useMovies";
import { useInfiniteScroll } from "@/hooks/useInfinteScroll";
import { useEffect, useMemo } from "react";

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
    const randomMovies = await fetchRandomMovies();
    return {
      props: {
        initialResults: randomMovies,
        initialTotalPages: 500,
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
  const { query, page, results, totalPages, setQuery, setPage, setResults } =
    useMovies(initialQuery, initialPage, initialResults, initialTotalPages);

  const { handleNewSearch } = useMovieSearch(setResults, setQuery, setPage);
  const { handlePageChange } = usePagination(query, setPage);
  const { handleCardClick, isModalOpen, selectedMovie, closeModal } =
    useMovieModal();

  const isSearch = query.trim().length > 0;

  const {
    movies: randomMovies,
    loaderRef,
    loading,
  } = useInfiniteScroll(!isSearch);

  const displayedMovies = useMemo(() => {
    if (isSearch) return results;

    const combined = [...initialResults, ...randomMovies];
    const uniqueIds = new Set();

    return combined.filter((movie) => {
      if (uniqueIds.has(movie.id)) return false;
      uniqueIds.add(movie.id);
      return true;
    });
  }, [isSearch, results, initialResults, randomMovies]);

  useEffect(() => {
    if (isSearch) {
      setResults([]);
    }
  }, [isSearch]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-4xl font-bold mb-4 text-center">Buscar Filmes</h1>

      <SearchBar
        onResults={(results) => setResults(results)}
        onQueryChange={setQuery}
      />

      {displayedMovies.length > 0 && (
        <>
          <MovieGrid movies={displayedMovies} onMovieClick={handleCardClick} />
          {isSearch ? (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          ) : (
            <div
              ref={loaderRef}
              className="h-20 mt-8 text-center text-gray-500"
            >
              {loading && <p>Carregando...</p>}
            </div>
          )}
        </>
      )}
      {isModalOpen && selectedMovie && (
        <div className="fixed inset-0 z-50">
          {" "}
          <MovieModal movie={selectedMovie} onClose={closeModal} />
        </div>
      )}
    </main>
  );
}
