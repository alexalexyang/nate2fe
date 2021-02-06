import MovieCard from "./movie-card";
import { MovieProps } from "./types";
import { NextPage } from "next";

const Movies: NextPage<MovieProps[]> = ({ ...movies }: MovieProps[]) => {
  if (!movies) {
    return null;
  }

  if (!movies!.length) {
    return null;
  }

  return (
    <>
      {movies!.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </>
  );
};

export default Movies;
