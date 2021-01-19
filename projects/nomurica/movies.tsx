import MovieCard from "./movie-card";
import { MoviesProps } from "./types";
import { NextPage } from "next";

const Movies: NextPage<MoviesProps> = ({ movies }: MoviesProps) => {
  if (!movies) {
    return null;
  }

  if (!movies!.length) {
    return null;
  }

  return (
    <>
      {movies!.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </>
  );
};

export default Movies;
