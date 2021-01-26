import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import Loading from "../../components/Loading";
import MovieCard from "./movie-card";
import { MoviesType } from "./types";
import { NextPage } from "next";
import SwipeBox from "../../components/SwipeBox";
import YesNoButton from "./yes-no-button";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 85vh;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  > * {
    width: 95%;
    height: 70%;

    @media (min-width: 750px) {
      width: 30rem;
      height: 40rem;
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  > * {
    margin: 0 0.5rem;
  }
`;

interface MoviesProps {
  movies: MoviesType;
  setMovies: Dispatch<SetStateAction<MoviesType>>;
}

const yesFunc = async (state: MoviesProps) => {
  const { movies } = state;
  if (!movies) {
    return;
  }

  const currentMovie = movies[movies.length - 1];

  fetch(
    `/api/db-movies/likes?movie_id=${currentMovie.id}&movie_title=${currentMovie.title}`
  );

  movies.pop();
  state.setMovies([...movies]);
};

const noFunc = (state: MoviesProps) => {
  const { movies } = state;
  if (!movies) {
    return;
  }
  movies.pop();
  state.setMovies([...movies]);
};

const SwipeMode: NextPage = () => {
  const [movies, setMovies] = useState<MoviesType>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  const fetchMovies = async (numOfMovies: number) => {
    const fetchNum = movies && movies.length ? numOfMovies - movies.length : 10;

    if (fetching) {
      return;
    }
    setFetching(true);
    const fetchedMovies = await (
      await fetch(`/api/nomurica/discover?numOfMovies=${fetchNum}`)
    ).json();

    fetchedMovies && setFetching(false);

    movies &&
      movies.length &&
      movies.forEach((film) => fetchedMovies.push(film));

    // Strange behaviour here where if we leave the last two cards unswiped, they will be pushed to the second-last places in the new array.
    setMovies(fetchedMovies);
  };

  useEffect(() => {
    fetchMovies(10);
  }, []);

  useEffect(() => {
    if (movies && movies.length < 6) {
      fetchMovies(10);
    }
  }, [movies]);

  const renderCards =
    movies &&
    movies.map((movie, idx) => (
      <SwipeBox
        key={idx}
        yesFunc={yesFunc}
        noFunc={noFunc}
        state={{ movies, setMovies }}
      >
        <MovieCard movie={movie} />
      </SwipeBox>
    ));

  return (
    <Wrapper>
      <StyledDiv>
        {movies && movies.length ? renderCards : <Loading />}
      </StyledDiv>
      {movies && movies.length && (
        <ButtonsWrapper>
          <YesNoButton func={() => noFunc({ movies, setMovies })} text="No" />{" "}
          <YesNoButton func={() => yesFunc({ movies, setMovies })} text="Yes" />
        </ButtonsWrapper>
      )}
    </Wrapper>
  );
};

export default SwipeMode;
