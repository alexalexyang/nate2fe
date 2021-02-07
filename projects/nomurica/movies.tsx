import MovieCard from "./movie-card";
import { MovieProps } from "./types";
import { NextPage } from "next";

const Movies: NextPage<{ movies: MovieProps[] }> = ({
  movies,
}: {
  movies: MovieProps[];
}) => {
  if (!movies) {
    return null;
  }

  if (!movies!.length) {
    return null;
  }

  return (
    <>
      {movies!.map((movie) => {
        return <MovieCard key={movie.id} item={movie} />;
      })}
    </>
  );
};

export default Movies;
