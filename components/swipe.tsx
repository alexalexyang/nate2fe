import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";

import { NextPage } from "next";
import { useSwipeable } from "react-swipeable";

interface SwipeBoxProps {
  children: React.ReactNode;
}

const StyledBox = styled.div<{ angle: number }>`
  border: 1px solid pink;

  ${(props) => css`
    div {
      transform: rotate(${props.angle ?? 0}deg);
    }
  `}
`;

const SwipeBox: NextPage<SwipeBoxProps> = ({ children }: SwipeBoxProps) => {
  const [angle, setAngle] = useState(0);
  const [data, setData] = useState<object[]>([]);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setData([...data, eventData]);
      setAngle(eventData.deltaX);
      // console.log(eventData);
    },
    preventDefaultTouchmoveEvent: true,
  });

  const renderData = data.reverse().map((datum, idx) => (
    <li key={idx}>
      {/* absX: {datum.absX}, absY: {datum.absY} */}
      deltaX: {datum.deltaX}, deltaY: {datum.deltaY}
    </li>
  ));

  return (
    <StyledBox {...handlers} angle={angle}>
      {children}
      <div>
        <ul>{data && renderData}</ul>
      </div>
    </StyledBox>
  );
};

const DeleteMe: React.FC = () => {
  return (
    <SwipeBox>
      <h1>Hello</h1>
    </SwipeBox>
  );
};

export default DeleteMe;
