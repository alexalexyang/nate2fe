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

  fetch(`/api/db/movies-db?movie_id=${movies[movies.length - 1].id}`);

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

  const fetchMovies = async () => {
    const movies = await (
      await fetch(`/api/nomurica/discover?genre=sciencefiction`)
    ).json();
    setMovies(movies);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies && movies.length === 0) {
      fetchMovies();
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
      <ButtonsWrapper>
        <YesNoButton func={() => noFunc({ movies, setMovies })} text="No" />{" "}
        <YesNoButton func={() => yesFunc({ movies, setMovies })} text="Yes" />
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default SwipeMode;
