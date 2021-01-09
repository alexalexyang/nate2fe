import styled, { css } from "styled-components";

import { Button } from "@material-ui/core";
import { MoviesProps } from "./types";
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

const FullScreen: NextPage<MoviesProps> = ({ movie }: MoviesProps) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [movieId, setMovideId] = useState("");

  if (!movie || !movie.trailer) {
    return null;
  }

  const gofullScreen = (id: string) => {
    setFullScreen(!fullScreen);
    setMovideId(id);
  };

  return (
    <>
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={() => gofullScreen(`full-screen-${movie.id}`)}
      >
        Trailer
      </Button>

      {fullScreen && (
        <StyledFullScreen
          fullScreen={fullScreen}
          movieId={movieId}
          onClick={() => gofullScreen(`full-screen-${movie.id}`)}
        >
          <Centered id={`full-screen-${movie.id}`}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => gofullScreen(`full-screen-${movie.id}`)}
            >
              Exit
            </Button>
            {/* <CardMedia
              height="80%"
              component="iframe"
              image={`https://www.youtube.com/embed/${movie.trailer}`}
              title={`Trailer for movie.title`}
            /> */}

            <iframe
              className="video"
              title={`Trailer for ${movie.trailer}`}
              src={`https://youtube.com/embed/${movie.trailer}`}
              allowFullScreen
            />
          </Centered>
        </StyledFullScreen>
      )}
    </>
  );
};

export default FullScreen;
