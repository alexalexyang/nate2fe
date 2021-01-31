import { MovieType, SetProps } from "../types";
import React, { Dispatch, SetStateAction } from "react";
import { noFunc, yesFunc } from "./swipe-functions";

import { ButtonsWrapper } from "./swipe-mode-styles";
import Loading from "../../../components/Loading";
import MovieCard from "../movie-card";
import SwipeBox from "../../../components/SwipeBox";
import YesNoButton from "../yes-no-button";

interface CardProps<T> {
  set: SetProps<T>;
  setSet: Dispatch<SetStateAction<SetProps<T>>>;
  // childComponent: React.ReactNode
}

const RenderCards = <T extends object>({ set, setSet }: CardProps<T>) => (
  <>
    {set &&
      set.data &&
      set.data.map((item: T, idx: number) => (
        <SwipeBox
          key={idx}
          yesFunc={yesFunc}
          noFunc={noFunc}
          state={{ movies: set, setMovies: setSet }}
        >
          <MovieCard movie={item as MovieType} />
        </SwipeBox>
      ))}
  </>
);

interface SwitchProps {
  displaySet: string;
  set1: SetProps<MovieType>;
  setSet1: Dispatch<SetStateAction<SetProps<MovieType>>>;
  set2: SetProps<MovieType>;
  setSet2: Dispatch<SetStateAction<SetProps<MovieType>>>;
}

export const setSwitchCards = ({
  displaySet,
  set1,
  setSet1,
  set2,
  setSet2,
}: SwitchProps) => {
  if (displaySet === "set1" && set1 && set1.data && set1.data.length) {
    return <RenderCards<MovieType> set={set1} setSet={setSet1} />;
  }
  if (displaySet == "set2" && set2 && set2.data && set2.data.length) {
    return <RenderCards<MovieType> set={set2} setSet={setSet2} />;
  }
  return <Loading />;
};

export const Buttons = (
  movies: SetProps<MovieType>,
  setMovies: Dispatch<SetStateAction<SetProps<MovieType>>>
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
