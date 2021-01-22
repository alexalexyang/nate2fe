import React, { useState } from "react";
import styled, { css } from "styled-components";

import { NextPage } from "next";
import { useSwipeable } from "react-swipeable";

interface SwipeBoxProps {
  children: React.ReactNode;
  yesFunc: any;
  noFunc: any;
  state: any;
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

  > * {
    width: 100%;
    height: 100%;
  }

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
  state,
  children,
}: SwipeBoxProps) => {
  const [data, setData] = useState<SwipeProps>();
  const [show, setShow] = useState<boolean>(true);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setData(eventData);
    },
    onSwiped: (eventData) => {
      const { velocity, absX, dir } = eventData;

      if (velocity > 1 || absX > 200) {
        dir === "Right" ? yesFunc(state) : noFunc(state);
        eventData.deltaX = eventData.deltaX * 2;
        setData(eventData);
        return setTimeout(() => setShow(false), 200);
      }

      eventData.deltaX = 0;
      eventData.deltaY = 0;
      return setData(eventData);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return show ? (
    <StyledBox {...handlers} data={data}>
      {children}
    </StyledBox>
  ) : null;
};

export default SwipeBox;
