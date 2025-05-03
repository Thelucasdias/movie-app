import { useState, useEffect } from "react";
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

type Props = {
  initialResults: Movie[];
  initialTotalPages: number;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const search = (context.query.search as string) || "";
  const page = parseInt((context.query.page as string) || "1", 10);

  if (!search) {
    const randomMovies = await fetchRandomMovies(page);
    return {
      props: {
        initialResults: randomMovies,

        initialTotalPages: 1,
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

export default function Home({ initialResults, initialTotalPages }: Props) {
  const [results, setResults] = useState<Movie[]>(initialResults);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const router = useRouter();
  const queryParam =
    typeof router.query.search === "string" ? router.query.search : "";
  const pageParam = parseInt(
    typeof router.query.page === "string" ? router.query.page : "1"
  );

  const [query, setQuery] = useState(queryParam);
  const [page, setPage] = useState<number>(pageParam);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      const res = await fetch(`/api/search?query=${query}&page=${page}`);
      const data = await res.json();
      setResults(data.results || []);
      setTotalPages(data.total_pages);
    };

    if (query) {
      fetchMovies();
    }
  }, [query, page]);

  const { handleNewSearch } = useMovieSearch(setResults, setQuery, setPage);

  const { handlePageChange } = usePagination(query, setPage);

  const { handleCardClick, isModalOpen, selectedMovie, closeModal } =
    useMovieModal();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Buscar Filmes</h1>

      <SearchBar onResults={handleNewSearch} onQueryChange={setQuery} />

      {results.length > 0 && (
        <>
          <MovieGrid movies={results} onMovieClick={handleCardClick} />
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </main>
  );
}
