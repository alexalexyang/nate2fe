import styled, { css } from "styled-components";

export const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
  /* border: 2px solid red; */
`;

export const Body = styled.div`
  height: 95%;
  width: 100%;
  /* border: 2px solid blue; */
`;

export const ContentLayer = styled.div`
  height: 100%;
  width: 100%;
  /* border: 2px solid green; */
  position: absolute;
  background-color: #eed9f5;
  overflow-y: scroll;
`;

export const ButtonsWrapper = styled.div`
  height: 15%;
  width: 100%;
  /* border: 2px solid yellow; */
  display: flex;
  background-color: #f0c8ff;
`;

export const StyledContent = styled.div`
  height: 85%;
  width: 100%;
  /* border: 2px solid chartreuse; */
  position: relative;
`;

export const Banner = styled.div`
  height: 5%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: darkorchid;
  color: white;
  font-size: 1.1rem;
`;

export const SingleButton = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px solid blue; */
`;

const ButtonSize = "50px";
const ButtonSizeHover = "70px";
const ButtonSizeActive = "30px";

export const Button = styled.button<{ isTouchScreen?: boolean }>`
  height: ${ButtonSize};
  width: ${ButtonSize};
  border: none;
  background: none;

  ${({ isTouchScreen }) =>
    !isTouchScreen &&
    css`
      :hover {
        height: ${ButtonSizeHover};
        width: ${ButtonSizeHover};
        transition: width 0.2s, height 0.2s;
      }
    `}

  :active {
    height: ${ButtonSizeActive};
    width: ${ButtonSizeActive};
    transition: width 0.2s, height 0.2s;
    /* background-color: pink; */
  }
`;

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Device_Detection
