import styled from "styled-components";

export const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 2px solid red;
`;

export const Content = styled.div`
  height: 80%;
  width: 100%;
  border: 2px solid green;
`;

export const ButtonsWrapper = styled.div`
  height: 15%;
  width: 100%;
  border: 2px solid yellow;
  display: flex;
`;

export const SingleButton = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid blue;
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

export const Button = styled.button`
  height: 50px;
  width: 50px;
  border: 2px solid lightcoral;
  background: none;

  /* :hover {
    height: 60px;
    width: 60px;
    transition: width 0.2s, height 0.2s;
  } */

  :active {
    height: 40px;
    width: 40px;
    transition: width 0.2s, height 0.2s;
    background-color: pink;
  }
`;

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Device_Detection
