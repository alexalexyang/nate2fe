import FullScreen from "./full-screen";
import { MovieProps } from "./types";
import { NextPage } from "next";
import { StyledCard } from "./movie-card-styles";
import styled from "styled-components";

const Card = styled.div`
  > * {
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
  }
`;

const MovieCard: NextPage<{ movie: MovieProps }> = ({
  movie,
}: {
  movie: MovieProps;
}) => {
  return movie ? (
    <Card key={movie.id}>
      <StyledCard>
        <StyledCard.Header>
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
        </StyledCard.Header>

        <StyledCard.Body>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={`Poster for ${movie.original_title}`}
            />
          )}
          <FullScreen {...movie} />
          <p>{movie.overview}</p>
        </StyledCard.Body>
        <StyledCard.Footer>
          <a
            href={`https://www.themoviedb.org/movie/${movie.id}`}
            target="__blank"
          >
            Edit on TMDB
          </a>
        </StyledCard.Footer>
      </StyledCard>
    </Card>
  ) : null;
};

export default MovieCard;
