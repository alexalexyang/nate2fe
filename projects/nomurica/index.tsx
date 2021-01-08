import { Box, Button, CardMedia, Container } from "@material-ui/core";

import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import { useState } from "react";

const StyledContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;

const StyledCard = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 1px 1px 5px lightgray;

  :hover {
    background-color: lightgoldenrodyellow;
  }

  @media (min-width: 500px) {
    margin: 1rem;
    /* max-height: 900px; */
  }

  @media (min-width: 750px) {
    width: 45%;
  }
`;

const StyledHeader = styled.div`
  h1,
  h2,
  h3,
  p {
    margin: 0;
    margin-bottom: 0.5rem;
  }
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  text-align: justify;
  text-justify: inter-word;

  > * {
    margin: 0.5rem 0;
  }

  @media (min-width: 500px) {
    align-items: center;

    img {
      max-width: 50%;
      box-shadow: 1px 1px 5px lightgray;
    }
  }
`;

interface MovieType {
  original_title: string;
  title: string;
  release_date: string;
  production_countries: string[];
  poster_path: string;
  trailer: string;
  overview: string;
}

type MoviesType = MovieType[] | null;

const Nomurica: NextPage = () => {
  const [movies, setMovies] = useState<MoviesType>(null);

  const getMovies = async () => {
    const movies = await (
      await fetch(`/api/nomurica/discover?genre=sciencefiction`)
    ).json();
    setMovies(movies);
  };

  const renderMovies = () => {
    return movies && movies!.length
      ? movies!.map((movie) => (
          <StyledCard key={movie.original_title}>
            <StyledHeader>
              <h3>Title: {movie.title}</h3>
              <h3>Original title: {movie.original_title}</h3>
              {movie.release_date && <p>Release date: {movie.release_date}</p>}
              {movie.production_countries && (
                <p>
                  Production countries:{" "}
                  {movie.production_countries.map((country) => (
                    <>{country}, </>
                  ))}
                </p>
              )}
            </StyledHeader>

            <StyledBody>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={`Poster for ${movie.original_title}`}
                />
              )}
              {movie.trailer && (
                <CardMedia
                  height="315"
                  component="iframe"
                  image={movie.trailer}
                  title={`Trailer for movie.title`}
                />
              )}

              <p>{movie.overview}</p>
            </StyledBody>
          </StyledCard>
        ))
      : null;
  };

  return (
    <Box>
      <Container>
        <h1>Nomurica</h1>
      </Container>
      <Container>
        <Button
          onClick={getMovies}
          size="large"
          variant="contained"
          color="primary"
        >
          Get Movies
        </Button>
      </Container>
      {movies ? (
        <>
          <Container>
            <h2>Movies</h2>
            <StyledContainer>{renderMovies()}</StyledContainer>
          </Container>
          <Container>
            <h2>JSON</h2>
            <pre>{JSON.stringify(movies, null, 2)}</pre>
          </Container>
        </>
      ) : null}
    </Box>
  );
};

export default Nomurica;
