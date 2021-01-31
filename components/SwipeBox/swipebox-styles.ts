import styled, { css } from "styled-components";

import { SwipeProps } from "./index";

export const StyledBox = styled.div<{ data?: SwipeProps }>`
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
