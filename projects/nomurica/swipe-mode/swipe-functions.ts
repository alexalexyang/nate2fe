import { MovieProps } from "../types";
import { StateProps } from "../../../types/types";
import fetch from "isomorphic-unfetch";

export const yesFunc = async (
  movies: StateProps<MovieProps[]>["set"],
  setMovies: StateProps<MovieProps[]>["setSet"]
) => {
  if (!movies.data || !movies.data.length) {
    return;
  }
  // console.log(movies);

  setTimeout(() => {
    const currentMovie = movies.data && movies.data.pop();

    currentMovie &&
      fetch(
        `/api/db-movies/likes?movie_id=${currentMovie.id}&movie_title=${currentMovie.title}`
      );

    setMovies({ ...movies });
  }, 300);
};

export const noFunc = (
  movies: StateProps<MovieProps[]>["set"],
  setMovies: StateProps<MovieProps[]>["setSet"]
) => {
  if (!movies.data || !movies.data.length) {
    return;
  }
  // console.log(movies);
  setTimeout(() => {
    movies.data && movies.data.pop();
    setMovies({ ...movies });
  }, 250);
};