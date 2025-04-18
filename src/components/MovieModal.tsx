import { MovieDetails } from "@/types/movie";

interface MovieModal {
  movie: MovieDetails;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModal) {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray bg-opacity-10">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
          <p className="text-sm text-gray-700 mb-4">{movie.overview}</p>
          <p className="text-sm text-gray-500 mb-2">
            Lançamento: {movie.release_date}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Duração: {movie.runtime} min
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
