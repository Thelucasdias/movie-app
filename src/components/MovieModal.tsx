import { MovieDetails } from "@/types/movie";
import { formatDate } from "@/utils/dateProvider";
import { formatRuntime } from "@/utils/formatRuntime";

interface MovieModal {
  movie: MovieDetails;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModal) {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray bg-opacity-10">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          {movie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-auto rounded"
            />
          ) : (
            <div className="bg-gray-200 w-full h-44 flex items-center justify-center text-gray-500">
              Sem imagem
            </div>
          )}
          <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
          <p className="text-sm text-gray-700 mb-4">{movie.overview}</p>
          <p className="text-sm text-gray-600 mb-4">
            Elenco: {movie.cast.map((member) => member.name).join(", ")}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Lançamento: {formatDate(movie.release_date)}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Duração: {formatRuntime(movie.runtime)}
          </p>

          <p className="text-sm text-gray-500 mb-4">
            Nota: {movie.vote_average}
          </p>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
