import React, { useState } from "react";

import { NextPage } from "next";
import { StyledBox } from "./swipebox-styles";
import { useSwipeable } from "react-swipeable";

interface SwipeBoxProps {
  children: React.ReactNode;
  yesFunc: any;
  noFunc: any;
  state: any;
  setState: any;
  yesNoExtras?: any;
}

export interface SwipeProps {
  initial: number[];
  absX: number;
  absY: number;
  deltaX: number;
  deltaY: number;
  dir: string;
  velocity: number;
  exceedThreshold?: boolean;
}

const SwipeBox: NextPage<SwipeBoxProps> = ({
  yesFunc,
  noFunc,
  state,
  setState,
  yesNoExtras,
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
        dir === "Right"
          ? yesFunc(state, setState, yesNoExtras)
          : noFunc(state, setState, yesNoExtras);
        eventData.deltaX = eventData.deltaX * 5;
        setData({ ...eventData, exceedThreshold: true });
        // Memory leak with setTimeout?
        return setTimeout(() => setShow(false), 400);
      }

      eventData.deltaX = 0;
      eventData.deltaY = 0;
      return setData({ ...eventData, exceedThreshold: false });
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
