import SearchBar from "@/components/SearchBar";
import { GetServerSideProps } from "next";
import { Movie } from "@/types/movie";
import Pagination from "@/components/Pagination";
import { fetchRandomMovies } from "@/lib/fetchRandomMovies";
import MovieModal from "@/components/MovieModal";
import { useMovieModal } from "@/hooks/useMovieModal";
import { usePagination } from "@/hooks/usePagination";
import MovieGrid from "@/components/MovieGrid";
import { useMovies } from "@/hooks/useMovies";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useEffect, useMemo } from "react";
import GenreFilter from "@/components/GenreFilter";
import { Genre } from "@/types/genre";

type Props = {
  initialResults: Movie[];
  initialTotalPages: number;
  initialQuery?: string;
  initialPage?: number;
  genres: Genre[];
  genresError?: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const search = (context.query.search as string) || "";
  const page = parseInt((context.query.page as string) || "1", 10);
  const genre = context.query.genre as string;

  let genres: Genre[] = [];
  let genresError: string | undefined;

  try {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      throw new Error("TMDB_API_KEY não configurada no ambiente do servidor.");
    }

    const genreResponse = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`
    );

    if (!genreResponse.ok) {
      const errorText = await genreResponse.text();
      throw new Error(
        `Erro ao buscar gêneros: ${genreResponse.status} - ${errorText}`
      );
    }

    const genreData = await genreResponse.json();
    genres = genreData.genres;
  } catch (err: any) {
    console.error("Erro ao buscar gêneros no servidor:", err);
    genresError = err.message || "Erro desconhecido ao carregar gêneros.";
  }

  if (genre && !search) {
    const apiKey = process.env.TMDB_API_KEY;
    const genreMoviesRes = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&with_genres=${genre}&page=${page}`
    );
    const genreMoviesData = await genreMoviesRes.json();

    return {
      props: {
        initialResults: genreMoviesData.results || [],
        initialTotalPages: genreMoviesData.total_pages || 1,
        initialPage: page,
        genres,
        genresError: genresError ?? null,
      },
    };
  }

  if (!search && !genre) {
    const randomMovies = await fetchRandomMovies();
    return {
      props: {
        initialResults: randomMovies,
        initialTotalPages: 500,
        genres,
        genresError: genresError ?? null,
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
      genres,
      genresError: genresError ?? null,
    },
  };
};

export default function Home({
  initialResults,
  initialTotalPages,
  initialQuery = "",
  initialPage = 1,
  genres,
  genresError,
}: Props) {
  const { query, page, results, totalPages, setQuery, setPage, setResults } =
    useMovies(initialQuery, initialPage, initialResults, initialTotalPages);

  const { handlePageChange } = usePagination(query, setPage);
  const { handleCardClick, isModalOpen, selectedMovie, closeModal } =
    useMovieModal();

  const isSearch = query.trim().length > 0;
  const isGenreFilter =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("genre");

  const {
    movies: randomMovies,
    loaderRef,
    loading,
  } = useInfiniteScroll(!isSearch && !isGenreFilter);

  const displayedMovies = useMemo(() => {
    if (isSearch || isGenreFilter) return results;

    const combined = [...initialResults, ...randomMovies];
    const uniqueIds = new Set();

    return combined.filter((movie) => {
      if (uniqueIds.has(movie.id)) return false;
      uniqueIds.add(movie.id);
      return true;
    });
  }, [isSearch, isGenreFilter, results, initialResults, randomMovies]);

  useEffect(() => {
    if (isSearch || isGenreFilter) {
      setResults(initialResults);
    }
  }, [isSearch, isGenreFilter]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-4xl font-bold mb-4 text-center">Buscar Filmes</h1>

      <SearchBar
        onResults={(results) => setResults(results)}
        onQueryChange={setQuery}
      />
      {genresError ? (
        <div className="p-4 m-4 text-red-600 font-bold">
          Erro ao carregar gêneros: {genresError}
        </div>
      ) : (
        <GenreFilter genres={genres} />
      )}

      {displayedMovies.length > 0 && (
        <>
          <MovieGrid movies={displayedMovies} onMovieClick={handleCardClick} />
          {isSearch || isGenreFilter ? (
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
          <MovieModal movie={selectedMovie} onClose={closeModal} />
        </div>
      )}
    </main>
  );
}
