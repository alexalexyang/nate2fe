import styled, { css } from "styled-components";

export const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 2px solid red;
`;

export const Body = styled.div`
  height: 95%;
  width: 100%;
  position: relative;
  border: 2px solid blue;
`;

export const StyledContent = styled.div`
  height: 85%;
  width: 100%;
  border: 2px solid green;
  overflow-y: scroll;
`;

export const ButtonsWrapper = styled.div`
  height: 15%;
  width: 100%;
  border: 2px solid yellow;
  display: flex;
`;

export const Layers = styled.div`
  height: 100%;
  width: 100%;
  border: 2px solid chartreuse;
  position: absolute;
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
  border: 2px solid blue;
`;

export const Button = styled.button<{ touchScreen?: boolean }>`
  height: 50px;
  width: 50px;
  border: 2px solid lightcoral;
  background: none;

  ${({ touchScreen }) =>
    !touchScreen &&
    css`
      :hover {
        height: 60px;
        width: 60px;
        transition: width 0.2s, height 0.2s;
      }
    `}

  :active {
    height: 40px;
    width: 40px;
    transition: width 0.2s, height 0.2s;
    background-color: pink;
  }
`;

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Device_Detection
