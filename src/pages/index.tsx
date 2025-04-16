import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import { formatDate } from "./providers/DateProvider";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { truncateSinopsys } from "@/utils/truncateText";
import { Movie } from "@/types/movie";
import Pagination from "@/components/Pagination";
import { fetchRandomMovies } from "@/lib/fetchRandomMovies";

type Props = {
  initialResults: Movie[];
  initialQuery: string;
  initialPage: number;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const search = (context.query.search as string) || "";
  const page = parseInt((context.query.page as string) || "1", 100);

  if (!search) {
    const randomMovies = await fetchRandomMovies(page);
    return {
      props: {
        initialResults: randomMovies,
        initialQuery: "",
        initialPage: 1,
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
    },
  };
};

export default function Home({
  initialResults,
  initialQuery,
  initialPage,
}: Props) {
  const [results, setResults] = useState<Movie[]>(initialResults);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      const res = await fetch(`/api/search?query=${query}&page=${page}`);
      const data = await res.json();
      setResults(data.results || []);
      setTotalPages(data.total_pages);
    };

    if (query !== initialQuery || page !== initialPage) {
      fetchMovies();
    }
  }, [query, page]);

  const handleNewSearch = (newResults: Movie[], searchTerm: string) => {
    setResults(newResults);
    setQuery(searchTerm);
    setPage(1);
    router.push(`/?search=${searchTerm}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/?search=${query}&page=${newPage}`);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Buscar Filmes</h1>

      <SearchBar onResults={handleNewSearch} onQueryChange={setQuery} />

      {results.length > 0 && (
        <>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {results.map((movie) => (
              <div
                key={movie.id}
                className="border rounded-lg p-2 cursor-pointer hover:shadow-md transition"
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto rounded"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-44 flex items-center justify-center text-gray-500">
                    Sem imagem
                  </div>
                )}
                <h2 className="mt-2 text-base font-bold">{movie.title}</h2>
                <p className="text-xs text-gray-500">
                  {formatDate(movie.release_date)}
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  {truncateSinopsys(movie.overview, 85)}
                </p>
              </div>
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}
