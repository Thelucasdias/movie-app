"use client";
import { formatDate } from "@/pages/providers/DateProvider";
import React from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
};

type MovieModalProps = {
  movie: Movie;
  details: any;
  onClose: () => void;
};

export default function MovieModal({
  movie,
  details,
  onClose,
}: MovieModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-sm text-gray-600 mb-4">
              {formatDate(movie.release_date)}
            </p>
            <p className="mb-4">{details.overview}</p>
            <p className="mb-2">
              <strong>Nota:</strong> {details.vote_average}
            </p>
            <div>
              <strong>Elenco:</strong>
              <ul className="list-disc list-inside text-sm mt-1">
                {details.credits?.cast?.slice(0, 5).map((actor: any) => (
                  <li key={actor.id}>
                    {actor.name} ({actor.character})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
