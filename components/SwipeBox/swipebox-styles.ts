import styled, { css } from "styled-components";

import { SwipeProps } from "./index";

export const StyledBox = styled.div.attrs<{ data?: SwipeProps }>((props) => {
  const swipeCSS = props.data && {
    transform: `translate3d(
          ${props.data.deltaX ?? 0}px,
          ${props.data.deltaY ?? 0}px,
          0
        )
        rotate(${props.data.deltaX / 20 ?? 0}deg) scale(1, 1)`,
    willChange: `transform`,

    ...(props.data.exceedThreshold ? { transition: `all 0.8s` } : {}),
  };

  return {
    style: swipeCSS ?? {},
  };
})<{ data?: SwipeProps }>`
  position: absolute;

  > * {
    width: 100%;
    height: 100%;
  }
`;
