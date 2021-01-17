import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";

import { NextPage } from "next";
import { useSwipeable } from "react-swipeable";

interface SwipeBoxProps {
  children: React.ReactNode;
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
  border: 1px solid pink;
  background-color: blueviolet;
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

const SwipeBox: NextPage<SwipeBoxProps> = ({ children }: SwipeBoxProps) => {
  const [data, setData] = useState<SwipeProps>();

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setData(eventData);
    },
    onSwiped: (eventData) => {
      eventData.deltaX = 0;
      eventData.deltaY = 0;
      // console.log("Swiped: ", eventData.deltaX);
      setData(eventData);
    },
    preventDefaultTouchmoveEvent: true,
  });

  data && console.log("End: ", data.deltaX);

  return (
    <StyledBox {...handlers} data={data}>
      {children}
    </StyledBox>
  );
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
    padding: 1rem;
  }
`;

const DeleteMe: React.FC = () => {
  const MyCards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const renderCards = MyCards.map((card, idx) => (
    <SwipeBox key={idx}>{card}</SwipeBox>
  ));

  return (
    <Wrapper>
      <div>
        <h1>Swipe test</h1>
      </div>
      <StyledDiv>{renderCards}</StyledDiv>
    </Wrapper>
  );
};

export default DeleteMe;
