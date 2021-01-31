import React, { useState } from "react";

import { NextPage } from "next";
import { StyledBox } from "./swipebox-styles";
import { useSwipeable } from "react-swipeable";

interface SwipeBoxProps {
  children: React.ReactNode;
  yesFunc: any;
  noFunc: any;
  state: any;
}

export interface SwipeProps {
  initial: number[];
  absX: number;
  absY: number;
  deltaX: number;
  deltaY: number;
  dir: string;
  velocity: number;
}

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
