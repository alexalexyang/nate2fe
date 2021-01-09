import { CardMedia } from "@material-ui/core";
import { MoviesType } from "./types";
import { NextPage } from "next";
import styled from "styled-components";

interface MoviesProps {
  movies: MoviesType;
}

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

const Movies: NextPage<MoviesProps> = ({ movies }: MoviesProps) => {
  if (!movies) {
    return null;
  }

  if (!movies!.length) {
    return null;
  }

  return (
    <>
      {movies!.map((movie) => (
        <StyledCard key={movie.id}>
          <StyledHeader>
            <h3>Title: {movie.title}</h3>
            <h3>Original title: {movie.original_title}</h3>
            {movie.release_date && <p>Release date: {movie.release_date}</p>}
            {movie.production_countries && (
              <p>
                Production countries:{" "}
                {movie.production_countries.map((country) => (
                  <span key={country}>{country}, </span>
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
      ))}
    </>
  );
};

export default Movies;
