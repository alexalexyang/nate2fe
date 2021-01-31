import { Dispatch, SetStateAction } from "react";
import { MovieType, SetProps } from "../types";

import fetch from "isomorphic-unfetch";

interface MoviesProps {
  movies: SetProps<MovieType>;
  setMovies: Dispatch<SetStateAction<SetProps<MovieType>>>;
}

export const yesFunc = async (state: MoviesProps) => {
  const { movies, setMovies } = state;
  if (!movies.data || !movies.data.length) {
    return;
  }

  setTimeout(() => {
    const currentMovie = movies.data && movies.data.pop();
    currentMovie &&
      fetch(
        `/api/db-movies/likes?movie_id=${currentMovie.id}&movie_title=${currentMovie.title}`
      );
    setMovies({ ...movies });
  }, 300);
};

export const noFunc = (state: MoviesProps) => {
  const { movies, setMovies } = state;
  console.log(movies);
  if (!movies.data || !movies.data.length) {
    return;
  }

  setTimeout(() => {
    movies.data && movies.data.pop();
    setMovies({ ...movies });
  }, 250);
};
