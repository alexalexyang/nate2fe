import styled, { css } from "styled-components";

export const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
  /* border: 2px solid red; */

  @media (min-width: 1000px) {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    && {
      > * {
        width: 1000px;
      }
    }
  }
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
  background-color: rgba(245, 235, 245, 0.6);
  overflow-y: scroll;
  padding: 0 1rem 0;

  h1 {
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
  }

  header > p {
    font-size: 1rem;
    margin: 0;
  }

  article {
    margin-top: 1rem;
    text-align: justify;
    font-size: 1.1rem;
  }
`;

export const TrailersWrapper = styled.section`
  width: 100%;
  display: flex;
  margin: 1rem 0;
  justify-content: space-evenly;
`;

export const CarouselWrapper = styled.section`
  margin: 0.5rem 0;
  border-radius: 4rem;
  border: 1px solid #c2b9b9;
  background-color: rgba(237, 245, 247, 0.5);

  @media (min-width: 500px) {
    border-radius: 2rem;
  }
`;

export const ImageWrapper = styled.section`
  height: 200px;
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
`;

export const Footer = styled.footer`
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid lightgray;
  text-align: right;
  font-size: 1rem;

  > * {
    margin-left: 0.5rem;
  }

  a {
    color: #0084ff;
    text-decoration: none;
  }
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

  animation: fadein 0.5s;
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
