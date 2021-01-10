import FullScreen from "./full-screen";
import { MoviesProps } from "./types";
import { NextPage } from "next";
import styled from "styled-components";

const StyledCard = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  width: 100%;
  max-height: 1500px;
  background-color: white;
  border-radius: 30px;
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

const StyledFooter = styled.div`
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid lightgray;
  text-align: right;
  a {
    color: #0084ff;
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
            {movie.title && <h3>Title: {movie.title}</h3>}
            {movie.original_title && (
              <h3>Original title: {movie.original_title}</h3>
            )}
            {movie.release_date && <p>Release date: {movie.release_date}</p>}
            {movie.production_countries && (
              <p>
                Production countries:{" "}
                {movie.production_countries.map((country, idx) => (
                  <span key={country}>
                    {country}
                    {!(movie.production_countries.length === idx + 1) && ", "}
                  </span>
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
            <FullScreen movie={movie} />
            <p>{movie.overview}</p>
          </StyledBody>
          <StyledFooter>
            <a
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="__blank"
            >
              Edit on TMDB
            </a>
          </StyledFooter>
        </StyledCard>
      ))}
    </>
  );
};

export default Movies;
