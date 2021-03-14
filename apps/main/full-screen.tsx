import styled, { css } from "styled-components";

import { Button } from "@material-ui/core";
import { NextPage } from "next";
import { useState } from "react";

interface TrailerProps {
  trailer: { type?: string; url?: string };
  num: number;
}

const StyledFullScreen = styled.div<{ trailerId: string }>`
  border: 1px solid green;
  ${({ trailerId }) =>
    trailerId &&
    css`
      #${trailerId} {
        border: 1px solid red;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(85, 85, 85, 0.8);
        height: 100vh;
        width: 100vw;
      }
    `}
`;

const Centered = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > :first-child {
    margin-bottom: 1rem;
  }

  iframe {
    border: none;
    width: 100%;
    height: 60%;
  }

  @media (min-width: 750px) {
    iframe {
      height: 80%;
    }
  }
`;

const FullScreen: NextPage<TrailerProps> = ({ trailer, num }: TrailerProps) => {
  const [fullScreen, setFullScreen] = useState(false);
  // const [movieId, setMovieId] = useState("");

  if (!trailer.url || !trailer.type) {
    return null;
  }

  const gofullScreen = () => {
    setFullScreen(!fullScreen);
    // setMovieId(id);
  };

  const trailerId = `full-screen-${trailer.url}`;

  const trailerLink =
    trailer.type === "youtube"
      ? `https://youtube.com/embed/${trailer.url}`
      : `https://player.vimeo.com/video/${trailer.url}`;

  return (
    <>
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={() => gofullScreen()}
      >
        Trailer {num}
      </Button>
      {fullScreen && (
        <StyledFullScreen trailerId={trailerId} onClick={() => gofullScreen()}>
          <Centered id={trailerId}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => gofullScreen()}
            >
              Exit
            </Button>
            <iframe
              className="video"
              title={`Movie trailer`}
              src={trailerLink}
              allowFullScreen
            />
          </Centered>
        </StyledFullScreen>
      )}
    </>
  );
};

export default FullScreen;
