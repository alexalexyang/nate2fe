import styled, { css } from "styled-components";

import { Button } from "@material-ui/core";
import { MovieProps } from "./types";
import { NextPage } from "next";
import { useState } from "react";

const StyledFullScreen = styled.div<{ movieId: string; fullScreen: boolean }>`
  ${(props) =>
    props.fullScreen &&
    props.movieId &&
    css`
      #${props.movieId} {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(85, 85, 85, 0.8);
        height: 100vh;
        width: 100vw;
        color: blue;
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

const FullScreen: NextPage<{ item: MovieProps }> = ({
  item,
}: {
  item: MovieProps;
}) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [movieId, setMovieId] = useState("");

  if (!item || !item.trailer) {
    return null;
  }

  const gofullScreen = (id: string) => {
    setFullScreen(!fullScreen);
    setMovieId(id);
  };

  const trailerLink =
    item.trailerType === "YouTube"
      ? `https://youtube.com/embed/${item.trailer}`
      : `https://player.vimeo.com/video/${item.trailer}`;

  return (
    <>
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={() => gofullScreen(`full-screen-${item.id}`)}
      >
        Trailer
      </Button>
      {fullScreen && (
        <StyledFullScreen
          fullScreen={fullScreen}
          movieId={movieId}
          onClick={() => gofullScreen(`full-screen-${item.id}`)}
        >
          <Centered id={`full-screen-${item.id}`}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => gofullScreen(`full-screen-${item.id}`)}
            >
              Exit
            </Button>
            <iframe
              className="video"
              title={`Trailer for ${item.trailer}`}
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
