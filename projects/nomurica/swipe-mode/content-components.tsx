import React, { Dispatch, SetStateAction } from "react";
import { SetProps, SetPropsGeneric } from "./data-types";
import { noFunc, yesFunc } from "./swipe-functions";

import { ButtonsWrapper } from "./swipe-mode-styles";
import Loading from "../../../components/Loading";
import MovieCard from "../movie-card";
import { MovieType } from "../types";
import SwipeBox from "../../../components/SwipeBox";
import YesNoButton from "../yes-no-button";

const renderCards = (
  movies: SetProps,
  setMovies: Dispatch<SetStateAction<SetProps>>
) => (
  <>
    {movies &&
      movies.data &&
      movies.data.map((movie: MovieType, idx: number) => (
        <SwipeBox
          key={idx}
          yesFunc={yesFunc}
          noFunc={noFunc}
          state={{ movies, setMovies }}
        >
          <MovieCard movie={movie} />
        </SwipeBox>
      ))}
  </>
);

interface SwitchProps {
  displaySet: string;
  set1: SetProps;
  setSet1: Dispatch<SetStateAction<SetProps>>;
  set2: SetProps;
  setSet2: Dispatch<SetStateAction<SetProps>>;
}

export const setSwitchCards = ({
  displaySet,
  set1,
  setSet1,
  set2,
  setSet2,
}: SwitchProps) => {
  if (displaySet === "set1" && set1 && set1.data && set1.data.length) {
    return renderCards(set1, setSet1);
  }
  if (displaySet == "set2" && set2 && set2.data && set2.data.length) {
    return renderCards(set2, setSet2);
  }
  return <Loading />;
};

export const Buttons = (
  movies: SetProps,
  setMovies: Dispatch<SetStateAction<SetProps>>
) => (
  <ButtonsWrapper>
    <YesNoButton func={() => noFunc({ movies, setMovies })} text="No" />{" "}
    <YesNoButton func={() => yesFunc({ movies, setMovies })} text="Yes" />
  </ButtonsWrapper>
);

export const setSwitchButtons = ({
  displaySet,
  set1,
  setSet1,
  set2,
  setSet2,
}: SwitchProps) => {
  if (displaySet === "set1" && set1 && set1.data && set1.data.length) {
    return Buttons(set1, setSet1);
  }
  if (displaySet == "set2" && set2 && set2.data && set2.data.length) {
    return Buttons(set2, setSet2);
  }
  return null;
};
