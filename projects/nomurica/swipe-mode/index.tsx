import { ButtonsWrapper, StyledDiv, Wrapper } from "./swipe-mode-styles";
import { MovieType, MoviesType } from "../types";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { noFunc, yesFunc } from "./swipe-functions";

import Loading from "../../../components/Loading";
import MovieCard from "../movie-card";
import { NextPage } from "next";
import SwipeBox from "../../../components/SwipeBox";
import YesNoButton from "../yes-no-button";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";

const MyDiv = styled.div`
  display: flex;
`;

enum RequestStatus {
  Pending = "pending",
  Success = "success",
  Error = "error",
  Idle = "idle",
}

export interface SetProps {
  status: RequestStatus;
  data?: MoviesType;
  message?: string;
  fetchStatus: RequestStatus;
}

const initialState = {
  status: RequestStatus.Idle,
  data: undefined,
  message: undefined,
  fetchStatus: RequestStatus.Idle,
};

const SwipeMode: NextPage = () => {
  const [set1, setSet1] = useState<SetProps>(initialState);
  const [set2, setSet2] = useState<SetProps>(initialState);
  const [displaySet, setDisplaySet] = useState<string>("set1");

  const fetchMovies = async (
    set: SetProps,
    setSet: Dispatch<SetStateAction<SetProps>>
  ) => {
    const fetchedMovies = await (
      await fetch(`/api/nomurica/discover?numOfMovies=${10}`)
    ).json();

    setSet({
      ...set,
      data: fetchedMovies,
      status: RequestStatus.Success,
      fetchStatus: RequestStatus.Success,
    });
  };

  const fetchIfEmpty = (
    set: SetProps,
    setSet: Dispatch<SetStateAction<SetProps>>,
    whichSet: string
  ) => {
    const isEmpty = !set.data || !set.data.length;

    if (isEmpty && set.fetchStatus !== RequestStatus.Pending) {
      console.log(`${whichSet} empty`);

      setSet({
        ...set,
        status: RequestStatus.Pending,
        fetchStatus: RequestStatus.Pending,
      });
      fetchMovies(set, setSet);
    }
  };

  const switchSet = () => {
    const isEmptySet1 = !set1.data || !set1.data.length;
    const isEmptySet2 = !set2.data || !set2.data.length;

    if (isEmptySet1 && isEmptySet2) {
      return setDisplaySet("set1");
    }

    if (isEmptySet1 && !isEmptySet2) {
      return setDisplaySet("set2");
    }

    if (!isEmptySet1 && isEmptySet2) {
      return setDisplaySet("set1");
    }
  };

  useEffect(() => {
    fetchIfEmpty(set1, setSet1, `set1`);
    fetchIfEmpty(set2, setSet2, `set2`);

    switchSet();
  }, [set1, set2]);

  const renderCards = (
    movies: MoviesType,
    setMovies: Dispatch<SetStateAction<SetProps>>
  ) => (
    <>
      {movies &&
        movies.map((movie: MovieType, idx: number) => (
          <SwipeBox
            key={idx}
            yesFunc={yesFunc}
            noFunc={noFunc}
            state={{ movie, setMovies }}
          >
            <MovieCard movie={movie} />
          </SwipeBox>
        ))}
    </>
  );

  const setSwitchCards = () => {
    if (displaySet === "set1" && set1 && set1.data && set1.data.length) {
      return renderCards(set1.data, setSet1);
    }
    if (displaySet == "set2" && set2 && set2.data && set2.data.length) {
      return renderCards(set2.data, setSet2);
    }
    return <Loading />;
  };

  const Buttons = (
    movies: SetProps,
    setMovies: Dispatch<SetStateAction<SetProps>>
  ) => (
    <ButtonsWrapper>
      <YesNoButton func={() => noFunc({ movies, setMovies })} text="No" />{" "}
      <YesNoButton func={() => yesFunc({ movies, setMovies })} text="Yes" />
    </ButtonsWrapper>
  );

  const setSwitchButtons = () => {
    if (displaySet === "set1" && set1 && set1.data && set1.data.length) {
      return Buttons(set1, setSet1);
    }
    if (displaySet == "set2" && set2 && set2.data && set2.data.length) {
      return Buttons(set2, setSet2);
    }
    return <Loading />;
  };

  return (
    <MyDiv>
      <h3>
        {set1.data && set1.data.length}
        {set1.data &&
          set1.data.map((movie) => <p key={movie.id}>{movie.title}</p>)}
        {set2.data && set2.data.length}
        {set2.data &&
          set2.data.map((movie) => <p key={movie.id}>{movie.title}</p>)}
      </h3>
      <Wrapper>
        <StyledDiv>{setSwitchCards()}</StyledDiv>
        {setSwitchButtons()}
      </Wrapper>
    </MyDiv>
  );
};

export default SwipeMode;
