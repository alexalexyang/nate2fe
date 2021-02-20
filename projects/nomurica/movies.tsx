import MovieCard from "./movie-card";
import { MovieProps } from "./types";
import { MoviesWrapper } from "./movie-card-styles";
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
    <MoviesWrapper>
      {movies!.map((movie) => {
        return <MovieCard key={movie.id} item={movie} />;
      })}
    </MoviesWrapper>
  );
};

export default Movies;
