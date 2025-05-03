import { formatDate } from "@/utils/dateProvider";
import { truncateSinopsys } from "@/utils/truncateText";
import { Movie } from "@/types/movie";

type Props = {
  movies: Movie[];
  onMovieClick: (id: string) => void;
};

export default function MovieGrid({ movies, onMovieClick }: Props) {
  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="border rounded-lg p-2 cursor-pointer hover:shadow-md transition"
          onClick={() => onMovieClick(String(movie.id))}
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
  );
}
