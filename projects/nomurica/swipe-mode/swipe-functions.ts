import { Dispatch, SetStateAction } from "react";

import { SetProps } from "./index";
import fetch from "isomorphic-unfetch";

interface MoviesProps {
  movies: SetProps;
  setMovies: Dispatch<SetStateAction<SetProps>>;
}

export const yesFunc = async (state: MoviesProps) => {
  const { movies, setMovies } = state;
  if (!movies.data || !movies.data.length) {
    return;
  }

  const currentMovie = movies.data.pop();

  currentMovie &&
    fetch(
      `/api/db-movies/likes?movie_id=${currentMovie.id}&movie_title=${currentMovie.title}`
    );

  setMovies({ ...movies });
};

export const noFunc = (state: MoviesProps) => {
  const { movies, setMovies } = state;
  if (!movies.data || !movies.data.length) {
    return;
  }

  movies.data.pop();
  setMovies({ ...movies });
};
