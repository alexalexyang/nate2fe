import React, { useEffect, useState } from "react";

import Loading from "../../components/Loading";
import MovieCard from "./movie-card";
import { MoviesType } from "./types";
import { NextPage } from "next";
import SwipeBox from "../../components/SwipeBox";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
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

const SwipeMode: NextPage = () => {
  const [movies, setMovies] = useState<MoviesType>();

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await (
        await fetch(`/api/nomurica/discover?genre=sciencefiction`)
      ).json();
      setMovies(movies);
    };

    fetchMovies();
  }, []);

  const yesFunc = () => {
    console.log("YES!");
  };

  const noFunc = () => {
    console.log("NO!");
  };

  const renderCards =
    movies &&
    movies.map((movie, idx) => (
      <SwipeBox key={idx} count={idx} yesFunc={yesFunc} noFunc={noFunc}>
        <MovieCard movie={movie} />
      </SwipeBox>
    ));

  return (
    <Wrapper>
      <div>
        <h1>Swipe test</h1>
      </div>
      <StyledDiv>{movies ? renderCards : <Loading />}</StyledDiv>
    </Wrapper>
  );
};

export default SwipeMode;
