import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import Loading from "../components/Loading";
import MovieCard from "../projects/nomurica/movie-card";
import { MoviesType } from "../projects/nomurica/types";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { useSwipeable } from "react-swipeable";

interface SwipeBoxProps {
  children: React.ReactNode;
  yesFunc: any;
  noFunc: any;
  count: any;
}

interface SwipeProps {
  initial: number[];
  absX: number;
  absY: number;
  deltaX: number;
  deltaY: number;
  dir: string;
  velocity: number;
}

const StyledBox = styled.div<{ data?: SwipeProps }>`
  position: absolute;
  width: inherit;
  height: inherit;

  ${(props) =>
    props.data &&
    css`
      transform: translate3d(
          ${props.data.deltaX ?? 0}px,
          ${props.data.deltaY ?? 0}px,
          0
        )
        rotate(${props.data.deltaX / 20 ?? 0}deg);
      transition: all 0.08s;
    `}
`;

const SwipeBox: NextPage<SwipeBoxProps> = ({
  yesFunc,
  noFunc,
  children,
  count,
}: SwipeBoxProps) => {
  const [data, setData] = useState<SwipeProps>();
  const [show, setShow] = useState<boolean>(true);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setData(eventData);
    },
    onSwiped: (eventData) => {
      const { velocity, absX, dir } = eventData;
      if ((velocity > 2.5 || absX > 500) && dir === "Right") {
        // YES!
        yesFunc();
        return setShow(false);
      }
      // NO!
      noFunc();
      eventData.deltaX = 0;
      eventData.deltaY = 0;
      setData(eventData);
    },
    preventDefaultTouchmoveEvent: true,
  });

  // data && console.log("End: ", data);

  return show ? (
    <StyledBox {...handlers} data={data}>
      {children}
    </StyledBox>
  ) : null;
};

// Example of component using the SwipeBox component above.

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 20%;

  * {
    width: 30rem;
    /* border: 1px solid pink; */
    /* background-color: blueviolet; */
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    font-size: 20rem; */
  }
`;

const DeleteMe: React.FC = () => {
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
    console.log("I yell YES!");
  };

  const noFunc = () => {
    console.log("I scream NO!");
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

export default DeleteMe;
