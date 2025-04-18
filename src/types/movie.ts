export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
};

export type MovieDetails = Movie & {
  vote_average: number;
  genres: { id: number; name: string }[];
  runtime: number;
  backdrop_path: string | null;
  cast: CastMember[];
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};
